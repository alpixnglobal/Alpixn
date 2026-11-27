"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { requireAdminSession, signInAdmin, signOutAdmin } from "@/lib/admin-auth";
import { connectToDatabase } from "@/lib/db";
import { CONTACT_TO_EMAIL, HR_TO_EMAIL, isMailConfigured, sendContactEnquiryEmail, sendRowsEmail } from "@/lib/mailer";
import { getPublishedJobBySlug } from "@/lib/content-service";
import { normalizeBase64Image } from "@/lib/image-data";
import {
  AboutSettingsModel,
  BlogPostModel,
  ContactMessageModel,
  ContactSettingsModel,
  ExpertisePageModel,
  ExpertiseSettingsModel,
  ResourceUiSettingsModel,
  HomeSettingsModel,
  InternModel,
  JobApplicationModel,
  JobOpeningModel,
  OffshoreDeveloperPageModel,
  OffshoreDeveloperSettingsModel,
  ProductPageModel,
  ProductSettingsModel,
  PortfolioProjectModel,
  SiteSettingsModel,
  TeamMemberModel,
  TechnologyPageModel,
} from "@/lib/models";
import { createSlugForModel, ensureSeedData } from "@/lib/content-service";
import { readingTime } from "@/lib/blog/types";

type EntityType = "intern" | "team" | "portfolio" | "job" | "blog" | "technology" | "product" | "offshore" | "expertise";

function getValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function getOptionalValue(formData: FormData, key: string) {
  const value = getValue(formData, key);
  return value || "";
}

/** "Label | https://url" per line → validated source list (http/https only, max 20). */
function parseBlogSources(raw: string) {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, ...rest] = line.split("|");
      const url = rest.join("|").trim();
      return { label: label.trim().slice(0, 200), url };
    })
    .filter((source) => source.label && /^https?:\/\/[^\s]+$/i.test(source.url))
    .slice(0, 20);
}

const PORTFOLIO_STATUSES = new Set(["real", "concept", "unverified"]);

/** Validated portfolio verification/discovery fields from the admin form. */
function getPortfolioDiscoveryPayload(formData: FormData) {
  const status = getOptionalValue(formData, "verificationStatus");
  const liveUrl = getOptionalValue(formData, "liveUrl");
  const demoPath = getOptionalValue(formData, "demoPath");
  const csv = (key: string) =>
    getOptionalValue(formData, key)
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean)
      .slice(0, 20);
  const lines = (key: string) =>
    getOptionalValue(formData, key)
      .split("\n")
      .map((v) => v.trim())
      .filter(Boolean)
      .slice(0, 20);
  return {
    verificationStatus: PORTFOLIO_STATUSES.has(status) ? status : "unverified",
    country: getOptionalValue(formData, "country").slice(0, 80),
    currency: getOptionalValue(formData, "currency").toUpperCase().slice(0, 3),
    projectTypes: csv("projectTypes"),
    techStack: csv("techStack"),
    featured: getBooleanValue(formData, "featured"),
    // Only https URLs are accepted for live links; demo paths must stay on this site.
    liveUrl: /^https:\/\/[^\s]+$/i.test(liveUrl) ? liveUrl.slice(0, 300) : "",
    demoPath: /^\/demos\/[a-z0-9-]+$/.test(demoPath) ? demoPath : "",
    problem: getOptionalValue(formData, "problem").slice(0, 2000),
    approach: getOptionalValue(formData, "approach").slice(0, 2000),
    features: lines("features"),
    highlights: lines("highlights"),
  };
}

function normaliseIsoDate(value: string) {
  if (!value) return new Date().toISOString().slice(0, 10);
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString().slice(0, 10) : date.toISOString().slice(0, 10);
}

function slugifyValue(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120);
}

function getNumberValue(formData: FormData, key: string, fallback = 0) {
  const value = Number(getValue(formData, key));
  return Number.isFinite(value) ? value : fallback;
}

