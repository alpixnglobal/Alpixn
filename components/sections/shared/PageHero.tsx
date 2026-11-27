import type { ReactNode } from "react";

/**
 * Shared inner-page hero, matching the homepage system:
 * ivory canvas with blue/gold atmosphere, Sora headline (same size as the home hero),
 * last words in the logo-colour gradient, gold primary + blue secondary buttons,
 * and the six-colour brand line along the bottom.
 */
export type HeroAction = { label: string; href: string };

export function accentSplit(title: string, words = 2) {
  const parts = title.trim().split(/\s+/);
  if (parts.length <= words) return { lead: "", tail: title.trim() };
  return { lead: parts.slice(0, -words).join(" "), tail: parts.slice(-words).join(" ") };
}

export default function PageHero({
  eyebrow,
  title,
  accentWords = 2,
  description,
  aside,
  children,
  center,
  id = "page-hero-title",
}: {
  eyebrow?: string;
  title: string;
  accentWords?: number;
  description?: ReactNode;
  primary?: HeroAction | null;
  secondary?: HeroAction | null;
  aside?: ReactNode;
  children?: ReactNode;
  center?: boolean;
  id?: string;
}) {
  const { lead, tail } = accentSplit(title, accentWords);
  const centered = center ?? !aside;

  return (
    <section aria-labelledby={id} className="relative overflow-hidden bg-canvas">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_30%,#000_30%,transparent_80%)]" />
        <div className="absolute -left-40 -top-24 h-[420px] w-[420px] rounded-full bg-[#0878d1]/14 blur-[130px]" />
        <div className="absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-[#f6d77a]/40 blur-[130px] dark:bg-[#d99a19]/14" />
      </div>

      <div
        className={`relative mx-auto max-w-[1320px] px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20 ${
          aside ? "grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14" : ""
        }`}
      >
        <div className={aside ? "lg:col-span-6" : centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
          {eyebrow ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-[#0878d1]/30 bg-[#0878d1]/10 px-3.5 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-[#064a87] dark:text-[#7cc6ff]">
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {eyebrow}
            </span>
          ) : null}
          <h1 id={id} className={`font-display text-[clamp(1.55rem,2.5vw,2.2rem)] font-bold leading-[1.08] tracking-[-0.03em] text-fg ${eyebrow ? "mt-5" : ""}`}>
            {lead ? `${lead} ` : null}
            <span className="text-brand-spectrum">{tail}</span>
          </h1>
          {description ? (
            <div className={`mt-4 text-[17px] leading-relaxed text-fg-muted ${centered && !aside ? "mx-auto max-w-2xl" : "max-w-xl"}`}>{description}</div>
          ) : null}
          {/* Hero CTAs intentionally removed site-wide (client request); CTAs live in page sections. */}
          {children}
        </div>
        {aside ? <div className="lg:col-span-6">{aside}</div> : null}
      </div>
      <div aria-hidden className="h-1 bg-brand-spectrum" />
    </section>
  );
}
