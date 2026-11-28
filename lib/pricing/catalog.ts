/**
 * ALPIXN service price catalog — indicative starting prices in INR (GST extra), editable in
 * Admin → Pricing & assistant. Figures were set from 2026 Indian market ranges for agency work;
 * the chat assistant uses them only to give non-binding estimates.
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

export function priceLabel(p: Pick<PricePackage, "priceFrom" | "priceTo" | "billing">) {
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
    "These are indicative starting prices. Every project is quoted after we understand your requirements, references and timeline — the final price can be lower or higher. We work with clients at every budget and can plan your project in phases.",
  categories: [
    {
      id: "website",
      name: "Website Development",
      short: "Business websites, landing pages and CMS sites",
      description: "Fast, responsive, SEO-ready websites for businesses of every size.",
      packages: [
        pkg("web-starter", "Starter", 14999, 24999, "one-time", "1–2 weeks", "New businesses, personal brands, single landing pages", ["Up to 5 pages", "Mobile-friendly design", "Contact form & WhatsApp button", "Basic on-page SEO", "1 round of revisions"]),
        pkg("web-business", "Business", 34999, 69999, "one-time", "3–5 weeks", "Growing SMEs that need a professional site they can update", ["Up to 15 pages", "Custom design from your brand", "CMS to edit content", "Blog, Google Analytics, speed optimisation", "3 rounds of revisions"]),
        pkg("web-advanced", "Advanced", 75000, 175000, "one-time", "6–10 weeks", "Companies needing custom features, portals or multi-language", ["Custom UI/UX design", "Next.js / React build", "Integrations (CRM, payments, booking)", "Multi-language", "Advanced SEO & performance"]),
        pkg("web-enterprise", "Enterprise", 200000, 0, "one-time", "10+ weeks", "Large organisations, high-traffic and compliance needs", ["Discovery & architecture", "Design system", "Headless CMS & integrations", "Security, accessibility, load testing", "Dedicated project manager"]),
      ],
      addOns: [
        { id: "web-extra-page", name: "Extra page", price: 2500, billing: "one-time" },
        { id: "web-copy", name: "Professional content writing (per page)", price: 1500, billing: "one-time" },
        { id: "web-lang", name: "Additional language", price: 15000, billing: "one-time" },
        { id: "web-booking", name: "Booking / appointment system", price: 20000, billing: "one-time" },
      ],
      notes: ["Domain, hosting and paid plugins/themes are billed separately at actuals."],
    },
    {
      id: "ecommerce",
      name: "E-commerce Store",
      short: "Shopify, WooCommerce and custom online stores",
      description: "Online stores with payments, shipping, inventory and marketing tools.",
      packages: [
        pkg("ecom-starter", "Starter Store", 39999, 74999, "one-time", "2–4 weeks", "Small catalogues (up to ~100 products)", ["Shopify or WooCommerce setup", "Theme customisation", "Payment gateway & shipping", "Up to 50 products uploaded"]),
        pkg("ecom-growth", "Growth Store", 90000, 180000, "one-time", "5–8 weeks", "Brands scaling online sales", ["Custom design", "Advanced filters, reviews, coupons", "WhatsApp / email notifications", "Inventory & order dashboard"]),
        pkg("ecom-custom", "Custom Commerce", 250000, 600000, "one-time", "8–14 weeks", "Marketplaces, B2B or headless commerce", ["Custom Next.js storefront", "Multi-vendor or B2B pricing", "ERP / POS integration", "Mobile-first PWA"]),
        pkg("ecom-enterprise", "Enterprise Commerce", 800000, 0, "one-time", "3+ months", "High-volume retailers", ["Scalable architecture", "Multi-region, multi-currency", "Custom integrations", "SLA support"]),
      ],
      addOns: [
        { id: "ecom-products", name: "Product upload (per 100 products)", price: 5000, billing: "one-time" },
        { id: "ecom-app", name: "Companion mobile app (Android + iOS)", price: 250000, billing: "one-time" },
      ],
      notes: ["Payment gateway fees (~2% per transaction), Shopify plan and paid apps are paid directly by you."],
    },
    {
      id: "mobile-app",
      name: "Mobile App Development",
      short: "Android, iOS and cross-platform apps",
      description: "Flutter / React Native or native apps, from MVP to large platforms.",
      packages: [
        pkg("app-mvp", "MVP", 150000, 300000, "one-time", "6–10 weeks", "Startups validating an idea", ["Android + iOS (Flutter / React Native)", "Up to ~10 screens", "Login, push notifications", "Simple admin panel", "Store publishing"]),
        pkg("app-growth", "Growth", 300000, 800000, "one-time", "3–5 months", "Businesses launching a full product", ["Custom UI/UX", "Payments, chat, maps", "Scalable back end & admin", "Analytics & crash reporting"]),
        pkg("app-advanced", "Advanced", 800000, 2500000, "one-time", "5–9 months", "On-demand, marketplace or real-time apps", ["Multiple apps (customer, partner, admin)", "Real-time tracking / video", "AI features", "Load and security testing"]),
        pkg("app-enterprise", "Enterprise", 2500000, 0, "one-time", "9+ months", "Large platforms and regulated industries", ["Dedicated team", "Microservices", "Compliance & audits", "SLA support"]),
      ],
      addOns: [{ id: "app-maint", name: "App maintenance & updates", price: 15000, billing: "monthly" }],
      notes: ["Apple developer account ($99/year) and Google Play ($25 one-time) are paid directly by you."],
    },
    {
      id: "custom-software",
      name: "Custom Software, SaaS, CRM & ERP",
      short: "Business software built around your process",
      description: "Internal tools, SaaS products, CRMs, ERPs and automation platforms.",
      packages: [
        pkg("sw-starter", "Starter", 150000, 400000, "one-time", "6–10 weeks", "One department or workflow", ["Requirement workshop", "Web app with roles & reports", "Up to 2 integrations", "3 months support"]),
        pkg("sw-growth", "Growth", 400000, 1200000, "one-time", "3–6 months", "Multi-team platforms and SaaS MVPs", ["Custom architecture", "Subscriptions / billing (SaaS)", "Dashboards & analytics", "Mobile-friendly or app"]),
        pkg("sw-business", "Business", 1200000, 3500000, "one-time", "6–12 months", "ERP, CRM or SaaS at scale", ["Multiple modules", "Data migration", "Advanced security & audit logs", "Dedicated team"]),
        pkg("sw-enterprise", "Enterprise", 3500000, 0, "one-time", "12+ months", "Enterprise transformation", ["Discovery & roadmap", "Integration with SAP / Oracle / Dynamics", "SLA, compliance", "Long-term partnership"]),
      ],
      addOns: [{ id: "sw-integration", name: "Extra integration (payment, ERP, CRM, API)", price: 25000, billing: "one-time" }],
      notes: ["Annual maintenance (AMC) is typically 15–20% of the project cost per year."],
    },
    {
      id: "ai-chatbot",
      name: "AI Chatbot",
      short: "Website and WhatsApp AI chatbots",
      description: "AI chatbots that answer from your knowledge base, capture leads and hand over to your team.",
      packages: [
        pkg("bot-starter", "Website Bot", 24999, 39999, "one-time", "1–2 weeks", "FAQ and lead capture on your website", ["Trained on your website & FAQs", "Lead capture to email / sheet", "Branded chat widget", "English + Hindi"], "₹2,999/month platform & AI usage"),
        pkg("bot-whatsapp", "WhatsApp AI Bot", 49999, 90000, "one-time", "2–4 weeks", "Businesses selling and supporting on WhatsApp", ["WhatsApp Business API setup", "AI answers + menus", "Catalogue, orders, appointment booking", "Human handover"], "₹4,999/month + Meta conversation charges"),
        pkg("bot-agent", "AI Agent + CRM", 150000, 400000, "one-time", "4–8 weeks", "Sales & support automation across channels", ["Website, WhatsApp, Instagram", "CRM / helpdesk integration", "Order status, refunds, bookings", "Analytics dashboard"], "₹9,999+/month depending on volume"),
        pkg("bot-enterprise", "Enterprise AI Assistant", 600000, 0, "one-time", "2–4 months", "Large teams, private data, custom LLMs", ["Private / on-premise LLM option", "SSO & role-based access", "Multiple departments", "SLA support"]),
      ],
      addOns: [
        { id: "bot-lang", name: "Extra language", price: 10000, billing: "one-time" },
        { id: "bot-integration", name: "Extra integration (CRM, ERP, sheet)", price: 15000, billing: "one-time" },
      ],
      notes: ["AI model usage and WhatsApp (Meta) charges depend on message volume and are billed at actuals."],
    },
    {
      id: "ai-calling",
      name: "AI Calling System",
      short: "Multilingual AI voice agents for inbound and outbound calls",
      description: "AI voice agents that call, answer, qualify leads, book appointments and remind customers — in Hindi, English and regional languages.",
      packages: [
        pkg("call-starter", "Starter Voice Agent", 74999, 125000, "one-time", "2–3 weeks", "One use case, e.g. lead qualification or reminders", ["1 voice agent, 2 languages", "Script & voice design", "Call logs and recordings", "Google Sheet / CRM sync"], "Usage approx. ₹4–6/minute"),
        pkg("call-growth", "Multilingual Calling", 150000, 300000, "one-time", "3–6 weeks", "Sales and support teams with daily call volume", ["Up to 3 agents, 5+ languages", "Inbound + outbound campaigns", "CRM integration & dashboards", "Human transfer"], "Usage approx. ₹3.5–5/minute"),
        pkg("call-business", "Contact-centre AI", 400000, 1000000, "one-time", "2–3 months", "High-volume contact centres", ["Unlimited agent flows", "Custom voice & knowledge base", "Analytics, QA scoring", "Telephony / dialer integration"], "Volume pricing from ~₹3/minute"),
        pkg("call-enterprise", "Enterprise", 1000000, 0, "one-time", "3+ months", "Banks, telecom, large enterprises", ["Private deployment option", "Compliance & data residency", "Custom integrations", "SLA support"]),
      ],
      addOns: [{ id: "call-number", name: "Dedicated phone number", price: 1500, billing: "monthly" }],
      notes: ["Per-minute usage covers speech, AI and telephony; final rate depends on monthly volume."],
    },
    {
      id: "ai-automation",
      name: "AI Development & Automation",
      short: "AI integration, agents, ML models and workflow automation",
      description: "GenAI features, AI agents, automation of repetitive work and custom machine-learning models.",
      packages: [
        pkg("ai-auto", "Workflow Automation", 40000, 100000, "one-time", "1–3 weeks", "Automating repetitive tasks", ["Process mapping", "n8n / Zapier / custom automation", "Email, sheet, CRM triggers", "Documentation"]),
        pkg("ai-integration", "AI Integration", 100000, 300000, "one-time", "3–6 weeks", "Adding ChatGPT / Claude features to your software", ["Use-case workshop", "RAG on your documents", "Guardrails & evaluation", "API integration"], "AI usage billed at actuals"),
        pkg("ai-custom", "Custom AI / ML", 400000, 1500000, "one-time", "2–4 months", "Prediction, computer vision, NLP models", ["Data preparation", "Model training & testing", "Deployment & monitoring", "Retraining plan"]),
        pkg("ai-enterprise", "Enterprise AI Programme", 1500000, 0, "one-time", "3+ months", "Organisation-wide AI adoption", ["AI strategy & governance", "Multiple use cases", "Private LLM deployment", "Training your team"]),
      ],
      addOns: [{ id: "ai-poc", name: "Proof of concept (2 weeks)", price: 60000, billing: "one-time" }],
      notes: ["Cloud GPU and AI model usage are billed at actuals."],
    },
    {
      id: "branding",
      name: "Branding & Design",
      short: "Logo, brand identity and marketing design",
      description: "Logos, brand identity, packaging and marketing creatives.",
      packages: [
        pkg("brand-logo", "Logo Design", 7999, 14999, "one-time", "5–7 days", "New businesses that need a logo", ["3 logo concepts", "3 revision rounds", "All file formats", "Colour palette"]),
        pkg("brand-starter", "Brand Starter", 24999, 44999, "one-time", "2–3 weeks", "Small businesses launching properly", ["Logo + colours + typography", "Business card & letterhead", "Social media kit", "Mini brand guide"]),
        pkg("brand-identity", "Brand Identity", 60000, 125000, "one-time", "4–6 weeks", "Growing companies and rebrands", ["Brand strategy & naming support", "Full visual identity", "Brand guidelines book", "Stationery, signage, templates"]),
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
        pkg("smm-starter", "Starter", 9999, 14999, "monthly", "Monthly", "Small businesses starting on social media", ["2 platforms", "12 posts/month (static)", "Captions & hashtags", "Monthly report"]),
        pkg("smm-growth", "Growth", 24999, 39999, "monthly", "Monthly", "Brands building a steady presence", ["3 platforms", "20 posts incl. 4 reels", "Content calendar", "Community replies", "Ads management (up to ₹50k spend)"]),
        pkg("smm-pro", "Pro", 49999, 90000, "monthly", "Monthly", "Brands focused on growth and leads", ["4–5 platforms", "30 posts incl. 8–10 reels", "Influencer coordination", "Paid campaigns & retargeting", "Bi-weekly reporting"]),
        pkg("smm-enterprise", "Enterprise", 100000, 0, "monthly", "Monthly", "Large brands and multi-location businesses", ["Dedicated social team", "Video production", "Brand monitoring", "Custom KPIs"]),
      ],
      addOns: [
        { id: "smm-reel", name: "Extra reel / short video", price: 2500, billing: "one-time" },
        { id: "smm-shoot", name: "Product / brand photoshoot (half day)", price: 15000, billing: "one-time" },
      ],
      notes: ["Ad spend is paid directly to Meta / Google / LinkedIn and is not included."],
    },
    {
      id: "seo-marketing",
      name: "SEO & Digital Marketing",
      short: "SEO, Google Ads and performance marketing",
      description: "Search engine optimisation, local SEO and paid campaigns.",
      packages: [
        pkg("seo-local", "Local SEO", 11999, 19999, "monthly", "Monthly (6-month plan recommended)", "Single-location businesses", ["Google Business Profile", "Local keywords & citations", "On-page SEO", "Monthly report"]),
        pkg("seo-growth", "Growth SEO", 24999, 45000, "monthly", "Monthly", "Businesses competing nationally", ["Technical SEO audit & fixes", "Content plan + 4 articles", "Link building", "Rank & traffic reports"]),
        pkg("seo-pro", "Performance Marketing", 50000, 120000, "monthly", "Monthly", "Lead generation and e-commerce growth", ["SEO + Google & Meta ads", "Landing pages & CRO", "Conversion tracking", "Weekly optimisation"]),
        pkg("seo-enterprise", "Enterprise", 150000, 0, "monthly", "Monthly", "Large sites and multi-country SEO", ["International SEO", "Content at scale", "Analytics & attribution", "Dedicated strategist"]),
      ],
      addOns: [{ id: "seo-audit", name: "One-time SEO audit", price: 9999, billing: "one-time" }],
      notes: ["Ad spend is separate; ads management is typically 15% of spend (minimum ₹15,000/month)."],
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
        pkg("astro-marketplace", "Marketplace Platform", 1200000, 0, "one-time", "5+ months", "Large AstroTalk-style marketplaces", ["Multi-language", "Live sessions & puja booking", "E-commerce for gemstones / products", "AI astrology assistant"]),
      ],
      addOns: [
        { id: "astro-ai", name: "AI astrology / numerology chat assistant", price: 75000, billing: "one-time" },
        { id: "astro-lang", name: "Extra language", price: 20000, billing: "one-time" },
      ],
      notes: ["Calculation accuracy relies on licensed ephemeris data or a third-party astrology API, billed at actuals."],
    },
    {
      id: "dedicated-team",
      name: "Hire Dedicated Developers",
      short: "Offshore developers and teams on monthly contracts",
      description: "Full-time developers, designers and AI engineers working as part of your team.",
      packages: [
        pkg("team-junior", "Developer (1–3 yrs)", 90000, 140000, "monthly", "Start in 1–2 weeks", "Extra capacity for well-defined work", ["Full-time (160 hrs/month)", "Your tools & time-zone overlap", "Replacement guarantee"]),
        pkg("team-senior", "Senior Developer (4–7 yrs)", 150000, 250000, "monthly", "Start in 1–2 weeks", "Complex features and technical ownership", ["Full-time", "Code reviews & architecture", "Direct communication"]),
        pkg("team-ai", "AI / ML Engineer", 200000, 350000, "monthly", "Start in 2–3 weeks", "AI, LLM and data projects", ["Full-time", "LLM, RAG, ML experience", "MLOps & deployment"]),
        pkg("team-squad", "Dedicated Team", 500000, 0, "monthly", "Start in 2–4 weeks", "Product teams (PM + developers + QA)", ["Project manager", "2+ developers, QA, designer", "Sprint reporting", "Scale up or down"]),
      ],
      addOns: [{ id: "team-hourly", name: "Hourly support (per hour)", price: 1500, billing: "one-time" }],
      notes: ["Rates vary by technology and seniority; international rates are quoted in USD."],
    },
    {
      id: "hosting",
      name: "Domain, Hosting & Maintenance",
      short: "Domains, hosting, business email and website care",
      description: "Everything needed to keep your website or app online, secure and up to date.",
      packages: [
        pkg("host-basic", "Shared Hosting", 3500, 7000, "yearly", "Same day", "Small websites", ["Hosting with SSL", "Daily backups", "Setup by our team"]),
        pkg("host-cloud", "Cloud / VPS Hosting", 1500, 6000, "monthly", "1–2 days", "Business sites, stores, web apps", ["AWS / DigitalOcean / Azure", "SSL, CDN, monitoring", "Server management"]),
        pkg("host-managed", "Managed Cloud (AWS)", 8000, 30000, "monthly", "1 week", "Apps with traffic, SaaS and stores", ["Auto-scaling setup", "Security hardening", "24×7 monitoring", "Monthly cost review"]),
        pkg("host-care", "Website Care Plan", 2999, 25000, "monthly", "Monthly", "Keeping sites updated and secure", ["Updates & security patches", "Uptime monitoring", "Small content changes", "Monthly backup & report"]),
      ],
      addOns: [
        { id: "host-domain-com", name: ".com domain", price: 1100, billing: "yearly" },
        { id: "host-domain-in", name: ".in domain", price: 800, billing: "yearly" },
        { id: "host-email", name: "Business email (Google Workspace / Zoho)", price: 150, billing: "per-user-monthly" },
        { id: "host-ssl", name: "Premium SSL certificate", price: 4000, billing: "yearly" },
      ],
      notes: ["Domain and cloud costs can be paid directly by you to the provider; you always own your domain."],
    },
    {
      id: "third-party",
      name: "Third-party APIs & Usage",
      short: "Payment, WhatsApp, SMS, maps, AI and other API costs",
      description: "Services your project may use. These are paid at actual cost to the provider (or passed through with no markup).",
      packages: [
        pkg("api-payments", "Payment gateway", 0, 0, "one-time", "—", "Online payments", ["Razorpay / Stripe / PayU: ~2% per transaction", "Integration included in most packages"]),
        pkg("api-whatsapp", "WhatsApp Business API", 0, 0, "monthly", "—", "Messaging & chatbots", ["Meta per-conversation charges", "BSP platform fee if applicable"]),
        pkg("api-ai", "AI model usage (OpenAI / Claude / Gemini)", 0, 0, "monthly", "—", "Chatbots, AI features", ["Pay per use, depends on volume", "We estimate monthly usage before launch"]),
        pkg("api-other", "SMS, email, maps, telephony", 0, 0, "monthly", "—", "Notifications & location", ["Billed at actuals by the provider"]),
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
        `## ${cat.name} [${cat.id}]\n${cat.packages.map((p) => `- ${p.name} [${p.id}]: ${p.priceFrom || p.priceTo ? priceLabel(p) : "at actuals"}${p.recurring ? ` (+ ${p.recurring})` : ""}; ${p.timeline}; best for ${p.bestFor}`).join("\n")}${
          cat.addOns.length ? `\nAdd-ons: ${cat.addOns.map((a) => `${a.name} [${a.id}] ${formatINR(a.price)}${a.billing === "one-time" ? "" : BILLING_LABEL[a.billing]}`).join("; ")}` : ""
        }${cat.notes.length ? `\nNotes: ${cat.notes.join(" ")}` : ""}`
    )
    .join("\n\n");
}
