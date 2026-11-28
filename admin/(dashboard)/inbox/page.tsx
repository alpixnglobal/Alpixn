import type { Metadata } from "next";
import Link from "next/link";
import { ShieldAlert, Archive, BriefcaseBusiness, Download, ExternalLink, Inbox, Mail, MailOpen, Phone, Reply, Search, Trash2, UserRoundSearch } from "lucide-react";

import { deleteInboxItemAction, setInboxStatusAction } from "@/admin/actions/admin-actions";
import { AdminShell, StatusNotice, adminCardClassName, getAdminFlashMessage } from "@/components/admin/admin-ui";
import { getAdminInbox, type InboxItem, type InboxKind } from "@/lib/content-service";
import { blockSenderAction } from "@/admin/actions/spam-actions";

export const metadata: Metadata = { title: "Inbox" };

const KIND_LABEL: Record<InboxKind, string> = { enquiry: "Contact enquiry", hire: "Hire developers", application: "Job application", assistant: "AI assistant lead" };
const KIND_TONE: Record<InboxKind, string> = { enquiry: "#0878d1", hire: "#d99a19", application: "#9a5b08", assistant: "#1f9d55" };
const STATUS_TONE: Record<string, string> = {
  new: "bg-[#0878d1]/12 text-[#0878d1] dark:text-[#7cc6ff]",
  read: "bg-surface-2 text-fg-muted",
  replied: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
  archived: "bg-surface-2 text-fg-subtle",
  spam: "bg-rose-500/12 text-rose-600 dark:text-rose-300",
};
const TABS: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  { key: "enquiry", label: "Contact" },
  { key: "hire", label: "Hire developers" },
  { key: "application", label: "Applications" },
  { key: "assistant", label: "AI assistant" },
];

type Params = { type?: string; status?: string; q?: string; id?: string; error?: string; saved?: string };

