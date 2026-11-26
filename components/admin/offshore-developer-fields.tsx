import type { ReactNode } from "react";

import { AdminCheckbox, AdminField, AdminInput, AdminTextarea } from "@/components/admin/admin-ui";
import type { OffshoreDeveloperPageRecord, OffshoreDeveloperSettingsRecord } from "@/lib/content-types";

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

export function OffshoreDeveloperEntryFields({ values = {} }: { values?: Partial<OffshoreDeveloperPageRecord> }) {
  return (
    <div className="grid gap-5">
      <Block title="Core Fields" defaultOpen>
        <AdminField label="Navigation label">
          <AdminInput name="navLabel" required defaultValue={values.navLabel} placeholder="Node.Js Developer" />
        </AdminField>
        <AdminField label="Category key">
          <AdminInput name="categoryKey" required defaultValue={values.categoryKey} placeholder="backend-developer" />
        </AdminField>
        <AdminField label="Display order">
          <AdminInput name="order" type="number" min="0" defaultValue={String(values.order ?? 1)} />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminCheckbox name="isPublished" label="Published in navbar and offshore pages" defaultChecked={values.isPublished ?? true} />
        </div>
      </Block>

      <Block title="Hero Section">
        <AdminField label="Hero title">
          <AdminTextarea name="heroTitle" defaultValue={values.heroTitle} className="min-h-24" />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Hero description">
            <AdminTextarea name="heroDescription" defaultValue={values.heroDescription} className="min-h-28" />
          </AdminField>
        </div>
        <AdminField label="Hero checklist" hint="Use one point per line.">
          <AdminTextarea name="heroChecklist" defaultValue={values.heroChecklist?.join("\n")} className="min-h-24" />
        </AdminField>
        <AdminField label="Hero form title">
          <AdminInput name="heroFormTitle" defaultValue={values.heroFormTitle} />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Hero technologies JSON" hint="Array of { value, label } objects.">
            <AdminTextarea name="heroTechnologies" defaultValue={pretty(values.heroTechnologies ?? [])} className="min-h-48 font-mono text-xs" />
          </AdminField>
        </div>
      </Block>

      <Block title="Excellence Section">
        <AdminField label="Section title">
          <AdminTextarea name="excellenceTitle" defaultValue={values.excellenceTitle} className="min-h-24" />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Section subtitle">
            <AdminTextarea name="excellenceSubtitle" defaultValue={values.excellenceSubtitle} className="min-h-28" />
          </AdminField>
        </div>
        <div className="lg:col-span-2">
          <AdminField label="Offerings JSON" hint="Array of { title, description, imageData, alt, width, height } objects.">
            <AdminTextarea name="excellenceOfferings" defaultValue={pretty(values.excellenceOfferings ?? [])} className="min-h-56 font-mono text-xs" />
          </AdminField>
        </div>
      </Block>

      <Block title="CTA Section">
        <AdminField label="CTA title">
          <AdminTextarea name="ctaTitle" defaultValue={values.ctaTitle} className="min-h-24" />
        </AdminField>
        <AdminField label="CTA button text">
          <AdminInput name="ctaButtonText" defaultValue={values.ctaButtonText} />
        </AdminField>
        <AdminField label="CTA button link">
          <AdminInput name="ctaButtonLink" defaultValue={values.ctaButtonLink} />
        </AdminField>
      </Block>

      <Block title="Partner Section">
        <AdminField label="Section title">
          <AdminTextarea name="partnerTitle" defaultValue={values.partnerTitle} className="min-h-24" />
        </AdminField>
        <AdminField label="Button text">
          <AdminInput name="partnerButtonText" defaultValue={values.partnerButtonText} />
        </AdminField>
        <AdminField label="Button link">
          <AdminInput name="partnerButtonLink" defaultValue={values.partnerButtonLink} />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Partner cards JSON" hint="Array of { title, description } objects.">
            <AdminTextarea name="partnerItems" defaultValue={pretty(values.partnerItems ?? [])} className="min-h-48 font-mono text-xs" />
          </AdminField>
        </div>
      </Block>

      <Block title="Developer Grid Section">
        <AdminField label="Section title">
          <AdminTextarea name="developerGridTitle" defaultValue={values.developerGridTitle} className="min-h-24" />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Developer grid JSON" hint="Array of { name, imageData, alt, width, height, link } objects.">
            <AdminTextarea name="developerItems" defaultValue={pretty(values.developerItems ?? [])} className="min-h-56 font-mono text-xs" />
          </AdminField>
        </div>
      </Block>

      <Block title="Hire Services Section">
        <AdminField label="Section title">
          <AdminTextarea name="hireTitle" defaultValue={values.hireTitle} className="min-h-24" />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Section subtitle">
            <AdminTextarea name="hireSubtitle" defaultValue={values.hireSubtitle} className="min-h-28" />
          </AdminField>
        </div>
        <div className="lg:col-span-2">
          <AdminField label="Service cards JSON" hint="Array of { title, description } objects.">
            <AdminTextarea name="hireServices" defaultValue={pretty(values.hireServices ?? [])} className="min-h-56 font-mono text-xs" />
          </AdminField>
        </div>
      </Block>

      <Block title="Contact Expert CTA">
        <AdminField label="Section title">
          <AdminTextarea name="contactTitle" defaultValue={values.contactTitle} className="min-h-24" />
        </AdminField>
        <AdminField label="Button text">
          <AdminInput name="contactButtonText" defaultValue={values.contactButtonText} />
        </AdminField>
        <AdminField label="Button link">
          <AdminInput name="contactButtonLink" defaultValue={values.contactButtonLink} />
        </AdminField>
      </Block>

      <Block title="Hire Guide Section">
        <AdminField label="Section title">
          <AdminTextarea name="guideTitle" defaultValue={values.guideTitle} className="min-h-24" />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Guide tabs JSON" hint="Array of { key, label, section, items:[{ title, description }] } objects.">
            <AdminTextarea name="guideTabs" defaultValue={pretty(values.guideTabs ?? [])} className="min-h-72 font-mono text-xs" />
          </AdminField>
        </div>
      </Block>

      <Block title="Hire Steps Section">
        <AdminField label="Section title">
          <AdminTextarea name="stepsTitle" defaultValue={values.stepsTitle} className="min-h-24" />
        </AdminField>
        <AdminField label="Button text">
          <AdminInput name="stepsButtonText" defaultValue={values.stepsButtonText} />
        </AdminField>
        <AdminField label="Button link">
          <AdminInput name="stepsButtonLink" defaultValue={values.stepsButtonLink} />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Steps JSON" hint="Array of 3 { stepLabel, title, description } objects.">
            <AdminTextarea name="steps" defaultValue={pretty(values.steps ?? [])} className="min-h-48 font-mono text-xs" />
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
            <AdminTextarea name="engagementModels" defaultValue={pretty(values.engagementModels ?? [])} className="min-h-56 font-mono text-xs" />
          </AdminField>
        </div>
      </Block>
    </div>
  );
}

