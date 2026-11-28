/**
 * ALPIXN service price catalog — indicative starting prices in INR (GST extra), editable in
 * Admin → Pricing & chat robot. Categories follow the services listed on the website (Our Expertise,
 * Offshore Developers, Products) plus services requested by ALPIXN (branding, social media, AI calling,
 * astrology tech, hosting). Figures were set from 2026 Indian market ranges for agency work; the chat
 * assistant uses them only to give non-binding estimates.
 */

export type Billing = "one-time" | "monthly" | "yearly" | "per-minute" | "per-user-monthly";

export type PricePackage = {
  id: string;
  name: string;
  /** Lower bound of the price (INR). */
  priceFrom: number;
  /** Upper bound (INR). 0 means "and above" / custom quote. */
  priceTo: number;
  billing: Billing;
  timeline: string;
  bestFor: string;
  includes: string[];
  /** Recurring cost shown next to the package, e.g. "₹2,999/month platform & AI usage". */
  recurring?: string;
  /** Shown instead of a price when priceFrom and priceTo are 0, e.g. "Price on request". */
  priceNote?: string;
};

export type AddOn = { id: string; name: string; price: number; billing: Billing };

export type ServiceCategory = {
  id: string;
  name: string;
  short: string;
  description: string;
  packages: PricePackage[];
  addOns: AddOn[];
  notes: string[];
};

export type PricingCatalog = {
  currency: "INR";
  gstNote: string;
  disclaimer: string;
  categories: ServiceCategory[];
};

export const BILLING_LABEL: Record<Billing, string> = {
  "one-time": "one-time",
  monthly: "/month",
  yearly: "/year",
  "per-minute": "/minute",
  "per-user-monthly": "/user/month",
};

