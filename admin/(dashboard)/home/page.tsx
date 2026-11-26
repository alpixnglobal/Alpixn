import type { Metadata } from "next";

import { saveHomeSettingsAction } from "@/admin/actions/admin-actions";
import { HomeSettingsRichEditor } from "@/components/admin/home-settings-rich-editor";
import { LogoutForm } from "@/components/admin/logout-form";
import { AdminSectionCard, AdminShell, StatusNotice, getAdminFlashMessage } from "@/components/admin/admin-ui";
import { FormActions } from "@/components/admin/admin-form-helpers";
import { SubmitButton } from "@/components/admin/submit-button";
import { getHomeSettings } from "@/lib/content-service";

export const metadata: Metadata = {
  title: "Admin Home",
};

type PageProps = {
  searchParams: Promise<{ status?: string; error?: string }>;
};

export default async function AdminHomePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const message = getAdminFlashMessage(params.status, params.error);
  const settings = await getHomeSettings();

  return (
    <AdminShell
      activePath="/admin/home"
      title="Home page manager"
      description="Manage all visible home page section content from one MongoDB-backed admin form while keeping the same frontend design."
      topActions={<LogoutForm />}
    >
      {message ? <StatusNotice tone={message.tone} message={message.message} /> : null}

      <AdminSectionCard title="Home content" description="Update the hero, solutions, offerings, case studies, industries, tech stack, testimonial, and blog insight section content.">
        <form action={saveHomeSettingsAction} className="grid gap-5">
          <HomeSettingsRichEditor values={settings} />
          <FormActions>
            <SubmitButton label="Save home settings" pendingLabel="Saving..." />
          </FormActions>
        </form>
      </AdminSectionCard>
    </AdminShell>
  );
}
