import Image from "next/image";
import Link from "next/link";

import type { HomeInsightCardRecord } from "@/lib/content-types";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const defaultPosts: HomeInsightCardRecord[] = [
  {
    title: "Prompt-to-Flowchart: Generating Flowcharts from Natural Language using GenAI",
    author: "ALPIXN",
    imageData: "/images/prompt-to-flowchart.png",
    href: "/resources/blogs/prompt-to-flowchart-generating-flowcharts-from-natural-language-using-genai",
  },
  {
    title: "How Natural Language Processing Is Transforming Industries",
    author: "Vivek Sadh",
    imageData: "/images/natural-language.png",
    href: "/resources/blogs/how-natural-language-processing-is-transforming-industries",
  },
  {
    title: "Cache-Augmented Generation (CAG): A Revolutionary Alternative to RAG",
    author: "ALPIXN",
    imageData: "/images/cache-augmented.png",
    href: "/resources/blogs/cache-augmented-generation-cag-a-revolutionary-alternative-to-rag",
  },
];

type InsightSectionProps = {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  posts?: HomeInsightCardRecord[];
};

const InsightSection = ({
  title = "Our latest Insights",
  subtitle = "Over 1,100 articles on technology and talent",
  buttonText = "Read All Our Articles",
  buttonHref = "/resources/blogs",
  posts = defaultPosts,
}: InsightSectionProps) => {
  const resolvedPosts = (posts.length > 0 ? posts : defaultPosts).slice(0, 3);

  return (
    <section aria-labelledby="insights-title" className="relative w-full overflow-hidden bg-canvas-2 py-20 sm:py-24 lg:py-28">
      <div aria-hidden className="absolute inset-x-0 top-0 rule-gold" />
      <div className="relative mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-10 xl:px-0">
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="insights-title" align="left" eyebrow="Insights" title={title} subtitle={subtitle} />
          <Link href={buttonHref} className="btn-brand shrink-0 self-start md:self-auto">
            {buttonText}
            <ArrowRight aria-hidden className="btn-arrow h-4 w-4" />
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          {resolvedPosts.map((post, index) => {
            const imageSrc = post.imageData || defaultPosts[index]?.imageData || "/images/prompt-to-flowchart.png";
            const shouldUnoptimize = imageSrc.startsWith("data:") || imageSrc.startsWith("http");
            const featured = index === 0;

            return (
              <Reveal
                key={`${post.title}-${index}`}
                delay={index * 100}
                className={featured ? "lg:col-span-7 lg:row-span-2" : "lg:col-span-5"}
              >
                <Link
                  href={post.href || buttonHref}
                  className={`group relative flex h-full overflow-hidden rounded-3xl border border-line bg-surface shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)] ${featured ? "flex-col" : "flex-col sm:flex-row"}`}
                >
                  <div className={`relative shrink-0 overflow-hidden bg-brand-navy ${featured ? "aspect-[16/9] w-full lg:aspect-auto lg:flex-1" : "aspect-[16/9] w-full sm:aspect-auto sm:w-[44%]"}`}>
                    <Image
                      src={imageSrc}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                      sizes={featured ? "(max-width: 1024px) 100vw, 56vw" : "(max-width: 640px) 100vw, 20vw"}
                      unoptimized={shouldUnoptimize}
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-[#040d1c]/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#f6d77a] backdrop-blur">
                      Insight
                    </span>
                  </div>
                  <div className={`flex flex-1 flex-col justify-between gap-5 ${featured ? "p-7 sm:p-8" : "p-6"}`}>
                    <h3 className={`font-display font-semibold leading-snug text-fg transition-colors group-hover:text-tech ${featured ? "text-xl sm:text-2xl" : "text-[17px]"}`}>
                      {post.title}
                    </h3>
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm text-fg-muted">By {post.author}</p>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-fg transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-[#071a33]">
                        <ArrowUpRight aria-hidden className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InsightSection;
