import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bot, BrainCircuit, Code2, Eye, FileCheck2, GitBranch, ShieldCheck, Workflow } from "lucide-react";
import WorldConnect from "@/components/hero/WorldConnect";
import { BlogCard, type BlogCardData } from "@/components/blog/BlogExplorer";
import Reveal from "@/components/ui/Reveal";
import type { HomeOfferingRecord } from "@/lib/content-types";

/**
 * Homepage v4 — uses every colour in the ALPIXN logo:
 * navy #071A33 · deep blue #064A87 · electric blue #0878D1 · light gold #F6D77A · gold #D99A19 · bronze #9A5B08
 */

const NAVY = "#071a33";

function Kicker({ children, tone = "gold" }: { children: React.ReactNode; tone?: "gold" | "blue" | "light" }) {
  const styles = {
    gold: "border-[#d99a19]/35 bg-[#f6d77a]/25 text-[#9a5b08] dark:bg-[#d99a19]/10 dark:text-[#f6d77a]",
    blue: "border-[#0878d1]/30 bg-[#0878d1]/10 text-[#064a87] dark:text-[#7cc6ff]",
    light: "border-white/20 bg-white/10 text-[#f6d77a]",
  }[tone];
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.18em] ${styles}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse-dot" />
      {children}
    </span>
  );
}

