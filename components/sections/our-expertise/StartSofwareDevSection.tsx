import { Button } from "@/components/ui/buttonBtn";
import { getStartDevelopmentData } from "@/lib/expertise/start-sofware-dev-section";
import Image from "next/image";
import Link from "next/link";

interface StartDevelopmentSectionProps {
  slug?: string;
  data?: {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
  };
}

const StartDevelopmentSection = ({ slug = "software-development", data }: StartDevelopmentSectionProps) => {
  const fallbackData = getStartDevelopmentData(slug);
  const { title, subtitle, buttonText, buttonLink } = data ?? { ...fallbackData, buttonLink: "/contact-us" };

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-[100px]" style={{ background: "var(--canvas)" }}>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Card */}
        <div
          className="w-full max-w-full lg:max-w-[1094px] mx-auto p-6 sm:p-8 md:p-12 lg:p-[85px] rounded-xl sm:rounded-2xl lg:rounded-[20px]"
          style={{
            background: "linear-gradient(277.65deg, var(--tech) -120%, transparent 51.07%, var(--tech) 190.99%)",
          }}
        >
          <div className="w-full max-w-full lg:max-w-[924px] mx-auto flex flex-col items-center justify-center gap-4 lg:gap-[25px]">
            <h2 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-fg text-left sm:text-center leading-tight sm:leading-snug lg:leading-snug">
              {title}
            </h2>

            <p className="font-normal text-base md:text-lg leading-relaxed text-left sm:text-center text-fg">
              {subtitle}
            </p>

            <Link href={buttonLink}>
              <Button className="font-medium text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 w-full sm:w-fit cursor-pointer">
                {buttonText}
                <Image
                  src="/icons/arrow-right.svg"
                  alt="Arrow Right"
                  width={12}
                  height={12}
                  className="ml-2 sm:ml-2.5 w-3 h-3 sm:w-3.5 sm:h-3.5"
                />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartDevelopmentSection;
