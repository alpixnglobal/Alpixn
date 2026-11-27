import type { OffshoreDeveloperPageRecord } from "@/lib/content-types";
import { getExcellenceOfferingsData } from "@/lib/offshore developer/excellence-offerings-data";
import { aiRoles, cloudRoles, platformRoles } from "./ai-cloud-platforms";
import { backendRoles } from "./backend";
import { frontendRoles, mobileRoles } from "./frontend-mobile";
import type { OffshoreContent } from "./types";

export type { OffshoreContent } from "./types";

export const OFFSHORE_CONTENT: Record<string, OffshoreContent> = {
  ...backendRoles,
  ...frontendRoles,
  ...mobileRoles,
  ...aiRoles,
  ...cloudRoles,
  ...platformRoles,
};

const GROUPS: { key: string; label: string; roles: Record<string, OffshoreContent> }[] = [
  { key: "backend-developer", label: "Backend developers", roles: backendRoles },
  { key: "frontend-developer", label: "Frontend developers", roles: frontendRoles },
  { key: "mobile-app-developer", label: "Mobile app developers", roles: mobileRoles },
  { key: "ai-engineers", label: "AI engineers", roles: aiRoles },
  { key: "devops-engineers", label: "Cloud & DevOps engineers", roles: cloudRoles },
  { key: "platforms", label: "Platform specialists", roles: platformRoles },
];

/** Devicon file (public/images/tech) for roles that have a technology logo. */
const TECH_SVG: Record<string, string> = {
  "nodejs-developer": "node-js", "golang-developer": "golang", "net-developer": "dot-net", "sql-developer": "sql",
  "java-developer": "java", "django-developer": "django", "python-developer": "python", "php-developer": "php",
  "spring-boot-developer": "spring-boot", "express-js-developer": "express", "reactjs-developer": "reactjs",
  "javascript-developer": "javascript", "angular-developer": "angular", "typescript-developer": "typescript",
  "vuejs-developer": "vue-js", "nextjs-developer": "nextjs", "react-native-developer": "react-native", "net-maui": "dot-net",
  "flutter-developer": "flutter", "aws-developer": "aws", "azure-developer": "azure", "google-cloud-developer": "google-cloud",
  "salesforce-developer": "salesforce", "metaverse-developer": "metaverse",
};

export const offshoreTechIcon = (slug: string) => (TECH_SVG[slug] ? `/images/tech/${TECH_SVG[slug]}.svg` : "");

/** "AI" → "AI engineers", "Node.js" → "Node.js developers". */
function roleNoun(slug: string, tech: string) {
  if (slug.endsWith("-engineers") || slug.startsWith("ai-")) return `${tech} engineers`;
  if (slug === "full-stack-developer") return "full stack developers";
  return `${tech} developers`;
}

