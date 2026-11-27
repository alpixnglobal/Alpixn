import { unstable_cache } from "next/cache";

import { jobData } from "@/lib/internsData";
import { blogArticles } from "@/content/blog";
import { CONCEPT_LABEL, screenshotPath, showcaseProjects } from "@/lib/portfolio/showcase";
import { EDITORIAL_AUTHOR, blogCoverPath, readingTime } from "@/lib/blog/types";
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
  contactEmail: "info@alpixn.com",
  contactPhone: "+91 7291031315",
  contactAddress: "Unitech Cyber Park 3rd & 10th Floor, Tower B, Unitech Cyber Park, Sector -39, Gurugram, Haryana 122001, India",
  businessHours: "Monday to Friday 9AM – 7PM IST",
  // Social media
  socialMedia: {
    instagram: "https://www.instagram.com/Alpixnglobal",
    linkedin: "https://www.linkedin.com/company/alpixn",
    facebook: "https://www.facebook.com/Alpixn",
    twitter: "https://x.com/Alpixn",
    youtube: "https://youtube.com/@Alpixnglobal",
  },
  // Office locations
  officeLocations: ["Ahmedabad, India", "Remote Delivery Teams"],
  offices: [
    { name: "India", address: "3rd & 10th Floor, Tower B, Sector 39, Gurugram", email: "india-sales@alpixn.com", flagImage: "/images/india.svg", order: 1, isPublished: true },
    { name: "New York, USA", address: "5th Floor, 123 Madison Avenue", email: "usa-sales@alpixn.com", flagImage: "/images/usa.svg", order: 2, isPublished: true },
    { name: "Sydney, Australia", address: "Alpixn Level 8, 350 George Street", email: "aus-sales@alpixn.com", flagImage: "/images/australia.svg", order: 3, isPublished: true },
    { name: "Dubai, UAE", address: "Office No. 205, DAFZA Business Center, Dubai Airport Freezone", email: "dubai-sales@alpixn.com", flagImage: "/images/uae.svg", order: 4, isPublished: true },
    { name: "London, UK", address: "Suite 23, 2nd Floor, Berkeley Square House", email: "uk-sales@alpixn.com", flagImage: "/images/uk.svg", order: 5, isPublished: true },
    { name: "Milan, Italy", address: "Via Monte Napoleone 12", email: "italy-sales@alpixn.com", flagImage: "/images/italy.svg", order: 6, isPublished: true },
    { name: "Thailand", address: "1 Empire Tower, South Sathorn Road, Sathorn, Bangkok", email: "thailand-sales@alpixn.com", flagImage: "/images/thailand.svg", order: 7, isPublished: true },
    { name: "South Africa", address: "The Zone @ Rosebank, 177 Oxford Road, Johannesburg", email: "sa-sales@alpixn.com", flagImage: "/images/south-africa.svg", order: 8, isPublished: true },
    { name: "Canada", address: "100 King Street West, Suite 5700, Toronto, ON M5X 1C7", email: "canada-sales@alpixn.com", flagImage: "/images/canada.svg", order: 9, isPublished: true },
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
      ctaTitle: "Work With Our Team",
      ctaDescription: "Tell us what you want to build. Our engineers, designers and AI specialists will suggest a sensible first step.",
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
  formPhoneNumber: "+91 7291031315",
  formPhoneAvailability: "Available Monday to Friday 9AM – 7PM IST",
  formEmail: "info@alpixn.com",
  formSupportEmail: "support@alpixn.com",
  formAddress: "Unitech Cyber Park 3rd & 10th Floor, Tower B, Unitech Cyber Park, Sector -39, Gurugram, Haryana 122001, India",
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
  assistanceEmailButtonHref: "mailto:info@alpixn.com",
  assistanceCallButtonHref: "tel:+917291031315",
  // Global offices section
  globalOfficesTitle: "Our Global Offices",
  globalOffices: [
    {
      name: "India",
      address: "3rd & 10th Floor, Tower B, Sector 39, Gurugram",
      email: "india-sales@alpixn.com",
      flagImage: "/images/india.svg",
      order: 1,
      isPublished: true,
    },
    {
      name: "Sydney, Australia",
      address: "Alpixn Level 8, 350 George Street",
      email: "aus-sales@alpixn.com",
      flagImage: "/images/australia.svg",
      order: 2,
      isPublished: true,
    },
    {
      name: "Dubai, UAE",
      address: "Office No. 205, DAFZA Business Center, Dubai Airport Freezone",
      email: "dubai-sales@alpixn.com",
      flagImage: "/images/uae.svg",
      order: 3,
      isPublished: true,
    },
    {
      name: "Milan, Italy",
      address: "Via Monte Napoleone 12",
      email: "italy-sales@alpixn.com",
      flagImage: "/images/italy.svg",
      order: 4,
      isPublished: true,
    },
    {
      name: "London, UK",
      address: "Suite 23, 2nd Floor, Berkeley Square House",
      email: "uk-sales@alpixn.com",
      flagImage: "/images/uk.svg",
      order: 5,
      isPublished: true,
    },
    {
      name: "New York, USA",
      address: "5th Floor, 123 Madison Avenue",
      email: "usa-sales@alpixn.com",
      flagImage: "/images/usa.svg",
      order: 6,
      isPublished: true,
    },
    {
      name: "Canada",
      address: "100 King Street West, Suite 5700, Toronto, ON M5X 1C7",
      email: "canada-sales@alpixn.com",
      flagImage: "/images/canada.svg",
      order: 7,
      isPublished: true,
    },
    {
      name: "South Africa",
      address: "The Zone @ Rosebank, 177 Oxford Road, Johannesburg",
      email: "sa-sales@alpixn.com",
      flagImage: "/images/south-africa.svg",
      order: 8,
      isPublished: true,
    },
    {
      name: "Thailand",
      address: "1 Empire Tower, South Sathorn Road, Sathorn, Bangkok",
      email: "thailand-sales@alpixn.com",
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

// Template intern entries are unpublished: real alumni are added in admin (never invented people).
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
    isPublished: false,
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
    isPublished: false,
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
    isPublished: false,
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
    isPublished: false,
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
    isPublished: false,
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
    isPublished: false,
  },
];

// Template team entries are unpublished: real profiles are added in admin (never invented people).
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
    isPublished: false,
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
    isPublished: false,
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
    isPublished: false,
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
    isPublished: false,
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
    isPublished: false,
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
    isPublished: false,
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
    isPublished: false,
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
    isPublished: false,
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
    isPublished: false,
  },
];

