import { Bell, Bot, BrainCircuit, Check, Cloud, Code2, Cpu, Database, GitBranch, Globe2, Mail, MessageSquare, Phone, Rocket, Server, ShieldCheck, Smartphone, Sparkles, UserRound } from "lucide-react";
import { Coder, Designer, Drone, Walker } from "./MapRobots";

/**
 * Context-specific hero visuals for inner pages (no logo): each page gets an illustration
 * of what it is about — code, mobile, AI, cloud, data, robotics, team, contact, chatbot, hiring.
 * Pure SVG/HTML + CSS animations (reuses the `.world-connect` robot keyframes).
 */
export type VisualKind = "code" | "mobile" | "ai" | "cloud" | "data" | "robotics" | "team" | "contact" | "chatbot" | "hire";

export function visualForSlug(slug = "", fallback: VisualKind = "code"): VisualKind {
  const s = slug.toLowerCase();
  if (/mobile|android|ios|flutter|react-native|app-dev/.test(s)) return "mobile";
  if (/\bai\b|ai-|-ai|machine|ml|generative|llm|chatbot|nlp|vision/.test(s)) return "ai";
  if (/cloud|devops|aws|azure|gcp|kubernetes|infra|migration/.test(s)) return "cloud";
  if (/data|analytic|bi-|business-intelligence|dashboard|warehouse/.test(s)) return "data";
  if (/robot|automation|iot|manufactur|industry-4/.test(s)) return "robotics";
  return fallback;
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div aria-hidden className={`world-connect relative mx-auto aspect-[5/4] w-full max-w-[580px] ${className}`}>
      <div className="absolute inset-[6%] rounded-[36px] bg-[radial-gradient(circle_at_30%_20%,rgba(8,120,209,0.16),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(246,215,122,0.35),transparent_60%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(8,120,209,0.22),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(217,154,25,0.18),transparent_60%)]" />
      <div className="absolute inset-[6%] rounded-[36px] border border-line bg-grid opacity-50" />
      {children}
    </div>
  );
}

function Chip({ icon: Icon, label, bg, ink = "#ffffff", className = "", delay = 0 }: { icon: React.ComponentType<{ className?: string }>; label: string; bg: string; ink?: string; className?: string; delay?: number }) {
  return (
    <span className={`absolute z-20 flex items-center gap-1.5 rounded-full py-1 pl-1 pr-3 text-[11.5px] font-semibold shadow-[0_14px_30px_-12px_rgba(7,26,51,0.55)] animate-float ${className}`} style={{ background: bg, color: ink, animationDelay: `${delay}s` }}>
      <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20">
        <Icon className="h-3.5 w-3.5" />
      </span>
      {label}
    </span>
  );
}

function WindowBar({ dark = false, title }: { dark?: boolean; title?: string }) {
  return (
    <div className={`flex items-center gap-1.5 border-b px-3 py-2 ${dark ? "border-white/10 bg-[#0a2140]" : "border-black/5 bg-[#f4f6f9]"}`}>
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      {title ? <span className={`ml-2 font-mono text-[10px] ${dark ? "text-[#c7d3e6]" : "text-[#64748b]"}`}>{title}</span> : null}
    </div>
  );
}