function getBooleanValue(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function getListValue(formData: FormData, key: string) {
  return getValue(formData, key)
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function getIndexedValue(formData: FormData, key: string, index: number) {
  return getValue(formData, `${key}${index}`);
}

function getIndexedOptionalValue(formData: FormData, key: string, index: number) {
  return getOptionalValue(formData, `${key}${index}`);
}

function buildSharedStatsPayload(formData: FormData) {
  const indexedCount = getNumberValue(formData, "sharedStatsCount", 0);

  if (indexedCount > 0) {
    return Array.from({ length: indexedCount }, (_, index) => ({
      value: getIndexedValue(formData, "sharedStatValue", index),
      label: getIndexedValue(formData, "sharedStatLabel", index),
    })).filter((item) => item.value || item.label);
  }

  return parseJsonField(formData, "sharedStats", []).filter(
    (item: { value?: string; label?: string }) => (item.value ?? "").trim() || (item.label ?? "").trim()
  );
}

function buildSimpleCards(formData: FormData, prefix: string, count: number) {
  return Array.from({ length: count }, (_, index) => ({
    title: getIndexedValue(formData, `${prefix}Title`, index),
    description: getIndexedValue(formData, `${prefix}Description`, index),
  }));
}

async function buildLogoItems(formData: FormData, count: number) {
  const items = await Promise.all(
    Array.from({ length: count }, async (_, index) => ({
      label: getIndexedValue(formData, "heroLogoLabel", index),
      imageData: await getProcessedImage(formData, `heroLogoImage${index}`),
      href: getIndexedOptionalValue(formData, "heroLogoHref", index) || "#",
    }))
  );

  return items.filter((item) => item.label || item.imageData || item.href !== "#");
}

async function buildChallengeCards(formData: FormData, count: number) {
  const items = await Promise.all(
    Array.from({ length: count }, async (_, index) => ({
      title: getIndexedValue(formData, "challengeCardTitle", index),
      description: getIndexedValue(formData, "challengeCardDescription", index),
      imageData: await getProcessedImage(formData, `challengeCardImage${index}`),
      linkLabel: getIndexedOptionalValue(formData, "challengeCardLinkLabel", index),
    }))
  );

  return items;
}

async function buildCaseStudies(formData: FormData, count: number) {
  const items = await Promise.all(
    Array.from({ length: count }, async (_, index) => ({
      title: getIndexedValue(formData, "caseStudyTitle", index),
      description: getIndexedValue(formData, "caseStudyDescription", index),
      imageData: await getProcessedImage(formData, `caseStudyImage${index}`),
      featuresLeft: getIndexedValue(formData, "caseStudyFeaturesLeft", index)
        .split(/[,\n]/)
        .map((item) => item.trim())
        .filter(Boolean),
      featuresRight: getIndexedValue(formData, "caseStudyFeaturesRight", index)
        .split(/[,\n]/)
        .map((item) => item.trim())
        .filter(Boolean),
    }))
  );

  return items;
}

async function buildStackItems(formData: FormData, count: number) {
  const items = await Promise.all(
    Array.from({ length: count }, async (_, index) => ({
      label: getIndexedValue(formData, "stackItemLabel", index),
      imageData: await getProcessedImage(formData, `stackItemImage${index}`),
    }))
  );

  return items;
}

function buildStats(formData: FormData, count: number) {
  return Array.from({ length: count }, (_, index) => ({
    value: getIndexedValue(formData, "leaderStatValue", index),
    label: getIndexedValue(formData, "leaderStatLabel", index),
  }));
}

function buildEngagementModels(formData: FormData, count: number) {
  return Array.from({ length: count }, (_, index) => ({
    title: getIndexedValue(formData, "engagementModelTitle", index),
    description: getIndexedValue(formData, "engagementModelDescription", index),
    bullets: getIndexedValue(formData, "engagementModelBullets", index)
      .split(/[,\n]/)
      .map((item) => item.trim())
      .filter(Boolean),
  }));
}

function buildFaqItems(formData: FormData, count: number) {
  return Array.from({ length: count }, (_, index) => ({
    question: getIndexedValue(formData, "faqQuestion", index),
    answer: getIndexedValue(formData, "faqAnswer", index),
  }));
}

async function buildProductFeatureCards(formData: FormData, count: number) {
  return Promise.all(
    Array.from({ length: count }, async (_, index) => ({
      title: getIndexedValue(formData, "featureCardTitle", index),
      description: getIndexedValue(formData, "featureCardDescription", index),
      imageData: await getProcessedImage(formData, `featureCardImage${index}`),
      buttonLabel: getIndexedOptionalValue(formData, "featureCardButtonLabel", index) || "View Full Details",
      buttonHref: getIndexedOptionalValue(formData, "featureCardButtonHref", index) || "#",
    }))
  );
}

async function buildProductAudienceCards(formData: FormData, count: number) {
  return Promise.all(
    Array.from({ length: count }, async (_, index) => ({
      title: getIndexedValue(formData, "audienceCardTitle", index),
      description: getIndexedValue(formData, "audienceCardDescription", index),
      imageData: await getProcessedImage(formData, `audienceCardImage${index}`),
    }))
  );
}

function buildProductFaqItems(formData: FormData, count: number) {
  return Array.from({ length: count }, (_, index) => ({
    question: getIndexedValue(formData, "productFaqQuestion", index),
    answer: getIndexedValue(formData, "productFaqAnswer", index),
  }));
}

async function buildProductFeatureCardsPayload(formData: FormData) {
  if (formData.get("featureCards") !== null) {
    const rawCards = parseJsonField<Array<Record<string, unknown>>>(formData, "featureCards", []);
    const processedCards = await processNestedImages(rawCards, ["imageData"]);

    return processedCards
      .map((card) => ({
        title: String(card.title ?? "").trim(),
        description: String(card.description ?? "").trim(),
        imageData: String(card.imageData ?? "").trim(),
        buttonLabel: String(card.buttonLabel ?? "").trim() || "View Full Details",
        buttonHref: String(card.buttonHref ?? "").trim() || "#",
      }))
      .filter(
        (card) =>
          card.title ||
          card.description ||
          card.imageData ||
          card.buttonLabel !== "View Full Details" ||
          card.buttonHref !== "#"
      );
  }

  return buildProductFeatureCards(formData, 3);
}

async function buildProductAudienceCardsPayload(formData: FormData) {
  if (formData.get("audienceCards") !== null) {
    const rawCards = parseJsonField<Array<Record<string, unknown>>>(formData, "audienceCards", []);
    const processedCards = await processNestedImages(rawCards, ["imageData"]);

    return processedCards
      .map((card) => ({
        title: String(card.title ?? "").trim(),
        description: String(card.description ?? "").trim(),
        imageData: String(card.imageData ?? "").trim(),
      }))
      .filter((card) => card.title || card.description || card.imageData);
  }

  return buildProductAudienceCards(formData, 4);
}

function buildProductFaqItemsPayload(formData: FormData) {
  if (formData.get("faqs") !== null) {
    const rawFaqs = parseJsonField<Array<Record<string, unknown>>>(formData, "faqs", []);

    return rawFaqs
      .map((faq) => ({
        question: String(faq.question ?? "").trim(),
        answer: String(faq.answer ?? "").trim(),
      }))
      .filter((faq) => faq.question || faq.answer);
  }

  return buildProductFaqItems(formData, 6);
}

function parseJsonField<T>(formData: FormData, key: string, fallback: T): T {
  const value = getOptionalValue(formData, key);

  if (!value) {
    return fallback;
  }

  return JSON.parse(value) as T;
}

async function getProcessedImage(formData: FormData, key = "imageData") {
  const rawImage = getOptionalValue(formData, key);
  return normalizeBase64Image(rawImage);
}

// Process images nested inside JSON arrays (for industries, tech stack, etc.)
async function processNestedImages<T extends Record<string, unknown>>(
  items: T[],
  imageFields: (keyof T)[]
): Promise<T[]> {
  return Promise.all(
    items.map(async (item) => {
      const processed = { ...item };
      for (const field of imageFields) {
        const value = item[field];
        if (typeof value === "string" && value) {
          (processed as Record<string, unknown>)[field as string] = await normalizeBase64Image(value);
        }
      }
      return processed;
    })
  );
}

async function processImageStrings(values: string[]) {
  return Promise.all(values.map((value) => normalizeBase64Image(String(value ?? ""))));
}

// Process industries tabs with nested items that have icons
async function processIndustriesTabs(tabs: { id: string; label: string; tabIconUrl?: string; items: { title: string; iconUrl?: string }[] }[]) {
  return Promise.all(
    tabs.map(async (tab) => ({
      ...tab,
      tabIconUrl: tab.tabIconUrl ? await normalizeBase64Image(tab.tabIconUrl) : "",
      items: await processNestedImages(tab.items, ["iconUrl"]),
    }))
  );
}

// Process tech stack tabs with nested items that have images
async function processTechStackTabs(tabs: { name: string; value: string; items: { label: string; imageData: string }[] }[]) {
  return Promise.all(
    tabs.map(async (tab) => ({
      ...tab,
      items: await processNestedImages(tab.items, ["imageData"]),
    }))
  );
}

function revalidatePublicRoutes() {
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/our-expertise");
  revalidatePath("/offshore-developer");
  revalidatePath("/products");
  revalidatePath("/resources");
  revalidatePath("/resources/interns-alumni");
  revalidatePath("/resources/our-team");
  revalidatePath("/resources/portfolio");
  revalidatePath("/resources/careers");
  revalidatePath("/resources/blogs");
  revalidatePath("/technologies");
}

async function ensureDatabaseForAction(errorRedirectPath: string) {
  try {
    await connectToDatabase();
    await ensureSeedData();
  } catch {
    redirect(`${errorRedirectPath}${errorRedirectPath.includes("?") ? "&" : "?"}error=${encodeURIComponent("Database unavailable. Check MongoDB connection.")}`);
  }
}

export async function loginAdminAction(formData: FormData) {
  const email = getValue(formData, "email");
  const password = getValue(formData, "password");

  const success = await signInAdmin(email, password);

  if (!success) {
    redirect("/admin/login?error=Invalid%20email%20or%20password");
  }

  redirect("/admin");
}

export async function logoutAdminAction() {
  await signOutAdmin();
  redirect("/admin/login");
}

export async function upsertEntityAction(entityType: EntityType, returnPath: string, formData: FormData) {
  await requireAdminSession();
  await ensureDatabaseForAction(returnPath);

  const id = getOptionalValue(formData, "id");
  const order = getNumberValue(formData, "order", 0);
  const isPublished = getBooleanValue(formData, "isPublished");
  const imageData = await getProcessedImage(formData);
  let technologyPath: string | null = null;
  let productPath: string | null = null;
  let offshorePath: string | null = null;
  let expertisePath: string | null = null;

  if (entityType === "expertise") {
    const navLabel = getValue(formData, "navLabel");
    const slug = await createSlugForModel(
      ExpertisePageModel,
      getOptionalValue(formData, "slug") || navLabel || getValue(formData, "heroTitle"),
      id || undefined
    );

    const rawHeroLogos = parseJsonField<string[]>(formData, "heroLogos", []);
    const rawCaseStudyTabs = parseJsonField<Array<Record<string, unknown> & { imageData?: string }>>(formData, "caseStudyTabs", []);
    const rawWhyChooseFeatures = parseJsonField<Array<Record<string, unknown> & { icon?: string }>>(formData, "whyChooseFeatures", []);
    const rawIndustriesItems = parseJsonField<Array<Record<string, unknown> & { icon?: string }>>(formData, "industriesItems", []);

    const [heroLogos, heroBackgroundImage, caseStudyTabs, customImage, whyChooseFeatures, industriesItems] = await Promise.all([
      processImageStrings(rawHeroLogos),
      getProcessedImage(formData, "heroBackgroundImage"),
      processNestedImages(rawCaseStudyTabs, ["imageData"]),
      getProcessedImage(formData, "customImage"),
      processNestedImages(rawWhyChooseFeatures, ["icon"]),
      processNestedImages(rawIndustriesItems, ["icon"]),
    ]);

    const payload = {
      slug,
      categoryKey: getValue(formData, "categoryKey"),
      navLabel,
      order,
      isPublished,
      heroTitle: getValue(formData, "heroTitle"),
      heroDescription: getValue(formData, "heroDescription"),
      ctaButtonText: getValue(formData, "ctaButtonText"),
      heroLogos,
      heroBackgroundImage,
      statsHighlights: parseJsonField(formData, "statsHighlights", []),
      statsTitle: getValue(formData, "statsTitle"),
      statsDescription: getValue(formData, "statsDescription"),
      statsCards: parseJsonField(formData, "statsCards", []),
      caseStudyTitle: getValue(formData, "caseStudyTitle"),
      caseStudySubtitle: getValue(formData, "caseStudySubtitle"),
      caseStudyTabs,
      customTitle: getValue(formData, "customTitle"),
      customSubtitle: getValue(formData, "customSubtitle"),
      customButtonText: getValue(formData, "customButtonText"),
      customButtonLink: getValue(formData, "customButtonLink"),
      customImage,
      customImageAlt: getValue(formData, "customImageAlt"),
      customBenefits: parseJsonField(formData, "customBenefits", []),
      whyChooseTitle: getValue(formData, "whyChooseTitle"),
      whyChooseSubtitle: getValue(formData, "whyChooseSubtitle"),
      whyChooseFeatures,
      industriesTitle: getValue(formData, "industriesTitle"),
      industriesSubtitle: getValue(formData, "industriesSubtitle"),
      industriesItems,
      guideTitle: getValue(formData, "guideTitle"),
      guideSubtitle: getValue(formData, "guideSubtitle"),
      guideTabs: parseJsonField(formData, "guideTabs", []),
      startTitle: getValue(formData, "startTitle"),
      startSubtitle: getValue(formData, "startSubtitle"),
      startButtonText: getValue(formData, "startButtonText"),
      startButtonLink: getValue(formData, "startButtonLink"),
    };

    if (id) {
      await ExpertisePageModel.findByIdAndUpdate(id, payload);
    } else {
      await ExpertisePageModel.create(payload);
    }

    expertisePath = `/our-expertise/${payload.categoryKey}/${payload.slug}`;
  }

  if (entityType === "offshore") {
    const navLabel = getValue(formData, "navLabel");
    const slug = await createSlugForModel(
      OffshoreDeveloperPageModel,
      getOptionalValue(formData, "slug") || navLabel || getValue(formData, "heroTitle"),
      id || undefined
    );

    const rawExcellenceOfferings = parseJsonField<Array<Record<string, unknown> & { imageData?: string }>>(formData, "excellenceOfferings", []);
    const rawDeveloperItems = parseJsonField<Array<Record<string, unknown> & { imageData?: string }>>(formData, "developerItems", []);
    const [excellenceOfferings, developerItems] = await Promise.all([
      processNestedImages(rawExcellenceOfferings, ["imageData"]),
      processNestedImages(rawDeveloperItems, ["imageData"]),
    ]);

    const payload = {
      slug,
      categoryKey: getValue(formData, "categoryKey"),
      navLabel,
      order,
      isPublished,
      heroTitle: getValue(formData, "heroTitle"),
      heroDescription: getValue(formData, "heroDescription"),
      heroChecklist: getListValue(formData, "heroChecklist"),
      heroFormTitle: getValue(formData, "heroFormTitle"),
      heroTechnologies: parseJsonField(formData, "heroTechnologies", []),
      excellenceTitle: getValue(formData, "excellenceTitle"),
      excellenceSubtitle: getValue(formData, "excellenceSubtitle"),
      excellenceOfferings,
      ctaTitle: getValue(formData, "ctaTitle"),
      ctaButtonText: getValue(formData, "ctaButtonText"),
      ctaButtonLink: getValue(formData, "ctaButtonLink"),
      partnerTitle: getValue(formData, "partnerTitle"),
      partnerButtonText: getValue(formData, "partnerButtonText"),
      partnerButtonLink: getValue(formData, "partnerButtonLink"),
      partnerItems: parseJsonField(formData, "partnerItems", []),
      developerGridTitle: getValue(formData, "developerGridTitle"),
      developerItems,
      hireTitle: getValue(formData, "hireTitle"),
      hireSubtitle: getValue(formData, "hireSubtitle"),
      hireServices: parseJsonField(formData, "hireServices", []),
      contactTitle: getValue(formData, "contactTitle"),
      contactButtonText: getValue(formData, "contactButtonText"),
      contactButtonLink: getValue(formData, "contactButtonLink"),
      guideTitle: getValue(formData, "guideTitle"),
      guideTabs: parseJsonField(formData, "guideTabs", []),
      stepsTitle: getValue(formData, "stepsTitle"),
      stepsButtonText: getValue(formData, "stepsButtonText"),
      stepsButtonLink: getValue(formData, "stepsButtonLink"),
      steps: parseJsonField(formData, "steps", []),
      engagementTitle: getValue(formData, "engagementTitle"),
      engagementSubtitle: getValue(formData, "engagementSubtitle"),
      engagementModels: parseJsonField(formData, "engagementModels", []),
    };

    if (id) {
      await OffshoreDeveloperPageModel.findByIdAndUpdate(id, payload);
    } else {
      await OffshoreDeveloperPageModel.create(payload);
    }

    offshorePath = `/offshore-developer/${payload.categoryKey}/${payload.slug}`;
  }

  if (entityType === "product") {
    const navLabel = getValue(formData, "navLabel");
    const heroTitle = getValue(formData, "heroTitle");
    const slug = await createSlugForModel(ProductPageModel, getOptionalValue(formData, "slug") || navLabel || heroTitle, id || undefined);

    const payload = {
      slug,
      navLabel,
      heroTitle,
      heroSubtitle: getValue(formData, "heroSubtitle"),
      heroDescription: getValue(formData, "heroDescription"),
      heroButtonLabel: getValue(formData, "heroButtonLabel"),
      heroButtonHref: getValue(formData, "heroButtonHref"),
      order,
      isPublished,
    };

    if (id) {
      await ProductPageModel.findByIdAndUpdate(id, payload);
    } else {
      await ProductPageModel.create(payload);
    }

    productPath = `/products/${payload.slug}`;
  }

  if (entityType === "intern") {
    const payload = {
      name: getValue(formData, "name"),
      role: getValue(formData, "role"),
      duration: getValue(formData, "duration"),
      award: getValue(formData, "award"),
      certificateId: getValue(formData, "certificateId"),
      program: getValue(formData, "program"),
      track: getValue(formData, "track"),
      initials: getValue(formData, "initials"),
      accent: getOptionalValue(formData, "accent"),
      order,
      isPublished,
      imageData,
    };

    const slug = await createSlugForModel(InternModel, payload.name, id || undefined);

    if (id) {
      await InternModel.findByIdAndUpdate(id, { ...payload, slug });
    } else {
      await InternModel.create({ ...payload, slug });
    }
  }

  if (entityType === "team") {
    const payload = {
      name: getValue(formData, "name"),
      role: getValue(formData, "role"),
      focus: getValue(formData, "focus"),
      initials: getValue(formData, "initials"),
      accent: getOptionalValue(formData, "accent"),
      order,
      isPublished,
      imageData,
    };

    const slug = await createSlugForModel(TeamMemberModel, payload.name, id || undefined);

    if (id) {
      await TeamMemberModel.findByIdAndUpdate(id, { ...payload, slug });
    } else {
      await TeamMemberModel.create({ ...payload, slug });
    }

    // Invalidate team cache
    revalidateTag("team", { expire: 0 });
    revalidatePath("/resources/portfolio");
  }

  if (entityType === "portfolio") {
    const teamMembersRaw = formData.get("teamMembers");
    let teamMembers: Array<{ name: string; role: string; initials: string; accent: string; imageData: string }> = [];
    if (teamMembersRaw && typeof teamMembersRaw === "string") {
      try {
        teamMembers = JSON.parse(teamMembersRaw);
      } catch {
        teamMembers = [];
      }
    }

    // Process team member images through compression
    const processedTeamMembers = await Promise.all(
      teamMembers.map(async (member) => ({
        ...member,
        imageData: member.imageData ? await normalizeBase64Image(member.imageData) : "",
      }))
    );

    const payload = {
      title: getValue(formData, "title"),
      summary: getValue(formData, "summary"),
      industry: getValue(formData, "industry"),
      engagement: getValue(formData, "engagement"),
      timeline: getValue(formData, "timeline"),
      outcome: getValue(formData, "outcome"),
      tags: getListValue(formData, "tags"),
      objective: getValue(formData, "objective"),
      objectivePoints: getListValue(formData, "objectivePoints"),
      solutionPoints: getListValue(formData, "solutionPoints"),
      resultPrimaryValue: getValue(formData, "resultPrimaryValue"),
      resultPrimaryLabel: getValue(formData, "resultPrimaryLabel"),
      resultSecondaryValue: getValue(formData, "resultSecondaryValue"),
      resultSecondaryLabel: getValue(formData, "resultSecondaryLabel"),
      resultBullets: getListValue(formData, "resultBullets"),
      galleryImageOne: await getProcessedImage(formData, "galleryImageOne"),
      galleryImageTwo: await getProcessedImage(formData, "galleryImageTwo"),
      galleryImageThree: await getProcessedImage(formData, "galleryImageThree"),
      galleryImageFour: await getProcessedImage(formData, "galleryImageFour"),
      accent: getOptionalValue(formData, "accent"),
      order,
      isPublished,
      imageData,
      teamMembers: processedTeamMembers,
      ...getPortfolioDiscoveryPayload(formData),
    };

    const requestedSlug = slugifyValue(getOptionalValue(formData, "slug"));
    const existingProject = id ? ((await PortfolioProjectModel.findById(id).select("slug").lean()) as { slug?: string } | null) : null;
    const slug = requestedSlug
      ? await createSlugForModel(PortfolioProjectModel, requestedSlug, id || undefined)
      : existingProject?.slug || (await createSlugForModel(PortfolioProjectModel, payload.title, id || undefined));

    if (id) {
      await PortfolioProjectModel.findByIdAndUpdate(id, { ...payload, slug });
    } else {
      await PortfolioProjectModel.create({ ...payload, slug });
    }

    // Invalidate portfolio cache
    revalidateTag("portfolio", { expire: 0 });
    revalidatePath("/resources/portfolio");
    revalidatePath(`/resources/portfolio/${slug}`);
  }

  if (entityType === "job") {
    const payload = {
      company: getValue(formData, "company"),
      title: getValue(formData, "title"),
      type: getValue(formData, "type"),
      mode: getValue(formData, "mode"),
      salary: getValue(formData, "salary"),
      posted: getValue(formData, "posted"),
      location: getValue(formData, "location"),
      overview: getValue(formData, "overview"),
      responsibilities: getListValue(formData, "responsibilities"),
      requirements: getListValue(formData, "requirements"),
      benefits: getListValue(formData, "benefits"),
      accent: getOptionalValue(formData, "accent"),
      order,
      isPublished,
      imageData,
    };

    const slug = await createSlugForModel(JobOpeningModel, `${payload.company}-${payload.title}`, id || undefined);

    if (id) {
      await JobOpeningModel.findByIdAndUpdate(id, { ...payload, slug });
    } else {
      await JobOpeningModel.create({ ...payload, slug });
    }
  }

  if (entityType === "blog") {
    const content = getValue(formData, "content");
    const sources = parseBlogSources(getOptionalValue(formData, "sources"));
    const payload = {
      title: getValue(formData, "title"),
      excerpt: getValue(formData, "excerpt"),
      content,
      author: getValue(formData, "author"),
      // Reading time is derived from the actual article length unless explicitly overridden.
      readTime: getOptionalValue(formData, "readTime") || readingTime(content),
      category: getValue(formData, "category"),
      featured: getBooleanValue(formData, "featured"),
      accent: getOptionalValue(formData, "accent"),
      metaTitle: getOptionalValue(formData, "metaTitle").slice(0, 120),
      metaDescription: getOptionalValue(formData, "metaDescription").slice(0, 320),
      tags: getOptionalValue(formData, "tags")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
        .slice(0, 12),
      publishedAt: normaliseIsoDate(getOptionalValue(formData, "publishedAt")),
      modifiedAt: new Date().toISOString().slice(0, 10),
      sources,
      aiAssisted: getBooleanValue(formData, "aiAssisted"),
      order,
      isPublished,
      imageData,
    };

    // Keep existing URLs stable: an explicit slug wins, otherwise an existing post keeps its slug.
    const requestedSlug = slugifyValue(getOptionalValue(formData, "slug"));
    const existing = id ? ((await BlogPostModel.findById(id).select("slug").lean()) as { slug?: string } | null) : null;
    const slug = requestedSlug
      ? await createSlugForModel(BlogPostModel, requestedSlug, id || undefined)
      : existing?.slug || (await createSlugForModel(BlogPostModel, payload.title, id || undefined));

    if (payload.featured) {
      await BlogPostModel.updateMany({}, { featured: false });
    }

    if (id) {
      await BlogPostModel.findByIdAndUpdate(id, { ...payload, slug });
    } else {
      await BlogPostModel.create({ ...payload, slug });
    }

    // Invalidate blog cache
    revalidateTag("blog", { expire: 0 });
    revalidatePath(`/resources/blogs/${slug}`);
  }

  if (entityType === "technology") {
    const manualSlug = getOptionalValue(formData, "slug");
    const category = getValue(formData, "category");
    const isLanding = getBooleanValue(formData, "isLanding");
    const slug = manualSlug || (await createSlugForModel(TechnologyPageModel, getValue(formData, "heroTitle"), id || undefined));

    const rawHeroLogos = parseJsonField<Array<Record<string, unknown> & { imageData?: string }>>(
      formData,
      "heroLogos",
      await buildLogoItems(formData, 7)
    );
    const rawChallengeCards = parseJsonField<Array<Record<string, unknown> & { imageData?: string }>>(
      formData,
      "challengeCards",
      await buildChallengeCards(formData, 4)
    );
    const rawProvenCaseStudies = parseJsonField<Array<Record<string, unknown> & { imageData?: string }>>(
      formData,
      "provenCaseStudies",
      await buildCaseStudies(formData, 5)
    );
    const rawStackItems = parseJsonField<Array<Record<string, unknown> & { imageData?: string }>>(
      formData,
      "stackItems",
      await buildStackItems(formData, 10)
    );
    const [heroLogos, challengeCards, provenCaseStudies, stackItems] = await Promise.all([
      processNestedImages(rawHeroLogos, ["imageData"]),
      processNestedImages(rawChallengeCards, ["imageData"]),
      processNestedImages(rawProvenCaseStudies, ["imageData"]),
      processNestedImages(rawStackItems, ["imageData"]),
    ]);

    const payload = {
      slug,
      category,
      order,
      isPublished,
      isLanding,
      heroSubtitle: getValue(formData, "heroSubtitle"),
      heroTitle: getValue(formData, "heroTitle"),
      heroDescription: getValue(formData, "heroDescription"),
      heroPrimaryButtonLabel: getValue(formData, "heroPrimaryButtonLabel"),
      heroPrimaryButtonHref: getValue(formData, "heroPrimaryButtonHref"),
      heroSecondaryButtonLabel: getValue(formData, "heroSecondaryButtonLabel"),
      heroSecondaryButtonHref: getValue(formData, "heroSecondaryButtonHref"),
      heroLogos,
      challengesTitle: getValue(formData, "challengesTitle"),
      challengeCards,
      unlockTitle: getValue(formData, "unlockTitle"),
      unlockButtonLabel: getValue(formData, "unlockButtonLabel"),
      unlockButtonHref: getValue(formData, "unlockButtonHref"),
      talkTitle: getValue(formData, "talkTitle"),
      talkButtonLabel: getValue(formData, "talkButtonLabel"),
      talkButtonHref: getValue(formData, "talkButtonHref"),
      talkCards: parseJsonField(formData, "talkCards", buildSimpleCards(formData, "talkCard", 4)),
      successTitle: getValue(formData, "successTitle"),
      successCards: parseJsonField(formData, "successCards", buildSimpleCards(formData, "successCard", 9)),
      provenTitle: getValue(formData, "provenTitle"),
      provenDescription: getValue(formData, "provenDescription"),
      provenCaseStudies,
      guidanceTitle: getValue(formData, "guidanceTitle"),
      guidanceButtonLabel: getValue(formData, "guidanceButtonLabel"),
      guidanceButtonHref: getValue(formData, "guidanceButtonHref"),
      qualityEyebrow: getValue(formData, "qualityEyebrow"),
      qualityTitle: getValue(formData, "qualityTitle"),
      qualityDescription: getValue(formData, "qualityDescription"),
      qualityPoints: parseJsonField(formData, "qualityPoints", buildSimpleCards(formData, "qualityPoint", 8)),
      stackTitle: getValue(formData, "stackTitle"),
      stackItems,
      leaderTitle: getValue(formData, "leaderTitle"),
      leaderStats: parseJsonField(formData, "leaderStats", buildStats(formData, 5)),
      engagementTitle: getValue(formData, "engagementTitle"),
      engagementDescription: getValue(formData, "engagementDescription"),
      engagementModels: parseJsonField(formData, "engagementModels", buildEngagementModels(formData, 3)),
      faqTitle: getValue(formData, "faqTitle"),
      faqs: parseJsonField(formData, "faqs", buildFaqItems(formData, 5)),
    };

    if (payload.isLanding) {
      await TechnologyPageModel.updateMany({}, { isLanding: false });
    }

    if (id) {
      await TechnologyPageModel.findByIdAndUpdate(id, payload);
    } else {
      await TechnologyPageModel.create(payload);
    }

    technologyPath = `/technologies/${payload.category}/${payload.slug}`;
  }

  revalidatePath(returnPath);
  revalidatePublicRoutes();
  if (expertisePath) {
    revalidatePath(expertisePath);
  }
  if (offshorePath) {
    revalidatePath(offshorePath);
  }
  if (productPath) {
    revalidatePath(productPath);
  }
  if (technologyPath) {
    revalidatePath(technologyPath);
  }
  redirect(`${returnPath}?status=saved`);
}

export async function deleteEntityAction(entityType: EntityType, returnPath: string, formData: FormData) {
  await requireAdminSession();
  await ensureDatabaseForAction(returnPath);

  const id = getValue(formData, "id");
  let technologyPath: string | null = null;
  let productPath: string | null = null;
  let offshorePath: string | null = null;
  let expertisePath: string | null = null;

  if (!id) {
    redirect(`${returnPath}?error=Missing%20record%20id`);
  }

  if (entityType === "intern") {
    await InternModel.findByIdAndDelete(id);
  }

  if (entityType === "team") {
    await TeamMemberModel.findByIdAndDelete(id);
    revalidateTag("team", { expire: 0 });
    revalidatePath("/resources/portfolio");
  }

  if (entityType === "portfolio") {
    await PortfolioProjectModel.findByIdAndDelete(id);
    revalidateTag("portfolio", { expire: 0 });
    revalidatePath("/resources/portfolio");
  }

  if (entityType === "job") {
    await JobOpeningModel.findByIdAndDelete(id);
  }

  if (entityType === "blog") {
    await BlogPostModel.findByIdAndDelete(id);
    revalidateTag("blog", { expire: 0 });
  }

  if (entityType === "product") {
    const existing = await ProductPageModel.findById(id).lean();

    if (existing) {
      productPath = `/products/${String(existing.slug)}`;
    }

    await ProductPageModel.findByIdAndDelete(id);
  }

  if (entityType === "offshore") {
    const existing = await OffshoreDeveloperPageModel.findById(id).lean();

    if (existing) {
      offshorePath = `/offshore-developer/${String(existing.categoryKey)}/${String(existing.slug)}`;
    }

    await OffshoreDeveloperPageModel.findByIdAndDelete(id);
  }

  if (entityType === "expertise") {
    const existing = await ExpertisePageModel.findById(id).lean();

    if (existing) {
      expertisePath = `/our-expertise/${String(existing.categoryKey)}/${String(existing.slug)}`;
    }

    await ExpertisePageModel.findByIdAndDelete(id);
  }

  if (entityType === "technology") {
    const existing = await TechnologyPageModel.findById(id).lean();

    if (existing) {
      technologyPath = `/technologies/${String(existing.category)}/${String(existing.slug)}`;
    }

    await TechnologyPageModel.findByIdAndDelete(id);
  }

  revalidatePath(returnPath);
  revalidatePublicRoutes();
  if (expertisePath) {
    revalidatePath(expertisePath);
  }
  if (offshorePath) {
    revalidatePath(offshorePath);
  }
  if (productPath) {
    revalidatePath(productPath);
  }
  if (technologyPath) {
    revalidatePath(technologyPath);
  }
  redirect(`${returnPath}?status=deleted`);
}

function getPageCopyPayload(formData: FormData, prefix: string) {
  return {
    heroEyebrow: getValue(formData, `${prefix}HeroEyebrow`),
    heroTitle: getValue(formData, `${prefix}HeroTitle`),
    heroDescription: getValue(formData, `${prefix}HeroDescription`),
    sectionEyebrow: getValue(formData, `${prefix}SectionEyebrow`),
    sectionTitle: getValue(formData, `${prefix}SectionTitle`),
    sectionDescription: getValue(formData, `${prefix}SectionDescription`),
    ctaEyebrow: getValue(formData, `${prefix}CtaEyebrow`),
    ctaTitle: getValue(formData, `${prefix}CtaTitle`),
    ctaDescription: getValue(formData, `${prefix}CtaDescription`),
    ctaButtonLabel: getValue(formData, `${prefix}CtaButtonLabel`),
    ctaButtonHref: getValue(formData, `${prefix}CtaButtonHref`),
  };
}

export async function saveSiteSettingsAction(formData: FormData) {
  await requireAdminSession();
  await ensureDatabaseForAction("/admin/settings");

  const footerColumns = parseJsonField(formData, "footerColumns", []);
  const sharedStats = buildSharedStatsPayload(formData);
  const socialMedia = parseJsonField(formData, "socialMedia", {
    instagram: "",
    linkedin: "",
    facebook: "",
    twitter: "",
    youtube: "",
  });
  const rawOffices = parseJsonField<Array<Record<string, unknown> & { flagImage?: string }>>(formData, "offices", []);
  const offices = await processNestedImages(rawOffices, ["flagImage"]);

  await SiteSettingsModel.updateOne(
    { key: "site-settings" },
    {
      key: "site-settings",
      companyName: getValue(formData, "companyName"),
      shortName: getValue(formData, "shortName"),
      experienceLabel: getValue(formData, "experienceLabel"),
      headerTagline: getValue(formData, "headerTagline"),
      footerDescription: getValue(formData, "footerDescription"),
      newsletterTitle: getValue(formData, "newsletterTitle"),
      newsletterDescription: getValue(formData, "newsletterDescription"),
      copyrightText: getValue(formData, "copyrightText"),
      officeLocations: getListValue(formData, "officeLocations"),
      offices,
      socialMedia,
      footerColumns,
      sharedStats,
      logoUrl: await getProcessedImage(formData, "logoUrl") || "/images/logo.png",
      logoAlt: getValue(formData, "logoAlt") || "Logo",
      pageContent: {
        home: getPageCopyPayload(formData, "home"),
        resources: getPageCopyPayload(formData, "resources"),
        interns: getPageCopyPayload(formData, "interns"),
        team: getPageCopyPayload(formData, "team"),
        portfolio: getPageCopyPayload(formData, "portfolio"),
        careers: getPageCopyPayload(formData, "careers"),
        blogs: getPageCopyPayload(formData, "blogs"),
      },
    },
    { upsert: true }
  );

  revalidatePath("/admin/settings");
  revalidatePublicRoutes();
  revalidateTag("site-settings", { expire: 0 });
  redirect("/admin/settings?status=saved");
}

export async function saveProductSettingsAction(formData: FormData) {
  await requireAdminSession();
  await ensureDatabaseForAction("/admin/products");

  const [featureCards, audienceCards] = await Promise.all([
    buildProductFeatureCardsPayload(formData),
    buildProductAudienceCardsPayload(formData),
  ]);
  const faqs = buildProductFaqItemsPayload(formData);

  await ProductSettingsModel.updateOne(
    { key: "product-settings" },
    {
      key: "product-settings",
      menuTitle: getValue(formData, "menuTitle"),
      menuDescription: getValue(formData, "menuDescription"),
      menuDescriptionSecondary: getValue(formData, "menuDescriptionSecondary"),
      menuButtonLabel: getValue(formData, "menuButtonLabel"),
      menuButtonHref: getValue(formData, "menuButtonHref"),
      menuImageData: await getProcessedImage(formData, "menuImageData"),
      landingHeroTitle: getValue(formData, "landingHeroTitle"),
      landingHeroSubtitle: getValue(formData, "landingHeroSubtitle"),
      landingHeroDescription: getValue(formData, "landingHeroDescription"),
      landingHeroButtonLabel: getValue(formData, "landingHeroButtonLabel"),
      landingHeroButtonHref: getValue(formData, "landingHeroButtonHref"),
      customSupportTitle: getValue(formData, "customSupportTitle"),
      customSupportDescription: getValue(formData, "customSupportDescription"),
      customSupportImageData: await getProcessedImage(formData, "customSupportImageData"),
      featuresTitle: getValue(formData, "featuresTitle"),
      featuresDescription: getValue(formData, "featuresDescription"),
      featureCards,
      transformTitle: getValue(formData, "transformTitle"),
      transformDescription: getValue(formData, "transformDescription"),
      audienceCards,
      faqTitle: getValue(formData, "faqTitle"),
      faqs,
      driveTitle: getValue(formData, "driveTitle"),
      driveDescription: getValue(formData, "driveDescription"),
      driveButtonLabel: getValue(formData, "driveButtonLabel"),
      driveButtonHref: getValue(formData, "driveButtonHref"),
    },
    { upsert: true }
  );

  revalidatePath("/admin/products");
  revalidatePublicRoutes();
  revalidateTag("products", { expire: 0 });
  redirect("/admin/products?status=saved");
}

export async function saveOffshoreDeveloperSettingsAction(formData: FormData) {
  await requireAdminSession();
  await ensureDatabaseForAction("/admin/offshore-developer");

  // Process nested images
  const rawPartnerLogos = parseJsonField(formData, "partnerLogos", []);
  const rawTestimonials = parseJsonField(formData, "testimonials", []);
  const rawCaseStudies = parseJsonField(formData, "caseStudies", []);

  const [partnerLogos, testimonials, caseStudies] = await Promise.all([
    processNestedImages(rawPartnerLogos, ["imageData"]),
    processNestedImages(rawTestimonials, ["avatarImageData", "starsImageData"]),
    processNestedImages(rawCaseStudies, ["imageData"]),
  ]);

  await OffshoreDeveloperSettingsModel.updateOne(
    { key: "offshore-developer-settings" },
    {
      key: "offshore-developer-settings",
      menuCategories: parseJsonField(formData, "menuCategories", []),
      partnerLogos,
      testimonialTitle: getValue(formData, "testimonialTitle"),
      testimonialSubtitle: getValue(formData, "testimonialSubtitle"),
      testimonials,
      caseStudyTitle: getValue(formData, "caseStudyTitle"),
      caseStudySubtitle: getValue(formData, "caseStudySubtitle"),
      caseStudies,
      faqTitle: getValue(formData, "faqTitle"),
      faqs: parseJsonField(formData, "faqs", []),
    },
    { upsert: true }
  );

  revalidatePath("/admin/offshore-developer");
  revalidatePublicRoutes();
  revalidateTag("offshore", { expire: 0 });
  redirect("/admin/offshore-developer?status=saved");
}

export async function saveExpertiseSettingsAction(formData: FormData) {
  await requireAdminSession();
  await ensureDatabaseForAction("/admin/expertise");

  // Process nested images
  const rawTechStackTabs = parseJsonField(formData, "techStackTabs", []);
  const rawTestimonials = parseJsonField(formData, "testimonials", []);
  
  const [techStackTabs, testimonials] = await Promise.all([
    processTechStackTabs(rawTechStackTabs),
    processNestedImages(rawTestimonials, ["imageData", "avatar"]),
  ]);

  await ExpertiseSettingsModel.updateOne(
    { key: "expertise-settings" },
    {
      key: "expertise-settings",
      menuCategories: parseJsonField(formData, "menuCategories", []),
      testimonialTitle: getValue(formData, "testimonialTitle"),
      testimonialSubtitle: getValue(formData, "testimonialSubtitle"),
      testimonials,
      engagementTitle: getValue(formData, "engagementTitle"),
      engagementSubtitle: getValue(formData, "engagementSubtitle"),
      engagementModels: parseJsonField(formData, "engagementModels", []),
      techStackTitle: getValue(formData, "techStackTitle"),
      techStackDescription: getValue(formData, "techStackDescription"),
      techStackTabs,
      faqTitle: getValue(formData, "faqTitle"),
      faqs: parseJsonField(formData, "faqs", []),
    },
    { upsert: true }
  );

  revalidatePath("/admin/expertise");
  revalidatePublicRoutes();
  revalidateTag("expertise", { expire: 0 });
  redirect("/admin/expertise?status=saved");
}

export async function saveHomeSettingsAction(formData: FormData) {
  await requireAdminSession();
  await ensureDatabaseForAction("/admin/home");

  // Process nested images in arrays
  const rawIndustriesTabs = parseJsonField(formData, "industriesTabs", []);
  const rawTechStackTabs = parseJsonField(formData, "techStackTabs", []);
  const rawCustomSolutionCards = parseJsonField(formData, "customSolutionCards", []);
  const rawOfferings = parseJsonField(formData, "offerings", []);
  const rawCaseStudies = parseJsonField(formData, "caseStudies", []);
  const rawInsightCards = parseJsonField(formData, "insightCards", []);

  // Process all arrays with images concurrently
  const [heroImageData, whyChooseManagerImage, industriesTabs, techStackTabs, customSolutionCards, offerings, caseStudies, insightCards] = await Promise.all([
    getProcessedImage(formData, "heroImageData"),
    getProcessedImage(formData, "whyChooseManagerImage"),
    processIndustriesTabs(rawIndustriesTabs),
    processTechStackTabs(rawTechStackTabs),
    processNestedImages(rawCustomSolutionCards, ["imageData"]),
    processNestedImages(rawOfferings, ["imageData"]),
    processNestedImages(rawCaseStudies, ["imageData"]),
    processNestedImages(rawInsightCards, ["imageData"]),
  ]);

  await HomeSettingsModel.updateOne(
    { key: "home-settings" },
    {
      key: "home-settings",
      heroTitle: getValue(formData, "heroTitle"),
      heroDescription: getValue(formData, "heroDescription"),
      heroPrimaryAction: parseJsonField(formData, "heroPrimaryAction", { label: "", href: "#" }),
      heroSecondaryAction: parseJsonField(formData, "heroSecondaryAction", { label: "", href: "#" }),
      heroImageData,
      customSolutionsTitle: getValue(formData, "customSolutionsTitle"),
      customSolutionsSubtitle: getValue(formData, "customSolutionsSubtitle"),
      customSolutionCards,
      offeringsTitle: getValue(formData, "offeringsTitle"),
      offeringsSubtitle: getValue(formData, "offeringsSubtitle"),
      offerings,
      caseStudyTitle: getValue(formData, "caseStudyTitle"),
      caseStudySubtitle: getValue(formData, "caseStudySubtitle"),
      caseStudies,
      industriesTitle: getValue(formData, "industriesTitle"),
      industriesSubtitle: getValue(formData, "industriesSubtitle"),
      industriesTabs,
      techStackTitle: getValue(formData, "techStackTitle"),
      techStackDescription: getValue(formData, "techStackDescription"),
      techStackTabs,
      whyChooseQuote: getValue(formData, "whyChooseQuote"),
      whyChooseAuthor: getValue(formData, "whyChooseAuthor"),
      whyChooseRole: getValue(formData, "whyChooseRole"),
      whyChooseManagerImage,
      insightSection: parseJsonField(formData, "insightSection", { title: "", subtitle: "", buttonText: "", buttonHref: "#" }),
      insightCards,
    },
    { upsert: true }
  );

  revalidatePath("/admin/home");
  revalidatePublicRoutes();
  revalidateTag("home", { expire: 0 });
  redirect("/admin/home?status=saved");
}

export async function saveAboutSettingsAction(formData: FormData) {
  await requireAdminSession();
  await ensureDatabaseForAction("/admin/about");

  // Process images in arrays
  const rawMissionCards = parseJsonField(formData, "missionCards", []);
  const rawMilestoneItems = parseJsonField(formData, "milestoneItems", []);
  const rawWhyChooseCards = parseJsonField(formData, "whyChooseCards", []);

  const [whoWeAreImage, missionCards, milestoneItems, whyChooseCards] = await Promise.all([
    getProcessedImage(formData, "whoWeAreImage"),
    processNestedImages(rawMissionCards, ["imageData"]),
    processNestedImages(rawMilestoneItems, ["imageData"]),
    processNestedImages(rawWhyChooseCards, ["imageData"]),
  ]);

  await AboutSettingsModel.updateOne(
    { key: "about-settings" },
    {
      key: "about-settings",
      heroTitle: getValue(formData, "heroTitle"),
      heroDescription: getValue(formData, "heroDescription"),
      heroPrimaryAction: parseJsonField(formData, "heroPrimaryAction", { label: "", href: "#" }),
      heroSecondaryAction: parseJsonField(formData, "heroSecondaryAction", { label: "", href: "#" }),
      whoWeAreTitle: getValue(formData, "whoWeAreTitle"),
      whoWeAreParagraphOne: getValue(formData, "whoWeAreParagraphOne"),
      whoWeAreParagraphTwo: getValue(formData, "whoWeAreParagraphTwo"),
      whoWeAreImage,
      visionTag: getValue(formData, "visionTag"),
      visionTitle: getValue(formData, "visionTitle"),
      visionDescription: getValue(formData, "visionDescription"),
      visionStats: parseJsonField(formData, "visionStats", []),
      missionTag: getValue(formData, "missionTag"),
      missionTitle: getValue(formData, "missionTitle"),
      missionDescription: getValue(formData, "missionDescription"),
      missionCards,
      milestoneTag: getValue(formData, "milestoneTag"),
      milestoneTitle: getValue(formData, "milestoneTitle"),
      milestoneDescription: getValue(formData, "milestoneDescription"),
      milestoneItems,
      whyChooseTitle: getValue(formData, "whyChooseTitle"),
      whyChooseSubtitle: getValue(formData, "whyChooseSubtitle"),
      whyChooseCards,
      ctaTitle: getValue(formData, "ctaTitle"),
      ctaDescription: getValue(formData, "ctaDescription"),
      ctaButtonText: getValue(formData, "ctaButtonText"),
      ctaButtonHref: getValue(formData, "ctaButtonHref"),
    },
    { upsert: true }
  );

  revalidatePath("/admin/about");
  revalidatePublicRoutes();
  revalidateTag("about", { expire: 0 });
  redirect("/admin/about?status=saved");
}

const jobApplicationSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  email: z.string().email("A valid email is required."),
  phone: z.string().min(7, "Phone number is required."),
  location: z.string().min(2, "Location is required."),
  linkedInUrl: z.union([z.literal(""), z.string().url("LinkedIn URL must be valid.")]),
  portfolioUrl: z.union([z.literal(""), z.string().url("Portfolio URL must be valid.")]),
  cvDriveLink: z.string().url("CV drive link must be a valid URL."),
  coverLetter: z.string().max(2000, "Cover letter is too long."),
});

