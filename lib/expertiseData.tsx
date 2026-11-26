export interface ExpertiseHeroData {
  slug: string;
  heroTitle: string;
  heroSubtitle?: string;
  heroDescription: string;
  category: string;
}

export const expertiseHeroData: Record<string, ExpertiseHeroData> = {
  // ============ SOFTWARE SOLUTIONS ============
  "software-development": {
    slug: "software-development",
    category: "software-solution",
    heroTitle: "Software Development Services",
    heroSubtitle: "Build Scalable, Robust Applications",
    heroDescription:
      "Custom software development services to build scalable, robust, and high-performance applications tailored to your business needs with modern technologies and agile methodologies.",
  },
  "web-app-development": {
    slug: "web-app-development",
    category: "software-solution",
    heroTitle: "Web Application Development",
    heroSubtitle: "Modern, Responsive Web Solutions",
    heroDescription:
      "Professional web application development using cutting-edge technologies like React, Next.js, and Node.js to create responsive, user-friendly, and scalable web solutions.",
  },
  "mobile-app-development": {
    slug: "mobile-app-development",
    category: "software-solution",
    heroTitle: "Mobile App Development",
    heroSubtitle: "Native & Cross-Platform Applications",
    heroDescription:
      "Native iOS and Android mobile application development along with cross-platform solutions using React Native and Flutter for exceptional user experience.",
  },
  "api-integration": {
    slug: "api-integration",
    category: "software-solution",
    heroTitle: "API Integration Services",
    heroSubtitle: "Seamless System Connectivity",
    heroDescription:
      "Comprehensive API integration services to connect your applications with third-party services, payment gateways, and internal systems for seamless data flow.",
  },
  "application-modernization": {
    slug: "application-modernization",
    category: "software-solution",
    heroTitle: "Application Modernization",
    heroSubtitle: "Modernize Legacy Systems",
    heroDescription:
      "Transform legacy applications with cloud-native architectures, microservices, containerization, and modern frameworks to improve performance and scalability.",
  },
  "application-product": {
    slug: "application-product",
    category: "software-solution",
    heroTitle: "Application Product",
    heroSubtitle: "Modernize Legacy Systems",
    heroDescription:
      "Transform legacy applications with cloud-native architectures, microservices, containerization, and modern frameworks to improve performance and scalability.",
  },
  "ui-ux-services": {
    slug: "ui-ux-services",
    category: "software-solution",
    heroTitle: "UI/UX Design Services",
    heroSubtitle: "User-Centered Design Solutions",
    heroDescription:
      "Professional UI/UX design services focusing on user experience research, wireframing, prototyping, and creating intuitive digital interfaces.",
  },
  "saas-development": {
    slug: "saas-development",
    category: "software-solution",
    heroTitle: "SaaS Development",
    heroSubtitle: "Cloud-Based Software Solutions",
    heroDescription:
      "End-to-end SaaS product development with multi-tenancy architecture, subscription management, and scalable cloud infrastructure.",
  },
  "staff-augmentation": {
    slug: "staff-augmentation",
    category: "software-solution",
    heroTitle: "Staff Augmentation Services",
    heroSubtitle: "Scale Your Development Team",
    heroDescription:
      "Flexible staff augmentation services to scale your development team with experienced engineers, designers, and QA specialists.",
  },
  "data-analytics": {
    slug: "data-analytics",
    category: "software-solution",
    heroTitle: "Data Analytics Solutions",
    heroSubtitle: "Data-Driven Business Insights",
    heroDescription:
      "Comprehensive data analytics solutions including data visualization, business intelligence, predictive analytics, and reporting dashboards.",
  },
  "cloud-consulting": {
    slug: "cloud-consulting",
    category: "software-solution",
    heroTitle: "Cloud Consulting Services",
    heroSubtitle: "Cloud Migration & Optimization",
    heroDescription:
      "Expert cloud consulting services for AWS, Azure, and Google Cloud including migration, architecture design, cost optimization, and DevOps implementation.",
  },
  "devops-services": {
    slug: "devops-services",
    category: "software-solution",
    heroTitle: "DevOps Services",
    heroSubtitle: "Automate & Streamline Operations",
    heroDescription:
      "End-to-end DevOps services including CI/CD pipeline setup, infrastructure as code, container orchestration, and monitoring solutions.",
  },
  "low-code-no-code": {
    slug: "low-code-no-code",
    category: "software-solution",
    heroTitle: "Low-Code/No-Code Development",
    heroSubtitle: "Rapid Application Development",
    heroDescription:
      "Low-code and no-code development solutions to build applications quickly with minimal coding using platforms like Bubble, Retool, and OutSystems.",
  },
  "enterprise-software": {
    slug: "enterprise-software",
    category: "software-solution",
    heroTitle: "Enterprise Software Development",
    heroSubtitle: "Scalable Enterprise Solutions",
    heroDescription:
      "Custom enterprise software development for large organizations including ERP, CRM, HRMS, and supply chain management systems.",
  },
  "software-outsourcing": {
    slug: "software-outsourcing",
    category: "software-solution",
    heroTitle: "Software Outsourcing",
    heroSubtitle: "Dedicated Development Teams",
    heroDescription:
      "Complete software outsourcing services with dedicated development teams, project management, and quality assurance for your projects.",
  },
  "crm-development": {
    slug: "crm-development",
    category: "software-solution",
    heroTitle: "CRM Development",
    heroSubtitle: "Custom Customer Relationship Management",
    heroDescription:
      "Custom CRM software development to manage customer interactions, sales pipelines, marketing automation, and customer support.",
  },
  "erp-software": {
    slug: "erp-software",
    category: "software-solution",
    heroTitle: "ERP Software Development",
    heroSubtitle: "Enterprise Resource Planning Solutions",
    heroDescription:
      "Custom ERP software development integrating finance, inventory, production, supply chain, and human resources management.",
  },

  // ============ ARTIFICIAL INTELLIGENCE ============
  "genai-development": {
    slug: "genai-development",
    category: "artificial-intelligence",
    heroTitle: "Generative AI Development",
    heroSubtitle: "Create with Artificial Intelligence",
    heroDescription:
      "Generative AI solutions for content creation, image generation, code generation, and creative applications using advanced language models.",
  },
  "genai-consulting": {
    slug: "genai-consulting",
    category: "artificial-intelligence",
    heroTitle: "GenAI Consulting Services",
    heroSubtitle: "Strategic AI Implementation",
    heroDescription:
      "Expert generative AI consulting to identify opportunities, develop strategies, and implement AI solutions that drive business value.",
  },
  "ai-development": {
    slug: "ai-development",
    category: "artificial-intelligence",
    heroTitle: "AI Development Services",
    heroSubtitle: "End-to-End AI Solutions",
    heroDescription:
      "Comprehensive AI development services including machine learning, deep learning, natural language processing, and computer vision solutions.",
  },
  "ai-agent-development": {
    slug: "ai-agent-development",
    category: "artificial-intelligence",
    heroTitle: "AI Agent Development",
    heroSubtitle: "Intelligent Autonomous Agents",
    heroDescription:
      "Development of AI agents capable of autonomous decision-making, task automation, and intelligent workflow management.",
  },
  "ai-automation-services": {
    slug: "ai-automation-services",
    category: "artificial-intelligence",
    heroTitle: "AI Automation Services",
    heroSubtitle: "Intelligent Process Automation",
    heroDescription:
      "AI-powered automation services to streamline business processes, reduce manual work, and improve operational efficiency.",
  },
  "ai-software-development": {
    slug: "ai-software-development",
    category: "artificial-intelligence",
    heroTitle: "AI Software Development",
    heroSubtitle: "Custom AI Applications",
    heroDescription:
      "Custom AI software development integrating machine learning models into production applications with scalable architecture.",
  },
  "ai-data-annotation": {
    slug: "ai-data-annotation",
    category: "artificial-intelligence",
    heroTitle: "AI Data Annotation",
    heroSubtitle: "High-Quality Training Data",
    heroDescription:
      "Professional AI data annotation services including image labeling, text classification, audio transcription, and video annotation for ML training.",
  },
  "llms-development": {
    slug: "llms-development",
    category: "artificial-intelligence",
    heroTitle: "LLMs Development",
    heroSubtitle: "Large Language Model Solutions",
    heroDescription:
      "Development and fine-tuning of large language models for natural language understanding, text generation, and conversational AI.",
  },
  "genai-integration": {
    slug: "genai-integration",
    category: "artificial-intelligence",
    heroTitle: "GenAI Integration",
    heroSubtitle: "Integrate AI into Your Workflow",
    heroDescription:
      "Seamless integration of generative AI capabilities into existing applications, workflows, and business processes.",
  },
  "ai-consulting-services": {
    slug: "ai-consulting-services",
    category: "artificial-intelligence",
    heroTitle: "AI Consulting Services",
    heroSubtitle: "Strategic AI Advisory",
    heroDescription:
      "Comprehensive AI consulting services including AI strategy development, technology assessment, implementation planning, and ROI analysis.",
  },
  "llm-fine-tuning": {
    slug: "llm-fine-tuning",
    category: "artificial-intelligence",
    heroTitle: "LLM Fine-Tuning",
    heroSubtitle: "Customize Language Models",
    heroDescription:
      "Fine-tuning of large language models for domain-specific applications, improved accuracy, and customized behavior.",
  },
  "chatgpt-integration": {
    slug: "chatgpt-integration",
    category: "artificial-intelligence",
    heroTitle: "ChatGPT Integration",
    heroSubtitle: "Integrate GPT Capabilities",
    heroDescription:
      "Integration of ChatGPT and OpenAI APIs into your applications for conversational interfaces, content generation, and intelligent assistants.",
  },
  "ai-chatbot-development": {
    slug: "ai-chatbot-development",
    category: "artificial-intelligence",
    heroTitle: "AI Chatbot Development",
    heroSubtitle: "Intelligent Conversational AI",
    heroDescription:
      "AI-powered chatbot development with natural language understanding, multi-turn conversations, and seamless integration with backend systems.",
  },
  "computer-vision-development": {
    slug: "computer-vision-development",
    category: "artificial-intelligence",
    heroTitle: "Computer Vision Development",
    heroSubtitle: "Visual Intelligence Solutions",
    heroDescription:
      "Computer vision solutions including object detection, image classification, facial recognition, and video analytics.",
  },
  "mistral-ai-integration": {
    slug: "mistral-ai-integration",
    category: "artificial-intelligence",
    heroTitle: "Mistral AI Integration",
    heroSubtitle: "Open Source AI Solutions",
    heroDescription:
      "Integration of Mistral AI models for text generation, classification, and other NLP tasks with enterprise-grade deployment.",
  },
  "predictive-analytics-development": {
    slug: "predictive-analytics-development",
    category: "artificial-intelligence",
    heroTitle: "Predictive Analytics Development",
    heroSubtitle: "Data-Driven Predictions",
    heroDescription:
      "Predictive analytics solutions using machine learning to forecast trends, customer behavior, and business outcomes.",
  },
  "nlp-development-services": {
    slug: "nlp-development-services",
    category: "artificial-intelligence",
    heroTitle: "NLP Development Services",
    heroSubtitle: "Natural Language Processing",
    heroDescription:
      "Natural language processing solutions including sentiment analysis, text classification, named entity recognition, and language translation.",
  },
  "llama-integration": {
    slug: "llama-integration",
    category: "artificial-intelligence",
    heroTitle: "Llama Integration",
    heroSubtitle: "Meta's LLM Integration",
    heroDescription:
      "Integration of Meta's Llama models for various NLP tasks including text generation, summarization, and question answering.",
  },

  // ============ INDUSTRIES ============
  fintech: {
    slug: "fintech",
    category: "industries",
    heroTitle: "FinTech Solutions",
    heroSubtitle: "Innovative Financial Technology",
    heroDescription:
      "Technology solutions for the financial industry including digital banking, payment processing, blockchain, trading platforms, and regulatory compliance.",
  },
  retail: {
    slug: "retail",
    category: "industries",
    heroTitle: "Retail Technology Solutions",
    heroSubtitle: "Transform Retail Experiences",
    heroDescription:
      "Retail technology solutions including e-commerce platforms, inventory management, POS systems, customer analytics, and omnichannel retail.",
  },
  proptech: {
    slug: "proptech",
    category: "industries",
    heroTitle: "PropTech Solutions",
    heroSubtitle: "Real Estate Technology",
    heroDescription:
      "Property technology solutions including real estate platforms, property management software, virtual tours, and smart building technologies.",
  },
  automotive: {
    slug: "automotive",
    category: "industries",
    heroTitle: "Automotive Technology Solutions",
    heroSubtitle: "Drive Digital Transformation",
    heroDescription:
      "Automotive technology solutions including connected car platforms, fleet management, electric vehicle charging, and automotive e-commerce.",
  },
  "facility-management": {
    slug: "facility-management",
    category: "industries",
    heroTitle: "Facility Management Solutions",
    heroSubtitle: "Smart Facility Management",
    heroDescription:
      "Facility management software for maintenance scheduling, space management, energy optimization, and IoT integration.",
  },
  transport: {
    slug: "transport",
    category: "industries",
    heroTitle: "Transport Technology Solutions",
    heroSubtitle: "Modernize Transportation",
    heroDescription:
      "Transportation technology solutions including logistics management, fleet tracking, route optimization, and mobility platforms.",
  },
  telecom: {
    slug: "telecom",
    category: "industries",
    heroTitle: "Telecom Solutions",
    heroSubtitle: "Telecommunications Technology",
    heroDescription:
      "Telecom solutions including network management, customer support systems, billing platforms, and IoT connectivity solutions.",
  },
  "ai-data-annotation-industry": {
    slug: "ai-data-annotation-industry",
    category: "industries",
    heroTitle: "AI Data Annotation for Industries",
    heroSubtitle: "Industry-Specific Data Solutions",
    heroDescription:
      "Industry-specific AI data annotation services tailored for healthcare, automotive, retail, and other sectors requiring specialized training data.",
  },
  edtech: {
    slug: "edtech",
    category: "industries",
    heroTitle: "EdTech Solutions",
    heroSubtitle: "Educational Technology",
    heroDescription:
      "Educational technology solutions including learning management systems, virtual classrooms, educational apps, and student assessment platforms.",
  },
  insuretech: {
    slug: "insuretech",
    category: "industries",
    heroTitle: "InsurTech Solutions",
    heroSubtitle: "Insurance Technology Innovation",
    heroDescription:
      "Insurance technology solutions including policy management, claims processing, risk assessment, and customer engagement platforms.",
  },
  healthtech: {
    slug: "healthtech",
    category: "industries",
    heroTitle: "HealthTech Solutions",
    heroSubtitle: "Healthcare Technology",
    heroDescription:
      "Healthcare technology solutions including telemedicine platforms, electronic health records, medical imaging, and patient management systems.",
  },
  "media-entertainment": {
    slug: "media-entertainment",
    category: "industries",
    heroTitle: "Media & Entertainment Solutions",
    heroSubtitle: "Digital Media Innovation",
    heroDescription:
      "Media and entertainment technology solutions including content management, streaming platforms, digital rights management, and audience analytics.",
  },
};

// Helper functions
export function getExpertiseHeroData(slug: string): ExpertiseHeroData | null {
  return expertiseHeroData[slug] || null;
}

export function getAllExpertiseSlugs(): string[] {
  return Object.keys(expertiseHeroData);
}

export function getExpertiseByCategory(category: string): ExpertiseHeroData[] {
  return Object.values(expertiseHeroData).filter((data) => data.category === category);
}
