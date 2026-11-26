import Image from "next/image";
import Link from "next/link";

import type { HomeInsightCardRecord } from "@/lib/content-types";
import { Button } from "../ui/buttonBtn";

const defaultPosts: HomeInsightCardRecord[] = [
  {
    title: "Prompt-to-Flowchart: Generating Flowcharts from Natural Language using GenAI",
    author: "Jellyfish Technologies",
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
    author: "Jellyfish Technologies",
    imageData: "/images/cache-augmented.png",
    href: "/resources/blogs/cache-augmented-generation-cag-a-revolutionary-alternative-to-rag",
  },
];

const cardFrames = [
  { accent: "#A6D1FF", rotateClass: "rotate-[9deg]", roundedClass: "rounded-[5px]", imageClass: "object-contain" },
  { accent: "#A6F2FF", rotateClass: "-rotate-[9deg]", roundedClass: "rounded-[6px]", imageClass: "object-contain" },
  { accent: "#A6BBFF", rotateClass: "rotate-[9deg]", roundedClass: "rounded-[6px]", imageClass: "object-cover" },
] as const;

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
    <section className="sectionDefault overflow-x-hidden">
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle, var(--canvas) 45%, var(--glow) 100%)" }} />

      <div className="container max-w-[1350px]">
        <div className="flex flex-col gap-2.5">
          <h2 className="heading-gradient text-2xl md:text-3xl font-bold leading-snug text-left sm:text-center">{title}</h2>
          <p className="text-base md:text-lg font-normal leading-relaxed text-fg/80 text-left sm:text-center">{subtitle}</p>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-12 px-4 py-[30px] lg:flex-row lg:flex-wrap lg:justify-around lg:gap-5 xl:px-0">
          {resolvedPosts.map((post, index) => {
            const frame = cardFrames[index] ?? cardFrames[cardFrames.length - 1];
            const imageSrc = post.imageData || defaultPosts[index]?.imageData || "/images/prompt-to-flowchart.png";
            const shouldUnoptimize = imageSrc.startsWith("data:") || imageSrc.startsWith("http");

            return (
              <Link key={`${post.title}-${index}`} href={post.href || buttonHref} className="flex w-full flex-col gap-10 lg:w-auto">
                <div className="relative h-[212px] w-full overflow-visible lg:w-[408px]">
                  <div className={`absolute inset-0 ${frame.roundedClass} ${frame.rotateClass} z-0`} style={{ background: frame.accent }} />

                  <div className="relative z-10 h-full w-full overflow-hidden rounded-[5px]">
                    <Image
                      src={imageSrc}
                      alt={post.title}
                      fill
                      className={frame.imageClass}
                      priority
                      sizes="(max-width: 768px) 100vw, 408px"
                      unoptimized={shouldUnoptimize}
                    />
                  </div>
                </div>

                <div
                  className="relative flex w-full flex-col gap-2.5 overflow-hidden rounded-[5px] p-5 backdrop-blur-[4px] lg:w-[408px]"
                  style={{ background: "linear-gradient(277.65deg, var(--tech) -25%, transparent 51.07%, var(--tech) 125.99%)" }}
                >
                  <span
                    className="absolute inset-0 rounded-[5px] pointer-events-none"
                    style={{
                      padding: "1px",
                      background: "linear-gradient(90deg, var(--tech) 0%, #FFFFFF 100%)",
                      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "exclude",
                    }}
                  />

                  <div className="relative z-10">
                    <div className="text-sm md:text-base font-semibold leading-snug text-fg">{post.title}</div>
                    <p className="text-xs md:text-sm font-normal leading-relaxed text-[#C8C8C8]">By {post.author}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="flex justify-center py-7.5">
          <Link href={buttonHref}>
            <Button className="w-full cursor-pointer rounded-[3px] text-sm md:text-base font-medium leading-snug lg:px-6.25 lg:py-2.5 md:w-fit">
              {buttonText}
              <Image src="/icons/arrow-right.svg" width={14} height={14} alt="Arrow" className="ml-2.5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InsightSection;
