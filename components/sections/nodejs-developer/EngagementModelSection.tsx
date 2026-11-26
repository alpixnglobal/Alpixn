import { getEngagementModelsData } from "@/lib/offshore developer/engagement-models-data";
import type { OffshoreEngagementModelRecord } from "@/lib/content-types";

interface EngagementModelSectionProps {
  slug?: string;
  data?: {
    mainTitle: string;
    mainSubtitle: string;
    models: OffshoreEngagementModelRecord[];
  };
}

const EngagementModelSection = ({ slug = "default", data }: EngagementModelSectionProps) => {
  const fallbackData = getEngagementModelsData(slug);
  const { mainTitle, mainSubtitle, models } = data ?? fallbackData;

  return (
    <section className="sectionDefault">
      {/* Background Color */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle, var(--canvas) 35%, var(--glow) 100%)" }} />

      {/* Container */}
      <div className="container max-w-[1350px]">
        {/* Title and Subtitle - Dynamic */}
        <div className="flex flex-col gap-[15px] max-w-[998px] md:mx-auto">
          <h2 className="title heading-gradient w-full max-w-[828px] mx-auto text-left md:text-center">{mainTitle}</h2>
          <p className="subtitleMeXl80 leading-relaxed text-left md:text-center">{mainSubtitle}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8 sm:mt-10 md:mt-12.5">
          {models.map((model, index) => {
            const isLastModel = index === models.length - 1;

            return (
              <div
                key={index}
                className={`relative rounded-[14px] overflow-hidden ${isLastModel ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
                {/* Gradient Border */}
                <div
                  className="absolute inset-0 rounded-[14px] pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(100% 100% at 49.96% 0%, rgb(var(--hi-rgb) / calc(0.75 * var(--hi-scale))) 0%, rgb(var(--hi-rgb) / calc(0.15 * var(--hi-scale))) 72.87%)",
                    padding: "2px",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />

                {/* TOP Glow Ellipse */}
                <div
                  className="absolute left-1/2 -top-10 sm:-top-12 md:-top-16 lg:-top-20 z-0 pointer-events-none
                    w-[calc(100%-32px)] max-w-[288px] h-[90px] sm:h-[120px] md:h-[140px] lg:h-[161px]
                    bg-gradient-to-b from-tech to-[#1427AA] opacity-75 blur-[24px] sm:blur-[32px] md:blur-[40px] lg:blur-[48.05px]"
                  style={{
                    transform: "translateX(-50%)",
                  }}
                />

                {/* Card Content */}
                <div
                  className="relative z-10 w-full h-full rounded-[14px] p-4 sm:p-5 flex flex-col gap-4 sm:gap-5"
                  style={{
                    background: "linear-gradient(180deg, rgba(24, 24, 24, 0.24) 0%, color-mix(in srgb, var(--tech) 6%, transparent) 100%)",
                  }}
                >
                  <h4 className="font-semibold text-fg text-lg sm:text-xl">{model.title}</h4>

                  <p className="text-xs sm:text-base leading-relaxed text-fg/80">{model.description}</p>

                  <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
                    {model.features.map((feature, i) => (
                      <div key={i} className="flex gap-3 sm:gap-4 md:gap-5 items-center">
                        <svg
                          width="14"
                          height="12"
                          viewBox="0 0 14 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="flex-shrink-0 mt-0.5 sm:mt-0 w-3 h-2.5 md:w-3.5 md:h-3"
                        >
                          <path
                            d="M8 11L13 6L8 1"
                            stroke="#2EA8FF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M1 11L6 6L1 1"
                            stroke="#2EA8FF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>

                        <span className="font-medium text-xs sm:text-base leading-relaxed text-fg">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EngagementModelSection;
