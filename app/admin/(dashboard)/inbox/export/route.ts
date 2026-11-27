import { requireAdminSession } from "@/lib/admin-auth";
import { getAdminInbox } from "@/lib/content-service";

export const dynamic = "force-dynamic";

const cell = (v: string) => `"${(v ?? "").replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;

export async function GET(request: Request) {
  await requireAdminSession();
  const type = new URL(request.url).searchParams.get("type");
  const items = (await getAdminInbox()).filter((i) => !type || i.kind === type);
  const header = ["Date", "Type", "Status", "Name", "Email", "Phone", "Subject", "Message", "Details"];
  const rows = items.map((i) => [i.createdAt, i.kind, i.status, i.name, i.email, i.phone, i.subject, i.message, i.details.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("; ")]);
  const csv = [header, ...rows].map((r) => r.map(cell).join(",")).join("\n");
  return new Response("﻿" + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="alpixn-inbox-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