function fmt(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return isNaN(d.getTime()) ? "" : d.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function qs(p: Params, patch: Partial<Params>) {
  const next = { ...p, ...patch };
  const u = new URLSearchParams();
  for (const k of ["type", "status", "q", "id"] as const) if (next[k] && next[k] !== "all") u.set(k, next[k] as string);
  const s = u.toString();
  return `/admin/inbox${s ? `?${s}` : ""}`;
}

export default async function InboxPage({ searchParams }: { searchParams: Promise<Params & { status?: string }> }) {
  const raw = await searchParams;
  const p: Params = { type: raw.type ?? "all", status: ["new", "read", "replied", "archived", "spam"].includes(raw.status ?? "") ? raw.status : "all", q: raw.q ?? "", id: raw.id };
  const flash = getAdminFlashMessage(raw.status === "deleted" ? "deleted" : undefined, raw.error);
  const all = await getAdminInbox();

  const q = (p.q ?? "").toLowerCase();
  const items = all.filter(
    (i) =>
      (p.type === "all" || i.kind === p.type) &&
      (p.status === "all" ? i.status !== "archived" && i.status !== "spam" : i.status === p.status) &&
      (!q || `${i.name} ${i.email} ${i.phone} ${i.subject} ${i.message}`.toLowerCase().includes(q))
  );
  const selected: InboxItem | undefined = items.find((i) => i.id === p.id) ?? items[0];
  const back = qs(p, { id: selected?.id });
  const counts = {
    all: all.filter((i) => i.status !== "archived" && i.status !== "spam").length,
    enquiry: all.filter((i) => i.kind === "enquiry" && i.status !== "archived" && i.status !== "spam").length,
    hire: all.filter((i) => i.kind === "hire" && i.status !== "archived" && i.status !== "spam").length,
    application: all.filter((i) => i.kind === "application" && i.status !== "archived" && i.status !== "spam").length,
    assistant: all.filter((i) => i.kind === "assistant" && i.status !== "archived" && i.status !== "spam").length,
  } as Record<string, number>;
  const newCount = all.filter((i) => i.status === "new").length;
  const spamCount = all.filter((i) => i.status === "spam").length;

  return (
    <AdminShell
      title="Inbox"
      description="Contact enquiries, hire-developer requests and job applications from the website."
      activePath="/admin/inbox"
      topActions={
        <a href={`/admin/inbox/export${p.type !== "all" ? `?type=${p.type}` : ""}`} className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-3.5 py-2 text-[13px] font-semibold text-fg hover:border-[#d99a19]/60">
          <Download className="h-4 w-4" /> Export CSV
        </a>
      }
    >
      {flash ? <StatusNotice tone={flash.tone} message={flash.message} /> : null}

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-1.5 rounded-xl border border-line bg-surface p-1">
          {TABS.map((t) => (
            <Link key={t.key} href={qs(p, { type: t.key, id: undefined })} className={`rounded-lg px-3 py-1.5 text-[13px] font-semibold transition-colors ${p.type === t.key ? "bg-[linear-gradient(135deg,#071a33,#064a87)] text-white" : "text-fg-muted hover:text-fg"}`}>
              {t.label} <span className="ml-1 text-[11px] opacity-70">{counts[t.key]}</span>
            </Link>
          ))}
        </div>
        <form className="flex flex-wrap items-center gap-2" action="/admin/inbox">
          {p.type !== "all" ? <input type="hidden" name="type" value={p.type} /> : null}
          <select name="status" defaultValue={p.status} className="admin-input rounded-xl border border-line bg-surface px-3 py-2 text-[13px] text-fg">
            <option value="all">Open (not archived)</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
            <option value="spam">Spam{spamCount ? ` (${spamCount})` : ""}</option>
          </select>
          <label className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2">
            <Search className="h-4 w-4 text-fg-subtle" />
            <input name="q" defaultValue={p.q} placeholder="Search name, email, message…" className="w-56 bg-transparent text-[13px] text-fg outline-none placeholder:text-fg-subtle" />
          </label>
          <button className="rounded-xl bg-[#0878d1] px-3.5 py-2 text-[13px] font-semibold text-white">Filter</button>
        </form>
      </div>

      <div className="grid gap-5 xl:grid-cols-[380px_minmax(0,1fr)] xl:items-start">
        {/* List */}
        <div className={`${adminCardClassName} overflow-hidden`}>
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <p className="text-[13px] font-semibold text-fg">{items.length} {items.length === 1 ? "message" : "messages"}</p>
            {newCount ? <span className="rounded-full bg-[#0878d1]/12 px-2 py-0.5 text-[11px] font-semibold text-[#0878d1] dark:text-[#7cc6ff]">{newCount} new</span> : null}
          </div>
          <ul className="max-h-[calc(100vh-17rem)] divide-y divide-line overflow-y-auto">
            {items.map((i) => {
              const active = selected?.id === i.id;
              return (
                <li key={`${i.kind}-${i.id}`}>
                  <Link href={qs(p, { id: i.id })} scroll={false} className={`flex gap-3 px-4 py-3 transition-colors ${active ? "bg-[#0878d1]/[0.07]" : "hover:bg-surface-2"}`}>
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ background: i.status === "new" ? KIND_TONE[i.kind] : "transparent", boxShadow: i.status === "new" ? "none" : `inset 0 0 0 1.5px ${KIND_TONE[i.kind]}` }} />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className={`truncate text-[13.5px] ${i.status === "new" ? "font-bold text-fg" : "font-semibold text-fg"}`}>{i.name || i.email}</span>
                        <span className="shrink-0 text-[11px] text-fg-subtle">{fmt(i.createdAt).split(",")[0]}</span>
                      </span>
                      <span className="mt-0.5 block truncate text-[12.5px] text-fg-muted">{i.subject}</span>
                      <span className="mt-1 block truncate text-[12px] text-fg-subtle">{i.message || "—"}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
            {!items.length ? (
              <li className="flex flex-col items-center gap-2 px-6 py-14 text-center text-fg-muted">
                <Inbox className="h-8 w-8 text-fg-subtle" />
                <span className="text-[13px]">No messages here yet.</span>
              </li>
            ) : null}
          </ul>
        </div>

        {/* Detail */}
        {selected ? (
          <article className={`${adminCardClassName} p-5 sm:p-6`}>
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-4">
              <div className="min-w-0">
                <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.1em]" style={{ background: `${KIND_TONE[selected.kind]}1f`, color: KIND_TONE[selected.kind] }}>
                  {selected.kind === "application" ? <BriefcaseBusiness className="h-3 w-3" /> : selected.kind === "hire" ? <UserRoundSearch className="h-3 w-3" /> : <Mail className="h-3 w-3" />}
                  {KIND_LABEL[selected.kind]}
                </span>
                <h2 className="mt-2 font-display text-[18px] font-bold text-fg">{selected.name || selected.email}</h2>
                <p className="mt-0.5 text-[13px] text-fg-muted">{selected.subject}</p>
              </div>
              <div className="text-right">
                <span className={`rounded-full px-2.5 py-1 text-[11.5px] font-semibold capitalize ${STATUS_TONE[selected.status] ?? STATUS_TONE.read}`}>{selected.status}</span>
                <p className="mt-2 text-[12px] text-fg-subtle">{fmt(selected.createdAt)}</p>
              </div>
            </div>

            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-line bg-surface-2 p-3">
                <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-fg-subtle"><Mail className="h-3.5 w-3.5" /> Email</dt>
                <dd className="mt-1 break-all text-[14px] text-fg"><a href={`mailto:${selected.email}`} className="hover:underline">{selected.email}</a></dd>
              </div>
              <div className="rounded-xl border border-line bg-surface-2 p-3">
                <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-fg-subtle"><Phone className="h-3.5 w-3.5" /> Phone</dt>
                <dd className="mt-1 text-[14px] text-fg"><a href={`tel:${selected.phone.replace(/[^\d+]/g, "")}`} className="hover:underline">{selected.phone || "—"}</a></dd>
              </div>
              {selected.details.filter(([, v]) => v).map(([k, v]) => (
                <div key={k} className="rounded-xl border border-line bg-surface-2 p-3">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-fg-subtle">{k}</dt>
                  <dd className="mt-1 break-all text-[14px] capitalize text-fg">
                    {/^https?:\/\//.test(v) ? (
                      <a href={v} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 normal-case text-[#0878d1] hover:underline">
                        Open link <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      v
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-fg-subtle">{selected.kind === "application" ? "Cover letter" : "Message"}</p>
              <p className="mt-2 whitespace-pre-wrap rounded-xl border border-line bg-surface p-4 text-[14px] leading-relaxed text-fg">{selected.message || "No message."}</p>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-line pt-4">
              <a href={`mailto:${selected.email}?subject=${encodeURIComponent(`Re: ${selected.subject}`)}`} className="inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(135deg,#fbe7a1,#d99a19)] px-3.5 py-2 text-[13px] font-semibold text-[#071a33]">
                <Reply className="h-4 w-4" /> Reply by email
              </a>
              {(selected.status === "spam" ? (["new"] as const) : (["read", "replied", "new", "archived", "spam"] as const)).filter((s) => s !== selected.status).map((s) => (
                <form key={s} action={setInboxStatusAction}>
                  <input type="hidden" name="kind" value={selected.kind} />
                  <input type="hidden" name="id" value={selected.id} />
                  <input type="hidden" name="status" value={s} />
                  <input type="hidden" name="back" value={back} />
                  <button className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 text-[13px] font-semibold text-fg hover:border-[#0878d1]/50">
                    {s === "read" ? <MailOpen className="h-4 w-4" /> : s === "archived" ? <Archive className="h-4 w-4" /> : s === "spam" ? <ShieldAlert className="h-4 w-4" /> : s === "new" ? <Mail className="h-4 w-4" /> : <Reply className="h-4 w-4" />}
                    {selected.status === "spam" && s === "new" ? "Not spam" : `Mark ${s}`}
                  </button>
                </form>
              ))}
              {selected.status === "spam" && selected.email ? (
                <form action={blockSenderAction}>
                  <input type="hidden" name="email" value={selected.email} />
                  <input type="hidden" name="back" value={back} />
                  <button className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 text-[13px] font-semibold text-fg hover:border-rose-500/50">
                    <ShieldAlert className="h-4 w-4" /> Block sender
                  </button>
                </form>
              ) : null}
              <form action={deleteInboxItemAction} className="ml-auto">
                <input type="hidden" name="kind" value={selected.kind} />
                <input type="hidden" name="id" value={selected.id} />
                <input type="hidden" name="back" value={back} />
                <button className="inline-flex items-center gap-2 rounded-xl border border-rose-500/30 px-3 py-2 text-[13px] font-semibold text-rose-600 hover:bg-rose-500/10 dark:text-rose-300">
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </form>
            </div>
          </article>
        ) : (
          <div className={`${adminCardClassName} grid place-items-center p-16 text-center text-fg-muted`}>
            <div>
              <Inbox className="mx-auto h-10 w-10 text-fg-subtle" />
              <p className="mt-3 text-[14px]">Select a message to read it.</p>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
