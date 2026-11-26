import Image from "next/image";
import Link from "next/link";

type UnlockCTASectionProps = {
  title?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

const UnlockCTASection = ({ title = "Unlock next-level performance with Our Node.js web development services", buttonLabel = "Connect With Us", buttonHref = "/contact-us" }: UnlockCTASectionProps) => {
  return (
    <section
      className="relative w-full h-auto min-h-[168px] lg:h-42 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #389EFF -2%, #003098 152.12%)" }}
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
          <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl text-white text-left sm:text-center lg:text-left mb-6 lg:mb-0 w-full md:w-fit leading-snug max-w-[965px]">
            {title}
          </h2>
          {/* Button */}
          <Link
            href={buttonHref}
            className="flex items-center justify-center gap-[15px] bg-white rounded-10 text-[#389EFF] py-3.75 px-6.25 font-medium text-sm lg:text-base hover:bg-gray-50 transition-colors w-full md:w-fit whitespace-nowrap cursor-pointer"
            style={{
              boxShadow: "0px 4px 6px 0px #0000001A inset",
            }}
          >
            <span>{buttonLabel}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 8H15" stroke="#389EFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 1L15 8L8 15" stroke="#389EFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UnlockCTASection;
