import Image from "next/image";

const WhyChooseUsSection = ({
  quote = "Not only would I hire them again without hesitation, but I will point out that after the first two test projects were done, they earned my repeat business and became the only contractors I worked with the whole time I was upgrading my site.",
  author = "KARL MARGRAIN",
  role = "Founder and Managing Director",
  managerImage = "/images/manager.png",
}: {
  quote?: string;
  author?: string;
  role?: string;
  managerImage?: string;
}) => {
  return (
    <section
      className="relative w-full py-[200px] overflow-hidden"
      style={{ background: "radial-gradient(circle, rgba(0, 7, 14, 1) 20%, rgba(0, 35, 72, 1) 100%)" }}
    >
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(circle, rgba(0,7,14,1) 75%, rgba(0,35,72,1) 100%)",
        }}
      />

      {/* Floating Ellipses */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[
          { size: 118, top: -20, left: 96 },
          { size: 162, top: 183, left: "92vw", mdLeft: 1800 },
          { size: 170, top: "79vh", left: -74, mdTop: 677, mdLeft: -74 },
          { size: 82, bottom: -40, right: 100 },
          { size: 320, top: 687, left: 1171, opacity: 0.5, blur: 250 },
          { size: 320, top: -20, left: 1183, opacity: 0.5, blur: 250 },
          { size: 320, top: 687, left: -91, opacity: 0.5, blur: 250 },
          { size: 320, top: -20, left: -79, opacity: 0.5, blur: 250 },
        ].map((ellipse, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${ellipse.size}px`,
              height: `${ellipse.size}px`,
              top: ellipse.top ?? "auto",
              left: ellipse.left ?? "auto",
              right: ellipse.right ?? "auto",
              bottom: ellipse.bottom ?? "auto",
              opacity: ellipse.opacity ?? 1,
              filter: `blur(${ellipse.blur ?? 2.25}px)`,
              background: ellipse.opacity
                ? "#389EFF"
                : "radial-gradient(71.79% 71.79% at 50% 28.21%, #389EFF 0%, #003098 100%)",
              boxShadow: ellipse.opacity
                ? "none"
                : "0px 0px 55px rgba(64,116,171,0.2), inset 0px -11px 27.7px rgba(0,0,0,0.25)",
            }}
          />
        ))}
      </div>

      {/* Testimonial Card */}
      <div className="relative z-10 max-w-[1013px] mx-auto px-4 sm:px-6 lg:px-0">
        {/* Desktop: Original 3D Card */}
        <div className="hidden lg:block perspective-[1200px]">
          <div
            className="relative rounded-[40px] border border-black overflow-hidden"
            style={{
              background:
                "linear-gradient(249.67deg, rgba(56,158,255,0.35) 0%, rgba(24,24,24,0) 49.04%, rgba(56,158,255,0.35) 100%)",
              transform: `
                translateX(40px)
                translateY(-30px)
                rotateY(20deg)
                rotateX(0deg)
                translateZ(10px)
              `,
              transformStyle: "preserve-3d",
            }}
          >
            <div className="w-full max-w-[832px] ml-[40px] py-[80px] px-[40px]">
              {/* QUOTES */}
              <div className="relative w-full max-w-w-[787px] ml-10">
                {/* Opening Quote */}
                <div className="absolute -top-6 -left-8">
                  <svg width="45" height="34" viewBox="0 0 45 36" fill="none">
                    <path
                      d="M45 35.6523L25 35.6523L25 15.8588L33.0201 0.000172699L42.9899 0.000171835L35.01 15.8588L45 15.8588L45 35.6523Z"
                      fill="#FFEA00"
                    />
                    <path
                      d="M20 35.6523L0 35.6523L0 15.8588L8.0201 0.000172699L17.9899 0.000171835L10.01 15.8588L20 15.8588L20 35.6523Z"
                      fill="#FFEA00"
                    />
                  </svg>
                </div>

                {/* Centered Text */}
                <p className="text-white text-base md:text-lg xl:text-xl font-normal text-center leading-relaxed w-[787px] p-5">
                  {quote}
                </p>

                {/* Closing Quote */}
                <div className="absolute -bottom-6 -right-5">
                  <svg width="45" height="34" viewBox="0 0 45 36" fill="none">
                    <path d="M0 0H20V19.7935L11.9799 35.6522H2.01005L9.98995 19.7935H0V0Z" fill="#FFEA00" />
                    <path d="M25 0H45V19.7935L36.9799 35.6522H27.0101L34.9899 19.7935H25V0Z" fill="#FFEA00" />
                  </svg>
                </div>
              </div>

              {/* Manager Info */}
              <div className="mt-12 w-full max-w-[285px] mx-auto lg:mx-0 flex flex-col items-center text-center">
                  <h3 className="text-base md:text-lg font-semibold leading-snug text-white">{author}</h3>

                  <p className="mt-[5px] text-sm md:text-base font-normal leading-relaxed text-white">{role}</p>

                {/* Stars */}
                <div className="mt-3 flex gap-[5px] justify-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="28" height="24" viewBox="0 0 12 12" fill="#FFEA00">
                      <path d="M6 0L7.694 4.29H11.413L8.359 7.416L9.053 11.708L6 9L2.947 11.708L3.641 7.416L0.587 4.29H4.306L6 0Z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet: Simple Card */}
        <div className="lg:hidden">
          <div
            className="relative rounded-[40px] border border-black overflow-hidden mx-auto max-w-[90%]"
            style={{
              background:
                "linear-gradient(249.67deg, rgba(56,158,255,0.35) 0%, rgba(24,24,24,0) 49.04%, rgba(56,158,255,0.35) 100%)",
            }}
          >
            <div className="py-[60px] px-[20px]">
              {/* QUOTES */}
              <div className="relative w-full">
                {/* Opening Quote */}
                <div className="absolute -top-4 -left-4">
                  <svg width="30" height="24" viewBox="0 0 45 36" fill="none">
                    <path
                      d="M45 35.6523L25 35.6523L25 15.8588L33.0201 0.000172699L42.9899 0.000171835L35.01 15.8588L45 15.8588L45 35.6523Z"
                      fill="#FFEA00"
                    />
                    <path
                      d="M20 35.6523L0 35.6523L0 15.8588L8.0201 0.000172699L17.9899 0.000171835L10.01 15.8588L20 15.8588L20 35.6523Z"
                      fill="#FFEA00"
                    />
                  </svg>
                </div>

                {/* Centered Text */}
                <p className="text-white text-base md:text-lg font-normal text-center leading-relaxed p-4">
                  {quote}
                </p>

                {/* Closing Quote */}
                <div className="absolute -bottom-4 -right-4">
                  <svg width="30" height="24" viewBox="0 0 45 36" fill="none">
                    <path d="M0 0H20V19.7935L11.9799 35.6522H2.01005L9.98995 19.7935H0V0Z" fill="#FFEA00" />
                    <path d="M25 0H45V19.7935L36.9799 35.6522H27.0101L34.9899 19.7935H25V0Z" fill="#FFEA00" />
                  </svg>
                </div>
              </div>

              {/* Manager Info */}
              <div className="mt-12 w-full max-w-[285px] mx-auto flex flex-col items-center text-center">
                  <h2 className="text-lg md:text-xl font-bold leading-snug text-white">{author}</h2>

                  <p className="mt-[5px] text-sm md:text-base font-normal leading-relaxed text-white">{role}</p>

                {/* Stars */}
                <div className="mt-3 flex gap-[5px] justify-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="20" height="18" viewBox="0 0 12 12" fill="#FFEA00">
                      <path d="M6 0L7.694 4.29H11.413L8.359 7.416L9.053 11.708L6 9L2.947 11.708L3.641 7.416L0.587 4.29H4.306L6 0Z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Manager Image - Desktop Only */}
        <div className="absolute top-[85%] right-[70px] -translate-y-1/2 z-30 hidden lg:block w-[235px] h-[235px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
          <Image src={managerImage} alt="Manager Photo" fill className="object-cover" unoptimized={managerImage.startsWith("data:") || managerImage.startsWith("http")} />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
