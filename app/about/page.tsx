import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Bot, BrainCircuit, Code2, FileSearch, Scale, Users } from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import HowWeWorkSection from "@/components/sections/HowWeWorkSection";
import CtaBand from "@/components/sections/shared/CtaBand";
import Reveal from "@/components/ui/Reveal";
import { organizationJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About ALPIXN – AI, Robotics & Software Engineering",
  description:
    "Learn what ALPIXN does: custom software, AI solutions, robotics software and intelligent automation for businesses in India, the UAE, the UK, the USA, Australia, Canada and beyond.",
  path: "/about",
  image: "/opengraph-image.jpg",
});

const PILLARS = [
  {
    icon: BrainCircuit,
    title: "Artificial intelligence",
    text: "AI features that solve a defined business problem: document processing, knowledge assistants, AI agents, predictive analytics and LLM integration — evaluated before launch and monitored after.",
    links: [
      { label: "AI development", href: "/our-expertise/artificial-intelligence/ai-development" },
      { label: "Generative AI", href: "/our-expertise/artificial-intelligence/genai-development" },
      { label: "AI agents", href: "/our-expertise/artificial-intelligence/ai-agent-development" },
    ],
  },
  {
    icon: Bot,
    title: "Robotics & intelligent automation",
    text: "Software around robots and automated processes: fleet monitoring, computer vision inspection, operator dashboards, workflow automation and integrations with plant and warehouse systems.",
    links: [
      { label: "Computer vision", href: "/our-expertise/artificial-intelligence/computer-vision-development" },
      { label: "AI automation", href: "/our-expertise/artificial-intelligence/ai-automation-services" },
      { label: "Robotics concept project", href: "/resources/portfolio/robofleet-command-center" },
    ],
  },
  {
    icon: Code2,
    title: "Software engineering",
    text: "Custom web applications, SaaS platforms, mobile apps, CRMs, ERPs, APIs and cloud infrastructure — built with modern, maintainable technology and delivered in measurable releases.",
    links: [
      { label: "Custom software", href: "/our-expertise/software-solution/software-development" },
      { label: "SaaS development", href: "/our-expertise/software-solution/saas-development" },
      { label: "Mobile apps", href: "/our-expertise/software-solution/mobile-app-development" },
    ],
  },
];

const INDUSTRIES = [
  ["Healthcare", "/our-expertise/industries/healthtech"],
  ["Education", "/our-expertise/industries/edtech"],
  ["Fintech", "/our-expertise/industries/fintech"],
  ["Retail & e-commerce", "/our-expertise/industries/retail"],
  ["Real estate", "/our-expertise/industries/proptech"],
  ["Logistics & transport", "/our-expertise/industries/transport"],
  ["Automotive & manufacturing", "/our-expertise/industries/automotive"],
  ["Travel & hospitality", "/our-expertise/industries/travel"],
];

const MARKETS = [
  ["India", "/images/india.svg"],
  ["United States", "/images/usa.svg"],
  ["United Kingdom", "/images/uk.svg"],
  ["United Arab Emirates", "/images/uae.svg"],
  ["Australia", "/images/australia.svg"],
  ["Canada", "/images/canada.svg"],
  ["Italy", "/images/italy.svg"],
  ["Thailand", "/images/thailand.svg"],
  ["South Africa", "/images/south-africa.svg"],
];

const STACK = [
  ["Next.js", "/technologies/frontend/nextjs"],
  ["React", "/technologies/frontend/reactjs"],
  ["TypeScript", "/technologies/frontend/typescript"],
  ["Node.js", "/technologies/backend/node-js"],
  ["Python", "/technologies/backend/python"],
  ["Flutter", "/technologies/mobile/flutter"],
  ["React Native", "/technologies/mobile/react-native"],
  ["AWS", "/technologies/devops/aws"],
  ["Azure", "/technologies/devops/azure"],
  ["SQL databases", "/technologies/backend/sql"],
];

const COMMITMENTS = [
  { icon: BadgeCheck, title: "Honest portfolio", text: "Concept projects are labelled as concepts. We only present client work as ours when it is verified and we have permission." },
  { icon: FileSearch, title: "Sourced content", text: "Our articles cite primary documentation and standards where facts need support, and disclose when AI assisted the drafting." },
  { icon: Scale, title: "No invented numbers", text: "We do not publish statistics, results or testimonials we cannot back up. Ask us for references relevant to your project." },
  { icon: Users, title: "Clear ownership", text: "You own the code and data we build for you, with documentation and a handover plan agreed up front." },
];

