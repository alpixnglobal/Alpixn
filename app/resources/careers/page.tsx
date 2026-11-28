import CareersHeroSection from "@/components/sections/careers/CareersHeroSection";
import SearchJobsSection from "@/components/sections/careers/SearchJobsSection";
import ShapeFuturSection from "@/components/sections/careers/ShapeFuturSection";
import { getCachedPublishedJobs, getCachedSiteSettings, getResourceUiSettings } from "@/lib/content-service";
import { pageMetadata } from "@/lib/seo";
import { withSeo } from "@/lib/seo-store";

export async function generateMetadata() {
  return withSeo("/resources/careers", pageMetadata({
    title: "Careers at ALPIXN",
    description: "Join ALPIXN and work on AI, robotics and software products. See open roles, locations and how to apply.",
    path: "/resources/careers",
  }));
}

const CareersPage = async () => {
  const [jobs, siteSettings, uiSettings] = await Promise.all([getCachedPublishedJobs(), getCachedSiteSettings(), getResourceUiSettings()]);
  const pageCopy = siteSettings.pageContent.careers;

  return (
    <>
      <CareersHeroSection title={pageCopy.heroTitle} description={pageCopy.heroDescription} jobs={jobs.map((j) => ({ slug: j.slug, title: j.title, type: j.type, mode: j.mode, location: j.location }))} />
      <SearchJobsSection
        jobs={jobs}
        searchPlaceholder={uiSettings.careers.searchPlaceholder}
        typeLabel={uiSettings.careers.typeLabel}
        allTypesLabel={uiSettings.careers.allTypesLabel}
        modeLabel={uiSettings.careers.modeLabel}
        allModesLabel={uiSettings.careers.allModesLabel}
        viewDetailsLabel={uiSettings.careers.viewDetailsLabel}
        emptyMessage={uiSettings.careers.emptyMessage}
      />
      <ShapeFuturSection
        title={pageCopy.ctaTitle}
        description={pageCopy.ctaDescription}
        buttonLabel={pageCopy.ctaButtonLabel}
        buttonHref={pageCopy.ctaButtonHref}
      />
    </>
  );
};

export default CareersPage;
