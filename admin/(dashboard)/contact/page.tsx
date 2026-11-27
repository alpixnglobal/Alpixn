import type { Metadata } from "next";

import { saveContactSettingsAction } from "@/admin/actions/admin-actions";
import { FormActions } from "@/components/admin/admin-form-helpers";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import {
  AdminField,
  AdminInput,
  AdminMetricCard,
  AdminSectionCard,
  AdminShell,
  AdminTextarea,
  StatusNotice,
  getAdminFlashMessage,
} from "@/components/admin/admin-ui";
import { SubmitButton } from "@/components/admin/submit-button";
import { getAdminContactMessages, getContactSettings } from "@/lib/content-service";

export const metadata: Metadata = {
  title: "Admin Contact Settings",
};

type PageProps = {
  searchParams: Promise<{
    status?: string;
    error?: string;
  }>;
};

export default async function AdminContactPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const message = getAdminFlashMessage(params.status, params.error);
  const [settings, messages] = await Promise.all([getContactSettings(), getAdminContactMessages()]);

  return (
    <AdminShell
      activePath="/admin/contact"
      title="Contact page settings"
      description="Update contact page content including hero text, form details, assistance section, and global office locations."
    >
      {message ? <StatusNotice tone={message.tone} message={message.message} /> : null}

      {/* Contact message submissions */}
      <AdminSectionCard
        title="Contact form submissions"
        description="Messages submitted via the public contact form."
      >
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 mb-6">
          <AdminMetricCard label="Total messages" value={String(messages.length)} description="All contact form submissions." />
          <AdminMetricCard label="New" value={String(messages.filter((m) => m.status === "new").length)} description="Unread messages." />
          <AdminMetricCard label="Read" value={String(messages.filter((m) => m.status === "read").length)} description="Reviewed messages." />
        </section>
        {messages.length === 0 ? (
          <p className="text-sm text-white/50 py-4">No messages yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-white/10">
            <table className="w-full text-sm text-left text-white/80">
              <thead className="text-xs text-white/50 uppercase bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Interest</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr key={msg._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 font-medium text-white whitespace-nowrap">{msg.firstName} {msg.lastName}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{msg.email}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{msg.phone}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{msg.interest || "—"}</td>
                    <td className="px-4 py-3 max-w-[250px] truncate">{msg.message || "—"}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-white/50">{new Date(msg.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${msg.status === "new" ? "bg-blue-500/20 text-blue-300" : "bg-white/10 text-white/50"}`}>
                        {msg.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminSectionCard>

      <form action={saveContactSettingsAction} className="space-y-8">
        <AdminSectionCard
          title="Hero section"
          description="The hero banner shown at the top of the contact page."
        >
          <div className="grid gap-5">
            <AdminField label="Hero title">
              <AdminInput name="heroTitle" defaultValue={settings.heroTitle} />
            </AdminField>
            <AdminField label="Hero description">
              <AdminTextarea name="heroDescription" defaultValue={settings.heroDescription} rows={3} />
            </AdminField>
          </div>
        </AdminSectionCard>

        <AdminSectionCard
          title="Contact form section"
          description="Phone, email, address, and button text shown in the contact form area."
        >
          <div className="grid gap-5 lg:grid-cols-2">
            <AdminField label="Form intro title">
              <AdminInput name="formIntroTitle" defaultValue={settings.formIntroTitle} />
            </AdminField>
            <div className="lg:col-span-2">
              <AdminField label="Form intro description">
                <AdminTextarea name="formIntroDescription" defaultValue={settings.formIntroDescription} rows={2} />
              </AdminField>
            </div>
            <AdminField label="Phone number">
              <AdminInput name="formPhoneNumber" defaultValue={settings.formPhoneNumber} />
            </AdminField>
            <AdminField label="Phone availability">
              <AdminInput name="formPhoneAvailability" defaultValue={settings.formPhoneAvailability} />
            </AdminField>
            <AdminField label="Email">
              <AdminInput name="formEmail" defaultValue={settings.formEmail} />
            </AdminField>
            <AdminField label="Support email">
              <AdminInput name="formSupportEmail" defaultValue={settings.formSupportEmail} />
            </AdminField>
            <div className="lg:col-span-2">
              <AdminField label="Address">
                <AdminTextarea name="formAddress" defaultValue={settings.formAddress} rows={2} />
              </AdminField>
            </div>
            <AdminField label="Submit button text">
              <AdminInput name="formButtonText" defaultValue={settings.formButtonText} />
            </AdminField>
            <AdminField label="First name label">
              <AdminInput name="formFirstNameLabel" defaultValue={settings.formFirstNameLabel} />
            </AdminField>
            <AdminField label="Last name label">
              <AdminInput name="formLastNameLabel" defaultValue={settings.formLastNameLabel} />
            </AdminField>
            <AdminField label="Email label">
              <AdminInput name="formEmailLabel" defaultValue={settings.formEmailLabel} />
            </AdminField>
            <AdminField label="Phone label">
              <AdminInput name="formPhoneLabel" defaultValue={settings.formPhoneLabel} />
            </AdminField>
            <AdminField label="Interest placeholder">
              <AdminInput name="formInterestPlaceholder" defaultValue={settings.formInterestPlaceholder} />
            </AdminField>
            <AdminField label="Message label">
              <AdminInput name="formMessageLabel" defaultValue={settings.formMessageLabel} />
            </AdminField>
            <div className="lg:col-span-2">
              <AdminField label="Interest options" hint="One option per line.">
                <AdminTextarea name="formInterestOptions" defaultValue={settings.formInterestOptions.join("\n")} rows={3} />
              </AdminField>
            </div>
          </div>
        </AdminSectionCard>

        <AdminSectionCard
          title="Assistance section"
          description="The immediate assistance CTA shown below the contact form."
        >
          <div className="grid gap-5 lg:grid-cols-2">
            <AdminField label="Section title">
              <AdminInput name="assistanceTitle" defaultValue={settings.assistanceTitle} />
            </AdminField>
            <div className="lg:col-span-2">
              <AdminField label="Section description">
                <AdminTextarea name="assistanceDescription" defaultValue={settings.assistanceDescription} rows={2} />
              </AdminField>
            </div>
            <AdminField label="Email button text">
              <AdminInput name="assistanceEmailButtonText" defaultValue={settings.assistanceEmailButtonText} />
            </AdminField>
            <AdminField label="Call button text">
              <AdminInput name="assistanceCallButtonText" defaultValue={settings.assistanceCallButtonText} />
            </AdminField>
            <AdminField label="Email button link">
              <AdminInput name="assistanceEmailButtonHref" defaultValue={settings.assistanceEmailButtonHref} />
            </AdminField>
            <AdminField label="Call button link">
              <AdminInput name="assistanceCallButtonHref" defaultValue={settings.assistanceCallButtonHref} />
            </AdminField>
          </div>
        </AdminSectionCard>

        <AdminSectionCard
          title="Global offices"
          description="Office locations shown on the contact page. Each office can have a flag image, name, address, and email."
        >
          <div className="grid gap-5">
            <AdminField label="Section title">
              <AdminInput name="globalOfficesTitle" defaultValue={settings.globalOfficesTitle} />
            </AdminField>
            
            <div className="space-y-6">
              {settings.globalOffices.map((office, index) => (
                <div key={index} className="border border-white/10 rounded-lg p-4 space-y-4">
                  <h4 className="font-medium text-sm text-white/80">Office {index + 1}</h4>
                  <div className="grid gap-4 lg:grid-cols-2">
                    <AdminField label="Country/Region name">
                      <AdminInput name={`officeName${index}`} defaultValue={office.name} />
                    </AdminField>
                    <AdminField label="Email">
                      <AdminInput name={`officeEmail${index}`} defaultValue={office.email} />
                    </AdminField>
                    <div className="lg:col-span-2">
                      <AdminField label="Address">
                        <AdminInput name={`officeAddress${index}`} defaultValue={office.address} />
                      </AdminField>
                    </div>
                    <div className="lg:col-span-2">
                      <ImageUploadField
                        name={`officeFlagImage${index}`}
                        label="Flag image"
                        description="Upload a flag image or paste a stored path/URL. Large images are compressed before save."
                        defaultValue={office.flagImage}
                      />
                    </div>
                    <AdminField label="Display order">
                      <AdminInput name={`officeOrder${index}`} type="number" defaultValue={String(office.order)} />
                    </AdminField>
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        name={`officeIsPublished${index}`} 
                        id={`officeIsPublished${index}`}
                        defaultChecked={office.isPublished}
                        className="w-4 h-4 rounded border-white/20 bg-white/5"
                      />
                      <label htmlFor={`officeIsPublished${index}`} className="text-sm text-white/80">
                        Published
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AdminSectionCard>

        <FormActions>
          <SubmitButton label="Save contact settings" pendingLabel="Saving settings..." />
        </FormActions>
      </form>
    </AdminShell>
  );
}
