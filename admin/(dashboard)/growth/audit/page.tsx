import type { Metadata } from "next";
import Link from "next/link";

import { AdminInput, StatusNotice, adminCardClassName } from "@/components/admin/admin-ui";
import { AdminShell } from "@/components/admin/admin-shell";
import { connectToDatabase } from "@/lib/db";
import { AuditLogModel } from "@/lib/growth/models";

export const metadata: Metadata = { title: "Audit log" };

type Row = { _id: unknown; at: Date; actor: string; action: string; target: string; details: Record<string, unknown>; ip: string };

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

async function load(q: string, actor: string, page: number) {
  try {
    await connectToDatabase();
    const filter: Record<string, unknown> = {};
    if (q) filter.$or = [{ action: { $regex: esc(q), $options: "i" } }, { target: { $regex: esc(q), $options: "i" } }];
    if (actor === "ai") filter.actor = { $regex: "^agent:" };
    else if (actor === "people") filter.actor = { $regex: "@" };
    else if (actor === "system") filter.actor = { $regex: "^(system|webhook)" };
    const rows = (await AuditLogModel.find(filter).sort({ at: -1 }).skip(page * 100).limit(101).lean()) as unknown as Row[];
    return rows;
  } catch {
    return null;
  }
}

export default async function AuditPage({ searchParams }: { searchParams: Promise<{ q?: string; actor?: string; page?: string }> }) {
  const p = await searchParams;
  const q = (p.q ?? "").slice(0, 80);
  const actor = ["ai", "people", "system"].includes(p.actor ?? "") ? p.actor! : "";
  const page = Math.max(0, Math.min(200, Number(p.page) || 0));
  const rows = await load(q, actor, page);
  const link = (patch: Record<string, string>) => `/admin/growth/audit?${new URLSearchParams({ ...(q ? { q } : {}), ...(actor ? { actor } : {}), ...patch }).toString()}`;

  return (
    <AdminShell title="Audit log" description="Every AI action and every human decision: approvals, settings changes, messages, campaign changes and logins of team members." activePath="/admin/growth/audit">
      <form className="flex flex-wrap items-center gap-2">
        <AdminInput name="q" defaultValue={q} placeholder="Search action or target…" className="max-w-xs" />
        <select name="actor" defaultValue={actor} className="rounded-xl border border-line bg-canvas px-3 py-2 text-[13.5px] text-fg">
          <option value="">Everyone</option>
          <option value="ai">AI agents</option>
          <option value="people">People</option>
          <option value="system">System & webhooks</option>
        </select>
        <button className="btn-brand !px-4 !py-2 text-[13px]">Filter</button>
      </form>
      {!rows ? <StatusNotice tone="error" message="Database unavailable." /> : null}
      <div className={`${adminCardClassName} overflow-x-auto`}>
        <table className="w-full min-w-[760px] text-left text-[12.5px]">
          <thead className="border-b border-line text-fg-muted">
            <tr>
              <th className="px-4 py-2.5 font-semibold">When</th>
              <th className="px-4 py-2.5 font-semibold">Who</th>
              <th className="px-4 py-2.5 font-semibold">Action</th>
              <th className="px-4 py-2.5 font-semibold">Target</th>
              <th className="px-4 py-2.5 font-semibold">Details</th>
            </tr>
          </thead>
          <tbody>
            {(rows ?? []).slice(0, 100).map((r) => (
              <tr key={String(r._id)} className="border-b border-line/60 align-top">
                <td className="whitespace-nowrap px-4 py-2 text-fg-muted">{new Date(r.at).toLocaleString("en-IN")}</td>
                <td className="px-4 py-2 text-fg">{r.actor}</td>
                <td className="px-4 py-2 font-semibold text-fg">{r.action}</td>
                <td className="max-w-[180px] truncate px-4 py-2 text-fg-muted" title={r.target}>
                  {r.target}
                </td>
                <td className="max-w-[360px] px-4 py-2 text-fg-muted">
                  <code className="line-clamp-2 break-all text-[11.5px]">{Object.keys(r.details ?? {}).length ? JSON.stringify(r.details) : ""}</code>
                </td>
              </tr>
            ))}
            {rows && !rows.length ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-fg-muted">
                  No entries yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
      <div className="flex gap-3 text-[13px]">
        {page > 0 ? (
          <Link href={link({ page: String(page - 1) })} className="font-semibold text-[#0878d1]">
            ← Newer
          </Link>
        ) : null}
        {rows && rows.length > 100 ? (
          <Link href={link({ page: String(page + 1) })} className="font-semibold text-[#0878d1]">
            Older →
          </Link>
        ) : null}
      </div>
    </AdminShell>
  );
}
