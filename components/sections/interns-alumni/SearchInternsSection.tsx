"use client";

import Image from "next/image";
import { useDeferredValue, useState } from "react";

import type { InternRecord } from "@/lib/content-types";
import InternCard from "./InternCard";

function getBadgeVariant(award: string) {
  const normalizedAward = award.toLowerCase();

  if (normalizedAward.includes("gold")) {
    return "gold" as const;
  }

  if (normalizedAward.includes("silver")) {
    return "silver" as const;
  }

  return "royalBlue" as const;
}

type SearchInternsSectionProps = {
  interns: InternRecord[];
  searchPlaceholder?: string;
  programLabel?: string;
  allProgramsLabel?: string;
  trackLabel?: string;
  allTracksLabel?: string;
  resultsLabel?: string;
  clearAllLabel?: string;
  emptyMessage?: string;
};

const SearchInternsSection = ({
  interns,
  searchPlaceholder = "Search interns",
  programLabel = "Program",
  allProgramsLabel = "All programs",
  trackLabel = "Track",
  allTracksLabel = "All tracks",
  resultsLabel = "results for:",
  clearAllLabel = "Clear All",
  emptyMessage = "No interns matched the current search and filter selection.",
}: SearchInternsSectionProps) => {
  const [query, setQuery] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [selectedTrack, setSelectedTrack] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const deferredQuery = useDeferredValue(query);

  const programs = Array.from(new Set(interns.map((intern) => intern.program))).sort((left, right) => left.localeCompare(right));
  const tracks = Array.from(new Set(interns.map((intern) => intern.track))).sort((left, right) => left.localeCompare(right));

  const filteredInterns = interns.filter((intern) => {
    const matchesQuery =
      deferredQuery.trim().length === 0 ||
      `${intern.name} ${intern.role} ${intern.program} ${intern.track}`
        .toLowerCase()
        .includes(deferredQuery.trim().toLowerCase());

    const matchesProgram = selectedProgram === "all" || intern.program === selectedProgram;
    const matchesTrack = selectedTrack === "all" || intern.track === selectedTrack;

    return matchesQuery && matchesProgram && matchesTrack;
  });

  const activeFilters = [selectedProgram !== "all" ? selectedProgram : null, selectedTrack !== "all" ? selectedTrack : null].filter(
    Boolean
  ) as string[];

  return (
    <section className="bg-canvas py-16 sm:py-20">

      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-wrap gap-2.5">
          <label className="relative h-[50px] w-full max-w-[320px] rounded-full border border-line bg-surface shadow-[var(--shadow-card)] lg:h-[62px]">
            <div className="pointer-events-none absolute inset-y-0 left-5 flex items-center gap-[15px]">
              <Image src="/icons/search.svg" width={18} height={18} alt="Search" />
            </div>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={searchPlaceholder}
              className="h-full w-full bg-transparent pl-14 pr-5 text-sm md:text-base font-normal text-fg outline-none placeholder:text-fg/60"
            />
          </label>

          <button
            type="button"
            onClick={() => setShowFilters((currentValue) => !currentValue)}
            className="relative flex h-[50px] w-[62px] items-center justify-center rounded-full border border-line bg-surface shadow-[var(--shadow-card)] lg:h-[62px]"
            aria-expanded={showFilters}
          >
            <Image src="/icons/burger.svg" width={18} height={12} alt="Toggle filters" />
          </button>
        </div>

        {showFilters ? (
          <div className="mt-4 grid gap-4 rounded-3xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] lg:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm md:text-base font-normal leading-relaxed text-fg/80">{programLabel}</span>
              <select
                value={selectedProgram}
                onChange={(event) => setSelectedProgram(event.target.value)}
                className="h-12 rounded-[10px] border border-fg/10 bg-canvas px-4 text-sm md:text-base font-normal text-fg outline-none"
              >
                <option value="all">{allProgramsLabel}</option>
                {programs.map((program) => (
                  <option key={program} value={program}>
                    {program}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-sm md:text-base font-normal leading-relaxed text-fg/80">{trackLabel}</span>
              <select
                value={selectedTrack}
                onChange={(event) => setSelectedTrack(event.target.value)}
                className="h-12 rounded-[10px] border border-fg/10 bg-canvas px-4 text-sm md:text-base font-normal text-fg outline-none"
              >
                <option value="all">{allTracksLabel}</option>
                {tracks.map((track) => (
                  <option key={track} value={track}>
                    {track}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ) : null}

        <div className="mt-6.25 flex flex-wrap items-center gap-2.5">
          <div className="text-sm md:text-base font-normal leading-relaxed text-fg">{filteredInterns.length} {resultsLabel}</div>

          {activeFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              className="flex items-center gap-2.5 rounded-[5px] px-3.75 py-1.25"
              style={{ background: "linear-gradient(360deg, var(--glow) 0%, var(--canvas-2) 100%)", border: "1px solid #FFFFFF40" }}
            >
              <span className="text-sm md:text-base font-normal leading-relaxed">{filter}</span>
            </button>
          ))}

          {query.trim() ? (
            <button
              type="button"
              className="flex items-center gap-2.5 rounded-[5px] px-3.75 py-1.25"
              style={{ background: "linear-gradient(360deg, var(--glow) 0%, var(--canvas-2) 100%)", border: "1px solid #FFFFFF40" }}
            >
              <span className="text-sm md:text-base font-normal leading-relaxed">{query.trim()}</span>
            </button>
          ) : null}

          {(activeFilters.length > 0 || query.trim()) ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelectedProgram("all");
                setSelectedTrack("all");
              }}
              className="flex items-center gap-2.5 rounded-[5px] px-3.75 py-1.25"
              style={{ background: "var(--tech)", border: "1px solid color-mix(in srgb, var(--tech) 25%, transparent)" }}
            >
              <span className="text-sm md:text-base font-medium leading-snug">{clearAllLabel}</span>
              <Image src="/icons/exite.svg" width={10} height={10} alt="Clear filters" />
            </button>
          ) : null}
        </div>

        {filteredInterns.length > 0 ? (
          <div className="mt-12.5 grid grid-cols-1 items-center gap-8.75 lg:grid-cols-2 xl:grid-cols-4">
            {filteredInterns.map((intern) => (
              <InternCard
                key={intern._id}
                name={intern.name}
                role={intern.role}
                period={intern.duration}
                imageSrc={intern.imageData}
                initials={intern.initials}
                accent={intern.accent}
                badgeVariant={getBadgeVariant(intern.award)}
                badgeLabel={intern.award}
                badgeCode={intern.certificateId}
              />
            ))}
          </div>
        ) : (
          <div className="mt-12.5 rounded-[15px] border border-fg/10 bg-fg/[0.03] p-8 text-center text-base md:text-lg font-normal leading-relaxed text-fg/75">
            {emptyMessage}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchInternsSection;
