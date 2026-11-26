import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlogExplorer, { type BlogCardData } from "@/components/blog/BlogExplorer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import CtaBand from "@/components/sections/shared/CtaBand";
import JsonLd from "@/components/seo/JsonLd";
import { BLOG_CATEGORIES } from "@/lib/blog/types";
import { getCachedBlogCategories, getCachedPublishedBlogPosts, getCachedPublishedFeaturedBlogPost } from "@/lib/content-service";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Insights on AI, Robotics & Software Engineering",
  description:
    "Practical articles from ALPIXN on AI development, robotics software, custom software, technology stacks and industry solutions — written for decision-makers and engineers.",
  path: "/resources/blogs",
  image: "/opengraph-image.jpg",
});

type BlogsPageProps = { searchParams: Promise<{ category?: string }> };

const BlogsPage = async ({ searchParams }: BlogsPageProps) => {
  const [posts, categoriesFromData, featuredPost, params] = await Promise.all([
    getCachedPublishedBlogPosts(),
    getCachedBlogCategories(),
    getCachedPublishedFeaturedBlogPost(),
    searchParams,
  ]);

  // Known editorial categories first, then any extra categories created in the CMS.
  const categories = [
    ...BLOG_CATEGORIES.filter((c) => categoriesFromData.includes(c)),
    ...categoriesFromData.filter((c) => !(BLOG_CATEGORIES as string[]).includes(c)),
  ];

  const cards: BlogCardData[] = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    readTime: p.readTime,
    publishedAt: p.publishedAt,
    imageData: p.imageData,
    tags: p.tags,
  }));

  const featured = featuredPost ?? posts[0];

  return (
    <main>
      <section className="relative overflow-hidden bg-canvas pb-12 pt-10 sm:pt-14">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-ambient" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(60%_70%_at_30%_10%,#000,transparent)]" />
        <div className="relative mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-10 xl:px-0">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Insights", path: "/resources/blogs" }]} />
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <span className="eyebrow">ALPIXN Insights</span>
              <h1 className="heading-gradient mt-4 font-semibold !leading-[1.08] text-[clamp(1.85rem,3.3vw,2.9rem)]">Field notes on AI, robotics and software engineering</h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
                Practical explanations of how modern software, AI systems and automation are planned, built and operated — with the trade-offs, limitations and implementation details that matter in real projects.
              </p>
              <p className="mt-4 text-sm text-fg-subtle">
                {posts.length} articles · {categories.length} topics · written by the ALPIXN Editorial Team
              </p>
            </div>

            {featured ? (
              <Link href={`/resources/blogs/${featured.slug}`} className="group relative block overflow-hidden rounded-[28px] border border-line bg-surface shadow-[var(--shadow-card)] lg:col-span-7">
                <div className="relative aspect-[1200/630] bg-brand-navy">
                  {featured.imageData ? (
                    <Image src={featured.imageData} alt="" fill priority sizes="(max-width: 1024px) 100vw, 58vw" unoptimized={featured.imageData.startsWith("data:") || featured.imageData.startsWith("http")} className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  ) : null}
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#040d1c] via-[#040d1c]/50 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <span className="rounded-full bg-[#040d1c]/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#f6d77a] backdrop-blur">Featured · {featured.category}</span>
                    <h2 className="mt-3 max-w-2xl font-display font-semibold leading-snug text-white text-[clamp(1.5rem,2.3vw,2.05rem)]">{featured.title}</h2>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-white/80">
                      Read article <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section aria-labelledby="all-articles" className="bg-canvas-2 py-14 sm:py-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-10 xl:px-0">
          <h2 id="all-articles" className="sr-only">
            All articles
          </h2>
          <BlogExplorer posts={cards} categories={categories} initialCategory={params.category ?? "All"} />
        </div>
      </section>

      <CtaBand
        title="Have a project these articles touch on?"
        description="Tell us about the workflow, product or system you are planning. We will share an honest view of the options, risks and a sensible first step."
        primary={{ label: "Discuss your project", href: "/contact-us" }}
        secondary={{ label: "Explore our portfolio", href: "/resources/portfolio" }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "ALPIXN Insights",
          url: absoluteUrl("/resources/blogs"),
          publisher: { "@type": "Organization", name: "ALPIXN", url: absoluteUrl("/") },
        }}
      />
    </main>
  );
};

export default BlogsPage;
