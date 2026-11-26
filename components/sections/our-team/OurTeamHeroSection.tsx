type OurTeamHeroSectionProps = {
  title?: string;
  description?: string;
};

const OurTeamHeroSection = ({ title = "The Innovators, Creators, and Dreamers", description = "Our philosophy is simple, hire great people and give them the resources and support to do their best work." }: OurTeamHeroSectionProps) => {
  return (
    <section
      className="relative w-full h-[391px] overflow-hidden"
      style={{
        background: "radial-gradient(circle, rgba(0, 7, 14, 1) 15%, rgba(0, 35, 72, 1) 100%)",
      }}
    >
      {/* Gradient Blur Overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(56, 158, 255, 0.7) 0%, rgba(212, 33, 144, 0.35) 35%, rgba(0, 35, 72, 0.15) 100%)",
          filter: "blur(75px)",
        }}
      />

      {/* Container */}
      <div className="relative w-full max-w-197.75 mx-auto flex flex-col gap-[25px] items-center mt-10 sm:mt-32 lg:mt-[82px] z-10 px-4 xl:px-0">
        <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl heading-gradient-white leading-tight text-left sm:text-center">
          {title}
        </h1>
        <p className="text-sm md:text-base font-normal leading-relaxed text-white/90 text-center text-left sm:text-center">
          {description}
        </p>
      </div>
    </section>
  );
}

export default OurTeamHeroSection
