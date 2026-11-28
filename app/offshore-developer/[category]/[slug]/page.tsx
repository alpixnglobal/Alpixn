import { OffshoreDeveloperPageSections } from "@/components/sections/nodejs-developer/OffshoreDeveloperPageSections";
import { notFound } from "next/navigation";
import { getOffshoreDeveloperSettings, getPublishedOffshoreDeveloperPage } from "@/lib/content-service";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd, toDescription } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { withSeo } from "@/lib/seo-store";

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export default async function OffshoreDeveloperPage({ params }: PageProps) {
  const { category, slug } = await params;
  const [page, settings] = await Promise.all([getPublishedOffshoreDeveloperPage(category, slug), getOffshoreDeveloperSettings()]);

  if (!page) {
    notFound();
  }

  const path = `/offshore-developer/${category}/${slug}`;
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Offshore Developers", path: "/offshore-developer" }, { name: page.navLabel, path }]),
          serviceJsonLd({ name: `Hire ${page.navLabel}`, description: page.heroDescription, path, serviceType: "Offshore software development" }),
          ...(page.faqs?.length ? [faqJsonLd(page.faqs)] : []),
        ]}
      />
      <OffshoreDeveloperPageSections page={page} settings={settings} />
    </>
  );
}

async function baseMetadata({ params }: PageProps) {
  const { category, slug } = await params;
  const page = await getPublishedOffshoreDeveloperPage(category, slug);

  if (!page) {
    return {
      title: "Offshore Developer Not Found",
      description: "The requested offshore developer page does not exist.",
    };
  }

  return pageMetadata({
    title: page.heroTitle.replace(/<br\s*\/?\s*>/gi, " "),
    description: toDescription(page.heroDescription),
    path: `/offshore-developer/${category}/${slug}`,
  });
}

export async function generateMetadata(props: Parameters<typeof baseMetadata>[0]) {
  const p = (await props.params) as Record<string, string>;
  return withSeo(`/offshore-developer/${p.category}/${p.slug}`, await baseMetadata(props));
}
