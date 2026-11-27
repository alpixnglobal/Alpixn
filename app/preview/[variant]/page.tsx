import { notFound } from "next/navigation";
import HeroInteractive from "@/components/home/HeroInteractive";
import HeroVideo from "@/components/home/HeroVideo";
import { CtaV4, InsightsV4, MarketsV4, ProcessV4, ServicesV4 } from "@/components/home/HomeV4";
import IndustriesTechBand from "@/components/sections/shared/IndustriesTechBand";
import { getCachedHomeSettings, getCachedPublishedBlogPosts } from "@/lib/content-service";

/** Homepage hero concepts for review. Not indexed; remove once a concept is chosen. */
export const metadata = { title: "Homepage hero preview | ALPIXN", robots: { index: false, follow: false } };

const TITLE = "Engineering AI, Robotics & Software for the Real World";
const DESCRIPTION = "From machine-learning models and robot control software to cloud platforms and mobile apps — ALPIXN designs, builds and runs the technology behind smarter operations.";

export function generateStaticParams() {
  return [{ variant: "hero-video" }, { variant: "hero-3d" }];
}

export default async function HeroPreview({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  if (variant !== "hero-video" && variant !== "hero-3d") notFound();
  const [settings, posts] = await Promise.all([getCachedHomeSettings(), getCachedPublishedBlogPosts()]);
  const latest = posts.slice(0, 3).map((p) => ({ slug: p.slug, title: p.title, excerpt: p.excerpt, category: p.category, readTime: p.readTime, publishedAt: p.publishedAt, imageData: p.imageData }));
  return (
    <main>
      {variant === "hero-video" ? <HeroVideo title={TITLE} description={DESCRIPTION} /> : <HeroInteractive title={TITLE} description={DESCRIPTION} />}
      <ServicesV4 title={settings.offeringsTitle} subtitle={settings.offeringsSubtitle} items={settings.offerings} />
      <IndustriesTechBand />
      <ProcessV4 />
      <MarketsV4 />
      <InsightsV4 posts={latest} />
      <CtaV4 />
    </main>
  );
}
