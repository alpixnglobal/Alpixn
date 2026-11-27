import Accent from "@/components/ui/Accent";
import Image from "next/image";
import { Button } from "@/components/ui/buttonBtn";
import Link from "next/link";

const BooKFreeCallSection = ({
  title = "At ALPIXN, we don't just build software - we build possibilities.",
  description = "Together, let's shape the future of intelligent technology.",
  buttonText = "Book a Free Call",
  buttonHref = "/contact-us",
}: {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}) => {
  return (
    <section className="sectionDefault">
      {/* Background Color */}
      <div className="absolute inset-0" style={{ background: "var(--canvas)" }} />

      <div className="container max-w-[1440px]">
        {/* Card */}
        <div
          className="w-full max-w-full lg:max-w-[1094px] mx-auto p-6 sm:p-8 md:p-12 lg:p-[85px] rounded-xl sm:rounded-2xl lg:rounded-[20px]"
          style={{
            background: "linear-gradient(277.65deg, var(--tech) -120%, transparent 51.07%, var(--tech) 190.99%)",
          }}
        >
          <div className="w-full max-w-full lg:max-w-[924px] mx-auto flex flex-col items-center justify-center gap-4 lg:gap-[25px]">
            <h2 className="text-left sm:text-center font-display text-[clamp(1.35rem,1.9vw,1.75rem)] font-bold leading-[1.15] tracking-[-0.025em] text-fg"><Accent text={title} /></h2>

            <p className="text-base md:text-lg font-normal leading-relaxed text-left sm:text-center text-fg max-w-full sm:max-w-[90%] lg:max-w-[80%]">
              {description}
            </p>

            <Link href={buttonHref}>
              <Button className="text-sm md:text-base font-medium leading-snug lg:px-6.25 lg:py-2.5 w-full sm:w-fit cursor-pointer">
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

export default BooKFreeCallSection;
