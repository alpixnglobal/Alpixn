import Image from "next/image";

type SolutionCard = {
  title: string;
  description: string;
  imageData: string;
  alt: string;
};

const defaultCards: SolutionCard[] = [
  {
    title: "AI & Machine Learning Solutions",
    description: "Drive smarter decisions with AI-powered automation, predictive analytics, and machine learning models customized for your domain.",
    imageData: "/images/ai1.png",
    alt: "AI Image",
  },
  {
    title: "Web & Mobile App Development",
    description: "Build cross-platform apps with rich user experiences using cutting-edge front-end and robust back-end technologies.",
    imageData: "/images/ai2.png",
    alt: "Mobile Web Image",
  },
  {
    title: "Custom Software Development",
    description: "Scalable, secure, and custom-built software tailored for your unique processes, from enterprise apps to SaaS platforms.",
    imageData: "/images/ai3.png",
    alt: "Custom Software Image",
  },
  {
    title: "QA & DevOps Services",
    description: "Ensure performance, security, and reliability with continuous testing, deployment pipelines, and infrastructure automation.",
    imageData: "/images/ai4.png",
    alt: "DevOps Image",
  },
];

const sizePatterns = [
  "lg:aspect-[665/385] lg:h-auto",
  "lg:aspect-[665/260] lg:h-auto",
  "lg:aspect-[665/260] lg:h-auto",
  "lg:aspect-[665/385] lg:h-auto",
];

const blurPatterns = ["blur(2px)", "blur(7px)", "blur(7px)", "blur(7px)"];

const baseHeights = ["sm:h-87.5 md:h-100", "sm:h-[280px] md:h-[300px]", "sm:h-[280px] md:h-[300px]", "sm:h-[350px] md:h-[400px]"];

const CustomSolutionSection = ({
  title = "Custom Solutions Tailored to Your Business Needs",
  subtitle = "From concept to code, we build scalable digital experiences across industries",
  cards = defaultCards,
}: {
  title?: string;
  subtitle?: string;
  cards?: SolutionCard[];
}) => {
  const resolvedCards = cards.length > 0 ? cards : defaultCards;

  const renderCard = (card: SolutionCard, index: number) => {
    const image = card.imageData || defaultCards[index % defaultCards.length].imageData;
    const alt = card.alt || card.title || `Solution ${index + 1}`;
    const shouldUnoptimize = image.startsWith("data:") || image.startsWith("http");

    return (
      <div
        key={`${card.title}-${index}`}
        className={`h-62.5 ${baseHeights[index % baseHeights.length]} ${sizePatterns[index % sizePatterns.length]} rounded-lg w-full border border-[#303030] overflow-hidden`}
      >
        <div className="relative text-white h-full">
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized={shouldUnoptimize}
          />
          <h2 className="absolute inset-0 ml-5 mt-5 text-xl md:text-2xl font-semibold leading-snug">{card.title}</h2>
          <div
            className="absolute inset-x-0 bottom-0 border-t border-white/10"
            style={{
              background: "linear-gradient(180deg, rgba(24, 24, 24, 0.05) 0%, rgba(24, 24, 24, 0.05) 100%)",
              backdropFilter: blurPatterns[index % blurPatterns.length],
            }}
          >
            <p className="m-5 text-base font-normal leading-relaxed text-white text-start">{card.description}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      className="py-[50px] w-full overflow-x-hidden"
      style={{ background: "radial-gradient(circle, rgba(0, 7, 14, 1) 45%, rgba(0, 35, 72, 1) 100%)" }}
    >
      <div className="max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-[45px] mx-auto relative">
        <div className="flex flex-col gap-2.5">
          <h2 className="heading-gradient text-2xl md:text-3xl font-bold leading-snug text-left sm:text-center">{title}</h2>
          <p className="text-base md:text-lg font-normal leading-relaxed text-white/80 text-left sm:text-center">{subtitle}</p>
        </div>

        {/* Custom Solution Grid - matching original layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 mt-[35px]">
          {/* Left Column */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {resolvedCards[0] && renderCard(resolvedCards[0], 0)}
            {resolvedCards[1] && renderCard(resolvedCards[1], 1)}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {resolvedCards[2] && renderCard(resolvedCards[2], 2)}
            {resolvedCards[3] && renderCard(resolvedCards[3], 3)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomSolutionSection;
