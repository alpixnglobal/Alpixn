export interface TechnologyHeroData {
  slug: string;
  category: string;
  heroSubtitle: string;
  heroTitle: string;
  heroDescription: string;
}

export const technologyHeroData: Record<string, TechnologyHeroData> = {
  // ============ BACKEND TECHNOLOGIES ============
  "dot-net": {
    slug: "dot-net",
    category: "backend",
    heroSubtitle: "Enterprise-Grade .NET Solutions",
    heroTitle: ".NET Development Services",
    heroDescription:
      "Professional .NET development using C#, ASP.NET, and .NET Core for building scalable, secure, and high-performance enterprise applications with Microsoft technologies.",
  },
  sql: {
    slug: "sql",
    category: "backend",
    heroSubtitle: "Database Design & Optimization",
    heroTitle: "SQL Database Development",
    heroDescription:
      "Expert SQL database design, optimization, and management services for high-performance data storage solutions across SQL Server, MySQL, PostgreSQL, and Oracle.",
  },
  python: {
    slug: "python",
    category: "backend",
    heroSubtitle: "Versatile Python Solutions",
    heroTitle: "Python Development Services",
    heroDescription:
      "Comprehensive Python development for web applications, data science, AI/ML, automation, and backend systems using Django, Flask, FastAPI, and modern Python frameworks.",
  },
  java: {
    slug: "java",
    category: "backend",
    heroSubtitle: "Enterprise Java Applications",
    heroTitle: "Java Development Services",
    heroDescription:
      "Enterprise Java development using Spring Boot, Hibernate, Microservices, and modern Java frameworks for scalable, secure, and high-performance applications.",
  },
  "node-js": {
    slug: "node-js",
    category: "backend",
    heroSubtitle: "Real-Time Node.js Applications",
    heroTitle: "Node.js Development Services",
    heroDescription:
      "Professional Node.js development for real-time applications, APIs, microservices, and scalable backend systems using Express.js, NestJS, and modern Node.js ecosystem.",
  },
  php: {
    slug: "php",
    category: "backend",
    heroSubtitle: "PHP Web Solutions",
    heroTitle: "PHP Development Services",
    heroDescription:
      "PHP development services using Laravel, Symfony, CodeIgniter, and WordPress for robust web applications, e-commerce platforms, and CMS solutions.",
  },
  golang: {
    slug: "golang",
    category: "backend",
    heroSubtitle: "High-Performance Go Applications",
    heroTitle: "Golang Development Services",
    heroDescription:
      "Go programming language development for high-performance, concurrent applications, microservices, APIs, and distributed systems with exceptional speed and efficiency.",
  },

  // ============ FRONTEND TECHNOLOGIES ============
  reactjs: {
    slug: "reactjs",
    category: "frontend",
    heroSubtitle: "Modern React Applications",
    heroTitle: "React.js Development Services",
    heroDescription:
      "Professional React.js development for interactive, high-performance web applications using React Hooks, Context API, Redux, and modern React ecosystem.",
  },
  javascript: {
    slug: "javascript",
    category: "frontend",
    heroSubtitle: "Full-Stack JavaScript Solutions",
    heroTitle: "JavaScript Development Services",
    heroDescription:
      "Comprehensive JavaScript development services using ES6+, TypeScript, and modern frameworks for dynamic web applications and full-stack solutions.",
  },
  angular: {
    slug: "angular",
    category: "frontend",
    heroSubtitle: "Enterprise Angular Applications",
    heroTitle: "Angular Development Services",
    heroDescription:
      "Enterprise-scale Angular development using TypeScript, RxJS, NgRx, and Angular Material for complex single-page applications with robust architecture.",
  },
  typescript: {
    slug: "typescript",
    category: "frontend",
    heroSubtitle: "Type-Safe JavaScript Development",
    heroTitle: "TypeScript Development Services",
    heroDescription:
      "TypeScript development services for scalable, maintainable applications with enhanced code quality, better tooling, and improved developer experience.",
  },
  "vue-js": {
    slug: "vue-js",
    category: "frontend",
    heroSubtitle: "Progressive Vue.js Applications",
    heroTitle: "Vue.js Development Services",
    heroDescription:
      "Vue.js development services using Vue 3 Composition API, Vuex, Vue Router, and Vite for building interactive, scalable, and maintainable web applications.",
  },
  nextjs: {
    slug: "nextjs",
    category: "frontend",
    heroSubtitle: "Server-Side Rendered React Apps",
    heroTitle: "Next.js Development Services",
    heroDescription:
      "Next.js development for SEO-friendly, high-performance web applications with server-side rendering, static site generation, and API routes.",
  },

  // ============ FRAMEWORKS ============
  django: {
    slug: "django",
    category: "framework",
    heroSubtitle: "Rapid Django Development",
    heroTitle: "Django Development Services",
    heroDescription:
      "Django web framework development for rapid application development, RESTful APIs, and scalable web applications with built-in security features.",
  },
  express: {
    slug: "express",
    category: "framework",
    heroSubtitle: "Minimalist Node.js Framework",
    heroTitle: "Express.js Development Services",
    heroDescription:
      "Express.js development for lightweight, fast Node.js web applications, RESTful APIs, and middleware solutions with minimal overhead.",
  },
  "spring-boot": {
    slug: "spring-boot",
    category: "framework",
    heroSubtitle: "Enterprise Spring Applications",
    heroTitle: "Spring Boot Development Services",
    heroDescription:
      "Spring Boot development for enterprise Java applications with microservices architecture, cloud-native features, and production-ready configurations.",
  },

  // ============ MOBILE TECHNOLOGIES ============
  flutter: {
    slug: "flutter",
    category: "mobile",
    heroSubtitle: "Cross-Platform Mobile Apps",
    heroTitle: "Flutter Development Services",
    heroDescription:
      "Flutter development for beautiful, natively compiled iOS, Android, web, and desktop applications from a single codebase using Dart programming language.",
  },
  "java-mobile": {
    slug: "java-mobile",
    category: "mobile",
    heroSubtitle: "Native Android Development",
    heroTitle: "Java Mobile Development Services",
    heroDescription:
      "Native Android application development using Java and Kotlin with modern Android architecture components, Jetpack libraries, and Material Design.",
  },
  "react-native": {
    slug: "react-native",
    category: "mobile",
    heroSubtitle: "Cross-Platform React Apps",
    heroTitle: "React Native Development Services",
    heroDescription:
      "React Native development for cross-platform iOS and Android applications with native performance using JavaScript and React ecosystem.",
  },

  // ============ DEVOPS TECHNOLOGIES ============
  aws: {
    slug: "aws",
    category: "devops",
    heroSubtitle: "Amazon Web Services Solutions",
    heroTitle: "AWS Development Services",
    heroDescription:
      "AWS cloud services including EC2, S3, Lambda, RDS, and more for scalable, secure, and cost-effective cloud infrastructure and serverless applications.",
  },
  azure: {
    slug: "azure",
    category: "devops",
    heroSubtitle: "Microsoft Cloud Solutions",
    heroTitle: "Azure Development Services",
    heroDescription:
      "Microsoft Azure cloud services including App Services, Functions, SQL Database, and AI services for enterprise-grade cloud solutions.",
  },
  "google-cloud": {
    slug: "google-cloud",
    category: "devops",
    heroSubtitle: "Google Cloud Platform Solutions",
    heroTitle: "Google Cloud Development Services",
    heroDescription:
      "Google Cloud Platform services including Compute Engine, App Engine, Cloud Functions, and BigQuery for scalable data and AI solutions.",
  },

  // ============ PLATFORMS & MORE ============
  salesforce: {
    slug: "salesforce",
    category: "more",
    heroSubtitle: "Salesforce CRM Solutions",
    heroTitle: "Salesforce Development Services",
    heroDescription:
      "Salesforce CRM customization, implementation, and development with Apex, Lightning Components, and integration services for customer relationship management.",
  },
  "ms-power-apps": {
    slug: "ms-power-apps",
    category: "more",
    heroSubtitle: "Low-Code Business Apps",
    heroTitle: "MS Power Apps Development Services",
    heroDescription:
      "Microsoft Power Apps development for low-code business applications, workflow automation, and data visualization with Power Platform integration.",
  },
  metaverse: {
    slug: "metaverse",
    category: "more",
    heroSubtitle: "Immersive Virtual Experiences",
    heroTitle: "Metaverse Development Services",
    heroDescription:
      "Metaverse development including 3D environments, VR/AR applications, virtual spaces, and immersive experiences using cutting-edge technologies.",
  },
};

// Helper functions
export function getTechnologyHeroData(slug: string): TechnologyHeroData | null {
  return technologyHeroData[slug] || null;
}

export function getAllTechnologySlugs(): string[] {
  return Object.keys(technologyHeroData);
}

export function getTechnologiesByCategory(category: string): TechnologyHeroData[] {
  return Object.values(technologyHeroData).filter((data) => data.category === category);
}
