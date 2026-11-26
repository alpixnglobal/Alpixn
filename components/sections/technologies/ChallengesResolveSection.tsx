import Image from "next/image";

import type { TechnologyChallengeCardRecord } from "@/lib/content-types";

type ChallengesResolveSectionProps = {
  title?: string;
  cards?: TechnologyChallengeCardRecord[];
};

const defaultCards: TechnologyChallengeCardRecord[] = [
  {
    title: "Seamless Microservices Integration",
    description:
      "Axano Software Private Limited Node JS development services ensure seamless microservices integration, helping you enhance scalability, reduce deployment times, and streamline resource management.",
    imageData: "/images/mask-microservices.png",
    linkLabel: "Learn More",
  },
  {
    title: "Single-Threaded Performance Limitations",
    description:
      "Surmount the limitations of single-threaded operations with our optimized Node.js solutions, assuring high performance and optimal utilization of your server’s resources for real-time applications.",
    imageData: "/images/thread.svg",
    linkLabel: "",
  },
  {
    title: "High-Performance Code Quality and Maintainability Services",
    description:
      "Axano Software Private Limited, an industry-leading Node JS development agency specializes in delivering clean, maintainable, and excellent-quality code, enhancing long-term performance and scalability.",
    imageData: "/images/quality.svg",
    linkLabel: "",
  },
  {
    title: "Advanced Memory Leak Detection",
    description:
      "As part of our Node JS consulting services, Jellyfish Technologies provides expert memory management and leak detection solutions, ensuring your application remains efficient and reliable.",
    imageData: "/images/mask-leak-detection.png",
    linkLabel: "",
  },
];

function BorderOverlay() {
  return (
    <div
      className="absolute inset-0 rounded-[10px] pointer-events-none z-20"
      style={{
        background: "radial-gradient(100% 410.53% at 100% 0%, rgb(var(--hi-rgb) / calc(0.75 * var(--hi-scale))) 0%, rgb(var(--hi-rgb) / calc(0.15 * var(--hi-scale))) 72.87%)",
        padding: "1px",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
    />
  );
}

function WideCard({ card }: { card: TechnologyChallengeCardRecord }) {
  const shouldUnoptimize = card.imageData.startsWith("data:") || card.imageData.startsWith("http");

  return (
    <div className="relative h-[370px] w-full rounded-[10px] lg:max-w-[637px]">
      <BorderOverlay />
      <div className="relative z-10 h-full w-full overflow-hidden rounded-[9px]" style={{ background: "linear-gradient(180deg, rgba(24,24,24,0.24) 0%, color-mix(in srgb, var(--tech) 6%, transparent) 100%)" }}>
        <div className="relative z-30 ml-5 mt-5 flex max-w-[397px] flex-col gap-[15px]">
          <h6 className="font-semibold text-base md:text-lg">{card.title}</h6>
          <p className="text-fg/80 font-normal text-xs md:text-sm leading-relaxed">{card.description}</p>
          {card.linkLabel ? (
            <button type="button" className="flex gap-2.5 items-center text-tech hover:text-blue-300 transition-colors">
              <span className="text-xs md:text-base">{card.linkLabel}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[14] h-[14] md:w-[16px] md:h-[16px]">
                <path d="M1 8H15" stroke="#2EA8FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 1L15 8L8 15" stroke="#2EA8FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : null}
        </div>

        <div className="absolute top-0 bottom-0 -right-1 w-full pointer-events-none z-0">
          <Image src={card.imageData} alt={card.title} fill className="object-contain object-right" sizes="(max-width: 768px) 50vw, 50vw" unoptimized={shouldUnoptimize} />
        </div>
      </div>
    </div>
  );
}

function NarrowCard({ card }: { card: TechnologyChallengeCardRecord }) {
  const shouldUnoptimize = card.imageData.startsWith("data:") || card.imageData.startsWith("http");

  return (
    <div className="relative h-[370px] w-full rounded-[10px] lg:max-w-[431px]">
      <BorderOverlay />
      <div className="relative z-10 h-full w-full overflow-hidden rounded-[9px]" style={{ background: "linear-gradient(180deg, rgba(24,24,24,0.24) 0%, color-mix(in srgb, var(--tech) 6%, transparent) 100%)" }}>
        <div className="relative z-30 ml-5 mr-5 mt-5 flex flex-col gap-[15px] lg:mr-0 lg:max-w-[397px]">
          <h6 className="font-semibold text-base md:text-lg">{card.title}</h6>
          <p className="text-fg/80 font-normal text-xs md:text-sm leading-relaxed">{card.description}</p>
          <div className="relative h-[158px] w-full lg:w-[391px]">
            <Image src={card.imageData} alt={card.title} fill priority className="object-cover rounded-[5px]" unoptimized={shouldUnoptimize} />
          </div>
        </div>
      </div>
    </div>
  );
}

const ChallengesResolveSection = ({ title = "Challenges We'll Assist You Resolve with Our Node.JS Development Services", cards = defaultCards }: ChallengesResolveSectionProps) => {
  const resolvedCards = cards.length > 0 ? cards : defaultCards;
  const rows = Array.from({ length: Math.ceil(resolvedCards.length / 2) }, (_, rowIndex) => resolvedCards.slice(rowIndex * 2, rowIndex * 2 + 2));

  return (
    <section className="sectionDefault">
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle, var(--canvas) 55%, var(--glow) 100%)" }} />

      <div className="container max-w-[1171px]">
        <h2 className="title heading-gradient-white text-left sm:text-center">
          {title.split("<br />").map((part, index) => (
            <span key={`${part}-${index}`}>
              {part}
              {index < title.split("<br />").length - 1 ? <br /> : null}
            </span>
          ))}
        </h2>

        {rows.map((row, rowIndex) => {
          const isWideFirst = rowIndex % 2 === 0;
          const first = row[0];
          const second = row[1];

          return (
            <div key={`challenge-row-${rowIndex}`} className={`flex flex-col md:flex-row ${rowIndex === 0 ? "mt-12.5" : "mt-5"} w-full max-w-[1093px] mx-auto gap-[25px]`}>
              {first ? (isWideFirst ? <WideCard card={first} /> : <NarrowCard card={first} />) : null}
              {second ? (isWideFirst ? <NarrowCard card={second} /> : <WideCard card={second} />) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ChallengesResolveSection;
