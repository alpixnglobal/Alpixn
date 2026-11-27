import Accent from "@/components/ui/Accent";
import testimonialData from "@/lib/expertise/testimonial-our-expertise-data";
import type { ExpertiseTestimonialRecord } from "@/lib/content-types";
import Image from "next/image";

const TestimonialOurExpertise = ({
  title = testimonialData.mainTitle,
  subtitle = testimonialData.mainSubtitle,
  testimonials = testimonialData.testimonials.map((item) => ({
    quote: item.quote,
    author: item.author,
    position: item.position,
    company: item.company,
    avatar: item.avatar,
  })),
}: {
  title?: string;
  subtitle?: string;
  testimonials?: ExpertiseTestimonialRecord[];
}) => {

  return (
    <section className="sectionDefault">
      {/* Background Color */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle, var(--canvas) 65%, var(--glow) 100%)",
        }}
      />

      {/* Container */}
      <div className="container max-w-271.5">
        {/* Title & Subtitle */}
        <div className="flex flex-col gap-3.75">
          <h2 className="max-w-[826px] mx-auto text-left sm:text-center font-display text-[clamp(1.35rem,1.9vw,1.75rem)] font-bold leading-[1.15] tracking-[-0.025em] text-fg"><Accent text={title} /></h2>

          <p className="subtitleMeXl80 leading-relaxed text-left sm:text-center">{subtitle}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mt-8 lg:mt-12.5">
          {testimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.author}-${testimonial.company}-${index}`}
              className="flex flex-col gap-5 p-5 rounded-10"
              style={{
                background:
                  "linear-gradient(249.67deg, color-mix(in srgb, var(--tech) 35%, transparent) 0%, rgba(24, 24, 24, 0) 49.04%, color-mix(in srgb, var(--tech) 35%, transparent) 100%)",
                border: "1px solid #FFFFFF26",
              }}
            >
              <Image
                src="/icons/quotes.svg"
                width={35}
                height={46}
                alt="quotes"
                className="w-[20px] h-[30px] lg:w-[35px] lg:h-[46px]"
              />

              <p className="text-fg/80 text-xs sm:text-base font-normal leading-relaxed">"{testimonial.quote}"</p>

              <div className="flex items-center gap-2.5">
                {testimonial.avatar ? (
                  <Image
                    src={testimonial.avatar}
                    width={45}
                    height={45}
                    alt={testimonial.author}
                    className="rounded-full"
                    unoptimized={testimonial.avatar.startsWith("data:") || testimonial.avatar.startsWith("http")}
                  />
                ) : null}
                <div className="flex flex-col gap-[5px]">
                  <div className="font-medium text-sm sm:text-base text-fg">{testimonial.author}</div>
                  <div className="font-normal text-fg/80 text-xs">
                    {testimonial.position}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialOurExpertise;
