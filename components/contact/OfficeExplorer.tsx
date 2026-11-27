"use client";

import { useState } from "react";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import LocalTime from "@/components/ui/LocalTime";
import { zoneFor } from "@/lib/time-zones";

export type Office = { name: string; address: string; email: string };

/** Office explorer: a city list with live local times; the selected office opens in a detail card. */
export default function OfficeExplorer({ offices, title = "Our Global Offices" }: { offices: Office[]; title?: string }) {
  const [active, setActive] = useState(0);
  if (!offices.length) return null;
  const office = offices[Math.min(active, offices.length - 1)];
  const { zone, abbr } = zoneFor(office.name);
  const mapQuery = encodeURIComponent(`${office.address}, ${office.name}`);

  return (
    <section aria-labelledby="offices-title" className="bg-canvas-2 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#d99a19]/35 bg-[#f6d77a]/25 px-3.5 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-[#9a5b08] dark:bg-[#d99a19]/10 dark:text-[#f6d77a]">
              <span className="h-1.5 w-1.5 rounded-full bg-current" /> {offices.length} offices
            </span>
            <h2 id="offices-title" className="mt-4 font-display text-[clamp(1.5rem,2.3vw,2.05rem)] font-bold leading-[1.15] tracking-[-0.025em] text-fg">
              {title.replace(/\s+\S+$/, "")} <span className="text-brand-spectrum">{title.split(/\s+/).pop()}</span>
            </h2>
          </div>
          <p className="max-w-md text-[15px] text-fg-muted">Pick a city to see the address, sales contact and what time it is there right now.</p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-12">
          <ul role="tablist" aria-label="Offices" className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1">
            {offices.map((o, i) => {
              const selected = i === active;
              return (
                <li key={o.name}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActive(i)}
                    className={`group flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition-all ${
                      selected ? "border-transparent bg-[linear-gradient(135deg,#071a33,#064a87)] text-white shadow-[0_20px_40px_-24px_rgba(7,26,51,0.7)]" : "border-line bg-surface text-fg hover:border-[#d99a19]/50"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`font-mono text-[11px] ${selected ? "text-[#f6d77a]" : "text-fg-subtle"}`}>{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-[14.5px] font-semibold">{o.name}</span>
                    </span>
                    <LocalTime zone={zoneFor(o.name).zone} className={`hidden font-mono text-[12px] sm:inline ${selected ? "text-white/80" : "text-fg-subtle"}`} />
                  </button>
                </li>
              );
            })}
          </ul>

          <article className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(150deg,#071a33_0%,#064a87_70%,#0878d1_130%)] p-7 text-white shadow-[0_40px_80px_-40px_rgba(7,26,51,0.8)] sm:p-10 lg:col-span-7">
            <div aria-hidden className="absolute inset-0 bg-grid opacity-20" />
            <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#f6d77a]/25 blur-[90px]" />
            <div className="relative">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#f6d77a]">Office {String(active + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{office.name}</h3>
                </div>
                <div className="text-right">
                  <LocalTime zone={zone} className="block font-display text-4xl font-bold sm:text-5xl" />
                  <span className="text-[12px] text-white/60">Local time · {abbr}</span>
                </div>
              </div>
              <div className="mt-6">
                <span className="inline-flex rounded-full bg-white px-3 py-1 [&_span]:!text-[#071a33]"><LocalTime zone={zone} statusOnly /></span>
              </div>

              <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <dt className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/60">
                    <MapPin aria-hidden className="h-4 w-4 text-[#f6d77a]" /> Address
                  </dt>
                  <dd className="mt-2 text-[15px] leading-relaxed">{office.address}</dd>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <dt className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/60">
                    <Mail aria-hidden className="h-4 w-4 text-[#f6d77a]" /> Sales
                  </dt>
                  <dd className="mt-2 break-all text-[15px]">
                    <a href={`mailto:${office.email}`} className="hover:underline">
                      {office.email}
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={`mailto:${office.email}`} className="btn-brand !px-6 !py-3">
                  Email {office.name.split(",")[0]} <ArrowUpRight aria-hidden className="h-4 w-4" />
                </a>
                <a href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noopener noreferrer" className="btn-ghost-brand !px-6 !py-3">
                  Open in Maps
                </a>
              </div>
            </div>
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-1.5 bg-brand-spectrum" />
          </article>
        </div>
      </div>
    </section>
  );
}
