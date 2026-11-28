import Accent from "@/components/ui/Accent";
import { BadgeCheck, FileSearch, Scale, Users } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";
import HowWeWorkSection from "@/components/sections/HowWeWorkSection";
import CtaBand from "@/components/sections/shared/CtaBand";
import IndustriesTechBand from "@/components/sections/shared/IndustriesTechBand";
import JourneyTimeline, { type JourneyContent } from "@/components/about/JourneyTimeline";
import { HeroV4, MarketsV4, type MarketsContent } from "@/components/home/HomeV4";
import { getCachedPageBlock } from "@/lib/content-service";
import { FeatureCards, Heading, Section } from "@/components/ui/v4";
import Reveal from "@/components/ui/Reveal";
import { organizationJsonLd, pageMetadata } from "@/lib/seo";
import { withSeo } from "@/lib/seo-store";

const baseMetadata = pageMetadata({
  title: "About ALPIXN – AI, Robotics & Software Engineering",
  description:
    "Learn what ALPIXN does: custom software, AI solutions, robotics software and intelligent automation for businesses in India, the UAE, the UK, the USA, Australia, Canada and beyond.",
  path: "/about",
  image: "/opengraph-image.jpg",
});

export async function generateMetadata() {
  return withSeo("/about", baseMetadata);
}

const COMMITMENTS = [
  { icon: BadgeCheck, title: "Honest portfolio", text: "Concept projects are labelled as concepts. We only present client work as ours when it is verified and we have permission." },
  { icon: FileSearch, title: "Sourced content", text: "Our articles cite primary documentation and standards where facts need support, and disclose when AI assisted the drafting." },
  { icon: Scale, title: "No invented numbers", text: "We do not publish statistics, results or testimonials we cannot back up. Ask us for references relevant to your project." },
  { icon: Users, title: "Clear ownership", text: "You own the code and data we build for you, with documentation and a handover plan agreed up front." },
];

export default async function AboutPage() {
  const [hero, pillars, journey, markets] = await Promise.all([
    getCachedPageBlock("about.hero"),
    getCachedPageBlock("about.pillars"),
    getCachedPageBlock("about.journey"),
    getCachedPageBlock("home.markets"),
  ]);
  const h = hero as { heading: string; description: string };
  const pl = pillars as { kicker: string; title: string; items: { title: string; text: string }[] };
  return (
    <main>
      <HeroV4
        title={h.heading}
        accentWords={5}
        description={h.description}
        primary={{ label: "", href: "" }}
        secondary={{ label: "", href: "" }}
      />
      <Section id="about-pillars">
        <Heading id="about-pillars" kicker={pl.kicker} title={pl.title} center />
        <FeatureCards items={pl.items.map((i) => ({ title: i.title, description: i.text }))} />
      </Section>
      <JourneyTimeline content={journey as unknown as JourneyContent} />


      <IndustriesTechBand />
      <MarketsV4 content={markets as unknown as MarketsContent} />

      <HowWeWorkSection />

      <section aria-labelledby="commitments" className="bg-canvas py-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-10 xl:px-0">
          <div>
            <Reveal>
              <span className="eyebrow">Our commitments</span>
              <h2 className="mt-4 max-w-3xl font-display text-[clamp(1.35rem,1.9vw,1.75rem)] font-bold leading-[1.15] tracking-[-0.025em] text-fg"><Accent text="Credibility you can check" /></h2>
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
