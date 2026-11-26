"use client";

import { useState } from "react";
import clsx from "clsx";
import { Heading, Section, tone } from "@/components/ui/v4";
import { getGuideToSoftwareDevData } from "@/lib/expertise/guide-to-software-dev-data";
import type { ExpertiseGuideTabRecord } from "@/lib/content-types";

interface GuideToSoftwareDevSectionProps {
  slug?: string;
  data?: {
    mainTitle: string;
    mainSubtitle: string;
    tabs: ExpertiseGuideTabRecord[];
  };
}

const GuideToSoftwareDevSection = ({ slug = "software-development", data }: GuideToSoftwareDevSectionProps) => {
  const fallbackData = getGuideToSoftwareDevData(slug);
  const resolvedData = data ?? {
    mainTitle: fallbackData.mainTitle,
    mainSubtitle: fallbackData.mainSubtitle,
    tabs: fallbackData.tabs.map((tab) => ({
      key: tab.key,
      label: tab.label,
      section: tab.section,
      items: tab.items.map((item) => ({ title: item.title, bullets: item.desc })),
    })),
  };
  const { mainTitle, mainSubtitle, tabs } = resolvedData;

  const [active, setActive] = useState<string>(tabs[0]?.key ?? "");

  const activeContent = tabs.find((tab) => tab.key === active);

  if (!tabs.length) return null;

  return (
    <Section id="guide-title">
      <Heading id="guide-title" kicker="Guide" title={mainTitle} subtitle={mainSubtitle} center />
      <div className="mt-12 grid gap-5 lg:grid-cols-12">
        <div role="tablist" aria-orientation="vertical" className="flex gap-2 overflow-x-auto pb-1 lg:col-span-4 lg:flex-col lg:overflow-visible">
          {tabs.map((tab, index) => {
            const isActive = active === tab.key;
            const t = tone(index);
            return (
              <button
                key={tab.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(tab.key)}
                className={clsx(
                  "flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-[14.5px] font-semibold transition-all",
                  isActive ? "border-transparent text-white shadow-[0_20px_40px_-24px_rgba(7,26,51,0.7)]" : "border-line bg-surface text-fg hover:border-[#d99a19]/50"
                )}
                style={isActive ? { background: "linear-gradient(135deg,#071a33,#064a87)" } : undefined}
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-bold" style={{ background: t.c, color: t.ink }}>
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
              {activeContent.section ? <p className="text-[15px] leading-relaxed text-fg-muted">{activeContent.section}</p> : null}
              <div className="mt-6 space-y-6">
                {activeContent.items.map((item, idx) => (
                  <div key={`${item.title}-${idx}`}>
                    <h3 className="font-display text-base font-semibold text-fg">{item.title}</h3>
                    <ul className="mt-3 space-y-2">
                      {item.bullets.map((bullet, i) => (
                        <li key={i} className="flex gap-2.5 text-[14.5px] leading-relaxed text-fg-muted">
                          <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: tone(i).c }} />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </Section>
  );
};

export default GuideToSoftwareDevSection;
