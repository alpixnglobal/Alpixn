import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";

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

// Bento layout: first card is the hero tile, last of the first four is a wide banner.
const spans = [
  "lg:col-span-7 lg:row-span-2 min-h-[340px] lg:min-h-[540px]",
  "lg:col-span-5 min-h-[260px]",
  "lg:col-span-5 min-h-[260px]",
  "lg:col-span-12 min-h-[260px] lg:min-h-[280px]",
];

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

  return (
    <section aria-labelledby="solutions-title" className="relative w-full overflow-hidden bg-canvas py-20 sm:py-24 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-tech/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 2xl:px-[45px]">
        <Reveal>
          <SectionHeading id="solutions-title" eyebrow="Custom solutions" title={title} subtitle={subtitle} />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:auto-rows-[minmax(250px,auto)] lg:grid-cols-12">
          {resolvedCards.map((card, index) => {
            const image = card.imageData || defaultCards[index % defaultCards.length].imageData;
            const alt = card.alt || card.title || `Solution ${index + 1}`;
            const shouldUnoptimize = image.startsWith("data:") || image.startsWith("http");
            const span = spans[index] ?? "lg:col-span-6 min-h-[260px]";
            const isFeature = index === 0;

            return (
              <Reveal key={`${card.title}-${index}`} delay={index * 90} className={`${span} ${isFeature ? "sm:col-span-2 lg:col-span-7" : ""}`}>
                <TiltCard className="group h-full overflow-hidden rounded-3xl border border-line bg-brand-navy shadow-[var(--shadow-card)]">
                  <article className="relative flex h-full min-h-[inherit] flex-col justify-end">
                    <Image
                      src={image}
                      alt={alt}
                      fill
                      className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                      sizes={isFeature ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 42vw"}
                      unoptimized={shouldUnoptimize}
                    />
                    {/* media scrim — card text sits on imagery in both themes */}
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#040d1c] via-[#040d1c]/70 to-[#040d1c]/5" />
                    <div aria-hidden className="absolute inset-0 bg-[radial-gradient(80%_60%_at_100%_0%,rgba(8,120,209,0.35),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span aria-hidden className="hud-corners" />

                    <div className="relative z-[2] flex items-start justify-between p-6 sm:p-7">
                      <span className="font-mono text-xs tracking-[0.2em] text-[#f6d77a]">{String(index + 1).padStart(2, "0")}</span>
                      <span className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur transition-all duration-300 group-hover:border-[#f6d77a]/70 group-hover:bg-[#d99a19] group-hover:text-[#071a33]">
                        <ArrowUpRight aria-hidden className="h-4 w-4" />
                      </span>
                    </div>

                    <div className="relative z-[2] mt-auto p-6 pt-0 sm:p-7 sm:pt-0" style={{ transform: "translateZ(30px)" }}>
                      <h3 className={`font-display font-semibold leading-tight text-white ${isFeature ? "text-2xl sm:text-[1.9rem]" : "text-xl sm:text-2xl"}`}>
                        {card.title}
                      </h3>
                      <p className={`mt-3 max-w-[560px] text-[15px] leading-relaxed text-white/75 ${isFeature ? "" : "line-clamp-3"}`}>{card.description}</p>
                      <div aria-hidden className="mt-5 h-px w-16 bg-gradient-to-r from-[#f6d77a] to-transparent transition-all duration-500 group-hover:w-32" />
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CustomSolutionSection;
