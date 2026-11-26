import Image from "next/image";
import { Button } from "@/components/ui/buttonBtn";
import Link from "next/link";

type DriveCustomerSectionProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

const DriveCustomerSection = ({
  title = "Drive Better Customer Outcomes with ALPIXN AI Chatbot",
  description = "Experience the future of customer support with a demo or contact us to discuss your specific requirements.",
  buttonLabel = "Speak To Our Expert Team",
  buttonHref = "/contact-us",
}: DriveCustomerSectionProps) => {
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
          <div className="w-full max-w-full lg:max-w-[924px] mx-auto flex flex-col sm:items-center justify-center gap-4 lg:gap-[25px]">
            <h2 className="font-semibold text-fg text-left sm:text-center leading-tight sm:leading-snug lg:leading-snug text-[clamp(1.5rem,2.3vw,2.05rem)]">
              {title}
            </h2>

            <p className="font-normal text-sm md:text-base leading-relaxed text-left sm:text-center text-fg max-w-full sm:max-w-[90%] lg:max-w-[80%]">
              {description}
            </p>

            <Link href={buttonHref}>
              <Button className="font-medium text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 cursor-pointer">
                {buttonLabel}
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

export default DriveCustomerSection;
