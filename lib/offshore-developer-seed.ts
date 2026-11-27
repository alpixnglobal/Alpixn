import type { OffshoreDeveloperPageRecord, OffshoreDeveloperSettingsRecord } from "@/lib/content-types";
import { getBackendDevelopersData } from "@/lib/offshore developer/backend-developers-data";
import { getContactExpertData } from "@/lib/offshore developer/contact-expert-data";
import { getCtaSectionData } from "@/lib/offshore developer/cta-section-data";
import { getEngagementModelsData } from "@/lib/offshore developer/engagement-models-data";
import { getExcellenceOfferingsData } from "@/lib/offshore developer/excellence-offerings-data";
import { getHireDeveloperData } from "@/lib/offshore developer/hire-developer-data";
import { getHireGuideData } from "@/lib/offshore developer/hire-guide-data";
import { getHireStepsData } from "@/lib/offshore developer/hire-steps-data";
import { getOffshoreHeroData } from "@/lib/offshore developer/offshore-banner-data";
import { getPartnerTeamData } from "@/lib/offshore developer/partner-team-data";
import { partnerLogos } from "@/lib/offshore developer/partners-logo-data";
import { offshorePageFields } from "@/lib/offshore developer/content";

type OffshoreDeveloperSeedRecord = Omit<OffshoreDeveloperPageRecord, "_id">;

type OffshorePageSeedDefinition = {
  slug: string;
  navLabel: string;
  categoryKey: string;
  order: number;
};

export const offshoreMenuCategories = [
  { key: "backend-developer", label: "Backend Developer", menuHeading: "HIRE BACKEND DEVELOPER", order: 1 },
  { key: "frontend-developer", label: "Frontend Developer", menuHeading: "HIRE FRONTEND DEVELOPER", order: 2 },
  { key: "mobile-app-developer", label: "Mobile App Developer", menuHeading: "HIRE MOBILE APP DEVELOPER", order: 3 },
  { key: "ai-engineers", label: "AI Engineers", menuHeading: "HIRE AI ENGINEERS", order: 4 },
  { key: "devops-engineers", label: "DevOps Engineers", menuHeading: "HIRE DEVOPS ENGINEERS", order: 5 },
  { key: "platforms", label: "Platforms", menuHeading: "HIRE PLATFORMS EXPERT", order: 6 },
];