/* ---------------- code ---------------- */
const CODE_LINES: [string, number, number?][] = [
  ["#f0c14b", 18, 30], ["#4fb0ff", 34], ["#c7d3e6", 26, 20], ["#f6d77a", 40], ["#6f84a6", 30], ["#f0c14b", 14, 44], ["#4fb0ff", 28], ["#c7d3e6", 36, 16],
];
function CodeVisual() {
  return (
    <Panel>
      <div className="absolute right-[8%] top-[12%] w-[52%] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_30px_60px_-30px_rgba(7,26,51,0.45)]">
        <WindowBar title="preview" />
        <div className="space-y-2 p-3">
          <div className="flex justify-between"><span className="h-2.5 w-16 rounded-full bg-[#071a33]" /><span className="h-2.5 w-10 rounded-full bg-[#d99a19]" /></div>
          <div className="grid grid-cols-3 gap-1.5">{["#0878d1", "#d99a19", "#064a87"].map((c) => <span key={c} className="h-8 rounded-lg" style={{ background: c }} />)}</div>
          <div className="flex h-14 items-end gap-1">{[40, 70, 52, 88, 64, 95, 72].map((h, i) => <span key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: i % 2 ? "#0878d1" : "#f6d77a" }} />)}</div>
        </div>
      </div>
      <div className="absolute bottom-[12%] left-[8%] z-10 w-[60%] overflow-hidden rounded-2xl border border-white/10 bg-[#071a33] shadow-[0_40px_80px_-30px_rgba(7,26,51,0.75)]">
        <WindowBar dark title="app.tsx" />
        <div className="space-y-2 px-3 py-3">
          {CODE_LINES.map(([c, w, w2], i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-3 text-right font-mono text-[8px] text-[#3d5478]">{i + 1}</span>
              <span className="rb-code-1 h-1.5 rounded-full" style={{ width: `${w}%`, background: c, animationDelay: `${i * 0.25}s` }} />
              {w2 ? <span className="h-1.5 rounded-full bg-[#c7d3e6]/50" style={{ width: `${w2}%` }} /> : null}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-[8%] right-[10%] z-20 aspect-[4/5] w-[14%]"><Walker /></div>
      <Chip icon={GitBranch} label="git push" bg="#9a5b08" className="left-[10%] top-[12%]" />
      <Chip icon={Check} label="Tests passed" bg="#0878d1" className="right-[6%] bottom-[38%]" delay={-1.5} />
      <Chip icon={Code2} label="Clean code" bg="#f6d77a" ink="#071a33" className="left-[46%] top-[4%]" delay={-3} />
    </Panel>
  );
}

/* ---------------- mobile ---------------- */
function PhoneMock({ accent, className = "" }: { accent: string; className?: string }) {
  return (
    <div className={`absolute overflow-hidden rounded-[26px] border-[5px] border-[#071a33] bg-white shadow-[0_30px_60px_-25px_rgba(7,26,51,0.6)] ${className}`}>
      <div className="mx-auto mt-1 h-1.5 w-10 rounded-full bg-[#071a33]" />
      <div className="space-y-2 p-2.5">
        <div className="rounded-xl p-2.5 text-white" style={{ background: accent }}>
          <span className="block h-1.5 w-10 rounded-full bg-white/70" />
          <span className="mt-2 block h-3 w-16 rounded-full bg-white" />
        </div>
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg border border-black/5 p-1.5">
            <span className="h-5 w-5 rounded-md" style={{ background: i === 1 ? "#d99a19" : "#e7ecf3" }} />
            <span className="flex-1 space-y-1"><span className="block h-1.5 w-3/4 rounded-full bg-[#cbd5e1]" /><span className="block h-1.5 w-1/2 rounded-full bg-[#e2e8f0]" /></span>
          </div>
        ))}
        <div className="flex justify-around pt-1">{[0, 1, 2, 3].map((i) => <span key={i} className="h-2.5 w-2.5 rounded-full" style={{ background: i === 0 ? accent : "#cbd5e1" }} />)}</div>
      </div>
    </div>
  );
}
function MobileVisual() {
  return (
    <Panel>
      <PhoneMock accent="#0878d1" className="left-[22%] top-[12%] w-[30%] -rotate-6" />
      <PhoneMock accent="#d99a19" className="right-[20%] top-[18%] z-10 w-[30%] rotate-6" />
      <div className="absolute bottom-[8%] left-[10%] z-20 aspect-[70/52] w-[24%]"><Designer /></div>
      <Chip icon={Bell} label="Push notifications" bg="#064a87" className="right-[4%] top-[10%]" />
      <Chip icon={Smartphone} label="iOS · Android" bg="#f6d77a" ink="#071a33" className="left-[6%] top-[14%]" delay={-2} />
      <Chip icon={ShieldCheck} label="Secure login" bg="#9a5b08" className="right-[8%] bottom-[12%]" delay={-3.5} />
    </Panel>
  );
}

/* ---------------- AI ---------------- */
const LAYERS = [[22, 40, 58, 76], [16, 34, 52, 70, 88], [28, 50, 72], [50]];
function AiVisual() {
  const xs = [18, 40, 62, 84];
  const nodes = LAYERS.flatMap((ys, li) => ys.map((y) => ({ x: xs[li], y, li })));
  const edges: { x1: number; y1: number; x2: number; y2: number; i: number }[] = [];
  let n = 0;
  LAYERS.forEach((ys, li) => {
    if (li === LAYERS.length - 1) return;
    ys.forEach((y) => LAYERS[li + 1].forEach((y2) => edges.push({ x1: xs[li], y1: y, x2: xs[li + 1], y2, i: n++ })));
  });
  const colors = ["#0878d1", "#064a87", "#d99a19", "#9a5b08"];
  return (
    <Panel>
      <svg viewBox="0 0 100 100" className="absolute inset-[10%] h-[80%] w-[80%] overflow-visible">
        {edges.map((e) => (
          <line key={e.i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke={colors[e.i % 4]} strokeOpacity="0.35" strokeWidth="0.5" strokeDasharray="1.5 2" className="wc-flow" style={{ animationDelay: `${(e.i % 7) * -0.3}s` }} />
        ))}
        {nodes.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4.4" fill={colors[p.li]} opacity="0.15" className="wc-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
            <circle cx={p.x} cy={p.y} r="2.6" fill="#ffffff" stroke={colors[p.li]} strokeWidth="1.2" />
          </g>
        ))}
      </svg>
      <div className="absolute bottom-[10%] left-[10%] z-20 aspect-[64/50] w-[24%]"><Coder /></div>
      <Chip icon={BrainCircuit} label="Model training" bg="#0878d1" className="left-[8%] top-[10%]" />
      <Chip icon={Sparkles} label="Generative AI" bg="#d99a19" ink="#071a33" className="right-[6%] top-[16%]" delay={-2} />
      <Chip icon={ShieldCheck} label="Human review" bg="#9a5b08" className="right-[8%] bottom-[12%]" delay={-3.5} />
    </Panel>
  );
}

