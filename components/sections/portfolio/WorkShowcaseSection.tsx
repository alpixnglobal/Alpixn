"use client";

import Image from "next/image";
import Link from "next/link";
import { useDeferredValue, useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { PortfolioProjectRecord } from "@/lib/content-types";

type WorkShowcaseSectionProps = {
  projects: PortfolioProjectRecord[];
  title?: string;
  searchPlaceholder?: string;
  selectedIndustryLabel?: string;
  allIndustriesLabel?: string;
  selectedTagLabel?: string;
  allTagsLabel?: string;
  resultsLabel?: string;
  clearAllLabel?: string;
  emptyMessage?: string;
};

function getPageNumbers(currentPage: number, totalPages: number) {
  const pages: Array<number | string> = [];

  if (totalPages <= 7) {
    for (let page = 1; page <= totalPages; page += 1) {
      pages.push(page);
    }

    return pages;
  }

  pages.push(1, 2, 3);

  if (currentPage > 4) {
    pages.push("...");
  }

  const start = Math.max(4, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  if (currentPage < totalPages - 3) {
    pages.push("...");
  }

  pages.push(totalPages);

  return pages;
}

const WorkShowcaseSection = ({
  projects,
  title = "Showcasing Our Work",
  searchPlaceholder = "Search",
  selectedIndustryLabel = "Industry",
  allIndustriesLabel = "All industries",
  selectedTagLabel = "Tag",
  allTagsLabel = "All tags",
  resultsLabel = "results for:",
  clearAllLabel = "Clear All",
  emptyMessage = "No portfolio projects matched the current search and filters.",
}: WorkShowcaseSectionProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const deferredQuery = useDeferredValue(query);
  const itemsPerPage = 8;

  const industries = Array.from(new Set(projects.map((project) => project.industry))).sort((left, right) => left.localeCompare(right));
  const tags = Array.from(new Set(projects.flatMap((project) => project.tags))).sort((left, right) => left.localeCompare(right));

  const filteredProjects = projects.filter((project) => {
    const matchesQuery =
      deferredQuery.trim().length === 0 ||
      `${project.title} ${project.summary} ${project.industry} ${project.tags.join(" ")}`
        .toLowerCase()
        .includes(deferredQuery.trim().toLowerCase());

    const matchesIndustry = selectedIndustry === "all" || project.industry === selectedIndustry;
    const matchesTag = selectedTag === "all" || project.tags.includes(selectedTag);

    return matchesQuery && matchesIndustry && matchesTag;
  });

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / itemsPerPage));
  const resolvedPage = Math.min(currentPage, totalPages);
  const startIndex = (resolvedPage - 1) * itemsPerPage;
  const currentItems = filteredProjects.slice(startIndex, startIndex + itemsPerPage);
  const activeFilters = [selectedIndustry !== "all" ? selectedIndustry : null, selectedTag !== "all" ? selectedTag : null].filter(
    Boolean
  ) as string[];

  return (
    <section className="relative w-full py-12.5">
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle, var(--canvas) 55%, var(--glow) 100%)" }} />

      <div className="relative mx-auto h-full w-full max-w-[1350px]">
        <div className="flex flex-wrap items-center justify-between px-4 xl:px-0">
          <h2 className="heading-gradient text-xl md:text-2xl font-bold leading-snug text-start">{title}</h2>

          <div className="mt-4 flex flex-wrap gap-2.5 xl:mt-0">
            <label className="relative h-[50px] w-[230px] rounded-[10px] border border-[color-mix(in_srgb,var(--tech)_45%,transparent)] bg-[color-mix(in_srgb,var(--tech)_5%,transparent)] backdrop-blur-[15px] sm:w-[320px] md:h-[62px]">
              <div className="pointer-events-none absolute inset-y-0 left-5 flex items-center gap-[15px]">
                <Image src="/icons/search.svg" width={18} height={18} alt="Search" className="h-[14px] w-[14px] md:h-[18px] md:w-[18px]" />
              </div>
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder={searchPlaceholder}
                className="h-full w-full bg-transparent pl-14 pr-5 text-sm md:text-base font-normal text-fg outline-none placeholder:text-fg/60"
              />
            </label>

            <button
              type="button"
              onClick={() => setShowFilters((currentValue) => !currentValue)}
              className="relative flex h-[50px] w-[62px] items-center justify-center rounded-[10px] border border-[color-mix(in_srgb,var(--tech)_45%,transparent)] bg-[color-mix(in_srgb,var(--tech)_5%,transparent)] backdrop-blur-[15px] md:h-[62px]"
            >
              <Image src="/icons/burger.svg" width={18} height={12} alt="Toggle filters" className="h-[10px] w-[16px] md:h-[12px] md:w-[18px]" />
            </button>
          </div>
        </div>

        {showFilters ? (
          <div className="mx-4 mt-4 grid gap-4 rounded-[15px] border border-[color-mix(in_srgb,var(--tech)_25%,transparent)] bg-canvas-2/80 p-4 backdrop-blur-[15px] xl:mx-0 lg:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm md:text-base font-normal leading-relaxed text-fg/80">{selectedIndustryLabel}</span>
              <select
                value={selectedIndustry}
                onChange={(event) => {
                  setSelectedIndustry(event.target.value);
                  setCurrentPage(1);
                }}
                className="h-12 rounded-[10px] border border-fg/10 bg-canvas px-4 text-sm md:text-base font-normal text-fg outline-none"
              >
                <option value="all">{allIndustriesLabel}</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-sm md:text-base font-normal leading-relaxed text-fg/80">{selectedTagLabel}</span>
              <select
                value={selectedTag}
                onChange={(event) => {
                  setSelectedTag(event.target.value);
                  setCurrentPage(1);
                }}
                className="h-12 rounded-[10px] border border-fg/10 bg-canvas px-4 text-sm md:text-base font-normal text-fg outline-none"
              >
                <option value="all">{allTagsLabel}</option>
                {tags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ) : null}

        <div className="mt-8.75 flex flex-wrap items-center gap-2.5 px-4 xl:px-0">
          <div className="text-sm md:text-base font-normal leading-relaxed text-fg">{filteredProjects.length} {resultsLabel}</div>

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
                setSelectedIndustry("all");
                setSelectedTag("all");
                setCurrentPage(1);
              }}
              className="flex items-center gap-2.5 rounded-[5px] px-3.75 py-1.25"
              style={{ background: "var(--tech)", border: "1px solid color-mix(in srgb, var(--tech) 25%, transparent)" }}
            >
              <span className="text-sm md:text-base font-medium leading-snug">{clearAllLabel}</span>
              <Image src="/icons/exite.svg" width={10} height={10} alt="Clear filters" />
            </button>
          ) : null}
        </div>

        {currentItems.length > 0 ? (
          <div className="mt-8.75 grid grid-cols-1 items-center gap-6.25 overflow-hidden px-4 xl:grid-cols-3 xl:px-0">
            {currentItems.map((project) => (
              <PortfolioCard
                key={project._id}
                slug={project.slug}
                imageUrl={project.imageData}
                title={project.title}
                description={project.summary}
                accent={project.accent}
              />
            ))}
          </div>
        ) : (
          <div className="mx-4 mt-8.75 rounded-[15px] border border-fg/10 bg-fg/[0.03] p-8 text-center text-sm md:text-base font-normal leading-relaxed text-fg/75 xl:mx-0">
            {emptyMessage}
          </div>
        )}

        {filteredProjects.length > itemsPerPage ? (
          <div className="mt-8.75 flex justify-center px-4 xl:px-0">
            <Pagination>
              <PaginationContent className="flex items-center gap-2">
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                    className="cursor-pointer rounded-[25.5px] h-[39px] w-[39px] hover:bg-[color-mix(in_srgb,var(--tech)_5%,transparent)] hover:text-white"
                    style={{
                      background: "linear-gradient(360deg, var(--glow) 0%, var(--canvas-2) 100%)",
                      border: "1px solid #FFFFFF26",
                      backdropFilter: "blur(15px)",
                      boxShadow: "0px 0px 15px 0px #FFFFFF26",
                    }}
                  />
                </PaginationItem>
                {getPageNumbers(resolvedPage, totalPages).map((page, index) => (
                  <PaginationItem key={`${page}-${index}`}>
                    {page === "..." ? (
                      <span className="text-fg">...</span>
                    ) : (
                      <PaginationLink
                        onClick={() => setCurrentPage(page as number)}
                        isActive={resolvedPage === page}
                        className={`border-none bg-none text-fg ${resolvedPage === page ? "text-tech" : ""}`}
                      >
                        {page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                    className="cursor-pointer rounded-[25.5px] h-[39px] w-[39px] hover:bg-[color-mix(in_srgb,var(--tech)_5%,transparent)] hover:text-white"
                    style={{
                      background: "linear-gradient(360deg, var(--glow) 0%, var(--canvas-2) 100%)",
                      border: "1px solid #FFFFFF26",
                      backdropFilter: "blur(15px)",
                      boxShadow: "0px 0px 15px 0px #FFFFFF26",
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        ) : null}
      </div>
    </section>
  );
};

type PortfolioCardProps = {
  slug: string;
  imageUrl: string;
  title: string;
  description: string;
  className?: string;
  accent?: string;
};

export const PortfolioCard = ({ slug, imageUrl, title, description, className = "", accent = "" }: PortfolioCardProps) => {
  const [hasError, setHasError] = useState(false);
  const showImage = imageUrl && !hasError;
  const fallbackGradient = accent || "linear-gradient(160deg, rgba(59,130,246,0.4), rgba(6,182,212,0.18))";

  return (
    <div
      className={`min-h-[442px] overflow-hidden rounded-10 md:h-full ${className}`}
      style={{
        background: "linear-gradient(249.67deg, color-mix(in srgb, var(--tech) 35%, transparent) 0%, rgba(24, 24, 24, 0) 49.04%, color-mix(in srgb, var(--tech) 35%, transparent) 100%)",
        border: "1px solid #FFFFFF40",
      }}
    >
      <Link href={`/resources/portfolio/${slug}`} className="flex h-full flex-col">
        <div className="relative h-76.25 w-full flex-shrink-0">
          {showImage ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              priority
              unoptimized={imageUrl.startsWith("data:") || imageUrl.startsWith("http")}
              className="object-cover"
              sizes="100vw"
              onError={() => setHasError(true)}
            />
          ) : (
            <div className="absolute inset-0" style={{ background: fallbackGradient }} />
          )}
        </div>

        <div className="flex flex-1 flex-col justify-center gap-2.5 p-4">
          <h5 className="text-base md:text-lg font-semibold leading-snug text-fg">{title}</h5>
          <p className="w-full max-w-[98%] text-sm md:text-base font-normal leading-relaxed text-fg/75">{description}</p>
        </div>
      </Link>
    </div>
  );
};

export default WorkShowcaseSection;
