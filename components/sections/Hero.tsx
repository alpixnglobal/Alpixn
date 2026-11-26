import Link from "next/link";
import { ArrowRight, BrainCircuit, Bot, Code2 } from "lucide-react";
import HeroVisual from "@/components/hero/HeroVisual";

/**
 * Homepage hero. Copy, CTAs and the fallback image all come from Home Settings (CMS);
 * the 3D robotics scene is a progressive enhancement layered on top.
 */
const Hero = ({
  title = "Building Digital Solutions That Scale with You",
  description = "Custom software, AI, and web solutions tailored to your growth journey",
  primaryAction = { label: "Let’s Talk", href: "/contact-us" },
  secondaryAction = { label: "See Our Work", href: "/resources/portfolio" },
  heroImageData = "/images/hero.png",
}: {
  title?: string;
  description?: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  heroImageData?: string;
}) => {
  const pillars = [
    { icon: BrainCircuit, label: "Artificial Intelligence" },
    { icon: Bot, label: "Robotics & Automation" },
    { icon: Code2, label: "Software Engineering" },
  ];

  return (
    <section aria-labelledby="hero-title" className="relative isolate w-full overflow-hidden bg-canvas">
      {/* ---------- Background system ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-ambient" />
        <div className="absolute right-[-10%] top-[-20%] h-[720px] w-[720px] rounded-full bg-tech/20 blur-[140px] dark:bg-tech/25" />
        <div className="absolute bottom-[-25%] left-[-10%] h-[520px] w-[520px] rounded-full bg-gold/10 blur-[140px]" />
        {/* perspective floor grid */}
        <div className="absolute inset-x-0 bottom-0 h-[55%] [perspective:900px]">
          <div className="absolute inset-0 origin-bottom bg-grid opacity-60 [transform:rotateX(62deg)] [mask-image:linear-gradient(to_top,#000_10%,transparent_85%)]" />
        </div>
        {/* scanning light */}
        <div className="absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_20%,#000_80%,transparent)]">
          <div className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-tech/10 to-transparent [animation:scan-line_7s_ease-in-out_infinite]" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px rule-gold" />
      </div>

      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-6 px-4 pb-10 pt-10 sm:px-6 sm:pt-14 lg:min-h-[calc(100svh-84px)] lg:max-h-[940px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-4 lg:px-10 lg:pb-16 lg:pt-8 2xl:px-[45px]">
        {/* ---------- Copy ---------- */}
        <div className="relative z-10 flex flex-col items-start">
          <span className="eyebrow glass rounded-full !px-4 py-2 before:!hidden">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-dot" />
            AI · Robotics · Software Engineering
          </span>

          <h1
            id="hero-title"
            className="heading-gradient mt-6 max-w-[640px] text-[2.35rem] font-semibold !leading-[1.06] sm:text-5xl lg:text-[3.6rem] xl:text-[4.1rem]"
          >
            {title}
          </h1>

          <div aria-hidden className="mt-6 h-[3px] w-24 rounded-full bg-gradient-to-r from-gold via-gold-soft to-tech" />

          <p className="mt-6 max-w-[540px] text-base leading-relaxed text-fg-muted sm:text-lg">{description}</p>

          <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <Link href={primaryAction.href} className="btn-brand">
              {primaryAction.label}
              <ArrowRight aria-hidden className="btn-arrow h-4 w-4" />
            </Link>
            <Link href={secondaryAction.href} className="btn-ghost-brand">
              {secondaryAction.label}
            </Link>
          </div>

          <ul className="mt-10 grid w-full max-w-[560px] grid-cols-1 gap-2.5 sm:grid-cols-3">
            {pillars.map(({ icon: Icon, label }) => (
              <li key={label} className="glass flex items-center gap-2.5 rounded-xl px-3 py-2.5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-tech/20 to-gold/20 ring-1 ring-line-gold">
                  <Icon aria-hidden className="h-4 w-4 text-tech" />
                </span>
                <span className="text-[13px] font-medium leading-tight text-fg">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- 3D robotics visual ---------- */}
        <div className="relative -mx-4 h-[380px] sm:mx-0 sm:h-[480px] lg:h-full lg:min-h-[560px]">
          <HeroVisual fallbackImage={heroImageData} />
        </div>
      </div>

    </section>
  );
};

export default Hero;