/* ---------------- cloud ---------------- */
function CloudVisual() {
  const stages = [
    { icon: Code2, label: "Build", c: "#0878d1" },
    { icon: Check, label: "Test", c: "#064a87" },
    { icon: Rocket, label: "Deploy", c: "#d99a19" },
    { icon: ShieldCheck, label: "Monitor", c: "#9a5b08" },
  ];
  return (
    <Panel>
      <div className="absolute left-1/2 top-[14%] grid h-[26%] w-[42%] -translate-x-1/2 place-items-center rounded-[28px] bg-[linear-gradient(135deg,#0878d1,#064a87)] text-white shadow-[0_30px_60px_-25px_rgba(8,120,209,0.7)]">
        <Cloud className="h-12 w-12" />
      </div>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
        {[22, 41, 59, 78].map((x, i) => (
          <path key={x} id={`cl-${i}`} d={`M50 40 C50 52 ${x} 50 ${x} 62`} fill="none" stroke="#0878d1" strokeOpacity="0.4" strokeWidth="0.5" strokeDasharray="1.5 2" className="wc-flow" />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} r="1.1" fill="#d99a19">
            <animateMotion dur="2.6s" begin={`${i * 0.5}s`} repeatCount="indefinite">
              <mpath href={`#cl-${i}`} />
            </animateMotion>
          </circle>
        ))}
      </svg>
      <div className="absolute left-[10%] right-[10%] top-[62%] grid grid-cols-4 gap-2">
        {stages.map(({ icon: Icon, label, c }) => (
          <div key={label} className="rounded-2xl border border-line bg-surface p-2.5 text-center shadow-[var(--shadow-card)]">
            <span className="mx-auto grid h-8 w-8 place-items-center rounded-xl text-white" style={{ background: c }}><Icon className="h-4 w-4" /></span>
            <span className="mt-1.5 block text-[11px] font-semibold text-fg">{label}</span>
          </div>
        ))}
      </div>
      <div className="absolute bottom-[6%] right-[12%] z-20 aspect-[44/36] w-[12%]"><Drone /></div>
      <Chip icon={Server} label="Auto-scaling" bg="#9a5b08" className="left-[6%] top-[14%]" />
      <Chip icon={GitBranch} label="CI/CD" bg="#f6d77a" ink="#071a33" className="right-[6%] top-[22%]" delay={-2} />
    </Panel>
  );
}

/* ---------------- data ---------------- */
function DataVisual() {
  return (
    <Panel>
      <div className="absolute inset-x-[10%] top-[14%] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_30px_60px_-30px_rgba(7,26,51,0.45)]">
        <WindowBar title="insights dashboard" />
        <div className="grid grid-cols-3 gap-2 p-3">
          {["#0878d1", "#d99a19", "#9a5b08"].map((c) => (
            <div key={c} className="rounded-xl border border-black/5 p-2"><span className="block h-1.5 w-10 rounded-full bg-[#cbd5e1]" /><span className="mt-2 block h-3 w-14 rounded-md" style={{ background: c }} /></div>
          ))}
          <div className="col-span-2 flex h-24 items-end gap-1.5 rounded-xl border border-black/5 p-2">
            {[30, 55, 42, 70, 58, 86, 64, 92].map((h, i) => <span key={i} className="rb-code-2 flex-1 origin-bottom rounded-t" style={{ height: `${h}%`, background: i % 2 ? "#0878d1" : "#064a87", animationDelay: `${i * 0.15}s` }} />)}
          </div>
          <div className="grid place-items-center rounded-xl border border-black/5">
            <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90"><circle cx="18" cy="18" r="14" fill="none" stroke="#e7ecf3" strokeWidth="5" /><circle cx="18" cy="18" r="14" fill="none" stroke="#d99a19" strokeWidth="5" strokeDasharray="60 88" /><circle cx="18" cy="18" r="14" fill="none" stroke="#0878d1" strokeWidth="5" strokeDasharray="20 88" strokeDashoffset="-60" /></svg>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[6%] left-[12%] z-20 aspect-[4/5] w-[13%]"><Walker body="#d99a19" /></div>
      <Chip icon={Database} label="Data pipeline" bg="#064a87" className="right-[6%] bottom-[14%]" />
      <Chip icon={Sparkles} label="Forecasts" bg="#f6d77a" ink="#071a33" className="right-[4%] top-[6%]" delay={-2} />
    </Panel>
  );
}

