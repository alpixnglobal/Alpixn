export type PageCopyContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  sectionEyebrow: string;
  sectionTitle: string;
  sectionDescription: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonLabel: string;
  ctaButtonHref: string;
};

export type SocialMedia = {
  instagram: string;
  linkedin: string;
  facebook: string;
  twitter: string;
  youtube: string;
};

export type OfficeLocation = {
  name: string;
  address: string;
  email: string;
  flagImage: string;
  order: number;
  isPublished: boolean;
};

export type FooterLink = {
  label: string;
  href: string;
  order: number;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
  order: number;
};

export type SharedStatRecord = {
  value: string;
  label: string;
};

export type SiteSettings = {
  _id?: string;
  key: string;
  companyName: string;
  shortName: string;
  experienceLabel: string;
  headerTagline: string;
  footerDescription: string;
  newsletterTitle: string;
  newsletterDescription: string;
  // Logo
  logoUrl: string;
  logoAlt: string;
  // Contact information
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  businessHours: string;
  // Social media
  socialMedia: SocialMedia;
  // Office locations
  officeLocations: string[]; // Legacy
  offices: OfficeLocation[];
  // Footer configuration
  footerColumns: FooterColumn[];
  // Shared stats used across multiple pages
  sharedStats: SharedStatRecord[];
  copyrightText: string;
  // Page content
  pageContent: {
    home: PageCopyContent;
    resources: PageCopyContent;
    interns: PageCopyContent;
    team: PageCopyContent;
    portfolio: PageCopyContent;
    careers: PageCopyContent;
    blogs: PageCopyContent;
  };
};

export type ContactOffice = {
  name: string;
  address: string;
  email: string;
  flagImage: string;
  order: number;
  isPublished: boolean;
};

export type ContactSettingsRecord = {
  _id?: string;
  key: string;
  // Hero section
  heroTitle: string;
  heroDescription: string;
  // Contact form section
  formIntroTitle: string;
  formIntroDescription: string;
  formPhoneNumber: string;
  formPhoneAvailability: string;
  formEmail: string;
  formSupportEmail: string;
  formAddress: string;
  formButtonText: string;
  formFirstNameLabel: string;
  formLastNameLabel: string;
  formEmailLabel: string;
  formPhoneLabel: string;
  formInterestPlaceholder: string;
  formMessageLabel: string;
  formInterestOptions: string[];
  // Assistance section
  assistanceTitle: string;
  assistanceDescription: string;
  assistanceEmailButtonText: string;
  assistanceCallButtonText: string;
  assistanceEmailButtonHref: string;
  assistanceCallButtonHref: string;
  // Global offices section
  globalOfficesTitle: string;
  globalOffices: ContactOffice[];
};

export type InternsUiSettingsRecord = {
  searchPlaceholder: string;
  programLabel: string;
  allProgramsLabel: string;
  trackLabel: string;
  allTracksLabel: string;
  resultsLabel: string;
  clearAllLabel: string;
  emptyMessage: string;
};

export type PortfolioUiSettingsRecord = {
  searchPlaceholder: string;
  industryLabel: string;
  allIndustriesLabel: string;
  tagLabel: string;
  allTagsLabel: string;
  resultsLabel: string;
  clearAllLabel: string;
  emptyMessage: string;
  detailsTitle: string;
  objectiveTitle: string;
  solutionsTitle: string;
  aboutProjectTitle: string;
  industryLabelShort: string;
  engagementLabel: string;
  outcomeLabel: string;
  servicesProvidedLabel: string;
  timelineLabel: string;
  resultTitle: string;
  teamTitle: string;
  moreProjectsTitle: string;
};

export type CareersUiSettingsRecord = {
  searchPlaceholder: string;
  typeLabel: string;
  allTypesLabel: string;
  modeLabel: string;
  allModesLabel: string;
  viewDetailsLabel: string;
  emptyMessage: string;
  overviewTitle: string;
  responsibilitiesTitle: string;
  requirementsTitle: string;
  benefitsTitle: string;
  applyButtonLabel: string;
  applyIntroTitle: string;
  applyIntroDescription: string;
  applyFullNamePlaceholder: string;
  applyPhonePlaceholder: string;
  applyEmailPlaceholder: string;
  applyLocationPlaceholder: string;
  applyLinkedInPlaceholder: string;
  applyPortfolioPlaceholder: string;
  applyCvPlaceholder: string;
  applyCoverLetterPlaceholder: string;
  applySummaryPrefix: string;
  applySubmitLabel: string;
};

