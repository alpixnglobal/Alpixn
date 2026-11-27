import IndustriesTechBand from "@/components/sections/shared/IndustriesTechBand";
import type { ExpertisePageRecord, ExpertiseSettingsRecord, SharedStatRecord } from "@/lib/content-types";

// import CaseStudySection from "./CaseStudySection";
import CustomSoftwareDevSection from "./CustomSoftwareDevSection";
import EngagementModelExpertiseSection from "./EngagementModelExpertiseSection";
import ExpertiseHero from "@/components/hero/ExpertiseHero";
import FAQExpertiseSection from "./FAQExpertiseSection";
import GuideToSofwareDevSection from "./GuideToSofwareDevSection";
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
      <ExpertiseHero
        categoryKey={page.categoryKey}
        slug={page.slug}
        name={page.navLabel}
        title={page.heroTitle}
        description={page.heroDescription}
        highlights={page.heroHighlights?.length ? page.heroHighlights : (page.customBenefits ?? []).map((b) => b.title)}
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
      <IndustriesTechBand />
      {/* <TestimonialOurExpertise title={settings.testimonialTitle} subtitle={settings.testimonialSubtitle} testimonials={settings.testimonials} /> */}
      <StartSofwareDevSection
        data={{ title: page.startTitle, subtitle: page.startSubtitle, buttonText: page.startButtonText, buttonLink: page.startButtonLink }}
      />
      <GuideToSofwareDevSection data={{ mainTitle: page.guideTitle, mainSubtitle: page.guideSubtitle, tabs: page.guideTabs }} />
      <EngagementModelExpertiseSection title={settings.engagementTitle} subtitle={settings.engagementSubtitle} models={settings.engagementModels} />
      <FAQExpertiseSection title={page.faqs?.length ? `${page.navLabel} FAQs` : settings.faqTitle} items={page.faqs?.length ? page.faqs : settings.faqs} />
    </>
  );
}
