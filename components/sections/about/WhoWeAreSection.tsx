import Image from "next/image";

const WhoWeAreSection = ({
  title = "Who We Are?",
  paragraphOne = "Founded in 2017, AICompany is a next-generation IT company committed to transforming ideas into intelligent digital solutions. With expertise spanning software development, mobile applications, AI-based systems, ERP, and digital marketing, AICompany stands as a trusted technology partner for startups, enterprises, and innovators across industries.",
  paragraphTwo = "Our team blends creativity, strategy, and technology to craft scalable, secure, and future-ready solutions that drive real business growth. From concept to execution - we help brands evolve, automate, and accelerate in the digital age.",
  imageData = "/images/whoweare.png",
}: {
  title?: string;
  paragraphOne?: string;
  paragraphTwo?: string;
  imageData?: string;
}) => {
  const shouldUnoptimizeImage = imageData.startsWith("data:") || imageData.startsWith("http");

  return (
    <section
      className="sectionDefault overflow-hidden"
      style={{ background: "radial-gradient(circle, rgba(0, 7, 14, 1) 75%, rgba(0, 35, 72, 1) 100%)" }}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-[45px]">
        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden flex flex-col gap-8 md:gap-10">
          <div className="flex items-center gap-3 sm:gap-4">
            <svg
              width="60"
              height="2"
              viewBox="0 0 86 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 sm:w-16"
            >
              <line
                x1="1"
                y1="1"
                x2="85"
                y2="1"
                stroke="url(#paint0_linear_1591_3780)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1591_3780"
                  x1="0"
                  y1="2.5"
                  x2="86"
                  y2="2.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" />
                  <stop offset="0.475962" stopColor="#BCDEFF" />
                  <stop offset="1" stopColor="white" />
                </linearGradient>
              </defs>
            </svg>
              <span
                className="text-gradient font-bold text-2xl md:text-3xl leading-snug"
              style={{
                background: "linear-gradient(89.81deg, #FFFFFF 19.79%, #FFFFFF 76.65%, #BCDEFF 93.54%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
                {title}
              </span>
          </div>

          {/* Image on top for mobile/tablet */}
          <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px]">
            <Image
              src={imageData}
              fill
              alt="Who We Are Image"
              className="object-cover object-center"
              sizes="100vw"
              priority
              unoptimized={shouldUnoptimizeImage}
            />
          </div>

          <div className="flex flex-col gap-4 sm:gap-6">
            <p className="font-normal text-base md:text-lg text-white leading-relaxed">
              {paragraphOne}
            </p>
            <p className="font-normal text-base md:text-lg text-white leading-relaxed">
              {paragraphTwo}
            </p>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2">
          {/* Left */}
          <div className="flex flex-col gap-[25px] max-w-[628px]">
            {/* Heading */}
            <div className="flex items-center gap-[12px]">
              {/* Border */}
              <div
                className="w-[86px] h-[2px]"
                style={{
                  background: "linear-gradient(90deg, #FFFFFF 0%, #BCDEFF 47.6%, #FFFFFF 100%)",
                }}
              />

                <span className="heading-gradient text-2xl md:text-3xl font-bold leading-snug">{title}</span>
              </div>

            {/* Paragraph 1 */}
            <p className="font-normal text-base md:text-lg leading-relaxed text-white/90">
              {paragraphOne}
            </p>
            <p className="font-normal text-base md:text-lg leading-relaxed text-white/90">
              {paragraphTwo}
            </p>
          </div>
          {/* Right */}
          <div className="relative w-full max-w-[677px] h-[250px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[432px] mt-auto">
            <Image
              src={imageData}
              fill
              alt="Who We Are Image"
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              unoptimized={shouldUnoptimizeImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