// Concept portfolio (original ALPIXN demos). Legacy template projects referenced third-party companies
// and unverified results, so they are no longer seeded; existing database records default to "unverified"
// and stay hidden from the public site until an admin verifies them.
const portfolioSeedData = showcaseProjects.map((p, index) => ({
  slug: p.slug,
  title: p.title,
  summary: p.summary,
  industry: p.industry,
  engagement: CONCEPT_LABEL,
  timeline: "",
  outcome: "",
  tags: p.projectTypes,
  objective: p.problem,
  objectivePoints: [],
  solutionPoints: p.features,
  resultPrimaryValue: "",
  resultPrimaryLabel: "",
  resultSecondaryValue: "",
  resultSecondaryLabel: "",
  resultBullets: [],
  galleryImageOne: screenshotPath(p.slug, "desktop"),
  galleryImageTwo: screenshotPath(p.slug, "mobile"),
  galleryImageThree: "",
  galleryImageFour: "",
  accent: "",
  imageData: screenshotPath(p.slug, "desktop"),
  order: index + 1,
  isPublished: true,
  teamMembers: [],
  verificationStatus: "concept" as const,
  country: p.country,
  currency: p.currency,
  projectTypes: p.projectTypes,
  techStack: p.techStack,
  featured: Boolean(p.featured),
  liveUrl: "",
  demoPath: `/demos/${p.slug}`,
  problem: p.problem,
  approach: p.approach,
  features: p.features,
  highlights: p.highlights,
  screenshots: [
    { src: screenshotPath(p.slug, "desktop"), alt: `${p.product} desktop interface (concept demo)`, device: "desktop" as const },
    { src: screenshotPath(p.slug, "mobile"), alt: `${p.product} mobile interface (concept demo)`, device: "mobile" as const },
  ],
  related: p.related,
}));

// Editorial articles live in /content/blog (Markdown). They seed the BlogPost collection and are the
// built-in fallback when MongoDB is unavailable. Legacy seed posts were thin placeholders and were removed.
const blogSeedData = blogArticles.map((article, index) => ({
  slug: article.slug,
  title: article.title,
  excerpt: article.excerpt,
  content: article.body.trim(),
  author: EDITORIAL_AUTHOR,
  readTime: readingTime(article.body),
  category: article.category,
  featured: Boolean(article.featured) && index < 1,
  accent: "",
  imageData: blogCoverPath(article.slug),
  order: index + 1,
  isPublished: true,
  metaTitle: article.metaTitle,
  metaDescription: article.metaDescription,
  tags: article.tags,
  publishedAt: article.publishedAt,
  modifiedAt: article.modifiedAt ?? article.publishedAt,
  sources: article.sources,
  aiAssisted: true,
}));

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
    verificationStatus: project.verificationStatus || "unverified",
    country: project.country ?? "",
    currency: project.currency ?? "",
    projectTypes: project.projectTypes?.length ? project.projectTypes : project.tags ?? [],
    techStack: project.techStack ?? [],
    featured: project.featured ?? false,
    liveUrl: project.liveUrl ?? "",
    demoPath: project.demoPath ?? "",
    problem: project.problem ?? "",
    approach: project.approach ?? "",
    features: project.features ?? [],
    highlights: project.highlights ?? [],
    screenshots: project.screenshots ?? [],
    related: project.related ?? [],
  };
}

