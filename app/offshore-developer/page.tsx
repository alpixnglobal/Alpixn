import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/sections/shared/PageHero";
import CtaBand from "@/components/sections/shared/CtaBand";
import { Heading, ModelCards, NumberedList, Section, tone } from "@/components/ui/v4";
import { getCachedOffshoreDeveloperNavigation } from "@/lib/content-service";
import { pageMetadata } from "@/lib/seo";
import { withSeo } from "@/lib/seo-store";

const baseMetadata = pageMetadata({
  title: "Hire Offshore Developers – Dedicated Remote Engineers | ALPIXN",
  description: "Hire backend, frontend, mobile, AI and DevOps developers from ALPIXN as a dedicated team or to extend your own — vetted engineers who work in your tools and hours.",
  path: "/offshore-developer",
});

export async function generateMetadata() {
  return withSeo("/offshore-developer", baseMetadata);
}

const STEPS = [
  { title: "Share your requirements", description: "Tell us the role, skills, experience level and how long you need support." },
  { title: "Meet matched developers", description: "We shortlist engineers whose experience fits, and you interview them." },
  { title: "Start with a trial period", description: "Begin with a short trial so you can judge fit before a longer commitment." },
  { title: "Scale when you need to", description: "Add or reduce developers as your roadmap changes." },
];

const MODELS = [
  { title: "Dedicated developer", description: "A full-time engineer who works only on your product and joins your daily routines.", bullets: ["Full-time on your project", "Works in your tools", "Direct communication", "Monthly billing"] },
  { title: "Dedicated team", description: "A small cross-functional team — developers, QA and a lead — owning a product or stream.", bullets: ["Team lead included", "QA and code review", "Sprint demos", "Scale up or down"] },
  { title: "Part-time or hourly", description: "Flexible support for maintenance, small features or specialist skills.", bullets: ["Pay for hours used", "Specialist expertise", "No long commitment", "Fast start"] },
];

export default async function OffshoreDeveloperPage() {
  const categories = await getCachedOffshoreDeveloperNavigation();
  return (
    <main>
      <PageHero
        eyebrow="Offshore developers"
        title="Hire Dedicated Developers"
        description="Add vetted engineers to your team or build a dedicated remote team — backend, frontend, mobile, AI and DevOps — working in your tools and overlapping with your hours."
      />

      <Section id="roles-title">
        <Heading id="roles-title" kicker="Roles we offer" title="Choose the developers you need" center subtitle="Pick a role to see the skills, engagement options and how hiring works." />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <div key={c.key} className="relative overflow-hidden rounded-[28px] border border-line bg-surface p-6 shadow-[var(--shadow-card)]">
              <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: tone(i).c }} />
              <h3 className="font-display text-lg font-bold text-fg">{c.label}</h3>
              <ul className="mt-4 space-y-1.5">
                {c.items.map((it) => (
                  <li key={it.href}>
                    <Link href={it.href} className="group flex items-center justify-between rounded-xl px-3 py-2 text-[14px] text-fg transition-colors hover:bg-surface-2">
                      <span className="flex items-center gap-2.5">
                        <CheckCircle2 aria-hidden className="h-4 w-4" style={{ color: tone(i).c }} />
                        {it.label}
                      </span>
                      <ArrowUpRight aria-hidden className="h-4 w-4 text-fg-subtle opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="how-title" alt>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Heading id="how-title" kicker="How it works" kickerTone="blue" title="From request to first commit" subtitle="A simple process with no long lock-in at the start." />
          </div>
          <div className="lg:col-span-8">
            <NumberedList items={STEPS} />
          </div>
        </div>
      </Section>

      <Section id="models-title">
        <Heading id="models-title" kicker="Engagement models" title="Ways to work with our developers" center />
        <ModelCards items={MODELS} ctaLabel="Discuss this option" />
      </Section>

      <CtaBand title="Ready to grow your team?" description="Tell us the role and skills you need. We will reply with suitable developers and next steps." primary={{ label: "Hire developers", href: "/contact-us" }} />
    </main>
  );
}
