export interface PartnerItem {
  title: string;
  text: string;
}

export interface PartnerTeamData {
  slug: string;
  mainTitle: string;
  buttonText: string;
  buttonLink: string;
  items: PartnerItem[];
}

export const partnerTeamData: Record<string, PartnerTeamData> = {
  // Node.js Developer
  "nodejs-developer": {
    slug: "nodejs-developer",
    mainTitle: "Why Partner with Our Dedicated Node.js Development Team",
    buttonText: "Talk With Expert",
    buttonLink: "/contact?service=nodejs",
    items: [
      {
        title: "Stable & Secured Solutions",
        text: "Hire nodejs developers to deliver stable, secure applications. Our Node.js development team ensures robust architectures and data protection for every project.",
      },
      {
        title: "Superior Quality of Work",
        text: "Hire node js programmers skilled in crafting high-performance solutions with clean, maintainable code that exceeds industry standards and client expectations.",
      },
      {
        title: "Full Stack Developers",
        text: "Hire full-stack Node.js developers who excel in frontend and backend development, ensuring seamless application functionality and dynamic user experiences.",
      },
      {
        title: "Cost Effectiveness",
        text: "Collaborate with our hire node js development company to access expert developers at competitive rates, optimizing your investment without compromising on quality.",
      },
    ],
  },

  // Golang Developer
  "golang-developer": {
    slug: "golang-developer",
    mainTitle: "Why Partner with Our Dedicated Golang Development Team",
    buttonText: "Talk With Expert",
    buttonLink: "/contact?service=golang",
    items: [
      {
        title: "Industry expert Go developers",
        text: "Our Go developers are seasoned professionals with experience in diverse industries. They bring top-notch expertise to ensure high-quality, scalable, and efficient solutions tailored to your business needs.",
      },
      {
        title: "Agile Working Model",
        text: "We follow the Agile methodology for faster, more adaptable development cycles. This approach allows us to respond quickly to changes and deliver solutions that align with your evolving project goals.",
      },
      {
        title: "Full Stack Developers",
        text: "Our full-time Golang developers provide end-to-end services, from front-end user interfaces to back-end systems such as ReactJS, AngularJS, MongoDB, Strings, Docker, Vuejs, and more.",
      },
      {
        title: "24*7 Support",
        text: "We provide 24/7 support to ensure the continuous and efficient functioning of your Golang applications. Our dedicated team of Go developers is always available to resolve any issues and keep high-load systems running smoothly.",
      },
    ],
  },

  // Default fallback
  default: {
    slug: "default",
    mainTitle: "Why Partner with Our Dedicated Development Team",
    buttonText: "Talk With Expert",
    buttonLink: "/contact",
    items: [
      {
        title: "Reliable Solutions",
        text: "Hire developers to deliver stable, secure applications with robust architectures and comprehensive data protection.",
      },
      {
        title: "Quality Excellence",
        text: "Hire programmers skilled in crafting high-quality solutions with clean, maintainable code that exceeds industry standards.",
      },
      {
        title: "Expert Developers",
        text: "Hire full-stack developers who excel in both frontend and backend development for seamless application functionality.",
      },
      {
        title: "Cost Optimization",
        text: "Collaborate with our development team to access expert developers at competitive rates without compromising on quality.",
      },
    ],
  },
};

// Helper functions
export function getPartnerTeamData(slug: string): PartnerTeamData {
  return partnerTeamData[slug] || partnerTeamData["default"];
}

export function getAllPartnerTeamSlugs(): string[] {
  return Object.keys(partnerTeamData);
}