export type BlogsUiSettingsRecord = {
  heroReadButtonLabel: string;
  searchPlaceholder: string;
  allCategoriesLabel: string;
  articlesFoundSuffix: string;
  emptyExploreMessage: string;
  latestTitle: string;
  categoriesTitle: string;
  latestEmptyMessage: string;
  authorSummaryTemplate: string;
  detailsTitle: string;
  relatedTitle: string;
  noRelatedMessage: string;
};

export type ResourceUiSettingsRecord = {
  _id?: string;
  key: string;
  interns: InternsUiSettingsRecord;
  portfolio: PortfolioUiSettingsRecord;
  careers: CareersUiSettingsRecord;
  blogs: BlogsUiSettingsRecord;
};

export type ContentRecordBase = {
  _id: string;
  slug: string;
  order: number;
  accent: string;
  imageData: string;
  isPublished: boolean;
};

export type InternRecord = ContentRecordBase & {
  name: string;
  role: string;
  duration: string;
  award: string;
  certificateId: string;
  program: string;
  track: string;
  initials: string;
};

export type TeamMemberRecord = ContentRecordBase & {
  name: string;
  role: string;
  focus: string;
  initials: string;
};

export type PortfolioTeamMember = {
  name: string;
  role: string;
  initials: string;
  accent: string;
  imageData: string;
};

export type PortfolioProjectRecord = ContentRecordBase & {
  title: string;
  summary: string;
  industry: string;
  engagement: string;
  timeline: string;
  outcome: string;
  tags: string[];
  objective: string;
  objectivePoints: string[];
  solutionPoints: string[];
  resultPrimaryValue: string;
  resultPrimaryLabel: string;
  resultSecondaryValue: string;
  resultSecondaryLabel: string;
  resultBullets: string[];
  galleryImageOne: string;
  galleryImageTwo: string;
  galleryImageThree: string;
  galleryImageFour: string;
  teamMembers: PortfolioTeamMember[];
  /** real = verified ALPIXN work with permission to show; concept = ALPIXN-built demo; unverified = hidden from the public site. */
  verificationStatus?: "real" | "concept" | "unverified";
  country?: string;
  currency?: string;
  projectTypes?: string[];
  techStack?: string[];
  featured?: boolean;
  /** Verified public URL of a real, live project (never invented). */
  liveUrl?: string;
  /** Internal path of an interactive demo, e.g. /demos/<slug>. */
  demoPath?: string;
  problem?: string;
  approach?: string;
  features?: string[];
  highlights?: string[];
  screenshots?: { src: string; alt: string; device: "desktop" | "mobile" }[];
  related?: { label: string; href: string }[];
};

export type JobOpeningRecord = ContentRecordBase & {
  company: string;
  title: string;
  type: string;
  mode: string;
  salary: string;
  posted: string;
  location: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
};

export type BlogSourceRecord = { label: string; url: string };

export type BlogPostRecord = ContentRecordBase & {
  title: string;
  excerpt: string;
  /** Markdown (headings, lists, tables, links, ```flow diagrams). Plain paragraphs also work. */
  content: string;
  author: string;
  readTime: string;
  category: string;
  featured: boolean;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];
  /** ISO date shown as the publication date. */
  publishedAt?: string;
  modifiedAt?: string;
  sources?: BlogSourceRecord[];
  /** True when the draft was prepared with AI assistance (disclosed on the article page). */
  aiAssisted?: boolean;
};

export type JobApplicationRecord = {
  _id: string;
  jobSlug: string;
  jobTitle: string;
  company: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedInUrl: string;
  portfolioUrl: string;
  cvDriveLink: string;
  coverLetter: string;
  status: string;
};

export type AdminOverview = {
  siteSettings: SiteSettings;
  stats: {
    aboutPages: number;
    expertisePages: number;
    homePages: number;
    offshoreDevelopers: number;
    products: number;
    interns: number;
    team: number;
    portfolio: number;
    jobs: number;
    blogs: number;
    technologies: number;
  };
};

export type HomeActionRecord = {
  label: string;
  href: string;
};

export type HomeSolutionCardRecord = {
  title: string;
  description: string;
  imageData: string;
  alt: string;
};

export type HomeOfferingRecord = {
  title: string;
  description: string;
  imageData: string;
  alt: string;
  width: number;
  height: number;
};

export type HomeCaseStudyRecord = {
  title: string;
  description: string;
  imageData: string;
  featuresLeft: string[];
  featuresRight: string[];
};

export type HomeIndustryItemRecord = {
  title: string;
  iconUrl?: string;
};

export type HomeIndustryTabRecord = {
  id: string;
  label: string;
  tabIconUrl?: string;
  items: HomeIndustryItemRecord[];
};

