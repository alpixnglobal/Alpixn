export interface BackendDeveloper {
  name: string;
  image: string;
  alt: string;
  width: number;
  height: number;
  link?: string;
}

export interface BackendDevelopersData {
  slug: string;
  title: string;
  developers: BackendDeveloper[];
}

export const backendDevelopersData: Record<string, BackendDevelopersData> = {
  // Node.js Developer page
  "nodejs-developer": {
    slug: "nodejs-developer",
    title: "Hire From Our Pool of Backend Developers in the Tech Stack You Need",
    developers: [
      {
        name: "Python Developer",
        image: "/images/python.png",
        alt: "Python Developer",
        width: 40,
        height: 40,
        link: "/offshore-developer/backend-developer/python-developer",
      },
      {
        name: "Spring Boot Developer",
        image: "/images/springboot.png",
        alt: "Spring Boot Developer",
        width: 40,
        height: 40,
        link: "/offshore-developer/backend-developer/springboot-developer",
      },
      {
        name: "Django Developer",
        image: "/images/django.png",
        alt: "Django Developer",
        width: 40,
        height: 40,
        link: "/offshore-developer/backend-developer/django-developer",
      },
      {
        name: "Node.js Developer",
        image: "/images/node.png",
        alt: "Node.js Developer",
        width: 40,
        height: 40,
        link: "/offshore-developer/backend-developer/nodejs-developer",
      },
      {
        name: ".Net Developer",
        image: "/images/dotnet.png",
        alt: ".Net Developer",
        width: 40,
        height: 40,
        link: "/offshore-developer/backend-developer/dotnet-developer",
      },

      // Row 2
      {
        name: "Spring Boot Developer",
        image: "/images/springboot.png",
        alt: "Spring Boot Developer",
        width: 40,
        height: 40,
        link: "/offshore-developer/backend-developer/springboot-developer",
      },
      {
        name: ".Net Developer",
        image: "/images/dotnet.png",
        alt: ".Net Developer",
        width: 40,
        height: 40,
        link: "/offshore-developer/backend-developer/dotnet-developer",
      },
      {
        name: "Node.js Developer",
        image: "/images/node.png",
        alt: "Node.js Developer",
        width: 40,
        height: 40,
        link: "/offshore-developer/backend-developer/nodejs-developer",
      },
      {
        name: "Django Developer",
        image: "/images/django.png",
        alt: "Django Developer",
        width: 40,
        height: 40,
        link: "/offshore-developer/backend-developer/django-developer",
      },
      {
        name: "Python Developer",
        image: "/images/python.png",
        alt: "Python Developer",
        width: 40,
        height: 40,
        link: "/offshore-developer/backend-developer/python-developer",
      },
    ],
  },

  // Golang Developer page
  "golang-developer": {
    slug: "golang-developer",
    title: "Technical Expertise of Our Golang Developers",
    developers: [
      {
        name: "Python Developer",
        image: "/images/python.png",
        alt: "Python Developer",
        width: 40,
        height: 40,
        link: "/offshore-developer/backend-developer/python-developer",
      },
      {
        name: "Spring Boot Developer",
        image: "/images/springboot.png",
        alt: "Spring Boot Developer",
        width: 40,
        height: 40,
        link: "/offshore-developer/backend-developer/springboot-developer",
      },
      {
        name: "Django Developer",
        image: "/images/django.png",
        alt: "Django Developer",
        width: 40,
        height: 40,
        link: "/offshore-developer/backend-developer/django-developer",
      },
      {
        name: "Node.js Developer",
        image: "/images/node.png",
        alt: "Node.js Developer",
        width: 40,
        height: 40,
        link: "/offshore-developer/backend-developer/nodejs-developer",
      },
      {
        name: ".Net Developer",
        image: "/images/dotnet.png",
        alt: ".Net Developer",
        width: 40,
        height: 40,
        link: "/offshore-developer/backend-developer/dotnet-developer",
      },

      // Row 2
      {
        name: "Spring Boot Developer",
        image: "/images/springboot.png",
        alt: "Spring Boot Developer",
        width: 40,
        height: 40,
        link: "/offshore-developer/backend-developer/springboot-developer",
      },
      {
        name: ".Net Developer",
        image: "/images/dotnet.png",
        alt: ".Net Developer",
        width: 40,
        height: 40,
        link: "/offshore-developer/backend-developer/dotnet-developer",
      },
      {
        name: "Node.js Developer",
        image: "/images/node.png",
        alt: "Node.js Developer",
        width: 40,
        height: 40,
        link: "/offshore-developer/backend-developer/nodejs-developer",
      },
      {
        name: "Django Developer",
        image: "/images/django.png",
        alt: "Django Developer",
        width: 40,
        height: 40,
        link: "/offshore-developer/backend-developer/django-developer",
      },
      {
        name: "Python Developer",
        image: "/images/python.png",
        alt: "Python Developer",
        width: 40,
        height: 40,
        link: "/offshore-developer/backend-developer/python-developer",
      },
    ],
  },

  // Default fallback
  default: {
    slug: "default",
    title: "Hire From Our Pool of Backend Developers in the Tech Stack You Need",
    developers: [
      {
        name: "Node.js Developer",
        image: "/images/node.png",
        alt: "Node.js Developer",
        width: 40,
        height: 40,
        link: "/offshore-developer/backend-developer/nodejs-developer",
      },
      {
        name: "Python Developer",
        image: "/images/python.png",
        alt: "Python Developer",
        width: 40,
        height: 40,
        link: "/offshore-developer/backend-developer/python-developer",
      },
      {
        name: "Django Developer",
        image: "/images/django.png",
        alt: "Django Developer",
        width: 40,
        height: 40,
        link: "/offshore-developer/backend-developer/django-developer",
      },
      {
        name: "Spring Boot Developer",
        image: "/images/springboot.png",
        alt: "Spring Boot Developer",
        width: 40,
        height: 40,
        link: "/offshore-developer/backend-developer/springboot-developer",
      },
      {
        name: ".Net Developer",
        image: "/images/dotnet.png",
        alt: ".Net Developer",
        width: 40,
        height: 40,
        link: "/offshore-developer/backend-developer/dotnet-developer",
      },
      {
        name: "Golang Developer",
        image: "https://cdn.simpleicons.org/go/00ADD8",
        alt: "Golang Developer",
        width: 40,
        height: 40,
        link: "/offshore-developer/backend-developer/golang-developer",
      },
      {
        name: "Java Developer",
        image: "https://cdn.simpleicons.org/openjdk/FFFFFF",
        alt: "Java Developer",
        width: 40,
        height: 40,
        link: "/offshore-developer/backend-developer/java-developer",
      },
      {
        name: "Ruby Developer",
        image: "https://cdn.simpleicons.org/ruby/CC342D",
        alt: "Ruby Developer",
        width: 40,
        height: 40,
        link: "/offshore-developer/backend-developer/ruby-developer",
      },
      {
        name: "PHP Developer",
        image: "https://cdn.simpleicons.org/php/777BB4",
        alt: "PHP Developer",
        width: 40,
        height: 40,
        link: "/offshore-developer/backend-developer/php-developer",
      },
      {
        name: "Express.js Developer",
        image: "https://cdn.simpleicons.org/express/FFFFFF",
        alt: "Express.js Developer",
        width: 40,
        height: 40,
        link: "/offshore-developer/backend-developer/express-developer",
      },
    ],
  },
};

// Helper functions
export function getBackendDevelopersData(slug: string): BackendDevelopersData {
  return backendDevelopersData[slug] || backendDevelopersData["default"];
}

export function getAllBackendDevelopersSlugs(): string[] {
  return Object.keys(backendDevelopersData);
}
