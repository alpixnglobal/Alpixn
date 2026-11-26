import Image from "next/image";
import Link from "next/link";

import type { ProductFeatureRecord } from "@/lib/content-types";

type CuttingEdgeFeaturesSectionProps = {
  title?: string;
  description?: string;
  cards?: ProductFeatureRecord[];
};

const defaultCards: ProductFeatureRecord[] = [
  {
    title: "Natural Language Understanding",
    description:
      "Utilize sophisticated NLU to comprehend customer inquiries accurately, delivering relevant and meaningful responses that resonate with user intent.",
    imageData: "/images/natural-language-understanding.png",
    buttonLabel: "View Full Details",
    buttonHref: "#",
  },
  {
    title: "AI-Driven Learning and Adaptation",
    description:
      "The chatbot evolves and adapts through continuous learning, improving its interactions over time for more personalized and effective support.",
    imageData: "/images/ai-driven-learning.png",
    buttonLabel: "View Full Details",
    buttonHref: "#",
  },
  {
    title: "Sentiment Analysis and Emotional Intelligence",
    description:
      "Leverage sentiment analysis to understand customer emotions and respond appropriately, ensuring empathetic and supportive interactions.",
    imageData: "/images/sentiment-analysis.png",
    buttonLabel: "View Full Details",
    buttonHref: "#",
  },
];

function FeatureCard({ card, reversed = false, fallbackImage }: { card: ProductFeatureRecord; reversed?: boolean; fallbackImage: string }) {
  const resolvedImage = card.imageData || fallbackImage;
  const shouldUnoptimize = resolvedImage.startsWith("data:") || resolvedImage.startsWith("http");

  return (
    <div className={`flex flex-col xl:grid ${reversed ? "xl:grid-cols-[1fr_626px]" : "xl:grid-cols-[626px_1fr]"} items-center xl:items-start gap-8 xl:gap-0 mt-8 sm:mt-10 xl:mt-12.5`}>
      <div className={`relative w-full max-w-[400px] sm:max-w-[500px] md:max-w-[550px] xl:w-full xl:max-w-none h-[250px] sm:h-[300px] md:h-[350px] xl:h-114.25 ${reversed ? "order-1 xl:order-2" : ""}`}>
        <div className="absolute inset-0 p-1.5 sm:p-2 xl:p-2.5">
          <div
            className="absolute inset-0 pointer-events-none rounded-[10px] sm:rounded-[12px] xl:rounded-[14px]"
            style={{
              background: "radial-gradient(100% 100% at 49.96% 0%, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.15) 72.87%)",
              padding: "2px",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />
        </div>

        <div className="relative w-full h-full rounded-[21px] overflow-hidden" style={{ background: "linear-gradient(249.67deg, rgba(56, 158, 255, 0.06) 0%, rgba(24, 24, 24, 0) 100%)" }}>
          <Image src={resolvedImage} alt={card.title} fill className="object-cover sm:object-contain p-4" unoptimized={shouldUnoptimize} />
        </div>
      </div>

      <div className={`flex flex-col ${reversed ? "items-start sm:items-center xl:items-end xl:mr-6.25" : "sm:items-center xl:items-start xl:ml-6.25"} gap-5 px-4 sm:px-6 xl:px-0 w-full max-w-[600px] sm:max-w-[700px] xl:max-w-none mx-auto xl:mx-0 ${reversed ? "order-2 xl:order-1" : ""}`}>
        <h3 className={`font-semibold text-lg md:text-xl text-white ${reversed ? "text-left sm:text-center xl:text-right" : "text-start lg:text-center xl:text-start"}`}>
          {card.title}
        </h3>
        <p className={`text-white/80 text-sm md:text-base leading-relaxed font-normal ${reversed ? "text-left sm:text-center xl:text-right" : "text-left sm:text-center xl:text-start"}`}>
          {card.description}
        </p>
        <div className={`relative w-full sm:max-w-[280px] xl:w-44 ${reversed ? "xl:mr-6.25" : ""}`}>
          <div
            className="absolute inset-0 pointer-events-none rounded-[8px] sm:rounded-[9px] xl:rounded-[10px]"
            style={{
              background: "linear-gradient(166.72deg, #389DFE -20.31%, #FFFFFF 92.69%)",
              padding: "1px sm:1.25px xl:1.5px",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />
          <Link
            href={card.buttonHref || "#"}
            className="relative flex w-full items-center justify-center text-white border font-medium text-sm sm:text-base rounded-[10px] py-2 sm:py-2.5 xl:py-2.5 px-4 sm:px-5 xl:px-6.25 cursor-pointer"
            style={{
              background: "linear-gradient(360deg, #002348 0%, #00141F 100%)",
              border: "1px sm:1.25px xl:1.5px solid transparent",
            }}
          >
            {card.buttonLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}

const CuttingEdgeFeaturesSection = ({
  title = "Cutting-edge Features that enhance Customer Experience",
  description = "Explore a range of innovative features designed to understand and interact with your customers effectively, ensuring seamless support and enhanced user engagement. With 24/7 automated assistance, secure data handling, and privacy compliance, your customer support is powered by industry-leading AI.",
  cards = defaultCards,
}: CuttingEdgeFeaturesSectionProps) => {
  const resolvedCards = cards.length > 0 ? cards : defaultCards;

  return (
    <section className="sectionDefault">
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle, #00070E 35%, #002348 100%)" }} />

      <div className="container max-w-337.75">
        <div className="flex flex-col gap-[15px]">
          <h2 className="title heading-gradient text-left sm:text-center">{title}</h2>
          <p className="subtitleMeXl80 leading-relaxed text-left sm:text-center">{description}</p>
        </div>

        <div className="flex flex-col gap-6">
          {resolvedCards.map((card, index) => (
            <FeatureCard
              key={`${card.title}-${index}`}
              card={card}
              reversed={index % 2 === 1}
              fallbackImage={defaultCards[index % defaultCards.length]?.imageData || "/images/natural-language-understanding.png"}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuttingEdgeFeaturesSection;
