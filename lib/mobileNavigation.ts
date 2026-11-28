export type MobileNavItemType = {
  label: string;
  href?: string;
  children?: MobileNavItemType[];
};

export type ProductNavigationItem = {
  label: string;
  href: string;
};

export type OffshoreNavigationCategoryItem = {
  label: string;
  href: string;
  children: ProductNavigationItem[];
};

export type ExpertiseNavigationCategoryItem = {
  label: string;
  href: string;
  children: ProductNavigationItem[];
};

export const mobileNavigation: MobileNavItemType[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },

  //   Expertise
  {
    label: "Our Expertise",
    children: [
      {
        label: "Software Solutions",
        href: "/our-expertise/software-solution",
        children: [
          { label: "Software Development", href: "/our-expertise/software-solution/software-development" },
          { label: "Web App Development", href: "/our-expertise/software-solution/web-app-development" },
          { label: "Mobile App Development", href: "/our-expertise/software-solution/mobile-app-development" },
          { label: "API Integration", href: "/our-expertise/software-solution/api-integration" },
          { label: "Application Modernization", href: "/our-expertise/software-solution/application-modernization" },
          { label: "UI/UX Services", href: "/our-expertise/software-solution/ui-ux-services" },
          { label: "SaaS Development", href: "/our-expertise/software-solution/saas-development" },
          { label: "Staff Augmentation", href: "/our-expertise/software-solution/staff-augmentation" },
          { label: "Data Analytics", href: "/our-expertise/software-solution/data-analytics" },
          { label: "Cloud Consulting", href: "/our-expertise/software-solution/cloud-consulting" },
          { label: "DevOps Services", href: "/our-expertise/software-solution/devops-services" },
          { label: "Low-Code/No-Code", href: "/our-expertise/software-solution/low-code-no-code" },
          { label: "Enterprise Software", href: "/our-expertise/software-solution/enterprise-software" },
          { label: "Software Outsourcing", href: "/our-expertise/software-solution/software-outsourcing" },
          { label: "CRM Development", href: "/our-expertise/software-solution/crm-development" },
          { label: "ERP Software", href: "/our-expertise/software-solution/erp-software" },
        ],
      },
      {
        label: "Artificial Intelligence",
        href: "/our-expertise/artificial-intelligence",
        children: [
          { label: "GenAI Development", href: "/our-expertise/artificial-intelligence/genai-development" },
          { label: "GenAI Consulting", href: "/our-expertise/artificial-intelligence/genai-consulting" },
          { label: "AI Development", href: "/our-expertise/artificial-intelligence/ai-development" },
          { label: "AI Agent Development", href: "/our-expertise/artificial-intelligence/ai-agent-development" },
          { label: "AI Automation Services", href: "/our-expertise/artificial-intelligence/ai-automation-services" },
          { label: "AI Software Development", href: "/our-expertise/artificial-intelligence/ai-software-development" },
          { label: "AI Data Annotation", href: "/our-expertise/artificial-intelligence/ai-data-annotation" },
          { label: "LLMs Development", href: "/our-expertise/artificial-intelligence/llms-development" },
          { label: "GenAI Integration", href: "/our-expertise/artificial-intelligence/genai-integration" },
          { label: "AI Consulting Services", href: "/our-expertise/artificial-intelligence/ai-consulting-services" },
          { label: "LLM Fine-Tuning", href: "/our-expertise/artificial-intelligence/llm-fine-tuning" },
          { label: "ChatGPT Integration", href: "/our-expertise/artificial-intelligence/chatgpt-integration" },
          { label: "AI Chatbot Development", href: "/our-expertise/artificial-intelligence/ai-chatbot-development" },
          {
            label: "Computer Vision Development",
            href: "/our-expertise/artificial-intelligence/computer-vision-development",
          },
          { label: "Mistral AI Integration", href: "/our-expertise/artificial-intelligence/mistral-ai-integration" },
          {
            label: "Predictive Analytics Development",
            href: "/our-expertise/artificial-intelligence/predictive-analytics-development",
          },
          {
            label: "NLP Development Services",
            href: "/our-expertise/artificial-intelligence/nlp-development-services",
          },
          { label: "Llama Integration", href: "/our-expertise/artificial-intelligence/llama-integration" },
        ],
      },
      {
        label: "Industries",
        href: "/our-expertise/industries",
        children: [
          { label: "FinTech", href: "/our-expertise/industries/fintech" },
          { label: "Retail", href: "/our-expertise/industries/retail" },
          { label: "PropTech", href: "/our-expertise/industries/proptech" },
          { label: "Automotive", href: "/our-expertise/industries/automotive" },
          { label: "Facility Management", href: "/our-expertise/industries/facility-management" },
          { label: "Transport", href: "/our-expertise/industries/transport" },
          { label: "Telecom", href: "/our-expertise/industries/telecom" },
          { label: "AI Data Annotation", href: "/our-expertise/industries/ai-data-annotation-industry" },
          { label: "EdTech", href: "/our-expertise/industries/edtech" },
          { label: "InsureTech", href: "/our-expertise/industries/insuretech" },
          { label: "HealthTech", href: "/our-expertise/industries/healthtech" },
          { label: "Media & Entertainment", href: "/our-expertise/industries/media-entertainment" },
          { label: "Travel & Hospitality", href: "/our-expertise/industries/travel" },
        ],
      },
    ],
  },

  //   Offshore Dev
  {
    label: "Offshore Developer",
    children: [
      {
        label: "Backend Developers",
        href: "/offshore-developer/backend-developer",
        children: [
          { label: "Node.Js Developer", href: "/offshore-developer/backend-developer/nodejs-developer" },
          { label: "Golang Developer", href: "/offshore-developer/backend-developer/golang-developer" },
          { label: ".Net Developer", href: "/offshore-developer/backend-developer/net-developer" },
          { label: "SQL Developer", href: "/offshore-developer/backend-developer/sql-developer" },
          { label: "Java Developer", href: "/offshore-developer/backend-developer/java-developer" },
          { label: "Django Developer", href: "/offshore-developer/backend-developer/django-developer" },
          { label: "Python Developer", href: "/offshore-developer/backend-developer/python-developer" },
          { label: "PHP Developer", href: "/offshore-developer/backend-developer/php-developer" },
          { label: "Spring Boot Developers", href: "/offshore-developer/backend-developer/spring-boot-developer" },
          { label: "Express JS Developer", href: "/offshore-developer/backend-developer/express-js-developer" },
        ],
      },
      {
        label: "Frontend Developers",
        href: "/offshore-developer/frontend-developer",
        children: [
          { label: "ReactJS Developer", href: "/offshore-developer/frontend-developer/reactjs-developer" },
          { label: "JavaScript Developer", href: "/offshore-developer/frontend-developer/javascript-developer" },
          { label: "Angular Developer", href: "/offshore-developer/frontend-developer/angular-developer" },
          { label: "TypeScript Developer", href: "/offshore-developer/frontend-developer/typescript-developer" },
          { label: "Vue Js Developer", href: "/offshore-developer/frontend-developer/vuejs-developer" },
          { label: "NextJS Developer", href: "/offshore-developer/frontend-developer/nextjs-developer" },
        ],
      },
      {
        label: "Mobile App Developers",
        href: "/offshore-developer/mobile-developer",
        children: [
          { label: "React Native Developer", href: "/offshore-developer/mobile-developer/react-native-developer" },
          { label: ".Net Maui", href: "/offshore-developer/mobile-developer/net-maui" },
          { label: "Flutter Developer", href: "/offshore-developer/mobile-developer/flutter-developer" },
          { label: "Kotlin Developer", href: "/offshore-developer/mobile-developer/kotlin-developer" },
          { label: "Ionic Developer", href: "/offshore-developer/mobile-developer/ionic-developer" },
          { label: "Full Stack Developer", href: "/offshore-developer/mobile-developer/full-stack-developer" },
        ],
      },
      {
        label: "AI Engineers",
        href: "/offshore-developer/ai-engineers",
        children: [
          { label: "AI Development Teams", href: "/offshore-developer/ai-engineers/ai-development-teams" },
          { label: "Computer Vision Engineers", href: "/offshore-developer/ai-engineers/computer-vision-engineers" },
          { label: "Generative AI Engineers", href: "/offshore-developer/ai-engineers/generative-ai-engineers" },
          { label: "NLP Engineers", href: "/offshore-developer/ai-engineers/nlp-engineers" },
          { label: "AI Team Augmentation Services", href: "/offshore-developer/ai-engineers/ai-team-augmentation" },
          { label: "LLM Engineers", href: "/offshore-developer/ai-engineers/llm-engineers" },
        ],
      },
      {
        label: "DevOps Engineers",
        href: "/offshore-developer/devops-engineers",
        children: [
          { label: "AWS Developer", href: "/offshore-developer/devops-engineers/aws-developer" },
          { label: "Azure Developer", href: "/offshore-developer/devops-engineers/azure-developer" },
          { label: "Google Cloud Developer", href: "/offshore-developer/devops-engineers/google-cloud-developer" },
        ],
      },
      {
        label: "Platforms",
        href: "/offshore-developer/platforms",
        children: [
          { label: "Salesforce Developer", href: "/offshore-developer/platforms/salesforce-developer" },
          { label: "MS Power Apps Developer", href: "/offshore-developer/platforms/ms-power-apps-developer" },
          { label: "Metaverse Developer", href: "/offshore-developer/platforms/metaverse-developer" },
        ],
      },
    ],
  },

  // Products Menu
  {
    label: "Products",
    children: [
      { label: "Salon Management", href: "/products/salon-management" },
      { label: "Multilingual AI", href: "/products/multilingual-ai" },
      { label: "AI Powerd Instant Website & App Builder", href: "/products/ai-website-builder" },
      { label: "AI HR & Payroll", href: "/products/ai-hr-payroll" },
      { label: "AI Taxation Management", href: "/products/ai-taxation-management" },
      { label: "AI Design Studio", href: "/products/ai-design-studio" },
      { label: "AI Project & Task Management", href: "/products/ai-project-management" },
    ],
  },

  {
    label: "Technologies",
    children: [
      {
        label: "Backend",
        href: "/technologies/backend",
        children: [
          { label: ".Net", href: "/technologies/backend/dot-net" },
          { label: "SQL", href: "/technologies/backend/sql" },
          { label: "Python", href: "/technologies/backend/python" },
          { label: "Java", href: "/technologies/backend/java" },
          { label: "Node.Js", href: "/technologies/backend/node-js" },
          { label: "PHP", href: "/technologies/backend/php" },
          { label: "Golang", href: "/technologies/backend/golang" },
        ],
      },
      {
        label: "Frontend",
        href: "/technologies/frontend",
        children: [
          { label: "ReactJS", href: "/technologies/frontend/reactjs" },
          { label: "JavaScript", href: "/technologies/frontend/javascript" },
          { label: "Angular", href: "/technologies/frontend/angular" },
          { label: "TypeScript", href: "/technologies/frontend/typescript" },
          { label: "Vue Js", href: "/technologies/frontend/vue-js" },
          { label: "NextJS", href: "/technologies/frontend/nextjs" },
        ],
      },
      {
        label: "Framework",
        href: "/technologies/framework",
        children: [
          { label: "Django", href: "/technologies/framework/django" },
          { label: "Express", href: "/technologies/framework/express" },
          { label: "Spring Boot", href: "/technologies/framework/spring-boot" },
        ],
      },
      {
        label: "Mobile",
        href: "/technologies/mobile",
        children: [
          { label: "Flutter", href: "/technologies/mobile/flutter" },
          { label: "Java", href: "/technologies/mobile/java-mobile" },
          { label: "React Native", href: "/technologies/mobile/react-native" },
        ],
      },
      {
        label: "DevOps",
        href: "/technologies/devops",
        children: [
          { label: "AWS", href: "/technologies/devops/aws" },
          { label: "Azure", href: "/technologies/devops/azure" },
          { label: "Google Cloud", href: "/technologies/devops/google-cloud" },
        ],
      },
      {
        label: "More",
        href: "/technologies/more",
        children: [
          { label: "Salesforce", href: "/technologies/more/salesforce" },
          { label: "MS Power Apps", href: "/technologies/more/ms-power-apps" },
          { label: "Metaverse", href: "/technologies/more/metaverse" },
        ],
      },
    ],
  },

  {
    label: "Resources",
    children: [
      { label: "Internship Alumni", href: "/resources/interns-alumni" },
      { label: "Our Team", href: "/resources/our-team" },
      { label: "Portfolio", href: "/resources/portfolio" },
      { label: "Career", href: "/resources/careers" },
      { label: "Blog & Articles", href: "/resources/blogs" },
      { label: "Pricing & Packages", href: "/pricing" },
    ],
  },
];

export function withDynamicProductsNavigation(products: ProductNavigationItem[], baseNavigation: MobileNavItemType[] = mobileNavigation) {
  return baseNavigation.map((item) => {
    if (item.label !== "Products") {
      return item;
    }

    return {
      ...item,
      children: products,
    };
  });
}

export function withDynamicExpertiseNavigation(categories: ExpertiseNavigationCategoryItem[], baseNavigation: MobileNavItemType[] = mobileNavigation) {
  return baseNavigation.map((item) => {
    if (item.label !== "Our Expertise") {
      return item;
    }

    return {
      ...item,
      children: categories,
    };
  });
}

export function withDynamicOffshoreNavigation(categories: OffshoreNavigationCategoryItem[], baseNavigation: MobileNavItemType[] = mobileNavigation) {
  return baseNavigation.map((item) => {
    if (item.label !== "Offshore Developer") {
      return item;
    }

    return {
      ...item,
      children: categories,
    };
  });
}
