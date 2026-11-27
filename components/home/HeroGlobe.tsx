import { BarChart3, BrainCircuit, Cloud, Code2, Database, PhoneCall, Settings2 } from "lucide-react";

/**
 * Homepage hero: full-screen client-supplied video of a rotating digital Earth surrounded by
 * AI, cloud, calling, data, analytics and automation icons. Copy and pills mirror what the video shows.
 * No buttons (client request). The video is stored on and streamed from Cloudinary (client request);
 * `ac_none,q_auto` strips the audio track and lets Cloudinary pick the quality/size.
 */
const CLOUDINARY = "https://res.cloudinary.com/ptoxxqz0/video/upload/ac_none,q_auto/v1795769230/Rotating_digital_Earth_animation_81fa187c";
const PILLS = [
  { icon: BrainCircuit, label: "AI solutions" },
  { icon: PhoneCall, label: "AI calling" },
  { icon: Cloud, label: "Cloud platforms" },
  { icon: Database, label: "Data engineering" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Settings2, label: "Automation" },
  { icon: Code2, label: "Software development" },
];

export default function HeroGlobe() {
  return (
    <section aria-labelledby="hero-title" className="dark relative isolate flex min-h-[calc(100svh-72px)] items-center overflow-hidden bg-[#040d1c] text-white">
      {/* Video: shifted right on large screens so the globe sits beside the text */}
      <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
        <video
          className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-55 lg:left-[64%] lg:opacity-100"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={`${CLOUDINARY}.webm`} type="video/webm" />
          <source src={`${CLOUDINARY}.mp4`} type="video/mp4" />
        </video>
      </div>
      {/* Legibility */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,13,28,0.97)_0%,rgba(4,13,28,0.9)_32%,rgba(4,13,28,0.45)_55%,rgba(4,13,28,0)_75%)]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-[#040d1c] via-[#040d1c]/70 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-[#040d1c]/70 to-transparent" />

      <div className="mx-auto w-full max-w-[1320px] px-4 py-20 sm:px-6 lg:px-10">
        <div className="max-w-[680px]">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-[#f6d77a] backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
            Global AI &amp; technology partner
          </span>
          <h1 id="hero-title" className="mt-6 font-display text-[clamp(1.9rem,3.3vw,3rem)] font-bold leading-[1.06] tracking-[-0.03em]">
            <span className="sm:whitespace-nowrap">Connecting Your Business</span>
            <br />
            to a <span className="text-gold-grad">Smarter World</span>
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/80">
            AI, cloud, data and intelligent automation — engineered by ALPIXN and delivered to businesses across the globe. From multilingual AI calling to analytics and custom software, we build the technology that keeps you connected.
          </p>
          <ul className="mt-9 flex max-w-xl flex-wrap gap-2">
            {PILLS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[13px] text-white/85 backdrop-blur">
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