/** Page fields generated from the unique copy for one offshore developer page. */
export function offshorePageFields(slug: string): Partial<OffshoreDeveloperPageRecord> | null {
  const c = OFFSHORE_CONTENT[slug];
  if (!c) return null;
  const role = roleNoun(slug, c.tech);
  const group = GROUPS.find((g) => slug in g.roles);
  const siblings = group ? Object.entries(group.roles).filter(([key]) => key !== slug) : [];
  return {
    developerGridTitle: group ? `More ${group.label.toLowerCase()} you can hire` : "Other roles you can hire",
    developerItems: siblings.map(([key, item]) => {
      const noun = roleNoun(key, item.tech).replace(/s$/, "");
      return {
        name: noun.charAt(0).toUpperCase() + noun.slice(1),
        imageData: offshoreTechIcon(key),
        alt: `${item.tech} logo`,
        width: 40,
        height: 40,
        link: `/offshore-developer/${group!.key}/${key}`,
      };
    }),
    heroTitle: c.title,
    heroDescription: c.intro,
    heroChecklist: c.checklist,
    heroFormTitle: `Hire ${role}`,
    excellenceTitle: `What our ${role} build`,
    excellenceSubtitle: `Typical work our ${role} take on for product companies, startups and enterprise teams.`,
    excellenceOfferings: c.build.map(([title, description]) => ({ title, description, imageData: "", alt: "", width: 0, height: 0 })),
    partnerTitle: `Why hire ${role} from ALPIXN`,
    partnerButtonText: "Talk to us",
    partnerButtonLink: "/contact-us",
    partnerItems: [
      { title: "Vetted for real work", description: `Every candidate passes a technical interview and a practical ${c.tech} exercise before we share their profile.` },
      { title: "Works your way", description: "Engineers join your stand-ups, tools and repositories, with agreed overlap hours in your time zone." },
      { title: "Flexible engagement", description: "Start with one engineer or a full team, and scale up or down as your roadmap changes." },
      { title: "Your IP, protected", description: "NDA before any detailed discussion; all code and work products belong to you." },
    ],
    hireTitle: `${c.tech} services you can hire for`,
    hireSubtitle: `Bring in ${role} for a new build, extra capacity or a specific problem.`,
    hireServices: c.services.map(([title, description]) => ({ title, description })),
    contactTitle: `Tell us about your ${c.tech} project and we will suggest the right profiles.`,
    contactButtonText: "Share your requirements",
    contactButtonLink: "/contact-us",
    guideTitle: `How we vet ${role}`,
    guideTabs: [
      { key: "skills", label: "Core skills we check", section: "Technical depth", items: c.skills.map(([title, description]) => ({ title, description })) },
      { key: "tools", label: "Tools & ecosystem", section: `What our ${role} work with`, items: c.tools.map((title) => ({ title, description: "" })) },
      {
        key: "process",
        label: "Our selection process",
        section: "From application to your team",
        items: [
          { title: "Technical interview", description: `A senior engineer assesses ${c.tech} fundamentals, architecture thinking and past projects.` },
          { title: "Practical exercise", description: "A realistic task reviewed for code quality, testing and clarity." },
          { title: "Communication check", description: "We confirm the engineer can explain decisions clearly and work well with distributed teams." },
          { title: "Your interview", description: "You meet shortlisted engineers and choose who joins your team." },
        ],
      },
    ],
    stepsTitle: `Hire ${role} in three steps`,
    stepsButtonText: "Get started",
    stepsButtonLink: "/contact-us",
    steps: [
      { stepLabel: "Step 01", title: "Share your needs", description: `Tell us the ${c.tech} skills, seniority, team size and working hours you need.` },
      { stepLabel: "Step 02", title: "Interview the shortlist", description: "Meet matching engineers and pick the ones you want." },
      { stepLabel: "Step 03", title: "Start working", description: "We handle contracts and onboarding; your new engineers join your sprint." },
    ],
    engagementTitle: `Ways to hire ${role}`,
    engagementSubtitle: "Pick the model that suits your project and budget. You can change it as your needs evolve.",
    engagementModels: [
      { title: "Dedicated team", description: `${role[0].toUpperCase()}${role.slice(1)} working full-time on your product and reporting to you.`, features: ["Full-time commitment", "Your roadmap & priorities", "Direct communication", "Scale up or down"] },
      { title: "Staff augmentation", description: `Add individual ${role} to your existing team to cover skills or capacity.`, features: ["Fits your process", "Fast onboarding", "Flexible duration", "Knowledge sharing"] },
      { title: "Fixed-scope project", description: `A defined ${c.tech} project delivered by our team against agreed milestones.`, features: ["Agreed scope & price", "Clear milestones", "Managed delivery", "Handover & documentation"] },
    ],
    faqs: c.faqs.map(([question, answer]) => ({ question, answer })),
  };
}

/** True when a stored page still holds the original shared template copy (never edited in the CMS). */
export function isLegacyOffshoreContent(page: Pick<OffshoreDeveloperPageRecord, "slug" | "excellenceTitle" | "faqs">) {
  if (page.faqs?.length) return false;
  return page.excellenceTitle === getExcellenceOfferingsData(page.slug).mainTitle;
}
