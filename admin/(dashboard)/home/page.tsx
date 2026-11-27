import type { Metadata } from "next";

import { saveHomeSettingsAction } from "@/admin/actions/admin-actions";
import { HomeSettingsRichEditor } from "@/components/admin/home-settings-rich-editor";
import Link from "next/link";
import { AdminHelpNote, AdminSectionCard, AdminShell, StatusNotice, getAdminFlashMessage } from "@/components/admin/admin-ui";
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
      title="Home page"
      description="Services, industries and tech stack shown on the homepage (and reused on other pages)."
    >
      {message ? <StatusNotice tone={message.tone} message={message.message} /> : null}
      <AdminHelpNote>
        The homepage <strong>hero video</strong>, <strong>How we work</strong> steps, <strong>Global delivery</strong> and the <strong>call to action</strong> are edited in{" "}
        <Link href="/admin/content?block=home.hero" className="font-semibold text-[#0878d1] underline">Page sections</Link>. Use this page for the <strong>services</strong> (&ldquo;What we do&rdquo;), <strong>industries</strong> and <strong>tech stack</strong>. Hero, solution, case-study and testimonial fields below are kept for compatibility and are not shown on the current homepage.
      </AdminHelpNote>

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