/* ---------------- robotics ---------------- */
function RoboticsVisual() {
  return (
    <Panel>
      <div className="absolute inset-x-[8%] bottom-[22%] h-[8%] overflow-hidden rounded-full bg-[#071a33] shadow-[0_20px_40px_-20px_rgba(7,26,51,0.7)]">
        <div className="absolute inset-y-[30%] left-0 w-[200%] bg-[repeating-linear-gradient(90deg,#3d5478_0_6px,transparent_6px_18px)] marquee-track" />
      </div>
      {[0, 1, 2].map((i) => (
        <div key={i} className="absolute bottom-[30%] aspect-square w-[9%] rounded-md border-2 border-[#9a5b08] bg-[#d99a19] rb-walk-x" style={{ left: "8%", animationDuration: "7s", animationDelay: `${i * -2.3}s`, ["--end" as string]: "82%" }} />
      ))}
      <div className="absolute bottom-[30%] left-[18%] z-10 aspect-[4/5] w-[16%]"><Walker /></div>
      <div className="absolute bottom-[30%] right-[16%] z-10 aspect-[4/5] w-[16%]"><Walker body="#9a5b08" parcel /></div>
      <div className="absolute left-1/2 top-[12%] z-10 aspect-[44/36] w-[16%] -translate-x-1/2"><Drone /></div>
      <Chip icon={Bot} label="Fleet online" bg="#0878d1" className="left-[8%] top-[12%]" />
      <Chip icon={Cpu} label="Vision AI" bg="#d99a19" ink="#071a33" className="right-[6%] top-[18%]" delay={-2} />
      <Chip icon={ShieldCheck} label="Safety checks" bg="#064a87" className="left-[34%] bottom-[6%]" delay={-3.5} />
    </Panel>
  );
}

/* ---------------- team ---------------- */
function TeamVisual() {
  return (
    <Panel>
      <div className="absolute left-[10%] top-[16%] aspect-[64/50] w-[34%]"><Coder /></div>
      <div className="absolute right-[8%] top-[20%] aspect-[70/52] w-[36%]"><Designer /></div>
      <div className="absolute bottom-[12%] left-[22%] aspect-[4/5] w-[15%]"><Walker /></div>
      <div className="absolute bottom-[12%] right-[26%] aspect-[4/5] w-[15%]"><Walker body="#d99a19" /></div>
      <div className="absolute left-1/2 top-[6%] aspect-[44/36] w-[12%] -translate-x-1/2"><Drone /></div>
      <Chip icon={Code2} label="Engineers" bg="#0878d1" className="left-[6%] bottom-[40%]" />
      <Chip icon={Sparkles} label="Designers" bg="#d99a19" ink="#071a33" className="right-[6%] bottom-[42%]" delay={-2} />
      <Chip icon={BrainCircuit} label="AI specialists" bg="#9a5b08" className="left-[36%] bottom-[4%]" delay={-3.5} />
    </Panel>
  );
}

