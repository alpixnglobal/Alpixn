import Image from "next/image";
import Link from "next/link";
import { getPartnerTeamData } from "@/lib/offshore developer/partner-team-data";
import type { OffshoreSimpleItemRecord } from "@/lib/content-types";

interface PartnerWithTeamProps {
  slug?: string;
  data?: {
    mainTitle: string;
    buttonText: string;
    buttonLink: string;
    items: OffshoreSimpleItemRecord[];
  };
}

const PartnerWithTeam = ({ slug = "default", data }: PartnerWithTeamProps) => {
  const fallbackData = getPartnerTeamData(slug);
  const { mainTitle, buttonText, buttonLink, items } = data ?? fallbackData;

  return (
    <section
      className="w-full py-10 lg:py-12.5"
      style={{
        background: "radial-gradient(circle, rgba(0, 7, 14, 1) 25%, rgba(0, 35, 72, 1) 100%)",
      }}
    >
      {/* Container */}
      <div className="w-full max-w-[1350px] mx-auto px-4 lg:px-0">
        {/* CTA */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="title heading-gradient text-left w-full max-w-[769px]">{mainTitle}</h2>

          <Link
            href={buttonLink}
            className="w-full lg:w-fit py-2.5 px-6.25 rounded-10 text-xs lg:text-base font-medium text-white cursor-pointer text-center"
            style={{
              background: "#389EFF",
              boxShadow: "0px 4px 6px 0px #0000001A inset",
            }}
          >
            {buttonText}
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-[30px] lg:mt-[50px]">
          {items.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col rounded-[10px]"
              style={{
                background: "linear-gradient(180deg, rgba(24, 24, 24, 0.24) 0%, rgba(56, 158, 255, 0.06) 100%)",
              }}
            >
              {/* Gradient Border */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[10px]"
                style={{
                  padding: "1px",
                  background:
                    "radial-gradient(100% 100% at 49.96% 0%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.15) 72.87%)",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col p-4 gap-5 h-full">
                <div className="flex items-center !justify-start gap-2.5">
                  <div
                    className="relative flex justify-center items-center w-5 h-5 rounded-full"
                    style={{
                      background:
                        "linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(360deg, #002348 0%, #00141F 100%)",
                      boxShadow: "0px 0px 15px 0px #389EFFA6",
                    }}
                  >
                    {/* Gradient border for outer circle */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "radial-gradient(42.58% 56.52% at 94.52% -14.13%, #FFFFFF 0%, #389EFF 100%)",
                        padding: "1.2px",
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }}
                    />

                    {/* Inner Point/Dot */}
                    <div
                      className="relative w-2 h-2 rounded-full z-10"
                      style={{
                        background: "linear-gradient(0.63deg, #389EFF 2.69%, #003098 97.31%)",
                      }}
                    >
                      {/* Gradient border for inner circle */}
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: "radial-gradient(42.58% 56.52% at 94.52% -14.13%, #FFFFFF 0%, #389EFF 100%)",
                          padding: "1px",
                          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                          WebkitMaskComposite: "xor",
                          maskComposite: "exclude",
                        }}
                      />
                    </div>
                  </div>
                  <h3 className="subtitleMeXl80 text-left text-white">{item.title}</h3>
                </div>

                <p className="font-normal text-xs lg:text-sm leading-relaxed text-white/80">{"description" in item ? item.description : item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerWithTeam;
