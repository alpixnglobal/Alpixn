import { FeatureCards, GoldButton, Heading, Section } from "@/components/ui/v4";

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


const TalkToExpertSection = ({ title = "Expert Node.js Development: Making the Complex Effortlessly Simple", buttonLabel = "Talk With Expert", buttonHref = "/contact-us", cards = defaultCards }: TalkToExpertSectionProps) => {
  return (
    <Section id="talk-title" alt>
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:sticky lg:top-28 lg:col-span-5">
          <Heading id="talk-title" kicker="Expertise" kickerTone="blue" title={title} />
          <div className="mt-7">
            <GoldButton href={buttonHref}>{buttonLabel}</GoldButton>
          </div>
        </div>
        <div className="lg:col-span-7 [&>ul]:mt-0">
          <FeatureCards cols={2} items={cards.map((c) => ({ title: c.title, description: c.description }))} />
        </div>
      </div>
    </Section>
  );
};

export default TalkToExpertSection;
