/** Per-technology page content (original copy written for ALPIXN). */
export type TechContent = {
  name: string;
  /** Brand-ish accent used for small details on the page (dot, code card border). */
  accent: string;
  /** Code sample shown in the hero editor. */
  file: string;
  code: string[];
  challenges: [string, string][];
  services: [string, string][];
  strengths: [string, string][];
  faqs: [string, string][];
};
