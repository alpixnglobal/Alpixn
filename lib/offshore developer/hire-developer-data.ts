export interface ServiceItem {
  title: string;
  desc: string;
}

export interface HireDeveloperData {
  slug: string;
  title: string;
  subtitle: string;
  services: ServiceItem[];
}

export const hireDeveloperData: Record<string, HireDeveloperData> = {
  // Node.js Developer
  "nodejs-developer": {
    slug: "nodejs-developer",
    title: "Hire Nodejs developers for Reliable Software Solutions",
    subtitle:
      "Our Node.js development services provide businesses with scalable, high-performance applications, seamless API integration, real-time data processing capabilities, robust security, microservices architecture, and reduced development costs and time, all tailored to meet your specific needs and goals.",
    services: [
      {
        title: "Custom Node.js Development",
        desc: "Hire Node.js developers to create tailored applications that meet specific business needs, delivering innovative solutions with robust, scalable architectures.",
      },
      {
        title: "Enterprise Node.js Web Apps",
        desc: "Hire Node.js development experts to build enterprise-grade web applications that ensure seamless performance and meet complex organizational demands.",
      },
      {
        title: "Node.js Application Modernization",
        desc: "Modernize legacy systems by hiring Node.js consultants for efficient upgrades, enhanced compatibility, and performance improvements using the latest technologies.",
      },
      {
        title: "Microservice Architecture Development",
        desc: "Hire Node.js programmers to design and implement modular microservices, ensuring flexibility, scalability, and seamless integration.",
      },
      {
        title: "Real-Time Chat Apps",
        desc: "Build feature-rich real-time chat applications with our Node.js experts for enhanced communication, user engagement, and scalability.",
      },
      {
        title: "Node.js Plugin Development",
        desc: "Hire Node.js developers to create custom plugins that extend your application's functionality and optimize performance for specific requirements.",
      },
      {
        title: "Node.js Developer Augmentation",
        desc: "Hire dedicated node js developers to augment your existing team, accelerating project delivery and enhancing technical expertise.",
      },
      {
        title: "Node.js Development Consulting",
        desc: "Find Node.js developers to guide your project with expert consulting, addressing challenges and ensuring optimal implementation strategies.",
      },
      {
        title: "Node.js Maintenance and Support",
        desc: "Hire remote Node.js developers for maintenance and support services, keeping your application secure, updated, and performing optimally.",
      },
    ],
  },

  // Golang Developer
  "golang-developer": {
    slug: "golang-developer",
    title: "Hire Golang Developers for Reliable Software Solutions",
    subtitle:
      "Hire our expert Go developers for efficient, reliable software development. We specialize in streamlining the app development process, delivering cutting-edge solutions for cloud services, mobile apps, full-stack development, and much more.",
    services: [
      {
        title: "Full-Stack Development with Go",
        desc: "Our full-stack Go developers provide complete development services, from front-end interfaces to back-end infrastructure, ensuring smooth, unified application performance across every layer.",
      },
      {
        title: "Go for Cloud and Network Services",
        desc: "Our Golang developers are experts in building secure, scalable cloud and network services, ensuring that your infrastructure can handle growing demands and data loads effectively.",
      },
      {
        title: "Golang for Mobile Development",
        desc: "Leverage our Golang expertise to develop fast, secure mobile applications that work seamlessly across platforms. We build apps that are scalable and adaptable to future advancements.",
      },
      {
        title: "Streamlined Apps Development",
        desc: "We streamline your app development process with Golang. Hire Golang developers to create cross-platform apps, delivering high-performance, scalable, and efficient software solutions tailored to your specific business needs.",
      },
      {
        title: "Migration and Upgrade",
        desc: "Our Go language developers ensure smooth migration execution to migrate your existing project to Golang-based architecture. Our Golang developers also test and optimize various project components as needed.",
      },
      {
        title: "Multi-chain solution",
        desc: "We build robust, decentralized multi-chain blockchain solutions using Golang, offering expertise in various web3 tools, frameworks, and tech stacks. Our Golang developers deliver interoperable and secure multi-chain solutions.",
      },
      {
        title: "Golang Consulting",
        desc: "Hire Golang developers for expert consulting, guiding your team through Golang-based architecture, system design, and best practices for optimal project performance.",
      },
      {
        title: "Golang Application Modernization",
        desc: "Hire dedicated Golang developers to modernize your legacy applications, enhancing scalability, performance, and reliability with the latest Golang features and techniques.",
      },
      {
        title: "Go Routine Concurrency",
        desc: "Leverage Golang’s powerful concurrency model by hiring Golang programmers skilled in Go Routines to efficiently manage multiple tasks concurrently for high-performance systems.",
      },
    ],
  },

  // Default fallback
  default: {
    slug: "default",
    title: "Hire developers for Reliable Software Solutions",
    subtitle:
      "Our development services provide businesses with scalable, high-performance applications, seamless API integration, real-time data processing capabilities, robust security, microservices architecture, and reduced development costs and time, all tailored to meet your specific needs and goals.",
    services: [
      {
        title: "Custom Development",
        desc: "Hire developers to create tailored applications that meet specific business needs, delivering innovative solutions with robust, scalable architectures.",
      },
      {
        title: "Enterprise Web Applications",
        desc: "Hire development experts to build enterprise-grade web applications that ensure seamless performance and meet complex organizational demands.",
      },
      {
        title: "Application Modernization",
        desc: "Modernize legacy systems by hiring consultants for efficient upgrades, enhanced compatibility, and performance improvements using the latest technologies.",
      },
      {
        title: "Microservice Architecture",
        desc: "Hire programmers to design and implement modular microservices, ensuring flexibility, scalability, and seamless integration.",
      },
      {
        title: "Real-Time Applications",
        desc: "Build feature-rich real-time applications with our experts for enhanced communication, user engagement, and scalability.",
      },
      {
        title: "Plugin & Extension Development",
        desc: "Hire developers to create custom plugins that extend your application's functionality and optimize performance for specific requirements.",
      },
      {
        title: "Developer Augmentation",
        desc: "Hire dedicated developers to augment your existing team, accelerating project delivery and enhancing technical expertise.",
      },
      {
        title: "Development Consulting",
        desc: "Find developers to guide your project with expert consulting, addressing challenges and ensuring optimal implementation strategies.",
      },
      {
        title: "Maintenance and Support",
        desc: "Hire remote developers for maintenance and support services, keeping your application secure, updated, and performing optimally.",
      },
    ],
  },
};

// Helper functions
export function getHireDeveloperData(slug: string): HireDeveloperData {
  return hireDeveloperData[slug] || hireDeveloperData["default"];
}

export function getAllHireDeveloperSlugs(): string[] {
  return Object.keys(hireDeveloperData);
}