export async function submitJobApplicationAction(jobSlug: string, formData: FormData) {
  const redirectTo = getOptionalValue(formData, "redirectTo") || `/resources/careers/${jobSlug}`;

  // Works with or without the database: the published job comes from the DB or the built-in fallback.
  const job = await getPublishedJobBySlug(jobSlug);
  if (!job) {
    redirect(`${redirectTo}?error=Job%20not%20found`);
  }
  const resolvedJob = job as { slug: string; title: string; company: string };

  const parsedValues = jobApplicationSchema.safeParse({
    fullName: getValue(formData, "fullName"),
    email: getValue(formData, "email"),
    phone: getValue(formData, "phone"),
    location: getValue(formData, "location"),
    linkedInUrl: getOptionalValue(formData, "linkedInUrl"),
    portfolioUrl: getOptionalValue(formData, "portfolioUrl"),
    cvDriveLink: getValue(formData, "cvDriveLink"),
    coverLetter: getOptionalValue(formData, "coverLetter"),
  });

  if (!parsedValues.success) {
    const message = parsedValues.error.issues[0]?.message ?? "Please check the application form.";
    redirect(`${redirectTo}?error=${encodeURIComponent(message)}`);
  }
  const v = parsedValues.data;

  // 1) Email the application to HR (hr@alpixn.com or HR_TO_EMAIL).
  let emailed = false;
  if (isMailConfigured()) {
    try {
      await sendRowsEmail({
        to: HR_TO_EMAIL,
        subject: `Job application: ${resolvedJob.title} — ${v.fullName}`,
        heading: `New application for ${resolvedJob.title}`,
        rows: [
          ["Position", resolvedJob.title],
          ["Name", v.fullName],
          ["Email", v.email],
          ["Phone", v.phone],
          ["Location", v.location],
          ["LinkedIn", v.linkedInUrl ?? ""],
          ["Portfolio", v.portfolioUrl ?? ""],
          ["CV link", v.cvDriveLink],
        ],
        messageLabel: "Cover letter",
        message: v.coverLetter ?? "",
        replyName: v.fullName,
        replyEmail: v.email,
      });
      emailed = true;
    } catch (error) {
      console.error("Job application email failed:", error);
    }
  }

  // 2) Keep a copy in the admin careers inbox when the database is reachable.
  let stored = false;
  try {
    await connectToDatabase();
    await JobApplicationModel.create({ jobSlug: resolvedJob.slug, jobTitle: resolvedJob.title, company: resolvedJob.company, ...v, status: "new" });
    stored = true;
    revalidatePath("/admin/careers");
  } catch (error) {
    console.error("Job application could not be stored:", error);
  }

  if (!emailed && !stored) {
    redirect(`${redirectTo}?error=${encodeURIComponent("Sorry, your application could not be sent. Please email hr@alpixn.com directly.")}`);
  }
  redirect(`${redirectTo}?status=applied`);
}


