/**
 * ALPIXN concept portfolio — original demonstration projects designed and built by ALPIXN.
 * These are NOT client projects: no client, testimonial, timeline or business result is claimed.
 * Each one has a working interactive demo at /demos/<slug>; screenshots are captured from that demo.
 */

export type ProjectType =
  | "Website"
  | "Web application"
  | "Mobile app"
  | "SaaS"
  | "CRM"
  | "ERP / Operations"
  | "Booking platform"
  | "E-commerce"
  | "Dashboard"
  | "AI software"
  | "Robotics & automation"
  | "API-integrated platform";

export type VerificationStatus = "real" | "concept" | "unverified";

export type ShowcaseProject = {
  slug: string;
  title: string;
  product: string;
  industry: string;
  country: string;
  currency: string;
  projectTypes: ProjectType[];
  techStack: string[];
  summary: string;
  problem: string;
  approach: string;
  features: string[];
  highlights: string[];
  /** Related ALPIXN pages for internal linking. */
  related: { label: string; href: string }[];
  featured?: boolean;
};

export const CONCEPT_LABEL = "Concept Project";
export const CONCEPT_NOTE =
  "An original demonstration designed and built by ALPIXN to show capabilities. It is not a client engagement; all names, data and figures are fictional.";

export function screenshotPath(slug: string, device: "desktop" | "mobile") {
  return `/portfolio/${slug}/${device}.webp`;
}

