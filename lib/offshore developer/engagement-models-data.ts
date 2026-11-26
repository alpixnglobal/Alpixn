export interface EngagementModelItem {
  title: string;
  description: string;
  features: string[];
}

export interface EngagementModelsData {
  slug: string;
  mainTitle: string;
  mainSubtitle: string;
  models: EngagementModelItem[];
}

export const engagementModelsData: Record<string, EngagementModelsData> = {
  // Node.js Developer
  "nodejs-developer": {
    slug: "nodejs-developer",
    mainTitle: "Engagement Models to Hire Dedicated Node.js Developers",
    mainSubtitle:
      "Jellyfish Technologies offers versatile engagement models for Node.js application development services, providing innovative solutions. Get the best fit for your business.",
    models: [
      {
        title: "Custom Node.js Development",
        description:
          "With our Dedicated Team model, you gain access to experienced Node.js professionals fully committed to your goals, integrating seamlessly with your in-house team for consistent performance and rapid adaptability.",
        features: [
          "Client-Centric Approach",
          "Direct Reporting and Transparency",
          "Scalability and Flexibility",
          "Quality and Efficiency",
        ],
      },
      {
        title: "Staff Augmentation",
        description:
          "With Staff Augmentation, we integrate our hire node js experts into your existing team to boost capabilities and fill skill gaps. This model enhances productivity and speeds up development by leveraging our specialized talent alongside your internal resources.",
        features: [
          "Tailored Expertise",
          "Seamless Integration",
          "Cost-Effective Solution",
          "Transparent Communication",
        ],
      },
      {
        title: "Project-Based",
        description:
          "Our Project-based model offers a unique solution for specific Node.js projects. We handle the entire project lifecycle from conception to delivery, ensuring timely completion and quality results based on your unique requirements and objectives.",
        features: ["Fixed Budget", "Milestones and Deliverables", "Resource Allocation", "Risk Mitigation"],
      },
    ],
  },

  // Golang Developer
  "golang-developer": {
    slug: "golang-developer",
    mainTitle: "Engagement Models to Hire Expert Golang Developers",
    mainSubtitle:
      "We offer flexible engagement models for hiring Golang developers. From dedicated teams to project-based solutions, we provide innovative services. Explore the ideal model for your project.",
    models: [
      {
        title: "Dedicated Team",
        description:
          "Our Dedicated Team model offers you a committed group of developers working exclusively on your project. This approach ensures seamless collaboration, scalability, and quality tailored to your evolving business requirements.",
        features: [
          "Client-Centric Approach",
          "Direct Reporting and Transparency",
          "Scalability and Flexibility",
          "Quality and Efficiency",
        ],
      },
      {
        title: "Staff Augmentation",
        description:
          "With Staff Augmentation, we integrate our hire Go experts into your existing team to boost capabilities and fill skill gaps. This model enhances productivity and speeds up development by leveraging our specialized talent alongside your internal resources.",
        features: [
          "Tailored Expertise",
          "Seamless Integration",
          "Cost-Effective Solution",
          "Transparent Communication",
        ],
      },
      {
        title: "Project-Based",
        description:
          "Our Project-based model offers a unique solution for specific Golang projects. We handle the entire project lifecycle from conception to delivery, ensuring timely completion and quality results based on your unique requirements and objectives.",
        features: ["Fixed Budget", "Milestones and Deliverables", "Resource Allocation", "Risk Mitigation"],
      },
    ],
  },

  // Default fallback
  default: {
    slug: "default",
    mainTitle: "Engagement Models to Hire Dedicated Developers",
    mainSubtitle:
      "Jellyfish Technologies offers versatile engagement models for application development services, providing innovative solutions. Get the best fit for your business.",
    models: [
      {
        title: "Custom Development",
        description:
          "With our Dedicated Team model, you gain access to experienced professionals fully committed to your goals, integrating seamlessly with your in-house team for consistent performance and rapid adaptability.",
        features: [
          "Client-Centric Approach",
          "Direct Reporting and Transparency",
          "Scalability and Flexibility",
          "Quality and Efficiency",
        ],
      },
      {
        title: "Staff Augmentation",
        description:
          "With Staff Augmentation, we integrate our experts into your existing team to boost capabilities and fill skill gaps. This model enhances productivity and speeds up development by leveraging our specialized talent alongside your internal resources.",
        features: [
          "Tailored Expertise",
          "Seamless Integration",
          "Cost-Effective Solution",
          "Transparent Communication",
        ],
      },
      {
        title: "Project-Based",
        description:
          "Our Project-based model offers a unique solution for specific projects. We handle the entire project lifecycle from conception to delivery, ensuring timely completion and quality results based on your unique requirements and objectives.",
        features: ["Fixed Budget", "Milestones and Deliverables", "Resource Allocation", "Risk Mitigation"],
      },
    ],
  },
};

// Helper functions
export function getEngagementModelsData(slug: string): EngagementModelsData {
  return engagementModelsData[slug] || engagementModelsData["default"];
}

export function getAllEngagementModelsSlugs(): string[] {
  return Object.keys(engagementModelsData);
}
