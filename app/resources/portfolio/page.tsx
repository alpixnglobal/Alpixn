import { FlaskConical, Globe2, Layers, ShieldCheck } from "lucide-react";
import PortfolioExplorer from "@/components/portfolio/PortfolioExplorer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import CtaBand from "@/components/sections/shared/CtaBand";
import { toPortfolioCard } from "@/lib/portfolio/cards";
import { getCachedPublishedPortfolioProjects } from "@/lib/content-service";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Portfolio: Software, AI & Robotics Concept Projects",
  description:
    "Explore ALPIXN's portfolio of interactive concept projects — booking platforms, SaaS, dashboards, mobile apps, AI and robotics software across industries and international markets.",
  path: "/resources/portfolio",
  image: "/portfolio/robofleet-command-center/desktop.webp",
});


type Props = { searchParams: Promise<Record<string, string | undefined>> };

export default async function PortfolioPage({ searchParams }: Props) {
  const [projects, params] = await Promise.all([getCachedPublishedPortfolioProjects(), searchParams]);
  const cards = projects.map(toPortfolioCard);
  const industries = new Set(cards.map((c) => c.industry)).size;
  const countries = new Set(cards.map((c) => c.country).filter(Boolean)).size;
  const realCount = cards.filter((c) => c.status === "real").length;

  return (
    <main>
      <section className="relative overflow-hidden bg-canvas pb-12 pt-10 sm:pt-14">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-ambient" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(60%_70%_at_70%_10%,#000,transparent)]" />
        <div className="relative mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-10 xl:px-0">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Portfolio", path: "/resources/portfolio" }]} />
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <span className="eyebrow">Portfolio</span>
              <h1 className="heading-gradient mt-4 font-semibold !leading-[1.08] text-[clamp(1.55rem,2.5vw,2.2rem)]">Working software you can click through</h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
                Every project below is a functioning interface built by ALPIXN — booking engines, SaaS products, operational dashboards, mobile apps, AI tools and robotics software — designed around real workflows in the markets we serve. Screenshots are captured from the live demos, not mock-ups.
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-3 lg:col-span-5">
              {[
                { icon: Layers, k: "Projects", v: cards.length },
                { icon: Globe2, k: "Markets represented", v: countries },
                { icon: FlaskConical, k: "Industries", v: industries },
                { icon: ShieldCheck, k: "Verified client projects", v: realCount },
              ].map(({ icon: Icon, k, v }) => (
                <div key={k} className="glass rounded-2xl p-4">
                  <Icon aria-hidden className="h-5 w-5 text-gold" />
                  <dt className="mt-3 text-xs text-fg-subtle">{k}</dt>
                  <dd className="font-display text-2xl font-semibold text-fg">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="mt-8 flex max-w-3xl items-start gap-3 rounded-2xl border border-line bg-surface p-4 text-sm leading-relaxed text-fg-muted">
            <FlaskConical aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            <span>
              <b className="text-fg">How to read this portfolio:</b> projects marked <b className="text-fg">Concept project</b> are original demonstrations designed and built by ALPIXN. They are not client engagements, and all names and data in them are fictional. Verified client work will be marked <b className="text-fg">Real project</b> once permission to publish is confirmed.
            </span>
          </p>
        </div>
      </section>

      <section aria-labelledby="projects-heading" className="bg-canvas-2 py-14 sm:py-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-10 xl:px-0">
          <h2 id="projects-heading" className="sr-only">
            All projects
          </h2>
          <PortfolioExplorer
            projects={cards}
            initial={{
              industry: params.industry ?? "All",
              country: params.country ?? "All",
              type: params.type ?? "All",
              tech: params.tech ?? "All",
            }}
          />
        </div>
      </section>

      <CtaBand
        title="Want something like this for your business?"
        description="Tell us which workflow you want to improve. We will recommend a scope, technology approach and a realistic first release — and show you relevant demos along the way."
        primary={{ label: "Request a software development proposal", href: "/contact-us" }}
        secondary={{ label: "Read our insights", href: "/resources/blogs" }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "ALPIXN Portfolio",
          url: absoluteUrl("/resources/portfolio"),
          hasPart: cards.map((c) => ({ "@type": "CreativeWork", name: c.title, url: absoluteUrl(`/resources/portfolio/${c.slug}`) })),
        }}
      />
    </main>
  );
}
