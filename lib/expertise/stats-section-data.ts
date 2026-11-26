export interface StatsSectionData {
  slug: string;
  mainTitle: string;
  mainDescription: string;
  gridItems: Array<{
    title: string;
    description: string;
  }>;
}

export const expertiseStatsData: Record<string, StatsSectionData> = {
  // ============ SOFTWARE SOLUTIONS ============

  // 1. Core Development Services
  "software-development": {
    slug: "software-development",
    mainTitle: "Bespoke Software Development Service Tailored to Your Vision",
    mainDescription:
      "As a trusted custom software development company, we deliver purpose-built, scalable, tailored solutions, from bespoke services to enterprise platforms, that solve complex challenges and create lasting impact.",
    gridItems: [
      {
        title: "Custom Software Development Services",
        description:
          "As a leading custom software development company, we build secure, scalable, and future-ready solutions tailored to your unique business workflows, customer goals, and operational needs—from scratch to deployment.",
      },
      {
        title: "Custom Software Development Services",
        description:
          "Our custom enterprise software development services empower large organizations with robust, integrated systems that enhance productivity, improve data visibility, and support growth through scalable, secure architecture and automation.",
      },
      {
        title: "Custom Software Development Services",
        description:
          "We offer end-to-end software product development services, from idea validation and UX/UI design to development and launch, creating market-ready, innovative digital products that solve real-world problems and deliver business value.",
      },
      {
        title: "Software Consulting & Digital Strategy Services",
        description:
          "Our software consulting services help businesses assess their current systems, define future needs, and implement technology strategies that reduce risk, maximize ROI, and accelerate digital transformation through expert guidance.",
      },
      {
        title: "Offshore Software Development Services",
        description:
          "Our offshore software development services connect you with top global talent to deliver high-quality, scalable solutions at reduced costs. We ensure faster time-to-market, seamless collaboration, and complete transparency to align perfectly with your project goals.",
      },
      {
        title: "End-to-End Software Integration Services",
        description:
          "Through expert software integration services, we connect APIs, applications, and legacy systems, ensuring a seamless flow of real-time data, unified operations, and a cohesive technology ecosystem that enhances decision-making and efficiency.",
      },
    ],
  },

  // 2. Web Applications
  "web-app-development": {
    slug: "web-app-development",
    mainTitle: "Web App Development Services We Offer",
    mainDescription:
      "We offer custom web app development services, leveraging the right tech stack to build scalable, cost-effective solutions. Our team also handles tech consulting, application modernization, and seamless migration to new architectures.",
    gridItems: [
      {
        title: "Custom Web Apps Development",
        description:
          "We offer custom web app development services with end-to-end unique web product development for businesses across diverse industries. Our dynamic web applications are designed to digitize your internal operations, business transactions, and customer-facing services.",
      },
      {
        title: "Enterprise Web Apps",
        description:
          "Our enterprise web app development services include building enterprise solutions. We provide container deployment on private infrastructures using Docker, optimizing the applications. We also enable scalable integration through APIs and microservice architecture (MSA).",
      },
      {
        title: "Web Portals",
        description:
          "Our team of expert web developers creates a robust and feature-rich web presence with intuitive and responsive web portals. We offer high-end digital solutions, streamlining heavy workflows with high-quality support to make business applications secure and seamless.",
      },
      {
        title: "eCommerce Web Apps",
        description:
          "We offer high-tech eCommerce web application development services, from conceptualization to deployment. Our solutions are designed to provide a seamless shopping experience, robust payment gateways, and advanced inventory management capabilities, driving online business growth.",
      },
      {
        title: "SaaS Development",
        description:
          "With extensive experience in software-as-a-service (SaaS) development, we build cloud-based applications that are highly scalable and secure. Our SaaS solutions are designed to enhance productivity, improve collaboration, and provide real-time access to your business-critical data.",
      },
      {
        title: "Single-Page Applications (SPAs)",
        description:
          "Our team specializes in developing high-performance single-page web applications (SPAs) that offer smooth and responsive user experiences. We leverage modern JavaScript frameworks and libraries such as ReactJS and Angular to create feature-rich and interactive SPAs that deliver a native-like feel",
      },
    ],
  },

  // 3. Mobile Applications
  "mobile-app-development": {
    slug: "mobile-app-development",
    mainTitle: "Comprehensive Mobile App Development Services",
    mainDescription:
      "We develop secure, scalable, and market-ready mobile applications for iOS and Android platforms that accelerate innovation and ROI.",
    gridItems: [
      {
        title: "Native iOS Development",
        description:
          "High-performance iOS applications built with Swift and SwiftUI, following Apple's best practices for optimal user experience and app store compliance.",
      },
      {
        title: "Native Android Development",
        description:
          "Robust Android applications using Kotlin and Jetpack Compose, designed for various device sizes and Android versions with optimal performance.",
      },
      {
        title: "Cross-Platform Solutions",
        description:
          "Cost-effective cross-platform apps using React Native and Flutter that deliver native-like performance across iOS and Android.",
      },
      {
        title: "Enterprise Mobile Apps",
        description:
          "Secure enterprise mobile applications with features like offline functionality, data synchronization, and enterprise-grade security.",
      },
      {
        title: "UI/UX Mobile Design",
        description:
          "User-centered mobile app design focusing on intuitive navigation, engaging interfaces, and seamless user journeys across devices.",
      },
      {
        title: "App Maintenance & Support",
        description:
          "Ongoing app maintenance, updates, and support services to ensure optimal performance, security, and compatibility with OS updates.",
      },
    ],
  },

  // 4. Integration Services
  "api-integration": {
    slug: "api-integration",
    mainTitle: "Professional API Integration Services",
    mainDescription:
      "Seamless API integration solutions connecting your applications with third-party systems for efficient data flow and enhanced functionality.",
    gridItems: [
      {
        title: "RESTful API Integration",
        description:
          "Integration of RESTful APIs to enable smooth communication between different systems and services using standard HTTP methods.",
      },
      {
        title: "GraphQL API Implementation",
        description:
          "Modern GraphQL API implementations providing flexible data queries and reducing network overhead for improved application performance.",
      },
      {
        title: "Third-Party Service Integration",
        description:
          "Connect your applications with popular third-party services like payment gateways, CRM systems, and marketing platforms.",
      },
      {
        title: "Legacy System Integration",
        description:
          "Bridge the gap between legacy systems and modern applications through secure and reliable integration solutions.",
      },
      {
        title: "Real-time Data Sync",
        description:
          "Real-time data synchronization between different applications and databases to ensure data consistency across systems.",
      },
      {
        title: "API Security & Monitoring",
        description:
          "Comprehensive API security implementation with monitoring, rate limiting, and authentication to protect your data and services.",
      },
    ],
  },

  // 5. Legacy Modernization
  "application-modernization": {
    slug: "application-modernization",
    mainTitle: "Comprehensive Application Modernization Services",
    mainDescription:
      "Transform legacy applications into modern, cloud-native systems with enhanced performance, scalability, and security features.",
    gridItems: [
      {
        title: "Legacy System Migration",
        description:
          "Seamless migration of legacy applications to modern platforms while preserving business logic and ensuring data integrity.",
      },
      {
        title: "Cloud Migration Services",
        description:
          "Move applications to cloud platforms like AWS, Azure, or Google Cloud for improved scalability, reliability, and cost-efficiency.",
      },
      {
        title: "Microservices Architecture",
        description:
          "Break down monolithic applications into microservices for better scalability, maintainability, and faster deployment cycles.",
      },
      {
        title: "Containerization",
        description:
          "Containerize applications using Docker and Kubernetes for consistent deployment across different environments and improved resource utilization.",
      },
      {
        title: "UI/UX Modernization",
        description:
          "Modernize user interfaces with contemporary design patterns, responsive layouts, and improved user experience for legacy applications.",
      },
      {
        title: "Database Modernization",
        description:
          "Upgrade legacy databases to modern solutions with improved performance, scalability, and support for contemporary data needs.",
      },
    ],
  },

  // 6. Design & User Experience
  "ui-ux-services": {
    slug: "ui-ux-services",
    mainTitle: "Professional UI/UX Design Services",
    mainDescription:
      "We create intuitive, engaging, and user-centered digital experiences through comprehensive research, design, and testing processes.",
    gridItems: [
      {
        title: "User Research & Analysis",
        description:
          "In-depth user research to understand user needs, behaviors, and pain points, informing data-driven design decisions.",
      },
      {
        title: "Wireframing & Prototyping",
        description:
          "Create interactive wireframes and prototypes to visualize user flows, test concepts, and validate design approaches before development.",
      },
      {
        title: "Visual Design",
        description:
          "Craft visually appealing interfaces with consistent branding, typography, color schemes, and iconography that enhance user engagement.",
      },
      {
        title: "User Interface Design",
        description:
          "Design intuitive user interfaces focusing on usability, accessibility, and consistency across different devices and platforms.",
      },
      {
        title: "User Experience Design",
        description:
          "Optimize user journeys and interactions to create seamless, efficient, and enjoyable experiences that meet user goals and business objectives.",
      },
      {
        title: "Usability Testing",
        description:
          "Conduct usability tests with real users to identify issues, gather feedback, and refine designs for optimal performance and satisfaction.",
      },
    ],
  },

  // 7. Cloud-Based Solutions
  "saas-development": {
    slug: "saas-development",
    mainTitle: "Complete SaaS Development Services",
    mainDescription:
      "End-to-end SaaS product development for building scalable, multi-tenant software solutions with subscription management and enterprise-grade security.",
    gridItems: [
      {
        title: "Multi-Tenant Architecture",
        description:
          "Design and implement scalable multi-tenant architectures that securely serve multiple customers from a single application instance.",
      },
      {
        title: "Subscription Management",
        description:
          "Comprehensive subscription and billing systems supporting various pricing models, trial periods, and automated payment processing.",
      },
      {
        title: "User Onboarding & Management",
        description:
          "Streamlined user onboarding, account management, and role-based access control systems for efficient SaaS platform administration.",
      },
      {
        title: "API-First Development",
        description:
          "Build SaaS platforms with robust APIs that enable integration with other services and support third-party application development.",
      },
      {
        title: "Scalable Infrastructure",
        description:
          "Cloud-native infrastructure design ensuring high availability, performance, and scalability as your SaaS platform grows.",
      },
      {
        title: "Analytics & Reporting",
        description:
          "Built-in analytics dashboards and reporting tools providing insights into user behavior, system performance, and business metrics.",
      },
    ],
  },

  // 8. Team Augmentation
  "staff-augmentation": {
    slug: "staff-augmentation",
    mainTitle: "Professional Staff Augmentation Services",
    mainDescription:
      "Flexible staff augmentation solutions to scale your development team with skilled engineers, designers, and QA professionals for seamless integration.",
    gridItems: [
      {
        title: "Dedicated Developers",
        description:
          "Hire dedicated developers who integrate with your team and work exclusively on your projects with full commitment.",
      },
      {
        title: "Team Extension",
        description:
          "Extend your existing teams with our skilled professionals to accelerate project delivery and handle peak workloads.",
      },
      {
        title: "Project-Based Staffing",
        description:
          "Get specialized talent for specific project requirements with flexible engagement models and clear deliverables.",
      },
      {
        title: "Skill Gap Filling",
        description:
          "Fill skill gaps in your team with experts in specific technologies or domains to enhance your capabilities.",
      },
      {
        title: "Team Management",
        description:
          "We handle recruitment, onboarding, and management while you focus on project goals and business outcomes.",
      },
      {
        title: "Cost Optimization",
        description:
          "Optimize your development costs with flexible engagement models and competitive pricing without compromising quality.",
      },
    ],
  },

  // 9. Data & Analytics
  "data-analytics": {
    slug: "data-analytics",
    mainTitle: "Advanced Data Analytics Solutions",
    mainDescription:
      "Transform raw data into actionable insights with our comprehensive data analytics services and business intelligence solutions.",
    gridItems: [
      {
        title: "Business Intelligence",
        description:
          "Create interactive dashboards and reports that provide real-time insights into business performance and trends.",
      },
      {
        title: "Predictive Analytics",
        description:
          "Leverage machine learning algorithms to predict future trends, customer behavior, and business outcomes.",
      },
      {
        title: "Data Visualization",
        description:
          "Transform complex data into intuitive visual representations for better understanding and decision-making.",
      },
      {
        title: "Big Data Solutions",
        description: "Handle large volumes of data with scalable big data architectures and processing frameworks.",
      },
      {
        title: "Data Warehousing",
        description:
          "Design and implement data warehouses that centralize and organize data from multiple sources for analysis.",
      },
      {
        title: "Reporting Systems",
        description:
          "Develop automated reporting systems that deliver timely and accurate business metrics to stakeholders.",
      },
    ],
  },

  // 10. Cloud Infrastructure
  "cloud-consulting": {
    slug: "cloud-consulting",
    mainTitle: "Expert Cloud Consulting Services",
    mainDescription:
      "Strategic cloud consulting and migration services to optimize your infrastructure, reduce costs, and improve scalability.",
    gridItems: [
      {
        title: "Cloud Strategy",
        description:
          "Develop comprehensive cloud migration strategies aligned with your business goals and technical requirements.",
      },
      {
        title: "Cloud Migration",
        description:
          "Smooth migration of applications and data to cloud platforms with minimal downtime and maximum efficiency.",
      },
      {
        title: "Cost Optimization",
        description:
          "Optimize cloud spending with right-sizing, reserved instances, and efficient resource utilization strategies.",
      },
      {
        title: "Cloud Architecture",
        description:
          "Design scalable and resilient cloud architectures following best practices and industry standards.",
      },
      {
        title: "Security & Compliance",
        description:
          "Implement robust security measures and ensure compliance with industry regulations in cloud environments.",
      },
      {
        title: "Performance Monitoring",
        description:
          "Set up comprehensive monitoring and alerting systems to ensure optimal cloud performance and availability.",
      },
    ],
  },

  // 11. DevOps & Automation
  "devops-services": {
    slug: "devops-services",
    mainTitle: "Comprehensive DevOps Services",
    mainDescription:
      "Automate software delivery and infrastructure management with our end-to-end DevOps solutions and best practices.",
    gridItems: [
      {
        title: "CI/CD Pipeline",
        description:
          "Implement continuous integration and continuous deployment pipelines for automated testing and deployment.",
      },
      {
        title: "Infrastructure as Code",
        description: "Manage infrastructure through code for consistency, version control, and automated provisioning.",
      },
      {
        title: "Container Orchestration",
        description:
          "Set up and manage container orchestration platforms like Kubernetes for scalable application deployment.",
      },
      {
        title: "Monitoring & Logging",
        description:
          "Implement comprehensive monitoring, logging, and alerting systems for application and infrastructure.",
      },
      {
        title: "Automated Testing",
        description:
          "Set up automated testing frameworks and processes to ensure code quality and reduce manual effort.",
      },
      {
        title: "Security Automation",
        description:
          "Integrate security practices into the DevOps pipeline for continuous security testing and compliance.",
      },
    ],
  },

  // 12. Rapid Development
  "low-code-no-code": {
    slug: "low-code-no-code",
    mainTitle: "Low-Code/No-Code Development Solutions",
    mainDescription:
      "Accelerate digital transformation with rapid application development using low-code and no-code platforms.",
    gridItems: [
      {
        title: "Rapid Prototyping",
        description: "Quickly build and test application prototypes to validate ideas and gather user feedback.",
      },
      {
        title: "Business Process Automation",
        description: "Automate complex business processes with minimal coding using visual development tools.",
      },
      {
        title: "Internal Tools Development",
        description: "Create custom internal tools and applications to streamline operations and improve productivity.",
      },
      {
        title: "Workflow Automation",
        description: "Design and implement automated workflows that reduce manual effort and improve efficiency.",
      },
      {
        title: "Integration Solutions",
        description: "Connect different systems and applications using low-code integration platforms.",
      },
      {
        title: "Mobile App Development",
        description: "Build mobile applications quickly using low-code platforms with native capabilities.",
      },
    ],
  },

  // 13. Enterprise Systems
  "enterprise-software": {
    slug: "enterprise-software",
    mainTitle: "Enterprise Software Development Services",
    mainDescription:
      "Custom enterprise software solutions designed for large organizations with complex requirements and scalability needs.",
    gridItems: [
      {
        title: "ERP Systems",
        description: "Develop comprehensive Enterprise Resource Planning systems integrating all business operations.",
      },
      {
        title: "CRM Solutions",
        description:
          "Build Customer Relationship Management systems to manage customer interactions and sales processes.",
      },
      {
        title: "HRMS Platforms",
        description: "Create Human Resource Management Systems for efficient employee management and HR operations.",
      },
      {
        title: "Supply Chain Management",
        description: "Develop solutions for end-to-end supply chain visibility, planning, and optimization.",
      },
      {
        title: "Enterprise Portals",
        description:
          "Build integrated enterprise portals that provide single access points to various business systems.",
      },
      {
        title: "Compliance Systems",
        description:
          "Develop systems to ensure regulatory compliance and maintain audit trails for enterprise operations.",
      },
    ],
  },

  // 14. Outsourcing
  "software-outsourcing": {
    slug: "software-outsourcing",
    mainTitle: "Software Outsourcing Services",
    mainDescription:
      "Complete software outsourcing solutions with dedicated teams and comprehensive project management.",
    gridItems: [
      {
        title: "Dedicated Teams",
        description: "Get dedicated development teams that work exclusively on your projects with full commitment.",
      },
      {
        title: "Project-Based Outsourcing",
        description:
          "Outsource entire projects with clear scope, timelines, and deliverables for predictable outcomes.",
      },
      {
        title: "Quality Assurance",
        description:
          "Comprehensive testing and quality assurance services to ensure software reliability and performance.",
      },
      {
        title: "Project Management",
        description: "Expert project management ensuring timely delivery, budget adherence, and quality standards.",
      },
      {
        title: "Communication & Reporting",
        description: "Transparent communication and regular reporting to keep you informed about project progress.",
      },
      {
        title: "Risk Management",
        description: "Proactive risk identification and mitigation strategies to ensure project success.",
      },
    ],
  },

  // 15. CRM Systems
  "crm-development": {
    slug: "crm-development",
    mainTitle: "Custom CRM Development Services",
    mainDescription:
      "Tailored Customer Relationship Management systems designed to centralize customer data and streamline communication.",
    gridItems: [
      {
        title: "Sales Automation",
        description: "Automate sales processes, lead tracking, and opportunity management for improved efficiency.",
      },
      {
        title: "Customer Service",
        description: "Build customer service modules with ticket management, knowledge base, and support automation.",
      },
      {
        title: "Marketing Automation",
        description:
          "Implement marketing automation features for campaigns, email marketing, and customer segmentation.",
      },
      {
        title: "Analytics & Reporting",
        description: "Provide comprehensive analytics and reporting on customer interactions and business performance.",
      },
      {
        title: "Integration Capabilities",
        description:
          "Ensure seamless integration with other business systems like ERP, marketing tools, and communication platforms.",
      },
      {
        title: "Mobile Access",
        description: "Enable mobile access to CRM systems for sales teams and field service personnel.",
      },
    ],
  },

  // 16. ERP Systems
  "erp-software": {
    slug: "erp-software",
    mainTitle: "Custom ERP Software Development",
    mainDescription:
      "Scalable Enterprise Resource Planning systems that integrate and streamline all business processes.",
    gridItems: [
      {
        title: "Financial Management",
        description: "Develop comprehensive financial modules for accounting, budgeting, and financial reporting.",
      },
      {
        title: "Inventory Control",
        description: "Build inventory management systems with real-time tracking and optimization features.",
      },
      {
        title: "Supply Chain Management",
        description: "Create supply chain modules for procurement, logistics, and supplier relationship management.",
      },
      {
        title: "Human Resources",
        description: "Develop HR modules for employee management, payroll, and performance evaluation.",
      },
      {
        title: "Manufacturing & Production",
        description: "Build modules for production planning, scheduling, and quality control in manufacturing.",
      },
      {
        title: "Business Intelligence",
        description: "Integrate business intelligence tools for data analysis and strategic decision-making.",
      },
    ],
  },
};

