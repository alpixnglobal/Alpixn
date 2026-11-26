import Image from "next/image";

import type { ProductAudienceRecord } from "@/lib/content-types";

type TransfromCustomerEngagementProps = {
  title?: string;
  description?: string;
  cards?: ProductAudienceRecord[];
};

const defaultCards: ProductAudienceRecord[] = [
  {
    title: "Organizations",
    description:
      "Streamline operations and enhance customer satisfaction with AI-powered, real-time support for seamless interactions.",
    imageData: "/icons/organisation.svg",
  },
  {
    title: "Educational Institutions",
    description:
      "Provide instant academic and administrative support 24/7, improving student engagement and leveling user satisfaction.",
    imageData: "/icons/education.svg",
  },
  {
    title: "Customer Support Teams",
    description:
      "Automate routine queries, reduce response times, and focus on more complex issues with AI-driven assistance.",
    imageData: "/icons/support.svg",
  },
  {
    title: "HR & Recruitment Teams",
    description:
      "Simplify candidate interactions, automate query responses, and ensure faster, more efficient hiring processes.",
    imageData: "/icons/hr.svg",
  },
];

const TransfromCustomerEngagement = ({
  title = "Transform Your Customer Engagement with ALPIXN AI Chatbot",
  description = "Trusted by businesses across industries, ALPIXN AI Chatbot is more than just an automated response tool. It’s a strategic partner in elevating customer satisfaction, reducing operational costs, and driving growth through intelligent customer interactions.",
  cards = defaultCards,
}: TransfromCustomerEngagementProps) => {
  const resolvedCards = cards.length > 0 ? cards : defaultCards;

  return (
    <section className="sectionDefault">
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle, var(--canvas) 35%, var(--glow) 100%)" }} />

      <div className="container max-w-337.75">
        <div className="flex flex-col gap-[15px]">
          <h2 className="title heading-gradient text-left md:text-center text-[clamp(1.5rem,2.3vw,2.05rem)]">{title}</h2>
          <p className="subtitleMeXl80 leading-relaxed text-left md:text-center">{description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-12.5 px-4 xl:px-0">
          {resolvedCards.map((card, index) => {
            const resolvedImage = card.imageData || defaultCards[index % defaultCards.length]?.imageData || "/icons/organisation.svg";
            const shouldUnoptimize = resolvedImage.startsWith("data:") || resolvedImage.startsWith("http");

            return (
              <div
                key={card.title || `audience-${index}`}
                className="relative flex flex-col gap-5 p-5 z-10"
                style={{
                  borderRadius: "10px",
                  background: "linear-gradient(249.67deg, color-mix(in srgb, var(--tech) 35%, transparent) 0%, rgba(24, 24, 24, 0) 49.04%, color-mix(in srgb, var(--tech) 35%, transparent) 100%)",
                  border: "1px solid #FFFFFF26",
                }}
              >
                <h6 className="text-fg font-semibold text-base md:text-lg">{card.title}</h6>
                <p className="text-xs md:text-sm text-fg/80 leading-relaxed font-normal z-10">{card.description}</p>
                <Image src={resolvedImage} alt={card.title} width={97.48} height={104.44} className="absolute right-2 bottom-0 z-0" unoptimized={shouldUnoptimize} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TransfromCustomerEngagement;
