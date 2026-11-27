/**
 * CMS page blocks: website sections that used to be hard-coded. Each block has a typed default
 * (what the site shows out of the box) and a field schema the admin editor renders automatically.
 * Saved values live in MongoDB (PageBlock collection) and are merged over the defaults.
 */

export type FieldDef =
  | { key: string; label: string; type: "text" | "textarea" | "url"; hint?: string }
  | { key: string; label: string; type: "list"; hint?: string; itemLabel: string; fields: { key: string; label: string; type: "text" | "textarea" }[] }
  | { key: string; label: string; type: "paragraphs"; hint?: string };

export type BlockDef = { key: string; group: string; title: string; description: string; page: string; fields: FieldDef[]; defaults: Record<string, unknown> };

export const BLOCKS: BlockDef[] = [
  {
    key: "home.hero",
    group: "Home",
    page: "/",
    title: "Hero (video)",
    description: "Full-screen video at the top of the homepage.",
    fields: [
      { key: "videoUrl", label: "Cloudinary video URL", type: "url", hint: "Paste the Cloudinary link without the file extension, e.g. …/video/upload/ac_none,q_auto/v123/my-video. The site loads .webm and .mp4 from it." },
      { key: "label", label: "Label above the heading", type: "text" },
      { key: "headingLine1", label: "Heading – line 1", type: "text" },
      { key: "headingLine2", label: "Heading – line 2 (start)", type: "text" },
      { key: "headingAccent", label: "Heading – gold words", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "pills", label: "Capability pills", type: "list", itemLabel: "Pill", fields: [{ key: "label", label: "Text", type: "text" }] },
    ],
    defaults: {
      videoUrl: "https://res.cloudinary.com/ptoxxqz0/video/upload/ac_none,q_auto/v1795769230/Rotating_digital_Earth_animation_81fa187c",
      label: "Global AI & technology partner",
      headingLine1: "Connecting Your Business",
      headingLine2: "to a",
      headingAccent: "Smarter World",
      description:
        "AI, cloud, data and intelligent automation — engineered by ALPIXN and delivered to businesses across the globe. From multilingual AI calling to analytics and custom software, we build the technology that keeps you connected.",
      pills: ["AI solutions", "AI calling", "Cloud platforms", "Data engineering", "Analytics", "Automation", "Software development"].map((label) => ({ label })),
    },
  },
  {
    key: "home.process",
    group: "Home",
    page: "/",
    title: "How we work (process)",
    description: "The five-step timeline on the homepage.",
    fields: [
      { key: "kicker", label: "Label", type: "text" },
      { key: "title", label: "Heading", type: "text" },
      { key: "accent", label: "Heading – coloured words", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
      { key: "steps", label: "Steps", type: "list", itemLabel: "Step", fields: [{ key: "title", label: "Title", type: "text" }, { key: "text", label: "Text", type: "textarea" }] },
    ],
    defaults: {
      kicker: "How we work",
      title: "A clear path from",
      accent: "idea to launch.",
      subtitle: "Five steps, the same on every project — so you always know what happens next.",
      steps: [
        { title: "Discover", text: "Goals, users, data and constraints — agreed before any build starts." },
        { title: "Design", text: "Flows, clickable prototypes and an architecture you can review." },
        { title: "Build", text: "Short sprints with working demos and automated tests." },
        { title: "Launch", text: "Pilot, training, monitoring and a clean handover." },
        { title: "Improve", text: "Measure real usage and extend what works." },
      ],
    },
  },
  {
    key: "home.markets",
    group: "Home",
    page: "/",
    title: "Global delivery & commitments",
    description: "Markets card with live local times and the 'How we work with you' commitments.",
    fields: [
      { key: "marketsTitle", label: "Markets heading", type: "text" },
      { key: "marketsAccent", label: "Markets heading – gold words", type: "text" },
      { key: "marketsText", label: "Markets text", type: "textarea" },
      { key: "markets", label: "Markets", type: "list", itemLabel: "Market", fields: [{ key: "name", label: "Country", type: "text" }] },
      { key: "commitTitle", label: "Commitments heading", type: "text" },
      { key: "commitAccent", label: "Commitments heading – coloured words", type: "text" },
      { key: "commitments", label: "Commitments", type: "list", itemLabel: "Commitment", fields: [{ key: "title", label: "Title", type: "text" }, { key: "text", label: "Text", type: "textarea" }] },
    ],
    defaults: {
      marketsTitle: "Built for teams across",
      marketsAccent: "nine markets.",
      marketsText: "Local currencies, languages, tax rules and time zones are part of the brief from day one.",
      markets: ["India", "USA", "UK", "UAE", "Australia", "Canada", "Italy", "Thailand", "South Africa"].map((name) => ({ name })),
      commitTitle: "Straightforward,",
      commitAccent: "from the first call.",
      commitments: [
        { title: "Clear scope first", text: "A written scope and estimate before development starts." },
        { title: "Demo every sprint", text: "You see working software regularly, not just status reports." },
        { title: "Your code, your repo", text: "Source code and documentation are handed over to you." },
        { title: "Security by design", text: "Access control, data protection and reviews built into the process." },
      ],
    },
  },
  {
    key: "home.cta",
    group: "Home",
    page: "/",
    title: "Call to action",
    description: "The blue banner near the bottom of the homepage.",
    fields: [
      { key: "kicker", label: "Label", type: "text" },
      { key: "title", label: "Heading", type: "text" },
      { key: "accent", label: "Heading – gold words", type: "text" },
      { key: "text", label: "Text", type: "textarea" },
      { key: "primaryLabel", label: "Gold button – text", type: "text" },
      { key: "primaryHref", label: "Gold button – link", type: "text" },
      { key: "secondaryLabel", label: "Blue button – text", type: "text" },
      { key: "secondaryHref", label: "Blue button – link", type: "text" },
    ],
    defaults: {
      kicker: "Start a project",
      title: "Let's build",
      accent: "what's next.",
      text: "Tell us about your idea, product or process. We reply with honest recommendations and a sensible first step.",
      primaryLabel: "Request a consultation",
      primaryHref: "/contact-us",
      secondaryLabel: "Explore our services",
      secondaryHref: "/our-expertise",
    },
  },
  {
    key: "about.hero",
    group: "About",
    page: "/about",
    title: "Hero",
    description: "Heading and text above the world map on the About page.",
    fields: [
      { key: "heading", label: "Heading", type: "textarea", hint: "The last five words are shown on the second line in the logo gradient." },
      { key: "description", label: "Description", type: "textarea" },
    ],
    defaults: {
      heading: "We engineer AI, robotics and software that businesses rely on every day",
      description:
        "ALPIXN designs and builds the applications customers use, the internal systems teams depend on, and the AI and automation that remove repetitive work — with product thinking and engineering discipline in one team.",
    },
  },
  {
    key: "about.pillars",
    group: "About",
    page: "/about",
    title: "Three disciplines",
    description: "Cards under the About hero.",
    fields: [
      { key: "kicker", label: "Label", type: "text" },
      { key: "title", label: "Heading", type: "text" },
      { key: "items", label: "Cards", type: "list", itemLabel: "Card", fields: [{ key: "title", label: "Title", type: "text" }, { key: "text", label: "Text", type: "textarea" }] },
    ],
    defaults: {
      kicker: "What we do",
      title: "Three disciplines, one team",
      items: [
        { title: "AI that earns its place", text: "Models and assistants scoped to a clear business problem, evaluated before launch and monitored after." },
        { title: "Robotics software", text: "Fleet dashboards, vision inspection and operator tools that connect machines to the people running them." },
        { title: "Software engineering", text: "Web, mobile and SaaS products built with maintainable code and delivered in measurable releases." },
      ],
    },
  },
  {
    key: "about.journey",
    group: "About",
    page: "/about",
    title: "Our journey (timeline)",
    description: "The animated milestone timeline.",
    fields: [
      { key: "title", label: "Heading", type: "text" },
      { key: "accent", label: "Heading – gold words", type: "text" },
      { key: "intro", label: "Intro text", type: "textarea" },
      { key: "milestones", label: "Milestones", type: "list", itemLabel: "Milestone", fields: [{ key: "year", label: "Year", type: "text" }, { key: "tag", label: "Tag", type: "text" }, { key: "title", label: "Title", type: "text" }, { key: "text", label: "Text", type: "textarea" }] },
      { key: "outro", label: "Closing line", type: "text" },
    ],
    defaults: {
      title: "Our Journey of",
      accent: "Innovation and Growth",
      intro: "From a visionary start in 2017 to building advanced AI-driven solutions today, every milestone reflects Alpixn’s commitment to empowering businesses through innovation, intelligence, and technology.",
      milestones: [
        { year: "2017", tag: "Founded", title: "The Beginning", text: "Alpixn was founded with a vision to build innovative digital solutions and create a strong foundation in technology-driven services." },
        { year: "2018", tag: "Enterprise", title: "First Enterprise Breakthrough", text: "Successfully delivered enterprise-level ERP systems and mobile applications, marking our entry into large-scale digital transformation." },
        { year: "2019", tag: "Design & UX", title: "Expanding Creative Horizons", text: "Expanded into digital design and user experience solutions, combining creativity with technology to deliver complete digital products." },
        { year: "2020", tag: "AI", title: "The AI Revolution Begins", text: "Introduced AI-powered tools for automation and business management, improving efficiency and enabling smarter decision-making." },
        { year: "2021", tag: "Cloud", title: "Going Global with Cloud", text: "Collaborated with international clients and launched scalable cloud-based platforms to support global business operations." },
        { year: "2023", tag: "Product", title: "Introducing AutoMarkAI", text: "Developed intelligent automation systems and AI-powered platforms to enhance productivity, marketing, and business workflows." },
        { year: "2024", tag: "Launch", title: "Product Launch", text: "Launched our own products, bringing Alpixn's experience in AI and software to businesses as ready-to-use solutions." },
        { year: "2025", tag: "Growth", title: "New Office", text: "Opened a new office to support our growing team and clients." },
        { year: "2026", tag: "AI voice", title: "Multilingual AI Calling System", text: "Introduced a multilingual AI calling system that talks to customers in their own language." },
      ],
      outro: "The journey continues — and we would love to build the next milestone with you.",
    },
  },
  {
    key: "legal.privacy",
    group: "Legal",
    page: "/privacy-policy",
    title: "Privacy Policy",
    description: "Sections of the privacy policy page.",
    fields: [
      { key: "intro", label: "Intro (under the heading)", type: "textarea" },
      { key: "sections", label: "Sections", type: "list", itemLabel: "Section", fields: [{ key: "title", label: "Title", type: "text" }, { key: "body", label: "Text (blank line = new paragraph)", type: "textarea" }] },
    ],
    defaults: { intro: "How ALPIXN collects, uses and protects the personal information you share with us.", sections: [{"title": "Information we collect", "body": "Details you give us through our contact, project brief, newsletter and job application forms — for example your name, email address, phone number, company, message and any CV you upload.\n\nBasic technical information when you visit the website, such as browser type, device, pages viewed and approximate location, collected through server logs and analytics tools."}, {"title": "How we use your information", "body": "To reply to your enquiry, prepare proposals and deliver the services you ask for.\n\nTo assess job and internship applications.\n\nTo send our newsletter if you have subscribed — you can unsubscribe at any time.\n\nTo keep the website secure and understand how it is used so we can improve it."}, {"title": "Legal basis", "body": "We process personal information where it is needed to respond to your request or perform a contract, where we have a legitimate interest in running our business, where you have given consent, or where the law requires it."}, {"title": "Sharing your information", "body": "We do not sell personal information. We share it only with service providers that help us run the website and our business (for example hosting, email and analytics providers), under appropriate confidentiality and data-protection terms, or where the law requires it."}, {"title": "Cookies", "body": "The website uses essential cookies and local storage to remember preferences such as light or dark theme. Where analytics cookies are used, they help us understand visits in aggregate."}, {"title": "How long we keep information", "body": "We keep enquiry and application information only as long as needed for the purpose it was collected, or as required by law, and then delete or anonymise it."}, {"title": "Your rights", "body": "Depending on where you live, you may have the right to access, correct, delete or restrict the use of your personal information, to object to processing, and to withdraw consent. To make a request, contact us using the details below."}, {"title": "Security", "body": "We use reasonable technical and organisational measures to protect personal information, including access controls and encrypted connections. No method of transmission over the internet is completely secure."}, {"title": "Changes to this policy", "body": "We may update this policy from time to time. The latest version will always be published on this page."}] },
  },
  {
    key: "legal.terms",
    group: "Legal",
    page: "/terms-and-conditions",
    title: "Terms and Conditions",
    description: "Sections of the terms page.",
    fields: [
      { key: "intro", label: "Intro (under the heading)", type: "textarea" },
      { key: "sections", label: "Sections", type: "list", itemLabel: "Section", fields: [{ key: "title", label: "Title", type: "text" }, { key: "body", label: "Text (blank line = new paragraph)", type: "textarea" }] },
    ],
    defaults: { intro: "The terms that apply when you use the ALPIXN website and its content.", sections: [{"title": "About these terms", "body": "These terms apply to your use of the ALPIXN website (alpixn.com and its pages). By using the website you agree to them. If you do not agree, please do not use the website.\n\nSoftware development, consulting or staffing services are provided under a separate written agreement or statement of work. If that agreement conflicts with these terms, the agreement applies."}, {"title": "Using the website", "body": "You may browse the website and share links to it for lawful, personal or business purposes.\n\nYou must not misuse the website — for example by trying to gain unauthorised access, interfering with its operation, introducing malicious code, scraping it in a way that overloads it, or using it to send spam."}, {"title": "Information on the website", "body": "We aim to keep information accurate and up to date, but it is provided for general information only and may change without notice. It is not professional advice for your specific situation.\n\nConcept projects and interactive demos shown in our portfolio are clearly labelled. They demonstrate our capabilities and are not client engagements; any names, data and figures in them are fictional.\n\nArticles on our blog are written by the ALPIXN Editorial Team for general education and may cite third-party sources."}, {"title": "Intellectual property", "body": "The website design, text, graphics, logos and code are owned by ALPIXN or used with permission, and are protected by intellectual property laws. You may not copy, reproduce or republish them for commercial purposes without our written permission.\n\nThird-party names, logos and trademarks (such as technology brands) belong to their owners and are used only to identify those technologies."}, {"title": "Enquiries, briefs and applications", "body": "When you send us an enquiry, project brief or job application, you confirm that the information is accurate and that you are allowed to share it. Sending a brief does not create a contract or an obligation for either side.\n\nWe handle personal information as described in our Privacy Policy."}, {"title": "Links to other websites", "body": "The website may link to third-party websites. We do not control them and are not responsible for their content, policies or availability."}, {"title": "Limitation of liability", "body": "The website is provided on an \"as is\" and \"as available\" basis. To the extent permitted by law, ALPIXN is not liable for any indirect or consequential loss, or for loss of data, revenue or profit, arising from your use of the website or reliance on its content.\n\nNothing in these terms limits liability that cannot be limited by law."}, {"title": "Changes to these terms", "body": "We may update these terms from time to time. The current version is always published on this page, and continued use of the website means you accept the updated terms."}, {"title": "Governing law", "body": "These terms are governed by the laws of India, and the courts of Gurugram, Haryana have jurisdiction, unless a separate written agreement with you says otherwise."}] },
  },
];

export const BLOCK_MAP = Object.fromEntries(BLOCKS.map((b) => [b.key, b])) as Record<string, BlockDef>;
