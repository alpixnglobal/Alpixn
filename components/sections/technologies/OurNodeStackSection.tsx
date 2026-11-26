import Image from "next/image";

import type { TechnologyStackItemRecord } from "@/lib/content-types";

type OurNodeStackSectionProps = {
  title?: string;
  items?: TechnologyStackItemRecord[];
};

const defaultItems: TechnologyStackItemRecord[] = [
  { label: "Jest", imageData: "/images/jest.svg" },
  { label: "Mongoose", imageData: "/images/mongoose.svg" },
  { label: "Nest Js", imageData: "/images/nestjs.svg" },
  { label: "Sequelize", imageData: "/images/sequelize.svg" },
  { label: "Socket", imageData: "/images/socket.svg" },
  { label: "Eslint", imageData: "/images/eslint.svg" },
  { label: "Jquery", imageData: "/images/jquery.svg" },
  { label: "Lodas", imageData: "/images/lodas.svg" },
  { label: "TypeScript", imageData: "/images/typescript.svg" },
  { label: "Webpack", imageData: "/images/webpack.svg" },
];

const cellClasses = [
  "border-r border-b border-white/10",
  "sm:border-r border-b border-white/10",
  "border-r sm:border-r-0 md:border-r border-b border-white/10",
  "sm:border-r border-b border-white/10",
  "border-b border-r sm:border-r md:border-r-0 border-white/10",
  "border-t border-r-0 md:border-r border-white/10",
  "border-t border-r border-white/10",
  "border-t sm:border-r border-white/10",
  "border-t border-r sm:border-r-0 md:border-r border-white/10",
  "border-t border-white/10",
];

const OurNodeStackSection = ({ title = "Technology Stack We Use For Node.js Development", items = defaultItems }: OurNodeStackSectionProps) => {
  const resolvedItems = items.length > 0 ? items : defaultItems;

  return (
    <section className="sectionDefault">
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle, rgba(0, 7, 14, 1) 15%, rgba(0, 35, 72, 1) 100%)" }} />

      <div className="container max-w-303.75">
        <h2 className="title heading-gradient max-w-[826px] mx-auto text-start sm:text-center">{title}</h2>
        <div className="mt-8 md:mt-10 lg:mt-12.5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5">
          {resolvedItems.map((item, index) => (
            <div key={`${item.label}-${index}`} className={`flex flex-col items-center justify-center p-3 lg:p-[15px] h-[100px] lg:h-[112px] bg-[linear-gradient(180deg,rgba(24,24,24,0.24)_0%,rgba(56,158,255,0.06)_100%)] ${cellClasses[index % cellClasses.length]}`}>
              <div className="flex flex-col items-center gap-[5px]">
                <Image src={item.imageData} alt={item.label} width={40} height={40} className="w-8 h-8 lg:w-10 lg:h-10" unoptimized={item.imageData.startsWith("data:") || item.imageData.startsWith("http")} />
                <p className="text-sm lg:text-base font-normal text-white/80 text-center">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurNodeStackSection;
