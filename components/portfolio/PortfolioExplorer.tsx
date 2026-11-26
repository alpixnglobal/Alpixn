"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, FlaskConical, MapPin, Search, ShieldCheck, X } from "lucide-react";

export type PortfolioCard = {
  slug: string;
  title: string;
  summary: string;
  industry: string;
  country: string;
  projectTypes: string[];
  techStack: string[];
  status: "real" | "concept";
  image: string;
  demoPath?: string;
  liveUrl?: string;
  featured?: boolean;
};

type Filters = { q: string; industry: string; country: string; type: string; tech: string; status: string };
const ALL = "All";

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="flex min-w-0 flex-col gap-1">
      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-subtle">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="h-10 rounded-xl border border-line bg-surface px-3 text-sm text-fg outline-none focus:border-tech">
        {[ALL, ...options].map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export function ProjectCard({ p }: { p: PortfolioCard }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface-2">
        <Image src={p.image} alt={`${p.title} — screenshot`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
        <span className={`absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur ${p.status === "real" ? "bg-emerald-600/90 text-white" : "bg-[#040d1c]/80 text-[#f6d77a]"}`}>
          {p.status === "real" ? <ShieldCheck aria-hidden className="h-3.5 w-3.5" /> : <FlaskConical aria-hidden className="h-3.5 w-3.5" />}
          {p.status === "real" ? "Real project" : "Concept project"}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <span className="font-semibold uppercase tracking-[0.14em] text-gold-ink">{p.industry}</span>
          {p.country ? (
            <span className="inline-flex items-center gap-1 text-fg-subtle">
              <MapPin aria-hidden className="h-3 w-3" /> {p.country}
            </span>
          ) : null}
        </div>
        <h3 className="font-display text-[17px] font-semibold leading-snug text-fg">{p.title}</h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-fg-muted">{p.summary}</p>
        <ul className="flex flex-wrap gap-1.5" aria-label="Project type and technology">
          {p.projectTypes.slice(0, 2).map((t) => (
            <li key={t} className="rounded-full bg-tech/10 px-2 py-0.5 text-[11px] font-medium text-tech">
              {t}
            </li>
          ))}
          {p.techStack.slice(0, 3).map((t) => (
            <li key={t} className="rounded-full border border-line px-2 py-0.5 text-[11px] text-fg-muted">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex gap-2 pt-2">
          <Link href={`/resources/portfolio/${p.slug}`} className="btn-subtle flex-1 justify-center">
            Project details
          </Link>
          {p.liveUrl ? (
            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-subtle flex-1 justify-center">
              Visit site <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
            </a>
          ) : p.demoPath ? (
            <Link href={p.demoPath} className="btn-subtle flex-1 justify-center" aria-label={`View ${p.title} interactive demo`}>
              View demo <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}

const AI_TYPES = ["AI software"];
const ROBOTICS_TYPES = ["Robotics & automation"];

export default function PortfolioExplorer({ projects, initial }: { projects: PortfolioCard[]; initial: Partial<Filters> }) {
  const [f, setF] = useState<Filters>({ q: "", industry: ALL, country: ALL, type: ALL, tech: ALL, status: ALL, ...initial });
  const set = (k: keyof Filters) => (v: string) => setF((s) => ({ ...s, [k]: v }));

  const options = useMemo(() => {
    const uniq = (arr: string[]) => Array.from(new Set(arr)).filter(Boolean).sort((a, b) => a.localeCompare(b));
    return {
      industry: uniq(projects.map((p) => p.industry)),
      country: uniq(projects.map((p) => p.country)),
      type: uniq(projects.flatMap((p) => p.projectTypes)),
      tech: uniq(projects.flatMap((p) => p.techStack)),
    };
  }, [projects]);

  const quick = [
    { label: "All projects", apply: () => setF((s) => ({ ...s, type: ALL, status: ALL })) },
    { label: "Websites", apply: () => setF((s) => ({ ...s, type: "Website" })) },
    { label: "Mobile apps", apply: () => setF((s) => ({ ...s, type: "Mobile app" })) },
    { label: "Software & SaaS", apply: () => setF((s) => ({ ...s, type: "SaaS" })) },
    { label: "AI", apply: () => setF((s) => ({ ...s, type: AI_TYPES[0] })) },
    { label: "Robotics", apply: () => setF((s) => ({ ...s, type: ROBOTICS_TYPES[0] })) },
  ];

  const filtered = projects.filter((p) => {
    if (f.industry !== ALL && p.industry !== f.industry) return false;
    if (f.country !== ALL && p.country !== f.country) return false;
    if (f.type !== ALL && !p.projectTypes.includes(f.type)) return false;
    if (f.tech !== ALL && !p.techStack.includes(f.tech)) return false;
    if (f.status !== ALL && p.status !== (f.status === "Real projects" ? "real" : "concept")) return false;
    const q = f.q.trim().toLowerCase();
    if (q && ![p.title, p.summary, p.industry, p.country, ...p.projectTypes, ...p.techStack].join(" ").toLowerCase().includes(q)) return false;
    return true;
  });

  const active = (Object.keys(f) as (keyof Filters)[]).filter((k) => k !== "q" && f[k] !== ALL);

  return (
    <div>
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:px-0">
        {quick.map((q) => (
          <button key={q.label} type="button" onClick={q.apply} className="shrink-0 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-fg-muted transition hover:border-gold/60 hover:text-fg">
            {q.label}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-3 rounded-2xl border border-line bg-surface p-4 shadow-[var(--shadow-card)] sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(5,1fr)]">
        <label className="flex flex-col gap-1 sm:col-span-2 lg:col-span-1">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-subtle">Search</span>
          <span className="relative">
            <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" />
            <input value={f.q} onChange={(e) => set("q")(e.target.value)} placeholder="Booking, Flutter, logistics…" className="h-10 w-full rounded-xl border border-line bg-surface pl-9 pr-3 text-sm text-fg outline-none focus:border-tech" />
          </span>
        </label>
        <Select label="Industry" value={f.industry} onChange={set("industry")} options={options.industry} />
        <Select label="Country" value={f.country} onChange={set("country")} options={options.country} />
        <Select label="Project type" value={f.type} onChange={set("type")} options={options.type} />
        <Select label="Technology" value={f.tech} onChange={set("tech")} options={options.tech} />
        <Select label="Status" value={f.status} onChange={set("status")} options={["Real projects", "Concept projects"]} />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-fg-subtle" aria-live="polite">
        <span>
          {filtered.length} of {projects.length} projects
        </span>
        {active.map((k) => (
          <button key={k} type="button" onClick={() => set(k)(ALL)} className="inline-flex items-center gap-1 rounded-full bg-surface-2 px-2.5 py-1 text-xs text-fg">
            {f[k]} <X aria-label="Remove filter" className="h-3 w-3" />
          </button>
        ))}
      </div>

      {filtered.length ? (
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <li key={p.slug}>
              <ProjectCard p={p} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-line p-10 text-center text-fg-muted">No projects match these filters yet.</div>
      )}
    </div>
  );
}
