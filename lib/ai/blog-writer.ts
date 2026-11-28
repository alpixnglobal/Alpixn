import { revalidatePath, revalidateTag } from "next/cache";
import { after } from "next/server";
import { z } from "zod";
import { BLOG_CATEGORIES, EDITORIAL_AUTHOR, countWords, readingTime } from "@/lib/blog/types";
import { createSlugForModel } from "@/lib/content-service";
import { connectToDatabase } from "@/lib/db";
import { BlogPostModel } from "@/lib/models";
import { generateStructured } from "./providers";
import { appendAiLog, getAiSettings, saveAiSettings, type AiRunLog } from "./settings";

const BlogDraftSchema = z.object({
  title: z.string().describe("Specific, useful headline, 45–70 characters"),
  metaTitle: z.string().describe("SEO title, max 60 characters"),
  metaDescription: z.string().describe("SEO description, 120–155 characters"),
  excerpt: z.string().describe("Two-sentence summary for the blog card"),
  category: z.enum(BLOG_CATEGORIES as [string, ...string[]]),
  tags: z.array(z.string()).describe("3–6 short topical tags"),
  keywords: z.array(z.string()).describe("4–8 search phrases this article should rank for"),
  body: z.string().describe("Markdown article body. Starts with an H2 (##), never an H1."),
  sources: z
    .array(z.object({ label: z.string(), url: z.string() }))
    .describe("Only official documentation or standards pages you are certain exist. Empty array if unsure."),
});

export type BlogDraft = z.infer<typeof BlogDraftSchema>;

const SYSTEM = `You are a senior technical writer for ALPIXN, an AI, robotics and software engineering company (custom software, AI solutions and agents, multilingual AI calling, automation, web and mobile apps, cloud, offshore developer teams). Offices in India (Gurugram) and other regions.

Write original, genuinely useful articles in your own words. Strict rules:
- Do not copy or closely paraphrase any existing article, website or book. No long quotations.
- Never invent statistics, survey results, percentages, client names, case studies, testimonials, awards, certifications, quotes or people. If a number is not common knowledge, describe the idea without a number.
- Do not claim ALPIXN has done specific projects or has specific results. You may say ALPIXN "can help" or "builds" a kind of solution.
- Only list sources that are official documentation or standards pages you are certain exist (e.g. a vendor's docs home page). If unsure, return an empty sources array.
- Plain, practical English for business and technical decision makers. Explain trade-offs, costs to consider, risks and a step-by-step approach. Use H2/H3 headings, short paragraphs, bullet lists and one simple table where helpful.
- End with a short "Next steps" section that mentions ALPIXN can help, without hype or guarantees.`;

/* ---------------- originality checks ---------------- */

const words = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((w) => w.length > 2);

function titleSimilarity(a: string, b: string) {
  const A = new Set(words(a));
  const B = new Set(words(b));
  const inter = [...A].filter((w) => B.has(w)).length;
  return inter / Math.max(1, new Set([...A, ...B]).size);
}

function shingles(text: string, n = 8) {
  const w = words(text);
  const set = new Set<string>();
  for (let i = 0; i + n <= w.length; i++) set.add(w.slice(i, i + n).join(" "));
  return set;
}

/** Share of the new article's 8-word phrases that already appear in an existing article. */
function overlap(newText: string, oldText: string) {
  const a = shingles(newText);
  if (!a.size) return 0;
  const b = shingles(oldText);
  let hit = 0;
  for (const s of a) if (b.has(s)) hit++;
  return hit / a.size;
}

/* ---------------- cover image (generated SVG, no external service) ---------------- */

const CATEGORY_TONES: Record<string, [string, string]> = {
  "AI & Machine Learning": ["#064a87", "#0878d1"],
  "Robotics & Automation": ["#071a33", "#064a87"],
  "Software Engineering": ["#0b3a6a", "#0878d1"],
  "Technology Stack": ["#071a33", "#9a5b08"],
  "Industry Solutions": ["#064a87", "#d99a19"],
};

