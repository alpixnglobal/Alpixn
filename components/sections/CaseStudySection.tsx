"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const caseStudies = [
  {
    title: "Unify All FM Operations On A Single Platform To Enhance Efficiency And Cut Costs.",
    description:
      "Integrated FM Group, a leading facility management provider, collaborated with Jellyfish Technologies to streamline operations. The developed platform integrates work orders, asset management, preventive maintenance, and vendor management, enhancing efficiency and reducing costs.",
    image: "/images/phone.png",
    featuresLeft: [
      "Analyzed client’s operations and FM trends, and followed a structured dev process.",
      "The work order and management feature was added to create, assign, and track.",
    ],
    featuresRight: [
      "Conducted constructive user testing sessions during the development phase.",
      "Enhanced facility managers to oversee service providers and suppliers.",
    ],
  },
  {
    title:
      "Empowers Brokers and Integrates With Top US Insurers For Swift Certificate Issuance And Optimal Premium Quotes.",
    description:
      "Patra Corporation partnered with Jellyfish Technologies to develop a secure, web-based payment automation solution for premium finance in the insurance industry. The result improved task efficiency, reduced costs, and enhanced the overall user experience.",
    image: "/images/brokers.png",
    featuresLeft: [
      "API integration module with configuration based approach.",
      "The integration module has robust authorization mechanisms for secure data exchange.",
    ],
    featuresRight: [
      "XML transports diverse data formats in a flexible and readable structure.",
      "Underwriting questions for risk assessment stored in XML databases for insurance standards.",
    ],
  },
  {
    title: "A SaaS Solution to Streamline Google Workspace User Management, Automating Tasks for Efficiency.",
    description:
      "Jellyfish Technologies facilitated the launch of Patronum (Bespin Labs). The developed platform streamlines Google Workspace tasks, offering enhanced control over user files, efficient sharing, copying, and backup options, adding another satisfied client to our list.",
    image: "/images/saas.png",
    featuresLeft: [
      "Code optimized for seamless handling of synchronous requests and high-volume traffic.",
      "Real-time updates for unstructured data were generated using MongoDB.",
    ],
    featuresRight: [
      "Integrated Google API, enhancing product functionality and connectivity.",
      "Automated provisioning and de-provisioning users within Google Workspace.",
    ],
  },
  {
    title: "Develop An Internal Insurance App For Daily Storage Of Client's Private Data By Employees.",
    description:
      "Heffernan, a leading US insurance brokerage, partnered with Jellyfish Technologies to develop a secure internal application for daily client data storage. The solution included robust authentication, responsive Ul, file storage, and report generation, resulting in a fast and secure data management system.",
    image: "/images/insurance.png",
    featuresLeft: [
      "With planning & research, evaluated app functionalities and architectural needs.",
      "Top-notch user experience drove the design, resulting in a clean, intuitive UX.",
    ],
    featuresRight: [
      "Developed a responsive UI with full accessibility, integrating Bootstrap design.",
      "App creates reports in CSV/PDF formats for data analysis and sharing.",
    ],
  },
  {
    title: "Visual Solutions For Builders/Homebuyers And Provides Weekly Build Progress Reports Via Photos.",
    description:
      "Jellyfish Technologies collaborated with Builder Digital Solutions to create and deliver various visual marketing and engagement solutions for builders and new home buyers.",
    image: "/images/homebayer.png",
    featuresLeft: [
      "Improved UI with enhanced design elements and navigation.",
      "Identified key features for mobile and web app performance enhancements.",
    ],
    featuresRight: [
      "Developed a responsive UI with full accessibility, integrating Bootstrap design.",
      "We addressed bugs, refining existing features for improved functionality & UX.",
    ],
  },
];

type CaseStudyRecord = {
  title: string;
  description: string;
  imageData: string;
  featuresLeft: string[];
  featuresRight: string[];
};

