import CaseStudySection from "@/components/sections/CaseStudySection";
import CustomSolutionSection from "@/components/sections/CustomSolutionSection";
import InsigntSection from "@/components/sections/InsigntSection";
import HomeIndustriesSection from "@/components/sections/HomeIndustriesSection";
import OfferSection from "@/components/sections/OfferSection";
import TechStackSection from "@/components/sections/TechStackSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import Hero from "@/components/sections/Hero";
import { getCachedHomeSettings } from "@/lib/content-service";

const Home = async () => {
  const settings = await getCachedHomeSettings();

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
      <CaseStudySection title={settings.caseStudyTitle} subtitle={settings.caseStudySubtitle} cases={settings.caseStudies} />
      <HomeIndustriesSection title={settings.industriesTitle} subtitle={settings.industriesSubtitle} tabs={settings.industriesTabs} />
      <TechStackSection title={settings.techStackTitle} description={settings.techStackDescription} tabs={settings.techStackTabs} />
      <WhyChooseUsSection quote={settings.whyChooseQuote} author={settings.whyChooseAuthor} role={settings.whyChooseRole} managerImage={settings.whyChooseManagerImage} />
      <InsigntSection
        title={settings.insightSection.title}
        subtitle={settings.insightSection.subtitle}
        buttonText={settings.insightSection.buttonText}
        buttonHref={settings.insightSection.buttonHref}
        posts={settings.insightCards}
      />
    </main>
  );
}

export default Home
