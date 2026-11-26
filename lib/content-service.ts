import { unstable_cache } from "next/cache";

import { jobData } from "@/lib/internsData";
import { connectToDatabase } from "@/lib/db";
import {
  AboutSettingsModel,
  BlogPostModel,
  ContactMessageModel,
  ContactSettingsModel,
  ExpertisePageModel,
  ExpertiseSettingsModel,
  HomeSettingsModel,
  InternModel,
  JobApplicationModel,
  JobOpeningModel,
  OffshoreDeveloperPageModel,
  OffshoreDeveloperSettingsModel,
  ProductPageModel,
  ProductSettingsModel,
  PortfolioProjectModel,
  ResourceUiSettingsModel,
  SiteSettingsModel,
  TeamMemberModel,
  TechnologyPageModel,
} from "@/lib/models";
import { buildExpertiseSeedRecords, defaultExpertiseSettings } from "@/lib/expertise-seed";
import { defaultAboutSettings, defaultHomeSettings } from "@/lib/home-about-seed";
import { buildOffshoreDeveloperSeedRecords, defaultOffshoreDeveloperSettings } from "@/lib/offshore-developer-seed";
import { buildProductSeedRecords, defaultProductSettings } from "@/lib/product-seed";
import { buildTechnologySeedRecords, getTechnologyTemplate } from "@/lib/technology-seed";
import type {
  AboutSettingsRecord,
  AdminOverview,
  BlogPostRecord,
  ContactSettingsRecord,
  ExpertisePageRecord,
  ExpertiseSettingsRecord,
  HomeSettingsRecord,
  InternRecord,
  JobApplicationRecord,
  JobOpeningRecord,
  OffshoreDeveloperPageRecord,
  OffshoreDeveloperSettingsRecord,
  ProductPageRecord,
  ProductSettingsRecord,
  PortfolioProjectRecord,
  ResourceUiSettingsRecord,
  SiteSettings,
  TeamMemberRecord,
  TechnologyPageRecord,
} from "@/lib/content-types";

const defaultPageCopy = {
  heroEyebrow: "",
  heroTitle: "",
  heroDescription: "",
  sectionEyebrow: "",
  sectionTitle: "",
  sectionDescription: "",
  ctaEyebrow: "",
  ctaTitle: "",
  ctaDescription: "",
  ctaButtonLabel: "",
  ctaButtonHref: "",
};

const defaultSharedStats = [
  { value: "10+", label: "Years in Experience" },
  { value: "150+", label: "All Experts" },
  { value: "98%", label: "On-Time Projects Delivered" },
  { value: "1500+", label: "Projects Delivered" },
  { value: "93%", label: "Repeated Client" },
];

const defaultSiteSettings: SiteSettings = {
  key: "site-settings",
  companyName: "ALPIXN",
  shortName: "ALPIXN",
  experienceLabel: "10+ Years",
  headerTagline: "Engineering modern digital products and growth systems.",
  footerDescription:
    "ALPIXN helps teams design, build, and scale products with product strategy, engineering, AI, and digital growth support.",
  newsletterTitle: "Insights worth reading",
  newsletterDescription: "Follow updates across engineering, careers, portfolio work, and product thinking.",
  // Logo
  logoUrl: "/brand/alpixn-logo-horizontal.webp",
  logoAlt: "ALPIXN",
  // Contact information
  contactEmail: "info@axano.in",
  contactPhone: "+91 0000000000",
  contactAddress: "Cyber Park 3rd & 10th Floor, Tower B, Mumbai, Maharashtra 000000, India",
  businessHours: "Monday to Friday 9AM – 7PM IST",
  // Social media
  socialMedia: {
    instagram: "https://instagram.com/axano",
    linkedin: "https://linkedin.com/company/axano",
    facebook: "https://facebook.com/axano",
    twitter: "https://twitter.com/axano",
    youtube: "https://youtube.com/@axano",
  },
  // Office locations
  officeLocations: ["Ahmedabad, India", "Remote Delivery Teams"],
  offices: [
    { name: "India", address: "Cyber Park 3rd & 10th Floor, Tower B, Cyber Park, Mumbai, Maharashtra 000000, India", email: "india-sales@axano.in", flagImage: "/images/india.svg", order: 1, isPublished: true },
    { name: "New York USA", address: "101 Park Avenue, Suite 2000, New York, NY 10001, USA", email: "usa-sales@axano.in", flagImage: "/images/usa.svg", order: 2, isPublished: true },
    { name: "Sydney Australia", address: "Level 10, 123 Pitt Street, Sydney, NSW 2000, Australia", email: "australia-sales@axano.in", flagImage: "/images/australia.svg", order: 3, isPublished: true },
    { name: "Dubai UAE", address: "Business Bay, Bay Square, Building 1, Dubai, UAE", email: "dubai-sales@axano.in", flagImage: "/images/uae.svg", order: 4, isPublished: true },
    { name: "London UK", address: "100 Liverpool Street, London, EC2M 2RH, United Kingdom", email: "uk-sales@axano.in", flagImage: "/images/uk.svg", order: 5, isPublished: true },
    { name: "Milan Italy", address: "Via Monte Napoleone, 8, 20121 Milano, Italy", email: "italy-sales@axano.in", flagImage: "/images/italy.svg", order: 6, isPublished: true },
    { name: "Thailand", address: "Park Ventures Ecoplex, 57 Wireless Road, Bangkok, Thailand", email: "thailand-sales@axano.in", flagImage: "/images/thailand.svg", order: 7, isPublished: true },
    { name: "South Africa", address: "The Zone @ Rosebank, 177 Oxford Road, Johannesburg, South Africa", email: "sa-sales@axano.in", flagImage: "/images/south-africa.svg", order: 8, isPublished: true },
    { name: "Canada", address: "100 King Street West, Suite 5700, Toronto, ON M5X 1C7, Canada", email: "canada-sales@axano.in", flagImage: "/images/canada.svg", order: 9, isPublished: true },
  ],
  // Footer configuration
  footerColumns: [
    {
      title: "Company",
      order: 1,
      links: [
        { label: "Home", href: "/", order: 1 },
        { label: "About", href: "/about", order: 2 },
        { label: "Offshore Developers", href: "/offshore-developer", order: 3 },
        { label: "Products", href: "/products", order: 4 },
        { label: "Our Expertise", href: "/our-expertise", order: 5 },
        { label: "Technologies", href: "/technologies", order: 6 },
        { label: "Contact", href: "/contact-us", order: 7 },
      ],
    },
    {
      title: "Services",
      order: 2,
      links: [
        { label: "Software Development", href: "/our-expertise/software-solution/software-development", order: 1 },
        { label: "Mobile App Development", href: "/our-expertise/software-solution/mobile-app-development", order: 2 },
        { label: "Application Modernization", href: "/our-expertise/software-solution/application-modernization", order: 3 },
        { label: "CRM Development Services", href: "/our-expertise/software-solution/crm-development", order: 4 },
        { label: "ERP Software", href: "/our-expertise/software-solution/erp-software", order: 5 },
        { label: "Data Analytics", href: "/our-expertise/software-solution/data-analytics", order: 6 },
        { label: "DevOps Services", href: "/our-expertise/software-solution/devops-services", order: 7 },
        { label: "Cloud Consulting", href: "/our-expertise/software-solution/cloud-consulting", order: 8 },
        { label: "Staff Augmentation", href: "/our-expertise/software-solution/staff-augmentation", order: 9 },
        { label: "Hire Developers", href: "/offshore-developer", order: 10 },
      ],
    },
    {
      title: "Industries",
      order: 3,
      links: [
        { label: "FinTech", href: "/our-expertise/industries/fintech", order: 1 },
        { label: "Insurtech", href: "/our-expertise/industries/insuretech", order: 2 },
        { label: "Proptech", href: "/our-expertise/industries/proptech", order: 3 },
        { label: "EdTech", href: "/our-expertise/industries/edtech", order: 4 },
        { label: "Media & Entertainment", href: "/our-expertise/industries/media-entertainment", order: 5 },
        { label: "Healthcare", href: "/our-expertise/industries/healthtech", order: 6 },
        { label: "Retail", href: "/our-expertise/industries/retail", order: 7 },
        { label: "Facility Management", href: "/our-expertise/industries/facility-management", order: 8 },
        { label: "Supply Chain & Logistics", href: "/our-expertise/industries/transport", order: 9 },
        { label: "Telecom", href: "/our-expertise/industries/telecom", order: 10 },
        { label: "Travel & Hospitality", href: "/our-expertise/industries/travel", order: 11 },
      ],
    },
    {
      title: "Offshore Developers",
      order: 4,
      links: [
        { label: "Hire Node.js Developer", href: "/offshore-developer/backend-developer/hire-nodejs-developer", order: 1 },
        { label: "Hire React Developer", href: "/offshore-developer/frontend-developer/hire-reactjs-developer", order: 2 },
        { label: "Hire Python Developer", href: "/offshore-developer/backend-developer/hire-python-developer", order: 3 },
        { label: "Hire Flutter Developer", href: "/offshore-developer/mobile-developer/hire-flutter-developer", order: 4 },
        { label: "Hire DevOps Engineer", href: "/offshore-developer/devops-developer/hire-devops-engineer", order: 5 },
        { label: "Hire AWS Developer", href: "/offshore-developer/cloud-developer/hire-aws-developer", order: 6 },
        { label: "Hire Full Stack Developer", href: "/offshore-developer/fullstack-developer/hire-fullstack-developer", order: 7 },
        { label: "Hire AI Developer", href: "/offshore-developer/ai-ml-developer/hire-ai-developer", order: 8 },
      ],
    },
    {
      title: "Resources",
      order: 5,
      links: [
        { label: "Blogs", href: "/resources/blogs", order: 1 },
        { label: "Careers", href: "/resources/careers", order: 2 },
        { label: "Our Team", href: "/resources/our-team", order: 3 },
        { label: "Interns & Alumni", href: "/resources/interns-alumni", order: 4 },
        { label: "Portfolio", href: "/resources/portfolio", order: 5 },
      ],
    },
  ],
  sharedStats: defaultSharedStats,
  copyrightText: "©2025 All Rights Reserved.",
  pageContent: {
    home: defaultPageCopy,
    resources: defaultPageCopy,
    interns: {
      ...defaultPageCopy,
      heroTitle: "Our Internship Candidates",
      heroDescription:
        "We are proud of the interns who completed their training journey with ALPIXN.",
      ctaTitle: "Want To Be Part Of The Next Batch?",
      ctaDescription: "Join our growing team of innovators and gain real-world experience through hands-on projects and mentorship.",
      ctaButtonLabel: "Apply for Internship",
      ctaButtonHref: "/resources/careers",
    },
    team: {
      ...defaultPageCopy,
      heroTitle: "The Innovators, Creators, and Dreamers",
      heroDescription:
        "Our philosophy is simple: hire great people and give them the support to do their best work.",
      ctaTitle: "Turn your ideas into stunning visuals",
      ctaDescription: "Stop imagining and start creating with a team that can turn strong ideas into strong product experiences.",
      ctaButtonLabel: "Get a Free Consultation",
      ctaButtonHref: "/contact-us",
    },
    portfolio: {
      ...defaultPageCopy,
      heroTitle: "Proven Results And Impacts",
      heroDescription:
        "See how our strategies have helped businesses thrive through successful projects and case studies.",
      sectionTitle: "Showcasing Our Work",
      ctaTitle: "Improve your business and make your work easy",
      ctaDescription: "Expert consulting solutions to drive growth, optimize operations, and simplify your path to success.",
      ctaButtonLabel: "Get a Free Consultation",
      ctaButtonHref: "/contact-us",
    },
    careers: {
      ...defaultPageCopy,
      heroTitle: "Innovate With Us",
      heroDescription: "We create solutions for ambitious teams and enjoy solving meaningful problems.",
      ctaTitle: "Shape the Future With Us",
      ctaDescription: "Join a team that is redefining innovation. Explore open roles and start your journey today.",
      ctaButtonLabel: "Apply Now",
      ctaButtonHref: "/resources/careers",
    },
    blogs: {
      ...defaultPageCopy,
      heroTitle: "New Article",
      heroDescription: "Editorial insights across engineering, AI, product design, and digital transformation.",
      sectionTitle: "Explore Our Articles",
      ctaTitle: "Need help from our experts?",
      ctaDescription: "Talk to our team about building, scaling, or improving your digital product.",
      ctaButtonLabel: "Contact Our Team",
      ctaButtonHref: "/contact-us",
    },
  },
};

