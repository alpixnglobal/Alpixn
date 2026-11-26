import { Heading, ModelCards, Section } from "@/components/ui/v4";
import type { ExpertiseEngagementModelRecord } from "@/lib/content-types";

const defaultModels: ExpertiseEngagementModelRecord[] = [
  {
    title: "Offshore Dedicated Team",
    description:
      "Our offshore dedicated team model functions as a Software Development Center. This exclusive team works on client projects, ensuring scalability, efficiency, cost-effectiveness, optimized delivery, and consistently high-quality results.",
    features: ["Client-Centric Approach", "Direct Reporting and Transparency", "Scalability and Flexibility", "Quality and Efficiency"],
  },
  {
    title: "Staff Augmentation",
    description:
      "Through this, we integrates software development experts into client teams. This model accelerates delivery, reduces risks, optimizes resources, and ensures measurable efficiency, productivity, and successful outcomes across lifecycles.",
    features: ["Tailored Expertise", "Seamless Integration", "Cost-Effective Solution", "Transparent Communication"],
  },
  {
    title: "Project-Based",
    description:
      "As a trusted software development agency, ALPIXN offers flexible engagement models tailored to meet specific customer objectives, ensuring effective collaboration, cost management, and value-oriented execution at every stage.",
    features: ["Fixed Budget", "Milestones and Deliverables", "Resource Allocation", "Risk Mitigation"],
  },
];

const EngagementModelExpertiseSection = ({
  title = "Engagement Models",
  subtitle =
    "As a trusted software development agency, ALPIXN offers flexible engagement models tailored to meet specific customer objectives, ensuring effective collaboration, cost management, and value-oriented execution at every stage.",
  models = defaultModels,
}: {
  title?: string;
  subtitle?: string;
  models?: ExpertiseEngagementModelRecord[];
}) => {
  const resolvedModels = models.length > 0 ? models : defaultModels;

  return (
    <Section id="engagement-models">
      <Heading id="engagement-models" kicker="Engagement models" title={title} subtitle={subtitle} center />
      <ModelCards items={resolvedModels.map((m) => ({ title: m.title, description: m.description, bullets: m.features }))} />
    </Section>
  );
};

export default EngagementModelExpertiseSection;