const CaseStudySection = ({
  title = "Delivering Result-Driven Digital Solutions",
  subtitle = "Explore a selection of our case studies to gain insight into our innovative approach and our ability to craft unconventional digital solutions tailored to our client's specific needs.",
  cases,
}: {
  title?: string;
  subtitle?: string;
  cases?: CaseStudyRecord[];
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);
  const resolvedCases = (cases?.length ? cases : caseStudies.map((item) => ({ ...item, imageData: item.image }))) as CaseStudyRecord[];

  const active = resolvedCases[activeIndex];
  const total = resolvedCases.length;
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === total - 1;

  const goTo = (index: number) => {
    if (index === activeIndex || index < 0 || index >= total) return;
    setDirection(index > activeIndex ? "next" : "prev");
    setActiveIndex(index);
  };
  const next = () => goTo(activeIndex + 1);
  const prev = () => goTo(activeIndex - 1);
  const features = [...active.featuresLeft, ...active.featuresRight];

  return (
    <section aria-labelledby="cases-title" className="relative w-full overflow-hidden bg-canvas py-20 sm:py-24 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-tech/15 blur-[140px]" />
        <div className="absolute -right-20 bottom-0 h-[380px] w-[380px] rounded-full bg-gold/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-10 xl:px-0">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="cases-title" align="left" eyebrow="Case studies" title={title} subtitle={subtitle} />
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              aria-label="Previous case study"
              onClick={prev}
              disabled={isFirst}
              className="grid h-12 w-12 place-items-center rounded-full border border-line bg-surface text-fg transition-all hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ArrowLeft aria-hidden className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next case study"
              onClick={next}
              disabled={isLast}
              className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-brand-royal to-brand-midnight text-white shadow-[var(--shadow-glow)] transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ArrowRight aria-hidden className="h-5 w-5" />
            </button>
          </div>
        </Reveal>

        <div className="glass mt-12 overflow-hidden rounded-[28px] shadow-[var(--shadow-card)]">
          <div
            key={activeIndex}
            className={`grid lg:grid-cols-12 ${direction === "next" ? "animate-slide-in-right" : ""} ${direction === "prev" ? "animate-slide-in-left" : ""}`}
            onAnimationEnd={() => setDirection(null)}
            aria-live="polite"
          >
            {/* Image panel */}
            <div className="group relative min-h-[320px] overflow-hidden bg-[radial-gradient(90%_80%_at_50%_100%,#0a3466_0%,#071a33_55%,#040d1c_100%)] sm:min-h-[400px] lg:col-span-5 lg:min-h-[520px]">
              <div aria-hidden className="absolute inset-0 bg-grid opacity-30" />
              <div aria-hidden className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2ea8ff]/25 blur-[80px]" />
              <span aria-hidden className="hud-corners" />
              <div className="absolute inset-8 sm:inset-12">
                <Image
                  src={active.imageData}
                  fill
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  alt={active.title}
                  className="object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)] transition-transform duration-700 group-hover:scale-[1.04]"
                  unoptimized={active.imageData.startsWith("data:") || active.imageData.startsWith("http")}
                />
              </div>
              <div className="absolute bottom-5 left-6 font-mono text-xs tracking-[0.2em] text-[#f6d77a]">
                {String(activeIndex + 1).padStart(2, "0")} <span className="text-white/40">/ {String(total).padStart(2, "0")}</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-6 p-6 sm:p-10 lg:col-span-7 lg:p-12">
              <h3 className="font-display text-xl font-semibold leading-snug text-fg sm:text-2xl lg:text-[1.75rem]">{active.title}</h3>
              <p className="text-base leading-relaxed text-fg-muted">{active.description}</p>
              <div className="rule-gold" />
              <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {features.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span aria-hidden className="mt-1.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-gradient-to-br from-gold/25 to-tech/25 ring-1 ring-line-gold">
                      <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
                    </span>
                    <p className="text-[15px] leading-relaxed text-fg">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Segmented progress / direct navigation */}
        <div className="mt-6 flex items-center gap-2" role="tablist" aria-label="Case studies">
          {resolvedCases.map((item, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Case study ${i + 1}: ${item.title}`}
              onClick={() => goTo(i)}
              className="group relative h-6 flex-1"
            >
              <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-line">
                <span className={`block h-full rounded-full bg-gradient-to-r from-gold to-tech transition-all duration-500 ${i <= activeIndex ? "w-full" : "w-0 group-hover:w-1/3"}`} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudySection;
