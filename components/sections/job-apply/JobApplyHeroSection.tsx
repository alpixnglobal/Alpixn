type JobApplyHeroSectionProps = {
  title: string;
};

const JobApplyHeroSection = ({ title }: JobApplyHeroSectionProps) => {
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
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/images/lines.svg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover", 
          backgroundPosition: "center",
          opacity: 0.12, 
        }}
      ></div>

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
      <div className="relative mx-auto flex w-full max-w-[1295px] flex-col items-center gap-[25px] mt-32 lg:mt-39.25 z-10 px-4 xl:px-0">
        <h1 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gradient">Apply for {title}</h1>
      </div>
    </section>
  );
}

export default JobApplyHeroSection
