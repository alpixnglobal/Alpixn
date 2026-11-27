import JsonLd from "@/components/seo/JsonLd";
import HeroGlobe from "@/components/home/HeroGlobe";
import { CtaV4, InsightsV4, MarketsV4, ProcessV4, ServicesV4 } from "@/components/home/HomeV4";
import IndustriesTechBand from "@/components/sections/shared/IndustriesTechBand";
import { getCachedHomeSettings, getCachedPublishedBlogPosts } from "@/lib/content-service";
import { organizationJsonLd, pageMetadata, websiteJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "ALPIXN – AI, Robotics & Software Engineering Company",
  absoluteTitle: true,
  description:
    "ALPIXN builds custom software, AI solutions, robotics software and intelligent automation — web and mobile apps, SaaS platforms, dashboards and integrations for growing businesses.",
  path: "/",
  image: "/opengraph-image.jpg",
});

const Home = async () => {
  const [settings, posts] = await Promise.all([getCachedHomeSettings(), getCachedPublishedBlogPosts()]);

  const latest = posts.slice(0, 3).map((p) => ({ slug: p.slug, title: p.title, excerpt: p.excerpt, category: p.category, readTime: p.readTime, publishedAt: p.publishedAt, imageData: p.imageData }));

  return (
    <main>
      <HeroGlobe />
      <ServicesV4 title={settings.offeringsTitle} subtitle={settings.offeringsSubtitle} items={settings.offerings} />
      {/* Industries + Tech Stack keep their original dark navy look in both themes */}
      <IndustriesTechBand />
      <ProcessV4 />
      <MarketsV4 />
      <InsightsV4 posts={latest} />
      <CtaV4 />
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
    </main>
  );
};

export default Home;
