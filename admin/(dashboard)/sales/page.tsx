import type { Metadata } from "next";
import Link from "next/link";
import { CalendarClock, Flame, Inbox, Mail, MessageSquare, Phone, PlusCircle, RefreshCw, Search, Send, Settings2, SkipForward, Sparkles, Square, Trash2, TrendingUp, UserPlus, Wand2 } from "lucide-react";

import {
  addLeadAction,
  addNoteAction,
  deleteLeadAction,
  enrollAction,
  importLeadsAction,
  runSummaryAction,
  saveDraftAction,
  saveSalesSettingsAction,
  sendDraftAction,
  skipDraftAction,
  stopSequenceAction,
  syncInboundAction,
  updateLeadAction,
  writeDueEmailsAction,
} from "@/admin/actions/sales-actions";
import { AdminField, AdminInput, AdminShell, AdminTextarea, StatusNotice, adminCardClassName, getAdminFlashMessage } from "@/components/admin/admin-ui";
import { SequencesEditor } from "@/components/admin/sequences-editor";
import { SubmitButton } from "@/components/admin/submit-button";
import { getAiSettings } from "@/lib/ai/settings";
import { connectToDatabase } from "@/lib/db";
import { SalesEmailModel } from "@/lib/models";
import { getLeadEmails, listLeads, type SalesLead } from "@/lib/sales/leads";
import { isSalesMailConfigured } from "@/lib/sales/mailer";
import { STAGES, getSalesSettings } from "@/lib/sales/settings";

export const metadata: Metadata = { title: "Sales CRM" };

type Params = { tab?: string; lead?: string; stage?: string; q?: string; status?: string; error?: string };

const card = `${adminCardClassName} p-5 sm:p-6`;
const h2 = "font-display text-[16px] font-bold text-fg";
const sub = "mt-0.5 text-[13px] text-fg-muted";
const select = "admin-input w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-[14px] text-fg outline-none focus:border-[#0878d1]";
const ghost = "inline-flex items-center gap-1.5 rounded-xl border border-line px-3 py-2 text-[12.5px] font-semibold text-fg hover:border-[#d99a19]/60";
const stageOf = (k: string) => STAGES.find((s) => s.key === k) ?? STAGES[0];
const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
/** Leads with a follow-up due within the next 24 hours. */
function countDue(leads: SalesLead[], now = new Date().getTime()) {
  return leads.filter((l) => l.nextFollowUpAt && Date.parse(l.nextFollowUpAt) <= now + 864e5).length;
}
const day = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "—");

