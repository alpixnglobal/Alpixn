import Link from "next/link";
import { BadgeCheck, Bot, BrainCircuit, Code2, FileSearch, Scale, Users } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";
import HowWeWorkSection from "@/components/sections/HowWeWorkSection";
import CtaBand from "@/components/sections/shared/CtaBand";
import HeroBrandPanel from "@/components/sections/shared/HeroBrandPanel";
import IndustriesTechBand from "@/components/sections/shared/IndustriesTechBand";
import PageHero from "@/components/sections/shared/PageHero";
import { MarketsV4 } from "@/components/home/HomeV4";
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

const COMMITMENTS = [
  { icon: BadgeCheck, title: "Honest portfolio", text: "Concept projects are labelled as concepts. We only present client work as ours when it is verified and we have permission." },
  { icon: FileSearch, title: "Sourced content", text: "Our articles cite primary documentation and standards where facts need support, and disclose when AI assisted the drafting." },
  { icon: Scale, title: "No invented numbers", text: "We do not publish statistics, results or testimonials we cannot back up. Ask us for references relevant to your project." },
  { icon: Users, title: "Clear ownership", text: "You own the code and data we build for you, with documentation and a handover plan agreed up front." },
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About ALPIXN"
        title="An AI, Robotics and Software Engineering Company"
        accentWords={5}
        description="ALPIXN designs and builds software that makes businesses work better: applications customers use every day, internal systems teams depend on, and AI and automation that remove repetitive work. We bring product thinking, engineering discipline and practical AI experience into one team."
        primary={{ label: "Start a conversation", href: "/contact-us" }}
        secondary={{ label: "Explore our services", href: "/our-expertise" }}
        aside={<HeroBrandPanel />}
      />

      <section aria-labelledby="what-we-do" className="bg-canvas-2 py-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-10 xl:px-0">
          <Reveal>
            <span className="eyebrow">What we do</span>
            <h2 id="what-we-do" className="heading-gradient mt-4 max-w-3xl font-semibold text-[clamp(1.5rem,2.3vw,2.05rem)]">
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

      <IndustriesTechBand />
      <MarketsV4 />

      <HowWeWorkSection />

      <section aria-labelledby="commitments" className="bg-canvas py-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-10 xl:px-0">
          <div>
            <Reveal>
              <span className="eyebrow">Our commitments</span>
              <h2 className="heading-gradient mt-4 max-w-3xl font-semibold text-[clamp(1.5rem,2.3vw,2.05rem)]">Credibility you can check</h2>
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
