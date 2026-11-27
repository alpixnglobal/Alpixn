import Link from "next/link";
import { ArrowRight, Bot, BrainCircuit, Code2, Workflow } from "lucide-react";

/**
 * Concept A — full-screen video hero. Plays an ALPIXN-rendered robotics loop (no third-party
 * footage), with a navy gradient for legibility. Reduced-motion users and slow connections get
 * the poster image instead (the browser skips autoplay; poster stays visible).
 */
const PILLS = [
  { icon: BrainCircuit, label: "AI solutions" },
  { icon: Bot, label: "Robotics software" },
  { icon: Code2, label: "Software engineering" },
  { icon: Workflow, label: "Automation" },
];

export default function HeroVideo({ title, description }: { title: string; description: string }) {
  const words = title.trim().split(/\s+/);
  const lead = words.slice(0, -3).join(" ");
  const tail = words.slice(-3).join(" ");
  return (
    <section aria-labelledby="hero-video-title" className="dark relative isolate flex min-h-[calc(100svh-72px)] items-center overflow-hidden bg-[#040d1c] text-white">
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[80%_50%] opacity-60 motion-reduce:hidden lg:object-center lg:opacity-100"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/media/hero/hero-video-poster.webp"
        aria-hidden
      >
        <source src="/media/hero/hero-video.webm" type="video/webm" />
        <source src="/media/hero/hero-video.mp4" type="video/mp4" />
      </video>
      <div aria-hidden className="absolute inset-0 -z-20 hidden bg-[url('/media/hero/hero-video-poster.webp')] bg-cover bg-center motion-reduce:block" />
      {/* Legibility: strong on the left where the text sits, open on the right where the robot is */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,13,28,0.94)_0%,rgba(4,13,28,0.78)_38%,rgba(4,13,28,0.15)_70%,rgba(4,13,28,0.05)_100%)]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#040d1c] to-transparent" />

      <div className="mx-auto w-full max-w-[1320px] px-4 py-20 sm:px-6 lg:px-10">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-[#f6d77a] backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
            AI · Robotics · Software
          </span>
          <h1 id="hero-video-title" className="mt-6 font-display text-[clamp(2rem,4vw,3.4rem)] font-bold leading-[1.06] tracking-[-0.03em]">
            {lead}
            <br />
            <span className="text-gold-grad">{tail}</span>
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/80">{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact-us" className="btn-brand !px-7 !py-3.5 text-[15px]">
              Start a project <ArrowRight aria-hidden className="btn-arrow h-4 w-4" />
            </Link>
            <Link href="/our-expertise" className="btn-ghost-brand !px-7 !py-3.5 text-[15px]">
              Explore services
            </Link>
          </div>
          <ul className="mt-10 flex flex-wrap gap-2">
            {PILLS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[13px] text-white/85 backdrop-blur">
                <Icon aria-hidden className="h-4 w-4 text-[#f6d77a]" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-brand-spectrum" />
    </section>
  );
}
