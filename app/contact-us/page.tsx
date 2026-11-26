import AssistanceSection from "@/components/sections/contact-us/AssistanceSection";
import { BlackBG } from "@/components/sections/contact-us/BlackBG";
import ContactFromSection from "@/components/sections/contact-us/ContactFromSection";
import ContactHeroSection from "@/components/sections/contact-us/ContactHeroSection";
import GlobalServicesSection from "@/components/sections/contact-us/GlobalServicesSection";
import ApplicationStatusToastWrapper from "@/components/sections/job-apply/ApplicationStatusToastWrapper";
import { getCachedContactSettings } from "@/lib/content-service";

const ContactUsPage = async () => {
  const settings = await getCachedContactSettings();

  return (
    <>
      <ApplicationStatusToastWrapper />
      <ContactHeroSection 
        title={settings.heroTitle}
        description={settings.heroDescription}
      />
      <ContactFromSection 
        introTitle={settings.formIntroTitle}
        introDescription={settings.formIntroDescription}
        phoneNumber={settings.formPhoneNumber}
        phoneAvailability={settings.formPhoneAvailability}
        email={settings.formEmail}
        supportEmail={settings.formSupportEmail}
        address={settings.formAddress}
        buttonText={settings.formButtonText}
        firstNameLabel={settings.formFirstNameLabel}
        lastNameLabel={settings.formLastNameLabel}
        emailLabel={settings.formEmailLabel}
        phoneLabel={settings.formPhoneLabel}
        interestPlaceholder={settings.formInterestPlaceholder}
        messageLabel={settings.formMessageLabel}
        interestOptions={settings.formInterestOptions}
      />
      <AssistanceSection 
        title={settings.assistanceTitle}
        description={settings.assistanceDescription}
        emailButtonText={settings.assistanceEmailButtonText}
        callButtonText={settings.assistanceCallButtonText}
        emailButtonHref={settings.assistanceEmailButtonHref}
        callButtonHref={settings.assistanceCallButtonHref}
      />
      <GlobalServicesSection 
        title={settings.globalOfficesTitle}
        offices={settings.globalOffices}
      />
      <BlackBG />
     </>
  );
};

export default ContactUsPage;
