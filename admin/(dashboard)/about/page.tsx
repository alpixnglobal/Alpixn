import type { Metadata } from "next";

import { saveAboutSettingsAction } from "@/admin/actions/admin-actions";
import { AboutSettingsRichEditor } from "@/components/admin/about-settings-rich-editor";
import { LogoutForm } from "@/components/admin/logout-form";
import { AdminSectionCard, AdminShell, StatusNotice, getAdminFlashMessage } from "@/components/admin/admin-ui";
import { FormActions } from "@/components/admin/admin-form-helpers";
import { SubmitButton } from "@/components/admin/submit-button";
import { getAboutSettings } from "@/lib/content-service";

export const metadata: Metadata = {
  title: "Admin About",
};

type PageProps = {
  searchParams: Promise<{ status?: string; error?: string }>;
};

export default async function AdminAboutPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const message = getAdminFlashMessage(params.status, params.error);
  const settings = await getAboutSettings();

  return (
    <AdminShell
      activePath="/admin/about"
      title="About page manager"
      description="Manage all visible about page section content from one MongoDB-backed admin form while keeping the same frontend design."
      topActions={<LogoutForm />}
    >
      {message ? <StatusNotice tone={message.tone} message={message.message} /> : null}

      <AdminSectionCard title="About content" description="Update the hero, company story, vision, mission, milestones, why choose us, and CTA section content.">
        <form action={saveAboutSettingsAction} className="grid gap-5">
          <AboutSettingsRichEditor values={settings} />
          <FormActions>
            <SubmitButton label="Save about settings" pendingLabel="Saving..." />
          </FormActions>
        </form>
      </AdminSectionCard>
    </AdminShell>
  );
}
