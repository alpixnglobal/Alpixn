import { Heading, Section, ToneTiles } from "@/components/ui/v4";
import type { TechnologySimpleCardRecord } from "@/lib/content-types";

type SuccessPropelSectionProps = {
  title?: string;
  cards?: TechnologySimpleCardRecord[];
};

const defaultCards: TechnologySimpleCardRecord[] = [
  {
    title: "Stable & Secured Solutions",
    description:
      "As a leading Node.js development company, we specialize in creating high-performing, scalable custom apps tailored to specific business requirements. Our seasoned developers ensure faultless functionality and optimized performance, giving you an advantage in a cutthroat industry.",
  },
  {
    title: "Dynamic Real-Time Web/Mobile Apps",
    description:
      "ALPIXN excels in creating real-time, responsive web and mobile applications using Node JS. We deliver rapid, dynamic solutions that improve customer engagement and are perfect for sectors like e-commerce, live streaming, and gaming that demand real-time updates.",
  },
  {
    title: "API Development and Integration",
    description:
      "ALPIXN excels in creating real-time, responsive web and mobile applications using Node JS. We deliver rapid, dynamic solutions that improve customer engagement and are perfect for sectors like e-commerce, live streaming, and gaming that demand real-time updates.",
  },
  {
    title: "Node.js Microservices Development",
    description:
      "ALPIXN is a leading Node.js development agency specializing in microservices architecture, empowering businesses with modular, scalable solutions. With our expertise, you may build robust systems that streamline intricate procedures, making development cycles quicker.",
  },
  {
    title: "Node.js Code Audit & QA Services",
    description:
      "Ensure the quality and security of your codebase with ALPIXN Node.js code review and quality assurance services. Our professionals offer detailed evaluations, pinpointing obstacles and weaknesses to deliver high-performing, secure tailored applications.",
  },
  {
    title: "Scalable Cloud Apps with Node.js",
    description:
      "ALPIXN, a leading Node.js web development company, builds scalable, secure cloud-based applications. We harness the power of cloud infrastructure to provide effective, affordable solutions that enable your business to thrive in a modern digital environment.",
  },
  {
    title: "Serverless Architecture Development",
    description:
      "ALPIXN offers expert Serverless Architecture Development using Node.js, enabling businesses to build scalable, cost-efficient applications without server management. Leverage cloud-native solutions for faster deployment, seamless scalability, and lower overhead.",
  },
  {
    title: "Node.js Migration Services",
    description:
      "Looking to transition to a more efficient platform? ALPIXN offers smooth Node.js migration services, helping businesses upgrade their systems with minimal disruption. Our migration solutions ensure improved performance, security, and long-term scalability.",
  },
  {
    title: "Node.js Consulting Services",
    description:
      "We provide expert Node.js consulting services, guiding businesses through every stage of development. Our consultants offer strategic insights and best practices, ensuring your project’s success from conception to launch, making us a trusted partner for app development.",
  },
];

const cornerClasses = [
  "rounded-br-[10px]",
  "rounded-b-[10px]",
  "rounded-bl-[10px]",
  "rounded-r-[10px]",
  "rounded-[10px]",
  "rounded-l-[10px]",
  "rounded-tr-[10px]",
  "rounded-t-[10px]",
  "rounded-tl-[10px]",
];

const SuccessPropelSection = ({ title = "Node.js Development Services That Propel Success", cards = defaultCards }: SuccessPropelSectionProps) => {
  return (
    <Section id="services-title">
      <Heading id="services-title" kicker="Services" title={title} center />
      <ToneTiles href="/contact-us" items={cards.map((c) => ({ title: c.title, description: c.description }))} />
    </Section>
  );
};

export default SuccessPropelSection;
