// lib/offshore/excellence-offerings-data.ts

export interface OfferingItem {
  title: string;
  description: string;
  image: string;
  alt: string;
  width: number;
  height: number;
}

export interface ExcellenceOfferingsData {
  slug: string;
  mainTitle: string;
  mainSubtitle: string;
  offerings: OfferingItem[];
}

export const excellenceOfferingsData: Record<string, ExcellenceOfferingsData> = {
  // Node.js Developer
  "nodejs-developer": {
    slug: "nodejs-developer",
    mainTitle: "Excellence of Our Node.js Developers",
    mainSubtitle: "Building powerful, future-ready Node.js applications with precision, performance, and excellence.",
    offerings: [
      {
        title: "Node.js CMS Development",
        description:
          "Hire Node.js developers to create dynamic, scalable CMS platforms with robust features and seamless content management tailored to your needs.",
        image: "/icons/cms.svg",
        alt: "Node.js CMS Development",
        width: 45,
        height: 45,
      },
      {
        title: "Node.js API Development",
        description:
          "We develop secure, high-performance APIs using Node.js, ensuring efficient communication and robust integrations for web and mobile applications.",
        image: "/icons/api.svg",
        alt: "Node.js API Development",
        width: 45,
        height: 45,
      },
      {
        title: "Node Web App Development",
        description:
          "Hire Node js programmers to develop feature-rich, real-time web applications using Node.js, ensuring optimal performance and user engagement.",
        image: "/icons/web.svg",
        alt: "Node Web App Development",
        width: 56,
        height: 45,
      },
      {
        title: "Node.js App Migration",
        description:
          "Hire node js experts to migrate legacy systems to Node.js, enhancing scalability, performance, and compatibility with modern application architectures.",
        image: "/icons/migration.svg",
        alt: "Node.js App Migration",
        width: 45,
        height: 45.73,
      },
    ],
  },

  // Golang Developer (using same icons as Node.js)
  "golang-developer": {
    slug: "golang-developer",
    mainTitle: "Golang Microservices Development",
    mainSubtitle: "Building high-performance, concurrent, and scalable Go applications with precision and reliability.",
    offerings: [
      {
        title: "Golang Microservices Development",
        description:
          "Our Golang developers specialize in creating lightweight, scalable microservice architectures, ensuring faster, more efficient app performance.",
        image: "/icons/api.svg",
        alt: "Golang API Development",
        width: 45,
        height: 45,
      },
      {
        title: "Golang AI Development Solutions",
        description:
          "Our Go programmers deliver intelligent AI-powered solutions tailored to enhance business operations, improve error handling, and automate complex processes.",
        image: "/icons/web.svg",
        alt: "Microservices Development",
        width: 56,
        height: 45,
      },
      {
        title: "Golang Cloud App Developmentt",
        description:
          "Hire Go developers to help you develop complex cloud solutions for flexibility and reliability across cloud platforms like AWS, Google Cloud, and Azure.",
        image: "/icons/cms.svg",
        alt: "Go CLI Tool Development",
        width: 45,
        height: 45,
      },
      {
        title: "Reduce Development Costs and Time",
        description:
          "Our Golang developers ensure the timely delivery of high-performance applications, allowing you to save both time and money without compromising on quality.",
        image: "/icons/migration.svg",
        alt: "System Software Development",
        width: 45,
        height: 45.73,
      },
    ],
  },

  // Default fallback (also using same icons)
  default: {
    slug: "default",
    mainTitle: "Excellence of Our Developers",
    mainSubtitle: "Building powerful, scalable applications with precision, performance, and technical excellence.",
    offerings: [
      {
        title: "Custom Development",
        description:
          "Hire developers to create custom solutions tailored to your specific business needs and requirements.",
        image: "/icons/cms.svg",
        alt: "Custom Development",
        width: 45,
        height: 45,
      },
      {
        title: "API Development",
        description:
          "We develop secure, high-performance APIs ensuring efficient communication and robust integrations.",
        image: "/icons/api.svg",
        alt: "API Development",
        width: 45,
        height: 45,
      },
      {
        title: "Web Application Development",
        description:
          "Hire programmers to develop feature-rich, responsive web applications ensuring optimal performance.",
        image: "/icons/web.svg",
        alt: "Web Application Development",
        width: 56,
        height: 45,
      },
      {
        title: "Application Migration",
        description:
          "Hire experts to migrate legacy systems to modern technologies, enhancing scalability and performance.",
        image: "/icons/migration.svg",
        alt: "Application Migration",
        width: 45,
        height: 45.73,
      },
    ],
  },
};

// Helper functions
export function getExcellenceOfferingsData(slug: string): ExcellenceOfferingsData {
  return excellenceOfferingsData[slug] || excellenceOfferingsData["default"];
}

export function getAllExcellenceOfferingsSlugs(): string[] {
  return Object.keys(excellenceOfferingsData);
}
