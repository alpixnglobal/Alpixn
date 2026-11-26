"use client";

import { Button } from "@/components/ui/buttonBtn";
import { getCustomSoftwareDevData } from "@/lib/expertise/custom-software-dev-section-data";
import type { ExpertiseBenefitRecord } from "@/lib/content-types";
import Image from "next/image";
import Link from "next/link";

interface CaseStudySectionProps {
  slug?: string;
  data?: {
    mainTitle: string;
    mainSubtitle: string;
    buttonText: string;
    buttonLink: string;
    image: string;
    imageAlt: string;
    benefits: ExpertiseBenefitRecord[];
  };
}

const CustomSoftwareDevSection = ({ slug = "software-development", data }: CaseStudySectionProps) => {
  const fallbackData = getCustomSoftwareDevData(slug);
  const resolvedData = data ?? {
    ...fallbackData,
    buttonLink: "/contact-us",
  };

  return (
    <section className="sectionDefault">
      {/* Background Color */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle, var(--canvas) 75%, var(--glow) 100%)",
        }}
      />

      {/* Container */}
      <div className="container max-w-337.5">
        <div className="grid grid-cols-1 px-4 xl:px-0 xl:grid-cols-[991px_1fr] justify-between">
          {/* Title & Subtitle */}
          <div className="flex flex-col gap-3.75">
            <h2 className="title heading-gradient text-left text-[clamp(1.5rem,2.3vw,2.05rem)]">{resolvedData.mainTitle}</h2>
            <p className="subtitleMeXl80 text-left leading-relaxed">{resolvedData.mainSubtitle}</p>
          </div>

          {/* Button */}
          <div className="flex xl:justify-end">
            <Link href={resolvedData.buttonLink}>
              <Button
                className="
              px-6.25 py-2.5 w-full lg:w-fit mt-4 xl:mt-0  
              text-sm sm:text-base
              rounded-10
              flex items-center justify-center
              cursor-pointer
            "
                style={{ boxShadow: "0px 4px 6px 0px #0000001A inset" }}
              >
                {resolvedData.buttonText}
                <Image
                  src="/icons/arrow-right.svg"
                  alt="Arrow Right"
                  width={16}
                  height={16}
                  className="ml-2 w-3 h-3 sm:w-3.5 sm:h-3.5"
                />
              </Button>
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[462_1fr] gap-12.5 mt-12.5">
          {/* Left – Sticky Image */}
          <div className="relative lg:sticky md:top-0 w-full h-90 lg:w-[462px] lg:h-[452px] sm:h-135.5 text-center mx-auto lg:mx-0">
            {resolvedData.image ? (
              <Image src={resolvedData.image} alt={resolvedData.imageAlt || ""} fill priority className="object-contain object-top" unoptimized={resolvedData.image.startsWith("data:") || resolvedData.image.startsWith("http")} />
            ) : null}
          </div>

          {/* Right – Benefits List */}
          <div className="flex flex-col gap-6.25 px-4 lg:px-0">
            {resolvedData.benefits.map((benefit) => (
              <div key={benefit.id} className="flex flex-col gap-3 border-b pb-5 border-fg/50">
                <h6 className="text-fg font-semibold text-lg md:text-xl">
                  <div className="flex gap-2">
                    <span
                      style={{
                        background: "linear-gradient(90deg, var(--tech) 0%, var(--gold) 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      {benefit.number}
                    </span>
                    <span>{benefit.title}</span>
                  </div>
                </h6>
                <p className="ml-[30px] text-xs sm:text-lg md:text-xl leading-relaxed text-fg">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomSoftwareDevSection;