const defaultContactSettings: ContactSettingsRecord = {
  key: "contact",
  // Hero section
  heroTitle: "Your Digital Future",
  heroDescription:
    "Ready to transform your digital presence? We're here to help you achieve extraordinary results. Get in touch with our team of experts and let's discuss how we can accelerate your business growth.",
  // Contact form section
  formIntroTitle: "Your Digital Future",
  formIntroDescription:
    "Ready to transform your digital presence? We're here to help you achieve extraordinary results. Get in touch with our team of experts and let's discuss how we can accelerate your business growth.",
  formPhoneNumber: "+91 0000000000",
  formPhoneAvailability: "Available Monday to Friday 9AM – 7PM IST",
  formEmail: "info@axano.in",
  formSupportEmail: "support@company.com",
  formAddress: "Cyber Park 3rd & 10th Floor, Tower B, Cyber Park, Mumbai, Maharashtra 000000, India",
  formButtonText: "Let's Get Started",
  formFirstNameLabel: "First Name",
  formLastNameLabel: "Last Name",
  formEmailLabel: "Email Address",
  formPhoneLabel: "Phone Number",
  formInterestPlaceholder: "Interested in",
  formMessageLabel: "Your Message",
  formInterestOptions: ["Male", "Female"],
  // Assistance section
  assistanceTitle: "Need Immediate Assistance?",
  assistanceDescription: "For urgent inquiries or immediate support, don't hesitate to call us directly.",
  assistanceEmailButtonText: "Email Us",
  assistanceCallButtonText: "Call Now",
  assistanceEmailButtonHref: "mailto:info@axano.in",
  assistanceCallButtonHref: "tel:+910000000000",
  // Global offices section
  globalOfficesTitle: "Our Global Offices",
  globalOffices: [
    {
      name: "India",
      address: "3rd & 10th Floor, Tower B, Cyber Park, Secot -39, Mumbai",
      email: "india-sales@axano.in",
      flagImage: "/images/india.svg",
      order: 1,
      isPublished: true,
    },
    {
      name: "Sydney, Australia",
      address: "Office 117, The Sebel South Brisbane, 23 Merivale St",
      email: "aus-sales@axano.in",
      flagImage: "/images/australia.svg",
      order: 2,
      isPublished: true,
    },
    {
      name: "Dubai, UAE",
      address: "Office 1704, Tower B, Business Central, Dubai Internet City",
      email: "dubai-sales@axano.in",
      flagImage: "/images/uae.svg",
      order: 3,
      isPublished: true,
    },
    {
      name: "Milan, Italy",
      address: "Via Monte Napoleone, 8, 20121 Milano, Italy",
      email: "italy-sales@axano.in",
      flagImage: "/images/italy.svg",
      order: 4,
      isPublished: true,
    },
    {
      name: "London, UK",
      address: "100 Liverpool Street, London, EC2M 2RH, United Kingdom",
      email: "uk-sales@axano.in",
      flagImage: "/images/uk.svg",
      order: 5,
      isPublished: true,
    },
    {
      name: "New York, USA",
      address: "750 Highway 121 BYP, STE 100, Lewisville, TX",
      email: "usa-sales@axano.in",
      flagImage: "/images/usa.svg",
      order: 6,
      isPublished: true,
    },
    {
      name: "Canada",
      address: "100 King Street West, Suite 5700, Toronto, ON M5X 1C7",
      email: "canada-sales@axano.in",
      flagImage: "/images/canada.svg",
      order: 7,
      isPublished: true,
    },
    {
      name: "South Africa",
      address: "The Zone @ Rosebank, 177 Oxford Road, Johannesburg",
      email: "sa-sales@axano.in",
      flagImage: "/images/south-africa.svg",
      order: 8,
      isPublished: true,
    },
    {
      name: "Thailand",
      address: "1 Empire Tower, South Sathorn Road, Sathorn, Bangkok",
      email: "thailand-sales@axano.in",
      flagImage: "/images/thailand.svg",
      order: 9,
      isPublished: true,
    },
  ],
};

const defaultResourceUiSettings: ResourceUiSettingsRecord = {
  key: "resource-ui-settings",
  interns: {
    searchPlaceholder: "Search interns",
    programLabel: "Program",
    allProgramsLabel: "All programs",
    trackLabel: "Track",
    allTracksLabel: "All tracks",
    resultsLabel: "results for:",
    clearAllLabel: "Clear All",
    emptyMessage: "No interns matched the current search and filter selection.",
  },
  portfolio: {
    searchPlaceholder: "Search",
    industryLabel: "Industry",
    allIndustriesLabel: "All industries",
    tagLabel: "Tag",
    allTagsLabel: "All tags",
    resultsLabel: "results for:",
    clearAllLabel: "Clear All",
    emptyMessage: "No portfolio projects matched the current search and filters.",
    detailsTitle: "Details",
    objectiveTitle: "Objective",
    solutionsTitle: "Solutions",
    aboutProjectTitle: "About The Project",
    industryLabelShort: "Industry",
    engagementLabel: "Engagement",
    outcomeLabel: "Outcome",
    servicesProvidedLabel: "Services Provided",
    timelineLabel: "Timeline",
    resultTitle: "Result",
    teamTitle: "Meet Our Team",
    moreProjectsTitle: "View Our More Projects",
  },
  careers: {
    searchPlaceholder: "Search jobs, companies...",
    typeLabel: "Job type",
    allTypesLabel: "All job types",
    modeLabel: "Mode",
    allModesLabel: "All modes",
    viewDetailsLabel: "View Details",
    emptyMessage: "No job openings matched the current search and filters.",
    overviewTitle: "Overview:",
    responsibilitiesTitle: "Position Overview:",
    requirementsTitle: "Qualifications:",
    benefitsTitle: "Benefits:",
    applyButtonLabel: "Apply Now",
    applyIntroTitle: "Apply Now & Grow With Us",
    applyIntroDescription: "Start your journey with us today! Fill out the form below and take the first step toward an exciting career opportunity.",
    applyFullNamePlaceholder: "Full Name",
    applyPhonePlaceholder: "Contact Number",
    applyEmailPlaceholder: "Email Address",
    applyLocationPlaceholder: "Location",
    applyLinkedInPlaceholder: "LinkedIn URL",
    applyPortfolioPlaceholder: "Portfolio / Project URL",
    applyCvPlaceholder: "CV Google Drive Link",
    applyCoverLetterPlaceholder: "Tell us why you are a fit for {jobTitle}",
    applySummaryPrefix: "Applying for",
    applySubmitLabel: "Submit Application",
  },
  blogs: {
    heroReadButtonLabel: "Read Full Article",
    searchPlaceholder: "Search articles",
    allCategoriesLabel: "All categories",
    articlesFoundSuffix: "articles found",
    emptyExploreMessage: "No articles matched the current search and category.",
    latestTitle: "Our Latest Articles",
    categoriesTitle: "Categories",
    latestEmptyMessage: "No published articles yet.",
    authorSummaryTemplate: "This article is part of the {category} series and is managed dynamically from the admin panel.",
    detailsTitle: "Article Details",
    relatedTitle: "Related Articles",
    noRelatedMessage: "No related articles found.",
  },
};

function withResourceUiSettingsDefaults(settings?: Partial<ResourceUiSettingsRecord> | null): ResourceUiSettingsRecord {
  return {
    ...defaultResourceUiSettings,
    ...settings,
    interns: { ...defaultResourceUiSettings.interns, ...(settings?.interns ?? {}) },
    portfolio: { ...defaultResourceUiSettings.portfolio, ...(settings?.portfolio ?? {}) },
    careers: { ...defaultResourceUiSettings.careers, ...(settings?.careers ?? {}) },
    blogs: { ...defaultResourceUiSettings.blogs, ...(settings?.blogs ?? {}) },
  };
}

const internSeedData = [
  {
    slug: "priya-sharma-react-developer",
    name: "Priya Sharma",
    role: "React Developer Intern",
    duration: "July 2025 - September 2025",
    award: "Gold",
    certificateId: "AXAON/INT/2025/03",
    program: "3 Months Program",
    track: "Developer",
    initials: "PS",
    accent: "linear-gradient(135deg, rgba(250, 204, 21, 0.42), rgba(249, 115, 22, 0.18))",
    imageData: "/images/priya.svg",
    order: 1,
    isPublished: true,
  },
  {
    slug: "rohan-mehta-ui-ux-design",
    name: "Rohan Mehta",
    role: "UI/UX Design Intern",
    duration: "May 2025 - July 2025",
    award: "Silver",
    certificateId: "AXAON/INT/2025/02",
    program: "3 Months Program",
    track: "UI/UX",
    initials: "RM",
    accent: "linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(140, 160, 167, 0.2))",
    imageData: "/images/rohan.svg",
    order: 2,
    isPublished: true,
  },
  {
    slug: "aditya-verma-nodejs-developer",
    name: "Aditya Verma",
    role: "Node.js Developer Intern",
    duration: "July 2025 - September 2025",
    award: "Royal Blue",
    certificateId: "AXAON/INT/2025/04",
    program: "3 Months Program",
    track: "Developer",
    initials: "AV",
    accent: "linear-gradient(135deg, rgba(13, 56, 133, 0.4), rgba(56, 158, 255, 0.18))",
    imageData: "/images/verma.svg",
    order: 3,
    isPublished: true,
  },
  {
    slug: "sneha-patel-quality-assurance",
    name: "Sneha Patel",
    role: "Quality Assurance Intern",
    duration: "August 2025 - October 2025",
    award: "Gold",
    certificateId: "AXAON/INT/2025/05",
    program: "3 Months Program",
    track: "QA",
    initials: "SP",
    accent: "linear-gradient(135deg, rgba(16, 185, 129, 0.38), rgba(14, 165, 233, 0.16))",
    imageData: "",
    order: 4,
    isPublished: true,
  },
  {
    slug: "mehul-shah-product-design",
    name: "Mehul Shah",
    role: "Product Design Intern",
    duration: "June 2025 - August 2025",
    award: "Silver",
    certificateId: "AXAON/INT/2025/06",
    program: "2 Months Program",
    track: "UI/UX",
    initials: "MS",
    accent: "linear-gradient(135deg, rgba(244, 114, 182, 0.38), rgba(59, 130, 246, 0.16))",
    imageData: "",
    order: 5,
    isPublished: true,
  },
  {
    slug: "khushi-joshi-data-analyst",
    name: "Khushi Joshi",
    role: "Data Analyst Intern",
    duration: "July 2025 - October 2025",
    award: "Royal Blue",
    certificateId: "AXAON/INT/2025/07",
    program: "4 Months Program",
    track: "Data",
    initials: "KJ",
    accent: "linear-gradient(135deg, rgba(168, 85, 247, 0.38), rgba(14, 165, 233, 0.16))",
    imageData: "",
    order: 6,
    isPublished: true,
  },
];

