"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, MousePointer2 } from "lucide-react";

/**
 * Concept B — interactive 3D robot. The arm turns toward the cursor and the camera follows it;
 * floating panels describe what ALPIXN builds. Falls back to a still image without WebGL
 * or when the visitor prefers reduced motion.
 */
const RoboticsScene = dynamic(() => import("@/components/hero/RoboticsScene"), { ssr: false });

const PANELS = [
  { title: "Vision AI", text: "Detects and locates objects in real time.", pos: "left-[3%] top-[18%]", c: "#0878d1" },
  { title: "Motion planning", text: "Plans safe, efficient arm paths.", pos: "right-[3%] top-[12%]", c: "#d99a19" },
  { title: "Fleet dashboard", text: "Monitors robots and alerts operators.", pos: "left-[6%] bottom-[14%]", c: "#9a5b08" },
  { title: "Cloud & APIs", text: "Connects machines to your systems.", pos: "right-[5%] bottom-[18%]", c: "#064a87" },
];

function useCanRender3D() {
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }
    const id = window.setTimeout(() => setOk(!reduce && webgl), 0);
    return () => window.clearTimeout(id);
  }, []);
  return ok;
}

export default function HeroInteractive({ title, description }: { title: string; description: string }) {
  const can3D = useCanRender3D();
  const words = title.trim().split(/\s+/);
  const lead = words.slice(0, -3).join(" ");
  const tail = words.slice(-3).join(" ");

  return (
    <section aria-labelledby="hero-3d-title" className="dark relative isolate overflow-hidden bg-[radial-gradient(120%_90%_at_70%_40%,#0a2a55_0%,#071a33_45%,#040d1c_100%)] text-white">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-20" />
      <div className="mx-auto grid min-h-[calc(100svh-72px)] max-w-[1320px] items-center gap-8 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-10">
        <div className="relative z-10 lg:col-span-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-[#f6d77a]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
            AI · Robotics · Software
          </span>
          <h1 id="hero-3d-title" className="mt-6 font-display text-[clamp(2rem,3.6vw,3.2rem)] font-bold leading-[1.06] tracking-[-0.03em]">
            {lead}
            <br />
            <span className="text-gold-grad">{tail}</span>
          </h1>
          <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-white/80">{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact-us" className="btn-brand !px-7 !py-3.5 text-[15px]">
              Start a project <ArrowRight aria-hidden className="btn-arrow h-4 w-4" />
            </Link>
            <Link href="/our-expertise" className="btn-ghost-brand !px-7 !py-3.5 text-[15px]">
              Explore services
            </Link>
          </div>
          <p className="mt-8 hidden items-center gap-2 text-[13px] text-white/55 lg:flex">
            <MousePointer2 aria-hidden className="h-4 w-4 text-[#f6d77a]" /> Move your cursor — the robot follows you.
          </p>
        </div>

        <div className="relative h-[420px] sm:h-[520px] lg:col-span-7 lg:h-[640px]">
          <div aria-hidden className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2ea8ff]/15 blur-[100px]" />
          {can3D ? (
            <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_75%_70%_at_55%_50%,#000_60%,transparent_100%)]">
              <RoboticsScene mode="interactive" theme="dark" quality="high" active />
            </div>
          ) : can3D === false ? (
            <Image src="/media/hero/robotics-poster-dark.webp" alt="" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-contain" />
          ) : null}
          {PANELS.map((p, i) => (
            <div key={p.title} className={`pointer-events-none absolute hidden w-[210px] rounded-2xl border border-white/10 bg-[#071a33]/70 p-3.5 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.7)] backdrop-blur-md md:block animate-float ${p.pos}`} style={{ animationDelay: `${i * -1.4}s` }}>
              <span className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em]" style={{ color: p.c === "#064a87" ? "#7cc6ff" : p.c === "#9a5b08" ? "#f0c14b" : p.c }}>
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {p.title}
              </span>
              <span className="mt-1 block text-[13px] leading-snug text-white/75">{p.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-brand-spectrum" />
    </section>
  );
}
