import type { ProductPageRecord, ProductSettingsRecord } from "@/lib/content-types";
import { productHeroData } from "@/lib/productDetailsData";

type ProductSeedRecord = Omit<ProductPageRecord, "_id">;

export const defaultProductSettings: ProductSettingsRecord = {
  key: "product-settings",
  menuTitle: "Innovative Products Lineup",
  menuDescription:
    "Discover a diverse suite of advanced products crafted to revolutionize how businesses operate. Each product is engineered with precision, blending cutting-edge technology and user-centric design to optimize performance and drive tangible growth.",
  menuDescriptionSecondary:
    "From automating complex workflows to enhancing efficiency and scalability, our products are designed to empower organizations with seamless, intuitive solutions.",
  menuButtonLabel: "Let's Talk",
  menuButtonHref: "/products",
  menuImageData: "/images/contact.svg",
  landingHeroTitle: "JFT AI Chatbot",
  landingHeroSubtitle: "Enhance Business Agility and Customer Support Operations",
  landingHeroDescription:
    "A transformative AI-powered chatbot solution designed to enhance customer engagement, streamline support, and boost conversion rates through intelligent, real-time interactions.",
  landingHeroButtonLabel: "Book Your Demo",
  landingHeroButtonHref: "/contact-us",
  customSupportTitle: "Empower Your Customer Support with JFT AI Chatbot",
  customSupportDescription:
    "JFT AI Chatbot, powered by advanced GenAI, seamlessly integrates with your websites and applications to provide immediate, accurate responses to customer queries. Say goodbye to delayed responses and hello to 24/7 personalized support that boosts user satisfaction and captures every opportunity for engagement and conversion.",
  customSupportImageData: "/images/ai-circle.svg",
  featuresTitle: "Cutting-edge Features that enhance Customer Experience",
  featuresDescription:
    "Explore a range of innovative features designed to understand and interact with your customers effectively, ensuring seamless support and enhanced user engagement. With 24/7 automated assistance, secure data handling, and privacy compliance, your customer support is powered by industry-leading AI.",
  featureCards: [
    {
      title: "Natural Language Understanding",
      description:
        "Utilize sophisticated NLU to comprehend customer inquiries accurately, delivering relevant and meaningful responses that resonate with user intent.",
      imageData: "/images/natural-language-understanding.png",
      buttonLabel: "View Full Details",
      buttonHref: "#",
    },
    {
      title: "AI-Driven Learning and Adaptation",
      description:
        "The chatbot evolves and adapts through continuous learning, improving its interactions over time for more personalized and effective support.",
      imageData: "/images/ai-driven-learning.png",
      buttonLabel: "View Full Details",
      buttonHref: "#",
    },
    {
      title: "Sentiment Analysis and Emotional Intelligence",
      description:
        "Leverage sentiment analysis to understand customer emotions and respond appropriately, ensuring empathetic and supportive interactions.",
      imageData: "/images/sentiment-analysis.png",
      buttonLabel: "View Full Details",
      buttonHref: "#",
    },
  ],
  transformTitle: "Transform Your Customer Engagement with JFT AI Chatbot",
  transformDescription:
    "Trusted by businesses across industries, JFT AI Chatbot is more than just an automated response tool. It’s a strategic partner in elevating customer satisfaction, reducing operational costs, and driving growth through intelligent customer interactions.",
  audienceCards: [
    {
      title: "Organizations",
      description:
        "Streamline operations and enhance customer satisfaction with AI-powered, real-time support for seamless interactions.",
      imageData: "/icons/organisation.svg",
    },
    {
      title: "Educational Institutions",
      description:
        "Provide instant academic and administrative support 24/7, improving student engagement and leveling user satisfaction.",
      imageData: "/icons/education.svg",
    },
    {
      title: "Customer Support Teams",
      description:
        "Automate routine queries, reduce response times, and focus on more complex issues with AI-driven assistance.",
      imageData: "/icons/support.svg",
    },
    {
      title: "HR & Recruitment Teams",
      description:
        "Simplify candidate interactions, automate query responses, and ensure faster, more efficient hiring processes.",
      imageData: "/icons/hr.svg",
    },
  ],
  faqTitle: "FAQs about JFT AI Chatbot",
  faqs: [
    {
      question: "What is JFT AI Chatbot?",
      answer:
        "JFT AI Chatbot is an AI-driven customer support solution that integrates with your digital platforms to provide real-time, intelligent responses to customer inquiries, enhancing user engagement and satisfaction.",
    },
    {
      question: "How does the chatbot learn and adapt?",
      answer:
        "The chatbot improves through continuous model refinement, conversation feedback, and workflow tuning so responses become more accurate over time.",
    },
    {
      question: "Is JFT AI Chatbot easy to integrate?",
      answer:
        "Yes. It is designed to integrate with websites and applications through a structured onboarding and deployment process with minimal disruption.",
    },
    {
      question: "How does JFT AI Chatbot handle sensitive data?",
      answer:
        "The platform can be configured with secure data handling practices, controlled access, and privacy-conscious workflows that align with business requirements.",
    },
    {
      question: "Can I customize the chat flows?",
      answer:
        "Yes. Chat flows, prompts, escalation paths, and support journeys can be customized to fit your business logic and customer needs.",
    },
    {
      question: "What support options are available?",
      answer:
        "Support can include deployment guidance, platform updates, implementation help, and ongoing optimization based on your selected engagement model.",
    },
  ],
  driveTitle: "Drive Better Customer Outcomes with JFT AI Chatbot",
  driveDescription: "Experience the future of customer support with a demo or contact us to discuss your specific requirements.",
  driveButtonLabel: "Speak To Our Expert Team",
  driveButtonHref: "/contact-us",
};

export function buildProductSeedRecords() {
  return Object.values(productHeroData).map((product, index) => ({
    slug: product.slug,
    navLabel:
      product.slug === "ai-website-builder"
        ? "AI Powerd Instant Website & App Builder"
        : product.slug === "ai-project-management"
          ? "AI Project & Task Management"
          : product.heroTitle.replace(/ Software$| Platform$| System$| Services$/g, ""),
    heroTitle: product.heroTitle,
    heroSubtitle: product.heroSubtitle ?? "",
    heroDescription: product.heroDescription,
    heroButtonLabel: "Book Your Demo",
    heroButtonHref: "/contact-us",
    order: index + 1,
    isPublished: true,
  })) satisfies ProductSeedRecord[];
}
