import BlackGg from "@/components/sections/interns-alumni/BlackGg";
import ImproveBusinessSection from "@/components/sections/portfolio/ImproveBusinessSection";
import PortfolioHeroSection from "@/components/sections/portfolio/PortfolioHeroSection";
import WorkShowcaseSection from "@/components/sections/portfolio/WorkShowcaseSection";
import { getCachedPublishedPortfolioProjects, getCachedSiteSettings, getResourceUiSettings } from "@/lib/content-service";

const PortfolioPage = async () => {
  const [projects, siteSettings, uiSettings] = await Promise.all([getCachedPublishedPortfolioProjects(), getCachedSiteSettings(), getResourceUiSettings()]);
  const pageCopy = siteSettings.pageContent.portfolio;

  return (
    <>
      <PortfolioHeroSection title={pageCopy.heroTitle} description={pageCopy.heroDescription} />
      <WorkShowcaseSection
        projects={projects}
        title={pageCopy.sectionTitle}
        searchPlaceholder={uiSettings.portfolio.searchPlaceholder}
        selectedIndustryLabel={uiSettings.portfolio.industryLabel}
        allIndustriesLabel={uiSettings.portfolio.allIndustriesLabel}
        selectedTagLabel={uiSettings.portfolio.tagLabel}
        allTagsLabel={uiSettings.portfolio.allTagsLabel}
        resultsLabel={uiSettings.portfolio.resultsLabel}
        clearAllLabel={uiSettings.portfolio.clearAllLabel}
        emptyMessage={uiSettings.portfolio.emptyMessage}
      />
      <BlackGg />
      <ImproveBusinessSection
        title={pageCopy.ctaTitle}
        description={pageCopy.ctaDescription}
        buttonLabel={pageCopy.ctaButtonLabel}
        buttonHref={pageCopy.ctaButtonHref}
      />
      <BlackGg />
    </>
  );
};

export default PortfolioPage;
