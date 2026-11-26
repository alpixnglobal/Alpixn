"use client";

import { useId, useState, type ChangeEvent } from "react";

import { prepareAdminImageUpload } from "@/components/admin/client-image-utils";
import { AdminCheckbox, AdminField, AdminInput, AdminTextarea } from "@/components/admin/admin-ui";
import type { ProductPageRecord, ProductSettingsRecord } from "@/lib/content-types";

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
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-400">Expand</span>
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
        <label htmlFor={inputId} className="text-sm font-semibold text-white">{label}</label>
        <p className="text-xs leading-6 text-slate-400">Upload an image/logo or paste an external image URL.</p>
      </div>

      <label htmlFor={inputId} className="flex min-h-32 cursor-pointer items-center justify-center rounded-[18px] border border-dashed border-white/12 bg-white/[0.03] px-4 py-4 text-center">
        {value ? <img src={value} alt={label} className="max-h-36 w-full rounded-[14px] object-contain" /> : <span className="text-sm text-slate-300">Choose image</span>}
      </label>

      <input id={inputId} type="file" accept="image/*" className="hidden" onChange={handleChange} />

      <AdminField label="Image URL or stored path">
        <AdminInput value={value} onChange={(event) => onChange(event.target.value)} placeholder="https://example.com/image.png or /images/file.png" />
      </AdminField>

      <button type="button" onClick={() => onChange("")} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">
        Clear image
      </button>
    </div>
  );
}

const defaultFeature = { title: "", description: "", imageData: "", buttonLabel: "View Full Details", buttonHref: "#" };
const defaultAudience = { title: "", description: "", imageData: "" };
const defaultFaq = { question: "", answer: "" };

export function ProductEntryRichEditor({ values = {} }: { values?: Partial<ProductPageRecord> }) {
  return (
    <div className="grid gap-5">
      <AdminField label="Navigation label"><AdminInput name="navLabel" required defaultValue={values.navLabel} placeholder="Salon Management" /></AdminField>
      <AdminField label="Hero title"><AdminInput name="heroTitle" required defaultValue={values.heroTitle} placeholder="Salon Management Software" /></AdminField>
      <AdminField label="Hero subtitle"><AdminInput name="heroSubtitle" defaultValue={values.heroSubtitle} placeholder="Transform Your Salon Operations" /></AdminField>
      <AdminField label="Display order"><AdminInput name="order" type="number" min="0" defaultValue={String(values.order ?? 1)} /></AdminField>
      <div className="lg:col-span-2"><AdminField label="Hero description"><AdminTextarea name="heroDescription" required defaultValue={values.heroDescription} className="min-h-28" /></AdminField></div>
      <AdminField label="Hero button label"><AdminInput name="heroButtonLabel" defaultValue={values.heroButtonLabel} placeholder="Book Your Demo" /></AdminField>
      <AdminField label="Hero button link"><AdminInput name="heroButtonHref" defaultValue={values.heroButtonHref} placeholder="/contact-us" /></AdminField>
      <div className="lg:col-span-2"><AdminCheckbox name="isPublished" label="Published in navbar and product pages" defaultChecked={values.isPublished ?? true} /></div>
    </div>
  );
}

