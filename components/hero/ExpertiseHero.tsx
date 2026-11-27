import { createElement } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  AppWindow,
  Bot,
  Boxes,
  BrainCircuit,
  Building2,
  Car,
  ChartLine,
  Check,
  ChevronRight,
  Clapperboard,
  Cloud,
  Code2,
  Cpu,
  Database,
  Eye,
  Factory,
  GitBranch,
  GraduationCap,
  HeartPulse,
  Landmark,
  Languages,
  Layers,
  LayoutDashboard,
  MessageSquare,
  MessagesSquare,
  Network,
  Palette,
  Plane,
  Plug,
  RefreshCw,
  ScanSearch,
  Shield,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Tags,
  Truck,
  Users,
  Wand2,
  Workflow,
  Wrench,
  RadioTower,
  Briefcase,
  Settings2,
  ArrowRight,
} from "lucide-react";
import { BlueprintPanel } from "@/components/hero/HeroPanels";

const ICONS: Record<string, LucideIcon> = {
  "software-development": Code2,
  "web-app-development": AppWindow,
  "mobile-app-development": Smartphone,
  "api-integration": Plug,
  "application-modernization": RefreshCw,
  "ui-ux-services": Palette,
  "saas-development": Layers,
  "staff-augmentation": Users,
  "data-analytics": ChartLine,
  "cloud-consulting": Cloud,
  "devops-services": GitBranch,
  "low-code-no-code": Boxes,
  "enterprise-software": Building2,
  "software-outsourcing": Briefcase,
  "crm-development": LayoutDashboard,
  "erp-software": Settings2,
  "genai-development": Sparkles,
  "genai-consulting": MessagesSquare,
  "ai-development": BrainCircuit,
  "ai-agent-development": Bot,
  "ai-automation-services": Workflow,
  "ai-software-development": Cpu,
  "ai-data-annotation": Tags,
  "llms-development": Network,
  "genai-integration": Plug,
  "ai-consulting-services": MessagesSquare,
  "llm-fine-tuning": Wand2,
  "chatgpt-integration": MessageSquare,
  "ai-chatbot-development": MessagesSquare,
  "computer-vision-development": Eye,
  "mistral-ai-integration": Sparkles,
  "predictive-analytics-development": ChartLine,
  "nlp-development-services": Languages,
  "llama-integration": Database,
  fintech: Landmark,
  retail: ShoppingBag,
  proptech: Building2,
  automotive: Car,
  "facility-management": Wrench,
  transport: Truck,
  telecom: RadioTower,
  "ai-data-annotation-industry": ScanSearch,
  edtech: GraduationCap,
  insuretech: Shield,
  healthtech: HeartPulse,
  "media-entertainment": Clapperboard,
  travel: Plane,
};

export const expertiseIcon = (slug: string): LucideIcon => ICONS[slug] ?? Factory;

const CATEGORY: Record<string, { label: string; accent: string }> = {
  "software-solution": { label: "Software solutions", accent: "#0878d1" },
  "artificial-intelligence": { label: "Artificial intelligence", accent: "#d99a19" },
  industries: { label: "Industries", accent: "#064a87" },
};

