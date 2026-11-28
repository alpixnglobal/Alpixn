"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { canEncrypt, decryptSecret, encryptSecret } from "@/lib/ai/crypto";
import { hashPassword, requireAdminSession, verifyPassword } from "@/lib/admin-auth";
import { connectToDatabase } from "@/lib/db";
import { audit } from "@/lib/growth/audit";
import { decideApproval, requestApproval, retryApproval } from "@/lib/growth/approvals";
import { AdminUserModel, ApprovalModel } from "@/lib/growth/models";
import { AGENTS, DEFAULT_GROWTH_SETTINGS, getGrowthSettings, saveGrowthSettings, type AgentKey, type Autonomy, type ChannelKey, type GrowthSettings } from "@/lib/growth/settings";
import { SalesLeadModel } from "@/lib/models";
import { isRole } from "@/lib/rbac";
import { generateTotpSecret, verifyTotp } from "@/lib/totp";

const text = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const num = (fd: FormData, k: string, min: number, max: number, fallback: number) => {
  const n = Number(fd.get(k));
  return Number.isFinite(n) && fd.get(k) !== "" && fd.get(k) !== null ? Math.max(min, Math.min(max, n)) : fallback;
};
const lines = (v: string) => v.split(/[\n,]/).map((x) => x.trim()).filter(Boolean);
const go = (path: string, q: Record<string, string>) => redirect(`${path}?${new URLSearchParams(q).toString()}`);
const ip = async () => (await headers()).get("x-real-ip") ?? "";

async function db(back: string) {
  try {
    await connectToDatabase();
  } catch {
    go(back, { error: "Database unavailable. Check MongoDB connection." });
  }
}

const AUTONOMY: Autonomy[] = ["off", "suggest", "approve", "auto"];
const DAYS = (fd: FormData, k: string) => fd.getAll(k).map(Number).filter((d) => d >= 0 && d <= 6);
const HHMM = (v: string, fallback: string) => (/^([01]\d|2[0-3]):[0-5]\d$/.test(v) ? v : fallback);

/* ---------------- agent settings ---------------- */

export async function saveGrowthSettingsAction(formData: FormData) {
  const session = await requireAdminSession("agents");
  const back = "/admin/growth";
  await db(back);
  const current = await getGrowthSettings();
  const d = DEFAULT_GROWTH_SETTINGS;

  const agents = { ...current.agents };
  for (const key of Object.keys(AGENTS) as AgentKey[]) {
    const autonomy = text(formData, `agent.${key}.autonomy`) as Autonomy;
    agents[key] = { enabled: formData.get(`agent.${key}.enabled`) === "on", autonomy: AUTONOMY.includes(autonomy) ? autonomy : current.agents[key].autonomy };
  }
  // Proposals can never send without review.
  if (agents.proposals.autonomy === "auto") agents.proposals.autonomy = "approve";

  const channels = { ...current.channels };
  for (const key of Object.keys(d.channels) as ChannelKey[]) {
    channels[key] = { enabled: formData.get(`channel.${key}.enabled`) === "on", dailyLimit: num(formData, `channel.${key}.limit`, 0, 100000, current.channels[key].dailyLimit) };
  }

  const patch: Partial<GrowthSettings> = {
    agents,
    channels,
    workingHours: {
      timezone: text(formData, "wh.timezone") || current.workingHours.timezone,
      days: DAYS(formData, "wh.days"),
      start: HHMM(text(formData, "wh.start"), current.workingHours.start),
      end: HHMM(text(formData, "wh.end"), current.workingHours.end),
      instantRepliesAnyTime: formData.get("wh.instant") === "on",
    },
    escalation: {
      notifyEmail: text(formData, "esc.email").slice(0, 200),
      scoreThreshold: num(formData, "esc.score", 0, 100, current.escalation.scoreThreshold),
      keywords: lines(text(formData, "esc.keywords")).slice(0, 60),
    },
    ads: {
      dailyLimit: num(formData, "ads.daily", 0, 10_000_000, current.ads.dailyLimit),
      monthlyLimit: num(formData, "ads.monthly", 0, 100_000_000, current.ads.monthlyLimit),
      maxCpl: num(formData, "ads.maxCpl", 0, 1_000_000, current.ads.maxCpl),
      allowedCountries: lines(text(formData, "ads.countries")).map((c) => c.toUpperCase()).filter((c) => /^[A-Z]{2}$/.test(c)),
      maxBudgetChangePercent: num(formData, "ads.maxChange", 0, 100, current.ads.maxBudgetChangePercent),
    },
  };
  try {
    Intl.DateTimeFormat("en", { timeZone: patch.workingHours!.timezone });
  } catch {
    patch.workingHours!.timezone = current.workingHours.timezone;
  }

  await saveGrowthSettings(patch);
  await audit(session.email, "agents.settings_saved", "growth", { agents, channels, ads: patch.ads }, await ip());
  revalidatePath(back);
  go(back, { status: "saved" });
}

