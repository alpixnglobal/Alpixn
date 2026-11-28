"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/admin-auth";
import { connectToDatabase } from "@/lib/db";
import { SalesEmailModel, SalesLeadModel } from "@/lib/models";
import { buildDailySummary, processDueSequences, sendStoredEmail } from "@/lib/sales/engine";
import { addTimeline, refreshScore, scoreLead, syncInboundLeads } from "@/lib/sales/leads";
import { STAGES, getSalesSettings, saveSalesSettings, type Sequence } from "@/lib/sales/settings";

const text = (fd: FormData, key: string, max = 500) => String(fd.get(key) ?? "").trim().slice(0, max);
const go = (tab: string, query = "") => redirect(`/admin/sales?tab=${tab}${query}`);
const fail = (tab: string, msg: string, extra = "") => go(tab, `${extra}&error=${encodeURIComponent(msg)}`);
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const DAY = 864e5;

async function db(tab: string) {
  await requireAdminSession("sales");
  try {
    await connectToDatabase();
  } catch {
    fail(tab, "Database unavailable. Check MongoDB connection.");
  }
}

export async function syncInboundAction() {
  await db("pipeline");
  const added = await syncInboundLeads();
  revalidatePath("/admin/sales");
  go("pipeline", `&status=${encodeURIComponent(`${added} new website lead(s) added to the CRM.`)}`);
}

export async function addLeadAction(formData: FormData) {
  await db("add");
  const email = text(formData, "email", 160).toLowerCase();
  const phone = text(formData, "phone", 40);
  if (!email && !phone) fail("add", "Add an email or phone number.");
  if (email && !isEmail(email)) fail("add", "That email address doesn't look right.");
  if (email && (await SalesLeadModel.exists({ email }))) fail("add", "A lead with this email already exists.");
  const basis: "inbound" | "outbound" = text(formData, "basis") === "outbound" ? "outbound" : "inbound";
  if (basis === "outbound" && formData.get("consent") !== "on") fail("add", "Please confirm the contact was obtained lawfully.");
  const lead = {
    name: text(formData, "name", 120),
    email,
    phone,
    company: text(formData, "company", 160),
    title: text(formData, "title", 120),
    website: text(formData, "website", 200),
    country: text(formData, "country", 80),
    service: text(formData, "service", 160),
    source: "manual",
    basis,
    stage: "new",
    value: Number(text(formData, "value", 20)) || 0,
    notes: text(formData, "notes", 3000),
    lastContactedAt: null,
    unsubscribed: false,
  };
  const created = await SalesLeadModel.create({ ...lead, score: scoreLead(lead), nextFollowUpAt: new Date(), timeline: [{ at: new Date(), type: "system", text: `Lead added manually (${basis})`, by: "team" }] });
  revalidatePath("/admin/sales");
  go("pipeline", `&lead=${created._id}&status=saved`);
}

/** CSV columns: name,email,phone,company,title,website,country,service (header row optional). */
export async function importLeadsAction(formData: FormData) {
  await db("add");
  if (formData.get("consent") !== "on") fail("add", "Please confirm these are business contacts obtained lawfully and that you will honour opt-outs.");
  const basis: "inbound" | "outbound" = text(formData, "basis") === "inbound" ? "inbound" : "outbound";
  const rows = text(formData, "csv", 200000)
    .split(/\r?\n/)
    .map((r) => r.split(/,|\t/).map((c) => c.trim().replace(/^"|"$/g, "")))
    .filter((r) => r.some(Boolean));
  if (rows[0]?.some((c) => /^e-?mail$/i.test(c))) rows.shift();
  let added = 0;
  let skipped = 0;
  for (const [name = "", email = "", phone = "", company = "", title = "", website = "", country = "", service = ""] of rows.slice(0, 1000)) {
    const e = email.toLowerCase();
    if ((!e || !isEmail(e)) && !phone) {
      skipped++;
      continue;
    }
    if (e && (await SalesLeadModel.exists({ email: e }))) {
      skipped++;
      continue;
    }
    const lead = { name, email: e, phone, company, title, website, country, service, source: "import", basis, stage: "new", value: 0, lastContactedAt: null, unsubscribed: false };
    await SalesLeadModel.create({ ...lead, score: scoreLead(lead), timeline: [{ at: new Date(), type: "system", text: "Imported from CSV", by: "team" }] });
    added++;
  }
  revalidatePath("/admin/sales");
  go("pipeline", `&status=${encodeURIComponent(`Imported ${added} lead(s). Skipped ${skipped} (duplicates or missing email/phone).`)}`);
}

