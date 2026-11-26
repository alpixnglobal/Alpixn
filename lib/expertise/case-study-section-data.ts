import { Url } from "next/dist/shared/lib/router/router";

export interface CaseStudyTab {
  id: string;
  title: string;
  heading: string;
  description: string;
  features: string[];
  cta1: string;
  cta2: string;
  image: string;
  cta1Link: string | Url;
  cta2Link: string | Url;
}

export interface CaseStudySectionData {
  slug: string;
  mainTitle: string;
  mainSubtitle: string;
  caseStudies: CaseStudyTab[];
}

export const expertiseCaseStudyData: Record<string, CaseStudySectionData> = {
  // ============ SOFTWARE SOLUTIONS ============

  // 1. Software Development
  "software-development": {
    slug: "software-development",
    mainTitle: "Case Studies: From Concept to End-to-End Success",
    mainSubtitle:
      "Discover how we partner with businesses of all sizes to transform ideas into user-centric software solutions, showcasing a proven track record of driving stability, agility, and sustained growth.",
    caseStudies: [
      //---------- Tab 1 ----------------//
      {
        id: "enterprise-software",
        title: "Enterprise Software",
        heading: "Builds Scalable Enterprise Resource Planning System",
        description:
          "Developed a comprehensive ERP system for a multinational corporation, integrating finance, HR, supply chain, and manufacturing modules. The solution improved operational efficiency by 40% and reduced manual data entry by 75%.",
        features: [
          "Multi-module Integration",
          "Real-time Analytics Dashboard",
          "Automated Workflow Management",
          "Cross-department Data Synchronization",
        ],
        cta1: "Read Case Study",
        cta2: "Explore Enterprise Software Services",
        image: "/images/desktop.png",
        cta1Link: "#",
        cta2Link: "#",
      },
      //---------- Tab 2 ----------------//
      {
        id: "financial-tech",
        title: "Financial Tech",
        heading: "Develops Secure Banking Platform with AI Fraud Detection",
        description:
          "Created a next-generation banking platform with advanced security features and AI-powered fraud detection. The system processes over 1 million transactions daily with 99.99% uptime and reduced fraudulent activities by 95%.",
        features: [
          "AI Fraud Detection System",
          "Real-time Transaction Monitoring",
          "Multi-factor Authentication",
          "Regulatory Compliance Integration",
        ],
        cta1: "Read Case Study",
        cta2: "Explore FinTech Development Services",
        image: "/images/desktop.png",
        cta1Link: "#",
        cta2Link: "#",
      },
      //---------- Tab 3 ----------------//
      {
        id: "healthcare-solution",
        title: "Healthcare",
        heading: "Creates Telemedicine Platform with Patient Management System",
        description:
          "Built a comprehensive telemedicine platform connecting patients with healthcare providers. The system supports virtual consultations, electronic health records, and prescription management, serving over 500,000 patients nationwide.",
        features: [
          "Virtual Consultation Rooms",
          "Electronic Health Records",
          "Prescription Management",
          "Insurance Integration",
        ],
        cta1: "Read Case Study",
        cta2: "Explore Healthcare Solutions",
        image: "/images/desktop.png",
        cta1Link: "#",
        cta2Link: "#",
      },
      //---------- Tab 4 ----------------//
      {
        id: "retail-platform",
        title: "Retail",
        heading: "Develops Omnichannel Retail Platform with Inventory Optimization",
        description:
          "Created an omnichannel retail platform integrating online and offline sales channels. The system includes inventory optimization, personalized recommendations, and AI-driven demand forecasting, increasing sales by 35%.",
        features: [
          "Omnichannel Integration",
          "AI Inventory Optimization",
          "Personalized Recommendations",
          "Real-time Sales Analytics",
        ],
        cta1: "Read Case Study",
        cta2: "Explore Retail Technology Services",
        image: "/images/desktop.png",
        cta1Link: "#",
        cta2Link: "#",
      },
    ],
  },

  // 2. Web App Applications
  "web-app-development": {
    slug: "web-app-development",
    mainTitle: "Case Studies: Building Innovative Web Applications for Business Growth",
    mainSubtitle:
      "Discover how we transform complex business operations with innovative web applications, leveraging modern technologies to deliver scalable, high-performance solutions from concept to deployment.",
    caseStudies: [
      //---------- Tab 1 ----------------//
      {
        id: "ecommerce-platform",
        title: "IT & SaaS",
        heading:
          "ALPIXN Powers Patronum with a Scalable SaaS Solution for Google Workspace User Management",
        description:
          "Jellyfish Technologies partnered with Bespin Labs to build Patronum, a powerful SaaS platform that automates user provisioning and streamlines admin tasks across Google Workspace environments with real-time sync and efficient data handling.",
        features: [
          "Optimized code for high-volume performance",
          "Integrated Google API for seamless automation",
          "Real-time data updates via MongoDB",
          "Automated user lifecycle management",
        ],
        cta1: "Read Case Study",
        cta2: "Explore IT & Saas Services",
        image: "/images/desktop.png",
        cta1Link: "#",
        cta2Link: "#",
      },
      //---------- Tab 2 ----------------//
      {
        id: "crm-system",
        title: "Facility Management",
        heading: "ALPIXN Transforms FM Group’s Facility Management with a Unified Digital Platform",
        description:
          "FM Group partnered with Jellyfish Technologies to build a centralized platform for facility management operations. The solution enhanced oversight, improved service delivery, and significantly reduced operational costs.",
        features: [
          "Streamlined work order tracking",
          "Centralized vendor and asset management",
          "Smart preventive maintenance system",
          "Real-time visibility for facility managers",
        ],
        cta1: "Read Story",
        cta2: "Explore Facility Management Services",
        image: "/images/desktop.png",
        cta1Link: "#",
        cta2Link: "#",
      },
      //---------- Tab 3 ----------------//
      {
        id: "education-platform",
        title: "Media & Entertainment",
        heading:
          "ALPIXN Enhances Shootzu’s Creative Platform with Global Payments and Scalable Architecture",
        description:
          "Jellyfish Technologies partnered with Shootzu to elevate its photography and videography networking platform, improving user engagement, streamlining global payments, and enabling international scalability.",
        features: [
          "Redesigned UI for better engagement",
          "Multi-currency payment integration",
          "Scalable system for global expansion",
          "Streamlined job and quote workflows",
        ],
        cta1: "Read Story",
        cta2: "Explore Facility Management Services",
        image: "/images/desktop.png",
        cta1Link: "#",
        cta2Link: "#",
      },
      //---------- Tab 4 ----------------//
      {
        id: "real-estate-portal",
        title: "Wildlife",
        heading: "ALPIXN Transforms RJL’s Hunting Operations with a Scalable Digital Platform",
        description:
          "Jellyfish Technologies collaborated with Revierjagd Luzern (RJL) to digitize their hunting services by building a high-performance web and mobile application. The solution enhances administrative efficiency, streamlines insurance and document workflows, and improves the overall user experience in the sustainable hunting industry",
        features: [
          "Centralized User and Insurance Management",
          "Real-Time Event and Document Tracking",
          "Scalable Web Architecture with MySQL Integration",
          "Multi-language Mobile App with Push Notifications",
        ],
        cta1: "Read Story",
        cta2: "Explore Facility Management Services",
        image: "/images/desktop.png",
        cta1Link: "#",
        cta2Link: "#",
      },
    ],
  },

  // 3. Mobile Applications
  "mobile-app-development": {
    slug: "mobile-app-development",
    mainTitle: "",
    mainSubtitle: "",
    caseStudies: [
      //---------- Tab 1 ----------------//
      {
        id: "fitness-app",
        title: "Fitness & Health",
        heading: "Develops AI-Powered Fitness Tracking Application",
        description:
          "Created a mobile fitness app with AI-powered workout recommendations, real-time health monitoring, and social features. The app has 1 million+ downloads with 4.8-star rating on app stores.",
        features: [
          "AI Workout Plans",
          "Health Metrics Tracking",
          "Social Challenges & Leaderboards",
          "Nutrition Planning Integration",
        ],
        cta1: "Read Case Study",
        cta2: "Explore Mobile App Development",
        image: "/images/desktop.png",
        cta1Link: "#",
        cta2Link: "#",
      },
      //---------- Tab 2 ----------------//
      {
        id: "delivery-app",
        title: "Delivery Service",
        heading: "Builds Real-time Delivery Tracking Platform",
        description:
          "Developed a comprehensive delivery tracking platform with real-time location updates, route optimization, and automated dispatch system. Reduced delivery times by 30% and increased customer satisfaction.",
        features: [
          "Real-time GPS Tracking",
          "Route Optimization Algorithm",
          "Automated Dispatch System",
          "Customer Rating & Feedback",
        ],
        cta1: "Read Case Study",
        cta2: "Explore Transportation Solutions",
        image: "/images/desktop.png",
        cta1Link: "#",
        cta2Link: "#",
      },
      //---------- Tab 3 ----------------//
      {
        id: "banking-app",
        title: "Mobile Banking",
        heading: "Creates Secure Mobile Banking Application",
        description:
          "Developed a mobile banking app with biometric authentication, bill payments, fund transfers, and investment features. Increased mobile banking adoption by 65% among customers.",
        features: [
          "Biometric Authentication",
          "Instant Fund Transfers",
          "Bill Payment Automation",
          "Investment Portfolio Tracking",
        ],
        cta1: "Read Case Study",
        cta2: "Explore FinTech Development",
        image: "/images/desktop.png",
        cta1Link: "#",
        cta2Link: "#",
      },
      //---------- Tab 4 ----------------//
      {
        id: "social-media-app",
        title: "Social Media",
        heading: "Builds Social Networking App with Content Discovery",
        description:
          "Created a social media platform with AI-powered content recommendations, group features, and multimedia sharing. Gained 500,000+ active users within first 6 months of launch.",
        features: [
          "AI Content Recommendations",
          "Group & Community Features",
          "Multimedia Sharing",
          "Real-time Notifications",
        ],
        cta1: "Read Case Study",
        cta2: "Explore Social Media Development",
        image: "/images/desktop.png",
        cta1Link: "#",
        cta2Link: "#",
      },
    ],
  },
};

