import Image from "next/image";
import Link from "next/link";

type ExpertGuidanceSectionProps = {
  title?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

const ExpertGuidanceSection = ({ title = "Elevate Your Project with Expert Guidance.", buttonLabel = "Talk With Expert", buttonHref = "/contact-us" }: ExpertGuidanceSectionProps) => {
  return (
    <section
      className="relative w-full h-auto min-h-[168px] lg:h-42 overflow-hidden"
      style={{ background: "linear-gradient(180deg, var(--tech) -2%, #064A87 152.12%)" }}
    >
      {/* Background Ellipse Top Right */}
      <div className="absolute w-[199.3px] h-[199.3px] -right-[3%] -top-[30%] z-0 hidden lg:block">
        <Image src="/images/ellipse-top-right.png" alt="Geometry background" fill className="object-contain" />
      </div>
      {/* Background Ellipse Bottom Right*/}
      <div className="absolute w-[199.3px] h-[199.3px] -right-[6%] -top-[10%] z-0 hidden lg:block">
        <Image src="/images/ellipse-bottom-left.png" alt="Geometry background" fill className="object-contain" />
      </div>
      {/* Background Ellipse Bottom Right*/}
      <div className="absolute w-[199.3px] h-[199.3px] -left-[0%] -top-[20%] z-0 hidden lg:block">
        <Image src="/images/ellipse-top-left.png" alt="Geometry background" fill className="object-contain" />
      </div>
      {/* Background Ellipse Left Bottom*/}
      <div className="absolute w-[199.3px] h-[199.3px] -left-[6%] -top-[15%] z-0 hidden lg:block">
        <Image src="/images/ellipse-left-bottom.png" alt="Geometry background" fill className="object-contain" />
      </div>
      {/* Background Ellipse Center*/}
      <div className="absolute w-[303.74px] h-[303.74px] left-[53%] -top-[16%] z-0 hidden lg:block">
        <Image src="/images/center-ellipse.png" alt="Geometry background" fill className="object-contain" />
      </div>

      {/* Container */}
      <div className="container max-w-[1350px] mx-auto h-full z-10 py-10 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center justify-between h-full">
          {/* Heading */}
          <h2 className="font-bold text-xl md:text-2xl lg:text-3xl text-fg text-left sm:text-center lg:text-left mb-6 lg:mb-0 w-full md:w-fit leading-snug max-w-[965px]">
            {title}
          </h2>
          {/* Button */}
          <Link
            href={buttonHref}
            className="flex items-center justify-center gap-[15px] bg-white rounded-10 text-tech py-3.75 px-6.25 font-medium text-sm lg:text-base hover:bg-gray-50 transition-colors w-full md:w-fit whitespace-nowrap cursor-pointer"
            style={{
              boxShadow: "0px 4px 6px 0px #0000001A inset",
            }}
          >
            <span>{buttonLabel}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 8H15" stroke="#2EA8FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 1L15 8L8 15" stroke="#2EA8FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ExpertGuidanceSection
