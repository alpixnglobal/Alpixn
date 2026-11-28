import { ClipboardList, Calculator, Handshake } from "lucide-react";
import EstimateButton from "./EstimateButton";
import RobotAvatar from "./RobotAvatar";
import { formatINR, type PricingCatalog } from "@/lib/pricing/catalog";
import Link from "next/link";

/** Homepage section introducing the project-planning robot. */
export default function AssistantSection({ catalog }: { catalog: PricingCatalog }) {
  const highlights = catalog.categories
    .filter((c) => c.packages[0]?.priceFrom && ["web-development", "mobile-app", "custom-software", "ai-chatbot", "ai-calling", "ai-development", "dedicated-team", "branding"].includes(c.id))
    .map((c) => ({ name: c.name, from: c.packages[0].priceFrom, billing: c.packages[0].billing }));
  const steps = [
    { icon: ClipboardList, title: "Tell the robot", text: "Share your idea, features, references and budget in a quick chat." },
    { icon: Calculator, title: "Get an estimate", text: "See an estimated budget range from our price plans in about two minutes." },
    { icon: Handshake, title: "Team confirms", text: "Our team reviews your requirements and sends the final quote." },
  ];
  return (
    <section aria-labelledby="assistant-title" className="relative overflow-hidden bg-canvas py-16 sm:py-20">
      <div aria-hidden className="pointer-events-none absolute -left-32 top-10 h-[360px] w-[360px] rounded-full bg-[#0878d1]/10 blur-[110px]" />
      <div aria-hidden className="pointer-events-none absolute -right-32 bottom-0 h-[360px] w-[360px] rounded-full bg-[#f6d77a]/30 blur-[110px] dark:bg-[#d99a19]/10" />
      <div className="relative mx-auto grid max-w-[1320px] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-10">
        <div className="lg:col-span-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d99a19]/40 bg-[#f6d77a]/20 px-3.5 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-[#9a5b08] dark:text-[#f6d77a]">
            <span className="h-1.5 w-1.5 rounded-full bg-current" /> AI project planner
          </span>
          <h2 id="assistant-title" className="mt-4 font-display text-[clamp(1.35rem,1.9vw,1.75rem)] font-bold leading-[1.15] tracking-[-0.025em] text-fg">
            Plan your project with our <span className="text-brand-spectrum">friendly robot</span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-muted">
            Website, mobile app, custom software, AI chatbot, AI calling, AI development or offshore developers — tell our assistant what you need and get an estimated budget instantly. We work with every budget.
          </p>
          <ol className="mt-8 grid gap-4 sm:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-3xl border border-line bg-surface p-4 shadow-[var(--shadow-card)]">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[linear-gradient(135deg,#071a33,#064a87)] text-[#f6d77a]">
                  <s.icon className="h-4.5 w-4.5" aria-hidden />
                </span>
                <p className="mt-3 font-display text-[14.5px] font-semibold text-fg">
                  {i + 1}. {s.title}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-fg-muted">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <EstimateButton label="Chat with the robot" />
            <Link href="/pricing" className="text-[14px] font-semibold text-[#0878d1] hover:underline">
              See all price plans →
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative mx-auto max-w-[520px] rounded-[32px] bg-[linear-gradient(150deg,#071a33,#064a87_75%,#0878d1_130%)] p-6 text-white shadow-[0_40px_90px_-40px_rgba(7,26,51,0.8)] sm:p-8">
            <div aria-hidden className="absolute inset-0 rounded-[32px] bg-grid opacity-20" />
            <div className="relative flex items-center gap-4">
              <span className="grid h-20 w-20 place-items-center rounded-3xl bg-white/10 ring-1 ring-white/15">
                <RobotAvatar size={62} className="assistant-bob" />
              </span>
              <div>
                <p className="font-display text-lg font-bold">Hi, I&apos;m your project assistant</p>
                <p className="text-[13px] text-white/70">Ask me anything about building your project.</p>
              </div>
            </div>
            <ul className="relative mt-6 grid grid-cols-2 gap-2.5">
              {highlights.map((h) => (
                <li key={h.name} className="rounded-2xl border border-white/10 bg-white/[0.06] px-3.5 py-3">
                  <p className="text-[12.5px] text-white/70">{h.name}</p>
                  <p className="font-display text-[15px] font-bold text-[#f6d77a]">
                    from {formatINR(h.from)}
                    {h.billing === "monthly" ? <span className="text-[11px] font-medium text-white/60">/month</span> : null}
                  </p>
                </li>
              ))}
            </ul>
            <p className="relative mt-4 text-[11.5px] text-white/55">Indicative starting prices, GST extra. Final quote after requirement discussion.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