/* ---------------- contact ---------------- */
function ContactVisual() {
  return (
    <Panel>
      <div className="absolute inset-x-[12%] top-[12%] space-y-3">
        <div className="ml-auto w-[70%] rounded-2xl rounded-br-md bg-[#0878d1] p-3 text-[12px] text-white shadow-lg">We want to automate our order processing. Can you help?</div>
        <div className="w-[76%] rounded-2xl rounded-bl-md border border-line bg-surface p-3 text-[12px] text-fg shadow-[var(--shadow-card)]">Yes — let&apos;s map your workflow and suggest a sensible first release.</div>
        <div className="flex w-20 items-center gap-1 rounded-2xl border border-line bg-surface px-3 py-2.5 shadow-[var(--shadow-card)]">
          {[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#d99a19] animate-pulse-dot" style={{ animationDelay: `${i * 0.2}s` }} />)}
        </div>
      </div>
      <div className="absolute bottom-[8%] right-[10%] aspect-[64/50] w-[28%]"><Coder /></div>
      <Chip icon={Mail} label="Email" bg="#064a87" className="left-[8%] bottom-[22%]" />
      <Chip icon={Phone} label="Call" bg="#d99a19" ink="#071a33" className="left-[30%] bottom-[10%]" delay={-2} />
      <Chip icon={Globe2} label="9 markets" bg="#9a5b08" className="right-[6%] top-[6%]" delay={-3.5} />
    </Panel>
  );
}

/* ---------------- chatbot ---------------- */
function ChatbotVisual() {
  return (
    <Panel>
      <div className="absolute inset-x-[16%] top-[10%] bottom-[14%] overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_30px_60px_-30px_rgba(7,26,51,0.5)]">
        <div className="flex items-center gap-2 bg-[linear-gradient(135deg,#071a33,#064a87)] px-4 py-3 text-white">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#f6d77a] text-[#071a33]"><Bot className="h-4 w-4" /></span>
          <span className="text-[12px] font-semibold">AI Assistant</span>
          <span className="ml-auto h-2 w-2 rounded-full bg-[#28c840]" />
        </div>
        <div className="space-y-2.5 p-3 text-[11.5px]">
          <div className="w-[78%] rounded-2xl rounded-bl-md bg-[#eef4fb] p-2.5 text-[#071a33]">Hi! How can I help you today?</div>
          <div className="ml-auto w-[70%] rounded-2xl rounded-br-md bg-[#0878d1] p-2.5 text-white">Where is my order?</div>
          <div className="w-[82%] rounded-2xl rounded-bl-md bg-[#eef4fb] p-2.5 text-[#071a33]">It shipped today. Here is your tracking link.</div>
          <div className="flex w-16 items-center gap-1 rounded-2xl bg-[#eef4fb] px-3 py-2">{[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#d99a19] animate-pulse-dot" style={{ animationDelay: `${i * 0.2}s` }} />)}</div>
        </div>
      </div>
      <Chip icon={MessageSquare} label="24/7 answers" bg="#d99a19" ink="#071a33" className="left-[4%] top-[20%]" />
      <Chip icon={UserRound} label="Human handover" bg="#9a5b08" className="right-[2%] bottom-[24%]" delay={-2} />
      <Chip icon={Sparkles} label="Your content" bg="#064a87" className="right-[6%] top-[6%]" delay={-3.5} />
    </Panel>
  );
}

/* ---------------- hire ---------------- */
function HireVisual() {
  const devs = [
    { role: "Backend developer", tags: ["Node.js", "APIs"], c: "#0878d1" },
    { role: "Frontend developer", tags: ["React", "Next.js"], c: "#d99a19" },
    { role: "AI engineer", tags: ["Python", "LLMs"], c: "#9a5b08" },
  ];
  return (
    <Panel>
      {devs.map((d, i) => (
        <div key={d.role} className="absolute left-[14%] right-[14%] flex items-center gap-3 rounded-2xl border border-line bg-surface p-3 shadow-[var(--shadow-card)] animate-float" style={{ top: `${14 + i * 24}%`, animationDelay: `${i * -1.4}s` }}>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white" style={{ background: d.c }}><UserRound className="h-5 w-5" /></span>
          <span className="flex-1">
            <span className="block text-[13px] font-semibold text-fg">{d.role}</span>
            <span className="mt-1 flex gap-1.5">{d.tags.map((t) => <span key={t} className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] text-fg-muted">{t}</span>)}</span>
          </span>
          <span className="rounded-full bg-[#28c840]/15 px-2 py-0.5 text-[10px] font-semibold text-[#17803a]">Available</span>
        </div>
      ))}
      <div className="absolute bottom-[4%] right-[10%] aspect-[4/5] w-[13%]"><Walker /></div>
      <Chip icon={ShieldCheck} label="NDA-backed" bg="#064a87" className="left-[6%] bottom-[8%]" />
    </Panel>
  );
}

export default function PageVisual({ kind }: { kind: VisualKind }) {
  switch (kind) {
    case "mobile":
      return <MobileVisual />;
    case "ai":
      return <AiVisual />;
    case "cloud":
      return <CloudVisual />;
    case "data":
      return <DataVisual />;
    case "robotics":
      return <RoboticsVisual />;
    case "team":
      return <TeamVisual />;
    case "contact":
      return <ContactVisual />;
    case "chatbot":
      return <ChatbotVisual />;
    case "hire":
      return <HireVisual />;
    default:
      return <CodeVisual />;
  }
}
