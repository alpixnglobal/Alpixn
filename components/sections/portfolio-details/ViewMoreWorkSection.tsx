import type { PortfolioProjectRecord } from "@/lib/content-types";

import { PortfolioCard } from "../portfolio/WorkShowcaseSection";

type ViewMoreWorkSectionProps = {
  items: PortfolioProjectRecord[];
  title?: string;
};

const ViewMoreWorkSection = ({ items, title = "View Our More Projects" }: ViewMoreWorkSectionProps) => {
  return (
    <section className="relative w-full py-12.5">
      {/* Background Color */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle, #00070E 55%, #002348 100%)" }} />

      {/* Content */}
      <div className="container max-w-[1350px]">
        <h2 className="title heading-gradient text-left sm:text-center">{title}</h2>

        <div className="grid grid-cols-1 xl:grid-cols-3 items-center gap-6.25 mt-12.5 px-4 xl:px-0 overflow-hidden ">
          {items.slice(0, 3).map((item) => (
            <PortfolioCard
              key={item._id}
              slug={item.slug}
              imageUrl={item.imageData}
              title={item.title}
              description={item.summary}
              accent={item.accent}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ViewMoreWorkSection;
