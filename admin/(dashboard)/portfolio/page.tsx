import type { Metadata } from "next";
import Link from "next/link";

import { deleteEntityAction, upsertEntityAction } from "@/admin/actions/admin-actions";
import { FormActions, FormGrid } from "@/components/admin/admin-form-helpers";
import { PortfolioRichEditor } from "@/components/admin/resources-rich-editors";
import { AdminDirectoryList, AdminManagerLayout, AdminMetricCard, AdminRecordLink, AdminSectionCard, StatusNotice, getAdminFlashMessage } from "@/components/admin/admin-ui";
import { AdminShell } from "@/components/admin/admin-shell";
import { SubmitButton } from "@/components/admin/submit-button";
import { getAdminPortfolioProjects } from "@/lib/content-service";

export const metadata: Metadata = {
  title: "Admin Portfolio",
};

type PageProps = {
  searchParams: Promise<{
    status?: string;
    error?: string;
    edit?: string;
  }>;
};

export default async function AdminPortfolioPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const message = getAdminFlashMessage(params.status, params.error);
  const items = await getAdminPortfolioProjects();
  const selectedItem = items.find((item) => item._id === params.edit) ?? null;
  const saveAction = upsertEntityAction.bind(null, "portfolio", "/admin/portfolio");
  const deleteAction = deleteEntityAction.bind(null, "portfolio", "/admin/portfolio");

  return (
    <AdminShell
      activePath="/admin/portfolio"
      title="Portfolio manager"
      description="Control the case study collection, card visuals, tags, and business outcome copy for the public portfolio page."
    >
      {message ? <StatusNotice tone={message.tone} message={message.message} /> : null}

      <section className="grid gap-6 md:grid-cols-3">
        <AdminMetricCard
          label="Projects"
          value={String(items.length)}
          description="All portfolio entries currently stored in MongoDB."
        />
        <AdminMetricCard
          label="Published"
          value={String(items.filter((item) => item.isPublished).length)}
          description="Visible projects shown on the public case-study grid."
        />
        <AdminMetricCard
          label="With cover images"
          value={String(items.filter((item) => Boolean(item.imageData)).length)}
          description="Projects using uploaded visual covers instead of accent-only cards."
        />
      </section>

      <AdminManagerLayout
        sidebar={
          <AdminSectionCard
            title="Project directory"
            description="Keep the case study list on one side and edit only the selected project in the main panel."
          >
            <AdminDirectoryList>
              <AdminRecordLink
                href="/admin/portfolio"
                active={!selectedItem}
                title="Create new project"
                subtitle="Open a blank case study form"
                meta="Blank form"
                leading="+"
              />
              {items.map((item) => (
                <AdminRecordLink
                  key={item._id}
                  href={`/admin/portfolio?edit=${item._id}`}
                  active={selectedItem?._id === item._id}
                  title={item.title}
                  subtitle={item.industry}
                  meta={item.tags.join(" • ")}
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
            title={selectedItem ? `Edit ${selectedItem.title}` : "Create project"}
            description={
              selectedItem
                ? "Update one case study at a time, including the cover image, outcome text, and tags."
                : "Add a new case study with tags, outcome, and card imagery."
            }
          >
            <form action={saveAction} className="grid gap-5">
              {selectedItem ? <input type="hidden" name="id" value={selectedItem._id} /> : null}
              <FormGrid>
                <PortfolioRichEditor key={selectedItem?._id ?? "new"} values={selectedItem ?? { order: items.length + 1, isPublished: true }} />
              </FormGrid>
              <FormActions>
                <SubmitButton
                  label={selectedItem ? "Save changes" : "Create project"}
                  pendingLabel={selectedItem ? "Saving..." : "Creating..."}
                />
                {selectedItem ? (
                  <Link
                    href="/admin/portfolio"
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
                <SubmitButton label="Delete project" pendingLabel="Deleting..." variant="danger" />
              </form>
            ) : null}
          </AdminSectionCard>
        }
      />
    </AdminShell>
  );
}
