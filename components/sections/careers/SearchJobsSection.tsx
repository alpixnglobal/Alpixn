"use client";

import Link from "next/link";
import { ArrowUpRight, CalendarDays, Search, SlidersHorizontal } from "lucide-react";
import { useDeferredValue, useState } from "react";

import type { JobOpeningRecord } from "@/lib/content-types";

type SearchJobsSectionProps = {
  jobs: JobOpeningRecord[];
  searchPlaceholder?: string;
  typeLabel?: string;
  allTypesLabel?: string;
  modeLabel?: string;
  allModesLabel?: string;
  viewDetailsLabel?: string;
  emptyMessage?: string;
};

const SearchJobsSection = ({
  jobs,
  searchPlaceholder = "Search jobs, companies...",
  typeLabel = "Job type",
  allTypesLabel = "All job types",
  modeLabel = "Mode",
  allModesLabel = "All modes",
  viewDetailsLabel = "View Details",
  emptyMessage = "No job openings matched the current search and filters.",
}: SearchJobsSectionProps) => {
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedMode, setSelectedMode] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const deferredQuery = useDeferredValue(query);

  const types = Array.from(new Set(jobs.map((job) => job.type))).sort((left, right) => left.localeCompare(right));
  const modes = Array.from(new Set(jobs.map((job) => job.mode))).sort((left, right) => left.localeCompare(right));

  const filteredJobs = jobs.filter((job) => {
    const matchesQuery =
      deferredQuery.trim().length === 0 ||
      `${job.title} ${job.company} ${job.location}`.toLowerCase().includes(deferredQuery.trim().toLowerCase());

    const matchesType = selectedType === "all" || job.type === selectedType;
    const matchesMode = selectedMode === "all" || job.mode === selectedMode;

    return matchesQuery && matchesType && matchesMode;
  });

  const tones = ["#0878d1", "#d99a19", "#064a87", "#9a5b08"];
  return (
    <section aria-labelledby="open-roles" className="bg-canvas py-16 sm:py-20">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#d99a19]/35 bg-[#f6d77a]/25 px-3.5 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-[#9a5b08] dark:bg-[#d99a19]/10 dark:text-[#f6d77a]">
              <span className="h-1.5 w-1.5 rounded-full bg-current" /> Open roles
            </span>
            <h2 id="open-roles" className="mt-4 font-display text-[clamp(1.5rem,2.3vw,2.05rem)] font-bold leading-[1.15] tracking-[-0.025em] text-fg">
              Find your <span className="text-brand-spectrum">next role</span>
            </h2>
          </div>
          <div className="flex w-full gap-3 lg:w-auto">
            <label className="relative flex h-12 flex-1 items-center rounded-full border border-line bg-surface px-5 shadow-[var(--shadow-card)] lg:w-[360px]">
              <span className="sr-only">Search jobs</span>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={searchPlaceholder} className="h-full w-full bg-transparent text-[15px] text-fg outline-none placeholder:text-fg-subtle" />
              <Search aria-hidden className="h-4 w-4 text-fg-subtle" />
            </label>
            <button type="button" onClick={() => setShowFilters((v) => !v)} aria-expanded={showFilters} className="btn-ghost-brand !px-5">
              <SlidersHorizontal aria-hidden className="h-4 w-4" /> Filters
            </button>
          </div>
        </div>

        {showFilters ? (
          <div className="mt-5 grid gap-4 rounded-3xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] sm:grid-cols-2">
            <label className="grid gap-2 text-sm text-fg-muted">
              {typeLabel}
              <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="h-11 rounded-xl border border-line bg-canvas px-3 text-[15px] text-fg">
                <option value="all">{allTypesLabel}</option>
                {types.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm text-fg-muted">
              {modeLabel}
              <select value={selectedMode} onChange={(e) => setSelectedMode(e.target.value)} className="h-11 rounded-xl border border-line bg-canvas px-3 text-[15px] text-fg">
                <option value="all">{allModesLabel}</option>
                {modes.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </label>
          </div>
        ) : null}

        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {filteredJobs.map((job, i) => (
            <li key={job._id}>
              <Link href={`/resources/careers/${job.slug}`} className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-line bg-surface p-6 shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-1">
                <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: tones[i % tones.length] }} />
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl font-bold text-fg">{job.title}</h3>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#fbe7a1,#d99a19)] text-[#071a33] transition-transform group-hover:rotate-45">
                    <ArrowUpRight aria-hidden className="h-4 w-4" />
                  </span>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {[job.type, job.mode, job.location, job.salary].filter(Boolean).map((v, k) => (
                    <li key={`${v}-${k}`} className="rounded-full border border-line bg-surface-2 px-3 py-1 text-[12.5px] font-medium text-fg-muted">{v}</li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center justify-between pt-6 text-sm">
                  <span className="flex items-center gap-2 text-fg-subtle">
                    <CalendarDays aria-hidden className="h-4 w-4" /> {job.posted}
                  </span>
                  <span className="font-semibold text-[#0878d1]">{viewDetailsLabel}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        {filteredJobs.length === 0 ? <p className="mt-8 rounded-3xl border border-line bg-surface p-8 text-center text-fg-muted">{emptyMessage}</p> : null}
      </div>
    </section>
  );
};

export default SearchJobsSection;
