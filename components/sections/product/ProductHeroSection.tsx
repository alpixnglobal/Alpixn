import { Button } from "@/components/ui/buttonBtn";
import Image from "next/image";
import Link from "next/link";

interface ProductHeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

const ProductHeroSection = ({
  title = "JFT AI Chatbot",
  subtitle = "Enhance Business Agility and Customer Support Operations",
  description = "A transformative AI-powered chatbot solution designed to enhance customer engagement, streamline support, and boost conversion rates through intelligent, real-time interactions.",
  buttonLabel = "Book Your Demo",
  buttonHref = "/contact-us",
}: ProductHeroSectionProps) => {
  return (
    <section className="sectionDefault h-fit lg:h-164 overflow-hidden">
      {/* Background Color */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg,rgba(2, 0, 36, 1) 20%, rgba(9, 9, 121, 1) 35%, rgba(2, 0, 36, 1) 80%)",
        }}
      />

      {/* Decorative Ellipses - Corners */}
      {/* Top Left */}
      <div
        className="absolute z-0 pointer-events-none"
        style={{
          width: "284px",
          height: "284px",
          top: "-115px",
          left: "-56px",
          background: "var(--tech)",
          opacity: 1,
          filter: "blur(500px)",
          borderRadius: "50%",
        }}
      />

      {/* Top Right */}
      <div
        className="absolute z-0 pointer-events-none"
        style={{
          width: "284px",
          height: "284px",
          top: "-115px",
          left: "1220px",
          background: "var(--tech)",
          opacity: 1,
          filter: "blur(500px)",
          borderRadius: "50%",
        }}
      />

      {/* Bottom Left */}
      <div
        className="absolute z-0 pointer-events-none"
        style={{
          width: "254px",
          height: "254px",
          top: "582px",
          left: "-56px",
          background: "var(--tech)",
          opacity: 1,
          filter: "blur(500px)",
          borderRadius: "50%",
        }}
      />

      {/* Bottom Right */}
      <div
        className="absolute z-0 pointer-events-none"
        style={{
          width: "254px",
          height: "254px",
          top: "582px",
          left: "1220px",
          background: "var(--tech)",
          opacity: 1,
          filter: "blur(500px)",
          borderRadius: "50%",
        }}
      />

      {/* Vectors */}
      {/* 1 */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "460px",
          height: "326px",
          top: "532px",
          left: "50%",
          transform: "translateX(0%) translateX(-376px)",
          background: "linear-gradient(0deg, var(--tech), var(--tech))",
          opacity: 0.71,
          filter: "blur(202.85px)",
        }}
      />

      {/* 2 */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "460px",
          height: "326px",
          top: "-143px",
          left: "50%",
          transform: "translateX(0%) translateX(27px)",
          background: "linear-gradient(0deg, var(--tech), var(--tech))",
          opacity: 0.71,
          filter: "blur(202.85px)",
        }}
      />

      {/* 3 */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "404px",
          height: "420px",
          top: "496px",
          left: "50%",
          transform: "translateX(-0%) translateX(-58px)",
          background: "linear-gradient(0deg, #D42190, #D42190)",
          opacity: 0.71,
          filter: "blur(202.85px)",
        }}
      />

      {/* 4 */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "433px",
          height: "418px",
          top: "497px",
          left: "50%",
          transform: "translateX(-0%) translateX(-691px)",
          background: "linear-gradient(0deg, var(--glow), var(--glow))",
          opacity: 0.71,
          filter: "blur(166.15px)",
        }}
      />

      {/* 5 */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "460px",
          height: "326px",
          top: "543px",
          left: "50%",
          transform: "translateX(-0%) translateX(314px)",
          background: "linear-gradient(0deg, var(--glow), var(--glow))",
          opacity: 0.71,
          filter: "blur(166.15px)",
        }}
      />

      {/* 6 */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "404px",
          height: "420px",
          top: "-190px",
          left: "50%",
          transform: "translateX(0%) translateX(-443px)",
          background: "linear-gradient(0deg, #D42190, #D42190)",
          opacity: 0.71,
          filter: "blur(202.85px)",
        }}
      />

      {/* Container */}
      <div className="container max-w-[237.25rem] flex flex-col gap-[25px] sm:items-center pt-0 lg:pt-36.5 z-10">
        {/* Subtitle */}
        <h6 className="text-fg/85 text-sm md:text-base">{subtitle}</h6>

        {/* Title */}
        <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gradient leading-tight">{title}</h1>

        {/* Description */}
        <p className="text-sm md:text-base leading-relaxed font-normal max-w-[949px] text-left sm:text-center">
          {description}
        </p>

        {/* Button */}
        <Link href={buttonHref}>
          <Button className="px-6.25 py-2.5 sm:px-8 sm:py-4 text-xs sm:text-base rounded-10 flex items-center justify-center cursor-pointer">
            {buttonLabel}
            <Image
              src="/icons/arrow-right.svg"
              alt="Arrow Right"
              width={14}
              height={14}
              className="ml-2 sm:ml-2.5 w-3 h-3 sm:w-3.5 sm:h-3.5"
            />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ProductHeroSection;
