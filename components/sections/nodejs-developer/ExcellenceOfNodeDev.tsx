import { getExcellenceOfferingsData } from "@/lib/offshore developer/excellence-offerings-data";
import type { OffshoreCardWithImageRecord } from "@/lib/content-types";
import Image from "next/image";

interface OfferingCardProps {
  title: string;
  description: string;
  image: string;
  alt: string;
  width: number;
  height: number;
}

const OfferingCard = ({ title, description, image, alt, width, height }: OfferingCardProps) => (
  <div
    className="flex flex-col justify-between text-fg rounded-[10px] w-full h-fit lg:h-full p-4 md:p-5 gap-3 md:gap-5"
    style={{
      background: "linear-gradient(180deg, color-mix(in srgb, var(--tech) 35%, transparent) -30.91%, rgba(24, 24, 24, 0) 100%)",
      backdropFilter: "blur(4px)",
      borderBottom: "3px solid var(--tech)",
    }}
  >
    <div className="w-fit">
      <Image
        src={image}
        alt={alt}
        width={width}
        height={height}
        className="w-8 h-8 md:w-10 md:h-10 lg:w-auto lg:h-auto object-contain"
        unoptimized={image.startsWith("data:") || image.startsWith("http")}
      />
    </div>

    <h6 className="font-semibold text-base md:text-lg text-fg">{title}</h6>
    <p className="text-fg/80 text-xs lg:text-sm font-normal leading-relaxed">{description}</p>
    <div className="flex justify-end mt-auto"></div>
  </div>
);

interface ExcellenceOfDevProps {
  slug?: string;
  data?: {
    mainTitle: string;
    mainSubtitle: string;
    offerings: OffshoreCardWithImageRecord[];
  };
}

const ExcellenceOfDev = ({ slug = "default", data }: ExcellenceOfDevProps) => {
  const fallbackData = getExcellenceOfferingsData(slug);
  const resolvedData = data ?? {
    mainTitle: fallbackData.mainTitle,
    mainSubtitle: fallbackData.mainSubtitle,
    offerings: fallbackData.offerings.map((offering) => ({
      title: offering.title,
      description: offering.description,
      imageData: offering.image,
      alt: offering.alt,
      width: offering.width,
      height: offering.height,
    })),
  };
  const { mainTitle, mainSubtitle, offerings } = resolvedData;

  return (
    <section className="sectionDefault">
      {/* Background Color */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(circle, var(--canvas) 25%, var(--glow) 100%)" }}
      />
      {/* Container */}
      <div className="container max-w-[1350px]">
        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[45.5%_1fr] gap-8 lg:gap-0">
          {/* Grid 1 */}
          <div className="flex flex-col gap-3 md:gap-[15px] w-full">
            <div className="title heading-gradient text-left">{mainTitle}</div>
            <p className="subtitleMeXl80 leading-relaxed text-left">{mainSubtitle}</p>
          </div>
          {/* Grid 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {offerings.map((offering, index) => (
              <OfferingCard key={index} {...offering} image={offering.imageData} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExcellenceOfDev;
