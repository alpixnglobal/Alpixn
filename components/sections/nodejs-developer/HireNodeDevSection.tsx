import { getHireDeveloperData } from "@/lib/offshore developer/hire-developer-data";
import type { OffshoreSimpleItemRecord } from "@/lib/content-types";

interface HireDeveloperSectionProps {
  slug?: string;
  data?: {
    title: string;
    subtitle: string;
    services: OffshoreSimpleItemRecord[];
  };
}

const HireDeveloperSection = ({ slug = "default", data }: HireDeveloperSectionProps) => {
  const fallbackData = getHireDeveloperData(slug);
  const resolvedData = data ?? {
    title: fallbackData.title,
    subtitle: fallbackData.subtitle,
    services: fallbackData.services.map((service) => ({ title: service.title, description: service.desc })),
  };
  const { title, subtitle, services } = resolvedData;

  return (
    <section className="sectionDefault">
      {/* Background Color */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle, var(--canvas) 65%, var(--glow) 100%)",
        }}
      />

      {/* Container */}
      <div className="container max-w-337.5">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_1fr] gap-10 lg:gap-6 xl:gap-0">
          {/* LEFT — Sticky Title */}
          <div className="w-full py-6 lg:py-12.5">
            <div className="lg:sticky lg:top-24 flex flex-col gap-5">
              <h2 className="title heading-gradient text-left">{title}</h2>

              <p className="subtitleMeXl80 leading-relaxed text-left">{subtitle}</p>
            </div>
          </div>

          {/* RIGHT — Scrolling Cards */}
          <div className="flex flex-col gap-5 items-start lg:items-end lg:py-12.5">
            {services.map((service, index) => (
              <div
                key={index}
                className="relative flex flex-col gap-5 p-5 w-full lg:max-w-[calc(45vw-2rem)] xl:max-w-[533px] rounded-[10px]"
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
                      "radial-gradient(100% 100% at 49.96% 0%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.15) 72.87%)",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />

                <div className="relative z-10 flex flex-col gap-5">
                  <h3 className="font-semibold text-base lg:text-xl text-fg">{service.title}</h3>
                  <p className="font-normal text-fg/80 text-xs lg:text-base leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HireDeveloperSection;