/** Only verified real work or clearly labelled concept work is ever shown publicly. */
const PUBLIC_PORTFOLIO_STATUSES = ["real", "concept"];
function isPubliclyVisibleProject(project: PortfolioProjectRecord) {
  return project.isPublished && PUBLIC_PORTFOLIO_STATUSES.includes(project.verificationStatus || "unverified");
}

/** Editorial seed records, used by scripts/upsert-editorial-content.ts. */
export function getEditorialSeed() {
  return { blogs: blogSeedData, portfolio: portfolioSeedData };
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
    return portfolioSeedData.map((item) => withPortfolioDefaults(withFallbackId(item) as PortfolioProjectRecord)).filter(isPubliclyVisibleProject);
  }

  const records = await PortfolioProjectModel.find({ isPublished: true, verificationStatus: { $in: PUBLIC_PORTFOLIO_STATUSES } })
    .sort({ featured: -1, order: 1, createdAt: 1 })
    .lean();
  return records.map((record) => withPortfolioDefaults(toPlainRecord<PortfolioProjectRecord>(record))).filter(isPubliclyVisibleProject);
}

export async function getPublishedPortfolioProjectBySlug(slug: string) {
  if (!(await prepareRead())) {
    return (
      portfolioSeedData
        .map((item) => withPortfolioDefaults(withFallbackId(item) as PortfolioProjectRecord))
        .find((item) => item.slug === slug && isPubliclyVisibleProject(item)) ?? null
    );
  }

  const record = await PortfolioProjectModel.findOne({ slug, isPublished: true, verificationStatus: { $in: PUBLIC_PORTFOLIO_STATUSES } }).lean();
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

  const categories = (await BlogPostModel.distinct("category", { isPublished: true })) as string[];
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
  ["published-blog-posts-v2"],
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
  ["published-portfolio-v2"],
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
  ["blog-categories-v2"],
  { revalidate: CACHE_REVALIDATE_SECONDS, tags: ["blog"] }
);

/**
 * Cached version of getPublishedFeaturedBlogPost for blogs page
 */
export const getCachedPublishedFeaturedBlogPost = unstable_cache(
  async () => {
    return getPublishedFeaturedBlogPost();
  },
  ["featured-blog-post-v2"],
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

// ============================================================================
// ADMIN INBOX: contact + hire-developer enquiries and job applications in one list
// ============================================================================

export type InboxKind = "enquiry" | "hire" | "application";
export type InboxItem = {
  id: string;
  kind: InboxKind;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
  details: [string, string][];
};

function isoDate(value: unknown) {
  if (value instanceof Date) return value.toISOString();
  return value ? String(value) : "";
}

export async function getAdminInbox(): Promise<InboxItem[]> {
  if (!(await prepareRead())) return [];
  const [messages, applications] = await Promise.all([
    ContactMessageModel.find({}).sort({ createdAt: -1 }).lean(),
    JobApplicationModel.find({}).sort({ createdAt: -1 }).lean(),
  ]);
  const fromMessages = (messages as Record<string, unknown>[]).map((d) => {
    const interest = String(d.interest ?? "");
    const hire = interest.startsWith("hire-developers");
    const name = `${String(d.firstName ?? "")} ${d.lastName && d.lastName !== "-" ? String(d.lastName) : ""}`.trim();
    return {
      id: String(d._id),
      kind: (hire ? "hire" : "enquiry") as InboxKind,
      name,
      email: String(d.email ?? ""),
      phone: String(d.phone ?? ""),
      subject: hire ? interest.replace(/^hire-developers:?\s*/, "Hire developers: ") || "Hire developers" : interest ? interest.replace(/-/g, " ") : "General enquiry",
      message: String(d.message ?? ""),
      status: String(d.status ?? "new"),
      createdAt: isoDate(d.createdAt),
      details: [["Topic", interest.replace(/-/g, " ")]] as [string, string][],
    };
  });
  const fromApplications = (applications as Record<string, unknown>[]).map((d) => ({
    id: String(d._id),
    kind: "application" as InboxKind,
    name: String(d.fullName ?? ""),
    email: String(d.email ?? ""),
    phone: String(d.phone ?? ""),
    subject: `Application: ${String(d.jobTitle ?? "")}`,
    message: String(d.coverLetter ?? ""),
    status: String(d.status ?? "new"),
    createdAt: isoDate(d.createdAt),
    details: [
      ["Position", String(d.jobTitle ?? "")],
      ["Location", String(d.location ?? "")],
      ["LinkedIn", String(d.linkedInUrl ?? "")],
      ["Portfolio", String(d.portfolioUrl ?? "")],
      ["CV link", String(d.cvDriveLink ?? "")],
    ] as [string, string][],
  }));
  return [...fromMessages, ...fromApplications].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}