export type HomeTechStackItemRecord = {
  label: string;
  imageData: string;
};

export type HomeTechStackTabRecord = {
  name: string;
  value: string;
  items: HomeTechStackItemRecord[];
};

export type HomeInsightRecord = {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
};

export type HomeInsightCardRecord = {
  title: string;
  author: string;
  imageData: string;
  href: string;
};

export type HomeSettingsRecord = {
  _id?: string;
  key: string;
  heroTitle: string;
  heroDescription: string;
  heroPrimaryAction: HomeActionRecord;
  heroSecondaryAction: HomeActionRecord;
  heroImageData: string;
  customSolutionsTitle: string;
  customSolutionsSubtitle: string;
  customSolutionCards: HomeSolutionCardRecord[];
  offeringsTitle: string;
  offeringsSubtitle: string;
  offerings: HomeOfferingRecord[];
  caseStudyTitle: string;
  caseStudySubtitle: string;
  caseStudies: HomeCaseStudyRecord[];
  industriesTitle: string;
  industriesSubtitle: string;
  industriesTabs: HomeIndustryTabRecord[];
  techStackTitle: string;
  techStackDescription: string;
  techStackTabs: HomeTechStackTabRecord[];
  whyChooseQuote: string;
  whyChooseAuthor: string;
  whyChooseRole: string;
  whyChooseManagerImage: string;
  insightSection: HomeInsightRecord;
  insightCards: HomeInsightCardRecord[];
};

export type AboutStatRecord = {
  value: string;
  label: string;
};

export type AboutMissionCardRecord = {
  title: string;
  description: string;
  imageData: string;
};

export type AboutMilestoneItemRecord = {
  year: string;
  title: string;
  description: string;
};

export type AboutWhyChooseCardRecord = {
  title: string;
  description: string;
};

export type AboutSettingsRecord = {
  _id?: string;
  key: string;
  heroTitle: string;
  heroDescription: string;
  heroPrimaryAction: HomeActionRecord;
  heroSecondaryAction: HomeActionRecord;
  whoWeAreTitle: string;
  whoWeAreParagraphOne: string;
  whoWeAreParagraphTwo: string;
  whoWeAreImage: string;
  visionTag: string;
  visionTitle: string;
  visionDescription: string;
  visionStats: AboutStatRecord[];
  missionTag: string;
  missionTitle: string;
  missionDescription: string;
  missionCards: AboutMissionCardRecord[];
  milestoneTag: string;
  milestoneTitle: string;
  milestoneDescription: string;
  milestoneItems: AboutMilestoneItemRecord[];
  whyChooseTitle: string;
  whyChooseSubtitle: string;
  whyChooseCards: AboutWhyChooseCardRecord[];
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaButtonHref: string;
};

export type ExpertiseNavigationCategoryRecord = {
  key: string;
  label: string;
  description: string;
  menuHeading: string;
  order: number;
};

export type ExpertiseStatHighlightRecord = {
  value: string;
  label: string;
};

export type ExpertiseStatCardRecord = {
  title: string;
  description: string;
};

export type ExpertiseCaseStudyTabRecord = {
  id: string;
  title: string;
  heading: string;
  description: string;
  features: string[];
  cta1: string;
  cta2: string;
  imageData: string;
  cta1Link: string;
  cta2Link: string;
};

export type ExpertiseBenefitRecord = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export type ExpertiseFeatureCardRecord = {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconAlt: string;
  iconWidth: number;
  iconHeight: number;
  iconRightClass: string;
};

export type ExpertiseIndustryItemRecord = {
  id: string;
  name: string;
  icon: string;
  iconAlt: string;
  link: string;
};

export type ExpertiseGuideItemRecord = {
  title: string;
  bullets: string[];
};

export type ExpertiseGuideTabRecord = {
  key: string;
  label: string;
  section: string;
  items: ExpertiseGuideItemRecord[];
};

export type ExpertiseEngagementModelRecord = {
  title: string;
  description: string;
  features: string[];
};

export type ExpertiseTestimonialRecord = {
  quote: string;
  author: string;
  position: string;
  company: string;
  avatar: string;
};

export type ExpertiseTechStackItemRecord = {
  label: string;
  imageData: string;
};

export type ExpertiseTechStackTabRecord = {
  name: string;
  value: string;
  items: ExpertiseTechStackItemRecord[];
};

export type ExpertiseFaqRecord = {
  question: string;
  answer: string;
};