const teamSeedData = [
  {
    slug: "meena-iyer",
    name: "Meena Iyer",
    role: "Chief Executive Officer",
    focus: "Company strategy, long-term growth, and client partnerships across the product and engineering practice.",
    initials: "MI",
    accent: "linear-gradient(135deg, rgba(14, 165, 233, 0.42), rgba(30, 41, 59, 0.18))",
    imageData: "/images/nair.svg",
    order: 1,
    isPublished: true,
  },
  {
    slug: "priya-nair-cto",
    name: "Priya Nair",
    role: "Chief Technology Officer",
    focus: "Platform architecture, engineering quality, delivery systems, and technical mentorship.",
    initials: "PN",
    accent: "linear-gradient(135deg, rgba(56, 189, 248, 0.4), rgba(15, 23, 42, 0.22))",
    imageData: "/images/nair.svg",
    order: 2,
    isPublished: true,
  },
  {
    slug: "amid-verma",
    name: "Amid Verma",
    role: "Head of UI/UX Design",
    focus: "Design systems, product usability, research synthesis, and visual direction for client platforms.",
    initials: "AV",
    accent: "linear-gradient(135deg, rgba(244, 114, 182, 0.36), rgba(59, 130, 246, 0.18))",
    imageData: "/images/nair.svg",
    order: 3,
    isPublished: true,
  },
  {
    slug: "rahul-sharma",
    name: "Rahul Sharma",
    role: "Lead Full Stack Developer",
    focus: "Delivery leadership across web products, APIs, and scalable app architecture.",
    initials: "RS",
    accent: "linear-gradient(135deg, rgba(16, 185, 129, 0.38), rgba(14, 165, 233, 0.16))",
    imageData: "/images/nair.svg",
    order: 4,
    isPublished: true,
  },
  {
    slug: "ananya-gupta",
    name: "Ananya Gupta",
    role: "Frontend Developer (React.js)",
    focus: "Responsive interfaces, component systems, and production-ready frontend implementation.",
    initials: "AG",
    accent: "linear-gradient(135deg, rgba(251, 191, 36, 0.36), rgba(249, 115, 22, 0.18))",
    imageData: "/images/nair.svg",
    order: 5,
    isPublished: true,
  },
  {
    slug: "karan-singh",
    name: "Karan Singh",
    role: "Senior Node.js Developer",
    focus: "Backend services, API performance, and data modeling for complex business workflows.",
    initials: "KS",
    accent: "linear-gradient(135deg, rgba(99, 102, 241, 0.36), rgba(14, 165, 233, 0.18))",
    imageData: "/images/nair.svg",
    order: 6,
    isPublished: true,
  },
  {
    slug: "nikhil-bansal",
    name: "Nikhil Bansal",
    role: "Business Development Executive",
    focus: "Client discovery, solution alignment, and relationship development across new accounts.",
    initials: "NB",
    accent: "linear-gradient(135deg, rgba(168, 85, 247, 0.36), rgba(59, 130, 246, 0.18))",
    imageData: "/images/nair.svg",
    order: 7,
    isPublished: true,
  },
  {
    slug: "saurabh-jain",
    name: "Saurabh Jain",
    role: "Marketing & Communications Manager",
    focus: "Content strategy, market positioning, and brand communication across digital channels.",
    initials: "SJ",
    accent: "linear-gradient(135deg, rgba(236, 72, 153, 0.36), rgba(168, 85, 247, 0.18))",
    imageData: "/images/nair.svg",
    order: 8,
    isPublished: true,
  },
  {
    slug: "priya-nair-project-manager",
    name: "Priya Nair",
    role: "Project Manager",
    focus: "Cross-functional planning, delivery management, and client-facing execution support.",
    initials: "PN",
    accent: "linear-gradient(135deg, rgba(14, 165, 233, 0.36), rgba(236, 72, 153, 0.18))",
    imageData: "",
    order: 9,
    isPublished: true,
  },
];

const portfolioSeedData = [
  {
    slug: "leap-into-digitalized-referrals",
    title: "Leap into Digitalized Referrals",
    summary:
      "The CRM platform for Akij Cement revolutionizes the referral system for engineers and masons with intuitive partner workflows and performance tracking.",
    industry: "Construction CRM",
    engagement: "UX/UI + Platform Build",
    timeline: "14 weeks",
    outcome: "+38% partner participation",
    tags: ["Web Application", "CRM", "Dashboard"],
    objective:
      "Create a smoother referral workflow for engineers and masons while giving the business a clearer view of partner engagement.",
    objectivePoints: [
      "Reduce friction across referral capture and approvals.",
      "Improve partner visibility and relationship tracking.",
      "Support faster reporting for internal teams.",
    ],
    solutionPoints: [
      "Designed a streamlined CRM workflow for partner submissions.",
      "Created clearer dashboard views for operations and field teams.",
      "Improved system structure to support future program expansion.",
    ],
    resultPrimaryValue: "71.4%",
    resultPrimaryLabel: "Conversion Increase",
    resultSecondaryValue: "342.4%",
    resultSecondaryLabel: "Revenue Increase",
    resultBullets: [
      "Website traffic quality improved with more partner-led referrals.",
      "Internal teams could monitor referral activity much faster.",
      "The new workflow reduced delays across partner onboarding and follow-up.",
    ],
    galleryImageOne: "/images/venex.svg",
    galleryImageTwo: "/images/venex2.svg",
    galleryImageThree: "/images/venex3.svg",
    galleryImageFour: "/images/venex4.svg",
    accent: "linear-gradient(160deg, rgba(59, 130, 246, 0.3), rgba(6, 182, 212, 0.12))",
    imageData: "/images/phone.svg",
    order: 1,
    isPublished: true,
    teamMembers: [],
  },
  {
    slug: "enhancing-fitness-for-australians",
    title: "Enhancing Fitness for Australians",
    summary:
      "Fitmate is a digital fitness experience designed to improve habit formation, coaching access, and retention for active users across Australia.",
    industry: "Health & Fitness",
    engagement: "Mobile Product Design",
    timeline: "10 weeks",
    outcome: "+24% weekly retention",
    tags: ["Mobile App", "Fitness", "Product Design"],
    objective: "Design a more habit-forming digital fitness experience for users with consistent coaching support.",
    objectivePoints: ["Improve retention.", "Simplify workout tracking.", "Make coaching touchpoints more visible."],
    solutionPoints: ["Reworked the mobile experience around user routines.", "Improved content hierarchy and coaching access.", "Aligned the product flow with behavior-based engagement."],
    resultPrimaryValue: "24%",
    resultPrimaryLabel: "Weekly Retention Growth",
    resultSecondaryValue: "18%",
    resultSecondaryLabel: "Session Depth Increase",
    resultBullets: ["Users returned more often during the first month.", "Coaching interactions became easier to discover.", "The overall experience became easier to navigate on mobile."],
    galleryImageOne: "/images/fitness.svg",
    galleryImageTwo: "/images/fitness.svg",
    galleryImageThree: "/images/fitness.svg",
    galleryImageFour: "/images/fitness.svg",
    accent: "linear-gradient(160deg, rgba(16, 185, 129, 0.28), rgba(14, 165, 233, 0.12))",
    imageData: "/images/fitness.svg",
    order: 2,
    isPublished: true,
    teamMembers: [],
  },
  {
    slug: "maldivian-travel-redesign",
    title: "Maldivian Travel Redesign",
    summary:
      "A travel-booking experience redesigned for better discovery, itinerary clarity, and mobile conversions across leisure travelers.",
    industry: "Travel & Hospitality",
    engagement: "UX Audit + Redesign",
    timeline: "8 weeks",
    outcome: "+19% booking conversion",
    tags: ["Travel", "UI/UX", "Booking Flow"],
    objective: "Increase mobile and desktop travel bookings by simplifying destination discovery and itinerary decisions.",
    objectivePoints: ["Reduce friction in search.", "Improve clarity around packages.", "Support faster booking decisions."],
    solutionPoints: ["Restructured destination and trip information.", "Improved the booking flow hierarchy.", "Focused the interface on mobile conversion behavior."],
    resultPrimaryValue: "19%",
    resultPrimaryLabel: "Booking Conversion Increase",
    resultSecondaryValue: "27%",
    resultSecondaryLabel: "Mobile Completion Growth",
    resultBullets: ["Travelers could compare packages faster.", "The booking process felt more predictable.", "Mobile users completed reservations more often."],
    galleryImageOne: "/images/travelwebsite.svg",
    galleryImageTwo: "/images/travelwebsite.svg",
    galleryImageThree: "/images/travelwebsite.svg",
    galleryImageFour: "/images/travelwebsite.svg",
    accent: "linear-gradient(160deg, rgba(56, 189, 248, 0.28), rgba(99, 102, 241, 0.12))",
    imageData: "/images/travelwebsite.svg",
    order: 3,
    isPublished: true,
    teamMembers: [],
  },
  {
    slug: "onethread-project-management-redesign",
    title: "Onethread Project Management Software Redesign",
    summary:
      "A product refresh focused on simplifying work planning, reducing friction inside large boards, and improving collaboration visibility.",
    industry: "Project Management SaaS",
    engagement: "Product Design + UX Research",
    timeline: "12 weeks",
    outcome: "+31% activation rate",
    tags: ["SaaS", "Productivity", "UX Research"],
    objective: "Help teams move from first login to sustained use by simplifying planning and collaboration workflows.",
    objectivePoints: ["Improve feature discoverability.", "Reduce board complexity.", "Increase activation."],
    solutionPoints: ["Ran UX research to identify common workflow friction.", "Redesigned planning surfaces around core actions.", "Improved structure for task visibility and adoption."],
    resultPrimaryValue: "31%",
    resultPrimaryLabel: "Activation Increase",
    resultSecondaryValue: "22%",
    resultSecondaryLabel: "Workflow Completion Growth",
    resultBullets: ["New users understood the product faster.", "Teams adopted planning views more consistently.", "Task collaboration required fewer clicks."],
    galleryImageOne: "/images/onethread.svg",
    galleryImageTwo: "/images/onethread.svg",
    galleryImageThree: "/images/onethread.svg",
    galleryImageFour: "/images/onethread.svg",
    accent: "linear-gradient(160deg, rgba(244, 114, 182, 0.28), rgba(59, 130, 246, 0.12))",
    imageData: "/images/onethread.svg",
    order: 4,
    isPublished: true,
    teamMembers: [],
  },
  {
    slug: "healthcare-management-system",
    title: "Healthcare Management System",
    summary:
      "An integrated hospital operations platform for patient records, appointments, workflows, and AI-assisted healthcare insights.",
    industry: "Healthcare",
    engagement: "Platform Design + Engineering",
    timeline: "16 weeks",
    outcome: "2x faster admin processing",
    tags: ["Healthcare", "Admin Panel", "Operations"],
    objective: "Unify fragmented hospital workflows into a clearer operational system for care and admin teams.",
    objectivePoints: ["Improve record access.", "Reduce admin repetition.", "Support appointment visibility."],
    solutionPoints: ["Centralized record and scheduling workflows.", "Improved staff-facing dashboard structure.", "Made operational actions easier to track across teams."],
    resultPrimaryValue: "2x",
    resultPrimaryLabel: "Faster Admin Processing",
    resultSecondaryValue: "29%",
    resultSecondaryLabel: "Workflow Error Reduction",
    resultBullets: ["Staff could complete repeated tasks with fewer steps.", "Operational visibility improved across departments.", "The platform supported more reliable day-to-day coordination."],
    galleryImageOne: "/images/healthcare.svg",
    galleryImageTwo: "/images/healthcare.svg",
    galleryImageThree: "/images/healthcare.svg",
    galleryImageFour: "/images/healthcare.svg",
    accent: "linear-gradient(160deg, rgba(20, 184, 166, 0.28), rgba(14, 165, 233, 0.12))",
    imageData: "/images/healthcare.svg",
    order: 5,
    isPublished: true,
    teamMembers: [],
  },
  {
    slug: "automark-ai-automation-platform",
    title: "AutoMarkAI Automation Platform",
    summary:
      "An AI-driven marketing assistant that streamlines campaign creation, content suggestions, and performance analytics for digital agencies.",
    industry: "Marketing Technology",
    engagement: "AI Product Development",
    timeline: "11 weeks",
    outcome: "41% faster campaign setup",
    tags: ["AI", "Automation", "Analytics"],
    objective: "Reduce the effort needed to build and launch campaigns for agency teams working across multiple clients.",
    objectivePoints: ["Speed up setup.", "Improve content generation workflows.", "Make performance tracking easier."],
    solutionPoints: ["Built a cleaner AI-assisted setup flow.", "Improved content suggestion clarity.", "Connected campaign actions to analytics visibility."],
    resultPrimaryValue: "41%",
    resultPrimaryLabel: "Faster Campaign Setup",
    resultSecondaryValue: "17%",
    resultSecondaryLabel: "Content Throughput Growth",
    resultBullets: ["Teams could launch campaigns with less manual work.", "Content iteration moved faster.", "Performance reporting became easier to review."],
    galleryImageOne: "/images/automation.svg",
    galleryImageTwo: "/images/automation.svg",
    galleryImageThree: "/images/automation.svg",
    galleryImageFour: "/images/automation.svg",
    accent: "linear-gradient(160deg, rgba(168, 85, 247, 0.28), rgba(59, 130, 246, 0.12))",
    imageData: "/images/automation.svg",
    order: 6,
    isPublished: true,
    teamMembers: [],
  },
  {
    slug: "finx-erp-suite-fintech-platform",
    title: "FinX ERP Suite Fintech Platform",
    summary:
      "A smart ERP system integrating payroll, taxation, and financial automation for SMEs with better compliance visibility.",
    industry: "Fintech",
    engagement: "ERP Experience Design",
    timeline: "15 weeks",
    outcome: "26% fewer finance ops errors",
    tags: ["ERP", "Fintech", "Automation"],
    objective: "Make finance and payroll workflows easier for SME teams managing operations with limited internal complexity tolerance.",
    objectivePoints: ["Improve process visibility.", "Reduce manual errors.", "Support compliance clarity."],
    solutionPoints: ["Reframed finance operations around clearer task groupings.", "Improved reporting and review flows.", "Reduced friction across key payroll and tax interactions."],
    resultPrimaryValue: "26%",
    resultPrimaryLabel: "Error Reduction",
    resultSecondaryValue: "34%",
    resultSecondaryLabel: "Reporting Speed Increase",
    resultBullets: ["Teams reviewed finance operations with more confidence.", "Manual mistakes dropped across routine tasks.", "Compliance-related workflows became easier to track."],
    galleryImageOne: "/images/finx.svg",
    galleryImageTwo: "/images/finx.svg",
    galleryImageThree: "/images/finx.svg",
    galleryImageFour: "/images/finx.svg",
    accent: "linear-gradient(160deg, rgba(251, 191, 36, 0.28), rgba(245, 158, 11, 0.12))",
    imageData: "/images/finx.svg",
    order: 7,
    isPublished: true,
    teamMembers: [],
  },
  {
    slug: "smartpay-ai-payroll-automation",
    title: "SmartPay AI Payroll Automation",
    summary:
      "An AI-powered HR and payroll automation dashboard for enterprise teams, with predictive analytics and reporting.",
    industry: "HR Tech",
    engagement: "Dashboard UX + Automation",
    timeline: "9 weeks",
    outcome: "54% faster payroll runs",
    tags: ["HR Tech", "Payroll", "Dashboard"],
    objective: "Streamline payroll and analytics for enterprise HR teams that need speed without losing review control.",
    objectivePoints: ["Improve payroll speed.", "Surface analytics clearly.", "Reduce admin overhead."],
    solutionPoints: ["Designed a dashboard around payroll-critical tasks.", "Improved analytics visibility for HR stakeholders.", "Reduced navigation complexity across routine actions."],
    resultPrimaryValue: "54%",
    resultPrimaryLabel: "Faster Payroll Runs",
    resultSecondaryValue: "21%",
    resultSecondaryLabel: "Admin Time Reduction",
    resultBullets: ["Payroll cycles became faster and easier to manage.", "HR teams had clearer access to operational metrics.", "The system reduced repetitive admin interactions."],
    galleryImageOne: "/images/smartpay.svg",
    galleryImageTwo: "/images/smartpay.svg",
    galleryImageThree: "/images/smartpay.svg",
    galleryImageFour: "/images/smartpay.svg",
    accent: "linear-gradient(160deg, rgba(14, 165, 233, 0.28), rgba(6, 182, 212, 0.12))",
    imageData: "/images/smartpay.svg",
    order: 8,
    isPublished: true,
    teamMembers: [],
  },
];

