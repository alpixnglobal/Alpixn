export interface ProductsDetailsData {
  slug: string;
  heroTitle: string;
  heroSubtitle?: string; 
  heroDescription: string;
}

export const productHeroData: Record<string, ProductsDetailsData> = {
  "salon-management": {
    slug: "salon-management",
    heroTitle: "Salon Management Software",
    heroSubtitle: "Transform Your Salon Operations",
    heroDescription:
      "Comprehensive salon and spa management solution that streamlines appointments, inventory, and customer relationships all in one platform.",
  },
  "multilingual-ai": {
    slug: "multilingual-ai",
    heroTitle: "Multilingual AI Platform",
    heroSubtitle: "Break Language Barriers Instantly",
    heroDescription:
      "AI-powered translation system supporting 100+ languages with real-time communication and cultural context understanding for global businesses.",
  },
  "ai-website-builder": {
    slug: "ai-website-builder",
    heroTitle: "AI Website & App Builder",
    heroSubtitle: "Create Professional Sites in Minutes",
    heroDescription:
      "Build responsive websites and mobile applications instantly with AI-powered design, content generation, and SEO optimization.",
  },
  "ai-hr-payroll": {
    slug: "ai-hr-payroll",
    heroTitle: "AI HR & Payroll System",
    heroSubtitle: "Automate Your HR Operations",
    heroDescription:
      "Intelligent HR and payroll management with automated processing, compliance tracking, and data-driven insights.",
  },
  "ai-taxation-management": {
    slug: "ai-taxation-management",
    heroTitle: "AI Taxation Management",
    heroSubtitle: "Simplify Tax Compliance",
    heroDescription:
      "Automated tax calculation, filing, and compliance monitoring with real-time updates on changing tax laws.",
  },
  "ai-design-studio": {
    slug: "ai-design-studio",
    heroTitle: "AI Design Studio",
    heroSubtitle: "Create Designs with AI Assistance",
    heroDescription:
      "AI-powered design creation platform for logos, marketing materials, and brand assets with professional results.",
  },
  "ai-project-management": {
    slug: "ai-project-management",
    heroTitle: "AI Project Management",
    heroSubtitle: "Intelligent Project Planning",
    heroDescription:
      "AI-driven project management with automated task allocation, risk prediction, and progress tracking.",
  },
};

export function getProductsDetailsData(slug: string): ProductsDetailsData | null {
  return productHeroData[slug] || null;
}

export function getAllProductDetailsSlugs(): string[] {
  return Object.keys(productHeroData);
}
