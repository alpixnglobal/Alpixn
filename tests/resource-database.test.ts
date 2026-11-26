import assert from "node:assert/strict";
import { after, before, beforeEach, describe, test } from "node:test";

import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;

let connectToDatabase: typeof import("../lib/db").connectToDatabase;
let ensureSeedData: typeof import("../lib/content-service").ensureSeedData;
let getSiteSettings: typeof import("../lib/content-service").getSiteSettings;
let getHomeSettings: typeof import("../lib/content-service").getHomeSettings;
let getAboutSettings: typeof import("../lib/content-service").getAboutSettings;
let getContactSettings: typeof import("../lib/content-service").getContactSettings;
let getResourceUiSettings: typeof import("../lib/content-service").getResourceUiSettings;
let getAdminProducts: typeof import("../lib/content-service").getAdminProducts;
let getPublishedProducts: typeof import("../lib/content-service").getPublishedProducts;
let getPublishedProductBySlug: typeof import("../lib/content-service").getPublishedProductBySlug;
let getProductSettings: typeof import("../lib/content-service").getProductSettings;
let getAdminExpertisePages: typeof import("../lib/content-service").getAdminExpertisePages;
let getPublishedExpertisePages: typeof import("../lib/content-service").getPublishedExpertisePages;
let getPublishedExpertisePage: typeof import("../lib/content-service").getPublishedExpertisePage;
let getExpertiseSettings: typeof import("../lib/content-service").getExpertiseSettings;
let getPublishedExpertiseNavigation: typeof import("../lib/content-service").getPublishedExpertiseNavigation;
let getAdminOffshoreDeveloperPages: typeof import("../lib/content-service").getAdminOffshoreDeveloperPages;
let getPublishedOffshoreDeveloperPages: typeof import("../lib/content-service").getPublishedOffshoreDeveloperPages;
let getPublishedOffshoreDeveloperPage: typeof import("../lib/content-service").getPublishedOffshoreDeveloperPage;
let getOffshoreDeveloperSettings: typeof import("../lib/content-service").getOffshoreDeveloperSettings;
let getPublishedOffshoreDeveloperNavigation: typeof import("../lib/content-service").getPublishedOffshoreDeveloperNavigation;
let getPublishedInterns: typeof import("../lib/content-service").getPublishedInterns;
let getPublishedTeamMembers: typeof import("../lib/content-service").getPublishedTeamMembers;
let getPublishedPortfolioProjects: typeof import("../lib/content-service").getPublishedPortfolioProjects;
let getPublishedPortfolioProjectBySlug: typeof import("../lib/content-service").getPublishedPortfolioProjectBySlug;
let getPublishedJobs: typeof import("../lib/content-service").getPublishedJobs;
let getPublishedJobBySlug: typeof import("../lib/content-service").getPublishedJobBySlug;
let getAdminJobApplications: typeof import("../lib/content-service").getAdminJobApplications;
let getPublishedBlogPosts: typeof import("../lib/content-service").getPublishedBlogPosts;
let getPublishedFeaturedBlogPost: typeof import("../lib/content-service").getPublishedFeaturedBlogPost;
let getPublishedBlogPostBySlug: typeof import("../lib/content-service").getPublishedBlogPostBySlug;
let getBlogCategories: typeof import("../lib/content-service").getBlogCategories;
let getLandingTechnologyPage: typeof import("../lib/content-service").getLandingTechnologyPage;
let getPublishedTechnologyPage: typeof import("../lib/content-service").getPublishedTechnologyPage;
let getAdminTechnologyPages: typeof import("../lib/content-service").getAdminTechnologyPages;
let getAdminOverview: typeof import("../lib/content-service").getAdminOverview;

let SiteSettingsModel: typeof import("../lib/models").SiteSettingsModel;
let HomeSettingsModel: typeof import("../lib/models").HomeSettingsModel;
let AboutSettingsModel: typeof import("../lib/models").AboutSettingsModel;
let ContactSettingsModel: typeof import("../lib/models").ContactSettingsModel;
let ResourceUiSettingsModel: typeof import("../lib/models").ResourceUiSettingsModel;
let ProductPageModel: typeof import("../lib/models").ProductPageModel;
let ProductSettingsModel: typeof import("../lib/models").ProductSettingsModel;
let ExpertisePageModel: typeof import("../lib/models").ExpertisePageModel;
let ExpertiseSettingsModel: typeof import("../lib/models").ExpertiseSettingsModel;
let OffshoreDeveloperPageModel: typeof import("../lib/models").OffshoreDeveloperPageModel;
let OffshoreDeveloperSettingsModel: typeof import("../lib/models").OffshoreDeveloperSettingsModel;
let InternModel: typeof import("../lib/models").InternModel;
let TeamMemberModel: typeof import("../lib/models").TeamMemberModel;
let PortfolioProjectModel: typeof import("../lib/models").PortfolioProjectModel;
let JobOpeningModel: typeof import("../lib/models").JobOpeningModel;
let JobApplicationModel: typeof import("../lib/models").JobApplicationModel;
let BlogPostModel: typeof import("../lib/models").BlogPostModel;
let TechnologyPageModel: typeof import("../lib/models").TechnologyPageModel;

before(async () => {
  mongoServer = await MongoMemoryServer.create({
    instance: {
      launchTimeout: 60000,
    },
  });

  process.env.MONGODB_URI = mongoServer.getUri();
  process.env.ADMIN_EMAIL = "admin@test.local";
  process.env.ADMIN_PASSWORD = "Admin@12345";
  process.env.AUTH_SECRET = "test-auth-secret";

  ({ connectToDatabase } = await import("../lib/db"));

  ({
    ensureSeedData,
    getSiteSettings,
    getHomeSettings,
    getAboutSettings,
    getContactSettings,
    getResourceUiSettings,
    getAdminProducts,
    getPublishedProducts,
    getPublishedProductBySlug,
    getProductSettings,
    getAdminExpertisePages,
    getPublishedExpertisePages,
    getPublishedExpertisePage,
    getExpertiseSettings,
    getPublishedExpertiseNavigation,
    getAdminOffshoreDeveloperPages,
    getPublishedOffshoreDeveloperPages,
    getPublishedOffshoreDeveloperPage,
    getOffshoreDeveloperSettings,
    getPublishedOffshoreDeveloperNavigation,
    getPublishedInterns,
    getPublishedTeamMembers,
    getPublishedPortfolioProjects,
    getPublishedPortfolioProjectBySlug,
    getPublishedJobs,
    getPublishedJobBySlug,
    getAdminJobApplications,
    getPublishedBlogPosts,
    getPublishedFeaturedBlogPost,
    getPublishedBlogPostBySlug,
    getBlogCategories,
    getLandingTechnologyPage,
    getPublishedTechnologyPage,
    getAdminTechnologyPages,
    getAdminOverview,
  } = await import("../lib/content-service"));

  ({
    SiteSettingsModel,
    HomeSettingsModel,
    AboutSettingsModel,
    ContactSettingsModel,
    ResourceUiSettingsModel,
    ProductPageModel,
    ProductSettingsModel,
    ExpertisePageModel,
    ExpertiseSettingsModel,
    OffshoreDeveloperPageModel,
    OffshoreDeveloperSettingsModel,
    InternModel,
    TeamMemberModel,
    PortfolioProjectModel,
    JobOpeningModel,
    JobApplicationModel,
    BlogPostModel,
    TechnologyPageModel,
  } = await import("../lib/models"));
});

beforeEach(async () => {
  const connection = await connectToDatabase();
  await connection.connection.dropDatabase();
  await ensureSeedData();
});

after(async () => {
  if (!connectToDatabase || !mongoServer) {
    return;
  }

  const connection = await connectToDatabase();
  await connection.disconnect();
  await mongoServer.stop();
});

