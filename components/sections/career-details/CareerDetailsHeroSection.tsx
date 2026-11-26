type CareerDetailsHeroSectionProps = {
    title: string;
    type: string;
    location: string;
    salary: string;
};

const CareerDetailsHeroSection = ({ title, type, location, salary }: CareerDetailsHeroSectionProps) => {
  return (
    <section
      className="relative w-full h-[391px] overflow-hidden"
      style={{
        // background: "radial-gradient(circle, var(--canvas) 55%, var(--glow) 100%)"
        // background: "var(--canvas)",
        //   background: "var(--canvas)",
        // background: "linear-gradient(90deg,rgba(2, 0, 36, 1) 20%, rgba(9, 9, 121, 1) 35%, rgba(2, 0, 36, 1) 80%)",
        // background: "linear-gradient(180deg, var(--canvas) -7.46%, color-mix(in srgb, var(--glow) 15%, transparent) 100%)"
        background: "radial-gradient(circle, var(--canvas) 15%, var(--glow) 100%)",
      }}
    >
      {/* First Ellipse (Pink - Top Left) */}
      <div
        className="absolute"
        style={{
          width: "25vw",
          height: "107%",
          left: "-5%",
          top: "-59%",
          background: "linear-gradient(0deg, #D42190, #D42190)",
          opacity: "0.71",
          filter: "blur(202.85px)",
        }}
      ></div>

      {/* Second Ellipse (Blue - Bottom Left) */}
      <div
        className="absolute"
        style={{
          width: "29vw",
          height: "83%",
          left: "-7%",
          top: "103%",
          background: "linear-gradient(0deg, var(--tech), var(--tech))",
          opacity: "0.71",
          filter: "blur(202.85px)",
        }}
      ></div>

      {/* Third Ellipse (Blue - Top Right) */}
      <div
        className="absolute"
        style={{
          width: "29vw",
          height: "83%",
          right: "-7%",
          top: "-29%",
          background: "linear-gradient(0deg, var(--tech), var(--tech))",
          opacity: "0.71",
          filter: "blur(202.85px)",
        }}
      ></div>

      {/* Fourth Ellipse (Pink - Bottom Right) */}
      <div
        className="absolute"
        style={{
          width: "25vw",
          height: "107%",
          right: "-5%",
          top: "89%",
          background: "linear-gradient(0deg, #D42190, #D42190)",
          opacity: "0.71",
          filter: "blur(202.85px)",
        }}
      ></div>

      {/* Container */}
      <div className="relative w-full max-w-[1295px] mx-auto flex flex-col gap-[25px] mt-32 lg:mt-33.75 z-10 px-4 xl:px-0">
        <h1 className="font-extrabold text-2xl sm:text-3xl md:text-[32px] lg:text-[40px] text-left sm:text-center heading-gradient-white leading-tight">{title}</h1>
        <div className="flex flex-wrap sm:justify-center mt-4 lg:mt-0 gap-2.5 sm:gap-0">
          <div className="sm:px-3.5 lg:border-r border-fg/20 font-normal text-sm md:text-base text-fg/80">
            {type}
          </div>
          <div className="px-3.5 lg:border-r border-fg/20 font-normal text-sm md:text-base text-fg/80">
            {location}
          </div>
          <div className="sm:pl-3.5 border-fg/20 font-normal text-sm md:text-base text-fg/80">
            {salary}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CareerDetailsHeroSection