export function OffshoreDeveloperSettingsFields({ values }: { values: OffshoreDeveloperSettingsRecord }) {
  return (
    <div className="grid gap-5">
      <Block title="Navbar Categories" defaultOpen>
        <div className="lg:col-span-2">
          <AdminField label="Menu categories JSON" hint="Array of { key, label, menuHeading, order } objects.">
            <AdminTextarea name="menuCategories" defaultValue={pretty(values.menuCategories ?? [])} className="min-h-56 font-mono text-xs" />
          </AdminField>
        </div>
      </Block>

      <Block title="Partner Logos">
        <div className="lg:col-span-2">
          <AdminField label="Partner logos JSON" hint="Array of { label, imageData, href } objects.">
            <AdminTextarea name="partnerLogos" defaultValue={pretty(values.partnerLogos ?? [])} className="min-h-56 font-mono text-xs" />
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
          <AdminField label="Testimonials JSON" hint="Array of { quote, name, role, avatarImageData, starsImageData } objects.">
            <AdminTextarea name="testimonials" defaultValue={pretty(values.testimonials ?? [])} className="min-h-64 font-mono text-xs" />
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
          <AdminField label="Case studies JSON" hint="Array of { title, description, imageData, featuresLeft[], featuresRight[] } objects.">
            <AdminTextarea name="caseStudies" defaultValue={pretty(values.caseStudies ?? [])} className="min-h-72 font-mono text-xs" />
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
