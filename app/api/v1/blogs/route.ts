import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { requireApiScope } from "@/lib/api-auth";
import { BLOG_CATEGORIES, EDITORIAL_AUTHOR, readingTime } from "@/lib/blog/types";
import { coverSvgDataUri } from "@/lib/ai/blog-writer";
import { appendAiLog } from "@/lib/ai/settings";
import { createSlugForModel } from "@/lib/content-service";
import { BlogPostModel } from "@/lib/models";

export const dynamic = "force-dynamic";

/** GET /api/v1/blogs — list articles (scope blogs:read). ?status=published|draft|all */
export async function GET(request: Request) {
  const auth = await requireApiScope(request, "blogs:read");
  if (!auth.ok) return auth.response;
  const status = new URL(request.url).searchParams.get("status") ?? "all";
  const filter = status === "published" ? { isPublished: true } : status === "draft" ? { isPublished: false } : {};
  const posts = (await BlogPostModel.find(filter, { title: 1, slug: 1, excerpt: 1, category: 1, tags: 1, isPublished: 1, publishedAt: 1, aiAssisted: 1 })
    .sort({ createdAt: -1 })
    .limit(200)
    .lean()) as unknown as Record<string, unknown>[];
  return Response.json({ posts: posts.map(({ _id, ...p }) => ({ id: String(_id), ...p })) });
}

const CreateSchema = z.object({
  title: z.string().min(10).max(160),
  excerpt: z.string().min(20).max(400),
  content: z.string().min(400).describe("Markdown body starting with an H2"),
  category: z.enum(BLOG_CATEGORIES as [string, ...string[]]),
  tags: z.array(z.string().max(40)).max(12).default([]),
  metaTitle: z.string().max(120).optional(),
  metaDescription: z.string().max(320).optional(),
  publish: z.boolean().default(false),
});

/** POST /api/v1/blogs — create an article (scope blogs:write; publish:true also needs blogs:publish). */
export async function POST(request: Request) {
  const auth = await requireApiScope(request, "blogs:write");
  if (!auth.ok) return auth.response;
  const parsed = CreateSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Invalid body", issues: parsed.error.issues }, { status: 400 });
  const data = parsed.data;
  if (data.publish) {
    const canPublish = await requireApiScope(request, "blogs:publish");
    if (!canPublish.ok) return canPublish.response;
  }
  if (await BlogPostModel.exists({ title: data.title })) return Response.json({ error: "An article with this title already exists." }, { status: 409 });

  const slug = await createSlugForModel(BlogPostModel, data.title);
  const today = new Date().toISOString().slice(0, 10);
  const last = (await BlogPostModel.findOne({}, { order: 1 }).sort({ order: -1 }).lean()) as { order?: number } | null;
  const body = data.content.replace(/^#\s.*\n+/, "").trim();
  await BlogPostModel.create({
    title: data.title,
    slug,
    excerpt: data.excerpt,
    content: body,
    author: EDITORIAL_AUTHOR,
    readTime: readingTime(body),
    category: data.category,
    featured: false,
    imageData: coverSvgDataUri(data.title, data.category),
    order: (last?.order ?? 0) + 1,
    isPublished: data.publish,
    metaTitle: data.metaTitle ?? "",
    metaDescription: data.metaDescription ?? "",
    tags: data.tags,
    publishedAt: today,
    modifiedAt: today,
    aiAssisted: true,
  });
  await appendAiLog({ at: new Date().toISOString(), status: "ok", message: `${data.publish ? "Published" : "Draft"} via API (${auth.tokenName}): ${data.title}`, slug, trigger: "api" }).catch(() => {});
  revalidateTag("blog", { expire: 0 });
  revalidatePath("/resources/blogs");
  return Response.json({ slug, url: `/resources/blogs/${slug}`, published: data.publish }, { status: 201 });
}
