import { connectToDatabase } from "@/lib/db";
import { ChatLeadModel, ContactMessageModel, SalesEmailModel, SalesLeadModel } from "@/lib/models";

export type TimelineEntry = { at: string; type: "note" | "email" | "stage" | "system" | "call" | "whatsapp"; text: string; by: string };

export type SalesLead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  title: string;
  website: string;
  country: string;
  service: string;
  source: string;
  basis: "inbound" | "outbound";
  stage: string;
  value: number;
  score: number;
  tags: string[];
  notes: string;
  timeline: TimelineEntry[];
  nextFollowUpAt: string | null;
  lastContactedAt: string | null;
  unsubscribed: boolean;
  sequence: { id: string; step: number; status: string; nextSendAt: string | null };
  createdAt: string;
  updatedAt: string;
};

const iso = (d: unknown) => (d ? new Date(d as string).toISOString() : null);

export function toLead(d: Record<string, unknown>): SalesLead {
  const seq = (d.sequence ?? {}) as Record<string, unknown>;
  return {
    id: String(d._id),
    name: String(d.name ?? ""),
    email: String(d.email ?? ""),
    phone: String(d.phone ?? ""),
    company: String(d.company ?? ""),
    title: String(d.title ?? ""),
    website: String(d.website ?? ""),
    country: String(d.country ?? ""),
    service: String(d.service ?? ""),
    source: String(d.source ?? "manual"),
    basis: d.basis === "outbound" ? "outbound" : "inbound",
    stage: String(d.stage ?? "new"),
    value: Number(d.value ?? 0),
    score: Number(d.score ?? 0),
    tags: (d.tags as string[]) ?? [],
    notes: String(d.notes ?? ""),
    timeline: ((d.timeline as Record<string, unknown>[]) ?? []).map((t) => ({ at: iso(t.at) ?? "", type: (t.type as TimelineEntry["type"]) ?? "note", text: String(t.text ?? ""), by: String(t.by ?? "") })),
    nextFollowUpAt: iso(d.nextFollowUpAt),
    lastContactedAt: iso(d.lastContactedAt),
    unsubscribed: Boolean(d.unsubscribed),
    sequence: { id: String(seq.id ?? ""), step: Number(seq.step ?? 0), status: String(seq.status ?? ""), nextSendAt: iso(seq.nextSendAt) },
    createdAt: iso(d.createdAt) ?? "",
    updatedAt: iso(d.updatedAt) ?? "",
  };
}

/** Simple, explainable lead score (0–100). */
export function scoreLead(l: Pick<SalesLead, "basis" | "phone" | "email" | "company" | "stage" | "value" | "lastContactedAt" | "service" | "unsubscribed">) {
  if (l.unsubscribed || l.stage === "lost") return 0;
  let s = 0;
  if (l.basis === "inbound") s += 30;
  if (l.email) s += 10;
  if (l.phone) s += 10;
  if (l.company) s += 5;
  if (l.service) s += 5;
  s += { new: 0, contacted: 5, replied: 20, meeting: 30, proposal: 35, won: 40 }[l.stage as "new"] ?? 0;
  if (l.value >= 500000) s += 10;
  else if (l.value >= 100000) s += 5;
  if (l.lastContactedAt && Date.now() - Date.parse(l.lastContactedAt) < 7 * 864e5) s += 5;
  return Math.min(100, s);
}

export async function listLeads(): Promise<SalesLead[]> {
  await connectToDatabase();
  const docs = (await SalesLeadModel.find({}).sort({ updatedAt: -1 }).limit(2000).lean()) as Record<string, unknown>[];
  return docs.map(toLead);
}

export async function addTimeline(id: string, entry: Omit<TimelineEntry, "at"> & { at?: Date }) {
  await SalesLeadModel.updateOne({ _id: id }, { $push: { timeline: { $each: [{ ...entry, at: entry.at ?? new Date() }], $position: 0, $slice: 200 } } });
}

export async function refreshScore(id: string) {
  const d = (await SalesLeadModel.findById(id).lean()) as Record<string, unknown> | null;
  if (d) await SalesLeadModel.updateOne({ _id: id }, { $set: { score: scoreLead(toLead(d)) } });
}

/** Copies website enquiries (contact form, hire-developer form, chat robot) into the CRM. Safe to run repeatedly. */
export async function syncInboundLeads() {
  await connectToDatabase();
  let added = 0;
  const contacts = (await ContactMessageModel.find({}).lean()) as Record<string, unknown>[];
  const chats = (await ChatLeadModel.find({}).lean()) as Record<string, unknown>[];
  const items = [
    ...contacts.map((d) => ({
      ref: `contact:${d._id}`,
      name: `${d.firstName ?? ""} ${d.lastName && d.lastName !== "-" ? d.lastName : ""}`.trim(),
      email: String(d.email ?? "").toLowerCase(),
      phone: String(d.phone ?? ""),
      company: "",
      service: String(d.interest ?? "").replace(/-/g, " "),
      source: String(d.interest ?? "").startsWith("hire-developers") ? "offshore-form" : "contact-form",
      note: String(d.message ?? ""),
      at: d.createdAt as Date,
    })),
    ...chats.map((d) => ({
      ref: `chat:${d._id}`,
      name: String(d.name ?? ""),
      email: String(d.email ?? "").toLowerCase(),
      phone: String(d.phone ?? ""),
      company: String(d.company ?? ""),
      service: String(d.service ?? ""),
      source: "chat-robot",
      note: [String((d.requirements as Record<string, unknown>)?.projectDetails ?? ""), d.budget ? `Budget: ${d.budget}` : "", d.estimate ? `Estimate shown:\n${d.estimate}` : ""].filter(Boolean).join("\n"),
      at: d.createdAt as Date,
    })),
  ];
  for (const it of items) {
    if (!it.email && !it.phone) continue;
    if (await SalesLeadModel.exists({ inboxRef: it.ref })) continue;
    const existing = it.email ? ((await SalesLeadModel.findOne({ email: it.email }).lean()) as Record<string, unknown> | null) : null;
    if (existing) {
      await SalesLeadModel.updateOne({ _id: existing._id }, { $set: { inboxRef: it.ref } });
      await addTimeline(String(existing._id), { type: "system", text: `New enquiry via ${it.source}: ${it.note.slice(0, 500)}`, by: "website" });
      continue;
    }
    const lead = { name: it.name, email: it.email, phone: it.phone, company: it.company, service: it.service, source: it.source, basis: "inbound" as const, stage: "new", value: 0, lastContactedAt: null, unsubscribed: false };
    await SalesLeadModel.create({
      ...lead,
      inboxRef: it.ref,
      score: scoreLead(lead),
      nextFollowUpAt: new Date(),
      timeline: [{ at: it.at ?? new Date(), type: "system", text: `Enquiry via ${it.source}${it.note ? `:\n${it.note.slice(0, 1500)}` : ""}`, by: "website" }],
    });
    added++;
  }
  return added;
}

export async function getLeadEmails(leadId: string) {
  await connectToDatabase();
  return (await SalesEmailModel.find({ leadId }).sort({ createdAt: -1 }).limit(50).lean()) as Record<string, unknown>[];
}
