import { Button } from "@/components/ui/buttonBtn";

type MilestoneItem = {
  year: string;
  title: string;
  description: string;
};

const defaultItems: MilestoneItem[] = [
  { year: "2017", title: "The Beginning", description: "Our story began as AICompany Private Limited officially registered, setting the foundation for a tech-driven future." },
  { year: "2018", title: "First Enterprise Breakthrough", description: "Delivered our first enterprise-level ERP and mobile app solutions, marking our entry into large-scale digital transformation." },
  { year: "2019", title: "Expanding Creative Horizons", description: "Ventured into digital marketing and design services, blending creativity with technology for complete digital experiences." },
  { year: "2020", title: "The AI Revolution Begins", description: "Introduced AI-powered tools for automation and HR management, redefining operational efficiency for modern businesses." },
  { year: "2021", title: "Going Global with Cloud", description: "Partnered with international clients and launched scalable, cloud-based ERP modules to support global operations." },
  { year: "2023", title: "Introducing AutoMarkAI", description: "Launched our proprietary AI-driven digital marketing assistant, empowering brands with intelligent campaign automation." },
  { year: "2025", title: "Building the Future of Business Tech", description: "Developing advanced AI-based HR Payroll, Taxation ERP, and fintech-integrated automation platforms to shape tomorrow's enterprises." },
];

function TimelineDot() {
  return (
    <div
      className="absolute left-8 md:left-1/2 -translate-x-1/2 mt-[21px] z-20 w-[25px] h-[25px] rounded-full p-[1px]"
      style={{ background: "radial-gradient(42.58% 56.52% at 94.52% -14.13%, var(--heading-from) 0%, var(--tech) 100%)", boxShadow: "0px 0px 15.9px 0px var(--tech)" }}
    >
      <div className="w-full h-full rounded-full" style={{ background: "linear-gradient(0.63deg, var(--tech) 2.69%, #064A87 97.31%)" }} />
    </div>
  );
}

function YearPill({ year, alignRight }: { year: string; alignRight: boolean }) {
  return (
    <div className={`w-full ml-16 md:ml-0 md:w-1/2 ${alignRight ? "pr-12 md:text-right" : "md:pl-12 md:text-left"} relative z-10`}>
      <div
        className={`inline-block mt-5.25 mb-4 md:mb-0 rounded-full p-[1px] ${alignRight ? "md:ml-auto md:mr-2" : "md:mr-auto md:ml-2"}`}
        style={{ background: "radial-gradient(42.58% 56.52% at 94.52% -14.13%, var(--heading-from) 0%, var(--tech) 100%)", boxShadow: "0px 4px 15px 0px rgb(var(--hi-rgb) / calc(0.41 * var(--hi-scale)))" }}
      >
        <div className="py-[5px] px-[25px] lg:py-[10px] lg:px-[45px] rounded-full text-fg font-medium text-sm md:text-base leading-snug text-center" style={{ background: "linear-gradient(0.63deg, var(--tech) 2.69%, #064A87 97.31%)" }}>
          {year}
        </div>
      </div>
    </div>
  );
}

function ContentCard({ item, alignRight }: { item: MilestoneItem; alignRight: boolean }) {
  return (
    <div className={`w-fit !md:w-full md:w-1/2 ${alignRight ? "md:pl-12" : "md:pr-12"} ml-16 lg:ml-0`}>
      <div className="flex items-center mb-4 mt-5.25 lg:hidden">
        <h3 className="text-xl font-semibold leading-snug text-fg text-left">{item.title}</h3>
      </div>

      <div className={`hidden lg:flex items-center mb-4 mt-5.25 ${alignRight ? "" : "justify-end gap-2.5"}`}>
        {alignRight ? <div className="w-[29px] h-0 mr-3 border" style={{ borderImageSource: "linear-gradient(90deg, var(--heading-from) 0%, var(--tech-soft) 47.6%, var(--heading-from) 100%)", borderImageSlice: 1 }} /> : null}
        <h3 className={`text-xl md:text-2xl font-semibold leading-snug text-fg ${alignRight ? "text-left" : "text-right"}`}>{item.title}</h3>
        {!alignRight ? <div className="w-[29px] h-0 mr-3 border" style={{ borderImageSource: "linear-gradient(90deg, var(--heading-from) 0%, var(--tech-soft) 47.6%, var(--heading-from) 100%)", borderImageSlice: 1 }} /> : null}
      </div>

      <div className="p-5 text-fg w-full flex items-center" style={{ background: "linear-gradient(75.79deg, var(--glow) 0%, var(--canvas-2) 44.95%, var(--glow) 100%)", border: "1px solid rgb(var(--hi-rgb) / calc(0.15 * var(--hi-scale)))", boxShadow: "0px 0px 15px 0px rgb(var(--hi-rgb) / calc(0.15 * var(--hi-scale)))", borderRadius: "10px", minHeight: "118px" }}>
        <p className={`text-base font-normal leading-relaxed text-fg ${alignRight ? "text-left" : "text-left lg:text-right"} w-full max-w-[420px]`}>
          {item.description}
        </p>
      </div>
    </div>
  );
}

const OurMileStone = ({
  tag = "Our Milestone",
  title = "Our Journey of Innovation and Growth",
  description = "From a visionary start in 2017 to pioneering AI-driven solutions today - every milestone marks our commitment to empowering businesses through intelligence and technology.",
  items = defaultItems,
}: {
  tag?: string;
  title?: string;
  description?: string;
  items?: MilestoneItem[];
}) => {
  const resolvedItems = items.filter((item) => item.year.trim() || item.title.trim() || item.description.trim());
  const timelineItems = resolvedItems.length > 0 ? resolvedItems : defaultItems;

  return (
    <section className="sectionDefault overflow-hidden" style={{ background: "radial-gradient(circle, var(--canvas) 45%, var(--glow) 100%)" }}>
      <div className="w-full max-w-[1110px] mx-auto px-4 xl:px-0">
        <div className="flex flex-col justify-center items-start sm:items-center mx-auto w-full lg:max-w-[1110px] gap-[15px]">
          <Button variant="outlined" className="py-2.5 px-6.25 text-fg font-normal leading-relaxed text-xs sm:text-sm rounded-full" style={{ background: "color-mix(in srgb, var(--tech) 5%, transparent)", border: "1px solid color-mix(in srgb, var(--tech) 45%, transparent)" }}>
            {tag}
          </Button>

          <h2 className="heading-gradient font-bold leading-snug text-left sm:text-center text-[clamp(1.5rem,2.3vw,2.05rem)]">{title}</h2>

          <p className="text-base md:text-lg font-normal leading-relaxed text-fg/80 text-left sm:text-center">{description}</p>
        </div>

        <div className="relative mt-12 md:mt-[50px] w-full max-w-[1049px] mx-auto">
          <div className="absolute left-1/2 top-[21px] bottom-[21px] transform -translate-x-1/2 border-l border-fg/30 hidden md:block" />
          <div className="absolute left-8 top-[21px] bottom-[21px] border-l border-fg/30 md:hidden"></div>

          {timelineItems.map((item, index) => {
            const alignRight = index % 2 === 0;

            return (
              <div key={`${item.year}-${item.title}-${index}`} className={`relative flex flex-col md:flex-row ${alignRight ? "" : "md:flex-row-reverse"} items-start mb-12 md:mb-[60px]`}>
                <TimelineDot />
                <YearPill year={item.year} alignRight={alignRight} />
                <ContentCard item={item} alignRight={alignRight} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurMileStone;
