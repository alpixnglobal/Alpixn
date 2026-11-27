"use client";

import { useEffect, useRef, useState } from "react";
import { BrainCircuit, Building2, Cloud, Palette, PhoneCall, Rocket, Sparkles, Sprout } from "lucide-react";

/**
 * "Our Journey" — scroll-driven timeline. A gold→blue spine fills as you scroll, a glowing
 * marker rides it, and each milestone card slides in from its side when it enters the view.
 * Respects prefers-reduced-motion (everything simply shows).
 */
type Milestone = { year: string; title: string; text: string; icon: React.ComponentType<{ className?: string }>; tag: string; c: string; ink: string };

const MILESTONES: Milestone[] = [
  { year: "2017", title: "The Beginning", tag: "Founded", icon: Sprout, c: "#0878d1", ink: "#ffffff", text: "ALPIXN was founded with a clear vision: build innovative digital solutions and lay a strong foundation in technology-driven services." },
  { year: "2018", title: "First Enterprise Breakthrough", tag: "Enterprise", icon: Building2, c: "#d99a19", ink: "#071a33", text: "Delivered enterprise-grade ERP systems and mobile applications — our entry into large-scale digital transformation." },
  { year: "2019", title: "Expanding Creative Horizons", tag: "Design & UX", icon: Palette, c: "#064a87", ink: "#ffffff", text: "Grew into digital design and user experience, combining creativity with engineering to deliver complete digital products." },
  { year: "2020", title: "The AI Revolution Begins", tag: "AI", icon: BrainCircuit, c: "#9a5b08", ink: "#ffffff", text: "Introduced AI-powered tools for automation and business management, helping teams work faster and decide smarter." },
  { year: "2021", title: "Going Global with Cloud", tag: "Cloud", icon: Cloud, c: "#0878d1", ink: "#ffffff", text: "Started working with international clients and launched scalable cloud platforms to support business operations across borders." },
  { year: "2023", title: "Introducing AutoMarkAI", tag: "Product", icon: Sparkles, c: "#d99a19", ink: "#071a33", text: "Built intelligent automation and AI-powered platforms that boost productivity across marketing and everyday business workflows." },
  { year: "2024", title: "Product Launch", tag: "Launch", icon: Rocket, c: "#064a87", ink: "#ffffff", text: "Launched our own product line — ready-to-use, AI-powered software that businesses can adopt quickly and scale with confidence." },
  { year: "2025", title: "A New Office", tag: "Growth", icon: Building2, c: "#9a5b08", ink: "#ffffff", text: "Opened a new office to support a growing team and our clients across nine markets, from India and the UAE to the UK, USA and Australia." },
  { year: "2026", title: "Multilingual AI Calling System", tag: "AI voice", icon: PhoneCall, c: "#f6d77a", ink: "#071a33", text: "Introduced an AI calling system that speaks with customers in multiple languages — answering, qualifying and following up around the clock." },
];

