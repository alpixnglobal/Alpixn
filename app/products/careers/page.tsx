import CareersHeroSection from "@/components/sections/careers/CareersHeroSection";
import SearchJobsSection from "@/components/sections/careers/SearchJobsSection";
import ShapeFuturSection from "@/components/sections/careers/ShapeFuturSection";
import { getPublishedJobs, getSiteSettings } from "@/lib/content-service";

const CareersPage = async () => {
  const [jobs, siteSettings] = await Promise.all([getPublishedJobs(), getSiteSettings()]);
  const pageCopy = siteSettings.pageContent.careers;

  return (
    <>
      <CareersHeroSection title={pageCopy.heroTitle} description={pageCopy.heroDescription} />
      <SearchJobsSection jobs={jobs} />
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