const blogSeedData = [
  {
    slug: "prompt-based-control-flow-in-fastapi-using-langchain-expression-language-lcel",
    title: "Prompt-Based Control Flow in FastAPI Using LangChain Expression Language (LCEL)",
    excerpt:
      "How structured prompt pipelines make FastAPI services more composable, testable, and easier to evolve inside AI-backed systems.",
    content:
      "Prompt orchestration becomes much easier to reason about when the control flow is explicit. LCEL gives teams a consistent way to compose prompts, retrieval, and model calls without burying that logic across multiple service layers.\n\nIn FastAPI projects, that matters because the API surface stays clean while the prompt chain remains modular. Teams can iterate on prompts, add routing logic, and test individual branches without turning the request lifecycle into a black box.\n\nA good implementation treats prompt chains like application logic instead of magic strings. That usually means better observability, safer rollouts, and simpler maintenance for product teams building AI features in production.",
    author: "ALPIXN",
    readTime: "4 min read",
    category: "AI Engineering",
    featured: true,
    accent: "linear-gradient(160deg, rgba(56, 189, 248, 0.28), rgba(14, 116, 144, 0.12))",
    imageData: "/images/lcel.svg",
    order: 1,
    isPublished: true,
  },
  {
    slug: "monolithic-vs-microservices-features-pros-cons-real-world-use-cases",
    title: "Monolithic vs Microservices: Features, Pros & Cons, and Real-World Use Cases",
    excerpt:
      "Choosing between a monolith and microservices depends less on trends and more on delivery shape, team structure, and product complexity.",
    content:
      "Architecture decisions usually fail when teams make them too early or for the wrong reasons. A monolith can be the fastest path for a product that still needs validation, while microservices become useful when teams need clearer ownership boundaries and isolated scaling.\n\nThe practical tradeoff is operational complexity. Microservices create more moving parts, more deployment surfaces, and more coordination overhead. If the organization is not ready for that, the architecture will hurt velocity instead of helping it.\n\nThe right answer comes from product maturity, deployment frequency, and how independently teams need to move. Architecture should support the business, not compete with it.",
    author: "ALPIXN",
    readTime: "5 min read",
    category: "Architecture",
    featured: false,
    accent: "linear-gradient(160deg, rgba(168, 85, 247, 0.28), rgba(59, 130, 246, 0.12))",
    imageData: "/images/mono.svg",
    order: 2,
    isPublished: true,
  },
  {
    slug: "repairing-broken-json-in-python-with-json-repair",
    title: "Repairing Broken JSON in Python with json-repair",
    excerpt: "Malformed JSON shows up often in real integrations. The value is in recovering safely without hiding upstream issues.",
    content:
      "Broken JSON appears in LLM outputs, vendor payloads, and partially formatted exports. Recovery tools are useful, but they work best when teams also log and classify what failed.\n\nUsing a repair step inside Python services can reduce downstream crashes and keep automation flows moving. Still, repaired output should be treated as a mitigation, not a replacement for proper validation and schema checks.\n\nThe healthiest approach is usually repair first, validate second, and report the failure path so the source can eventually be fixed.",
    author: "ALPIXN",
    readTime: "3 min read",
    category: "Python",
    featured: false,
    accent: "linear-gradient(160deg, rgba(251, 191, 36, 0.28), rgba(249, 115, 22, 0.12))",
    imageData: "/images/rapairing.svg",
    order: 3,
    isPublished: true,
  },
  {
    slug: "how-nlp-is-transforming-the-legal-domain-use-cases-challenges",
    title: "How NLP is Transforming the Legal Domain: Use Cases & Challenges",
    excerpt: "Legal NLP can accelerate review and research, but only when teams stay strict about accuracy, provenance, and human review.",
    content:
      "The legal domain benefits from NLP where the work is repetitive, document-heavy, and time-sensitive. Search, summarization, clause extraction, and issue spotting all become faster when language systems are applied carefully.\n\nThe challenge is that legal work has a low tolerance for ambiguity. Systems need traceability, confidence checks, and review workflows so that automation supports experts instead of replacing their judgment.\n\nThe best legal NLP products create leverage for practitioners by reducing manual effort while preserving accountability.",
    author: "ALPIXN",
    readTime: "4 min read",
    category: "NLP",
    featured: false,
    accent: "linear-gradient(160deg, rgba(14, 165, 233, 0.28), rgba(168, 85, 247, 0.12))",
    imageData: "/images/nlp.svg",
    order: 4,
    isPublished: true,
  },
  {
    slug: "generative-ai-in-retail-use-cases-with-real-life-examples",
    title: "Generative AI in Retail: Use Cases with Real-Life Examples",
    excerpt: "Retail teams are using generative AI where speed and personalization directly affect conversion and retention.",
    content:
      "Retail adoption succeeds when AI improves a measurable customer or operations workflow. Merchandising copy, personalized recommendations, customer support, and internal search are common places where generative systems already create value.\n\nWhat matters most is operational fit. Retail systems need guardrails for pricing, inventory, and policy-sensitive messaging, especially when AI touches customer-facing surfaces.\n\nWhen implemented with those constraints in mind, generative AI can increase content velocity and improve buying journeys without degrading brand consistency.",
    author: "ALPIXN",
    readTime: "4 min read",
    category: "Retail AI",
    featured: false,
    accent: "linear-gradient(160deg, rgba(244, 114, 182, 0.28), rgba(249, 115, 22, 0.12))",
    imageData: "/images/generative-ai.svg",
    order: 5,
    isPublished: true,
  },
  {
    slug: "natural-language-processing-nlp-in-healthcare-applications-and-benefits",
    title: "Natural Language Processing (NLP) in Healthcare: Applications and Benefits",
    excerpt:
      "Healthcare NLP creates leverage across records, documentation, and decision support when paired with strong clinical review.",
    content:
      "Healthcare organizations sit on large amounts of unstructured text. NLP helps transform that text into usable signals for coding, triage, documentation, and patient support workflows.\n\nThe opportunity is large, but healthcare teams also need privacy, auditability, and clinical safety. Systems should be built to support care teams, not create hidden failure points.\n\nTeams that combine domain expertise with careful product design can make NLP genuinely useful in care delivery and operations.",
    author: "ALPIXN",
    readTime: "4 min read",
    category: "Healthcare AI",
    featured: false,
    accent: "linear-gradient(160deg, rgba(16, 185, 129, 0.28), rgba(14, 165, 233, 0.12))",
    imageData: "/images/nlp-health.svg",
    order: 6,
    isPublished: true,
  },
  {
    slug: "a-deep-dive-into-textgrads-differential-optimization-framework",
    title: "A Deep Dive into TextGrad's Differential Optimization Framework",
    excerpt: "Text-based optimization is useful when teams need iterative prompt improvement with clearer feedback loops.",
    content:
      "Optimization frameworks like TextGrad are interesting because they formalize how prompts evolve. Instead of manual tweaking, teams can structure experimentation and use model-generated feedback as part of the iteration loop.\n\nThat does not eliminate evaluation discipline. Teams still need strong task definitions, human review, and success metrics to prevent the optimization process from drifting away from the actual product goal.\n\nUsed carefully, these frameworks can turn prompt work from ad hoc craft into a more repeatable engineering process.",
    author: "ALPIXN",
    readTime: "5 min read",
    category: "LLM Systems",
    featured: false,
    accent: "linear-gradient(160deg, rgba(59, 130, 246, 0.28), rgba(99, 102, 241, 0.12))",
    imageData: "/images/deepdive.svg",
    order: 7,
    isPublished: true,
  },
  {
    slug: "generative-ai-vs-predictive-ai-the-ultimate-comparison-guide",
    title: "Generative AI vs Predictive AI: The Ultimate Comparison Guide",
    excerpt: "These two AI categories solve different business problems, and product teams should treat them that way.",
    content:
      "Generative AI creates new outputs while predictive AI estimates what is likely to happen next. The overlap in tooling can make them look similar, but the product and business use cases are different.\n\nPredictive systems usually power decisions such as forecasting, risk scoring, and demand planning. Generative systems are better suited to content, assistance, and interface-level intelligence.\n\nTeams make better bets when they start with the workflow they need to improve, then pick the AI pattern that actually fits it.",
    author: "ALPIXN",
    readTime: "4 min read",
    category: "AI Strategy",
    featured: false,
    accent: "linear-gradient(160deg, rgba(236, 72, 153, 0.28), rgba(59, 130, 246, 0.12))",
    imageData: "/images/predictive.svg",
    order: 8,
    isPublished: true,
  },
  {
    slug: "prompt-to-flowchart-generating-flowcharts-from-natural-language-using-genai",
    title: "Prompt-to-Flowchart: Generating Flowcharts from Natural Language using GenAI",
    excerpt:
      "Learn how to transform natural language descriptions into visual flowcharts using generative AI, enabling faster documentation and process visualization.",
    content:
      "Flowcharts have always been a powerful way to visualize processes, but creating them manually can be time-consuming. With generative AI, teams can now describe a process in plain English and get a structured flowchart automatically.\n\nThis approach works especially well for technical documentation, onboarding materials, and process mapping. Instead of spending hours in diagramming tools, engineers and product managers can focus on the logic while AI handles the visual representation.\n\nThe key is using well-structured prompts that capture decision points, branches, and endpoints. When combined with modern LLMs, these prompts become powerful tools for rapid visualization.",
    author: "Jellyfish Technologies",
    readTime: "5 min read",
    category: "AI Engineering",
    featured: false,
    accent: "linear-gradient(160deg, rgba(56, 189, 248, 0.28), rgba(14, 116, 144, 0.12))",
    imageData: "/images/prompt-to-flowchart.png",
    order: 9,
    isPublished: true,
  },
  {
    slug: "how-natural-language-processing-is-transforming-industries",
    title: "How Natural Language Processing Is Transforming Industries",
    excerpt:
      "Explore how NLP technologies are revolutionizing healthcare, finance, retail, and other sectors through automated text analysis and understanding.",
    content:
      "Natural Language Processing has moved from research labs to production systems across every major industry. Healthcare uses NLP for clinical documentation, finance applies it to sentiment analysis and fraud detection, and retail leverages it for customer service automation.\n\nThe common thread is that organizations have vast amounts of unstructured text data that was previously inaccessible to systematic analysis. NLP unlocks this data, turning emails, documents, and conversations into actionable insights.\n\nSuccess in NLP deployment depends on understanding both the capabilities and limitations. Models work best when teams combine them with domain expertise and appropriate human review workflows.",
    author: "Vivek Sadh",
    readTime: "6 min read",
    category: "NLP",
    featured: false,
    accent: "linear-gradient(160deg, rgba(14, 165, 233, 0.28), rgba(168, 85, 247, 0.12))",
    imageData: "/images/natural-language.png",
    order: 10,
    isPublished: true,
  },
  {
    slug: "cache-augmented-generation-cag-a-revolutionary-alternative-to-rag",
    title: "Cache-Augmented Generation (CAG): A Revolutionary Alternative to RAG",
    excerpt:
      "Discover how Cache-Augmented Generation improves upon RAG by reducing latency and costs while maintaining context accuracy in AI applications.",
    content:
      "Retrieval-Augmented Generation (RAG) has become the standard for grounding LLM responses in external knowledge. However, RAG comes with latency overhead from real-time retrieval and potential consistency issues when documents change frequently.\n\nCache-Augmented Generation (CAG) addresses these challenges by pre-computing and caching relevant context. Instead of querying a vector database on every request, CAG maintains a warm cache of frequently accessed information that can be injected directly into prompts.\n\nThis approach works especially well for applications with predictable query patterns, stable knowledge bases, and strict latency requirements. Teams can achieve significant cost savings while maintaining the accuracy benefits of grounded generation.",
    author: "Jellyfish Technologies",
    readTime: "5 min read",
    category: "AI Engineering",
    featured: false,
    accent: "linear-gradient(160deg, rgba(168, 85, 247, 0.28), rgba(59, 130, 246, 0.12))",
    imageData: "/images/cache-augmented.png",
    order: 11,
    isPublished: true,
  },
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-") || "item";
}