export async function saveContactSettingsAction(formData: FormData) {
  await requireAdminSession();
  await ensureDatabaseForAction("/admin/contact");

  // Parse global offices from JSON fields
  const officeCount = 9;
  const rawGlobalOffices = Array.from({ length: officeCount }, (_, index) => ({
    name: getValue(formData, `officeName${index}`),
    address: getValue(formData, `officeAddress${index}`),
    email: getValue(formData, `officeEmail${index}`),
    flagImage: getValue(formData, `officeFlagImage${index}`),
    order: getNumberValue(formData, `officeOrder${index}`, index + 1),
    isPublished: getBooleanValue(formData, `officeIsPublished${index}`),
  })).filter(office => office.name && office.address);

  // Process flag images
  const globalOffices = await processNestedImages(rawGlobalOffices, ["flagImage"]);

  await ContactSettingsModel.updateOne(
    { key: "contact" },
    {
      key: "contact",
      heroTitle: getValue(formData, "heroTitle"),
      heroDescription: getValue(formData, "heroDescription"),
      formIntroTitle: getValue(formData, "formIntroTitle"),
      formIntroDescription: getValue(formData, "formIntroDescription"),
      formPhoneNumber: getValue(formData, "formPhoneNumber"),
      formPhoneAvailability: getValue(formData, "formPhoneAvailability"),
      formEmail: getValue(formData, "formEmail"),
      formSupportEmail: getValue(formData, "formSupportEmail"),
      formAddress: getValue(formData, "formAddress"),
      formButtonText: getValue(formData, "formButtonText"),
      formFirstNameLabel: getValue(formData, "formFirstNameLabel"),
      formLastNameLabel: getValue(formData, "formLastNameLabel"),
      formEmailLabel: getValue(formData, "formEmailLabel"),
      formPhoneLabel: getValue(formData, "formPhoneLabel"),
      formInterestPlaceholder: getValue(formData, "formInterestPlaceholder"),
      formMessageLabel: getValue(formData, "formMessageLabel"),
      formInterestOptions: getListValue(formData, "formInterestOptions"),
      assistanceTitle: getValue(formData, "assistanceTitle"),
      assistanceDescription: getValue(formData, "assistanceDescription"),
      assistanceEmailButtonText: getValue(formData, "assistanceEmailButtonText"),
      assistanceCallButtonText: getValue(formData, "assistanceCallButtonText"),
      assistanceEmailButtonHref: getValue(formData, "assistanceEmailButtonHref"),
      assistanceCallButtonHref: getValue(formData, "assistanceCallButtonHref"),
      globalOfficesTitle: getValue(formData, "globalOfficesTitle"),
      globalOffices,
    },
    { upsert: true }
  );

  revalidatePath("/admin/contact");
  revalidatePath("/contact-us");
  revalidateTag("contact", { expire: 0 });
  redirect("/admin/contact?status=saved");
}

