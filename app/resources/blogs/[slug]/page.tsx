import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, CalendarDays, Clock, Info, Linkedin, Mail, PenLine } from "lucide-react";

import { BlogCard } from "@/components/blog/BlogExplorer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import CtaBand from "@/components/sections/shared/CtaBand";
import { AI_DISCLOSURE } from "@/lib/blog/types";
import { renderMarkdown } from "@/lib/blog/markdown";
import { getPublishedBlogPostBySlug, getPublishedBlogPosts } from "@/lib/content-service";
import { absoluteUrl, articleJsonLd, pageMetadata, toDescription } from "@/lib/seo";
import { blogArticles } from "@/content/blog";

interface BlogDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export function generateStaticParams() {
  return blogArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: BlogDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);
  if (!post) return { title: "Article not found", robots: { index: false } };

  return pageMetadata({
    title: post.metaTitle || post.title,
    absoluteTitle: Boolean(post.metaTitle),
    description: post.metaDescription || toDescription(post.excerpt),
    path: `/resources/blogs/${post.slug}`,
    image: post.imageData && !post.imageData.startsWith("data:") ? post.imageData : "/opengraph-image.jpg",
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.modifiedAt,
    tags: post.tags,
  });
}

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

const BlogDetailsPage = async ({ params }: BlogDetailsPageProps) => {
  const { slug } = await params;
  const [post, posts] = await Promise.all([getPublishedBlogPostBySlug(slug), getPublishedBlogPosts()]);
  if (!post) notFound();

  const { nodes, toc } = renderMarkdown(post.content);
  const path = `/resources/blogs/${post.slug}`;
  const url = absoluteUrl(path);

  // Related: same category first, then shared tags, then most recent.
  const tagSet = new Set(post.tags ?? []);
  const related = posts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, score: (p.category === post.category ? 3 : 0) + (p.tags ?? []).filter((t) => tagSet.has(t)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ p }) => p);

  const showUpdated = post.modifiedAt && post.modifiedAt !== post.publishedAt;

  return (
    <main>
      <article>
        <header className="relative overflow-hidden bg-canvas pb-10 pt-10 sm:pt-14">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-ambient" />
          <div className="relative mx-auto max-w-[1100px] px-4 sm:px-6">
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: "Insights", path: "/resources/blogs" },
                { name: post.category, path: `/resources/blogs?category=${encodeURIComponent(post.category)}` },
                { name: post.title, path },
              ]}
            />
            <Link href={`/resources/blogs?category=${encodeURIComponent(post.category)}`} className="eyebrow mt-8 hover:opacity-80">
              {post.category}
            </Link>
            <h1 className="heading-gradient mt-4 max-w-4xl text-3xl font-semibold !leading-[1.12] sm:text-4xl lg:text-[2.85rem]">{post.title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-fg-muted sm:text-lg">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-fg-subtle">
              <span className="inline-flex items-center gap-2">
                <PenLine aria-hidden className="h-4 w-4 text-gold" /> {post.author}
              </span>
              {post.publishedAt ? (
                <span className="inline-flex items-center gap-2">
                  <CalendarDays aria-hidden className="h-4 w-4 text-gold" /> <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                </span>
              ) : null}
              {showUpdated ? (
                <span>
                  Updated <time dateTime={post.modifiedAt}>{formatDate(post.modifiedAt)}</time>
                </span>
              ) : null}
              <span className="inline-flex items-center gap-2">
                <Clock aria-hidden className="h-4 w-4 text-gold" /> {post.readTime}
              </span>
            </div>
          </div>
        </header>

        {post.imageData ? (
          <div className="bg-canvas">
            <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
              <div className="relative aspect-[1200/630] overflow-hidden rounded-[24px] border border-line bg-brand-navy shadow-[var(--shadow-card)]">
                <Image
                  src={post.imageData}
                  alt={`Illustration for “${post.title}”`}
                  fill
                  priority
                  sizes="(max-width: 1100px) 100vw, 1100px"
                  unoptimized={post.imageData.startsWith("data:") || post.imageData.startsWith("http")}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        ) : null}

        <div className="bg-canvas pb-16 pt-12">
          <div className="mx-auto grid max-w-[1100px] gap-10 px-4 sm:px-6 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-14">
            {/* Table of contents */}
            <aside className="hidden lg:block">
              {toc.length ? (
                <nav aria-label="On this page" className="sticky top-[110px]">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-ink">On this page</p>
                  <ol className="mt-4 space-y-2 border-l border-line">
                    {toc
                      .filter((t) => t.level === 2)
                      .map((t) => (
                        <li key={t.id}>
                          <a href={`#${t.id}`} className="-ml-px block border-l border-transparent pl-4 text-[13px] leading-snug text-fg-muted transition-colors hover:border-gold hover:text-fg">
                            {t.text}
                          </a>
                        </li>
                      ))}
                  </ol>
                  <div className="mt-8 rounded-2xl border border-line bg-surface p-4">
                    <p className="text-sm font-semibold text-fg">Need help with this?</p>
                    <p className="mt-1 text-xs leading-relaxed text-fg-muted">Talk to ALPIXN about your project.</p>
                    <Link href="/contact-us" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-tech hover:text-gold">
                      Contact us <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </nav>
              ) : null}
            </aside>

            <div className="min-w-0">
              <div className="blog-prose">{nodes}</div>

              {post.sources?.length ? (
                <section aria-labelledby="references" className="mt-12 rounded-2xl border border-line bg-surface p-6">
                  <h2 id="references" className="font-display text-lg font-semibold text-fg">
                    References
                  </h2>
                  <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-fg-muted">
                    {post.sources.map((s) => (
                      <li key={s.url}>
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-tech underline-offset-4 hover:underline">
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </section>
              ) : null}

              {post.aiAssisted ? (
                <p className="mt-6 flex gap-3 rounded-2xl border border-line bg-surface-2 p-4 text-xs leading-relaxed text-fg-muted">
                  <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span>{AI_DISCLOSURE}</span>
                </p>
              ) : null}

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                {post.tags?.length ? (
                  <ul className="flex flex-wrap gap-2" aria-label="Tags">
                    {post.tags.map((t) => (
                      <li key={t} className="rounded-full border border-line px-3 py-1 text-xs text-fg-muted">
                        {t}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span />
                )}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-fg-subtle">Share</span>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on LinkedIn"
                    className="grid h-9 w-9 place-items-center rounded-full border border-line text-fg-muted hover:border-gold hover:text-gold"
                  >
                    <Linkedin aria-hidden className="h-4 w-4" />
                  </a>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(url)}`}
                    aria-label="Share by email"
                    className="grid h-9 w-9 place-items-center rounded-full border border-line text-fg-muted hover:border-gold hover:text-gold"
                  >
                    <Mail aria-hidden className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {related.length ? (
        <section aria-labelledby="related-articles" className="bg-canvas-2 py-16">
          <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
            <h2 id="related-articles" className="font-display text-2xl font-semibold text-fg">
              Related articles
            </h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <BlogCard post={{ slug: r.slug, title: r.title, excerpt: r.excerpt, category: r.category, readTime: r.readTime, publishedAt: r.publishedAt, imageData: r.imageData }} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaBand
        title="Planning something similar?"
        description="Share your goals and constraints. ALPIXN will help you scope the work, choose a sensible approach and estimate a first release."
        primary={{ label: "Request a project consultation", href: "/contact-us" }}
        secondary={{ label: "See concept projects", href: "/resources/portfolio" }}
      />

      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.metaDescription || toDescription(post.excerpt),
          path,
          image: post.imageData && !post.imageData.startsWith("data:") ? post.imageData : undefined,
          publishedAt: post.publishedAt,
          modifiedAt: post.modifiedAt,
          author: post.author,
          tags: post.tags,
        })}
      />
    </main>
  );
};

export default BlogDetailsPage;