function toPlainRecord<T>(record: { _id: unknown } & Record<string, unknown>): T {
  return {
    ...record,
    _id: String(record._id),
  } as T;
}

function withPageCopyDefaults(
  fallback: SiteSettings["pageContent"]["home"],
  pageCopy?: Partial<SiteSettings["pageContent"]["home"]>
) {
  return {
    ...fallback,
    ...pageCopy,
  };
}

function withSiteSettingsDefaults(settings?: Partial<SiteSettings> | null): SiteSettings {
  return {
    ...defaultSiteSettings,
    ...settings,
    sharedStats: settings?.sharedStats?.length ? settings.sharedStats : defaultSiteSettings.sharedStats,
    pageContent: {
      home: withPageCopyDefaults(defaultSiteSettings.pageContent.home, settings?.pageContent?.home),
      resources: withPageCopyDefaults(defaultSiteSettings.pageContent.resources, settings?.pageContent?.resources),
      interns: withPageCopyDefaults(defaultSiteSettings.pageContent.interns, settings?.pageContent?.interns),
      team: withPageCopyDefaults(defaultSiteSettings.pageContent.team, settings?.pageContent?.team),
      portfolio: withPageCopyDefaults(defaultSiteSettings.pageContent.portfolio, settings?.pageContent?.portfolio),
      careers: withPageCopyDefaults(defaultSiteSettings.pageContent.careers, settings?.pageContent?.careers),
      blogs: withPageCopyDefaults(defaultSiteSettings.pageContent.blogs, settings?.pageContent?.blogs),
    },
  };
}

function withPortfolioDefaults(project: PortfolioProjectRecord): PortfolioProjectRecord {
  return {
    ...project,
    objective: project.objective ?? "",
    objectivePoints: project.objectivePoints ?? [],
    solutionPoints: project.solutionPoints ?? [],
    resultPrimaryValue: project.resultPrimaryValue ?? "",
    resultPrimaryLabel: project.resultPrimaryLabel ?? "",
    resultSecondaryValue: project.resultSecondaryValue ?? "",
    resultSecondaryLabel: project.resultSecondaryLabel ?? "",
    resultBullets: project.resultBullets ?? [],
    galleryImageOne: project.galleryImageOne ?? "",
    galleryImageTwo: project.galleryImageTwo ?? "",
    galleryImageThree: project.galleryImageThree ?? "",
    galleryImageFour: project.galleryImageFour ?? "",
    teamMembers: project.teamMembers ?? [],
  };
}

function withTechnologyDefaults(page: TechnologyPageRecord): TechnologyPageRecord {
  const template = getTechnologyTemplate();

  return {
    ...template,
    ...page,
    heroLogos: page.heroLogos ?? template.heroLogos,
    challengeCards: page.challengeCards ?? template.challengeCards,
    talkCards: page.talkCards ?? template.talkCards,
    successCards: page.successCards ?? template.successCards,
    provenCaseStudies: page.provenCaseStudies ?? template.provenCaseStudies,
    qualityPoints: page.qualityPoints ?? template.qualityPoints,
    stackItems: page.stackItems ?? template.stackItems,
    leaderStats: page.leaderStats ?? template.leaderStats,
    engagementModels: page.engagementModels ?? template.engagementModels,
    faqs: page.faqs ?? template.faqs,
  };
}

function withOffshoreDeveloperPageDefaults(page: OffshoreDeveloperPageRecord): OffshoreDeveloperPageRecord {
  return {
    ...page,
    heroChecklist: page.heroChecklist ?? [],
    heroTechnologies: page.heroTechnologies ?? [],
    excellenceOfferings: page.excellenceOfferings ?? [],
    partnerItems: page.partnerItems ?? [],
    developerItems: page.developerItems ?? [],
    hireServices: page.hireServices ?? [],
    guideTabs: page.guideTabs ?? [],
    steps: page.steps ?? [],
    engagementModels: page.engagementModels ?? [],
  };
}

function withExpertisePageDefaults(page: ExpertisePageRecord): ExpertisePageRecord {
  // When arrays are present but empty (e.g. DB record created before field existed),
  // fall back to seed data so sections render instead of returning null.
  const seed = buildExpertiseSeedRecords().find(
    (s) => s.categoryKey === page.categoryKey && s.slug === page.slug
  );

  return {
    ...page,
    heroLogos: page.heroLogos?.length ? page.heroLogos : seed?.heroLogos ?? [],
    heroBackgroundImage: page.heroBackgroundImage || seed?.heroBackgroundImage || "/images/expertise-hero-bg.png",
    statsHighlights: page.statsHighlights?.length ? page.statsHighlights : seed?.statsHighlights ?? [],
    statsCards: page.statsCards?.length ? page.statsCards : seed?.statsCards ?? [],
    caseStudyTabs: page.caseStudyTabs?.length ? page.caseStudyTabs : seed?.caseStudyTabs ?? [],
    customBenefits: page.customBenefits?.length ? page.customBenefits : seed?.customBenefits ?? [],
    customImage: page.customImage || seed?.customImage || "/images/blobai.png",
    whyChooseFeatures: page.whyChooseFeatures?.length ? page.whyChooseFeatures : seed?.whyChooseFeatures ?? [],
    industriesItems: page.industriesItems?.length ? page.industriesItems : seed?.industriesItems ?? [],
    guideTabs: page.guideTabs?.length ? page.guideTabs : seed?.guideTabs ?? [],
  };
}

function withProductSettingsDefaults(settings?: Partial<ProductSettingsRecord> | null): ProductSettingsRecord {
  return {
    ...defaultProductSettings,
    ...settings,
    featureCards: settings?.featureCards ?? defaultProductSettings.featureCards,
    audienceCards: settings?.audienceCards ?? defaultProductSettings.audienceCards,
    faqs: settings?.faqs ?? defaultProductSettings.faqs,
  };
}

function withOffshoreDeveloperSettingsDefaults(
  settings?: Partial<OffshoreDeveloperSettingsRecord> | null
): OffshoreDeveloperSettingsRecord {
  return {
    ...defaultOffshoreDeveloperSettings,
    ...settings,
    menuCategories: settings?.menuCategories ?? defaultOffshoreDeveloperSettings.menuCategories,
    partnerLogos: settings?.partnerLogos ?? defaultOffshoreDeveloperSettings.partnerLogos,
    testimonials: settings?.testimonials ?? defaultOffshoreDeveloperSettings.testimonials,
    caseStudies: settings?.caseStudies ?? defaultOffshoreDeveloperSettings.caseStudies,
    faqs: settings?.faqs ?? defaultOffshoreDeveloperSettings.faqs,
  };
}

function withExpertiseSettingsDefaults(settings?: Partial<ExpertiseSettingsRecord> | null): ExpertiseSettingsRecord {
  return {
    ...defaultExpertiseSettings,
    ...settings,
    menuCategories: settings?.menuCategories?.length ? settings.menuCategories : defaultExpertiseSettings.menuCategories,
    testimonials: settings?.testimonials?.length ? settings.testimonials : defaultExpertiseSettings.testimonials,
    engagementModels: settings?.engagementModels?.length ? settings.engagementModels : defaultExpertiseSettings.engagementModels,
    techStackTabs: settings?.techStackTabs?.length ? settings.techStackTabs : defaultExpertiseSettings.techStackTabs,
    faqs: settings?.faqs?.length ? settings.faqs : defaultExpertiseSettings.faqs,
  };
}

function withHomeSettingsDefaults(settings?: Partial<HomeSettingsRecord> | null): HomeSettingsRecord {
  const currentIndustryTabIds = new Set((settings?.industriesTabs ?? []).map((tab) => tab.id));
  const legacyIndustryTabIds = [
    "health",
    "banking",
    "retail",
    "automotive",
    "education",
    "realestate",
    "travel",
    "telecom",
  ];
  const hasLegacyIndustriesTabs =
    (settings?.industriesTabs?.length ?? 0) === legacyIndustryTabIds.length &&
    legacyIndustryTabIds.every((id) => currentIndustryTabIds.has(id)) &&
    !currentIndustryTabIds.has("energy") &&
    !currentIndustryTabIds.has("logistics") &&
    !currentIndustryTabIds.has("food");
  const currentTechStackTabs = settings?.techStackTabs ?? [];
  const databasesTab = currentTechStackTabs.find((tab) => tab.name === "Databases");
  const frameworkTab = currentTechStackTabs.find((tab) => tab.name === "Framework");
  const hasLegacyTechStackTabs =
    ((settings?.techStackTabs?.length ?? 0) === 3 && currentTechStackTabs.every((tab) => (tab.items?.length ?? 0) <= 8)) ||
    (databasesTab?.items?.some((item) => ["Postgres", "Redis"].includes(item.label)) ?? false) ||
    (frameworkTab?.items?.some((item) => ["NestJS", "Socket", "Sequelize", "Webpack", "Cloud"].includes(item.label)) ?? false);

  // Check for legacy/mismatched insight cards that link to wrong blog posts
  const currentInsightCards = settings?.insightCards ?? [];
  const legacyInsightHrefs = [
    "/resources/blogs/prompt-based-control-flow-in-fastapi-using-langchain-expression-language-lcel",
    "/resources/blogs/how-nlp-is-transforming-the-legal-domain-use-cases-challenges",
    "/resources/blogs/monolithic-vs-microservices-features-pros-cons-real-world-use-cases",
  ];
  const hasLegacyInsightCards =
    currentInsightCards.length === 3 &&
    currentInsightCards.some((card) => legacyInsightHrefs.includes(card.href)) &&
    currentInsightCards.some((card) =>
      card.title.includes("Prompt-to-Flowchart") ||
      card.title.includes("Natural Language Processing Is Transforming") ||
      card.title.includes("Cache-Augmented Generation")
    );

  return {
    ...defaultHomeSettings,
    ...settings,
    heroPrimaryAction: settings?.heroPrimaryAction ?? defaultHomeSettings.heroPrimaryAction,
    heroSecondaryAction: settings?.heroSecondaryAction ?? defaultHomeSettings.heroSecondaryAction,
    customSolutionCards: settings?.customSolutionCards ?? defaultHomeSettings.customSolutionCards,
    offerings: settings?.offerings ?? defaultHomeSettings.offerings,
    caseStudies: settings?.caseStudies ?? defaultHomeSettings.caseStudies,
    industriesTabs: hasLegacyIndustriesTabs ? defaultHomeSettings.industriesTabs : settings?.industriesTabs ?? defaultHomeSettings.industriesTabs,
    techStackTabs: hasLegacyTechStackTabs ? defaultHomeSettings.techStackTabs : settings?.techStackTabs ?? defaultHomeSettings.techStackTabs,
    insightSection: settings?.insightSection ?? defaultHomeSettings.insightSection,
    insightCards: hasLegacyInsightCards ? defaultHomeSettings.insightCards : settings?.insightCards ?? defaultHomeSettings.insightCards,
  };
}