export async function setGlobalPauseAction(formData: FormData) {
  const session = await requireAdminSession("agents");
  const back = text(formData, "back") || "/admin/growth";
  await db(back);
  const paused = text(formData, "paused") === "1";
  await saveGrowthSettings({ globalPaused: paused });
  await audit(session.email, paused ? "agents.paused_all" : "agents.resumed_all", "growth", {}, await ip());
  revalidatePath("/admin/growth");
  go(back, { status: paused ? "All AI agents paused. Nothing will be sent until you resume." : "AI agents resumed." });
}

/* ---------------- approval center ---------------- */

export async function decideApprovalAction(formData: FormData) {
  const session = await requireAdminSession("approvals");
  const back = text(formData, "back") || "/admin/growth/approvals";
  await db(back);
  const id = text(formData, "id");
  const decision = text(formData, "decision") === "reject" ? "reject" : "approve";
  // Override: an edited message text / subject replaces the AI draft before it is executed.
  const patch: Record<string, unknown> = {};
  for (const key of ["text", "subject", "amount"]) {
    if (formData.has(`edit.${key}`)) patch[key] = key === "amount" ? Number(formData.get(`edit.${key}`)) || 0 : text(formData, `edit.${key}`);
  }
  const doc = (await ApprovalModel.findById(id).select("payload").lean().catch(() => null)) as { payload?: Record<string, unknown> } | null;
  const changed = Object.keys(patch).some((k) => doc?.payload?.[k] !== patch[k]);
  const result = await decideApproval(id, decision, session.email, { reason: text(formData, "reason"), payloadPatch: changed ? patch : undefined });
  revalidatePath("/admin/growth/approvals");
  go(back, result.ok ? { status: result.message.includes(" ") ? result.message : `${result.message} Done.` } : { error: result.message });
}

export async function retryApprovalAction(formData: FormData) {
  const session = await requireAdminSession("approvals");
  const back = text(formData, "back") || "/admin/growth/approvals";
  await db(back);
  const result = await retryApproval(text(formData, "id"), session.email);
  revalidatePath("/admin/growth/approvals");
  go(back, result.ok ? { status: result.message.includes(" ") ? result.message : `${result.message} Done.` } : { error: result.message });
}

/** Sales asks for a deal to be confirmed won (owner/manager approves in the Approval Center). */
export async function requestDealWonAction(formData: FormData) {
  const session = await requireAdminSession("sales");
  const leadId = text(formData, "leadId");
  const back = text(formData, "back") || `/admin/sales?lead=${leadId}`;
  await db(back);
  const evidence = text(formData, "evidence").slice(0, 1000);
  if (!evidence) go(back, { error: "Add the confirmation (signed agreement, PO number, payment reference…) before marking won." });
  const lead = (await SalesLeadModel.findById(leadId).select("name company").lean().catch(() => null)) as { name?: string; company?: string } | null;
  if (!lead) go(back, { error: "Lead not found." });
  const amount = num(formData, "amount", 0, 1e10, 0);
  await requestApproval({
    type: "deal_won",
    title: `Confirm deal won: ${lead!.name || lead!.company}`,
    summary: `Amount: ₹${amount.toLocaleString("en-IN")}\nConfirmation: ${evidence}`,
    payload: { leadId, amount, evidence },
    leadId,
    priority: "high",
    requestedBy: session.email,
    dedupeKey: `deal_won:${leadId}`,
  });
  go(back, { status: "Sent to the Approval Center for confirmation." });
}

/* ---------------- team members (owner only) ---------------- */

function strongPassword(p: string) {
  return p.length >= 12 && /[a-z]/i.test(p) && /\d/.test(p);
}

