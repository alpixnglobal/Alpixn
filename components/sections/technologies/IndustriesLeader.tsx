import type { TechnologyStatRecord } from "@/lib/content-types";

type IndustriesLeaderProps = {
  title?: string;
  stats?: TechnologyStatRecord[];
};

const defaultStats: TechnologyStatRecord[] = [
  { value: "14+", label: "Years in Experience" },
  { value: "150+", label: "Full-Time Experts" },
  { value: "98%", label: "On-Time Projects Delivered" },
  { value: "250+", label: "Projects Delivered" },
  { value: "93%", label: "Repeated Client" },
];

function StatCard({ item, className = "" }: { item: TechnologyStatRecord; className?: string }) {
  return (
    <div className={`relative w-full h-full flex flex-col items-center gap-2 p-6.25 rounded-[10px] min-h-[140px] ${className}`}>
      <div
        className="absolute inset-0 rounded-[10px] pointer-events-none"
        style={{
          background: "radial-gradient(100% 100% at 49.96% 0%, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.15) 72.87%)",
          padding: "1px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-[10px] gap-2"
        style={{
          background: "linear-gradient(249.67deg, rgba(56, 158, 255, 0.35) 0%, rgba(24, 24, 24, 0) 49.04%, rgba(56, 158, 255, 0.35) 100%)",
        }}
      >
        <div className="font-semibold text-center text-2xl md:text-4xl text-white">{item.value}</div>
        <div className="text-center text-sm  md:text-base text-white">{item.label}</div>
      </div>
    </div>
  );
}

const IndustriesLeader = ({ title = "What Makes Us an Industry Leader?", stats = defaultStats }: IndustriesLeaderProps) => {
  const resolvedStats = stats.length > 0 ? stats : defaultStats;
  const primaryStats = resolvedStats.slice(0, 3);
  const secondaryStats = resolvedStats.slice(3);

  return (
    <div className="sectionDefault">
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle, rgba(0, 7, 14, 1) 15%, rgba(0, 35, 72, 1) 100%)" }} />

      <div className="container max-w-196.25">
        <h2 className="title heading-gradient text-left sm:text-center">{title}</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 items-center justify-center gap-6.25 mt-12.5 px-4 lg:px-0">
          {primaryStats.map((item, index) => (
            <StatCard key={`${item.label}-${index}`} item={item} className={item.label === "Years in Experience" ? "min-h-35" : ""} />
          ))}
        </div>
        {secondaryStats.length > 0 ? (
        <div className={`grid grid-cols-1 ${secondaryStats.length === 1 ? "lg:grid-cols-[245px]" : secondaryStats.length === 2 ? "lg:grid-cols-[245px_245px]" : "lg:grid-cols-3"} gap-6.25 mt-6.25 justify-center px-4 lg:px-0`}>
          {secondaryStats.map((item, index) => (
            <StatCard key={`${item.label}-${index}`} item={item} className="w-full lg:w-[245px]" />
          ))}
        </div>
        ) : null}
      </div>
    </div>
  );
};

export default IndustriesLeader;
