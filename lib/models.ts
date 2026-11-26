import mongoose, { Schema } from "mongoose";

type GenericDocument = Record<string, unknown>;
type GenericModel = mongoose.Model<GenericDocument>;

const pageCopySchema = new Schema(
  {
    heroEyebrow: { type: String, default: "" },
    heroTitle: { type: String, default: "" },
    heroDescription: { type: String, default: "" },
    sectionEyebrow: { type: String, default: "" },
    sectionTitle: { type: String, default: "" },
    sectionDescription: { type: String, default: "" },
    ctaEyebrow: { type: String, default: "" },
    ctaTitle: { type: String, default: "" },
    ctaDescription: { type: String, default: "" },
    ctaButtonLabel: { type: String, default: "" },
    ctaButtonHref: { type: String, default: "" },
  },
  { _id: false }
);

const socialMediaSchema = new Schema(
  {
    instagram: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    facebook: { type: String, default: "" },
    twitter: { type: String, default: "" },
    youtube: { type: String, default: "" },
  },
  { _id: false }
);

const officeLocationSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, default: "" },
    email: { type: String, default: "" },
    flagImage: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { _id: false }
);

const footerLinkSchema = new Schema(
  {
    label: { type: String, required: true },
    href: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const footerColumnSchema = new Schema(
  {
    title: { type: String, required: true },
    links: { type: [footerLinkSchema], default: [] },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const sharedStatSchema = new Schema(
  {
    value: { type: String, default: "" },
    label: { type: String, default: "" },
  },
  { _id: false }
);

const siteSettingsSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    companyName: { type: String, default: "ALPIXN" },
    shortName: { type: String, default: "ALPIXN" },
    experienceLabel: { type: String, default: "10+ Years" },
    headerTagline: { type: String, default: "Digital product engineering for ambitious teams." },
    footerDescription: { type: String, default: "Product, engineering, and growth support for modern teams." },
    newsletterTitle: { type: String, default: "Stay in the loop" },
    newsletterDescription: { type: String, default: "Get updates about product thinking, engineering, and company news." },
    // Logo
    logoUrl: { type: String, default: "/brand/alpixn-logo-horizontal.webp" },
    logoAlt: { type: String, default: "ALPIXN" },
    // Contact information
    contactEmail: { type: String, default: "info@axano.in" },
    contactPhone: { type: String, default: "+91 0000000000" },
    contactAddress: { type: String, default: "" },
    businessHours: { type: String, default: "Monday to Friday 9AM – 7PM IST" },
    // Social media links
    socialMedia: { type: socialMediaSchema, default: () => ({}) },
    // Enhanced office locations (replacing simple string array)
    officeLocations: { type: [String], default: [] }, // Legacy field for backward compatibility
    offices: { type: [officeLocationSchema], default: [] }, // New structured field
    // Footer configuration
    footerColumns: { type: [footerColumnSchema], default: [] },
    sharedStats: { type: [sharedStatSchema], default: [] },
    copyrightText: { type: String, default: "©2025 All Rights Reserved." },
    // Page content
    pageContent: {
      home: { type: pageCopySchema, default: () => ({}) },
      resources: { type: pageCopySchema, default: () => ({}) },
      interns: { type: pageCopySchema, default: () => ({}) },
      team: { type: pageCopySchema, default: () => ({}) },
      portfolio: { type: pageCopySchema, default: () => ({}) },
      careers: { type: pageCopySchema, default: () => ({}) },
      blogs: { type: pageCopySchema, default: () => ({}) },
    },
  },
  { timestamps: true }
);

// Contact page settings schema
const contactOfficeSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, default: "" },
    email: { type: String, default: "" },
    flagImage: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { _id: false }
);

const contactSettingsSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    // Hero section
    heroTitle: { type: String, default: "Your Digital Future" },
    heroDescription: { type: String, default: "Ready to transform your digital presence? Let's talk about your next big project." },
    // Contact form section
    formIntroTitle: { type: String, default: "Your Digital Future" },
    formIntroDescription: { type: String, default: "Ready to transform your digital presence? We're here to help you achieve extraordinary results. Get in touch with our team of experts and let's discuss how we can accelerate your business growth." },
    formPhoneNumber: { type: String, default: "+91 0000000000" },
    formPhoneAvailability: { type: String, default: "Available Monday to Friday 9AM – 7PM IST" },
    formEmail: { type: String, default: "info@axano.in" },
    formSupportEmail: { type: String, default: "support@company.com" },
    formAddress: { type: String, default: "Cyber Park 3rd & 10th Floor, Tower B, Cyber Park, Mumbai, Maharashtra 000000, India" },
    formButtonText: { type: String, default: "Let's Get Started" },
    formFirstNameLabel: { type: String, default: "First Name" },
    formLastNameLabel: { type: String, default: "Last Name" },
    formEmailLabel: { type: String, default: "Email Address" },
    formPhoneLabel: { type: String, default: "Phone Number" },
    formInterestPlaceholder: { type: String, default: "Interested in" },
    formMessageLabel: { type: String, default: "Your Message" },
    formInterestOptions: { type: [String], default: ["Male", "Female"] },
    // Assistance section
    assistanceTitle: { type: String, default: "Need Immediate Assistance?" },
    assistanceDescription: { type: String, default: "For urgent inquiries or immediate support, don't hesitate to call us directly." },
    assistanceEmailButtonText: { type: String, default: "Email Us" },
    assistanceCallButtonText: { type: String, default: "Call Now" },
    assistanceEmailButtonHref: { type: String, default: "mailto:info@axano.in" },
    assistanceCallButtonHref: { type: String, default: "tel:+910000000000" },
    // Global offices section
    globalOfficesTitle: { type: String, default: "Our Global Offices" },
    globalOffices: { type: [contactOfficeSchema], default: [] },
  },
  { timestamps: true }
);

