import { notFound } from "next/navigation";

import { ExpertisePageSections } from "@/components/sections/our-expertise/ExpertisePageSections";
import { getCachedExpertiseSettings, getCachedPublishedExpertisePages, getCachedSiteSettings } from "@/lib/content-service";

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
