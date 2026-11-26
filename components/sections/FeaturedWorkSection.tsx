import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCard, type PortfolioCard } from "@/components/portfolio/PortfolioExplorer";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

/** Homepage portfolio showcase — only real (verified) or clearly labelled concept projects reach this component. */
export default function FeaturedWorkSection({ projects }: { projects: PortfolioCard[] }) {
  if (!projects.length) return null;
  return (
    <section aria-labelledby="featured-work-title" className="relative w-full overflow-hidden bg-canvas py-20 sm:py-24 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-tech/15 blur-[140px]" />
        <div className="absolute -right-20 bottom-0 h-[380px] w-[380px] rounded-full bg-gold/10 blur-[120px]" />
      </div>
      <div className="relative mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-10 xl:px-0">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="featured-work-title"
            align="left"
            eyebrow="Portfolio"
            title="Software you can try, not just read about"
            subtitle="Interactive concept projects built by ALPIXN across healthcare, logistics, manufacturing, fintech, AI and robotics — each one a working interface designed around real workflows."
          />
          <Link href="/resources/portfolio" className="btn-ghost-brand shrink-0 self-start lg:self-auto">
            Explore the portfolio
            <ArrowRight aria-hidden className="btn-arrow h-4 w-4" />
          </Link>
        </Reveal>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 6).map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 3) * 90}>
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
