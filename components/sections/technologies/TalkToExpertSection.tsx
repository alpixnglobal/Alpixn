import Link from "next/link";

import type { TechnologySimpleCardRecord } from "@/lib/content-types";

type TalkToExpertSectionProps = {
  title?: string;
  buttonLabel?: string;
  buttonHref?: string;
  cards?: TechnologySimpleCardRecord[];
};

const defaultCards: TechnologySimpleCardRecord[] = [
  {
    title: "Customizable Microservices Architectures",
    description:
      "Our Node.js experts design modular microservices architectures to ensure system scalability and flexibility, delivering robust, fault-tolerant solutions customized to your unique project needs.",
  },
  {
    title: "Serverless Architecture Solutions",
    description:
      "Leverage our serverless architecture solutions to improve scalability, expedite deployment, and lower infrastructure overhead. Our expertise guarantees cost-efficient, event-driven systems built to manage unpredictable traffic effortlessly.",
  },
  {
    title: "High-Performance Caching Strategies",
    description:
      "We implement high-performance caching strategies that significantly increase the speed and efficiency of applications, ensuring minimal latency and effective resource management in large-scale, high-demand settings.",
  },
  {
    title: "Automated Testing and CI/CD Pipelines",
    description:
      "Our Node.js development agency integrates automated testing and continuous integration/continuous delivery (CI/CD) pipelines, ensuring faster development with fewer bugs and higher code quality with each release.",
  },
];

function TalkCard({ card }: { card: TechnologySimpleCardRecord }) {
  return (
    <div className="relative w-full h-auto min-h-[140px] sm:min-h-[150px] md:h-[155px] lg:h-auto xl:h-[165px] rounded-[10px]">
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

      <div className="relative z-10 p-4 sm:p-5 w-full h-full rounded-[10px]" style={{ background: "linear-gradient(179.84deg, color-mix(in srgb, var(--tech) 35%, transparent) -59.75%, rgba(24, 24, 24, 0) 99.86%)" }}>
        <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
          <h4 className="text-base sm:text-lg font-semibold">{card.title}</h4>
          <p className="font-normal text-fg/80 text-xs sm:text-sm md:text-base leading-relaxed w-full">{card.description}</p>
        </div>
      </div>
    </div>
  );
}

const TalkToExpertSection = ({ title = "Expert Node.js Development: Making the Complex Effortlessly Simple", buttonLabel = "Talk With Expert", buttonHref = "/contact-us", cards = defaultCards }: TalkToExpertSectionProps) => {
  const resolvedCards = cards.length > 0 ? cards : defaultCards;

  return (
    <section className="sectionDefault pt-[100px]">
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle, var(--canvas) 55%, var(--glow) 100%)" }} />

      <div className="container max-w-[1352px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 xl:gap-[58px]">
          <div className="lg:sticky lg:top-0 lg:self-start order-1 lg:order-1">
            <div className="flex flex-col items-center lg:items-start gap-4 md:gap-5">
              <h2 className="title heading-gradient text-left">{title}</h2>
              <Link href={buttonHref} className="py-2.5 px-6.25 bg-tech rounded-10 text-base font-medium w-full sm:w-auto cursor-pointer">
                {buttonLabel}
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:gap-5 lg:gap-5 order-2 lg:order-2">
            {resolvedCards.map((card, index) => (
              <TalkCard key={`${card.title}-${index}`} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TalkToExpertSection;
