import Image from "next/image";
import HeroBrandPanel from "@/components/sections/shared/HeroBrandPanel";
import PageHero from "@/components/sections/shared/PageHero";
import type { TechnologyLogoRecord } from "@/lib/content-types";

interface TechnologiesHeroSectionProps {
  subtitle?: string;
  title?: string;
  description?: string;
  primaryButtonLabel?: string;
  primaryButtonHref?: string;
  secondaryButtonLabel?: string;
  secondaryButtonHref?: string;
  logos?: TechnologyLogoRecord[];
}

const TechnologiesHeroSection = ({
  subtitle,
  title = "Technology That Fits Your Product",
  description = "We choose proven languages, frameworks and cloud services for each project — and explain why — so your software stays fast, secure and easy to maintain.",
  primaryButtonLabel = "Get Started",
  primaryButtonHref = "/contact-us",
  secondaryButtonLabel = "Book a Call With Our Expert",
  secondaryButtonHref = "/contact-us",
  logos = [],
}: TechnologiesHeroSectionProps) => {
  // Placeholder logos are filtered out so they are never presented as partners.
  const realLogos = logos.filter((logo) => logo.imageData && !logo.imageData.includes("logoipsum"));
  return (
    <PageHero
      eyebrow="Technologies"
      title={title}
      description={
        <>
          {subtitle ? <span className="mb-2 block font-semibold text-fg">{subtitle}</span> : null}
          {description}
        </>
      }
      primary={{ label: primaryButtonLabel, href: primaryButtonHref }}
      secondary={secondaryButtonLabel ? { label: secondaryButtonLabel, href: secondaryButtonHref } : null}
      aside={<HeroBrandPanel />}
    >
      {realLogos.length ? (
        <div className="mt-8 flex flex-wrap items-center gap-6 opacity-80">
          {realLogos.map((logo) => (
            <Image key={logo.label} src={logo.imageData} alt={logo.label} width={110} height={36} unoptimized className="h-8 w-auto object-contain" />
          ))}
        </div>
      ) : null}
    </PageHero>
  );
};

export default TechnologiesHeroSection;
