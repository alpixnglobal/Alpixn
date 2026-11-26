type PortfolioDetailsHeroSectionProps = {
    title : string;
    description: string
}

const PortfolioDetailsHeroSection = ({title, description}: PortfolioDetailsHeroSectionProps) => {
  return (
    <section
      className="relative w-full h-[391px] overflow-hidden"
      style={{
        background: "radial-gradient(circle, var(--canvas) 15%, var(--glow) 100%)",
      }}
    >
      {/* Ellipse Right */}
      <div
        className="absolute pointer-events-none hidden md:block"
        style={{
          width: "320px",
          height: "320px",
          right: "-5%",
          top: "36.6%", // 143px / 391px ≈ 36.6%
          background: "linear-gradient(180deg, var(--gold) 0%, var(--tech) 0%)",
          opacity: "1",
          filter: "blur(250px)",
        }}
      />

      {/* Ellipse Left */}
      <div
        className="absolute pointer-events-none hidden md:block"
        style={{
          width: "320px",
          height: "320px",
          left: "-5%",
          top: "36.6%", // 143px / 391px ≈ 36.6%
          background: "linear-gradient(180deg, var(--gold) 0%, var(--tech) 0%)",
          opacity: "1",
          filter: "blur(250px)",
        }}
      />

      {/* Gradient Blur Overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--glow) 15%, transparent) 7.02%, rgba(212, 33, 144, 0.25) 69.23%, color-mix(in srgb, var(--tech) 20%, transparent) 97.81%)",
          backdropFilter: "blur(150px)",
        }}
      />

      {/* Container */}
      <div className="relative w-full max-w-[1080px] mx-auto flex flex-col gap-[25px] items-center mt-10 sm:mt-32 lg:mt-[82px]  z-10 px-4 xl:px-0">
        <h1 className="font-extrabold text-2xl sm:text-3xl md:text-[34px] lg:text-[42px] text-left sm:text-center text-gradient leading-tight lg:whitespace-nowrap">
          {title}
        </h1>
        <p className="text-sm md:text-base leading-relaxed text-left sm:text-center font-normal">
          {description}
        </p>
      </div>
    </section>
  );
}

export default PortfolioDetailsHeroSection
