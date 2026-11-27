import type { Metadata } from "next";
import Link from "next/link";

import { deleteEntityAction, upsertEntityAction } from "@/admin/actions/admin-actions";
import { FormActions, FormGrid } from "@/components/admin/admin-form-helpers";
import { BlogRichEditor } from "@/components/admin/resources-rich-editors";
import {
  AdminDirectoryList,
  AdminManagerLayout,
  AdminMetricCard,
  AdminRecordLink,
  AdminSectionCard,
  AdminShell,
  StatusNotice,
  getAdminFlashMessage,
} from "@/components/admin/admin-ui";
import { SubmitButton } from "@/components/admin/submit-button";
import { getAdminBlogPosts, getBlogCategories } from "@/lib/content-service";

export const metadata: Metadata = {
  title: "Admin Blogs",
};

type PageProps = {
  searchParams: Promise<{
    status?: string;
    error?: string;
    edit?: string;
  }>;
};

export default async function AdminBlogsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const message = getAdminFlashMessage(params.status, params.error);
  const items = await getAdminBlogPosts();
  const categories = await getBlogCategories();
  const selectedItem = items.find((item) => item._id === params.edit) ?? null;
  const saveAction = upsertEntityAction.bind(null, "blog", "/admin/blogs");
  const deleteAction = deleteEntityAction.bind(null, "blog", "/admin/blogs");
  const featuredPost = items.find((item) => item.featured);

  return (
    <AdminShell
      activePath="/admin/blogs"
      title="Blog manager"
      description="Control featured articles, categories, editorial cards, and uploaded blog cover images."
    >
      {message ? <StatusNotice tone={message.tone} message={message.message} /> : null}

      <section className="grid gap-6 md:grid-cols-3">
        <AdminMetricCard
          label="Articles"
          value={String(items.length)}
          description="All stored article cards available to the public blog page."
        />
        <AdminMetricCard
          label="Categories"
          value={String(categories.length)}
          description="Detected across both seeded and admin-created blog records."
        />
        <AdminMetricCard
          label="Featured"
          value={featuredPost ? featuredPost.title : "None"}
          description="Only one article stays featured at a time."
        />
      </section>

      <AdminManagerLayout
        sidebar={
          <AdminSectionCard
            title="Article directory"
            description="Use the article picker to jump between posts and keep editing focused on one entry at a time."
          >
            <AdminDirectoryList>
              <AdminRecordLink
                href="/admin/blogs"
                active={!selectedItem}
                title="Create new article"
                subtitle="Open a blank article form"
                meta={`${categories.length} categories available`}
                leading="+"
              />
              {items.map((item) => (
                <AdminRecordLink
                  key={item._id}
                  href={`/admin/blogs?edit=${item._id}`}
                  active={selectedItem?._id === item._id}
                  title={item.title}
                  subtitle={item.category}
                  meta={`${item.author} • ${item.readTime}`}
                  leading={item.category.slice(0, 2).toUpperCase()}
                  trailing={
                    <div className="flex flex-wrap gap-2">
                      {item.featured ? (
                        <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-100">
                          Featured
                        </span>
                      ) : null}
                      <span className="rounded-full border border-white/10 bg-black/5 dark:bg-black/5 dark:bg-white/6 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-200">
                        {item.isPublished ? "Live" : "Draft"}
                      </span>
                    </div>
                  }
                />
              ))}
            </AdminDirectoryList>
          </AdminSectionCard>
        }
        editor={
          <AdminSectionCard
            title={selectedItem ? `Edit ${selectedItem.title}` : "Create article"}
            description={
              selectedItem
                ? "Change editorial copy, cover image, publish state, and featured status from one focused editing panel."
                : "Add a new article with category, read time, excerpt, and optional cover art."
            }
          >
            <form action={saveAction} className="grid gap-5">
              {selectedItem ? <input type="hidden" name="id" value={selectedItem._id} /> : null}
              <FormGrid>
                <BlogRichEditor key={selectedItem?._id ?? "new"} values={selectedItem ?? { order: items.length + 1, isPublished: true, featured: false }} />
              </FormGrid>
              <FormActions>
                <SubmitButton
                  label={selectedItem ? "Save changes" : "Create article"}
                  pendingLabel={selectedItem ? "Saving..." : "Creating..."}
                />
                {selectedItem ? (
                  <Link
                    href="/admin/blogs"
                    scroll={false}
                    className="inline-flex items-center rounded-full border border-white/12 bg-black/5 dark:bg-black/5 dark:bg-white/6 px-5 py-3 text-sm font-medium text-slate-100 transition hover:bg-black/5 dark:bg-black/5 dark:bg-white/10"
                  >
                    Create another
                  </Link>
                ) : null}
              </FormActions>
            </form>

            {selectedItem ? (
              <form action={deleteAction} className="mt-4">
                <input type="hidden" name="id" value={selectedItem._id} />
                <SubmitButton label="Delete article" pendingLabel="Deleting..." variant="danger" />
              </form>
            ) : null}
          </AdminSectionCard>
        }
      />
    </AdminShell>
  );
}
