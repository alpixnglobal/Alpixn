import { getCtaSectionData } from "@/lib/offshore developer/cta-section-data";
import Image from "next/image";
import Link from "next/link"; // Import Link from next/link

interface CtaSectionProps {
  slug?: string;
  data?: {
    title: string;
    buttonText: string;
    buttonLink: string;
  };
}

const CtaSection = ({ slug = "default", data }: CtaSectionProps) => {
  const fallbackData = getCtaSectionData(slug);
  const { title, buttonText, buttonLink } = data ?? fallbackData;

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

      {/* Container  */}
      <div className="relative w-full max-w-[337.5px] lg:max-w-[1350px] mx-auto h-full z-10 lg:px-0">
        <div className="flex flex-col xl:flex-row items-center justify-between h-full px-4 lg:px-0 py-8 lg:py-0">
          {/* Heading - Dynamic */}
          <h2 className="font-bold text-2xl md:text-3xl text-fg text-left sm:text-center lg:text-left mb-6 lg:mb-0">
            {title}
          </h2>
          {/* Button as Link - Dynamic */}
          <Link
            href={buttonLink}
            className="flex items-center justify-center gap-3 lg:gap-[14px] w-full lg:w-[292px] bg-white rounded-[10px] text-tech py-3 lg:py-[15px] px-4 lg:px-[25px] font-medium text-sm lg:text-base hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div>{buttonText}</div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 8H15" stroke="#2EA8FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 1L15 8L8 15" stroke="#2EA8FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
