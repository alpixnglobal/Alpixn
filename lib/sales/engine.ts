import { z } from "zod";
import { generateStructured } from "@/lib/ai/providers";
import { getAiSettings, resolveApiKey, type AiProvider } from "@/lib/ai/settings";
import { connectToDatabase } from "@/lib/db";
import { CONTACT_TO_EMAIL, isMailConfigured, sendRowsEmail } from "@/lib/mailer";
import { SalesEmailModel, SalesLeadModel } from "@/lib/models";
import { addTimeline, refreshScore, toLead, type SalesLead } from "./leads";
import { isSalesMailConfigured, sendSalesEmail } from "./mailer";
import { STAGES, getSalesSettings, saveSalesSettings, type SalesSettings, type Sequence } from "./settings";

const DAY = 864e5;
/** Stages where automatic sequence emails stop (a human takes over). */
const HUMAN_STAGES = ["replied", "meeting", "proposal", "won", "lost"];

async function pickProvider(settings: SalesSettings): Promise<AiProvider | null> {
  const ai = await getAiSettings();
  const preferred = ai.providers.find((p) => p.id === (settings.providerId || ai.defaultProviderId) && p.enabled);
  return (preferred && resolveApiKey(preferred) ? preferred : ai.providers.find((p) => p.enabled && resolveApiKey(p))) ?? null;
}

/* ---------------- AI email writer ---------------- */

const EmailSchema = z.object({ subject: z.string().describe("Short, specific subject line, max 60 characters, no clickbait"), body: z.string().describe("Plain-text email body without greeting placeholders, signature or unsubscribe text") });

export async function writeEmail(opts: { settings: SalesSettings; lead: SalesLead; sequence: Sequence; step: number; previous: { subject: string; body: string }[] }) {
  const { settings, lead, sequence, step } = opts;
  const instruction = sequence.steps[step]?.instruction ?? "Short follow-up.";
  const provider = await pickProvider(settings);
  const firstName = lead.name.split(" ")[0] || "there";
  if (!provider) {
    // No AI configured: simple, honest template the team can edit before sending.
    const templates = [
      { subject: `Your ${lead.service || "project"} enquiry — next steps`, body: `Hi ${firstName},\n\nThank you for getting in touch with ALPIXN about ${lead.service || "your project"}. I'd love to understand your requirements better — would a 20-minute call this week work for you?\n\nIf it's easier, just reply with a few details and we'll send a rough plan and estimate.` },
      { subject: `Following up on ${lead.service || "your project"}`, body: `Hi ${firstName},\n\nJust following up on my last email. Would you prefer a quick call, or shall we send a short written plan and estimate?` },
      { subject: "Any questions I can answer?", body: `Hi ${firstName},\n\nHappy to answer any questions about scope, timeline or budget. Shall I put together a detailed proposal?` },
      { subject: "Closing the loop", body: `Hi ${firstName},\n\nI haven't heard back, so I'll close this request for now. If the timing changes, just reply to this email and we'll pick it up again.` },
    ];
    return templates[Math.min(step, templates.length - 1)];
  }
  const history = opts.previous.map((p, i) => `Email ${i + 1} — Subject: ${p.subject}\n${p.body}`).join("\n\n");
  return generateStructured(provider, {
    system: `You are a senior B2B sales manager with 15 years of experience writing emails for ALPIXN. Write like a thoughtful human: short paragraphs, specific, polite, no hype, no emojis, no exaggerated claims.

About us: ${settings.pitch}

Rules: Never invent statistics, client names, case studies, awards, discounts or guarantees. Do not mention that you are an AI. Do not include a signature, placeholders like [Name], links, or unsubscribe text — they are added automatically. Start with "Hi ${firstName}," (or "Hi there," if the name is unknown). Write in English unless the lead's notes are clearly in another language.`,
    prompt: `Lead:\n${JSON.stringify({ name: lead.name, company: lead.company, title: lead.title, website: lead.website, country: lead.country, interest: lead.service, relationship: lead.basis === "inbound" ? "They contacted us first (inbound enquiry)" : "Business contact we have not spoken to before (cold outreach)", notes: [lead.notes, ...lead.timeline.filter((t) => t.type !== "email").slice(0, 5).map((t) => t.text)].join("\n").slice(0, 2500) })}\n\nSequence: ${sequence.name}, email ${step + 1} of ${sequence.steps.length}.\nThis email should: ${instruction}\n\n${history ? `Emails already sent:\n${history}` : "This is the first email."}`,
    schema: EmailSchema,
    name: "sales_email",
    effort: "low",
  });
}

