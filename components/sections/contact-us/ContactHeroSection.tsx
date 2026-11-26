import React from "react";

interface ContactHeroSectionProps {
  title?: string;
  description?: string;
}

const ContactHeroSection = ({
  title = "Your Digital Future",
  description = "Ready to transform your digital presence? We're here to help you achieve extraordinary results. Get in touch with our team of experts and let's discuss how we can accelerate your business growth.",
}: ContactHeroSectionProps) => {
  return (
    <section className="relative w-full h-[391px] overflow-hidden">
      {/* Background Color */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(circle, var(--canvas) 15%, var(--glow) 100%)" }}
      />

      {/* Rectangle 9545 */}
      <div
        className="absolute w-[1440px] h-[191px] left-0 top-[-150px]"
        style={{
          background: "#D42190",
          opacity: 0.66,
          filter: "blur(92.5px)",
          transform: "matrix(1, 0, 0, -1, , 0)",
        }}
      />

      {/* Rectangle 9544 */}
      <div
        className="absolute w-[1440px] h-[191px] left-0 top-[338px]"
        style={{
          background: "var(--tech)",
          opacity: 0.66,
          filter: "blur(72.5px)",
        }}
      />

      {/* Ellipse 27 */}
      <div
        className="absolute w-[320px] h-[320px] left-[1183px] top-[143px]"
        style={{
          background: "linear-gradient(180deg, #D42190 0%, var(--tech) 100%)",
          opacity: 0.53,
          filter: "blur(250px)",
        }}
      />

      {/* Ellipse 26 */}
      <div
        className="absolute w-[320px] h-[320px] left-[-79px] top-[143px]"
        style={{
          background: "linear-gradient(180deg, #D42190 0%, var(--tech) 100%)",
          opacity: 0.53,
          filter: "blur(250px)",
        }}
      />

      {/* Container */}
      <div className="relative w-full max-w-[949px] mx-auto">
        <div className="flex flex-col gap-[25px] mt-[108.5px] px-4 xl:px-0">
          <h1 className="text-3xl sm:text-4xl md:text-[38px] lg:text-[46px] font-extrabold leading-tight text-left sm:text-center">
            {title}
          </h1>
          <p className="font-normal text-sm sm:text-base md:text-lg leading-relaxed text-left sm:text-center">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactHeroSection;
