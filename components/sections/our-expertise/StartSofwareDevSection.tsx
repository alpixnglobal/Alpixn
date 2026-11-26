import CtaBand from "@/components/sections/shared/CtaBand";
import { getStartDevelopmentData } from "@/lib/expertise/start-sofware-dev-section";

interface StartDevelopmentSectionProps {
  slug?: string;
  data?: {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
  };
}

const StartDevelopmentSection = ({ slug = "software-development", data }: StartDevelopmentSectionProps) => {
  const fallbackData = getStartDevelopmentData(slug);
  const { title, subtitle, buttonText, buttonLink } = data ?? { ...fallbackData, buttonLink: "/contact-us" };

  return <CtaBand eyebrow="Get started" title={title} description={subtitle} primary={{ label: buttonText, href: buttonLink }} secondary={{ label: "See our process", href: "/about" }} />;
};

export default StartDevelopmentSection;
