import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, RotateCcw, Save } from "lucide-react";

import { resetPageBlockAction, savePageBlockAction } from "@/admin/actions/admin-actions";
import BlockEditor from "@/components/admin/cms/BlockEditor";
import { AdminShell, StatusNotice, adminCardClassName, getAdminFlashMessage } from "@/components/admin/admin-ui";
import { BLOCKS, BLOCK_MAP } from "@/lib/cms/blocks";
import { getPageBlock } from "@/lib/content-service";

export const metadata: Metadata = { title: "Page sections" };

export default async function ContentPage({ searchParams }: { searchParams: Promise<{ block?: string; status?: string; error?: string }> }) {
  const params = await searchParams;
  const flash = getAdminFlashMessage(params.status, params.error);
  const current = BLOCK_MAP[params.block ?? ""] ?? BLOCKS[0];
  const value = await getPageBlock(current.key);
  const groups = Array.from(new Set(BLOCKS.map((b) => b.group)));

  return (
    <AdminShell title="Page sections" description="Edit homepage, About and legal page sections — text, lists, timeline and the hero video." activePath="/admin/content">
      {flash ? <StatusNotice tone={flash.tone} message={flash.message} /> : null}
      <div className="grid gap-5 xl:grid-cols-[280px_minmax(0,1fr)] xl:items-start">
        <nav aria-label="Sections" className={`${adminCardClassName} p-3 xl:sticky xl:top-24`}>
          {groups.map((g) => (
            <div key={g} className="mb-2 last:mb-0">
              <p className="px-2 pb-1 pt-2 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-fg-subtle">{g}</p>
              <ul className="space-y-0.5">
                {BLOCKS.filter((b) => b.group === g).map((b) => {
                  const active = b.key === current.key;
                  return (
                    <li key={b.key}>
                      <Link href={`/admin/content?block=${b.key}`} scroll={false} className={`block rounded-lg px-2.5 py-2 text-[13.5px] transition-colors ${active ? "bg-[#0878d1]/10 font-semibold text-[#064a87] dark:text-[#7cc6ff]" : "text-fg-muted hover:bg-surface-2 hover:text-fg"}`}>
                        {b.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <section className={`${adminCardClassName} p-5 sm:p-6`}>
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-subtle">{current.group}</p>
              <h2 className="font-display text-[17px] font-bold text-fg">{current.title}</h2>
              <p className="mt-0.5 text-[13px] text-fg-muted">{current.description}</p>
            </div>
            <a href={current.page} target="_blank" className="inline-flex items-center gap-1.5 rounded-xl border border-line px-3 py-2 text-[12.5px] font-semibold text-fg hover:border-[#d99a19]/60">
              View on site <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <form action={savePageBlockAction} className="mt-5">
            <input type="hidden" name="key" value={current.key} />
            <BlockEditor key={current.key} fields={current.fields} initial={value} />
            <div className="sticky bottom-0 -mx-5 mt-6 flex items-center justify-between gap-3 border-t border-line bg-surface/95 px-5 py-3 backdrop-blur sm:-mx-6 sm:px-6">
              <p className="text-[12px] text-fg-subtle">Changes appear on the website right after saving.</p>
              <button className="inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(135deg,#fbe7a1,#d99a19)] px-4 py-2.5 text-[13.5px] font-semibold text-[#071a33] shadow-[0_10px_24px_-12px_rgba(217,154,25,0.8)]">
                <Save className="h-4 w-4" /> Save changes
              </button>
            </div>
          </form>
          <form action={resetPageBlockAction} className="mt-3 text-right">
            <input type="hidden" name="key" value={current.key} />
            <button className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-fg-subtle hover:text-rose-600">
              <RotateCcw className="h-3.5 w-3.5" /> Reset this section to the original content
            </button>
          </form>
        </section>
      </div>
    </AdminShell>
  );
}