export const showcaseProjects: ShowcaseProject[] = [
  {
    slug: "careslot-clinic-booking",
    title: "CareSlot — Clinic Appointment Booking",
    product: "CareSlot",
    industry: "Healthcare",
    country: "India",
    currency: "INR",
    projectTypes: ["Booking platform", "Website", "Web application"],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "WhatsApp/SMS API"],
    summary: "Patient-facing booking for a multi-specialty clinic: choose a doctor, see real availability, pay by UPI or at the clinic, and receive reminders.",
    problem:
      "Many neighbourhood clinics in India still take bookings by phone. Receptionists juggle calls during peak hours, double bookings happen, and patients cannot see which doctors are available or what consultation fees are before they travel.",
    approach:
      "We designed a mobile-first booking flow that shows doctors by speciality with languages spoken and fees in INR, blocks taken slots, and lets patients choose UPI prepayment or pay-at-clinic. Reminders are designed for WhatsApp or SMS, the channels patients actually read.",
    features: ["Doctor directory filtered by speciality and language", "Live slot grid with blocked times", "UPI or pay-at-clinic options", "Booking reference and reminder messaging", "Receptionist view for rescheduling (planned)"],
    highlights: ["Under-a-minute booking flow on mobile", "Regional context: INR, UPI, multilingual doctors", "Designed for low-bandwidth connections"],
    related: [
      { label: "Healthcare software development", href: "/our-expertise/industries/healthtech" },
      { label: "Healthcare interoperability guide", href: "/resources/blogs/healthcare-software-interoperability" },
    ],
    featured: true,
  },
  {
    slug: "pulseboard-clinic-dashboard",
    title: "PulseBoard — Clinic Operations Dashboard",
    product: "PulseBoard",
    industry: "Healthcare",
    country: "United Kingdom",
    currency: "GBP",
    projectTypes: ["Dashboard", "Web application", "SaaS"],
    techStack: ["Next.js", "FastAPI", "PostgreSQL"],
    summary: "A practice manager's view of the day: arrivals board, waiting times, did-not-attend tracking and recall programme progress.",
    problem:
      "GP practice teams track arrivals, waiting times and recall programmes across several systems and spreadsheets. Managers lack a single real-time view to rebalance clinicians or chase missed appointments.",
    approach:
      "PulseBoard aggregates appointment and arrival data into one operational dashboard. Status changes are one click, recall programmes show completion at a glance, and weekly demand charts support rota planning. Integration with clinical systems would use standard interfaces such as HL7 FHIR.",
    features: ["Live arrivals board with one-click status updates", "Waiting-time and DNA indicators", "Recall programme progress tracking", "Weekly demand chart for rota planning"],
    highlights: ["Built around real practice workflows", "Clear, accessible status colours", "Designed for FHIR-based integration"],
    related: [
      { label: "Healthcare industry solutions", href: "/our-expertise/industries/healthtech" },
      { label: "Designing operations dashboards", href: "/resources/blogs/robot-fleet-monitoring-dashboards" },
    ],
  },
  {
    slug: "examready-online-assessment",
    title: "ExamReady — Online Examination System",
    product: "ExamReady",
    industry: "Education",
    country: "India",
    currency: "INR",
    projectTypes: ["Web application", "SaaS"],
    techStack: ["Next.js", "Node.js", "MongoDB"],
    summary: "Timed online tests with a question palette, flag-for-review, autosave and instant scoring for objective questions.",
    problem:
      "Coaching institutes and colleges need reliable practice tests that mirror real exam conditions, but generic form tools lack timers, navigation palettes and instant results.",
    approach:
      "ExamReady reproduces the exam-hall experience: a visible countdown, a palette showing answered, flagged and unvisited questions, and instant results with answer explanations. Descriptive answers would route to teacher review.",
    features: ["Countdown timer with low-time warning", "Question palette and flag for review", "Instant scoring for objective questions", "Answer review after submission"],
    highlights: ["Mirrors familiar exam interfaces", "Works on low-cost devices", "Supports teacher review workflows"],
    related: [
      { label: "EdTech solutions", href: "/our-expertise/industries/edtech" },
      { label: "Building an EdTech platform", href: "/resources/blogs/edtech-platform-features" },
    ],
  },
  {
    slug: "learnpath-lms",
    title: "LearnPath — Student Learning Portal",
    product: "LearnPath",
    industry: "Education",
    country: "Canada",
    currency: "CAD",
    projectTypes: ["Web application", "SaaS"],
    techStack: ["React", "Node.js", "PostgreSQL", "LTI"],
    summary: "A continuing-education learning portal with course progress, module completion, study-time insights and upcoming deadlines.",
    problem: "Adult learners balancing work and study need to see exactly where they are in each course and what is due next, without digging through menus.",
    approach: "LearnPath puts progress first: course cards show completion, modules can be completed in sequence, and a sidebar surfaces upcoming quizzes and live sessions. The design assumes LTI integration with existing institutional tools.",
    features: ["Course progress cards", "Sequential module completion", "Study-time trend", "Upcoming deadlines and live sessions"],
    highlights: ["Progress-first information design", "Accessible, keyboard-friendly UI", "Integration-ready via LTI"],
    related: [
      { label: "EdTech solutions", href: "/our-expertise/industries/edtech" },
      { label: "Accessibility in web apps", href: "/resources/blogs/accessibility-in-web-apps" },
    ],
  },
  {
    slug: "haven-property-portal",
    title: "Haven — Property Listing Portal",
    product: "Haven",
    industry: "Real Estate",
    country: "United Arab Emirates",
    currency: "AED",
    projectTypes: ["Website", "Web application"],
    techStack: ["Next.js", "MongoDB", "Maps API"],
    summary: "Rent and buy listings across the UAE with fast filters, saved homes and viewing requests, priced in AED with English/Arabic support planned.",
    problem: "Agencies in the UAE syndicate listings to large portals but often lack a fast, branded site of their own where buyers and tenants can filter properties and request viewings directly.",
    approach: "Haven separates rent and buy journeys, shows annual rents and sale prices in AED, and keeps filters simple: property type and bedrooms. Listing pages are designed for server rendering so they load quickly and can be indexed.",
    features: ["Rent / buy toggle with AED pricing", "Type and bedroom filters", "Saved properties", "Viewing request action"],
    highlights: ["Regional pricing conventions (annual rent)", "Bilingual-ready layout", "Search-friendly listing pages"],
    related: [
      { label: "PropTech solutions", href: "/our-expertise/industries/proptech" },
      { label: "Real estate technology guide", href: "/resources/blogs/real-estate-crm-and-portals" },
    ],
    featured: true,
  },
  {
    slug: "estateflow-crm",
    title: "EstateFlow — Real Estate CRM",
    product: "EstateFlow",
    industry: "Real Estate",
    country: "Australia",
    currency: "AUD",
    projectTypes: ["CRM", "SaaS", "Web application"],
    techStack: ["React", "Node.js", "PostgreSQL"],
    summary: "A buyer pipeline for agents: enquiries to settlement, lead sources, inspections and pipeline value in AUD.",
    problem: "Agents track buyers across portal enquiries, open homes and referrals in notebooks and generic CRMs that do not reflect the Australian sales process.",
    approach: "EstateFlow models the pipeline stages agents use — enquiry, qualified, inspection, offer, settled — with lead sources and budgets on each card and quick stage changes.",
    features: ["Five-stage buyer pipeline", "Lead source tagging", "Pipeline value summary", "Inspection scheduling (planned)"],
    highlights: ["Process-specific stages", "Fast keyboard and click interactions", "Clear manager overview"],
    related: [
      { label: "CRM development services", href: "/our-expertise/software-solution/crm-development" },
      { label: "Real estate CRMs and portals", href: "/resources/blogs/real-estate-crm-and-portals" },
    ],
  },
  {
    slug: "fabrica-production-tracker",
    title: "Fabrica — Production Tracking & OEE",
    product: "Fabrica",
    industry: "Manufacturing",
    country: "Italy",
    currency: "EUR",
    projectTypes: ["Dashboard", "ERP / Operations", "Web application"],
    techStack: ["Next.js", "Python", "PostgreSQL", "OPC UA"],
    summary: "Shift-level production tracking with OEE per line, hourly output and downtime reasons — bilingual Italian/English.",
    problem: "Small and mid-sized manufacturers often record output and downtime on paper, so supervisors only see problems after a shift ends.",
    approach: "Fabrica shows each line's OEE, output against target and current state, with downtime reasons ranked by minutes lost. Labels are bilingual for mixed teams, and machine data would arrive via OPC UA or PLC signals.",
    features: ["OEE by line (availability, performance, quality)", "Hourly output chart", "Downtime reasons ranked", "Shift and line selection"],
    highlights: ["Bilingual IT/EN interface", "Designed for line-side screens", "Machine-data integration ready"],
    related: [
      { label: "Manufacturing software & MES", href: "/resources/blogs/manufacturing-mes-software" },
      { label: "Automotive & manufacturing industry", href: "/our-expertise/industries/automotive" },
    ],
  },
  {
    slug: "visionqc-inspection-dashboard",
    title: "VisionQC — Computer Vision Inspection Review",
    product: "VisionQC",
    industry: "Manufacturing",
    country: "United States",
    currency: "USD",
    projectTypes: ["AI software", "Robotics & automation", "Dashboard"],
    techStack: ["Python", "FastAPI", "React", "ONNX Runtime"],
    summary: "An operator review queue for AI visual inspection: model detections with confidence, accept/reject decisions and labels fed back into training.",
    problem: "Automated inspection systems flag uncertain parts, but without a good review tool operators override decisions inconsistently and the model never learns from corrections.",
    approach: "VisionQC shows each flagged image with bounding boxes and confidence, offers one-click accept or reject, and records decisions as labels for the next training cycle. Thresholds and model versions are visible to the QA lead.",
    features: ["Image review with defect overlays", "Confidence and threshold display", "Accept / reject workflow", "Decisions captured as training labels"],
    highlights: ["Human-in-the-loop AI design", "Dark UI for inspection stations", "Traceable model versions"],
    related: [
      { label: "Computer vision development", href: "/our-expertise/artificial-intelligence/computer-vision-development" },
      { label: "Computer vision for quality inspection", href: "/resources/blogs/computer-vision-quality-inspection" },
    ],
    featured: true,
  },
  {
    slug: "cargotrace-shipment-tracking",
    title: "CargoTrace — Shipment Tracking Platform",
    product: "CargoTrace",
    industry: "Logistics",
    country: "South Africa",
    currency: "ZAR",
    projectTypes: ["Web application", "API-integrated platform"],
    techStack: ["Next.js", "Node.js", "MongoDB", "Carrier APIs"],
    summary: "Unified tracking across road, rail and port movements with a clear timeline, ETA window and proof-of-delivery details.",
    problem: "Distributors moving goods between Gauteng, Durban and the Cape use several carriers, each with a different tracking format, so customer service teams answer 'where is my order?' manually.",
    approach: "CargoTrace normalises carrier events into one timeline, shows an ETA window rather than a vague status, and exposes shipment details customers ask about most.",
    features: ["Track by reference number", "Normalised multi-carrier timeline", "ETA window and route progress", "Proof-of-delivery details"],
    highlights: ["Integration layer for multiple carriers", "Customer-friendly language", "Local time and currency"],
    related: [
      { label: "Logistics software guide", href: "/resources/blogs/logistics-tracking-software" },
      { label: "Transport & logistics industry", href: "/our-expertise/industries/transport" },
    ],
  },
  {
    slug: "routepilot-delivery-app",
    title: "RoutePilot — Delivery Driver App",
    product: "RoutePilot",
    industry: "Logistics",
    country: "Australia",
    currency: "AUD",
    projectTypes: ["Mobile app", "API-integrated platform"],
    techStack: ["Flutter", "Node.js", "PostgreSQL", "Maps API"],
    summary: "A driver app for multi-drop routes: stop list, delivery windows, navigation hand-off, signature capture and failed-delivery reporting with an offline queue.",
    problem: "Drivers on multi-drop routes switch between paper manifests, phone calls and messaging apps, and proof of delivery is inconsistent.",
    approach: "RoutePilot gives drivers one screen per stop with large touch targets, captures a signature and photo, and queues uploads when signal drops. Dispatch sees progress in real time.",
    features: ["Route progress and stop list", "Navigation and call actions", "Signature-based proof of delivery", "Failed-delivery reporting", "Offline upload queue"],
    highlights: ["Built for one-handed use", "Offline-first design", "Clear exception handling"],
    related: [
      { label: "Flutter for business apps", href: "/resources/blogs/flutter-for-business-apps" },
      { label: "Mobile app development", href: "/our-expertise/software-solution/mobile-app-development" },
    ],
  },
  {
    slug: "siam-craft-storefront",
    title: "Siam Craft — Artisan E-commerce Storefront",
    product: "Siam Craft",
    industry: "E-commerce & Retail",
    country: "Thailand",
    currency: "THB",
    projectTypes: ["E-commerce", "Website"],
    techStack: ["Next.js", "Node.js", "MongoDB", "Payment gateway"],
    summary: "A bilingual Thai/English storefront for artisan goods with category filters, a working basket, free-shipping threshold and PromptPay-style payment options.",
    problem: "Small craft brands selling across Thailand rely on social media messages for orders, which makes stock, payments and delivery tracking hard to manage.",
    approach: "Siam Craft offers a focused catalogue, Thai/English toggle, THB pricing and a basket that applies a free-delivery threshold — with payment options familiar to Thai shoppers.",
    features: ["Category filters", "Basket with quantity controls", "Free-shipping threshold logic", "Thai/English language toggle", "Local payment options (simulated)"],
    highlights: ["Localised currency and language", "Original product illustrations", "Fast, mobile-friendly layout"],
    related: [
      { label: "E-commerce platform choices", href: "/resources/blogs/ecommerce-platform-choices" },
      { label: "Retail industry solutions", href: "/our-expertise/industries/retail" },
    ],
  },
  {
    slug: "ledgerly-invoicing-saas",
    title: "Ledgerly — Invoicing SaaS",
    product: "Ledgerly",
    industry: "Finance & Fintech",
    country: "United States",
    currency: "USD",
    projectTypes: ["SaaS", "Web application"],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Stripe-style payments API"],
    summary: "Invoice creation with live totals and sales tax, invoice status tracking and receivables overview for small service businesses.",
    problem: "Freelancers and small agencies lose time building invoices in documents and chasing payments without a clear view of what is outstanding or overdue.",
    approach: "Ledgerly calculates totals as lines are edited, shows outstanding and overdue amounts at a glance and moves invoices through draft, sent, overdue and paid states. Amounts are handled in minor units on the backend.",
    features: ["Line-item invoice builder with live totals", "Example sales-tax calculation", "Receivables summary", "Invoice status tracking"],
    highlights: ["Ledger-safe money handling", "Clear overdue visibility", "SaaS-ready multi-tenant design"],
    related: [
      { label: "Fintech engineering guide", href: "/resources/blogs/fintech-compliance-engineering" },
      { label: "SaaS development", href: "/our-expertise/software-solution/saas-development" },
    ],
    featured: true,
  },
  {
    slug: "lagoon-stay-booking",
    title: "Lagoon Stay — Boutique Hotel Booking Engine",
    product: "Lagoon Stay",
    industry: "Hospitality & Travel",
    country: "Italy",
    currency: "EUR",
    projectTypes: ["Booking platform", "Website"],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Channel manager API"],
    summary: "A direct booking engine for a small hotel: room selection with occupancy rules, flexible or saver rates, illustrative city tax and confirmation.",
    problem: "Independent hotels pay commission on most bookings because their own websites make booking harder than third-party platforms.",
    approach: "Lagoon Stay keeps booking to one page: dates, guests, room choice with capacity checks, rate type and a transparent total including local taxes.",
    features: ["Occupancy-aware room selection", "Flexible vs saver rates", "Transparent total with city tax (illustrative)", "Bilingual confirmation"],
    highlights: ["Clear cancellation messaging", "Price transparency", "Channel-manager integration ready"],
    related: [
      { label: "Hotel and restaurant booking systems", href: "/resources/blogs/hospitality-booking-systems" },
      { label: "Travel & hospitality industry", href: "/our-expertise/industries/travel" },
    ],
  },
  {
    slug: "saffron-table-reservations",
    title: "Saffron Table — Restaurant Reservations",
    product: "Saffron Table",
    industry: "Food & Restaurants",
    country: "United Arab Emirates",
    currency: "AED",
    projectTypes: ["Booking platform", "Website"],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "WhatsApp API"],
    summary: "Table reservations with time availability, seating areas, occasion notes and deposits for larger groups.",
    problem: "Busy restaurants lose revenue to no-shows from large group bookings taken by phone, and guests cannot easily see available times.",
    approach: "Saffron Table shows available times, collects seating and occasion preferences and applies a deposit rule for groups of six or more, with confirmation by messaging.",
    features: ["Availability-aware time slots", "Seating area and occasion selection", "Group deposit rule", "Messaging confirmation (simulated)"],
    highlights: ["No-show reduction by design", "Elegant brand presentation", "Configurable rules"],
    related: [{ label: "Hospitality booking systems", href: "/resources/blogs/hospitality-booking-systems" }],
  },
  {
    slug: "agrisense-farm-monitor",
    title: "AgriSense — Farm IoT Monitoring",
    product: "AgriSense",
    industry: "Agriculture",
    country: "India",
    currency: "INR",
    projectTypes: ["Dashboard", "Web application", "API-integrated platform"],
    techStack: ["React", "Python", "PostgreSQL", "LoRaWAN gateway"],
    summary: "Soil moisture per field, irrigation control, rain forecast and alerts, with an English/Marathi toggle for farmers in Maharashtra.",
    problem: "Farmers irrigate on fixed schedules or intuition, wasting water and power, because they cannot see soil moisture across fields or combine it with the weather forecast.",
    approach: "AgriSense shows moisture status per field with simple traffic-light guidance, combines forecasts with readings to suggest when to irrigate, and allows pump control with confirmation.",
    features: ["Field moisture status and thresholds", "Pump control", "Seven-day rain forecast", "Bilingual English/Marathi interface"],
    highlights: ["Designed for rural users", "Local language support", "Offline-tolerant data collection"],
    related: [{ label: "Agritech IoT software", href: "/resources/blogs/agritech-iot-farm-monitoring" }],
  },
  {
    slug: "docusense-document-ai",
    title: "DocuSense — Intelligent Document Processing",
    product: "DocuSense",
    industry: "AI & Automation",
    country: "Canada",
    currency: "CAD",
    projectTypes: ["AI software", "Web application", "API-integrated platform"],
    techStack: ["Python", "FastAPI", "LLM extraction", "React", "PostgreSQL"],
    summary: "Invoice and bill-of-lading extraction with confidence scores, validation rules (including GST/HST arithmetic) and a review screen before ERP export.",
    problem: "Accounts payable and logistics teams retype data from supplier invoices and shipping documents, and errors surface only after payment or delivery.",
    approach: "DocuSense extracts fields, scores confidence and applies business rules — such as checking that subtotal plus tax equals the total — so only exceptions need a person. Corrections become feedback for improving extraction.",
    features: ["Document type classification", "Field extraction with confidence", "Arithmetic and reference validation", "Side-by-side review and correction", "Approve and export to ERP"],
    highlights: ["Validation-first design", "Human review only where needed", "Audit-friendly decisions"],
    related: [
      { label: "Intelligent document processing explained", href: "/resources/blogs/intelligent-document-processing-explained" },
      { label: "AI automation services", href: "/our-expertise/artificial-intelligence/ai-automation-services" },
    ],
    featured: true,
  },
  {
    slug: "robofleet-command-center",
    title: "RoboFleet — Robot Fleet Command Centre",
    product: "RoboFleet",
    industry: "Robotics & Automation",
    country: "Australia",
    currency: "AUD",
    projectTypes: ["Robotics & automation", "Dashboard", "Web application"],
    techStack: ["React", "Node.js", "WebSockets", "ROS 2 bridge"],
    summary: "A warehouse robot fleet dashboard with a live floor map, task throughput, battery levels, exception handling and logged remote actions.",
    problem: "Supervisors managing mobile robots and robot cells need to spot blocked robots and delayed tasks immediately, not dig through vendor consoles.",
    approach: "RoboFleet prioritises exceptions, shows robot positions on a simplified floor map and offers safe remote actions that respect physical safety systems. Telemetry in the demo is simulated.",
    features: ["Live floor map (simulated telemetry)", "Fleet health and throughput", "Exception details with recovery actions", "Battery and charging status", "Action logging"],
    highlights: ["Exception-first information hierarchy", "Dark control-room UI", "Vendor-agnostic integration layer"],
    related: [
      { label: "Robot fleet dashboards", href: "/resources/blogs/robot-fleet-monitoring-dashboards" },
      { label: "Robotics software stack", href: "/resources/blogs/robotics-software-stack-explained" },
    ],
    featured: true,
  },
  {
    slug: "askdesk-ai-assistant",
    title: "AskDesk — Internal Knowledge Assistant",
    product: "AskDesk",
    industry: "AI & Automation",
    country: "United States",
    currency: "USD",
    projectTypes: ["AI software", "SaaS"],
    techStack: ["Next.js", "FastAPI", "Retrieval-augmented generation", "PostgreSQL"],
    summary: "An employee assistant that answers from approved policies with citations and refuses to guess when information is missing. The demo uses scripted responses — no live model.",
    problem: "Employees ask HR, finance and IT the same questions repeatedly, while answers are scattered across handbooks and help centres.",
    approach: "AskDesk is designed around retrieval with citations: every answer links to its source, unknown questions are escalated rather than guessed, and source freshness is monitored.",
    features: ["Conversational Q&A with source citations", "Refusal and escalation for unknown questions", "Suggested questions", "Source sync status"],
    highlights: ["Trust-by-design: citations and refusals", "Clear demo disclosure", "Analytics for answer quality"],
    related: [
      { label: "RAG vs fine-tuning", href: "/resources/blogs/rag-vs-fine-tuning-for-business-knowledge" },
      { label: "AI chatbot development", href: "/our-expertise/artificial-intelligence/ai-chatbot-development" },
    ],
  },
  {
    slug: "fitflow-studio-app",
    title: "FitFlow — Fitness Studio Booking App",
    product: "FitFlow",
    industry: "Fitness & Wellness",
    country: "United Kingdom",
    currency: "GBP",
    projectTypes: ["Mobile app", "Booking platform"],
    techStack: ["Flutter", "Node.js", "PostgreSQL", "Payments API"],
    summary: "A member app for class booking with credits, waitlists and cancellation rules, plus a staff dashboard view of bookings and class fill.",
    problem: "Boutique studios manage bookings through generic tools that handle credits, waitlists and late cancellations poorly, frustrating both members and staff.",
    approach: "FitFlow keeps booking to one tap, shows remaining credits, handles full classes with waitlists and makes the studio's rules visible.",
    features: ["Class schedule by day", "Credit-based booking", "Waitlist join and leave", "Staff bookings dashboard"],
    highlights: ["One-tap booking", "Transparent rules", "Brand-forward mobile design"],
    related: [
      { label: "Native vs cross-platform apps", href: "/resources/blogs/mobile-app-native-vs-cross-platform" },
      { label: "Mobile app development", href: "/our-expertise/software-solution/mobile-app-development" },
    ],
  },
  {
    slug: "buildtrack-site-manager",
    title: "BuildTrack — Construction Site Manager",
    product: "BuildTrack",
    industry: "Construction",
    country: "South Africa",
    currency: "ZAR",
    projectTypes: ["ERP / Operations", "Web application", "Dashboard"],
    techStack: ["Next.js", "Node.js", "PostgreSQL"],
    summary: "Site programme progress, budget burn, materials ordered versus delivered, safety record and a daily site diary for residential developments.",
    problem: "Site managers report progress, deliveries and incidents through phone photos and spreadsheets, so head office sees problems late.",
    approach: "BuildTrack gives the site one shared view: weekly programme with progress updates, materials reconciliation in ZAR, safety streaks and a timestamped diary.",
    features: ["Weekly programme with progress", "Budget used vs total", "Materials ordered vs delivered", "Site diary and safety indicators"],
    highlights: ["Built for site tablets", "Simple progress capture", "Head-office visibility"],
    related: [
      { label: "Enterprise software development", href: "/our-expertise/software-solution/enterprise-software" },
      { label: "SMB software roadmap", href: "/resources/blogs/smb-digital-transformation-roadmap" },
    ],
  },
];

export const PROJECT_TYPES: ProjectType[] = [
  "Website",
  "Web application",
  "Mobile app",
  "SaaS",
  "CRM",
  "ERP / Operations",
  "Booking platform",
  "E-commerce",
  "Dashboard",
  "AI software",
  "Robotics & automation",
  "API-integrated platform",
];
