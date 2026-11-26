import type { ExpertisePageRecord, ExpertiseSettingsRecord } from "@/lib/content-types";
import { getBannerHeroData } from "@/lib/expertise/banner-data";
import { getCaseStudyData } from "@/lib/expertise/case-study-section-data";
import { getCustomSoftwareDevData } from "@/lib/expertise/custom-software-dev-section-data";
import { getGuideToSoftwareDevData } from "@/lib/expertise/guide-to-software-dev-data";
import { getIndustriesWeServeData } from "@/lib/expertise/Industries-we-serve-expertise-section-data";
import { getStartDevelopmentData } from "@/lib/expertise/start-sofware-dev-section";
import { getStatsData } from "@/lib/expertise/stats-section-data";
import testimonialData from "@/lib/expertise/testimonial-our-expertise-data";
import { getWhyChooseUsData } from "@/lib/expertise/why-choose-us-our-expertise-section-data";
import { mobileNavigation } from "@/lib/mobileNavigation";

type ExpertiseSeedRecord = Omit<ExpertisePageRecord, "_id">;

const expertiseCategoryCopy: Record<string, { description: string; menuHeading: string }> = {
  "software-solution": {
    description: "Top-tier software solutions to modernize, optimize, and scale your digital operations.",
    menuHeading: "OUR OFFERINGS",
  },
  "artificial-intelligence": {
    description: "Intelligent AI solutions to automate, personalize, and future-proof your business.",
    menuHeading: "AI THAT WORKS FOR YOU",
  },
  industries: {
    description: "Transforming businesses across industries with scalable and customized tech-driven strategies.",
    menuHeading: "INDUSTRIES WE SERVE",
  },
};

const sharedEngagementModels = [
  {
    title: "Offshore Dedicated Team",
    description:
      "Our offshore dedicated team model functions as a Software Development Center. This exclusive team works on client projects, ensuring scalability, efficiency, cost-effectiveness, optimized delivery, and consistently high-quality results.",
    features: ["Client-Centric Approach", "Direct Reporting and Transparency", "Scalability and Flexibility", "Quality and Efficiency"],
  },
  {
    title: "Staff Augmentation",
    description:
      "Through this, we integrates software development experts into client teams. This model accelerates delivery, reduces risks, optimizes resources, and ensures measurable efficiency, productivity, and successful outcomes across lifecycles.",
    features: ["Tailored Expertise", "Seamless Integration", "Cost-Effective Solution", "Transparent Communication"],
  },
  {
    title: "Project-Based",
    description:
      "As a trusted software development agency, Jellyfish Technologies offers flexible engagement models tailored to meet specific customer objectives, ensuring effective collaboration, cost management, and value-oriented execution at every stage.",
    features: ["Fixed Budget", "Milestones and Deliverables", "Resource Allocation", "Risk Mitigation"],
  },
];

const sharedTechStackTabs = [
  {
    name: "Languages",
    value: "languages",
    items: [
      { label: ".Net", imageData: "/images/dotnet.png" },
      { label: "TypeScript", imageData: "/images/typescript.svg" },
      { label: "Python", imageData: "/images/python.png" },
      { label: "Node.js", imageData: "/images/node.png" },
      { label: "Spring Boot", imageData: "/images/springboot.png" },
      { label: "NestJS", imageData: "/images/nestjs.svg" },
      { label: "JavaScript", imageData: "/images/typescript.svg" },
      { label: "SQL Server", imageData: "/images/sqlserver.svg" },
    ],
  },
  {
    name: "Databases",
    value: "databases",
    items: [
      { label: "MongoDB", imageData: "/images/mongodb.svg" },
      { label: "Mongoose", imageData: "/images/mongoose.svg" },
      { label: "PostgreSQL", imageData: "/images/postgres.svg" },
      { label: "MySQL", imageData: "/images/mysql.svg" },
      { label: "Oracle", imageData: "/images/oracle.svg" },
      { label: "Cassandra", imageData: "/images/cassandra.svg" },
      { label: "Azure SQL", imageData: "/images/azure-sql.svg" },
      { label: "SQL Server", imageData: "/images/sqlserver.svg" },
    ],
  },
  {
    name: "Framework",
    value: "framework",
    items: [
      { label: "NestJS", imageData: "/images/nestjs.svg" },
      { label: "Socket", imageData: "/images/socket.svg" },
      { label: "Sequelize", imageData: "/images/sequelize.svg" },
      { label: "Webpack", imageData: "/images/webpack.svg" },
      { label: "Kafka", imageData: "/images/kafka.svg" },
      { label: "AWS", imageData: "/images/aws.svg" },
      { label: "Azure", imageData: "/images/azure.svg" },
      { label: "Cloud", imageData: "/images/cloud.svg" },
    ],
  },
];

const sharedFaqs = [
  {
    question: "How do you tailor expertise solutions for different industries?",
    answer:
      "We shape each solution around business goals, operational constraints, and user needs so the final product fits the actual workflow instead of forcing teams into generic software.",
  },
  {
    question: "Can your team handle both strategy and implementation?",
    answer:
      "Yes. We support discovery, UX, engineering, architecture, quality, and delivery so strategy and execution remain aligned from planning to launch.",
  },
  {
    question: "Do you work with startups and enterprise teams?",
    answer:
      "Yes. We work across startup, growth-stage, and enterprise environments, adjusting team structure and delivery style to match scope and internal maturity.",
  },
  {
    question: "How do you ensure software quality during delivery?",
    answer:
      "We use structured engineering practices, reviews, QA workflows, and iterative delivery checkpoints to keep quality visible throughout the build process.",
  },
  {
    question: "Can we scale the engagement as needs change?",
    answer:
      "Yes. Team shape, pace, and engagement model can evolve as priorities change, which makes it easier to expand scope or focus on specific delivery goals.",
  },
];

