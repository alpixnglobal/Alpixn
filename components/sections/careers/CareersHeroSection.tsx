type CareersHeroSectionProps = {
  title?: string;
  description?: string;
};

const CareersHeroSection = ({ title = "Innovate With Us", description = "We create solutions for remote teams. If you enjoy solving problems, you can make a difference." }: CareersHeroSectionProps) => {
  return (
    <section className="relative w-full min-h-[400px] lg:min-h-[630px] overflow-hidden py-12.5">
      {/* Base Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle, rgba(0, 7, 14, 1) 15%, rgba(0, 35, 72, 1) 100%)",
        }}
      />

      {/* DESKTOP ELLIPSE 45 */}
      <div
        className="absolute rounded-full pointer-events-none hidden lg:block careers-earth-ring"
        style={{
          width: "calc(1366px * (100vw / 1440))",
          height: "calc(1366px * (100vw / 1440))",
          maxWidth: "1600px",
          maxHeight: "1600px",
          minWidth: "1200px",
          minHeight: "1200px",
          left: "50%",
          top: "361px",
          transform: "translateX(-50%)",
          background: "linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.11) 8.13%)",
          padding: "4px",
          animation: "careers-earth-open 2s cubic-bezier(0.22, 1, 0.36, 1) both, careers-earth-ring 14s ease-in-out 2s infinite",
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: "linear-gradient(180deg, rgba(0, 35, 72, 0.92) -7.03%, #00070E 20.94%)",
            boxShadow: "inset 0px 5px 126px rgba(56, 158, 255, 0.88), inset 0px 69px 78px rgba(20, 39, 170, 0.1)",
          }}
        />
      </div>

      {/* MOBILE / TABLET ELLIPSE 45 */}
      <div
        className="absolute rounded-full pointer-events-none lg:hidden careers-earth-ring"
        style={{
          width: "160vw",
          height: "160vw",
          left: "50%",
          top: "55%",
          transform: "translateX(-50%)",
          background: "linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.11) 8.13%)",
          padding: "3px",
          animation: "careers-earth-open 2s cubic-bezier(0.22, 1, 0.36, 1) both, careers-earth-ring 14s ease-in-out 2s infinite",
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: "linear-gradient(180deg, rgba(0, 35, 72, 0.92) -7.03%, #00070E 20.94%)",
            boxShadow: "inset 0px 5px 90px rgba(56, 158, 255, 0.8), inset 0px 40px 60px rgba(20, 39, 170, 0.1)",
          }}
        />
      </div>

      {/* DESKTOP ELLIPSE 46  */}
      <div
        className="absolute rounded-full pointer-events-none hidden lg:block careers-earth-glow"
        style={{
          width: "calc(1328px * (100vw / 1440))",
          height: "calc(1328px * (100vw / 1440))",
          maxWidth: "1550px",
          maxHeight: "1550px",
          minWidth: "1150px",
          minHeight: "1150px",
          left: "50%",
          top: "461px",
          transform: "translateX(-50%)",
          background: "#389EFF",
          filter: "blur(100px)",
          opacity: 0.72,
          animation: "careers-earth-open 2.2s cubic-bezier(0.22, 1, 0.36, 1) both, careers-earth-glow 12s ease-in-out 2.2s infinite",
        }}
      />

      {/* MOBILE / TABLET ELLIPSE 46 */}
      <div
        className="absolute rounded-full pointer-events-none lg:hidden careers-earth-glow"
        style={{
          width: "150vw",
          height: "150vw",
          left: "50%",
          top: "62%",
          transform: "translateX(-50%)",
          background: "#389EFF",
          filter: "blur(90px)",
          opacity: 0.68,
          animation: "careers-earth-open 2.2s cubic-bezier(0.22, 1, 0.36, 1) both, careers-earth-glow 12s ease-in-out 2.2s infinite",
        }}
      />

      {/* Dawn sweep and light bloom to create an opening-morning feel */}
      <div className="pointer-events-none absolute inset-0 careers-dawn-sweep" />
      <div className="pointer-events-none absolute inset-0 careers-dawn-light" />

      {/* Soft contrast veil to keep hero copy readable over glowing ellipses */}
      <div className="pointer-events-none absolute inset-0 careers-dawn-veil bg-[radial-gradient(circle_at_50%_34%,rgba(2,7,16,0.58)_0%,rgba(2,7,16,0.36)_32%,rgba(2,7,16,0)_68%)]" />

      {/* Content */}
      <div className="container max-w-[735px] relative z-10">
        <div className="flex flex-col gap-[30px] mt-[34px] lg:mt-[72px]">
          <h1 className="heading-gradient-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-left sm:text-center [text-shadow:0_4px_26px_rgba(0,0,0,0.55)]">
            {title}
          </h1>

          <p className="max-w-[680px] text-base md:text-lg font-normal leading-relaxed text-white/90 text-left sm:mx-auto sm:text-center [text-shadow:0_2px_16px_rgba(0,0,0,0.45)]">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CareersHeroSection;
