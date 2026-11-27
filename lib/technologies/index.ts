import type { TechnologyPageRecord } from "@/lib/content-types";
import { backendContent, frameworkContent } from "./backend";
import { cloudContent, platformContent } from "./cloud";
import { frontendContent, mobileContent } from "./frontend";
import type { TechContent } from "./types";

export type { TechContent } from "./types";

export const TECH_CONTENT: Record<string, TechContent> = {
  ...backendContent,
  ...frameworkContent,
  ...frontendContent,
  ...mobileContent,
  ...cloudContent,
  ...platformContent,
};

export const techIcon = (slug: string) => `/images/tech/${slug}.svg`;

/** Fields of a technology page that are generated from TECH_CONTENT. */
export function techPageFields(slug: string): Partial<TechnologyPageRecord> | null {
  const c = TECH_CONTENT[slug];
  if (!c) return null;
  const card = ([title, description]: [string, string]) => ({ title, description });
  return {
    challengesTitle: `Problems we solve with ${c.name}`,
    challengeCards: c.challenges.map(([title, description]) => ({ title, description, imageData: "", linkLabel: "" })),
    unlockTitle: `Planning a ${c.name} project?`,
    unlockButtonLabel: "Talk to our team",
    talkTitle: `How we work with ${c.name}`,
    talkCards: [],
    successTitle: `${c.name} services we offer`,
    successCards: c.services.map(card),
    guidanceTitle: `Get expert advice on ${c.name}`,
    guidanceButtonLabel: "Book a call",
    qualityEyebrow: `Why ${c.name}`,
    qualityTitle: `Why teams choose ${c.name}`,
    qualityDescription: `Where ${c.name} fits best, and why we recommend it for the right projects.`,
    qualityPoints: c.strengths.map(card),
    engagementTitle: `Ways to work with our ${c.name} team`,
    engagementDescription: "Pick the model that suits your project — a dedicated team, extra capacity for your own team, or a fixed-scope project.",
    engagementModels: [
      { title: "Dedicated team", description: `A ${c.name} team that works only on your product, follows your priorities and reports to you directly.`, bullets: ["Your roadmap, your priorities", "Direct communication", "Scale the team up or down", "Regular demos"] },
      { title: "Team augmentation", description: `Experienced ${c.name} engineers join your existing team to add capacity or skills you are missing.`, bullets: ["Fits your tools and process", "Fast onboarding", "Flexible duration", "Knowledge sharing"] },
      { title: "Fixed-scope project", description: `A clearly defined ${c.name} project with agreed scope, milestones and price.`, bullets: ["Agreed budget", "Clear milestones", "Managed delivery", "Handover and documentation"] },
    ],
    faqTitle: `${c.name} questions, answered`,
    faqs: c.faqs.map(([question, answer]) => ({ question, answer })),
  };
}

/** The untouched seed template still says "Node.JS" everywhere; detect it so real CMS edits are never overwritten. */
export function isTemplateContent(page: Pick<TechnologyPageRecord, "challengesTitle">) {
  return /node\.?js development services/i.test(page.challengesTitle ?? "");
}
