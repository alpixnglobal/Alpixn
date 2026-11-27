import type { ExpertisePageRecord } from "@/lib/content-types";
import { getCustomSoftwareDevData } from "@/lib/expertise/custom-software-dev-section-data";
import { aiContent } from "./ai";
import { industryContent } from "./industries";
import { softwareContent } from "./software";
import type { ExpertiseContent } from "./types";

export type { ExpertiseContent } from "./types";

export const EXPERTISE_CONTENT: Record<string, ExpertiseContent> = {
  ...softwareContent,
  ...aiContent,
  ...industryContent,
};

/** Page fields generated from the unique copy for one expertise page. */
export function expertisePageFields(slug: string): Partial<ExpertisePageRecord> | null {
  const c = EXPERTISE_CONTENT[slug];
  if (!c) return null;
  const pad = (i: number) => String(i + 1).padStart(2, "0");
  return {
    heroTitle: c.title,
    heroDescription: c.intro,
    heroHighlights: c.highlights,
    ctaButtonText: "Book a free consultation",
    // Unverified template figures and third-party case studies are not carried over.
    statsHighlights: [],
    statsCards: [],
    caseStudyTabs: [],
    customTitle: c.benefitsTitle,
    customSubtitle: c.benefitsIntro,
    customButtonText: "Talk to an expert",
    customButtonLink: "/contact-us",
    customBenefits: c.benefits.map(([title, description], i) => ({ id: `benefit-${i + 1}`, number: pad(i), title, description })),
    whyChooseTitle: c.buildTitle,
    whyChooseSubtitle: c.buildIntro,
    whyChooseFeatures: c.build.map(([title, description], i) => ({
      id: `feature-${i + 1}`,
      title,
      description,
      icon: "",
      iconAlt: "",
      iconWidth: 0,
      iconHeight: 0,
      iconRightClass: "",
    })),
    guideTitle: `Our ${c.name} process`,
    guideSubtitle: "A clear, step-by-step process with working results at every stage.",
    guideTabs: c.process.map(([label, section], i) => ({ key: `step-${i + 1}`, label, section, items: [] })),
    startTitle: c.cta[0],
    startSubtitle: c.cta[1],
    startButtonText: "Start a conversation",
    startButtonLink: "/contact-us",
    faqs: c.faqs.map(([question, answer]) => ({ question, answer })),
  };
}

/**
 * True when a stored page still holds the original shared template copy (never edited in the CMS).
 * Such records are shown with the new page-specific content; once saved from the admin, the
 * saved values are used as-is.
 */
export function isLegacyExpertiseContent(page: Pick<ExpertisePageRecord, "slug" | "customTitle" | "faqs">) {
  if (page.faqs?.length) return false;
  return page.customTitle === getCustomSoftwareDevData(page.slug).mainTitle;
}
