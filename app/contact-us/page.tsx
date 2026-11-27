import OfficeExplorer from "@/components/contact/OfficeExplorer";
import ContactStudio from "@/components/contact/ContactStudio";
import ApplicationStatusToastWrapper from "@/components/sections/job-apply/ApplicationStatusToastWrapper";
import { getCachedContactSettings, getCachedSiteSettings } from "@/lib/content-service";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact ALPIXN – Start Your Project",
  description: "Talk to ALPIXN about AI, robotics software, web and mobile apps or cloud. Send a project brief, call or email our team, or find the office nearest to you.",
  path: "/contact-us",
});

const ContactUsPage = async () => {
  const [settings, site] = await Promise.all([getCachedContactSettings(), getCachedSiteSettings()]);
  const offices = settings.globalOffices
    .filter((o) => o.isPublished)
    .sort((a, b) => a.order - b.order)
    .map((o) => ({ name: o.name, address: o.address, email: o.email }));

  return (
    <main>
      <ApplicationStatusToastWrapper />
      <ContactStudio
        title={settings.heroTitle && !/digital future/i.test(settings.heroTitle) ? settings.heroTitle : "Let's Build What's Next"}
        description={
          settings.heroDescription && !/digital presence/i.test(settings.heroDescription)
            ? settings.heroDescription
            : "Tell us about your product, process or idea. Share a short brief and our team will come back with honest recommendations and a sensible first step."
        }
        phone={settings.formPhoneNumber}
        phoneAvailability={settings.formPhoneAvailability}
        email={settings.formEmail}
        supportEmail={settings.formSupportEmail}
        address={settings.formAddress}
        buttonText={settings.formButtonText && !/let's get started/i.test(settings.formButtonText) ? settings.formButtonText : "Send my brief"}
        interestOptions={settings.formInterestOptions}
        social={site.socialMedia}
      />
      <OfficeExplorer offices={offices} title={settings.globalOfficesTitle || "Our Global Offices"} />
    </main>
  );
};

export default ContactUsPage;
