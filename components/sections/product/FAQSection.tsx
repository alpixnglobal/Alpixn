import { FaqList, Heading, Section } from "@/components/ui/v4";

type ProductFaqItem = {
  question: string;
  answer: string;
};

const defaultItems: ProductFaqItem[] = [
  {
    question: "What is ALPIXN AI Chatbot?",
    answer:
      "ALPIXN AI Chatbot is an AI-driven customer support solution that integrates with your digital platforms to provide real-time, intelligent responses to customer inquiries, enhancing user engagement and satisfaction.",
  },
  {
    question: "How does the chatbot learn and adapt?",
    answer:
      "The chatbot improves through continuous model refinement, conversation feedback, and workflow tuning so responses become more accurate over time.",
  },
  {
    question: "Is ALPIXN AI Chatbot easy to integrate?",
    answer:
      "Yes. It is designed to integrate with websites and applications through a structured onboarding and deployment process with minimal disruption.",
  },
  {
    question: "How does ALPIXN AI Chatbot handle sensitive data?",
    answer:
      "The platform can be configured with secure data handling practices, controlled access, and privacy-conscious workflows that align with business requirements.",
  },
  {
    question: "Can I customize the chat flows?",
    answer:
      "Yes. Chat flows, prompts, escalation paths, and support journeys can be customized to fit your business logic and customer needs.",
  },
  {
    question: "What support options are available?",
    answer:
      "Support can include deployment guidance, platform updates, implementation help, and ongoing optimization based on your selected engagement model.",
  },
];

const FAQSection = ({
  title = "FAQs about ALPIXN AI Chatbot",
  items = defaultItems,
  questionClassName = "text-lg md:text-[22px]",
}: {
  title?: string;
  items?: ProductFaqItem[];
  questionClassName?: string;
}) => {
  void questionClassName;
  return (
    <Section id="product-faq" alt>
      <Heading id="product-faq" kicker="FAQ" kickerTone="blue" title={title} center />
      <FaqList items={items} />
    </Section>
  );
};

export default FAQSection;
