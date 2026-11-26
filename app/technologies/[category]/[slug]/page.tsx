import { notFound } from "next/navigation";
import { TechnologyPageSections } from "@/components/sections/technologies/TechnologyPageSections";
import { getPublishedTechnologyPage } from "@/lib/content-service";

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

  return <TechnologyPageSections page={technologyPage} />;
}

export async function generateMetadata({ params }: PageProps) {
  const { category, slug } = await params;
  const technologyData = await getPublishedTechnologyPage(category, slug);

  if (!technologyData) {
    return {
      title: "Technology Not Found",
      description: "The requested technology does not exist.",
    };
  }

  return {
    title: `${technologyData.heroTitle} | Technology`,
    description: technologyData.heroDescription,
  };
}
