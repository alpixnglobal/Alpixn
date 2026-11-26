"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

export type BlogCardData = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt?: string;
  imageData?: string;
  tags?: string[];
};

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function BlogCard({ post, priority = false }: { post: BlogCardData; priority?: boolean }) {
  const img = post.imageData || "";
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]">
      <div className="relative aspect-[1200/630] overflow-hidden bg-brand-navy">
        {img ? (
          <Image
            src={img}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            unoptimized={img.startsWith("data:") || img.startsWith("http")}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold uppercase tracking-[0.14em] text-gold-ink">{post.category}</span>
          <span aria-hidden className="text-fg-subtle">·</span>
          <span className="text-fg-subtle">{post.readTime}</span>
        </div>
        <h3 className="font-display text-[17px] font-semibold leading-snug text-fg transition-colors group-hover:text-tech">
          <Link href={`/resources/blogs/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-fg-muted">{post.excerpt}</p>
        {post.publishedAt ? <time dateTime={post.publishedAt} className="mt-auto pt-2 text-xs text-fg-subtle">{formatDate(post.publishedAt)}</time> : null}
      </div>
    </article>
  );
}

export default function BlogExplorer({ posts, categories, initialCategory = "All" }: { posts: BlogCardData[]; categories: string[]; initialCategory?: string }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(categories.includes(initialCategory) ? initialCategory : "All");
  const [visible, setVisible] = useState(12);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (!q) return true;
      return [p.title, p.excerpt, p.category, ...(p.tags ?? [])].join(" ").toLowerCase().includes(q);
    });
  }, [posts, query, category]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: posts.length };
    posts.forEach((p) => (map[p.category] = (map[p.category] ?? 0) + 1));
    return map;
  }, [posts]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="tablist" aria-label="Filter articles by category" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-wrap lg:px-0">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={category === c}
              onClick={() => {
                setCategory(c);
                setVisible(12);
              }}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                category === c ? "border-transparent bg-[linear-gradient(135deg,#fbe7a1_0%,#e3a52a_45%,#b8740c_100%)] text-[#071a33] shadow-[var(--shadow-glow)]" : "border-line bg-surface text-fg-muted hover:border-gold/50 hover:text-fg"
              }`}
            >
              {c} <span className={category === c ? "text-[#071a33]/70" : "text-fg-subtle"}>{counts[c] ?? 0}</span>
            </button>
          ))}
        </div>
        <label className="relative block w-full lg:w-80">
          <span className="sr-only">Search articles</span>
          <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisible(12);
            }}
            placeholder="Search topics, technologies, industries…"
            className="h-11 w-full rounded-full border border-line bg-surface pl-11 pr-10 text-sm text-fg outline-none transition placeholder:text-fg-subtle focus:border-tech"
          />
          {query ? (
            <button type="button" aria-label="Clear search" onClick={() => setQuery("")} className="absolute right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-fg-subtle hover:text-fg">
              <X className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </label>
      </div>

      <p className="mt-6 text-sm text-fg-subtle" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "article" : "articles"}
        {category !== "All" ? ` in ${category}` : ""}
        {query ? ` matching “${query}”` : ""}
      </p>

      {filtered.length ? (
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            // All cards stay in the HTML for crawlers; extra ones are visually hidden until "Load more".
            <li key={post.slug} className={i < visible ? "" : "hidden"}>
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-line p-10 text-center text-fg-muted">No articles match your search. Try a different term or category.</div>
      )}

      {filtered.length > visible ? (
        <div className="mt-10 flex justify-center">
          <button type="button" onClick={() => setVisible((v) => v + 12)} className="btn-ghost-brand">
            Load more articles
          </button>
        </div>
      ) : null}
    </div>
  );
}
