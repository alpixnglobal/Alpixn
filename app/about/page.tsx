import { BadgeCheck, FileSearch, Scale, Users } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";
import HowWeWorkSection from "@/components/sections/HowWeWorkSection";
import CtaBand from "@/components/sections/shared/CtaBand";
import { StatementHero } from "@/components/hero/HeroPanels";
import IndustriesTechBand from "@/components/sections/shared/IndustriesTechBand";
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

const COMMITMENTS = [
  { icon: BadgeCheck, title: "Honest portfolio", text: "Concept projects are labelled as concepts. We only present client work as ours when it is verified and we have permission." },
  { icon: FileSearch, title: "Sourced content", text: "Our articles cite primary documentation and standards where facts need support, and disclose when AI assisted the drafting." },
  { icon: Scale, title: "No invented numbers", text: "We do not publish statistics, results or testimonials we cannot back up. Ask us for references relevant to your project." },
  { icon: Users, title: "Clear ownership", text: "You own the code and data we build for you, with documentation and a handover plan agreed up front." },
];

export default function AboutPage() {
  return (
    <main>
      <StatementHero
        eyebrow="about alpixn"
        title="We engineer AI, robotics and software that businesses rely on every day"
        description="ALPIXN designs and builds the applications customers use, the internal systems teams depend on, and the AI and automation that remove repetitive work — with product thinking and engineering discipline in one team."
        primary={{ label: "Start a conversation", href: "/contact-us" }}
        secondary={{ label: "Explore our services", href: "/our-expertise" }}
        columns={[
          { title: "AI that earns its place", text: "Models and assistants scoped to a clear business problem, evaluated before launch and monitored after." },
          { title: "Robotics software", text: "Fleet dashboards, vision inspection and operator tools that connect machines to the people running them." },
          { title: "Software engineering", text: "Web, mobile and SaaS products built with maintainable code and delivered in measurable releases." },
        ]}
      />


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
