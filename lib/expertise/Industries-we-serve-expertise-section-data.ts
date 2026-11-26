export interface IndustryItem {
  id: string;
  name: string;
  icon: string;
  iconAlt: string;
  link?: string;
}

export interface IndustriesWeServeData {
  slug: string;
  mainTitle: string;
  mainSubtitle: string;
  industries: IndustryItem[];
}

export const industriesWeServeData: Record<string, IndustriesWeServeData> = {
  // ============ SOFTWARE SOLUTIONS ============

  // 1. Software Development
  "software-development": {
    slug: "software-development",
    mainTitle: "Industries We Serve",
    mainSubtitle:
      "We serve a diverse client base across finance, healthcare, technology, logistics, and beyond—developing scalable web applications that address industry-specific challenges and meet enterprise-grade standards. Our focus: tailored outcomes, proven execution, and sustainable impact.",
    industries: [
      {
        id: "healthtech",
        name: "HealthTech",
        icon: "/icons/health.svg",
        iconAlt: "HealthTech",
        link: "/our-expertise/industries/healthtech",
      },
      {
        id: "edtech",
        name: "EdTech",
        icon: "/icons/edtech.svg",
        iconAlt: "EdTech",
        link: "/our-expertise/industries/edtech",
      },
      {
        id: "fintech",
        name: "FinTech",
        icon: "/icons/fintech.svg",
        iconAlt: "FinTech",
        link: "/our-expertise/industries/fintech",
      },
      {
        id: "proptech",
        name: "PropTech",
        icon: "/icons/proptech.svg",
        iconAlt: "PropTech",
        link: "/our-expertise/industries/proptech",
      },
      {
        id: "retail",
        name: "Retail",
        icon: "/icons/retail.svg",
        iconAlt: "Retail",
        link: "/our-expertise/industries/retail",
      },
      {
        id: "transport",
        name: "Transport",
        icon: "/icons/transport.svg",
        iconAlt: "Transport",
        link: "/our-expertise/industries/transport",
      },
      {
        id: "telecom",
        name: "Telecom",
        icon: "/icons/telecom.svg",
        iconAlt: "Telecom",
        link: "/our-expertise/industries/telecom",
      },
      {
        id: "automotive",
        name: "Automotive",
        icon: "/icons/automotive.svg",
        iconAlt: "Automotive",
        link: "/our-expertise/industries/automotive",
      },
      {
        id: "insurtech",
        name: "InsurTech",
        icon: "/icons/insurtech.svg",
        iconAlt: "InsurTech",
        link: "/our-expertise/industries/insuretech",
      },
      {
        id: "travel-hospitality",
        name: "Travel & Hospitality",
        icon: "/icons/travel.svg",
        iconAlt: "Travel & Hospitality",
        link: "/our-expertise/industries",
      },
      {
        id: "facility-management",
        name: "Facility Management",
        icon: "/icons/facility.svg",
        iconAlt: "Facility Management",
        link: "/our-expertise/industries/facility-management",
      },
      {
        id: "media-entertainment",
        name: "Media & Entertainment",
        icon: "/icons/media.svg",
        iconAlt: "Media & Entertainment",
        link: "/our-expertise/industries/media-entertainment",
      },
    ],
  },

  // 2. Web Applications
  "web-app-development": {
    slug: "web-app-development",
    mainTitle: "Industries we serve",
    mainSubtitle:
      "We deliver custom web application solutions across diverse industries, creating scalable, high-performance web platforms that address specific business challenges and drive digital transformation.",
    industries: [
      {
        id: "ecommerce",
        name: "E-commerce",
        icon: "/icons/retail.svg",
        iconAlt: "E-commerce",
        link: "/our-expertise/industries/retail",
      },
      {
        id: "education-web",
        name: "Education",
        icon: "/icons/edtech.svg",
        iconAlt: "Education",
        link: "/our-expertise/industries/edtech",
      },
      {
        id: "finance-web",
        name: "Finance",
        icon: "/icons/fintech.svg",
        iconAlt: "Finance",
        link: "/our-expertise/industries/fintech",
      },
      {
        id: "real-estate-web",
        name: "Real Estate",
        icon: "/icons/proptech.svg",
        iconAlt: "Real Estate",
        link: "/our-expertise/industries/proptech",
      },
      {
        id: "healthcare-web",
        name: "Healthcare",
        icon: "/icons/health.svg",
        iconAlt: "Healthcare",
        link: "/our-expertise/industries/healthtech",
      },
      {
        id: "logistics-web",
        name: "Logistics",
        icon: "/icons/transport.svg",
        iconAlt: "Logistics",
        link: "/our-expertise/industries/transport",
      },
      {
        id: "telecom-web",
        name: "Telecommunications",
        icon: "/icons/telecom.svg",
        iconAlt: "Telecommunications",
        link: "/our-expertise/industries/telecom",
      },
      {
        id: "media-web",
        name: "Media",
        icon: "/icons/media.svg",
        iconAlt: "Media",
        link: "/our-expertise/industries/media-entertainment",
      },
      {
        id: "travel-web",
        name: "Travel",
        icon: "/icons/travel.svg",
        iconAlt: "Travel",
        link: "/our-expertise/industries",
      },
      {
        id: "insurance-web",
        name: "Insurance",
        icon: "/icons/insurtech.svg",
        iconAlt: "Insurance",
        link: "/our-expertise/industries/insuretech",
      },
      {
        id: "automotive-web",
        name: "Automotive",
        icon: "/icons/automotive.svg",
        iconAlt: "Automotive",
        link: "/our-expertise/industries/automotive",
      },
      {
        id: "facility-web",
        name: "Facility Management",
        icon: "/icons/facility.svg",
        iconAlt: "Facility Management",
        link: "/our-expertise/industries/facility-management",
      },
    ],
  },

  // 3. Mobile Applications
  "mobile-app-development": {
    slug: "mobile-app-development",
    mainTitle: "Industries We Serve with Mobile Applications",
    mainSubtitle:
      "We develop innovative mobile applications for various industries, creating user-friendly solutions that enhance customer engagement, improve operational efficiency, and drive business growth across iOS and Android platforms.",
    industries: [
      {
        id: "healthcare-mobile",
        name: "Healthcare",
        icon: "/icons/health.svg",
        iconAlt: "Healthcare",
        link: "/our-expertise/industries/healthtech",
      },
      {
        id: "finance-mobile",
        name: "Finance",
        icon: "/icons/fintech.svg",
        iconAlt: "Finance",
        link: "/our-expertise/industries/fintech",
      },
      {
        id: "retail-mobile",
        name: "Retail",
        icon: "/icons/retail.svg",
        iconAlt: "Retail",
        link: "/our-expertise/industries/retail",
      },
      {
        id: "education-mobile",
        name: "Education",
        icon: "/icons/edtech.svg",
        iconAlt: "Education",
        link: "/our-expertise/industries/edtech",
      },
      {
        id: "travel-mobile",
        name: "Travel",
        icon: "/icons/travel.svg",
        iconAlt: "Travel",
        link: "/our-expertise/industries",
      },
      {
        id: "logistics-mobile",
        name: "Logistics",
        icon: "/icons/transport.svg",
        iconAlt: "Logistics",
        link: "/our-expertise/industries/transport",
      },
      {
        id: "real-estate-mobile",
        name: "Real Estate",
        icon: "/icons/proptech.svg",
        iconAlt: "Real Estate",
        link: "/our-expertise/industries/proptech",
      },
      {
        id: "fitness-mobile",
        name: "Fitness",
        icon: "/icons/health.svg",
        iconAlt: "Fitness",
        link: "/our-expertise/industries/healthtech",
      },
      {
        id: "entertainment-mobile",
        name: "Entertainment",
        icon: "/icons/media.svg",
        iconAlt: "Entertainment",
        link: "/our-expertise/industries/media-entertainment",
      },
      {
        id: "food-mobile",
        name: "Food & Beverage",
        icon: "/icons/retail.svg",
        iconAlt: "Food & Beverage",
        link: "/our-expertise/industries/retail",
      },
      {
        id: "automotive-mobile",
        name: "Automotive",
        icon: "/icons/automotive.svg",
        iconAlt: "Automotive",
        link: "/our-expertise/industries/automotive",
      },
      {
        id: "insurance-mobile",
        name: "Insurance",
        icon: "/icons/insurtech.svg",
        iconAlt: "Insurance",
        link: "/our-expertise/industries/insuretech",
      },
    ],
  },
};

// Helper functions
export function getIndustriesWeServeData(slug: string): IndustriesWeServeData {
  const specificData = industriesWeServeData[slug];

  if (specificData) {
    return specificData;
  }

  // Return default software development data for unknown slugs
  return industriesWeServeData["software-development"];
}

export function getAllIndustriesWeServeSlugs(): string[] {
  return Object.keys(industriesWeServeData);
}
