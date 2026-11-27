import Image from "next/image";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";

/**
 * Technology page hero: the technology's logo and accent colour, then three quick-read cards
 * built from the page's own content — what it is best for, what we build with it, and what it pairs with.
 */
export default function TechDetailHero({
  name,
  category,
  categoryLabel,
  title,
  subtitle,
  description,
  icon,
  accent,
  bestFor,
  weBuild,
  related,
}: {
  name: string;
  category: string;
  categoryLabel: string;
  title: string;
  subtitle?: string;
  description: string;
  icon: string;
  accent: string;
  bestFor: string[];
  weBuild: string[];
  related: { name: string; href: string; icon: string }[];
}) {
  const words = title.trim().split(/\s+/);
  const lead = words.slice(0, -2).join(" ");
  const tail = words.slice(-2).join(" ");

  return (
    <section aria-labelledby="tech-detail-title" className="relative overflow-hidden bg-canvas">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-280px] h-[560px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.16] blur-[120px]" style={{ background: accent }} />
        <div className="absolute inset-0 bg-grid opacity-[0.3] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_20%,#000_30%,transparent_80%)]" />
      </div>

      <div className="relative mx-auto max-w-[1180px] px-4 pb-14 pt-12 sm:px-6 sm:pt-14 lg:px-10 lg:pb-16">
        {/* Identity */}
        <div className="mx-auto max-w-3xl text-center">
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-1.5 text-[12.5px] text-fg-subtle">
            <Link href="/technologies" className="hover:text-fg">
              Technologies
            </Link>
            <ChevronRight aria-hidden className="h-3.5 w-3.5" />
            <span>{categoryLabel}</span>
          </nav>

          <div className="relative mx-auto mt-6 grid h-20 w-20 place-items-center rounded-[24px] border border-line bg-surface shadow-[0_20px_40px_-20px_rgba(7,26,51,0.45)]">
            <span aria-hidden className="absolute -inset-1.5 rounded-[28px] opacity-40" style={{ boxShadow: `0 0 0 1.5px ${accent}` }} />
            <Image src={icon} alt={`${name} logo`} width={44} height={44} priority className="h-11 w-11 object-contain" />
          </div>

          <h1 id="tech-detail-title" className="mt-6 font-display text-[clamp(1.55rem,2.5vw,2.2rem)] font-bold leading-[1.08] tracking-[-0.03em] text-fg">
            {lead ? `${lead} ` : null}
            <span className="text-brand-spectrum">{tail}</span>
          </h1>
          {subtitle ? (
            <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[13px] font-semibold text-fg">
              <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
              {subtitle}
            </p>
          ) : null}
          <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-relaxed text-fg-muted">{description}</p>
        </div>

        {/* Quick-read cards */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-5 shadow-[var(--shadow-card)]">
            <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: accent }} />
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-fg-subtle">Best for</p>
            <ul className="mt-3 space-y-2.5">
              {bestFor.slice(0, 3).map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[14px] font-medium text-fg">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-white" style={{ background: accent }}>
                    <Check aria-hidden className="h-3 w-3" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(150deg,#071a33,#064a87_80%,#0878d1_130%)] p-5 text-white shadow-[0_30px_60px_-30px_rgba(7,26,51,0.7)]">
            <div aria-hidden className="absolute inset-0 bg-grid opacity-20" />
            <p className="relative text-[11px] font-semibold uppercase tracking-[0.16em] text-[#f6d77a]">What we build with {name}</p>
            <ul className="relative mt-3 space-y-2">
              {weBuild.slice(0, 4).map((t, i) => (
                <li key={t} className="flex items-center gap-2.5 text-[14px]">
                  <span className="font-mono text-[11px] text-[#f6d77a]">{String(i + 1).padStart(2, "0")}</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-5 shadow-[var(--shadow-card)]">
            <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-brand-spectrum" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-fg-subtle">Related {category}</p>
            {related.length ? (
              <ul className="mt-3 flex flex-wrap gap-2">
                {related.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} className="flex items-center gap-2 rounded-full border border-line bg-canvas px-3 py-1.5 text-[13px] font-medium text-fg transition-colors hover:border-[#d99a19]/60">
                      <Image src={r.icon} alt="" width={16} height={16} className="h-4 w-4 object-contain" />
                      {r.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-[14px] text-fg-muted">We combine {name} with the right front end, database and cloud for your product.</p>
            )}
            <Link href="/technologies" className="mt-4 inline-block text-[13px] font-semibold text-[#0878d1] hover:underline">
              See all technologies →
            </Link>
          </div>
        </div>
      </div>
      <div aria-hidden className="h-1 bg-brand-spectrum" />
    </section>
  );
}