describe("resource database coverage", () => {
  test("Home settings persist all MongoDB-backed home section content", async () => {
    await HomeSettingsModel.updateOne(
      { key: "home-settings" },
      {
        $set: {
          heroTitle: "Database Home Hero",
          heroDescription: "Database-managed home hero description.",
          heroPrimaryAction: { label: "Talk Now", href: "/contact-us" },
          heroSecondaryAction: { label: "See Work", href: "/resources/portfolio" },
          heroImageData: "data:image/png;base64,home-hero",
          customSolutionsTitle: "Database Solutions Title",
          customSolutionsSubtitle: "Database solutions subtitle.",
          customSolutionCards: [{ title: "Solution A", description: "Solution A description", imageData: "/images/ai1.png", alt: "Solution A" }],
          offeringsTitle: "Database Offerings Title",
          offeringsSubtitle: "Database offerings subtitle.",
          offerings: [{ title: "Offering A", description: "Offering A description", imageData: "/images/software.svg", alt: "Offering A", width: 100, height: 100 }],
          caseStudyTitle: "Database Case Study Title",
          caseStudySubtitle: "Database case study subtitle.",
          caseStudies: [{ title: "Case A", description: "Case A description", imageData: "/images/phone.png", featuresLeft: ["Left A"], featuresRight: ["Right A"] }],
          industriesTitle: "Database Industries Title",
          industriesSubtitle: "Database industries subtitle.",
          industriesTabs: [{ id: "health", label: "Health", items: [{ title: "Health Tech" }] }],
          techStackTitle: "Database Tech Stack Title",
          techStackDescription: "Database tech stack description.",
          techStackTabs: [{ name: "Languages", value: "languages", items: [{ label: "TypeScript", imageData: "/images/typescript.svg" }] }],
          whyChooseQuote: "Database quote",
          whyChooseAuthor: "Database Author",
          whyChooseRole: "Database Role",
          whyChooseManagerImage: "data:image/png;base64,manager",
          insightSection: { title: "Database Insights", subtitle: "Database insights subtitle.", buttonText: "Read Insights", buttonHref: "/resources/blogs" },
        },
      }
    );

    const settings = await getHomeSettings();
    const overview = await getAdminOverview();

    assert.equal(settings.heroTitle, "Database Home Hero");
    assert.equal(settings.heroPrimaryAction.label, "Talk Now");
    assert.equal(settings.customSolutionCards[0]?.title, "Solution A");
    assert.equal(settings.offerings[0]?.title, "Offering A");
    assert.equal(settings.caseStudies[0]?.title, "Case A");
    assert.equal(settings.industriesTabs[0]?.label, "Health");
    assert.equal(settings.techStackTabs[0]?.items[0]?.label, "TypeScript");
    assert.equal(settings.whyChooseAuthor, "Database Author");
    assert.equal(settings.insightSection.title, "Database Insights");
    assert.equal(overview.stats.homePages, 1);
  });

  test("About settings persist all MongoDB-backed about section content", async () => {
    await AboutSettingsModel.updateOne(
      { key: "about-settings" },
      {
        $set: {
          heroTitle: "Database About Hero",
          heroDescription: "Database-managed about hero description.",
          heroPrimaryAction: { label: "Explore", href: "/our-expertise" },
          heroSecondaryAction: { label: "Contact", href: "/contact-us" },
          whoWeAreTitle: "Database Who We Are",
          whoWeAreParagraphOne: "Paragraph one from DB.",
          whoWeAreParagraphTwo: "Paragraph two from DB.",
          whoWeAreImage: "data:image/png;base64,who-we-are",
          visionTag: "Vision Tag",
          visionTitle: "Vision Title",
          visionDescription: "Vision description from DB.",
          visionStats: [{ value: "20+", label: "Years" }],
          missionTag: "Mission Tag",
          missionTitle: "Mission Title",
          missionDescription: "Mission description from DB.",
          missionCards: [{ title: "Mission Card", description: "Mission card description", imageData: "/images/tree.png" }],
          milestoneTag: "Milestone Tag",
          milestoneTitle: "Milestone Title",
          milestoneDescription: "Milestone description from DB.",
          milestoneItems: [{ year: "2026", title: "New Era", description: "Milestone description" }],
          whyChooseTitle: "Why Choose Title",
          whyChooseSubtitle: "Why choose subtitle from DB.",
          whyChooseCards: [{ title: "Card One", description: "Card one description" }, { title: "Card Two", description: "Card two description" }, { title: "Card Three", description: "Card three description" }],
          ctaTitle: "Database CTA Title",
          ctaDescription: "Database CTA description.",
          ctaButtonText: "Book Call",
          ctaButtonHref: "/contact-us",
        },
      }
    );

    const settings = await getAboutSettings();
    const overview = await getAdminOverview();

    assert.equal(settings.heroTitle, "Database About Hero");
    assert.equal(settings.heroPrimaryAction.label, "Explore");
    assert.equal(settings.whoWeAreTitle, "Database Who We Are");
    assert.equal(settings.visionTitle, "Vision Title");
    assert.equal(settings.missionCards[0]?.title, "Mission Card");
    assert.equal(settings.milestoneItems[0]?.year, "2026");
    assert.equal(settings.whyChooseCards[2]?.title, "Card Three");
    assert.equal(settings.ctaButtonText, "Book Call");
    assert.equal(overview.stats.aboutPages, 1);
  });

  test("Contact settings persist form UI copy, assistance links, and office data", async () => {
    await ContactSettingsModel.updateOne(
      { key: "contact" },
      {
        $set: {
          formIntroTitle: "Database Contact Intro",
          formIntroDescription: "Database-managed contact intro description.",
          formPhoneNumber: "+91 9999999999",
          formPhoneAvailability: "24/7",
          formEmail: "hello@example.com",
          formSupportEmail: "support@example.com",
          formAddress: "123 Test Address",
          formButtonText: "Send Now",
          formFirstNameLabel: "Given Name",
          formLastNameLabel: "Surname",
          formEmailLabel: "Business Email",
          formPhoneLabel: "Mobile",
          formInterestPlaceholder: "Looking for",
          formMessageLabel: "How can we help?",
          formInterestOptions: ["AI", "Web", "Mobile"],
          assistanceTitle: "Need Help Fast?",
          assistanceDescription: "Reach our team immediately.",
          assistanceEmailButtonText: "Email Team",
          assistanceCallButtonText: "Call Team",
          assistanceEmailButtonHref: "mailto:test@example.com",
          assistanceCallButtonHref: "tel:+911234567890",
          globalOfficesTitle: "Global Hubs",
          globalOffices: [
            { name: "India", address: "Mumbai", email: "india@example.com", flagImage: "/images/india.svg", order: 1, isPublished: true },
            { name: "Canada", address: "Toronto", email: "canada@example.com", flagImage: "/images/canada.svg", order: 2, isPublished: false },
          ],
        },
      }
    );

    const settings = await getContactSettings();

    assert.equal(settings.formIntroTitle, "Database Contact Intro");
    assert.equal(settings.formButtonText, "Send Now");
    assert.equal(settings.formInterestOptions[2], "Mobile");
    assert.equal(settings.assistanceEmailButtonHref, "mailto:test@example.com");
    assert.equal(settings.globalOfficesTitle, "Global Hubs");
    assert.equal(settings.globalOffices[0]?.name, "India");
  });

  test("Resource UI settings persist remaining listing/detail chrome copy", async () => {
    await ResourceUiSettingsModel.updateOne(
      { key: "resource-ui-settings" },
      {
        $set: {
          interns: {
            searchPlaceholder: "Search alumni",
            programLabel: "Program filter",
            allProgramsLabel: "Every program",
            trackLabel: "Track filter",
            allTracksLabel: "Every track",
            resultsLabel: "matches",
            clearAllLabel: "Reset",
            emptyMessage: "No alumni found.",
          },
          portfolio: {
            searchPlaceholder: "Search portfolio",
            industryLabel: "Sector",
            allIndustriesLabel: "Every sector",
            tagLabel: "Capability",
            allTagsLabel: "Every capability",
            resultsLabel: "projects",
            clearAllLabel: "Reset all",
            emptyMessage: "No projects found.",
            detailsTitle: "Project Details",
            objectiveTitle: "Project Objective",
            solutionsTitle: "Project Solutions",
            aboutProjectTitle: "Project Snapshot",
            industryLabelShort: "Sector",
            engagementLabel: "Service model",
            outcomeLabel: "Impact",
            servicesProvidedLabel: "Services",
            timelineLabel: "Delivery timeline",
            resultTitle: "Project Result",
            teamTitle: "Delivery Team",
            moreProjectsTitle: "More Projects",
          },
          careers: {
            searchPlaceholder: "Search openings",
            typeLabel: "Employment type",
            allTypesLabel: "Every type",
            modeLabel: "Work setup",
            allModesLabel: "Every setup",
            viewDetailsLabel: "Open Role",
            emptyMessage: "No openings found.",
            overviewTitle: "Role Overview",
            responsibilitiesTitle: "Responsibilities",
            requirementsTitle: "Requirements",
            benefitsTitle: "Perks",
            applyButtonLabel: "Apply for Role",
            applyIntroTitle: "Join Our Team",
            applyIntroDescription: "Tell us more about yourself.",
            applyFullNamePlaceholder: "Your Name",
            applyPhonePlaceholder: "Phone",
            applyEmailPlaceholder: "Email",
            applyLocationPlaceholder: "City",
            applyLinkedInPlaceholder: "LinkedIn profile",
            applyPortfolioPlaceholder: "Portfolio URL",
            applyCvPlaceholder: "Resume URL",
            applyCoverLetterPlaceholder: "Why are you a fit for {jobTitle}?",
            applySummaryPrefix: "You are applying for",
            applySubmitLabel: "Send Application",
          },
          blogs: {
            heroReadButtonLabel: "Open Article",
            searchPlaceholder: "Search insights",
            allCategoriesLabel: "Every category",
            articlesFoundSuffix: "matches found",
            emptyExploreMessage: "No insights found.",
            latestTitle: "Latest Insights",
            categoriesTitle: "Topics",
            latestEmptyMessage: "No insights published.",
            authorSummaryTemplate: "Managed under the {category} knowledge series.",
            detailsTitle: "Post Details",
            relatedTitle: "Related Posts",
            noRelatedMessage: "No related posts yet.",
          },
        },
      }
    );

    const settings = await getResourceUiSettings();

    assert.equal(settings.interns.searchPlaceholder, "Search alumni");
    assert.equal(settings.portfolio.detailsTitle, "Project Details");
    assert.equal(settings.careers.applySubmitLabel, "Send Application");
    assert.equal(settings.blogs.relatedTitle, "Related Posts");
  });

  test("Products shared settings persist across every MongoDB-backed section block", async () => {
    await ProductSettingsModel.updateOne(
      { key: "product-settings" },
      {
        $set: {
          menuTitle: "Database Products Menu",
          menuDescription: "Database-managed products menu description.",
          menuDescriptionSecondary: "Database-managed products menu secondary description.",
          menuButtonLabel: "Talk Products",
          menuButtonHref: "/products",
          menuImageData: "data:image/png;base64,menu-image",
          landingHeroTitle: "Database Products Landing Hero",
          landingHeroSubtitle: "Database Landing Subtitle",
          landingHeroDescription: "Database-managed landing hero description.",
          landingHeroButtonLabel: "Book Landing Demo",
          landingHeroButtonHref: "/contact-us",
          customSupportTitle: "Database Support Title",
          customSupportDescription: "Database support description.",
          customSupportImageData: "data:image/png;base64,custom-support",
          featuresTitle: "Database Features Title",
          featuresDescription: "Database features description.",
          featureCards: [
            { title: "Feature One", description: "Feature one description", imageData: "/images/natural-language-understanding.png", buttonLabel: "Open", buttonHref: "/products" },
            { title: "Feature Two", description: "Feature two description", imageData: "/images/ai-driven-learning.png", buttonLabel: "Open", buttonHref: "/products" },
            { title: "Feature Three", description: "Feature three description", imageData: "/images/sentiment-analysis.png", buttonLabel: "Open", buttonHref: "/products" },
          ],
          transformTitle: "Database Transform Title",
          transformDescription: "Database transform description.",
          audienceCards: [
            { title: "Audience One", description: "Audience one description", imageData: "/icons/organisation.svg" },
            { title: "Audience Two", description: "Audience two description", imageData: "/icons/education.svg" },
            { title: "Audience Three", description: "Audience three description", imageData: "/icons/support.svg" },
            { title: "Audience Four", description: "Audience four description", imageData: "/icons/hr.svg" },
          ],
          faqTitle: "Database FAQ Title",
          faqs: [
            { question: "FAQ One?", answer: "FAQ one answer." },
            { question: "FAQ Two?", answer: "FAQ two answer." },
            { question: "FAQ Three?", answer: "FAQ three answer." },
            { question: "FAQ Four?", answer: "FAQ four answer." },
            { question: "FAQ Five?", answer: "FAQ five answer." },
            { question: "FAQ Six?", answer: "FAQ six answer." },
          ],
          driveTitle: "Database Drive Title",
          driveDescription: "Database drive description.",
          driveButtonLabel: "Talk To Experts",
          driveButtonHref: "/contact-us",
        },
      }
    );

    const settings = await getProductSettings();

    assert.equal(settings.menuTitle, "Database Products Menu");
    assert.equal(settings.menuDescriptionSecondary, "Database-managed products menu secondary description.");
    assert.equal(settings.menuButtonLabel, "Talk Products");
    assert.equal(settings.menuButtonHref, "/products");
    assert.equal(settings.menuImageData, "data:image/png;base64,menu-image");
    assert.equal(settings.landingHeroTitle, "Database Products Landing Hero");
    assert.equal(settings.landingHeroSubtitle, "Database Landing Subtitle");
    assert.equal(settings.landingHeroDescription, "Database-managed landing hero description.");
    assert.equal(settings.landingHeroButtonLabel, "Book Landing Demo");
    assert.equal(settings.landingHeroButtonHref, "/contact-us");
    assert.equal(settings.customSupportTitle, "Database Support Title");
    assert.equal(settings.customSupportDescription, "Database support description.");
    assert.equal(settings.customSupportImageData, "data:image/png;base64,custom-support");
    assert.equal(settings.featuresTitle, "Database Features Title");
    assert.equal(settings.featuresDescription, "Database features description.");
    assert.equal(settings.featureCards[0]?.title, "Feature One");
    assert.equal(settings.featureCards[0]?.buttonHref, "/products");
    assert.equal(settings.transformTitle, "Database Transform Title");
    assert.equal(settings.transformDescription, "Database transform description.");
    assert.equal(settings.audienceCards[0]?.title, "Audience One");
    assert.equal(settings.audienceCards[3]?.imageData, "/icons/hr.svg");
    assert.equal(settings.faqTitle, "Database FAQ Title");
    assert.equal(settings.faqs[0]?.question, "FAQ One?");
    assert.equal(settings.faqs[5]?.answer, "FAQ six answer.");
    assert.equal(settings.driveTitle, "Database Drive Title");
    assert.equal(settings.driveDescription, "Database drive description.");
    assert.equal(settings.driveButtonLabel, "Talk To Experts");
    assert.equal(settings.driveButtonHref, "/contact-us");
  });

  test("Products entries support create, deep update, publish filtering, ordering, delete, and admin overview counts", async () => {
    await ProductPageModel.create({
      slug: "database-product",
      navLabel: "Database Product",
      heroTitle: "Database Product Hero",
      heroSubtitle: "Database Product Subtitle",
      heroDescription: "Database-managed product hero description.",
      heroButtonLabel: "Book Demo",
      heroButtonHref: "/contact-us",
      order: 99,
      isPublished: true,
    });

    await ProductPageModel.create({
      slug: "draft-product",
      navLabel: "Draft Product",
      heroTitle: "Draft Product Hero",
      heroSubtitle: "Draft subtitle",
      heroDescription: "Draft description",
      heroButtonLabel: "Book Demo",
      heroButtonHref: "/contact-us",
      order: 110,
      isPublished: false,
    });

    await ProductPageModel.create({
      slug: "alpha-product",
      navLabel: "Alpha Product",
      heroTitle: "Alpha Product Hero",
      heroSubtitle: "Alpha subtitle",
      heroDescription: "Alpha description",
      heroButtonLabel: "Alpha Demo",
      heroButtonHref: "/alpha",
      order: 0,
      isPublished: true,
    });

    let publishedProducts = await getPublishedProducts();
    let adminProducts = await getAdminProducts();
    let overview = await getAdminOverview();

    assert.ok(!publishedProducts.some((item) => item.slug === "draft-product"));
    assert.ok(publishedProducts.some((item) => item.slug === "database-product"));
    assert.ok(adminProducts.some((item) => item.slug === "draft-product"));
    assert.equal(adminProducts.length, overview.stats.products);
    assert.deepEqual(
      publishedProducts.slice(0, 2).map((item) => item.slug),
      ["alpha-product", "salon-management"]
    );

    await ProductPageModel.updateOne(
      { slug: "draft-product" },
      {
        $set: {
          isPublished: true,
          navLabel: "Updated Draft Product",
          heroTitle: "Updated Product Hero",
          heroSubtitle: "Updated Product Subtitle",
          heroDescription: "Updated product description",
          heroButtonLabel: "Updated Demo",
          heroButtonHref: "/updated-demo",
          order: 0.5,
        },
      }
    );

    publishedProducts = await getPublishedProducts();
    const updatedProduct = await getPublishedProductBySlug("draft-product");
    assert.ok(publishedProducts.some((item) => item.slug === "draft-product" && item.navLabel === "Updated Draft Product"));
    assert.equal(updatedProduct?.heroTitle, "Updated Product Hero");
    assert.equal(updatedProduct?.heroSubtitle, "Updated Product Subtitle");
    assert.equal(updatedProduct?.heroDescription, "Updated product description");
    assert.equal(updatedProduct?.heroButtonLabel, "Updated Demo");
    assert.equal(updatedProduct?.heroButtonHref, "/updated-demo");
    assert.deepEqual(
      publishedProducts.slice(0, 3).map((item) => item.slug),
      ["alpha-product", "draft-product", "salon-management"]
    );

    await ProductPageModel.deleteOne({ slug: "draft-product" });
    await ProductPageModel.deleteOne({ slug: "database-product" });
    await ProductPageModel.deleteOne({ slug: "alpha-product" });

    publishedProducts = await getPublishedProducts();
    adminProducts = await getAdminProducts();
    overview = await getAdminOverview();
    assert.ok(!publishedProducts.some((item) => item.slug === "draft-product"));
    assert.ok(!adminProducts.some((item) => item.slug === "draft-product"));
    assert.equal(adminProducts.length, overview.stats.products);
  });

  test("Offshore Developer shared settings persist for navbar groups, partner logos, testimonials, case studies, and FAQs", async () => {
    await OffshoreDeveloperSettingsModel.updateOne(
      { key: "offshore-developer-settings" },
      {
        $set: {
          menuCategories: [
            { key: "backend-developer", label: "Backend Teams", menuHeading: "HIRE BACKEND TEAMS", order: 1 },
            { key: "ai-engineers", label: "AI Specialists", menuHeading: "HIRE AI SPECIALISTS", order: 2 },
          ],
          partnerLogos: [{ label: "Partner A", imageData: "data:image/png;base64,partner", href: "/partner-a" }],
          testimonialTitle: "Database Offshore Testimonials",
          testimonialSubtitle: "Database-managed offshore subtitle.",
          testimonials: [
            {
              quote: "Outstanding offshore team.",
              name: "Ava Carter",
              role: "CTO, Example Co",
              avatarImageData: "data:image/png;base64,avatar",
              starsImageData: "/icons/stars.svg",
            },
          ],
          caseStudyTitle: "Database Offshore Case Studies",
          caseStudySubtitle: "Database-managed case study subtitle.",
          caseStudies: [
            {
              title: "Case Study A",
              description: "Case study description.",
              imageData: "data:image/png;base64,case",
              featuresLeft: ["Left one"],
              featuresRight: ["Right one"],
            },
          ],
          faqTitle: "Database Offshore FAQs",
          faqs: [{ question: "How do you onboard offshore developers?", answer: "With structured onboarding." }],
        },
      }
    );

    const settings = await getOffshoreDeveloperSettings();

    assert.equal(settings.menuCategories[0]?.label, "Backend Teams");
    assert.equal(settings.partnerLogos[0]?.href, "/partner-a");
    assert.equal(settings.testimonialTitle, "Database Offshore Testimonials");
    assert.equal(settings.testimonials[0]?.name, "Ava Carter");
    assert.equal(settings.caseStudyTitle, "Database Offshore Case Studies");
    assert.equal(settings.caseStudies[0]?.title, "Case Study A");
    assert.equal(settings.faqTitle, "Database Offshore FAQs");
    assert.equal(settings.faqs[0]?.answer, "With structured onboarding.");
  });

  test("Offshore Developer pages support deep section updates, navigation grouping, publish filtering, ordering, and delete", async () => {
    await OffshoreDeveloperPageModel.create({
      slug: "custom-backend-developer",
      categoryKey: "backend-developer",
      navLabel: "Custom Backend Developer",
      order: 0,
      isPublished: true,
      heroTitle: "Custom Offshore Hero",
      heroDescription: "Custom hero description.",
      heroChecklist: ["Checklist one", "Checklist two"],
      heroFormTitle: "Work with Custom Backend Developers",
      heroTechnologies: [{ value: "rust", label: "Rust" }],
      excellenceTitle: "Custom Excellence Title",
      excellenceSubtitle: "Custom excellence subtitle.",
      excellenceOfferings: [
        { title: "Offering one", description: "Offering description", imageData: "/icons/api.svg", alt: "Offering", width: 45, height: 45 },
      ],
      ctaTitle: "Custom CTA Title",
      ctaButtonText: "Hire Custom Team",
      ctaButtonLink: "/contact-us",
      partnerTitle: "Custom Partner Title",
      partnerButtonText: "Talk Now",
      partnerButtonLink: "/contact-us",
      partnerItems: [{ title: "Partner item", description: "Partner description" }],
      developerGridTitle: "Custom Developer Grid",
      developerItems: [
        { name: "Rust Developer", imageData: "/images/python.png", alt: "Rust", width: 40, height: 40, link: "/offshore-developer/backend-developer/custom-backend-developer" },
      ],
      hireTitle: "Custom Hire Title",
      hireSubtitle: "Custom hire subtitle.",
      hireServices: [{ title: "Service one", description: "Service description" }],
      contactTitle: "Custom Contact Title",
      contactButtonText: "Book Meeting",
      contactButtonLink: "/contact-us",
      guideTitle: "Custom Guide Title",
      guideTabs: [
        {
          key: "guide-one",
          label: "Guide One",
          section: "Guide section",
          items: [{ title: "Guide item", description: "Guide description" }],
        },
      ],
      stepsTitle: "Custom Steps Title",
      stepsButtonText: "Hire Custom Talent",
      stepsButtonLink: "/contact-us",
      steps: [
        { stepLabel: "Step 01", title: "Intro Call", description: "Discuss needs." },
        { stepLabel: "Step 02", title: "Pick Team", description: "Select engineers." },
        { stepLabel: "Step 03", title: "Start Build", description: "Launch work." },
      ],
      engagementTitle: "Custom Engagement Title",
      engagementSubtitle: "Custom engagement subtitle.",
      engagementModels: [{ title: "Dedicated", description: "Dedicated model", features: ["A", "B"] }],
    });

    await OffshoreDeveloperPageModel.create({
      slug: "draft-offshore-page",
      categoryKey: "backend-developer",
      navLabel: "Draft Offshore Page",
      order: 99,
      isPublished: false,
      heroTitle: "Draft Offshore Hero",
      heroDescription: "Draft description.",
      heroChecklist: [],
      heroFormTitle: "Draft form",
      heroTechnologies: [],
      excellenceTitle: "Draft excellence",
      excellenceSubtitle: "Draft excellence subtitle",
      excellenceOfferings: [],
      ctaTitle: "Draft CTA",
      ctaButtonText: "Draft CTA",
      ctaButtonLink: "#",
      partnerTitle: "Draft partner",
      partnerButtonText: "Draft button",
      partnerButtonLink: "#",
      partnerItems: [],
      developerGridTitle: "Draft grid",
      developerItems: [],
      hireTitle: "Draft hire",
      hireSubtitle: "Draft hire subtitle",
      hireServices: [],
      contactTitle: "Draft contact",
      contactButtonText: "Draft contact",
      contactButtonLink: "#",
      guideTitle: "Draft guide",
      guideTabs: [],
      stepsTitle: "Draft steps",
      stepsButtonText: "Draft steps",
      stepsButtonLink: "#",
      steps: [],
      engagementTitle: "Draft engagement",
      engagementSubtitle: "Draft engagement subtitle",
      engagementModels: [],
    });

    let publishedPages = await getPublishedOffshoreDeveloperPages();
    let adminPages = await getAdminOffshoreDeveloperPages();
    let navigation = await getPublishedOffshoreDeveloperNavigation();

    assert.ok(publishedPages.some((page) => page.slug === "custom-backend-developer"));
    assert.ok(!publishedPages.some((page) => page.slug === "draft-offshore-page"));
    assert.ok(adminPages.some((page) => page.slug === "draft-offshore-page"));
    assert.equal(navigation[0]?.items[0]?.slug, "custom-backend-developer");

    await OffshoreDeveloperPageModel.updateOne(
      { slug: "draft-offshore-page" },
      {
        $set: {
          isPublished: true,
          order: 0.5,
          heroTitle: "Updated Draft Offshore Hero",
          heroDescription: "Updated draft offshore description.",
          heroChecklist: ["Updated checklist"],
          heroFormTitle: "Updated form title",
          heroTechnologies: [{ value: "go", label: "Go" }],
          excellenceTitle: "Updated Excellence",
          excellenceSubtitle: "Updated Excellence Subtitle",
          excellenceOfferings: [
            { title: "Updated Offering", description: "Updated offering description", imageData: "/icons/api.svg", alt: "Updated", width: 45, height: 45 },
          ],
          ctaTitle: "Updated CTA",
          ctaButtonText: "Updated CTA Text",
          ctaButtonLink: "/contact-us",
          partnerTitle: "Updated Partner Title",
          partnerButtonText: "Updated Partner Button",
          partnerButtonLink: "/contact-us",
          partnerItems: [{ title: "Updated Partner Item", description: "Updated partner description" }],
          developerGridTitle: "Updated Grid Title",
          developerItems: [
            { name: "Updated Go Developer", imageData: "/images/node.png", alt: "Go", width: 40, height: 40, link: "/offshore-developer/backend-developer/draft-offshore-page" },
          ],
          hireTitle: "Updated Hire Title",
          hireSubtitle: "Updated Hire Subtitle",
          hireServices: [{ title: "Updated Service", description: "Updated service description" }],
          contactTitle: "Updated Contact Title",
          contactButtonText: "Updated Contact Button",
          contactButtonLink: "/contact-us",
          guideTitle: "Updated Guide Title",
          guideTabs: [
            { key: "updated-guide", label: "Updated Guide", section: "Updated section", items: [{ title: "Updated guide item", description: "Updated guide description" }] },
          ],
          stepsTitle: "Updated Steps Title",
          stepsButtonText: "Updated Steps Button",
          stepsButtonLink: "/contact-us",
          steps: [
            { stepLabel: "Step 01", title: "Updated Step One", description: "Updated step one desc" },
            { stepLabel: "Step 02", title: "Updated Step Two", description: "Updated step two desc" },
            { stepLabel: "Step 03", title: "Updated Step Three", description: "Updated step three desc" },
          ],
          engagementTitle: "Updated Engagement Title",
          engagementSubtitle: "Updated Engagement Subtitle",
          engagementModels: [{ title: "Updated Model", description: "Updated model description", features: ["X", "Y"] }],
        },
      }
    );

    const updatedPage = await getPublishedOffshoreDeveloperPage("backend-developer", "draft-offshore-page");
    publishedPages = await getPublishedOffshoreDeveloperPages();
    adminPages = await getAdminOffshoreDeveloperPages();
    navigation = await getPublishedOffshoreDeveloperNavigation();

    assert.equal(updatedPage?.heroTitle, "Updated Draft Offshore Hero");
    assert.equal(updatedPage?.heroTechnologies[0]?.label, "Go");
    assert.equal(updatedPage?.excellenceOfferings[0]?.title, "Updated Offering");
    assert.equal(updatedPage?.partnerItems[0]?.title, "Updated Partner Item");
    assert.equal(updatedPage?.developerItems[0]?.name, "Updated Go Developer");
    assert.equal(updatedPage?.hireServices[0]?.title, "Updated Service");
    assert.equal(updatedPage?.guideTabs[0]?.label, "Updated Guide");
    assert.equal(updatedPage?.steps[1]?.title, "Updated Step Two");
    assert.equal(updatedPage?.engagementModels[0]?.title, "Updated Model");
    assert.ok(publishedPages.some((page) => page.slug === "draft-offshore-page"));
    assert.ok(adminPages.some((page) => page.slug === "draft-offshore-page"));
    assert.deepEqual(
      navigation.find((category) => category.key === "backend-developer")?.items.slice(0, 2).map((item) => item.slug),
      ["custom-backend-developer", "draft-offshore-page"]
    );

    await OffshoreDeveloperPageModel.deleteOne({ slug: "draft-offshore-page" });
    await OffshoreDeveloperPageModel.deleteOne({ slug: "custom-backend-developer" });

    publishedPages = await getPublishedOffshoreDeveloperPages();
    adminPages = await getAdminOffshoreDeveloperPages();
    const overview = await getAdminOverview();
    assert.ok(!publishedPages.some((page) => page.slug === "draft-offshore-page"));
    assert.ok(!adminPages.some((page) => page.slug === "draft-offshore-page"));
    assert.ok(!adminPages.some((page) => page.slug === "custom-backend-developer"));
    assert.equal(adminPages.length, overview.stats.offshoreDevelopers);
  });

  test("Our Expertise shared settings persist for dropdown groups, testimonials, engagement models, tech stack, and FAQs", async () => {
    await ExpertiseSettingsModel.updateOne(
      { key: "expertise-settings" },
      {
        $set: {
          menuCategories: [
            {
              key: "software-solution",
              label: "Software Solutions",
              description: "Database-managed software description.",
              menuHeading: "OUR OFFERINGS",
              order: 1,
            },
            {
              key: "artificial-intelligence",
              label: "Artificial Intelligence",
              description: "Database-managed AI description.",
              menuHeading: "AI THAT WORKS FOR YOU",
              order: 2,
            },
          ],
          testimonialTitle: "Database Expertise Testimonials",
          testimonialSubtitle: "Database-managed testimonial subtitle.",
          testimonials: [
            {
              quote: "Outstanding expertise delivery.",
              author: "Maya Smith",
              position: "Head of Product",
              company: "Example SaaS",
              avatar: "data:image/png;base64,expertise-avatar",
            },
          ],
          engagementTitle: "Database Engagement Title",
          engagementSubtitle: "Database-managed engagement subtitle.",
          engagementModels: [{ title: "Dedicated", description: "Dedicated expertise team", features: ["A", "B"] }],
          techStackTitle: "Database Tech Stack Title",
          techStackDescription: "Database-managed tech stack description.",
          techStackTabs: [
            {
              name: "Languages",
              value: "languages",
              items: [{ label: "TypeScript", imageData: "/images/typescript.svg" }],
            },
          ],
          faqTitle: "Database Expertise FAQs",
          faqs: [{ question: "How do you deliver expertise projects?", answer: "With a structured discovery and delivery workflow." }],
        },
      }
    );

    const settings = await getExpertiseSettings();

    assert.equal(settings.menuCategories[0]?.description, "Database-managed software description.");
    assert.equal(settings.testimonialTitle, "Database Expertise Testimonials");
    assert.equal(settings.testimonials[0]?.author, "Maya Smith");
    assert.equal(settings.engagementTitle, "Database Engagement Title");
    assert.equal(settings.engagementModels[0]?.title, "Dedicated");
    assert.equal(settings.techStackTitle, "Database Tech Stack Title");
    assert.equal(settings.techStackTabs[0]?.items[0]?.label, "TypeScript");
    assert.equal(settings.faqTitle, "Database Expertise FAQs");
    assert.equal(settings.faqs[0]?.answer, "With a structured discovery and delivery workflow.");
  });

  test("Our Expertise pages support deep section updates, navigation grouping, publish filtering, ordering, and delete", async () => {
    await ExpertisePageModel.create({
      slug: "custom-expertise-page",
      categoryKey: "software-solution",
      navLabel: "Custom Expertise Page",
      order: 0,
      isPublished: true,
      heroTitle: "Custom Expertise Hero",
      heroDescription: "Custom expertise hero description.",
      ctaButtonText: "Book Consultation",
      heroLogos: ["/images/logoipsum.png"],
      heroBackgroundImage: "/images/expertise-hero-bg.png",
      statsHighlights: [
        { value: "20+", label: "Years" },
        { value: "200+", label: "Experts" },
        { value: "99%", label: "On-Time" },
        { value: "5/5", label: "Rating" },
      ],
      statsTitle: "Custom Stats Title",
      statsDescription: "Custom stats description.",
      statsCards: [{ title: "Stat card one", description: "Stat card description" }],
      caseStudyTitle: "Custom Case Study Title",
      caseStudySubtitle: "Custom case study subtitle.",
      caseStudyTabs: [
        {
          id: "tab-1",
          title: "Case Tab",
          heading: "Case Heading",
          description: "Case description",
          features: ["Feature A"],
          cta1: "Read",
          cta2: "Explore",
          imageData: "/images/desktop.png",
          cta1Link: "/our-expertise/software-solution/custom-expertise-page",
          cta2Link: "/contact-us",
        },
      ],
      customTitle: "Custom Benefits Title",
      customSubtitle: "Custom benefits subtitle.",
      customButtonText: "Get Guidance",
      customButtonLink: "/contact-us",
      customImage: "/images/blobai.png",
      customImageAlt: "Custom image",
      customBenefits: [{ id: "benefit-1", number: "01", title: "Benefit one", description: "Benefit description" }],
      whyChooseTitle: "Why Choose Custom",
      whyChooseSubtitle: "Custom why choose subtitle.",
      whyChooseFeatures: [
        {
          id: "feature-1",
          title: "Feature one",
          description: "Feature description",
          icon: "/icons/diverse.svg",
          iconAlt: "Feature icon",
          iconWidth: 195,
          iconHeight: 195,
          iconRightClass: "right-6",
        },
      ],
      industriesTitle: "Custom Industries Title",
      industriesSubtitle: "Custom industries subtitle.",
      industriesItems: [{ id: "healthtech", name: "HealthTech", icon: "/icons/health.svg", iconAlt: "HealthTech", link: "/our-expertise/industries/healthtech" }],
      guideTitle: "Custom Guide Title",
      guideSubtitle: "Custom guide subtitle.",
      guideTabs: [{ key: "guide", label: "Guide Tab", section: "Guide section", items: [{ title: "Guide item", bullets: ["Bullet 1"] }] }],
      startTitle: "Custom Start Title",
      startSubtitle: "Custom start subtitle.",
      startButtonText: "Get Quote",
      startButtonLink: "/contact-us",
    });

    await ExpertisePageModel.create({
      slug: "draft-expertise-page",
      categoryKey: "software-solution",
      navLabel: "Draft Expertise Page",
      order: 99,
      isPublished: false,
      heroTitle: "Draft Hero",
      heroDescription: "Draft description",
      ctaButtonText: "Draft CTA",
      heroLogos: [],
      heroBackgroundImage: "/images/expertise-hero-bg.png",
      statsHighlights: [],
      statsTitle: "Draft stats",
      statsDescription: "Draft stats description",
      statsCards: [],
      caseStudyTitle: "Draft case",
      caseStudySubtitle: "Draft case subtitle",
      caseStudyTabs: [],
      customTitle: "Draft custom",
      customSubtitle: "Draft custom subtitle",
      customButtonText: "Draft button",
      customButtonLink: "/contact-us",
      customImage: "/images/blobai.png",
      customImageAlt: "Draft image",
      customBenefits: [],
      whyChooseTitle: "Draft why choose",
      whyChooseSubtitle: "Draft why choose subtitle",
      whyChooseFeatures: [],
      industriesTitle: "Draft industries",
      industriesSubtitle: "Draft industries subtitle",
      industriesItems: [],
      guideTitle: "Draft guide",
      guideSubtitle: "Draft guide subtitle",
      guideTabs: [],
      startTitle: "Draft start",
      startSubtitle: "Draft start subtitle",
      startButtonText: "Draft start button",
      startButtonLink: "/contact-us",
    });

    let publishedPages = await getPublishedExpertisePages();
    let adminPages = await getAdminExpertisePages();
    let navigation = await getPublishedExpertiseNavigation();

    assert.ok(publishedPages.some((page) => page.slug === "custom-expertise-page"));
    assert.ok(!publishedPages.some((page) => page.slug === "draft-expertise-page"));
    assert.ok(adminPages.some((page) => page.slug === "draft-expertise-page"));
    assert.equal(navigation[0]?.items[0]?.slug, "custom-expertise-page");

    await ExpertisePageModel.updateOne(
      { slug: "draft-expertise-page" },
      {
        $set: {
          isPublished: true,
          order: 0.5,
          heroTitle: "Updated Draft Expertise Hero",
          heroDescription: "Updated expertise description.",
          ctaButtonText: "Updated CTA",
          heroLogos: ["/images/logoipsum.png", "/images/logoipsum.png"],
          statsTitle: "Updated Stats",
          statsDescription: "Updated stats description.",
          statsCards: [{ title: "Updated stat card", description: "Updated stat description" }],
          caseStudyTitle: "Updated Case Study",
          caseStudySubtitle: "Updated case subtitle.",
          caseStudyTabs: [
            {
              id: "updated-tab",
              title: "Updated Tab",
              heading: "Updated Heading",
              description: "Updated description",
              features: ["Updated Feature"],
              cta1: "Read",
              cta2: "Explore",
              imageData: "/images/desktop.png",
              cta1Link: "/our-expertise/software-solution/draft-expertise-page",
              cta2Link: "/contact-us",
            },
          ],
          customTitle: "Updated Custom Title",
          customSubtitle: "Updated custom subtitle.",
          customButtonText: "Updated Guidance",
          customBenefits: [{ id: "benefit-1", number: "01", title: "Updated Benefit", description: "Updated benefit description" }],
          whyChooseTitle: "Updated Why Choose",
          whyChooseSubtitle: "Updated why choose subtitle.",
          whyChooseFeatures: [
            {
              id: "feature-1",
              title: "Updated Feature",
              description: "Updated feature description",
              icon: "/icons/diverse.svg",
              iconAlt: "Updated feature",
              iconWidth: 195,
              iconHeight: 195,
              iconRightClass: "right-6",
            },
          ],
          industriesTitle: "Updated Industries",
          industriesSubtitle: "Updated industries subtitle.",
          industriesItems: [{ id: "retail", name: "Retail", icon: "/icons/retail.svg", iconAlt: "Retail", link: "/our-expertise/industries/retail" }],
          guideTitle: "Updated Guide",
          guideSubtitle: "Updated guide subtitle.",
          guideTabs: [{ key: "updated-guide", label: "Updated Guide", section: "Updated section", items: [{ title: "Updated item", bullets: ["Updated bullet"] }] }],
          startTitle: "Updated Start Title",
          startSubtitle: "Updated start subtitle.",
          startButtonText: "Updated Start Button",
          startButtonLink: "/contact-us",
        },
      }
    );

    const updatedPage = await getPublishedExpertisePage("software-solution", "draft-expertise-page");
    publishedPages = await getPublishedExpertisePages();
    adminPages = await getAdminExpertisePages();
    navigation = await getPublishedExpertiseNavigation();

    assert.equal(updatedPage?.heroTitle, "Updated Draft Expertise Hero");
    assert.equal(updatedPage?.statsCards[0]?.title, "Updated stat card");
    assert.equal(updatedPage?.caseStudyTabs[0]?.title, "Updated Tab");
    assert.equal(updatedPage?.customBenefits[0]?.title, "Updated Benefit");
    assert.equal(updatedPage?.whyChooseFeatures[0]?.title, "Updated Feature");
    assert.equal(updatedPage?.industriesItems[0]?.name, "Retail");
    assert.equal(updatedPage?.guideTabs[0]?.label, "Updated Guide");
    assert.equal(updatedPage?.startTitle, "Updated Start Title");
    assert.ok(publishedPages.some((page) => page.slug === "draft-expertise-page"));
    assert.ok(adminPages.some((page) => page.slug === "draft-expertise-page"));
    assert.deepEqual(
      navigation.find((category) => category.key === "software-solution")?.items.slice(0, 2).map((item) => item.slug),
      ["custom-expertise-page", "draft-expertise-page"]
    );

    await ExpertisePageModel.deleteOne({ slug: "draft-expertise-page" });
    await ExpertisePageModel.deleteOne({ slug: "custom-expertise-page" });

    publishedPages = await getPublishedExpertisePages();
    adminPages = await getAdminExpertisePages();
    const overview = await getAdminOverview();
    assert.ok(!publishedPages.some((page) => page.slug === "draft-expertise-page"));
    assert.ok(!adminPages.some((page) => page.slug === "draft-expertise-page"));
    assert.ok(!adminPages.some((page) => page.slug === "custom-expertise-page"));
    assert.equal(adminPages.length, overview.stats.expertisePages);
  });

  test("Our Team page content and members come from database records", async () => {
    await SiteSettingsModel.updateOne(
      { key: "site-settings" },
      {
        $set: {
          "pageContent.team.heroTitle": "Database Team Hero",
          "pageContent.team.heroDescription": "Database-managed team hero text.",
          "pageContent.team.ctaTitle": "Database Team CTA",
          "pageContent.team.ctaDescription": "Database-managed consultation section.",
          "pageContent.team.ctaButtonLabel": "Talk to Team",
          "pageContent.team.ctaButtonHref": "/contact-us",
        },
      }
    );

    await TeamMemberModel.create({
      name: "Database Team Member",
      slug: "database-team-member",
      role: "Backend Engineer",
      focus: "Owns APIs and database workflows.",
      initials: "DT",
      accent: "linear-gradient(135deg, rgba(56,158,255,0.4), rgba(212,33,144,0.2))",
      imageData: "",
      order: 99,
      isPublished: true,
    });

    const settings = await getSiteSettings();
    const members = await getPublishedTeamMembers();

    assert.equal(settings.pageContent.team.heroTitle, "Database Team Hero");
    assert.equal(settings.pageContent.team.ctaButtonLabel, "Talk to Team");
    assert.ok(members.some((member) => member.slug === "database-team-member"));
  });

  test("Internship Alumni section supports create, publish update, and delete through MongoDB", async () => {
    await InternModel.create({
      name: "Draft Intern",
      slug: "draft-intern",
      role: "QA Intern",
      duration: "Jan 2026 - Mar 2026",
      award: "Silver",
      certificateId: "AXAON/INT/TEST/01",
      program: "3 Months Program",
      track: "QA",
      initials: "DI",
      accent: "",
      imageData: "",
      order: 77,
      isPublished: false,
    });

    let interns = await getPublishedInterns();
    assert.ok(!interns.some((intern) => intern.slug === "draft-intern"));

    await InternModel.updateOne({ slug: "draft-intern" }, { $set: { isPublished: true, track: "Automation QA" } });

    interns = await getPublishedInterns();
    assert.ok(interns.some((intern) => intern.slug === "draft-intern" && intern.track === "Automation QA"));

    await InternModel.deleteOne({ slug: "draft-intern" });

    interns = await getPublishedInterns();
    assert.ok(!interns.some((intern) => intern.slug === "draft-intern"));
  });

  test("Portfolio section stores detail-page content, result stats, and gallery images in MongoDB", async () => {
    await PortfolioProjectModel.create({
      title: "Database Portfolio Project",
      slug: "database-portfolio-project",
      summary: "Database-managed summary.",
      industry: "Fintech",
      engagement: "Product Design",
      timeline: "6 weeks",
      outcome: "+12% retention",
      tags: ["Dashboard", "Fintech"],
      objective: "Database objective",
      objectivePoints: ["Point one", "Point two"],
      solutionPoints: ["Solution one", "Solution two"],
      resultPrimaryValue: "12%",
      resultPrimaryLabel: "Retention Growth",
      resultSecondaryValue: "18%",
      resultSecondaryLabel: "Ops Efficiency",
      resultBullets: ["Bullet one", "Bullet two"],
      galleryImageOne: "data:image/png;base64,one",
      galleryImageTwo: "data:image/png;base64,two",
      galleryImageThree: "data:image/png;base64,three",
      galleryImageFour: "data:image/png;base64,four",
      accent: "",
      imageData: "data:image/png;base64,cover",
      order: 90,
      isPublished: true,
    });

    const project = await getPublishedPortfolioProjectBySlug("database-portfolio-project");
    const projects = await getPublishedPortfolioProjects();

    assert.ok(project);
    assert.equal(project?.objective, "Database objective");
    assert.equal(project?.resultPrimaryLabel, "Retention Growth");
    assert.equal(project?.galleryImageFour, "data:image/png;base64,four");
    assert.ok(projects.some((item) => item.slug === "database-portfolio-project"));
  });

  test("Career section stores jobs and applications in MongoDB", async () => {
    await JobOpeningModel.create({
      company: "Test Company",
      title: "Platform Engineer",
      slug: "platform-engineer",
      type: "Full Time",
      mode: "Remote",
      salary: "INR 100000",
      posted: "Mar 31, 2026",
      location: "Remote",
      overview: "Database-managed job overview.",
      responsibilities: ["Build systems"],
      requirements: ["Strong TypeScript"],
      benefits: ["Remote work"],
      accent: "",
      imageData: "",
      order: 80,
      isPublished: true,
    });

    await JobApplicationModel.create({
      jobSlug: "platform-engineer",
      jobTitle: "Platform Engineer",
      company: "Test Company",
      fullName: "Job Applicant",
      email: "applicant@example.com",
      phone: "1234567890",
      location: "Dhaka",
      linkedInUrl: "https://linkedin.com/in/test-applicant",
      portfolioUrl: "https://example.com",
      cvDriveLink: "https://drive.google.com/test-cv",
      coverLetter: "Interested in the role.",
      status: "new",
    });

    const job = await getPublishedJobBySlug("platform-engineer");
    const jobs = await getPublishedJobs();
    const applications = await getAdminJobApplications();

    assert.ok(job);
    assert.equal(job?.mode, "Remote");
    assert.ok(jobs.some((item) => item.slug === "platform-engineer"));
    assert.ok(applications.some((application) => application.jobSlug === "platform-engineer"));
  });

  test("Blog & Articles section stores featured posts, categories, and detail content in MongoDB", async () => {
    await BlogPostModel.updateMany({}, { $set: { featured: false } });

    await BlogPostModel.create({
      title: "Database Blog Post",
      slug: "database-blog-post",
      excerpt: "Database-managed excerpt.",
      content: "Paragraph one.\n\nParagraph two.",
      author: "Test Author",
      readTime: "3 min read",
      category: "Testing",
      featured: true,
      accent: "",
      imageData: "",
      order: 50,
      isPublished: true,
    });

    const featuredPost = await getPublishedFeaturedBlogPost();
    const blogPost = await getPublishedBlogPostBySlug("database-blog-post");
    const posts = await getPublishedBlogPosts();
    const categories = await getBlogCategories();

    assert.equal(featuredPost?.slug, "database-blog-post");
    assert.equal(blogPost?.author, "Test Author");
    assert.ok(posts.some((post) => post.slug === "database-blog-post"));
    assert.ok(categories.includes("Testing"));
  });

  test("Technologies section stores landing page and detail-page section content in MongoDB", async () => {
    await TechnologyPageModel.updateOne({ slug: "node-js" }, { $set: { isLanding: false } });

    await TechnologyPageModel.create({
      slug: "rust",
      category: "backend",
      order: 99,
      isPublished: true,
      isLanding: true,
      heroSubtitle: "Memory-safe systems programming",
      heroTitle: "Rust Development Services",
      heroDescription: "Database-managed rust hero.",
      heroPrimaryButtonLabel: "Start Rust Project",
      heroPrimaryButtonHref: "/contact-us",
      heroSecondaryButtonLabel: "Talk to Rust Expert",
      heroSecondaryButtonHref: "/contact-us",
      heroLogos: [{ label: "Rust Logo", imageData: "/images/logoipsum.png", href: "#" }],
      challengesTitle: "Rust challenge section",
      challengeCards: [
        { title: "Challenge One", description: "Desc one", imageData: "/images/thread.svg", linkLabel: "Learn More" },
        { title: "Challenge Two", description: "Desc two", imageData: "/images/thread.svg", linkLabel: "" },
        { title: "Challenge Three", description: "Desc three", imageData: "/images/thread.svg", linkLabel: "" },
        { title: "Challenge Four", description: "Desc four", imageData: "/images/thread.svg", linkLabel: "" },
      ],
      unlockTitle: "Unlock Rust performance",
      unlockButtonLabel: "Connect",
      unlockButtonHref: "/contact-us",
      talkTitle: "Talk section",
      talkButtonLabel: "Talk",
      talkButtonHref: "/contact-us",
      talkCards: Array.from({ length: 4 }, (_, index) => ({ title: `Talk ${index + 1}`, description: `Talk description ${index + 1}` })),
      successTitle: "Success section",
      successCards: Array.from({ length: 9 }, (_, index) => ({ title: `Success ${index + 1}`, description: `Success description ${index + 1}` })),
      provenTitle: "Proven section",
      provenDescription: "Proven description",
      provenCaseStudies: Array.from({ length: 5 }, (_, index) => ({
        title: `Case ${index + 1}`,
        description: `Case description ${index + 1}`,
        imageData: "/images/phone.png",
        featuresLeft: ["Left one", "Left two"],
        featuresRight: ["Right one", "Right two"],
      })),
      guidanceTitle: "Guidance title",
      guidanceButtonLabel: "Guidance Button",
      guidanceButtonHref: "/contact-us",
      qualityEyebrow: "Quality eyebrow",
      qualityTitle: "Quality title",
      qualityDescription: "Quality description",
      qualityPoints: Array.from({ length: 8 }, (_, index) => ({ title: `Point ${index + 1}`, description: `Point description ${index + 1}` })),
      stackTitle: "Stack title",
      stackItems: Array.from({ length: 10 }, (_, index) => ({ label: `Stack ${index + 1}`, imageData: "/images/jest.svg" })),
      leaderTitle: "Leader title",
      leaderStats: Array.from({ length: 5 }, (_, index) => ({ value: `${index + 1}`, label: `Stat ${index + 1}` })),
      engagementTitle: "Engagement title",
      engagementDescription: "Engagement description",
      engagementModels: Array.from({ length: 3 }, (_, index) => ({ title: `Model ${index + 1}`, description: `Model description ${index + 1}`, bullets: ["A", "B"] })),
      faqTitle: "FAQ title",
      faqs: Array.from({ length: 5 }, (_, index) => ({ question: `Question ${index + 1}?`, answer: `Answer ${index + 1}` })),
    });

    const landingPage = await getLandingTechnologyPage();
    const detailPage = await getPublishedTechnologyPage("backend", "rust");
    const pages = await getAdminTechnologyPages();

    assert.equal(landingPage?.slug, "rust");
    assert.equal(detailPage?.heroTitle, "Rust Development Services");
    assert.equal(detailPage?.challengeCards[0]?.title, "Challenge One");
    assert.equal(detailPage?.stackItems[0]?.label, "Stack 1");
    assert.ok(pages.some((page) => page.slug === "rust"));
  });

  test("Technologies seed creates admin-manageable content for every visible section block", async () => {
    const landingPage = await getLandingTechnologyPage();
    const adminPages = await getAdminTechnologyPages();
    const overview = await getAdminOverview();

    assert.ok(landingPage);
    assert.equal(adminPages.length, overview.stats.technologies);
    assert.ok(adminPages.length >= 20);
    assert.equal(landingPage?.heroLogos.length, 7);
    assert.equal(landingPage?.challengeCards.length, 4);
    assert.equal(landingPage?.talkCards.length, 4);
    assert.equal(landingPage?.successCards.length, 9);
    assert.equal(landingPage?.provenCaseStudies.length, 5);
    assert.equal(landingPage?.qualityPoints.length, 8);
    assert.equal(landingPage?.stackItems.length, 10);
    assert.equal(landingPage?.leaderStats.length, 5);
    assert.equal(landingPage?.engagementModels.length, 3);
    assert.equal(landingPage?.faqs.length, 5);
  });

  test("Technologies updates persist across hero, cards, case studies, stack, stats, engagement, and faq sections", async () => {
    await TechnologyPageModel.updateOne(
      { slug: "node-js" },
      {
        $set: {
          heroSubtitle: "Updated subtitle",
          heroTitle: "Updated Node Hero",
          heroDescription: "Updated hero description",
          heroPrimaryButtonLabel: "Primary CTA",
          heroPrimaryButtonHref: "/primary-cta",
          heroSecondaryButtonLabel: "Secondary CTA",
          heroSecondaryButtonHref: "/secondary-cta",
          heroLogos: [
            { label: "Updated Logo", imageData: "data:image/png;base64,logo", href: "/logo-link" },
            { label: "Updated Logo 2", imageData: "/images/logoipsum.png", href: "#" },
            { label: "Updated Logo 3", imageData: "/images/logoipsum.png", href: "#" },
            { label: "Updated Logo 4", imageData: "/images/logoipsum.png", href: "#" },
            { label: "Updated Logo 5", imageData: "/images/logoipsum.png", href: "#" },
            { label: "Updated Logo 6", imageData: "/images/logoipsum.png", href: "#" },
            { label: "Updated Logo 7", imageData: "/images/logoipsum.png", href: "#" },
          ],
          challengesTitle: "Updated challenges title",
          challengeCards: Array.from({ length: 4 }, (_, index) => ({
            title: `Challenge ${index + 1}`,
            description: `Challenge description ${index + 1}`,
            imageData: "/images/thread.svg",
            linkLabel: index === 0 ? "Read More" : "",
          })),
          unlockTitle: "Updated unlock title",
          unlockButtonLabel: "Unlock CTA",
          unlockButtonHref: "/unlock",
          talkTitle: "Updated talk title",
          talkButtonLabel: "Talk CTA",
          talkButtonHref: "/talk",
          talkCards: Array.from({ length: 4 }, (_, index) => ({ title: `Talk card ${index + 1}`, description: `Talk card description ${index + 1}` })),
          successTitle: "Updated success title",
          successCards: Array.from({ length: 9 }, (_, index) => ({ title: `Success card ${index + 1}`, description: `Success card description ${index + 1}` })),
          provenTitle: "Updated proven title",
          provenDescription: "Updated proven description",
          provenCaseStudies: Array.from({ length: 5 }, (_, index) => ({
            title: `Case study ${index + 1}`,
            description: `Case study description ${index + 1}`,
            imageData: "/images/phone.png",
            featuresLeft: [`Left ${index + 1}a`, `Left ${index + 1}b`],
            featuresRight: [`Right ${index + 1}a`, `Right ${index + 1}b`],
          })),
          guidanceTitle: "Updated guidance title",
          guidanceButtonLabel: "Guidance CTA",
          guidanceButtonHref: "/guidance",
          qualityEyebrow: "Updated quality eyebrow",
          qualityTitle: "Updated quality title",
          qualityDescription: "Updated quality description",
          qualityPoints: Array.from({ length: 8 }, (_, index) => ({ title: `Quality point ${index + 1}`, description: `Quality point description ${index + 1}` })),
          stackTitle: "Updated stack title",
          stackItems: Array.from({ length: 10 }, (_, index) => ({ label: `Stack item ${index + 1}`, imageData: "/images/jest.svg" })),
          leaderTitle: "Updated leader title",
          leaderStats: Array.from({ length: 5 }, (_, index) => ({ value: `V${index + 1}`, label: `Leader stat ${index + 1}` })),
          engagementTitle: "Updated engagement title",
          engagementDescription: "Updated engagement description",
          engagementModels: Array.from({ length: 3 }, (_, index) => ({
            title: `Engagement model ${index + 1}`,
            description: `Engagement description ${index + 1}`,
            bullets: [`Bullet ${index + 1}a`, `Bullet ${index + 1}b`],
          })),
          faqTitle: "Updated faq title",
          faqs: Array.from({ length: 5 }, (_, index) => ({ question: `Updated question ${index + 1}?`, answer: `Updated answer ${index + 1}` })),
        },
      }
    );

    const page = await getPublishedTechnologyPage("backend", "node-js");

    assert.ok(page);
    assert.equal(page?.heroTitle, "Updated Node Hero");
    assert.equal(page?.heroPrimaryButtonHref, "/primary-cta");
    assert.equal(page?.heroLogos[0]?.label, "Updated Logo");
    assert.equal(page?.challengesTitle, "Updated challenges title");
    assert.equal(page?.challengeCards[0]?.title, "Challenge 1");
    assert.equal(page?.unlockButtonHref, "/unlock");
    assert.equal(page?.talkCards[0]?.title, "Talk card 1");
    assert.equal(page?.successCards[0]?.title, "Success card 1");
    assert.equal(page?.provenCaseStudies[0]?.title, "Case study 1");
    assert.equal(page?.guidanceButtonHref, "/guidance");
    assert.equal(page?.qualityPoints[0]?.title, "Quality point 1");
    assert.equal(page?.stackItems[0]?.label, "Stack item 1");
    assert.equal(page?.leaderStats[0]?.label, "Leader stat 1");
    assert.equal(page?.engagementModels[0]?.title, "Engagement model 1");
    assert.equal(page?.faqs[0]?.question, "Updated question 1?");
  });

  test("Technologies publish state and deletion work correctly in database reads", async () => {
    await TechnologyPageModel.create({
      slug: "draft-tech",
      category: "backend",
      order: 120,
      isPublished: false,
      isLanding: false,
      heroSubtitle: "Draft subtitle",
      heroTitle: "Draft Technology",
      heroDescription: "Draft description",
      heroPrimaryButtonLabel: "Primary",
      heroPrimaryButtonHref: "/contact-us",
      heroSecondaryButtonLabel: "Secondary",
      heroSecondaryButtonHref: "/contact-us",
      heroLogos: Array.from({ length: 7 }, () => ({ label: "Logo", imageData: "/images/logoipsum.png", href: "#" })),
      challengesTitle: "Challenges",
      challengeCards: Array.from({ length: 4 }, () => ({ title: "Challenge", description: "Desc", imageData: "/images/thread.svg", linkLabel: "" })),
      unlockTitle: "Unlock",
      unlockButtonLabel: "Unlock",
      unlockButtonHref: "/contact-us",
      talkTitle: "Talk",
      talkButtonLabel: "Talk",
      talkButtonHref: "/contact-us",
      talkCards: Array.from({ length: 4 }, () => ({ title: "Talk", description: "Desc" })),
      successTitle: "Success",
      successCards: Array.from({ length: 9 }, () => ({ title: "Success", description: "Desc" })),
      provenTitle: "Proven",
      provenDescription: "Desc",
      provenCaseStudies: Array.from({ length: 5 }, () => ({ title: "Case", description: "Desc", imageData: "/images/phone.png", featuresLeft: ["L"], featuresRight: ["R"] })),
      guidanceTitle: "Guidance",
      guidanceButtonLabel: "Guidance",
      guidanceButtonHref: "/contact-us",
      qualityEyebrow: "Eyebrow",
      qualityTitle: "Quality",
      qualityDescription: "Desc",
      qualityPoints: Array.from({ length: 8 }, () => ({ title: "Point", description: "Desc" })),
      stackTitle: "Stack",
      stackItems: Array.from({ length: 10 }, () => ({ label: "Stack", imageData: "/images/jest.svg" })),
      leaderTitle: "Leader",
      leaderStats: Array.from({ length: 5 }, () => ({ value: "1", label: "Stat" })),
      engagementTitle: "Engagement",
      engagementDescription: "Desc",
      engagementModels: Array.from({ length: 3 }, () => ({ title: "Model", description: "Desc", bullets: ["A"] })),
      faqTitle: "Faq",
      faqs: Array.from({ length: 5 }, () => ({ question: "Q?", answer: "A" })),
    });

    let publishedPage = await getPublishedTechnologyPage("backend", "draft-tech");
    let adminPages = await getAdminTechnologyPages();

    assert.equal(publishedPage, null);
    assert.ok(adminPages.some((page) => page.slug === "draft-tech"));

    await TechnologyPageModel.updateOne({ slug: "draft-tech" }, { $set: { isPublished: true } });

    publishedPage = await getPublishedTechnologyPage("backend", "draft-tech");
    assert.equal(publishedPage?.heroTitle, "Draft Technology");

    await TechnologyPageModel.deleteOne({ slug: "draft-tech" });

    adminPages = await getAdminTechnologyPages();
    publishedPage = await getPublishedTechnologyPage("backend", "draft-tech");
    assert.equal(publishedPage, null);
    assert.ok(!adminPages.some((page) => page.slug === "draft-tech"));
  });
});
