import CustomSolutionSection from "@/components/sections/CustomSolutionSection";
import FeaturedWorkSection from "@/components/sections/FeaturedWorkSection";
import HowWeWorkSection from "@/components/sections/HowWeWorkSection";
import InsigntSection from "@/components/sections/InsigntSection";
import HomeIndustriesSection from "@/components/sections/HomeIndustriesSection";
import OfferSection from "@/components/sections/OfferSection";
import TechStackSection from "@/components/sections/TechStackSection";
import Hero from "@/components/sections/Hero";
import JsonLd from "@/components/seo/JsonLd";
import CtaBand from "@/components/sections/shared/CtaBand";
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

  // Featured portfolio first, then the rest (only real/concept projects are ever returned).
  const featured = [...projects].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))).map(toPortfolioCard);

  // Insights always reflect the latest published articles, so links never point at unpublished posts.
  const latestPosts = posts.slice(0, 3).map((post) => ({
    title: post.title,
    author: post.author,
    imageData: post.imageData,
    href: `/resources/blogs/${post.slug}`,
  }));

  return (
    <main>
      <Hero
        title={settings.heroTitle}
        description={settings.heroDescription}
        primaryAction={settings.heroPrimaryAction}
        secondaryAction={settings.heroSecondaryAction}
        heroImageData={settings.heroImageData}
      />
      <CustomSolutionSection title={settings.customSolutionsTitle} subtitle={settings.customSolutionsSubtitle} cards={settings.customSolutionCards} />
      <OfferSection title={settings.offeringsTitle} subtitle={settings.offeringsSubtitle} items={settings.offerings} />
      <FeaturedWorkSection projects={featured} />
      <HomeIndustriesSection title={settings.industriesTitle} subtitle={settings.industriesSubtitle} tabs={settings.industriesTabs} />
      <TechStackSection title={settings.techStackTitle} description={settings.techStackDescription} tabs={settings.techStackTabs} />
      <HowWeWorkSection />
      <InsigntSection
        title="Latest insights"
        subtitle="Practical guides on AI, robotics, software engineering and industry technology from the ALPIXN Editorial Team."
        buttonText={settings.insightSection.buttonText || "Read all articles"}
        buttonHref="/resources/blogs"
        posts={latestPosts.length ? latestPosts : settings.insightCards}
      />
      <CtaBand
        title="Let's talk about what you want to build"
        description="Share your goals, current systems and timeline. We will come back with honest recommendations, a proposed first release and an estimate."
        primary={{ label: "Request a consultation", href: "/contact-us" }}
        secondary={{ label: "See concept projects", href: "/resources/portfolio" }}
      />
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
    </main>
  );
};

export default Home;
