import { GoldButton, Heading, NumberedList, Section } from "@/components/ui/v4";
import { getHireDeveloperData } from "@/lib/offshore developer/hire-developer-data";
import type { OffshoreSimpleItemRecord } from "@/lib/content-types";

interface HireDeveloperSectionProps {
  slug?: string;
  data?: {
    title: string;
    subtitle: string;
    services: OffshoreSimpleItemRecord[];
  };
}

const HireDeveloperSection = ({ slug = "default", data }: HireDeveloperSectionProps) => {
  const fallbackData = getHireDeveloperData(slug);
  const resolvedData = data ?? {
    title: fallbackData.title,
    subtitle: fallbackData.subtitle,
    services: fallbackData.services.map((service) => ({ title: service.title, description: service.desc })),
  };
  const { title, subtitle, services } = resolvedData;
  return (
    <Section id="hire-title">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <Heading id="hire-title" kicker="Services" title={title} subtitle={subtitle} />
          <div className="mt-7">
            <GoldButton href="/contact-us">Hire developers</GoldButton>
          </div>
        </div>
        <div className="lg:col-span-8">
          <NumberedList items={services} />
        </div>
      </div>
    </Section>
  );
};

export default HireDeveloperSection;
