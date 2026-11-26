import type { Metadata } from "next";
import Link from "next/link";

import { deleteEntityAction, upsertEntityAction } from "@/admin/actions/admin-actions";
import { FormActions, FormGrid } from "@/components/admin/admin-form-helpers";
import { InternRichEditor } from "@/components/admin/resources-rich-editors";
import { LogoutForm } from "@/components/admin/logout-form";
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
import { getAdminInterns } from "@/lib/content-service";

export const metadata: Metadata = {
  title: "Admin Interns",
};

type PageProps = {
  searchParams: Promise<{
    status?: string;
    error?: string;
    edit?: string;
  }>;
};

export default async function AdminInternsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const message = getAdminFlashMessage(params.status, params.error);
  const internItems = await getAdminInterns();
  const selectedItem = internItems.find((item) => item._id === params.edit) ?? null;
  const saveAction = upsertEntityAction.bind(null, "intern", "/admin/interns");
  const deleteAction = deleteEntityAction.bind(null, "intern", "/admin/interns");

  return (
    <AdminShell
      activePath="/admin/interns"
      title="Interns & alumni manager"
      description="Edit the search-driven internship page, maintain awards and certificate cards, and upload base64 images that are compressed automatically on save."
      topActions={<LogoutForm />}
    >
      {message ? <StatusNotice tone={message.tone} message={message.message} /> : null}

      <section className="grid gap-6 md:grid-cols-3">
        <AdminMetricCard
          label="Total records"
          value={String(internItems.length)}
          description="Includes both published and hidden internship cards."
        />
        <AdminMetricCard
          label="Published"
          value={String(internItems.filter((item) => item.isPublished).length)}
          description="These profiles are visible on the public interns page."
        />
        <AdminMetricCard
          label="Hidden"
          value={String(internItems.filter((item) => !item.isPublished).length)}
          description="Use hidden state to keep draft content off the public site."
        />
      </section>

      <AdminManagerLayout
        sidebar={
          <AdminSectionCard
            title="Intern directory"
            description="Pick a record to inspect and edit it in one focused form instead of scrolling through every profile."
          >
            <AdminDirectoryList>
              <AdminRecordLink
                href="/admin/interns"
                active={!selectedItem}
                title="Create new intern"
                subtitle="Start a fresh internship or alumni profile"
                meta="Blank form"
                leading="+"
              />
              {internItems.map((item) => (
                <AdminRecordLink
                  key={item._id}
                  href={`/admin/interns?edit=${item._id}`}
                  active={selectedItem?._id === item._id}
                  title={item.name}
                  subtitle={item.role}
                  meta={`${item.program} • ${item.track}`}
                  leading={item.initials}
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
            title={selectedItem ? `Edit ${selectedItem.name}` : "Create internship record"}
            description={
              selectedItem
                ? "Review one profile at a time, update the details, then return to the directory when you are done."
                : "Add a new intern or alumni profile with image, award ribbon, duration, and track details."
            }
          >
            <form action={saveAction} className="grid gap-5">
              {selectedItem ? <input type="hidden" name="id" value={selectedItem._id} /> : null}
              <FormGrid>
                <InternRichEditor values={selectedItem ?? { order: internItems.length + 1, isPublished: true }} />
              </FormGrid>
              <FormActions>
                <SubmitButton
                  label={selectedItem ? "Save changes" : "Create intern record"}
                  pendingLabel={selectedItem ? "Saving..." : "Creating..."}
                />
                {selectedItem ? (
                  <Link
                    href="/admin/interns"
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
                <SubmitButton label="Delete record" pendingLabel="Deleting..." variant="danger" />
              </form>
            ) : null}
          </AdminSectionCard>
        }
      />
    </AdminShell>
  );
}