export async function saveResourceUiSettingsAction(formData: FormData) {
  await requireAdminSession();
  await ensureDatabaseForAction("/admin/settings");

  await ResourceUiSettingsModel.updateOne(
    { key: "resource-ui-settings" },
    {
      key: "resource-ui-settings",
      interns: {
        searchPlaceholder: getValue(formData, "internsSearchPlaceholder"),
        programLabel: getValue(formData, "internsProgramLabel"),
        allProgramsLabel: getValue(formData, "internsAllProgramsLabel"),
        trackLabel: getValue(formData, "internsTrackLabel"),
        allTracksLabel: getValue(formData, "internsAllTracksLabel"),
        resultsLabel: getValue(formData, "internsResultsLabel"),
        clearAllLabel: getValue(formData, "internsClearAllLabel"),
        emptyMessage: getValue(formData, "internsEmptyMessage"),
      },
      portfolio: {
        searchPlaceholder: getValue(formData, "portfolioSearchPlaceholder"),
        industryLabel: getValue(formData, "portfolioIndustryLabel"),
        allIndustriesLabel: getValue(formData, "portfolioAllIndustriesLabel"),
        tagLabel: getValue(formData, "portfolioTagLabel"),
        allTagsLabel: getValue(formData, "portfolioAllTagsLabel"),
        resultsLabel: getValue(formData, "portfolioResultsLabel"),
        clearAllLabel: getValue(formData, "portfolioClearAllLabel"),
        emptyMessage: getValue(formData, "portfolioEmptyMessage"),
        detailsTitle: getValue(formData, "portfolioDetailsTitle"),
        objectiveTitle: getValue(formData, "portfolioObjectiveTitle"),
        solutionsTitle: getValue(formData, "portfolioSolutionsTitle"),
        aboutProjectTitle: getValue(formData, "portfolioAboutProjectTitle"),
        industryLabelShort: getValue(formData, "portfolioIndustryLabelShort"),
        engagementLabel: getValue(formData, "portfolioEngagementLabel"),
        outcomeLabel: getValue(formData, "portfolioOutcomeLabel"),
        servicesProvidedLabel: getValue(formData, "portfolioServicesProvidedLabel"),
        timelineLabel: getValue(formData, "portfolioTimelineLabel"),
        resultTitle: getValue(formData, "portfolioResultTitle"),
        teamTitle: getValue(formData, "portfolioTeamTitle"),
        moreProjectsTitle: getValue(formData, "portfolioMoreProjectsTitle"),
      },
      careers: {
        searchPlaceholder: getValue(formData, "careersSearchPlaceholder"),
        typeLabel: getValue(formData, "careersTypeLabel"),
        allTypesLabel: getValue(formData, "careersAllTypesLabel"),
        modeLabel: getValue(formData, "careersModeLabel"),
        allModesLabel: getValue(formData, "careersAllModesLabel"),
        viewDetailsLabel: getValue(formData, "careersViewDetailsLabel"),
        emptyMessage: getValue(formData, "careersEmptyMessage"),
        overviewTitle: getValue(formData, "careersOverviewTitle"),
        responsibilitiesTitle: getValue(formData, "careersResponsibilitiesTitle"),
        requirementsTitle: getValue(formData, "careersRequirementsTitle"),
        benefitsTitle: getValue(formData, "careersBenefitsTitle"),
        applyButtonLabel: getValue(formData, "careersApplyButtonLabel"),
        applyIntroTitle: getValue(formData, "careersApplyIntroTitle"),
        applyIntroDescription: getValue(formData, "careersApplyIntroDescription"),
        applyFullNamePlaceholder: getValue(formData, "careersApplyFullNamePlaceholder"),
        applyPhonePlaceholder: getValue(formData, "careersApplyPhonePlaceholder"),
        applyEmailPlaceholder: getValue(formData, "careersApplyEmailPlaceholder"),
        applyLocationPlaceholder: getValue(formData, "careersApplyLocationPlaceholder"),
        applyLinkedInPlaceholder: getValue(formData, "careersApplyLinkedInPlaceholder"),
        applyPortfolioPlaceholder: getValue(formData, "careersApplyPortfolioPlaceholder"),
        applyCvPlaceholder: getValue(formData, "careersApplyCvPlaceholder"),
        applyCoverLetterPlaceholder: getValue(formData, "careersApplyCoverLetterPlaceholder"),
        applySummaryPrefix: getValue(formData, "careersApplySummaryPrefix"),
        applySubmitLabel: getValue(formData, "careersApplySubmitLabel"),
      },
      blogs: {
        heroReadButtonLabel: getValue(formData, "blogsHeroReadButtonLabel"),
        searchPlaceholder: getValue(formData, "blogsSearchPlaceholder"),
        allCategoriesLabel: getValue(formData, "blogsAllCategoriesLabel"),
        articlesFoundSuffix: getValue(formData, "blogsArticlesFoundSuffix"),
        emptyExploreMessage: getValue(formData, "blogsEmptyExploreMessage"),
        latestTitle: getValue(formData, "blogsLatestTitle"),
        categoriesTitle: getValue(formData, "blogsCategoriesTitle"),
        latestEmptyMessage: getValue(formData, "blogsLatestEmptyMessage"),
        authorSummaryTemplate: getValue(formData, "blogsAuthorSummaryTemplate"),
        detailsTitle: getValue(formData, "blogsDetailsTitle"),
        relatedTitle: getValue(formData, "blogsRelatedTitle"),
        noRelatedMessage: getValue(formData, "blogsNoRelatedMessage"),
      },
    },
    { upsert: true }
  );

  revalidatePath("/admin/settings");
  revalidatePublicRoutes();
  redirect("/admin/settings?status=saved");
}

