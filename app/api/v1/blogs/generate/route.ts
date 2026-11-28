import { z } from "zod";
import { requireApiScope } from "@/lib/api-auth";
import { generateBlogPost } from "@/lib/ai/blog-writer";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

const Body = z.object({ topic: z.string().max(200).optional(), publish: z.boolean().optional() });

/** POST /api/v1/blogs/generate — the site's own AI writes a new article (scope ai:generate; publish:true needs blogs:publish). */
export async function POST(request: Request) {
  const auth = await requireApiScope(request, "ai:generate");
  if (!auth.ok) return auth.response;
  const parsed = Body.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) return Response.json({ error: "Invalid body" }, { status: 400 });
  if (parsed.data.publish) {
    const canPublish = await requireApiScope(request, "blogs:publish");
    if (!canPublish.ok) return canPublish.response;
  }
  const result = await generateBlogPost({ trigger: "api", topic: parsed.data.topic, publish: parsed.data.publish });
  return Response.json(result, { status: result.ok ? 201 : 422 });
}
