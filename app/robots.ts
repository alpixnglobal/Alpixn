import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getCachedSeoSettings } from "@/lib/seo-store";

export const revalidate = 3600;

/** robots.txt — managed from Admin → SEO (site indexing switch and extra blocked paths). */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getCachedSeoSettings();
  if (!settings.indexSite) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api/", ...settings.disallowPaths] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