const internsUiSettingsSchema = new Schema(
  {
    searchPlaceholder: { type: String, default: "Search interns" },
    programLabel: { type: String, default: "Program" },
    allProgramsLabel: { type: String, default: "All programs" },
    trackLabel: { type: String, default: "Track" },
    allTracksLabel: { type: String, default: "All tracks" },
    resultsLabel: { type: String, default: "results for:" },
    clearAllLabel: { type: String, default: "Clear All" },
    emptyMessage: { type: String, default: "No interns matched the current search and filter selection." },
  },
  { _id: false }
);

const portfolioUiSettingsSchema = new Schema(
  {
    searchPlaceholder: { type: String, default: "Search" },
    industryLabel: { type: String, default: "Industry" },
    allIndustriesLabel: { type: String, default: "All industries" },
    tagLabel: { type: String, default: "Tag" },
    allTagsLabel: { type: String, default: "All tags" },
    resultsLabel: { type: String, default: "results for:" },
    clearAllLabel: { type: String, default: "Clear All" },
    emptyMessage: { type: String, default: "No portfolio projects matched the current search and filters." },
    detailsTitle: { type: String, default: "Details" },
    objectiveTitle: { type: String, default: "Objective" },
    solutionsTitle: { type: String, default: "Solutions" },
    aboutProjectTitle: { type: String, default: "About The Project" },
    industryLabelShort: { type: String, default: "Industry" },
    engagementLabel: { type: String, default: "Engagement" },
    outcomeLabel: { type: String, default: "Outcome" },
    servicesProvidedLabel: { type: String, default: "Services Provided" },
    timelineLabel: { type: String, default: "Timeline" },
    resultTitle: { type: String, default: "Result" },
    teamTitle: { type: String, default: "Meet Our Team" },
    moreProjectsTitle: { type: String, default: "View Our More Projects" },
  },
  { _id: false }
);

const careersUiSettingsSchema = new Schema(
  {
    searchPlaceholder: { type: String, default: "Search jobs, companies..." },
    typeLabel: { type: String, default: "Job type" },
    allTypesLabel: { type: String, default: "All job types" },
    modeLabel: { type: String, default: "Mode" },
    allModesLabel: { type: String, default: "All modes" },
    viewDetailsLabel: { type: String, default: "View Details" },
    emptyMessage: { type: String, default: "No job openings matched the current search and filters." },
    overviewTitle: { type: String, default: "Overview:" },
    responsibilitiesTitle: { type: String, default: "Position Overview:" },
    requirementsTitle: { type: String, default: "Qualifications:" },
    benefitsTitle: { type: String, default: "Benefits:" },
    applyButtonLabel: { type: String, default: "Apply Now" },
    applyIntroTitle: { type: String, default: "Apply Now & Grow With Us" },
    applyIntroDescription: { type: String, default: "Start your journey with us today! Fill out the form below and take the first step toward an exciting career opportunity." },
    applyFullNamePlaceholder: { type: String, default: "Full Name" },
    applyPhonePlaceholder: { type: String, default: "Contact Number" },
    applyEmailPlaceholder: { type: String, default: "Email Address" },
    applyLocationPlaceholder: { type: String, default: "Location" },
    applyLinkedInPlaceholder: { type: String, default: "LinkedIn URL" },
    applyPortfolioPlaceholder: { type: String, default: "Portfolio / Project URL" },
    applyCvPlaceholder: { type: String, default: "CV Google Drive Link" },
    applyCoverLetterPlaceholder: { type: String, default: "Tell us why you are a fit for {jobTitle}" },
    applySummaryPrefix: { type: String, default: "Applying for" },
    applySubmitLabel: { type: String, default: "Submit Application" },
  },
  { _id: false }
);

const blogsUiSettingsSchema = new Schema(
  {
    heroReadButtonLabel: { type: String, default: "Read Full Article" },
    searchPlaceholder: { type: String, default: "Search articles" },
    allCategoriesLabel: { type: String, default: "All categories" },
    articlesFoundSuffix: { type: String, default: "articles found" },
    emptyExploreMessage: { type: String, default: "No articles matched the current search and category." },
    latestTitle: { type: String, default: "Our Latest Articles" },
    categoriesTitle: { type: String, default: "Categories" },
    latestEmptyMessage: { type: String, default: "No published articles yet." },
    authorSummaryTemplate: { type: String, default: "This article is part of the {category} series and is managed dynamically from the admin panel." },
    detailsTitle: { type: String, default: "Article Details" },
    relatedTitle: { type: String, default: "Related Articles" },
    noRelatedMessage: { type: String, default: "No related articles found." },
  },
  { _id: false }
);

const resourceUiSettingsSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    interns: { type: internsUiSettingsSchema, default: () => ({}) },
    portfolio: { type: portfolioUiSettingsSchema, default: () => ({}) },
    careers: { type: careersUiSettingsSchema, default: () => ({}) },
    blogs: { type: blogsUiSettingsSchema, default: () => ({}) },
  },
  { timestamps: true }
);

const internSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    role: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    award: { type: String, required: true, trim: true },
    certificateId: { type: String, required: true, trim: true },
    program: { type: String, required: true, trim: true },
    track: { type: String, required: true, trim: true },
    initials: { type: String, required: true, trim: true },
    accent: { type: String, default: "" },
    imageData: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const teamMemberSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    role: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    initials: { type: String, required: true, trim: true },
    accent: { type: String, default: "" },
    imageData: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const portfolioTeamMemberSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    initials: { type: String, required: true, trim: true },
    accent: { type: String, default: "" },
    imageData: { type: String, default: "" },
  },
  { _id: false }
);

const portfolioProjectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    summary: { type: String, required: true, trim: true },
    industry: { type: String, required: true, trim: true },
    // Relaxed in the 2026 redesign: concept projects have no engagement timeline or business outcome.
    engagement: { type: String, default: "", trim: true },
    timeline: { type: String, default: "", trim: true },
    outcome: { type: String, default: "", trim: true },
    tags: { type: [String], default: [] },
    objective: { type: String, default: "" },
    objectivePoints: { type: [String], default: [] },
    solutionPoints: { type: [String], default: [] },
    resultPrimaryValue: { type: String, default: "" },
    resultPrimaryLabel: { type: String, default: "" },
    resultSecondaryValue: { type: String, default: "" },
    resultSecondaryLabel: { type: String, default: "" },
    resultBullets: { type: [String], default: [] },
    galleryImageOne: { type: String, default: "" },
    galleryImageTwo: { type: String, default: "" },
    galleryImageThree: { type: String, default: "" },
    galleryImageFour: { type: String, default: "" },
    accent: { type: String, default: "" },
    imageData: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
    teamMembers: { type: [portfolioTeamMemberSchema], default: [] },
    // Portfolio verification & discovery fields (2026 redesign)
    verificationStatus: { type: String, enum: ["real", "concept", "unverified"], default: "unverified", index: true },
    country: { type: String, default: "", trim: true },
    currency: { type: String, default: "", trim: true },
    projectTypes: { type: [String], default: [] },
    techStack: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    liveUrl: { type: String, default: "", trim: true },
    demoPath: { type: String, default: "", trim: true },
    problem: { type: String, default: "" },
    approach: { type: String, default: "" },
    features: { type: [String], default: [] },
    highlights: { type: [String], default: [] },
    screenshots: { type: [{ src: String, alt: String, device: { type: String, enum: ["desktop", "mobile"] } }], default: [] },
    related: { type: [{ label: String, href: String }], default: [] },
  },
  { timestamps: true }
);

const jobOpeningSchema = new Schema(
  {
    company: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    type: { type: String, required: true, trim: true },
    mode: { type: String, required: true, trim: true },
    salary: { type: String, required: true, trim: true },
    posted: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    overview: { type: String, required: true, trim: true },
    responsibilities: { type: [String], default: [] },
    requirements: { type: [String], default: [] },
    benefits: { type: [String], default: [] },
    accent: { type: String, default: "" },
    imageData: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const blogPostSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    readTime: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    featured: { type: Boolean, default: false },
    accent: { type: String, default: "" },
    imageData: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
    // SEO & editorial fields (added in the 2026 redesign; all optional for existing records)
    metaTitle: { type: String, default: "", trim: true, maxlength: 120 },
    metaDescription: { type: String, default: "", trim: true, maxlength: 320 },
    tags: { type: [String], default: [] },
    publishedAt: { type: String, default: "" },
    modifiedAt: { type: String, default: "" },
    sources: { type: [{ label: { type: String, trim: true }, url: { type: String, trim: true } }], default: [] },
    aiAssisted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const jobApplicationSchema = new Schema(
  {
    jobSlug: { type: String, required: true, index: true },
    jobTitle: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    linkedInUrl: { type: String, default: "" },
    portfolioUrl: { type: String, default: "" },
    cvDriveLink: { type: String, required: true, trim: true },
    coverLetter: { type: String, default: "" },
    status: { type: String, default: "new" },
  },
  { timestamps: true }
);

const technologyLogoSchema = new Schema(
  {
    label: { type: String, default: "" },
    imageData: { type: String, default: "" },
    href: { type: String, default: "#" },
  },
  { _id: false }
);

const technologySimpleCardSchema = new Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { _id: false }
);

const technologyChallengeCardSchema = new Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    imageData: { type: String, default: "" },
    linkLabel: { type: String, default: "" },
  },
  { _id: false }
);

