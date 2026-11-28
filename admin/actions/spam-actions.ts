"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/admin-auth";
import { DEFAULT_SPAM_SETTINGS, getSpamSettings, saveSpamSettings } from "@/lib/spam";

const lines = (v: FormDataEntryValue | null, lower = true) =>
  String(v ?? "")
    .split(/[\n,]/)
    .map((x) => (lower ? x.trim().toLowerCase() : x.trim()))
    .filter(Boolean)
    .slice(0, 500);

async function save(data: Parameters<typeof saveSpamSettings>[0], back: string) {
  try {
    await saveSpamSettings(data);
  } catch {
    redirect(`${back}${back.includes("?") ? "&" : "?"}error=${encodeURIComponent("Database unavailable. Check MongoDB connection.")}`);
  }
}

export async function saveSpamSettingsAction(formData: FormData) {
  await requireAdminSession();
  const threshold = Number(formData.get("threshold"));
  await save(
    {
      enabled: formData.get("enabled") === "on",
      threshold: Number.isFinite(threshold) ? Math.max(20, Math.min(150, threshold)) : DEFAULT_SPAM_SETTINGS.threshold,
      checkMx: formData.get("checkMx") === "on",
      blockedEmails: lines(formData.get("blockedEmails")),
      blockedDomains: lines(formData.get("blockedDomains")).map((d) => d.replace(/^@/, "")),
      blockedIps: lines(formData.get("blockedIps")),
      keywords: lines(formData.get("keywords")),
    },
    "/admin/spam"
  );
  revalidatePath("/admin/spam");
  redirect("/admin/spam?status=saved");
}

/** Adds the sender's email to the blocklist (used from the Inbox). */
export async function blockSenderAction(formData: FormData) {
  await requireAdminSession();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const back = String(formData.get("back") ?? "/admin/inbox");
  if (email) {
    const s = await getSpamSettings();
    if (!s.blockedEmails.includes(email)) await save({ ...s, blockedEmails: [...s.blockedEmails, email] }, back);
  }
  redirect(`${back}${back.includes("?") ? "&" : "?"}saved=1`);
}
