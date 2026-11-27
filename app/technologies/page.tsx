import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TechHero } from "@/components/hero/HeroPanels";
import CtaBand from "@/components/sections/shared/CtaBand";
import { Heading, Section } from "@/components/ui/v4";
import { TECH_CONTENT, techIcon } from "@/lib/technologies";
import { technologyHeroData } from "@/lib/technologyData";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Technologies We Use – Backend, Frontend, Mobile & Cloud | ALPIXN",
  description: "The languages, frameworks, mobile toolkits, cloud platforms and business platforms ALPIXN builds with — and what each one is best for.",
  path: "/technologies",
});

const GROUPS = [
  { key: "backend", title: "Backend & data", text: "APIs, business logic and databases." },
  { key: "frontend", title: "Frontend", text: "Fast, accessible web interfaces." },
  { key: "framework", title: "Frameworks", text: "Proven server frameworks." },
  { key: "mobile", title: "Mobile", text: "iOS and Android apps." },
  { key: "devops", title: "Cloud & DevOps", text: "Hosting, infrastructure and delivery." },
  { key: "more", title: "Platforms & XR", text: "Low-code, CRM and immersive tech." },
];

export default function TechnologiesPage() {
  const all = Object.values(technologyHeroData).filter((t) => TECH_CONTENT[t.slug]);
  return (
    <main>
      <TechHero
        eyebrow="Technologies"
        title="The Technology Behind Our Work"
        description="We choose proven tools for each project — and explain why — so your software stays fast, secure and easy to maintain."
        icons={all.map((t) => ({ label: TECH_CONTENT[t.slug].name, imageData: techIcon(t.slug) }))}
      />
      <Section id="tech-groups">
        <Heading id="tech-groups" kicker="Explore by area" title="Pick a technology to learn more" center subtitle="Each page explains the problems it solves, what we build with it and when we recommend it." />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {GROUPS.map((g) => {
            const items = all.filter((t) => t.category === g.key);
            return (
              <div key={g.key} className="rounded-[28px] border border-line bg-surface p-6 shadow-[var(--shadow-card)]">
                <h3 className="font-display text-lg font-bold text-fg">{g.title}</h3>
                <p className="mt-1 text-[14px] text-fg-muted">{g.text}</p>
                <ul className="mt-5 space-y-2">
                  {items.map((t) => {
                    const c = TECH_CONTENT[t.slug];
                    return (
                      <li key={t.slug}>
                        <Link href={`/technologies/${t.category}/${t.slug}`} className="group flex items-center gap-3 rounded-2xl border border-line bg-canvas px-3 py-2.5 transition-colors hover:border-[#d99a19]/60">
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-surface">
                            <Image src={techIcon(t.slug)} alt="" width={22} height={22} className="h-5 w-5 object-contain" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[14px] font-semibold text-fg">{c.name}</span>
                            <span className="block truncate text-[12px] text-fg-subtle">{t.heroSubtitle}</span>
                          </span>
                          <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: c.accent }} />
                          <ArrowUpRight aria-hidden className="h-4 w-4 shrink-0 text-fg-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>
      <CtaBand title="Not sure which technology fits?" description="Tell us what you are building. We will recommend a stack, explain the trade-offs and suggest a sensible first release." />
    </main>
  );
}
