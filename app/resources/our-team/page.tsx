import BlackGg from "@/components/sections/interns-alumni/BlackGg";
import FreeConsultationSection from "@/components/sections/our-team/FreeConsultationSection";
import OurTeamHeroSection from "@/components/sections/our-team/OurTeamHeroSection";
import TeamPersonelSection from "@/components/sections/our-team/TeamPersonelSection";
import { getCachedPublishedTeamMembers, getCachedSiteSettings } from "@/lib/content-service";

const OurTeamPage = async () => {
  const [members, siteSettings] = await Promise.all([getCachedPublishedTeamMembers(), getCachedSiteSettings()]);
  const pageCopy = siteSettings.pageContent.team;

  return (
    <>
      <OurTeamHeroSection title={pageCopy.heroTitle} description={pageCopy.heroDescription} />
      <TeamPersonelSection members={members} />
      <FreeConsultationSection
        title={pageCopy.ctaTitle}
        description={pageCopy.ctaDescription}
        buttonLabel={pageCopy.ctaButtonLabel}
        buttonHref={pageCopy.ctaButtonHref}
      />
      <BlackGg />
    </>
  );
};

export default OurTeamPage;
