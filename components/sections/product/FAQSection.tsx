import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type ProductFaqItem = {
  question: string;
  answer: string;
};

const defaultItems: ProductFaqItem[] = [
  {
    question: "What is JFT AI Chatbot?",
    answer:
      "JFT AI Chatbot is an AI-driven customer support solution that integrates with your digital platforms to provide real-time, intelligent responses to customer inquiries, enhancing user engagement and satisfaction.",
  },
  {
    question: "How does the chatbot learn and adapt?",
    answer:
      "The chatbot improves through continuous model refinement, conversation feedback, and workflow tuning so responses become more accurate over time.",
  },
  {
    question: "Is JFT AI Chatbot easy to integrate?",
    answer:
      "Yes. It is designed to integrate with websites and applications through a structured onboarding and deployment process with minimal disruption.",
  },
  {
    question: "How does JFT AI Chatbot handle sensitive data?",
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
  title = "FAQs about JFT AI Chatbot",
  items = defaultItems,
  questionClassName = "text-lg md:text-[22px]",
}: {
  title?: string;
  items?: ProductFaqItem[];
  questionClassName?: string;
}) => {
  return (
    <div className="w-full py-12.5" style={{ background: "radial-gradient(circle, var(--canvas) 55%, var(--glow) 100%)" }}>
      {/* Container */}
      <div className="w-full max-w-[1349px] mx-auto">
        {/* Title */}
        <h2 className="text-gradient heading">{title}</h2>

        {/* Accordion */}
        <Accordion type="single" collapsible className="w-full" defaultValue={items[0] ? "item-1" : undefined}>
          {items.map((item, index) => (
            <AccordionItem key={item.question} value={`item-${index + 1}`}>
              <AccordionTrigger className={`cursor-pointer ${questionClassName}`.trim()}>{item.question}</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4">
                <p className="text-base text-fg leading-relaxed">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQSection;
