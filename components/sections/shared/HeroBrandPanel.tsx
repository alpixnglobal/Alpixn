import Image from "next/image";
import { Bot, BrainCircuit, Code2, Workflow } from "lucide-react";

/** Navy brand panel used as the visual on inner-page heroes (emblem + spectrum orbit + capability chips). */
const CHIPS = [
  { icon: BrainCircuit, label: "AI", bg: "#0878d1", ink: "#ffffff", pos: "left-[6%] top-[14%]" },
  { icon: Bot, label: "Robotics", bg: "#064a87", ink: "#ffffff", pos: "right-[6%] top-[20%]" },
  { icon: Code2, label: "Software", bg: "#d99a19", ink: "#071a33", pos: "left-[8%] bottom-[16%]" },
  { icon: Workflow, label: "Automation", bg: "#9a5b08", ink: "#ffffff", pos: "right-[8%] bottom-[12%]" },
];

export default function HeroBrandPanel({ image, imageAlt = "" }: { image?: string; imageAlt?: string }) {
  return (
    <div aria-hidden={!image} className="relative mx-auto aspect-[5/4] w-full max-w-[560px] overflow-hidden rounded-[32px] bg-[linear-gradient(150deg,#071a33_0%,#064a87_70%,#0878d1_125%)] shadow-[0_40px_90px_-40px_rgba(7,26,51,0.7)]">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute -bottom-20 left-1/2 h-56 w-[80%] -translate-x-1/2 rounded-full bg-[#d99a19]/30 blur-[80px]" />
      <div className="absolute left-1/2 top-1/2 aspect-square w-[64%] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 animate-[spin_40s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,#0878d1,#064a87,#f6d77a,#d99a19,#9a5b08,#0878d1)] [mask:radial-gradient(farthest-side,transparent_calc(100%-3px),#000_calc(100%-2px))]" />
        <div className="absolute inset-[12%] rounded-full border border-dashed border-white/15" />
        {image ? (
          <Image src={image} alt={imageAlt} fill sizes="360px" unoptimized={image.startsWith("data:") || image.startsWith("http")} className="rounded-full object-cover p-[14%]" />
        ) : (
          <Image src="/brand/alpixn-emblem.webp" alt="" width={300} height={300} className="absolute left-1/2 top-1/2 w-[62%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_20px_50px_rgba(217,154,25,0.4)]" />
        )}
      </div>
      {CHIPS.map(({ icon: Icon, label, bg, ink, pos }, i) => (
        <span key={label} className={`absolute ${pos} flex items-center gap-1.5 rounded-full py-1 pl-1 pr-3 text-[12px] font-semibold shadow-[0_14px_30px_-12px_rgba(0,0,0,0.6)] animate-float`} style={{ background: bg, color: ink, animationDelay: `${i * -1.3}s` }}>
          <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20">
            <Icon className="h-3.5 w-3.5" />
          </span>
          {label}
        </span>
      ))}
      <div className="absolute inset-x-0 bottom-0 h-1.5 bg-brand-spectrum" />
    </div>
  );
}
