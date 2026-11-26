import Image from "next/image";
import type { HomeOfferingRecord } from "@/lib/content-types";

const offerings: HomeOfferingRecord[] = [
  {
    title: "Software Development",
    description:
      "We specialize in software development and customized solutions, utilizing the latest technologies (blockchain, web3, ML, AI) and industry best practices to help businesses achieve their digital goals.",
    imageData: "/images/software.svg",
    alt: "Software Development Icon",
    width: 174,
    height: 121.88,
  },
  {
    title: "Data Analytics",
    description:
      "Unlock the potential of data through advanced visualization and our team of expert data analysts. Our data analytics services harness cutting-edge technology to extract actionable insights and customize solutions for your business's success.",
    imageData: "/images/data.svg",
    alt: "Data Analytics Icon",
    width: 180.97,
    height: 121.88,
  },
  {
    title: "Cloud Engineering",
    description:
      "Our cloud engineering services facilitate the re-platforming, re-hosting, and re-engineering of applications, optimizing them for cloud environments. You can harness the power of the cloud to effectively address intricate business challenges.",
    imageData: "/images/cloud.svg",
    alt: "Cloud Engineering Icon",
    width: 114,
    height: 100,
  },
  {
    title: "Application Modernization",
    description:
      "Our application modernization services can breathe new life into your existing software, enhancing performance, security, and user experience. We're committed to supporting you every step of the way on your application modernization journey.",
    imageData: "/images/app.svg",
    alt: "Application Modernization Icon",
    width: 140,
    height: 110.11,
  },
  {
    title: "DevOps Services",
    description:
      "Streamline your development and operations with our DevOps expertise, ensuring faster deployments, better collaboration, and scalable infrastructure.",
    imageData: "/images/ai.svg",
    alt: "DevOps Services Icon",
    width: 174.97,
    height: 121.88,
  },
  {
    title: "AI Development",
    description:
      "Our AI services bring expertise and experience in natural language processing, machine learning, automated ML, generative AI, responsible AI, and more to help you deliver innovative solutions at scale.",
    imageData: "/images/devops.svg",
    alt: "AI Development Icon",
    width: 138.3,
    height: 128.22,
  },
];

const OfferingCard = ({ title, description, imageData, alt, width, height }: HomeOfferingRecord) => {
  const resolvedImage = imageData?.trim();

  return (
  <div
    className="relative flex flex-col justify-between text-fg rounded-10 w-full mx-auto h-55 sm:h-70  lg:h-77.25 p-5"
    style={{
      background: "linear-gradient(180deg, color-mix(in srgb, var(--tech) 35%, transparent) -30.91%, rgba(24, 24, 24, 0) 100%)",
      backdropFilter: "blur(4px)",
      borderBottom: "3px solid var(--tech)",
    }}
  >
    <div className="flex flex-col gap-5">
      <p className="text-xl md:text-2xl font-semibold leading-snug">{title}</p>
      <p className="text-fg text-sm md:text-base font-normal leading-relaxed">{description}</p>
      <div className="flex justify-end mt-auto"></div>
    </div>

    {resolvedImage ? (
      <div className="absolute bottom-0 right-5">
        <Image
          src={resolvedImage}
          alt={alt || title}
          width={width}
          height={height}
          className="object-contain w-[80px] sm:w-[100px] md:w-[120px] lg:w-auto h-auto"
          unoptimized={resolvedImage.startsWith("data:") || resolvedImage.startsWith("http")}
        />
      </div>
    ) : null}
  </div>
  );
};

const OfferSection = ({
  title = "Explore Our Offerings",
  subtitle = "Whether you're building from scratch or scaling up, our expert services in software, AI, and app development are designed to meet your business goals.",
  items = offerings,
}: {
  title?: string;
  subtitle?: string;
  items?: HomeOfferingRecord[];
}) => {
  const resolvedItems = items.length > 0 ? items : offerings;

  return (
    <section className="sectionDefault">
      {/* Background Color */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(circle, var(--canvas) 75%, var(--glow) 100%)" }}
      />

      {/* Container */}
      <div className="container max-w-337.5">
        {/* Titlte and Subtitle */}
        <div className="flex flex-col gap-3.5">
          <h2 className="heading-gradient text-2xl md:text-3xl font-bold leading-snug text-left sm:text-center">{title}</h2>
          <p className="max-w-[963px] mx-auto text-base md:text-lg font-normal leading-relaxed text-fg/80 text-left sm:text-center">{subtitle}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-7.5 mt-8.75 justify-items-center">
          {resolvedItems.map((offering, index) => (
            <OfferingCard key={index} {...offering} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
