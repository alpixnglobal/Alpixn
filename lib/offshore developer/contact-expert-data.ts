export interface ContactExpertData {
  slug: string;
  title: string;
  buttonText: string;
  buttonLink: string;
}

export const contactExpertData: Record<string, ContactExpertData> = {
  // Node.js Developer
  "nodejs-developer": {
    slug: "nodejs-developer",
    title: "Want To Speak With Our Node.js Solution Experts?",
    buttonText: "Book a Meeting",
    buttonLink: "#",
  },

  // Golang Developer
  "golang-developer": {
    slug: "golang-developer",
    title: "Build Scalable, Future-Ready Applications with Our Top Golang Developers",
    buttonText: "Book a Meeting",
    buttonLink: "#",
  },

  // Default fallback
  default: {
    slug: "default",
    title: "Want To Speak With Our Solution Experts?",
    buttonText: "Book a Meeting",
    buttonLink: "#",
  },
};

// Helper functions
export function getContactExpertData(slug: string): ContactExpertData {
  return contactExpertData[slug] || contactExpertData["default"];
}

export function getAllContactExpertSlugs(): string[] {
  return Object.keys(contactExpertData);
}
