import { Heading, ModelCards, Section } from "@/components/ui/v4";
import { getEngagementModelsData } from "@/lib/offshore developer/engagement-models-data";
import type { OffshoreEngagementModelRecord } from "@/lib/content-types";

interface EngagementModelSectionProps {
  slug?: string;
  data?: {
    mainTitle: string;
    mainSubtitle: string;
    models: OffshoreEngagementModelRecord[];
  };
}

const EngagementModelSection = ({ slug = "default", data }: EngagementModelSectionProps) => {
  const fallbackData = getEngagementModelsData(slug);
  const { mainTitle, mainSubtitle, models } = data ?? fallbackData;
  return (
    <Section id="engagement-models" alt>
      <Heading id="engagement-models" kicker="Engagement models" title={mainTitle} subtitle={mainSubtitle} center />
      <ModelCards items={models.map((m) => ({ title: m.title, description: m.description, bullets: m.features }))} />
    </Section>
  );
};

export default EngagementModelSection;
