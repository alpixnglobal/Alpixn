import type { Metadata } from "next";
import Link from "next/link";
import { Check, RotateCcw, X } from "lucide-react";

import { decideApprovalAction, retryApprovalAction } from "@/admin/actions/growth-actions";
import { AdminTextarea, AdminInput, StatusNotice, adminCardClassName, getAdminFlashMessage } from "@/components/admin/admin-ui";
import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminSession } from "@/lib/admin-auth";
import { connectToDatabase } from "@/lib/db";
import { ApprovalModel } from "@/lib/growth/models";
import { can } from "@/lib/rbac";

export const metadata: Metadata = { title: "Approval center" };

const TYPE_LABEL: Record<string, string> = {
  message: "Message",
  proposal: "Proposal",
  discount: "Discount",
  deal_won: "Deal won",
  campaign_create: "New campaign",
  campaign_budget: "Budget change",
  campaign_status: "Campaign status",
  campaign_objective: "Objective change",
  recommendation: "Recommendation",
  prompt_version: "Prompt change",
  other: "Other",
};

const STATUS_TONE: Record<string, string> = {
  pending: "bg-[#d99a19]/15 text-[#9a5b08] dark:text-[#f6d77a]",
  executed: "bg-[#1f9d55]/15 text-[#15803d] dark:text-[#6ee7a0]",
  approved: "bg-[#1f9d55]/15 text-[#15803d] dark:text-[#6ee7a0]",
  rejected: "bg-fg/10 text-fg-muted",
  failed: "bg-rose-500/15 text-rose-700 dark:text-rose-200",
  expired: "bg-fg/10 text-fg-muted",
};

type Row = {
  _id: unknown;
  type: string;
  title: string;
  summary: string;
  payload: Record<string, unknown>;
  status: string;
  requestedBy: string;
  decidedBy: string;
  decidedAt?: Date;
  reason: string;
  result: string;
  leadId: string;
  priority: string;
  createdAt: Date;
};

async function load(status: string, type: string) {
  try {
    await connectToDatabase();
    const q: Record<string, unknown> = status === "all" ? {} : status === "done" ? { status: { $ne: "pending" } } : { status };
    if (type) q.type = type;
    const [rows, counts] = await Promise.all([
      ApprovalModel.find(q).sort(status === "pending" ? { priority: 1, createdAt: 1 } : { updatedAt: -1 }).limit(100).lean() as unknown as Promise<Row[]>,
      ApprovalModel.aggregate([{ $match: { status: "pending" } }, { $group: { _id: "$type", n: { $sum: 1 } } }]),
    ]);
    return { rows, counts: Object.fromEntries((counts as { _id: string; n: number }[]).map((c) => [c._id, c.n])) as Record<string, number> };
  } catch {
    return null;
  }
}

