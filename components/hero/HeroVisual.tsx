"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useTheme } from "@/components/theme-provider";
import type { SceneQuality, TelemetrySample } from "./RoboticsScene";

// Three.js + R3F are only downloaded when a capable device actually needs the scene.
const RoboticsScene = dynamic(() => import("./RoboticsScene"), { ssr: false, loading: () => null });

/** "webgl" full scene · "lite" pre-rendered video loop · "static" poster only */
type Capability = "pending" | "webgl" | "lite" | "static";

let cachedCapability: Capability | null = null;

function detectCapability(): Capability {
  if (cachedCapability) return cachedCapability;
  // QA / capture override: ?hero=webgl | lite | static
  const forced = new URLSearchParams(window.location.search).get("hero");
  if (forced === "webgl" || forced === "lite" || forced === "static") return (cachedCapability = forced);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let webgl = false;
  try {
    const c = document.createElement("canvas");
    webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    webgl = false;
  }
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  const cores = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory ?? 8;
  const saveData = !!nav.connection?.saveData;
  const lowPower = cores <= 4 || memory <= 3 || saveData;

  if (reduce || !webgl) cachedCapability = "static";
  else if (lowPower) cachedCapability = "lite";
  else cachedCapability = "webgl";
  return cachedCapability;
}

function subscribeMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const handler = () => {
    cachedCapability = null;
    cb();
  };
  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
}

function useCapability() {
  return useSyncExternalStore(subscribeMotion, detectCapability, () => "pending" as Capability);
}

function useQuality(): SceneQuality {
  return useSyncExternalStore(
    () => () => {},
    () => (window.innerWidth < 1024 || window.matchMedia("(pointer: coarse)").matches ? "medium" : "high"),
    () => "high"
  );
}

const POSTER = {
  dark: "/media/hero/robotics-poster-dark.webp",
  light: "/media/hero/robotics-poster-light.webp",
};
const VIDEO = {
  dark: { webm: "/media/hero/robotics-loop-dark.webm", mp4: "/media/hero/robotics-loop-dark.mp4" },
  light: { webm: "/media/hero/robotics-loop-light.webm", mp4: "/media/hero/robotics-loop-light.mp4" },
};

