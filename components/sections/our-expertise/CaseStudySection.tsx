"use client";

import { Button } from "@/components/ui/buttonBtn";
import { getCaseStudyData } from "@/lib/expertise/case-study-section-data";
import type { ExpertiseCaseStudyTabRecord } from "@/lib/content-types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface CaseStudySectionProps {
  slug?: string;
  data?: {
    mainTitle: string;
    mainSubtitle: string;
    caseStudies: ExpertiseCaseStudyTabRecord[];
  };
}

const CaseStudySection = ({ slug = "software-development", data }: CaseStudySectionProps) => {
  const fallbackData = getCaseStudyData(slug);
  const caseStudyData = data ?? {
    mainTitle: fallbackData.mainTitle,
    mainSubtitle: fallbackData.mainSubtitle,
    caseStudies: fallbackData.caseStudies.map((tab) => ({
      id: tab.id,
      title: tab.title,
      heading: tab.heading,
      description: tab.description,
      features: tab.features,
      cta1: tab.cta1,
      cta2: tab.cta2,
      imageData: tab.image,
      cta1Link: String(tab.cta1Link),
      cta2Link: String(tab.cta2Link),
    })),
  };
  const [activeTab, setActiveTab] = useState<string>(caseStudyData.caseStudies[0]?.id || "");

  const activeCaseStudy = caseStudyData.caseStudies.find((tab) => tab.id === activeTab) || caseStudyData.caseStudies[0];

  if (!caseStudyData.caseStudies.length) {
    return null;
  }

  return (
    <section className="sectionDefault">
      {/* Background Color  */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(circle, var(--canvas) 35%, var(--glow) 100%)" }}
      />

      {/* Container */}
      <div className="container max-w-337.5">
        {/* Title & Subtitle */}
        <div className="w-full max-w-253.25 mx-auto flex flex-col gap-3.75">
          <h2 className="title heading-gradient text-left sm:text-center">{caseStudyData.mainTitle}</h2>
          <p className="subtitleMeXl80 leading-relaxed text-left sm:text-center">{caseStudyData.mainSubtitle}</p>
        </div>

        {/* Card */}
        <div className="relative h-auto xl:h-155.75 mt-12.5 rounded-20">
          {/* BORDER */}
          <div
            className="absolute inset-0 rounded-[20px] pointer-events-none"
            style={{
              background:
                "radial-gradient(100% 100% at 49.96% 0%, rgb(var(--hi-rgb) / calc(0.375 * var(--hi-scale))) 0%, rgb(var(--hi-rgb) / calc(0.075 * var(--hi-scale))) 72.87%)",
              padding: "1px",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />

          {/* Card Content */}
          <div
            className="relative z-10 w-full h-full rounded-[20px]"
            style={{
              background: "linear-gradient(180deg, rgba(24, 24, 24, 0.24) 0%, color-mix(in srgb, var(--tech) 6%, transparent) 100%)",
            }}
          >
            {/* Tabs Grid */}
            <div
              className="
                w-full max-w-275.75 mx-auto
                grid grid-cols-1 sm:flex sm:flex-wrap xl:flex-nowrap
                gap-4 xl:gap-6.25
                justify-center xl:justify-between
                overflow-x-auto xl:overflow-visible
                py-6.25 px-4 xl:px-0
              "
            >
              {caseStudyData.caseStudies.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative rounded-[10px] h-full cursor-pointer shrink-0"
                >
                  {/* Border - Only shown for active tab */}
                  {activeTab === tab.id && (
                    <div
                      className="absolute inset-0 rounded-[10px] pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(100% 100% at 49.96% 0%, rgb(var(--hi-rgb) / calc(0.75 * var(--hi-scale))) 0%, rgb(var(--hi-rgb) / calc(0.15 * var(--hi-scale))) 72.87%)",
                        padding: "1px",
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }}
                    />
                  )}
                  <div
                    className={`
                      relative z-10
                      font-medium text-sm md:text-base tracking-[3%]
                      py-3 px-6 sm:px-10 lg:px-14 xl:py-3.75 xl:px-17.5
                      rounded-[10px]
                      transition-all duration-200
                      ${activeTab === tab.id ? "text-fg" : "text-fg/80"}
                    `}
                    style={
                      activeTab === tab.id
                        ? {
                            background:
                              "linear-gradient(249.67deg, color-mix(in srgb, var(--tech) 35%, transparent) 0%, rgba(24, 24, 24, 0) 49.04%, color-mix(in srgb, var(--tech) 35%, transparent) 100%)",
                          }
                        : {
                            background:
                              "linear-gradient(180deg, rgba(24, 24, 24, 0.24) 0%, color-mix(in srgb, var(--tech) 6%, transparent) 100%)",
                            border: "1px solid #FFFFFF1A",
                          }
                    }
                  >
                    {tab.title}
                  </div>
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="w-full max-w-307.5 mx-auto mt-17.5 px-4 xl:px-0 pb-6.25 xl:pb-0">
              <div className="grid grid-cols-1 xl:grid-cols-[743px_48px_1fr] gap-10 xl:gap-0">
                {/* Left */}
                <div className="w-full">
                  <div className="flex flex-col gap-5 w-full max-w-[743px]">
                    <h2 className="text-xl sm:text-2xl text-fg">
                      <span className="font-semibold">{activeCaseStudy.heading}</span>
                    </h2>
                    <p className="font-normal text-xs sm:text-base text-fg leading-relaxed">
                      {activeCaseStudy.description}
                    </p>
                  </div>

                  {/* Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 mt-7.5 gap-3.75 xl:max-w-135.25">
                    {activeCaseStudy.features.map((feature) => (
                      <div key={feature} className="flex gap-2.5 items-center">
                        <Image
                          src="/icons/bullet.svg"
                          alt="check"
                          width={18}
                          height={18}
                          className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5"
                        />
                        <div className="font-medium text-xs sm:text-base leading-relaxed text-fg">{feature}</div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6.25 mt-7.5">
                    <Link href={activeCaseStudy.cta1Link}>
                      <Button
                        className="px-6.25 py-2.5 w-full sm:w-fit rounded-10 flex items-center justify-center font-medium text-xs sm:text-base cursor-pointer"
                        style={{ boxShadow: "0px 4px 6px 0px #0000001A inset" }}
                      >
                        {activeCaseStudy.cta1}
                      </Button>
                    </Link>

                    <Link href={activeCaseStudy.cta2Link}>
                      <button
                        className="
                      relative w-full sm:w-fit
                      text-fg font-medium
                      text-xs sm:text-base
                      rounded-10
                      py-2.5 px-6.25
                      cursor-pointer
                      hover:opacity-90 transition-opacity
                      "
                        style={{
                          background: "linear-gradient(360deg, var(--glow) 0%, var(--canvas-2) 100%)",
                          border: "1px solid rgb(var(--hi-rgb) / calc(0.1 * var(--hi-scale)))",
                        }}
                      >
                        {activeCaseStudy.cta2}
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Empty Middle Space */}
                <div></div>

                {/* Right Image */}
                <div className="relative w-full h-[260px] sm:h-[320px] xl:h-[421px] hidden xl:block object-right">
                  {activeCaseStudy.imageData ? (
                    <Image
                      src={activeCaseStudy.imageData}
                      alt={activeCaseStudy.title}
                      fill
                      priority
                      className="object-contain"
                      unoptimized={activeCaseStudy.imageData.startsWith("data:") || activeCaseStudy.imageData.startsWith("http")}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudySection;
