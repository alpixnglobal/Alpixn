import Image from "next/image";
import Link from "next/link";

import type { BlogPostRecord } from "@/lib/content-types";

type BlogDetailsSectionProps = {
  post: BlogPostRecord;
  relatedPosts: BlogPostRecord[];
  authorSummaryTemplate?: string;
  detailsTitle?: string;
  relatedTitle?: string;
  noRelatedMessage?: string;
};

const BlogDetailsSection = ({
  post,
  relatedPosts,
  authorSummaryTemplate = "This article is part of the {category} series and is managed dynamically from the admin panel.",
  detailsTitle = "Article Details",
  relatedTitle = "Related Articles",
  noRelatedMessage = "No related articles found.",
}: BlogDetailsSectionProps) => {
  const paragraphs = post.content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <section className="relative w-full py-12.5">
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle, var(--canvas) 65%, var(--glow) 100%)" }} />

      <div className="relative mx-auto w-full max-w-[1350px] px-4 xl:px-0">
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[850px_43px_auto]">
          <div className="flex flex-col gap-[35px]">
            <div className="relative h-[300px] w-full overflow-hidden rounded-[10px] sm:h-[400px] md:h-[500px] lg:h-[572px]">
              {post.imageData ? (
                <Image
                  src={post.imageData}
                  alt={post.title}
                  fill
                  priority
                  unoptimized={post.imageData.startsWith("data:") || post.imageData.startsWith("http")}
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 850px"
                />
              ) : (
                <div className="absolute inset-0 rounded-[10px]" style={{ background: post.accent }} />
              )}
            </div>

            <div className="text-sm text-fg/75 lg:text-base">
              {post.category} - By {post.author} - {post.readTime}
            </div>

            <h1 className="font-extrabold leading-tight text-fg text-[clamp(1.55rem,2.5vw,2.2rem)]">{post.title}</h1>

            <p className="text-sm leading-relaxed text-fg sm:text-base">{post.excerpt}</p>

            {paragraphs.map((paragraph, index) => (
              <p key={`${post._id}-${index}`} className="text-sm leading-relaxed text-fg sm:text-base">
                {paragraph}
              </p>
            ))}

            <div
              className="rounded-[10px] p-[40px]"
              style={{
                background: "linear-gradient(85.85deg, var(--tech) 0%, #064A87 48.27%, var(--gold) 98.56%)",
              }}
            >
              <div className="grid grid-cols-1 gap-[22px] xl:grid-cols-[194px_auto]">
                <div className="flex h-[194px] w-[194px] items-center justify-center rounded-[14px] bg-black/5 dark:bg-black/5 dark:bg-white/10 text-4xl font-semibold text-white">
                  {post.author
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div className="flex flex-col gap-[17px]">
                  <div className="mt-1 text-base font-semibold text-fg md:text-lg">{post.author}</div>
                  <p className="text-sm leading-relaxed text-fg md:text-base">{authorSummaryTemplate.replace("{category}", post.category)}</p>
                  <div className="flex flex-wrap gap-5 text-sm font-medium text-fg xl:text-base">
                    <span>{post.category}</span>
                    <span>{post.readTime}</span>
                    <span>{post.isPublished ? "Published" : "Draft"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div />

          <aside className="space-y-6">
            <div
              className="rounded-[15px] p-5"
              style={{
                background: "linear-gradient(360deg, var(--glow) 0%, var(--canvas-2) 44.95%, var(--glow) 100%)",
                border: "1px solid #FFFFFF26",
                boxShadow: "0px 0px 15px 0px #FFFFFF40",
              }}
            >
              <h3 className="border-b border-fg/20 py-[15px] text-base font-semibold text-fg md:text-lg">{detailsTitle}</h3>

              <div className="mt-6.25 flex flex-col gap-5 text-fg/90">
                <div>
                  <span className="text-sm font-semibold md:text-base">Category:</span>
                  <div className="mt-2 text-sm md:text-base">{post.category}</div>
                </div>
                <div>
                  <span className="text-sm font-semibold md:text-base">Author:</span>
                  <div className="mt-2 text-sm md:text-base">{post.author}</div>
                </div>
                <div>
                  <span className="text-sm font-semibold md:text-base">Read time:</span>
                  <div className="mt-2 text-sm md:text-base">{post.readTime}</div>
                </div>
              </div>
            </div>

            <div
              className="rounded-[15px] p-5"
              style={{
                background: "linear-gradient(360deg, var(--glow) 0%, var(--canvas-2) 44.95%, var(--glow) 100%)",
                border: "1px solid #FFFFFF26",
                boxShadow: "0px 0px 15px 0px #FFFFFF40",
              }}
            >
              <h3 className="border-b border-fg/20 py-[15px] text-base font-semibold text-fg md:text-lg">{relatedTitle}</h3>

              <div className="mt-6 grid gap-4">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost._id} href={`/resources/blogs/${relatedPost.slug}`} className="rounded-[10px] border border-fg/10 bg-fg/[0.03] p-4 transition hover:bg-white/[0.06]">
                    <div className="text-sm font-semibold text-fg">{relatedPost.title}</div>
                    <div className="mt-2 text-xs text-fg/65">{relatedPost.category}</div>
                  </Link>
                ))}

                {relatedPosts.length === 0 ? <div className="text-sm text-fg/65">{noRelatedMessage}</div> : null}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsSection;
