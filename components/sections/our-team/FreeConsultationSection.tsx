import Link from "next/link";

type FreeConsultationSectionProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

const FreeConsultationSection = ({ title = "Turn your ideas into stunning visuals", description = "Stop imagining and start creating. Whether you are a designer, content creator, or just exploring your creativity, our team can help shape the right experience.", buttonLabel = "Get a Free Consultation", buttonHref = "/contact-us" }: FreeConsultationSectionProps) => {
  return (
    <section className="relative w-full py-12.5 h-[478px] overflow-hidden">
      {/* Background Color */}
      <div
        className="absolute inset-0 "
        style={{
          background: "radial-gradient(circle, var(--canvas) 15%, var(--glow) 100%)",
        }}
      />

      {/* Background Image */}
      <div
        className="
          absolute right-0 top-0 h-full w-full
          md:w-[43%]
          max-md:w-full
        "
        style={{
          backgroundImage: "url('/images/mask-hands.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "bottom center",
        }}
      />

      {/* Container */}
      <div className="relative w-full h-full max-w-[1440px] mx-auto flex items-center px-4 xl:px-0">
        {/* Content */}
        <div className="relative w-full max-w-[704px] flex flex-col gap-6.25 sm:ml-[45px]">
          <h2 className="text-gradient text-xl md:text-2xl font-bold leading-snug text-start">{title}</h2>
          <p className="text-sm md:text-base font-normal leading-relaxed text-left text-fg/80">
            {description}
          </p>
          <Link
            href={buttonHref}
            className="py-2.5 px-6.25 text-sm md:text-base font-medium leading-snug text-white flex gap-2 items-center bg-tech rounded-10 w-full sm:w-fit cursor-pointer"
            style={{ boxShadow: "0px 4px 6px 0px #0000001A inset" }}
          >
            <span>{buttonLabel}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 8H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 1L15 8L8 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
      {/* <BlackGg /> */}
    </section>
  );
}

export default FreeConsultationSection
