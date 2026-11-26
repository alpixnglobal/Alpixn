import Image from "next/image";
import React from "react";

type OffshoreTestimonial = {
  quote: string;
  name: string;
  role: string;
  avatarImageData: string;
  starsImageData: string;
};

const defaultItems: OffshoreTestimonial[] = Array.from({ length: 4 }, () => ({
  quote:
    "The team enabled the app to launch in both New Zealand and the United States, seamlessly handling multiple currencies and transactions upon deployment. About 1,200 users are registered to the platform, and the app is fully-functioning. The team added value with their responsiveness and efficiency.",
  name: "James Anderson",
  role: "Co-Founder, Shootzu",
  avatarImageData: "/images/avatar-profile.png",
  starsImageData: "/icons/stars.svg",
}));

const TestimonialSection = ({ title = "What Our Clients Say", subtitle = "Real businesses, real results with AI automation.", items = defaultItems }: { title?: string; subtitle?: string; items?: OffshoreTestimonial[] }) => {
  const resolvedItems = Array.from({ length: 4 }, (_, index) => items[index] ?? defaultItems[index]);

  return (
    <section
      className="w-full py-10 lg:py-12.5"
      style={{
        background: "radial-gradient(circle, var(--canvas) 65%, var(--glow) 100%)",
      }}
    >
      {/* Container */}
      <div className="container max-w-271.5">
        {/* Title & Subtitle */}
        <div className="flex flex-col gap-3.75">
          <h2 className="title heading-gradient text-left sm:text-center">{title}</h2>

          <p className="subtitleMeXl80 leading-relaxed text-left sm:text-center">{subtitle}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mt-8 lg:mt-12.5">
          {resolvedItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-5 p-5 rounded-[10px]"
              style={{
                background:
                  "linear-gradient(249.67deg, color-mix(in srgb, var(--tech) 35%, transparent) 0%, rgba(24, 24, 24, 0) 49.04%, color-mix(in srgb, var(--tech) 35%, transparent) 100%)",
                border: "1px solid #FFFFFF26",
              }}
            >
              <div className="relative w-[100px] h-6 lg:w-[145px] lg:h-6.25">
                <Image src={item.starsImageData} fill alt="rating stars" unoptimized={item.starsImageData.startsWith("data:") || item.starsImageData.startsWith("http")} />
              </div>

              <p className="text-fg/80 text-xs sm:text-base font-normal leading-relaxed">
                “{item.quote}”
              </p>

              <div className="flex items-center gap-2.5">
                <div className="relative w-10 h-10  lg:h-[45px] lg:w-[45px]">
                  <Image src={item.avatarImageData} fill alt="avatar" unoptimized={item.avatarImageData.startsWith("data:") || item.avatarImageData.startsWith("http")} />
                </div>
                <div className="flex flex-col">
                  <div className="font-medium text-sm lg:text-base text-fg">{item.name}</div>
                  <div className="font-normal text-fg/80 text-xs">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