function withAboutSettingsDefaults(settings?: Partial<AboutSettingsRecord> | null): AboutSettingsRecord {
  return {
    ...defaultAboutSettings,
    ...settings,
    heroPrimaryAction: settings?.heroPrimaryAction ?? defaultAboutSettings.heroPrimaryAction,
    heroSecondaryAction: settings?.heroSecondaryAction ?? defaultAboutSettings.heroSecondaryAction,
    visionStats: settings?.visionStats ?? defaultAboutSettings.visionStats,
    missionCards: settings?.missionCards ?? defaultAboutSettings.missionCards,
    milestoneItems: settings?.milestoneItems ?? defaultAboutSettings.milestoneItems,
    whyChooseCards: settings?.whyChooseCards ?? defaultAboutSettings.whyChooseCards,
  };
}

let databaseFallbackLogged = false;

function logDatabaseFallback(error: unknown) {
  if (databaseFallbackLogged) {
    return;
  }

  databaseFallbackLogged = true;
  console.error("Database unavailable. Serving fallback content.", error);
}

function withFallbackId<T extends { slug: string }>(item: T) {
  return {
    _id: item.slug,
    ...item,
  };
}

function getFallbackProducts() {
  return buildProductSeedRecords().map((item) => withFallbackId(item));
}

function getFallbackJobs() {
  return Object.values(jobData).map((job, index) =>
    withFallbackId({
      slug: job.slug,
      company: job.company,
      title: job.title,
      type: job.type,
      mode: job.location,
      salary: job.salary,
      posted: job.postedDate,
      location: "Ahmedabad",
      overview: job.overview,
      responsibilities: job.positionOverview,
      requirements: job.qualifications,
      benefits: job.benefits,
      accent: "linear-gradient(160deg, rgba(56, 189, 248, 0.24), rgba(14, 165, 233, 0.08))",
      imageData: "",
      order: index + 1,
      isPublished: true,
    })
  );
}

function getFallbackTechnologies() {
  return buildTechnologySeedRecords().map((item) => withTechnologyDefaults(withFallbackId(item)));
}

function getFallbackOffshoreDeveloperPages() {
  return buildOffshoreDeveloperSeedRecords().map((item) => withOffshoreDeveloperPageDefaults(withFallbackId(item)));
}

function getFallbackExpertisePages() {
  return buildExpertiseSeedRecords().map((item) => withExpertisePageDefaults(withFallbackId(item)));
}

// Track if seed data has been ensured this process
let seedDataEnsured = false;

async function prepareRead() {
  try {
    await connectToDatabase();
    // Only run ensureSeedData once per process instead of every request
    if (!seedDataEnsured) {
      await ensureSeedData();
      seedDataEnsured = true;
    }
    return true;
  } catch (error) {
    logDatabaseFallback(error);
    return false;
  }
}

