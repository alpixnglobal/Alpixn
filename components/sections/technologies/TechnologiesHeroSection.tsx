import { TechHero } from "@/components/hero/HeroPanels";
import type { HomeTechStackItemRecord, TechnologyLogoRecord } from "@/lib/content-types";

interface TechnologiesHeroSectionProps {
  subtitle?: string;
  title?: string;
  description?: string;
  primaryButtonLabel?: string;
  primaryButtonHref?: string;
  secondaryButtonLabel?: string;
  secondaryButtonHref?: string;
  logos?: TechnologyLogoRecord[];
  icons?: HomeTechStackItemRecord[];
}

const TechnologiesHeroSection = ({
  subtitle,
  title = "Technology That Fits Your Product",
  description = "We choose proven languages, frameworks and cloud services for each project — and explain why — so your software stays fast, secure and easy to maintain.",
  primaryButtonLabel = "Get Started",
  primaryButtonHref = "/contact-us",
  secondaryButtonLabel = "Book a Call With Our Expert",
  secondaryButtonHref = "/contact-us",
  icons = [],
}: TechnologiesHeroSectionProps) => (
  <TechHero
    eyebrow="Technologies"
    title={title}
    subtitle={subtitle}
    description={description}
    primary={{ label: primaryButtonLabel, href: primaryButtonHref }}
    secondary={secondaryButtonLabel ? { label: secondaryButtonLabel, href: secondaryButtonHref } : null}
    icons={icons}
  />
);

export default TechnologiesHeroSection;
