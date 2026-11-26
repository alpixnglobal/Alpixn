import type { TechnologyPageRecord } from "@/lib/content-types";
import { technologyHeroData } from "@/lib/technologyData";

type TechnologySeedRecord = Omit<TechnologyPageRecord, "_id">;

function cloneValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

const technologyTemplate: Omit<
  TechnologySeedRecord,
  "slug" | "category" | "order" | "isPublished" | "isLanding" | "heroSubtitle" | "heroTitle" | "heroDescription"
> = {
  heroPrimaryButtonLabel: "Get Started",
  heroPrimaryButtonHref: "/contact-us",
  heroSecondaryButtonLabel: "Book a Call With Our Expert",
  heroSecondaryButtonHref: "/contact-us",
  heroLogos: Array.from({ length: 7 }, (_, index) => ({
    label: `Logo Ipsum ${index + 1}`,
    imageData: "/images/logoipsum.png",
    href: "#",
  })),
  challengesTitle: "Challenges We'll Assist You Resolve with Our Node.JS Development Services",
  challengeCards: [
    {
      title: "Seamless Microservices Integration",
      description:
        "Axano Software Private Limited Node JS development services ensure seamless microservices integration, helping you enhance scalability, reduce deployment times, and streamline resource management.",
      imageData: "/images/mask-microservices.png",
      linkLabel: "Learn More",
    },
    {
      title: "Single-Threaded Performance Limitations",
      description:
        "Surmount the limitations of single-threaded operations with our optimized Node.js solutions, assuring high performance and optimal utilization of your server’s resources for real-time applications.",
      imageData: "/images/thread.svg",
      linkLabel: "",
    },
    {
      title: "High-Performance Code Quality and Maintainability Services",
      description:
        "Axano Software Private Limited, an industry-leading Node JS development agency specializes in delivering clean, maintainable, and excellent-quality code, enhancing long-term performance and scalability.",
      imageData: "/images/quality.svg",
      linkLabel: "",
    },
    {
      title: "Advanced Memory Leak Detection",
      description:
        "As part of our Node JS consulting services, Jellyfish Technologies provides expert memory management and leak detection solutions, ensuring your application remains efficient and reliable.",
      imageData: "/images/mask-leak-detection.png",
      linkLabel: "",
    },
  ],
  unlockTitle: "Unlock next-level performance with Our Node.js web development services",
  unlockButtonLabel: "Connect With Us",
  unlockButtonHref: "/contact-us",
  talkTitle: "Expert Node.js Development: Making the Complex Effortlessly Simple",
  talkButtonLabel: "Talk With Expert",
  talkButtonHref: "/contact-us",
  talkCards: [
    {
      title: "Customizable Microservices Architectures",
      description:
        "Our Node.js experts design modular microservices architectures to ensure system scalability and flexibility, delivering robust, fault-tolerant solutions customized to your unique project needs.",
    },
    {
      title: "Serverless Architecture Solutions",
      description:
        "Leverage our serverless architecture solutions to improve scalability, expedite deployment, and lower infrastructure overhead. Our expertise guarantees cost-efficient, event-driven systems built to manage unpredictable traffic effortlessly.",
    },
    {
      title: "High-Performance Caching Strategies",
      description:
        "We implement high-performance caching strategies that significantly increase the speed and efficiency of applications, ensuring minimal latency and effective resource management in large-scale, high-demand settings.",
    },
    {
      title: "Automated Testing and CI/CD Pipelines",
      description:
        "Our Node.js development agency integrates automated testing and continuous integration/continuous delivery (CI/CD) pipelines, ensuring faster development with fewer bugs and higher code quality with each release.",
    },
  ],
  successTitle: "Node.js Development Services That Propel Success",
  successCards: [
    {
      title: "Stable & Secured Solutions",
      description:
        "As a leading Node.js development company, we specialize in creating high-performing, scalable custom apps tailored to specific business requirements. Our seasoned developers ensure faultless functionality and optimized performance, giving you an advantage in a cutthroat industry.",
    },
    {
      title: "Dynamic Real-Time Web/Mobile Apps",
      description:
        "Axano Software Private Limited excels in creating real-time, responsive web and mobile applications using Node JS. We deliver rapid, dynamic solutions that improve customer engagement and are perfect for sectors like e-commerce, live streaming, and gaming that demand real-time updates.",
    },
    {
      title: "API Development and Integration",
      description:
        "Axano Software Private Limited excels in creating real-time, responsive web and mobile applications using Node JS. We deliver rapid, dynamic solutions that improve customer engagement and are perfect for sectors like e-commerce, live streaming, and gaming that demand real-time updates.",
    },
    {
      title: "Node.js Microservices Development",
      description:
        "Jellyfish Technologies is a leading Node.js development agency specializing in microservices architecture, empowering businesses with modular, scalable solutions. With our expertise, you may build robust systems that streamline intricate procedures, making development cycles quicker.",
    },
    {
      title: "Node.js Code Audit & QA Services",
      description:
        "Ensure the quality and security of your codebase with Axano Software Private Limited Node.js code review and quality assurance services. Our professionals offer detailed evaluations, pinpointing obstacles and weaknesses to deliver high-performing, secure tailored applications.",
    },
    {
      title: "Scalable Cloud Apps with Node.js",
      description:
        "Axano Software Private Limited, a leading Node.js web development company, builds scalable, secure cloud-based applications. We harness the power of cloud infrastructure to provide effective, affordable solutions that enable your business to thrive in a modern digital environment.",
    },
    {
      title: "Serverless Architecture Development",
      description:
        "Axano Software Private Limited offers expert Serverless Architecture Development using Node.js, enabling businesses to build scalable, cost-efficient applications without server management. Leverage cloud-native solutions for faster deployment, seamless scalability, and lower overhead.",
    },
    {
      title: "Node.js Migration Services",
      description:
        "Looking to transition to a more efficient platform? Axano Software Private Limited offers smooth Node.js migration services, helping businesses upgrade their systems with minimal disruption. Our migration solutions ensure improved performance, security, and long-term scalability.",
    },
    {
      title: "Node.js Consulting Services",
      description:
        "We provide expert Node.js consulting services, guiding businesses through every stage of development. Our consultants offer strategic insights and best practices, ensuring your project’s success from conception to launch, making us a trusted partner for app development.",
    },
  ],
  provenTitle: "Our Node.js Developers: Proven Pioneers",
  provenDescription:
    "At Axano Technologies Private Limited, our Node.js developers are true industry trailblazers, utilizing evolved expertise and avant techniques to spur creativity. As leaders in Node JS development, we create customized, high-performance apps tailored to your requirements, guaranteeing exceptional results and raising the bar for technological brilliance.",
  provenCaseStudies: [
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
        "Heffernan, a leading US insurance brokerage, partnered with Jellyfish Technologies to develop a secure internal application for daily client data storage. The solution included robust authentication, responsive UI, file storage, and report generation, resulting in a fast and secure data management system.",
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
  guidanceTitle: "Elevate Your Project with Expert Guidance.",
  guidanceButtonLabel: "Talk With Expert",
  guidanceButtonHref: "/contact-us",
  qualityEyebrow: "Quality-Focused Proficiency",
  qualityTitle: "What makes Node.js ideal for scalable applications?",
  qualityDescription:
    "Node.js demonstrates exceptional performance in creating scalable applications through its unique architecture. Its non-blocking I/O model, coupled with an event-driven approach and high concurrency capabilities, facilitates swift development and effective resource utilization, ensuring your applications grow while maintaining optimal performance.",
  qualityPoints: [
    {
      title: "Non-Blocking I/O",
      description:
        "In Node.js, non-blocking I/O is a fundamental concept that enables its asynchronous and event-driven programming model, ensuring high concurrency, scalability, and performance, ideal for building modern web servers, APIs, and microservices.",
    },
    {
      title: "Single-Threaded Event Loop",
      description:
        "Node.js’s single-threaded event loop, combined with its non-blocking I/O model and thread pool for handling blocking operations, allows the building of highly scalable, responsive applications that make efficient use of system resources.",
    },
    {
      title: "Scalable Microservices",
      description:
        "By embracing microservices architecture with its asynchronous nature, rich ecosystem, and seamless integration with containerization, Node.js facilitates the creation of scalable, maintainable, and resilient applications.",
    },
    {
      title: "High Throughput",
      description:
        "The high throughput capabilities of Node JS make it a preferred choice for expert backend developers seeking to build scalable and efficient web solutions, handling significant traffic while maintaining performance.",
    },
    {
      title: "Unified Codebase",
      description:
        "A unified codebase in Node JS simplifies development, allowing client-side and server-side code to be written in JavaScript. This course streamlines the development process, enabling teams to work cohesively using the same language across the entire stack.",
    },
    {
      title: "Horizontal Scaling",
      description:
        "Node.js supports horizontal scaling, including techniques like clustering, load balancing, containerization, message queues, and content delivery networks (CDNs), ensuring efficient handling of increasing traffic demands.",
    },
    {
      title: "Rapid Development",
      description:
        "Node.js’s rapid development framework provides pre-built components, reduces coding overhead, allows for quick iterations, and accelerates project timelines, making it a preferred choice for clients looking to deploy robust solutions quickly.",
    },
    {
      title: "Lightweight Framework",
      description:
        "Node.js is recognized for its lightweight framework, significantly lowering overhead and improving application performance. This feature particularly benefits businesses looking to build scalable and efficient applications.",
    },
  ],
  stackTitle: "Technology Stack We Use For Node.js Development",
  stackItems: [
    { label: "Jest", imageData: "/images/jest.svg" },
    { label: "Mongoose", imageData: "/images/mongoose.svg" },
    { label: "Nest Js", imageData: "/images/nestjs.svg" },
    { label: "Sequelize", imageData: "/images/sequelize.svg" },
    { label: "Socket", imageData: "/images/socket.svg" },
    { label: "Eslint", imageData: "/images/eslint.svg" },
    { label: "Jquery", imageData: "/images/jquery.svg" },
    { label: "Lodas", imageData: "/images/lodas.svg" },
    { label: "TypeScript", imageData: "/images/typescript.svg" },
    { label: "Webpack", imageData: "/images/webpack.svg" },
  ],
  leaderTitle: "What Makes Us an Industry Leader?",
  leaderStats: [
    { value: "14+", label: "Years in Experience" },
    { value: "150+", label: "Full-Time Experts" },
    { value: "98%", label: "On-Time Projects Delivered" },
    { value: "250+", label: "Projects Delivered" },
    { value: "93%", label: "Repeated Client" },
  ],
  engagementTitle: "Engagement Models to Hire Dedicated Node.js Developers",
  engagementDescription:
    "Jellyfish Technologies offers versatile engagement models for Node.js application development services, providing innovative solutions. Get the best fit for your business.",
  engagementModels: [
    {
      title: "Dedicated Team",
      description:
        "We craft a bespoke offshore NodeJS team that integrates seamlessly with your company. Our custom software development experts immerse themselves fully in your project, aligning perfectly with your vision to deliver exceptional, high-quality results at every stage.",
      bullets: [
        "Client-Centric Approach",
        "Direct Reporting and Transparency",
        "Scalability and Flexibility",
        "Quality and Efficiency",
      ],
    },
    {
      title: "Team Augmentation",
      description:
        "With ‘Team Augmentation’ model, we elevate your in-house team when you hire Node.js developers through our premier node.js outsourcing services. Our experts seamlessly complement your current staff, infusing advanced skills and ensuring flawless, collaborative synergy.",
      bullets: ["Tailored Expertise", "Seamless Integration", "Cost-Effective Solution", "Transparent Communication"],
    },
    {
      title: "Project-Based",
      description:
        "‘Project-Based’ model is ideal for organizations needing focused Node.js solutions from a top-tier node development company. We adopt a meticulous approach to managing risks and optimizing resources, ensuring your project meets deadlines, stays within budget, and precisely achieves its goals.",
      bullets: ["Fixed Budget", "Milestones and Deliverables", "Resource Allocation", "Risk Mitigation"],
    },
  ],
  faqTitle: "We’ve Got the Answers You’re Looking For",
  faqs: [
    {
      question: "How does node.js differ from other server-side programming languages?",
      answer:
        "Node.js uses an event-driven, non-blocking architecture that makes it especially effective for real-time systems, APIs, and high-concurrency applications. It helps teams move faster with JavaScript across both frontend and backend development.",
    },
    {
      question: "Which companies use node.js for software development?",
      answer:
        "Node.js is used by startups and large enterprises alike for dashboards, APIs, streaming platforms, marketplaces, and collaboration tools. It remains popular where teams need scalability, speed, and a broad ecosystem.",
    },
    {
      question: "Why should you outsource node.js development?",
      answer:
        "Outsourcing Node.js development can reduce hiring overhead, accelerate delivery, and provide access to specialists who already understand scalable architecture, APIs, testing, and deployment workflows.",
    },
    {
      question: "What kind of applications can you build using node.js?",
      answer:
        "Node.js works well for real-time apps, SaaS platforms, backend services, APIs, marketplaces, analytics systems, and high-traffic web platforms that benefit from fast I/O and modular services.",
    },
    {
      question: "What is the cost of node.js development?",
      answer:
        "The cost of Node.js development varies based on project complexity, scope, architecture, and team model. A quick discovery session usually helps define the right delivery approach and a more accurate estimate.",
    },
  ],
};

export function getTechnologyTemplate() {
  return cloneValue(technologyTemplate);
}

export function buildTechnologySeedRecords() {
  return Object.values(technologyHeroData).map((technology, index) => ({
    slug: technology.slug,
    category: technology.category,
    order: index + 1,
    isPublished: true,
    isLanding: technology.slug === "node-js",
    heroSubtitle: technology.heroSubtitle,
    heroTitle: technology.heroTitle,
    heroDescription: technology.heroDescription,
    ...getTechnologyTemplate(),
  })) satisfies TechnologySeedRecord[];
}
