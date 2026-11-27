import Image from "next/image";
import { Button } from "../ui/buttonBtn";

const HeroSection = () => {
  return (
    <section
      className="relative w-full overflow-hidden max-h-[628px] max-w-[1440px]"
      style={{
        background: "radial-gradient(circle, var(--canvas-2) 1.27%, var(--glow) 98.73%)",
      }}
    >
      {/* BACKGROUND PNG ELLIPSES  */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {/* Top ellipse */}
        <Image
          src="/images/vector-up.png"
          alt="Top ellipse"
          width={1351}
          height={550}
          className="absolute top-[-117px] left-[127px] opacity-90"
        />

        {/* Middle ellipse */}
        <Image
          src="/images/vector-middle.png"
          alt="Middle ellipse"
          width={1498}
          height={548}
          className="absolute top-[109px] left-[-28px] opacity-90"
        />

        {/* Bottom ellipse */}
        <Image
          src="/images/vector-bottom.png"
          alt="Bottom ellipse"
          width={1498}
          height={548}
          className="absolute top-[324px] left-[760px] opacity-70"
        />
      </div>

      {/*  HERO IMAGE  */}
      <div className="absolute left-300 top-0 h-full w-[651px]">
        <Image src="/images/hero.png" alt="Hero" fill className="object-cover " priority />
      </div>

      {/*  CONTENT CONTAINER  */}
      <div className="relative z-20 container mx-auto grid min-h-[628px] items-center">
        {/* Left Column */}
        <div className="flex flex-col items-start ml-[45px] max-w-[789px]">
          <h1 className="text-fg font-extrabold leading-tight text-[clamp(1.55rem,2.5vw,2.2rem)]">
            Building Digital Solutions That Scale with You
          </h1>

          <p className="mt-5 mb-8 text-fg font-normal text-base md:text-lg leading-relaxed">
            Custom software, AI, and web solutions tailored to your growth journey
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
            <Button>
              Let&apos;s Talk
              <Image src="/icons/arrow-right.svg" alt="Arrow Right" width={14} height={14} className="ml-2.5" />
            </Button>

            <Button variant="outlined">See Our Work</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