export function ProductSettingsRichEditor({ values }: { values: ProductSettingsRecord }) {
  const [menuImageData, setMenuImageData] = useState(values.menuImageData);
  const [customSupportImageData, setCustomSupportImageData] = useState(values.customSupportImageData);
  const [featureCards, setFeatureCards] = useState(values.featureCards);
  const [audienceCards, setAudienceCards] = useState(values.audienceCards);
  const [faqs, setFaqs] = useState(values.faqs);

  return (
    <div className="grid gap-5">
      <HiddenJsonField name="featureCards" value={featureCards} />
      <HiddenJsonField name="audienceCards" value={audienceCards} />
      <HiddenJsonField name="faqs" value={faqs} />
      <input type="hidden" name="menuImageData" value={menuImageData} readOnly />
      <input type="hidden" name="customSupportImageData" value={customSupportImageData} readOnly />

      <SectionBlock title="Navbar Dropdown" defaultOpen>
        <AdminField label="Dropdown title"><AdminInput name="menuTitle" defaultValue={values.menuTitle} /></AdminField>
        <AdminField label="Button label"><AdminInput name="menuButtonLabel" defaultValue={values.menuButtonLabel} /></AdminField>
        <div className="lg:col-span-2"><AdminField label="Dropdown description"><AdminTextarea name="menuDescription" defaultValue={values.menuDescription} className="min-h-24" /></AdminField></div>
        <div className="lg:col-span-2"><AdminField label="Dropdown secondary description"><AdminTextarea name="menuDescriptionSecondary" defaultValue={values.menuDescriptionSecondary} className="min-h-24" /></AdminField></div>
        <AdminField label="Button link"><AdminInput name="menuButtonHref" defaultValue={values.menuButtonHref} /></AdminField>
        <div className="lg:col-span-2"><ImageSourceField label="Dropdown image" value={menuImageData} onChange={setMenuImageData} /></div>
      </SectionBlock>

      <SectionBlock title="Landing Hero">
        <AdminField label="Hero subtitle"><AdminInput name="landingHeroSubtitle" defaultValue={values.landingHeroSubtitle} /></AdminField>
        <AdminField label="Hero title"><AdminInput name="landingHeroTitle" defaultValue={values.landingHeroTitle} /></AdminField>
        <div className="lg:col-span-2"><AdminField label="Hero description"><AdminTextarea name="landingHeroDescription" defaultValue={values.landingHeroDescription} className="min-h-28" /></AdminField></div>
        <AdminField label="Hero button label"><AdminInput name="landingHeroButtonLabel" defaultValue={values.landingHeroButtonLabel} /></AdminField>
        <AdminField label="Hero button link"><AdminInput name="landingHeroButtonHref" defaultValue={values.landingHeroButtonHref} /></AdminField>
      </SectionBlock>

      <SectionBlock title="Custom Support Section">
        <AdminField label="Section title"><AdminTextarea name="customSupportTitle" defaultValue={values.customSupportTitle} className="min-h-24" /></AdminField>
        <div className="lg:col-span-2"><AdminField label="Section description"><AdminTextarea name="customSupportDescription" defaultValue={values.customSupportDescription} className="min-h-28" /></AdminField></div>
        <div className="lg:col-span-2"><ImageSourceField label="Section image" value={customSupportImageData} onChange={setCustomSupportImageData} /></div>
      </SectionBlock>

      <SectionBlock title="Features Section">
        <AdminField label="Section title"><AdminTextarea name="featuresTitle" defaultValue={values.featuresTitle} className="min-h-24" /></AdminField>
        <div className="lg:col-span-2"><AdminField label="Section description"><AdminTextarea name="featuresDescription" defaultValue={values.featuresDescription} className="min-h-28" /></AdminField></div>
        {featureCards.map((feature, index) => (
          <div key={`feature-card-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label={`Feature ${index + 1} title`}><AdminInput value={feature.title} onChange={(event) => setFeatureCards((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, title: event.target.value } : item))} /></AdminField>
              <AdminField label="Button label"><AdminInput value={feature.buttonLabel} onChange={(event) => setFeatureCards((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, buttonLabel: event.target.value } : item))} /></AdminField>
              <AdminField label="Button href"><AdminInput value={feature.buttonHref} onChange={(event) => setFeatureCards((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, buttonHref: event.target.value } : item))} /></AdminField>
              <div className="lg:col-span-2"><AdminField label="Description"><AdminTextarea value={feature.description} onChange={(event) => setFeatureCards((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item))} className="min-h-24" /></AdminField></div>
              <div className="lg:col-span-2"><ImageSourceField label={`Feature ${index + 1} image`} value={feature.imageData} onChange={(value) => setFeatureCards((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, imageData: value } : item))} /></div>
              <button type="button" onClick={() => setFeatureCards((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove feature</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setFeatureCards((current) => [...current, { ...defaultFeature }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add feature</button>
      </SectionBlock>

      <SectionBlock title="Transform Engagement Section">
        <AdminField label="Section title"><AdminTextarea name="transformTitle" defaultValue={values.transformTitle} className="min-h-24" /></AdminField>
        <div className="lg:col-span-2"><AdminField label="Section description"><AdminTextarea name="transformDescription" defaultValue={values.transformDescription} className="min-h-28" /></AdminField></div>
        {audienceCards.map((audience, index) => (
          <div key={`audience-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label={`Audience ${index + 1} title`}><AdminInput value={audience.title} onChange={(event) => setAudienceCards((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, title: event.target.value } : item))} /></AdminField>
              <div className="lg:col-span-2"><AdminField label="Description"><AdminTextarea value={audience.description} onChange={(event) => setAudienceCards((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item))} className="min-h-24" /></AdminField></div>
              <div className="lg:col-span-2"><ImageSourceField label={`Audience ${index + 1} image/icon`} value={audience.imageData} onChange={(value) => setAudienceCards((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, imageData: value } : item))} /></div>
              <button type="button" onClick={() => setAudienceCards((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove audience</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setAudienceCards((current) => [...current, { ...defaultAudience }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add audience</button>
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

      <SectionBlock title="Drive Customers CTA">
        <AdminField label="Section title"><AdminTextarea name="driveTitle" defaultValue={values.driveTitle} className="min-h-24" /></AdminField>
        <div className="lg:col-span-2"><AdminField label="Section description"><AdminTextarea name="driveDescription" defaultValue={values.driveDescription} className="min-h-28" /></AdminField></div>
        <AdminField label="Button label"><AdminInput name="driveButtonLabel" defaultValue={values.driveButtonLabel} /></AdminField>
        <AdminField label="Button link"><AdminInput name="driveButtonHref" defaultValue={values.driveButtonHref} /></AdminField>
      </SectionBlock>
    </div>
  );
}
