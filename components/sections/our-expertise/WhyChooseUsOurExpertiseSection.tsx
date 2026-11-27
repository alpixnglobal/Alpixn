import { FeatureCards, Heading, Section } from "@/components/ui/v4";
import { getWhyChooseUsData } from "@/lib/expertise/why-choose-us-our-expertise-section-data";
import type { ExpertiseFeatureCardRecord } from "@/lib/content-types";

interface CaseStudySectionProps {
  slug?: string;
  data?: {
    mainTitle: string;
    mainSubtitle: string;
    features: ExpertiseFeatureCardRecord[];
  };
}

const WhyChooseUsOurExpertiseSection = ({ slug = "software-development", data }: CaseStudySectionProps) => {
  const fallbackData = getWhyChooseUsData(slug);
  const resolvedData = data ?? {
    mainTitle: fallbackData.mainTitle,
    mainSubtitle: fallbackData.mainSubtitle,
    features: fallbackData.features.map((feature) => ({ ...feature, iconRightClass: feature.iconRightClass ?? "" })),
  };

  return (
    <Section id="why-choose-title" alt>
      <Heading id="why-choose-title" kicker="Solutions" kickerTone="blue" title={resolvedData.mainTitle} subtitle={resolvedData.mainSubtitle} center />
      <FeatureCards cols={resolvedData.features.length % 4 === 0 ? 4 : resolvedData.features.length === 2 ? 2 : 3} items={resolvedData.features.map((f) => ({ title: f.title, description: f.description }))} />
    </Section>
  );
};

export default WhyChooseUsOurExpertiseSection;
