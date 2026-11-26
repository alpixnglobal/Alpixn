import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bot, BrainCircuit, Code2, Eye, FileCheck2, GitBranch, ShieldCheck, Workflow } from "lucide-react";
import HeroVisual from "@/components/hero/HeroVisual";
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
      <h2 id={id} className="mt-4 font-display text-[clamp(1.75rem,3vw,2.6rem)] font-bold leading-[1.12] tracking-[-0.025em] text-fg">
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
  fallbackImage,
}: {
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  fallbackImage?: string;
}) {
  const words = title.trim().split(/\s+/);
  const split = Math.max(1, words.length - 3);
  const lead = words.slice(0, split).join(" ");
  const tail = words.slice(split).join(" ");

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-canvas">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-[480px] w-[480px] rounded-full bg-[#0878d1]/12 blur-[120px]" />
        <div className="absolute right-0 top-10 h-[420px] w-[420px] rounded-full bg-[#f6d77a]/35 blur-[120px] dark:bg-[#d99a19]/12" />
      </div>

      <div className="relative mx-auto grid max-w-[1320px] gap-10 px-4 pb-14 pt-10 sm:px-6 sm:pt-14 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-10 lg:pb-20 lg:pt-16">
        <div className="lg:col-span-6">
          <Kicker tone="blue">AI · Robotics · Software Engineering</Kicker>
          <h1 id="hero-title" className="mt-5 font-display text-[clamp(2.2rem,4.4vw,3.8rem)] font-bold leading-[1.06] tracking-[-0.03em] text-fg">
            {lead} <span className="text-brand-spectrum">{tail}</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-muted">{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={primary.href} className="btn-brand !px-7 !py-3.5 text-[15px]">
              {primary.label} <ArrowRight aria-hidden className="btn-arrow h-4 w-4" />
            </Link>
            <Link href={secondary.href} className="btn-ghost-brand !px-7 !py-3.5 text-[15px]">
              {secondary.label}
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-fg-muted">
            <span className="font-medium text-fg">Serving clients in</span>
            <span className="flex flex-wrap gap-1.5">
              {MARKETS.map(([name, flag]) => (
                <Image key={name} src={flag} alt={name} title={name} width={24} height={24} className="h-6 w-6 rounded-full object-cover ring-1 ring-black/10" />
              ))}
            </span>
            <span>9 countries</span>
          </div>
        </div>

        {/* Always-navy robotics panel */}
        <div className="dark section-navy relative min-h-[380px] overflow-hidden rounded-[32px] !bg-[linear-gradient(150deg,#071a33_0%,#064a87_70%,#0878d1_120%)] shadow-[0_40px_90px_-40px_rgba(7,26,51,0.7)] sm:min-h-[460px] lg:col-span-6 lg:min-h-[540px]">
          <div aria-hidden className="absolute inset-0 bg-grid opacity-40" />
          <div aria-hidden className="absolute -bottom-24 left-1/2 h-64 w-[80%] -translate-x-1/2 rounded-full bg-[#d99a19]/30 blur-[90px]" />
          <div className="absolute inset-0">
            <HeroVisual fallbackImage={fallbackImage} forceTheme="dark" />
          </div>
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-1.5 bg-brand-spectrum" />
        </div>
      </div>

      {/* Four pillars, one logo colour each */}
      <div className="relative mx-auto max-w-[1320px] px-4 pb-16 sm:px-6 lg:px-10 lg:pb-20">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map(({ icon: Icon, title: t, text, color, ink }, i) => (
            <Reveal as="li" key={t} delay={i * 70}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-surface p-6 shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-1">
                <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: color }} />
                <span className="grid h-12 w-12 place-items-center rounded-2xl" style={{ background: color, color: ink }}>
                  <Icon aria-hidden className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-fg">{t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
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
            <h2 id="markets-title" className="mt-4 font-display text-[clamp(1.75rem,3vw,2.4rem)] font-bold leading-[1.12] tracking-[-0.025em]">
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
          <h2 className="mt-4 font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-bold leading-[1.15] tracking-[-0.025em] text-fg">
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
          <h2 id="cta-title" className="mt-5 font-display text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-[1.1] tracking-[-0.03em]">
            Let&apos;s build <span className="text-gold-grad">what&apos;s next.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">Tell us about your idea, product or process. We reply with honest recommendations and a sensible first step.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contact-us" className="btn-brand !px-7 !py-3.5 text-[15px]">
              Request a consultation <ArrowRight aria-hidden className="btn-arrow h-4 w-4" />
            </Link>
            <Link href="/our-expertise" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10">
              Explore our services
            </Link>
          </div>
        </div>
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1.5 bg-brand-spectrum" />
      </div>
    </section>
  );
}
