import Image from "next/image";
import { Button } from "@/components/ui/buttonBtn";

type AboutStat = { value: string; label: string };
type AboutMissionCard = { title: string; description: string; imageData: string };

const defaultStats: AboutStat[] = [
  { value: "10+", label: "Years in Experience" },
  { value: "150+", label: "All Experts" },
  { value: "98%", label: "On-Time Projects Delivered" },
  { value: "1500+", label: "Projects Delivered" },
  { value: "93%", label: "Repeated Client" },
];

const defaultMissionCards: AboutMissionCard[] = [
  { title: "Intelligent Solutions", description: "Deliver cutting-edge digital solutions that elevate efficiency, creativity, and customer experience across industries.", imageData: "/images/tree.png" },
  { title: "Empowering Innovation", description: "Empower startups and enterprises with intelligent automation and smart business tools that drive growth and scalability.", imageData: "/images/rocket.png" },
  { title: "Future-Ready Technologies", description: "Innovate continuously in AI, blockchain, and cloud to shape a sustainable and connected digital future.", imageData: "/images/globe.png" },
  { title: "Collaborative Growth", description: "Foster a culture of learning, collaboration, and ethical innovation—creating value for both our clients and our team.", imageData: "/images/hand.png" },
];

const OurVisionSection = ({
  visionTag = "Our Vision",
  visionTitle = "Envisioning a Smarter Future",
  visionDescription = "To become a global leader in AI-driven digital transformation, empowering businesses to achieve excellence through innovation, automation, and human-centric technology.",
  visionStats = defaultStats,
  missionTag = "Our Mission",
  missionTitle = "Envisioning a Smarter Future",
  missionDescription = "To become a global leader in AI-driven digital transformation, empowering businesses to achieve excellence through innovation, automation, and human-centric technology.",
  missionCards = defaultMissionCards,
}: {
  visionTag?: string;
  visionTitle?: string;
  visionDescription?: string;
  visionStats?: AboutStat[];
  missionTag?: string;
  missionTitle?: string;
  missionDescription?: string;
  missionCards?: AboutMissionCard[];
}) => {
  const resolvedStats = visionStats.filter((stat) => stat.value.trim() || stat.label.trim());
  const statsToRender = resolvedStats.length > 0 ? resolvedStats : defaultStats;
  const statCount = Math.max(statsToRender.length, 1);
  const isCompactDesktop = statCount >= 5;
  const valueTextClass = isCompactDesktop ? "text-2xl sm:text-3xl lg:text-4xl xl:text-[clamp(2.25rem,3vw,4rem)]" : "text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug";
  const labelTextClass = isCompactDesktop ? "text-[11px] sm:text-xs lg:text-sm xl:text-[clamp(0.75rem,0.9vw,1rem)]" : "text-sm lg:text-base font-normal leading-relaxed";
  const itemPaddingClass = isCompactDesktop ? "px-2 xl:px-3" : "px-2";
  const resolvedMissionCards = missionCards.filter((card) => card.title.trim() || card.description.trim() || card.imageData.trim());
  const missionCardsToRender = (resolvedMissionCards.length > 0 ? resolvedMissionCards : defaultMissionCards).map((card, index) => ({
    ...defaultMissionCards[index % defaultMissionCards.length],
    ...card,
    imageData: card.imageData || defaultMissionCards[index % defaultMissionCards.length].imageData,
  }));

  return (
    <section className="w-full py-[50px]" style={{ background: "radial-gradient(circle, rgba(0, 7, 14, 1) 75%, rgba(0, 35, 72, 1) 100%)" }}>
      <div className="container max-w-[1440px]">
        <div className="flex flex-col justify-center items-start sm:items-center mx-auto w-full lg:max-w-[1236px] gap-4 sm:gap-6 lg:gap-[25px]">
          <Button variant="outlined" className="py-2.5 px-6.25 text-white font-normal leading-relaxed text-xs sm:text-sm rounded-full" style={{ background: "#389EFF0D", border: "1px solid #389EFF73" }}>
            {visionTag}
          </Button>

          <div className="flex flex-col gap-[25px]">
            <h2 className="heading-gradient text-2xl md:text-3xl font-bold leading-snug text-left sm:text-center" style={{ background: "linear-gradient(89.81deg, #FFFFFF 19.79%, #FFFFFF 76.65%, #BCDEFF 93.54%)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>
              {visionTitle}
            </h2>

            <p className="text-base md:text-lg font-normal leading-relaxed text-white/80 text-left sm:text-center">{visionDescription}</p>

            <div
              className="grid grid-cols-2 gap-4 sm:gap-0 justify-center text-white w-full lg:grid-flow-col lg:auto-cols-fr"
              style={{ gridTemplateColumns: `repeat(${Math.min(statCount, 2)}, minmax(0, 1fr))` }}
            >
              {statsToRender.map((stat, index) => (
                <div key={`${stat.value}-${index}`} className={`relative flex flex-col gap-1 py-4 sm:py-6 items-center justify-center text-center ${itemPaddingClass}`}>
                  <div className={`font-bold ${valueTextClass}`}>{stat.value}</div>
                  <div className={`px-1 lg:px-2 lg:whitespace-nowrap ${labelTextClass}`}>{stat.label}</div>
                  {index < statsToRender.length - 1 ? <span className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-[70%] bg-white/20" /> : null}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-start sm:items-center mx-auto w-full max-w-full lg:max-w-[1110px] mt-12 sm:mt-16 lg:mt-[100px] gap-4 sm:gap-6 lg:gap-[25px]">
          <Button variant="outlined" className="py-2.5 px-6.25 text-white font-normal leading-relaxed text-xs sm:text-sm rounded-full" style={{ background: "#389EFF0D", border: "1px solid #389EFF73" }}>
            {missionTag}
          </Button>

          <h2 className="heading-gradient text-2xl md:text-3xl font-bold leading-snug text-left sm:text-center">{missionTitle}</h2>

          <p className="text-base md:text-lg font-normal leading-relaxed text-white/80 text-left sm:text-center">{missionDescription}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-[20px] mt-[48px] justify-items-center">
            {missionCardsToRender.map((card, index) => (
              <div key={`${card.title}-${index}`} className="flex flex-col text-white p-5 lg:gap-5 border-white/15 rounded-[5px] w-full max-w-[431px] min-h-[321px]" style={{ background: "linear-gradient(249.67deg, rgba(56, 158, 255, 0.06) 0%, rgba(24, 24, 24, 0) 100%)" }}>
                <div className="flex flex-col gap-5 flex-shrink-0">
                  <h5 className="text-xl md:text-2xl font-semibold leading-snug">{card.title}</h5>
                  <p className="text-base font-normal leading-relaxed text-white/80">{card.description}</p>
                </div>
                <div className="relative w-full flex-1 h-full min-h-[158px]">
                  <Image src={card.imageData} fill priority alt={card.title} className="object-contain" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw" unoptimized={card.imageData.startsWith("data:") || card.imageData.startsWith("http")} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurVisionSection;