export async function updateLeadAction(formData: FormData) {
  const id = text(formData, "id", 40);
  await db("pipeline");
  const before = (await SalesLeadModel.findById(id).lean()) as Record<string, unknown> | null;
  if (!before) fail("pipeline", "Lead not found.");
  const stage = STAGES.some((s) => s.key === text(formData, "stage")) ? text(formData, "stage") : String(before!.stage);
  const follow = text(formData, "nextFollowUpAt", 20);
  const email = text(formData, "email", 160).toLowerCase();
  if (email && !isEmail(email)) fail("pipeline", "That email address doesn't look right.", `&lead=${id}`);
  const set: Record<string, unknown> = {
    name: text(formData, "name", 120),
    email,
    phone: text(formData, "phone", 40),
    company: text(formData, "company", 160),
    title: text(formData, "title", 120),
    website: text(formData, "website", 200),
    country: text(formData, "country", 80),
    service: text(formData, "service", 160),
    value: Math.max(0, Number(text(formData, "value", 20)) || 0),
    notes: text(formData, "notes", 5000),
    tags: text(formData, "tags", 400).split(",").map((t) => t.trim()).filter(Boolean).slice(0, 15),
    stage,
    nextFollowUpAt: follow ? new Date(`${follow}T09:00:00+05:30`) : null,
  };
  // A human takes over once the lead replies or moves further: stop automatic emails.
  if (["replied", "meeting", "proposal", "won", "lost"].includes(stage) && (before!.sequence as Record<string, unknown>)?.status === "active") {
    Object.assign(set, { "sequence.status": "stopped", "sequence.nextSendAt": null });
  }
  await SalesLeadModel.updateOne({ _id: id }, { $set: set });
  if (stage !== before!.stage) await addTimeline(id, { type: "stage", text: `Stage: ${String(before!.stage)} → ${stage}`, by: "team" });
  await refreshScore(id);
  revalidatePath("/admin/sales");
  go("pipeline", `&lead=${id}&status=saved`);
}

export async function addNoteAction(formData: FormData) {
  const id = text(formData, "id", 40);
  await db("pipeline");
  const note = text(formData, "note", 3000);
  const type = ["note", "call", "whatsapp"].includes(text(formData, "type")) ? (text(formData, "type") as "note") : "note";
  if (note) {
    await addTimeline(id, { type, text: note, by: "team" });
    if (type !== "note") await SalesLeadModel.updateOne({ _id: id }, { $set: { lastContactedAt: new Date() } });
  }
  revalidatePath("/admin/sales");
  go("pipeline", `&lead=${id}`);
}

export async function enrollAction(formData: FormData) {
  const id = text(formData, "id", 40);
  await db("pipeline");
  const settings = await getSalesSettings();
  const seq = settings.sequences.find((s) => s.id === text(formData, "sequenceId"));
  const lead = (await SalesLeadModel.findById(id).lean()) as Record<string, unknown> | null;
  if (!seq || !lead) fail("pipeline", "Choose a sequence.", `&lead=${id}`);
  if (!lead!.email) fail("pipeline", "This lead has no email address.", `&lead=${id}`);
  if (lead!.unsubscribed) fail("pipeline", "This lead has unsubscribed and can't be emailed.", `&lead=${id}`);
  const next = new Date(Date.now() + (seq!.steps[0]?.delayDays ?? 0) * DAY);
  await SalesLeadModel.updateOne({ _id: id }, { $set: { sequence: { id: seq!.id, step: 0, status: "active", nextSendAt: next }, nextFollowUpAt: next } });
  await addTimeline(id, { type: "system", text: `Started sequence “${seq!.name}”`, by: "team" });
  revalidatePath("/admin/sales");
  go("pipeline", `&lead=${id}&status=${encodeURIComponent(`Sequence started. ${settings.mode === "review" ? "The first email will appear in the Outbox for approval." : "Emails will be sent automatically."}`)}`);
}

export async function stopSequenceAction(formData: FormData) {
  const id = text(formData, "id", 40);
  await db("pipeline");
  await SalesLeadModel.updateOne({ _id: id }, { $set: { "sequence.status": "stopped", "sequence.nextSendAt": null } });
  await SalesEmailModel.updateMany({ leadId: id, status: "draft" }, { $set: { status: "skipped" } });
  await addTimeline(id, { type: "system", text: "Sequence stopped", by: "team" });
  revalidatePath("/admin/sales");
  go("pipeline", `&lead=${id}&status=saved`);
}

