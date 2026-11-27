"use client";
import Accent from "@/components/ui/Accent";

import Image from "next/image";
import Link from "next/link";
import { useDeferredValue, useState } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { BlogPostRecord } from "@/lib/content-types";

type ExploreArticlesSectionProps = {
  posts: BlogPostRecord[];
  categories: string[];
  title?: string;
  searchPlaceholder?: string;
  allCategoriesLabel?: string;
  articlesFoundSuffix?: string;
  emptyMessage?: string;
};

const spanPattern = ["lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"];

const ExploreArticlesSection = ({
  posts,
  categories,
  title = "Explore Our Articles",
  searchPlaceholder = "Search articles",
  allCategoriesLabel = "All categories",
  articlesFoundSuffix = "articles found",
  emptyMessage = "No articles matched the current search and category.",
}: ExploreArticlesSectionProps) => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const deferredQuery = useDeferredValue(query);
  const itemsPerPage = 8;

  const filteredPosts = posts.filter((post) => {
    const matchesQuery =
      deferredQuery.trim().length === 0 ||
      `${post.title} ${post.excerpt} ${post.author} ${post.category}`
        .toLowerCase()
        .includes(deferredQuery.trim().toLowerCase());

    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;

    return matchesQuery && matchesCategory;
  });

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / itemsPerPage));
  const resolvedPage = Math.min(currentPage, totalPages);
  const pageItems = filteredPosts.slice((resolvedPage - 1) * itemsPerPage, resolvedPage * itemsPerPage);

  return (
    <section className="sectionDefault">
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle, var(--canvas) 45%, var(--glow) 100%)" }} />

      <div className="container max-w-[1351px]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-left sm:text-center font-display text-[clamp(1.35rem,1.9vw,1.75rem)] font-bold leading-[1.15] tracking-[-0.025em] text-fg"><Accent text={title} /></h2>

          <div className="flex flex-wrap gap-3">
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setCurrentPage(1);
              }}
              placeholder={searchPlaceholder}
              className="h-12 w-full rounded-[10px] border border-[color-mix(in_srgb,var(--tech)_45%,transparent)] bg-[color-mix(in_srgb,var(--tech)_5%,transparent)] px-4 text-sm text-fg outline-none placeholder:text-fg/60 sm:w-[260px]"
            />
            <Select
              value={selectedCategory}
              onValueChange={(value) => {
                setSelectedCategory(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-12 rounded-[10px] border border-[color-mix(in_srgb,var(--tech)_45%,transparent)] bg-[color-mix(in_srgb,var(--tech)_5%,transparent)] px-4 text-sm text-fg outline-none sm:min-w-[180px]">
                <SelectValue placeholder={allCategoriesLabel} />
              </SelectTrigger>
              <SelectContent className="border border-[color-mix(in_srgb,var(--tech)_45%,transparent)] bg-canvas-2 text-fg shadow-[0_0_24px_color-mix(in_srgb,var(--tech)_12%,transparent)]">
                <SelectItem value="all" className="text-fg focus:bg-[#0051A8] focus:text-fg">
                  {allCategoriesLabel}
                </SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="text-fg focus:bg-[#0051A8] focus:text-fg">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 text-sm text-fg/75">{filteredPosts.length} {articlesFoundSuffix}</div>

        {pageItems.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 items-center gap-4 sm:grid-cols-2 sm:gap-[25px] lg:grid-cols-6 sm:mt-12.5">
            {pageItems.map((post, index) => (
              <div
                key={post._id}
                className={`col-span-1 h-[250px] rounded-[10px] sm:h-[270px] ${spanPattern[index % spanPattern.length]}`}
                style={{
                  background:
                    "linear-gradient(249.67deg, color-mix(in srgb, var(--tech) 35%, transparent) 0%, rgba(24, 24, 24, 0) 49.04%, color-mix(in srgb, var(--tech) 35%, transparent) 100%)",
                  border: "1px solid #FFFFFF40",
                }}
              >
                <Link href={`/resources/blogs/${post.slug}`}>
                  <div className="relative h-[140px] w-full cursor-pointer sm:h-[162px]">
                    {post.imageData ? (
                      <Image
                        src={post.imageData}
                        alt={post.title}
                        fill
                        priority
                        unoptimized={post.imageData.startsWith("data:") || post.imageData.startsWith("http")}
                        className="rounded-t-[10px] object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 rounded-t-[10px]" style={{ background: post.accent }} />
                    )}
                  </div>

                  <div className="mt-2 flex flex-col gap-2 p-3 sm:mt-2.5 sm:gap-2.5 sm:p-2.5">
                    <div className="line-clamp-2 text-sm font-medium text-fg sm:text-base">{post.title}</div>
                    <div className="text-xs tracking-[3%] text-fg/75 sm:text-sm">By: {post.author}</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-[10px] border border-fg/10 bg-fg/[0.03] p-6 text-fg/75 sm:mt-12.5">
            {emptyMessage}
          </div>
        )}

        {filteredPosts.length > itemsPerPage ? (
          <div className="mx-auto mt-12.5 flex w-full max-w-[260px] items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              className="flex h-[39px] w-[39px] items-center justify-center rounded-[25.5px]"
              style={{
                background: "linear-gradient(360deg, var(--glow) 0%, var(--canvas-2) 100%)",
                border: "1px solid #FFFFFF26",
                backdropFilter: "blur(15px)",
                boxShadow: "0px 0px 15px 0px #FFFFFF26",
              }}
            >
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.75 0.75L0.75 6.75L6.75 12.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="text-sm text-fg">
              {resolvedPage} / {totalPages}
            </div>

            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              className="flex h-[39px] w-[39px] items-center justify-center rounded-[25.5px]"
              style={{
                background: "linear-gradient(360deg, var(--glow) 0%, var(--canvas-2) 100%)",
                border: "1px solid #FFFFFF26",
                backdropFilter: "blur(15px)",
                boxShadow: "0px 0px 15px 0px #FFFFFF26",
              }}
            >
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.75 12.75L6.75 6.75L0.75 0.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default ExploreArticlesSection;
