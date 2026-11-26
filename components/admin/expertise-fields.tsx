import type { ReactNode } from "react";

import { AdminCheckbox, AdminField, AdminInput, AdminTextarea } from "@/components/admin/admin-ui";
import type { ExpertisePageRecord, ExpertiseSettingsRecord } from "@/lib/content-types";

function Block({ title, children, defaultOpen = false }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  return (
    <details open={defaultOpen} className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
      <summary className="cursor-pointer list-none">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-[#00070e] dark:text-[#00070e] dark:text-white">{title}</h3>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-500 dark:text-slate-400">
            Expand
          </span>
        </div>
      </summary>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">{children}</div>
    </details>
  );
}

function pretty(value: unknown) {
  return JSON.stringify(value, null, 2);
}

export function ExpertiseEntryFields({ values = {} }: { values?: Partial<ExpertisePageRecord> }) {
  return (
    <div className="grid gap-5">
      <Block title="Core Fields" defaultOpen>
        <AdminField label="Navigation label">
          <AdminInput name="navLabel" required defaultValue={values.navLabel} />
        </AdminField>
        <AdminField label="Category key">
          <AdminInput name="categoryKey" required defaultValue={values.categoryKey} placeholder="software-solution" />
        </AdminField>
        <AdminField label="Display order">
          <AdminInput name="order" type="number" min="0" defaultValue={String(values.order ?? 1)} />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminCheckbox name="isPublished" label="Published in expertise navigation and public pages" defaultChecked={values.isPublished ?? true} />
        </div>
      </Block>

      <Block title="Hero Section">
        <AdminField label="Hero title">
          <AdminTextarea name="heroTitle" defaultValue={values.heroTitle} className="min-h-24" />
        </AdminField>
        <AdminField label="CTA button text">
          <AdminInput name="ctaButtonText" defaultValue={values.ctaButtonText} />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Hero description">
            <AdminTextarea name="heroDescription" defaultValue={values.heroDescription} className="min-h-28" />
          </AdminField>
        </div>
        <AdminField label="Hero background image path">
          <AdminInput name="heroBackgroundImage" defaultValue={values.heroBackgroundImage} placeholder="/images/expertise-hero-bg.png" />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Hero logos JSON" hint="Array of image paths.">
            <AdminTextarea name="heroLogos" defaultValue={pretty(values.heroLogos ?? [])} className="min-h-32 font-mono text-xs" />
          </AdminField>
        </div>
      </Block>

      <Block title="Stats Section">
        <AdminField label="Section title">
          <AdminTextarea name="statsTitle" defaultValue={values.statsTitle} className="min-h-24" />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Section description">
            <AdminTextarea name="statsDescription" defaultValue={values.statsDescription} className="min-h-28" />
          </AdminField>
        </div>
        <div className="lg:col-span-2">
          <AdminField label="Top highlights JSON" hint="Array of { value, label } objects.">
            <AdminTextarea name="statsHighlights" defaultValue={pretty(values.statsHighlights ?? [])} className="min-h-40 font-mono text-xs" />
          </AdminField>
        </div>
        <div className="lg:col-span-2">
          <AdminField label="Stat cards JSON" hint="Array of { title, description } objects.">
            <AdminTextarea name="statsCards" defaultValue={pretty(values.statsCards ?? [])} className="min-h-56 font-mono text-xs" />
          </AdminField>
        </div>
      </Block>

      <Block title="Case Study Section">
        <AdminField label="Section title">
          <AdminTextarea name="caseStudyTitle" defaultValue={values.caseStudyTitle} className="min-h-24" />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Section subtitle">
            <AdminTextarea name="caseStudySubtitle" defaultValue={values.caseStudySubtitle} className="min-h-28" />
          </AdminField>
        </div>
        <div className="lg:col-span-2">
          <AdminField label="Case study tabs JSON" hint="Array of { id, title, heading, description, features[], cta1, cta2, imageData, cta1Link, cta2Link } objects.">
            <AdminTextarea name="caseStudyTabs" defaultValue={pretty(values.caseStudyTabs ?? [])} className="min-h-72 font-mono text-xs" />
          </AdminField>
        </div>
      </Block>

      <Block title="Custom Software Section">
        <AdminField label="Section title">
          <AdminTextarea name="customTitle" defaultValue={values.customTitle} className="min-h-24" />
        </AdminField>
        <AdminField label="Button text">
          <AdminInput name="customButtonText" defaultValue={values.customButtonText} />
        </AdminField>
        <AdminField label="Button link">
          <AdminInput name="customButtonLink" defaultValue={values.customButtonLink} />
        </AdminField>
        <AdminField label="Image path">
          <AdminInput name="customImage" defaultValue={values.customImage} />
        </AdminField>
        <AdminField label="Image alt text">
          <AdminInput name="customImageAlt" defaultValue={values.customImageAlt} />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Section subtitle">
            <AdminTextarea name="customSubtitle" defaultValue={values.customSubtitle} className="min-h-28" />
          </AdminField>
        </div>
        <div className="lg:col-span-2">
          <AdminField label="Benefits JSON" hint="Array of { id, number, title, description } objects.">
            <AdminTextarea name="customBenefits" defaultValue={pretty(values.customBenefits ?? [])} className="min-h-64 font-mono text-xs" />
          </AdminField>
        </div>
      </Block>

      <Block title="Why Choose Us Section">
        <AdminField label="Section title">
          <AdminTextarea name="whyChooseTitle" defaultValue={values.whyChooseTitle} className="min-h-24" />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Section subtitle">
            <AdminTextarea name="whyChooseSubtitle" defaultValue={values.whyChooseSubtitle} className="min-h-28" />
          </AdminField>
        </div>
        <div className="lg:col-span-2">
          <AdminField label="Feature cards JSON" hint="Array of { id, title, description, icon, iconAlt, iconWidth, iconHeight, iconRightClass } objects.">
            <AdminTextarea name="whyChooseFeatures" defaultValue={pretty(values.whyChooseFeatures ?? [])} className="min-h-64 font-mono text-xs" />
          </AdminField>
        </div>
      </Block>

      <Block title="Industries Section">
        <AdminField label="Section title">
          <AdminTextarea name="industriesTitle" defaultValue={values.industriesTitle} className="min-h-24" />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Section subtitle">
            <AdminTextarea name="industriesSubtitle" defaultValue={values.industriesSubtitle} className="min-h-28" />
          </AdminField>
        </div>
        <div className="lg:col-span-2">
          <AdminField label="Industry cards JSON" hint="Array of { id, name, icon, iconAlt, link } objects.">
            <AdminTextarea name="industriesItems" defaultValue={pretty(values.industriesItems ?? [])} className="min-h-64 font-mono text-xs" />
          </AdminField>
        </div>
      </Block>

      <Block title="Guide Section">
        <AdminField label="Section title">
          <AdminTextarea name="guideTitle" defaultValue={values.guideTitle} className="min-h-24" />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Section subtitle">
            <AdminTextarea name="guideSubtitle" defaultValue={values.guideSubtitle} className="min-h-28" />
          </AdminField>
        </div>
        <div className="lg:col-span-2">
          <AdminField label="Guide tabs JSON" hint="Array of { key, label, section, items:[{ title, bullets[] }] } objects.">
            <AdminTextarea name="guideTabs" defaultValue={pretty(values.guideTabs ?? [])} className="min-h-72 font-mono text-xs" />
          </AdminField>
        </div>
      </Block>

      <Block title="Start Project CTA">
        <AdminField label="Section title">
          <AdminTextarea name="startTitle" defaultValue={values.startTitle} className="min-h-24" />
        </AdminField>
        <AdminField label="Button text">
          <AdminInput name="startButtonText" defaultValue={values.startButtonText} />
        </AdminField>
        <AdminField label="Button link">
          <AdminInput name="startButtonLink" defaultValue={values.startButtonLink} />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Section subtitle">
            <AdminTextarea name="startSubtitle" defaultValue={values.startSubtitle} className="min-h-28" />
          </AdminField>
        </div>
      </Block>
    </div>
  );
}

export function ExpertiseSettingsFields({ values }: { values: ExpertiseSettingsRecord }) {
  return (
    <div className="grid gap-5">
      <Block title="Navbar Categories" defaultOpen>
        <div className="lg:col-span-2">
          <AdminField label="Menu categories JSON" hint="Array of { key, label, description, menuHeading, order } objects.">
            <AdminTextarea name="menuCategories" defaultValue={pretty(values.menuCategories ?? [])} className="min-h-56 font-mono text-xs" />
          </AdminField>
        </div>
      </Block>

      <Block title="Testimonials Section">
        <AdminField label="Section title">
          <AdminInput name="testimonialTitle" defaultValue={values.testimonialTitle} />
        </AdminField>
        <AdminField label="Section subtitle">
          <AdminInput name="testimonialSubtitle" defaultValue={values.testimonialSubtitle} />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Testimonials JSON" hint="Array of { quote, author, position, company, avatar } objects.">
            <AdminTextarea name="testimonials" defaultValue={pretty(values.testimonials ?? [])} className="min-h-64 font-mono text-xs" />
          </AdminField>
        </div>
      </Block>

      <Block title="Engagement Models Section">
        <AdminField label="Section title">
          <AdminTextarea name="engagementTitle" defaultValue={values.engagementTitle} className="min-h-24" />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Section subtitle">
            <AdminTextarea name="engagementSubtitle" defaultValue={values.engagementSubtitle} className="min-h-28" />
          </AdminField>
        </div>
        <div className="lg:col-span-2">
          <AdminField label="Engagement models JSON" hint="Array of { title, description, features[] } objects.">
            <AdminTextarea name="engagementModels" defaultValue={pretty(values.engagementModels ?? [])} className="min-h-64 font-mono text-xs" />
          </AdminField>
        </div>
      </Block>

      <Block title="Tech Stack Section">
        <AdminField label="Section title">
          <AdminTextarea name="techStackTitle" defaultValue={values.techStackTitle} className="min-h-24" />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Section description">
            <AdminTextarea name="techStackDescription" defaultValue={values.techStackDescription} className="min-h-28" />
          </AdminField>
        </div>
        <div className="lg:col-span-2">
          <AdminField label="Tech stack tabs JSON" hint="Array of { name, value, items:[{ label, imageData }] } objects.">
            <AdminTextarea name="techStackTabs" defaultValue={pretty(values.techStackTabs ?? [])} className="min-h-72 font-mono text-xs" />
          </AdminField>
        </div>
      </Block>

      <Block title="FAQ Section">
        <AdminField label="Section title">
          <AdminTextarea name="faqTitle" defaultValue={values.faqTitle} className="min-h-24" />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="FAQs JSON" hint="Array of { question, answer } objects.">
            <AdminTextarea name="faqs" defaultValue={pretty(values.faqs ?? [])} className="min-h-64 font-mono text-xs" />
          </AdminField>
        </div>
      </Block>
    </div>
  );
}