export async function submitContactFormAction(formData: FormData) {
  const redirectTo = "/contact-us";

  const firstName = getValue(formData, "firstName");
  const lastName = getValue(formData, "lastName");
  const email = getValue(formData, "email");
  const phone = getValue(formData, "phone");
  const interest = getOptionalValue(formData, "interest") ?? "";
  const message = getOptionalValue(formData, "message") ?? "";

  if (!firstName || !lastName || !email || !phone) {
    redirect(`${redirectTo}?error=Please+fill+in+all+required+fields`);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    redirect(`${redirectTo}?error=Please+enter+a+valid+email+address`);
  }

  // 1) Email the enquiry to info@alpixn.com (or CONTACT_TO_EMAIL).
  let emailed = false;
  if (isMailConfigured()) {
    try {
      await sendContactEnquiryEmail({ firstName, lastName, email, phone, interest, message });
      emailed = true;
    } catch (error) {
      console.error("Contact email failed:", error);
    }
  }

  // 2) Also keep a copy in the admin inbox when the database is reachable.
  let stored = false;
  try {
    await connectToDatabase();
    await ContactMessageModel.create({ firstName, lastName, email, phone, interest, message, status: "new" });
    stored = true;
    revalidatePath("/admin/contact");
  } catch (error) {
    console.error("Contact message could not be stored:", error);
  }

  if (!emailed && !stored) {
    redirect(`${redirectTo}?error=${encodeURIComponent("Sorry, your message could not be sent. Please email info@alpixn.com directly.")}`);
  }
  redirect(`${redirectTo}?status=sent`);
}