export default async function SalesPage({ searchParams }: { searchParams: Promise<Params> }) {
  const p = await searchParams;
  const tab = ["outbox", "today", "add", "settings"].includes(p.tab ?? "") ? p.tab! : "pipeline";
  const known = ["saved", "created"];
  const flash = p.status && !known.includes(p.status) ? { tone: "success" as const, message: p.status } : getAdminFlashMessage(p.status, p.error);

  let dbOk = true;
  try {
    await connectToDatabase();
  } catch {
    dbOk = false;
  }

  return (
    <AdminShell title="Sales CRM" description="Every lead in one place, AI-written follow-up emails, and a daily sales briefing." activePath="/admin/sales">
      {flash ? <StatusNotice tone={flash.tone} message={flash.message} /> : null}
      {!dbOk ? <StatusNotice tone="error" message="Database unavailable. The CRM needs MongoDB (MONGODB_URI)." /> : null}
      <nav className="mb-5 inline-flex flex-wrap rounded-2xl border border-line bg-surface p-1">
        {[
          { key: "pipeline", label: "Pipeline", icon: TrendingUp },
          { key: "outbox", label: "Outbox", icon: Send },
          { key: "today", label: "Today", icon: Sparkles },
          { key: "add", label: "Add leads", icon: UserPlus },
          { key: "settings", label: "Settings", icon: Settings2 },
        ].map((t) => (
          <Link key={t.key} href={`/admin/sales?tab=${t.key}`} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-[13.5px] font-semibold ${tab === t.key ? "bg-[linear-gradient(135deg,#071a33,#064a87)] text-white" : "text-fg-muted hover:text-fg"}`}>
            <t.icon className="h-4 w-4" />
            {t.label}
          </Link>
        ))}
      </nav>
      {dbOk ? tab === "outbox" ? <OutboxTab /> : tab === "today" ? <TodayTab /> : tab === "add" ? <AddTab /> : tab === "settings" ? <SettingsTab /> : <PipelineTab p={p} /> : null}
    </AdminShell>
  );
}

/* ---------------- Pipeline ---------------- */

async function PipelineTab({ p }: { p: Params }) {
  const [leads, settings] = await Promise.all([listLeads(), getSalesSettings()]);
  const drafts = await SalesEmailModel.countDocuments({ status: "draft" });
  const q = (p.q ?? "").toLowerCase().trim();
  const filtered = leads.filter((l) => (!p.stage || l.stage === p.stage) && (!q || `${l.name} ${l.email} ${l.company} ${l.phone} ${l.service}`.toLowerCase().includes(q)));
  const sorted = [...filtered].sort((a, b) => b.score - a.score || (a.updatedAt < b.updatedAt ? 1 : -1));
  const selected = leads.find((l) => l.id === p.lead) ?? sorted[0];
  const open = leads.filter((l) => !["won", "lost"].includes(l.stage));
  const due = countDue(open);
  const qs = (extra: Record<string, string | undefined>) =>
    "/admin/sales?" +
    new URLSearchParams(Object.fromEntries(Object.entries({ tab: "pipeline", stage: p.stage, q: p.q, ...extra }).filter(([, v]) => v)) as Record<string, string>).toString();

  return (
    <div className="grid gap-5">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Open leads", value: open.length, icon: TrendingUp },
          { label: "Follow-ups due today", value: due, icon: CalendarClock },
          { label: "Emails waiting for approval", value: drafts, icon: Mail },
          { label: "Open pipeline value", value: inr(open.reduce((s, l) => s + l.value, 0)), icon: Flame },
        ].map((m) => (
          <div key={m.label} className={`${adminCardClassName} flex items-center gap-3 p-4`}>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[linear-gradient(135deg,#071a33,#064a87)] text-[#f6d77a]">
              <m.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-[20px] font-bold text-fg">{m.value}</p>
              <p className="text-[12px] text-fg-muted">{m.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link href={qs({ stage: undefined, lead: undefined })} className={`rounded-full border px-3 py-1.5 text-[12.5px] font-semibold ${!p.stage ? "border-[#0878d1] bg-[#0878d1] text-white" : "border-line bg-surface text-fg-muted"}`}>
          All {leads.length}
        </Link>
        {STAGES.map((s) => (
          <Link key={s.key} href={qs({ stage: s.key, lead: undefined })} className={`rounded-full border px-3 py-1.5 text-[12.5px] font-semibold ${p.stage === s.key ? "border-transparent text-white" : "border-line bg-surface text-fg-muted"}`} style={p.stage === s.key ? { background: s.tone } : undefined}>
            {s.label} {leads.filter((l) => l.stage === s.key).length}
          </Link>
        ))}
        <form action="/admin/sales" className="relative ml-auto">
          <input type="hidden" name="tab" value="pipeline" />
          {p.stage ? <input type="hidden" name="stage" value={p.stage} /> : null}
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" />
          <AdminInput name="q" defaultValue={p.q} placeholder="Search leads…" className="w-56 pl-9" />
        </form>
        <form action={syncInboundAction}>
          <button className={ghost}>
            <RefreshCw className="h-3.5 w-3.5" /> Sync website leads
          </button>
        </form>
      </div>

      <div className="grid gap-5 xl:grid-cols-[400px_minmax(0,1fr)] xl:items-start">
        <section className={`${adminCardClassName} overflow-hidden`}>
          <ul className="max-h-[70vh] divide-y divide-line overflow-y-auto">
            {sorted.map((l) => {
              const st = stageOf(l.stage);
              return (
                <li key={l.id}>
                  <Link href={qs({ lead: l.id })} scroll={false} className={`flex items-start gap-3 px-4 py-3 ${selected?.id === l.id ? "bg-[#0878d1]/8" : "hover:bg-surface-2"}`}>
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full text-[12px] font-bold text-white" style={{ background: st.tone }}>
                      {(l.name || l.email || "?").slice(0, 1).toUpperCase()}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="truncate text-[14px] font-semibold text-fg">{l.name || l.email || l.phone}</span>
                        <span className="shrink-0 rounded-full bg-surface-2 px-2 py-0.5 text-[10.5px] font-bold text-fg-muted">{l.score}</span>
                      </span>
                      <span className="block truncate text-[12.5px] text-fg-muted">{[l.company, l.service].filter(Boolean).join(" · ") || l.email}</span>
                      <span className="mt-1 flex items-center gap-2 text-[11px] text-fg-subtle">
                        <span style={{ color: st.tone }} className="font-semibold">
                          {st.label}
                        </span>
                        {l.sequence.status === "active" ? <span className="text-[#1f9d55]">● sequence</span> : null}
                        {l.unsubscribed ? <span className="text-red-500">unsubscribed</span> : null}
                        {l.nextFollowUpAt ? <span>follow-up {day(l.nextFollowUpAt)}</span> : null}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
            {!sorted.length ? (
              <li className="p-6 text-center text-[13px] text-fg-muted">
                No leads yet. Click <strong>Sync website leads</strong> or add leads.
              </li>
            ) : null}
          </ul>
        </section>
        {selected ? <LeadPanel lead={selected} sequences={settings.sequences} mode={settings.mode} /> : <section className={card}>Select a lead.</section>}
      </div>
    </div>
  );
}

async function LeadPanel({ lead, sequences, mode }: { lead: SalesLead; sequences: { id: string; name: string; steps: unknown[] }[]; mode: string }) {
  const emails = await getLeadEmails(lead.id);
  const seq = sequences.find((s) => s.id === lead.sequence.id);
  return (
    <section className={`${card} grid gap-5`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-[18px] font-bold text-fg">{lead.name || lead.email}</h2>
          <p className="text-[13px] text-fg-muted">
            {lead.basis === "inbound" ? "Inbound" : "Outbound"} · {lead.source} · added {day(lead.createdAt)} · score {lead.score}
          </p>
        </div>
        <div className="flex gap-2">
          {lead.email ? (
            <a href={`mailto:${lead.email}`} className={ghost}>
              <Mail className="h-3.5 w-3.5" /> Email
            </a>
          ) : null}
          {lead.phone ? (
            <a href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`} target="_blank" className={ghost}>
              <MessageSquare className="h-3.5 w-3.5" /> WhatsApp
            </a>
          ) : null}
          {lead.phone ? (
            <a href={`tel:${lead.phone}`} className={ghost}>
              <Phone className="h-3.5 w-3.5" /> Call
            </a>
          ) : null}
        </div>
      </div>

      <form action={updateLeadAction} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <input type="hidden" name="id" value={lead.id} />
        <AdminField label="Stage">
          <select name="stage" defaultValue={lead.stage} className={select}>
            {STAGES.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </AdminField>
        <AdminField label="Deal value (₹)">
          <AdminInput name="value" type="number" min={0} defaultValue={String(lead.value || "")} />
        </AdminField>
        <AdminField label="Next follow-up">
          <AdminInput name="nextFollowUpAt" type="date" defaultValue={lead.nextFollowUpAt ? new Date(Date.parse(lead.nextFollowUpAt) + 5.5 * 3600e3).toISOString().slice(0, 10) : ""} />
        </AdminField>
        {(["name", "email", "phone", "company", "title", "website", "country", "service"] as const).map((f) => (
          <AdminField key={f} label={f[0].toUpperCase() + f.slice(1)}>
            <AdminInput name={f} defaultValue={lead[f]} />
          </AdminField>
        ))}
        <AdminField label="Tags (comma separated)">
          <AdminInput name="tags" defaultValue={lead.tags.join(", ")} />
        </AdminField>
        <div className="sm:col-span-2 lg:col-span-3">
          <AdminField label="Notes (requirements, budget, decision makers)">
            <AdminTextarea name="notes" defaultValue={lead.notes} className="min-h-20" />
          </AdminField>
        </div>
        <div className="flex flex-wrap justify-between gap-2 sm:col-span-2 lg:col-span-3">
          <button formAction={deleteLeadAction} className={`${ghost} text-red-500`}>
            <Trash2 className="h-3.5 w-3.5" /> Delete lead
          </button>
          <button type="submit" className="btn-brand !px-4 !py-2 text-[13px]">
            Save lead
          </button>
        </div>
      </form>

      <div className="rounded-2xl border border-line bg-canvas p-4">
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-fg-subtle">AI email sequence</p>
        {lead.unsubscribed ? (
          <p className="mt-2 text-[13px] text-red-500">This lead unsubscribed — no more emails will be sent.</p>
        ) : lead.sequence.status === "active" && seq ? (
          <form action={stopSequenceAction} className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <input type="hidden" name="id" value={lead.id} />
            <p className="text-[13.5px] text-fg">
              <strong>{seq.name}</strong> — email {lead.sequence.step + 1} of {seq.steps.length}, due {day(lead.sequence.nextSendAt)}
              {mode === "review" ? " (goes to Outbox for approval)" : " (sends automatically)"}
            </p>
            <button className={ghost}>
              <Square className="h-3.5 w-3.5" /> Stop sequence
            </button>
          </form>
        ) : (
          <form action={enrollAction} className="mt-2 flex flex-wrap items-end gap-3">
            <input type="hidden" name="id" value={lead.id} />
            <div className="min-w-[220px] flex-1">
              <select name="sequenceId" defaultValue={lead.basis === "inbound" ? "inbound-followup" : "cold-outreach"} className={select}>
                {sequences.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.steps.length} emails)
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn-brand !px-4 !py-2.5 text-[13px]" disabled={!lead.email}>
              <Wand2 className="h-4 w-4" /> Start sequence
            </button>
            {lead.sequence.status ? <p className="w-full text-[12px] text-fg-subtle">Last sequence: {lead.sequence.status}</p> : null}
          </form>
        )}
      </div>

      <form action={addNoteAction} className="flex flex-wrap items-start gap-2">
        <input type="hidden" name="id" value={lead.id} />
        <select name="type" defaultValue="note" className={`${select} w-36`}>
          <option value="note">Note</option>
          <option value="call">Call log</option>
          <option value="whatsapp">WhatsApp log</option>
        </select>
        <AdminInput name="note" placeholder="Add a note, call summary or WhatsApp update…" className="min-w-[220px] flex-1" />
        <button className={ghost}>
          <PlusCircle className="h-3.5 w-3.5" /> Add
        </button>
      </form>

      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-fg-subtle">Activity</p>
          <ul className="mt-2 space-y-2">
            {lead.timeline.slice(0, 25).map((t, i) => (
              <li key={i} className="rounded-xl border border-line bg-surface px-3 py-2 text-[13px]">
                <p className="whitespace-pre-wrap text-fg">{t.text}</p>
                <p className="mt-0.5 text-[11px] text-fg-subtle">
                  {t.type} · {t.by} · {t.at ? new Date(t.at).toLocaleString("en-IN") : ""}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-fg-subtle">Emails</p>
          <ul className="mt-2 space-y-2">
            {emails.map((e) => (
              <li key={String(e._id)} className="rounded-xl border border-line bg-surface px-3 py-2 text-[13px]">
                <p className="font-semibold text-fg">{String(e.subject)}</p>
                <p className="text-[11px] text-fg-subtle">
                  {String(e.status)} · step {Number(e.step) + 1} · {e.sentAt ? new Date(e.sentAt as string).toLocaleString("en-IN") : new Date(e.createdAt as string).toLocaleString("en-IN")}
                </p>
              </li>
            ))}
            {!emails.length ? <li className="text-[13px] text-fg-subtle">No emails yet.</li> : null}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Outbox ---------------- */

async function OutboxTab() {
  const [drafts, sent, settings] = await Promise.all([
    SalesEmailModel.find({ status: "draft" }).sort({ createdAt: 1 }).limit(50).lean() as Promise<Record<string, unknown>[]>,
    SalesEmailModel.find({ status: { $in: ["sent", "failed"] } }).sort({ updatedAt: -1 }).limit(20).lean() as Promise<Record<string, unknown>[]>,
    getSalesSettings(),
  ]);
  const leads = new Map((await listLeads()).map((l) => [l.id, l]));
  const mailReady = isSalesMailConfigured();

  return (
    <div className="grid gap-5">
      <section className={`${card} flex flex-wrap items-center justify-between gap-3`}>
        <div>
          <h2 className={h2}>Emails waiting for approval</h2>
          <p className={sub}>
            Mode: <strong>{settings.mode === "review" ? "Review — nothing is sent until you approve" : "Automatic sending"}</strong> · daily limit {settings.dailyLimit}
            {mailReady ? "" : " · ⚠ email sending not set up (SALES_SMTP_USER / SALES_SMTP_PASS)"}
          </p>
        </div>
        <form action={writeDueEmailsAction}>
          <SubmitButton label="Write due emails now" pendingLabel="Writing…" />
        </form>
      </section>

      {drafts.map((e) => {
        const lead = leads.get(String(e.leadId));
        return (
          <form key={String(e._id)} action={sendDraftAction} className={`${card} grid gap-3`}>
            <input type="hidden" name="id" value={String(e._id)} />
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-[13px] text-fg-muted">
                To <strong className="text-fg">{lead?.name || String(e.to)}</strong> &lt;{String(e.to)}&gt;{lead?.company ? ` · ${lead.company}` : ""} · {settings.sequences.find((s) => s.id === String(e.sequenceId))?.name ?? ""} email {Number(e.step) + 1}
              </p>
              {lead ? (
                <Link href={`/admin/sales?tab=pipeline&lead=${lead.id}`} className="text-[12.5px] font-semibold text-[#0878d1] hover:underline">
                  Open lead
                </Link>
              ) : null}
            </div>
            <AdminInput name="subject" defaultValue={String(e.subject)} />
            <AdminTextarea name="body" defaultValue={String(e.body)} className="min-h-44" />
            <p className="text-[11.5px] text-fg-subtle">Signature, company address and unsubscribe link are added automatically.</p>
            <div className="flex flex-wrap justify-end gap-2">
              <button formAction={skipDraftAction} className={ghost}>
                <SkipForward className="h-3.5 w-3.5" /> Skip
              </button>
              <button formAction={saveDraftAction} className={ghost}>
                Save edits
              </button>
              <button type="submit" className="btn-brand !px-4 !py-2 text-[13px]">
                <Send className="h-4 w-4" /> Approve & send
              </button>
            </div>
          </form>
        );
      })}
      {!drafts.length ? (
        <section className={`${card} text-center text-[13.5px] text-fg-muted`}>
          <Inbox className="mx-auto mb-2 h-6 w-6 text-fg-subtle" />
          No drafts waiting. Start a sequence on a lead, then click “Write due emails now” — or wait for the hourly scheduler.
        </section>
      ) : null}

      <section className={card}>
        <h2 className={h2}>Recently sent</h2>
        <ul className="mt-3 divide-y divide-line">
          {sent.map((e) => (
            <li key={String(e._id)} className="flex flex-wrap justify-between gap-2 py-2.5 text-[13px]">
              <span className="text-fg">
                {String(e.subject)} <span className="text-fg-subtle">→ {String(e.to)}</span>
              </span>
              <span className={e.status === "failed" ? "text-red-500" : "text-fg-subtle"}>{e.status === "failed" ? `Failed: ${String(e.error)}` : new Date(e.sentAt as string).toLocaleString("en-IN")}</span>
            </li>
          ))}
          {!sent.length ? <li className="py-3 text-[13px] text-fg-subtle">Nothing sent yet.</li> : null}
        </ul>
      </section>
    </div>
  );
}

/* ---------------- Today ---------------- */

async function TodayTab() {
  const settings = await getSalesSettings();
  return (
    <section className={card}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className={h2}>Today’s sales briefing</h2>
          <p className={sub}>
            {settings.summary?.at ? `Generated ${new Date(settings.summary.at).toLocaleString("en-IN")}` : "Not generated yet."} Sent every morning (after 9 AM IST) to {settings.summaryEmail || "—"}.
          </p>
        </div>
        <form action={runSummaryAction}>
          <SubmitButton label="Generate now" pendingLabel="Generating…" />
        </form>
      </div>
      <pre className="mt-5 whitespace-pre-wrap rounded-2xl border border-line bg-canvas p-4 font-sans text-[14px] leading-relaxed text-fg">{settings.summary?.text || "Click “Generate now” to create the first briefing."}</pre>
    </section>
  );
}

/* ---------------- Add leads ---------------- */

function AddTab() {
  return (
    <div className="grid gap-5 xl:grid-cols-2 xl:items-start">
      <form action={addLeadAction} className={`${card} grid gap-3 sm:grid-cols-2`}>
        <div className="sm:col-span-2">
          <h2 className={h2}>Add a lead</h2>
          <p className={sub}>For people you met, referrals or business contacts.</p>
        </div>
        {(["name", "email", "phone", "company", "title", "website", "country", "service"] as const).map((f) => (
          <AdminField key={f} label={f[0].toUpperCase() + f.slice(1)}>
            <AdminInput name={f} type={f === "email" ? "email" : "text"} />
          </AdminField>
        ))}
        <AdminField label="Deal value (₹, optional)">
          <AdminInput name="value" type="number" min={0} />
        </AdminField>
        <AdminField label="How we got this contact">
          <select name="basis" defaultValue="inbound" className={select}>
            <option value="inbound">They contacted us / referral / met in person</option>
            <option value="outbound">Business contact for outreach</option>
          </select>
        </AdminField>
        <div className="sm:col-span-2">
          <AdminField label="Notes">
            <AdminTextarea name="notes" className="min-h-20" />
          </AdminField>
        </div>
        <label className="flex items-start gap-2 text-[12.5px] text-fg-muted sm:col-span-2">
          <input type="checkbox" name="consent" className="mt-0.5 h-4 w-4 accent-[#0878d1]" />
          For outreach contacts: I confirm this is a business contact obtained lawfully, and we will stop emailing if they ask.
        </label>
        <div className="flex justify-end sm:col-span-2">
          <button type="submit" className="btn-brand !px-4 !py-2 text-[13px]">
            <UserPlus className="h-4 w-4" /> Add lead
          </button>
        </div>
      </form>

      <form action={importLeadsAction} className={`${card} grid gap-3`}>
        <h2 className={h2}>Import from CSV / spreadsheet</h2>
        <p className={sub}>Paste rows with these columns (header optional): name, email, phone, company, title, website, country, service. Up to 1,000 rows; duplicates are skipped.</p>
        <AdminTextarea name="csv" className="min-h-48 font-mono text-[12.5px]" placeholder={"name,email,phone,company,title,website,country,service\nPriya Sharma,priya@company.com,+91…,Company Pvt Ltd,CTO,company.com,India,Mobile app"} />
        <AdminField label="Source">
          <select name="basis" defaultValue="outbound" className={select}>
            <option value="outbound">Business contacts for outreach (e.g. from Apollo, events, LinkedIn Sales Navigator exports)</option>
            <option value="inbound">People who already contacted us</option>
          </select>
        </AdminField>
        <label className="flex items-start gap-2 text-[12.5px] text-fg-muted">
          <input type="checkbox" name="consent" className="mt-0.5 h-4 w-4 accent-[#0878d1]" />
          I confirm these are business contacts obtained lawfully (not scraped against a website&apos;s terms), and we will honour unsubscribe requests.
        </label>
        <div className="flex justify-end">
          <button type="submit" className="btn-brand !px-4 !py-2 text-[13px]">
            Import leads
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------------- Settings ---------------- */

async function SettingsTab() {
  const [s, ai] = await Promise.all([getSalesSettings(), getAiSettings()]);
  return (
    <form action={saveSalesSettingsAction} className="grid gap-5">
      <section className={`${card} grid gap-4 lg:grid-cols-2`}>
        <div className="lg:col-span-2">
          <h2 className={h2}>Sending</h2>
          <p className={sub}>Best practice: send outreach from a separate domain (e.g. hello@alpixn-mail.com) so the main alpixn.com mailbox is never affected. Set SALES_SMTP_HOST / PORT / USER / PASS on the server.</p>
        </div>
        <AdminField label="Mode">
          <select name="mode" defaultValue={s.mode} className={select}>
            <option value="review">Review — AI writes drafts, you approve each email (recommended to start)</option>
            <option value="auto">Automatic — sequence emails send by themselves</option>
          </select>
        </AdminField>
        <AdminField label="Daily sending limit">
          <AdminInput name="dailyLimit" type="number" min={1} max={500} defaultValue={String(s.dailyLimit)} />
        </AdminField>
        <AdminField label="Sender name">
          <AdminInput name="fromName" defaultValue={s.fromName} />
        </AdminField>
        <AdminField label="Sender email" hint="Leave empty to use the SMTP login address.">
          <AdminInput name="fromEmail" defaultValue={s.fromEmail} placeholder="hello@alpixn-mail.com" />
        </AdminField>
        <AdminField label="Replies go to">
          <AdminInput name="replyTo" defaultValue={s.replyTo} />
        </AdminField>
        <AdminField label="Daily briefing goes to">
          <AdminInput name="summaryEmail" defaultValue={s.summaryEmail} />
        </AdminField>
        <AdminField label="AI model for sales emails">
          <select name="providerId" defaultValue={s.providerId} className={select}>
            <option value="">Default provider from AI Studio</option>
            {ai.providers.map((p) => (
              <option key={p.id} value={p.id} disabled={!p.enabled}>
                {p.label} — {p.model}
              </option>
            ))}
          </select>
        </AdminField>
        <AdminField label="Company address in email footer">
          <AdminInput name="footerAddress" defaultValue={s.footerAddress} />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="About ALPIXN (the AI uses this in every email)">
            <AdminTextarea name="pitch" defaultValue={s.pitch} className="min-h-24" />
          </AdminField>
        </div>
        <div className="lg:col-span-2">
          <AdminField label="Signature">
            <AdminTextarea name="signature" defaultValue={s.signature} className="min-h-16" />
          </AdminField>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2}>Email sequences</h2>
        <p className={sub}>Each email is written by AI for that specific lead, following your instruction. Sequences stop automatically when a lead replies (set stage to Replied) or unsubscribes.</p>
        <div className="mt-4">
          <SequencesEditor initial={s.sequences} />
        </div>
      </section>

      <div className="sticky bottom-0 flex justify-end border-t border-line bg-canvas/90 py-3 backdrop-blur">
        <button type="submit" className="btn-brand !px-5 !py-2.5 text-[13.5px]">
          Save settings
        </button>
      </div>
    </form>
  );
}
