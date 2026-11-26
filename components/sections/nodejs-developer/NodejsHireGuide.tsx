"use client";

import { useState } from "react";
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
    <section className="sectionDefault">
      {/* Background Color */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle, #00070E 75%, #002348 100%)" }} />

      {/* Container */}
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-[45px]">
        <h2 className="title heading-gradient text-left sm:text-center">{mainTitle}</h2>

        <div className="mt-[50px] flex flex-col xl:flex-row gap-5 items-stretch">
          {/* LEFT – Tab List */}
          <div
            className="
              w-full
              xl:w-[422px]
              h-auto
              xl:h-[594px]
              rounded-t-[10px]
            "
            style={{ background: "#389EFF0D", backdropFilter: "blur(15px)" }}
          >
            {tabs.map((tab, index) => {
              const isActive = active === tab.key;
              const isFirstTab = index === 0;

              return (
                <div
                  key={tab.key}
                  onClick={() => setActive(tab.key)}
                  className={clsx(
                    "h-[80px] sm:h-[90px] xl:h-[99px] flex items-center cursor-pointer",
                    isFirstTab && "rounded-t-[10px]",
                  )}
                  style={
                    isActive
                      ? {
                          background: "linear-gradient(180deg, #389EFF 0%, #003098 100%)",
                          borderBottom: "3px solid",
                          borderImageSource: "radial-gradient(50% 1289.19% at 50% 100%, #FFFFFF 0%, #389EFF 100%)",
                        }
                      : {
                          background: "#389EFF0D",
                          border: "1px solid #FFFFFF26",
                          backdropFilter: "blur(15px)",
                        }
                  }
                >
                  <span className="ml-4 sm:ml-5 text-white text-sm md:text-base font-medium font-roboto">
                    {tab.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* RIGHT – Tab Content */}
          <div
            className="
              w-full
              xl:w-[908px]
              h-[420px]
              sm:h-[500px]
              xl:h-[594px]
              rounded-t-[10px]
            "
            style={{
              background:
                "linear-gradient(249.67deg, rgba(56,158,255,0.35) 0%, rgba(24,24,24,0) 49%, rgba(56,158,255,0.35) 100%)",
              border: "2px solid #FFFFFF26",
              backdropFilter: "blur(4px)",
            }}
          >
            <div
              className="p-4 sm:p-5 h-full overflow-y-scroll custom-scrollbar"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#389EFF #ffffff1a",
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
                  background: #389eff;
                  border-radius: 4px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                  background: #1e88e5;
                }
              `}</style>

              {activeContent && (
                <>
                  <h6 className="text-white text-xs">{activeContent.section}</h6>

                  {activeContent.items.map((item, idx) => (
                    <div key={idx} className="mt-4 sm:mt-5">
                      <h5 className="text-white text-sm md:text-base font-semibold">{item.title}</h5>
                      <p className="text-white text-xs md:text-base leading-relaxed mt-2.5">{item.description}</p>
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

export default HireGuide;
