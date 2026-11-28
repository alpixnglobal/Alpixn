"use client";

import { useState } from "react";
import { AdminField, AdminInput, AdminTextarea } from "@/components/admin/admin-ui";

type Values = {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogImage: string;
  noindex: boolean;
  excludeFromSitemap: boolean;
};

function Counter({ value, ideal, max }: { value: string; ideal: [number, number]; max: number }) {
  const n = value.length;
  const tone = n === 0 ? "text-fg-subtle" : n < ideal[0] ? "text-[#d99a19]" : n <= ideal[1] ? "text-[#1f9d55]" : n <= max ? "text-[#d99a19]" : "text-red-500";
  return (
    <span className={`text-[11.5px] font-semibold ${tone}`}>
      {n} / {ideal[1]}
    </span>
  );
}

/** Per-page SEO fields with a live Google result preview. */
export function SeoPageEditor({ values, siteUrl, label }: { values: Values; siteUrl: string; label: string }) {
  const [title, setTitle] = useState(values.title);
  const [description, setDescription] = useState(values.description);
  const previewTitle = title || `${label} | ALPIXN`;
  const previewDesc = description || "The page's built-in description is used when this is empty.";

  return (
    <div className="grid gap-5">
      <input type="hidden" name="path" value={values.path} />

      <div className="rounded-2xl border border-line bg-canvas p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-subtle">Google preview</p>
        <p className="mt-2 truncate text-[12.5px] text-fg-muted">{siteUrl.replace(/^https?:\/\//, "")}{values.path === "/" ? "" : values.path.replace(/\//g, " › ").replace(/^ › /, " › ")}</p>
        <p className="mt-0.5 line-clamp-1 text-[18px] leading-snug text-[#1a0dab] dark:text-[#8ab4f8]">{previewTitle}</p>
        <p className="mt-1 line-clamp-2 text-[13.5px] leading-relaxed text-fg-muted">{previewDesc}</p>
      </div>

      <AdminField label="SEO title" hint="Shown as the blue link in Google. Aim for 50–60 characters. Leave empty to use the page's built-in title.">
        <div className="relative">
          <AdminInput name="title" value={title} maxLength={200} onChange={(e) => setTitle(e.target.value)} placeholder={`${label} | ALPIXN`} />
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            <Counter value={title} ideal={[30, 60]} max={70} />
          </span>
        </div>
      </AdminField>

      <AdminField label="SEO description" hint="Shown under the title in Google. Aim for 120–160 characters.">
        <div className="relative">
          <AdminTextarea name="description" value={description} maxLength={400} onChange={(e) => setDescription(e.target.value)} className="min-h-24 pr-16" />
          <span className="absolute bottom-2.5 right-3">
            <Counter value={description} ideal={[110, 160]} max={180} />
          </span>
        </div>
      </AdminField>

      <AdminField label="SEO keywords" hint="Comma separated. Google ignores the keywords tag for ranking, but some tools and other search engines read it.">
        <AdminInput name="keywords" defaultValue={values.keywords.join(", ")} placeholder="ai development company, custom software india" />
      </AdminField>

      <div className="grid gap-5 lg:grid-cols-2">
        <AdminField label="Canonical URL" hint="Only if another URL is the main version of this page.">
          <AdminInput name="canonical" defaultValue={values.canonical} placeholder={`${siteUrl}${values.path}`} />
        </AdminField>
        <AdminField label="Social share image" hint="1200×630 image URL used on LinkedIn, Facebook, X and WhatsApp.">
          <AdminInput name="ogImage" defaultValue={values.ogImage} placeholder="https://res.cloudinary.com/…/share.jpg" />
        </AdminField>
      </div>

      <div className="flex flex-wrap gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2.5 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-[13.5px] text-fg hover:border-[#d99a19]/50">
          <input type="checkbox" name="noindex" defaultChecked={values.noindex} className="h-4 w-4 accent-[#0878d1]" />
          Hide from Google (noindex)
        </label>
        <label className="inline-flex cursor-pointer items-center gap-2.5 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-[13.5px] text-fg hover:border-[#d99a19]/50">
          <input type="checkbox" name="excludeFromSitemap" defaultChecked={values.excludeFromSitemap} className="h-4 w-4 accent-[#0878d1]" />
          Leave out of sitemap.xml
        </label>
      </div>
    </div>
  );
}
