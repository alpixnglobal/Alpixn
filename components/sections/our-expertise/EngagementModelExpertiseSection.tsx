import type { ExpertiseEngagementModelRecord } from "@/lib/content-types";

const defaultModels: ExpertiseEngagementModelRecord[] = [
  {
    title: "Offshore Dedicated Team",
    description:
      "Our offshore dedicated team model functions as a Software Development Center. This exclusive team works on client projects, ensuring scalability, efficiency, cost-effectiveness, optimized delivery, and consistently high-quality results.",
    features: ["Client-Centric Approach", "Direct Reporting and Transparency", "Scalability and Flexibility", "Quality and Efficiency"],
  },
  {
    title: "Staff Augmentation",
    description:
      "Through this, we integrates software development experts into client teams. This model accelerates delivery, reduces risks, optimizes resources, and ensures measurable efficiency, productivity, and successful outcomes across lifecycles.",
    features: ["Tailored Expertise", "Seamless Integration", "Cost-Effective Solution", "Transparent Communication"],
  },
  {
    title: "Project-Based",
    description:
      "As a trusted software development agency, Jellyfish Technologies offers flexible engagement models tailored to meet specific customer objectives, ensuring effective collaboration, cost management, and value-oriented execution at every stage.",
    features: ["Fixed Budget", "Milestones and Deliverables", "Resource Allocation", "Risk Mitigation"],
  },
];

function ModelCard({ model, spanClassName = "" }: { model: ExpertiseEngagementModelRecord; spanClassName?: string }) {
  return (
    <div className={`relative rounded-[14px] overflow-hidden ${spanClassName}`}>
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

      <div
        className="absolute left-1/2 -top-10 sm:-top-12 md:-top-16 lg:-top-20 z-0 pointer-events-none
             w-[calc(100%-32px)] max-w-[288px] h-[90px] sm:h-[120px] md:h-[140px] lg:h-[161px]
             bg-gradient-to-b from-tech to-[#1427AA] opacity-75 blur-[24px] sm:blur-[32px] md:blur-[40px] lg:blur-[48.05px]"
        style={{ transform: "translateX(-50%)" }}
      />

      <div
        className="relative z-10 w-full h-full rounded-[14px] p-4 sm:p-5 flex flex-col gap-4 sm:gap-5"
        style={{ background: "linear-gradient(180deg, rgba(24, 24, 24, 0.24) 0%, color-mix(in srgb, var(--tech) 6%, transparent) 100%)" }}
      >
        <h4 className="font-semibold text-fg text-lg sm:text-xl">{model.title}</h4>
        <p className="text-xs sm:text-base leading-relaxed text-fg/80">{model.description}</p>
        <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
          {model.features.map((text) => (
            <div key={text} className="flex gap-3 sm:gap-4 md:gap-5 items-center">
              <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-0.5 sm:mt-0 w-3 h-2.5 md:w-3.5 md:h-3">
                <path d="M8 11L13 6L8 1" stroke="#2EA8FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1 11L6 6L1 1" stroke="#2EA8FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-medium text-xs sm:text-base leading-relaxed text-fg">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const EngagementModelExpertiseSection = ({
  title = "Engagement Models",
  subtitle =
    "As a trusted software development agency, Jellyfish Technologies offers flexible engagement models tailored to meet specific customer objectives, ensuring effective collaboration, cost management, and value-oriented execution at every stage.",
  models = defaultModels,
}: {
  title?: string;
  subtitle?: string;
  models?: ExpertiseEngagementModelRecord[];
}) => {
  const resolvedModels = models.length > 0 ? models : defaultModels;

  return (
    <section className="sectionDefault">
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle, var(--canvas) 35%, var(--glow) 100%)" }} />

      <div className="container max-w-[1350px]">
        <div className="flex flex-col gap-[15px] max-w-[998px] md:mx-auto ">
          <h2 className="title heading-gradient w-full max-w-[828px] mx-auto text-left md:text-center">{title}</h2>
          <p className="subtitleMeXl80 leading-relaxed text-left md:text-center">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8 sm:mt-10 md:mt-12.5">
          {resolvedModels.map((model, index) => (
            <ModelCard key={`${model.title}-${index}`} model={model} spanClassName={index === 2 ? "md:col-span-2 lg:col-span-1" : ""} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngagementModelExpertiseSection;
