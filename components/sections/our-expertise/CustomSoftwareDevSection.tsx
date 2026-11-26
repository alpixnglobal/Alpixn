"use client";
import { GoldButton, Heading, NumberedList, Section } from "@/components/ui/v4";

import { getCustomSoftwareDevData } from "@/lib/expertise/custom-software-dev-section-data";
import type { ExpertiseBenefitRecord } from "@/lib/content-types";

interface CaseStudySectionProps {
  slug?: string;
  data?: {
    mainTitle: string;
    mainSubtitle: string;
    buttonText: string;
    buttonLink: string;
    image: string;
    imageAlt: string;
    benefits: ExpertiseBenefitRecord[];
  };
}

const CustomSoftwareDevSection = ({ slug = "software-development", data }: CaseStudySectionProps) => {
  const fallbackData = getCustomSoftwareDevData(slug);
  const resolvedData = data ?? {
    ...fallbackData,
    buttonLink: "/contact-us",
  };

  return (
    <Section id="benefits-title">
      <Heading
        id="benefits-title"
        kicker="Benefits"
        title={resolvedData.mainTitle}
        subtitle={resolvedData.mainSubtitle}
        action={<GoldButton href={resolvedData.buttonLink || "/contact-us"}>{resolvedData.buttonText || "Get expert guidance"}</GoldButton>}
      />
      <div className="mt-12">
        <NumberedList items={resolvedData.benefits.map((b) => ({ title: b.title, description: b.description }))} />
      </div>
    </Section>
  );
};

export default CustomSoftwareDevSection;
