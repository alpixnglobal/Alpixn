import FAQExpertiseSection from "@/components/sections/our-expertise/FAQExpertiseSection";
import type { TechnologyPageRecord } from "@/lib/content-types";

import ChallengesResolveSection from "./ChallengesResolveSection";
import EngagementModelTechnologieSection from "./EngagementModelTechnologieSection";
import ExpertGuidanceSection from "./ExpertGuidanceSection";
import IndustriesLeader from "./IndustriesLeader";
import OurNodeStackSection from "./OurNodeStackSection";
// import ProvenPioneerSection from "./ProvenPioneerSection";
import QualityService from "./QualityService";
import SuccessPropelSection from "./SuccessPropelSection";
import TalkToExpertSection from "./TalkToExpertSection";
import TechnologiesHeroSection from "./TechnologiesHeroSection";
import UnlockCTASection from "./UnlockCTASection";

export function TechnologyPageSections({ page }: { page: TechnologyPageRecord }) {
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
      />
      <ChallengesResolveSection title={page.challengesTitle} cards={page.challengeCards} />
      <UnlockCTASection title={page.unlockTitle} buttonLabel={page.unlockButtonLabel} buttonHref={page.unlockButtonHref} />
      <TalkToExpertSection title={page.talkTitle} buttonLabel={page.talkButtonLabel} buttonHref={page.talkButtonHref} cards={page.talkCards} />
      <SuccessPropelSection title={page.successTitle} cards={page.successCards} />
      {/* <ProvenPioneerSection title={page.provenTitle} description={page.provenDescription} cases={page.provenCaseStudies} /> */}
      <ExpertGuidanceSection title={page.guidanceTitle} buttonLabel={page.guidanceButtonLabel} buttonHref={page.guidanceButtonHref} />
      <QualityService eyebrow={page.qualityEyebrow} title={page.qualityTitle} description={page.qualityDescription} points={page.qualityPoints} />
      <OurNodeStackSection title={page.stackTitle} items={page.stackItems} />
      {/* <IndustriesLeader title={page.leaderTitle} stats={page.leaderStats} /> */}
      <EngagementModelTechnologieSection title={page.engagementTitle} description={page.engagementDescription} models={page.engagementModels} />
      <FAQExpertiseSection title={page.faqTitle} items={page.faqs} questionClassName="text-lg md:text-[22px]" />
    </>
  );
}
