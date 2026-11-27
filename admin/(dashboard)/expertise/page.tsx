import type { Metadata } from "next";
import Link from "next/link";

import { deleteEntityAction, saveExpertiseSettingsAction, upsertEntityAction } from "@/admin/actions/admin-actions";
import { FormActions, FormGrid } from "@/components/admin/admin-form-helpers";
import { ExpertisePageRichEditor, ExpertiseSettingsRichEditor } from "@/components/admin/expertise-rich-editors";
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
import { getAdminExpertisePages, getExpertiseSettings } from "@/lib/content-service";

export const metadata: Metadata = {
  title: "Admin Expertise",
};

type PageProps = {
  searchParams: Promise<{
    status?: string;
    error?: string;
    edit?: string;
  }>;
};

export default async function AdminExpertisePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const message = getAdminFlashMessage(params.status, params.error);
  const [items, settings] = await Promise.all([getAdminExpertisePages(), getExpertiseSettings()]);
  const selectedItem = items.find((item) => item._id === params.edit) ?? null;
  const savePageAction = upsertEntityAction.bind(null, "expertise", "/admin/expertise");
  const deletePageAction = deleteEntityAction.bind(null, "expertise", "/admin/expertise");

  return (
    <AdminShell
      activePath="/admin/expertise"
      title="Our Expertise manager"
      description="Manage the expertise dropdown navigation, expertise detail pages, and the shared sections reused across expertise routes."
    >
      {message ? <StatusNotice tone={message.tone} message={message.message} /> : null}

      <section className="grid gap-6 md:grid-cols-3">
        <AdminMetricCard label="Expertise pages" value={String(items.length)} description="All expertise pages currently stored in MongoDB." />
        <AdminMetricCard label="Published" value={String(items.filter((item) => item.isPublished).length)} description="Visible expertise pages shown in the dropdown and public expertise routes." />
        <AdminMetricCard label="Dropdown groups" value={String(settings.menuCategories.length)} description="Tabbed expertise categories shown in desktop dropdown and mobile menu." />
      </section>

      <AdminSectionCard
        title="Shared expertise sections"
        description="These settings control the dropdown tab groups, shared testimonials, engagement models, tech stack section, and FAQ block."
      >
        <form action={saveExpertiseSettingsAction} className="grid gap-5">
          <ExpertiseSettingsRichEditor values={settings} />
          <FormActions>
            <SubmitButton label="Save shared expertise settings" pendingLabel="Saving..." />
          </FormActions>
        </form>
      </AdminSectionCard>

      <AdminManagerLayout
        sidebar={
          <AdminSectionCard title="Expertise page directory" description="Manage each expertise page that appears in the expertise dropdown and public routes.">
            <AdminDirectoryList>
              <AdminRecordLink
                href="/admin/expertise"
                active={!selectedItem}
                title="Create new expertise page"
                subtitle="Open a blank expertise page form"
                meta="Blank form"
                leading="+"
              />
              {items.map((item) => (
                <AdminRecordLink
                  key={item._id}
                  href={`/admin/expertise?edit=${item._id}`}
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
            title={selectedItem ? `Edit ${selectedItem.navLabel}` : "Create expertise page"}
            description={
              selectedItem
                ? "Update one expertise page at a time, including all page-specific sections."
                : "Add a new expertise page for the dropdown and public expertise route."
            }
          >
            <form action={savePageAction} className="grid gap-5">
              {selectedItem ? <input type="hidden" name="id" value={selectedItem._id} /> : null}
              <FormGrid>
                <ExpertisePageRichEditor
                  values={selectedItem ?? { categoryKey: settings.menuCategories[0]?.key ?? "software-solution", order: 1, isPublished: true }}
                />
              </FormGrid>
              <FormActions>
                <SubmitButton label={selectedItem ? "Save expertise page" : "Create expertise page"} pendingLabel={selectedItem ? "Saving..." : "Creating..."} />
                {selectedItem ? (
                  <Link
                    href="/admin/expertise"
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
                <SubmitButton label="Delete expertise page" pendingLabel="Deleting..." variant="danger" />
              </form>
            ) : null}
          </AdminSectionCard>
        }
      />
    </AdminShell>
  );
}
