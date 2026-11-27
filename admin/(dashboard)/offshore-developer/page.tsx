import type { Metadata } from "next";
import Link from "next/link";

import { deleteEntityAction, saveOffshoreDeveloperSettingsAction, upsertEntityAction } from "@/admin/actions/admin-actions";
import { FormActions, FormGrid } from "@/components/admin/admin-form-helpers";
import { OffshoreDeveloperPageRichEditor, OffshoreDeveloperSettingsRichEditor } from "@/components/admin/offshore-developer-rich-editors";
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
import { getAdminOffshoreDeveloperPages, getOffshoreDeveloperSettings } from "@/lib/content-service";

export const metadata: Metadata = {
  title: "Admin Offshore Developer",
};

type PageProps = {
  searchParams: Promise<{
    status?: string;
    error?: string;
    edit?: string;
  }>;
};

export default async function AdminOffshoreDeveloperPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const message = getAdminFlashMessage(params.status, params.error);
  const [items, settings] = await Promise.all([getAdminOffshoreDeveloperPages(), getOffshoreDeveloperSettings()]);
  const selectedItem = items.find((item) => item._id === params.edit) ?? null;
  const savePageAction = upsertEntityAction.bind(null, "offshore", "/admin/offshore-developer");
  const deletePageAction = deleteEntityAction.bind(null, "offshore", "/admin/offshore-developer");

  return (
    <AdminShell
      activePath="/admin/offshore-developer"
      title="Offshore developer manager"
      description="Manage the offshore developer dropdown, mobile navigation, and all offshore developer page sections from MongoDB."
    >
      {message ? <StatusNotice tone={message.tone} message={message.message} /> : null}

      <section className="grid gap-6 md:grid-cols-3">
        <AdminMetricCard label="Offshore pages" value={String(items.length)} description="All offshore developer pages currently stored in MongoDB." />
        <AdminMetricCard label="Published" value={String(items.filter((item) => item.isPublished).length)} description="Visible offshore pages used in the navbar and public routes." />
        <AdminMetricCard label="Categories" value={String(settings.menuCategories.length)} description="Navigation groups shown in the offshore developer dropdown and mobile menu." />
      </section>

      <AdminSectionCard
        title="Shared offshore sections"
        description="These settings control the offshore developer dropdown categories, partner logos, testimonials, case studies, and FAQ section shared across offshore pages."
      >
        <form action={saveOffshoreDeveloperSettingsAction} className="grid gap-5">
          <OffshoreDeveloperSettingsRichEditor values={settings} />
          <FormActions>
            <SubmitButton label="Save shared offshore settings" pendingLabel="Saving..." />
          </FormActions>
        </form>
      </AdminSectionCard>

      <AdminManagerLayout
        sidebar={
          <AdminSectionCard
            title="Offshore page directory"
            description="Manage the individual offshore developer pages used in the dropdown and public detail routes."
          >
            <AdminDirectoryList>
              <AdminRecordLink
                href="/admin/offshore-developer"
                active={!selectedItem}
                title="Create new offshore page"
                subtitle="Open a blank offshore page form"
                meta="Blank form"
                leading="+"
              />
              {items.map((item) => (
                <AdminRecordLink
                  key={item._id}
                  href={`/admin/offshore-developer?edit=${item._id}`}
                  active={selectedItem?._id === item._id}
                  title={item.navLabel}
                  subtitle={item.heroTitle.replace(/<br\s*\/?\s*>/gi, " ")}
                  meta={`${item.categoryKey} / ${item.slug}`}
                  leading={String(item.order ?? 0)}
                  trailing={
                    <span className="rounded-full border border-white/10 bg-black/5 dark:bg-black/5 dark:bg-white/6 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-200">
                      {item.isPublished ? "Live" : "Draft"}
                    </span>
                  }
                />
              ))}
            </AdminDirectoryList>
          </AdminSectionCard>
        }
        editor={
          <AdminSectionCard
            title={selectedItem ? `Edit ${selectedItem.navLabel}` : "Create offshore page"}
            description={
              selectedItem
                ? "Update one offshore developer page at a time, including all page-specific sections."
                : "Add a new offshore developer page for the navbar and public offshore route."
            }
          >
            <form action={savePageAction} className="grid gap-5">
              {selectedItem ? <input type="hidden" name="id" value={selectedItem._id} /> : null}
              <FormGrid>
                <OffshoreDeveloperPageRichEditor
                  values={selectedItem ?? { categoryKey: settings.menuCategories[0]?.key ?? "backend-developer", order: 1, isPublished: true }}
                />
              </FormGrid>
              <FormActions>
                <SubmitButton label={selectedItem ? "Save offshore page" : "Create offshore page"} pendingLabel={selectedItem ? "Saving..." : "Creating..."} />
                {selectedItem ? (
                  <Link
                    href="/admin/offshore-developer"
                    scroll={false}
                    className="inline-flex items-center rounded-full border border-white/12 bg-black/5 dark:bg-black/5 dark:bg-white/6 px-5 py-3 text-sm font-medium text-slate-100 transition hover:bg-black/5 dark:bg-black/5 dark:bg-white/10"
                  >
                    Create another
                  </Link>
                ) : null}
              </FormActions>
            </form>

            {selectedItem ? (
              <form action={deletePageAction} className="mt-4">
                <input type="hidden" name="id" value={selectedItem._id} />
                <SubmitButton label="Delete offshore page" pendingLabel="Deleting..." variant="danger" />
              </form>
            ) : null}
          </AdminSectionCard>
        }
      />
    </AdminShell>
  );
}
