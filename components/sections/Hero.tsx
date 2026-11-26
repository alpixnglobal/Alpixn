import Image from "next/image";
import Link from "next/link";

const Hero = ({
  title = "Building Digital Solutions That Scale with You",
  description = "Custom software, AI, and web solutions tailored to your growth journey",
  primaryAction = { label: "Let’s Talk", href: "/contact-us" },
  secondaryAction = { label: "See Our Work", href: "/resources/portfolio" },
  heroImageData = "/images/hero.png",
}: {
  title?: string;
  description?: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  heroImageData?: string;
}) => {
  return (
    <section className="relative w-full min-h-[628px] md:h-[628px] overflow-hidden">
      {/* Background Color */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_left,var(--glow)_0%,var(--canvas-2)_70%)]"
        // style={{ background: "radial-gradient(circle, var(--canvas) 20%, var(--glow) 100%)" }}
        style={{ background: "radial-gradient(circle, var(--canvas) 15%, var(--glow) 100%)" }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/images/grid.svg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          opacity: 0.92,
        }}
      ></div>

      {/* Vectors */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/vector-top.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-90 transform -translate-y-28"
        />
        <Image src="/images/vector-middle.png" alt="" fill sizes="100vw" className="object-cover opacity-80 translate-y-8" />
        <Image
          src="/images/vector-bottom.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-60 translate-y-28"
        />
      </div>

      {/* Hero Image */}
      <div
        className="
    absolute
    right-0
    top-0
    h-full
    w-full
    md:w-[45%]
    md:max-w-160
    min-[1440px]:md:max-w-[640px]
  "
      >
        <Image
          src={heroImageData}
          alt="Hero"
          fill
          priority
          sizes="640px"
          className="
      object-cover
      object-bottom
      [mask-image:linear-gradient(to_left,black_60%,transparent_100%)]
    "
          unoptimized={heroImageData.startsWith("data:")}
        />
      </div>

      {/* Content */}
      <div className="relative z-30 h-full max-w-360 mx-auto flex flex-col md:flex-row items-center justify-center md:justify-start px-4 md:px-12">
        <div className="max-w-197.25 text-fg text-center sm:text-left mt-16 md:mt-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight heading-gradient text-left">
            {title}
          </h1>

          <p className="mt-5 text-base md:text-lg font-normal leading-relaxed text-left">
            {description}
          </p>

          <div className="mt-5 flex flex-col sm:flex-row gap-4 md:gap-6">
            <Link href={primaryAction.href} className="px-6.25 py-2.5 bg-primary text-white text-sm md:text-base font-medium leading-snug rounded-10 flex items-center justify-center gap-2.5 cursor-pointer">
              <div>{primaryAction.label}</div>
              <div className="relative w-3.5 h-3.5 lg:w-4 lg:h-4">
                <Image src="/icons/arrow-right.svg" fill alt="Arrow Right" />
              </div>
            </Link>

            <Link
              href={secondaryAction.href}
              className="px-6.25 py-2.5 text-fg text-sm md:text-base font-medium leading-snug rounded-10 flex items-center justify-center cursor-pointer"
              style={{
                background: "linear-gradient(360deg, var(--glow) 0%, var(--canvas-2) 100%)",
                border: "1.5px solid transparent",
                backgroundImage:
                  "linear-gradient(360deg, var(--glow) 0%, var(--canvas-2) 100%), linear-gradient(166.72deg, var(--tech) -20.31%, #FFFFFF 92.69%)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
              }}
            >
              {secondaryAction.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
