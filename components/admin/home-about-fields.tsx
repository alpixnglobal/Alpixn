import { AdminField, AdminInput, AdminTextarea } from "@/components/admin/admin-ui";
import type { AboutSettingsRecord, HomeSettingsRecord } from "@/lib/content-types";

function pretty(value: unknown) {
  return JSON.stringify(value, null, 2);
}

export function HomeSettingsFields({ values }: { values: HomeSettingsRecord }) {
  return (
    <div className="grid gap-5">
      <AdminField label="Hero title">
        <AdminTextarea name="heroTitle" defaultValue={values.heroTitle} className="min-h-24" />
      </AdminField>
      <div className="lg:col-span-2">
        <AdminField label="Hero description">
          <AdminTextarea name="heroDescription" defaultValue={values.heroDescription} className="min-h-24" />
        </AdminField>
      </div>
      <AdminField label="Hero image path">
        <AdminInput name="heroImageData" defaultValue={values.heroImageData} />
      </AdminField>
      <AdminField label="Hero primary action JSON" hint="{ label, href }">
        <AdminTextarea name="heroPrimaryAction" defaultValue={pretty(values.heroPrimaryAction)} className="min-h-24 font-mono text-xs" />
      </AdminField>
      <AdminField label="Hero secondary action JSON" hint="{ label, href }">
        <AdminTextarea name="heroSecondaryAction" defaultValue={pretty(values.heroSecondaryAction)} className="min-h-24 font-mono text-xs" />
      </AdminField>

      <AdminField label="Custom solutions title">
        <AdminTextarea name="customSolutionsTitle" defaultValue={values.customSolutionsTitle} className="min-h-24" />
      </AdminField>
      <div className="lg:col-span-2">
        <AdminField label="Custom solutions subtitle">
          <AdminTextarea name="customSolutionsSubtitle" defaultValue={values.customSolutionsSubtitle} className="min-h-24" />
        </AdminField>
      </div>
      <div className="lg:col-span-2">
        <AdminField label="Custom solution cards JSON">
          <AdminTextarea name="customSolutionCards" defaultValue={pretty(values.customSolutionCards)} className="min-h-72 font-mono text-xs" />
        </AdminField>
      </div>

      <AdminField label="Offerings title">
        <AdminTextarea name="offeringsTitle" defaultValue={values.offeringsTitle} className="min-h-24" />
      </AdminField>
      <div className="lg:col-span-2">
        <AdminField label="Offerings subtitle">
          <AdminTextarea name="offeringsSubtitle" defaultValue={values.offeringsSubtitle} className="min-h-24" />
        </AdminField>
      </div>
      <div className="lg:col-span-2">
        <AdminField label="Offerings JSON">
          <AdminTextarea name="offerings" defaultValue={pretty(values.offerings)} className="min-h-72 font-mono text-xs" />
        </AdminField>
      </div>

      <AdminField label="Case study title">
        <AdminTextarea name="caseStudyTitle" defaultValue={values.caseStudyTitle} className="min-h-24" />
      </AdminField>
      <div className="lg:col-span-2">
        <AdminField label="Case study subtitle">
          <AdminTextarea name="caseStudySubtitle" defaultValue={values.caseStudySubtitle} className="min-h-24" />
        </AdminField>
      </div>
      <div className="lg:col-span-2">
        <AdminField label="Case studies JSON">
          <AdminTextarea name="caseStudies" defaultValue={pretty(values.caseStudies)} className="min-h-72 font-mono text-xs" />
        </AdminField>
      </div>

      <AdminField label="Industries title">
        <AdminTextarea name="industriesTitle" defaultValue={values.industriesTitle} className="min-h-24" />
      </AdminField>
      <div className="lg:col-span-2">
        <AdminField label="Industries subtitle">
          <AdminTextarea name="industriesSubtitle" defaultValue={values.industriesSubtitle} className="min-h-24" />
        </AdminField>
      </div>
      <div className="lg:col-span-2">
        <AdminField label="Industries tabs JSON">
          <AdminTextarea name="industriesTabs" defaultValue={pretty(values.industriesTabs)} className="min-h-72 font-mono text-xs" />
        </AdminField>
      </div>

      <AdminField label="Tech stack title">
        <AdminTextarea name="techStackTitle" defaultValue={values.techStackTitle} className="min-h-24" />
      </AdminField>
      <div className="lg:col-span-2">
        <AdminField label="Tech stack description">
          <AdminTextarea name="techStackDescription" defaultValue={values.techStackDescription} className="min-h-24" />
        </AdminField>
      </div>
      <div className="lg:col-span-2">
        <AdminField label="Tech stack tabs JSON">
          <AdminTextarea name="techStackTabs" defaultValue={pretty(values.techStackTabs)} className="min-h-72 font-mono text-xs" />
        </AdminField>
      </div>

      <AdminField label="Why choose quote">
        <AdminTextarea name="whyChooseQuote" defaultValue={values.whyChooseQuote} className="min-h-24" />
      </AdminField>
      <AdminField label="Why choose author">
        <AdminInput name="whyChooseAuthor" defaultValue={values.whyChooseAuthor} />
      </AdminField>
      <AdminField label="Why choose role">
        <AdminInput name="whyChooseRole" defaultValue={values.whyChooseRole} />
      </AdminField>
      <AdminField label="Why choose manager image">
        <AdminInput name="whyChooseManagerImage" defaultValue={values.whyChooseManagerImage} />
      </AdminField>

      <div className="lg:col-span-2">
        <AdminField label="Insight section JSON" hint="{ title, subtitle, buttonText, buttonHref }">
          <AdminTextarea name="insightSection" defaultValue={pretty(values.insightSection)} className="min-h-32 font-mono text-xs" />
        </AdminField>
      </div>
    </div>
  );
}

