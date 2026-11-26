import Image from "next/image";
import Link from "next/link";

import type { BlogPostRecord } from "@/lib/content-types";

type LatestArticlesProps = {
  posts: BlogPostRecord[];
  categories: string[];
  title?: string;
  categoriesTitle?: string;
  emptyMessage?: string;
};

const LatestArticles = ({
  posts,
  categories,
  title = "Our Latest Articles",
  categoriesTitle = "Categories",
  emptyMessage = "No published articles yet.",
}: LatestArticlesProps) => {
  const latestPosts = posts.slice(0, 3);

  return (
    <section className="sectionDefault">
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle, rgba(0, 7, 14, 1) 65%, rgba(0, 35, 72, 1) 100%)" }} />

      <div className="container max-w-[1350px]">
        <div className="grid grid-cols-1 justify-between xl:grid-cols-[auto_66px_412px]">
          <div>
            <h2 className="title heading-gradient text-left sm:text-center">{title}</h2>

            <div className="flex flex-col">
              {latestPosts.map((post, index) => (
                <Link
                  key={post._id}
                  href={`/resources/blogs/${post.slug}`}
                  className={`grid grid-cols-1 gap-[15px] items-stretch lg:grid-cols-[497px_1fr] ${index < latestPosts.length - 1 ? "mt-12.5 border-b border-white/25 pb-[35px]" : "mt-[35px]"}`}
                >
                  <div className="relative h-[251px] w-full">
                    {post.imageData ? (
                      <Image src={post.imageData} alt={post.title} fill priority unoptimized={post.imageData.startsWith("data:") || post.imageData.startsWith("http")} className="rounded-[10px] object-cover" />
                    ) : (
                      <div className="absolute inset-0 rounded-[10px]" style={{ background: post.accent }} />
                    )}
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <div className="text-sm font-medium md:text-base">{post.title}</div>
                    <div className="text-xs tracking-[3%] text-white/75">By: {post.author}</div>
                    <p className="text-sm leading-relaxed text-white/70">{post.excerpt}</p>
                  </div>
                </Link>
              ))}

              {latestPosts.length === 0 ? (
                <div className="mt-12.5 rounded-[10px] border border-white/10 bg-white/[0.03] p-6 text-white/75">{emptyMessage}</div>
              ) : null}
            </div>
          </div>

          <div />

          <div>
            <h2 className="title heading-gradient text-left sm:text-center">{categoriesTitle}</h2>

            <div className="mt-12.5 grid grid-cols-2 gap-[15px] xl:flex xl:flex-col">
              {categories.map((category) => (
                <div
                  key={category}
                  className="flex items-center rounded-[10px] border border-[#389EFF73] bg-[#389EFF0D] p-5 text-xs sm:text-sm lg:text-base"
                  style={{ backdropFilter: "blur(15px)" }}
                >
                  {category}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestArticles;
