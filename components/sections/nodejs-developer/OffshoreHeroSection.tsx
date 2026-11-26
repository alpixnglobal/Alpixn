import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import { getOffshoreHeroData } from "@/lib/offshore developer/offshore-banner-data";
import type { OffshoreHeroTechnologyRecord } from "@/lib/content-types";

interface OffshoreHeroSectionProps {
  slug?: string;
  data?: {
    title: string;
    description: string;
    checklist: string[];
    formTitle: string;
    technologies: OffshoreHeroTechnologyRecord[];
  };
}

const OffshoreHeroSection = ({ slug = "default", data }: OffshoreHeroSectionProps) => {
  const fallbackData = getOffshoreHeroData(slug);
  const { title, description, checklist, formTitle, technologies } = data ?? fallbackData;
  const heroTitleClassName = "font-display font-bold text-fg text-[clamp(1.85rem,3.3vw,2.9rem)] leading-[1.08] tracking-[-0.03em] w-full";

  return (
    <section className="relative w-full min-h-[628px] overflow-hidden">
      {/* Background Color  */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(60% 60% at 0% 0%, rgba(8,120,209,0.14), transparent 70%), radial-gradient(60% 60% at 100% 10%, rgba(246,215,122,0.35), transparent 70%), var(--canvas)" }}
      />
      {/* Background Left */}
      <div className="absolute hidden md:block w-[400px] md:w-[500px] lg:w-[698.52px] h-[400px] md:h-[500px] lg:h-[666px] top-0 -left-[10%] md:-left-[8%] lg:-left-[6%] z-0">
        <Image
          src="/images/geometry-one.png"
          alt="Geometry background"
          fill
          className="object-contain z-50"
          sizes="(max-width: 768px) 400px, (max-width: 1024px) 500px, 698.52px"
        />
      </div>

      {/* Background Right */}
      <div className="absolute hidden md:block w-[400px] md:w-[500px] lg:w-[698.52px] h-[400px] md:h-[500px] lg:h-[666px] bottom-0 -right-[10%] md:-right-[8%] lg:-right-[6%] z-0">
        <Image
          src="/images/geomety-two.png"
          alt="Geometry background"
          fill
          className="object-contain z-40"
          sizes="(max-width: 768px) 400px, (max-width: 1024px) 500px, 698.52px"
        />
      </div>

      {/* Content container*/}
      <div className="relative z-10 w-full">
        {/* Container */}
        <div className="w-full max-w-[1354px] mx-auto pt-8 md:pt-12 lg:pt-[57px] px-4 md:px-6 xl:px-0">
          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[56%_1fr] gap-8 lg:gap-0">
            {/* Grid 1 */}
            <div className="flex flex-col gap-4 lg:gap-[20px]">
              {/* Hero Title */}
              <h1 className={heroTitleClassName}>
                {title}
              </h1>
              {/* Hero Desc */}
              <p className="font-normal text-base md:text-lg leading-relaxed text-fg">
                {description}
              </p>
              {/* Hero Check List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 w-full max-w-[640px] justify-between gap-3 lg:gap-4">
                {checklist.map((item, index) => (
                  <div key={index} className="flex gap-2.5 items-center">
                    <div className="relative w-3.5 h-3.5 lg:h-5 lg:w-5">
                      <Image src="/icons/bullet.svg" alt="bullet-list" fill />
                    </div>
                    <p className="font-normal text-sm md:text-base leading-relaxed text-fg">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* Grid 2 */}
            <div className="flex justify-center lg:justify-end">
              {/* Card */}
              <div
                className="w-full max-w-[471px] lg:w-[471px] h-auto lg:h-[515px] flex flex-col gap-4 lg:gap-[20px] p-6 lg:p-0"
                style={{
                  background:
                    "linear-gradient(314.76deg, rgb(var(--hi-rgb) / calc(0.08 * var(--hi-scale))) 0%, rgb(var(--hi-rgb) / calc(0.08 * var(--hi-scale))) 100%)",
                  border: "1px solid #FFFFFF26",
                  backdropFilter: "blur(25px)",
                  borderRadius: "10px",
                }}
              >
                <h3 className="text-left sm:text-center font-semibold text-xl md:text-2xl lg:text-2xl mt-4 lg:mt-[25px]">
                  {formTitle}
                </h3>
                <form className="w-full lg:w-[421px] mx-auto px-0 sm:px-2 md:px-0 lg:px-0">
                  <div className="flex flex-col gap-4 lg:gap-[20px]">
                    <div className="flex flex-col lg:flex-row gap-4 lg:gap-[20px]">
                      <Input type="text" placeholder="Full Name" className="w-full" />
                      <Input type="text" placeholder="Contact Number" className="w-full" />
                    </div>
                    <div className="flex flex-col lg:flex-row gap-4 lg:gap-[20px]">
                      <Input type="email" placeholder="Business Email" className="w-full" />
                      <Input type="email" placeholder="Company Email" className="w-full" />
                    </div>
                    <div>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Technology" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Technology</SelectLabel>
                            {technologies.map((tech) => (
                              <SelectItem key={tech.value} value={tech.value}>
                                {tech.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Textarea placeholder="Describe Your Query" />
                    </div>
                    <div>
                      <button className="btn-brand w-full">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OffshoreHeroSection;
