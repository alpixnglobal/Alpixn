import { getIndustriesWeServeData } from "@/lib/expertise/Industries-we-serve-expertise-section-data";
import type { ExpertiseIndustryItemRecord } from "@/lib/content-types";
import Image from "next/image";

interface IndustriesWeServeExpertiseSectionProps {
  slug?: string;
  data?: {
    mainTitle: string;
    mainSubtitle: string;
    industries: ExpertiseIndustryItemRecord[];
  };
}

const IndustriesWeServeExpertiseSection = ({ slug = "software-development", data }: IndustriesWeServeExpertiseSectionProps) => {
  const fallbackData = getIndustriesWeServeData(slug);
  const resolvedData = data ?? {
    mainTitle: fallbackData.mainTitle,
    mainSubtitle: fallbackData.mainSubtitle,
    industries: fallbackData.industries.map((industry) => ({ ...industry, link: industry.link ?? "#" })),
  };
  const { mainTitle, mainSubtitle, industries } = resolvedData;

  // Calculate grid columns - default to 4 for consistency
  const gridCols = "lg:grid-cols-4";

  return (
    <section className="sectionDefault overflow-x-hidden">
      {/* Background Color */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle, rgba(0, 7, 14, 1) 15%, rgba(0, 35, 72, 1) 100%)",
        }}
      />

      {/* Container */}
      <div className="container max-w-281.25">
        {/* Title & Subtitle - Dynamic */}
        <div className="w-full max-w-296.25 mx-auto gap-3.75">
          <h2 className="title heading-gradient-white text-left sm:text-center">{mainTitle}</h2>
          <p className="subtitleMeXl80 leading-relaxed text-left sm:text-center mt-3.5">{mainSubtitle}</p>
        </div>

        {/* Grid - Dynamic with simplified border logic */}
        <div className={`grid grid-cols-2 ${gridCols} w-full max-w-243 mx-auto mt-12.5`}>
          {industries.map((industry: ExpertiseIndustryItemRecord, index: number) => {
            // Simplified border logic that works for any number of items
            const isLastInRow = (index + 1) % 4 === 0;
            const isFirstInRow = index % 4 === 0;
            const isFirstRow = index < 4;
            const isSecondRow = index >= 4 && index < 8;
            const isThirdRow = index >= 8;
            const totalItems = industries.length;

            let borderClasses = "";

            // Apply borders based on position
            if (isFirstRow) {
              if (!isLastInRow) {
                borderClasses += " border-r border-white/10 ";
              }
              if (index === 3) {
                borderClasses += " border-r-0 ";
              }
            } else if (isSecondRow) {
              borderClasses += " border-t border-white/10 ";
              if (!isLastInRow) {
                borderClasses += " border-r ";
              }
              if (index === 7) {
                borderClasses += " border-r-0 ";
              }
            } else if (isThirdRow) {
              borderClasses += " border-t border-white/10 ";
              if (!isLastInRow && index !== totalItems - 1) {
                borderClasses += " border-r ";
              }
              if (index === totalItems - 1) {
                borderClasses += " border-r-0 ";
              }
            }

            return (
              <div
                key={industry.id}
                className={`p-3.75 gap-1.25 flex flex-col items-center justify-center h-[112px] ${borderClasses}`}
                style={{
                  background: "linear-gradient(180deg, rgba(24, 24, 24, 0.24) 0%, rgba(56, 158, 255, 0.06) 100%)",
                }}
              >
                {industry.icon ? (
                  <Image
                    src={industry.icon}
                    alt={industry.iconAlt}
                    width={40}
                    height={40}
                    className="w-8 h-8 lg:w-10 lg:h-10"
                    unoptimized={industry.icon.startsWith("data:") || industry.icon.startsWith("http")}
                  />
                ) : null}
                <p className="text-sm lg:text-base font-normal text-white/80 text-center">{industry.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustriesWeServeExpertiseSection;
