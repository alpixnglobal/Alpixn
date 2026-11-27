"use client";

import { useId, useState, type ChangeEvent } from "react";

import { prepareAdminImageUpload } from "@/components/admin/client-image-utils";
import { AdminCheckbox, AdminField, AdminInput, AdminTextarea } from "@/components/admin/admin-ui";
import { PageFaqEditor } from "@/components/admin/page-faq-editor";
import type { OffshoreDeveloperPageRecord, OffshoreDeveloperSettingsRecord } from "@/lib/content-types";

function toJson(value: unknown) {
  return JSON.stringify(value);
}

function HiddenJsonField({ name, value }: { name: string; value: unknown }) {
  return <textarea readOnly hidden name={name} value={toJson(value)} />;
}

function SectionBlock({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  return (
    <details open={defaultOpen} className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
      <summary className="cursor-pointer list-none">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-400">
            Expand
          </span>
        </div>
      </summary>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">{children}</div>
    </details>
  );
}

function ImageSourceField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const inputId = useId();

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file || !file.type.startsWith("image/")) {
      return;
    }

    try {
      const processed = await prepareAdminImageUpload(file);
      onChange(processed.dataUrl);
    } catch (error) {
      console.error("Image preparation failed:", error);
    }
  }

  return (
    <div className="grid gap-3 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
      <div className="space-y-1">
        <label htmlFor={inputId} className="text-sm font-semibold text-white">
          {label}
        </label>
        <p className="text-xs leading-6 text-slate-400">Upload an image/logo or paste an external image URL.</p>
      </div>

      <label htmlFor={inputId} className="flex min-h-32 cursor-pointer items-center justify-center rounded-[18px] border border-dashed border-white/12 bg-white/[0.03] px-4 py-4 text-center">
        {value ? <img src={value} alt={label} className="max-h-36 w-full rounded-[14px] object-contain" /> : <span className="text-sm text-slate-300">Choose image</span>}
      </label>

      <input id={inputId} type="file" accept="image/*" className="hidden" onChange={handleChange} />

      <AdminField label="Image URL or stored path">
        <AdminInput value={value} onChange={(event) => onChange(event.target.value)} placeholder="https://example.com/image.png or /images/file.png" />
      </AdminField>

      <button
        type="button"
        onClick={() => onChange("")}
        className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10"
      >
        Clear image
      </button>
    </div>
  );
}

function multilineToList(value: string) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

function listToMultiline(values: string[]) {
  return values.join("\n");
}

const defaultHeroTechnology = { value: "", label: "" };
const defaultOffering = { title: "", description: "", imageData: "", alt: "", width: 40, height: 40 };
const defaultPartnerItem = { title: "", description: "" };
const defaultDeveloper = { name: "", imageData: "", alt: "", width: 40, height: 40, link: "#" };
const defaultService = { title: "", description: "" };
const defaultGuideTab = { key: "", label: "", section: "", items: [{ title: "", description: "" }] };
const defaultStep = { stepLabel: "", title: "", description: "" };
const defaultEngagementModel = { title: "", description: "", features: [] as string[] };
const defaultMenuCategory = { key: "", label: "", menuHeading: "", order: 0 };
const defaultLogo = { label: "", imageData: "", href: "#" };
const defaultTestimonial = { quote: "", name: "", role: "", avatarImageData: "", starsImageData: "" };
const defaultCaseStudy = { title: "", description: "", imageData: "", featuresLeft: [] as string[], featuresRight: [] as string[] };
const defaultFaq = { question: "", answer: "" };

