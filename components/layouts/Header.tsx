import { getCachedProductSettings, getCachedExpertiseNavigation, getCachedOffshoreDeveloperNavigation, getCachedPublishedProducts, getCachedSiteSettings } from "@/lib/content-service";

import MainMenu from "../menu";

const Header = async () => {
  const [products, productSettings, siteSettings, expertiseNavigation, offshoreNavigation] = await Promise.all([
    getCachedPublishedProducts(),
    getCachedProductSettings(),
    getCachedSiteSettings(),
    getCachedExpertiseNavigation(),
    getCachedOffshoreDeveloperNavigation(),
  ]);

  return (
    <header
      className="w-full border-b bg-white/95 backdrop-blur-sm sticky top-0 z-40"
      style={{ boxShadow: "0px 2px 20px 0px #389EFF59" }}
    >
      <MainMenu
        products={products.map((product) => ({ label: product.navLabel, href: `/products/${product.slug}` }))}
        productMenu={{
          title: productSettings.menuTitle,
          description: productSettings.menuDescription,
          descriptionSecondary: productSettings.menuDescriptionSecondary,
          buttonLabel: productSettings.menuButtonLabel,
          buttonHref: productSettings.menuButtonHref,
          imageData: productSettings.menuImageData,
        }}
        resourcesMenu={{
          title: siteSettings.pageContent.resources.heroTitle || "Resources Library",
          description:
            siteSettings.pageContent.resources.heroDescription ||
            "Access in-depth guides, blogs, ebooks, real world case studies created by our subject matter experts, designed to empower you and your team with the right resources and stay ahead.",
          descriptionSecondary:
            siteSettings.pageContent.resources.ctaDescription ||
            "Browse the latest learning material, portfolio examples, hiring information, and team updates in one place.",
          buttonLabel: siteSettings.pageContent.resources.ctaButtonLabel || "Read More",
          buttonHref: siteSettings.pageContent.resources.ctaButtonHref || "/resources",
          imageData: "/images/resource-img.svg",
        }}
        expertiseCategories={expertiseNavigation.map((category) => ({
          key: category.key,
          label: category.label,
          description: category.description,
          menuHeading: category.menuHeading,
          items: category.items,
        }))}
        offshoreCategories={offshoreNavigation.map((category) => ({
          key: category.key,
          label: category.label,
          menuHeading: category.menuHeading,
          items: category.items,
        }))}
        logoUrl={siteSettings.logoUrl}
        logoAlt={siteSettings.logoAlt}
      />
    </header>
  );
};

export default Header;
