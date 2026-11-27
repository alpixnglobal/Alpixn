"use client";

import { useState } from "react";
import Link from "next/link";
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import { ArrowRight, ArrowUpRight } from "lucide-react";

/**
 * Shared header mega menu: category rail (left, hover/focus to switch), compact link grid
 * (middle) and a small navy promo card (right). Sizes match the site's body text.
 */
export type MegaLink = { label: string; href: string; description?: string };
export type MegaCategory = { key: string; label: string; description?: string; heading?: string; items: MegaLink[] };
export type MegaPromo = { eyebrow: string; title: string; text: string; href: string; cta: string };

const TONES = ["#0878d1", "#d99a19", "#064a87", "#9a5b08", "#2ea8ff", "#f6d77a"];

export default function MegaMenu({ categories, promo, columns = 2 }: { categories: MegaCategory[]; promo?: MegaPromo; columns?: 1 | 2 | 3 }) {
  const list = categories.filter((c) => c.items.length);
  const [active, setActive] = useState(list[0]?.key);
  if (!list.length) return null;
  const current = list.find((c) => c.key === active) ?? list[0];
  const showRail = list.length > 1;
  const grid = { 1: "grid-cols-1", 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3" }[columns];

  return (
    <div className={`grid w-full gap-3 ${showRail ? (promo ? "lg:grid-cols-[230px_1fr_260px]" : "lg:grid-cols-[230px_1fr]") : promo ? "lg:grid-cols-[1fr_280px]" : ""}`}>
      {showRail ? (
        <ul role="tablist" aria-orientation="vertical" className="flex flex-col gap-1 rounded-2xl bg-surface-2/70 p-1.5">
          {list.map((c, i) => {
            const on = c.key === current.key;
            return (
              <li key={c.key}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onMouseEnter={() => setActive(c.key)}
                  onFocus={() => setActive(c.key)}
                  onClick={() => setActive(c.key)}
                  className={`group/tab flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-all ${on ? "bg-surface shadow-[var(--shadow-card)]" : "hover:bg-surface/60"}`}
                >
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: TONES[i % TONES.length] }} />
                  <span className="min-w-0 flex-1">
                    <span className={`block text-[13.5px] font-semibold leading-tight ${on ? "text-fg" : "text-fg-muted group-hover/tab:text-fg"}`}>{c.label}</span>
                    {c.description ? <span className="mt-0.5 block truncate text-[11.5px] text-fg-subtle">{c.description}</span> : null}
                  </span>
                  <ArrowRight aria-hidden className={`h-3.5 w-3.5 shrink-0 transition-all ${on ? "translate-x-0 text-[#d99a19] opacity-100" : "-translate-x-1 opacity-0"}`} />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}

      <div role={showRail ? "tabpanel" : undefined} className="rounded-2xl p-2">
        <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-fg-subtle">{current.heading || current.label}</p>
        <ul className={`grid gap-1 ${grid}`}>
          {current.items.map((item, i) => (
            <li key={item.href + item.label}>
              <NavigationMenuLink asChild>
                <Link href={item.href} className="group/link flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-surface-2">
                  <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full transition-transform group-hover/link:scale-150" style={{ background: TONES[i % TONES.length] }} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13.5px] font-medium leading-snug !text-fg group-hover/link:!text-[#0878d1] dark:group-hover/link:!text-[#7cc6ff]">{item.label}</span>
                    {item.description ? <span className="mt-0.5 block text-[12px] leading-snug !text-fg-subtle">{item.description}</span> : null}
                  </span>
                  <ArrowUpRight aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 text-fg-subtle opacity-0 transition-all group-hover/link:opacity-100" />
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </div>

      {promo ? (
        <div className="relative hidden overflow-hidden rounded-2xl bg-[linear-gradient(150deg,#071a33,#064a87_75%,#0878d1_130%)] p-5 text-white lg:flex lg:flex-col">
          <div aria-hidden className="absolute inset-0 bg-grid opacity-20" />
          <div aria-hidden className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#f6d77a]/25 blur-[50px]" />
          <p className="relative text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#f6d77a]">{promo.eyebrow}</p>
          <p className="relative mt-2 font-display text-[15px] font-semibold leading-snug">{promo.title}</p>
          <p className="relative mt-2 text-[12.5px] leading-relaxed text-white/70">{promo.text}</p>
          <NavigationMenuLink asChild>
            <Link href={promo.href} className="relative mt-auto inline-flex w-fit items-center gap-1.5 pt-4 text-[13px] font-semibold text-[#f6d77a] hover:underline">
              {promo.cta} <ArrowRight aria-hidden className="h-3.5 w-3.5" />
            </Link>
          </NavigationMenuLink>
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-brand-spectrum" />
        </div>
      ) : null}
    </div>
  );
}
