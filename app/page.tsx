import JsonLd from "@/components/seo/JsonLd";
import AssistantSection from "@/components/assistant/AssistantSection";
import { getCachedPricingData } from "@/lib/pricing/store";
import HeroGlobe, { type HeroGlobeContent } from "@/components/home/HeroGlobe";
import { CtaV4, InsightsV4, MarketsV4, ProcessV4, ServicesV4, type CtaContent, type MarketsContent, type ProcessContent } from "@/components/home/HomeV4";
import IndustriesTechBand from "@/components/sections/shared/IndustriesTechBand";
import { getCachedHomeSettings, getCachedPageBlock, getCachedPublishedBlogPosts } from "@/lib/content-service";
import { organizationJsonLd, pageMetadata, websiteJsonLd } from "@/lib/seo";
import { getCachedSeoSettings, withSeo } from "@/lib/seo-store";

const baseMetadata = pageMetadata({
  title: "ALPIXN – AI, Robotics & Software Engineering Company",
  absoluteTitle: true,
  description:
    "ALPIXN builds custom software, AI solutions, robotics software and intelligent automation — web and mobile apps, SaaS platforms, dashboards and integrations for growing businesses.",
  path: "/",
  image: "/opengraph-image.jpg",
});

export async function generateMetadata() {
  return withSeo("/", baseMetadata);
}

const Home = async () => {
  const [settings, posts, hero, process, markets, cta, pricing] = await Promise.all([
    getCachedHomeSettings(),
    getCachedPublishedBlogPosts(),
    getCachedPageBlock("home.hero"),
    getCachedPageBlock("home.process"),
    getCachedPageBlock("home.markets"),
    getCachedPageBlock("home.cta"),
    getCachedPricingData(),
  ]);

  const latest = posts.slice(0, 3).map((p) => ({ slug: p.slug, title: p.title, excerpt: p.excerpt, category: p.category, readTime: p.readTime, publishedAt: p.publishedAt, imageData: p.imageData }));

  return (
    <main>
      <HeroGlobe content={hero as unknown as HeroGlobeContent} />
      <ServicesV4 title={settings.offeringsTitle} subtitle={settings.offeringsSubtitle} items={settings.offerings} />
      {/* Industries + Tech Stack keep their original dark navy look in both themes */}
      <IndustriesTechBand />
      <ProcessV4 content={process as unknown as ProcessContent} />
      {pricing.assistant.enabled && pricing.assistant.showOnHome ? <AssistantSection catalog={pricing.catalog} /> : null}
      <MarketsV4 content={markets as unknown as MarketsContent} />
      <InsightsV4 posts={latest} />
      <CtaV4 content={cta as unknown as CtaContent} />
      <JsonLd data={[organizationJsonLd((await getCachedSeoSettings()).organizationSameAs), websiteJsonLd()]} />
    </main>
  );
};

export default Home;