// Default case studies for services without specific configurations
const defaultCaseStudies: CaseStudyTab[] = [
  {
    id: "insurtech",
    title: "InsurTech",
    heading: "Powers Patra's Insurance Platform with Scalable API Integration Capabilities",
    description:
      "AICOmpany Private Limited collaborated with Patra Corporation to build a configuration-based API integration system, enabling seamless connectivity with major insurers. The solution improved data accuracy, speed, and user experience while supporting scalable growth.",
    features: [
      "Smart API Connectivity",
      "Automated Underwriting Flow",
      "Faster Insurance Quotes",
      "Streamlined Customer Journey",
    ],
    cta1: "Read Story",
    cta2: "Explore InsurTech Services",
    image: "/images/desktop.png",
    cta1Link: "#",
    cta2Link: "#",
  },
  {
    id: "facility-management",
    title: "Facility Management",
    heading: "Revolutionizes Facility Operations with AI-Powered Management System",
    description:
      "Developed an intelligent facility management platform that uses AI to optimize resource allocation, maintenance scheduling, and energy consumption. The system reduced operational costs by 35% while improving service quality.",
    features: [
      "AI-Powered Resource Optimization",
      "Predictive Maintenance Alerts",
      "Energy Consumption Analytics",
      "Real-time Monitoring Dashboard",
    ],
    cta1: "Read Story",
    cta2: "Explore Facility Management Services",
    image: "/images/desktop.png",
    cta1Link: "#",
    cta2Link: "#",
  },
  {
    id: "it-saas",
    title: "IT & SaaS",
    heading: "Transforms Legacy Systems into Modern Cloud-Native Applications",
    description:
      "Migrated a 15-year-old monolithic system to a microservices architecture on AWS, improving scalability by 300% and reducing deployment time from days to minutes. The modernization enabled rapid feature development and better user experience.",
    features: [
      "Legacy System Modernization",
      "Microservices Architecture",
      "AWS Cloud Migration",
      "CI/CD Pipeline Implementation",
    ],
    cta1: "Read Story",
    cta2: "Explore IT & SaaS Services",
    image: "/images/desktop.png",
    cta1Link: "#",
    cta2Link: "#",
  },
  {
    id: "travel-hospitality",
    title: "Travel & Hospitality",
    heading: "Creates Personalized Travel Experience Platform with AI Recommendations",
    description:
      "Built a comprehensive travel platform that uses machine learning to provide personalized recommendations, dynamic pricing, and seamless booking experiences. The platform increased customer engagement by 45% and booking conversion by 28%.",
    features: [
      "AI-Powered Recommendations",
      "Dynamic Pricing Engine",
      "Multi-Provider Integration",
      "Real-time Booking Management",
    ],
    cta1: "Read Story",
    cta2: "Explore Travel & Hospitality Services",
    image: "/images/desktop.png",
    cta1Link: "#",
    cta2Link: "#",
  },
];

// Helper functions
export function getCaseStudyData(slug: string): CaseStudySectionData {
  const specificData = expertiseCaseStudyData[slug];

  if (specificData) {
    return specificData;
  }

  // Return default structure with the slug
  return {
    slug: slug,
    mainTitle: "Case Studies: From Concept to End-to-End Success",
    mainSubtitle:
      "Discover how we partner with businesses of all sizes to transform ideas into user-centric software solutions, showcasing a proven track record of driving stability, agility, and sustained growth.",
    caseStudies: defaultCaseStudies,
  };
}

export function getAllCaseStudySlugs(): string[] {
  return Object.keys(expertiseCaseStudyData);
}
