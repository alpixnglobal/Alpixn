import LogoLoop from "@/components/LogoLoop";
import { Button } from "@/components/ui/buttonBtn";
import type { TechnologyLogoRecord } from "@/lib/content-types";
import Image from "next/image";
import Link from "next/link";

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

const imageLogos = [
  { src: "/images/logoipsum.png", alt: "Logo Ipsum", href: "#" },
  { src: "/images/logoipsum.png", alt: "Logo Ipsum", href: "#" },
  { src: "/images/logoipsum.png", alt: "Logo Ipsum", href: "#" },
  { src: "/images/logoipsum.png", alt: "Logo Ipsum", href: "#" },
  { src: "/images/logoipsum.png", alt: "Logo Ipsum", href: "#" },
  { src: "/images/logoipsum.png", alt: "Logo Ipsum", href: "#" },
  { src: "/images/logoipsum.png", alt: "Logo Ipsum", href: "#" },
];

const TechnologiesHeroSection = ({
  subtitle = "Exceptional NodeJS Development for Ambitious Projects",
  title = "Futuristic Node Js Development Company",
  description = "Elevate your projects with Jellyfish Technologies, a premier Node.js development company. Our elite experts convert your ideas into high-performance solutions, delivering unparalleled innovation and precision for your success.",
  primaryButtonLabel = "Get Started",
  primaryButtonHref = "/contact-us",
  secondaryButtonLabel = "Book a Call With Our Expert",
  secondaryButtonHref = "/contact-us",
  logos = imageLogos.map((logo) => ({ label: logo.alt, imageData: logo.src, href: logo.href })),
}: TechnologiesHeroSectionProps) => {
  // Placeholder logos are filtered out so they are never presented as partners.
  const logoLoopItems = logos.filter((logo) => logo.imageData && !logo.imageData.includes("logoipsum")).map((logo) => ({ src: logo.imageData, alt: logo.label, href: logo.href }));

  return (
    <section className="relative w-full h-158 flex items-center xl:block overflow-hidden">
      {/* Background Base */}
      <div className="absolute inset-0 bg-canvas" />

      {/* Top Left Ellipse */}
      <div
        className="absolute -top-[10%] -left-[10%] w-[320px] h-80 rounded-full"
        style={{
          background: "var(--tech)",
          opacity: 0.53,
          filter: "blur(150px)",
        }}
      />
      {/* Top Right Ellipse */}
      <div
        className="absolute -top-[10%] -right-[10%] w-[320px] h-80 rounded-full"
        style={{
          background: "var(--tech)",
          opacity: 0.53,
          filter: "blur(150px)",
        }}
      />

      {/* Top Blur Rectangle */}
      <div
        className="absolute top-0 left-0 w-full h-10 pointer-events-none"
        style={{
          background: "var(--tech)",
          opacity: 0.66,
          filter: "blur(60px)",
          transform: "scaleY(-1)",
        }}
      />
      {/* Background Image */}
      <div className="absolute inset-0 bottom-[15%]">
        <Image src="/images/symbols.svg" fill priority alt="Tech Background" className="object-cover" />
      </div>
      {/* Bott
      {/* Bottom Logos */}
      {logoLoopItems.length ? <div className="absolute bottom-0 w-full h-12.25 bg-canvas  flex items-center">
        <LogoLoop
          logos={logoLoopItems}
          speed={90}
          direction="left"
          logoHeight={49}
          gap={50}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          ariaLabel="Technology partners"
        />
      </div> : null}

      {/* Content */}
      <div className="relative w-full max-w-289.75 mx-auto flex flex-col items-center gap-6 mb-16 xl:pt-38 px-4 lg:px-0">
        {/* Subtitle - Now using prop */}
        <h6 className="text-sm sm:text-base text-fg/85 text-left sm:text-center">{subtitle}</h6>

        {/* Title - Now using prop */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gradient font-extrabold leading-tight text-left sm:text-center">{title}</h1>

        {/* Description - Now using prop */}
        <p className="text-left sm:text-center text-xs sm:text-sm md:text-base font-normal leading-relaxed">
          {description}
        </p>

        {/* Buttons - Unchanged */}
        <div className="flex flex-col md:flex-row md:justify-center gap-3 sm:gap-4 lg:gap-6.25 w-full">
          <Link href={primaryButtonHref} className="w-full md:w-fit">
            <Button className="px-6.75 py-2.5 text-xs sm:text-base rounded-10 w-full md:w-fit flex cursor-pointer">
              {primaryButtonLabel}
              <Image
                src="/icons/arrow-right.svg"
                alt="Arrow Right"
                width={12}
                height={12}
                className="ml-2 sm:ml-2.5 w-3 h-3 sm:w-3.5 sm:h-3.5"
              />
            </Button>
          </Link>
          <Link
            href={secondaryButtonHref}
            className="px-6.25 py-2.5 text-fg text-sm lg:text-base font-medium rounded-10 flex items-center justify-center w-full md:w-fit cursor-pointer"
            style={{
              background: "linear-gradient(360deg, var(--glow) 0%, var(--canvas-2) 100%)",
              border: "1.5px solid transparent",
              backgroundImage:
                "linear-gradient(360deg, var(--glow) 0%, var(--canvas-2) 100%), linear-gradient(166.72deg, var(--tech) -20.31%, var(--heading-from) 92.69%)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }}
          >
            {secondaryButtonLabel}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TechnologiesHeroSection;
