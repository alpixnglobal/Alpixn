"use client";

import { useId, useState, type ChangeEvent } from "react";

import { prepareAdminImageUpload } from "@/components/admin/client-image-utils";
import { AdminCheckbox, AdminField, AdminInput, AdminTextarea } from "@/components/admin/admin-ui";
import type { TechnologyPageRecord } from "@/lib/content-types";

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
      <button type="button" onClick={() => onChange("")} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Clear image</button>
    </div>
  );
}

function listToMultiline(values: string[]) {
  return values.join("\n");
}

function multilineToList(value: string) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

const defaultLogo = { label: "", imageData: "", href: "#" };
const defaultChallenge = { title: "", description: "", imageData: "", linkLabel: "" };
const defaultSimpleCard = { title: "", description: "" };
const defaultCaseStudy = { title: "", description: "", imageData: "", featuresLeft: [] as string[], featuresRight: [] as string[] };
const defaultStackItem = { label: "", imageData: "" };
const defaultStat = { value: "", label: "" };
const defaultEngagementModel = { title: "", description: "", bullets: [] as string[] };
const defaultFaq = { question: "", answer: "" };

export function TechnologyPageRichEditor({ values = {} }: { values?: Partial<TechnologyPageRecord> }) {
  const [heroLogos, setHeroLogos] = useState(values.heroLogos ?? []);
  const [challengeCards, setChallengeCards] = useState(values.challengeCards ?? []);
  const [talkCards, setTalkCards] = useState(values.talkCards ?? []);
  const [successCards, setSuccessCards] = useState(values.successCards ?? []);
  const [provenCaseStudies, setProvenCaseStudies] = useState(values.provenCaseStudies ?? []);
  const [qualityPoints, setQualityPoints] = useState(values.qualityPoints ?? []);
  const [stackItems, setStackItems] = useState(values.stackItems ?? []);
  const [leaderStats, setLeaderStats] = useState(values.leaderStats ?? []);
  const [engagementModels, setEngagementModels] = useState(values.engagementModels ?? []);
  const [faqs, setFaqs] = useState(values.faqs ?? []);

  return (
    <div className="grid gap-5">
      <HiddenJsonField name="heroLogos" value={heroLogos} />
      <HiddenJsonField name="challengeCards" value={challengeCards} />
      <HiddenJsonField name="talkCards" value={talkCards} />
      <HiddenJsonField name="successCards" value={successCards} />
      <HiddenJsonField name="provenCaseStudies" value={provenCaseStudies} />
      <HiddenJsonField name="qualityPoints" value={qualityPoints} />
      <HiddenJsonField name="stackItems" value={stackItems} />
      <HiddenJsonField name="leaderStats" value={leaderStats} />
      <HiddenJsonField name="engagementModels" value={engagementModels} />
      <HiddenJsonField name="faqs" value={faqs} />

      <SectionBlock title="Core Fields" defaultOpen>
        <AdminField label="Slug"><AdminInput name="slug" required defaultValue={values.slug} placeholder="node-js" /></AdminField>
        <AdminField label="Category"><AdminInput name="category" required defaultValue={values.category} placeholder="backend" /></AdminField>
        <AdminField label="Display order"><AdminInput name="order" type="number" min="0" defaultValue={String(values.order ?? 1)} /></AdminField>
        <div className="lg:col-span-2 flex flex-wrap gap-3">
          <AdminCheckbox name="isPublished" label="Published on website" defaultChecked={values.isPublished ?? true} />
          <AdminCheckbox name="isLanding" label="Use as /technologies landing page" defaultChecked={values.isLanding ?? false} />
        </div>
      </SectionBlock>

      <SectionBlock title="Hero Section">
        <AdminField label="Hero subtitle"><AdminInput name="heroSubtitle" defaultValue={values.heroSubtitle} /></AdminField>
        <AdminField label="Hero title"><AdminInput name="heroTitle" defaultValue={values.heroTitle} /></AdminField>
        <div className="lg:col-span-2"><AdminField label="Hero description"><AdminTextarea name="heroDescription" defaultValue={values.heroDescription} className="min-h-24" /></AdminField></div>
        <AdminField label="Primary button label"><AdminInput name="heroPrimaryButtonLabel" defaultValue={values.heroPrimaryButtonLabel} /></AdminField>
        <AdminField label="Primary button link"><AdminInput name="heroPrimaryButtonHref" defaultValue={values.heroPrimaryButtonHref} /></AdminField>
        <AdminField label="Secondary button label"><AdminInput name="heroSecondaryButtonLabel" defaultValue={values.heroSecondaryButtonLabel} /></AdminField>
        <AdminField label="Secondary button link"><AdminInput name="heroSecondaryButtonHref" defaultValue={values.heroSecondaryButtonHref} /></AdminField>
        {heroLogos.map((logo, index) => (
          <div key={`hero-logo-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label={`Logo ${index + 1} label`}><AdminInput value={logo.label} onChange={(event) => setHeroLogos((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, label: event.target.value } : item))} /></AdminField>
              <AdminField label="Link"><AdminInput value={logo.href} onChange={(event) => setHeroLogos((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, href: event.target.value } : item))} /></AdminField>
              <div className="lg:col-span-2"><ImageSourceField label={`Logo ${index + 1} image`} value={logo.imageData} onChange={(value) => setHeroLogos((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, imageData: value } : item))} /></div>
              <button type="button" onClick={() => setHeroLogos((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove logo</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setHeroLogos((current) => [...current, { ...defaultLogo }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add hero logo</button>
      </SectionBlock>

      <SectionBlock title="Challenges Section">
        <div className="lg:col-span-2"><AdminField label="Section title"><AdminTextarea name="challengesTitle" defaultValue={values.challengesTitle} className="min-h-24" /></AdminField></div>
        {challengeCards.map((card, index) => (
          <div key={`challenge-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label={`Card ${index + 1} title`}><AdminInput value={card.title} onChange={(event) => setChallengeCards((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, title: event.target.value } : item))} /></AdminField>
              <AdminField label="Link label"><AdminInput value={card.linkLabel} onChange={(event) => setChallengeCards((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, linkLabel: event.target.value } : item))} /></AdminField>
              <div className="lg:col-span-2"><AdminField label="Description"><AdminTextarea value={card.description} onChange={(event) => setChallengeCards((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item))} className="min-h-24" /></AdminField></div>
              <div className="lg:col-span-2"><ImageSourceField label={`Card ${index + 1} image`} value={card.imageData} onChange={(value) => setChallengeCards((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, imageData: value } : item))} /></div>
              <button type="button" onClick={() => setChallengeCards((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove card</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setChallengeCards((current) => [...current, { ...defaultChallenge }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add challenge card</button>
      </SectionBlock>

      <SectionBlock title="Unlock CTA">
        <div className="lg:col-span-2"><AdminField label="CTA title"><AdminTextarea name="unlockTitle" defaultValue={values.unlockTitle} className="min-h-24" /></AdminField></div>
        <AdminField label="Button label"><AdminInput name="unlockButtonLabel" defaultValue={values.unlockButtonLabel} /></AdminField>
        <AdminField label="Button link"><AdminInput name="unlockButtonHref" defaultValue={values.unlockButtonHref} /></AdminField>
      </SectionBlock>

      <SectionBlock title="Talk To Expert Section">
        <div className="lg:col-span-2"><AdminField label="Section title"><AdminTextarea name="talkTitle" defaultValue={values.talkTitle} className="min-h-24" /></AdminField></div>
        <AdminField label="Button label"><AdminInput name="talkButtonLabel" defaultValue={values.talkButtonLabel} /></AdminField>
        <AdminField label="Button link"><AdminInput name="talkButtonHref" defaultValue={values.talkButtonHref} /></AdminField>
        {talkCards.map((card, index) => (
          <div key={`talk-${index}`} className="rounded-[18px] border border-white/10 bg-[#0f172a]/45 p-4 grid gap-5">
            <AdminField label={`Card ${index + 1} title`}><AdminInput value={card.title} onChange={(event) => setTalkCards((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, title: event.target.value } : item))} /></AdminField>
            <AdminField label={`Card ${index + 1} description`}><AdminTextarea value={card.description} onChange={(event) => setTalkCards((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item))} className="min-h-24" /></AdminField>
            <button type="button" onClick={() => setTalkCards((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove card</button>
          </div>
        ))}
        <button type="button" onClick={() => setTalkCards((current) => [...current, { ...defaultSimpleCard }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add talk card</button>
      </SectionBlock>

      <SectionBlock title="Success Cards Section">
        <div className="lg:col-span-2"><AdminField label="Section title"><AdminTextarea name="successTitle" defaultValue={values.successTitle} className="min-h-24" /></AdminField></div>
        {successCards.map((card, index) => (
          <div key={`success-${index}`} className="rounded-[18px] border border-white/10 bg-[#0f172a]/45 p-4 grid gap-5">
            <AdminField label={`Card ${index + 1} title`}><AdminInput value={card.title} onChange={(event) => setSuccessCards((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, title: event.target.value } : item))} /></AdminField>
            <AdminField label={`Card ${index + 1} description`}><AdminTextarea value={card.description} onChange={(event) => setSuccessCards((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item))} className="min-h-24" /></AdminField>
            <button type="button" onClick={() => setSuccessCards((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove card</button>
          </div>
        ))}
        <button type="button" onClick={() => setSuccessCards((current) => [...current, { ...defaultSimpleCard }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add success card</button>
      </SectionBlock>

      <SectionBlock title="Proven Pioneers Section">
        <AdminField label="Section title"><AdminTextarea name="provenTitle" defaultValue={values.provenTitle} className="min-h-24" /></AdminField>
        <div className="lg:col-span-2"><AdminField label="Section description"><AdminTextarea name="provenDescription" defaultValue={values.provenDescription} className="min-h-28" /></AdminField></div>
        {provenCaseStudies.map((study, index) => (
          <div key={`case-study-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label={`Case study ${index + 1} title`}><AdminInput value={study.title} onChange={(event) => setProvenCaseStudies((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, title: event.target.value } : item))} /></AdminField>
              <div className="lg:col-span-2"><AdminField label="Description"><AdminTextarea value={study.description} onChange={(event) => setProvenCaseStudies((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item))} className="min-h-24" /></AdminField></div>
              <AdminField label="Left bullets" hint="One bullet per line"><AdminTextarea value={listToMultiline(study.featuresLeft)} onChange={(event) => setProvenCaseStudies((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, featuresLeft: multilineToList(event.target.value) } : item))} className="min-h-24" /></AdminField>
              <AdminField label="Right bullets" hint="One bullet per line"><AdminTextarea value={listToMultiline(study.featuresRight)} onChange={(event) => setProvenCaseStudies((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, featuresRight: multilineToList(event.target.value) } : item))} className="min-h-24" /></AdminField>
              <div className="lg:col-span-2"><ImageSourceField label={`Case study ${index + 1} image`} value={study.imageData} onChange={(value) => setProvenCaseStudies((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, imageData: value } : item))} /></div>
              <button type="button" onClick={() => setProvenCaseStudies((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove case study</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setProvenCaseStudies((current) => [...current, { ...defaultCaseStudy }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add case study</button>
      </SectionBlock>

      <SectionBlock title="Expert Guidance CTA">
        <div className="lg:col-span-2"><AdminField label="CTA title"><AdminTextarea name="guidanceTitle" defaultValue={values.guidanceTitle} className="min-h-24" /></AdminField></div>
        <AdminField label="Button label"><AdminInput name="guidanceButtonLabel" defaultValue={values.guidanceButtonLabel} /></AdminField>
        <AdminField label="Button link"><AdminInput name="guidanceButtonHref" defaultValue={values.guidanceButtonHref} /></AdminField>
      </SectionBlock>

      <SectionBlock title="Quality Section">
        <AdminField label="Eyebrow"><AdminInput name="qualityEyebrow" defaultValue={values.qualityEyebrow} /></AdminField>
        <AdminField label="Title"><AdminTextarea name="qualityTitle" defaultValue={values.qualityTitle} className="min-h-24" /></AdminField>
        <div className="lg:col-span-2"><AdminField label="Description"><AdminTextarea name="qualityDescription" defaultValue={values.qualityDescription} className="min-h-28" /></AdminField></div>
        {qualityPoints.map((point, index) => (
          <div key={`quality-point-${index}`} className="rounded-[18px] border border-white/10 bg-[#0f172a]/45 p-4 grid gap-5">
            <AdminField label={`Point ${index + 1} title`}><AdminInput value={point.title} onChange={(event) => setQualityPoints((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, title: event.target.value } : item))} /></AdminField>
            <AdminField label={`Point ${index + 1} description`}><AdminTextarea value={point.description} onChange={(event) => setQualityPoints((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item))} className="min-h-24" /></AdminField>
            <button type="button" onClick={() => setQualityPoints((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove point</button>
          </div>
        ))}
        <button type="button" onClick={() => setQualityPoints((current) => [...current, { ...defaultSimpleCard }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add point</button>
      </SectionBlock>

      <SectionBlock title="Technology Stack Section">
        <div className="lg:col-span-2"><AdminField label="Section title"><AdminTextarea name="stackTitle" defaultValue={values.stackTitle} className="min-h-24" /></AdminField></div>
        {stackItems.map((item, index) => (
          <div key={`stack-item-${index}`} className="rounded-[18px] border border-white/10 bg-[#0f172a]/45 p-4 grid gap-5 lg:grid-cols-2">
            <AdminField label={`Stack item ${index + 1} label`}><AdminInput value={item.label} onChange={(event) => setStackItems((current) => current.map((child, childIndex) => childIndex === index ? { ...child, label: event.target.value } : child))} /></AdminField>
            <div className="lg:col-span-2"><ImageSourceField label={`Stack item ${index + 1} image`} value={item.imageData} onChange={(value) => setStackItems((current) => current.map((child, childIndex) => childIndex === index ? { ...child, imageData: value } : child))} /></div>
            <button type="button" onClick={() => setStackItems((current) => current.filter((_, childIndex) => childIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove stack item</button>
          </div>
        ))}
        <button type="button" onClick={() => setStackItems((current) => [...current, { ...defaultStackItem }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add stack item</button>
      </SectionBlock>

      <SectionBlock title="Industry Leader Stats">
        <div className="lg:col-span-2"><AdminField label="Section title"><AdminTextarea name="leaderTitle" defaultValue={values.leaderTitle} className="min-h-24" /></AdminField></div>
        {leaderStats.map((item, index) => (
          <div key={`leader-stat-${index}`} className="rounded-[18px] border border-white/10 bg-[#0f172a]/45 p-4 grid gap-5">
            <AdminField label={`Stat ${index + 1} value`}><AdminInput value={item.value} onChange={(event) => setLeaderStats((current) => current.map((child, childIndex) => childIndex === index ? { ...child, value: event.target.value } : child))} /></AdminField>
            <AdminField label={`Stat ${index + 1} label`}><AdminInput value={item.label} onChange={(event) => setLeaderStats((current) => current.map((child, childIndex) => childIndex === index ? { ...child, label: event.target.value } : child))} /></AdminField>
            <button type="button" onClick={() => setLeaderStats((current) => current.filter((_, childIndex) => childIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove stat</button>
          </div>
        ))}
        <button type="button" onClick={() => setLeaderStats((current) => [...current, { ...defaultStat }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add stat</button>
      </SectionBlock>

      <SectionBlock title="Engagement Models Section">
        <AdminField label="Section title"><AdminTextarea name="engagementTitle" defaultValue={values.engagementTitle} className="min-h-24" /></AdminField>
        <div className="lg:col-span-2"><AdminField label="Section description"><AdminTextarea name="engagementDescription" defaultValue={values.engagementDescription} className="min-h-28" /></AdminField></div>
        {engagementModels.map((model, index) => (
          <div key={`engagement-model-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label={`Model ${index + 1} title`}><AdminInput value={model.title} onChange={(event) => setEngagementModels((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, title: event.target.value } : item))} /></AdminField>
              <div className="lg:col-span-2"><AdminField label="Description"><AdminTextarea value={model.description} onChange={(event) => setEngagementModels((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item))} className="min-h-24" /></AdminField></div>
              <AdminField label="Bullets" hint="One bullet per line"><AdminTextarea value={listToMultiline(model.bullets)} onChange={(event) => setEngagementModels((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, bullets: multilineToList(event.target.value) } : item))} className="min-h-24" /></AdminField>
              <button type="button" onClick={() => setEngagementModels((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove model</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setEngagementModels((current) => [...current, { ...defaultEngagementModel }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add model</button>
      </SectionBlock>

      <SectionBlock title="FAQ Section">
        <div className="lg:col-span-2"><AdminField label="FAQ title"><AdminTextarea name="faqTitle" defaultValue={values.faqTitle} className="min-h-24" /></AdminField></div>
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
