// lib/offshore/cta-section-data.ts

export interface CtaSectionData {
  slug: string;
  title: string;
  buttonText: string;
  buttonLink: string;
}

export const ctaSectionData: Record<string, CtaSectionData> = {
  // Node.js Developer
  "nodejs-developer": {
    slug: "nodejs-developer",
    title: "Ready to Transform Your Software Projects?",
    buttonText: "Hire Our Node.js Developers",
    buttonLink: "#",
  },

  // Golang Developer
  "golang-developer": {
    slug: "golang-developer",
    title: "Ready to Transform Your Software Projects?",
    buttonText: "Hire Our Golang Developers",
    buttonLink: "#",
  },

  // Default fallback
  default: {
    slug: "default",
    title: "Ready to Transform Your Software Projects?",
    buttonText: "Hire Our Developers",
    buttonLink: "#", // Default contact link
  },
};

// Helper functions
export function getCtaSectionData(slug: string): CtaSectionData {
  return ctaSectionData[slug] || ctaSectionData["default"];
}

export function getAllCtaSectionSlugs(): string[] {
  return Object.keys(ctaSectionData);
}
