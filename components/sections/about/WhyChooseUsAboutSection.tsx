"use client";

import { motion } from "motion/react";
import { useState } from "react";

type WhyChooseCard = { title: string; description: string };

const defaultCards: WhyChooseCard[] = [
  { title: "Proven Expertise", description: "We bring years of experience in AI, Automation, ERP, and Digital Transformation - helping businesses operate smarter and scale faster." },
  { title: "Innovation & Excellence", description: "Our solutions are built on innovation, performance, and customer satisfaction - ensuring every project exceeds expectations." },
  { title: "Passionate Team", description: "A dynamic team of developers, designers, and strategists collaborates seamlessly to create meaningful, user-focused digital experiences." },
];

const WhyChooseUsAboutSection = ({
  title = "Why Choose Us?",
  subtitle = "Empowering businesses with intelligent technology, creative innovation, and a commitment to delivering measurable results.",
  cards = defaultCards,
}: {
  title?: string;
  subtitle?: string;
  cards?: WhyChooseCard[];
}) => {
  const [isCirleHovered, setIsCirleHovered] = useState(false);
  const [isBarHovered, setIsBarHovered] = useState(false);
  const [isCellHovered, setIsCellHovered] = useState(false);
  const filteredCards = cards.filter((card) => card.title.trim() || card.description.trim());
  const resolvedCards = filteredCards.length > 0 ? filteredCards : defaultCards;
  const primaryCards = resolvedCards.slice(0, 3);
  const extraCards = resolvedCards.slice(3);

  return (
    <section className="sectionDefault">
      {/* Background Color */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(circle, var(--canvas) 45%, var(--glow) 100%)" }}
      />

      {/* Container */}
      <div className="container max-w-[1440px]">
        {/* Title & Subtitle */}
        <div className="flex flex-col">
          <div className="flex flex-col gap-[15px] items-center w-full mx-auto max-w-full lg:max-w-[723px]">
            <h2 className="heading-gradient text-2xl md:text-3xl font-bold leading-snug text-left sm:text-center mr-auto sm:mr-0">{title}</h2>
            <p className="text-base md:text-lg font-normal leading-relaxed text-fg/80 text-left sm:text-center">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="flex flex-wrap justify-center items-center mt-8 sm:mt-12 lg:mt-[50px] w-full xl:max-w-[1349px] mx-auto gap-5">
          {/* Card 1 */}
          {primaryCards[0] ? <div
            className="relative flex flex-col items-center h-[323px] min-h-[323px] w-full max-w-[436.33px] py-[25px] px-[20px] gap-2.5 lg:gap-[20px]"
            style={{
              borderRadius: "10px",
              background: "linear-gradient(249.67deg, color-mix(in srgb, var(--tech) 6%, transparent) 0%, rgba(24, 24, 24, 0) 100%)",
            }}
            onMouseEnter={() => setIsCirleHovered(true)}
            onMouseLeave={() => setIsCirleHovered(false)}
          >
            {/* Gradient Border */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                zIndex: 1,
                borderRadius: "10px",
                padding: "1px",
                background:
                  "radial-gradient(100% 100% at 49.96% 0%, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.15) 72.87%)",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />

            {/* SVG */}
            <div className="w-full h-[140px] flex items-center justify-center" style={{ zIndex: 2 }}>
              <svg
                width="277"
                height="147"
                viewBox="0 0 277 147"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-auto h-full"
              >
                {/* Light effect animation */}
                <g clipPath="url(#clip0_6546_545)">
                  <circle
                    cx="138.5"
                    cy="138.5"
                    r="138.5"
                    fill="url(#paint0_linear_6546_545)"
                    style={{
                      transformOrigin: "135px 140px",
                      transform: isCirleHovered ? "rotate(90deg)" : "rotate(0deg)",
                      transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />
                  <circle cx="138.5" cy="138.5" r="138" stroke="url(#paint1_linear_6546_545)" strokeOpacity="0.5" />
                </g>

                {/* Animated Arrow - rotates around the bottom circle */}
                <g
                  style={{
                    transformOrigin: "135px 134px",
                    transform: isCirleHovered ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <g filter="url(#filter0_d_6546_545)">
                    <path
                      d="M55.1317 50.027C54.8797 49.7348 54.9022 49.2961 55.1827 49.0312C55.4656 48.7641 55.9092 48.7693 56.1857 49.043L139.239 131.245C141.383 133.367 141.342 136.844 139.149 138.915C136.938 141.003 133.433 140.823 131.447 138.52L55.1317 50.027Z"
                      fill="url(#paint2_linear_6546_545)"
                      shapeRendering="crispEdges"
                    />
                    <path
                      d="M54.8397 48.6674C55.3186 48.2155 56.0698 48.2246 56.5378 48.6878L139.591 130.89C141.936 133.212 141.891 137.014 139.492 139.279C137.074 141.562 133.24 141.365 131.068 138.847L54.7533 50.354C54.3267 49.8593 54.3647 49.1159 54.8397 48.6674Z"
                      stroke="white"
                      strokeOpacity="0.1"
                      shapeRendering="crispEdges"
                    />
                  </g>
                </g>

                {/* Center Circle - pivot point */}
                <circle cx="135" cy="134" r="3" fill="url(#paint3_linear_6546_545)" />

                <defs>
                  <filter
                    id="filter0_d_6546_545"
                    x="48.757"
                    y="42.634"
                    width="98.2633"
                    height="103.937"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset />
                    <feGaussianBlur stdDeviation="2.6" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.21 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6546_545" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6546_545" result="shape" />
                  </filter>
                  <linearGradient
                    id="paint0_linear_6546_545"
                    x1="49.333"
                    y1="34"
                    x2="182.833"
                    y2="203.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#064A87" stopOpacity="0.24" />
                    <stop offset="1" stopColor="#071A33" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_6546_545"
                    x1="138.5"
                    y1="0"
                    x2="138.5"
                    y2="277"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="white" stopOpacity="0.75" />
                    <stop offset="0.301528" stopColor="white" stopOpacity="0.25" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_6546_545"
                    x1="58.716"
                    y1="45.6949"
                    x2="51.8165"
                    y2="52.4775"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#064A87" stopOpacity="0.02" />
                    <stop offset="1" stopColor="#071A33" />
                  </linearGradient>
                  <linearGradient
                    id="paint3_linear_6546_545"
                    x1="135"
                    y1="131"
                    x2="135"
                    y2="137"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#2EBCFF" />
                    <stop offset="1" stopColor="#0D3885" />
                  </linearGradient>
                  <clipPath id="clip0_6546_545">
                    <rect width="277" height="119" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>

            {/* Heading and Description */}
            <h5 className="text-xl md:text-2xl font-semibold leading-snug text-fg" style={{ zIndex: 2 }}>
              {primaryCards[0].title}
            </h5>
            <p
              className="text-center text-fg/80 text-base font-normal leading-relaxed"
              style={{ zIndex: 2 }}
            >
              {primaryCards[0].description}
            </p>
          </div> : null}

          {/* Card 2 */}
          {primaryCards[1] ? <div
            className="relative flex flex-col items-center h-[323px] w-full max-w-[436.33px] py-[25px] px-[20px] gap-[20px]"
            style={{
              borderRadius: "10px",
              background: "linear-gradient(249.67deg, color-mix(in srgb, var(--tech) 6%, transparent) 0%, rgba(24, 24, 24, 0) 100%)",
            }}
            onMouseEnter={() => setIsBarHovered(true)}
            onMouseLeave={() => setIsBarHovered(false)}
          >
            {/* Gradient Border */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                zIndex: 1,
                borderRadius: "10px",
                padding: "1px",
                background:
                  "radial-gradient(100% 100% at 49.96% 0%, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.15) 72.87%)",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />

            <div className="w-full h-[147px] flex items-center justify-center" style={{ zIndex: 2 }}>
              <svg
                width="283"
                height="140"
                viewBox="0 0 283 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-48 sm:w-56 md:w-64 lg:w-[283px] h-auto"
              >
                {/* Bar 1 */}
                <g
                  style={{
                    transformOrigin: "30px 140px",
                    transform: isBarHovered ? "scaleY(1.2)" : "scaleY(1)",
                    transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0s",
                  }}
                >
                  <path
                    d="M0 89C0 83.4772 4.47715 79 10 79H50C55.5228 79 60 83.4772 60 89V135C60 137.761 57.7614 140 55 140H5C2.23858 140 0 137.761 0 135V89Z"
                    fill="url(#paint2_linear_6546_595)"
                  />
                  <path
                    d="M10 79.5H50C55.2467 79.5 59.5 83.7533 59.5 89V135C59.5 137.485 57.4853 139.5 55 139.5H5C2.51472 139.5 0.5 137.485 0.5 135V89C0.5 83.7533 4.7533 79.5 10 79.5Z"
                    stroke="url(#paint3_linear_6546_595)"
                    strokeOpacity="0.5"
                  />
                </g>

                {/* Bar 2 */}
                <g
                  style={{
                    transformOrigin: "104px 140px",
                    transform: isBarHovered ? "scaleY(0.7)" : "scaleY(1)",
                    transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.1s",
                  }}
                >
                  <path
                    d="M74 20C74 14.4772 78.4772 10 84 10H124C129.523 10 134 14.4772 134 20V135C134 137.761 131.761 140 129 140H79C76.2386 140 74 137.761 74 135V20Z"
                    fill="url(#paint0_linear_6546_595)"
                  />
                  <path
                    d="M84 10.5H124C129.247 10.5 133.5 14.7533 133.5 20V135C133.5 137.485 131.485 139.5 129 139.5H79C76.5147 139.5 74.5 137.485 74.5 135V20C74.5 14.7533 78.7533 10.5 84 10.5Z"
                    stroke="url(#paint1_linear_6546_595)"
                    strokeOpacity="0.5"
                  />
                </g>

                {/* Bar 3 */}
                <g
                  style={{
                    transformOrigin: "178px 140px",
                    transform: isBarHovered ? "scaleY(1.35)" : "scaleY(1)",
                    transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.2s",
                  }}
                >
                  <path
                    d="M148 67C148 61.4772 152.477 57 158 57H198C203.523 57 208 61.4772 208 67V135C208 137.761 205.761 140 203 140H153C150.239 140 148 137.761 148 135V67Z"
                    fill="url(#paint4_linear_6546_595)"
                  />
                  <path
                    d="M158 57.5H198C203.247 57.5 207.5 61.7533 207.5 67V135C207.5 137.485 205.485 139.5 203 139.5H153C150.515 139.5 148.5 137.485 148.5 135V67C148.5 61.7533 152.753 57.5 158 57.5Z"
                    stroke="url(#paint5_linear_6546_595)"
                    strokeOpacity="0.5"
                  />
                </g>

                {/* Bar 4 - Grows to tallest on hover (default: tall at y=37, becomes tallest on hover) */}
                <g
                  style={{
                    transformOrigin: "252px 140px",
                    transform: isBarHovered ? "scaleY(1.15)" : "scaleY(1)",
                    transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s",
                  }}
                >
                  <path
                    d="M222 37C222 31.4771 226.477 27 232 27H272C277.523 27 282 31.4772 282 37V135C282 137.761 279.761 140 277 140H227C224.239 140 222 137.761 222 135V37Z"
                    fill="url(#paint6_linear_6546_595)"
                  />
                  <path
                    d="M232 27.5H272C277.247 27.5 281.5 31.7533 281.5 37V135C281.5 137.485 279.485 139.5 277 139.5H227C224.515 139.5 222.5 137.485 222.5 135V37C222.5 31.7533 226.753 27.5 232 27.5Z"
                    stroke="url(#paint7_linear_6546_595)"
                    strokeOpacity="0.5"
                  />
                </g>

                <defs>
                  <linearGradient
                    id="paint0_linear_6546_595"
                    x1="134"
                    y1="10"
                    x2="54.1057"
                    y2="23.6623"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#064A87" stopOpacity="0.02" />
                    <stop offset="1" stopColor="#071A33" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_6546_595"
                    x1="104"
                    y1="10"
                    x2="104"
                    y2="140"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="white" stopOpacity="0.75" />
                    <stop offset="0.301528" stopColor="white" stopOpacity="0.25" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_6546_595"
                    x1="60"
                    y1="79"
                    x2="-12.5897"
                    y2="105.454"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#064A87" stopOpacity="0.02" />
                    <stop offset="1" stopColor="#071A33" />
                  </linearGradient>
                  <linearGradient
                    id="paint3_linear_6546_595"
                    x1="30"
                    y1="79"
                    x2="30"
                    y2="140"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="white" stopOpacity="0.75" />
                    <stop offset="0.301528" stopColor="white" stopOpacity="0.25" />
                  </linearGradient>
                  <linearGradient
                    id="paint4_linear_6546_595"
                    x1="208"
                    y1="57"
                    x2="131.274"
                    y2="77.5503"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#064A87" stopOpacity="0.02" />
                    <stop offset="1" stopColor="#071A33" />
                  </linearGradient>
                  <linearGradient
                    id="paint5_linear_6546_595"
                    x1="178"
                    y1="57"
                    x2="178"
                    y2="140"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="white" stopOpacity="0.75" />
                    <stop offset="0.301528" stopColor="white" stopOpacity="0.25" />
                  </linearGradient>
                  <linearGradient
                    id="paint6_linear_6546_595"
                    x1="282"
                    y1="27"
                    x2="202.833"
                    y2="42.5746"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#064A87" stopOpacity="0.02" />
                    <stop offset="1" stopColor="#071A33" />
                  </linearGradient>
                  <linearGradient
                    id="paint7_linear_6546_595"
                    x1="252"
                    y1="27"
                    x2="252"
                    y2="140"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="white" stopOpacity="0.75" />
                    <stop offset="0.301528" stopColor="white" stopOpacity="0.25" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <h5 className="text-xl md:text-2xl font-semibold leading-snug text-fg" style={{ zIndex: 2 }}>
              {primaryCards[1].title}
            </h5>

            <p
              className="text-center text-fg/80 text-base font-normal leading-relaxed max-w-[396px]"
              style={{ zIndex: 2 }}
            >
              {primaryCards[1].description}
            </p>
          </div> : null}

          {/* Card 3 */}
          {primaryCards[2] ? <div
            className="relative flex flex-col items-center h-[323px] w-full max-w-[436.33px] py-[25px] px-[20px] gap-[20px]"
            style={{
              borderRadius: "10px",
              background: "linear-gradient(249.67deg, color-mix(in srgb, var(--tech) 6%, transparent) 0%, rgba(24, 24, 24, 0) 100%)",
            }}
            onMouseEnter={() => setIsCellHovered(true)}
            onMouseLeave={() => setIsCellHovered(false)}
          >
            {/* Gradient Border */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                zIndex: 1,
                borderRadius: "10px",
                padding: "1px",
                background:
                  "radial-gradient(100% 100% at 49.96% 0%, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.15) 72.87%)",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />

            <div className="w-full h-[147px] flex items-center justify-center" style={{ zIndex: 2 }}>
              <svg
                width="178"
                height="168"
                viewBox="0 0 178 168"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-40 sm:w-48 md:w-56 lg:w-[178px] h-auto"
              >
                {/* Rotating spokes group */}
                <g
                  style={{
                    transformOrigin: "86.2049px 92.3592px",
                    transform: isCellHovered ? "rotate(10deg)" : "rotate(0deg)",
                    transition: "transform 1s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <rect
                    x="126.018"
                    y="22.9883"
                    width="3.69446"
                    height="59.1113"
                    transform="rotate(29.8053 126.018 22.9883)"
                    fill="url(#paint0_linear_6546_566)"
                  />
                  <rect
                    x="125.903"
                    y="22.5681"
                    width="4.3102"
                    height="59.7271"
                    transform="rotate(29.8053 125.903 22.5681)"
                    stroke="white"
                    strokeOpacity="0.15"
                    strokeWidth="0.615743"
                  />
                  <circle
                    cx="130.376"
                    cy="19.0935"
                    r="6.15743"
                    transform="rotate(29.8053 130.376 19.0935)"
                    fill="url(#paint1_linear_6546_566)"
                    stroke="url(#paint2_radial_6546_566)"
                    strokeWidth="1.23149"
                  />
                  <rect
                    x="161.307"
                    y="108.189"
                    width="3.69446"
                    height="59.1113"
                    transform="rotate(104.115 161.307 108.189)"
                    fill="url(#paint3_linear_6546_566)"
                  />
                  <rect
                    x="161.68"
                    y="107.966"
                    width="4.3102"
                    height="59.7271"
                    transform="rotate(104.115 161.68 107.966)"
                    stroke="white"
                    strokeOpacity="0.15"
                    strokeWidth="0.615743"
                  />
                  <circle
                    cx="166.233"
                    cy="111.331"
                    r="6.15743"
                    transform="rotate(104.115 166.233 111.331)"
                    fill="url(#paint4_linear_6546_566)"
                    stroke="url(#paint5_radial_6546_566)"
                    strokeWidth="1.23149"
                  />
                  <rect
                    x="123.648"
                    y="148.984"
                    width="3.69446"
                    height="59.1114"
                    transform="rotate(147.094 123.648 148.984)"
                    fill="url(#paint6_linear_6546_566)"
                  />
                  <rect
                    x="124.074"
                    y="149.076"
                    width="4.3102"
                    height="59.7271"
                    transform="rotate(147.094 124.074 149.076)"
                    stroke="white"
                    strokeOpacity="0.15"
                    strokeWidth="0.615743"
                  />
                  <circle
                    cx="125.108"
                    cy="154.64"
                    r="6.15743"
                    transform="rotate(147.094 125.108 154.64)"
                    fill="url(#paint7_linear_6546_566)"
                    stroke="url(#paint8_radial_6546_566)"
                    strokeWidth="1.23149"
                  />
                  <rect
                    x="37.1719"
                    y="151.613"
                    width="3.69446"
                    height="59.1114"
                    transform="rotate(-143.676 37.1719 151.613)"
                    fill="url(#paint9_linear_6546_566)"
                  />
                  <rect
                    x="37.2376"
                    y="152.044"
                    width="4.3102"
                    height="59.7271"
                    transform="rotate(-143.676 37.2376 152.044)"
                    stroke="white"
                    strokeOpacity="0.15"
                    strokeWidth="0.615743"
                  />
                  <circle
                    cx="32.4007"
                    cy="154.982"
                    r="6.15743"
                    transform="rotate(-143.676 32.4007 154.982)"
                    fill="url(#paint10_linear_6546_566)"
                    stroke="url(#paint11_radial_6546_566)"
                    strokeWidth="1.23149"
                  />
                  <rect
                    x="15.6973"
                    y="72.4727"
                    width="3.69446"
                    height="59.1114"
                    transform="rotate(-72.3111 15.6973 72.4727)"
                    fill="url(#paint12_linear_6546_566)"
                  />
                  <rect
                    x="15.3104"
                    y="72.6724"
                    width="4.3102"
                    height="59.7271"
                    transform="rotate(-72.3111 15.3104 72.6724)"
                    stroke="white"
                    strokeOpacity="0.15"
                    strokeWidth="0.615743"
                  />
                  <circle
                    cx="10.9778"
                    cy="69.0328"
                    r="6.15743"
                    transform="rotate(-72.3111 10.9778 69.0328)"
                    fill="url(#paint13_linear_6546_566)"
                    stroke="url(#paint14_radial_6546_566)"
                    strokeWidth="1.23149"
                  />
                  <rect
                    x="57.3887"
                    y="18.8691"
                    width="3.69446"
                    height="59.1114"
                    transform="rotate(-19.7218 57.3887 18.8691)"
                    fill="url(#paint15_linear_6546_566)"
                  />
                  <rect
                    x="56.995"
                    y="18.6832"
                    width="4.3102"
                    height="59.7271"
                    transform="rotate(-19.7218 56.995 18.6832)"
                    stroke="white"
                    strokeOpacity="0.15"
                    strokeWidth="0.615743"
                  />
                  <circle
                    cx="57.2533"
                    cy="13.0316"
                    r="6.15743"
                    transform="rotate(-19.7218 57.2533 13.0316)"
                    fill="url(#paint16_linear_6546_566)"
                    stroke="url(#paint17_radial_6546_566)"
                    strokeWidth="1.23149"
                  />
                </g>

                {/* Center hub with glowing effect */}
                <foreignObject x="-60.342" y="-54.1877" width="293.094" height="293.094">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `<div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(61.57px);clip-path:url(#bgblur_0_6546_566_clip_path);height:100%;width:100%"></div>`,
                    }}
                  />
                </foreignObject>
                <circle
                  data-figma-bg-blur-radius="123.149"
                  cx="86.2049"
                  cy="92.3592"
                  r="22.7825"
                  fill="url(#paint18_linear_6546_566)"
                  stroke="url(#paint19_radial_6546_566)"
                  strokeWidth="1.23149"
                  style={{
                    filter: isCellHovered ? "drop-shadow(0 0 12px rgba(46, 188, 255, 0.8))" : "none",
                    transition: "filter 0.6s ease",
                  }}
                />

                {/* Inner circles with counter-rotation */}
                <g
                  style={{
                    transformOrigin: "86.2049px 92.3592px",
                    transform: isCellHovered ? "rotate(-10deg)" : "rotate(0deg)",
                    transition: "transform 1s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <circle
                    cx="86.8213"
                    cy="91.7432"
                    r="14.7778"
                    stroke="white"
                    strokeOpacity={isCellHovered ? "0.8" : "0.5"}
                    strokeWidth="1.23149"
                    style={{
                      transition: "stroke-opacity 0.6s ease",
                    }}
                  />
                  <circle
                    cx="91.1311"
                    cy="86.1995"
                    r="7.38892"
                    fill="white"
                    fillOpacity={isCellHovered ? "0.9" : "0.5"}
                    style={{
                      filter: isCellHovered ? "drop-shadow(0 0 8px rgba(255, 255, 255, 0.9))" : "none",
                      transition: "fill-opacity 0.6s ease, filter 0.6s ease",
                    }}
                  />
                  <circle
                    cx="79.4322"
                    cy="100.364"
                    r="3.07872"
                    fill="white"
                    fillOpacity={isCellHovered ? "0.9" : "0.5"}
                    style={{
                      filter: isCellHovered ? "drop-shadow(0 0 6px rgba(255, 255, 255, 0.9))" : "none",
                      transition: "fill-opacity 0.6s ease, filter 0.6s ease",
                    }}
                  />
                </g>
                <defs>
                  <clipPath id="bgblur_0_6546_566_clip_path" transform="translate(60.342 54.1877)">
                    <circle cx="86.2049" cy="92.3592" r="22.7825" />
                  </clipPath>
                  <linearGradient
                    id="paint0_linear_6546_566"
                    x1="127.865"
                    y1="22.9883"
                    x2="127.865"
                    y2="82.0996"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#064A87" stopOpacity="0.02" />
                    <stop offset="1" stopColor="#071A33" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_6546_566"
                    x1="130.376"
                    y1="12.3203"
                    x2="130.376"
                    y2="25.8666"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#064A87" stopOpacity="0.02" />
                    <stop offset="1" stopColor="#071A33" />
                  </linearGradient>
                  <radialGradient
                    id="paint2_radial_6546_566"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(135.456 14.0136) rotate(133.152) scale(13.9263)"
                  >
                    <stop stopColor="white" />
                    <stop offset="0.539282" stopColor="white" stopOpacity="0.1" />
                  </radialGradient>
                  <linearGradient
                    id="paint3_linear_6546_566"
                    x1="163.154"
                    y1="108.189"
                    x2="163.154"
                    y2="167.301"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#064A87" stopOpacity="0.02" />
                    <stop offset="1" stopColor="#071A33" />
                  </linearGradient>
                  <linearGradient
                    id="paint4_linear_6546_566"
                    x1="166.233"
                    y1="104.558"
                    x2="166.233"
                    y2="118.104"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#064A87" stopOpacity="0.02" />
                    <stop offset="1" stopColor="#071A33" />
                  </linearGradient>
                  <radialGradient
                    id="paint5_radial_6546_566"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(171.313 106.251) rotate(133.152) scale(13.9263)"
                  >
                    <stop stopColor="white" />
                    <stop offset="0.539282" stopColor="white" stopOpacity="0.1" />
                  </radialGradient>
                  <linearGradient
                    id="paint6_linear_6546_566"
                    x1="125.496"
                    y1="148.984"
                    x2="125.496"
                    y2="208.096"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#064A87" stopOpacity="0.02" />
                    <stop offset="1" stopColor="#071A33" />
                  </linearGradient>
                  <linearGradient
                    id="paint7_linear_6546_566"
                    x1="125.108"
                    y1="147.867"
                    x2="125.108"
                    y2="161.413"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#064A87" stopOpacity="0.02" />
                    <stop offset="1" stopColor="#071A33" />
                  </linearGradient>
                  <radialGradient
                    id="paint8_radial_6546_566"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(130.188 149.56) rotate(133.152) scale(13.9263)"
                  >
                    <stop stopColor="white" />
                    <stop offset="0.539282" stopColor="white" stopOpacity="0.1" />
                  </radialGradient>
                  <linearGradient
                    id="paint9_linear_6546_566"
                    x1="39.0191"
                    y1="151.613"
                    x2="39.0191"
                    y2="210.725"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#064A87" stopOpacity="0.02" />
                    <stop offset="1" stopColor="#071A33" />
                  </linearGradient>
                  <linearGradient
                    id="paint10_linear_6546_566"
                    x1="32.4007"
                    y1="148.209"
                    x2="32.4007"
                    y2="161.755"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#064A87" stopOpacity="0.02" />
                    <stop offset="1" stopColor="#071A33" />
                  </linearGradient>
                  <radialGradient
                    id="paint11_radial_6546_566"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(37.4806 149.902) rotate(133.152) scale(13.9263)"
                  >
                    <stop stopColor="white" />
                    <stop offset="0.539282" stopColor="white" stopOpacity="0.1" />
                  </radialGradient>
                  <linearGradient
                    id="paint12_linear_6546_566"
                    x1="17.5445"
                    y1="72.4727"
                    x2="17.5445"
                    y2="131.584"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#064A87" stopOpacity="0.02" />
                    <stop offset="1" stopColor="#071A33" />
                  </linearGradient>
                  <linearGradient
                    id="paint13_linear_6546_566"
                    x1="10.9778"
                    y1="62.2596"
                    x2="10.9778"
                    y2="75.806"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#064A87" stopOpacity="0.02" />
                    <stop offset="1" stopColor="#071A33" />
                  </linearGradient>
                  <radialGradient
                    id="paint14_radial_6546_566"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(16.0576 63.9529) rotate(133.152) scale(13.9263)"
                  >
                    <stop stopColor="white" />
                    <stop offset="0.539282" stopColor="white" stopOpacity="0.1" />
                  </radialGradient>
                  <linearGradient
                    id="paint15_linear_6546_566"
                    x1="59.2359"
                    y1="18.8691"
                    x2="59.2359"
                    y2="77.9805"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#064A87" stopOpacity="0.02" />
                    <stop offset="1" stopColor="#071A33" />
                  </linearGradient>
                  <linearGradient
                    id="paint16_linear_6546_566"
                    x1="57.2533"
                    y1="6.25847"
                    x2="57.2533"
                    y2="19.8048"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#064A87" stopOpacity="0.02" />
                    <stop offset="1" stopColor="#071A33" />
                  </linearGradient>
                  <radialGradient
                    id="paint17_radial_6546_566"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(62.3332 7.95177) rotate(133.152) scale(13.9263)"
                  >
                    <stop stopColor="white" />
                    <stop offset="0.539282" stopColor="white" stopOpacity="0.1" />
                  </radialGradient>
                  <linearGradient
                    id="paint18_linear_6546_566"
                    x1="86.2049"
                    y1="68.9609"
                    x2="86.2049"
                    y2="115.757"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#064A87" stopOpacity="0.02" />
                    <stop offset="1" stopColor="#071A33" />
                  </linearGradient>
                  <radialGradient
                    id="paint19_radial_6546_566"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(103.754 74.8105) rotate(133.152) scale(48.1091)"
                  >
                    <stop stopColor="white" />
                    <stop offset="0.539282" stopColor="white" stopOpacity="0.1" />
                  </radialGradient>
                </defs>
              </svg>
            </div>

            <h5 className="text-xl md:text-2xl font-semibold leading-snug text-fg" style={{ zIndex: 2 }}>
              {primaryCards[2].title}
            </h5>

            <p
              className="text-center text-fg/80 text-base font-normal leading-relaxed max-w-[396px]"
              style={{ zIndex: 2 }}
            >
              {primaryCards[2].description}
            </p>
          </div> : null}
        </div>

        {extraCards.length > 0 ? (
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 w-full xl:max-w-[1349px] mx-auto">
            {extraCards.map((card, index) => (
              <div
                key={`${card.title}-${index}`}
                className="relative flex min-h-[220px] flex-col gap-4 rounded-[10px] px-5 py-6"
                style={{
                  background: "linear-gradient(249.67deg, color-mix(in srgb, var(--tech) 6%, transparent) 0%, rgba(24, 24, 24, 0) 100%)",
                }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    borderRadius: "10px",
                    padding: "1px",
                    background:
                      "radial-gradient(100% 100% at 49.96% 0%, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.15) 72.87%)",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
                <h5 className="relative z-10 text-xl md:text-2xl font-semibold leading-snug text-fg">{card.title}</h5>
                <p className="relative z-10 text-base font-normal leading-relaxed text-fg/80">{card.description}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default WhyChooseUsAboutSection;
