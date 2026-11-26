import { getWhyChooseUsData } from "@/lib/expertise/why-choose-us-our-expertise-section-data";
import type { ExpertiseFeatureCardRecord } from "@/lib/content-types";
import Image from "next/image";

interface CaseStudySectionProps {
  slug?: string;
  data?: {
    mainTitle: string;
    mainSubtitle: string;
    features: ExpertiseFeatureCardRecord[];
  };
}

const WhyChooseUsOurExpertiseSection = ({ slug = "software-development", data }: CaseStudySectionProps) => {
  const fallbackData = getWhyChooseUsData(slug);
  const resolvedData = data ?? {
    mainTitle: fallbackData.mainTitle,
    mainSubtitle: fallbackData.mainSubtitle,
    features: fallbackData.features.map((feature) => ({ ...feature, iconRightClass: feature.iconRightClass ?? "" })),
  };

  return (
    <section className="sectionDefault">
      {/* Background Color  */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle, #00070E 35%, #002348 100%)",
        }}
      />

      {/* Container */}
      <div className="container max-w-337.5">
        <div className="w-full max-w-296.25 mx-auto flex flex-col gap-[15px]">
          {/* Title & Subtitle */}
          <h2 className="title heading-gradient-white leading-snug text-left sm:text-center">{resolvedData.mainTitle}</h2>
          <p className="subtitleMeXl80 leading-relaxed text-left sm:text-center">{resolvedData.mainSubtitle}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-12.5">
          {resolvedData.features.map((feature) => (
            <div
              key={feature.id}
              className="relative flex flex-col gap-5 p-5 z-10"
              style={{
                borderRadius: "10px",
                background:
                  "linear-gradient(249.67deg, rgba(56, 158, 255, 0.35) 0%, rgba(24, 24, 24, 0) 49.04%, rgba(56, 158, 255, 0.35) 100%)",
                border: "1px solid #FFFFFF26",
              }}
            >
              <h6 className="text-white font-semibold text-lg md:text-xl">{feature.title}</h6>
              <p className="text-xs md:text-sm text-white/80 leading-relaxed font-normal z-10">{feature.description}</p>
              {feature.icon ? (
                <Image
                  src={feature.icon}
                  alt={feature.iconAlt}
                  width={feature.iconWidth}
                  height={feature.iconHeight}
                  className={`absolute ${feature.iconRightClass || "right-5"} top-0 z-0`}
                  unoptimized={feature.icon.startsWith("data:") || feature.icon.startsWith("http")}
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsOurExpertiseSection;
