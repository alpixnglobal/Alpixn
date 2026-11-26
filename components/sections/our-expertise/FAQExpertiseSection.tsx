import { FaqList, Heading, Section } from "@/components/ui/v4";

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
  void questionClassName;
  return (
    <Section id="faq-title" alt>
      <Heading id="faq-title" kicker="FAQ" kickerTone="blue" title={title} center />
      <FaqList items={items} />
    </Section>
  );
};

export default FAQExpertiseSection;