export default function AboutPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-canvas pb-16 pt-10 sm:pt-14">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-ambient" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(60%_70%_at_20%_10%,#000,transparent)]" />
        <div className="relative mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-10 xl:px-0">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="eyebrow">About ALPIXN</span>
              <h1 className="heading-gradient mt-4 text-4xl font-semibold !leading-[1.08] sm:text-5xl lg:text-[3.4rem]">An AI, robotics and software engineering company</h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
                ALPIXN designs and builds software that makes businesses work better: applications customers use every day, internal systems teams depend on, and AI and automation that remove repetitive work. We bring product thinking, engineering discipline and practical AI experience into one team.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact-us" className="btn-brand">
                  Start a conversation <ArrowRight aria-hidden className="btn-arrow h-4 w-4" />
                </Link>
                <Link href="/resources/portfolio" className="btn-ghost-brand">
                  Explore our work
                </Link>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[420px] lg:col-span-5">
              <div aria-hidden className="absolute inset-0 rounded-full bg-tech/20 blur-[90px]" />
              <div className="relative aspect-square">
                <div aria-hidden className="absolute inset-0 rounded-full border border-line" />
                <div aria-hidden className="absolute inset-[12%] rounded-full border border-dashed border-line-gold [animation:spin_50s_linear_infinite]" />
                <Image src="/brand/alpixn-emblem.webp" alt="ALPIXN emblem" width={320} height={320} priority className="absolute left-1/2 top-1/2 w-[58%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_20px_50px_rgba(217,154,25,0.35)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="what-we-do" className="bg-canvas-2 py-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-10 xl:px-0">
          <Reveal>
            <span className="eyebrow">What we do</span>
            <h2 id="what-we-do" className="heading-gradient mt-4 max-w-3xl text-3xl font-semibold sm:text-4xl">
              Three capabilities, one delivery team
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {PILLARS.map(({ icon: Icon, title, text, links }, i) => (
              <Reveal key={title} delay={i * 100}>
                <article className="border-glow flex h-full flex-col rounded-2xl bg-surface p-7 shadow-[var(--shadow-card)]">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-[linear-gradient(135deg,#fbe7a1_0%,#e3a52a_45%,#b8740c_100%)] text-[#071a33]">
                    <Icon aria-hidden className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold text-fg">{title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{text}</p>
                  <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                    {links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1 text-xs font-medium text-fg-muted hover:border-gold hover:text-fg">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="who-we-serve" className="bg-canvas py-20">
        <div className="mx-auto grid max-w-[1350px] gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-10 xl:px-0">
          <Reveal>
            <span className="eyebrow">Industries</span>
            <h2 id="who-we-serve" className="heading-gradient mt-4 text-3xl font-semibold sm:text-4xl">
              Who we build for
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-muted">
              We work with startups, small and medium-sized businesses and enterprise teams. Industry context shapes the work — from privacy rules in healthcare to ledger design in fintech and shop-floor integration in manufacturing.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-3">
              {INDUSTRIES.map(([name, href]) => (
                <li key={href}>
                  <Link href={href} className="flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3 text-sm font-medium text-fg transition hover:border-gold/60">
                    {name} <ArrowRight aria-hidden className="h-4 w-4 text-fg-subtle" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <span className="eyebrow">Markets</span>
            <h2 className="heading-gradient mt-4 text-3xl font-semibold sm:text-4xl">Where our clients are</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-muted">
              We serve businesses across these markets and design for their realities — local currencies, languages, payment methods, data protection rules and time zones.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {MARKETS.map(([name, flag]) => (
                <li key={name} className="flex items-center gap-2.5 rounded-xl border border-line bg-surface px-3 py-3 text-sm text-fg">
                  <Image src={flag} alt="" width={22} height={22} className="h-5 w-5 rounded-full object-cover ring-1 ring-line" />
                  {name}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <HowWeWorkSection />

      <section aria-labelledby="technology" className="bg-canvas py-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-10 xl:px-0">
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <span className="eyebrow">Technology</span>
              <h2 id="technology" className="heading-gradient mt-4 text-3xl font-semibold sm:text-4xl">
                A modern, proven stack
              </h2>
              <p className="mt-4 text-base leading-relaxed text-fg-muted">
                We choose technology for maintainability and fit, not novelty — typically TypeScript and React on the web, Flutter or React Native on mobile, Node.js and Python on the server, relational and document databases, and managed cloud infrastructure.
              </p>
            </Reveal>
            <ul className="flex flex-wrap content-start gap-3 lg:col-span-7">
              {STACK.map(([name, href]) => (
                <li key={href}>
                  <Link href={href} className="inline-block rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-fg shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:border-gold/60">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-20">
            <Reveal>
              <span className="eyebrow">Our commitments</span>
              <h2 className="heading-gradient mt-4 max-w-3xl text-3xl font-semibold sm:text-4xl">Credibility you can check</h2>
            </Reveal>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {COMMITMENTS.map(({ icon: Icon, title, text }) => (
                <li key={title} className="rounded-2xl border border-line bg-surface p-6">
                  <Icon aria-hidden className="h-6 w-6 text-gold" />
                  <h3 className="mt-4 font-display text-base font-semibold text-fg">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand
        title="Tell us what you are trying to achieve"
        description="Whether it is a new product, an AI feature or the next step for an existing system, we will listen first and recommend a practical path."
        primary={{ label: "Contact ALPIXN", href: "/contact-us" }}
        secondary={{ label: "Read our insights", href: "/resources/blogs" }}
      />
      <JsonLd data={{ ...organizationJsonLd(), "@type": "Organization" }} />
    </main>
  );
}
