import { FeatureCards, Heading, Section } from "@/components/ui/v4";

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
    <Section id="audience-title">
      <Heading id="audience-title" kicker="Who it's for" title={title} subtitle={description} center />
      <FeatureCards cols={4} items={resolvedCards.map((c) => ({ title: c.title, description: c.description }))} />
    </Section>
  );
};

export default TransfromCustomerEngagement;
