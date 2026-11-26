import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, CheckCircle2, Cpu, Gauge, Layers, LineChart, Lock, Rocket, ShieldCheck, Sparkles, Users, Workflow } from "lucide-react";
import type { ReactNode } from "react";
import { accentSplit } from "@/components/sections/shared/PageHero";

/**
 * Homepage (v4) building blocks for every inner page: same section rhythm, kicker pills,
 * heading scale with the logo-colour accent, colour-coded cards and gold/blue buttons.
 */

export const TONES = [
  { c: "#0878d1", ink: "#ffffff" },
  { c: "#d99a19", ink: "#071a33" },
  { c: "#064a87", ink: "#ffffff" },
  { c: "#9a5b08", ink: "#ffffff" },
  { c: "#071a33", ink: "#f6d77a" },
  { c: "#f6d77a", ink: "#071a33" },
];
export const tone = (i: number) => TONES[i % TONES.length];

const ICONS = [Sparkles, ShieldCheck, Rocket, Layers, Gauge, Users, Workflow, LineChart, Lock, Cpu];
export const iconFor = (i: number) => ICONS[i % ICONS.length];

export function Section({ id, alt = false, className = "", children }: { id?: string; alt?: boolean; className?: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className={`${alt ? "bg-canvas-2" : "bg-canvas"} py-16 sm:py-20 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">{children}</div>
    </section>
  );
}

export function Kicker({ children, tone: t = "gold" }: { children: ReactNode; tone?: "gold" | "blue" }) {
  const cls =
    t === "gold"
      ? "border-[#d99a19]/35 bg-[#f6d77a]/25 text-[#9a5b08] dark:bg-[#d99a19]/10 dark:text-[#f6d77a]"
      : "border-[#0878d1]/30 bg-[#0878d1]/10 text-[#064a87] dark:text-[#7cc6ff]";
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.18em] ${cls}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

export function Heading({
  id,
  kicker,
  kickerTone,
  title,
  accentWords = 2,
  subtitle,
  center = false,
  action,
}: {
  id?: string;
  kicker?: string;
  kickerTone?: "gold" | "blue";
  title: string;
  accentWords?: number;
  subtitle?: ReactNode;
  center?: boolean;
  action?: ReactNode;
}) {
  const { lead, tail } = accentSplit(title || "", accentWords);
  const block = (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {kicker ? <Kicker tone={kickerTone}>{kicker}</Kicker> : null}
      <h2 id={id} className={`font-display text-[clamp(1.5rem,2.3vw,2.05rem)] font-bold leading-[1.15] tracking-[-0.025em] text-fg ${kicker ? "mt-4" : ""}`}>
        {lead ? `${lead} ` : null}
        <span className="text-brand-spectrum">{tail}</span>
      </h2>
      {subtitle ? <div className="mt-4 text-base leading-relaxed text-fg-muted">{subtitle}</div> : null}
    </div>
  );
  if (!action || center) return block;
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      {block}
      <div className="shrink-0">{action}</div>
    </div>
  );
}

export function GoldButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="btn-brand">
      {children} <ArrowRight aria-hidden className="btn-arrow h-4 w-4" />
    </Link>
  );
}
export function BlueButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="btn-ghost-brand">
      {children}
    </Link>
  );
}

/** Cards with a coloured icon chip and top bar, cycling the six logo colours. */
export function FeatureCards({ items, cols = 3 }: { items: { title: string; description: string; image?: string }[]; cols?: 2 | 3 | 4 }) {
  const grid = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[cols];
  return (
    <ul className={`mt-12 grid gap-4 ${grid}`}>
      {items.map((it, i) => {
        const t = tone(i);
        const Icon = iconFor(i);
        return (
          <li key={`${it.title}-${i}`} className="group relative overflow-hidden rounded-3xl border border-line bg-surface p-6 shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-1">
            <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: t.c }} />
            <span className="grid h-12 w-12 place-items-center rounded-2xl" style={{ background: t.c, color: t.ink }}>
              <Icon aria-hidden className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-display text-lg font-semibold text-fg">{it.title}</h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-fg-muted">{it.description}</p>
          </li>
        );
      })}
    </ul>
  );
}

/** Solid colour tiles (like the homepage services). */
export function ToneTiles({ items, href }: { items: { title: string; description: string }[]; href?: string }) {
  const tones = ["#071a33", "#0878d1", "#d99a19", "#064a87", "#f6d77a", "#9a5b08"];
  const light = (c: string) => c === "#d99a19" || c === "#f6d77a";
  return (
    <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => {
        const bg = tones[i % tones.length];
        const dark = light(bg);
        const inner = (
          <>
            <span aria-hidden className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-white/10" />
            <div className="relative flex items-start justify-between">
              <span className={`font-display text-3xl font-bold ${dark ? "text-[#071a33]/45" : "text-white/55"}`}>{String(i + 1).padStart(2, "0")}</span>
              {href ? (
                <span className={`grid h-9 w-9 place-items-center rounded-full ${dark ? "bg-[#071a33] text-[#f6d77a]" : "bg-white/90 text-[#071a33]"} transition-transform group-hover:rotate-45`}>
                  <ArrowUpRight aria-hidden className="h-4 w-4" />
                </span>
              ) : null}
            </div>
            <h3 className={`relative mt-auto pt-8 font-display text-lg font-bold ${dark ? "text-[#071a33]" : "text-white"}`}>{it.title}</h3>
            <p className={`relative mt-2 text-[14px] leading-relaxed ${dark ? "text-[#071a33]/80" : "text-white/85"}`}>{it.description}</p>
          </>
        );
        const cls = "group relative flex h-full min-h-[230px] flex-col overflow-hidden rounded-[28px] p-6 shadow-[0_24px_50px_-30px_rgba(7,26,51,0.55)] transition-transform duration-300 hover:-translate-y-1";
        return (
          <li key={`${it.title}-${i}`}>
            {href ? (
              <Link href={href} className={cls} style={{ background: bg }}>
                {inner}
              </Link>
            ) : (
              <div className={cls} style={{ background: bg }}>
                {inner}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** Numbered rows with colour badges — for benefit / reason lists. */
export function NumberedList({ items }: { items: { title: string; description: string }[] }) {
  return (
    <ol className="grid gap-4 md:grid-cols-2">
      {items.map((it, i) => {
        const t = tone(i);
        return (
          <li key={`${it.title}-${i}`} className="flex gap-4 rounded-3xl border border-line bg-surface p-5 shadow-[var(--shadow-card)]">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-sm font-bold" style={{ background: t.c, color: t.ink }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-display text-base font-semibold text-fg">{it.title}</h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-fg-muted">{it.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** Engagement / pricing-model style cards; the middle one is highlighted in navy. */
export function ModelCards({ items, ctaHref = "/contact-us", ctaLabel = "Discuss this model" }: { items: { title: string; description: string; bullets: string[] }[]; ctaHref?: string; ctaLabel?: string }) {
  return (
    <ul className="mt-12 grid gap-5 lg:grid-cols-3">
      {items.map((m, i) => {
        const featured = items.length >= 3 && i === 1;
        return (
          <li
            key={`${m.title}-${i}`}
            className={`relative flex flex-col overflow-hidden rounded-[30px] p-7 ${featured ? "bg-[linear-gradient(150deg,#071a33,#064a87_75%,#0878d1_130%)] text-white shadow-[0_40px_80px_-40px_rgba(7,26,51,0.8)] lg:-translate-y-3" : "border border-line bg-surface shadow-[var(--shadow-card)]"}`}
          >
            <span aria-hidden className="absolute inset-x-0 top-0 h-1.5" style={{ background: tone(i).c }} />
            <h3 className={`font-display text-xl font-bold ${featured ? "text-white" : "text-fg"}`}>{m.title}</h3>
            <p className={`mt-3 text-[14.5px] leading-relaxed ${featured ? "text-white/80" : "text-fg-muted"}`}>{m.description}</p>
            <ul className="mt-6 space-y-2.5">
              {m.bullets.map((b) => (
                <li key={b} className={`flex items-start gap-2.5 text-[14px] ${featured ? "text-white/90" : "text-fg"}`}>
                  <CheckCircle2 aria-hidden className="mt-0.5 h-4 w-4 shrink-0" style={{ color: featured ? "#f6d77a" : tone(i).c }} />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-7">
              <Link href={ctaHref} className={featured ? "btn-brand w-full" : "btn-ghost-brand w-full"}>
                {ctaLabel}
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** Image + text cards (challenges, use cases). */
export function MediaCards({ items }: { items: { title: string; description: string; image?: string; linkLabel?: string; href?: string }[] }) {
  return (
    <ul className="mt-12 grid gap-5 md:grid-cols-2">
      {items.map((it, i) => {
        const t = tone(i);
        return (
          <li key={`${it.title}-${i}`} className="group flex flex-col overflow-hidden rounded-[28px] border border-line bg-surface shadow-[var(--shadow-card)] sm:flex-row">
            {it.image ? (
              <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-[#071a33] sm:aspect-auto sm:w-[42%]">
                <Image src={it.image} alt="" fill sizes="(max-width: 640px) 100vw, 300px" unoptimized={it.image.startsWith("data:") || it.image.startsWith("http")} className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-1" style={{ background: t.c }} />
              </div>
            ) : null}
            <div className="flex flex-col p-6">
              <h3 className="font-display text-lg font-semibold text-fg">{it.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-fg-muted">{it.description}</p>
              {it.linkLabel ? (
                <Link href={it.href ?? "/contact-us"} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0878d1] hover:underline">
                  {it.linkLabel} <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** Two-column FAQ using native <details> (no JS). */
export function FaqList({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="mt-10 grid gap-3 lg:grid-cols-2">
      {items.map((it, i) => (
        <details key={`${it.question}-${i}`} className="group rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] open:border-[#d99a19]/50" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-[15.5px] font-semibold text-fg">
            <span className="flex gap-3">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold" style={{ background: tone(i).c, color: tone(i).ink }}>
                {i + 1}
              </span>
              {it.question}
            </span>
            <span aria-hidden className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line text-fg-muted transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 pl-9 text-[14.5px] leading-relaxed text-fg-muted">{it.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((t, i) => (
        <li key={t} className="flex items-start gap-2.5 text-[15px] text-fg">
          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full" style={{ background: tone(i).c, color: tone(i).ink }}>
            <Check aria-hidden className="h-3 w-3" />
          </span>
          {t}
        </li>
      ))}
    </ul>
  );
}
