import Image from "next/image";
import { Bot, BrainCircuit, Cloud, Code2, Cpu, Database } from "lucide-react";
import mapData from "@/public/media/map/world-pins.json";

/**
 * Hero visual: a dotted world map with ALPIXN's nine markets, linked by animated
 * technology connections (AI, robotics, cloud/IT, code). Pure SVG + CSS, no client JS:
 * packets travel the arcs with SMIL <animateMotion>, so it renders on the server and
 * costs nothing to hydrate. Reduced-motion users get a still map (see globals.css).
 */

type Pin = { id: string; country: string; city: string; x: number; y: number };

const W = mapData.width;
const H = mapData.height;
const PINS = Object.fromEntries((mapData.pins as Pin[]).map((p) => [p.id, p])) as Record<string, Pin>;

// Network links between markets (a mesh, not a claim about offices).
const LINKS: [string, string, string][] = [
  ["canada", "usa", "#0878d1"],
  ["usa", "uk", "#d99a19"],
  ["uk", "italy", "#064a87"],
  ["italy", "uae", "#9a5b08"],
  ["uae", "india", "#d99a19"],
  ["india", "thailand", "#0878d1"],
  ["thailand", "australia", "#d99a19"],
  ["uae", "south-africa", "#0878d1"],
  ["south-africa", "uk", "#9a5b08"],
  ["india", "uk", "#064a87"],
  ["usa", "india", "#0878d1"],
  ["india", "australia", "#9a5b08"],
];

function arc(a: Pin, b: Pin) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const d = Math.hypot(b.x - a.x, b.y - a.y);
  const lift = Math.min(22, d * 0.32);
  const cx = mx;
  const cy = my - lift;
  return { d: `M${a.x} ${a.y} Q${cx} ${cy} ${b.x} ${b.y}`, mid: { x: 0.25 * a.x + 0.5 * cx + 0.25 * b.x, y: 0.25 * a.y + 0.5 * cy + 0.25 * b.y } };
}

const ARCS = LINKS.map(([from, to, color], i) => ({ id: `link-${i}`, color, ...arc(PINS[from], PINS[to]) }));

// Technology badges riding on a few of the links.
const BADGES = [
  { link: 1, icon: BrainCircuit, label: "AI", bg: "#0878d1", ink: "#ffffff" },
  { link: 11, icon: Bot, label: "Robotics", bg: "#064a87", ink: "#ffffff", dx: -7, dy: 13 },
  { link: 8, icon: Code2, label: "Software", bg: "#d99a19", ink: "#071a33" },
  { link: 6, icon: Cloud, label: "Cloud", bg: "#9a5b08", ink: "#ffffff" },
  { link: 7, icon: Database, label: "Data", bg: "#f6d77a", ink: "#071a33" },
  { link: 0, icon: Cpu, label: "IoT", bg: "#071a33", ink: "#f6d77a", dx: -9, dy: 7 },
]

const LABEL_SIDE: Record<string, "left" | "right" | "top" | "bottom"> = {
  canada: "top",
  usa: "left",
  uk: "top",
  italy: "right",
  uae: "bottom",
  india: "right",
  thailand: "right",
  australia: "right",
  "south-africa": "left",
};

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

export default function WorldConnect() {
  return (
    <div aria-hidden className="world-connect relative mx-auto w-full [perspective:1600px]">
      <div className="relative w-full [transform:rotateX(16deg)] [transform-origin:50%_70%]" style={{ aspectRatio: `${W} / ${H}` }}>
        {/* Land dots */}
        <Image src="/media/map/world-dots.svg" alt="" fill priority unoptimized className="select-none object-contain opacity-60 dark:opacity-45" />

        {/* Connections */}
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <filter id="wc-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="0.6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {ARCS.map((a, i) => (
            <g key={a.id}>
              <path id={a.id} d={a.d} fill="none" stroke={a.color} strokeOpacity="0.28" strokeWidth="0.35" />
              <path d={a.d} fill="none" stroke={a.color} strokeWidth="0.45" strokeLinecap="round" strokeDasharray="2 3.5" className="wc-flow" style={{ animationDelay: `${i * -0.7}s` }} />
              {/* Data packets */}
              {[0, 1].map((k) => (
                <circle key={k} r={k ? 0.45 : 0.65} fill={k ? "#f6d77a" : a.color} filter="url(#wc-glow)">
                  <animateMotion dur={`${4.5 + (i % 4)}s`} begin={`${(i * 0.6 + k * 2.2).toFixed(1)}s`} repeatCount="indefinite" rotate="auto">
                    <mpath href={`#${a.id}`} />
                  </animateMotion>
                </circle>
              ))}
            </g>
          ))}

          {/* Market nodes */}
          {Object.values(PINS).map((p, i) => (
            <g key={p.id} transform={`translate(${p.x} ${p.y})`}>
              <circle r="2.6" fill="#d99a19" opacity="0.18" className="wc-pulse" style={{ animationDelay: `${i * 0.35}s` }} />
              <circle r="1.25" fill="#ffffff" stroke="#d99a19" strokeWidth="0.45" />
              <circle r="0.55" fill="#0878d1" />
            </g>
          ))}
        </svg>

        {/* Country labels */}
        {Object.values(PINS).map((p) => {
          const side = LABEL_SIDE[p.id] ?? "top";
          const offset = {
            left: "-translate-x-[calc(100%+12px)] -translate-y-1/2",
            right: "translate-x-[12px] -translate-y-1/2",
            top: "-translate-x-1/2 -translate-y-[calc(100%+12px)]",
            bottom: "-translate-x-1/2 translate-y-[12px]",
          }[side];
          return (
            <span key={p.id} className={`absolute z-10 hidden items-center sm:flex gap-1.5 whitespace-nowrap rounded-full border border-line bg-surface/90 py-1 pl-1 pr-2.5 text-[10px] font-semibold text-fg shadow-[var(--shadow-card)] backdrop-blur sm:text-[11.5px] ${offset}`} style={{ left: pct(p.x, W), top: pct(p.y, H) }}>
              <Image src={`/images/${p.id}.svg`} alt="" width={16} height={16} className="h-3.5 w-3.5 rounded-full object-cover sm:h-4 sm:w-4" />
              {p.country}
            </span>
          );
        })}

        {/* Technology badges on the links */}
        {BADGES.map(({ link, icon: Icon, label, bg, ink, ...rest }, i) => {
          const off = rest as { dx?: number; dy?: number };
          const m = { x: ARCS[link].mid.x + (off.dx ?? 0), y: ARCS[link].mid.y + (off.dy ?? 0) };
          return (
            <span key={label} className="absolute z-20 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full py-1 pl-1 pr-3 text-[11px] font-semibold shadow-[0_14px_30px_-12px_rgba(7,26,51,0.55)] md:flex animate-float" style={{ left: pct(m.x, W), top: pct(m.y, H), background: bg, color: ink, animationDelay: `${i * -1.1}s` }}>
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20">
                <Icon className="h-3.5 w-3.5" />
              </span>
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
