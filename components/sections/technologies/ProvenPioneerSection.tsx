"use client";

import { useState } from "react";
import Image from "next/image";

import type { TechnologyCaseStudyRecord } from "@/lib/content-types";

const caseStudies: TechnologyCaseStudyRecord[] = [
  {
    title: "Unify All FM Operations On A Single Platform To Enhance Efficiency And Cut Costs.",
    description:
      "Integrated FM Group, a leading facility management provider, collaborated with Jellyfish Technologies to streamline operations. The developed platform integrates work orders, asset management, preventive maintenance, and vendor management, enhancing efficiency and reducing costs.",
    imageData: "/images/phone.png",
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
    imageData: "/images/brokers.png",
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
    imageData: "/images/saas.png",
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
    imageData: "/images/insurance.png",
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
    imageData: "/images/homebayer.png",
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

const BTN_SIZE = 50;
const BTN_GAP = 20;

type ProvenPioneerSectionProps = {
  title?: string;
  description?: string;
  cases?: TechnologyCaseStudyRecord[];
};

const ProvenPioneerSection = ({ title = "Our Node.js Developers: Proven Pioneers", description = "At ALPIXN, our Node.js developers are true industry trailblazers, utilizing evolved expertise and avant techniques to spur creativity. As leaders in Node JS development, we create customized, high-performance apps tailored to your requirements, guaranteeing exceptional results and raising the bar for technological brilliance.", cases = caseStudies }: ProvenPioneerSectionProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState<"next" | "prev" | null>(null);

    const resolvedCases = cases.length > 0 ? cases : caseStudies;
    const safeIndex = Math.min(activeIndex, Math.max(resolvedCases.length - 1, 0));
    const active = resolvedCases[safeIndex];
    const isFirst = safeIndex === 0;
    const isLast = safeIndex === resolvedCases.length - 1;
  
    const next = () => {
      if (!isLast) {
        setDirection("next");
        setActiveIndex((p) => Math.min(p + 1, resolvedCases.length - 1));
      }
    };
  
    const prev = () => {
      if (!isFirst) {
        setDirection("prev");
        setActiveIndex((p) => Math.max(p - 1, 0));
      }
    };

  if (!active) {
    return null;
  }

  return (
    <section className="sectionDefault overflow-x-hidden relative">
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle, var(--canvas) 45%, var(--glow) 100%)",
        }}
      />

      <div className="container max-w-337.5 relative">
        {/* Title */}
        <div className="flex flex-col w-full max-w-[1350px] mx-auto">
          <h2 className="title heading-gradient text-left sm:text-center text-[clamp(1.5rem,2.3vw,2.05rem)]">{title}</h2>
          <p className="subtitle mx-auto text-left sm:text-center">
            {description}
          </p>
        </div>

        {/* Content */}
        <div
          key={activeIndex}
          className={`
                grid grid-cols-1 xl:grid-cols-[451px__52px_847px] mt-[60px] items-center
                ${direction === "next" ? "animate-slide-in-right" : ""}
                ${direction === "prev" ? "animate-slide-in-left" : ""}
              `}
          onAnimationEnd={() => setDirection(null)}
        >
          {/* Left */}
          <div className="relative w-full h-full max-w-[451px] aspect-square mx-auto">
            <Image src={active.imageData} fill alt="Phone" className="object-contain object-top" unoptimized={active.imageData.startsWith("data:") || active.imageData.startsWith("http")} />
          </div>

          {/* Empty Space */}
          <div className=""></div>

          {/* Right */}
          <div className="flex flex-col gap-8">
            <h2 className="font-semibold text-fg leading-snug text-[clamp(1.5rem,2.3vw,2.05rem)]">
              {active.title}
            </h2>

            <p className="font-normal text-sm sm:text-base text-fg leading-relaxed">
              {active.description}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-4 xl:gap-10 max-w-[677px]">
              {/* Left Features */}
              <div className="flex flex-col gap-4 xl:gap-10">
                {active.featuresLeft.map((item, i) => (
                  <FeatureItem key={i} text={item} />
                ))}
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-[1px] h-full bg-gradient-to-b from-white/50 via-[#BCEDEF]/50 to-white/50" />

              {/* Right Features */}
              <div className="flex flex-col gap-4 xl:gap-10">
                {active.featuresRight.map((item, i) => (
                  <FeatureItem key={i} text={item} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex justify-end">
          <div
            className="relative"
            style={{ width: BTN_SIZE * 2 + BTN_GAP, height: BTN_SIZE }}
            data-state={isLast ? "last" : "normal"}
          >
            {/* PREVIOUS */}
            <button
              onClick={prev}
              className={`
                    bg-[#F0F0F0] active:!bg-blue-100
                      border border-[#E2E2E2] active:!border-blue-100
                      nav-btn prev-btn
                      group cursor-pointer
                      flex items-center justify-center
                      rounded-full
                      transition-all duration-150
                      ${isFirst ? "opacity-0 pointer-events-none" : "opacity-100"}
            
          `}
            >
              <ArrowLeft className="transition-transform group-active:scale-75" />
            </button>

            {/* NEXT */}
            <button
              onClick={next}
              className={`
                    bg-[#F0F0F0] active:!bg-blue-100
                      border border-[#E2E2E2] active:!border-blue-100
                      nav-btn next-btn
                      group cursor-pointer
                      flex items-center justify-center
                      rounded-full
                      w-[50px] h-[50px]
                      transition-all duration-150
                      ${isLast ? "opacity-0 pointer-events-none" : "opacity-100"}
          `}
            >
              <ArrowRight className="transition-transform group-active:scale-75" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex gap-[13.75px] items-start ">
    <Image src="/icons/filled-arrow-right.svg" width={23} height={23} alt="Arrow" />
    <p className="text-fg font-normal text-sm sm:text-base">{text}</p>
  </div>
);

const ArrowLeft = ({ className }: { className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M19.1504 9.84961H1.15039"
      stroke="#181818"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.1504 18.8496L1.15039 9.84961L10.1504 0.849609"
      stroke="#181818"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRight = ({ className }: { className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M0.849609 9.84961H18.8496"
      stroke="#181818"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.84961 0.849609L18.8496 9.84961L9.84961 18.8496"
      stroke="#181818"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ProvenPioneerSection;
