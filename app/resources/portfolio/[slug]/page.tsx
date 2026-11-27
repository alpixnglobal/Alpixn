import Accent from "@/components/ui/Accent";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, CheckCircle2, FlaskConical, MapPin, ShieldCheck } from "lucide-react";
import { ProjectCard } from "@/components/portfolio/PortfolioExplorer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import CtaBand from "@/components/sections/shared/CtaBand";
import { getPublishedPortfolioProjectBySlug, getPublishedPortfolioProjects } from "@/lib/content-service";
import { CONCEPT_NOTE, showcaseProjects } from "@/lib/portfolio/showcase";
import { absoluteUrl, pageMetadata, toDescription } from "@/lib/seo";
import { toPortfolioCard } from "@/lib/portfolio/cards";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 3600;

export function generateStaticParams() {
  return showcaseProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPublishedPortfolioProjectBySlug(slug);
  if (!p) return { title: "Project not found", robots: { index: false } };
  const status = p.verificationStatus === "real" ? "Case study" : "Concept project";
  return pageMetadata({
    title: `${p.title} (${status})`,
    description: toDescription(`${p.summary}`),
    path: `/resources/portfolio/${p.slug}`,
    image: p.screenshots?.find((s) => s.device === "desktop")?.src || p.imageData,
  });
}