export function formatINR(n: number) {
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

export function priceLabel(p: Pick<PricePackage, "priceFrom" | "priceTo" | "billing" | "priceNote">) {
  if (!p.priceFrom && !p.priceTo) return p.priceNote || "On request";
  const suffix = p.billing === "one-time" ? "" : BILLING_LABEL[p.billing];
  if (!p.priceTo) return `${formatINR(p.priceFrom)}+${suffix}`;
  if (p.priceTo === p.priceFrom) return `${formatINR(p.priceFrom)}${suffix}`;
  return `${formatINR(p.priceFrom)} – ${formatINR(p.priceTo)}${suffix}`;
}

const pkg = (id: string, name: string, priceFrom: number, priceTo: number, billing: Billing, timeline: string, bestFor: string, includes: string[], recurring?: string): PricePackage => ({
  id,
  name,
  priceFrom,
  priceTo,
  billing,
  timeline,
  bestFor,
  includes,
  ...(recurring ? { recurring } : {}),
});

export const DEFAULT_CATALOG: PricingCatalog = {
  currency: "INR",
  gstNote: "Prices in Indian Rupees, GST (18%) extra. International clients receive a quote in USD.",
  disclaimer:
    "These are indicative starting prices. Every project is quoted after we understand your requirements, references and timeline — the final price can be lower or higher. Industry solutions (FinTech, HealthTech, Retail, EdTech and others) are priced using the service packages below. We work with clients at every budget and can plan your project in phases.",
  categories: [
    {
      id: "web-development",
      name: "Website & Web App Development",
      short: "Business websites, web applications and portals",
      description: "Responsive, SEO-ready websites and custom web applications built with React, Next.js, Node.js, Python, PHP or .NET.",
      packages: [
        pkg("web-starter", "Starter Website", 14999, 29999, "one-time", "1–2 weeks", "New businesses and single-product companies", ["Up to 5 pages", "Mobile-friendly design", "Contact form & WhatsApp button", "Basic on-page SEO", "1 round of revisions"]),
        pkg("web-business", "Business Website", 35000, 75000, "one-time", "3–5 weeks", "Growing companies that need a site they can update", ["Up to 15 pages", "Custom design from your brand", "Admin panel / CMS", "Blog, analytics, speed optimisation", "3 rounds of revisions"]),
        pkg("web-app", "Custom Web Application", 150000, 450000, "one-time", "6–12 weeks", "Portals, dashboards, booking systems, marketplaces", ["UI/UX design", "Next.js / React front end", "API & database back end", "Roles, payments and integrations", "Testing & deployment"]),
        pkg("web-enterprise", "Enterprise Web Platform", 500000, 0, "one-time", "3+ months", "High-traffic platforms and large organisations", ["Discovery & architecture", "Design system", "Security, accessibility & load testing", "Dedicated project manager"]),
      ],
      addOns: [
        { id: "web-extra-page", name: "Extra page", price: 2500, billing: "one-time" },
        { id: "web-ecommerce", name: "E-commerce module (catalogue, cart, payments, orders)", price: 60000, billing: "one-time" },
        { id: "web-booking", name: "Booking / appointment system", price: 25000, billing: "one-time" },
        { id: "web-lang", name: "Additional language", price: 15000, billing: "one-time" },
      ],
      notes: ["Domain, hosting and paid third-party services are billed separately at actuals."],
    },
    {
      id: "mobile-app",
      name: "Mobile App Development",
      short: "Android, iOS and cross-platform apps",
      description: "Flutter, React Native, Kotlin, .NET MAUI or Ionic apps — from MVP to large platforms.",
      packages: [
        pkg("app-mvp", "MVP App", 150000, 300000, "one-time", "6–10 weeks", "Startups validating an idea", ["Android + iOS (Flutter / React Native)", "Up to ~10 screens", "Login & push notifications", "Simple admin panel", "Store publishing"]),
        pkg("app-growth", "Business App", 300000, 800000, "one-time", "3–5 months", "Businesses launching a full product", ["Custom UI/UX", "Payments, chat, maps", "Scalable back end & admin", "Analytics & crash reporting"]),
        pkg("app-advanced", "Advanced App", 800000, 2500000, "one-time", "5–9 months", "On-demand, marketplace or real-time apps", ["Customer, partner & admin apps", "Real-time tracking / video", "AI features", "Load & security testing"]),
        pkg("app-enterprise", "Enterprise App", 2500000, 0, "one-time", "9+ months", "Large platforms and regulated industries", ["Dedicated team", "Microservices", "Compliance & audits", "SLA support"]),
      ],
      addOns: [{ id: "app-maint", name: "App maintenance & updates", price: 15000, billing: "monthly" }],
      notes: ["Apple developer account ($99/year) and Google Play ($25 one-time) are paid directly by you."],
    },
    {
      id: "custom-software",
      name: "Custom Software, SaaS, CRM & ERP",
      short: "Business software, SaaS products and enterprise systems",
      description: "Custom software, SaaS platforms, CRM and ERP systems, enterprise software and low-code solutions built around your process.",
      packages: [
        pkg("sw-lowcode", "Low-code Solution", 60000, 150000, "one-time", "2–4 weeks", "Internal tools and approvals on Power Apps, Retool or n8n", ["Process mapping", "Low-code app & automations", "Permissions & governance", "Team training"]),
        pkg("sw-starter", "Custom Software", 150000, 500000, "one-time", "6–12 weeks", "One department or workflow, CRM", ["Requirement workshop", "Web app with roles & reports", "Up to 2 integrations", "3 months support"]),
        pkg("sw-growth", "SaaS / ERP Platform", 500000, 1500000, "one-time", "3–6 months", "SaaS products and multi-module ERP", ["Custom architecture", "Subscriptions & billing (SaaS)", "Dashboards & analytics", "Data migration"]),
        pkg("sw-enterprise", "Enterprise Software", 1500000, 0, "one-time", "6+ months", "Enterprise systems and transformation", ["Discovery & roadmap", "Integration with SAP / Oracle / Dynamics", "Security, audit logs, SLA", "Dedicated team"]),
      ],
      addOns: [{ id: "sw-integration", name: "Extra integration (payment, ERP, CRM, API)", price: 25000, billing: "one-time" }],
      notes: ["Annual maintenance (AMC) is typically 15–20% of the project cost per year."],
    },
    {
      id: "ui-ux",
      name: "UI/UX Design",
      short: "Research, wireframes, product design and design systems",
      description: "User research, wireframes, clickable prototypes, UI design and design systems for web and mobile products.",
      packages: [
        pkg("ux-audit", "UX Audit", 25000, 50000, "one-time", "1–2 weeks", "Existing products with usability problems", ["Heuristic review", "Key journey analysis", "Prioritised fixes report"]),
        pkg("ux-product", "Product Design", 60000, 200000, "one-time", "3–6 weeks", "New websites and apps", ["Wireframes & user flows", "Clickable prototype", "High-fidelity UI (web or app)", "Developer handover"]),
        pkg("ux-system", "Design System", 200000, 500000, "one-time", "6–10 weeks", "Products with several teams or apps", ["Component library in Figma", "Tokens & guidelines", "Coded components (optional)"]),
        pkg("ux-enterprise", "Enterprise UX", 500000, 0, "one-time", "3+ months", "Large platforms", ["User research programme", "Usability testing", "Accessibility (WCAG)", "Ongoing design support"]),
      ],
      addOns: [{ id: "ux-test", name: "Usability testing round (5 users)", price: 30000, billing: "one-time" }],
      notes: [],
    },
    {
      id: "integration-modernization",
      name: "API Integration & App Modernization",
      short: "Connect systems and modernise legacy applications",
      description: "REST/GraphQL APIs, third-party integrations and step-by-step modernisation of legacy applications.",
      packages: [
        pkg("int-single", "Single Integration", 25000, 75000, "one-time", "1–3 weeks", "Connecting two systems (CRM, payment, ERP)", ["API mapping", "Integration build & tests", "Error handling & retries", "Documentation"]),
        pkg("int-api", "Custom API Development", 100000, 300000, "one-time", "4–8 weeks", "Products and partners that need APIs", ["REST or GraphQL API", "Auth & rate limiting", "OpenAPI docs", "Monitoring"]),
        pkg("mod-assessment", "Modernization Assessment", 50000, 150000, "one-time", "2–4 weeks", "Legacy apps that need a plan", ["Code & architecture review", "Cloud readiness", "Phased roadmap & estimate"]),
        pkg("mod-project", "Application Modernization", 300000, 0, "one-time", "2+ months", "Re-platforming or re-architecting legacy systems", ["Phased migration", "Modern stack & cloud", "Automated tests", "Zero-downtime cut-over"]),
      ],
      addOns: [],
      notes: [],
    },
    {
      id: "cloud-devops-data",
      name: "Cloud, DevOps & Data Analytics",
      short: "AWS, Azure, Google Cloud, CI/CD and BI dashboards",
      description: "Cloud consulting and migration, DevOps automation, data pipelines and analytics dashboards.",
      packages: [
        pkg("cloud-setup", "Cloud Setup / Migration", 50000, 250000, "one-time", "1–4 weeks", "Moving apps to AWS, Azure or Google Cloud", ["Architecture & landing zone", "Migration of apps & data", "Security & backups", "Cost optimisation"]),
        pkg("devops", "DevOps & CI/CD", 75000, 250000, "one-time", "2–6 weeks", "Teams releasing often", ["CI/CD pipelines", "Docker / Kubernetes", "Infrastructure as code", "Monitoring & alerts"]),
        pkg("data-bi", "Data & BI Dashboards", 100000, 400000, "one-time", "3–8 weeks", "Reporting across your systems", ["Data pipelines (ETL)", "Data warehouse", "Power BI / Metabase dashboards", "Data quality checks"]),
        pkg("cloud-managed", "Managed Cloud & DevOps", 25000, 150000, "monthly", "Monthly", "Ongoing operations", ["24×7 monitoring", "Patching & backups", "Cost reviews", "On-call support"]),
      ],
      addOns: [],
      notes: ["Cloud provider bills (AWS / Azure / GCP) are paid at actuals."],
    },
    {
      id: "ai-chatbot",
      name: "AI Chatbot & ChatGPT Integration",
      short: "Website and WhatsApp AI chatbots, GenAI features in your software",
      description: "AI chatbots that answer from your knowledge base and capture leads, plus ChatGPT / GenAI features inside your existing software.",
      packages: [
        pkg("bot-starter", "Website AI Chatbot", 24999, 49999, "one-time", "1–2 weeks", "FAQ and lead capture on your website", ["Trained on your website & documents", "Lead capture to email / CRM", "Branded chat widget", "English + Hindi"], "₹2,999/month platform & AI usage"),
        pkg("bot-whatsapp", "WhatsApp AI Bot", 50000, 100000, "one-time", "2–4 weeks", "Businesses selling and supporting on WhatsApp", ["WhatsApp Business API setup", "AI answers + menus", "Orders & appointment booking", "Human handover"], "₹4,999/month + Meta conversation charges"),
        pkg("bot-genai", "ChatGPT / GenAI Integration", 100000, 300000, "one-time", "3–6 weeks", "Adding AI features to your existing software", ["Use-case workshop", "RAG on your documents", "Guardrails & evaluation", "API integration"], "AI usage billed at actuals"),
        pkg("bot-agent", "AI Agent + CRM", 150000, 450000, "one-time", "4–8 weeks", "Sales & support automation across channels", ["Website, WhatsApp, Instagram", "CRM / helpdesk integration", "Order status, refunds, bookings", "Analytics dashboard"], "₹9,999+/month depending on volume"),
      ],
      addOns: [
        { id: "bot-lang", name: "Extra language", price: 10000, billing: "one-time" },
        { id: "bot-integration", name: "Extra integration (CRM, ERP, sheet)", price: 15000, billing: "one-time" },
      ],
      notes: ["AI model usage and WhatsApp (Meta) charges depend on message volume and are billed at actuals."],
    },
    {
      id: "ai-calling",
      name: "Multilingual AI Calling System",
      short: "AI voice agents for inbound and outbound calls",
      description: "AI voice agents that call, answer, qualify leads, book appointments and send reminders — in Hindi, English and regional languages.",
      packages: [
        pkg("call-starter", "Starter Voice Agent", 75000, 125000, "one-time", "2–3 weeks", "One use case, e.g. lead qualification or reminders", ["1 voice agent, 2 languages", "Script & voice design", "Call logs and recordings", "Sheet / CRM sync"], "Usage approx. ₹4–6/minute"),
        pkg("call-growth", "Multilingual Calling", 150000, 300000, "one-time", "3–6 weeks", "Sales and support teams with daily call volume", ["Up to 3 agents, 5+ languages", "Inbound + outbound campaigns", "CRM integration & dashboards", "Human transfer"], "Usage approx. ₹3.5–5/minute"),
        pkg("call-business", "Contact-centre AI", 400000, 1000000, "one-time", "2–3 months", "High-volume contact centres", ["Multiple agent flows", "Custom voice & knowledge base", "Analytics & QA scoring", "Telephony / dialer integration"], "Volume pricing from ~₹3/minute"),
        pkg("call-enterprise", "Enterprise", 1000000, 0, "one-time", "3+ months", "Banks, telecom, large enterprises", ["Private deployment option", "Compliance & data residency", "Custom integrations", "SLA support"]),
      ],
      addOns: [{ id: "call-number", name: "Dedicated phone number", price: 1500, billing: "monthly" }],
      notes: ["Per-minute usage covers speech, AI and telephony; the final rate depends on monthly volume."],
    },
    {
      id: "ai-development",
      name: "AI, GenAI & Automation Development",
      short: "AI agents, LLMs, computer vision, NLP, predictive analytics, automation",
      description: "AI agents and automation, LLM development and fine-tuning (Llama, Mistral, GPT, Claude), computer vision, NLP and predictive analytics.",
      packages: [
        pkg("ai-auto", "AI Automation", 50000, 150000, "one-time", "2–4 weeks", "Automating document, email and data work", ["Process mapping", "AI + workflow automation", "Human review for exceptions", "Audit log"]),
        pkg("ai-agent", "AI Agent / LLM App", 150000, 500000, "one-time", "4–8 weeks", "Agents, copilots and private LLM apps", ["Tool-using agents", "RAG on your data", "Open or commercial models", "Evaluation & guardrails"], "AI usage / GPU billed at actuals"),
        pkg("ai-ml", "Computer Vision / NLP / Predictive", 400000, 1500000, "one-time", "2–4 months", "Custom models trained on your data", ["Data preparation", "Model training & testing", "Deployment (cloud or edge)", "Monitoring & retraining"]),
        pkg("ai-finetune", "LLM Fine-tuning & Private LLM", 300000, 0, "one-time", "4+ weeks", "Domain-specific or on-premise language models", ["Dataset creation", "LoRA / full fine-tuning", "Self-hosting (vLLM)", "Benchmarks vs baseline"]),
      ],
      addOns: [{ id: "ai-poc", name: "Proof of concept (2 weeks)", price: 60000, billing: "one-time" }],
      notes: ["Cloud GPU and AI model usage are billed at actuals."],
    },
    {
      id: "ai-consulting",
      name: "AI Consulting & Data Annotation",
      short: "AI strategy, GenAI consulting and training data",
      description: "AI and GenAI consulting to find the right use cases, plus image, video, text and audio annotation for model training.",
      packages: [
        pkg("aic-workshop", "AI Discovery Workshop", 40000, 80000, "one-time", "1 week", "Teams starting with AI", ["Use-case workshop", "Prioritised opportunity list", "Next-step recommendations"]),
        pkg("aic-roadmap", "AI Strategy & Roadmap", 150000, 400000, "one-time", "3–6 weeks", "Leadership planning AI adoption", ["Readiness & data assessment", "Build vs buy advice", "Governance & policy", "Pilot plan with budget ranges"]),
        pkg("ann-pilot", "Data Annotation Pilot", 25000, 75000, "one-time", "1–2 weeks", "Testing quality before scaling", ["Guidelines & calibration", "Sample batch labelled", "Quality report"]),
        pkg("ann-scale", "Data Annotation at Scale", 50000, 0, "monthly", "Monthly", "Ongoing training-data needs", ["Image, video, LiDAR, text, audio", "Multi-level QA", "Secure workflow", "Pricing per volume"]),
      ],
      addOns: [],
      notes: ["Annotation is usually priced per item or per hour once guidelines are agreed."],
    },
    {
      id: "dedicated-team",
      name: "Hire Offshore Developers",
      short: "Backend, frontend, mobile, AI, DevOps and platform experts",
      description: "Full-time offshore developers and dedicated teams — Node.js, Python, Java, .NET, PHP, React, Angular, Next.js, Flutter, React Native, AI/LLM engineers, AWS/Azure/GCP, Salesforce, Power Apps and more.",
      packages: [
        pkg("team-dev", "Developer (2–4 yrs)", 90000, 150000, "monthly", "Start in 1–2 weeks", "Backend, frontend, mobile or full-stack work", ["Full-time (160 hrs/month)", "Your tools & time-zone overlap", "Replacement if not a fit"]),
        pkg("team-senior", "Senior Developer (5+ yrs)", 150000, 250000, "monthly", "Start in 1–2 weeks", "Complex features and technical ownership", ["Full-time", "Code reviews & architecture", "Direct communication"]),
        pkg("team-ai", "AI / ML / LLM Engineer", 200000, 350000, "monthly", "Start in 2–3 weeks", "AI, LLM, computer vision and NLP projects", ["Full-time", "LLM, RAG, ML experience", "MLOps & deployment"]),
        pkg("team-squad", "Dedicated Team / Outsourcing", 450000, 0, "monthly", "Start in 2–4 weeks", "Product teams or full project outsourcing", ["Project manager", "Developers, QA, designer", "Sprint demos & reporting", "Scale up or down"]),
      ],
      addOns: [
        { id: "team-devops", name: "DevOps / Cloud engineer (AWS, Azure, GCP)", price: 150000, billing: "monthly" },
        { id: "team-platform", name: "Platform expert (Salesforce, Power Apps, Metaverse)", price: 170000, billing: "monthly" },
      ],
      notes: ["Rates vary by technology and seniority; international rates are quoted in USD."],
    },
    {
      id: "products",
      name: "ALPIXN Products",
      short: "Ready-made AI software you can start using quickly",
      description: "Our products: Salon Management, Multilingual AI, AI Website & App Builder, AI HR & Payroll, AI Taxation Management, AI Design Studio and AI Project & Task Management.",
      packages: [
        { ...pkg("prod-salon", "Salon Management", 0, 0, "monthly", "Quick setup", "Salons and spas", ["Appointments, inventory, customers", "Book a demo for plans"]), priceNote: "Price on request" },
        { ...pkg("prod-multilingual", "Multilingual AI", 0, 0, "monthly", "Quick setup", "Real-time translation and multilingual communication", ["100+ languages", "Book a demo for plans"]), priceNote: "Price on request" },
        { ...pkg("prod-business", "AI HR & Payroll · AI Taxation · AI Project Management", 0, 0, "monthly", "Quick setup", "HR, finance and project teams", ["Automated processing", "Book a demo for plans"]), priceNote: "Price on request" },
        { ...pkg("prod-creative", "AI Website & App Builder · AI Design Studio", 0, 0, "monthly", "Instant", "Creating websites, apps and brand assets with AI", ["AI design & content", "Book a demo for plans"]), priceNote: "Price on request" },
      ],
      addOns: [],
      notes: ["Product plans depend on users and usage — our team shares pricing with a demo."],
    },
    {
      id: "branding",
      name: "Branding & Design",
      short: "Logo, brand identity and marketing design",
      description: "Logos, brand identity, stationery, packaging and marketing creatives.",
      packages: [
        pkg("brand-logo", "Logo Design", 7999, 14999, "one-time", "5–7 days", "New businesses that need a logo", ["3 logo concepts", "3 revision rounds", "All file formats", "Colour palette"]),
        pkg("brand-starter", "Brand Starter", 24999, 44999, "one-time", "2–3 weeks", "Small businesses launching properly", ["Logo + colours + typography", "Business card & letterhead", "Social media kit", "Mini brand guide"]),
        pkg("brand-identity", "Brand Identity", 60000, 125000, "one-time", "4–6 weeks", "Growing companies and rebrands", ["Brand strategy", "Full visual identity", "Brand guidelines book", "Stationery & templates"]),
        pkg("brand-enterprise", "Enterprise Brand", 200000, 0, "one-time", "6+ weeks", "Large organisations and multi-brand portfolios", ["Research & positioning", "Brand architecture", "Packaging / environment design", "Rollout support"]),
      ],
      addOns: [
        { id: "brand-packaging", name: "Packaging design (per SKU)", price: 12000, billing: "one-time" },
        { id: "brand-deck", name: "Pitch deck / company profile", price: 15000, billing: "one-time" },
      ],
      notes: [],
    },
    {
      id: "social-media",
      name: "Social Media Management",
      short: "Content, posting and community management",
      description: "Monthly social media management for Instagram, Facebook, LinkedIn, YouTube and X.",
      packages: [
        pkg("smm-starter", "Starter", 9999, 14999, "monthly", "Monthly", "Small businesses starting on social media", ["2 platforms", "12 posts/month", "Captions & hashtags", "Monthly report"]),
        pkg("smm-growth", "Growth", 24999, 39999, "monthly", "Monthly", "Brands building a steady presence", ["3 platforms", "20 posts incl. 4 reels", "Content calendar", "Community replies", "Ads management (up to ₹50k spend)"]),
        pkg("smm-pro", "Pro", 49999, 90000, "monthly", "Monthly", "Brands focused on growth and leads", ["4–5 platforms", "30 posts incl. 8–10 reels", "Paid campaigns & retargeting", "Bi-weekly reporting"]),
        pkg("smm-enterprise", "Enterprise", 100000, 0, "monthly", "Monthly", "Large brands and multi-location businesses", ["Dedicated social team", "Video production", "Brand monitoring", "Custom KPIs"]),
      ],
      addOns: [{ id: "smm-reel", name: "Extra reel / short video", price: 2500, billing: "one-time" }],
      notes: ["Ad spend is paid directly to Meta / Google / LinkedIn and is not included."],
    },
    {
      id: "astrology",
      name: "Astrology & Numerology Tech",
      short: "Astrology websites, kundli & numerology tools, consultation apps",
      description: "Websites, report generators and apps for astrologers, numerologists and spiritual platforms.",
      packages: [
        pkg("astro-site", "Astrologer Website", 29999, 59999, "one-time", "2–3 weeks", "Individual astrologers and numerologists", ["Personal brand website", "Consultation booking & payments", "WhatsApp chat button", "Blog & horoscope pages"]),
        pkg("astro-tools", "Kundli / Numerology Tools", 90000, 200000, "one-time", "4–8 weeks", "Practices selling reports and calculators", ["Kundli, matching, panchang or numerology calculators", "PDF report generation", "Paid reports with payment gateway", "Admin panel"], "Astrology data API ₹2,000–10,000/month (if used)"),
        pkg("astro-app", "Consultation App", 400000, 1000000, "one-time", "3–5 months", "Astrology platforms with chat / call consultations", ["User & astrologer apps", "Chat, voice & video consultations", "Wallet & per-minute billing", "Admin & payouts"]),
        pkg("astro-marketplace", "Marketplace Platform", 1200000, 0, "one-time", "5+ months", "Large astrology marketplaces", ["Multi-language", "Live sessions & puja booking", "Store for gemstones / products", "AI astrology assistant"]),
      ],
      addOns: [{ id: "astro-ai", name: "AI astrology / numerology chat assistant", price: 75000, billing: "one-time" }],
      notes: ["Calculation accuracy relies on licensed ephemeris data or a third-party astrology API, billed at actuals."],
    },
    {
      id: "hosting",
      name: "Domain, Hosting & Maintenance",
      short: "Domains, hosting, business email and website care",
      description: "Everything needed to keep your website or app online, secure and up to date.",
      packages: [
        pkg("host-basic", "Shared Hosting", 3500, 7000, "yearly", "Same day", "Small websites", ["Hosting with SSL", "Daily backups", "Setup by our team"]),
        pkg("host-cloud", "Cloud / VPS Hosting", 1500, 6000, "monthly", "1–2 days", "Business sites and web apps", ["AWS / DigitalOcean / Azure", "SSL, CDN, monitoring", "Server management"]),
        pkg("host-managed", "Managed Cloud (AWS)", 8000, 30000, "monthly", "1 week", "Apps with traffic and SaaS", ["Auto-scaling setup", "Security hardening", "24×7 monitoring", "Monthly cost review"]),
        pkg("host-care", "Website / App Care Plan", 2999, 25000, "monthly", "Monthly", "Keeping software updated and secure", ["Updates & security patches", "Uptime monitoring", "Small content changes", "Monthly backup & report"]),
      ],
      addOns: [
        { id: "host-domain-com", name: ".com domain", price: 1100, billing: "yearly" },
        { id: "host-domain-in", name: ".in domain", price: 800, billing: "yearly" },
        { id: "host-email", name: "Business email (Google Workspace / Zoho)", price: 150, billing: "per-user-monthly" },
      ],
      notes: ["Domain and cloud costs can be paid directly by you to the provider; you always own your domain."],
    },
    {
      id: "third-party",
      name: "Third-party APIs & Usage",
      short: "Payment, WhatsApp, SMS, maps, AI and other API costs",
      description: "Services your project may use. These are paid at actual cost to the provider.",
      packages: [
        { ...pkg("api-payments", "Payment gateway", 0, 0, "one-time", "—", "Online payments", ["Razorpay / Stripe / PayU: ~2% per transaction", "Integration included in most packages"]), priceNote: "~2% per transaction" },
        { ...pkg("api-whatsapp", "WhatsApp Business API", 0, 0, "monthly", "—", "Messaging & chatbots", ["Meta per-conversation charges", "BSP platform fee if applicable"]), priceNote: "At actuals (Meta)" },
        { ...pkg("api-ai", "AI model usage", 0, 0, "monthly", "—", "Chatbots, AI features", ["OpenAI / Claude / Gemini pay per use", "We estimate monthly usage before launch"]), priceNote: "Pay per use" },
        { ...pkg("api-other", "SMS, email, maps, telephony", 0, 0, "monthly", "—", "Notifications & location", ["Billed at actuals by the provider"]), priceNote: "At actuals" },
      ],
      addOns: [],
      notes: ["Integration work for each API is part of the project quote; usage charges are separate."],
    },
  ],
};

/** Compact text version of the catalog for the AI assistant's instructions. */
export function catalogForAi(c: PricingCatalog) {
  return c.categories
    .map(
      (cat) =>
        `## ${cat.name} [${cat.id}]\n${cat.packages.map((p) => `- ${p.name} [${p.id}]: ${priceLabel(p)}${p.recurring ? ` (+ ${p.recurring})` : ""}; ${p.timeline}; best for ${p.bestFor}`).join("\n")}${
          cat.addOns.length ? `\nAdd-ons: ${cat.addOns.map((a) => `${a.name} [${a.id}] ${formatINR(a.price)}${a.billing === "one-time" ? "" : BILLING_LABEL[a.billing]}`).join("; ")}` : ""
        }${cat.notes.length ? `\nNotes: ${cat.notes.join(" ")}` : ""}`
    )
    .join("\n\n");
}
