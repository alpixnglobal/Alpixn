export interface BannerHeroData {
  slug: string;
  heroTitle: string;
  heroSubtitle?: string;
  heroDescription: string;
  category: string;
  ctaButtonText?: string;
  logos?: string[];
  heroBackgroundImage?: string;
}

export const expertiseBannerData: Record<string, BannerHeroData> = {
  // ============ SOFTWARE SOLUTIONS ============

  // 1. Software Development Services
  "software-development": {
    slug: "software-development",
    category: "software-solution",
    heroTitle: "Software Development Services",
    heroDescription:
      "Custom software development services to build scalable, robust, and high-performance applications tailored to your business needs with modern technologies and agile methodologies.",
    ctaButtonText: "Book a Free Consultation",
    logos: ["/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png"],
    heroBackgroundImage: "/images/expertise-hero-bg.png",
  },

  // 2. Web Applications
  "web-app-development": {
    slug: "web-app-development",
    category: "software-solution",
    heroTitle: "Web Application Development Services",
    heroDescription:
      "We offer end-to-end web application development services, from ideation and design to development, testing, and deployment. We build innovative web apps integrating the latest technologies like PostgreSQL, MongoDB, Angular, Node.js, React, and Python to streamline complex business operations.",
    ctaButtonText: "Book a Free Consultation",
    logos: ["/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png"],
    heroBackgroundImage: "/images/expertise-hero-bg.png",
  },

  // 3. Mobile Applications
  "mobile-app-development": {
    slug: "mobile-app-development",
    category: "software-solution",
    heroTitle: "Mobile App Development Company",
    heroDescription:
      "ALPIXN provides end-to-end mobile app development services, from planning and design to deployment and optimization. We help organizations accelerate innovation and ROI with secure, scalable, and market-ready mobile applications.",
    ctaButtonText: "Book a Free Consultation",
    logos: ["/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png"],
    heroBackgroundImage: "/images/expertise-hero-bg.png",
  },

  // 4. Integration Services
  "api-integration": {
    slug: "api-integration",
    category: "software-solution",
    heroTitle: "API Integration & Development Service",
    heroDescription:
      "At ALPIXN, we streamline your business with custom API development and integration services tailored for web, mobile, and cloud applications. Our certified developers work across platforms, using protocols like REST, SOAP, and JSON, and different API authentication methods, including basic OAuth, OAuth1, OAuth2, JSON Web Token (JWT), SAML, and many more. Our IT services drive modernization, ensuring a synchronized and streamlined digital ecosystem.",
    ctaButtonText: "Book a Free Consultation",
    logos: ["/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png"],
    heroBackgroundImage: "/images/expertise-hero-bg.png",
  },

  // 5. Legacy Modernization
  "application-modernization": {
    slug: "application-modernization",
    category: "software-solution",
    heroTitle: "Application Modernization Services",
    heroDescription:
      "Transform your legacy applications into modern, cloud-native systems with enhanced performance, scalability, and security. We migrate outdated systems to contemporary architectures using microservices, containers, and modern frameworks.",
    ctaButtonText: "Book a Free Consultation",
    logos: ["/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png"],
    heroBackgroundImage: "/images/expertise-hero-bg.png",
  },

  // 6. Design & User Experience
  "ui-ux-services": {
    slug: "ui-ux-services",
    category: "software-solution",
    heroTitle: "UI/UX Design Services",
    heroDescription:
      "Comprehensive UI/UX design services focused on creating intuitive, engaging, and user-centered digital experiences. We combine research, prototyping, and testing to deliver interfaces that enhance user satisfaction and drive business growth.",
    ctaButtonText: "Book a Free Consultation",
    logos: ["/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png"],
    heroBackgroundImage: "/images/expertise-hero-bg.png",
  },

  // 7. Cloud-Based Solutions
  "saas-development": {
    slug: "saas-development",
    category: "software-solution",
    heroTitle: "SaaS Development Company",
    heroDescription:
      "End-to-end SaaS product development services for building scalable, multi-tenant software solutions. We develop cloud-based applications with subscription management, automated billing, and enterprise-grade security features.",
    ctaButtonText: "Book a Free Consultation",
    logos: ["/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png"],
    heroBackgroundImage: "/images/expertise-hero-bg.png",
  },

  // 8. Team Augmentation
  "staff-augmentation": {
    slug: "staff-augmentation",
    category: "software-solution",
    heroTitle: "Staff Augmentation Services",
    heroDescription:
      "Flexible staff augmentation services to scale your development team with skilled engineers, designers, and QA professionals. We provide dedicated resources that integrate seamlessly with your existing workflows and processes.",
    ctaButtonText: "Book a Free Consultation",
    logos: ["/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png"],
    heroBackgroundImage: "/images/expertise-hero-bg.png",
  },

  // 9. Data & Analytics
  "data-analytics": {
    slug: "data-analytics",
    category: "software-solution",
    heroTitle: "Data Analytics Services",
    heroDescription:
      "Advanced data analytics solutions to transform raw data into actionable insights. We develop custom analytics platforms, business intelligence dashboards, and predictive models to support data-driven decision making.",
    ctaButtonText: "Book a Free Consultation",
    logos: ["/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png"],
    heroBackgroundImage: "/images/expertise-hero-bg.png",
  },

  // 10. Cloud Infrastructure
  "cloud-consulting": {
    slug: "cloud-consulting",
    category: "software-solution",
    heroTitle: "Cloud Consulting Services",
    heroDescription:
      "Expert cloud consulting and migration services for AWS, Azure, and Google Cloud Platform. We help organizations optimize their cloud infrastructure, reduce costs, and improve scalability through strategic cloud adoption.",
    ctaButtonText: "Book a Free Consultation",
    logos: ["/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png"],
    heroBackgroundImage: "/images/expertise-hero-bg.png",
  },

  // 11. DevOps & Automation
  "devops-services": {
    slug: "devops-services",
    category: "software-solution",
    heroTitle: "DevOps Services",
    heroDescription:
      "Comprehensive DevOps services to automate software delivery and infrastructure management. We implement CI/CD pipelines, container orchestration, and infrastructure as code to accelerate development cycles and improve reliability.",
    ctaButtonText: "Book a Free Consultation",
    logos: ["/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png"],
    heroBackgroundImage: "/images/expertise-hero-bg.png",
  },

  // 12. Rapid Development
  "low-code-no-code": {
    slug: "low-code-no-code",
    category: "software-solution",
    heroTitle: "Low-Code/No-Code Development",
    heroDescription:
      "Rapid application development using low-code and no-code platforms to accelerate digital transformation. We build business applications with minimal coding, reducing development time and costs while maintaining quality.",
    ctaButtonText: "Book a Free Consultation",
    logos: ["/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png"],
    heroBackgroundImage: "/images/expertise-hero-bg.png",
  },

  // 13. Enterprise Systems
  "enterprise-software": {
    slug: "enterprise-software",
    category: "software-solution",
    heroTitle: "Enterprise Software Development",
    heroDescription:
      "Custom enterprise software solutions tailored to large organizations' complex needs. We develop scalable ERP, CRM, HRMS, and supply chain management systems that integrate with existing enterprise architecture.",
    ctaButtonText: "Book a Free Consultation",
    logos: ["/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png"],
    heroBackgroundImage: "/images/expertise-hero-bg.png",
  },

  // 14. Outsourcing
  "software-outsourcing": {
    slug: "software-outsourcing",
    category: "software-solution",
    heroTitle: "Software Outsourcing Services",
    heroDescription:
      "Complete software outsourcing solutions with dedicated development teams, project management, and quality assurance. We provide end-to-end software development services while you focus on core business operations.",
    ctaButtonText: "Book a Free Consultation",
    logos: ["/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png"],
    heroBackgroundImage: "/images/expertise-hero-bg.png",
  },

  // 15. CRM Systems
  "crm-development": {
    slug: "crm-development",
    category: "software-solution",
    heroTitle: "CRM Development Services",
    heroDescription:
      "Custom CRM software development to manage customer relationships, sales pipelines, and marketing automation. We build CRM systems that centralize customer data and streamline communication across departments.",
    ctaButtonText: "Book a Free Consultation",
    logos: ["/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png"],
    heroBackgroundImage: "/images/expertise-hero-bg.png",
  },

  // 16. ERP Systems
  "erp-software": {
    slug: "erp-software",
    category: "software-solution",
    heroTitle: "ERP Software Development",
    heroDescription:
      "Custom ERP software solutions that integrate finance, inventory, production, and human resources management. We develop scalable ERP systems that streamline business processes and provide real-time operational insights.",
    ctaButtonText: "Book a Free Consultation",
    logos: ["/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png", "/images/logoipsum.png"],
    heroBackgroundImage: "/images/expertise-hero-bg.png",
  },
};

// Helper functions
export function getBannerHeroData(slug: string): BannerHeroData | null {
  return expertiseBannerData[slug] || null;
}

export function getAllBannerSlugs(): string[] {
  return Object.keys(expertiseBannerData);
}