export default async function PortfolioDetailsPage({ params }: Props) {
  const { slug } = await params;
  const [p, all] = await Promise.all([getPublishedPortfolioProjectBySlug(slug), getPublishedPortfolioProjects()]);
  if (!p) notFound();

  const isReal = p.verificationStatus === "real";
  const desktop = p.screenshots?.find((s) => s.device === "desktop") ?? (p.galleryImageOne ? { src: p.galleryImageOne, alt: `${p.title} screenshot`, device: "desktop" as const } : null);
  const mobile = p.screenshots?.find((s) => s.device === "mobile") ?? (p.galleryImageTwo ? { src: p.galleryImageTwo, alt: `${p.title} mobile screenshot`, device: "mobile" as const } : null);
  const features = p.features?.length ? p.features : p.solutionPoints;
  const related = all
    .filter((x) => x.slug !== p.slug)
    .map((x) => ({ x, score: (x.industry === p.industry ? 3 : 0) + (x.projectTypes ?? []).filter((t) => (p.projectTypes ?? []).includes(t)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ x }) => toPortfolioCard(x));
  const path = `/resources/portfolio/${p.slug}`;

  return (
    <main>
      <section className="relative overflow-hidden bg-canvas pb-10 pt-10 sm:pt-14">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-ambient" />
        <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Portfolio", path: "/resources/portfolio" },
              { name: p.title, path },
            ]}
          />
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${isReal ? "bg-emerald-600 text-white" : "bg-brand-navy text-[#f6d77a]"}`}>
                  {isReal ? <ShieldCheck aria-hidden className="h-3.5 w-3.5" /> : <FlaskConical aria-hidden className="h-3.5 w-3.5" />}
                  {isReal ? "Real project" : "Concept project"}
                </span>
                <span className="rounded-full border border-line px-3 py-1 text-xs text-fg-muted">{p.industry}</span>
                {p.country ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1 text-xs text-fg-muted">
                    <MapPin aria-hidden className="h-3 w-3" /> {p.country}
                  </span>
                ) : null}
              </div>
              <h1 className="heading-gradient mt-5 font-semibold !leading-[1.12] text-[clamp(1.35rem,2vw,1.8rem)]">{p.title}</h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">{p.summary}</p>
            </div>
            <div className="lg:col-span-5 lg:text-right">
              {isReal && p.liveUrl ? (
                <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-[#0878d1] hover:underline">
                  Visit live website <ArrowUpRight aria-hidden className="h-4 w-4" />
                </a>
              ) : p.demoPath ? (
                <Link href={p.demoPath} className="inline-flex items-center gap-1.5 font-semibold text-[#0878d1] hover:underline">
                  Open interactive demo <ArrowUpRight aria-hidden className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
          </div>
          {!isReal ? (
            <p className="mt-8 flex items-start gap-3 rounded-2xl border border-line bg-surface p-4 text-sm text-fg-muted">
              <FlaskConical aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{CONCEPT_NOTE}</span>
            </p>
          ) : null}
        </div>
      </section>

      {desktop ? (
        <section aria-label="Screenshots" className="bg-canvas pb-12">
          <div className="mx-auto grid max-w-[1240px] items-end gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_260px]">
            <figure className="overflow-hidden rounded-[22px] border border-line bg-surface shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-1.5 border-b border-line bg-surface-2 px-4 py-2.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </div>
              <Image src={desktop.src} alt={desktop.alt} width={1400} height={900} sizes="(max-width: 1024px) 100vw, 950px" priority className="h-auto w-full" />
              <figcaption className="sr-only">{desktop.alt}</figcaption>
            </figure>
            {mobile ? (
              <figure className="mx-auto w-full max-w-[260px] overflow-hidden rounded-[28px] border-[6px] border-[#0b0f17] bg-[#0b0f17] shadow-[var(--shadow-card)]">
                <Image src={mobile.src} alt={mobile.alt} width={780} height={1600} sizes="260px" className="h-auto w-full rounded-[22px]" />
                <figcaption className="sr-only">{mobile.alt}</figcaption>
              </figure>
            ) : null}
          </div>
          <p className="mx-auto mt-3 max-w-[1240px] px-4 text-xs text-fg-subtle sm:px-6">Screenshots captured from the working {isReal ? "application" : "concept demo"}.</p>
        </section>
      ) : null}

      <section className="bg-canvas-2 py-16">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-4 sm:px-6 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-8">
            {p.problem || p.objective ? (
              <div>
                <h2 className="font-display text-[clamp(1.35rem,1.9vw,1.75rem)] font-bold leading-[1.15] tracking-[-0.025em] text-fg"><Accent text="The business problem" /></h2>
                <p className="mt-4 text-base leading-relaxed text-fg-muted">{p.problem || p.objective}</p>
              </div>
            ) : null}
            {p.approach ? (
              <div>
                <h2 className="font-display text-[clamp(1.35rem,1.9vw,1.75rem)] font-bold leading-[1.15] tracking-[-0.025em] text-fg"><Accent text="Solution approach" /></h2>
                <p className="mt-4 text-base leading-relaxed text-fg-muted">{p.approach}</p>
              </div>
            ) : null}
            {features?.length ? (
              <div>
                <h2 className="font-display text-[clamp(1.35rem,1.9vw,1.75rem)] font-bold leading-[1.15] tracking-[-0.025em] text-fg"><Accent text="Key features" /></h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-3 rounded-xl border border-line bg-surface p-4 text-sm text-fg">
                      <CheckCircle2 aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-tech" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {p.highlights?.length ? (
              <div>
                <h2 className="font-display text-[clamp(1.35rem,1.9vw,1.75rem)] font-bold leading-[1.15] tracking-[-0.025em] text-fg"><Accent text="Functional highlights" /></h2>
                <ul className="mt-4 space-y-2 text-base text-fg-muted">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {isReal && (p.outcome || p.resultPrimaryValue) ? (
              <div>
                <h2 className="font-display text-[clamp(1.35rem,1.9vw,1.75rem)] font-bold leading-[1.15] tracking-[-0.025em] text-fg"><Accent text="Outcome" /></h2>
                <p className="mt-4 text-base text-fg-muted">{p.outcome}</p>
              </div>
            ) : null}
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-[110px] space-y-4">
              <dl className="rounded-2xl border border-line bg-surface p-5 text-sm">
                <h2 className="mb-4 font-display text-[clamp(1.35rem,1.9vw,1.75rem)] font-bold leading-[1.15] tracking-[-0.025em] text-fg"><Accent text="Project classification" /></h2>
                {[
                  ["Status", isReal ? "Real client project" : "Concept project (ALPIXN demo)"],
                  ["Industry", p.industry],
                  ["Target market", p.country],
                  ["Currency", p.currency],
                ]
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 border-b border-line py-2 last:border-0">
                      <dt className="text-fg-subtle">{k}</dt>
                      <dd className="text-right font-medium text-fg">{v}</dd>
                    </div>
                  ))}
              </dl>
              {p.projectTypes?.length ? (
                <div className="rounded-2xl border border-line bg-surface p-5">
                  <h2 className="font-display text-[clamp(1.35rem,1.9vw,1.75rem)] font-bold leading-[1.15] tracking-[-0.025em] text-fg"><Accent text="Project type" /></h2>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {p.projectTypes.map((t) => (
                      <li key={t}>
                        <Link href={`/resources/portfolio?type=${encodeURIComponent(t)}`} className="inline-block rounded-full bg-tech/10 px-3 py-1 text-xs font-medium text-tech hover:bg-tech/20">
                          {t}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {p.techStack?.length ? (
                <div className="rounded-2xl border border-line bg-surface p-5">
                  <h2 className="font-display text-[clamp(1.35rem,1.9vw,1.75rem)] font-bold leading-[1.15] tracking-[-0.025em] text-fg"><Accent text="Technology stack" /></h2>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {p.techStack.map((t) => (
                      <li key={t} className="rounded-full border border-line px-3 py-1 text-xs text-fg-muted">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {p.related?.length ? (
                <div className="rounded-2xl border border-line bg-surface p-5">
                  <h2 className="font-display text-[clamp(1.35rem,1.9vw,1.75rem)] font-bold leading-[1.15] tracking-[-0.025em] text-fg"><Accent text="Related reading" /></h2>
                  <ul className="mt-3 space-y-2 text-sm">
                    {p.related.map((r) => (
                      <li key={r.href}>
                        <Link href={r.href} className="inline-flex items-center gap-1 text-tech hover:text-gold">
                          {r.label} <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </aside>
        </div>
      </section>

      {related.length ? (
        <section aria-labelledby="more-projects" className="bg-canvas py-16">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
            <h2 id="more-projects" className="font-display text-[clamp(1.35rem,1.9vw,1.75rem)] font-bold leading-[1.15] tracking-[-0.025em] text-fg"><Accent text="More projects" /></h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c) => (
                <li key={c.slug}>
                  <ProjectCard p={c} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaBand
        title={`Building something for ${p.industry.toLowerCase()}?`}
        description="We can adapt patterns from this project to your workflows, integrations and market — or start fresh from your requirements."
        primary={{ label: "Request a consultation", href: "/contact-us" }}
        secondary={{ label: "Browse all projects", href: "/resources/portfolio" }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: p.title,
          description: p.summary,
          url: absoluteUrl(path),
          ...(desktop ? { image: absoluteUrl(desktop.src) } : {}),
          creator: { "@type": "Organization", name: "ALPIXN", url: absoluteUrl("/") },
          about: p.industry,
          keywords: [...(p.projectTypes ?? []), ...(p.techStack ?? [])].join(", "),
        }}
      />
    </main>
  );
}
