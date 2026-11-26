import { Heading, ModelCards, Section } from "@/components/ui/v4";
import type { TechnologyEngagementModelRecord } from "@/lib/content-types";

type EngagementModelTechnologieSectionProps = {
  title?: string;
  description?: string;
  models?: TechnologyEngagementModelRecord[];
};

const defaultModels: TechnologyEngagementModelRecord[] = [
  {
    title: "Dedicated Team",
    description:
      "We craft a bespoke offshore NodeJS team that integrates seamlessly with your company. Our custom software development experts immerse themselves fully in your project, aligning perfectly with your vision to deliver exceptional, high-quality results at every stage.",
    bullets: ["Client-Centric Approach", "Direct Reporting and Transparency", "Scalability and Flexibility", "Quality and Efficiency"],
  },
  {
    title: "Team Augmentation",
    description:
      "With ‘Team Augmentation’ model, we elevate your in-house team when you hire Node.js developers through our premier node.js outsourcing services. Our experts seamlessly complement your current staff, infusing advanced skills and ensuring flawless, collaborative synergy.",
    bullets: ["Tailored Expertise", "Seamless Integration", "Cost-Effective Solution", "Transparent Communication"],
  },
  {
    title: "Project-Based",
    description:
      "‘Project-Based’ model is ideal for organizations needing focused Node.js solutions from a top-tier node development company. We adopt a meticulous approach to managing risks and optimizing resources, ensuring your project meets deadlines, stays within budget, and precisely achieves its goals.",
    bullets: ["Fixed Budget", "Milestones and Deliverables", "Resource Allocation", "Risk Mitigation"],
  },
];


const EngagementModelTechnologieSection = ({ title = "Engagement Models to Hire Dedicated Node.js Developers", description = "ALPIXN offers versatile engagement models for Node.js application development services, providing innovative solutions. Get the best fit for your business.", models = defaultModels }: EngagementModelTechnologieSectionProps) => {
  const resolvedModels = models.length ? models : defaultModels;
  return (
    <Section id="engagement-models">
      <Heading id="engagement-models" kicker="Engagement models" title={title} subtitle={description} center />
      <ModelCards items={resolvedModels.map((m) => ({ title: m.title, description: m.description, bullets: m.bullets }))} />
    </Section>
  );
};

export default EngagementModelTechnologieSection;
