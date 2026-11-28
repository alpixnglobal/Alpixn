import Image from "next/image";
import { submitOffshoreEnquiryAction } from "@/admin/actions/admin-actions";
import ApplicationStatusToastWrapper from "@/components/sections/job-apply/ApplicationStatusToastWrapper";
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
import { offshoreTechIcon } from "@/lib/offshore developer/content";
import { Bot, Boxes, BrainCircuit, Eye, Languages, Layers, Network, Smartphone, Sparkles, Users, type LucideIcon } from "lucide-react";
import SpamGuard from "@/components/forms/SpamGuard";


const ROLE_ICON: Record<string, LucideIcon> = {
  "kotlin-developer": Smartphone, "ionic-developer": Smartphone, "full-stack-developer": Layers,
  "ai-development-teams": BrainCircuit, "computer-vision-engineers": Eye, "generative-ai-engineers": Sparkles,
  "nlp-engineers": Languages, "ai-team-augmentation": Users, "llm-engineers": Network, "ms-power-apps-developer": Boxes,
};

function RoleBadge({ slug, label }: { slug: string; label: string }) {
  const svg = offshoreTechIcon(slug);
  const Icon = ROLE_ICON[slug] ?? Bot;
  return (
    <span className="inline-flex w-fit items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pl-1.5 pr-4 shadow-[var(--shadow-card)]">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-canvas ring-1 ring-line">
        {svg ? <Image src={svg} alt="" width={18} height={18} className="h-[18px] w-[18px] object-contain" /> : <Icon aria-hidden className="h-4 w-4 text-[#0878d1]" />}
      </span>
      <span className="text-[13px] font-semibold text-fg">{label}</span>
    </span>
  );
}

interface OffshoreHeroSectionProps {
  slug?: string;
  data?: {
    title: string;
    description: string;
    checklist: string[];
    formTitle: string;
    technologies: OffshoreHeroTechnologyRecord[];
  };
  pagePath?: string;
  role?: string;
  /** Page slug, used for the technology badge. */
  badgeSlug?: string;
  badgeLabel?: string;
}

const OffshoreHeroSection = ({ slug = "default", data, pagePath = "/offshore-developer", role = "", badgeSlug, badgeLabel }: OffshoreHeroSectionProps) => {
  const fallbackData = getOffshoreHeroData(slug);
  const { title, description, checklist, formTitle, technologies } = data ?? fallbackData;
  const heroTitleClassName = "font-display font-bold text-fg text-[clamp(1.55rem,2.5vw,2.2rem)] leading-[1.08] tracking-[-0.03em] w-full";

  return (
    <section className="relative w-full min-h-0 overflow-hidden">
      <ApplicationStatusToastWrapper />
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
        <div className="w-full max-w-[1354px] mx-auto pt-8 pb-10 md:pt-10 lg:pt-12 lg:pb-12 px-4 md:px-6 xl:px-0">
          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[56%_1fr] gap-8 lg:gap-0 lg:items-center">
            {/* Grid 1 */}
            <div className="flex flex-col gap-4 lg:gap-[20px]">
              {/* Hero Title */}
              {badgeSlug ? <RoleBadge slug={badgeSlug} label={badgeLabel ?? ""} /> : null}
              <h1 className={heroTitleClassName}>
                {(() => {
                  const words = title.trim().split(/\s+/);
                  if (words.length < 4) return title;
                  return (
                    <>
                      {words.slice(0, -3).join(" ")} <span className="text-brand-spectrum">{words.slice(-3).join(" ")}</span>
                    </>
                  );
                })()}
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
                className="w-full max-w-[440px] h-auto flex flex-col gap-3 p-5 lg:px-6 lg:py-5"
                style={{
                  background:
                    "linear-gradient(314.76deg, rgb(var(--hi-rgb) / calc(0.08 * var(--hi-scale))) 0%, rgb(var(--hi-rgb) / calc(0.08 * var(--hi-scale))) 100%)",
                  border: "1px solid #FFFFFF26",
                  backdropFilter: "blur(25px)",
                  borderRadius: "10px",
                }}
              >
                <h3 className="text-left sm:text-center font-display font-semibold text-lg">
                  {formTitle}
                </h3>
                <form action={submitOffshoreEnquiryAction} className="w-full">
              <SpamGuard />
                  <input type="hidden" name="pagePath" value={pagePath} />
                  <input type="hidden" name="role" value={role} />
                  <div className="flex flex-col gap-2.5">
                    <div className="flex flex-col lg:flex-row gap-2.5">
                      <Input type="text" name="fullName" required autoComplete="name" placeholder="Full Name *" className="h-10 w-full text-sm" />
                      <Input type="tel" name="phone" required autoComplete="tel" placeholder="Contact Number *" className="h-10 w-full text-sm" />
                    </div>
                    <div className="flex flex-col lg:flex-row gap-2.5">
                      <Input type="email" name="email" required autoComplete="email" placeholder="Business Email *" className="h-10 w-full text-sm" />
                      <Input type="text" name="company" autoComplete="organization" placeholder="Company Name" className="h-10 w-full text-sm" />
                    </div>
                    <div>
                      <Select name="technology">
                        <SelectTrigger className="!h-10 w-full text-sm">
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
                      <Textarea name="message" placeholder="Describe Your Query" className="!min-h-[72px] h-[72px] text-sm" />
                    </div>
                    <div>
                      <button type="submit" className="btn-brand w-full !py-2.5">
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
