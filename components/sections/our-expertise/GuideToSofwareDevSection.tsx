"use client";

import { useState } from "react";
import clsx from "clsx";
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
    <section className="sectionDefault">
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle, var(--canvas) 75%, var(--glow) 100%)" }} />

      <div className="relative mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-[45px]">
        <div className="flex flex-col gap-[15px] max-w-[998px] mx-auto">
          <h2 className="title heading-gradient max-w-[828px] mx-auto text-left sm:text-center text-[clamp(1.5rem,2.3vw,2.05rem)]">{mainTitle}</h2>
          <p className="subtitleMeXl80 leading-relaxed max-w-[998px] mx-auto text-left sm:text-center">{mainSubtitle}</p>
        </div>

        <div className="mt-12.5 flex flex-col xl:flex-row gap-5 items-stretch">
          <div
            className="
                  w-full
                  xl:w-[422px]
                  h-auto
                  xl:h-[510px]
                  rounded-t-10
                "
            style={{ background: "color-mix(in srgb, var(--tech) 5%, transparent)", backdropFilter: "blur(15px)" }}
          >
            {tabs.map((tab, index) => {
              const isActive = active === tab.key;
              const isFirstTab = index === 0;

              return (
                <div
                  key={tab.key}
                  onClick={() => setActive(tab.key)}
                  className={clsx(
                    "h-[80px] sm:h-[90px] xl:h-[102px] flex items-center cursor-pointer",
                    isFirstTab && "rounded-t-10",
                  )}
                  style={
                    isActive
                      ? {
                          background: "linear-gradient(180deg, var(--tech) 0%, #064A87 100%)",
                          borderBottom: "3px solid",
                          borderImageSource: "radial-gradient(50% 1289.19% at 50% 100%, var(--heading-from) 0%, var(--tech) 100%)",
                        }
                      : {
                          background: "color-mix(in srgb, var(--tech) 5%, transparent)",
                          border: "1px solid #FFFFFF26",
                          backdropFilter: "blur(15px)",
                        }
                  }
                >
                  <span className="ml-2.5 sm:ml-5 text-fg text-base sm:text-lg font-roboto">{tab.label}</span>
                </div>
              );
            })}
          </div>

          <div
            className="
                  w-full
                  xl:w-[908px]
                  h-[420px]
                  sm:h-[500px]
                  xl:h-[510px]
                  rounded-t-[10px]
                "
            style={{
              background:
                "linear-gradient(249.67deg, color-mix(in srgb, var(--tech) 35%, transparent) 0%, rgba(24,24,24,0) 49%, color-mix(in srgb, var(--tech) 35%, transparent) 100%)",
              border: "2px solid #FFFFFF26",
              backdropFilter: "blur(4px)",
            }}
          >
            <div
              className="p-4 sm:p-5 h-full overflow-y-scroll custom-scrollbar"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "var(--tech) #ffffff1a",
              }}
            >
              <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                  width: 8px;
                }

                .custom-scrollbar::-webkit-scrollbar-track {
                  background: #ffffff1a;
                  border-radius: 4px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background: var(--tech);
                  border-radius: 4px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                  background: #1e88e5;
                }
              `}</style>

              {activeContent && (
                <>
                  <h6 className="text-fg text-sm font-medium leading-relaxed">{activeContent.section}</h6>

                  {activeContent.items.map((item, idx) => (
                    <div key={idx} className="mt-4 sm:mt-5">
                      <h5 className="text-fg text-base font-semibold leading-relaxed">{item.title}</h5>

                      <ul className="list-disc pl-5 mt-2.5 space-y-2">
                        {item.bullets.map((bullet, i) => (
                          <li key={i} className="text-fg text-sm leading-relaxed">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuideToSoftwareDevSection;
