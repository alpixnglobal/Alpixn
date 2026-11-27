import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Briefcase, Check, MapPin } from "lucide-react";
import { accentSplit } from "@/components/sections/shared/PageHero";

/**
 * Content-driven hero panels. Each one shows real information from the page it sits on
 * (service scope, open roles, product features, tech stack), so every hero looks and reads differently.
 */

const TONES = ["#0878d1", "#d99a19", "#064a87", "#9a5b08", "#f6d77a"];

/* -------- Expertise: service blueprint -------- */
export function BlueprintPanel({ service, items }: { service: string; items: string[] }) {
  const list = items.filter(Boolean).slice(0, 5);
  const phases = ["Discover", "Design", "Build", "Launch"];
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-line bg-surface shadow-[0_40px_90px_-50px_rgba(7,26,51,0.55)]">
      <div className="flex items-center justify-between border-b border-line px-6 py-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">Service blueprint</span>
        <span className="rounded-full bg-[#0878d1]/10 px-3 py-1 text-[11px] font-semibold text-[#064a87] dark:text-[#7cc6ff]">{service}</span>
      </div>
      <ol className="divide-y divide-line">
        {list.map((t, i) => (
          <li key={t} className="flex items-center gap-4 px-6 py-3.5">
            <span className="font-display text-2xl font-bold" style={{ color: TONES[i % TONES.length] === "#f6d77a" ? "#d99a19" : TONES[i % TONES.length] }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex-1 text-[15px] font-semibold text-fg">{t}</span>
            <Check aria-hidden className="h-4 w-4 text-[#28c840]" />
          </li>
        ))}
      </ol>
      <div className="bg-[linear-gradient(135deg,#071a33,#064a87)] px-6 py-4">
        <ol className="flex items-center justify-between gap-2 text-[12px] font-semibold text-white/80">
          {phases.map((p, i) => (
            <li key={p} className="flex items-center gap-2">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white/10 text-[11px] text-[#f6d77a]">{i + 1}</span>
              {p}
              {i < phases.length - 1 ? <ArrowRight aria-hidden className="ml-1 hidden h-3.5 w-3.5 text-white/40 sm:block" /> : null}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* -------- Careers: live open roles -------- */
export function OpenRolesPanel({ jobs }: { jobs: { slug: string; title: string; type: string; mode: string; location: string }[] }) {
  const list = jobs.slice(0, 4);
  return (
    <div className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(150deg,#071a33,#064a87_75%,#0878d1_130%)] p-6 text-white shadow-[0_40px_90px_-40px_rgba(7,26,51,0.8)] sm:p-7">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative flex items-end justify-between">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#f6d77a]">Hiring now</p>
          <p className="mt-1 font-display text-5xl font-bold">{jobs.length}</p>
          <p className="text-[13px] text-white/70">open {jobs.length === 1 ? "role" : "roles"}</p>
        </div>
        <Briefcase aria-hidden className="h-10 w-10 text-white/20" />
      </div>
      <ul className="relative mt-6 space-y-2.5">
        {list.map((j, i) => (
          <li key={j.slug}>
            <Link href={`/resources/careers/${j.slug}`} className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 transition-colors hover:bg-white/10">
              <span className="h-9 w-1 rounded-full" style={{ background: TONES[i % TONES.length] }} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[15px] font-semibold">{j.title}</span>
                <span className="mt-0.5 flex items-center gap-2 text-[12px] text-white/60">
                  {j.type} · {j.mode}
                  {j.location ? (
                    <>
                      <MapPin aria-hidden className="h-3 w-3" /> {j.location}
                    </>
                  ) : null}
                </span>
              </span>
              <ArrowUpRight aria-hidden className="h-4 w-4 text-white/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#f6d77a]" />
            </Link>
          </li>
        ))}
        {!list.length ? <li className="rounded-2xl border border-white/10 bg-white/5 p-4 text-[14px] text-white/70">New roles are posted here first. Send us your CV in the meantime.</li> : null}
      </ul>
    </div>
  );
}

/* -------- Product: screenshot in a browser frame + feature list -------- */
export function ProductShowcase({ image, features }: { image: string; features: string[] }) {
  return (
    <div className="relative pb-10">
      <div className="overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-[0_40px_90px_-40px_rgba(7,26,51,0.6)] [transform:perspective(1600px)_rotateY(-8deg)_rotateX(4deg)]">
        <div className="flex items-center gap-1.5 border-b border-black/5 bg-[#f4f6f9] px-3 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 flex-1 truncate rounded-md bg-white px-2 py-0.5 font-mono text-[10px] text-[#64748b]">app.your-company.com/assistant</span>
        </div>
        <div className="relative aspect-[16/10]">
          <Image src={image} alt="AI assistant concept screen" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-left-top" />
        </div>
      </div>
      <ul className="absolute -bottom-2 left-4 right-4 grid gap-2 rounded-2xl border border-line bg-surface/95 p-3 shadow-[var(--shadow-card)] backdrop-blur sm:left-auto sm:right-[-12px] sm:w-[260px]">
        {features.slice(0, 3).map((f, i) => (
          <li key={f} className="flex items-center gap-2.5 text-[13px] font-medium text-fg">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-white" style={{ background: TONES[i] }}>
              <Check aria-hidden className="h-3.5 w-3.5" />
            </span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------- Technologies: full-width navy hero with a real tech icon wall -------- */
function IconRow({ items, reverse }: { items: { label: string; imageData: string }[]; reverse?: boolean }) {
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <div className="marquee-track gap-3" style={reverse ? { animationDirection: "reverse" } : undefined}>
        {[...items, ...items].map((it, i) => (
          <span key={`${it.label}-${i}`} className="flex shrink-0 items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2.5">
            <Image src={it.imageData} alt="" width={22} height={22} unoptimized={it.imageData.startsWith("data:") || it.imageData.startsWith("http")} className="h-5 w-5 object-contain" />
            <span className="whitespace-nowrap text-[14px] font-medium text-white/85">{it.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function TechHero({
  eyebrow,
  title,
  subtitle,
  description,
  icons,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string } | null;
  icons: { label: string; imageData: string }[];
}) {
  const { lead, tail } = accentSplit(title, 2);
  const real = icons.filter((i) => i.imageData && !i.imageData.includes("placeholder"));
  const rowA = real.slice(0, Math.ceil(real.length / 2));
  const rowB = real.slice(Math.ceil(real.length / 2));

  return (
    <section aria-labelledby="tech-hero-title" className="dark relative overflow-hidden bg-[#040d1c] text-white">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-25" />
      <div aria-hidden className="absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-[#0878d1]/30 blur-[130px]" />
      <div aria-hidden className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-[#d99a19]/25 blur-[130px]" />
      <div className="relative mx-auto max-w-[1320px] px-4 pt-16 text-center sm:px-6 sm:pt-20 lg:px-10">
        {eyebrow ? <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-[#7cc6ff]">{`<${eyebrow} />`}</p> : null}
        <h1 id="tech-hero-title" className="mx-auto mt-4 max-w-4xl font-display text-[clamp(1.55rem,2.5vw,2.2rem)] font-bold leading-[1.08] tracking-[-0.03em]">
          {lead ? `${lead} ` : null}
          <span className="text-gold-grad">{tail}</span>
        </h1>
        {subtitle ? <p className="mt-4 font-semibold text-[#f6d77a]">{subtitle}</p> : null}
        <p className="mx-auto mt-3 max-w-2xl text-[17px] leading-relaxed text-white/75">{description}</p>
      </div>
      {real.length ? (
        <div className="relative mt-14 space-y-3 pb-14">
          <IconRow items={rowA} />
          <IconRow items={rowB.length ? rowB : rowA} reverse />
        </div>
      ) : (
        <div className="pb-16" />
      )}
      <div aria-hidden className="h-1 bg-brand-spectrum" />
    </section>
  );
}

/* -------- About: editorial statement hero -------- */
export function StatementHero({ eyebrow, title, description, columns }: { eyebrow: string; title: string; description: string; primary: { label: string; href: string }; secondary: { label: string; href: string }; columns: { title: string; text: string }[] }) {
  const { lead, tail } = accentSplit(title, 5);
  return (
    <section aria-labelledby="statement-title" className="relative overflow-hidden bg-canvas">
      <div aria-hidden className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#f6d77a]/35 blur-[140px] dark:bg-[#d99a19]/12" />
      <div className="relative mx-auto max-w-[1320px] px-4 pb-14 pt-14 sm:px-6 sm:pt-20 lg:px-10">
        <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-[#0878d1]">/ {eyebrow}</p>
        <h1 id="statement-title" className="mt-5 max-w-5xl font-display text-[clamp(1.55rem,2.5vw,2.2rem)] font-bold leading-[1.1] tracking-[-0.03em] text-fg">
          {lead ? `${lead} ` : null}
          <span className="text-brand-spectrum">{tail}</span>
        </h1>
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <p className="text-[17px] leading-relaxed text-fg-muted lg:col-span-8">{description}</p>
        </div>
        <ol className="mt-14 grid border-t border-line sm:grid-cols-3">
          {columns.map((c, i) => (
            <li key={c.title} className={`py-7 sm:px-6 ${i ? "border-t border-line sm:border-l sm:border-t-0" : "sm:pl-0"}`}>
              <span className="font-display text-sm font-bold" style={{ color: ["#0878d1", "#d99a19", "#9a5b08"][i % 3] }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-3 font-display text-xl font-bold text-fg">{c.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{c.text}</p>
            </li>
          ))}
        </ol>
      </div>
      <div aria-hidden className="h-1 bg-brand-spectrum" />
    </section>
  );
}

/* -------- Team / interns: principles strip -------- */
export function PrinciplesPanel({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((it, i) => (
        <li key={it.title} className="relative overflow-hidden rounded-3xl border border-line bg-surface p-5 shadow-[var(--shadow-card)]">
          <span aria-hidden className="absolute inset-y-0 left-0 w-1.5" style={{ background: TONES[i % 4] }} />
          <h3 className="font-display text-[16px] font-bold text-fg">{it.title}</h3>
          <p className="mt-1.5 text-[14px] leading-relaxed text-fg-muted">{it.text}</p>
        </li>
      ))}
    </ul>
  );
}
