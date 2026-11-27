import type { Metadata } from "next";
import Link from "next/link";

import { deleteEntityAction, upsertEntityAction } from "@/admin/actions/admin-actions";
import { FormActions, FormGrid } from "@/components/admin/admin-form-helpers";
import { TeamRichEditor } from "@/components/admin/resources-rich-editors";
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
import { getAdminTeamMembers } from "@/lib/content-service";

export const metadata: Metadata = {
  title: "Admin Team",
};

type PageProps = {
  searchParams: Promise<{
    status?: string;
    error?: string;
    edit?: string;
  }>;
};

export default async function AdminTeamPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const message = getAdminFlashMessage(params.status, params.error);
  const teamItems = await getAdminTeamMembers();
  const selectedItem = teamItems.find((item) => item._id === params.edit) ?? null;
  const saveAction = upsertEntityAction.bind(null, "team", "/admin/team");
  const deleteAction = deleteEntityAction.bind(null, "team", "/admin/team");

  return (
    <AdminShell
      activePath="/admin/team"
      title="Team manager"
      description="Manage leadership and specialist profiles, bios, ordering, and image uploads for the team page."
    >
      {message ? <StatusNotice tone={message.tone} message={message.message} /> : null}

      <section className="grid gap-6 md:grid-cols-3">
        <AdminMetricCard
          label="Total profiles"
          value={String(teamItems.length)}
          description="All staff entries stored for the team page."
        />
        <AdminMetricCard
          label="Published"
          value={String(teamItems.filter((item) => item.isPublished).length)}
          description="These members are currently visible on the website."
        />
        <AdminMetricCard
          label="With photo"
          value={String(teamItems.filter((item) => Boolean(item.imageData)).length)}
          description="Profiles using uploaded imagery instead of the initials fallback."
        />
      </section>

      <AdminManagerLayout
        sidebar={
          <AdminSectionCard
            title="Team directory"
            description="Choose one profile to edit at a time so the page stays manageable even as the team list grows."
          >
            <AdminDirectoryList>
              <AdminRecordLink
                href="/admin/team"
                active={!selectedItem}
                title="Create new team profile"
                subtitle="Add another member without scrolling past every form"
                meta="Blank form"
                leading="+"
              />
              {teamItems.map((item) => (
                <AdminRecordLink
                  key={item._id}
                  href={`/admin/team?edit=${item._id}`}
                  active={selectedItem?._id === item._id}
                  title={item.name}
                  subtitle={item.role}
                  meta={item.imageData ? "Photo uploaded" : "Initials fallback"}
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
            title={selectedItem ? `Edit ${selectedItem.name}` : "Create team member"}
            description={
              selectedItem
                ? "Use the focused panel to update one profile cleanly, then switch back to the directory for another member."
                : "Add a new team profile with image, role, and supporting bio."
            }
          >
            <form action={saveAction} className="grid gap-5">
              {selectedItem ? <input type="hidden" name="id" value={selectedItem._id} /> : null}
              <FormGrid>
                <TeamRichEditor values={selectedItem ?? { order: teamItems.length + 1, isPublished: true }} />
              </FormGrid>
              <FormActions>
                <SubmitButton
                  label={selectedItem ? "Save changes" : "Create team profile"}
                  pendingLabel={selectedItem ? "Saving..." : "Creating..."}
                />
                {selectedItem ? (
                  <Link
                    href="/admin/team"
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
                <SubmitButton label="Delete profile" pendingLabel="Deleting..." variant="danger" />
              </form>
            ) : null}
          </AdminSectionCard>
        }
      />
    </AdminShell>
  );
}
