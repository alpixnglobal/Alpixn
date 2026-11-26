import TechStackSection from "@/components/sections/TechStackSection";
import type { ExpertisePageRecord, ExpertiseSettingsRecord, SharedStatRecord } from "@/lib/content-types";

// import CaseStudySection from "./CaseStudySection";
import CustomSoftwareDevSection from "./CustomSoftwareDevSection";
import EngagementModelExpertiseSection from "./EngagementModelExpertiseSection";
import ExpertiseHeroSection from "./ExpertiseHeroSection";
import FAQExpertiseSection from "./FAQExpertiseSection";
import GuideToSofwareDevSection from "./GuideToSofwareDevSection";
import IndustriesWeServeExpertiseSection from "./IndustriesWeServeExpertiseSection";
import StartSofwareDevSection from "./StartSofwareDevSection";
// import TestimonialOurExpertise from "./TestimonialOurExpertise";
import WhyChooseUsOurExpertiseSection from "./WhyChooseUsOurExpertiseSection";

export function ExpertisePageSections({
  page,
  settings,
  sharedHighlights = [],
}: {
  page: ExpertisePageRecord;
  settings: ExpertiseSettingsRecord;
  sharedHighlights?: SharedStatRecord[];
}) {
  return (
    <>
      <ExpertiseHeroSection
        title={page.heroTitle}
        description={page.heroDescription}
        ctaButtonText={page.ctaButtonText}
        ctaButtonLink="/contact-us"
        logos={page.heroLogos}
        heroBackgroundImage={page.heroBackgroundImage}
      />
      {/* Stats section removed: figures were unverified template data (2026 content review). */}
      {/* <CaseStudySection data={{ mainTitle: page.caseStudyTitle, mainSubtitle: page.caseStudySubtitle, caseStudies: page.caseStudyTabs }} /> */}
      <CustomSoftwareDevSection
        data={{
          mainTitle: page.customTitle,
          mainSubtitle: page.customSubtitle,
          buttonText: page.customButtonText,
          buttonLink: page.customButtonLink,
          image: page.customImage,
          imageAlt: page.customImageAlt,
          benefits: page.customBenefits,
        }}
      />
      <WhyChooseUsOurExpertiseSection
        data={{ mainTitle: page.whyChooseTitle, mainSubtitle: page.whyChooseSubtitle, features: page.whyChooseFeatures }}
      />
      <IndustriesWeServeExpertiseSection
        data={{ mainTitle: page.industriesTitle, mainSubtitle: page.industriesSubtitle, industries: page.industriesItems }}
      />
      <TechStackSection title={settings.techStackTitle} description={settings.techStackDescription} tabs={settings.techStackTabs} />
      {/* <TestimonialOurExpertise title={settings.testimonialTitle} subtitle={settings.testimonialSubtitle} testimonials={settings.testimonials} /> */}
      <StartSofwareDevSection
        data={{ title: page.startTitle, subtitle: page.startSubtitle, buttonText: page.startButtonText, buttonLink: page.startButtonLink }}
      />
      <GuideToSofwareDevSection data={{ mainTitle: page.guideTitle, mainSubtitle: page.guideSubtitle, tabs: page.guideTabs }} />
      <EngagementModelExpertiseSection title={settings.engagementTitle} subtitle={settings.engagementSubtitle} models={settings.engagementModels} />
      <FAQExpertiseSection title={settings.faqTitle} items={settings.faqs} />
    </>
  );
}
