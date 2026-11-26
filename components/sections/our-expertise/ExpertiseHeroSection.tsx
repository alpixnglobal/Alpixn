import { Button } from "@/components/ui/buttonBtn";
import Image from "next/image";
import Link from "next/link";

interface ExpertiseHeroSectionProps {
  title: string;
  description: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
  logos?: string[];
  heroBackgroundImage?: string
}

const ExpertiseHeroSection = ({
  title,
  description,
  ctaButtonText = "Book a Free Consultation",
  ctaButtonLink = "/contact-us",
  logos = ["/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png"],
  heroBackgroundImage = "/images/expertise-hero-bg.png",
}: ExpertiseHeroSectionProps) => {
  const resolvedLogos = logos.length > 0 ? logos : ["/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png"];
  const heroTitleClassName = `
    font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight
    bg-[linear-gradient(89.22deg,#FFFFFF_1.35%,#FFFFFF_58.47%,var(--tech-soft)_101.3%)]
    bg-clip-text text-transparent
  `;

  return (
    <section className="sectionDefault min-h-[630px] overflow-hidden">
      {/* Base Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle, var(--canvas) 15%, var(--glow) 100%)",
        }}
      />

      {/* Hero Image */}
      <div
        className="
          absolute right-0 top-0 h-full w-full
          md:w-[50%]
          max-md:w-full
          [mask-image:linear-gradient(to_left,black_50%,transparent_100%)]
        "
        style={{
          backgroundImage: `url(${heroBackgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "bottom center",
        }}
      />

      {/* Container */}
      <div className="container max-w-360">
        {/* Content */}
        <div
          className="
          relative h-full w-full max-w-183.75
          flex flex-col gap-5
          mt-[65px] ml-11.25
          max-lg:mt-24 max-lg:ml-10
          max-md:mt-20 max-md:ml-6
          max-sm:mt-16 max-sm:ml-4
        "
        >
          {/* Title */}
          <h1 className={heroTitleClassName}>
            {title}
          </h1>

          {/* Description */}
          <p
            className="
            font-normal text-base md:text-lg leading-relaxed text-fg
          "
          >
            {description}
          </p>

          {/* Button */}
          <Link href={ctaButtonLink}>
            <Button
              className="
              px-6 py-3 w-fit
              text-sm sm:text-base
              rounded-10
              flex items-center justify-center
              cursor-pointer
            "
              style={{ boxShadow: "0px 4px 6px 0px #0000001A inset" }}
            >
              {ctaButtonText}
              <Image
                src="/icons/arrow-right.svg"
                alt="Arrow Right"
                width={14}
                height={14}
                className="ml-2 w-3 h-3 sm:w-3.5 sm:h-3.5"
              />
            </Button>
          </Link>

          {/* Logos */}
          <div className="flex gap-6.25 max-md:flex-wrap max-md:gap-4">
            {resolvedLogos.filter(Boolean).map((logo, index) => (
              <Image
                key={index}
                src={logo}
                alt={`client logo ${index + 1}`}
                width={143}
                height={27}
                unoptimized={logo.startsWith("data:") || logo.startsWith("http")}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseHeroSection;