function Heading({ id, kicker, tone, title, accent, center, children }: { id: string; kicker: string; tone?: "gold" | "blue"; title: string; accent?: string; center?: boolean; children?: React.ReactNode }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Kicker tone={tone}>{kicker}</Kicker>
      <h2 id={id} className="mt-4 font-display text-[clamp(1.5rem,2.3vw,2.05rem)] font-bold leading-[1.12] tracking-[-0.025em] text-fg">
        {title} {accent ? <span className="text-brand-spectrum">{accent}</span> : null}
      </h2>
      {children ? <p className="mt-4 text-base leading-relaxed text-fg-muted">{children}</p> : null}
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

const LEGACY_TITLES = new Set(["building digital solutions that scale with you"]);
const LEGACY_DESCRIPTIONS = new Set(["custom software, ai, and web solutions tailored to your growth journey"]);
const HERO_DESCRIPTION =
  "From machine-learning models and robot control software to cloud platforms and mobile apps — ALPIXN designs, builds and runs the technology behind smarter operations.";

const PILLARS = [
  { icon: BrainCircuit, title: "AI solutions", text: "Machine learning, generative AI and document intelligence.", color: "#0878d1", ink: "#ffffff" },
  { icon: Bot, title: "Robotics software", text: "Fleet dashboards, vision and motion interfaces.", color: "#064a87", ink: "#ffffff" },
  { icon: Code2, title: "Software engineering", text: "Web, mobile and SaaS products built to scale.", color: "#d99a19", ink: NAVY },
  { icon: Workflow, title: "Intelligent automation", text: "Workflows and integrations that remove manual work.", color: "#9a5b08", ink: "#ffffff" },
];

export function HeroV4({
  title,
  description,
  primary,
  secondary,
}: {
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  fallbackImage?: string;
}) {
  // The old CMS default read like a marketing agency; use the engineering headline unless admin set a custom one.
  const useDefault = !title.trim() || LEGACY_TITLES.has(title.trim().toLowerCase());
  const words = title.trim().split(/\s+/);
  const split = Math.max(1, words.length - 3);
  const lead = words.slice(0, split).join(" ");
  const tail = words.slice(split).join(" ");
  const copy = LEGACY_DESCRIPTIONS.has(description.trim().toLowerCase()) || !description.trim() ? HERO_DESCRIPTION : description;

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-canvas">
      {/* Soft brand-colour atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_30%,transparent_80%)]" />
        <div className="absolute -left-40 top-24 h-[460px] w-[460px] rounded-full bg-[#0878d1]/14 blur-[130px]" />
        <div className="absolute -right-40 top-40 h-[460px] w-[460px] rounded-full bg-[#f6d77a]/40 blur-[130px] dark:bg-[#d99a19]/14" />
        <div className="absolute bottom-0 left-1/2 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-[#9a5b08]/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[1320px] px-4 pt-12 sm:px-6 sm:pt-16 lg:px-10 lg:pt-20">
        {/* Centered message */}
        <div className="mx-auto max-w-4xl text-center">
          <Kicker tone="blue">AI · Robotics · Software Engineering</Kicker>
          <h1 id="hero-title" className="mt-6 font-display text-[clamp(1.85rem,3.3vw,2.9rem)] font-bold leading-[1.06] tracking-[-0.03em] text-fg">
            {useDefault ? (
              <>
                Engineering <span className="text-brand-spectrum">AI, Robotics &amp; Software</span> for the Real World
              </>
            ) : (
              <>
                {lead} <span className="text-brand-spectrum">{tail}</span>
              </>
            )}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-fg-muted">{copy}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={primary.href} className="btn-brand !px-7 !py-3.5 text-[15px]">
              {primary.label} <ArrowRight aria-hidden className="btn-arrow h-4 w-4" />
            </Link>
            <Link href={secondary.href} className="btn-ghost-brand !px-7 !py-3.5 text-[15px]">
              {secondary.label}
            </Link>
          </div>
        </div>

        {/* Stage: the nine markets on a world map, linked by AI, robotics, cloud and software */}
        <div className="relative mx-auto mt-10 max-w-[1180px] lg:mt-12">
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(8,120,209,0.14)_0%,rgba(246,215,122,0.18)_45%,transparent_72%)] blur-2xl" />
          <WorldConnect />
        </div>

        {/* Capabilities — one logo colour each */}
        <ul className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {PILLARS.map(({ icon: Icon, title: t, text, color, ink }) => (
            <li key={t} className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-3 shadow-[var(--shadow-card)] lg:items-start lg:p-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg lg:h-11 lg:w-11 lg:rounded-xl" style={{ background: color, color: ink }}>
                <Icon aria-hidden className="h-4 w-4 lg:h-5 lg:w-5" />
              </span>
              <span>
                <span className="block font-display text-[13px] font-semibold leading-tight text-fg lg:text-[15px]">{t}</span>
                <span className="mt-1 hidden text-[12.5px] leading-snug text-fg-muted lg:block">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Markets strip */}
      <div className="relative mt-10 border-y border-line bg-surface/70 backdrop-blur">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:justify-between lg:px-10">
          <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-fg-subtle">Serving clients in 9 countries</span>
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2.5">
            {MARKETS.map(([name, flag]) => (
              <li key={name} className="flex items-center gap-1.5 text-sm font-medium text-fg-muted">
                <Image src={flag} alt="" width={18} height={18} className="h-[18px] w-[18px] rounded-full object-cover ring-1 ring-black/10" />
                {name}
              </li>
            ))}
          </ul>
        </div>
        <div aria-hidden className="h-1 bg-brand-spectrum" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Services — six tiles, six logo colours                              */
/* ------------------------------------------------------------------ */

const TONES = [
  { bg: "#071a33", fg: "text-white", sub: "text-white/75", num: "text-[#f6d77a]", btn: "bg-[#f6d77a] text-[#071a33]" },
  { bg: "#0878d1", fg: "text-white", sub: "text-white/90", num: "text-white/55", btn: "bg-white text-[#064a87]" },
  { bg: "#d99a19", fg: "text-[#071a33]", sub: "text-[#071a33]/80", num: "text-[#071a33]/45", btn: "bg-[#071a33] text-[#f6d77a]" },
  { bg: "#064a87", fg: "text-white", sub: "text-white/80", num: "text-[#f6d77a]/80", btn: "bg-[#d99a19] text-[#071a33]" },
  { bg: "#f6d77a", fg: "text-[#071a33]", sub: "text-[#071a33]/80", num: "text-[#9a5b08]/70", btn: "bg-[#9a5b08] text-white" },
  { bg: "#9a5b08", fg: "text-white", sub: "text-white/85", num: "text-[#f6d77a]/80", btn: "bg-[#f6d77a] text-[#071a33]" },
];

export function ServicesV4({ title, subtitle, items }: { title: string; subtitle: string; items: HomeOfferingRecord[] }) {
  return (
    <section aria-labelledby="services-title" className="bg-canvas-2 py-20 sm:py-24">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Heading id="services-title" kicker="What we do" title={title}>
            {subtitle}
          </Heading>
          <Link href="/our-expertise" className="btn-ghost-brand self-start lg:self-auto">
            All services <ArrowRight aria-hidden className="btn-arrow h-4 w-4" />
          </Link>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s, i) => {
            const t = TONES[i % TONES.length];
            return (
              <Reveal as="li" key={s.title} delay={(i % 3) * 80}>
                <Link href="/our-expertise" className="group relative flex h-full min-h-[270px] flex-col overflow-hidden rounded-[28px] p-7 shadow-[0_24px_50px_-30px_rgba(7,26,51,0.55)] transition-transform duration-300 hover:-translate-y-1.5" style={{ background: t.bg }}>
                  <span aria-hidden className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-white/10" />
                  <div className="relative flex items-start justify-between">
                    <span className={`font-display text-4xl font-bold ${t.num}`}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={`grid h-10 w-10 place-items-center rounded-full transition-transform duration-300 group-hover:rotate-45 ${t.btn}`}>
                      <ArrowUpRight aria-hidden className="h-5 w-5" />
                    </span>
                  </div>
                  <h3 className={`relative mt-auto pt-10 font-display text-xl font-bold tracking-tight sm:text-[1.4rem] ${t.fg}`}>{s.title}</h3>
                  <p className={`relative mt-2.5 line-clamp-3 text-[14.5px] leading-relaxed ${t.sub}`}>{s.description}</p>
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
/* Process timeline                                                    */
/* ------------------------------------------------------------------ */

const STEPS = [
  { t: "Discover", d: "Goals, users, data and constraints — agreed before any build starts.", c: "#0878d1", ink: "#ffffff" },
  { t: "Design", d: "Flows, clickable prototypes and an architecture you can review.", c: "#064a87", ink: "#ffffff" },
  { t: "Build", d: "Short sprints with working demos and automated tests.", c: "#071a33", ink: "#f6d77a" },
  { t: "Launch", d: "Pilot, training, monitoring and a clean handover.", c: "#d99a19", ink: NAVY },
  { t: "Improve", d: "Measure real usage and extend what works.", c: "#9a5b08", ink: "#ffffff" },
];

export function ProcessV4() {
  return (
    <section aria-labelledby="process-title" className="bg-canvas py-20 sm:py-24">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <Heading id="process-title" kicker="How we work" tone="blue" title="A clear path from" accent="idea to launch." center>
          Five steps, the same on every project — so you always know what happens next.
        </Heading>
        <ol className="relative mt-14 grid gap-8 md:grid-cols-5 md:gap-5">
          <span aria-hidden className="absolute left-[10%] right-[10%] top-7 hidden h-1 rounded-full bg-brand-spectrum md:block" />
          {STEPS.map((s, i) => (
            <li key={s.t} className="relative flex gap-4 md:flex-col md:items-center md:text-center">
              <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full font-display text-lg font-bold ring-8 ring-[var(--canvas)]" style={{ background: s.c, color: s.ink }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-fg md:mt-5">{s.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Markets + working commitments                                       */
/* ------------------------------------------------------------------ */

const COMMITMENTS = [
  { icon: FileCheck2, t: "Clear scope first", d: "A written scope and estimate before development starts.", c: "#0878d1" },
  { icon: Eye, t: "Demo every sprint", d: "You see working software regularly, not just status reports.", c: "#d99a19" },
  { icon: GitBranch, t: "Your code, your repo", d: "Source code and documentation are handed over to you.", c: "#064a87" },
  { icon: ShieldCheck, t: "Security by design", d: "Access control, data protection and reviews built into the process.", c: "#9a5b08" },
];

export function MarketsV4() {
  return (
    <section aria-labelledby="markets-title" className="bg-canvas-2 py-20 sm:py-24">
      <div className="mx-auto grid max-w-[1320px] gap-5 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
        <div className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(150deg,#064a87_0%,#071a33_75%)] p-8 text-white sm:p-10 lg:col-span-5">
          <div aria-hidden className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#0878d1]/40 blur-[80px]" />
          <div aria-hidden className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-[#d99a19]/30 blur-[80px]" />
          <div className="relative">
            <Kicker tone="light">Global delivery</Kicker>
            <h2 id="markets-title" className="mt-4 font-display text-[clamp(1.5rem,2.3vw,2rem)] font-bold leading-[1.12] tracking-[-0.025em]">
              Built for teams across <span className="text-[#f6d77a]">nine markets.</span>
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/75">Local currencies, languages, tax rules and time zones are part of the brief from day one.</p>
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {MARKETS.map(([name, flag]) => (
                <li key={name} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm">
                  <Image src={flag} alt="" width={20} height={20} className="h-5 w-5 rounded-full object-cover" />
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="rounded-[32px] border border-line bg-surface p-8 shadow-[var(--shadow-card)] sm:p-10 lg:col-span-7">
          <Kicker>How we work with you</Kicker>
          <h2 className="mt-4 font-display text-[clamp(1.4rem,2vw,1.85rem)] font-bold leading-[1.15] tracking-[-0.025em] text-fg">
            Straightforward, <span className="text-brand-spectrum">from the first call.</span>
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {COMMITMENTS.map(({ icon: Icon, t, d, c }) => (
              <li key={t} className="rounded-2xl border border-line bg-surface-2 p-5">
                <span className="grid h-10 w-10 place-items-center rounded-xl text-white" style={{ background: c }}>
                  <Icon aria-hidden className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-fg">{t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-fg-muted">{d}</p>
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

export function InsightsV4({ posts }: { posts: BlogCardData[] }) {
  if (!posts.length) return null;
  return (
    <section aria-labelledby="insights-title" className="bg-canvas py-20 sm:py-24">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Heading id="insights-title" kicker="Insights" tone="blue" title="Latest from the" accent="ALPIXN blog.">
            Practical guides on AI, robotics and software engineering.
          </Heading>
          <Link href="/resources/blogs" className="btn-ghost-brand self-start lg:self-auto">
            All articles <ArrowRight aria-hidden className="btn-arrow h-4 w-4" />
          </Link>
        </div>
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

export function CtaV4() {
  return (
    <section aria-labelledby="cta-title" className="bg-canvas px-4 pb-20 sm:px-6 sm:pb-24 lg:px-10">
      <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[36px] bg-[linear-gradient(135deg,#071a33_0%,#064a87_55%,#0878d1_100%)] px-6 py-16 text-center text-white sm:px-12 sm:py-20">
        <div aria-hidden className="absolute inset-0 bg-grid opacity-25" />
        <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#f6d77a]/30 blur-[90px]" />
        <div aria-hidden className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[#9a5b08]/45 blur-[90px]" />
        <div className="relative mx-auto max-w-2xl">
          <Kicker tone="light">Start a project</Kicker>
          <h2 id="cta-title" className="mt-5 font-display text-[clamp(1.7rem,2.8vw,2.4rem)] font-bold leading-[1.1] tracking-[-0.03em]">
            Let&apos;s build <span className="text-gold-grad">what&apos;s next.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">Tell us about your idea, product or process. We reply with honest recommendations and a sensible first step.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contact-us" className="btn-brand !px-7 !py-3.5 text-[15px]">
              Request a consultation <ArrowRight aria-hidden className="btn-arrow h-4 w-4" />
            </Link>
            <Link href="/our-expertise" className="btn-ghost-brand !px-7 !py-3.5 text-[15px]">
              Explore our services
            </Link>
          </div>
        </div>
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1.5 bg-brand-spectrum" />
      </div>
    </section>
  );
}
