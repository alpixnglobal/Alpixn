export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconAlt: string;
  iconWidth: number;
  iconHeight: number;
  iconRightClass?: string;
}

export interface WhyChooseUsData {
  slug: string;
  mainTitle: string;
  mainSubtitle: string;
  features: FeatureCard[];
}

export const whyChooseUsData: Record<string, WhyChooseUsData> = {
  // ============ SOFTWARE SOLUTIONS ============

  // 1. Software Development
  "software-development": {
    slug: "software-development",
    mainTitle: "Why Choose Us as Your Custom Software Development Agency?",
    mainSubtitle:
      "As a trusted business software development company, we address intricate difficulties using agile methodologies, domain-driven design, and comprehensive custom programming services, delivering measurable outcomes through intelligent, user-centric software architecture.",
    features: [
      {
        id: "feature-1",
        title: "Diverse Experience",
        description:
          "As a seasoned software development agency, we offer cross-functional expertise and extensive technological proficiency, enabling us to create intelligent solutions for various sectors with accuracy, business alignment, and quantifiable results",
        icon: "/icons/diverse.svg",
        iconAlt: "Diverse Experience",
        iconWidth: 195,
        iconHeight: 195,
        iconRightClass: "right-6",
      },
      {
        id: "feature-2",
        title: "Flexible Engagement Models",
        description:
          "We offer flexible engagement models that align with your operational rhythm and budget strategy, establishing us as an innovative software development services company dedicated to agility and sustained collaboration.",
        icon: "/icons/flexible.svg",
        iconAlt: "Flexible Engagement",
        iconWidth: 195,
        iconHeight: 195,
        iconRightClass: "right-5",
      },
      {
        id: "feature-3",
        title: "Certified & Skilled Professionals",
        description:
          "Our team comprises internationally certified engineers and consultants. As a premier custom software development company, we implement industry best practices to create resilient, future-oriented solutions customized to your unique business requirements.",
        icon: "/icons/certified.svg",
        iconAlt: "Certified Professionals",
        iconWidth: 195,
        iconHeight: 175.5,
        iconRightClass: "right-5",
      },
      {
        id: "feature-4",
        title: "Guaranteed On-Time Delivery",
        description:
          "As a trusted custom software product development company, we maintain stringent project discipline and agile execution to ensure timely delivery, empowering our clients to achieve their strategic objectives with confidence.",
        icon: "/icons/guranteed.svg",
        iconAlt: "Guaranteed Delivery",
        iconWidth: 106.39,
        iconHeight: 174,
        iconRightClass: "right-7",
      },
      {
        id: "feature-5",
        title: "Transparent Communication",
        description:
          "We emphasize transparency, cooperation, and visibility at each phase. Our bespoke software development consulting methodology ensures that you remain informed and in control, fostering mutual trust through systematic communication and accountability.",
        icon: "/icons/transparent.svg",
        iconAlt: "Transparent Communication",
        iconWidth: 195,
        iconHeight: 175.5,
        iconRightClass: "right-6",
      },
      {
        id: "feature-6",
        title: "Strict Quality Control Processes",
        description:
          "Our mature QA frameworks guarantee software stability, security, and compliance. As a certified bespoke software development company, we implement quality controls throughout the lifecycle, mitigating risks before production.",
        icon: "/icons/strict.svg",
        iconAlt: "Quality Control",
        iconWidth: 195,
        iconHeight: 175.5,
        iconRightClass: "right-4",
      },
    ],
  },

  // 2. Web Applications
  "web-app-development": {
    slug: "web-app-development",
    mainTitle: "Industry-Specific Web Application Development Services",
    mainSubtitle:
      "We craft tailored web app development solutions for industries like healthcare, fintech, logistics, and e-commerce. As a trusted custom web application development company, we build secure, scalable products that solve real-world business problems and fuel sustainable growth.",
    features: [
      {
        id: "web-feature-1",
        title: "Healthcare",
        description:
          "We develop HIPAA-compliant healthcare web applications that ensure secure data management, streamline operations, and enhance patient engagement through modern web application development services.",
        icon: "/icons/diverse.svg",
        iconAlt: "Modern Technology",
        iconWidth: 195,
        iconHeight: 195,
        iconRightClass: "right-6",
      },
      {
        id: "web-feature-2",
        title: "Retail",
        description:
          "Our retail-focused custom web app development services include ecommerce platforms, inventory systems, and CRM tools — built to deliver frictionless shopping, seamless integration, and data-driven customer experiences.",
        icon: "/icons/flexible.svg",
        iconAlt: "Responsive Design",
        iconWidth: 195,
        iconHeight: 195,
        iconRightClass: "right-5",
      },
      {
        id: "web-feature-3",
        title: "Finance",
        description:
          "As a trusted web application development firm, we build secure, scalable finance web apps for banking, insurance, and fintech, ensuring compliance, encrypted transactions, and enhanced user confidence.",
        icon: "/icons/certified.svg",
        iconAlt: "Performance Optimization",
        iconWidth: 195,
        iconHeight: 175.5,
        iconRightClass: "right-5",
      },
      {
        id: "web-feature-4",
        title: "Logistics",
        description:
          "Our bespoke web application development company crafts intelligent logistics web applications that enhance warehouse and fleet operations, minimize delays, improve route optimization, and provide real-time tracking.",
        icon: "/icons/guranteed.svg",
        iconAlt: "SEO First",
        iconWidth: 106.39,
        iconHeight: 174,
        iconRightClass: "right-7",
      },
      {
        id: "web-feature-5",
        title: "Automotive",
        description:
          "We deliver advanced digital solutions for the automotive sector. As a leading web and application development company, we empower dealerships and OEMs with tools that enhance operations and user experience.",
        icon: "/icons/transparent.svg",
        iconAlt: "Security First",
        iconWidth: 195,
        iconHeight: 175.5,
        iconRightClass: "right-6",
      },
      {
        id: "web-feature-6",
        title: "Travel",
        description:
          "Our industry-specific web app development solutions for travel businesses include seamless booking engines, CRM systems, and transport apps—personalized for agencies, hotels, and tour operators.",
        icon: "/icons/strict.svg",
        iconAlt: "Scalable Architecture",
        iconWidth: 195,
        iconHeight: 175.5,
        iconRightClass: "right-4",
      },
    ],
  },

  // 3. Mobile Applications
  "mobile-app-development": {
    slug: "mobile-app-development",
    mainTitle: "Why Choose Us for Your Mobile App Development?",
    mainSubtitle:
      "As an experienced mobile app development agency, we create innovative, user-friendly applications that drive engagement and business growth across iOS, Android, and cross-platform solutions with expert technical execution.",
    features: [
      {
        id: "feature-1",
        title: "Diverse Experience",
        description:
          "As a seasoned software development agency, we offer cross-functional expertise and extensive technological proficiency, enabling us to create intelligent solutions for various sectors with accuracy, business alignment, and quantifiable results",
        icon: "/icons/diverse.svg",
        iconAlt: "Diverse Experience",
        iconWidth: 195,
        iconHeight: 195,
        iconRightClass: "right-6",
      },
      {
        id: "feature-2",
        title: "Flexible Engagement Models",
        description:
          "We offer flexible engagement models that align with your operational rhythm and budget strategy, establishing us as an innovative software development services company dedicated to agility and sustained collaboration.",
        icon: "/icons/flexible.svg",
        iconAlt: "Flexible Engagement",
        iconWidth: 195,
        iconHeight: 195,
        iconRightClass: "right-5",
      },
      {
        id: "feature-3",
        title: "Certified & Skilled Professionals",
        description:
          "Our team comprises internationally certified engineers and consultants. As a premier custom software development company, we implement industry best practices to create resilient, future-oriented solutions customized to your unique business requirements.",
        icon: "/icons/certified.svg",
        iconAlt: "Certified Professionals",
        iconWidth: 195,
        iconHeight: 175.5,
        iconRightClass: "right-5",
      },
      {
        id: "feature-4",
        title: "Guaranteed On-Time Delivery",
        description:
          "As a trusted custom software product development company, we maintain stringent project discipline and agile execution to ensure timely delivery, empowering our clients to achieve their strategic objectives with confidence.",
        icon: "/icons/guranteed.svg",
        iconAlt: "Guaranteed Delivery",
        iconWidth: 106.39,
        iconHeight: 174,
        iconRightClass: "right-7",
      },
      {
        id: "feature-5",
        title: "Transparent Communication",
        description:
          "We emphasize transparency, cooperation, and visibility at each phase. Our bespoke software development consulting methodology ensures that you remain informed and in control, fostering mutual trust through systematic communication and accountability.",
        icon: "/icons/transparent.svg",
        iconAlt: "Transparent Communication",
        iconWidth: 195,
        iconHeight: 175.5,
        iconRightClass: "right-6",
      },
      {
        id: "feature-6",
        title: "Strict Quality Control Processes",
        description:
          "Our mature QA frameworks guarantee software stability, security, and compliance. As a certified bespoke software development company, we implement quality controls throughout the lifecycle, mitigating risks before production.",
        icon: "/icons/strict.svg",
        iconAlt: "Quality Control",
        iconWidth: 195,
        iconHeight: 175.5,
        iconRightClass: "right-4",
      },
    ],
  },
};

// Helper functions
export function getWhyChooseUsData(slug: string): WhyChooseUsData {
  const specificData = whyChooseUsData[slug];

  if (specificData) {
    return specificData;
  }

  // Return default software development data for unknown slugs
  return whyChooseUsData["software-development"];
}

export function getAllWhyChooseUsSlugs(): string[] {
  return Object.keys(whyChooseUsData);
}
