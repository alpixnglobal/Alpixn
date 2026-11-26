"use client";

import { useId, useState, type ChangeEvent } from "react";

import { prepareAdminImageUpload } from "@/components/admin/client-image-utils";
import { AdminCheckbox, AdminField, AdminInput, AdminTextarea } from "@/components/admin/admin-ui";
import type { ExpertisePageRecord, ExpertiseSettingsRecord } from "@/lib/content-types";

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
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function listToMultiline(values: string[]) {
  return values.join("\n");
}

const defaultMenuCategory = { key: "", label: "", description: "", menuHeading: "", order: 0 };
const defaultStatCard = { title: "", description: "" };
const defaultCaseStudy = {
  id: "",
  title: "",
  heading: "",
  description: "",
  features: [],
  cta1: "",
  cta2: "",
  imageData: "",
  cta1Link: "#",
  cta2Link: "#",
};
const defaultBenefit = { id: "", number: "", title: "", description: "" };
const defaultFeature = { id: "", title: "", description: "", icon: "", iconAlt: "", iconWidth: 40, iconHeight: 40, iconRightClass: "right-5" };
const defaultIndustry = { id: "", name: "", icon: "", iconAlt: "", link: "#" };
const defaultGuideTab = { key: "", label: "", section: "", items: [{ title: "", bullets: [] as string[] }] };
const defaultTestimonial = { quote: "", author: "", position: "", company: "", avatar: "" };
const defaultEngagementModel = { title: "", description: "", features: [] as string[] };
const defaultTechStackTab = { name: "", value: "", items: [{ label: "", imageData: "" }] };
const defaultFaq = { question: "", answer: "" };

