import { FeatureCards, Heading, Section } from "@/components/ui/v4";
import { getExcellenceOfferingsData } from "@/lib/offshore developer/excellence-offerings-data";
import type { OffshoreCardWithImageRecord } from "@/lib/content-types";



interface ExcellenceOfDevProps {
  slug?: string;
  data?: {
    mainTitle: string;
    mainSubtitle: string;
    offerings: OffshoreCardWithImageRecord[];
  };
}

const ExcellenceOfDev = ({ slug = "default", data }: ExcellenceOfDevProps) => {
  const fallbackData = getExcellenceOfferingsData(slug);
  const resolvedData = data ?? {
    mainTitle: fallbackData.mainTitle,
    mainSubtitle: fallbackData.mainSubtitle,
    offerings: fallbackData.offerings.map((offering) => ({ title: offering.title, description: offering.description })),
  };
  const { mainTitle, mainSubtitle, offerings } = resolvedData;
  return (
    <Section id="excellence-title">
      <Heading id="excellence-title" kicker="What our developers build" title={mainTitle} subtitle={mainSubtitle} center />
      <FeatureCards cols={4} items={offerings.map((o) => ({ title: o.title, description: o.description }))} />
    </Section>
  );
};

export default ExcellenceOfDev;