export type ExpertisePageRecord = {
  _id: string;
  slug: string;
  categoryKey: string;
  navLabel: string;
  order: number;
  isPublished: boolean;
  heroTitle: string;
  heroDescription: string;
  ctaButtonText: string;
  heroLogos: string[];
  heroBackgroundImage: string;
  statsHighlights: ExpertiseStatHighlightRecord[];
  statsTitle: string;
  statsDescription: string;
  statsCards: ExpertiseStatCardRecord[];
  caseStudyTitle: string;
  caseStudySubtitle: string;
  caseStudyTabs: ExpertiseCaseStudyTabRecord[];
  customTitle: string;
  customSubtitle: string;
  customButtonText: string;
  customButtonLink: string;
  customImage: string;
  customImageAlt: string;
  customBenefits: ExpertiseBenefitRecord[];
  whyChooseTitle: string;
  whyChooseSubtitle: string;
  whyChooseFeatures: ExpertiseFeatureCardRecord[];
  industriesTitle: string;
  industriesSubtitle: string;
  industriesItems: ExpertiseIndustryItemRecord[];
  guideTitle: string;
  guideSubtitle: string;
  guideTabs: ExpertiseGuideTabRecord[];
  startTitle: string;
  startSubtitle: string;
  startButtonText: string;
  startButtonLink: string;
  /** Short items shown in the hero panel. */
  heroHighlights?: string[];
  /** Page-specific FAQs. When empty, the shared expertise FAQs are shown. */
  faqs?: ExpertiseFaqRecord[];
};

export type ExpertiseSettingsRecord = {
  _id?: string;
  key: string;
  menuCategories: ExpertiseNavigationCategoryRecord[];
  testimonialTitle: string;
  testimonialSubtitle: string;
  testimonials: ExpertiseTestimonialRecord[];
  engagementTitle: string;
  engagementSubtitle: string;
  engagementModels: ExpertiseEngagementModelRecord[];
  techStackTitle: string;
  techStackDescription: string;
  techStackTabs: ExpertiseTechStackTabRecord[];
  faqTitle: string;
  faqs: ExpertiseFaqRecord[];
};

export type OffshoreNavigationCategoryRecord = {
  key: string;
  label: string;
  menuHeading: string;
  order: number;
};

export type OffshoreHeroTechnologyRecord = {
  value: string;
  label: string;
};

export type OffshoreCardWithImageRecord = {
  title: string;
  description: string;
  imageData: string;
  alt: string;
  width: number;
  height: number;
};

export type OffshoreSimpleItemRecord = {
  title: string;
  description: string;
};

export type OffshoreDeveloperGridItemRecord = {
  name: string;
  imageData: string;
  alt: string;
  width: number;
  height: number;
  link: string;
};

export type OffshoreGuideTabItemRecord = {
  title: string;
  description: string;
};

export type OffshoreGuideTabRecord = {
  key: string;
  label: string;
  section: string;
  items: OffshoreGuideTabItemRecord[];
};

export type OffshoreStepRecord = {
  stepLabel: string;
  title: string;
  description: string;
};

export type OffshoreEngagementModelRecord = {
  title: string;
  description: string;
  features: string[];
};

export type OffshoreTestimonialRecord = {
  quote: string;
  name: string;
  role: string;
  avatarImageData: string;
  starsImageData: string;
};

export type OffshoreCaseStudyRecord = {
  title: string;
  description: string;
  imageData: string;
  featuresLeft: string[];
  featuresRight: string[];
};

export type OffshoreFaqRecord = {
  question: string;
  answer: string;
};

export type OffshoreDeveloperPageRecord = {
  _id: string;
  slug: string;
  categoryKey: string;
  navLabel: string;
  order: number;
  isPublished: boolean;
  heroTitle: string;
  heroDescription: string;
  heroChecklist: string[];
  heroFormTitle: string;
  heroTechnologies: OffshoreHeroTechnologyRecord[];
  excellenceTitle: string;
  excellenceSubtitle: string;
  excellenceOfferings: OffshoreCardWithImageRecord[];
  ctaTitle: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  partnerTitle: string;
  partnerButtonText: string;
  partnerButtonLink: string;
  partnerItems: OffshoreSimpleItemRecord[];
  developerGridTitle: string;
  developerItems: OffshoreDeveloperGridItemRecord[];
  hireTitle: string;
  hireSubtitle: string;
  hireServices: OffshoreSimpleItemRecord[];
  contactTitle: string;
  contactButtonText: string;
  contactButtonLink: string;
  guideTitle: string;
  guideTabs: OffshoreGuideTabRecord[];
  stepsTitle: string;
  stepsButtonText: string;
  stepsButtonLink: string;
  steps: OffshoreStepRecord[];
  engagementTitle: string;
  engagementSubtitle: string;
  engagementModels: OffshoreEngagementModelRecord[];
  /** Page-specific FAQs. When empty, the shared offshore FAQs are shown. */
  faqs?: OffshoreFaqRecord[];
};

