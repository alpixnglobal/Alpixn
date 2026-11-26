export interface OffshoreHeroData {
  slug: string;
  title: string;
  description: string;
  checklist: string[];
  formTitle: string;
  technologies: Array<{
    value: string;
    label: string;
  }>;
}

export const offshoreHeroData: Record<string, OffshoreHeroData> = {
  // Node.js Developer
  "nodejs-developer": {
    slug: "nodejs-developer",
    title: "Hire Node.js Developers Partner With Top-Rated Node.js Programmers",
    description:
      "Hire nodejs developers to build projects with real-time functionality, efficient data processing, and scalable architecture. Our dedicated Node.js developers specialize in creating data-intensive applications, custom web apps, RESTful APIs, SPAs, and more.",
    checklist: [
      "Advanced Node.js Expertise",
      "100% Quality Assurance",
      "5+ Years Avg Experience",
      "NDA-Backed Confidentiality",
    ],
    formTitle: "Work with Top Node.js Developers",
    technologies: [
      { value: "nodejs", label: "Node.js" },
      { value: "nestjs", label: "Nest.js" },
      { value: "express", label: "Express.js" },
      { value: "typescript", label: "TypeScript" },
      { value: "javascript", label: "JavaScript" },
      { value: "mongodb", label: "MongoDB" },
      { value: "postgresql", label: "PostgreSQL" },
      { value: "redis", label: "Redis" },
      { value: "docker", label: "Docker" },
      { value: "aws", label: "AWS" },
    ],
  },

  // Golang Developer
  "golang-developer": {
    slug: "golang-developer",
    title: "Hire Certified Golang Developers",
    description:
      "Our vetted Golang developers build modern applications and optimize existing ones. With expertise in cloud services, DevOps, and data science, they ensure scalable, high-performance solutions using industry best practices.",
    checklist: [
      "Advanced Golang Expertise",
      "100% Quality Assurance",
      "5+ Years Avg Experience",
      "NDA-Backed Confidentiality",
    ],
    formTitle: "Work with Top Golang Developers",
    technologies: [
      { value: "golang", label: "Golang" },
      { value: "gin", label: "Gin Framework" },
      { value: "echo", label: "Echo Framework" },
      { value: "gorilla", label: "Gorilla Toolkit" },
      { value: "grpc", label: "gRPC" },
      { value: "protobuf", label: "Protocol Buffers" },
      { value: "postgresql", label: "PostgreSQL" },
      { value: "mongodb", label: "MongoDB" },
      { value: "redis", label: "Redis" },
      { value: "docker", label: "Docker" },
      { value: "kubernetes", label: "Kubernetes" },
      { value: "aws", label: "AWS" },
      { value: "gcp", label: "Google Cloud" },
    ],
  },

  // Default fallback
  default: {
    slug: "default",
    title: "Hire Dedicated Developers Partner With Top-Rated Programmers",
    description:
      "Hire dedicated developers to build projects with cutting-edge technology, efficient solutions, and scalable architecture. Our expert developers specialize in creating custom applications, APIs, and enterprise-grade solutions.",
    checklist: [
      "Advanced Technical Expertise",
      "100% Quality Assurance",
      "5+ Years Avg Experience",
      "NDA-Backed Confidentiality",
    ],
    formTitle: "Work with Top Developers",
    technologies: [
      { value: "nodejs", label: "Node.js" },
      { value: "react", label: "React" },
      { value: "vue", label: "Vue.js" },
      { value: "angular", label: "Angular" },
      { value: "python", label: "Python" },
      { value: "java", label: "Java" },
    ],
  },
};

// Helper functions
export function getOffshoreHeroData(slug: string): OffshoreHeroData {
  return offshoreHeroData[slug] || offshoreHeroData["default"];
}

export function getAllOffshoreHeroSlugs(): string[] {
  return Object.keys(offshoreHeroData);
}