export default async function ApprovalsPage({ searchParams }: { searchParams: Promise<{ status?: string; error?: string; view?: string; type?: string }> }) {
  const p = await searchParams;
  const flash = getAdminFlashMessage(p.status, p.error);
  const view = ["pending", "done", "failed", "all"].includes(p.view ?? "") ? p.view! : "pending";
  const type = p.type && TYPE_LABEL[p.type] ? p.type : "";
  const [data, session] = await Promise.all([load(view, type), getAdminSession()]);
  const canDecide = session ? can(session.role, "approvals") : false;
  const back = `/admin/growth/approvals?view=${view}${type ? `&type=${type}` : ""}`;
  const tab = (v: string, label: string) => (
    <Link key={v} href={`/admin/growth/approvals?view=${v}`} className={`rounded-lg px-3 py-1.5 text-[13px] font-semibold ${view === v ? "bg-[#0878d1] text-white" : "border border-line text-fg-muted hover:text-fg"}`}>
      {label}
    </Link>
  );

  return (
    <AdminShell title="Approval center" description="Everything the AI wants to do that needs a human: messages, proposals, discounts, deals and ad spend." activePath="/admin/growth/approvals">
      {flash ? <StatusNotice tone={flash.tone} message={flash.message} /> : null}
      <div className="flex flex-wrap items-center gap-2">
        {tab("pending", "Waiting")}
        {tab("failed", "Failed")}
        {tab("done", "Decided")}
        {tab("all", "All")}
        <span className="mx-2 h-5 w-px bg-line" />
        {Object.entries(data?.counts ?? {}).map(([t, n]) => (
          <Link key={t} href={`/admin/growth/approvals?view=pending&type=${t}`} className={`rounded-full border px-3 py-1 text-[12px] ${type === t ? "border-[#0878d1] text-[#0878d1]" : "border-line text-fg-muted"}`}>
            {TYPE_LABEL[t] ?? t} · {n}
          </Link>
        ))}
      </div>

      {!data ? <StatusNotice tone="error" message="Database unavailable." /> : null}
      {data && !data.rows.length ? (
        <div className={`${adminCardClassName} p-8 text-center text-[14px] text-fg-muted`}>{view === "pending" ? "Nothing waiting. The AI will add items here when something needs your decision." : "No items."}</div>
      ) : null}

      <div className="grid gap-4">
        {data?.rows.map((r) => {
          const id = String(r._id);
          const editableText = r.type === "message" && typeof r.payload.text === "string";
          const editableSubject = r.type === "message" && typeof r.payload.subject === "string" && r.payload.subject;
          const editableAmount = r.type === "deal_won" || r.type === "discount";
          return (
            <article key={id} className={`${adminCardClassName} p-5`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#0878d1]/10 px-2.5 py-0.5 text-[11.5px] font-semibold text-[#0878d1]">{TYPE_LABEL[r.type] ?? r.type}</span>
                    {r.priority === "high" ? <span className="rounded-full bg-rose-500/15 px-2.5 py-0.5 text-[11.5px] font-semibold text-rose-700 dark:text-rose-200">High priority</span> : null}
                    <span className={`rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold ${STATUS_TONE[r.status] ?? ""}`}>{r.status}</span>
                    {r.payload.suggestOnly ? <span className="text-[11.5px] text-fg-muted">suggestion</span> : null}
                  </div>
                  <h2 className="mt-2 font-display text-[15.5px] font-bold text-fg">{r.title}</h2>
                  <p className="mt-0.5 text-[12px] text-fg-muted">
                    Requested by {r.requestedBy} · {new Date(r.createdAt).toLocaleString("en-IN")}
                    {r.leadId ? (
                      <>
                        {" · "}
                        <Link href={`/admin/sales?lead=${r.leadId}`} className="text-[#0878d1] hover:underline">
                          Open lead
                        </Link>
                      </>
                    ) : null}
                  </p>
                </div>
              </div>

              {r.summary ? <pre className="mt-3 whitespace-pre-wrap rounded-xl bg-canvas p-3 font-sans text-[13px] leading-relaxed text-fg">{r.summary}</pre> : null}
              {r.status !== "pending" ? (
                <p className="mt-3 text-[12.5px] text-fg-muted">
                  {r.decidedBy ? `Decided by ${r.decidedBy}${r.decidedAt ? ` · ${new Date(r.decidedAt).toLocaleString("en-IN")}` : ""}. ` : ""}
                  {r.reason ? `Reason: ${r.reason}. ` : ""}
                  {r.result ? `Result: ${r.result}` : ""}
                </p>
              ) : null}

              {r.status === "pending" && canDecide ? (
                <form action={decideApprovalAction} className="mt-4 grid gap-3">
                  <input type="hidden" name="id" value={id} />
                  <input type="hidden" name="back" value={back} />
                  {editableSubject ? <AdminInput name="edit.subject" defaultValue={String(r.payload.subject)} aria-label="Subject" /> : null}
                  {editableText ? <AdminTextarea name="edit.text" defaultValue={String(r.payload.text)} className="min-h-32" aria-label="Message (edit before approving)" /> : null}
                  {editableAmount ? (
                    <label className="text-[12.5px] text-fg-muted">
                      Amount (₹)
                      <AdminInput name="edit.amount" type="number" min={0} defaultValue={String(r.payload.amount ?? 0)} />
                    </label>
                  ) : null}
                  <AdminInput name="reason" placeholder="Note (optional, saved in the audit log)" />
                  <div className="flex flex-wrap gap-2">
                    <button name="decision" value="approve" className="btn-brand !px-4 !py-2 text-[13px]">
                      <Check className="h-4 w-4" /> {editableText ? "Approve & send" : r.payload.suggestOnly ? "Accept" : "Approve"}
                    </button>
                    <button name="decision" value="reject" className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2 text-[13px] font-semibold text-fg-muted hover:text-fg">
                      <X className="h-4 w-4" /> Reject
                    </button>
                  </div>
                </form>
              ) : null}
              {r.status === "failed" && canDecide ? (
                <form action={retryApprovalAction} className="mt-3">
                  <input type="hidden" name="id" value={id} />
                  <input type="hidden" name="back" value={back} />
                  <button className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2 text-[13px] font-semibold text-fg hover:border-[#0878d1]">
                    <RotateCcw className="h-4 w-4" /> Retry
                  </button>
                </form>
              ) : null}
            </article>
          );
        })}
      </div>
    </AdminShell>
  );
}
