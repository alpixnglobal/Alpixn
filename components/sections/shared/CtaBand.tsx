import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { accentSplit } from "./PageHero";

/**
 * Site-wide conversion banner in the homepage style: navy → deep blue → electric blue panel,
 * last words of the title in gold, gold primary + blue secondary buttons, brand spectrum line.
 */
export default function CtaBand({
  eyebrow = "Start a project",
  title,
  description,
  primary = { label: "Request a consultation", href: "/contact-us" },
  secondary = { label: "Explore our services", href: "/our-expertise" },
  compact = false,
}: {
  eyebrow?: string | null;
  title: string;
  description?: string | null;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string } | null;
  compact?: boolean;
}) {
  const { lead, tail } = accentSplit(title, 2);
  return (
    <section className={`bg-canvas px-4 sm:px-6 lg:px-10 ${compact ? "py-10 sm:py-12" : "py-16 sm:py-20"}`}>
      <div className={`relative mx-auto max-w-[1320px] overflow-hidden rounded-[36px] bg-[linear-gradient(135deg,#071a33_0%,#064a87_55%,#0878d1_100%)] px-6 text-center text-white sm:px-12 ${compact ? "py-10 sm:py-12" : "py-14 sm:py-16"}`}>
        <div aria-hidden className="absolute inset-0 bg-grid opacity-25" />
        <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#f6d77a]/30 blur-[90px]" />
        <div aria-hidden className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[#9a5b08]/45 blur-[90px]" />
        <div className="relative mx-auto max-w-2xl">
          {eyebrow ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-[#f6d77a]">
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {eyebrow}
            </span>
          ) : null}
          <h2 className={`font-display text-[clamp(1.5rem,2.3vw,2.05rem)] font-bold leading-[1.15] tracking-[-0.025em] ${eyebrow ? "mt-5" : ""}`}>
            {lead ? `${lead} ` : null}
            <span className="text-gold-grad">{tail}</span>
          </h2>
          {description ? <p className="mx-auto mt-4 max-w-xl text-white/80">{description}</p> : null}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={primary.href} className="btn-brand !px-7 !py-3.5 text-[15px]">
              {primary.label} <ArrowRight aria-hidden className="btn-arrow h-4 w-4" />
            </Link>
            {secondary ? (
              <Link href={secondary.href} className="btn-ghost-brand !px-7 !py-3.5 text-[15px]">
                {secondary.label}
              </Link>
            ) : null}
          </div>
        </div>
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1.5 bg-brand-spectrum" />
      </div>
    </section>
  );
}