const technologyCaseStudySchema = new Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    imageData: { type: String, default: "" },
    featuresLeft: { type: [String], default: [] },
    featuresRight: { type: [String], default: [] },
  },
  { _id: false }
);

const technologyStackItemSchema = new Schema(
  {
    label: { type: String, default: "" },
    imageData: { type: String, default: "" },
  },
  { _id: false }
);

const technologyStatSchema = new Schema(
  {
    value: { type: String, default: "" },
    label: { type: String, default: "" },
  },
  { _id: false }
);

const technologyEngagementModelSchema = new Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    bullets: { type: [String], default: [] },
  },
  { _id: false }
);

const technologyFaqSchema = new Schema(
  {
    question: { type: String, default: "" },
    answer: { type: String, default: "" },
  },
  { _id: false }
);

const productFeatureSchema = new Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    imageData: { type: String, default: "" },
    buttonLabel: { type: String, default: "View Full Details" },
    buttonHref: { type: String, default: "#" },
  },
  { _id: false }
);

const productAudienceSchema = new Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    imageData: { type: String, default: "" },
  },
  { _id: false }
);

const productFaqSchema = new Schema(
  {
    question: { type: String, default: "" },
    answer: { type: String, default: "" },
  },
  { _id: false }
);

const offshoreNavigationCategorySchema = new Schema(
  {
    key: { type: String, default: "" },
    label: { type: String, default: "" },
    menuHeading: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const offshoreHeroTechnologySchema = new Schema(
  {
    value: { type: String, default: "" },
    label: { type: String, default: "" },
  },
  { _id: false }
);

const offshoreCardWithImageSchema = new Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    imageData: { type: String, default: "" },
    alt: { type: String, default: "" },
    width: { type: Number, default: 40 },
    height: { type: Number, default: 40 },
  },
  { _id: false }
);

const offshoreSimpleItemSchema = new Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { _id: false }
);

const offshoreDeveloperGridItemSchema = new Schema(
  {
    name: { type: String, default: "" },
    imageData: { type: String, default: "" },
    alt: { type: String, default: "" },
    width: { type: Number, default: 40 },
    height: { type: Number, default: 40 },
    link: { type: String, default: "#" },
  },
  { _id: false }
);

const offshoreGuideTabItemSchema = new Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { _id: false }
);

const offshoreGuideTabSchema = new Schema(
  {
    key: { type: String, default: "" },
    label: { type: String, default: "" },
    section: { type: String, default: "" },
    items: { type: [offshoreGuideTabItemSchema], default: [] },
  },
  { _id: false }
);

const offshoreStepSchema = new Schema(
  {
    stepLabel: { type: String, default: "" },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { _id: false }
);

const offshoreEngagementModelSchema = new Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    features: { type: [String], default: [] },
  },
  { _id: false }
);

const offshoreTestimonialSchema = new Schema(
  {
    quote: { type: String, default: "" },
    name: { type: String, default: "" },
    role: { type: String, default: "" },
    avatarImageData: { type: String, default: "" },
    starsImageData: { type: String, default: "" },
  },
  { _id: false }
);

const offshoreCaseStudySchema = new Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    imageData: { type: String, default: "" },
    featuresLeft: { type: [String], default: [] },
    featuresRight: { type: [String], default: [] },
  },
  { _id: false }
);

const offshoreFaqSchema = new Schema(
  {
    question: { type: String, default: "" },
    answer: { type: String, default: "" },
  },
  { _id: false }
);

const expertiseNavigationCategorySchema = new Schema(
  {
    key: { type: String, default: "" },
    label: { type: String, default: "" },
    description: { type: String, default: "" },
    menuHeading: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const expertiseStatHighlightSchema = new Schema(
  {
    value: { type: String, default: "" },
    label: { type: String, default: "" },
  },
  { _id: false }
);

const expertiseStatCardSchema = new Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { _id: false }
);

const expertiseCaseStudyTabSchema = new Schema(
  {
    id: { type: String, default: "" },
    title: { type: String, default: "" },
    heading: { type: String, default: "" },
    description: { type: String, default: "" },
    features: { type: [String], default: [] },
    cta1: { type: String, default: "" },
    cta2: { type: String, default: "" },
    imageData: { type: String, default: "" },
    cta1Link: { type: String, default: "#" },
    cta2Link: { type: String, default: "#" },
  },
  { _id: false }
);

const expertiseBenefitSchema = new Schema(
  {
    id: { type: String, default: "" },
    number: { type: String, default: "" },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { _id: false }
);

const expertiseFeatureCardSchema = new Schema(
  {
    id: { type: String, default: "" },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    icon: { type: String, default: "" },
    iconAlt: { type: String, default: "" },
    iconWidth: { type: Number, default: 40 },
    iconHeight: { type: Number, default: 40 },
    iconRightClass: { type: String, default: "" },
  },
  { _id: false }
);

const expertiseIndustryItemSchema = new Schema(
  {
    id: { type: String, default: "" },
    name: { type: String, default: "" },
    icon: { type: String, default: "" },
    iconAlt: { type: String, default: "" },
    link: { type: String, default: "#" },
  },
  { _id: false }
);

const expertiseGuideItemSchema = new Schema(
  {
    title: { type: String, default: "" },
    bullets: { type: [String], default: [] },
  },
  { _id: false }
);

const expertiseGuideTabSchema = new Schema(
  {
    key: { type: String, default: "" },
    label: { type: String, default: "" },
    section: { type: String, default: "" },
    items: { type: [expertiseGuideItemSchema], default: [] },
  },
  { _id: false }
);

const expertiseEngagementModelSchema = new Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    features: { type: [String], default: [] },
  },
  { _id: false }
);

