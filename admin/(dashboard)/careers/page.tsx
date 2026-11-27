import type { Metadata } from "next";
import Link from "next/link";

import { deleteEntityAction, upsertEntityAction } from "@/admin/actions/admin-actions";
import { FormActions, FormGrid } from "@/components/admin/admin-form-helpers";
import { JobRichEditor } from "@/components/admin/resources-rich-editors";
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
import { getAdminJobApplications, getAdminJobs } from "@/lib/content-service";

export const metadata: Metadata = {
  title: "Admin Careers",
};

type PageProps = {
  searchParams: Promise<{
    status?: string;
    error?: string;
    edit?: string;
  }>;
};

export default async function AdminCareersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const message = getAdminFlashMessage(params.status, params.error);
  const [items, applications] = await Promise.all([getAdminJobs(), getAdminJobApplications()]);
  const selectedItem = items.find((item) => item._id === params.edit) ?? null;
  const visibleApplications = selectedItem
    ? applications.filter((application) => application.jobSlug === selectedItem.slug)
    : applications;
  const saveAction = upsertEntityAction.bind(null, "job", "/admin/careers");
  const deleteAction = deleteEntityAction.bind(null, "job", "/admin/careers");

  return (
    <AdminShell
      activePath="/admin/careers"
      title="Careers manager"
      description="Publish openings, update hiring copy, and maintain the public job-card layout from this section."
    >
      {message ? <StatusNotice tone={message.tone} message={message.message} /> : null}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <AdminMetricCard
          label="Job roles"
          value={String(items.length)}
          description="All stored roles for the careers listing."
        />
        <AdminMetricCard
          label="Published"
          value={String(items.filter((item) => item.isPublished).length)}
          description="Visible roles currently shown on the public jobs page."
        />
        <AdminMetricCard
          label="Hidden"
          value={String(items.filter((item) => !item.isPublished).length)}
          description="Draft roles kept out of the public listing."
        />
        <AdminMetricCard
          label="Applications"
          value={String(applications.length)}
          description="Submitted from the public careers detail pages."
        />
      </section>

      <AdminManagerLayout
        sidebar={
          <AdminSectionCard
            title="Role directory"
            description="See every opening in one compact list and edit the selected job in the main panel."
          >
            <AdminDirectoryList>
              <AdminRecordLink
                href="/admin/careers"
                active={!selectedItem}
                title="Create new opening"
                subtitle="Open a blank hiring form"
                meta="Blank form"
                leading="+"
              />
              {items.map((item) => (
                <AdminRecordLink
                  key={item._id}
                  href={`/admin/careers?edit=${item._id}`}
                  active={selectedItem?._id === item._id}
                  title={item.title}
                  subtitle={item.company}
                  meta={`${item.type} • ${item.mode} • ${item.location}`}
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
            title={selectedItem ? `Edit ${selectedItem.title}` : "Create job opening"}
            description={
              selectedItem
                ? "Adjust the selected role details without scrolling past every other job form on the page."
                : "Add a new job card with salary, mode, location, and optional image."
            }
          >
            <form action={saveAction} className="grid gap-5">
              {selectedItem ? <input type="hidden" name="id" value={selectedItem._id} /> : null}
              <FormGrid>
                <JobRichEditor key={selectedItem?._id ?? "new"} values={selectedItem ?? { order: items.length + 1, isPublished: true }} />
              </FormGrid>
              <FormActions>
                <SubmitButton
                  label={selectedItem ? "Save changes" : "Create opening"}
                  pendingLabel={selectedItem ? "Saving..." : "Creating..."}
                />
                {selectedItem ? (
                  <Link
                    href="/admin/careers"
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
                <SubmitButton label="Delete opening" pendingLabel="Deleting..." variant="danger" />
              </form>
            ) : null}
          </AdminSectionCard>
        }
      />

      <AdminSectionCard
        title={selectedItem ? `Applications for ${selectedItem.title}` : "Recent applications"}
        description={
          selectedItem
            ? "These applicants submitted the public form for the selected role."
            : "Review the latest applications coming from the public careers detail pages."
        }
      >
        {visibleApplications.length > 0 ? (
          <div className="grid gap-4">
            {visibleApplications.map((application) => (
              <article key={application._id} className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-[#00070e] dark:text-[#00070e] dark:text-white">{application.fullName}</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-500 dark:text-slate-400">
                      {application.jobTitle} at {application.company}
                    </p>
                  </div>
                  <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-100">
                    {application.status}
                  </span>
                </div>

                <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-600 dark:text-slate-300 lg:grid-cols-2">
                  <div>Email: {application.email}</div>
                  <div>Phone: {application.phone}</div>
                  <div>Location: {application.location}</div>
                  <div>
                    CV: <a href={application.cvDriveLink} target="_blank" rel="noreferrer" className="text-sky-100 underline-offset-4 hover:underline">Open drive link</a>
                  </div>
                  {application.linkedInUrl ? (
                    <div>
                      LinkedIn: <a href={application.linkedInUrl} target="_blank" rel="noreferrer" className="text-sky-100 underline-offset-4 hover:underline">Open profile</a>
                    </div>
                  ) : null}
                  {application.portfolioUrl ? (
                    <div>
                      Portfolio: <a href={application.portfolioUrl} target="_blank" rel="noreferrer" className="text-sky-100 underline-offset-4 hover:underline">Open portfolio</a>
                    </div>
                  ) : null}
                </div>

                {application.coverLetter ? (
                  <div className="mt-4 rounded-[16px] border border-white/8 bg-white/[0.03] p-4 text-sm leading-7 text-slate-600 dark:text-slate-600 dark:text-slate-300">
                    {application.coverLetter}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-6 text-sm text-slate-600 dark:text-slate-600 dark:text-slate-300">
            No applications submitted yet.
          </div>
        )}
      </AdminSectionCard>
    </AdminShell>
  );
}