export default function HeroVisual({ fallbackImage, showPanels = true, forceTheme }: { fallbackImage?: string; showPanels?: boolean; forceTheme?: "dark" | "light" }) {
  const { theme: siteTheme } = useTheme();
  // A section can pin the scene to one look (e.g. the always-navy hero panel).
  const theme = forceTheme ?? siteTheme;
  const capability = useCapability();
  const quality = useQuality();
  const wrapRef = useRef<HTMLDivElement>(null);
  const telemetry = useRef<Partial<Record<"yaw" | "shoulder" | "elbow" | "grip" | "phase" | "inference", HTMLElement | null>>>({});
  // Called by the scene ~10×/s; writes straight to the DOM (no React re-render per frame).
  const onTelemetry = useCallback((sample: TelemetrySample) => {
    const el = telemetry.current;
    const deg = (r: number) => `${(r * 57.2958).toFixed(1)}°`;
    if (el.yaw) el.yaw.textContent = deg(sample.yaw);
    if (el.shoulder) el.shoulder.textContent = deg(sample.shoulder);
    if (el.elbow) el.elbow.textContent = deg(sample.elbow);
    if (el.grip) el.grip.textContent = `${Math.round(sample.grip * 100)}%`;
    if (el.phase) el.phase.textContent = sample.phase;
    if (el.inference) el.inference.textContent = `${sample.inference.toFixed(1)}%`;
  }, []);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [deferred, setDeferred] = useState(false);
  const [ready, setReady] = useState(false);

  // Defer the heavy scene until the browser is idle so headline/CTA paint first.
  useEffect(() => {
    if (capability !== "webgl") return;
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setDeferred(true), { timeout: 1200 });
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setDeferred(true), 300);
    return () => window.clearTimeout(id);
  }, [capability]);

  // Pause rendering when the hero is off-screen or the tab is hidden.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    const onVis = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const active = inView && pageVisible;
  const showScene = capability === "webgl" && deferred;
  // A custom hero image set in the CMS is used where WebGL is unavailable.
  const customStatic = fallbackImage && !fallbackImage.endsWith("/images/hero.png") ? fallbackImage : null;

  return (
    <div ref={wrapRef} className="relative h-full w-full">
      {/* Soft radial mask so the 3D canvas never shows hard edges */}
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_72%_72%_at_52%_50%,#000_58%,transparent_100%)]">
      {/* Posters: theme chosen by CSS (SSR-safe, no hydration mismatch); hidden one is never fetched */}
      {capability === "static" && customStatic ? (
        <Image src={customStatic} alt="" aria-hidden fill sizes="(max-width: 1024px) 100vw, 55vw" unoptimized={customStatic.startsWith("data:") || customStatic.startsWith("http")} className="object-contain" />
      ) : capability !== "lite" ? (
        <div className={`absolute inset-0 transition-opacity duration-700 ${showScene && ready ? "opacity-0" : "opacity-100"}`}>
          <Image src={POSTER.dark} alt="" aria-hidden fill sizes="(max-width: 1024px) 100vw, 55vw" className="hidden object-contain dark:block" />
          <Image src={POSTER.light} alt="" aria-hidden fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-contain dark:hidden" />
        </div>
      ) : null}

      {/* Low-power devices: lightweight pre-rendered loop (lazy, muted, no controls) */}
      {capability === "lite" && inView ? (
        <video
          key={`video-${theme}`}
          className="absolute inset-0 h-full w-full object-contain"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={POSTER[theme]}
          aria-hidden
          tabIndex={-1}
          disablePictureInPicture
        >
          <source src={VIDEO[theme].webm} type="video/webm" />
          <source src={VIDEO[theme].mp4} type="video/mp4" />
        </video>
      ) : null}

      {showScene ? (
        <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
          <RoboticsScene theme={theme} quality={quality} active={active} onTelemetry={onTelemetry} onReady={() => setReady(true)} />
        </div>
      ) : null}

      </div>

      {/* Floating holographic interface panels */}
      <div className={`hero-overlay pointer-events-none absolute inset-0 ${showPanels ? "" : "hidden"}`}>
        <div className="glass absolute left-[2%] top-[10%] hidden w-[200px] rounded-xl p-3.5 text-[11px] shadow-[var(--shadow-card)] sm:block animate-float">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-semibold uppercase tracking-[0.16em] text-gold-ink">Motion planning</span>
            <span className="h-1.5 w-1.5 rounded-full bg-tech animate-pulse-dot" />
          </div>
          <dl className="grid grid-cols-[1fr_auto] gap-y-1 font-mono text-fg-muted">
            <dt>J1 · Base</dt>
            <dd ref={(el) => void (telemetry.current.yaw = el)} className="text-fg tabular-nums">
              25.8°
            </dd>
            <dt>J2 · Shoulder</dt>
            <dd ref={(el) => void (telemetry.current.shoulder = el)} className="text-fg tabular-nums">
              −18.3°
            </dd>
            <dt>J3 · Elbow</dt>
            <dd ref={(el) => void (telemetry.current.elbow = el)} className="text-fg tabular-nums">
              57.3°
            </dd>
          </dl>
        </div>

        <div className="glass absolute bottom-[14%] right-[2%] hidden w-[210px] rounded-xl p-3.5 text-[11px] shadow-[var(--shadow-card)] md:block animate-float [animation-delay:-3s]">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-semibold uppercase tracking-[0.16em] text-gold-ink">Neural inference</span>
            <span className="font-mono text-[10px] text-fg-subtle">live sim</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-fg-subtle">Task phase</div>
              <div ref={(el) => void (telemetry.current.phase = el)} className="font-display text-sm font-semibold text-fg">
                Observing
              </div>
            </div>
            <div className="text-right">
              <div className="text-fg-subtle">Grip</div>
              <div ref={(el) => void (telemetry.current.grip = el)} className="font-mono text-sm text-tech tabular-nums">
                15%
              </div>
            </div>
          </div>
          <div className="mt-2.5 flex h-6 items-end gap-[3px]" aria-hidden>
            {[40, 65, 50, 80, 58, 92, 70, 85, 62, 95, 74, 88].map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-t from-tech/30 to-tech"
                style={{ height: `${h}%`, animation: `pulse-dot ${1.4 + (i % 4) * 0.3}s ease-in-out ${i * 0.08}s infinite` }}
              />
            ))}
          </div>
        </div>

        <div className="glass absolute right-[6%] top-[6%] hidden items-center gap-2 rounded-full px-3 py-1.5 text-[11px] lg:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-dot" />
          <span className="font-medium text-fg-muted">Vision · object lock</span>
          <span ref={(el) => void (telemetry.current.inference = el)} className="font-mono text-tech tabular-nums">
            96.0%
          </span>
        </div>
      </div>
    </div>
  );
}
