import {
  getCachedExpertiseNavigation,
  getCachedOffshoreDeveloperNavigation,
  getCachedPublishedBlogPosts,
  getCachedPublishedJobs,
  getCachedPublishedPortfolioProjects,
  getCachedPublishedProducts,
} from "@/lib/content-service";
import { TECH_CONTENT } from "@/lib/technologies";
import { technologyHeroData } from "@/lib/technologyData";

export type SitePath = { path: string; label: string; group: string; lastModified?: string; priority?: number };

/**
 * Every public, indexable page of the website. Used by sitemap.xml, the HTML sitemap and the admin SEO manager,
 * so new blogs, products and pages appear everywhere automatically.
 */
export async function getAllSitePaths(): Promise<SitePath[]> {
  const [expertise, offshore, products, posts, projects, jobs] = await Promise.all([
    getCachedExpertiseNavigation(),
    getCachedOffshoreDeveloperNavigation(),
    getCachedPublishedProducts(),
    getCachedPublishedBlogPosts(),
    getCachedPublishedPortfolioProjects().catch(() => []),
    getCachedPublishedJobs().catch(() => []),
  ]);

  const list: SitePath[] = [
    { path: "/", label: "Home", group: "Company", priority: 1 },
    { path: "/about", label: "About", group: "Company", priority: 0.8 },
    { path: "/contact-us", label: "Contact", group: "Company", priority: 0.8 },
    { path: "/privacy-policy", label: "Privacy Policy", group: "Company", priority: 0.3 },
    { path: "/terms-and-conditions", label: "Terms and Conditions", group: "Company", priority: 0.3 },
    { path: "/sitemap", label: "Sitemap", group: "Company", priority: 0.2 },
    ...expertise.flatMap((c) => c.items.map((i) => ({ path: i.href, label: i.label, group: `Expertise · ${c.label}`, priority: 0.7 }))),
    { path: "/offshore-developer", label: "Offshore Developers", group: "Offshore Developers", priority: 0.8 },
    ...offshore.flatMap((c) => c.items.map((i) => ({ path: i.href, label: i.label, group: `Offshore · ${c.label}`, priority: 0.7 }))),
    { path: "/technologies", label: "Technologies", group: "Technologies", priority: 0.7 },
    ...Object.values(technologyHeroData)
      .filter((t) => TECH_CONTENT[t.slug])
      .map((t) => ({ path: `/technologies/${t.category}/${t.slug}`, label: TECH_CONTENT[t.slug].name, group: "Technologies", priority: 0.6 })),
    { path: "/products", label: "Products", group: "Products", priority: 0.7 },
    ...products.map((p) => ({ path: `/products/${p.slug}`, label: p.navLabel || p.heroTitle, group: "Products", priority: 0.6 })),
    { path: "/resources", label: "Resources", group: "Resources", priority: 0.5 },
    { path: "/resources/blogs", label: "Blog", group: "Resources", priority: 0.7 },
    { path: "/resources/portfolio", label: "Portfolio", group: "Resources", priority: 0.6 },
    { path: "/resources/careers", label: "Careers", group: "Resources", priority: 0.5 },
    { path: "/resources/our-team", label: "Our Team", group: "Resources", priority: 0.4 },
    { path: "/resources/interns-alumni", label: "Internship Alumni", group: "Resources", priority: 0.3 },
    ...posts.map((p) => ({
      path: `/resources/blogs/${p.slug}`,
      label: p.title,
      group: "Blog articles",
      lastModified: p.modifiedAt || p.publishedAt || undefined,
      priority: 0.6,
    })),
    ...projects.map((p) => ({ path: `/resources/portfolio/${p.slug}`, label: p.title, group: "Portfolio", priority: 0.5 })),
    ...jobs.map((j) => ({ path: `/resources/careers/${j.slug}`, label: j.title, group: "Careers", priority: 0.4 })),
  ];

  // De-duplicate by path, keeping the first entry.
  const seen = new Set<string>();
  return list.filter((item) => (seen.has(item.path) ? false : (seen.add(item.path), true)));
}
