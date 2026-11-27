import Link from "next/link";
import PageHero from "@/components/sections/shared/PageHero";
import { getCachedExpertiseNavigation, getCachedOffshoreDeveloperNavigation, getCachedPublishedBlogPosts, getCachedPublishedProducts } from "@/lib/content-service";
import { pageMetadata } from "@/lib/seo";
import { TECH_CONTENT } from "@/lib/technologies";
import { technologyHeroData } from "@/lib/technologyData";

export const metadata = pageMetadata({
  title: "Sitemap | ALPIXN",
  description: "All pages on the ALPIXN website: services, offshore developers, technologies, products, resources and articles.",
  path: "/sitemap",
});

type Group = { title: string; links: { label: string; href: string }[] };

export default async function SitemapPage() {
  const [expertise, offshore, products, posts] = await Promise.all([getCachedExpertiseNavigation(), getCachedOffshoreDeveloperNavigation(), getCachedPublishedProducts(), getCachedPublishedBlogPosts()]);
  const groups: Group[] = [
    { title: "Company", links: [{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Contact", href: "/contact-us" }, { label: "Privacy Policy", href: "/privacy-policy" }, { label: "Terms and Conditions", href: "/terms-and-conditions" }] },
    ...expertise.map((c) => ({ title: c.label, links: c.items.map((i) => ({ label: i.label, href: i.href })) })),
    { title: "Offshore developers", links: [{ label: "Overview", href: "/offshore-developer" }, ...offshore.flatMap((c) => c.items.map((i) => ({ label: i.label, href: i.href })))] },
    {
      title: "Technologies",
      links: [{ label: "Overview", href: "/technologies" }, ...Object.values(technologyHeroData).filter((t) => TECH_CONTENT[t.slug]).map((t) => ({ label: TECH_CONTENT[t.slug].name, href: `/technologies/${t.category}/${t.slug}` }))],
    },
    { title: "Products", links: [{ label: "All products", href: "/products" }, ...products.map((p) => ({ label: p.navLabel || p.heroTitle, href: `/products/${p.slug}` }))] },
    {
      title: "Resources",
      links: [
        { label: "Overview", href: "/resources" },
        { label: "Blog", href: "/resources/blogs" },
        { label: "Portfolio", href: "/resources/portfolio" },
        { label: "Careers", href: "/resources/careers" },
        { label: "Our Team", href: "/resources/our-team" },
        { label: "Internship Alumni", href: "/resources/interns-alumni" },
      ],
    },
    { title: "Articles", links: posts.map((p) => ({ label: p.title, href: `/resources/blogs/${p.slug}` })) },
  ];
  return (
    <main>
      <PageHero eyebrow="Sitemap" title="Every Page on One Page" description="Find any service, technology, product or article on the ALPIXN website." />
      <section className="bg-canvas py-14 sm:py-16">
        <div className="mx-auto max-w-[1320px] columns-1 gap-6 px-4 sm:columns-2 sm:px-6 lg:columns-3 lg:px-10">
          {groups.filter((g) => g.links.length).map((g) => (
            <section key={g.title} className="mb-6 break-inside-avoid rounded-3xl border border-line bg-surface p-6 shadow-[var(--shadow-card)]">
              <h2 className="font-display text-base font-bold text-fg">{g.title}</h2>
              <ul className="mt-3 space-y-1.5">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[14px] text-fg-muted hover:text-[#0878d1]">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