const offshorePages: OffshorePageSeedDefinition[] = [
  { slug: "nodejs-developer", navLabel: "Node.Js Developer", categoryKey: "backend-developer", order: 1 },
  { slug: "golang-developer", navLabel: "Golang Developer", categoryKey: "backend-developer", order: 2 },
  { slug: "net-developer", navLabel: ".Net Developer", categoryKey: "backend-developer", order: 3 },
  { slug: "sql-developer", navLabel: "SQL Developer", categoryKey: "backend-developer", order: 4 },
  { slug: "java-developer", navLabel: "Java Developer", categoryKey: "backend-developer", order: 5 },
  { slug: "django-developer", navLabel: "Django Developer", categoryKey: "backend-developer", order: 6 },
  { slug: "python-developer", navLabel: "Python Developer", categoryKey: "backend-developer", order: 7 },
  { slug: "php-developer", navLabel: "PHP Developer", categoryKey: "backend-developer", order: 8 },
  { slug: "spring-boot-developer", navLabel: "Spring Boot Developers", categoryKey: "backend-developer", order: 9 },
  { slug: "express-js-developer", navLabel: "Express JS Developer", categoryKey: "backend-developer", order: 10 },
  { slug: "reactjs-developer", navLabel: "ReactJS Developer", categoryKey: "frontend-developer", order: 1 },
  { slug: "javascript-developer", navLabel: "JavaScript Developer", categoryKey: "frontend-developer", order: 2 },
  { slug: "angular-developer", navLabel: "Angular Developer", categoryKey: "frontend-developer", order: 3 },
  { slug: "typescript-developer", navLabel: "TypeScript Developer", categoryKey: "frontend-developer", order: 4 },
  { slug: "vuejs-developer", navLabel: "Vue Js Developer", categoryKey: "frontend-developer", order: 5 },
  { slug: "nextjs-developer", navLabel: "NextJS Developer", categoryKey: "frontend-developer", order: 6 },
  { slug: "react-native-developer", navLabel: "React Native Developer", categoryKey: "mobile-app-developer", order: 1 },
  { slug: "net-maui", navLabel: ".Net Maui", categoryKey: "mobile-app-developer", order: 2 },
  { slug: "flutter-developer", navLabel: "Flutter Developer", categoryKey: "mobile-app-developer", order: 3 },
  { slug: "kotlin-developer", navLabel: "Kotlin Developer", categoryKey: "mobile-app-developer", order: 4 },
  { slug: "ionic-developer", navLabel: "Ionic Developer", categoryKey: "mobile-app-developer", order: 5 },
  { slug: "full-stack-developer", navLabel: "Full Stack Developer", categoryKey: "mobile-app-developer", order: 6 },
  { slug: "ai-development-teams", navLabel: "AI Development Teams", categoryKey: "ai-engineers", order: 1 },
  { slug: "computer-vision-engineers", navLabel: "Computer Vision Engineers", categoryKey: "ai-engineers", order: 2 },
  { slug: "generative-ai-engineers", navLabel: "Generative AI Engineers", categoryKey: "ai-engineers", order: 3 },
  { slug: "nlp-engineers", navLabel: "NLP Engineers", categoryKey: "ai-engineers", order: 4 },
  { slug: "ai-team-augmentation", navLabel: "AI Team Augmentation Services", categoryKey: "ai-engineers", order: 5 },
  { slug: "llm-engineers", navLabel: "LLM Engineers", categoryKey: "ai-engineers", order: 6 },
  { slug: "aws-developer", navLabel: "AWS Developer", categoryKey: "devops-engineers", order: 1 },
  { slug: "azure-developer", navLabel: "Azure Developer", categoryKey: "devops-engineers", order: 2 },
  { slug: "google-cloud-developer", navLabel: "Google Cloud Developer", categoryKey: "devops-engineers", order: 3 },
  { slug: "salesforce-developer", navLabel: "Salesforce Developer", categoryKey: "platforms", order: 1 },
  { slug: "ms-power-apps-developer", navLabel: "MS Power Apps Developer", categoryKey: "platforms", order: 2 },
  { slug: "metaverse-developer", navLabel: "Metaverse Developer", categoryKey: "platforms", order: 3 },
];

function normalizeOffshoreLink(link?: string) {
  if (!link) {
    return "#";
  }

  return link
    .replace("/mobile-developer/", "/mobile-app-developer/")
    .replace("/backend-developer/springboot-developer", "/backend-developer/spring-boot-developer")
    .replace("/backend-developer/dotnet-developer", "/backend-developer/net-developer")
    .replace("/backend-developer/express-developer", "/backend-developer/express-js-developer");
}

function buildDefaultSteps() {
  return [
    {
      stepLabel: "Step 01",
      title: "Schedule a Call",
      description: "Share your project details and developer requirements with our experts.",
    },
    {
      stepLabel: "Step 02",
      title: "Select Your Team",
      description: "Interview and handpick the best developers tailored to your needs.",
    },
    {
      stepLabel: "Step 03",
      title: "Start Your Project",
      description: "We handle onboarding while you focus on launching your project seamlessly.",
    },
  ];
}

