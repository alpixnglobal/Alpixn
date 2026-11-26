type IntensAlumniHeroSectionProps = {
  title?: string;
  description?: string;
};

const IntensAlumniHeroSection = ({ title = "Our Internship Candidates", description = "We’re proud of our interns who started their journey with Axano Software Private Limited and successfully completed their training with us. Here are some of our amazing achievers!" }: IntensAlumniHeroSectionProps) => {
  return (
    <section
      className="relative w-full h-[391px] overflow-hidden"
      style={{
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
          background: "linear-gradient(0deg, var(--gold), var(--gold))",
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
          background: "linear-gradient(0deg, var(--gold), var(--gold))",
          opacity: "0.71",
          filter: "blur(202.85px)",
        }}
      ></div>

      {/* Container */}
      <div className="relative w-full max-w-[1295px] mx-auto flex flex-col gap-[25px] items-center mt-10 sm:mt-32 lg:mt-28.75 z-10 px-4 xl:px-0">
         <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[2.4rem] text-left sm:text-center text-gradient leading-tight">{title}</h1>
         <p className="text-sm md:text-base font-normal leading-relaxed text-left sm:text-center text-fg/90">
           {description}
         </p>
       </div>
    </section>
  );
}

export default IntensAlumniHeroSection