export async function saveTeamMemberAction(formData: FormData) {
  const session = await requireAdminSession("users");
  const back = "/admin/users";
  await db(back);
  const email = text(formData, "email").toLowerCase();
  const role = text(formData, "role");
  const password = String(formData.get("password") ?? "");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) go(back, { error: "Enter a valid email address." });
  if (!isRole(role) || role === "owner") go(back, { error: "Choose a role (the owner account is set on the server)." });
  if (email === (process.env.ADMIN_EMAIL ?? "").toLowerCase()) go(back, { error: "That is the owner's email." });

  const existing = await AdminUserModel.findOne({ email });
  if (!existing && !strongPassword(password)) go(back, { error: "Set a password of at least 12 characters with letters and numbers." });
  if (password && !strongPassword(password)) go(back, { error: "Password must be at least 12 characters with letters and numbers." });

  const set: Record<string, unknown> = { name: text(formData, "name").slice(0, 80), role, active: formData.get("active") !== null ? formData.get("active") === "on" : true };
  if (password) Object.assign(set, { passwordHash: await hashPassword(password), passwordChangedAt: new Date() });
  await AdminUserModel.updateOne({ email }, { $set: { email, ...set } }, { upsert: true });
  await audit(session.email, existing ? "users.updated" : "users.created", email, { role, active: set.active, passwordChanged: Boolean(password) }, await ip());
  revalidatePath(back);
  go(back, { status: "saved" });
}

export async function deleteTeamMemberAction(formData: FormData) {
  const session = await requireAdminSession("users");
  const back = "/admin/users";
  await db(back);
  const email = text(formData, "email").toLowerCase();
  await AdminUserModel.deleteOne({ email });
  await audit(session.email, "users.deleted", email, {}, await ip());
  revalidatePath(back);
  go(back, { status: "deleted" });
}

export async function resetMemberTwoFactorAction(formData: FormData) {
  const session = await requireAdminSession("users");
  const back = "/admin/users";
  await db(back);
  const email = text(formData, "email").toLowerCase();
  await AdminUserModel.updateOne({ email }, { $set: { totpSecretEnc: "" }, $unset: { pendingTotpEnc: 1 } });
  await audit(session.email, "users.2fa_reset", email, {}, await ip());
  go(back, { status: `Two-factor login removed for ${email}. They can set it up again from My account.` });
}

/* ---------------- my account (team members) ---------------- */

export async function changeMyPasswordAction(formData: FormData) {
  const session = await requireAdminSession();
  const back = "/admin/account";
  if (session.owner) go(back, { error: "The owner password is set on the server (ADMIN_PASSWORD)." });
  await db(back);
  const user = (await AdminUserModel.findOne({ email: session.email }).lean()) as { passwordHash: string } | null;
  if (!user || !(await verifyPassword(String(formData.get("current") ?? ""), user.passwordHash))) go(back, { error: "Current password is wrong." });
  const next = String(formData.get("next") ?? "");
  if (!strongPassword(next)) go(back, { error: "New password must be at least 12 characters with letters and numbers." });
  await AdminUserModel.updateOne({ email: session.email }, { $set: { passwordHash: await hashPassword(next), passwordChangedAt: new Date() } });
  await audit(session.email, "account.password_changed", session.email, {}, await ip());
  redirect("/admin/login?error=" + encodeURIComponent("Password changed. Please sign in again."));
}

export async function startMyTwoFactorAction() {
  const session = await requireAdminSession();
  const back = "/admin/account";
  if (session.owner) redirect("/admin/security");
  if (!canEncrypt()) go(back, { error: "AUTH_SECRET must be set before enabling 2FA." });
  await db(back);
  await AdminUserModel.updateOne({ email: session.email }, { $set: { pendingTotpEnc: encryptSecret(generateTotpSecret()), pendingTotpAt: new Date() } });
  go(back, { setup: "1" });
}

export async function enableMyTwoFactorAction(formData: FormData) {
  const session = await requireAdminSession();
  const back = "/admin/account";
  await db(back);
  const user = (await AdminUserModel.findOne({ email: session.email }).lean()) as { pendingTotpEnc?: string; pendingTotpAt?: Date } | null;
  const pending = user?.pendingTotpEnc ? decryptSecret(user.pendingTotpEnc) : "";
  if (!pending || !user?.pendingTotpAt || Date.now() - new Date(user.pendingTotpAt).getTime() > 15 * 60e3) go(back, { error: "Setup expired. Start again." });
  if (!verifyTotp(pending, text(formData, "code"))) go(back, { setup: "1", error: "That code didn't match. Try again." });
  await AdminUserModel.updateOne({ email: session.email }, { $set: { totpSecretEnc: encryptSecret(pending) }, $unset: { pendingTotpEnc: 1, pendingTotpAt: 1 } });
  await audit(session.email, "account.2fa_enabled", session.email, {}, await ip());
  go(back, { status: "Two-factor login is on for your account." });
}
