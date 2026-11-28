import { connectToDatabase } from "@/lib/db";
import { CONTACT_TO_EMAIL, isMailConfigured, sendRowsEmail } from "@/lib/mailer";
import { ChatLeadModel } from "@/lib/models";
import { assessSubmission } from "@/lib/spam";

/** Everything the assistant has learned about the visitor's project. */
export type LeadState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  service: string;
  projectDetails: string;
  features: string[];
  thirdPartyApis: string[];
  domainHosting: string;
  references: string;
  budget: string;
  timeline: string;
};

export const EMPTY_LEAD: LeadState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  country: "",
  service: "",
  projectDetails: "",
  features: [],
  thirdPartyApis: [],
  domainHosting: "",
  references: "",
  budget: "",
  timeline: "",
};

const clip = (v: unknown, n = 500) => String(v ?? "").trim().slice(0, n);
const clipList = (v: unknown) => (Array.isArray(v) ? v.map((x) => clip(x, 120)).filter(Boolean).slice(0, 20) : []);

/** Accepts untrusted input from the browser and returns a clean lead object. */
export function sanitizeLead(input: unknown): LeadState {
  const o = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  return {
    name: clip(o.name, 120),
    email: clip(o.email, 160).toLowerCase(),
    phone: clip(o.phone, 40),
    company: clip(o.company, 160),
    country: clip(o.country, 80),
    service: clip(o.service, 160),
    projectDetails: clip(o.projectDetails, 3000),
    features: clipList(o.features),
    thirdPartyApis: clipList(o.thirdPartyApis),
    domainHosting: clip(o.domainHosting, 200),
    references: clip(o.references, 1000),
    budget: clip(o.budget, 120),
    timeline: clip(o.timeline, 120),
  };
}

export const hasContact = (l: LeadState) => Boolean(l.name && (/^\S+@\S+\.\S+$/.test(l.email) || l.phone.replace(/\D/g, "").length >= 7));

export type Transcript = { role: "user" | "assistant"; text: string }[];

/**
 * Creates or updates the lead for this chat session. Emails the team once, the first time an
 * estimate is shared with a visitor who left contact details.
 */
export async function saveChatLead(opts: { sessionId: string; lead: LeadState; transcript: Transcript; estimate?: string; pagePath?: string; ip?: string }) {
  if (!/^[a-zA-Z0-9-]{8,64}$/.test(opts.sessionId) || !hasContact(opts.lead)) return { saved: false };
  await connectToDatabase();
  const l = opts.lead;
  const transcript = opts.transcript.slice(-60).map((t) => ({ role: t.role === "assistant" ? "assistant" : "user", text: clip(t.text, 2000) }));
  const existing = (await ChatLeadModel.findOne({ sessionId: opts.sessionId }, { emailed: 1, status: 1 }).lean()) as { emailed?: boolean; status?: string } | null;
  // Spam check once, when the lead is first saved.
  let spamFields: Record<string, unknown> = {};
  if (!existing) {
    const verdict = await assessSubmission({ ip: opts.ip ?? "unknown", form: "chat", email: l.email, name: l.name, texts: [l.projectDetails, l.references, l.company], noFormChecks: true });
    if (verdict.action === "drop") return { saved: false };
    if (verdict.action === "spam") spamFields = { status: "spam", spamReasons: verdict.reasons };
  }
  const isSpam = existing?.status === "spam" || spamFields.status === "spam";
  await ChatLeadModel.updateOne(
    { sessionId: opts.sessionId },
    {
      $set: {
        sessionId: opts.sessionId,
        name: l.name,
        email: l.email,
        phone: l.phone,
        company: l.company,
        service: l.service,
        budget: l.budget,
        timeline: l.timeline,
        requirements: l,
        transcript,
        pagePath: clip(opts.pagePath, 200),
        ...(opts.estimate ? { estimate: opts.estimate } : {}),
        ...spamFields,
      },
      ...(spamFields.status ? {} : { $setOnInsert: { status: "new" } }),
    },
    { upsert: true }
  );

  if (opts.estimate && !existing?.emailed && !isSpam && isMailConfigured()) {
    try {
      await sendRowsEmail({
        to: CONTACT_TO_EMAIL,
        subject: `New project enquiry from the website assistant: ${l.service || "Project"} — ${l.name}`,
        heading: "New enquiry from the AI assistant",
        rows: [
          ["Name", l.name],
          ["Email", l.email],
          ["Phone / WhatsApp", l.phone],
          ["Company", l.company],
          ["Country", l.country],
          ["Service", l.service],
          ["Features", l.features.join(", ")],
          ["Third-party APIs", l.thirdPartyApis.join(", ")],
          ["Domain & hosting", l.domainHosting],
          ["References / design", l.references],
          ["Client budget", l.budget],
          ["Timeline", l.timeline],
          ["Page", opts.pagePath ?? ""],
        ],
        messageLabel: "Project details and estimate shown to the client",
        message: `${l.projectDetails}\n\nEstimate (not final):\n${opts.estimate}`,
        replyName: l.name,
        replyEmail: l.email || CONTACT_TO_EMAIL,
      });
      await ChatLeadModel.updateOne({ sessionId: opts.sessionId }, { $set: { emailed: true } });
    } catch {
      // The lead is stored in the inbox even if email fails.
    }
  }
  return { saved: true };
}
