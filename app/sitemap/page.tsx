import Link from "next/link";
import PageHero from "@/components/sections/shared/PageHero";
import { pageMetadata } from "@/lib/seo";
import { getAllSitePaths } from "@/lib/site-paths";
import { withSeo } from "@/lib/seo-store";

const baseMetadata = pageMetadata({
  title: "Sitemap | ALPIXN",
  description: "All pages on the ALPIXN website: services, offshore developers, technologies, products, resources and articles.",
  path: "/sitemap",
});

export async function generateMetadata() {
  return withSeo("/sitemap", baseMetadata);
}

type Group = { title: string; links: { label: string; href: string }[] };

export default async function SitemapPage() {
  // Same source as sitemap.xml and the admin SEO manager.
  const paths = await getAllSitePaths();
  const groups: Group[] = [];
  for (const p of paths) {
    const title = p.group.replace(/^(Expertise|Offshore) · /, "");
    let g = groups.find((x) => x.title === title);
    if (!g) groups.push((g = { title, links: [] }));
    g.links.push({ label: p.label, href: p.path });
  }
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
