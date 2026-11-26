import { OffshoreDeveloperPageSections } from "@/components/sections/nodejs-developer/OffshoreDeveloperPageSections";
import { notFound } from "next/navigation";
import { getOffshoreDeveloperSettings, getPublishedOffshoreDeveloperPage } from "@/lib/content-service";

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

  return <OffshoreDeveloperPageSections page={page} settings={settings} />;
}

export async function generateMetadata({ params }: PageProps) {
  const { category, slug } = await params;
  const page = await getPublishedOffshoreDeveloperPage(category, slug);

  if (!page) {
    return {
      title: "Offshore Developer Not Found",
      description: "The requested offshore developer page does not exist.",
    };
  }

  return {
    title: page.heroTitle.replace(/<br\s*\/?\s*>/gi, " "),
    description: page.heroDescription,
  };
}