//default fallback data
const defaultStatsData: StatsSectionData = {
  slug: "default",
  mainTitle: "Bespoke Software Development Service Tailored to Your Vision",
  mainDescription:
    "As a trusted custom software development company, we deliver purpose-built, scalable, tailored solutions, from bespoke services to enterprise platforms, that solve complex challenges and create lasting impact.",
  gridItems: [
    {
      title: "Custom Software Development Services",
      description:
        "As a leading custom software development company, we build secure, scalable, and future-ready solutions tailored to your unique business workflows, customer goals, and operational needs—from scratch to deployment.",
    },
    {
      title: "Custom Software Development Services",
      description:
        "Our custom enterprise software development services empower large organizations with robust, integrated systems that enhance productivity, improve data visibility, and support growth through scalable, secure architecture and automation.",
    },
    {
      title: "Custom Software Development Services",
      description:
        "We offer end-to-end software product development services, from idea validation and UX/UI design to development and launch, creating market-ready, innovative digital products that solve real-world problems and deliver business value.",
    },
    {
      title: "Software Consulting & Digital Strategy Services",
      description:
        "Our software consulting services help businesses assess their current systems, define future needs, and implement technology strategies that reduce risk, maximize ROI, and accelerate digital transformation through expert guidance.",
    },
    {
      title: "Offshore Software Development Services",
      description:
        "Our offshore software development services connect you with top global talent to deliver high-quality, scalable solutions at reduced costs. We ensure faster time-to-market, seamless collaboration, and complete transparency to align perfectly with your project goals.",
    },
    {
      title: "End-to-End Software Integration Services",
      description:
        "Through expert software integration services, we connect APIs, applications, and legacy systems, ensuring a seamless flow of real-time data, unified operations, and a cohesive technology ecosystem that enhances decision-making and efficiency.",
    },
  ],
};

// Helper function to never return null
export function getStatsData(slug: string): StatsSectionData {
  return expertiseStatsData[slug] || defaultStatsData;
}

export function getDefaultStatsData(): StatsSectionData {
  return expertiseStatsData["software-development"];
}