const expertiseTestimonialSchema = new Schema(
  {
    quote: { type: String, default: "" },
    author: { type: String, default: "" },
    position: { type: String, default: "" },
    company: { type: String, default: "" },
    avatar: { type: String, default: "" },
  },
  { _id: false }
);

const expertiseTechStackItemSchema = new Schema(
  {
    label: { type: String, default: "" },
    imageData: { type: String, default: "" },
  },
  { _id: false }
);

const expertiseTechStackTabSchema = new Schema(
  {
    name: { type: String, default: "" },
    value: { type: String, default: "" },
    items: { type: [expertiseTechStackItemSchema], default: [] },
  },
  { _id: false }
);

const expertiseFaqSchema = new Schema(
  {
    question: { type: String, default: "" },
    answer: { type: String, default: "" },
  },
  { _id: false }
);

const homeActionSchema = new Schema(
  {
    label: { type: String, default: "" },
    href: { type: String, default: "#" },
  },
  { _id: false }
);

const homeSolutionCardSchema = new Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    imageData: { type: String, default: "" },
    alt: { type: String, default: "" },
  },
  { _id: false }
);

const homeOfferingSchema = new Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    imageData: { type: String, default: "" },
    alt: { type: String, default: "" },
    width: { type: Number, default: 100 },
    height: { type: Number, default: 100 },
  },
  { _id: false }
);

const homeCaseStudySchema = new Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    imageData: { type: String, default: "" },
    featuresLeft: { type: [String], default: [] },
    featuresRight: { type: [String], default: [] },
  },
  { _id: false }
);

const homeIndustryItemSchema = new Schema(
  {
    title: { type: String, default: "" },
    iconUrl: { type: String, default: "" },
  },
  { _id: false }
);

const homeIndustryTabSchema = new Schema(
  {
    id: { type: String, default: "" },
    label: { type: String, default: "" },
    tabIconUrl: { type: String, default: "" },
    items: { type: [homeIndustryItemSchema], default: [] },
  },
  { _id: false }
);

const homeTechStackItemSchema = new Schema(
  {
    label: { type: String, default: "" },
    imageData: { type: String, default: "" },
  },
  { _id: false }
);

const homeTechStackTabSchema = new Schema(
  {
    name: { type: String, default: "" },
    value: { type: String, default: "" },
    items: { type: [homeTechStackItemSchema], default: [] },
  },
  { _id: false }
);

const homeInsightSchema = new Schema(
  {
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    buttonText: { type: String, default: "" },
    buttonHref: { type: String, default: "#" },
  },
  { _id: false }
);

const homeInsightCardSchema = new Schema(
  {
    title: { type: String, default: "" },
    author: { type: String, default: "" },
    imageData: { type: String, default: "" },
    href: { type: String, default: "#" },
  },
  { _id: false }
);

const homeSettingsSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    heroTitle: { type: String, default: "" },
    heroDescription: { type: String, default: "" },
    heroPrimaryAction: { type: homeActionSchema, default: () => ({}) },
    heroSecondaryAction: { type: homeActionSchema, default: () => ({}) },
    heroImageData: { type: String, default: "" },
    customSolutionsTitle: { type: String, default: "" },
    customSolutionsSubtitle: { type: String, default: "" },
    customSolutionCards: { type: [homeSolutionCardSchema], default: [] },
    offeringsTitle: { type: String, default: "" },
    offeringsSubtitle: { type: String, default: "" },
    offerings: { type: [homeOfferingSchema], default: [] },
    caseStudyTitle: { type: String, default: "" },
    caseStudySubtitle: { type: String, default: "" },
    caseStudies: { type: [homeCaseStudySchema], default: [] },
    industriesTitle: { type: String, default: "" },
    industriesSubtitle: { type: String, default: "" },
    industriesTabs: { type: [homeIndustryTabSchema], default: [] },
    techStackTitle: { type: String, default: "" },
    techStackDescription: { type: String, default: "" },
    techStackTabs: { type: [homeTechStackTabSchema], default: [] },
    whyChooseQuote: { type: String, default: "" },
    whyChooseAuthor: { type: String, default: "" },
    whyChooseRole: { type: String, default: "" },
    whyChooseManagerImage: { type: String, default: "" },
    insightSection: { type: homeInsightSchema, default: () => ({}) },
    insightCards: { type: [homeInsightCardSchema], default: [] },
  },
  { timestamps: true }
);

