import { LogoLoop } from "@/components/LogoLoop";
import { partnerLogos } from "@/lib/offshore developer/partners-logo-data";
import type { TechnologyLogoRecord } from "@/lib/content-types";

const PartnersLogo = ({ logos }: { logos?: TechnologyLogoRecord[] }) => {
  const resolvedLogos = logos?.length
    ? logos.map((logo) => ({ src: logo.imageData, alt: logo.label, href: logo.href }))
    : partnerLogos;

  return (
    <section className="relative w-full bg-[#02070d] h-20 lg:h-[149px] flex items-center">
      <LogoLoop
        logos={resolvedLogos}
        speed={90}
        direction="left"
        logoHeight={49}
        gap={50}
        hoverSpeed={0}
        scaleOnHover
        fadeOut
        ariaLabel="Technology partners"
      />
    </section>
  );
};

export default PartnersLogo;
