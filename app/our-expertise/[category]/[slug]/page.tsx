import { notFound } from "next/navigation";
import { ExpertisePageSections } from "@/components/sections/our-expertise/ExpertisePageSections";
import { getExpertiseSettings, getPublishedExpertisePage, getPublishedExpertisePages, getSiteSettings } from "@/lib/content-service";
import { buildExpertiseSeedRecords } from "@/lib/expertise-seed";

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const pages = await getPublishedExpertisePages();
    if (pages.length > 0) {
      return pages.map((page) => ({ category: page.categoryKey, slug: page.slug }));
    }
  } catch {
    // DB unavailable — fall through to seed data
  }
  // Always generate routes from seed data as baseline
  return buildExpertiseSeedRecords()
    .filter((p) => p.isPublished)
    .map((p) => ({ category: p.categoryKey, slug: p.slug }));
}

export const dynamicParams = true;

export default async function ExpertisePage({ params }: PageProps) {
  const { category, slug } = await params;

  const [page, settings, siteSettings] = await Promise.all([
    getPublishedExpertisePage(category, slug),
    getExpertiseSettings(),
    getSiteSettings(),
  ]);

  if (!page) {
    notFound();
  }

  return <ExpertisePageSections page={page} settings={settings} sharedHighlights={siteSettings.sharedStats} />;
}

export async function generateMetadata({ params }: PageProps) {
  const { category, slug } = await params;
  const bannerData = await getPublishedExpertisePage(category, slug);

  if (!bannerData) {
    return {
      title: "Expertise Not Found",
      description: "The requested expertise area does not exist.",
    };
  }

  return {
    title: `${bannerData.heroTitle} | Our Expertise`,
    description: bannerData.heroDescription,
  };
}