export default function JourneyTimeline() {
  const wrap = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [seen, setSeen] = useState<Set<number>>(() => new Set());

  // Spine fill follows scroll position through the section.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh * 0.55 - r.top) / Math.max(1, r.height);
      setProgress(Math.max(0, Math.min(1, p)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Reveal each milestone once.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-mi]"));
    if (reduce) {
      const id = window.setTimeout(() => setSeen(new Set(items.map((_, i) => i))), 0);
      return () => window.clearTimeout(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.mi);
            setSeen((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));
          }
        });
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0.2 }
    );
    items.forEach((it) => io.observe(it));
    return () => io.disconnect();
  }, []);

  const first = MILESTONES[0].year;
  const last = MILESTONES[MILESTONES.length - 1].year;
  const yearsActive = Number(last) - Number(first);
  const activeIndex = Math.min(MILESTONES.length - 1, Math.floor(progress * MILESTONES.length));

  return (
    <section aria-labelledby="journey-title" className="relative overflow-hidden bg-[#040d1c] py-20 text-white sm:py-24">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-20" />
      <div aria-hidden className="absolute -left-40 top-10 h-[480px] w-[480px] rounded-full bg-[#0878d1]/20 blur-[140px]" />
      <div aria-hidden className="absolute -right-40 bottom-10 h-[480px] w-[480px] rounded-full bg-[#d99a19]/15 blur-[140px]" />

      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-[#f6d77a]">
            <span className="h-1.5 w-1.5 rounded-full bg-current" /> Our journey
          </span>
          <h2 id="journey-title" className="mt-4 font-display text-[clamp(1.35rem,1.9vw,1.75rem)] font-bold leading-[1.15] tracking-[-0.025em]">
            Our Journey of <span className="text-gold-grad">Innovation and Growth</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15.5px] leading-relaxed text-white/75">
            From a visionary start in {first} to building AI, robotics and software solutions today — every milestone reflects ALPIXN&apos;s commitment to empowering businesses through innovation, intelligence and technology.
          </p>
        </div>

        {/* Sticky year counter */}
        <div className="pointer-events-none sticky top-24 z-20 mx-auto mt-10 flex w-fit items-center gap-3 rounded-full border border-white/10 bg-[#071a33]/80 px-4 py-2 backdrop-blur">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">Year</span>
          <span className="font-display text-xl font-bold tabular-nums text-[#f6d77a]">{MILESTONES[activeIndex].year}</span>
          <span className="h-1.5 w-24 overflow-hidden rounded-full bg-white/10">
            <span className="block h-full rounded-full bg-brand-spectrum transition-[width] duration-200" style={{ width: `${Math.round(progress * 100)}%` }} />
          </span>
          <span className="font-mono text-[11px] text-white/50">{yearsActive}+ yrs</span>
        </div>

        {/* Timeline */}
        <div ref={wrap} className="relative mt-12">
          {/* spine */}
          <div aria-hidden className="absolute bottom-0 left-5 top-0 w-[3px] -translate-x-1/2 rounded-full bg-white/10 md:left-1/2" />
          <div aria-hidden className="absolute left-5 top-0 w-[3px] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,#0878d1,#f6d77a_50%,#d99a19)] shadow-[0_0_18px_rgba(246,215,122,0.6)] md:left-1/2" style={{ height: `${progress * 100}%` }} />
          <div aria-hidden className="absolute left-5 z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f6d77a] shadow-[0_0_0_6px_rgba(246,215,122,0.18),0_0_30px_#f6d77a] md:left-1/2" style={{ top: `${progress * 100}%` }} />

          <ol className="space-y-10 md:space-y-4">
            {MILESTONES.map((m, i) => {
              const right = i % 2 === 1;
              const shown = seen.has(i);
              const Icon = m.icon;
              const reached = progress * MILESTONES.length > i + 0.15;
              return (
                <li key={m.year} data-mi={i} className="relative grid items-center md:grid-cols-2 md:gap-16">
                  {/* node */}
                  <span
                    aria-hidden
                    className={`absolute left-5 top-6 z-10 grid h-11 w-11 -translate-x-1/2 place-items-center rounded-full border-2 transition-all duration-500 md:left-1/2 md:top-1/2 md:-translate-y-1/2 ${reached ? "scale-100 border-transparent" : "scale-90 border-white/20 bg-[#071a33]"}`}
                    style={reached ? { background: m.c, color: m.ink, boxShadow: `0 0 0 6px ${m.c}33, 0 0 26px ${m.c}` } : undefined}
                  >
                    <Icon className="h-5 w-5" />
                  </span>

                  {/* big outlined year on the empty side */}
                  <div aria-hidden className={`hidden md:block ${right ? "md:order-1 md:text-right" : "md:order-2"}`}>
                    <span
                      className={`font-display text-[clamp(3.5rem,7vw,6rem)] font-bold leading-none tracking-tight transition-all duration-700 ${shown ? "opacity-100" : "opacity-0"} ${shown ? "translate-y-0" : "translate-y-6"}`}
                      style={{ color: "transparent", WebkitTextStroke: `1.5px ${reached ? m.c : "rgba(255,255,255,0.18)"}` }}
                    >
                      {m.year}
                    </span>
                  </div>

                  {/* card */}
                  <div className={`pl-14 md:pl-0 ${right ? "md:order-2" : "md:order-1"}`}>
                    <article
                      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-700 ease-out hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07] ${
                        shown ? "translate-x-0 opacity-100" : right ? "translate-x-10 opacity-0" : "-translate-x-10 opacity-0"
                      }`}
                    >
                      <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: m.c }} />
                      <span aria-hidden className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40" style={{ background: m.c }} />
                      <div className="flex items-center gap-3">
                        <span className="font-display text-2xl font-bold md:hidden" style={{ color: m.c === "#064a87" ? "#7cc6ff" : m.c }}>
                          {m.year}
                        </span>
                        <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ background: `${m.c}26`, color: m.c === "#064a87" ? "#7cc6ff" : m.c }}>
                          {m.tag}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-lg font-bold">{m.title}</h3>
                      <p className="mt-2 text-[14.5px] leading-relaxed text-white/70">{m.text}</p>
                    </article>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Footer note */}
        <p className="mt-14 text-center text-[13px] text-white/50">The journey continues — and we would love to build the next milestone with you.</p>
      </div>
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-brand-spectrum" />
    </section>
  );
}