/* ---------- AI: model pipeline ---------- */
function PipelinePanel({ name, items }: { name: string; items: string[] }) {
  const stages = ["Your data", "Model", "Guardrails", "Your product"];
  return (
    <div className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(150deg,#071a33,#064a87_80%,#0878d1_140%)] p-6 text-white shadow-[0_40px_90px_-40px_rgba(7,26,51,0.8)] sm:p-7">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">AI pipeline</span>
        <span className="rounded-full bg-[#f6d77a]/15 px-3 py-1 text-[11px] font-semibold text-[#f6d77a]">{name}</span>
      </div>
      <ol className="relative mt-6 grid grid-cols-4 gap-2">
        <span aria-hidden className="absolute left-[12%] right-[12%] top-5 h-px bg-[repeating-linear-gradient(90deg,rgba(246,215,122,0.7)_0_6px,transparent_6px_12px)] [animation:flow-x_1.2s_linear_infinite] motion-reduce:[animation:none] [background-size:24px_1px]" />
        {stages.map((s, i) => (
          <li key={s} className="relative flex flex-col items-center gap-2 text-center">
            <span className="grid h-10 w-10 place-items-center rounded-2xl border border-white/15 bg-white/10 text-[13px] font-bold text-[#f6d77a] backdrop-blur">{i + 1}</span>
            <span className="text-[11.5px] font-medium leading-tight text-white/80">{s}</span>
          </li>
        ))}
      </ol>
      <ul className="relative mt-7 space-y-2.5">
        {items.slice(0, 4).map((t) => (
          <li key={t} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-[14.5px] font-medium">
            <Check aria-hidden className="h-4 w-4 shrink-0 text-[#f6d77a]" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Industries: sector panel ---------- */
function SectorPanel({ name, items, Icon }: { name: string; items: string[]; Icon: LucideIcon }) {
  const tones = ["#0878d1", "#d99a19", "#064a87", "#9a5b08"];
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-line bg-surface p-6 shadow-[0_40px_90px_-50px_rgba(7,26,51,0.55)] sm:p-7">
      <div className="flex items-center gap-4">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[linear-gradient(135deg,#071a33,#064a87)] text-[#f6d77a] shadow-[0_16px_30px_-16px_rgba(7,26,51,0.8)]">
          <Icon aria-hidden className="h-7 w-7" />
        </span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-fg-subtle">Built for</p>
          <p className="font-display text-lg font-bold text-fg">{name}</p>
        </div>
      </div>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.slice(0, 4).map((t, i) => (
          <li key={t} className="relative overflow-hidden rounded-2xl border border-line bg-canvas p-4">
            <span aria-hidden className="absolute inset-y-0 left-0 w-1" style={{ background: tones[i % tones.length] }} />
            <span className="font-display text-[11px] font-bold" style={{ color: tones[i % tones.length] }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-1 text-[14px] font-semibold leading-snug text-fg">{t}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ExpertiseHero({
  categoryKey,
  slug,
  name,
  title,
  description,
  highlights,
}: {
  categoryKey: string;
  slug: string;
  name: string;
  title: string;
  description: string;
  highlights: string[];
}) {
  const cat = CATEGORY[categoryKey] ?? CATEGORY["software-solution"];
  const Icon = expertiseIcon(slug);
  const words = title.trim().split(/\s+/);
  const lead = words.slice(0, -2).join(" ");
  const tail = words.slice(-2).join(" ");
  const items = highlights.filter(Boolean);

  const aside =
    categoryKey === "artificial-intelligence" ? (
      <PipelinePanel name={name} items={items} />
    ) : categoryKey === "industries" ? (
      <SectorPanel name={name} items={items} Icon={Icon} />
    ) : (
      <BlueprintPanel service={name} items={items} />
    );

  return (
    <section aria-labelledby="expertise-hero-title" className="relative overflow-hidden bg-canvas">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_70%_70%_at_30%_30%,#000_30%,transparent_80%)]" />
        <div className="absolute -left-40 -top-24 h-[420px] w-[420px] rounded-full opacity-[0.16] blur-[130px]" style={{ background: cat.accent }} />
        <div className="absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-[#f6d77a]/40 blur-[130px] dark:bg-[#d99a19]/14" />
      </div>

      <div className="relative mx-auto grid max-w-[1320px] gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-12 lg:items-center lg:gap-14 lg:px-10 lg:py-20">
        <div className="lg:col-span-6">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-fg-subtle">
            <Link href="/our-expertise" className="hover:text-fg">
              Our expertise
            </Link>
            <ChevronRight aria-hidden className="h-3.5 w-3.5" />
            <span>{cat.label}</span>
          </nav>
          <div className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pl-1.5 pr-4 shadow-[var(--shadow-card)]">
            <span className="grid h-8 w-8 place-items-center rounded-full text-white" style={{ background: cat.accent }}>
              {createElement(Icon, { "aria-hidden": true, className: "h-4 w-4" })}
            </span>
            <span className="text-[13px] font-semibold text-fg">{name}</span>
          </div>
          <h1 id="expertise-hero-title" className="mt-5 font-display text-[clamp(1.55rem,2.5vw,2.2rem)] font-bold leading-[1.08] tracking-[-0.03em] text-fg">
            {lead ? `${lead} ` : null}
            <span className="text-brand-spectrum">{tail}</span>
          </h1>
          <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-fg-muted">{description}</p>
          <Link href="#benefits-title" className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#0878d1] hover:underline">
            See how we help <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
        <div className="lg:col-span-6">{aside}</div>
      </div>
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-brand-spectrum" />
    </section>
  );
}

