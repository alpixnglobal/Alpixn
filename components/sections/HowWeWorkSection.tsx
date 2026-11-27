import Accent from "@/components/ui/Accent";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Gauge, ShieldCheck, Wrench } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const PRINCIPLES = [
  {
    icon: Compass,
    title: "Start from the outcome",
    text: "We define the decision, workflow or customer journey to improve before choosing a model, framework or vendor. Technology follows the problem.",
  },
  {
    icon: Gauge,
    title: "Release in measurable steps",
    text: "Discovery, prototype, pilot, then scale. Each step has a clear success measure, so you can change direction early and cheaply.",
  },
  {
    icon: Wrench,
    title: "Engineering you can own",
    text: "Typed, tested and documented code, automated delivery pipelines and a clean handover — so the software stays maintainable after launch.",
  },
  {
    icon: ShieldCheck,
    title: "Responsible AI and automation",
    text: "Evaluation before launch, human oversight for consequential actions, and privacy and security considered from the first design session.",
  },
];

const STEPS = [
  ["Discover", "Goals, users, data and constraints"],
  ["Design", "Flows, prototypes and architecture"],
  ["Build", "Iterative sprints with demos"],
  ["Launch", "Pilot, training and monitoring"],
  ["Improve", "Measure, refine and extend"],
];

/** "Why ALPIXN" — principles and process, stated as commitments rather than unverifiable claims. */
export default function HowWeWorkSection() {
  return (
    <section aria-labelledby="how-we-work-title" className="relative w-full overflow-hidden bg-canvas-2 py-20 sm:py-24 lg:py-28">
      <div aria-hidden className="absolute inset-x-0 top-0 rule-gold" />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-12%] top-1/2 h-[820px] w-[820px] -translate-y-1/2 rounded-full border border-line" />
        <div className="absolute right-[-4%] top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full border border-dashed border-line-gold [animation:spin_90s_linear_infinite]" />
        <Image src="/brand/alpixn-emblem.webp" alt="" width={480} height={480} className="absolute right-[2%] top-1/2 w-[380px] -translate-y-1/2 opacity-[0.06]" />
      </div>
      <div className="relative mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-10 xl:px-0">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <span className="eyebrow">Why ALPIXN</span>
            <h2 id="how-we-work-title" className="mt-4 font-display text-[clamp(1.35rem,1.9vw,1.75rem)] font-bold leading-[1.15] tracking-[-0.025em] text-fg"><Accent text="How we work with you" /></h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-fg-muted sm:text-lg">
              ALPIXN combines AI engineering, robotics software and product development in one team. Whether you need a customer-facing app, an internal system or an intelligent automation, the way we work stays the same.
            </p>
            <ol className="mt-8 space-y-3">
              {STEPS.map(([title, text], i) => (
                <li key={title} className="flex items-center gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line-gold font-mono text-xs text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="font-display text-[15px] font-semibold text-fg">{title}</span>
                    <span className="ml-2 text-sm text-fg-muted">{text}</span>
                  </span>
                </li>
              ))}
            </ol>
            <Link href="/about" className="btn-ghost-brand mt-10">
              About ALPIXN <ArrowRight aria-hidden className="btn-arrow h-4 w-4" />
            </Link>
          </Reveal>
          <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {PRINCIPLES.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={(i % 2) * 120} className={i % 2 === 1 ? "sm:translate-y-10" : ""}>
                <article className="border-glow h-full rounded-2xl bg-surface p-6 shadow-[var(--shadow-card)]">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-tech/20 to-gold/20 ring-1 ring-line-gold">
                    <Icon aria-hidden className="h-5 w-5 text-tech" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-fg">{title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{text}</p>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
