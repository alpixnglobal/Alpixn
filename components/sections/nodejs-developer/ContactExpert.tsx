import CtaBand from "@/components/sections/shared/CtaBand";
import { getContactExpertData } from "@/lib/offshore developer/contact-expert-data";

interface ContactExpertProps {
  slug: string;
  overrideTitle?: string;
  overrideButtonText?: string;
  overrideButtonLink?: string;
}

const ContactExpert = ({ slug, overrideTitle, overrideButtonText, overrideButtonLink }: ContactExpertProps) => {
  const data = getContactExpertData(slug);
  const title = overrideTitle || data.title;
  const buttonText = overrideButtonText || data.buttonText;
  const buttonLink = overrideButtonLink || data.buttonLink;

  return <CtaBand compact eyebrow={null} title={title} primary={{ label: buttonText, href: buttonLink }} secondary={{ label: "Explore our services", href: "/our-expertise" }} />;
};

export default ContactExpert;
