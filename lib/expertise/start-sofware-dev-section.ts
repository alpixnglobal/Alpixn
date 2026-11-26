export interface StartDevelopmentData {
  slug: string;
  title: string;
  subtitle: string;
  buttonText: string;
}

export const startDevelopmentData: Record<string, StartDevelopmentData> = {
  // 1. Software Development
  "software-development": {
    slug: "software-development",
    title: "Ready to Get Started With Our Software Development Services?",
    subtitle:
      "Ready to launch your vision? Our custom software development team is geared up to bring your ideas to life. Let's embark on your unique project journey together, creating tailored solutions for your business needs.",
    buttonText: "Get a Quote for Your Project",
  },

  // 2. Web Applications
  "web-app-development": {
    slug: "web-app-development",
    title: "Connect With Us To Hire Skilled Web App Developers",
    subtitle:
      "We engineer scalable and future-ready web applications, leveraging a next-gen tech stack to give you a competitive advantage.",
    buttonText: "Get a Quote for Your Project",
  },

  // 3. Mobile Applications
  "mobile-app-development": {
    slug: "mobile-app-development",
    title: "Ready to Develop Your Mobile App?",
    subtitle:
      "Launch your mobile app with confidence. Our mobile development experts create intuitive, feature-rich applications for iOS and Android that engage users and deliver measurable results.",
    buttonText: "Discuss Your Mobile App",
  },
};

// Helper functions
export function getStartDevelopmentData(slug: string): StartDevelopmentData {
  return startDevelopmentData[slug] || startDevelopmentData["software-development"];
}
