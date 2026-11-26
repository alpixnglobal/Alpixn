import type { PortfolioCard } from "@/components/portfolio/PortfolioExplorer";
import type { PortfolioProjectRecord } from "@/lib/content-types";

/** Map a CMS portfolio record to the public card shape (live URLs only for verified real projects). */
export function toPortfolioCard(p: PortfolioProjectRecord): PortfolioCard {
  const desktop = p.screenshots?.find((s) => s.device === "desktop")?.src;
  return {
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    industry: p.industry,
    country: p.country ?? "",
    projectTypes: p.projectTypes ?? [],
    techStack: p.techStack ?? [],
    status: p.verificationStatus === "real" ? "real" : "concept",
    image: desktop || p.imageData || p.galleryImageOne || "/opengraph-image.jpg",
    demoPath: p.demoPath || undefined,
    liveUrl: p.verificationStatus === "real" && p.liveUrl ? p.liveUrl : undefined,
    featured: p.featured,
  };
}