export async function submitOffshoreEnquiryAction(formData: FormData) {
  const rawPath = getOptionalValue(formData, "pagePath") ?? "/offshore-developer";
  const redirectTo = rawPath.startsWith("/offshore-developer") ? rawPath : "/offshore-developer";

  const fullName = getValue(formData, "fullName");
  const phone = getValue(formData, "phone");
  const email = getValue(formData, "email");
  const company = getOptionalValue(formData, "company") ?? "";
  const technology = getOptionalValue(formData, "technology") ?? "";
  const role = getOptionalValue(formData, "role") ?? "";
  const message = getOptionalValue(formData, "message") ?? "";

  if (!fullName || !phone || !email) {
    redirect(`${redirectTo}?error=${encodeURIComponent("Please fill in your name, phone and email.")}`);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    redirect(`${redirectTo}?error=${encodeURIComponent("Please enter a valid email address.")}`);
  }

  let emailed = false;
  if (isMailConfigured()) {
    try {
      await sendRowsEmail({
        to: CONTACT_TO_EMAIL,
        subject: `Hire developers enquiry: ${role || technology || "Offshore developers"} — ${fullName}`,
        heading: "New hire-developers enquiry from the ALPIXN website",
        rows: [
          ["Role page", role],
          ["Name", fullName],
          ["Email", email],
          ["Phone", phone],
          ["Company", company],
          ["Technology", technology],
        ],
        message,
        replyName: fullName,
        replyEmail: email,
      });
      emailed = true;
    } catch (error) {
      console.error("Offshore enquiry email failed:", error);
    }
  }

  let stored = false;
  try {
    await connectToDatabase();
    const [firstName, ...rest] = fullName.split(/\s+/);
    await ContactMessageModel.create({
      firstName,
      lastName: rest.join(" ") || "-",
      email,
      phone,
      interest: `hire-developers${technology ? `: ${technology}` : ""}${role ? ` (${role})` : ""}`,
      message: [company ? `Company: ${company}` : "", message].filter(Boolean).join("\n\n"),
      status: "new",
    });
    stored = true;
    revalidatePath("/admin/contact");
  } catch (error) {
    console.error("Offshore enquiry could not be stored:", error);
  }

  if (!emailed && !stored) {
    redirect(`${redirectTo}?error=${encodeURIComponent("Sorry, your enquiry could not be sent. Please email info@alpixn.com directly.")}`);
  }
  redirect(`${redirectTo}?status=sent`);
}
