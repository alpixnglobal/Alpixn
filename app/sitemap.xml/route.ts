import { SITE_URL } from "@/lib/seo";
import { getCachedSeoPageOverrides, getCachedSeoSettings } from "@/lib/seo-store";
import { getAllSitePaths } from "@/lib/site-paths";

export const revalidate = 3600;

const escapeXml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** XML sitemap for search engines. Pages marked noindex or "exclude from sitemap" in the admin SEO manager are left out. */
export async function GET() {
  const [paths, overrides, settings] = await Promise.all([getAllSitePaths(), getCachedSeoPageOverrides(), getCachedSeoSettings()]);
  const hidden = new Set(overrides.filter((o) => o.noindex || o.excludeFromSitemap).map((o) => o.path));
  const entries = settings.indexSite ? paths.filter((p) => !hidden.has(p.path)) : [];

  const body = entries
    .map((p) => {
      const lastmod = p.lastModified && !Number.isNaN(Date.parse(p.lastModified)) ? `<lastmod>${new Date(p.lastModified).toISOString().slice(0, 10)}</lastmod>` : "";
      const priority = p.priority !== undefined ? `<priority>${p.priority.toFixed(1)}</priority>` : "";
      return `<url><loc>${escapeXml(SITE_URL + (p.path === "/" ? "" : p.path))}</loc>${lastmod}${priority}</url>`;
    })
    .join("");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`, {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=3600" },
  });
}
