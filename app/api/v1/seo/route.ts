import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { requireApiScope } from "@/lib/api-auth";
import { SeoPageModel } from "@/lib/models";
import { getSeoPageOverrides, normalizePath } from "@/lib/seo-store";
import { getAllSitePaths } from "@/lib/site-paths";

export const dynamic = "force-dynamic";

/** GET /api/v1/seo — every page with its custom SEO, if any (scope seo:read). */
export async function GET(request: Request) {
  const auth = await requireApiScope(request, "seo:read");
  if (!auth.ok) return auth.response;
  const [paths, overrides] = await Promise.all([getAllSitePaths(), getSeoPageOverrides()]);
  const map = new Map(overrides.map((o) => [o.path, o]));
  return Response.json({ pages: paths.map((p) => ({ path: p.path, label: p.label, group: p.group, seo: map.get(p.path) ?? null })) });
}

const Body = z.object({
  path: z.string().min(1),
  title: z.string().max(200).optional(),
  description: z.string().max(400).optional(),
  keywords: z.array(z.string().max(80)).max(30).optional(),
  noindex: z.boolean().optional(),
});

/** PUT /api/v1/seo — set SEO title/description/keywords for one page (scope seo:write). */
export async function PUT(request: Request) {
  const auth = await requireApiScope(request, "seo:write");
  if (!auth.ok) return auth.response;
  const parsed = Body.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Invalid body", issues: parsed.error.issues }, { status: 400 });
  const path = normalizePath(parsed.data.path);
  await SeoPageModel.updateOne({ path }, { $set: { ...parsed.data, path } }, { upsert: true });
  revalidateTag("seo", { expire: 0 });
  revalidatePath(path);
  return Response.json({ ok: true, path });
}