const aboutStatSchema = new Schema(
  {
    value: { type: String, default: "" },
    label: { type: String, default: "" },
  },
  { _id: false }
);

const aboutMissionCardSchema = new Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    imageData: { type: String, default: "" },
  },
  { _id: false }
);

const aboutMilestoneItemSchema = new Schema(
  {
    year: { type: String, default: "" },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { _id: false }
);

const aboutWhyChooseCardSchema = new Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { _id: false }
);

const aboutSettingsSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    heroTitle: { type: String, default: "" },
    heroDescription: { type: String, default: "" },
    heroPrimaryAction: { type: homeActionSchema, default: () => ({}) },
    heroSecondaryAction: { type: homeActionSchema, default: () => ({}) },
    whoWeAreTitle: { type: String, default: "" },
    whoWeAreParagraphOne: { type: String, default: "" },
    whoWeAreParagraphTwo: { type: String, default: "" },
    whoWeAreImage: { type: String, default: "" },
    visionTag: { type: String, default: "" },
    visionTitle: { type: String, default: "" },
    visionDescription: { type: String, default: "" },
    visionStats: { type: [aboutStatSchema], default: [] },
    missionTag: { type: String, default: "" },
    missionTitle: { type: String, default: "" },
    missionDescription: { type: String, default: "" },
    missionCards: { type: [aboutMissionCardSchema], default: [] },
    milestoneTag: { type: String, default: "" },
    milestoneTitle: { type: String, default: "" },
    milestoneDescription: { type: String, default: "" },
    milestoneItems: { type: [aboutMilestoneItemSchema], default: [] },
    whyChooseTitle: { type: String, default: "" },
    whyChooseSubtitle: { type: String, default: "" },
    whyChooseCards: { type: [aboutWhyChooseCardSchema], default: [] },
    ctaTitle: { type: String, default: "" },
    ctaDescription: { type: String, default: "" },
    ctaButtonText: { type: String, default: "" },
    ctaButtonHref: { type: String, default: "#" },
  },
  { timestamps: true }
);

const expertisePageSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    categoryKey: { type: String, required: true, trim: true, index: true },
    navLabel: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
    heroTitle: { type: String, default: "" },
    heroDescription: { type: String, default: "" },
    ctaButtonText: { type: String, default: "" },
    heroLogos: { type: [String], default: [] },
    heroBackgroundImage: { type: String, default: "" },
    statsHighlights: { type: [expertiseStatHighlightSchema], default: [] },
    statsTitle: { type: String, default: "" },
    statsDescription: { type: String, default: "" },
    statsCards: { type: [expertiseStatCardSchema], default: [] },
    caseStudyTitle: { type: String, default: "" },
    caseStudySubtitle: { type: String, default: "" },
    caseStudyTabs: { type: [expertiseCaseStudyTabSchema], default: [] },
    customTitle: { type: String, default: "" },
    customSubtitle: { type: String, default: "" },
    customButtonText: { type: String, default: "" },
    customButtonLink: { type: String, default: "#" },
    customImage: { type: String, default: "" },
    customImageAlt: { type: String, default: "" },
    customBenefits: { type: [expertiseBenefitSchema], default: [] },
    whyChooseTitle: { type: String, default: "" },
    whyChooseSubtitle: { type: String, default: "" },
    whyChooseFeatures: { type: [expertiseFeatureCardSchema], default: [] },
    industriesTitle: { type: String, default: "" },
    industriesSubtitle: { type: String, default: "" },
    industriesItems: { type: [expertiseIndustryItemSchema], default: [] },
    guideTitle: { type: String, default: "" },
    guideSubtitle: { type: String, default: "" },
    guideTabs: { type: [expertiseGuideTabSchema], default: [] },
    startTitle: { type: String, default: "" },
    startSubtitle: { type: String, default: "" },
    startButtonText: { type: String, default: "" },
    startButtonLink: { type: String, default: "#" },
  },
  { timestamps: true }
);

const expertiseSettingsSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    menuCategories: { type: [expertiseNavigationCategorySchema], default: [] },
    testimonialTitle: { type: String, default: "" },
    testimonialSubtitle: { type: String, default: "" },
    testimonials: { type: [expertiseTestimonialSchema], default: [] },
    engagementTitle: { type: String, default: "" },
    engagementSubtitle: { type: String, default: "" },
    engagementModels: { type: [expertiseEngagementModelSchema], default: [] },
    techStackTitle: { type: String, default: "" },
    techStackDescription: { type: String, default: "" },
    techStackTabs: { type: [expertiseTechStackTabSchema], default: [] },
    faqTitle: { type: String, default: "" },
    faqs: { type: [expertiseFaqSchema], default: [] },
  },
  { timestamps: true }
);

const offshoreDeveloperPageSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    categoryKey: { type: String, required: true, trim: true, index: true },
    navLabel: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
    heroTitle: { type: String, default: "" },
    heroDescription: { type: String, default: "" },
    heroChecklist: { type: [String], default: [] },
    heroFormTitle: { type: String, default: "" },
    heroTechnologies: { type: [offshoreHeroTechnologySchema], default: [] },
    excellenceTitle: { type: String, default: "" },
    excellenceSubtitle: { type: String, default: "" },
    excellenceOfferings: { type: [offshoreCardWithImageSchema], default: [] },
    ctaTitle: { type: String, default: "" },
    ctaButtonText: { type: String, default: "" },
    ctaButtonLink: { type: String, default: "#" },
    partnerTitle: { type: String, default: "" },
    partnerButtonText: { type: String, default: "" },
    partnerButtonLink: { type: String, default: "#" },
    partnerItems: { type: [offshoreSimpleItemSchema], default: [] },
    developerGridTitle: { type: String, default: "" },
    developerItems: { type: [offshoreDeveloperGridItemSchema], default: [] },
    hireTitle: { type: String, default: "" },
    hireSubtitle: { type: String, default: "" },
    hireServices: { type: [offshoreSimpleItemSchema], default: [] },
    contactTitle: { type: String, default: "" },
    contactButtonText: { type: String, default: "" },
    contactButtonLink: { type: String, default: "#" },
    guideTitle: { type: String, default: "" },
    guideTabs: { type: [offshoreGuideTabSchema], default: [] },
    stepsTitle: { type: String, default: "" },
    stepsButtonText: { type: String, default: "" },
    stepsButtonLink: { type: String, default: "#" },
    steps: { type: [offshoreStepSchema], default: [] },
    engagementTitle: { type: String, default: "" },
    engagementSubtitle: { type: String, default: "" },
    engagementModels: { type: [offshoreEngagementModelSchema], default: [] },
  },
  { timestamps: true }
);

const offshoreDeveloperSettingsSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    menuCategories: { type: [offshoreNavigationCategorySchema], default: [] },
    partnerLogos: { type: [technologyLogoSchema], default: [] },
    testimonialTitle: { type: String, default: "" },
    testimonialSubtitle: { type: String, default: "" },
    testimonials: { type: [offshoreTestimonialSchema], default: [] },
    caseStudyTitle: { type: String, default: "" },
    caseStudySubtitle: { type: String, default: "" },
    caseStudies: { type: [offshoreCaseStudySchema], default: [] },
    faqTitle: { type: String, default: "" },
    faqs: { type: [offshoreFaqSchema], default: [] },
  },
  { timestamps: true }
);

const productPageSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    navLabel: { type: String, required: true, trim: true },
    heroTitle: { type: String, required: true, trim: true },
    heroSubtitle: { type: String, default: "" },
    heroDescription: { type: String, required: true, trim: true },
    heroButtonLabel: { type: String, default: "Book Your Demo" },
    heroButtonHref: { type: String, default: "/contact-us" },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const productSettingsSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    menuTitle: { type: String, default: "" },
    menuDescription: { type: String, default: "" },
    menuDescriptionSecondary: { type: String, default: "" },
    menuButtonLabel: { type: String, default: "" },
    menuButtonHref: { type: String, default: "/products" },
    menuImageData: { type: String, default: "" },
    landingHeroTitle: { type: String, default: "" },
    landingHeroSubtitle: { type: String, default: "" },
    landingHeroDescription: { type: String, default: "" },
    landingHeroButtonLabel: { type: String, default: "Book Your Demo" },
    landingHeroButtonHref: { type: String, default: "/contact-us" },
    customSupportTitle: { type: String, default: "" },
    customSupportDescription: { type: String, default: "" },
    customSupportImageData: { type: String, default: "" },
    featuresTitle: { type: String, default: "" },
    featuresDescription: { type: String, default: "" },
    featureCards: { type: [productFeatureSchema], default: [] },
    transformTitle: { type: String, default: "" },
    transformDescription: { type: String, default: "" },
    audienceCards: { type: [productAudienceSchema], default: [] },
    faqTitle: { type: String, default: "" },
    faqs: { type: [productFaqSchema], default: [] },
    driveTitle: { type: String, default: "" },
    driveDescription: { type: String, default: "" },
    driveButtonLabel: { type: String, default: "" },
    driveButtonHref: { type: String, default: "/contact-us" },
  },
  { timestamps: true }
);

const technologyPageSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true, trim: true, index: true },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
    isLanding: { type: Boolean, default: false },
    heroSubtitle: { type: String, default: "" },
    heroTitle: { type: String, default: "" },
    heroDescription: { type: String, default: "" },
    heroPrimaryButtonLabel: { type: String, default: "Get Started" },
    heroPrimaryButtonHref: { type: String, default: "/contact-us" },
    heroSecondaryButtonLabel: { type: String, default: "Book a Call With Our Expert" },
    heroSecondaryButtonHref: { type: String, default: "/contact-us" },
    heroLogos: { type: [technologyLogoSchema], default: [] },
    challengesTitle: { type: String, default: "" },
    challengeCards: { type: [technologyChallengeCardSchema], default: [] },
    unlockTitle: { type: String, default: "" },
    unlockButtonLabel: { type: String, default: "" },
    unlockButtonHref: { type: String, default: "/contact-us" },
    talkTitle: { type: String, default: "" },
    talkButtonLabel: { type: String, default: "" },
    talkButtonHref: { type: String, default: "/contact-us" },
    talkCards: { type: [technologySimpleCardSchema], default: [] },
    successTitle: { type: String, default: "" },
    successCards: { type: [technologySimpleCardSchema], default: [] },
    provenTitle: { type: String, default: "" },
    provenDescription: { type: String, default: "" },
    provenCaseStudies: { type: [technologyCaseStudySchema], default: [] },
    guidanceTitle: { type: String, default: "" },
    guidanceButtonLabel: { type: String, default: "" },
    guidanceButtonHref: { type: String, default: "/contact-us" },
    qualityEyebrow: { type: String, default: "" },
    qualityTitle: { type: String, default: "" },
    qualityDescription: { type: String, default: "" },
    qualityPoints: { type: [technologySimpleCardSchema], default: [] },
    stackTitle: { type: String, default: "" },
    stackItems: { type: [technologyStackItemSchema], default: [] },
    leaderTitle: { type: String, default: "" },
    leaderStats: { type: [technologyStatSchema], default: [] },
    engagementTitle: { type: String, default: "" },
    engagementDescription: { type: String, default: "" },
    engagementModels: { type: [technologyEngagementModelSchema], default: [] },
    faqTitle: { type: String, default: "" },
    faqs: { type: [technologyFaqSchema], default: [] },
  },
  { timestamps: true }
);

export const SiteSettingsModel =
  (mongoose.models.SiteSettings as GenericModel) || mongoose.model("SiteSettings", siteSettingsSchema);

export const InternModel = (mongoose.models.Intern as GenericModel) || mongoose.model("Intern", internSchema);

export const TeamMemberModel =
  (mongoose.models.TeamMember as GenericModel) || mongoose.model("TeamMember", teamMemberSchema);

export const PortfolioProjectModel =
  (mongoose.models.PortfolioProject as GenericModel) ||
  mongoose.model("PortfolioProject", portfolioProjectSchema);

export const JobOpeningModel =
  (mongoose.models.JobOpening as GenericModel) || mongoose.model("JobOpening", jobOpeningSchema);

export const BlogPostModel =
  (mongoose.models.BlogPost as GenericModel) || mongoose.model("BlogPost", blogPostSchema);

export const JobApplicationModel =
  (mongoose.models.JobApplication as GenericModel) ||
  mongoose.model("JobApplication", jobApplicationSchema);

export const TechnologyPageModel =
  (mongoose.models.TechnologyPage as GenericModel) || mongoose.model("TechnologyPage", technologyPageSchema);

export const ProductPageModel =
  (mongoose.models.ProductPage as GenericModel) || mongoose.model("ProductPage", productPageSchema);

export const ProductSettingsModel =
  (mongoose.models.ProductSettings as GenericModel) || mongoose.model("ProductSettings", productSettingsSchema);

export const OffshoreDeveloperPageModel =
  (mongoose.models.OffshoreDeveloperPage as GenericModel) ||
  mongoose.model("OffshoreDeveloperPage", offshoreDeveloperPageSchema);

export const OffshoreDeveloperSettingsModel =
  (mongoose.models.OffshoreDeveloperSettings as GenericModel) ||
  mongoose.model("OffshoreDeveloperSettings", offshoreDeveloperSettingsSchema);

export const ExpertisePageModel =
  (mongoose.models.ExpertisePage as GenericModel) || mongoose.model("ExpertisePage", expertisePageSchema);

export const ExpertiseSettingsModel =
  (mongoose.models.ExpertiseSettings as GenericModel) || mongoose.model("ExpertiseSettings", expertiseSettingsSchema);

export const HomeSettingsModel =
  (mongoose.models.HomeSettings as GenericModel) || mongoose.model("HomeSettings", homeSettingsSchema);

export const AboutSettingsModel =
  (mongoose.models.AboutSettings as GenericModel) || mongoose.model("AboutSettings", aboutSettingsSchema);

export const ContactSettingsModel =
  (mongoose.models.ContactSettings as GenericModel) || mongoose.model("ContactSettings", contactSettingsSchema);

export const ResourceUiSettingsModel =
  (mongoose.models.ResourceUiSettings as GenericModel) || mongoose.model("ResourceUiSettings", resourceUiSettingsSchema);

const contactMessageSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    interest: { type: String, default: "" },
    message: { type: String, default: "" },
    status: { type: String, default: "new" }, // new | read
  },
  { timestamps: true }
);

export const ContactMessageModel =
  (mongoose.models.ContactMessage as GenericModel) || mongoose.model("ContactMessage", contactMessageSchema);