export function ExpertisePageRichEditor({ values }: { values?: Partial<ExpertisePageRecord> }) {
  const [heroLogos, setHeroLogos] = useState(values?.heroLogos ?? []);
  const [heroBackgroundImage, setHeroBackgroundImage] = useState(values?.heroBackgroundImage ?? "");
  const [statsCards, setStatsCards] = useState(values?.statsCards ?? []);
  const [caseStudyTabs, setCaseStudyTabs] = useState(values?.caseStudyTabs ?? []);
  const [customImage, setCustomImage] = useState(values?.customImage ?? "");
  const [customBenefits, setCustomBenefits] = useState(values?.customBenefits ?? []);
  const [whyChooseFeatures, setWhyChooseFeatures] = useState(values?.whyChooseFeatures ?? []);
  const [industriesItems, setIndustriesItems] = useState(values?.industriesItems ?? []);
  const [guideTabs, setGuideTabs] = useState(values?.guideTabs ?? []);

  return (
    <div className="grid gap-5">
      <HiddenJsonField name="heroLogos" value={heroLogos} />
      <HiddenJsonField name="statsCards" value={statsCards} />
      <HiddenJsonField name="caseStudyTabs" value={caseStudyTabs} />
      <HiddenJsonField name="customBenefits" value={customBenefits} />
      <HiddenJsonField name="whyChooseFeatures" value={whyChooseFeatures} />
      <HiddenJsonField name="industriesItems" value={industriesItems} />
      <HiddenJsonField name="guideTabs" value={guideTabs} />
      <input type="hidden" name="heroBackgroundImage" value={heroBackgroundImage} readOnly />
      <input type="hidden" name="customImage" value={customImage} readOnly />

      <SectionBlock title="Core Fields" defaultOpen>
        <AdminField label="Navigation label">
          <AdminInput name="navLabel" required defaultValue={values?.navLabel} />
        </AdminField>
        <AdminField label="Category key">
          <AdminInput name="categoryKey" required defaultValue={values?.categoryKey} placeholder="software-solution" />
        </AdminField>
        <AdminField label="Display order">
          <AdminInput name="order" type="number" min="0" defaultValue={String(values?.order ?? 1)} />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminCheckbox name="isPublished" label="Published in expertise navigation and public pages" defaultChecked={values?.isPublished ?? true} />
        </div>
      </SectionBlock>

      <SectionBlock title="Hero Section">
        <AdminField label="Hero title">
          <AdminTextarea name="heroTitle" defaultValue={values?.heroTitle} className="min-h-24" />
        </AdminField>
        <AdminField label="CTA button text">
          <AdminInput name="ctaButtonText" defaultValue={values?.ctaButtonText} />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Hero description">
            <AdminTextarea name="heroDescription" defaultValue={values?.heroDescription} className="min-h-28" />
          </AdminField>
        </div>
        <div className="lg:col-span-2">
          <ImageSourceField label="Hero background image" value={heroBackgroundImage} onChange={setHeroBackgroundImage} />
        </div>
        {heroLogos.map((logo, index) => (
          <div key={`hero-logo-${index}`} className="lg:col-span-2 rounded-[18px] border border-white/10 bg-[#0f172a]/45 p-4">
            <ImageSourceField label={`Hero logo ${index + 1}`} value={logo} onChange={(value) => setHeroLogos((current) => current.map((item, itemIndex) => (itemIndex === index ? value : item)))} />
            <button type="button" onClick={() => setHeroLogos((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="mt-4 w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">
              Remove logo
            </button>
          </div>
        ))}
        <button type="button" onClick={() => setHeroLogos((current) => [...current, ""])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">
          Add hero logo
        </button>
      </SectionBlock>

      <SectionBlock title="Stats Section">
        <AdminField label="Section title">
          <AdminTextarea name="statsTitle" defaultValue={values?.statsTitle} className="min-h-24" />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Section description">
            <AdminTextarea name="statsDescription" defaultValue={values?.statsDescription} className="min-h-28" />
          </AdminField>
        </div>
        <div className="lg:col-span-2 rounded-[18px] border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm leading-7 text-cyan-100">
          The top stat strip is managed globally from <strong>Admin Settings → Shared Stats</strong>.
          This page still controls the section title, description, and stat cards below.
        </div>

        {statsCards.map((card, index) => (
          <div key={`stats-card-${index}`} className="lg:col-span-2 rounded-[18px] border border-white/10 bg-[#0f172a]/45 p-4 grid gap-5">
            <AdminField label={`Stat card ${index + 1} title`}>
              <AdminInput value={card.title} onChange={(event) => setStatsCards((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, title: event.target.value } : item)))} />
            </AdminField>
            <AdminField label={`Stat card ${index + 1} description`}>
              <AdminTextarea value={card.description} onChange={(event) => setStatsCards((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, description: event.target.value } : item)))} className="min-h-24" />
            </AdminField>
            <button type="button" onClick={() => setStatsCards((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove stat card</button>
          </div>
        ))}
        <button type="button" onClick={() => setStatsCards((current) => [...current, { ...defaultStatCard }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add stat card</button>
      </SectionBlock>

      <SectionBlock title="Case Studies">
        <AdminField label="Section title">
          <AdminTextarea name="caseStudyTitle" defaultValue={values?.caseStudyTitle} className="min-h-24" />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Section subtitle">
            <AdminTextarea name="caseStudySubtitle" defaultValue={values?.caseStudySubtitle} className="min-h-28" />
          </AdminField>
        </div>
        {caseStudyTabs.map((tab, index) => (
          <div key={`case-study-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label={`Tab ${index + 1} id`}><AdminInput value={tab.id} onChange={(event) => setCaseStudyTabs((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, id: event.target.value } : item)))} /></AdminField>
              <AdminField label={`Tab ${index + 1} title`}><AdminInput value={tab.title} onChange={(event) => setCaseStudyTabs((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, title: event.target.value } : item)))} /></AdminField>
              <AdminField label="Heading"><AdminInput value={tab.heading} onChange={(event) => setCaseStudyTabs((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, heading: event.target.value } : item)))} /></AdminField>
              <AdminField label="Primary CTA"><AdminInput value={tab.cta1} onChange={(event) => setCaseStudyTabs((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, cta1: event.target.value } : item)))} /></AdminField>
              <AdminField label="Primary CTA link"><AdminInput value={tab.cta1Link} onChange={(event) => setCaseStudyTabs((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, cta1Link: event.target.value } : item)))} /></AdminField>
              <AdminField label="Secondary CTA"><AdminInput value={tab.cta2} onChange={(event) => setCaseStudyTabs((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, cta2: event.target.value } : item)))} /></AdminField>
              <AdminField label="Secondary CTA link"><AdminInput value={tab.cta2Link} onChange={(event) => setCaseStudyTabs((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, cta2Link: event.target.value } : item)))} /></AdminField>
              <div className="lg:col-span-2"><AdminField label="Description"><AdminTextarea value={tab.description} onChange={(event) => setCaseStudyTabs((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, description: event.target.value } : item)))} className="min-h-24" /></AdminField></div>
              <AdminField label="Features" hint="One feature per line"><AdminTextarea value={listToMultiline(tab.features)} onChange={(event) => setCaseStudyTabs((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, features: multilineToList(event.target.value) } : item)))} className="min-h-24" /></AdminField>
              <div className="lg:col-span-2"><ImageSourceField label={`Tab ${index + 1} image`} value={tab.imageData} onChange={(value) => setCaseStudyTabs((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, imageData: value } : item)))} /></div>
              <button type="button" onClick={() => setCaseStudyTabs((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove case study</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setCaseStudyTabs((current) => [...current, { ...defaultCaseStudy }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add case study</button>
      </SectionBlock>

      <SectionBlock title="Custom Software Section">
        <AdminField label="Section title"><AdminTextarea name="customTitle" defaultValue={values?.customTitle} className="min-h-24" /></AdminField>
        <AdminField label="Button text"><AdminInput name="customButtonText" defaultValue={values?.customButtonText} /></AdminField>
        <AdminField label="Button link"><AdminInput name="customButtonLink" defaultValue={values?.customButtonLink} /></AdminField>
        <AdminField label="Image alt text"><AdminInput name="customImageAlt" defaultValue={values?.customImageAlt} /></AdminField>
        <div className="lg:col-span-2"><AdminField label="Section subtitle"><AdminTextarea name="customSubtitle" defaultValue={values?.customSubtitle} className="min-h-28" /></AdminField></div>
        <div className="lg:col-span-2"><ImageSourceField label="Section image" value={customImage} onChange={setCustomImage} /></div>
        {customBenefits.map((benefit, index) => (
          <div key={`benefit-${index}`} className="rounded-[18px] border border-white/10 bg-[#0f172a]/45 p-4 grid gap-5 lg:grid-cols-2">
            <AdminField label={`Benefit ${index + 1} id`}><AdminInput value={benefit.id} onChange={(event) => setCustomBenefits((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, id: event.target.value } : item)))} /></AdminField>
            <AdminField label={`Benefit ${index + 1} number`}><AdminInput value={benefit.number} onChange={(event) => setCustomBenefits((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, number: event.target.value } : item)))} /></AdminField>
            <AdminField label={`Benefit ${index + 1} title`}><AdminInput value={benefit.title} onChange={(event) => setCustomBenefits((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, title: event.target.value } : item)))} /></AdminField>
            <div className="lg:col-span-2"><AdminField label={`Benefit ${index + 1} description`}><AdminTextarea value={benefit.description} onChange={(event) => setCustomBenefits((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, description: event.target.value } : item)))} className="min-h-24" /></AdminField></div>
            <button type="button" onClick={() => setCustomBenefits((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove benefit</button>
          </div>
        ))}
        <button type="button" onClick={() => setCustomBenefits((current) => [...current, { ...defaultBenefit }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add benefit</button>
      </SectionBlock>

      <SectionBlock title="Why Choose Us Section">
        <AdminField label="Section title"><AdminTextarea name="whyChooseTitle" defaultValue={values?.whyChooseTitle} className="min-h-24" /></AdminField>
        <div className="lg:col-span-2"><AdminField label="Section subtitle"><AdminTextarea name="whyChooseSubtitle" defaultValue={values?.whyChooseSubtitle} className="min-h-28" /></AdminField></div>
        {whyChooseFeatures.map((feature, index) => (
          <div key={`feature-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label={`Feature ${index + 1} id`}><AdminInput value={feature.id} onChange={(event) => setWhyChooseFeatures((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, id: event.target.value } : item)))} /></AdminField>
              <AdminField label={`Feature ${index + 1} title`}><AdminInput value={feature.title} onChange={(event) => setWhyChooseFeatures((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, title: event.target.value } : item)))} /></AdminField>
              <AdminField label="Icon alt text"><AdminInput value={feature.iconAlt} onChange={(event) => setWhyChooseFeatures((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, iconAlt: event.target.value } : item)))} /></AdminField>
              <AdminField label="Icon right class"><AdminInput value={feature.iconRightClass} onChange={(event) => setWhyChooseFeatures((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, iconRightClass: event.target.value } : item)))} /></AdminField>
              <AdminField label="Icon width"><AdminInput type="number" value={String(feature.iconWidth)} onChange={(event) => setWhyChooseFeatures((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, iconWidth: Number(event.target.value) || 0 } : item)))} /></AdminField>
              <AdminField label="Icon height"><AdminInput type="number" value={String(feature.iconHeight)} onChange={(event) => setWhyChooseFeatures((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, iconHeight: Number(event.target.value) || 0 } : item)))} /></AdminField>
              <div className="lg:col-span-2"><AdminField label={`Feature ${index + 1} description`}><AdminTextarea value={feature.description} onChange={(event) => setWhyChooseFeatures((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, description: event.target.value } : item)))} className="min-h-24" /></AdminField></div>
              <div className="lg:col-span-2"><ImageSourceField label={`Feature ${index + 1} icon`} value={feature.icon} onChange={(value) => setWhyChooseFeatures((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, icon: value } : item)))} /></div>
              <button type="button" onClick={() => setWhyChooseFeatures((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove feature</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setWhyChooseFeatures((current) => [...current, { ...defaultFeature }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add feature</button>
      </SectionBlock>

      <SectionBlock title="Industries Section">
        <AdminField label="Section title"><AdminTextarea name="industriesTitle" defaultValue={values?.industriesTitle} className="min-h-24" /></AdminField>
        <div className="lg:col-span-2"><AdminField label="Section subtitle"><AdminTextarea name="industriesSubtitle" defaultValue={values?.industriesSubtitle} className="min-h-28" /></AdminField></div>
        {industriesItems.map((industry, index) => (
          <div key={`industry-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label={`Industry ${index + 1} id`}><AdminInput value={industry.id} onChange={(event) => setIndustriesItems((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, id: event.target.value } : item)))} /></AdminField>
              <AdminField label={`Industry ${index + 1} name`}><AdminInput value={industry.name} onChange={(event) => setIndustriesItems((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, name: event.target.value } : item)))} /></AdminField>
              <AdminField label="Icon alt text"><AdminInput value={industry.iconAlt} onChange={(event) => setIndustriesItems((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, iconAlt: event.target.value } : item)))} /></AdminField>
              <AdminField label="Link"><AdminInput value={industry.link} onChange={(event) => setIndustriesItems((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, link: event.target.value } : item)))} /></AdminField>
              <div className="lg:col-span-2"><ImageSourceField label={`Industry ${index + 1} icon`} value={industry.icon} onChange={(value) => setIndustriesItems((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, icon: value } : item)))} /></div>
              <button type="button" onClick={() => setIndustriesItems((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove industry</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setIndustriesItems((current) => [...current, { ...defaultIndustry }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add industry</button>
      </SectionBlock>

      <SectionBlock title="Guide Section">
        <AdminField label="Section title"><AdminTextarea name="guideTitle" defaultValue={values?.guideTitle} className="min-h-24" /></AdminField>
        <div className="lg:col-span-2"><AdminField label="Section subtitle"><AdminTextarea name="guideSubtitle" defaultValue={values?.guideSubtitle} className="min-h-28" /></AdminField></div>
        {guideTabs.map((tab, index) => (
          <div key={`guide-tab-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
            <div className="grid gap-5">
              <div className="grid gap-5 lg:grid-cols-3">
                <AdminField label={`Guide tab ${index + 1} key`}><AdminInput value={tab.key} onChange={(event) => setGuideTabs((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, key: event.target.value } : item)))} /></AdminField>
                <AdminField label="Label"><AdminInput value={tab.label} onChange={(event) => setGuideTabs((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, label: event.target.value } : item)))} /></AdminField>
                <AdminField label="Section"><AdminInput value={tab.section} onChange={(event) => setGuideTabs((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, section: event.target.value } : item)))} /></AdminField>
              </div>
              {tab.items.map((guideItem, itemIndex) => (
                <div key={`guide-item-${index}-${itemIndex}`} className="rounded-[18px] border border-white/10 bg-black/10 p-4 grid gap-5">
                  <AdminField label={`Item ${itemIndex + 1} title`}><AdminInput value={guideItem.title} onChange={(event) => setGuideTabs((current) => current.map((item, tabIndex) => tabIndex === index ? { ...item, items: item.items.map((child, childIndex) => childIndex === itemIndex ? { ...child, title: event.target.value } : child) } : item))} /></AdminField>
                  <AdminField label="Bullets" hint="One bullet per line"><AdminTextarea value={listToMultiline(guideItem.bullets)} onChange={(event) => setGuideTabs((current) => current.map((item, tabIndex) => tabIndex === index ? { ...item, items: item.items.map((child, childIndex) => childIndex === itemIndex ? { ...child, bullets: multilineToList(event.target.value) } : child) } : item))} className="min-h-24" /></AdminField>
                  <button type="button" onClick={() => setGuideTabs((current) => current.map((item, tabIndex) => tabIndex === index ? { ...item, items: item.items.filter((_, childIndex) => childIndex !== itemIndex) } : item))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove item</button>
                </div>
              ))}
              <button type="button" onClick={() => setGuideTabs((current) => current.map((item, tabIndex) => tabIndex === index ? { ...item, items: [...item.items, { title: "", bullets: [] }] } : item))} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add guide item</button>
              <button type="button" onClick={() => setGuideTabs((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove guide tab</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setGuideTabs((current) => [...current, { ...defaultGuideTab }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add guide tab</button>
      </SectionBlock>

      <SectionBlock title="Start Project CTA">
        <AdminField label="Section title"><AdminTextarea name="startTitle" defaultValue={values?.startTitle} className="min-h-24" /></AdminField>
        <AdminField label="Button text"><AdminInput name="startButtonText" defaultValue={values?.startButtonText} /></AdminField>
        <AdminField label="Button link"><AdminInput name="startButtonLink" defaultValue={values?.startButtonLink} /></AdminField>
        <div className="lg:col-span-2"><AdminField label="Section subtitle"><AdminTextarea name="startSubtitle" defaultValue={values?.startSubtitle} className="min-h-28" /></AdminField></div>
      </SectionBlock>
    </div>
  );
}

export function ExpertiseSettingsRichEditor({ values }: { values: ExpertiseSettingsRecord }) {
  const [menuCategories, setMenuCategories] = useState(values.menuCategories);
  const [testimonials, setTestimonials] = useState(values.testimonials);
  const [engagementModels, setEngagementModels] = useState(values.engagementModels);
  const [techStackTabs, setTechStackTabs] = useState(values.techStackTabs);
  const [faqs, setFaqs] = useState(values.faqs);

  return (
    <div className="grid gap-5">
      <HiddenJsonField name="menuCategories" value={menuCategories} />
      <HiddenJsonField name="testimonials" value={testimonials} />
      <HiddenJsonField name="engagementModels" value={engagementModels} />
      <HiddenJsonField name="techStackTabs" value={techStackTabs} />
      <HiddenJsonField name="faqs" value={faqs} />

      <SectionBlock title="Navbar Categories" defaultOpen>
        {menuCategories.map((category, index) => (
          <div key={`menu-category-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label={`Category ${index + 1} key`}><AdminInput value={category.key} onChange={(event) => setMenuCategories((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, key: event.target.value } : item))} /></AdminField>
              <AdminField label="Label"><AdminInput value={category.label} onChange={(event) => setMenuCategories((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, label: event.target.value } : item))} /></AdminField>
              <AdminField label="Menu heading"><AdminInput value={category.menuHeading} onChange={(event) => setMenuCategories((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, menuHeading: event.target.value } : item))} /></AdminField>
              <AdminField label="Order"><AdminInput type="number" value={String(category.order)} onChange={(event) => setMenuCategories((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, order: Number(event.target.value) || 0 } : item))} /></AdminField>
              <div className="lg:col-span-2"><AdminField label="Description"><AdminTextarea value={category.description} onChange={(event) => setMenuCategories((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item))} className="min-h-24" /></AdminField></div>
              <button type="button" onClick={() => setMenuCategories((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove category</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setMenuCategories((current) => [...current, { ...defaultMenuCategory }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add category</button>
      </SectionBlock>

      <SectionBlock title="Testimonials Section">
        <AdminField label="Section title"><AdminInput name="testimonialTitle" defaultValue={values.testimonialTitle} /></AdminField>
        <AdminField label="Section subtitle"><AdminInput name="testimonialSubtitle" defaultValue={values.testimonialSubtitle} /></AdminField>
        {testimonials.map((testimonial, index) => (
          <div key={`testimonial-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label={`Testimonial ${index + 1} author`}><AdminInput value={testimonial.author} onChange={(event) => setTestimonials((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, author: event.target.value } : item))} /></AdminField>
              <AdminField label="Position"><AdminInput value={testimonial.position} onChange={(event) => setTestimonials((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, position: event.target.value } : item))} /></AdminField>
              <AdminField label="Company"><AdminInput value={testimonial.company} onChange={(event) => setTestimonials((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, company: event.target.value } : item))} /></AdminField>
              <div className="lg:col-span-2"><AdminField label="Quote"><AdminTextarea value={testimonial.quote} onChange={(event) => setTestimonials((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, quote: event.target.value } : item))} className="min-h-24" /></AdminField></div>
              <div className="lg:col-span-2"><ImageSourceField label={`Testimonial ${index + 1} avatar`} value={testimonial.avatar} onChange={(value) => setTestimonials((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, avatar: value } : item))} /></div>
              <button type="button" onClick={() => setTestimonials((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove testimonial</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setTestimonials((current) => [...current, { ...defaultTestimonial }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add testimonial</button>
      </SectionBlock>

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

      <SectionBlock title="Tech Stack Section">
        <AdminField label="Section title"><AdminTextarea name="techStackTitle" defaultValue={values.techStackTitle} className="min-h-24" /></AdminField>
        <div className="lg:col-span-2"><AdminField label="Section description"><AdminTextarea name="techStackDescription" defaultValue={values.techStackDescription} className="min-h-28" /></AdminField></div>
        {techStackTabs.map((tab, tabIndex) => (
          <div key={`techstack-tab-${tabIndex}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label={`Tab ${tabIndex + 1} name`}><AdminInput value={tab.name} onChange={(event) => setTechStackTabs((current) => current.map((item, itemIndex) => itemIndex === tabIndex ? { ...item, name: event.target.value } : item))} /></AdminField>
              <AdminField label="Value"><AdminInput value={tab.value} onChange={(event) => setTechStackTabs((current) => current.map((item, itemIndex) => itemIndex === tabIndex ? { ...item, value: event.target.value } : item))} /></AdminField>
              {tab.items.map((stackItem, itemIndex) => (
                <div key={`stack-item-${tabIndex}-${itemIndex}`} className="lg:col-span-2 rounded-[18px] border border-white/10 bg-black/10 p-4">
                  <div className="grid gap-5 lg:grid-cols-2">
                    <AdminField label={`Item ${itemIndex + 1} label`}><AdminInput value={stackItem.label} onChange={(event) => setTechStackTabs((current) => current.map((item, parentIndex) => parentIndex === tabIndex ? { ...item, items: item.items.map((child, childIndex) => childIndex === itemIndex ? { ...child, label: event.target.value } : child) } : item))} /></AdminField>
                    <div className="lg:col-span-2"><ImageSourceField label={`Item ${itemIndex + 1} image/logo`} value={stackItem.imageData} onChange={(value) => setTechStackTabs((current) => current.map((item, parentIndex) => parentIndex === tabIndex ? { ...item, items: item.items.map((child, childIndex) => childIndex === itemIndex ? { ...child, imageData: value } : child) } : item))} /></div>
                    <button type="button" onClick={() => setTechStackTabs((current) => current.map((item, parentIndex) => parentIndex === tabIndex ? { ...item, items: item.items.filter((_, childIndex) => childIndex !== itemIndex) } : item))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove item</button>
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => setTechStackTabs((current) => current.map((item, itemIndex) => itemIndex === tabIndex ? { ...item, items: [...item.items, { label: "", imageData: "" }] } : item))} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add stack item</button>
              <button type="button" onClick={() => setTechStackTabs((current) => current.filter((_, itemIndex) => itemIndex !== tabIndex))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove tab</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setTechStackTabs((current) => [...current, { ...defaultTechStackTab }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add tech stack tab</button>
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
