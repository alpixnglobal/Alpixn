import { BlueButton, Heading, Section, tone } from "@/components/ui/v4";
import Image from "next/image";

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


const CuttingEdgeFeaturesSection = ({
  title = "Cutting-edge Features that enhance Customer Experience",
  description = "Explore a range of innovative features designed to understand and interact with your customers effectively, ensuring seamless support and enhanced user engagement. With 24/7 automated assistance, secure data handling, and privacy compliance, your customer support is powered by industry-leading AI.",
  cards = defaultCards,
}: CuttingEdgeFeaturesSectionProps) => {
  const resolvedCards = cards.length > 0 ? cards : defaultCards;
  return (
    <Section id="features-title" alt>
      <Heading id="features-title" kicker="Features" kickerTone="blue" title={title} subtitle={description} center />
      <div className="mt-14 space-y-6">
        {resolvedCards.map((card, i) => {
          const image = card.imageData || defaultCards[i % defaultCards.length]?.imageData;
          return (
            <article key={`${card.title}-${i}`} className="grid overflow-hidden rounded-[30px] border border-line bg-surface shadow-[var(--shadow-card)] lg:grid-cols-12">
              <div className={`relative min-h-[240px] bg-[radial-gradient(circle_at_30%_20%,rgba(8,120,209,0.14),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(246,215,122,0.3),transparent_60%)] p-6 lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`}>
                {image ? (
                  <div className="relative h-full min-h-[220px] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_50px_-30px_rgba(7,26,51,0.5)]">
                    <Image src={image} alt={card.title} fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover object-left-top" unoptimized={image.startsWith("data:") || image.startsWith("http")} />
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-9 lg:col-span-5">
                <span className="grid h-11 w-11 place-items-center rounded-full font-display text-sm font-bold" style={{ background: tone(i).c, color: tone(i).ink }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-fg">{card.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{card.description}</p>
                <div className="mt-6">
                  <BlueButton href={card.buttonHref || "/contact-us"}>{card.buttonLabel || "Learn more"}</BlueButton>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
};

export default CuttingEdgeFeaturesSection;