export const defaultOffshoreDeveloperSettings: OffshoreDeveloperSettingsRecord = {
  key: "offshore-developer-settings",
  menuCategories: offshoreMenuCategories,
  partnerLogos: partnerLogos.map((logo) => ({ label: logo.alt, imageData: logo.src, href: logo.href })),
  testimonialTitle: "What Our Clients Say",
  testimonialSubtitle: "Real businesses, real results with AI automation.",
  testimonials: Array.from({ length: 4 }, () => ({
    quote:
      "The team enabled the app to launch in both New Zealand and the United States, seamlessly handling multiple currencies and transactions upon deployment. About 1,200 users are registered to the platform, and the app is fully-functioning. The team added value with their responsiveness and efficiency.",
    name: "James Anderson",
    role: "Co-Founder, Shootzu",
    avatarImageData: "/images/avatar-profile.png",
    starsImageData: "/icons/stars.svg",
  })),
  caseStudyTitle: "Delivering Result-Driven Digital Solutions",
  caseStudySubtitle:
    "Explore a selection of our case studies to gain insight into our innovative approach and our ability to craft unconventional digital solutions tailored to our client's specific needs.",
  caseStudies: [
    {
      title: "Unify All FM Operations On A Single Platform To Enhance Efficiency And Cut Costs.",
      description:
        "Integrated FM Group, a leading facility management provider, collaborated with Jellyfish Technologies to streamline operations. The developed platform integrates work orders, asset management, preventive maintenance, and vendor management, enhancing efficiency and reducing costs.",
      imageData: "/images/phone.png",
      featuresLeft: [
        "Analyzed client’s operations and FM trends, and followed a structured dev process.",
        "The work order and management feature was added to create, assign, and track.",
      ],
      featuresRight: [
        "Conducted constructive user testing sessions during the development phase.",
        "Enhanced facility managers to oversee service providers and suppliers.",
      ],
    },
    {
      title: "Empowers Brokers and Integrates With Top US Insurers For Swift Certificate Issuance And Optimal Premium Quotes.",
      description:
        "Patra Corporation partnered with Jellyfish Technologies to develop a secure, web-based payment automation solution for premium finance in the insurance industry. The result improved task efficiency, reduced costs, and enhanced the overall user experience.",
      imageData: "/images/brokers.png",
      featuresLeft: [
        "API integration module with configuration based approach.",
        "The integration module has robust authorization mechanisms for secure data exchange.",
      ],
      featuresRight: [
        "XML transports diverse data formats in a flexible and readable structure.",
        "Underwriting questions for risk assessment stored in XML databases for insurance standards.",
      ],
    },
    {
      title: "A SaaS Solution to Streamline Google Workspace User Management, Automating Tasks for Efficiency.",
      description:
        "Jellyfish Technologies facilitated the launch of Patronum (Bespin Labs). The developed platform streamlines Google Workspace tasks, offering enhanced control over user files, efficient sharing, copying, and backup options, adding another satisfied client to our list.",
      imageData: "/images/saas.png",
      featuresLeft: [
        "Code optimized for seamless handling of synchronous requests and high-volume traffic.",
        "Real-time updates for unstructured data were generated using MongoDB.",
      ],
      featuresRight: [
        "Integrated Google API, enhancing product functionality and connectivity.",
        "Automated provisioning and de-provisioning users within Google Workspace.",
      ],
    },
    {
      title: "Develop An Internal Insurance App For Daily Storage Of Client's Private Data By Employees.",
      description:
        "Heffernan, a leading US insurance brokerage, partnered with Jellyfish Technologies to develop a secure internal application for daily client data storage. The solution included robust authentication, responsive Ul, file storage, and report generation, resulting in a fast and secure data management system.",
      imageData: "/images/insurance.png",
      featuresLeft: [
        "With planning & research, evaluated app functionalities and architectural needs.",
        "Top-notch user experience drove the design, resulting in a clean, intuitive UX.",
      ],
      featuresRight: [
        "Developed a responsive UI with full accessibility, integrating Bootstrap design.",
        "App creates reports in CSV/PDF formats for data analysis and sharing.",
      ],
    },
    {
      title: "Visual Solutions For Builders/Homebuyers And Provides Weekly Build Progress Reports Via Photos.",
      description:
        "Jellyfish Technologies collaborated with Builder Digital Solutions to create and deliver various visual marketing and engagement solutions for builders and new home buyers.",
      imageData: "/images/homebayer.png",
      featuresLeft: [
        "Improved UI with enhanced design elements and navigation.",
        "Identified key features for mobile and web app performance enhancements.",
      ],
      featuresRight: [
        "Developed a responsive UI with full accessibility, integrating Bootstrap design.",
        "We addressed bugs, refining existing features for improved functionality & UX.",
      ],
    },
  ],
  faqTitle: "Common Questions About Hiring Offshore Developers",
  faqs: [
    {
      question: "How quickly can we hire offshore developers?",
      answer:
        "The hiring timeline depends on your role requirements, but shortlisted offshore developers can usually be shared quickly once the needed skills and engagement model are clear.",
    },
    {
      question: "Can offshore developers work with our internal team?",
      answer:
        "Yes. Offshore developers can work as a dedicated extension of your internal team, align with your tools and processes, and collaborate across time zones.",
    },
    {
      question: "What engagement models are available?",
      answer:
        "Typical engagement options include dedicated teams, staff augmentation, and project-based delivery depending on your goals and internal capacity.",
    },
    {
      question: "How do you protect project confidentiality?",
      answer:
        "Projects can be protected through NDA-backed onboarding, structured access controls, and secure development workflows tailored to client requirements.",
    },
    {
      question: "Can we scale the offshore team later?",
      answer:
        "Yes. Teams can be scaled up or down as priorities change, which makes offshore hiring a flexible model for growth and delivery control.",
    },
  ],
};