/* ---------------- sending & sequence progress ---------------- */

async function sentToday() {
  return SalesEmailModel.countDocuments({ status: "sent", sentAt: { $gte: new Date(Date.now() - DAY) } });
}

/** Sends one stored email and advances the lead's sequence. */
export async function sendStoredEmail(emailId: string, by = "team") {
  await connectToDatabase();
  const settings = await getSalesSettings();
  const email = (await SalesEmailModel.findById(emailId).lean()) as Record<string, unknown> | null;
  if (!email || email.status === "sent") return { ok: false, error: "Email not found or already sent." };
  const leadDoc = (await SalesLeadModel.findById(String(email.leadId)).lean()) as Record<string, unknown> | null;
  if (!leadDoc) return { ok: false, error: "Lead not found." };
  const lead = toLead(leadDoc);
  if (lead.unsubscribed) {
    await SalesEmailModel.updateOne({ _id: emailId }, { $set: { status: "skipped", error: "Lead unsubscribed" } });
    return { ok: false, error: "This lead has unsubscribed." };
  }
  if (!isSalesMailConfigured()) return { ok: false, error: "Email sending is not set up. Add SALES_SMTP_USER / SALES_SMTP_PASS (or SMTP_USER / SMTP_PASS) on the server." };
  if ((await sentToday()) >= settings.dailyLimit) return { ok: false, error: `Daily sending limit (${settings.dailyLimit}) reached. It will continue tomorrow.` };
  try {
    await sendSalesEmail({ settings, leadId: lead.id, to: String(email.to || lead.email), subject: String(email.subject), body: String(email.body) });
  } catch (e) {
    const msg = e instanceof Error ? e.message.slice(0, 300) : "Send failed";
    await SalesEmailModel.updateOne({ _id: emailId }, { $set: { status: "failed", error: msg } });
    return { ok: false, error: msg };
  }
  const now = new Date();
  await SalesEmailModel.updateOne({ _id: emailId }, { $set: { status: "sent", sentAt: now, error: "" } });

  const seq = settings.sequences.find((s) => s.id === String(email.sequenceId));
  const update: Record<string, unknown> = { lastContactedAt: now };
  if (lead.stage === "new") update.stage = "contacted";
  if (seq && lead.sequence.id === seq.id && Number(email.step) === lead.sequence.step) {
    const nextStep = lead.sequence.step + 1;
    if (nextStep >= seq.steps.length) {
      Object.assign(update, { "sequence.step": nextStep, "sequence.status": "finished", "sequence.nextSendAt": null, nextFollowUpAt: new Date(now.getTime() + 3 * DAY) });
    } else {
      const next = new Date(now.getTime() + seq.steps[nextStep].delayDays * DAY);
      Object.assign(update, { "sequence.step": nextStep, "sequence.nextSendAt": next, nextFollowUpAt: next });
    }
  }
  await SalesLeadModel.updateOne({ _id: lead.id }, { $set: update });
  await addTimeline(lead.id, { type: "email", text: `Email sent: ${String(email.subject)}`, by });
  await refreshScore(lead.id);
  return { ok: true };
}

/**
 * Writes the emails that are due. In "review" mode they wait in the Outbox for approval; in "auto"
 * mode they are sent right away (within the daily limit). Returns counts.
 */
export async function processDueSequences(max = 15) {
  await connectToDatabase();
  const settings = await getSalesSettings();
  const due = (await SalesLeadModel.find({
    "sequence.status": "active",
    "sequence.nextSendAt": { $lte: new Date() },
    unsubscribed: false,
    stage: { $nin: HUMAN_STAGES },
    email: { $ne: "" },
  })
    .limit(max)
    .lean()) as Record<string, unknown>[];

  let drafted = 0;
  let sent = 0;
  for (const doc of due) {
    const lead = toLead(doc);
    const seq = settings.sequences.find((s) => s.id === lead.sequence.id);
    if (!seq || lead.sequence.step >= seq.steps.length) {
      await SalesLeadModel.updateOne({ _id: lead.id }, { $set: { "sequence.status": "finished" } });
      continue;
    }
    // One draft per step only.
    const existing = (await SalesEmailModel.findOne({ leadId: lead.id, sequenceId: seq.id, step: lead.sequence.step, status: { $in: ["draft", "sent"] } }).lean()) as Record<string, unknown> | null;
    let emailId = existing ? String(existing._id) : "";
    if (!existing) {
      const previous = ((await SalesEmailModel.find({ leadId: lead.id, status: "sent" }).sort({ createdAt: 1 }).lean()) as Record<string, unknown>[]).map((e) => ({ subject: String(e.subject), body: String(e.body) }));
      try {
        const written = await writeEmail({ settings, lead, sequence: seq, step: lead.sequence.step, previous });
        const created = await SalesEmailModel.create({ leadId: lead.id, sequenceId: seq.id, step: lead.sequence.step, to: lead.email, subject: written.subject.slice(0, 200), body: written.body.slice(0, 6000), status: "draft" });
        emailId = String(created._id);
        drafted++;
      } catch (e) {
        await addTimeline(lead.id, { type: "system", text: `Could not write email: ${e instanceof Error ? e.message.slice(0, 200) : "AI error"}`, by: "ai" });
        continue;
      }
    }
    if (settings.mode === "auto" && existing?.status !== "sent") {
      const r = await sendStoredEmail(emailId, "autopilot");
      if (r.ok) sent++;
      else if (r.error?.startsWith("Daily sending limit")) break;
    }
  }
  return { drafted, sent };
}