export function OffshoreDeveloperPageRichEditor({ values = {} }: { values?: Partial<OffshoreDeveloperPageRecord> }) {
  const [heroTechnologies, setHeroTechnologies] = useState(values.heroTechnologies ?? []);
  const [excellenceOfferings, setExcellenceOfferings] = useState(values.excellenceOfferings ?? []);
  const [partnerItems, setPartnerItems] = useState(values.partnerItems ?? []);
  const [developerItems, setDeveloperItems] = useState(values.developerItems ?? []);
  const [hireServices, setHireServices] = useState(values.hireServices ?? []);
  const [guideTabs, setGuideTabs] = useState(values.guideTabs ?? []);
  const [steps, setSteps] = useState(values.steps ?? []);
  const [engagementModels, setEngagementModels] = useState(values.engagementModels ?? []);

  return (
    <div className="grid gap-5">
      <HiddenJsonField name="heroTechnologies" value={heroTechnologies} />
      <HiddenJsonField name="excellenceOfferings" value={excellenceOfferings} />
      <HiddenJsonField name="partnerItems" value={partnerItems} />
      <HiddenJsonField name="developerItems" value={developerItems} />
      <HiddenJsonField name="hireServices" value={hireServices} />
      <HiddenJsonField name="guideTabs" value={guideTabs} />
      <HiddenJsonField name="steps" value={steps} />
      <HiddenJsonField name="engagementModels" value={engagementModels} />

      <SectionBlock title="Core Fields" defaultOpen>
        <AdminField label="Navigation label"><AdminInput name="navLabel" required defaultValue={values.navLabel} placeholder="Node.Js Developer" /></AdminField>
        <AdminField label="Category key"><AdminInput name="categoryKey" required defaultValue={values.categoryKey} placeholder="backend-developer" /></AdminField>
        <AdminField label="Display order"><AdminInput name="order" type="number" min="0" defaultValue={String(values.order ?? 1)} /></AdminField>
        <div className="lg:col-span-2"><AdminCheckbox name="isPublished" label="Published in navbar and offshore pages" defaultChecked={values.isPublished ?? true} /></div>
      </SectionBlock>

      <SectionBlock title="Hero Section">
        <AdminField label="Hero title"><AdminTextarea name="heroTitle" defaultValue={values.heroTitle} className="min-h-24" /></AdminField>
        <AdminField label="Form title"><AdminInput name="heroFormTitle" defaultValue={values.heroFormTitle} /></AdminField>
        <div className="lg:col-span-2"><AdminField label="Hero description"><AdminTextarea name="heroDescription" defaultValue={values.heroDescription} className="min-h-28" /></AdminField></div>
        <div className="lg:col-span-2"><AdminField label="Hero checklist" hint="Use one point per line."><AdminTextarea name="heroChecklist" defaultValue={values.heroChecklist?.join("\n")} className="min-h-24" /></AdminField></div>
        {heroTechnologies.map((tech, index) => (
          <div key={`tech-${index}`} className="rounded-[18px] border border-white/10 bg-[#0f172a]/45 p-4 grid gap-5 lg:grid-cols-2">
            <AdminField label={`Technology ${index + 1} value`}><AdminInput value={tech.value} onChange={(event) => setHeroTechnologies((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, value: event.target.value } : item))} /></AdminField>
            <AdminField label={`Technology ${index + 1} label`}><AdminInput value={tech.label} onChange={(event) => setHeroTechnologies((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, label: event.target.value } : item))} /></AdminField>
            <button type="button" onClick={() => setHeroTechnologies((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove technology</button>
          </div>
        ))}
        <button type="button" onClick={() => setHeroTechnologies((current) => [...current, { ...defaultHeroTechnology }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add technology</button>
      </SectionBlock>

      <SectionBlock title="Excellence Section">
        <AdminField label="Section title"><AdminTextarea name="excellenceTitle" defaultValue={values.excellenceTitle} className="min-h-24" /></AdminField>
        <div className="lg:col-span-2"><AdminField label="Section subtitle"><AdminTextarea name="excellenceSubtitle" defaultValue={values.excellenceSubtitle} className="min-h-28" /></AdminField></div>
        {excellenceOfferings.map((offering, index) => (
          <div key={`offering-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label={`Offering ${index + 1} title`}><AdminInput value={offering.title} onChange={(event) => setExcellenceOfferings((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, title: event.target.value } : item))} /></AdminField>
              <AdminField label="Alt text"><AdminInput value={offering.alt} onChange={(event) => setExcellenceOfferings((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, alt: event.target.value } : item))} /></AdminField>
              <AdminField label="Width"><AdminInput type="number" value={String(offering.width)} onChange={(event) => setExcellenceOfferings((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, width: Number(event.target.value) || 0 } : item))} /></AdminField>
              <AdminField label="Height"><AdminInput type="number" value={String(offering.height)} onChange={(event) => setExcellenceOfferings((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, height: Number(event.target.value) || 0 } : item))} /></AdminField>
              <div className="lg:col-span-2"><AdminField label="Description"><AdminTextarea value={offering.description} onChange={(event) => setExcellenceOfferings((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item))} className="min-h-24" /></AdminField></div>
              <div className="lg:col-span-2"><ImageSourceField label={`Offering ${index + 1} image/logo`} value={offering.imageData} onChange={(value) => setExcellenceOfferings((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, imageData: value } : item))} /></div>
              <button type="button" onClick={() => setExcellenceOfferings((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove offering</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setExcellenceOfferings((current) => [...current, { ...defaultOffering }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add offering</button>
      </SectionBlock>

      <SectionBlock title="CTA Section">
        <AdminField label="CTA title"><AdminTextarea name="ctaTitle" defaultValue={values.ctaTitle} className="min-h-24" /></AdminField>
        <AdminField label="CTA button text"><AdminInput name="ctaButtonText" defaultValue={values.ctaButtonText} /></AdminField>
        <AdminField label="CTA button link"><AdminInput name="ctaButtonLink" defaultValue={values.ctaButtonLink} /></AdminField>
      </SectionBlock>

      <SectionBlock title="Partner Section">
        <AdminField label="Section title"><AdminTextarea name="partnerTitle" defaultValue={values.partnerTitle} className="min-h-24" /></AdminField>
        <AdminField label="Button text"><AdminInput name="partnerButtonText" defaultValue={values.partnerButtonText} /></AdminField>
        <AdminField label="Button link"><AdminInput name="partnerButtonLink" defaultValue={values.partnerButtonLink} /></AdminField>
        {partnerItems.map((item, index) => (
          <div key={`partner-item-${index}`} className="rounded-[18px] border border-white/10 bg-[#0f172a]/45 p-4 grid gap-5">
            <AdminField label={`Item ${index + 1} title`}><AdminInput value={item.title} onChange={(event) => setPartnerItems((current) => current.map((child, childIndex) => childIndex === index ? { ...child, title: event.target.value } : child))} /></AdminField>
            <AdminField label={`Item ${index + 1} description`}><AdminTextarea value={item.description} onChange={(event) => setPartnerItems((current) => current.map((child, childIndex) => childIndex === index ? { ...child, description: event.target.value } : child))} className="min-h-24" /></AdminField>
            <button type="button" onClick={() => setPartnerItems((current) => current.filter((_, childIndex) => childIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove item</button>
          </div>
        ))}
        <button type="button" onClick={() => setPartnerItems((current) => [...current, { ...defaultPartnerItem }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add item</button>
      </SectionBlock>

      <SectionBlock title="Developer Grid Section">
        <AdminField label="Section title"><AdminTextarea name="developerGridTitle" defaultValue={values.developerGridTitle} className="min-h-24" /></AdminField>
        {developerItems.map((developer, index) => (
          <div key={`developer-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label={`Developer ${index + 1} name`}><AdminInput value={developer.name} onChange={(event) => setDeveloperItems((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, name: event.target.value } : item))} /></AdminField>
              <AdminField label="Alt text"><AdminInput value={developer.alt} onChange={(event) => setDeveloperItems((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, alt: event.target.value } : item))} /></AdminField>
              <AdminField label="Link"><AdminInput value={developer.link} onChange={(event) => setDeveloperItems((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, link: event.target.value } : item))} /></AdminField>
              <AdminField label="Width"><AdminInput type="number" value={String(developer.width)} onChange={(event) => setDeveloperItems((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, width: Number(event.target.value) || 0 } : item))} /></AdminField>
              <AdminField label="Height"><AdminInput type="number" value={String(developer.height)} onChange={(event) => setDeveloperItems((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, height: Number(event.target.value) || 0 } : item))} /></AdminField>
              <div className="lg:col-span-2"><ImageSourceField label={`Developer ${index + 1} image/logo`} value={developer.imageData} onChange={(value) => setDeveloperItems((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, imageData: value } : item))} /></div>
              <button type="button" onClick={() => setDeveloperItems((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove developer</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setDeveloperItems((current) => [...current, { ...defaultDeveloper }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add developer</button>
      </SectionBlock>

      <SectionBlock title="Hire Services Section">
        <AdminField label="Section title"><AdminTextarea name="hireTitle" defaultValue={values.hireTitle} className="min-h-24" /></AdminField>
        <div className="lg:col-span-2"><AdminField label="Section subtitle"><AdminTextarea name="hireSubtitle" defaultValue={values.hireSubtitle} className="min-h-28" /></AdminField></div>
        {hireServices.map((service, index) => (
          <div key={`service-${index}`} className="rounded-[18px] border border-white/10 bg-[#0f172a]/45 p-4 grid gap-5">
            <AdminField label={`Service ${index + 1} title`}><AdminInput value={service.title} onChange={(event) => setHireServices((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, title: event.target.value } : item))} /></AdminField>
            <AdminField label={`Service ${index + 1} description`}><AdminTextarea value={service.description} onChange={(event) => setHireServices((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item))} className="min-h-24" /></AdminField>
            <button type="button" onClick={() => setHireServices((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove service</button>
          </div>
        ))}
        <button type="button" onClick={() => setHireServices((current) => [...current, { ...defaultService }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add service</button>
      </SectionBlock>

      <SectionBlock title="Contact Expert CTA">
        <AdminField label="Section title"><AdminTextarea name="contactTitle" defaultValue={values.contactTitle} className="min-h-24" /></AdminField>
        <AdminField label="Button text"><AdminInput name="contactButtonText" defaultValue={values.contactButtonText} /></AdminField>
        <AdminField label="Button link"><AdminInput name="contactButtonLink" defaultValue={values.contactButtonLink} /></AdminField>
      </SectionBlock>

      <SectionBlock title="Hire Guide Section">
        <AdminField label="Section title"><AdminTextarea name="guideTitle" defaultValue={values.guideTitle} className="min-h-24" /></AdminField>
        {guideTabs.map((tab, index) => (
          <div key={`guide-tab-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
            <div className="grid gap-5">
              <div className="grid gap-5 lg:grid-cols-3">
                <AdminField label={`Guide tab ${index + 1} key`}><AdminInput value={tab.key} onChange={(event) => setGuideTabs((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, key: event.target.value } : item))} /></AdminField>
                <AdminField label="Label"><AdminInput value={tab.label} onChange={(event) => setGuideTabs((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, label: event.target.value } : item))} /></AdminField>
                <AdminField label="Section"><AdminInput value={tab.section} onChange={(event) => setGuideTabs((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, section: event.target.value } : item))} /></AdminField>
              </div>
              {tab.items.map((guideItem, itemIndex) => (
                <div key={`guide-item-${index}-${itemIndex}`} className="rounded-[18px] border border-white/10 bg-black/10 p-4 grid gap-5">
                  <AdminField label={`Item ${itemIndex + 1} title`}><AdminInput value={guideItem.title} onChange={(event) => setGuideTabs((current) => current.map((item, tabIndex) => tabIndex === index ? { ...item, items: item.items.map((child, childIndex) => childIndex === itemIndex ? { ...child, title: event.target.value } : child) } : item))} /></AdminField>
                  <AdminField label="Description"><AdminTextarea value={guideItem.description} onChange={(event) => setGuideTabs((current) => current.map((item, tabIndex) => tabIndex === index ? { ...item, items: item.items.map((child, childIndex) => childIndex === itemIndex ? { ...child, description: event.target.value } : child) } : item))} className="min-h-24" /></AdminField>
                  <button type="button" onClick={() => setGuideTabs((current) => current.map((item, tabIndex) => tabIndex === index ? { ...item, items: item.items.filter((_, childIndex) => childIndex !== itemIndex) } : item))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove item</button>
                </div>
              ))}
              <button type="button" onClick={() => setGuideTabs((current) => current.map((item, tabIndex) => tabIndex === index ? { ...item, items: [...item.items, { title: "", description: "" }] } : item))} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add guide item</button>
              <button type="button" onClick={() => setGuideTabs((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove guide tab</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setGuideTabs((current) => [...current, { ...defaultGuideTab }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add guide tab</button>
      </SectionBlock>

      <SectionBlock title="Hire Steps Section">
        <AdminField label="Section title"><AdminTextarea name="stepsTitle" defaultValue={values.stepsTitle} className="min-h-24" /></AdminField>
        <AdminField label="Button text"><AdminInput name="stepsButtonText" defaultValue={values.stepsButtonText} /></AdminField>
        <AdminField label="Button link"><AdminInput name="stepsButtonLink" defaultValue={values.stepsButtonLink} /></AdminField>
        {steps.map((step, index) => (
          <div key={`step-${index}`} className="rounded-[18px] border border-white/10 bg-[#0f172a]/45 p-4 grid gap-5 lg:grid-cols-2">
            <AdminField label={`Step ${index + 1} label`}><AdminInput value={step.stepLabel} onChange={(event) => setSteps((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, stepLabel: event.target.value } : item))} /></AdminField>
            <AdminField label={`Step ${index + 1} title`}><AdminInput value={step.title} onChange={(event) => setSteps((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, title: event.target.value } : item))} /></AdminField>
            <div className="lg:col-span-2"><AdminField label={`Step ${index + 1} description`}><AdminTextarea value={step.description} onChange={(event) => setSteps((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item))} className="min-h-24" /></AdminField></div>
            <button type="button" onClick={() => setSteps((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove step</button>
          </div>
        ))}
        <button type="button" onClick={() => setSteps((current) => [...current, { ...defaultStep }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add step</button>
      </SectionBlock>

      <PageFaqEditor initial={values.faqs} />

      <SectionBlock title="Engagement Models Section">
        <AdminField label="Section title"><AdminTextarea name="engagementTitle" defaultValue={values.engagementTitle} className="min-h-24" /></AdminField>
        <div className="lg:col-span-2"><AdminField label="Section subtitle"><AdminTextarea name="engagementSubtitle" defaultValue={values.engagementSubtitle} className="min-h-28" /></AdminField></div>
        {engagementModels.map((model, index) => (
          <div key={`engagement-model-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label={`Model ${index + 1} title`}><AdminInput value={model.title} onChange={(event) => setEngagementModels((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, title: event.target.value } : item))} /></AdminField>
              <div className="lg:col-span-2"><AdminField label="Description"><AdminTextarea value={model.description} onChange={(event) => setEngagementModels((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item))} className="min-h-24" /></AdminField></div>
              <AdminField label="Features" hint="One feature per line"><AdminTextarea value={listToMultiline(model.features)} onChange={(event) => setEngagementModels((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, features: multilineToList(event.target.value) } : item))} className="min-h-24" /></AdminField>
              <button type="button" onClick={() => setEngagementModels((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove model</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setEngagementModels((current) => [...current, { ...defaultEngagementModel }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add model</button>
      </SectionBlock>
    </div>
  );
}

export function OffshoreDeveloperSettingsRichEditor({ values }: { values: OffshoreDeveloperSettingsRecord }) {
  const [menuCategories, setMenuCategories] = useState(values.menuCategories);
  const [partnerLogos, setPartnerLogos] = useState(values.partnerLogos);
  const [testimonials, setTestimonials] = useState(values.testimonials);
  const [caseStudies, setCaseStudies] = useState(values.caseStudies);
  const [faqs, setFaqs] = useState(values.faqs);

  return (
    <div className="grid gap-5">
      <HiddenJsonField name="menuCategories" value={menuCategories} />
      <HiddenJsonField name="partnerLogos" value={partnerLogos} />
      <HiddenJsonField name="testimonials" value={testimonials} />
      <HiddenJsonField name="caseStudies" value={caseStudies} />
      <HiddenJsonField name="faqs" value={faqs} />

      <SectionBlock title="Navbar Categories" defaultOpen>
        {menuCategories.map((category, index) => (
          <div key={`menu-category-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label={`Category ${index + 1} key`}><AdminInput value={category.key} onChange={(event) => setMenuCategories((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, key: event.target.value } : item))} /></AdminField>
              <AdminField label="Label"><AdminInput value={category.label} onChange={(event) => setMenuCategories((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, label: event.target.value } : item))} /></AdminField>
              <AdminField label="Menu heading"><AdminInput value={category.menuHeading} onChange={(event) => setMenuCategories((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, menuHeading: event.target.value } : item))} /></AdminField>
              <AdminField label="Order"><AdminInput type="number" value={String(category.order)} onChange={(event) => setMenuCategories((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, order: Number(event.target.value) || 0 } : item))} /></AdminField>
              <button type="button" onClick={() => setMenuCategories((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove category</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setMenuCategories((current) => [...current, { ...defaultMenuCategory }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add category</button>
      </SectionBlock>

      <SectionBlock title="Partner Logos">
        {partnerLogos.map((logo, index) => (
          <div key={`partner-logo-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label={`Logo ${index + 1} label`}><AdminInput value={logo.label} onChange={(event) => setPartnerLogos((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, label: event.target.value } : item))} /></AdminField>
              <AdminField label="Link"><AdminInput value={logo.href} onChange={(event) => setPartnerLogos((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, href: event.target.value } : item))} /></AdminField>
              <div className="lg:col-span-2"><ImageSourceField label={`Logo ${index + 1} image`} value={logo.imageData} onChange={(value) => setPartnerLogos((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, imageData: value } : item))} /></div>
              <button type="button" onClick={() => setPartnerLogos((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove logo</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setPartnerLogos((current) => [...current, { ...defaultLogo }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add logo</button>
      </SectionBlock>

      <SectionBlock title="Testimonials Section">
        <AdminField label="Section title"><AdminInput name="testimonialTitle" defaultValue={values.testimonialTitle} /></AdminField>
        <AdminField label="Section subtitle"><AdminInput name="testimonialSubtitle" defaultValue={values.testimonialSubtitle} /></AdminField>
        {testimonials.map((testimonial, index) => (
          <div key={`testimonial-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label={`Testimonial ${index + 1} name`}><AdminInput value={testimonial.name} onChange={(event) => setTestimonials((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, name: event.target.value } : item))} /></AdminField>
              <AdminField label="Role"><AdminInput value={testimonial.role} onChange={(event) => setTestimonials((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, role: event.target.value } : item))} /></AdminField>
              <div className="lg:col-span-2"><AdminField label="Quote"><AdminTextarea value={testimonial.quote} onChange={(event) => setTestimonials((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, quote: event.target.value } : item))} className="min-h-24" /></AdminField></div>
              <div><ImageSourceField label={`Avatar ${index + 1}`} value={testimonial.avatarImageData} onChange={(value) => setTestimonials((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, avatarImageData: value } : item))} /></div>
              <div><ImageSourceField label={`Stars image ${index + 1}`} value={testimonial.starsImageData} onChange={(value) => setTestimonials((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, starsImageData: value } : item))} /></div>
              <button type="button" onClick={() => setTestimonials((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove testimonial</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setTestimonials((current) => [...current, { ...defaultTestimonial }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add testimonial</button>
      </SectionBlock>

      <SectionBlock title="Case Study Section">
        <AdminField label="Section title"><AdminTextarea name="caseStudyTitle" defaultValue={values.caseStudyTitle} className="min-h-24" /></AdminField>
        <div className="lg:col-span-2"><AdminField label="Section subtitle"><AdminTextarea name="caseStudySubtitle" defaultValue={values.caseStudySubtitle} className="min-h-28" /></AdminField></div>
        {caseStudies.map((caseStudy, index) => (
          <div key={`case-study-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label={`Case study ${index + 1} title`}><AdminInput value={caseStudy.title} onChange={(event) => setCaseStudies((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, title: event.target.value } : item))} /></AdminField>
              <div className="lg:col-span-2"><AdminField label="Description"><AdminTextarea value={caseStudy.description} onChange={(event) => setCaseStudies((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item))} className="min-h-24" /></AdminField></div>
              <AdminField label="Left features" hint="One feature per line"><AdminTextarea value={listToMultiline(caseStudy.featuresLeft)} onChange={(event) => setCaseStudies((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, featuresLeft: multilineToList(event.target.value) } : item))} className="min-h-24" /></AdminField>
              <AdminField label="Right features" hint="One feature per line"><AdminTextarea value={listToMultiline(caseStudy.featuresRight)} onChange={(event) => setCaseStudies((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, featuresRight: multilineToList(event.target.value) } : item))} className="min-h-24" /></AdminField>
              <div className="lg:col-span-2"><ImageSourceField label={`Case study ${index + 1} image`} value={caseStudy.imageData} onChange={(value) => setCaseStudies((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, imageData: value } : item))} /></div>
              <button type="button" onClick={() => setCaseStudies((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove case study</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setCaseStudies((current) => [...current, { ...defaultCaseStudy }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add case study</button>
      </SectionBlock>

      <SectionBlock title="FAQ Section">
        <AdminField label="Section title"><AdminTextarea name="faqTitle" defaultValue={values.faqTitle} className="min-h-24" /></AdminField>
        {faqs.map((faq, index) => (
          <div key={`faq-${index}`} className="lg:col-span-2 rounded-[18px] border border-white/10 bg-[#0f172a]/45 p-4 grid gap-5">
            <AdminField label={`FAQ ${index + 1} question`}><AdminInput value={faq.question} onChange={(event) => setFaqs((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, question: event.target.value } : item))} /></AdminField>
            <AdminField label={`FAQ ${index + 1} answer`}><AdminTextarea value={faq.answer} onChange={(event) => setFaqs((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, answer: event.target.value } : item))} className="min-h-24" /></AdminField>
            <button type="button" onClick={() => setFaqs((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove FAQ</button>
          </div>
        ))}
        <button type="button" onClick={() => setFaqs((current) => [...current, { ...defaultFaq }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add FAQ</button>
      </SectionBlock>
    </div>
  );
}
