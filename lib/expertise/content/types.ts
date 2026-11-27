/** [title, description] */
export type Pair = [string, string];

/**
 * Unique copy for one "Our Expertise" page. Every page gets its own hero, benefits,
 * deliverables, delivery process, call to action and FAQs. Capability statements only —
 * no client names, statistics or certifications.
 */
export type ExpertiseContent = {
  /** Short service name used in headings, e.g. "Web App Development". */
  name: string;
  title: string;
  intro: string;
  /** Three to five short items shown in the hero panel. */
  highlights: string[];
  benefitsTitle: string;
  benefitsIntro: string;
  benefits: Pair[];
  buildTitle: string;
  buildIntro: string;
  build: Pair[];
  /** Delivery process: [step name, what happens]. */
  process: Pair[];
  cta: Pair;
  faqs: Pair[];
};
