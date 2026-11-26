"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MoveRight } from "lucide-react";
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

  return (
    <section className="relative w-full py-12.5">
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle, var(--canvas) 75%, var(--glow) 100%)" }} />

      <div className="relative mx-auto w-full max-w-[1122px]">
        <div className="flex flex-wrap justify-center gap-[15px] px-4 lg:justify-end lg:px-0">
          <label className="relative h-[50px] w-full max-w-[400px] rounded-[10px] border border-[color-mix(in_srgb,var(--tech)_45%,transparent)] bg-[color-mix(in_srgb,var(--tech)_5%,transparent)] backdrop-blur-[15px] lg:h-[64px]">
            <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center justify-between gap-[15px]">
              <Image src="/icons/search.svg" width={18} height={18} alt="Search" className="h-[16px] w-[16px] lg:h-[18px] lg:w-[18px]" />
            </div>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={searchPlaceholder}
              className="h-full w-full bg-transparent px-5 text-sm md:text-base font-normal text-fg outline-none placeholder:text-fg/60"
            />
          </label>

          <button
            type="button"
            onClick={() => setShowFilters((currentValue) => !currentValue)}
            className="relative h-[50px] w-[62px] rounded-[10px] border border-[color-mix(in_srgb,var(--tech)_45%,transparent)] bg-[color-mix(in_srgb,var(--tech)_5%,transparent)] backdrop-blur-[15px] lg:h-[64px]"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Image src="/icons/burger.svg" width={18} height={12} alt="Toggle filters" className="h-[10px] w-[16px] lg:h-[12px] lg:w-[18px]" />
            </div>
          </button>
        </div>

        {showFilters ? (
          <div className="mx-4 mt-4 grid gap-4 rounded-[15px] border border-[color-mix(in_srgb,var(--tech)_25%,transparent)] bg-canvas-2/80 p-4 backdrop-blur-[15px] lg:mx-0 lg:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm md:text-base font-normal leading-relaxed text-fg/80">{typeLabel}</span>
              <select
                value={selectedType}
                onChange={(event) => setSelectedType(event.target.value)}
                className="h-12 rounded-[10px] border border-fg/10 bg-canvas px-4 text-sm md:text-base font-normal text-fg outline-none"
              >
                <option value="all">{allTypesLabel}</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-sm md:text-base font-normal leading-relaxed text-fg/80">{modeLabel}</span>
              <select
                value={selectedMode}
                onChange={(event) => setSelectedMode(event.target.value)}
                className="h-12 rounded-[10px] border border-fg/10 bg-canvas px-4 text-sm md:text-base font-normal text-fg outline-none"
              >
                <option value="all">{allModesLabel}</option>
                {modes.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ) : null}

        <div className="mt-[35px] flex flex-col gap-[35px] px-4 xl:px-0">
          {filteredJobs.map((job) => (
            <Link key={job._id} href={`/resources/careers/${job.slug}`}>
              <div
                className="w-full cursor-pointer rounded-[15px] p-5 lg:p-[35px]"
                style={{
                  background: "linear-gradient(180deg, rgba(24, 24, 24, 0.24) 0%, color-mix(in srgb, var(--tech) 6%, transparent) 100%)",
                  border: "1px solid #FFFFFF26",
                }}
              >
                <div className="w-fit rounded-full bg-[color-mix(in_srgb,var(--tech)_5%,transparent)] px-6.25 py-2.5 text-xs font-normal leading-relaxed text-fg">
                  {job.company}
                </div>

                <div className="mt-[35px] flex flex-wrap items-center justify-between">
                  <h2 className="text-base md:text-lg lg:text-xl font-semibold leading-snug tracking-tight text-fg">{job.title}</h2>
                  <div className="mt-4 flex flex-wrap gap-2.5 lg:mt-0 lg:gap-0">
                    <div className="px-3.5 text-xs md:text-sm font-normal leading-relaxed text-fg/80 lg:border-r lg:border-white/20">{job.type}</div>
                    <div className="px-3.5 text-xs md:text-sm font-normal leading-relaxed text-fg/80 lg:border-r lg:border-white/20">{job.mode}</div>
                    <div className="pl-3.5 text-xs md:text-sm font-normal leading-relaxed text-fg/80">{job.salary}</div>
                  </div>
                </div>

                <div className="mt-[35px] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5 text-fg">
                    <CalendarDays className="h-[14px] w-[14px] lg:h-[22px] lg:w-[22px]" />
                    <div className="text-sm md:text-sm lg:text-base font-medium leading-snug">{job.posted}</div>
                  </div>

                  <div
                    className="relative flex w-fit items-center gap-2 rounded-[10px] px-3.5 py-1.5 text-fg sm:px-4 lg:px-5 xl:px-5 lg:py-2.5"
                    style={{
                      background: "linear-gradient(360deg, var(--glow) 0%, var(--canvas-2) 100%)",
                      border: "1.5px solid transparent",
                      backgroundImage:
                        "linear-gradient(360deg, var(--glow) 0%, var(--canvas-2) 100%), linear-gradient(166.72deg, var(--tech) -20.31%, #FFFFFF 92.69%)",
                      backgroundOrigin: "border-box",
                      backgroundClip: "padding-box, border-box",
                    }}
                  >
                    <span className="text-xs md:text-sm lg:text-sm font-semibold leading-snug">{viewDetailsLabel}</span>
                    <MoveRight className="h-[12px] w-[12px] lg:h-[16px] lg:w-[16px]" />
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {filteredJobs.length === 0 ? (
            <div className="rounded-[15px] border border-fg/10 bg-fg/[0.03] p-8 text-center text-base md:text-lg font-normal leading-relaxed text-fg/75">
              {emptyMessage}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default SearchJobsSection;
