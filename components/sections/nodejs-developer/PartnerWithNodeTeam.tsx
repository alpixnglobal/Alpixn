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
        background: "radial-gradient(circle, var(--canvas) 25%, var(--glow) 100%)",
      }}
    >
      {/* Container */}
      <div className="w-full max-w-[1350px] mx-auto px-4 lg:px-0">
        {/* CTA */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="title heading-gradient text-left w-full max-w-[769px] text-[clamp(1.5rem,2.3vw,2.05rem)]">{mainTitle}</h2>

          <Link
            href={buttonLink}
            className="btn-brand w-full lg:w-fit"
            style={{
              background: "var(--tech)",
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
                background: "linear-gradient(180deg, rgba(24, 24, 24, 0.24) 0%, color-mix(in srgb, var(--tech) 6%, transparent) 100%)",
              }}
            >
              {/* Gradient Border */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[10px]"
                style={{
                  padding: "1px",
                  background:
                    "radial-gradient(100% 100% at 49.96% 0%, rgb(var(--hi-rgb) / calc(0.75 * var(--hi-scale))) 0%, rgb(var(--hi-rgb) / calc(0.15 * var(--hi-scale))) 72.87%)",
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
                        "linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(360deg, var(--glow) 0%, var(--canvas-2) 100%)",
                      boxShadow: "0px 0px 15px 0px color-mix(in srgb, var(--tech) 65%, transparent)",
                    }}
                  >
                    {/* Gradient border for outer circle */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "radial-gradient(42.58% 56.52% at 94.52% -14.13%, var(--heading-from) 0%, var(--tech) 100%)",
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
                        background: "linear-gradient(0.63deg, var(--tech) 2.69%, #064A87 97.31%)",
                      }}
                    >
                      {/* Gradient border for inner circle */}
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: "radial-gradient(42.58% 56.52% at 94.52% -14.13%, var(--heading-from) 0%, var(--tech) 100%)",
                          padding: "1px",
                          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                          WebkitMaskComposite: "xor",
                          maskComposite: "exclude",
                        }}
                      />
                    </div>
                  </div>
                  <h3 className="subtitleMeXl80 text-left text-fg">{item.title}</h3>
                </div>

                <p className="font-normal text-xs lg:text-sm leading-relaxed text-fg/80">{"description" in item ? item.description : item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerWithTeam;
