import Image from "next/image";

type CustomSupportProps = {
  title?: string;
  description?: string;
  imageData?: string;
};

const CustomSupport = ({
  title = "Empower Your Customer Support with JFT AI Chatbot",
  description = "JFT AI Chatbot, powered by advanced GenAI, seamlessly integrates with your websites and applications to provide immediate, accurate responses to customer queries. Say goodbye to delayed responses and hello to 24/7 personalized support that boosts user satisfaction and captures every opportunity for engagement and conversion.",
  imageData = "/images/ai-circle.svg",
}: CustomSupportProps) => {
  const resolvedImage = imageData || "/images/ai-circle.svg";
  const shouldUnoptimizeImage = resolvedImage.startsWith("data:") || resolvedImage.startsWith("http");

  return (
    <section className="sectionDefault">
      {/* Background Color */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle, #00070E 55%, #002348 100%)" }} />
      {/* Decorative Ellipses - Corners */}
      {/* Top Left */}
      {/* <div
        className="absolute z-0 pointer-events-none"
        style={{
          width: "284px",
          height: "284px",
          top: "-115px",
          left: "calc(-56px + 0vw)",
          background: "#389EFF",
          opacity: 1,
          filter: "blur(500px)",
          borderRadius: "50%",
        }}
      /> */}

      {/* Top Right */}
      {/* <div
        className="absolute z-0 pointer-events-none"
        style={{
          width: "284px",
          height: "284px",
          top: "-115px",
          left: "calc(100% - 1220px)",
          background: "#389EFF",
          opacity: 1,
          filter: "blur(500px)",
          borderRadius: "50%",
        }}
      /> */}

      {/* Bottom Left */}
      {/* <div
        className="absolute z-0 pointer-events-none"
        style={{
          width: "254px",
          height: "254px",
          top: "582px",
          left: "calc(-56px + 0vw)",
          background: "#389EFF",
          opacity: 1,
          filter: "blur(500px)",
          borderRadius: "50%",
        }}
      /> */}

      {/* Bottom Right */}
      {/* <div
        className="absolute z-0 pointer-events-none"
        style={{
          width: "254px",
          height: "254px",
          top: "582px",
          left: "calc(100% - 1220px)",
          background: "#389EFF",
          opacity: 1,
          filter: "blur(500px)",
          borderRadius: "50%",
        }}
      /> */}

      {/* Container */}
      <div className="container max-w-337.5">
        {/* Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-[845_1fr] items-center gap-10 lg:gap-0">
          {/* Grid 1 */}
           <div className="flex flex-col gap-6.25">
            <h2 className="title heading-gradient text-left">{title}</h2>

            <p className="subtitleMeXl80 text-left leading-relaxed">
              {description}
            </p>
          </div>

          {/* Grid 2 */}
          <div className="relative w-full flex justify-center xl:justify-end">
            <Image src={resolvedImage} alt="AI Circle" width={428} height={398} priority unoptimized={shouldUnoptimizeImage} className="w-[300px] h-[300px] md:w-[360px] md:h-[360px] lg:w-[428px] lg:h-[398px]"/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomSupport;
