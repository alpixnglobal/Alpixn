import Image from "next/image";

const WhatChooseUsSection = () => {
  return (
    <section
      className="w-full py-12.5"
      style={{
        background: "radial-gradient(circle, var(--canvas) 35%, var(--glow) 100%)",
      }}
    >
      {/* Container */}
      <div className="w-full max-w-337.75 mx-auto">
        {/* Title & Subtitle */}
        <h2 className="text-gradient heading text-[clamp(1.5rem,2.3vw,2.05rem)]">Transform Your Customer Engagement with ALPIXN AI Chatbot</h2>
        <p className="text-fg/80 font-normal text-base md:text-lg leading-relaxed text-center mt-3.75 px-4 lg:px-0">
          Trusted by businesses across industries, ALPIXN AI Chatbot is more than just an automated response tool. It’s a
          strategic partner in elevating customer satisfaction, reducing operational costs, and driving growth through
          intelligent customer interactions.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-12.5 px-4 xl:px-0">
          {/* Grid 1 */}
          <div
            className="relative flex flex-col gap-5 p-5 z-10"
            style={{
              borderRadius: "10px",
              background:
                "linear-gradient(249.67deg, color-mix(in srgb, var(--tech) 35%, transparent) 0%, rgba(24, 24, 24, 0) 49.04%, color-mix(in srgb, var(--tech) 35%, transparent) 100%)",
              border: "1px solid #FFFFFF26",
            }}
          >
            <h6 className="text-fg font-semibold text-xl">Organizations</h6>
            <p className="text-sm text-fg/80 leading-relaxed font-normal z-10">
              Streamline operations and enhance customer satisfaction with AI-powered, real-time support for seamless
              interactions.
            </p>
            <Image
              src="/icons/organisation.svg"
              alt="Organisation"
              width={97.48}
              height={104.44}
              className="absolute right-2 bottom-0 z-0"
            />
          </div>

          {/* Grid 2 */}
          <div
            className="relative flex flex-col gap-5 p-5 z-10"
            style={{
              borderRadius: "10px",
              background:
                "linear-gradient(249.67deg, color-mix(in srgb, var(--tech) 35%, transparent) 0%, rgba(24, 24, 24, 0) 49.04%, color-mix(in srgb, var(--tech) 35%, transparent) 100%)",
              border: "1px solid #FFFFFF26",
            }}
          >
            <h6 className="text-fg font-semibold text-xl">Educational Institutions</h6>
            <p className="text-sm text-fg/80 leading-relaxed font-normal z-10">
              Provide instant academic and administrative support 24/7, improving student engagement and leveling user
              satisfaction.
            </p>
            <Image
              src="/icons/education.svg"
              alt="Organisation"
              width={97.48}
              height={82.28}
              className="absolute right-2 bottom-0 z-0"
            />
          </div>

          {/* Grid 3 */}
          <div
            className="relative flex flex-col gap-5 p-5 z-10"
            style={{
              borderRadius: "10px",
              background:
                "linear-gradient(249.67deg, color-mix(in srgb, var(--tech) 35%, transparent) 0%, rgba(24, 24, 24, 0) 49.04%, color-mix(in srgb, var(--tech) 35%, transparent) 100%)",
              border: "1px solid #FFFFFF26",
            }}
          >
            <h6 className="text-fg font-semibold text-xl">Customer Support Teams</h6>
            <p className="text-sm text-fg/80 leading-relaxed font-normal z-10">
              Automate routine queries, reduce response times, and focus on more complex issues with AI-driven
              assistance.
            </p>
            <Image
              src="/icons/support.svg"
              alt="Organisation"
              width={91.01}
              height={91}
              className="absolute right-2 bottom-0 z-0"
            />
          </div>

          {/* Grid 4 */}
          <div
            className="relative flex flex-col gap-5 p-5 z-10"
            style={{
              borderRadius: "10px",
              background:
                "linear-gradient(249.67deg, color-mix(in srgb, var(--tech) 35%, transparent) 0%, rgba(24, 24, 24, 0) 49.04%, color-mix(in srgb, var(--tech) 35%, transparent) 100%)",
              border: "1px solid #FFFFFF26",
            }}
          >
            <h6 className="text-fg font-semibold text-xl">HR & Recruitment Teams</h6>
            <p className="text-sm text-fg/80 leading-relaxed font-normal z-10">
              Simplify candidate interactions, automate query responses, and ensure faster, more efficient hiring
              processes.
            </p>
            <Image
              src="/icons/hr.svg"
              alt="Organisation"
              width={97.48}
              height={97.48}
              className="absolute right-2 bottom-0 z-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatChooseUsSection;
