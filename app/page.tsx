import JsonLd from "@/components/seo/JsonLd";
import { BigCta, CapabilityMarquee, HeroV3, InsightsRow, ProcessSteps, SelectedWork, ServicesBento } from "@/components/home/HomeV3";
import HomeIndustriesSection from "@/components/sections/HomeIndustriesSection";
import TechStackSection from "@/components/sections/TechStackSection";
import { getCachedHomeSettings, getCachedPublishedBlogPosts, getCachedPublishedPortfolioProjects } from "@/lib/content-service";
import { toPortfolioCard } from "@/lib/portfolio/cards";
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
  const [settings, posts, projects] = await Promise.all([getCachedHomeSettings(), getCachedPublishedBlogPosts(), getCachedPublishedPortfolioProjects()]);

  const featured = [...projects].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))).map(toPortfolioCard);
  const latest = posts.slice(0, 3).map((p) => ({ slug: p.slug, title: p.title, excerpt: p.excerpt, category: p.category, readTime: p.readTime, publishedAt: p.publishedAt, imageData: p.imageData }));

  return (
    <main>
      <HeroV3
        title={settings.heroTitle}
        description={settings.heroDescription}
        primary={settings.heroPrimaryAction}
        secondary={settings.heroSecondaryAction}
        fallbackImage={settings.heroImageData}
      />
      <CapabilityMarquee />
      <ServicesBento title={settings.offeringsTitle} subtitle={settings.offeringsSubtitle} items={settings.offerings} />
      <SelectedWork projects={featured} />
      <HomeIndustriesSection title={settings.industriesTitle} subtitle={settings.industriesSubtitle} tabs={settings.industriesTabs} />
      <ProcessSteps />
      <TechStackSection title={settings.techStackTitle} description={settings.techStackDescription} tabs={settings.techStackTabs} />
      <InsightsRow posts={latest} />
      <BigCta />
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
    </main>
  );
};

export default Home;