export async function deleteLeadAction(formData: FormData) {
  const id = text(formData, "id", 40);
  await db("pipeline");
  await SalesLeadModel.deleteOne({ _id: id });
  await SalesEmailModel.deleteMany({ leadId: id });
  revalidatePath("/admin/sales");
  go("pipeline", "&status=saved");
}

/* ---------------- Outbox ---------------- */

export async function writeDueEmailsAction() {
  await db("outbox");
  const { drafted, sent } = await processDueSequences(5);
  revalidatePath("/admin/sales");
  go("outbox", `&status=${encodeURIComponent(`${drafted} draft(s) written${sent ? `, ${sent} sent` : ""}.`)}`);
}

export async function sendDraftAction(formData: FormData) {
  const id = text(formData, "id", 40);
  await db("outbox");
  await SalesEmailModel.updateOne({ _id: id, status: "draft" }, { $set: { subject: text(formData, "subject", 200), body: text(formData, "body", 6000) } });
  const r = await sendStoredEmail(id, "team");
  revalidatePath("/admin/sales");
  if (!r.ok) fail("outbox", r.error ?? "Could not send.");
  go("outbox", "&status=Email+sent");
}

export async function saveDraftAction(formData: FormData) {
  const id = text(formData, "id", 40);
  await db("outbox");
  await SalesEmailModel.updateOne({ _id: id, status: "draft" }, { $set: { subject: text(formData, "subject", 200), body: text(formData, "body", 6000) } });
  go("outbox", "&status=saved");
}

export async function skipDraftAction(formData: FormData) {
  const id = text(formData, "id", 40);
  await db("outbox");
  const email = (await SalesEmailModel.findById(id).lean()) as Record<string, unknown> | null;
  await SalesEmailModel.updateOne({ _id: id }, { $set: { status: "skipped" } });
  if (email) {
    // Skipping a step moves the sequence on to the next email.
    const settings = await getSalesSettings();
    const seq = settings.sequences.find((s) => s.id === String(email.sequenceId));
    const next = Number(email.step) + 1;
    const set = seq && next < seq.steps.length ? { "sequence.step": next, "sequence.nextSendAt": new Date(Date.now() + seq.steps[next].delayDays * DAY) } : { "sequence.status": "finished", "sequence.nextSendAt": null };
    await SalesLeadModel.updateOne({ _id: String(email.leadId), "sequence.id": String(email.sequenceId), "sequence.step": Number(email.step) }, { $set: set });
  }
  revalidatePath("/admin/sales");
  go("outbox", "&status=saved");
}

/* ---------------- Today & settings ---------------- */

export async function runSummaryAction() {
  await db("today");
  await buildDailySummary();
  revalidatePath("/admin/sales");
  go("today", "&status=saved");
}

export async function saveSalesSettingsAction(formData: FormData) {
  await db("settings");
  const fromEmail = text(formData, "fromEmail", 160);
  if (fromEmail && !isEmail(fromEmail)) fail("settings", "Sender email doesn't look right.");
  let sequences: Sequence[] | undefined;
  try {
    const raw = JSON.parse(text(formData, "sequences", 50000) || "[]") as Sequence[];
    sequences = raw
      .slice(0, 10)
      .map((s, i) => ({
        id: String(s.id || `seq-${i + 1}`).replace(/[^a-z0-9-]/gi, "").toLowerCase() || `seq-${i + 1}`,
        name: String(s.name ?? "").slice(0, 80) || `Sequence ${i + 1}`,
        description: String(s.description ?? "").slice(0, 300),
        steps: (s.steps ?? []).slice(0, 8).map((st) => ({ delayDays: Math.max(0, Math.min(60, Number(st.delayDays) || 0)), instruction: String(st.instruction ?? "").slice(0, 600) })).filter((st) => st.instruction),
      }))
      .filter((s) => s.steps.length);
  } catch {
    sequences = undefined;
  }
  await saveSalesSettings({
    mode: text(formData, "mode") === "auto" ? "auto" : "review",
    fromName: text(formData, "fromName", 80) || "ALPIXN",
    fromEmail,
    replyTo: text(formData, "replyTo", 160),
    dailyLimit: Math.max(1, Math.min(500, Number(text(formData, "dailyLimit", 5)) || 30)),
    pitch: text(formData, "pitch", 2000),
    signature: text(formData, "signature", 500),
    footerAddress: text(formData, "footerAddress", 300),
    summaryEmail: text(formData, "summaryEmail", 160),
    providerId: text(formData, "providerId", 80),
    ...(sequences?.length ? { sequences } : {}),
  });
  revalidatePath("/admin/sales");
  go("settings", "&status=saved");
}