export function buildOffshoreDeveloperSeedRecords() {
  return offshorePages.map((page) => {
    const hero = getOffshoreHeroData(page.slug);
    const excellence = getExcellenceOfferingsData(page.slug);
    const cta = getCtaSectionData(page.slug);
    const partner = getPartnerTeamData(page.slug);
    const developers = getBackendDevelopersData(page.slug);
    const hire = getHireDeveloperData(page.slug);
    const contact = getContactExpertData(page.slug);
    const guide = getHireGuideData(page.slug);
    const steps = getHireStepsData(page.slug);
    const engagement = getEngagementModelsData(page.slug);

    return {
      slug: page.slug,
      categoryKey: page.categoryKey,
      navLabel: page.navLabel,
      order: page.order,
      isPublished: true,
      heroTitle: hero.title,
      heroDescription: hero.description,
      heroChecklist: hero.checklist,
      heroFormTitle: hero.formTitle,
      heroTechnologies: hero.technologies,
      excellenceTitle: excellence.mainTitle,
      excellenceSubtitle: excellence.mainSubtitle,
      excellenceOfferings: excellence.offerings.map((item) => ({
        title: item.title,
        description: item.description,
        imageData: item.image,
        alt: item.alt,
        width: item.width,
        height: item.height,
      })),
      ctaTitle: cta.title,
      ctaButtonText: cta.buttonText,
      ctaButtonLink: cta.buttonLink,
      partnerTitle: partner.mainTitle,
      partnerButtonText: partner.buttonText,
      partnerButtonLink: partner.buttonLink,
      partnerItems: partner.items.map((item) => ({ title: item.title, description: item.text })),
      developerGridTitle: developers.title,
      developerItems: developers.developers.map((item) => ({
        name: item.name,
        imageData: item.image,
        alt: item.alt,
        width: item.width,
        height: item.height,
        link: normalizeOffshoreLink(item.link),
      })),
      hireTitle: hire.title,
      hireSubtitle: hire.subtitle,
      hireServices: hire.services.map((item) => ({ title: item.title, description: item.desc })),
      contactTitle: contact.title,
      contactButtonText: contact.buttonText,
      contactButtonLink: contact.buttonLink,
      guideTitle: guide.mainTitle,
      guideTabs: guide.tabs.map((tab) => ({
        key: tab.key,
        label: tab.label,
        section: tab.section,
        items: tab.items.map((item) => ({ title: item.title, description: item.desc })),
      })),
      stepsTitle: steps.mainTitle,
      stepsButtonText: steps.buttonText,
      stepsButtonLink: steps.buttonLink,
      steps: buildDefaultSteps(),
      engagementTitle: engagement.mainTitle,
      engagementSubtitle: engagement.mainSubtitle,
      engagementModels: engagement.models,
      // Page-specific copy for this role replaces the shared Node.js template.
      ...(offshorePageFields(page.slug) ?? {}),
    } satisfies OffshoreDeveloperSeedRecord;
  });
}
