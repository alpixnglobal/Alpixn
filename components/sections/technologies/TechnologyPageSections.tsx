import TechDetailHero from "@/components/hero/TechDetailHero";
import FAQExpertiseSection from "@/components/sections/our-expertise/FAQExpertiseSection";
import IndustriesTechBand from "@/components/sections/shared/IndustriesTechBand";
import type { TechnologyPageRecord } from "@/lib/content-types";
import { TECH_CONTENT, isTemplateContent, techIcon, techPageFields } from "@/lib/technologies";
import { technologyHeroData } from "@/lib/technologyData";

import ChallengesResolveSection from "./ChallengesResolveSection";
import EngagementModelTechnologieSection from "./EngagementModelTechnologieSection";
import ExpertGuidanceSection from "./ExpertGuidanceSection";
import QualityService from "./QualityService";
import SuccessPropelSection from "./SuccessPropelSection";
import TalkToExpertSection from "./TalkToExpertSection";
import UnlockCTASection from "./UnlockCTASection";

const CATEGORY_LABEL: Record<string, string> = { backend: "Backend", frontend: "Frontend", framework: "Frameworks", mobile: "Mobile", devops: "Cloud & DevOps", more: "Platforms & XR" };
const RELATED_LABEL: Record<string, string> = { backend: "backend tech", frontend: "frontend tech", framework: "frameworks", mobile: "mobile tech", devops: "cloud platforms", more: "platforms" };

export function TechnologyPageSections({ page: stored }: { page: TechnologyPageRecord }) {
  // Pages still holding the original Node.js template get their technology's own content;
  // anything edited in the CMS is left exactly as the editor wrote it.
  const generated = techPageFields(stored.slug);
  const page: TechnologyPageRecord = generated && isTemplateContent(stored) ? { ...stored, ...generated } : stored;
  const content = TECH_CONTENT[page.slug];
  const related = Object.values(technologyHeroData)
    .filter((t) => t.category === page.category && t.slug !== page.slug && TECH_CONTENT[t.slug])
    .map((t) => ({ name: TECH_CONTENT[t.slug].name, href: `/technologies/${t.category}/${t.slug}`, icon: techIcon(t.slug) }));

  return (
    <>
      <TechDetailHero
        name={content?.name ?? page.heroTitle}
        category={RELATED_LABEL[page.category] ?? "technologies"}
        categoryLabel={CATEGORY_LABEL[page.category] ?? page.category}
        title={page.heroTitle}
        subtitle={page.heroSubtitle}
        description={page.heroDescription}
        icon={content ? techIcon(page.slug) : "/images/tech/node-js.svg"}
        accent={content?.accent ?? "#0878d1"}
        bestFor={(page.qualityPoints ?? []).map((q) => q.title)}
        weBuild={(page.successCards ?? []).map((c) => c.title)}
        related={related}
      />
      <ChallengesResolveSection title={page.challengesTitle} cards={page.challengeCards} />
      <UnlockCTASection title={page.unlockTitle} buttonLabel={page.unlockButtonLabel} buttonHref={page.unlockButtonHref} />
      {page.talkCards.length ? <TalkToExpertSection title={page.talkTitle} buttonLabel={page.talkButtonLabel} buttonHref={page.talkButtonHref} cards={page.talkCards} /> : null}
      <SuccessPropelSection title={page.successTitle} cards={page.successCards} />
      <QualityService eyebrow={page.qualityEyebrow} title={page.qualityTitle} description={page.qualityDescription} points={page.qualityPoints} />
      <ExpertGuidanceSection title={page.guidanceTitle} buttonLabel={page.guidanceButtonLabel} buttonHref={page.guidanceButtonHref} />
      <IndustriesTechBand show="industries" />
      <EngagementModelTechnologieSection title={page.engagementTitle} description={page.engagementDescription} models={page.engagementModels} />
      <FAQExpertiseSection title={page.faqTitle} items={page.faqs} />
    </>
  );
}