export type OffshoreDeveloperSettingsRecord = {
  _id?: string;
  key: string;
  menuCategories: OffshoreNavigationCategoryRecord[];
  partnerLogos: TechnologyLogoRecord[];
  testimonialTitle: string;
  testimonialSubtitle: string;
  testimonials: OffshoreTestimonialRecord[];
  caseStudyTitle: string;
  caseStudySubtitle: string;
  caseStudies: OffshoreCaseStudyRecord[];
  faqTitle: string;
  faqs: OffshoreFaqRecord[];
};

export type ProductFeatureRecord = {
  title: string;
  description: string;
  imageData: string;
  buttonLabel: string;
  buttonHref: string;
};

export type ProductAudienceRecord = {
  title: string;
  description: string;
  imageData: string;
};

export type ProductFaqRecord = {
  question: string;
  answer: string;
};

export type ProductPageRecord = {
  _id: string;
  slug: string;
  navLabel: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroButtonLabel: string;
  heroButtonHref: string;
  order: number;
  isPublished: boolean;
};

export type ProductSettingsRecord = {
  _id?: string;
  key: string;
  menuTitle: string;
  menuDescription: string;
  menuDescriptionSecondary: string;
  menuButtonLabel: string;
  menuButtonHref: string;
  menuImageData: string;
  landingHeroTitle: string;
  landingHeroSubtitle: string;
  landingHeroDescription: string;
  landingHeroButtonLabel: string;
  landingHeroButtonHref: string;
  customSupportTitle: string;
  customSupportDescription: string;
  customSupportImageData: string;
  featuresTitle: string;
  featuresDescription: string;
  featureCards: ProductFeatureRecord[];
  transformTitle: string;
  transformDescription: string;
  audienceCards: ProductAudienceRecord[];
  faqTitle: string;
  faqs: ProductFaqRecord[];
  driveTitle: string;
  driveDescription: string;
  driveButtonLabel: string;
  driveButtonHref: string;
};

export type TechnologyLogoRecord = {
  label: string;
  imageData: string;
  href: string;
};

export type TechnologySimpleCardRecord = {
  title: string;
  description: string;
};

export type TechnologyChallengeCardRecord = {
  title: string;
  description: string;
  imageData: string;
  linkLabel: string;
};

export type TechnologyCaseStudyRecord = {
  title: string;
  description: string;
  imageData: string;
  featuresLeft: string[];
  featuresRight: string[];
};

export type TechnologyStackItemRecord = {
  label: string;
  imageData: string;
};

export type TechnologyStatRecord = {
  value: string;
  label: string;
};

export type TechnologyEngagementModelRecord = {
  title: string;
  description: string;
  bullets: string[];
};

export type TechnologyFaqRecord = {
  question: string;
  answer: string;
};

export type TechnologyPageRecord = {
  _id: string;
  slug: string;
  category: string;
  order: number;
  isPublished: boolean;
  isLanding: boolean;
  heroSubtitle: string;
  heroTitle: string;
  heroDescription: string;
  heroPrimaryButtonLabel: string;
  heroPrimaryButtonHref: string;
  heroSecondaryButtonLabel: string;
  heroSecondaryButtonHref: string;
  heroLogos: TechnologyLogoRecord[];
  challengesTitle: string;
  challengeCards: TechnologyChallengeCardRecord[];
  unlockTitle: string;
  unlockButtonLabel: string;
  unlockButtonHref: string;
  talkTitle: string;
  talkButtonLabel: string;
  talkButtonHref: string;
  talkCards: TechnologySimpleCardRecord[];
  successTitle: string;
  successCards: TechnologySimpleCardRecord[];
  provenTitle: string;
  provenDescription: string;
  provenCaseStudies: TechnologyCaseStudyRecord[];
  guidanceTitle: string;
  guidanceButtonLabel: string;
  guidanceButtonHref: string;
  qualityEyebrow: string;
  qualityTitle: string;
  qualityDescription: string;
  qualityPoints: TechnologySimpleCardRecord[];
  stackTitle: string;
  stackItems: TechnologyStackItemRecord[];
  leaderTitle: string;
  leaderStats: TechnologyStatRecord[];
  engagementTitle: string;
  engagementDescription: string;
  engagementModels: TechnologyEngagementModelRecord[];
  faqTitle: string;
  faqs: TechnologyFaqRecord[];
};
