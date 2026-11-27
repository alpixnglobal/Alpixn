import { getCachedHomeSettings } from "@/lib/content-service";
import FAQExpertiseSection from "@/components/sections/our-expertise/FAQExpertiseSection";
import type { TechnologyPageRecord } from "@/lib/content-types";

import ChallengesResolveSection from "./ChallengesResolveSection";
import EngagementModelTechnologieSection from "./EngagementModelTechnologieSection";
import ExpertGuidanceSection from "./ExpertGuidanceSection";
import IndustriesTechBand from "@/components/sections/shared/IndustriesTechBand";
// import ProvenPioneerSection from "./ProvenPioneerSection";
import QualityService from "./QualityService";
import SuccessPropelSection from "./SuccessPropelSection";
import TalkToExpertSection from "./TalkToExpertSection";
import TechnologiesHeroSection from "./TechnologiesHeroSection";
import UnlockCTASection from "./UnlockCTASection";

export async function TechnologyPageSections({ page }: { page: TechnologyPageRecord }) {
  const home = await getCachedHomeSettings();
  const seen = new Set<string>();
  const icons = home.techStackTabs.flatMap((t) => t.items).filter((i) => i.imageData && !seen.has(i.label) && seen.add(i.label));
  return (
    <>
      <TechnologiesHeroSection
        subtitle={page.heroSubtitle}
        title={page.heroTitle}
        description={page.heroDescription}
        primaryButtonLabel={page.heroPrimaryButtonLabel}
        primaryButtonHref={page.heroPrimaryButtonHref}
        secondaryButtonLabel={page.heroSecondaryButtonLabel}
        secondaryButtonHref={page.heroSecondaryButtonHref}
        logos={page.heroLogos}
        icons={icons}
      />
      <ChallengesResolveSection title={page.challengesTitle} cards={page.challengeCards} />
      <UnlockCTASection title={page.unlockTitle} buttonLabel={page.unlockButtonLabel} buttonHref={page.unlockButtonHref} />
      <TalkToExpertSection title={page.talkTitle} buttonLabel={page.talkButtonLabel} buttonHref={page.talkButtonHref} cards={page.talkCards} />
      <SuccessPropelSection title={page.successTitle} cards={page.successCards} />
      {/* <ProvenPioneerSection title={page.provenTitle} description={page.provenDescription} cases={page.provenCaseStudies} /> */}
      <ExpertGuidanceSection title={page.guidanceTitle} buttonLabel={page.guidanceButtonLabel} buttonHref={page.guidanceButtonHref} />
      <QualityService eyebrow={page.qualityEyebrow} title={page.qualityTitle} description={page.qualityDescription} points={page.qualityPoints} />
      <IndustriesTechBand />
      <EngagementModelTechnologieSection title={page.engagementTitle} description={page.engagementDescription} models={page.engagementModels} />
      <FAQExpertiseSection title={page.faqTitle} items={page.faqs} questionClassName="text-lg md:text-[22px]" />
    </>
  );
}
