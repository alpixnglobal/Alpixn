export interface BenefitItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface CustomSoftwareDevData {
  slug: string;
  mainTitle: string;
  mainSubtitle: string;
  buttonText: string;
  image: string;
  imageAlt: string;
  benefits: BenefitItem[];
}

export const customSoftwareDevData: Record<string, CustomSoftwareDevData> = {
  // ============ SOFTWARE SOLUTIONS ============

  // 1. Software Development
  "software-development": {
    slug: "software-development",
    mainTitle: "Benefits of Choosing Our Custom Software Development Company",
    mainSubtitle:
      "Our custom software development solutions are tailored to align with your unique business processes, objectives, and growth strategy. From increased efficiency to better scalability and faster time-to-market, discover how our customized approach adds substantial value to your digital transformation journey.",
    buttonText: "Get Expert Guidance",
    image: "/images/blobai.png",
    imageAlt: "Blob AI",
    benefits: [
      {
        id: "benefit-1",
        number: "01",
        title: "Streamlined Operations & Workflow",
        description:
          "Our custom software development services streamline enterprise operations through intelligent task automation, augmenting productivity, enhancing project visibility, and facilitating resource optimization for sustained growth across departments and teams.",
      },
      {
        id: "benefit-2",
        number: "02",
        title: "Streamlined Operations & Workflow",
        description:
          "Our custom software development services streamline enterprise operations through intelligent task automation, augmenting productivity, enhancing project visibility, and facilitating resource optimization for sustained growth across departments and teams.",
      },
      {
        id: "benefit-3",
        number: "03",
        title: "Accurate Data Analysis",
        description:
          "Our team delivers accurate, real-time insights using AI-powered custom software development services, facilitating informed decision-making, refining strategies, and helping businesses uncover valuable trends via advanced analytics and reporting.",
      },
      {
        id: "benefit-4",
        number: "04",
        title: "Scalability & Adaptability",
        description:
          "Built with scalable architecture, our custom software development solutions adapt to your evolving business needs, facilitating expansion, quick pivots, and ongoing enhancement in the dynamic market landscape.",
      },
      {
        id: "benefit-5",
        number: "05",
        title: "Enhanced Security",
        description:
          "We emphasize data security via encryption, access control, and secure coding methodologies. Our bespoke software development services ensure proactive monitoring, cyber threat identification, and full compliance with global security standards.",
      },
      {
        id: "benefit-6",
        number: "06",
        title: "Increased Productivity",
        description:
          "By automating workflows and repetitive tasks, our custom software development services boost team efficiency, reduce manual workload, and enable faster project delivery with seamless collaboration across distributed teams.",
      },
      {
        id: "benefit-7",
        number: "07",
        title: "Business-Tailored Architecture",
        description:
          "Our customized software solutions are built around your unique goals, guaranteeing seamless scalability, system compatibility, and performance enhancement to promote operational excellence and sustained commercial value.",
      },
      {
        id: "benefit-8",
        number: "08",
        title: "Cost-Effective Solutions",
        description:
          "We offer cost-effective software development services that don't compromise on quality, enabling you to lower operational costs, enhance ROI, and accomplish more within budget with innovative, scalable software solutions.",
      },
      {
        id: "benefit-9",
        number: "09",
        title: "World-Class UX/UI Design",
        description:
          "Our custom software application development company delivers visually appealing, intuitive interfaces that emphasize usability, accessibility, and brand coherence, resulting in exceptional and seamless user experiences that enhance product adoption and loyalty.",
      },
    ],
  },

  // 2. Web Applications
  "web-app-development": {
    slug: "web-app-development",
    mainTitle: "Why Choose Our Web Application Development Agency?",
    mainSubtitle:
      "ALPIXN offers custom web application development services backed by our expertise as a top web app development company in the US. We offer end-to-end services integrating next-gen tech stack, and agile methodologies to deliver high-performance website application development services",
    buttonText: "Get Expert Guidance",
    image: "/images/blobai.png",
    imageAlt: "Web Development Illustration",
    benefits: [
      {
        id: "web-benefit-1",
        number: "01",
        title: "Extend Operation Efficiency",
        description:
          "As a trusted web app development agency, we build tailored web applications that automate workflows, reduce manual effort, and enhance operational efficiency, streamlining business processes through custom web app development services.",
      },
      {
        id: "web-benefit-2",
        number: "02",
        title: "Secure AWS Investment",
        description:
          "Our web application development firm leverages AWS cloud infrastructure to ensure secure, scalable, and cost-efficient deployment, empowering your SaaS product through reliable web application development solutions tailored for long-term growth",
      },
      {
        id: "web-benefit-3",
        number: "03",
        title: "Scalable Solutions",
        description:
          "ALPIXN designs scalable and robust web applications that grow with your business. As a leading web application development company, we ensure seamless performance across evolving user demands and traffic using DevOps services and cloud consulting.",
      },
      {
        id: "web-benefit-4",
        number: "04",
        title: "Dedicated Support",
        description:
          "Our web application development service provider team offers 24/7 support and proactive maintenance, resolving issues quickly while ensuring your web app remains high-performing, secure, and aligned with evolving business goals.",
      },
      {
        id: "web-benefit-5",
        number: "05",
        title: "Better Code Quality",
        description:
          "As a premium web app development company, ALPIXN delivers high-quality code backed by best practices, automated testing, and clean architecture, ensuring stability, performance, and easier future upgrades.",
      },
      {
        id: "web-benefit-6",
        number: "06",
        title: "Competitive Pricing Structure",
        description:
          "Our custom web application development company delivers feature-rich, enterprise-grade web apps at competitive pricing, balancing cost-efficiency with quality to help businesses maximize ROI from digital transformation efforts.",
      },
    ],
  },

  // 3. Mobile Applications
  "mobile-app-development": {
    slug: "mobile-app-development",
    mainTitle: "Benefits of Our Professional Mobile App Development Services",
    mainSubtitle:
      "Our mobile application development services create innovative, user-friendly apps that drive engagement and business growth. From native iOS and Android to cross-platform solutions, discover how our expertise delivers exceptional mobile experiences that meet your business objectives.",
    buttonText: "Get Expert Guidance",
    image: "/images/blobai.png",
    imageAlt: "Mobile Development Illustration",
    benefits: [
      {
        id: "mobile-benefit-1",
        number: "01",
        title: "Native & Cross-Platform Excellence",
        description:
          "We develop high-performance mobile applications for both native platforms and cross-platform solutions, ensuring optimal performance and user experience across all devices.",
      },
      {
        id: "mobile-benefit-2",
        number: "02",
        title: "Intuitive User Interface",
        description:
          "Our mobile apps feature intuitive, user-friendly interfaces designed with mobile-first principles to enhance engagement and provide seamless navigation for your users.",
      },
      {
        id: "mobile-benefit-3",
        number: "03",
        title: "Offline Functionality",
        description:
          "We build mobile applications with robust offline capabilities, allowing users to access key features and content even without internet connectivity, enhancing user satisfaction.",
      },
      {
        id: "mobile-benefit-4",
        number: "04",
        title: "App Store Optimization",
        description:
          "Our mobile apps are optimized for app store success with proper metadata, screenshots, and descriptions to improve visibility, downloads, and user acquisition.",
      },
      {
        id: "mobile-benefit-5",
        number: "05",
        title: "Security & Data Protection",
        description:
          "We implement enterprise-grade security measures including data encryption, secure authentication, and compliance with app store guidelines to protect user data and privacy.",
      },
      {
        id: "mobile-benefit-6",
        number: "06",
        title: "Push Notification Integration",
        description:
          "Our mobile apps include push notification capabilities to keep users engaged, informed, and connected with timely updates and personalized messages.",
      },
      {
        id: "mobile-benefit-7",
        number: "07",
        title: "Performance Optimization",
        description:
          "We optimize mobile apps for speed, battery efficiency, and memory usage to ensure smooth performance and positive user experiences across all device specifications.",
      },
      {
        id: "mobile-benefit-8",
        number: "08",
        title: "Analytics & User Insights",
        description:
          "Our mobile apps include analytics integration to track user behavior, measure performance, and gather insights for continuous improvement and feature development.",
      },
      {
        id: "mobile-benefit-9",
        number: "09",
        title: "Regular Updates & Maintenance",
        description:
          "We provide ongoing support, updates, and maintenance services to ensure your mobile apps remain compatible with OS updates, secure, and optimized for user satisfaction.",
      },
    ],
  },
};

// Helper functions
export function getCustomSoftwareDevData(slug: string): CustomSoftwareDevData {
  const specificData = customSoftwareDevData[slug];

  if (specificData) {
    return specificData;
  }

  // Return default software development data for unknown slugs
  return customSoftwareDevData["software-development"];
}

export function getAllCustomSoftwareDevSlugs(): string[] {
  return Object.keys(customSoftwareDevData);
}
