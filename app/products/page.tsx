import { ProductPageSections } from "@/components/sections/product/ProductPageSections";
import { getCachedProductSettings } from "@/lib/content-service";

const ProductPage = async () => {
  const settings = await getCachedProductSettings();

  return (
    <ProductPageSections
      hero={{
        heroTitle: settings.landingHeroTitle,
        heroSubtitle: settings.landingHeroSubtitle,
        heroDescription: settings.landingHeroDescription,
        heroButtonLabel: settings.landingHeroButtonLabel,
        heroButtonHref: settings.landingHeroButtonHref,
      }}
      settings={settings}
    />
  );
};

export default ProductPage;
