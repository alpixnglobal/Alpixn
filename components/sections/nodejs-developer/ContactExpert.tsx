import Image from "next/image";
import Link from "next/link";
import { getContactExpertData } from "@/lib/offshore developer/contact-expert-data";

interface ContactExpertProps {
  slug: string;
  overrideTitle?: string;
  overrideButtonText?: string;
  overrideButtonLink?: string;
}

const ContactExpert = ({ slug, overrideTitle, overrideButtonText, overrideButtonLink }: ContactExpertProps) => {
  const data = getContactExpertData(slug);
  const title = overrideTitle || data.title;
  const buttonText = overrideButtonText || data.buttonText;
  const buttonLink = overrideButtonLink || data.buttonLink;

  return (
    <section className="relative w-full h-auto min-h-[168px] lg:h-42 overflow-hidden">
      {/* Background Color */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, var(--tech) -2%, #064A87 152.12%)" }}
      />

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
      <div className="relative w-full lg:max-w-[1350px] mx-auto h-full z-10 px-4 xl:px-0">
        <div className="flex flex-col lg:flex-row text-start sm:items-center justify-between h-full px-4 lg:px-0 py-8 lg:py-0">
          {/* Heading - Dynamic */}
          <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl text-fg text-left sm:text-center lg:text-left mb-6 lg:mb-0 w-full max-w-4xl">
            {title}
          </h2>
          {/* Button */}
          <Link
            href={buttonLink}
            className="flex items-center justify-center gap-3 lg:gap-[14px] w-fit bg-white rounded-10 text-tech py-3 lg:py-[15px] px-4 lg:px-[25px] font-medium text-sm lg:text-base hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div>{buttonText}</div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-2.5 h-2.5 lg:w-4 lg:h-4"
            >
              <path d="M1 8H15" stroke="#2EA8FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 1L15 8L8 15" stroke="#2EA8FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactExpert;
