import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, FlaskConical } from "lucide-react";
import HeroVisual from "@/components/hero/HeroVisual";
import { BlogCard, type BlogCardData } from "@/components/blog/BlogExplorer";
import type { PortfolioCard } from "@/components/portfolio/PortfolioExplorer";
import Reveal from "@/components/ui/Reveal";
import type { HomeIndustryTabRecord, HomeOfferingRecord } from "@/lib/content-types";

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line-gold bg-surface px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-gold-ink">
      <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-dot" />
      {children}
    </span>
  );
}

function SectionTitle({ kicker, title, gold, children, id }: { kicker: string; title: string; gold?: string; children?: React.ReactNode; id?: string }) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <Kicker>{kicker}</Kicker>
        <h2 id={id} className="display-lg mt-5 text-fg">
          {title} {gold ? <span className="text-gold-grad">{gold}</span> : null}
        </h2>
      </div>
      {children}
    </div>
  );
}

const MARKETS: [string, string][] = [
  ["India", "/images/india.svg"],
  ["USA", "/images/usa.svg"],
  ["UK", "/images/uk.svg"],
  ["UAE", "/images/uae.svg"],
  ["Australia", "/images/australia.svg"],
  ["Canada", "/images/canada.svg"],
  ["Italy", "/images/italy.svg"],
  ["Thailand", "/images/thailand.svg"],
  ["South Africa", "/images/south-africa.svg"],
];

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export function HeroV3({
  title,
  description,
  primary,
  secondary,
  fallbackImage,
}: {
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  fallbackImage?: string;
}) {
  // The last three words of the CMS headline get the gold treatment.
  const words = title.trim().split(/\s+/);
  const split = Math.max(1, words.length - 3);
  const lead = words.slice(0, split).join(" ");
  const tail = words.slice(split).join(" ");

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-canvas pt-10 sm:pt-14">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full bg-gold/20 blur-[140px]" />
        <div className="absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-azure/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Kicker>AI · Robotics · Software Engineering</Kicker>
        <h1 id="hero-title" className="display-xl mt-6 max-w-[14ch] text-fg uppercase">
          {lead} <span className="text-gold-grad">{tail}</span>
        </h1>

        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
          <p className="max-w-xl text-lg leading-relaxed text-fg-muted lg:col-span-6 lg:text-xl">{description}</p>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end">
            <Link href={primary.href} className="btn-brand !px-7 !py-4 text-base">
              {primary.label} <ArrowRight aria-hidden className="btn-arrow h-4 w-4" />
            </Link>
            <Link href={secondary.href} className="btn-ghost-brand !px-7 !py-4 text-base">
              {secondary.label}
            </Link>
          </div>
        </div>

        {/* Bento */}
        <div className="mt-12 grid gap-4 pb-16 md:grid-cols-12 md:grid-rows-[260px_220px] lg:mt-16">
          <div className="tile md:col-span-7 md:row-span-2 min-h-[380px] bg-[radial-gradient(90%_90%_at_70%_30%,#fff8e6_0%,var(--surface)_60%)] dark:bg-[radial-gradient(90%_90%_at_70%_30%,#1c2740_0%,var(--surface)_60%)]">
            <div className="absolute inset-y-0 right-0 aspect-square max-w-full [mask-image:linear-gradient(to_right,transparent_0%,#000_22%,#000_88%,transparent_100%)]">
              <HeroVisual fallbackImage={fallbackImage} showPanels={false} />
            </div>
            <div className="relative z-10 flex h-full flex-col justify-between p-6 pointer-events-none">
              <span className="w-fit rounded-full bg-fg px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-canvas">Robotics software</span>
              <p className="hidden max-w-[260px] text-sm text-fg-muted sm:block">Fleet monitoring, computer vision and automation interfaces — live 3D scene rendered in your browser.</p>
            </div>
          </div>

          <Link href="/resources/portfolio/docusense-document-ai" className="tile group md:col-span-5 min-h-[240px]">
            <Image src="/portfolio/docusense-document-ai/desktop.webp" alt="DocuSense concept: AI document processing review screen" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover object-left-top opacity-90 transition-transform duration-700 group-hover:scale-[1.04]" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-[var(--surface)]/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-ink">AI software</span>
                <p className="font-display text-xl font-semibold text-fg">Document intelligence</p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gold-grad text-[#0d1526]">
                <ArrowUpRight aria-hidden className="h-5 w-5" />
              </span>
            </div>
          </Link>

          <Link href="/resources/portfolio/routepilot-delivery-app" className="tile group md:col-span-2 min-h-[220px] bg-surface-2">
            <Image src="/portfolio/routepilot-delivery-app/mobile.webp" alt="RoutePilot concept: delivery driver mobile app" fill sizes="(max-width: 768px) 100vw, 20vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]" />
            <span className="absolute bottom-3 left-3 rounded-full bg-fg px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-canvas">Mobile</span>
          </Link>

          <div className="tile md:col-span-3 min-h-[220px] bg-gold-grad !border-transparent p-5 text-[#0d1526]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em]">Markets we serve</p>
            <p className="mt-1 font-display text-2xl font-bold leading-tight">9 countries</p>
            <ul className="mt-4 grid grid-cols-3 gap-x-2 gap-y-2.5">
              {MARKETS.map(([name, flag]) => (
                <li key={name} className="flex items-center gap-1.5 text-[11px] font-medium">
                  <Image src={flag} alt="" width={16} height={16} className="h-4 w-4 rounded-full object-cover ring-1 ring-black/10" />
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Marquee                                                             */
/* ------------------------------------------------------------------ */

const CAPABILITIES = ["AI development", "Robotics software", "Web applications", "Mobile apps", "SaaS platforms", "Computer vision", "Intelligent automation", "Cloud & DevOps", "API integrations"];

export function CapabilityMarquee() {
  const items = [...CAPABILITIES, ...CAPABILITIES];
  return (
    <div aria-hidden className="relative overflow-hidden border-y border-line bg-surface py-6">
      <div className="marquee-track gap-10">
        {items.map((c, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-3xl font-bold uppercase tracking-tight sm:text-5xl">
            <span className={i % 2 ? "text-outline-gold" : "text-fg"}>{c}</span>
            <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Services bento                                                      */
/* ------------------------------------------------------------------ */

// Bento layouts that always fill complete rows for the usual offering counts.
const SPAN_SETS: Record<number, string[]> = {
  4: ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"],
  5: ["lg:col-span-7", "lg:col-span-5", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4"],
  6: ["lg:col-span-8", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4", "lg:col-span-12"],
};

export function ServicesBento({ title, subtitle, items }: { title: string; subtitle: string; items: HomeOfferingRecord[] }) {
  return (
    <section aria-labelledby="services-title" className="bg-canvas py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <SectionTitle id="services-title" kicker="What we do" title={title}>
          <p className="max-w-md text-base leading-relaxed text-fg-muted">{subtitle}</p>
        </SectionTitle>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {items.map((s, i) => {
            const featured = i === 0;
            const span = SPAN_SETS[items.length]?.[i] ?? "lg:col-span-4";
            return (
              <Reveal as="li" key={s.title} delay={(i % 3) * 80} className={`${span} ${featured || i === items.length - 1 ? "sm:col-span-2" : ""}`}>
                <Link
                  href="/our-expertise"
                  className={`tile group flex h-full min-h-[240px] flex-col justify-between p-7 ${featured ? "bg-gold-grad !border-transparent text-[#0d1526]" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <span className={`font-display text-5xl font-bold tracking-tight ${featured ? "text-[#0d1526]/30" : "text-outline-gold"}`}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={`grid h-11 w-11 place-items-center rounded-full transition-transform duration-300 group-hover:rotate-45 ${featured ? "bg-[#0d1526] text-[#f6d77a]" : "bg-surface-2 text-fg"}`}>
                      <ArrowUpRight aria-hidden className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="mt-10">
                    <h3 className={`font-display text-2xl font-bold tracking-tight sm:text-[1.7rem] ${featured ? "" : "text-fg"}`}>{s.title}</h3>
                    <p className={`mt-3 max-w-xl text-[15px] leading-relaxed ${featured ? "text-[#0d1526]/80" : "text-fg-muted"} ${featured ? "" : "line-clamp-3"}`}>{s.description}</p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Selected work                                                       */
/* ------------------------------------------------------------------ */

export function SelectedWork({ projects }: { projects: PortfolioCard[] }) {
  const list = projects.slice(0, 4);
  if (!list.length) return null;
  return (
    <section aria-labelledby="work-title" className="bg-canvas-2 py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <SectionTitle id="work-title" kicker="Selected work" title="Software you can" gold="click through.">
          <Link href="/resources/portfolio" className="btn-ghost-brand self-start lg:self-auto">
            View all projects <ArrowRight aria-hidden className="btn-arrow h-4 w-4" />
          </Link>
        </SectionTitle>
        <div className="mt-14 space-y-6">
          {list.map((p, i) => (
            <Reveal key={p.slug}>
              <article className={`tile grid overflow-hidden lg:grid-cols-12 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <Link href={`/resources/portfolio/${p.slug}`} className="group relative block min-h-[260px] overflow-hidden bg-surface-2 lg:col-span-7 lg:min-h-[400px]">
                  <Image src={p.image} alt={`${p.title} screenshot`} fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover object-left-top transition-transform duration-700 group-hover:scale-[1.03]" />
                </Link>
                <div className="flex flex-col justify-center gap-5 p-7 sm:p-10 lg:col-span-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 rounded-full bg-fg px-2.5 py-1 font-semibold text-canvas">
                      <FlaskConical aria-hidden className="h-3 w-3" /> {p.status === "real" ? "Real project" : "Concept project"}
                    </span>
                    <span className="rounded-full border border-line px-2.5 py-1 text-fg-muted">{p.industry}</span>
                    {p.country ? <span className="rounded-full border border-line px-2.5 py-1 text-fg-muted">{p.country}</span> : null}
                  </div>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">{p.title}</h3>
                  <p className="text-[15px] leading-relaxed text-fg-muted">{p.summary}</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {p.techStack.slice(0, 4).map((t) => (
                      <li key={t} className="rounded-full bg-gold/12 px-2.5 py-1 text-[11px] font-semibold text-gold-ink">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Link href={`/resources/portfolio/${p.slug}`} className="btn-brand">
                      Project details <ArrowRight aria-hidden className="btn-arrow h-4 w-4" />
                    </Link>
                    {p.demoPath ? (
                      <Link href={p.demoPath} className="btn-ghost-brand">
                        Live demo
                      </Link>
                    ) : null}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Industries                                                          */
/* ------------------------------------------------------------------ */

const INDUSTRY_LINKS: Record<string, string> = {
  healthcare: "/our-expertise/industries/healthtech",
  bfsi: "/our-expertise/industries/fintech",
  retail: "/our-expertise/industries/retail",
  automotive: "/our-expertise/industries/automotive",
  education: "/our-expertise/industries/edtech",
  "real-estate": "/our-expertise/industries/proptech",
  travel: "/our-expertise/industries/travel",
  telecom: "/our-expertise/industries/telecom",
  logistics: "/our-expertise/industries/transport",
};

function industryHref(tab: HomeIndustryTabRecord) {
  const key = Object.keys(INDUSTRY_LINKS).find((k) => tab.id.toLowerCase().includes(k) || tab.label.toLowerCase().includes(k.replace("-", " ")));
  return key ? INDUSTRY_LINKS[key] : "/our-expertise";
}

export function IndustriesIndex({ title, subtitle, tabs }: { title: string; subtitle: string; tabs: HomeIndustryTabRecord[] }) {
  return (
    <section aria-labelledby="industries-title" className="bg-canvas py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <SectionTitle id="industries-title" kicker="Industries" title={title}>
          <p className="max-w-md text-base leading-relaxed text-fg-muted">{subtitle}</p>
        </SectionTitle>
        <ul className="mt-12 border-t border-line">
          {tabs.slice(0, 8).map((t, i) => (
            <li key={t.id} className="border-b border-line">
              <Link href={industryHref(t)} className="group grid items-center gap-4 py-6 sm:py-7 lg:grid-cols-12">
                <span className="font-mono text-sm text-gold-ink lg:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-2xl font-bold tracking-tight text-fg transition-colors group-hover:text-gold-ink sm:text-4xl lg:col-span-5">{t.label}</span>
                <span className="flex flex-wrap gap-2 lg:col-span-5">
                  {t.items.slice(0, 4).map((it) => (
                    <span key={it.title} className="rounded-full border border-line px-3 py-1 text-xs text-fg-muted">
                      {it.title}
                    </span>
                  ))}
                </span>
                <span className="hidden justify-self-end lg:col-span-1 lg:grid h-11 w-11 place-items-center rounded-full border border-line text-fg transition-all group-hover:border-transparent group-hover:bg-gold-grad group-hover:text-[#0d1526]">
                  <ArrowUpRight aria-hidden className="h-5 w-5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

const STEPS = [
  ["Discover", "Goals, users, data and constraints — agreed before any build starts."],
  ["Design", "Flows, clickable prototypes and an architecture you can review."],
  ["Build", "Short sprints with working demos and automated tests."],
  ["Launch", "Pilot, training, monitoring and a clean handover."],
  ["Improve", "Measure real usage and extend what works."],
];

export function ProcessSteps() {
  return (
    <section aria-labelledby="process-title" className="bg-fg py-20 text-canvas sm:py-28 dark:bg-surface dark:text-fg">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#f6d77a]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#f6d77a]" /> How we work
        </span>
        <h2 id="process-title" className="display-lg mt-5 max-w-3xl">
          Five steps. <span className="text-gold-grad">No surprises.</span>
        </h2>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-[28px] bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map(([title, text], i) => (
            <li key={title} className="bg-fg p-7 dark:bg-surface">
              <span className="font-display text-6xl font-bold text-gold-grad">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 font-display text-xl font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed opacity-70">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Tech wall                                                           */
/* ------------------------------------------------------------------ */

export function TechWall({ title, labels }: { title: string; labels: string[] }) {
  return (
    <section aria-labelledby="tech-title" className="bg-canvas py-20 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Kicker>Technology</Kicker>
            <h2 id="tech-title" className="display-lg mt-5 text-fg">{title}</h2>
            <Link href="/technologies" className="mt-6 inline-flex items-center gap-2 font-semibold text-gold-ink hover:underline">
              Explore technologies <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
          <ul className="flex flex-wrap content-start gap-2.5 lg:col-span-8">
            {labels.map((l) => (
              <li key={l} className="rounded-full border border-line bg-surface px-5 py-2.5 font-display text-sm font-semibold text-fg shadow-[var(--shadow-card)] transition-colors hover:border-line-gold hover:text-gold-ink">
                {l}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Insights + CTA                                                      */
/* ------------------------------------------------------------------ */

export function InsightsRow({ posts }: { posts: BlogCardData[] }) {
  if (!posts.length) return null;
  return (
    <section aria-labelledby="insights-title" className="bg-canvas-2 py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <SectionTitle id="insights-title" kicker="Insights" title="Field notes from" gold="the team.">
          <Link href="/resources/blogs" className="btn-ghost-brand self-start lg:self-auto">
            All articles <ArrowRight aria-hidden className="btn-arrow h-4 w-4" />
          </Link>
        </SectionTitle>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <BlogCard post={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function BigCta() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-canvas py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/25 blur-[140px]" />
      <div className="relative mx-auto max-w-[1400px] px-4 text-center sm:px-6 lg:px-10">
        <h2 id="cta-title" className="display-xl mx-auto max-w-[12ch] uppercase text-fg">
          Let&apos;s build <span className="text-gold-grad">what&apos;s next.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-fg-muted">Tell us about your idea, product or process. We reply with honest recommendations and a sensible first step.</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/contact-us" className="btn-brand !px-8 !py-4 text-base">
            Request a consultation <ArrowRight aria-hidden className="btn-arrow h-4 w-4" />
          </Link>
          <Link href="/resources/portfolio" className="btn-ghost-brand !px-8 !py-4 text-base">
            See our work
          </Link>
        </div>
      </div>
    </section>
  );
}
