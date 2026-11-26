export interface HireStepsData {
  slug: string;
  mainTitle: string;
  buttonText: string;
  buttonLink: string;
}

export const hireStepsData: Record<string, HireStepsData> = {
  // Node.js Developer
  "nodejs-developer": {
    slug: "nodejs-developer",
    mainTitle: "Hire Node js Programmers in 3 Simple Steps",
    buttonText: "Hire Top 1% Talent Now",
    buttonLink: "#",
  },

  // Golang Developer
  "golang-developer": {
    slug: "golang-developer",
    mainTitle: "Hire Golang Programmers in 3 Simple Steps",
    buttonText: "Hire Top 1% Talent Now",
    buttonLink: "#",
  },

  // Default fallback
  default: {
    slug: "default",
    mainTitle: "Hire Programmers in 3 Simple Steps",
    buttonText: "Hire Top 1% Talent Now",
    buttonLink: "/contact",
  },
};

// Helper functions
export function getHireStepsData(slug: string): HireStepsData {
  return hireStepsData[slug] || hireStepsData["default"];
}

export function getAllHireStepsSlugs(): string[] {
  return Object.keys(hireStepsData);
}
