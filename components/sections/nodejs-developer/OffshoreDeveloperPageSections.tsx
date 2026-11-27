// import CaseStudySection from "@/components/sections/CaseStudySection";
import FAQSection from "@/components/sections/product/FAQSection";
import type { OffshoreDeveloperPageRecord, OffshoreDeveloperSettingsRecord } from "@/lib/content-types";

import BackendDeveloperSection from "./BackendDeveloperSection";
import ContactExpert from "./ContactExpert";
// import CtaSection from "./CtaSection";
import EngagementModelSection from "./EngagementModelSection";
import ExcellenceOfNodeDev from "./ExcellenceOfNodeDev";
import HireNodeDevSection from "./HireNodeDevSection";
import NodejsHireGuide from "./NodejsHireGuide";
import OffshoreHeroSection from "./OffshoreHeroSection";
import PartnerWithNodeTeam from "./PartnerWithNodeTeam";
import StepsToHireNodeDevSection from "./StepsToHireNodeDevSection";

export function OffshoreDeveloperPageSections({
  page,
  settings,
}: {
  page: OffshoreDeveloperPageRecord;
  settings: OffshoreDeveloperSettingsRecord;
}) {
  return (
    <>
      <OffshoreHeroSection
        pagePath={`/offshore-developer/${page.categoryKey}/${page.slug}`}
        role={page.heroTitle}
        badgeSlug={page.slug}
        badgeLabel={page.navLabel}
        data={{
          title: page.heroTitle,
          description: page.heroDescription,
          checklist: page.heroChecklist,
          formTitle: page.heroFormTitle,
          technologies: page.heroTechnologies,
        }}
      />
      {/* Partner logo strip removed: placeholder logos implied clients (2026 content review). */}
      <ExcellenceOfNodeDev
        data={{
          mainTitle: page.excellenceTitle,
          mainSubtitle: page.excellenceSubtitle,
          offerings: page.excellenceOfferings,
        }}
      />
      {/* <CtaSection data={{ title: page.ctaTitle, buttonText: page.ctaButtonText, buttonLink: page.ctaButtonLink }} /> */}
      <PartnerWithNodeTeam
        data={{
          mainTitle: page.partnerTitle,
          buttonText: page.partnerButtonText,
          buttonLink: page.partnerButtonLink,
          items: page.partnerItems,
        }}
      />
      <BackendDeveloperSection data={{ title: page.developerGridTitle, developers: page.developerItems }} />
      {/* Testimonials removed until verified, client-approved quotes are available. */}
      <HireNodeDevSection data={{ title: page.hireTitle, subtitle: page.hireSubtitle, services: page.hireServices }} />
      <ContactExpert slug={page.slug} overrideTitle={page.contactTitle} overrideButtonText={page.contactButtonText} overrideButtonLink={page.contactButtonLink} />
      {/* <CaseStudySection title={settings.caseStudyTitle} subtitle={settings.caseStudySubtitle} cases={settings.caseStudies} /> */}
      <NodejsHireGuide data={{ mainTitle: page.guideTitle, tabs: page.guideTabs }} />
      <StepsToHireNodeDevSection
        data={{
          mainTitle: page.stepsTitle,
          buttonText: page.stepsButtonText,
          buttonLink: page.stepsButtonLink,
          steps: page.steps,
        }}
      />
      <EngagementModelSection
        data={{
          mainTitle: page.engagementTitle,
          mainSubtitle: page.engagementSubtitle,
          models: page.engagementModels,
        }}
      />
      <FAQSection
        title={page.faqs?.length ? `${page.navLabel} FAQs` : settings.faqTitle}
        items={page.faqs?.length ? page.faqs : settings.faqs}
        questionClassName="text-lg md:text-[22px]"
      />
    </>
  );
}
