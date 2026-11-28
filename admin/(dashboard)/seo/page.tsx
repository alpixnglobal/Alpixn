import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, FileSearch, Globe, RotateCcw, Save, Search } from "lucide-react";

import { resetSeoPageAction, saveSeoPageAction, saveSeoSettingsAction } from "@/admin/actions/seo-actions";
import { AdminField, AdminInput, AdminTextarea, StatusNotice, adminCardClassName, getAdminFlashMessage } from "@/components/admin/admin-ui";
import { AdminShell } from "@/components/admin/admin-shell";
import { SeoPageEditor } from "@/components/admin/seo-page-editor";
import { SITE_URL } from "@/lib/seo";
import { getSeoPageOverrides, getSeoSettings, normalizePath } from "@/lib/seo-store";
import { getAllSitePaths } from "@/lib/site-paths";

export const metadata: Metadata = { title: "SEO & analytics" };

type Params = { tab?: string; path?: string; q?: string; status?: string; error?: string };

const btn = "inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[13px] font-semibold";

export default async function SeoAdminPage({ searchParams }: { searchParams: Promise<Params> }) {
  const params = await searchParams;
  const flash = getAdminFlashMessage(params.status, params.error);
  const tab = params.tab === "settings" ? "settings" : "pages";

  return (
    <AdminShell
      title="SEO & analytics"
      description="SEO title, description and keywords for every page, plus Google Analytics, Search Console and other webmaster tools."
      activePath="/admin/seo"
      topActions={
        <div className="flex gap-2">
          <a href="/sitemap.xml" target="_blank" className={`${btn} border border-line text-fg hover:border-[#d99a19]/60`}>
            sitemap.xml <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <a href="/robots.txt" target="_blank" className={`${btn} border border-line text-fg hover:border-[#d99a19]/60`}>
            robots.txt <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      }
    >
      {flash ? <StatusNotice tone={flash.tone} message={flash.message} /> : null}
      <nav className="mb-5 inline-flex rounded-2xl border border-line bg-surface p-1">
        {[
          { key: "pages", label: "Pages", icon: FileSearch },
          { key: "settings", label: "Analytics & webmaster tools", icon: Globe },
        ].map((t) => (
          <Link
            key={t.key}
            href={t.key === "pages" ? "/admin/seo" : "/admin/seo?tab=settings"}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-[13.5px] font-semibold ${tab === t.key ? "bg-[linear-gradient(135deg,#071a33,#064a87)] text-white" : "text-fg-muted hover:text-fg"}`}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </Link>
        ))}
      </nav>
      {tab === "settings" ? <SettingsTab /> : <PagesTab params={params} />}
    </AdminShell>
  );
}

async function PagesTab({ params }: { params: Params }) {
  const [paths, overrides] = await Promise.all([getAllSitePaths(), getSeoPageOverrides()]);
  const byPath = new Map(overrides.map((o) => [o.path, o]));
  const q = (params.q ?? "").toLowerCase().trim();
  const filtered = q ? paths.filter((p) => p.label.toLowerCase().includes(q) || p.path.includes(q)) : paths;
  const selectedPath = normalizePath(params.path || filtered[0]?.path || "/");
  const selected = paths.find((p) => p.path === selectedPath) ?? { path: selectedPath, label: selectedPath, group: "Other" };
  const o = byPath.get(selectedPath);
  const groups = Array.from(new Set(filtered.map((p) => p.group)));
  const customCount = paths.filter((p) => byPath.has(p.path)).length;

  return (
    <div className="grid gap-5 xl:grid-cols-[340px_minmax(0,1fr)] xl:items-start">
      <aside className={`${adminCardClassName} p-3 xl:sticky xl:top-24`}>
        <form className="relative mb-2" action="/admin/seo">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" />
          <AdminInput name="q" defaultValue={params.q} placeholder={`Search ${paths.length} pages…`} className="pl-9" />
        </form>
        <p className="px-2 pb-2 text-[12px] text-fg-subtle">
          {customCount} of {paths.length} pages have custom SEO
        </p>
        <div className="max-h-[70vh] overflow-y-auto pr-1">
          {groups.map((g) => (
            <div key={g} className="mb-2">
              <p className="px-2 pb-1 pt-2 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-fg-subtle">{g}</p>
              <ul className="space-y-0.5">
                {filtered
                  .filter((p) => p.group === g)
                  .map((p) => {
                    const active = p.path === selectedPath;
                    const custom = byPath.get(p.path);
                    return (
                      <li key={p.path}>
                        <Link
                          href={`/admin/seo?path=${encodeURIComponent(p.path)}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
                          scroll={false}
                          className={`flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-[13px] ${active ? "bg-[#0878d1]/10 font-semibold text-[#064a87] dark:text-[#7cc6ff]" : "text-fg-muted hover:bg-surface-2 hover:text-fg"}`}
                        >
                          <span className="truncate">{p.label}</span>
                          {custom ? (
                            <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${custom.noindex ? "bg-red-500/10 text-red-500" : "bg-[#1f9d55]/10 text-[#1f9d55]"}`}>
                              {custom.noindex ? "Hidden" : "Custom"}
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
          {!filtered.length ? <p className="px-2 py-6 text-center text-[13px] text-fg-subtle">No pages match “{params.q}”.</p> : null}
        </div>
      </aside>

      <section className={`${adminCardClassName} p-5 sm:p-6`}>
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-subtle">{selected.group}</p>
            <h2 className="font-display text-[17px] font-bold text-fg">{selected.label}</h2>
            <p className="mt-0.5 font-mono text-[12.5px] text-fg-muted">{selectedPath}</p>
          </div>
          <a href={selectedPath} target="_blank" className={`${btn} border border-line text-fg hover:border-[#d99a19]/60`}>
            View page <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
        <form action={saveSeoPageAction} className="mt-5">
          <SeoPageEditor
            key={selectedPath}
            siteUrl={SITE_URL}
            label={selected.label}
            values={{
              path: selectedPath,
              title: o?.title ?? "",
              description: o?.description ?? "",
              keywords: o?.keywords ?? [],
              canonical: o?.canonical ?? "",
              ogImage: o?.ogImage ?? "",
              noindex: o?.noindex ?? false,
              excludeFromSitemap: o?.excludeFromSitemap ?? false,
            }}
          />
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <p className="text-[12px] text-fg-subtle">{o?.updatedAt ? `Last saved ${new Date(o.updatedAt).toLocaleString("en-IN")}` : "Using the page's built-in SEO."}</p>
            <div className="flex gap-2">
              {o ? (
                <button formAction={resetSeoPageAction} className={`${btn} border border-line text-fg-muted hover:text-fg`}>
                  <RotateCcw className="h-4 w-4" /> Use built-in SEO
                </button>
              ) : null}
              <button type="submit" className="btn-brand !px-4 !py-2 text-[13px]">
                <Save className="h-4 w-4" /> Save SEO
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

async function SettingsTab() {
  const s = await getSeoSettings();
  const card = `${adminCardClassName} p-5 sm:p-6`;
  const h = "font-display text-[16px] font-bold text-fg";
  const sub = "mt-0.5 text-[13px] text-fg-muted";

  return (
    <form action={saveSeoSettingsAction} className="grid gap-5">
      <section className={card}>
        <h2 className={h}>Analytics</h2>
        <p className={sub}>Paste only the ID. The tracking code is added to every page automatically.</p>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <AdminField label="Google Analytics 4 — Measurement ID" hint="Analytics → Admin → Data streams. Looks like G-XXXXXXXXXX.">
            <AdminInput name="ga4Id" defaultValue={s.ga4Id} placeholder="G-XXXXXXXXXX" />
          </AdminField>
          <AdminField label="Google Tag Manager — Container ID" hint="Optional. Looks like GTM-XXXXXXX. Don't add GA4 in both places.">
            <AdminInput name="gtmId" defaultValue={s.gtmId} placeholder="GTM-XXXXXXX" />
          </AdminField>
          <AdminField label="Microsoft Clarity — Project ID" hint="Heatmaps and session recordings. clarity.microsoft.com → Settings.">
            <AdminInput name="clarityId" defaultValue={s.clarityId} placeholder="abcd1234ef" />
          </AdminField>
          <AdminField label="Meta (Facebook) Pixel ID" hint="Numbers only. Events Manager → Data sources.">
            <AdminInput name="metaPixelId" defaultValue={s.metaPixelId} placeholder="123456789012345" />
          </AdminField>
        </div>
      </section>

      <section className={card}>
        <h2 className={h}>Webmaster tools verification</h2>
        <p className={sub}>Choose the “HTML tag” method in each tool and paste the code or the whole &lt;meta&gt; tag. After saving, click Verify in the tool and submit {SITE_URL}/sitemap.xml.</p>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <AdminField label="Google Search Console">
            <AdminInput name="googleVerification" defaultValue={s.googleVerification} placeholder='<meta name="google-site-verification" content="…">' />
          </AdminField>
          <AdminField label="Bing Webmaster Tools">
            <AdminInput name="bingVerification" defaultValue={s.bingVerification} placeholder='<meta name="msvalidate.01" content="…">' />
          </AdminField>
          <AdminField label="Yandex Webmaster">
            <AdminInput name="yandexVerification" defaultValue={s.yandexVerification} />
          </AdminField>
          <AdminField label="Pinterest">
            <AdminInput name="pinterestVerification" defaultValue={s.pinterestVerification} />
          </AdminField>
          <AdminField label="Facebook domain verification">
            <AdminInput name="facebookVerification" defaultValue={s.facebookVerification} />
          </AdminField>
        </div>
      </section>

      <section className={card}>
        <h2 className={h}>Search engine defaults</h2>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <AdminField label="Default meta description" hint="Used on any page without its own description.">
              <AdminTextarea name="defaultDescription" defaultValue={s.defaultDescription} className="min-h-20" />
            </AdminField>
          </div>
          <AdminField label="Default social share image" hint="1200×630. Site path or full URL.">
            <AdminInput name="defaultOgImage" defaultValue={s.defaultOgImage} />
          </AdminField>
          <AdminField label="X (Twitter) handle">
            <AdminInput name="twitterHandle" defaultValue={s.twitterHandle} placeholder="@Alpixn" />
          </AdminField>
          <AdminField label="Blocked paths in robots.txt" hint="One per line. /admin and /api are always blocked.">
            <AdminTextarea name="disallowPaths" defaultValue={s.disallowPaths.join("\n")} className="min-h-20" placeholder="/demos" />
          </AdminField>
          <AdminField label="Official social profiles" hint="One URL per line. Added to the Organization schema so Google can link your profiles.">
            <AdminTextarea name="organizationSameAs" defaultValue={s.organizationSameAs.join("\n")} className="min-h-20" />
          </AdminField>
          <div className="lg:col-span-2">
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-canvas p-4">
              <input type="checkbox" name="indexSite" defaultChecked={s.indexSite} className="mt-0.5 h-4 w-4 accent-[#0878d1]" />
              <span>
                <span className="block text-[14px] font-semibold text-fg">Allow search engines to index the website</span>
                <span className="block text-[12.5px] text-fg-muted">Untick only for a staging or preview copy. When off, every page gets noindex and robots.txt blocks crawling.</span>
              </span>
            </label>
          </div>
        </div>
      </section>

      <div className="sticky bottom-0 flex justify-end border-t border-line bg-canvas/90 py-3 backdrop-blur">
        <button type="submit" className="btn-brand !px-5 !py-2.5 text-[13.5px]">
          <Save className="h-4 w-4" /> Save SEO settings
        </button>
      </div>
    </form>
  );
}
