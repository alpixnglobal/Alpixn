import { notFound } from "next/navigation";
import { ExpertisePageSections } from "@/components/sections/our-expertise/ExpertisePageSections";
import { getExpertiseSettings, getPublishedExpertisePage, getPublishedExpertisePages, getSiteSettings } from "@/lib/content-service";
import { buildExpertiseSeedRecords } from "@/lib/expertise-seed";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd, toDescription } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { withSeo } from "@/lib/seo-store";

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

  const path = `/our-expertise/${category}/${slug}`;
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Our Expertise", path: "/our-expertise" }, { name: page.navLabel, path }]),
          serviceJsonLd({ name: page.navLabel, description: page.heroDescription, path }),
          ...(page.faqs?.length ? [faqJsonLd(page.faqs)] : []),
        ]}
      />
      <ExpertisePageSections page={page} settings={settings} sharedHighlights={siteSettings.sharedStats} />
    </>
  );
}

async function baseMetadata({ params }: PageProps) {
  const { category, slug } = await params;
  const bannerData = await getPublishedExpertisePage(category, slug);

  if (!bannerData) {
    return {
      title: "Expertise Not Found",
      description: "The requested expertise area does not exist.",
    };
  }

  return pageMetadata({
    title: `${bannerData.navLabel} Services`,
    description: toDescription(bannerData.heroDescription),
    path: `/our-expertise/${category}/${slug}`,
  });
}

export async function generateMetadata(props: Parameters<typeof baseMetadata>[0]) {
  const p = (await props.params) as Record<string, string>;
  return withSeo(`/our-expertise/${p.category}/${p.slug}`, await baseMetadata(props));
}
