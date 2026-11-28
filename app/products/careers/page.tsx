import CareersHeroSection from "@/components/sections/careers/CareersHeroSection";
import SearchJobsSection from "@/components/sections/careers/SearchJobsSection";
import ShapeFuturSection from "@/components/sections/careers/ShapeFuturSection";
import { getPublishedJobs, getSiteSettings } from "@/lib/content-service";
import { pageMetadata } from "@/lib/seo";
import { withSeo } from "@/lib/seo-store";

export async function generateMetadata() {
  return withSeo("/products/careers", pageMetadata({
    title: "Careers",
    description: "Open roles at ALPIXN in AI, robotics and software engineering.",
    path: "/resources/careers",
  }));
}

const CareersPage = async () => {
  const [jobs, siteSettings] = await Promise.all([getPublishedJobs(), getSiteSettings()]);
  const pageCopy = siteSettings.pageContent.careers;

  return (
    <>
      <CareersHeroSection title={pageCopy.heroTitle} description={pageCopy.heroDescription} jobs={jobs.map((j) => ({ slug: j.slug, title: j.title, type: j.type, mode: j.mode, location: j.location }))} />
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