export async function createSlugForModel(
  model: { exists: (query: Record<string, unknown>) => Promise<unknown> },
  value: string,
  currentId?: string
) {
  const baseSlug = slugify(value);
  let candidate = baseSlug;
  let suffix = 2;

  while (
    await model.exists({
      slug: candidate,
      ...(currentId ? { _id: { $ne: currentId } } : {}),
    })
  ) {
    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return candidate;
}

export async function ensureSeedData() {
  await connectToDatabase();

  const [
    existingSettings,
    existingHomeSettings,
    existingAboutSettings,
    existingContactSettings,
    existingResourceUiSettings,
    existingProductSettings,
    existingOffshoreSettings,
    existingExpertiseSettings,
    hasIntern,
    hasTeam,
    hasPortfolio,
    hasJobs,
    hasBlogs,
    hasOffshorePages,
    hasExpertisePages,
    hasProducts,
    hasTechnologies,
  ] = await Promise.all([
    SiteSettingsModel.findOne({ key: "site-settings" }).select("_id").lean(),
    HomeSettingsModel.findOne({ key: "home-settings" }).select("_id").lean(),
    AboutSettingsModel.findOne({ key: "about-settings" }).select("_id").lean(),
    ContactSettingsModel.findOne({ key: "contact" }).select("_id").lean(),
    ResourceUiSettingsModel.findOne({ key: "resource-ui-settings" }).select("_id").lean(),
    ProductSettingsModel.findOne({ key: "product-settings" }).select("_id").lean(),
    OffshoreDeveloperSettingsModel.findOne({ key: "offshore-developer-settings" }).select("_id").lean(),
    ExpertiseSettingsModel.findOne({ key: "expertise-settings" }).select("_id").lean(),
    InternModel.exists({}),
    TeamMemberModel.exists({}),
    PortfolioProjectModel.exists({}),
    JobOpeningModel.exists({}),
    BlogPostModel.exists({}),
    OffshoreDeveloperPageModel.exists({}),
    ExpertisePageModel.exists({}),
    ProductPageModel.exists({}),
    TechnologyPageModel.exists({}),
  ]);

  const allSeedDataPresent =
    Boolean(existingSettings) &&
    Boolean(existingHomeSettings) &&
    Boolean(existingAboutSettings) &&
    Boolean(existingContactSettings) &&
    Boolean(existingResourceUiSettings) &&
    Boolean(existingProductSettings) &&
    Boolean(existingOffshoreSettings) &&
    Boolean(existingExpertiseSettings) &&
    Boolean(hasIntern) &&
    Boolean(hasTeam) &&
    Boolean(hasPortfolio) &&
    Boolean(hasJobs) &&
    Boolean(hasBlogs) &&
    Boolean(hasOffshorePages) &&
    Boolean(hasExpertisePages) &&
    Boolean(hasProducts) &&
    Boolean(hasTechnologies);

  if (allSeedDataPresent) {
    return;
  }

  await Promise.all([
    existingSettings
      ? Promise.resolve()
      : SiteSettingsModel.updateOne({ key: "site-settings" }, defaultSiteSettings, { upsert: true }),
    InternModel.bulkWrite(
      internSeedData.map((item) => ({
        updateOne: {
          filter: { slug: item.slug },
          update: { $setOnInsert: item },
          upsert: true,
        },
      }))
    ),
    TeamMemberModel.bulkWrite(
      teamSeedData.map((item) => ({
        updateOne: {
          filter: { slug: item.slug },
          update: { $setOnInsert: item },
          upsert: true,
        },
      }))
    ),
    PortfolioProjectModel.bulkWrite(
      portfolioSeedData.map((item) => ({
        updateOne: {
          filter: { slug: item.slug },
          update: { $setOnInsert: item },
          upsert: true,
        },
      }))
    ),
    JobOpeningModel.bulkWrite(
      Object.values(jobData).map((job, index) => ({
        updateOne: {
          filter: { slug: job.slug },
          update: {
            $setOnInsert: {
              slug: job.slug,
              company: job.company,
              title: job.title,
              type: job.type,
              mode: job.location,
              salary: job.salary,
              posted: job.postedDate,
              location: "Ahmedabad",
              overview: job.overview,
              responsibilities: job.positionOverview,
              requirements: job.qualifications,
              benefits: job.benefits,
              accent: "linear-gradient(160deg, rgba(56, 189, 248, 0.24), rgba(14, 165, 233, 0.08))",
              imageData: "",
              order: index + 1,
              isPublished: true,
            },
          },
          upsert: true,
        },
      }))
    ),
    BlogPostModel.bulkWrite(
      blogSeedData.map((item) => ({
        updateOne: {
          filter: { slug: item.slug },
          update: { $setOnInsert: item },
          upsert: true,
        },
      }))
    ),
    OffshoreDeveloperPageModel.bulkWrite(
      buildOffshoreDeveloperSeedRecords().map((item) => ({
        updateOne: {
          filter: { slug: item.slug },
          update: { $setOnInsert: item },
          upsert: true,
        },
      }))
    ),
    OffshoreDeveloperSettingsModel.updateOne(
      { key: "offshore-developer-settings" },
      { $setOnInsert: defaultOffshoreDeveloperSettings },
      { upsert: true }
    ),
    ExpertisePageModel.bulkWrite(
      buildExpertiseSeedRecords().map((item) => ({
        updateOne: {
          filter: { categoryKey: item.categoryKey, slug: item.slug },
          update: { $setOnInsert: item },
          upsert: true,
        },
      }))
    ),
    ExpertiseSettingsModel.updateOne(
      { key: "expertise-settings" },
      { $setOnInsert: defaultExpertiseSettings },
      { upsert: true }
    ),
    ContactSettingsModel.updateOne(
      { key: "contact" },
      { $setOnInsert: defaultContactSettings },
      { upsert: true }
    ),
    ResourceUiSettingsModel.updateOne(
      { key: "resource-ui-settings" },
      { $setOnInsert: defaultResourceUiSettings },
      { upsert: true }
    ),
    existingHomeSettings ? Promise.resolve() : HomeSettingsModel.updateOne({ key: "home-settings" }, { $setOnInsert: defaultHomeSettings }, { upsert: true }),
    existingAboutSettings ? Promise.resolve() : AboutSettingsModel.updateOne({ key: "about-settings" }, { $setOnInsert: defaultAboutSettings }, { upsert: true }),
    ProductPageModel.bulkWrite(
      buildProductSeedRecords().map((item) => ({
        updateOne: {
          filter: { slug: item.slug },
          update: { $setOnInsert: item },
          upsert: true,
        },
      }))
    ),
    existingProductSettings ? Promise.resolve() : ProductSettingsModel.updateOne({ key: "product-settings" }, { $setOnInsert: defaultProductSettings }, { upsert: true }),
    TechnologyPageModel.bulkWrite(
      buildTechnologySeedRecords().map((item) => ({
        updateOne: {
          filter: { slug: item.slug },
          update: { $setOnInsert: item },
          upsert: true,
        },
      }))
    ),
  ]);
}

export async function getSiteSettings() {
  if (!(await prepareRead())) {
    return withSiteSettingsDefaults(null);
  }

  const settings = await SiteSettingsModel.findOne({ key: "site-settings" }).lean();
  return withSiteSettingsDefaults(settings ? (toPlainRecord<SiteSettings>(settings) as SiteSettings) : null);
}

export async function getHomeSettings() {
  if (!(await prepareRead())) {
    return withHomeSettingsDefaults(null);
  }

  const settings = await HomeSettingsModel.findOne({ key: "home-settings" }).lean();
  return withHomeSettingsDefaults(settings ? (toPlainRecord<HomeSettingsRecord>(settings) as HomeSettingsRecord) : null);
}

export async function getAboutSettings() {
  if (!(await prepareRead())) {
    return withAboutSettingsDefaults(null);
  }

  const settings = await AboutSettingsModel.findOne({ key: "about-settings" }).lean();
  return withAboutSettingsDefaults(settings ? (toPlainRecord<AboutSettingsRecord>(settings) as AboutSettingsRecord) : null);
}

export async function getContactSettings(): Promise<ContactSettingsRecord> {
  if (!(await prepareRead())) {
    return defaultContactSettings;
  }

  const settings = await ContactSettingsModel.findOne({ key: "contact" }).lean();
  if (!settings) {
    return defaultContactSettings;
  }

  return {
    ...defaultContactSettings,
    ...toPlainRecord<ContactSettingsRecord>(settings),
  };
}

export async function getResourceUiSettings(): Promise<ResourceUiSettingsRecord> {
  if (!(await prepareRead())) {
    return defaultResourceUiSettings;
  }

  const settings = await ResourceUiSettingsModel.findOne({ key: "resource-ui-settings" }).lean();
  return withResourceUiSettingsDefaults(
    settings ? (toPlainRecord<ResourceUiSettingsRecord>(settings) as ResourceUiSettingsRecord) : null
  );
}

export async function updateContactSettings(
  updates: Partial<ContactSettingsRecord>
): Promise<ContactSettingsRecord> {
  await connectToDatabase();

  const result = await ContactSettingsModel.findOneAndUpdate(
    { key: "contact" },
    { $set: { ...updates, key: "contact" } },
    { upsert: true, new: true }
  ).lean();

  return {
    ...defaultContactSettings,
    ...toPlainRecord<ContactSettingsRecord>(result),
  };
}

export async function getAdminOverview(): Promise<AdminOverview> {
  if (!(await prepareRead())) {
    const expertisePages = getFallbackExpertisePages();
    const offshoreDevelopers = getFallbackOffshoreDeveloperPages();
    const products = getFallbackProducts();
    const interns = internSeedData.map((item) => withFallbackId(item));
    const team = teamSeedData.map((item) => withFallbackId(item));
    const portfolio = portfolioSeedData.map((item) => withFallbackId(item));
    const jobs = getFallbackJobs();
    const blogs = blogSeedData.map((item) => withFallbackId(item));
    const technologies = getFallbackTechnologies();

    return {
      siteSettings: withSiteSettingsDefaults(null),
      stats: {
        aboutPages: 1,
        expertisePages: expertisePages.length,
        homePages: 1,
        offshoreDevelopers: offshoreDevelopers.length,
        products: products.length,
        interns: interns.length,
        team: team.length,
        portfolio: portfolio.length,
        jobs: jobs.length,
        blogs: blogs.length,
        technologies: technologies.length,
      },
    };
  }

  const [siteSettings, expertisePages, offshoreDevelopers, products, interns, team, portfolio, jobs, blogs, technologies] = await Promise.all([
    getSiteSettings(),
    ExpertisePageModel.countDocuments(),
    OffshoreDeveloperPageModel.countDocuments(),
    ProductPageModel.countDocuments(),
    InternModel.countDocuments(),
    TeamMemberModel.countDocuments(),
    PortfolioProjectModel.countDocuments(),
    JobOpeningModel.countDocuments(),
    BlogPostModel.countDocuments(),
    TechnologyPageModel.countDocuments(),
  ]);

  return {
    siteSettings,
    stats: {
      aboutPages: 1,
      expertisePages,
      homePages: 1,
      offshoreDevelopers,
      products,
      interns,
      team,
      portfolio,
      jobs,
      blogs,
      technologies,
    },
  };
}

export async function getAdminInterns() {
  if (!(await prepareRead())) {
    return internSeedData.map((item) => withFallbackId(item));
  }

  const records = await InternModel.find().sort({ order: 1, createdAt: 1 }).lean();
  return records.map((record) => toPlainRecord<InternRecord>(record));
}

export async function getPublishedInterns() {
  if (!(await prepareRead())) {
    return internSeedData.map((item) => withFallbackId(item)).filter((item) => item.isPublished);
  }

  const records = await InternModel.find({ isPublished: true }).sort({ order: 1, createdAt: 1 }).lean();
  return records.map((record) => toPlainRecord<InternRecord>(record));
}

export async function getAdminProducts() {
  if (!(await prepareRead())) {
    return getFallbackProducts();
  }

  const records = await ProductPageModel.find().sort({ order: 1, createdAt: 1 }).lean();
  return records.map((record) => toPlainRecord<ProductPageRecord>(record));
}

export async function getPublishedProducts() {
  if (!(await prepareRead())) {
    return getFallbackProducts().filter((item) => item.isPublished);
  }

  const records = await ProductPageModel.find({ isPublished: true }).sort({ order: 1, createdAt: 1 }).lean();
  return records.map((record) => toPlainRecord<ProductPageRecord>(record));
}

export async function getPublishedProductBySlug(slug: string) {
  if (!(await prepareRead())) {
    return getFallbackProducts().find((item) => item.slug === slug && item.isPublished) ?? null;
  }

  const record = await ProductPageModel.findOne({ slug, isPublished: true }).lean();
  return record ? toPlainRecord<ProductPageRecord>(record) : null;
}

export async function getProductSettings() {
  if (!(await prepareRead())) {
    return withProductSettingsDefaults(null);
  }

  const settings = await ProductSettingsModel.findOne({ key: "product-settings" }).lean();
  return withProductSettingsDefaults(settings ? (toPlainRecord<ProductSettingsRecord>(settings) as ProductSettingsRecord) : null);
}

export async function getAdminOffshoreDeveloperPages() {
  if (!(await prepareRead())) {
    return getFallbackOffshoreDeveloperPages();
  }

  const records = await OffshoreDeveloperPageModel.find().sort({ categoryKey: 1, order: 1, createdAt: 1 }).lean();
  return records.map((record) => withOffshoreDeveloperPageDefaults(toPlainRecord<OffshoreDeveloperPageRecord>(record)));
}

export async function getPublishedOffshoreDeveloperPages() {
  if (!(await prepareRead())) {
    return getFallbackOffshoreDeveloperPages().filter((item) => item.isPublished);
  }

  const records = await OffshoreDeveloperPageModel.find({ isPublished: true }).sort({ categoryKey: 1, order: 1, createdAt: 1 }).lean();
  return records.map((record) => withOffshoreDeveloperPageDefaults(toPlainRecord<OffshoreDeveloperPageRecord>(record)));
}

export async function getPublishedOffshoreDeveloperPage(categoryKey: string, slug: string) {
  if (!(await prepareRead())) {
    return getFallbackOffshoreDeveloperPages().find((item) => item.categoryKey === categoryKey && item.slug === slug && item.isPublished) ?? null;
  }

  const record = await OffshoreDeveloperPageModel.findOne({ categoryKey, slug, isPublished: true }).lean();
  return record ? withOffshoreDeveloperPageDefaults(toPlainRecord<OffshoreDeveloperPageRecord>(record)) : null;
}

export async function getOffshoreDeveloperSettings() {
  if (!(await prepareRead())) {
    return withOffshoreDeveloperSettingsDefaults(null);
  }

  const settings = await OffshoreDeveloperSettingsModel.findOne({ key: "offshore-developer-settings" }).lean();
  return withOffshoreDeveloperSettingsDefaults(
    settings ? (toPlainRecord<OffshoreDeveloperSettingsRecord>(settings) as OffshoreDeveloperSettingsRecord) : null
  );
}

export async function getPublishedOffshoreDeveloperNavigation() {
  const [settings, pages] = await Promise.all([getOffshoreDeveloperSettings(), getPublishedOffshoreDeveloperPages()]);

  return settings.menuCategories
    .slice()
    .sort((left, right) => left.order - right.order)
    .map((category) => ({
      ...category,
      items: pages
        .filter((page) => page.categoryKey === category.key)
        .sort((left, right) => left.order - right.order)
        .map((page) => ({
          label: page.navLabel,
          href: `/offshore-developer/${page.categoryKey}/${page.slug}`,
          slug: page.slug,
        })),
    }))
    .filter((category) => category.items.length > 0);
}

export async function getAdminExpertisePages() {
  if (!(await prepareRead())) {
    return getFallbackExpertisePages();
  }

  const records = await ExpertisePageModel.find().sort({ categoryKey: 1, order: 1, createdAt: 1 }).lean();
  return records.map((record) => withExpertisePageDefaults(toPlainRecord<ExpertisePageRecord>(record)));
}

export async function getPublishedExpertisePages() {
  if (!(await prepareRead())) {
    return getFallbackExpertisePages().filter((item) => item.isPublished);
  }

  const records = await ExpertisePageModel.find({ isPublished: true }).sort({ categoryKey: 1, order: 1, createdAt: 1 }).lean();
  if (records.length > 0) {
    return records.map((record) => withExpertisePageDefaults(toPlainRecord<ExpertisePageRecord>(record)));
  }
  // DB connected but no records seeded yet — return fallback so pages render
  return getFallbackExpertisePages().filter((item) => item.isPublished);
}

export async function getPublishedExpertisePage(categoryKey: string, slug: string) {
  if (!(await prepareRead())) {
    return getFallbackExpertisePages().find((item) => item.categoryKey === categoryKey && item.slug === slug && item.isPublished) ?? null;
  }

  const record = await ExpertisePageModel.findOne({ categoryKey, slug, isPublished: true }).lean();
  if (record) {
    return withExpertisePageDefaults(toPlainRecord<ExpertisePageRecord>(record));
  }
  // Fallback to seed data when DB is connected but record is missing (e.g. fresh DB or deleted record)
  return getFallbackExpertisePages().find((item) => item.categoryKey === categoryKey && item.slug === slug && item.isPublished) ?? null;
}

export async function getExpertiseSettings() {
  if (!(await prepareRead())) {
    return withExpertiseSettingsDefaults(null);
  }

  const settings = await ExpertiseSettingsModel.findOne({ key: "expertise-settings" }).lean();
  return withExpertiseSettingsDefaults(settings ? (toPlainRecord<ExpertiseSettingsRecord>(settings) as ExpertiseSettingsRecord) : null);
}

export async function getPublishedExpertiseNavigation() {
  const [settings, pages] = await Promise.all([getExpertiseSettings(), getPublishedExpertisePages()]);

  return settings.menuCategories
    .slice()
    .sort((left, right) => left.order - right.order)
    .map((category) => ({
      ...category,
      items: pages
        .filter((page) => page.categoryKey === category.key)
        .sort((left, right) => left.order - right.order)
        .map((page) => ({
          label: page.navLabel,
          href: `/our-expertise/${page.categoryKey}/${page.slug}`,
          slug: page.slug,
        })),
    }))
    .filter((category) => category.items.length > 0);
}

export async function getAdminTeamMembers() {
  if (!(await prepareRead())) {
    return teamSeedData.map((item) => withFallbackId(item));
  }

  const records = await TeamMemberModel.find().sort({ order: 1, createdAt: 1 }).lean();
  return records.map((record) => toPlainRecord<TeamMemberRecord>(record));
}

export async function getPublishedTeamMembers() {
  if (!(await prepareRead())) {
    return teamSeedData.map((item) => withFallbackId(item)).filter((item) => item.isPublished);
  }

  const records = await TeamMemberModel.find({ isPublished: true }).sort({ order: 1, createdAt: 1 }).lean();
  return records.map((record) => toPlainRecord<TeamMemberRecord>(record));
}

export async function getAdminPortfolioProjects() {
  if (!(await prepareRead())) {
    return portfolioSeedData.map((item) => withPortfolioDefaults(withFallbackId(item)));
  }

  const records = await PortfolioProjectModel.find().sort({ order: 1, createdAt: 1 }).lean();
  return records.map((record) => withPortfolioDefaults(toPlainRecord<PortfolioProjectRecord>(record)));
}

export async function getPublishedPortfolioProjects() {
  if (!(await prepareRead())) {
    return portfolioSeedData.map((item) => withPortfolioDefaults(withFallbackId(item))).filter((item) => item.isPublished);
  }

  const records = await PortfolioProjectModel.find({ isPublished: true }).sort({ order: 1, createdAt: 1 }).lean();
  return records.map((record) => withPortfolioDefaults(toPlainRecord<PortfolioProjectRecord>(record)));
}

export async function getPublishedPortfolioProjectBySlug(slug: string) {
  if (!(await prepareRead())) {
    return portfolioSeedData.map((item) => withPortfolioDefaults(withFallbackId(item))).find((item) => item.slug === slug && item.isPublished) ?? null;
  }

  const record = await PortfolioProjectModel.findOne({ slug, isPublished: true }).lean();
  return record ? withPortfolioDefaults(toPlainRecord<PortfolioProjectRecord>(record)) : null;
}

export async function getAdminJobs() {
  if (!(await prepareRead())) {
    return getFallbackJobs();
  }

  const records = await JobOpeningModel.find().sort({ order: 1, createdAt: 1 }).lean();
  return records.map((record) => toPlainRecord<JobOpeningRecord>(record));
}

export async function getPublishedJobs() {
  if (!(await prepareRead())) {
    return getFallbackJobs().filter((item) => item.isPublished);
  }

  const records = await JobOpeningModel.find({ isPublished: true }).sort({ order: 1, createdAt: 1 }).lean();
  return records.map((record) => toPlainRecord<JobOpeningRecord>(record));
}

export async function getPublishedJobBySlug(slug: string) {
  if (!(await prepareRead())) {
    return getFallbackJobs().find((item) => item.slug === slug && item.isPublished) ?? null;
  }

  const record = await JobOpeningModel.findOne({ slug, isPublished: true }).lean();
  return record ? toPlainRecord<JobOpeningRecord>(record) : null;
}

export async function getAdminJobApplications() {
  if (!(await prepareRead())) {
    return [];
  }

  const records = await JobApplicationModel.find().sort({ createdAt: -1 }).lean();
  return records.map((record) => toPlainRecord<JobApplicationRecord>(record));
}

export async function getAdminBlogPosts() {
  if (!(await prepareRead())) {
    return blogSeedData.map((item) => withFallbackId(item));
  }

  const records = await BlogPostModel.find().sort({ featured: -1, order: 1, createdAt: -1 }).lean();
  return records.map((record) => toPlainRecord<BlogPostRecord>(record));
}

export async function getPublishedBlogPosts() {
  if (!(await prepareRead())) {
    return blogSeedData.map((item) => withFallbackId(item)).filter((item) => item.isPublished);
  }

  const records = await BlogPostModel.find({ isPublished: true }).sort({ featured: -1, order: 1, createdAt: -1 }).lean();
  return records.map((record) => toPlainRecord<BlogPostRecord>(record));
}

export async function getPublishedFeaturedBlogPost() {
  if (!(await prepareRead())) {
    return blogSeedData.find((item) => item.isPublished && item.featured)?.slug
      ? withFallbackId(blogSeedData.find((item) => item.isPublished && item.featured) ?? blogSeedData[0])
      : null;
  }

  const record =
    (await BlogPostModel.findOne({ isPublished: true, featured: true }).sort({ order: 1, createdAt: -1 }).lean()) ||
    (await BlogPostModel.findOne({ isPublished: true }).sort({ order: 1, createdAt: -1 }).lean());

  return record ? toPlainRecord<BlogPostRecord>(record) : null;
}

export async function getPublishedBlogPostBySlug(slug: string) {
  if (!(await prepareRead())) {
    return blogSeedData.map((item) => withFallbackId(item)).find((item) => item.slug === slug && item.isPublished) ?? null;
  }

  const record = await BlogPostModel.findOne({ slug, isPublished: true }).lean();
  return record ? toPlainRecord<BlogPostRecord>(record) : null;
}

export async function getBlogCategories() {
  if (!(await prepareRead())) {
    return Array.from(new Set(blogSeedData.map((item) => item.category))).sort((left, right) => left.localeCompare(right));
  }

  const categories = (await BlogPostModel.distinct("category")) as string[];
  return categories.filter(Boolean).sort((left, right) => left.localeCompare(right));
}

export async function getAdminTechnologyPages() {
  if (!(await prepareRead())) {
    return getFallbackTechnologies();
  }

  const records = await TechnologyPageModel.find().sort({ order: 1, createdAt: 1 }).lean();
  return records.map((record) => withTechnologyDefaults(toPlainRecord<TechnologyPageRecord>(record)));
}

export async function getPublishedTechnologyPages() {
  if (!(await prepareRead())) {
    return getFallbackTechnologies().filter((item) => item.isPublished);
  }

  const records = await TechnologyPageModel.find({ isPublished: true }).sort({ order: 1, createdAt: 1 }).lean();
  return records.map((record) => withTechnologyDefaults(toPlainRecord<TechnologyPageRecord>(record)));
}

export async function getLandingTechnologyPage() {
  if (!(await prepareRead())) {
    return getFallbackTechnologies().find((item) => item.isPublished && item.isLanding) ?? getFallbackTechnologies()[0] ?? null;
  }

  const record =
    (await TechnologyPageModel.findOne({ isPublished: true, isLanding: true }).sort({ order: 1, createdAt: 1 }).lean()) ||
    (await TechnologyPageModel.findOne({ isPublished: true }).sort({ order: 1, createdAt: 1 }).lean());

  return record ? withTechnologyDefaults(toPlainRecord<TechnologyPageRecord>(record)) : null;
}

export async function getPublishedTechnologyPage(category: string, slug: string) {
  if (!(await prepareRead())) {
    return getFallbackTechnologies().find((item) => item.category === category && item.slug === slug && item.isPublished) ?? null;
  }

  const record = await TechnologyPageModel.findOne({ category, slug, isPublished: true }).lean();
  return record ? withTechnologyDefaults(toPlainRecord<TechnologyPageRecord>(record)) : null;
}

export async function getAdminTechnologyPageById(id: string) {
  if (!(await prepareRead())) {
    return getFallbackTechnologies().find((item) => item._id === id) ?? null;
  }

  const record = await TechnologyPageModel.findById(id).lean();
  return record ? withTechnologyDefaults(toPlainRecord<TechnologyPageRecord>(record)) : null;
}

// ============================================================================
// CACHED FUNCTIONS FOR PERFORMANCE
// These use Next.js caching with revalidation to dramatically improve page load times
// ============================================================================

const CACHE_REVALIDATE_SECONDS = 3600; // Cache data for 1 hour before revalidating

/**
 * Cached version of getSiteSettings for header/footer use
 */
export const getCachedSiteSettings = unstable_cache(
  async () => {
    return getSiteSettings();
  },
  ["site-settings"],
  { revalidate: CACHE_REVALIDATE_SECONDS, tags: ["site-settings"] }
);

/**
 * Cached version of getPublishedProducts for navigation
 */
export const getCachedPublishedProducts = unstable_cache(
  async () => {
    return getPublishedProducts();
  },
  ["published-products"],
  { revalidate: CACHE_REVALIDATE_SECONDS, tags: ["products"] }
);

/**
 * Cached version of getProductSettings for navigation
 */
export const getCachedProductSettings = unstable_cache(
  async () => {
    return getProductSettings();
  },
  ["product-settings"],
  { revalidate: CACHE_REVALIDATE_SECONDS, tags: ["products"] }
);

/**
 * Cached version of getPublishedExpertiseNavigation for header
 */
export const getCachedExpertiseNavigation = unstable_cache(
  async () => {
    return getPublishedExpertiseNavigation();
  },
  ["expertise-navigation"],
  { revalidate: CACHE_REVALIDATE_SECONDS, tags: ["expertise"] }
);

/**
 * Cached version of getPublishedOffshoreDeveloperNavigation for header
 */
export const getCachedOffshoreDeveloperNavigation = unstable_cache(
  async () => {
    return getPublishedOffshoreDeveloperNavigation();
  },
  ["offshore-navigation"],
  { revalidate: CACHE_REVALIDATE_SECONDS, tags: ["offshore"] }
);

/**
 * Cached version of getHomeSettings for home page
 */
export const getCachedHomeSettings = unstable_cache(
  async () => {
    return getHomeSettings();
  },
  ["home-settings"],
  { revalidate: CACHE_REVALIDATE_SECONDS, tags: ["home"] }
);

/**
 * Cached version of getAboutSettings for about page
 */
export const getCachedAboutSettings = unstable_cache(
  async () => {
    return getAboutSettings();
  },
  ["about-settings"],
  { revalidate: CACHE_REVALIDATE_SECONDS, tags: ["about"] }
);

/**
 * Cached version of getPublishedBlogPosts for home page insights
 */
export const getCachedPublishedBlogPosts = unstable_cache(
  async () => {
    return getPublishedBlogPosts();
  },
  ["published-blog-posts"],
  { revalidate: CACHE_REVALIDATE_SECONDS, tags: ["blog"] }
);

/**
 * Cached version of getPublishedTeamMembers for team page
 */
export const getCachedPublishedTeamMembers = unstable_cache(
  async () => {
    return getPublishedTeamMembers();
  },
  ["published-team"],
  { revalidate: CACHE_REVALIDATE_SECONDS, tags: ["team"] }
);

/**
 * Cached version of getPublishedInterns for interns page
 */
export const getCachedPublishedInterns = unstable_cache(
  async () => {
    return getPublishedInterns();
  },
  ["published-interns"],
  { revalidate: CACHE_REVALIDATE_SECONDS, tags: ["interns"] }
);

/**
 * Cached version of getPublishedPortfolioProjects for portfolio page
 */
export const getCachedPublishedPortfolioProjects = unstable_cache(
  async () => {
    return getPublishedPortfolioProjects();
  },
  ["published-portfolio"],
  { revalidate: CACHE_REVALIDATE_SECONDS, tags: ["portfolio"] }
);

/**
 * Cached version of getPublishedJobs for careers page
 */
export const getCachedPublishedJobs = unstable_cache(
  async () => {
    return getPublishedJobs();
  },
  ["published-jobs"],
  { revalidate: CACHE_REVALIDATE_SECONDS, tags: ["jobs"] }
);

/**
 * Cached version of getLandingTechnologyPage for technologies page
 */
export const getCachedLandingTechnologyPage = unstable_cache(
  async () => {
    return getLandingTechnologyPage();
  },
  ["landing-technology"],
  { revalidate: CACHE_REVALIDATE_SECONDS, tags: ["technologies"] }
);

/**
 * Cached version of getBlogCategories for blogs page
 */
export const getCachedBlogCategories = unstable_cache(
  async () => {
    return getBlogCategories();
  },
  ["blog-categories"],
  { revalidate: CACHE_REVALIDATE_SECONDS, tags: ["blog"] }
);

/**
 * Cached version of getPublishedFeaturedBlogPost for blogs page
 */
export const getCachedPublishedFeaturedBlogPost = unstable_cache(
  async () => {
    return getPublishedFeaturedBlogPost();
  },
  ["featured-blog-post"],
  { revalidate: CACHE_REVALIDATE_SECONDS, tags: ["blog"] }
);

/**
 * Cached version of getExpertiseSettings for expertise pages
 */
export const getCachedExpertiseSettings = unstable_cache(
  async () => {
    return getExpertiseSettings();
  },
  ["expertise-settings"],
  { revalidate: CACHE_REVALIDATE_SECONDS, tags: ["expertise"] }
);

/**
 * Cached version of getPublishedExpertisePages for expertise page
 */
export const getCachedPublishedExpertisePages = unstable_cache(
  async () => {
    return getPublishedExpertisePages();
  },
  ["published-expertise-pages"],
  { revalidate: CACHE_REVALIDATE_SECONDS, tags: ["expertise"] }
);

/**
 * Cached version of getOffshoreDeveloperSettings for offshore pages
 */
export const getCachedOffshoreDeveloperSettings = unstable_cache(
  async () => {
    return getOffshoreDeveloperSettings();
  },
  ["offshore-developer-settings"],
  { revalidate: CACHE_REVALIDATE_SECONDS, tags: ["offshore"] }
);

/**
 * Cached version of getPublishedOffshoreDeveloperPages for offshore page
 */
export const getCachedPublishedOffshoreDeveloperPages = unstable_cache(
  async () => {
    return getPublishedOffshoreDeveloperPages();
  },
  ["published-offshore-developer-pages"],
  { revalidate: CACHE_REVALIDATE_SECONDS, tags: ["offshore"] }
);

/**
 * Cached version of getContactSettings for contact page
 */
export const getCachedContactSettings = unstable_cache(
  async () => {
    return getContactSettings();
  },
  ["contact-settings"],
  { revalidate: CACHE_REVALIDATE_SECONDS, tags: ["contact"] }
);

export async function getAdminContactMessages() {
  await connectToDatabase();
  const docs = await ContactMessageModel.find({}).sort({ createdAt: -1 }).lean();
  return docs.map((d: Record<string, unknown>) => ({
    _id: String(d._id),
    firstName: String(d.firstName ?? ""),
    lastName: String(d.lastName ?? ""),
    email: String(d.email ?? ""),
    phone: String(d.phone ?? ""),
    interest: String(d.interest ?? ""),
    message: String(d.message ?? ""),
    status: String(d.status ?? "new"),
    createdAt: d.createdAt instanceof Date ? d.createdAt.toISOString() : String(d.createdAt ?? ""),
  }));
}
