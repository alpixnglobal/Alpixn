import Image from "next/image";
import PageVisual, { type VisualKind } from "@/components/hero/PageVisuals";
import PageHero from "@/components/sections/shared/PageHero";

interface ExpertiseHeroSectionProps {
  title: string;
  description: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
  logos?: string[];
  heroBackgroundImage?: string;
  visual?: VisualKind;
}

const ExpertiseHeroSection = ({ title, description, ctaButtonText = "Book a Free Consultation", ctaButtonLink = "/contact-us", logos = [], visual = "code" }: ExpertiseHeroSectionProps) => {
  // Only real logos uploaded in the CMS are shown; placeholder artwork is never presented as clients.
  const resolvedLogos = logos.filter((logo) => logo && !logo.includes("logoipsum"));
  return (
    <PageHero
      eyebrow="Our expertise"
      title={title}
      description={description}
      primary={{ label: ctaButtonText, href: ctaButtonLink }}
      secondary={{ label: "Explore technologies", href: "/technologies" }}
      aside={<PageVisual kind={visual} />}
    >
      {resolvedLogos.length ? (
        <div className="mt-8 flex flex-wrap items-center gap-6 opacity-80">
          {resolvedLogos.map((logo, index) => (
            <Image key={index} src={logo} alt={`Client logo ${index + 1}`} width={110} height={36} unoptimized={logo.startsWith("data:") || logo.startsWith("http")} className="h-8 w-auto object-contain" />
          ))}
        </div>
      ) : null}
    </PageHero>
  );
};

export default ExpertiseHeroSection;
