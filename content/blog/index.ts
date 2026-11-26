import type { BlogArticle } from "@/lib/blog/types";
import { aiArticles } from "./ai-machine-learning";
import { industryArticles } from "./industry-solutions";
import { roboticsArticles } from "./robotics-automation";
import { softwareArticles } from "./software-engineering";
import { techStackArticles } from "./technology-stack";

/** All ALPIXN editorial articles, newest first. */
export const blogArticles: BlogArticle[] = [
  ...aiArticles,
  ...roboticsArticles,
  ...softwareArticles,
  ...techStackArticles,
  ...industryArticles,
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
