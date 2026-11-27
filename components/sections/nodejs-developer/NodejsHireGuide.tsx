"use client";

import { useState } from "react";
import { Heading, Section, tone } from "@/components/ui/v4";
import clsx from "clsx";
import { getHireGuideData } from "@/lib/offshore developer/hire-guide-data";
import type { OffshoreGuideTabRecord } from "@/lib/content-types";

interface HireGuideProps {
  slug?: string;
  data?: {
    mainTitle: string;
    tabs: OffshoreGuideTabRecord[];
  };
}

const HireGuide = ({ slug = "default", data }: HireGuideProps) => {
  const fallbackData = getHireGuideData(slug);
  const resolvedData = data ?? {
    mainTitle: fallbackData.mainTitle,
    tabs: fallbackData.tabs.map((tab) => ({
      key: tab.key,
      label: tab.label,
      section: tab.section,
      items: tab.items.map((item) => ({ title: item.title, description: item.desc })),
    })),
  };
  const { mainTitle, tabs } = resolvedData;

  const [active, setActive] = useState<string>(tabs[0]?.key ?? "");

  const activeContent = tabs.find((tab) => tab.key === active);

  if (!tabs.length) return null;

  return (
    <Section id="hire-guide" alt>
      <Heading id="hire-guide" kicker="Hiring guide" title={mainTitle} center />
      <div className="mt-12 grid gap-5 lg:grid-cols-12">
        <div role="tablist" aria-orientation="vertical" className="flex gap-2 overflow-x-auto pb-1 lg:col-span-4 lg:flex-col lg:overflow-visible">
          {tabs.map((tab, index) => {
            const isActive = active === tab.key;
            return (
              <button
                key={tab.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(tab.key)}
                className={`flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-[14.5px] font-semibold transition-all ${isActive ? "border-transparent text-white shadow-[0_20px_40px_-24px_rgba(7,26,51,0.7)]" : "border-line bg-surface text-fg hover:border-[#d99a19]/50"}`}
                style={isActive ? { background: "linear-gradient(135deg,#071a33,#064a87)" } : undefined}
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-bold" style={{ background: tone(index).c, color: tone(index).ink }}>
                  {index + 1}
                </span>
                {tab.label}
              </button>
            );
          })}
        </div>
        <div className="rounded-[28px] border border-line bg-surface p-6 shadow-[var(--shadow-card)] sm:p-8 lg:col-span-8">
          {activeContent ? (
            <>
              {activeContent.section ? <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0878d1]">{activeContent.section}</p> : null}
              {activeContent.items.length && activeContent.items.every((item) => !item.description) ? (
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {activeContent.items.map((item, idx) => (
                    <li key={`${item.title}-${idx}`} className="flex items-center gap-2 rounded-full border border-line bg-canvas px-3.5 py-2 text-[14px] font-semibold text-fg">
                      <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: tone(idx).c }} />
                      {item.title}
                    </li>
                  ))}
                </ul>
              ) : (
              <div className="mt-5 space-y-5">
                {activeContent.items.map((item, idx) => (
                  <div key={`${item.title}-${idx}`} className="border-l-2 pl-4" style={{ borderColor: tone(idx).c }}>
                    <h3 className="font-display text-base font-semibold text-fg">{item.title}</h3>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-fg-muted">{item.description}</p>
                  </div>
                ))}
              </div>
              )}
            </>
          ) : null}
        </div>
      </div>
    </Section>
  );
};

export default HireGuide;
