import { FeatureCards, GoldButton, Heading, Section } from "@/components/ui/v4";
import { getPartnerTeamData } from "@/lib/offshore developer/partner-team-data";
import type { OffshoreSimpleItemRecord } from "@/lib/content-types";

interface PartnerWithTeamProps {
  slug?: string;
  data?: {
    mainTitle: string;
    buttonText: string;
    buttonLink: string;
    items: OffshoreSimpleItemRecord[];
  };
}

const PartnerWithTeam = ({ slug = "default", data }: PartnerWithTeamProps) => {
  const fallbackData = getPartnerTeamData(slug);
  const { mainTitle, buttonText, buttonLink, items } = data ?? fallbackData;
  return (
    <Section id="partner-title" alt>
      <Heading id="partner-title" kicker="Why partner with us" kickerTone="blue" title={mainTitle} action={<GoldButton href={buttonLink || "/contact-us"}>{buttonText || "Talk with an expert"}</GoldButton>} />
      <FeatureCards cols={4} items={items.map((i) => ({ title: i.title, description: "description" in i ? i.description : i.text }))} />
    </Section>
  );
};

export default PartnerWithTeam;
