import Accent from "@/components/ui/Accent";
import { getStatsData } from "@/lib/expertise/stats-section-data";
import type { ExpertiseStatCardRecord, ExpertiseStatHighlightRecord } from "@/lib/content-types";

interface StatsSectionProps {
  slug?: string;
  data?: {
    mainTitle: string;
    mainDescription: string;
    gridItems: ExpertiseStatCardRecord[];
    highlights: ExpertiseStatHighlightRecord[];
  };
}

const defaultHighlights: ExpertiseStatHighlightRecord[] = [
  { value: "10+", label: "Years in Experience" },
  { value: "150+", label: "All Experts" },
  { value: "98%", label: "On-Time Projects Delivered" },
  { value: "1500+", label: "Projects Delivered" },
  { value: "93%", label: "Repeated Client" },
];

const StatsSection = ({ slug = "software-development", data }: StatsSectionProps) => {
  const fallbackData = getStatsData(slug);
  const statsData = data ?? {
    mainTitle: fallbackData.mainTitle,
    mainDescription: fallbackData.mainDescription,
    gridItems: fallbackData.gridItems,
    highlights: defaultHighlights,
  };

  if (!statsData) {
    return null;
  }

  const highlights = statsData.highlights.length > 0 ? statsData.highlights : defaultHighlights;
  const highlightCount = Math.max(highlights.length, 1);
  const isCompactDesktop = highlightCount >= 5;
  const valueTextClass = isCompactDesktop ? "text-2xl sm:text-3xl lg:text-4xl xl:text-[clamp(2.25rem,3vw,4rem)]" : "text-2xl sm:text-3xl lg:text-4xl xl:text-5xl";
  const labelTextClass = isCompactDesktop ? "text-[11px] sm:text-xs lg:text-sm xl:text-[clamp(0.75rem,0.9vw,1.125rem)]" : "text-xs sm:text-sm lg:text-base";
  const itemPaddingClass = isCompactDesktop ? "px-2 xl:px-3" : "px-4";

  return (
    <section className="sectionDefault">
      {/* Background Color */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(circle, var(--canvas) 75%, var(--glow) 100%)" }}
      />

      {/* Container */}
      <div className="container max-w-[1351px]">
        {/* Stat Container */}
        <div className="w-full max-w-[1236px] mx-auto">
          <div
            className="grid grid-cols-2 gap-4 lg:gap-0 items-center lg:grid-flow-col lg:auto-cols-fr"
            style={{ gridTemplateColumns: `repeat(${Math.min(highlightCount, 2)}, minmax(0, 1fr))` }}
          >
            {highlights.map((highlight, index) => (
              <div key={`${highlight.value}-${index}`} className={`relative flex flex-col items-center gap-1.5 xl:gap-2 ${itemPaddingClass}`}>
                <div className={`text-fg font-semibold leading-none ${valueTextClass}`}>
                  {highlight.value}
                </div>
                <div className={`text-center text-fg/95 leading-snug lg:whitespace-nowrap ${labelTextClass}`}>{highlight.label}</div>
                {index < highlights.length - 1 ? <div className="hidden lg:block absolute right-0 top-0 bottom-0 border-r border-fg/25" /> : null}
              </div>
            ))}
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="w-full flex flex-col gap-[15px] max-w-253.25 mx-auto mt-25">
          <h2 className="text-left sm:text-center font-display text-[clamp(1.35rem,1.9vw,1.75rem)] font-bold leading-[1.15] tracking-[-0.025em] text-fg"><Accent text={statsData.mainTitle} /></h2>
          <p className="subtitleMeXl80 leading-relaxed text-left sm:text-center">{statsData.mainDescription}</p>
        </div>
        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-center mt-12.5 gap-5">
          {statsData.gridItems.map((item, index) => (
            <div key={index} className="relative w-full xl:w-109.25 h-56 rounded-[10px]">
              {/* BORDER ONLY */}
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

              {/* CARD CONTENT */}
              <div
                className="relative z-10 p-5 w-full h-full rounded-[10px]"
                style={{
                  background:
                    "linear-gradient(179.84deg, color-mix(in srgb, var(--tech) 35%, transparent) -59.75%, rgba(24, 24, 24, 0) 99.86%)",
                }}
              >
                <div className="flex flex-col gap-5">
                  <h4 className="text-lg md:text-xl font-semibold max-w-[369px]">{item.title}</h4>
                  <p className="font-normal text-fg/80 text-xs xl:text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
