import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type FAQItem = {
  question: string;
  answer: string;
};

const defaultItems: FAQItem[] = [
  {
    question: "How does node.js differ from other server-side programming languages?",
    answer:
      "Node.js uses an event-driven, non-blocking architecture that makes it especially effective for real-time systems, APIs, and high-concurrency applications. It helps teams move faster with JavaScript across both frontend and backend development.",
  },
  {
    question: "Which companies use node.js for software development?",
    answer:
      "Node.js is used by startups and large enterprises alike for dashboards, APIs, streaming platforms, marketplaces, and collaboration tools. It remains popular where teams need scalability, speed, and a broad ecosystem.",
  },
  {
    question: "Why should you outsource node.js development?",
    answer:
      "Outsourcing Node.js development can reduce hiring overhead, accelerate delivery, and provide access to specialists who already understand scalable architecture, APIs, testing, and deployment workflows.",
  },
  {
    question: "What kind of applications can you build using node.js?",
    answer:
      "Node.js works well for real-time apps, SaaS platforms, backend services, APIs, marketplaces, analytics systems, and high-traffic web platforms that benefit from fast I/O and modular services.",
  },
  {
    question: "What is the cost of node.js development?",
    answer:
      "The cost of Node.js development varies based on project complexity, scope, architecture, and team model. A quick discovery session usually helps define the right delivery approach and a more accurate estimate.",
  },
];

const FAQExpertiseSection = ({
  title = "We’ve Got the Answers You’re Looking For",
  items = defaultItems,
  questionClassName = "text-lg md:text-[22px]",
}: {
  title?: string;
  items?: FAQItem[];
  questionClassName?: string;
}) => {
  return (
    <section className="w-full py-12.5" style={{ background: "radial-gradient(circle, #00070E 55%, #002348 100%)" }}>
      {/* Container */}
      <div className="container max-w-[1349px]">
        {/* Title */}
        <h2 className="text-gradient heading text-left sm:text-center">{title}</h2>

        {/* Accordion */}
        <Accordion type="single" collapsible className="w-full" defaultValue={items[items.length - 1] ? `item-${items.length}` : undefined}>
          {items.map((item, index) => (
            <AccordionItem key={item.question} value={`item-${index + 1}`}>
              <AccordionTrigger className={`cursor-pointer ${questionClassName}`.trim()}>{item.question}</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p className="text-base text-white leading-relaxed">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQExpertiseSection;
