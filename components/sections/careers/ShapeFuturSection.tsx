import { Button } from "@/components/ui/buttonBtn";
import Image from "next/image";
import Link from "next/link";

type ShapeFuturSectionProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

const ShapeFuturSection = ({ title = "Shape the Future With Us", description = "Join a team that’s redefining innovation. Explore open roles and start your journey today.", buttonLabel = "Apply Now", buttonHref = "/resources/careers" }: ShapeFuturSectionProps) => {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-[50px] " style={{ background: "var(--canvas)" }}>
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        {/* Card */}
        <div
          className="w-full max-w-full lg:max-w-273.5 mx-auto p-6 sm:p-8 md:p-12 lg:p-21.25 rounded-xl sm:rounded-2xl lg:rounded-[20px]"
          style={{
            background: "linear-gradient(277.65deg, var(--tech) -120%, transparent 51.07%, var(--tech) 190.99%)",
          }}
        >
          <div className="w-full max-w-231 mx-auto grid grid-cols-1 justify-between xl:grid-cols-2">
            {/* Left */}
            <div className="flex flex-col gap-6.25 w-full max-w-111.25">
              <h2 className="heading-gradient-white text-start font-bold leading-tight text-[clamp(1.5rem,2.3vw,2.05rem)]">
                {title}
              </h2>
              <p className="text-base md:text-lg font-normal leading-relaxed text-fg">
                {description}
              </p>
              <Link href={buttonHref}>
                <Button className="text-sm md:text-base font-medium leading-snug px-6 py-3 sm:px-8 sm:py-4 w-full lg:w-fit cursor-pointer">
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
            {/* Right */}
            <div className="relative w-full h-73.5">
              <Image
                src="/images/job-analysis.svg"
                alt="Shape Futur Illustration"
                fill
                className="object-contain object-right"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShapeFuturSection;
