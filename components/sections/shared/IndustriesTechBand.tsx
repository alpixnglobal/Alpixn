import HomeIndustriesSection from "@/components/sections/HomeIndustriesSection";
import TechStackSection from "@/components/sections/TechStackSection";
import { getCachedHomeSettings } from "@/lib/content-service";

/**
 * The homepage Industries + Tech Stack design, reused on every page that shows either section.
 * Always the dark navy band (both themes) and fed from the same CMS data as the homepage,
 * so the content and look stay identical site-wide.
 */
export default async function IndustriesTechBand({ show = "both" }: { show?: "both" | "industries" | "tech" }) {
  const settings = await getCachedHomeSettings();
  return (
    <div className="dark section-navy">
      {show !== "tech" ? <HomeIndustriesSection title={settings.industriesTitle} subtitle={settings.industriesSubtitle} tabs={settings.industriesTabs} /> : null}
      {show !== "industries" ? <TechStackSection title={settings.techStackTitle} description={settings.techStackDescription} tabs={settings.techStackTabs} /> : null}
    </div>
  );
}
