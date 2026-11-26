import Link from "next/link";

import type { BlogPostRecord } from "@/lib/content-types";

type BlogHeroSectionProps = {
  featuredPost: BlogPostRecord | null;
  readButtonLabel?: string;
};

const BlogHeroSection = ({ featuredPost, readButtonLabel = "Read Full Article" }: BlogHeroSectionProps) => {
  if (!featuredPost) {
    return null;
  }

  return (
    <section className="relative w-full h-[658px]">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,var(--glow)_0%,var(--canvas-2)_70%)]" />

      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/images/bloghero.svg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.8,
        }}
      ></div>

      <div className="absolute bottom-4 left-1/2 w-full max-w-[1440px] -translate-x-1/2 px-4 text-xs text-fg/80 sm:px-6 sm:text-sm md:px-8 md:text-base lg:px-[45px] lg:text-base">
        By: {featuredPost.author} | {featuredPost.readTime}
      </div>

      {/* Content */}
      <div className="relative w-full h-full max-w-[904px] mx-auto">
        <div className="flex flex-col justify-center items-start sm:items-center gap-[25px] pt-[100px] px-4 sm:px-0">
          {/* Button */}
          <button
            className="relative flex items-center gap-2.5 py-2.5 px-5 rounded-full text-fg overflow-hidden sm:self-center"
            style={{
              background: "linear-gradient(0.63deg, var(--tech) 2.69%, #064A87 97.31%)",
            }}
          >
            {/* Gradient border overlay */}
            <span
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                padding: "1px",
                background: "radial-gradient(42.58% 56.52% at 94.52% -14.13%, #FFFFFF 0%, var(--tech) 100%)",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
              }}
            />

            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-10"
            >
              <path
                d="M13 7L9.00001 5.49999L13 3.99849L14.5 0L16.0014 3.99849L20 5.49999L16.0014 7L14.5 11L13 7ZM4.99998 15L0 13L4.99998 11L7 6.00001L9.00001 11L14 13L9.00001 15L7 20L4.99998 15Z"
                fill="white"
              />
            </svg>

            <span className="relative z-10 text-xs font-medium text-fg lg:text-base">{featuredPost.category}</span>
          </button>

          <h1 className="text-gradient text-2xl sm:text-3xl md:text-[34px] lg:text-[42px] font-extrabold leading-tight text-left sm:text-center">
            {featuredPost.title}
          </h1>

          <p className="font-normal text-fg leading-relaxed text-left sm:text-center text-sm md:text-base">
            {featuredPost.excerpt}
          </p>

          <Link
            href={`/resources/blogs/${featuredPost.slug}`}
            className="relative flex cursor-pointer items-center gap-2.5 overflow-hidden rounded-[10px] px-[25px] py-2.5 sm:self-center"
            style={{
              background: "linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(20, 39, 170, 0.1) 100%)",
              backdropFilter: "blur(18.399999618530273px)",
            }}
          >
            <span
              className="absolute inset-0 rounded-[10px] pointer-events-none"
              style={{
                padding: "1.5px",
                background: "linear-gradient(166.72deg, var(--tech) -20.31%, #FFFFFF 92.69%)",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
              }}
            />

            <span className="relative z-10 text-sm font-medium text-fg xl:text-base">{readButtonLabel}</span>
            <svg className="relative z-10" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 8H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 1L15 8L8 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogHeroSection;