/* ---------------- daily summary ---------------- */

export async function buildDailySummary() {
  await connectToDatabase();
  const settings = await getSalesSettings();
  const leads = ((await SalesLeadModel.find({}).lean()) as Record<string, unknown>[]).map(toLead);
  const now = Date.now();
  const open = leads.filter((l) => !["won", "lost"].includes(l.stage));
  const dueToday = open.filter((l) => l.nextFollowUpAt && Date.parse(l.nextFollowUpAt) <= now + DAY).sort((a, b) => b.score - a.score);
  const hot = open.filter((l) => l.score >= 60).sort((a, b) => b.score - a.score).slice(0, 8);
  const stuck = open.filter((l) => ["meeting", "proposal"].includes(l.stage) && (!l.lastContactedAt || now - Date.parse(l.lastContactedAt) > 7 * DAY));
  const newLeads = leads.filter((l) => now - Date.parse(l.createdAt) < DAY);
  const drafts = await SalesEmailModel.countDocuments({ status: "draft" });
  const pipelineValue = open.reduce((s, l) => s + (l.value || 0), 0);
  const byStage = STAGES.map((s) => `${s.label}: ${leads.filter((l) => l.stage === s.key).length}`).join(" · ");
  const line = (l: SalesLead) => `${l.name || l.email}${l.company ? ` (${l.company})` : ""} — ${l.stage}${l.service ? `, ${l.service}` : ""}, score ${l.score}`;

  const facts = [
    `Pipeline: ${byStage}. Open pipeline value: ₹${pipelineValue.toLocaleString("en-IN")}.`,
    `New leads in the last 24h: ${newLeads.length}. Email drafts waiting for approval: ${drafts}.`,
    `Follow-ups due today (${dueToday.length}):\n${dueToday.slice(0, 10).map(line).join("\n") || "none"}`,
    `Hot leads:\n${hot.map(line).join("\n") || "none"}`,
    `Deals with no contact for 7+ days in meeting/proposal stage:\n${stuck.map(line).join("\n") || "none"}`,
  ].join("\n\n");

  let text = facts;
  const provider = await pickProvider(settings);
  if (provider) {
    try {
      const out = await generateStructured(provider, {
        system: "You are an experienced sales manager. Turn the pipeline facts into a short, practical morning briefing for the ALPIXN team: top 3–5 priorities with who to contact and what to say, then risks. Use only the facts given; do not invent names or numbers. Plain text with short bullet points.",
        prompt: facts,
        schema: z.object({ briefing: z.string() }),
        name: "sales_briefing",
        effort: "low",
      });
      text = `${out.briefing.trim()}\n\n— Facts —\n${facts}`;
    } catch {
      /* keep the factual summary */
    }
  }
  await saveSalesSettings({ summary: { at: new Date().toISOString(), text } });
  if (isMailConfigured() && settings.summaryEmail) {
    await sendRowsEmail({
      to: settings.summaryEmail,
      subject: `Sales briefing — ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short" })}: ${dueToday.length} follow-ups, ${newLeads.length} new leads`,
      heading: "Today's sales briefing",
      rows: [
        ["Follow-ups due", String(dueToday.length)],
        ["New leads (24h)", String(newLeads.length)],
        ["Drafts to approve", String(drafts)],
      ],
      messageLabel: "Briefing",
      message: text,
      replyName: "ALPIXN CRM",
      replyEmail: CONTACT_TO_EMAIL,
    }).catch(() => {});
  }
  return text;
}
