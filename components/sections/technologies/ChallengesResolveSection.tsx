import { Heading, MediaCards, Section } from "@/components/ui/v4";

import type { TechnologyChallengeCardRecord } from "@/lib/content-types";

type ChallengesResolveSectionProps = {
  title?: string;
  cards?: TechnologyChallengeCardRecord[];
};

const defaultCards: TechnologyChallengeCardRecord[] = [
  {
    title: "Seamless Microservices Integration",
    description:
      "ALPIXN Node JS development services ensure seamless microservices integration, helping you enhance scalability, reduce deployment times, and streamline resource management.",
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
      "ALPIXN, an industry-leading Node JS development agency specializes in delivering clean, maintainable, and excellent-quality code, enhancing long-term performance and scalability.",
    imageData: "/images/quality.svg",
    linkLabel: "",
  },
  {
    title: "Advanced Memory Leak Detection",
    description:
      "As part of our Node JS consulting services, ALPIXN provides expert memory management and leak detection solutions, ensuring your application remains efficient and reliable.",
    imageData: "/images/mask-leak-detection.png",
    linkLabel: "",
  },
];




const ChallengesResolveSection = ({ title = "Challenges We'll Assist You Resolve with Our Node.JS Development Services", cards = defaultCards }: ChallengesResolveSectionProps) => {
  return (
    <Section id="challenges-title">
      <Heading id="challenges-title" kicker="Challenges we solve" title={title} center />
      <MediaCards items={cards.map((c) => ({ title: c.title, description: c.description, image: c.imageData, linkLabel: c.linkLabel }))} />
    </Section>
  );
};

export default ChallengesResolveSection;
