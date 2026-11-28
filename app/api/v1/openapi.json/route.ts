import { SITE_URL } from "@/lib/seo";

/**
 * OpenAPI 3.1 description of the CMS API. Import this URL in a ChatGPT custom GPT ("Actions"),
 * Claude tools, Zapier/Make/n8n or any HTTP client. Authenticate with an API token from Admin → AI Studio.
 */
export function GET() {
  const blogSummary = { type: "object", properties: { id: { type: "string" }, title: { type: "string" }, slug: { type: "string" }, excerpt: { type: "string" }, category: { type: "string" }, isPublished: { type: "boolean" } } };
  const spec = {
    openapi: "3.1.0",
    info: { title: "ALPIXN CMS API", version: "1.0.0", description: "Create and manage ALPIXN blog posts and page SEO. Every request needs an API token from Admin → AI Studio → API access." },
    servers: [{ url: SITE_URL }],
    components: { securitySchemes: { bearer: { type: "http", scheme: "bearer" } } },
    security: [{ bearer: [] }],
    paths: {
      "/api/v1/blogs": {
        get: {
          operationId: "listBlogPosts",
          summary: "List blog posts",
          parameters: [{ name: "status", in: "query", schema: { type: "string", enum: ["all", "published", "draft"] } }],
          responses: { "200": { description: "Posts", content: { "application/json": { schema: { type: "object", properties: { posts: { type: "array", items: blogSummary } } } } } } },
        },
        post: {
          operationId: "createBlogPost",
          summary: "Create a blog post (draft unless publish is true)",
          description: "Write original content only. Do not invent statistics, client names, testimonials or quotes.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["title", "excerpt", "content", "category"],
                  properties: {
                    title: { type: "string" },
                    excerpt: { type: "string" },
                    content: { type: "string", description: "Markdown body starting with an H2 (##)" },
                    category: { type: "string", enum: ["AI & Machine Learning", "Robotics & Automation", "Software Engineering", "Technology Stack", "Industry Solutions"] },
                    tags: { type: "array", items: { type: "string" } },
                    metaTitle: { type: "string" },
                    metaDescription: { type: "string" },
                    publish: { type: "boolean", default: false },
                  },
                },
              },
            },
          },
          responses: { "201": { description: "Created" }, "409": { description: "Duplicate title" } },
        },
      },
      "/api/v1/blogs/generate": {
        post: {
          operationId: "generateBlogPost",
          summary: "Ask the website's built-in AI to write a new blog post",
          requestBody: { content: { "application/json": { schema: { type: "object", properties: { topic: { type: "string" }, publish: { type: "boolean" } } } } } },
          responses: { "201": { description: "Created" }, "422": { description: "Generation failed or was rejected by the originality checks" } },
        },
      },
      "/api/v1/seo": {
        get: { operationId: "listPageSeo", summary: "List every page with its custom SEO", responses: { "200": { description: "Pages" } } },
        put: {
          operationId: "updatePageSeo",
          summary: "Set the SEO title, description and keywords of one page",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["path"],
                  properties: { path: { type: "string", example: "/about" }, title: { type: "string" }, description: { type: "string" }, keywords: { type: "array", items: { type: "string" } }, noindex: { type: "boolean" } },
                },
              },
            },
          },
          responses: { "200": { description: "Saved" } },
        },
      },
    },
  };
  return Response.json(spec, { headers: { "Access-Control-Allow-Origin": "*" } });
}