function getExpertiseNavigationSeed() {
  const expertiseRoot = mobileNavigation.find((item) => item.label === "Our Expertise");
  const categories = expertiseRoot?.children ?? [];

  return categories.map((category, index) => ({
    key: category.href?.split("/")[2] ?? `category-${index + 1}`,
    label: category.label,
    description: expertiseCategoryCopy[category.href?.split("/")[2] ?? ""]?.description ?? "Expertly crafted digital solutions tailored to modern business needs.",
    menuHeading: expertiseCategoryCopy[category.href?.split("/")[2] ?? ""]?.menuHeading ?? "OUR OFFERINGS",
    order: index + 1,
    items:
      category.children?.map((child, childIndex) => ({
        navLabel: child.label,
        slug: child.href?.split("/").pop() ?? `item-${childIndex + 1}`,
        categoryKey: category.href?.split("/")[2] ?? `category-${index + 1}`,
        order: childIndex + 1,
      })) ?? [],
  }));
}

export const defaultExpertiseSettings: ExpertiseSettingsRecord = {
  key: "expertise-settings",
  menuCategories: getExpertiseNavigationSeed().map(({ items: _items, ...category }) => category),
  testimonialTitle: testimonialData.mainTitle,
  testimonialSubtitle: testimonialData.mainSubtitle,
  testimonials: testimonialData.testimonials.map((item) => ({
    quote: item.quote,
    author: item.author,
    position: item.position,
    company: item.company,
    avatar: item.avatar,
  })),
  engagementTitle: "Engagement Models",
  engagementSubtitle:
    "As a trusted software development agency, Jellyfish Technologies offers flexible engagement models tailored to meet specific customer objectives, ensuring effective collaboration, cost management, and value-oriented execution at every stage.",
  engagementModels: sharedEngagementModels,
  techStackTitle: "Our Tech Stack",
  techStackDescription:
    "We employ a modern, scalable technology stack—encompassing programming languages, frameworks, databases, cloud services, and DevOps—to deliver safe, high-performance software solutions tailored to your business requirements, ensuring flexibility, speed, and enduring value.",
  techStackTabs: sharedTechStackTabs,
  faqTitle: "Frequently Asked Questions",
  faqs: sharedFaqs,
};

export function buildExpertiseSeedRecords() {
  const navigation = getExpertiseNavigationSeed();

  return navigation.flatMap((category) =>
    category.items.map((item) => {
      const banner = getBannerHeroData(item.slug);
      const stats = getStatsData(item.slug);
      const caseStudy = getCaseStudyData(item.slug);
      const custom = getCustomSoftwareDevData(item.slug);
      const whyChoose = getWhyChooseUsData(item.slug);
      const industries = getIndustriesWeServeData(item.slug);
      const guide = getGuideToSoftwareDevData(item.slug);
      const start = getStartDevelopmentData(item.slug);

      return {
        slug: item.slug,
        categoryKey: item.categoryKey,
        navLabel: item.navLabel,
        order: item.order,
        isPublished: true,
        heroTitle: banner?.heroTitle ?? item.navLabel,
        heroDescription: banner?.heroDescription ?? "",
        ctaButtonText: banner?.ctaButtonText ?? "Book a Free Consultation",
        heroLogos: banner?.logos ?? ["/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png"],
        heroBackgroundImage: banner?.heroBackgroundImage ?? "/images/expertise-hero-bg.png",
        statsHighlights: [
          { value: "14+", label: "Years in Experience" },
          { value: "150+", label: "Full-Time Experts" },
          { value: "98%", label: "On-Time Projects Delivered" },
          { value: "4.9/5", label: "Customer Ratings" },
        ],
        statsTitle: stats.mainTitle,
        statsDescription: stats.mainDescription,
        statsCards: stats.gridItems,
        caseStudyTitle: caseStudy.mainTitle,
        caseStudySubtitle: caseStudy.mainSubtitle,
        caseStudyTabs: caseStudy.caseStudies.map((tab) => ({
          id: tab.id,
          title: tab.title,
          heading: tab.heading,
          description: tab.description,
          features: tab.features,
          cta1: tab.cta1,
          cta2: tab.cta2,
          imageData: tab.image,
          cta1Link: String(tab.cta1Link),
          cta2Link: String(tab.cta2Link),
        })),
        customTitle: custom.mainTitle,
        customSubtitle: custom.mainSubtitle,
        customButtonText: custom.buttonText,
        customButtonLink: "/contact-us",
        customImage: custom.image,
        customImageAlt: custom.imageAlt,
        customBenefits: custom.benefits,
        whyChooseTitle: whyChoose.mainTitle,
        whyChooseSubtitle: whyChoose.mainSubtitle,
        whyChooseFeatures: whyChoose.features.map((feature) => ({
          ...feature,
          iconRightClass: feature.iconRightClass ?? "",
        })),
        industriesTitle: industries.mainTitle,
        industriesSubtitle: industries.mainSubtitle,
        industriesItems: industries.industries.map((industry) => ({
          ...industry,
          link: industry.link ?? "#",
        })),
        guideTitle: guide.mainTitle,
        guideSubtitle: guide.mainSubtitle,
        guideTabs: guide.tabs.map((tab) => ({
          key: tab.key,
          label: tab.label,
          section: tab.section,
          items: tab.items.map((guideItem) => ({
            title: guideItem.title,
            bullets: guideItem.desc,
          })),
        })),
        startTitle: start.title,
        startSubtitle: start.subtitle,
        startButtonText: start.buttonText,
        startButtonLink: "/contact-us",
      } satisfies ExpertiseSeedRecord;
    })
  );
}
