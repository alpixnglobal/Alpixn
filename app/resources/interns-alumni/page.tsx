import BlackGg from "@/components/sections/interns-alumni/BlackGg";
import IntensAlumniHeroSection from "@/components/sections/interns-alumni/IntensAlumniHeroSection";
import NextBatchSection from "@/components/sections/interns-alumni/NextBatchSection";
import SearchInternsSection from "@/components/sections/interns-alumni/SearchInternsSection";
import { getCachedPublishedInterns, getCachedSiteSettings, getResourceUiSettings } from "@/lib/content-service";
import { pageMetadata } from "@/lib/seo";
import { withSeo } from "@/lib/seo-store";

export async function generateMetadata() {
  return withSeo("/resources/interns-alumni", pageMetadata({
    title: "Internship Alumni",
    description: "ALPIXN internship alumni and the work they contributed to during their time with our engineering teams.",
    path: "/resources/interns-alumni",
  }));
}

const InternsAlumniPage = async () => {
  const [interns, siteSettings, uiSettings] = await Promise.all([getCachedPublishedInterns(), getCachedSiteSettings(), getResourceUiSettings()]);
  const pageCopy = siteSettings.pageContent.interns;

  return (
    <>
      <IntensAlumniHeroSection title={pageCopy.heroTitle} description={pageCopy.heroDescription} />
      <SearchInternsSection interns={interns} {...uiSettings.interns} />
      <BlackGg />
      <NextBatchSection
        title={pageCopy.ctaTitle}
        description={pageCopy.ctaDescription}
        buttonLabel={pageCopy.ctaButtonLabel}
        buttonHref={pageCopy.ctaButtonHref}
      />
      <BlackGg />
    </>
  );
};

export default InternsAlumniPage;
