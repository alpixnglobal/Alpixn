/**
 * Shape of an ALPIXN editorial article stored in /content/blog.
 * Articles are seeded into MongoDB (BlogPost collection) and used as the built-in fallback.
 */
export type BlogCategory =
  | "AI & Machine Learning"
  | "Robotics & Automation"
  | "Software Engineering"
  | "Technology Stack"
  | "Industry Solutions";

export const BLOG_CATEGORIES: BlogCategory[] = [
  "AI & Machine Learning",
  "Robotics & Automation",
  "Software Engineering",
  "Technology Stack",
  "Industry Solutions",
];

export type BlogSource = {
  label: string;
  url: string;
};

export type BlogArticle = {
  slug: string;
  title: string;
  /** <title> override (≤ ~60 chars). Falls back to title. */
  metaTitle: string;
  /** Meta description (≤ ~155 chars). */
  metaDescription: string;
  /** Card / listing summary. */
  excerpt: string;
  category: BlogCategory;
  tags: string[];
  /** ISO date (YYYY-MM-DD). */
  publishedAt: string;
  modifiedAt?: string;
  /** External references cited in the body (also listed at the end of the article). */
  sources: BlogSource[];
  /** Markdown body. Starts at H2 (the page renders the title as H1). Supports ```flow blocks. */
  body: string;
  featured?: boolean;
};

export const EDITORIAL_AUTHOR = "ALPIXN Editorial Team";
export const AI_DISCLOSURE =
  "This article was drafted by the ALPIXN Editorial Team with AI assistance and edited for accuracy and clarity. It is general guidance, not legal, financial or medical advice.";

const WORDS_PER_MINUTE = 220;

export function countWords(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`|[\]()-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

export function readingTime(markdown: string) {
  const minutes = Math.max(1, Math.round(countWords(markdown) / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}

export function blogCoverPath(slug: string) {
  return `/blog/covers/${slug}.webp`;
}
