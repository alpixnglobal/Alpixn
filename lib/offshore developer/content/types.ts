/** [title, description] */
export type Pair = [string, string];

/**
 * Unique copy for one "Hire offshore developer" page. Capability statements only —
 * no client names, statistics, ratings or certifications.
 */
export type OffshoreContent = {
  /** Technology or role name used in headings, e.g. "Node.js". */
  tech: string;
  title: string;
  intro: string;
  checklist: string[];
  /** What these developers build. */
  build: Pair[];
  /** Services you can hire them for. */
  services: Pair[];
  /** Core skills we check when vetting. */
  skills: Pair[];
  /** Tools and ecosystem they work with. */
  tools: string[];
  faqs: Pair[];
};
