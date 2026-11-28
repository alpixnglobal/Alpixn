import { ProductPageSections } from "@/components/sections/product/ProductPageSections";
import { getCachedProductSettings } from "@/lib/content-service";
import { pageMetadata } from "@/lib/seo";
import { withSeo } from "@/lib/seo-store";

export async function generateMetadata() {
  return withSeo("/products", pageMetadata({
    title: "Products",
    description: "ALPIXN products: AI-powered software for marketing, calling, operations and more — built and maintained by our engineering team.",
    path: "/products",
  }));
}

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
