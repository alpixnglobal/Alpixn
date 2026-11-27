import type { Metadata } from "next";

import { saveAboutSettingsAction } from "@/admin/actions/admin-actions";
import { AboutSettingsRichEditor } from "@/components/admin/about-settings-rich-editor";
import Link from "next/link";
import { AdminHelpNote, AdminSectionCard, AdminShell, StatusNotice, getAdminFlashMessage } from "@/components/admin/admin-ui";
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
      title="About page"
      description="Older About settings. The live About page is edited in Page sections."
    >
      {message ? <StatusNotice tone={message.tone} message={message.message} /> : null}
      <AdminHelpNote>
        The About page <strong>hero</strong>, <strong>Three disciplines</strong> and the <strong>Our journey timeline</strong> are edited in{" "}
        <Link href="/admin/content?block=about.hero" className="font-semibold text-[#0878d1] underline">Page sections</Link>. Industries and tech stack come from{" "}
        <Link href="/admin/home" className="font-semibold text-[#0878d1] underline">Home</Link>. The fields below are older About settings kept for compatibility and are not shown on the current About page.
      </AdminHelpNote>

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