export function AboutSettingsFields({ values }: { values: AboutSettingsRecord }) {
  return (
    <div className="grid gap-5">
      <AdminField label="Hero title">
        <AdminTextarea name="heroTitle" defaultValue={values.heroTitle} className="min-h-24" />
      </AdminField>
      <div className="lg:col-span-2">
        <AdminField label="Hero description">
          <AdminTextarea name="heroDescription" defaultValue={values.heroDescription} className="min-h-24" />
        </AdminField>
      </div>
      <AdminField label="Hero primary action JSON" hint="{ label, href }">
        <AdminTextarea name="heroPrimaryAction" defaultValue={pretty(values.heroPrimaryAction)} className="min-h-24 font-mono text-xs" />
      </AdminField>
      <AdminField label="Hero secondary action JSON" hint="{ label, href }">
        <AdminTextarea name="heroSecondaryAction" defaultValue={pretty(values.heroSecondaryAction)} className="min-h-24 font-mono text-xs" />
      </AdminField>

      <AdminField label="Who we are title">
        <AdminInput name="whoWeAreTitle" defaultValue={values.whoWeAreTitle} />
      </AdminField>
      <AdminField label="Who we are image path">
        <AdminInput name="whoWeAreImage" defaultValue={values.whoWeAreImage} />
      </AdminField>
      <div className="lg:col-span-2">
        <AdminField label="Who we are paragraph one">
          <AdminTextarea name="whoWeAreParagraphOne" defaultValue={values.whoWeAreParagraphOne} className="min-h-28" />
        </AdminField>
      </div>
      <div className="lg:col-span-2">
        <AdminField label="Who we are paragraph two">
          <AdminTextarea name="whoWeAreParagraphTwo" defaultValue={values.whoWeAreParagraphTwo} className="min-h-28" />
        </AdminField>
      </div>

      <AdminField label="Vision tag">
        <AdminInput name="visionTag" defaultValue={values.visionTag} />
      </AdminField>
      <AdminField label="Vision title">
        <AdminTextarea name="visionTitle" defaultValue={values.visionTitle} className="min-h-24" />
      </AdminField>
      <div className="lg:col-span-2">
        <AdminField label="Vision description">
          <AdminTextarea name="visionDescription" defaultValue={values.visionDescription} className="min-h-24" />
        </AdminField>
      </div>
      <div className="lg:col-span-2">
        <AdminField label="Vision stats JSON">
          <AdminTextarea name="visionStats" defaultValue={pretty(values.visionStats)} className="min-h-40 font-mono text-xs" />
        </AdminField>
      </div>

      <AdminField label="Mission tag">
        <AdminInput name="missionTag" defaultValue={values.missionTag} />
      </AdminField>
      <AdminField label="Mission title">
        <AdminTextarea name="missionTitle" defaultValue={values.missionTitle} className="min-h-24" />
      </AdminField>
      <div className="lg:col-span-2">
        <AdminField label="Mission description">
          <AdminTextarea name="missionDescription" defaultValue={values.missionDescription} className="min-h-24" />
        </AdminField>
      </div>
      <div className="lg:col-span-2">
        <AdminField label="Mission cards JSON">
          <AdminTextarea name="missionCards" defaultValue={pretty(values.missionCards)} className="min-h-56 font-mono text-xs" />
        </AdminField>
      </div>

      <AdminField label="Milestone tag">
        <AdminInput name="milestoneTag" defaultValue={values.milestoneTag} />
      </AdminField>
      <AdminField label="Milestone title">
        <AdminTextarea name="milestoneTitle" defaultValue={values.milestoneTitle} className="min-h-24" />
      </AdminField>
      <div className="lg:col-span-2">
        <AdminField label="Milestone description">
          <AdminTextarea name="milestoneDescription" defaultValue={values.milestoneDescription} className="min-h-24" />
        </AdminField>
      </div>
      <div className="lg:col-span-2">
        <AdminField label="Milestone items JSON">
          <AdminTextarea name="milestoneItems" defaultValue={pretty(values.milestoneItems)} className="min-h-72 font-mono text-xs" />
        </AdminField>
      </div>

      <AdminField label="Why choose title">
        <AdminTextarea name="whyChooseTitle" defaultValue={values.whyChooseTitle} className="min-h-24" />
      </AdminField>
      <div className="lg:col-span-2">
        <AdminField label="Why choose subtitle">
          <AdminTextarea name="whyChooseSubtitle" defaultValue={values.whyChooseSubtitle} className="min-h-24" />
        </AdminField>
      </div>
      <div className="lg:col-span-2">
        <AdminField label="Why choose cards JSON">
          <AdminTextarea name="whyChooseCards" defaultValue={pretty(values.whyChooseCards)} className="min-h-48 font-mono text-xs" />
        </AdminField>
      </div>

      <AdminField label="CTA title">
        <AdminTextarea name="ctaTitle" defaultValue={values.ctaTitle} className="min-h-24" />
      </AdminField>
      <div className="lg:col-span-2">
        <AdminField label="CTA description">
          <AdminTextarea name="ctaDescription" defaultValue={values.ctaDescription} className="min-h-24" />
        </AdminField>
      </div>
      <AdminField label="CTA button text">
        <AdminInput name="ctaButtonText" defaultValue={values.ctaButtonText} />
      </AdminField>
      <AdminField label="CTA button href">
        <AdminInput name="ctaButtonHref" defaultValue={values.ctaButtonHref} />
      </AdminField>
    </div>
  );
}
