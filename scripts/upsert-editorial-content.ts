/**
 * Adds the 2026 editorial content (blog articles, concept portfolio projects) to an existing MongoDB
 * database WITHOUT overwriting anything that already exists.
 *
 *   npx tsx scripts/upsert-editorial-content.ts                 # dry run (prints what would change)
 *   npx tsx scripts/upsert-editorial-content.ts --apply         # insert missing records
 *   npx tsx scripts/upsert-editorial-content.ts --apply --unpublish-legacy-blogs
 *   npx tsx scripts/upsert-editorial-content.ts --apply --mark-legacy-portfolio-unverified
 *
 * Reads MONGODB_URI from the environment (.env.local / .env are loaded if present).
 * Never run against production without a backup.
 */
import { existsSync, readFileSync } from "node:fs";
import mongoose from "mongoose";

for (const file of [".env.local", ".env"]) {
  if (!existsSync(file)) continue;
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const args = new Set(process.argv.slice(2));
const apply = args.has("--apply");

async function main() {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not set.");
  // Import after env is loaded.
  const { BlogPostModel, PortfolioProjectModel } = await import("../lib/models");
  const { getEditorialSeed } = await import("../lib/content-service");
  await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 8000 });

  const { blogs, portfolio } = getEditorialSeed();

  const existingBlogSlugs = new Set((await BlogPostModel.find({}, { slug: 1 }).lean()).map((d) => (d as unknown as { slug: string }).slug));
  const newBlogs = blogs.filter((b) => !existingBlogSlugs.has(b.slug));
  const existingProjectSlugs = new Set((await PortfolioProjectModel.find({}, { slug: 1 }).lean()).map((d) => (d as unknown as { slug: string }).slug));
  const newProjects = portfolio.filter((p) => !existingProjectSlugs.has(p.slug));

  console.log(`Blog posts: ${blogs.length} editorial, ${newBlogs.length} missing from database`);
  console.log(`Portfolio projects: ${portfolio.length} concept projects, ${newProjects.length} missing from database`);

  const editorialSlugs = new Set(blogs.map((b) => b.slug));
  const legacyBlogs = [...existingBlogSlugs].filter((s) => !editorialSlugs.has(s));
  if (args.has("--unpublish-legacy-blogs")) console.log(`Legacy blog posts to unpublish: ${legacyBlogs.length}`);

  if (!apply) {
    console.log("\nDry run only. Re-run with --apply to write changes.");
    await mongoose.disconnect();
    return;
  }

  if (newBlogs.length) await BlogPostModel.insertMany(newBlogs, { ordered: false });
  if (newProjects.length) await PortfolioProjectModel.insertMany(newProjects, { ordered: false });

  if (args.has("--unpublish-legacy-blogs") && legacyBlogs.length) {
    const res = await BlogPostModel.updateMany({ slug: { $in: legacyBlogs } }, { $set: { isPublished: false } });
    console.log(`Unpublished ${res.modifiedCount} legacy posts (not deleted).`);
  }

  if (args.has("--mark-legacy-portfolio-unverified")) {
    const projectSlugs = new Set(portfolio.map((p) => p.slug));
    const res = await PortfolioProjectModel.updateMany(
      { slug: { $nin: [...projectSlugs] }, $or: [{ verificationStatus: { $exists: false } }, { verificationStatus: "" }] },
      { $set: { verificationStatus: "unverified" } }
    );
    console.log(`Marked ${res.modifiedCount} legacy portfolio projects as unverified (hidden from the public site).`);
  }

  console.log(`Inserted ${newBlogs.length} blog posts and ${newProjects.length} portfolio projects.`);
  await mongoose.disconnect();
}

main().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect().catch(() => undefined);
  process.exit(1);
});
