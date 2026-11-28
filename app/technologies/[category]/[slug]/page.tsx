import { notFound } from "next/navigation";
import { TechnologyPageSections } from "@/components/sections/technologies/TechnologyPageSections";
import { getPublishedTechnologyPage } from "@/lib/content-service";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd, toDescription } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { withSeo } from "@/lib/seo-store";

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export default async function TechnologyPage({ params }: PageProps) {
  const { category, slug } = await params;

  const technologyPage = await getPublishedTechnologyPage(category, slug);

  if (!technologyPage) {
    notFound();
  }

  const path = `/technologies/${category}/${slug}`;
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Technologies", path: "/technologies" }, { name: technologyPage.heroTitle, path }]),
          serviceJsonLd({ name: technologyPage.heroTitle, description: technologyPage.heroDescription, path }),
        ]}
      />
      <TechnologyPageSections page={technologyPage} />
    </>
  );
}

async function baseMetadata({ params }: PageProps) {
  const { category, slug } = await params;
  const technologyData = await getPublishedTechnologyPage(category, slug);

  if (!technologyData) {
    return {
      title: "Technology Not Found",
      description: "The requested technology does not exist.",
    };
  }

  return pageMetadata({
    title: technologyData.heroTitle,
    description: toDescription(technologyData.heroDescription),
    path: `/technologies/${category}/${slug}`,
  });
}

export async function generateMetadata(props: Parameters<typeof baseMetadata>[0]) {
  const p = (await props.params) as Record<string, string>;
  return withSeo(`/technologies/${p.category}/${p.slug}`, await baseMetadata(props));
}
