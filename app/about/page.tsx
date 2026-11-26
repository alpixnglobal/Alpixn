import AboutHeroSection from "@/components/sections/about/AboutHeroSection";
import BooKFreeCallSection from "@/components/sections/about/BooKFreeCallSection";
import OurMileStone from "@/components/sections/about/OurMileStone";
import OurVisionSection from "@/components/sections/about/OurVisionSection";
import WhoWeAreSection from "@/components/sections/about/WhoWeAreSection";
import WhyChooseUsAboutSection from "@/components/sections/about/WhyChooseUsAboutSection";
import { getCachedAboutSettings, getCachedSiteSettings } from "@/lib/content-service";

const About = async () => {
  const [settings, siteSettings] = await Promise.all([getCachedAboutSettings(), getCachedSiteSettings()]);

  return (
    <>
      <AboutHeroSection title={settings.heroTitle} description={settings.heroDescription} primaryAction={settings.heroPrimaryAction} secondaryAction={settings.heroSecondaryAction} />
      <WhoWeAreSection title={settings.whoWeAreTitle} paragraphOne={settings.whoWeAreParagraphOne} paragraphTwo={settings.whoWeAreParagraphTwo} imageData={settings.whoWeAreImage} />
      <OurVisionSection
        visionTag={settings.visionTag}
        visionTitle={settings.visionTitle}
        visionDescription={settings.visionDescription}
        visionStats={siteSettings.sharedStats}
        missionTag={settings.missionTag}
        missionTitle={settings.missionTitle}
        missionDescription={settings.missionDescription}
        missionCards={settings.missionCards}
      />
      <OurMileStone tag={settings.milestoneTag} title={settings.milestoneTitle} description={settings.milestoneDescription} items={settings.milestoneItems} />
      <WhyChooseUsAboutSection title={settings.whyChooseTitle} subtitle={settings.whyChooseSubtitle} cards={settings.whyChooseCards} />
      <BooKFreeCallSection title={settings.ctaTitle} description={settings.ctaDescription} buttonText={settings.ctaButtonText} buttonHref={settings.ctaButtonHref} />
    </>
  );
};

export default About;
