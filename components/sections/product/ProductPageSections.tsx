import type { ProductPageRecord, ProductSettingsRecord } from "@/lib/content-types";

import CustomSupport from "./CustomSupport";
import CuttingEdgeFeaturesSection from "./CuttingEdgeFeaturesSection";
import DriveCustomerSection from "./DriveCustomersSection";
import FAQSection from "./FAQSection";
import ProductHeroSection from "./ProductHeroSection";
import TransfromCustomerEngagement from "./TransfromCustomerEngagement";

export function ProductPageSections({ hero, settings }: { hero: Pick<ProductPageRecord, "heroTitle" | "heroSubtitle" | "heroDescription" | "heroButtonLabel" | "heroButtonHref">; settings: ProductSettingsRecord }) {
  return (
    <>
      <ProductHeroSection
        title={hero.heroTitle}
        subtitle={hero.heroSubtitle}
        description={hero.heroDescription}
        buttonLabel={hero.heroButtonLabel}
        buttonHref={hero.heroButtonHref}
      />
      <CustomSupport
        title={settings.customSupportTitle}
        description={settings.customSupportDescription}
        imageData={settings.customSupportImageData}
      />
      <CuttingEdgeFeaturesSection
        title={settings.featuresTitle}
        description={settings.featuresDescription}
        cards={settings.featureCards}
      />
      <TransfromCustomerEngagement
        title={settings.transformTitle}
        description={settings.transformDescription}
        cards={settings.audienceCards}
      />
      <FAQSection title={settings.faqTitle} items={settings.faqs} />
      <DriveCustomerSection
        title={settings.driveTitle}
        description={settings.driveDescription}
        buttonLabel={settings.driveButtonLabel}
        buttonHref={settings.driveButtonHref}
      />
    </>
  );
}
