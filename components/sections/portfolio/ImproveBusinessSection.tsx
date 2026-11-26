import Link from "next/link";

type ImproveBusinessSectionProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

const ImproveBusinessSection = ({ title = "Improve your business and make your work easy", description = "Expert consulting solutions to drive growth, optimize operations, and simplify your path to success.", buttonLabel = "Get a Free Consultation", buttonHref = "/contact-us" }: ImproveBusinessSectionProps) => {
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
          md:w-[50%]
          max-md:w-full
          
        "
        style={{
          backgroundImage: "url('/images/laptophands.svg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "bottom center",
        }}
      />

      {/* Container */}
      <div className="relative w-full h-full max-w-348.25 mx-auto">
        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* 1 */}
          <div className="flex flex-col bt-12.5 w-full max-w-full lg:max-w-175 gap-6.25 px-4 xl:px-5">
            <h2 className="heading-gradient text-left text-xl md:text-2xl lg:text-3xl font-bold leading-tight">{title}</h2>
            <p className="text-sm md:text-base font-normal leading-relaxed text-fg/80">
              {description}
            </p>
            <Link
              href={buttonHref}
              className="py-2.5 px-6.25 text-sm md:text-base font-medium leading-snug text-white flex gap-2 items-center bg-tech rounded-[10px] w-63 cursor-pointer"
              style={{ boxShadow: "0px 4px 6px 0px #0000001A inset" }}
            >
              <span>{buttonLabel}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 8H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M8 1L15 8L8 15"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImproveBusinessSection;