function escapeXml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function coverSvgDataUri(title: string, category: string) {
  const [c1, c2] = CATEGORY_TONES[category] ?? ["#071a33", "#0878d1"];
  const lines: string[] = [];
  let line = "";
  for (const w of title.split(/\s+/)) {
    if ((line + " " + w).trim().length > 28) {
      lines.push(line.trim());
      line = w;
    } else line += ` ${w}`;
  }
  if (line.trim()) lines.push(line.trim());
  const text = lines
    .slice(0, 4)
    .map((l, i) => `<text x="70" y="${250 + i * 64}" font-family="Sora,Arial,sans-serif" font-size="52" font-weight="700" fill="#ffffff">${escapeXml(l)}</text>`)
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient><linearGradient id="b" x1="0" x2="1"><stop offset="0" stop-color="#071a33"/><stop offset=".25" stop-color="#064a87"/><stop offset=".5" stop-color="#0878d1"/><stop offset=".7" stop-color="#f6d77a"/><stop offset=".85" stop-color="#d99a19"/><stop offset="1" stop-color="#9a5b08"/></linearGradient><pattern id="p" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#ffffff" stroke-opacity=".06"/></pattern></defs><rect width="1200" height="630" fill="url(#g)"/><rect width="1200" height="630" fill="url(#p)"/><circle cx="1040" cy="120" r="220" fill="#f6d77a" fill-opacity=".12"/><text x="70" y="130" font-family="Inter,Arial,sans-serif" font-size="24" font-weight="600" letter-spacing="4" fill="#f6d77a">${escapeXml(category.toUpperCase())}</text>${text}<text x="70" y="575" font-family="Sora,Arial,sans-serif" font-size="26" font-weight="700" fill="#ffffff" fill-opacity=".85">ALPIXN</text><rect y="618" width="1200" height="12" fill="url(#b)"/></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

/* ---------------- main ---------------- */

export type GenerateResult = { ok: true; slug: string; title: string; published: boolean } | { ok: false; error: string };

/**
 * Writes one new blog article with the configured AI provider, checks it for originality against
 * every existing article, and saves it as a draft (or publishes it, per AI Studio settings).
 */
type GenerateOptions = { trigger: AiRunLog["trigger"]; topic?: string; publish?: boolean; providerId?: string };

const LOCK_MS = 15 * 60 * 1000;

/** True on hosts that keep the Node process running after a response (AWS EC2 + PM2, Docker, etc.). */
export const canRunInBackground = () => !process.env.VERCEL;

export async function isGenerationRunning() {
  const s = await getAiSettings();
  return Boolean(s.runningSince && Date.now() - Date.parse(s.runningSince) < LOCK_MS);
}

/**
 * Starts writing an article without waiting for it (avoids proxy timeouts such as Nginx's 60 s).
 * The result appears in AI Studio → Recent activity.
 */
export async function startBlogPostInBackground(opts: GenerateOptions) {
  if (await isGenerationRunning()) return { started: false as const, reason: "An article is already being written. Check Recent activity in a few minutes." };
  // after(): runs once the response is sent, still inside the request (so cache revalidation is allowed).
  after(() =>
    generateBlogPost(opts).catch(async (error) => {
      await appendAiLog({ at: new Date().toISOString(), status: "error", message: error instanceof Error ? error.message : "AI generation failed.", trigger: opts.trigger }).catch(() => {});
    })
  );
  return { started: true as const };
}

export async function generateBlogPost(opts: GenerateOptions): Promise<GenerateResult> {
  if (await isGenerationRunning()) return { ok: false, error: "An article is already being written. Try again in a few minutes." };
  const initial = await getAiSettings();
  await saveAiSettings({ ...initial, runningSince: new Date().toISOString() });
  try {
    return await writeAndSave(opts);
  } finally {
    const latest = await getAiSettings();
    await saveAiSettings({ ...latest, runningSince: undefined }).catch(() => {});
  }
}

async function writeAndSave(opts: GenerateOptions): Promise<GenerateResult> {
  const settings = await getAiSettings();
  const providerId = opts.providerId || settings.autopilot.providerId || settings.defaultProviderId;
  const provider = settings.providers.find((p) => p.id === providerId && p.enabled) ?? settings.providers.find((p) => p.enabled);
  const fail = async (error: string): Promise<GenerateResult> => {
    await appendAiLog({ at: new Date().toISOString(), status: "error", message: error, provider: provider?.label, trigger: opts.trigger }).catch(() => {});
    return { ok: false, error };
  };
  if (!provider) return fail("No AI provider is enabled in AI Studio.");

  await connectToDatabase();
  const existing = (await BlogPostModel.find({}, { title: 1, slug: 1, content: 1, order: 1 }).lean()) as unknown as { title: string; slug: string; content: string; order?: number }[];
  const queueTopic = !opts.topic ? settings.autopilot.topics[0] : undefined;
  const topic = (opts.topic || queueTopic || "").trim();

  const prompt = [
    topic ? `Write an article on this topic: "${topic}".` : "Choose a fresh, specific topic that our audience is searching for right now, related to AI, automation, robotics, custom software, cloud or hiring developers. It must not overlap with any existing title below.",
    `Audience and focus: ${settings.autopilot.brief}`,
    `Length: at least ${settings.autopilot.minWords} words in the body.`,
    `Existing article titles (do not repeat or closely match these):\n${existing.map((p) => `- ${p.title}`).join("\n")}`,
  ].join("\n\n");

  let draft: BlogDraft;
  try {
    draft = await generateStructured(provider, { system: SYSTEM, prompt, schema: BlogDraftSchema, name: "blog_post" });
  } catch (error) {
    return fail(error instanceof Error ? error.message : "AI generation failed.");
  }

  // Quality and originality gates
  const body = draft.body.replace(/^#\s.*\n+/, "").trim();
  const wordCount = countWords(body);
  if (wordCount < Math.round(settings.autopilot.minWords * 0.7)) return fail(`Draft too short (${wordCount} words). Nothing was saved.`);
  const similarTitle = existing.find((p) => titleSimilarity(p.title, draft.title) > 0.6);
  if (similarTitle) return fail(`Topic too close to an existing article (“${similarTitle.title}”). Nothing was saved.`);
  const copied = existing.find((p) => overlap(body, p.content || "") > 0.08);
  if (copied) return fail(`Draft repeats too much text from “${copied.title}”. Nothing was saved.`);

  const publish = opts.publish ?? settings.autopilot.publishMode === "publish";
  const slug = await createSlugForModel(BlogPostModel, draft.title);
  const today = new Date().toISOString().slice(0, 10);
  const sources = draft.sources.filter((s) => /^https:\/\/[^\s]+$/.test(s.url)).slice(0, 6);

  await BlogPostModel.create({
    title: draft.title.trim(),
    slug,
    excerpt: draft.excerpt.trim(),
    content: body,
    author: EDITORIAL_AUTHOR,
    readTime: readingTime(body),
    category: draft.category,
    featured: false,
    accent: "",
    imageData: coverSvgDataUri(draft.title, draft.category),
    order: Math.max(0, ...existing.map((p) => p.order ?? 0)) + 1,
    isPublished: publish,
    metaTitle: draft.metaTitle.slice(0, 120),
    metaDescription: draft.metaDescription.slice(0, 320),
    tags: [...new Set([...draft.tags, ...draft.keywords])].slice(0, 12),
    publishedAt: today,
    modifiedAt: today,
    sources,
    aiAssisted: true,
  });

  // Consume the queued topic and log the run.
  const fresh = await getAiSettings();
  await saveAiSettings({
    ...fresh,
    autopilot: { ...fresh.autopilot, topics: queueTopic ? fresh.autopilot.topics.filter((t) => t !== queueTopic) : fresh.autopilot.topics },
    log: [{ at: new Date().toISOString(), status: "ok" as const, message: `${publish ? "Published" : "Saved draft"}: ${draft.title}`, slug, provider: provider.label, trigger: opts.trigger }, ...fresh.log].slice(0, 50),
  });

  try {
    revalidateTag("blog", { expire: 0 });
    revalidatePath("/resources/blogs");
    revalidatePath(`/resources/blogs/${slug}`);
    revalidatePath("/sitemap.xml");
  } catch {
    // Outside a request (e.g. a script) revalidation is not available; pages refresh on their normal schedule.
  }
  return { ok: true, slug, title: draft.title, published: publish };
}
