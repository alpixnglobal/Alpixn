import type { Metadata } from "next";
import Link from "next/link";

import { deleteEntityAction, upsertEntityAction } from "@/admin/actions/admin-actions";
import { FormActions, FormGrid } from "@/components/admin/admin-form-helpers";
import { TechnologyPageRichEditor } from "@/components/admin/technology-rich-editors";
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
import { getAdminTechnologyPages } from "@/lib/content-service";

export const metadata: Metadata = {
  title: "Admin Technologies",
};

type PageProps = {
  searchParams: Promise<{
    status?: string;
    error?: string;
    edit?: string;
  }>;
};

export default async function AdminTechnologiesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const message = getAdminFlashMessage(params.status, params.error);
  const items = await getAdminTechnologyPages();
  const selectedItem = items.find((item) => item._id === params.edit) ?? null;
  const saveAction = upsertEntityAction.bind(null, "technology", "/admin/technologies");
  const deleteAction = deleteEntityAction.bind(null, "technology", "/admin/technologies");

  return (
    <AdminShell
      activePath="/admin/technologies"
      title="Technologies manager"
      description="Manage every section of the public technologies pages from MongoDB while preserving the current design structure."
    >
      {message ? <StatusNotice tone={message.tone} message={message.message} /> : null}

      <section className="grid gap-6 md:grid-cols-3">
        <AdminMetricCard
          label="Technology pages"
          value={String(items.length)}
          description="All technology detail pages currently stored in MongoDB."
        />
        <AdminMetricCard
          label="Published"
          value={String(items.filter((item) => item.isPublished).length)}
          description="Pages that are currently visible on the public technologies routes."
        />
        <AdminMetricCard
          label="Landing page"
          value={items.find((item) => item.isLanding)?.slug ?? "None"}
          description="The technology page currently powering the /technologies landing route."
        />
      </section>

      <AdminManagerLayout
        sidebar={
          <AdminSectionCard
            title="Technology directory"
            description="Choose a technology page to edit, or start a new one with the same frontend section layout."
          >
            <AdminDirectoryList>
              <AdminRecordLink
                href="/admin/technologies"
                active={!selectedItem}
                title="Create new technology page"
                subtitle="Open a blank technology content form"
                meta="Blank form"
                leading="+"
              />
              {items.map((item) => (
                <AdminRecordLink
                  key={item._id}
                  href={`/admin/technologies?edit=${item._id}`}
                  active={selectedItem?._id === item._id}
                  title={item.heroTitle}
                  subtitle={item.category}
                  meta={item.slug}
                  leading={String(item.order ?? 0)}
                  trailing={
                    <span className="rounded-full border border-white/10 bg-black/5 dark:bg-black/5 dark:bg-white/6 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-200">
                      {item.isLanding ? "Landing" : item.isPublished ? "Live" : "Draft"}
                    </span>
                  }
                />
              ))}
            </AdminDirectoryList>
          </AdminSectionCard>
        }
        editor={
          <AdminSectionCard
            title={selectedItem ? `Edit ${selectedItem.heroTitle}` : "Create technology page"}
            description={
              selectedItem
                ? "Update the public technology hero, cards, case studies, stack, engagement models, and FAQ content from one place."
                : "Create a new technology page with the current technologies frontend layout."
            }
          >
            <form action={saveAction} className="grid gap-5">
              {selectedItem ? <input type="hidden" name="id" value={selectedItem._id} /> : null}
              <FormGrid>
                <TechnologyPageRichEditor values={selectedItem ?? { order: items.length + 1, isPublished: true }} />
              </FormGrid>
              <FormActions>
                <SubmitButton
                  label={selectedItem ? "Save technology page" : "Create technology page"}
                  pendingLabel={selectedItem ? "Saving..." : "Creating..."}
                />
                {selectedItem ? (
                  <Link
                    href="/admin/technologies"
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
                <SubmitButton label="Delete technology page" pendingLabel="Deleting..." variant="danger" />
              </form>
            ) : null}
          </AdminSectionCard>
        }
      />
    </AdminShell>
  );
}
