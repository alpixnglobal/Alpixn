import { Button } from "@/components/ui/buttonBtn";
import Image from "next/image";
import Link from "next/link";

const AboutHeroSection = ({
  title = "Empowering Businesses Through Innovation and Intelligence",
  description = "From strategy to execution, ALPIXN empowers organizations to achieve more through cutting-edge technology and smart automation.",
  primaryAction = { label: "Explore Services", href: "/our-expertise" },
  secondaryAction = { label: "Get in Touch", href: "/contact-us" },
}: {
  title?: string;
  description?: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
}) => {
  return (
    <section className="relative w-full h-124 md:h-164">
      {/* Backgtound Color */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(circle, var(--canvas) 15%, var(--glow) 100%)" }}
      />

      {/* Bg Image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/images/about-background.svg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          opacity: 0.92,
        }}
      ></div>

      <div className="relative flex flex-col gap-[25px] w-full max-w-[939px] items-center justify-center mx-auto pt-20 md:pt-35 px-4 xl:px-0">
        {/* Heading */}
        <h1
          className="w-full max-w-[980px] pb-1 font-extrabold leading-[1.16] text-left sm:text-center break-words text-[clamp(1.85rem,3.3vw,2.9rem)]"
          style={{
            background: "linear-gradient(89.81deg, var(--heading-from) 19.79%, var(--heading-from) 76.65%, var(--tech-soft) 93.54%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          {title === "Empowering Businesses Through Innovation and Intelligence" ? (
            <>
              <span className="block md:whitespace-nowrap">Empowering Businesses Through</span>
              <span className="block md:whitespace-nowrap">Innovation and Intelligence</span>
            </>
          ) : (
            title
          )}
        </h1>

        {/* Subtitle */}
        <p className="text-left sm:text-center text-base md:text-lg font-normal leading-relaxed text-fg sm:max-w-[90%] lg:max-w-full">
          {description}
        </p>

        {/* Buttons  */}
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 lg:gap-[25px] w-full md:w-auto">
          <Link href={primaryAction.href} className="w-full md:w-auto px-6.25 py-2.5 bg-primary text-[#071a33] text-sm md:text-base font-medium leading-snug rounded-10 flex items-center justify-center gap-2.5 cursor-pointer">
            <div>{primaryAction.label}</div>
            <div className="relative w-3.5 h-3.5 lg:w-4 lg:h-4">
              <Image src="/icons/arrow-right.svg" fill alt="Arrow Right" />
            </div>
          </Link>
          <Link
            href={secondaryAction.href}
            className="w-full md:w-auto px-6.25 py-2.5 text-fg text-sm md:text-base font-medium leading-snug rounded-10 flex items-center justify-center cursor-pointer"
            style={{
              background: "linear-gradient(360deg, var(--glow) 0%, var(--canvas-2) 100%)",
              border: "1.5px solid transparent",
              backgroundImage:
                "linear-gradient(360deg, var(--glow) 0%, var(--canvas-2) 100%), linear-gradient(166.72deg, var(--tech) -20.31%, var(--heading-from) 92.69%)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }}
          >
            {secondaryAction.label}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;
