import { notFound } from "next/navigation";

import { ExpertisePageSections } from "@/components/sections/our-expertise/ExpertisePageSections";
import { getCachedExpertiseSettings, getCachedPublishedExpertisePages, getCachedSiteSettings } from "@/lib/content-service";
import { pageMetadata } from "@/lib/seo";
import { withSeo } from "@/lib/seo-store";

export async function generateMetadata() {
  return withSeo("/our-expertise", pageMetadata({
    title: "Our Expertise: Software, AI and Industry Solutions",
    description: "Custom software, AI and industry solutions from ALPIXN — explore our software development, generative AI, automation and industry expertise.",
    path: "/our-expertise/software-solution/software-development",
  }));
}

const OurExpertisePage = async () => {
  const [pages, settings, siteSettings] = await Promise.all([
    getCachedPublishedExpertisePages(),
    getCachedExpertiseSettings(),
    getCachedSiteSettings(),
  ]);
  const page = pages[0];

  if (!page) {
    notFound();
  }

  return <ExpertisePageSections page={page} settings={settings} sharedHighlights={siteSettings.sharedStats} />;
};

export default OurExpertisePage;
