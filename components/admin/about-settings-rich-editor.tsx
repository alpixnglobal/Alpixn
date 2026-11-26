"use client";

import { useId, useState, type ChangeEvent } from "react";

import { prepareAdminImageUpload } from "@/components/admin/client-image-utils";
import { AdminField, AdminInput, AdminTextarea } from "@/components/admin/admin-ui";
import type { AboutSettingsRecord } from "@/lib/content-types";

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
        <p className="text-xs leading-6 text-slate-400">Upload an image or paste a public image URL.</p>
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

const defaultMissionCard = { title: "", description: "", imageData: "" };
const defaultMilestone = { year: "", title: "", description: "" };
const defaultWhyChooseCard = { title: "", description: "" };

export function AboutSettingsRichEditor({ values }: { values: AboutSettingsRecord }) {
  const [heroPrimaryAction, setHeroPrimaryAction] = useState(values.heroPrimaryAction);
  const [heroSecondaryAction, setHeroSecondaryAction] = useState(values.heroSecondaryAction);
  const [whoWeAreImage, setWhoWeAreImage] = useState(values.whoWeAreImage);
  const [missionCards, setMissionCards] = useState(values.missionCards);
  const [milestoneItems, setMilestoneItems] = useState(values.milestoneItems);
  const [whyChooseCards, setWhyChooseCards] = useState(values.whyChooseCards);

  return (
    <div className="grid gap-5">
      <HiddenJsonField name="heroPrimaryAction" value={heroPrimaryAction} />
      <HiddenJsonField name="heroSecondaryAction" value={heroSecondaryAction} />
      <HiddenJsonField name="missionCards" value={missionCards} />
      <HiddenJsonField name="milestoneItems" value={milestoneItems} />
      <HiddenJsonField name="whyChooseCards" value={whyChooseCards} />
      <input type="hidden" name="whoWeAreImage" value={whoWeAreImage} readOnly />

      <SectionBlock title="Hero" defaultOpen>
        <AdminField label="Hero title">
          <AdminTextarea name="heroTitle" defaultValue={values.heroTitle} className="min-h-24" />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Hero description">
            <AdminTextarea name="heroDescription" defaultValue={values.heroDescription} className="min-h-24" />
          </AdminField>
        </div>
        <div className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4 grid gap-5 lg:grid-cols-2">
          <AdminField label="Primary action label">
            <AdminInput value={heroPrimaryAction.label} onChange={(event) => setHeroPrimaryAction((current) => ({ ...current, label: event.target.value }))} />
          </AdminField>
          <AdminField label="Primary action href">
            <AdminInput value={heroPrimaryAction.href} onChange={(event) => setHeroPrimaryAction((current) => ({ ...current, href: event.target.value }))} />
          </AdminField>
          <AdminField label="Secondary action label">
            <AdminInput value={heroSecondaryAction.label} onChange={(event) => setHeroSecondaryAction((current) => ({ ...current, label: event.target.value }))} />
          </AdminField>
          <AdminField label="Secondary action href">
            <AdminInput value={heroSecondaryAction.href} onChange={(event) => setHeroSecondaryAction((current) => ({ ...current, href: event.target.value }))} />
          </AdminField>
        </div>
      </SectionBlock>

      <SectionBlock title="Who We Are">
        <AdminField label="Section title">
          <AdminInput name="whoWeAreTitle" defaultValue={values.whoWeAreTitle} />
        </AdminField>
        <div className="lg:col-span-2">
          <ImageSourceField label="Section image" value={whoWeAreImage} onChange={setWhoWeAreImage} />
        </div>
        <div className="lg:col-span-2">
          <AdminField label="Paragraph one">
            <AdminTextarea name="whoWeAreParagraphOne" defaultValue={values.whoWeAreParagraphOne} className="min-h-28" />
          </AdminField>
        </div>
        <div className="lg:col-span-2">
          <AdminField label="Paragraph two">
            <AdminTextarea name="whoWeAreParagraphTwo" defaultValue={values.whoWeAreParagraphTwo} className="min-h-28" />
          </AdminField>
        </div>
      </SectionBlock>

      <SectionBlock title="Vision">
        <AdminField label="Tag">
          <AdminInput name="visionTag" defaultValue={values.visionTag} />
        </AdminField>
        <AdminField label="Title">
          <AdminTextarea name="visionTitle" defaultValue={values.visionTitle} className="min-h-24" />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Description">
            <AdminTextarea name="visionDescription" defaultValue={values.visionDescription} className="min-h-24" />
          </AdminField>
        </div>
        <div className="lg:col-span-2 rounded-[18px] border border-sky-400/20 bg-sky-400/10 p-4 text-sm leading-7 text-sky-100">
          The number strip in this section is now managed globally from <strong>Admin Settings → Shared Stats</strong>.
          Changes there update both the About page and all Our Expertise pages.
        </div>
      </SectionBlock>

      <SectionBlock title="Mission">
        <AdminField label="Tag">
          <AdminInput name="missionTag" defaultValue={values.missionTag} />
        </AdminField>
        <AdminField label="Title">
          <AdminTextarea name="missionTitle" defaultValue={values.missionTitle} className="min-h-24" />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Description">
            <AdminTextarea name="missionDescription" defaultValue={values.missionDescription} className="min-h-24" />
          </AdminField>
        </div>
        {missionCards.map((card, index) => (
          <div key={`mission-card-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label={`Card ${index + 1} title`}>
                <AdminInput value={card.title} onChange={(event) => setMissionCards((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, title: event.target.value } : item)))} />
              </AdminField>
              <div className="lg:col-span-2">
                <AdminField label={`Card ${index + 1} description`}>
                  <AdminTextarea value={card.description} onChange={(event) => setMissionCards((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, description: event.target.value } : item)))} className="min-h-24" />
                </AdminField>
              </div>
              <div className="lg:col-span-2">
                <ImageSourceField label={`Card ${index + 1} image`} value={card.imageData} onChange={(value) => setMissionCards((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, imageData: value } : item)))} />
              </div>
              <button type="button" onClick={() => setMissionCards((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">
                Remove card
              </button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setMissionCards((current) => [...current, { ...defaultMissionCard }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">
          Add mission card
        </button>
      </SectionBlock>

      <SectionBlock title="Milestones">
        <AdminField label="Tag">
          <AdminInput name="milestoneTag" defaultValue={values.milestoneTag} />
        </AdminField>
        <AdminField label="Title">
          <AdminTextarea name="milestoneTitle" defaultValue={values.milestoneTitle} className="min-h-24" />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Description">
            <AdminTextarea name="milestoneDescription" defaultValue={values.milestoneDescription} className="min-h-24" />
          </AdminField>
        </div>
        {milestoneItems.map((item, index) => (
          <div key={`milestone-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label={`Milestone ${index + 1} year`}>
                <AdminInput value={item.year} onChange={(event) => setMilestoneItems((current) => current.map((milestone, milestoneIndex) => (milestoneIndex === index ? { ...milestone, year: event.target.value } : milestone)))} />
              </AdminField>
              <AdminField label={`Milestone ${index + 1} title`}>
                <AdminInput value={item.title} onChange={(event) => setMilestoneItems((current) => current.map((milestone, milestoneIndex) => (milestoneIndex === index ? { ...milestone, title: event.target.value } : milestone)))} />
              </AdminField>
              <div className="lg:col-span-2">
                <AdminField label={`Milestone ${index + 1} description`}>
                  <AdminTextarea value={item.description} onChange={(event) => setMilestoneItems((current) => current.map((milestone, milestoneIndex) => (milestoneIndex === index ? { ...milestone, description: event.target.value } : milestone)))} className="min-h-24" />
                </AdminField>
              </div>
              <button type="button" onClick={() => setMilestoneItems((current) => current.filter((_, milestoneIndex) => milestoneIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">
                Remove milestone
              </button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setMilestoneItems((current) => [...current, { ...defaultMilestone }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">
          Add milestone
        </button>
      </SectionBlock>

      <SectionBlock title="Why Choose Us">
        <AdminField label="Section title">
          <AdminTextarea name="whyChooseTitle" defaultValue={values.whyChooseTitle} className="min-h-24" />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Section subtitle">
            <AdminTextarea name="whyChooseSubtitle" defaultValue={values.whyChooseSubtitle} className="min-h-24" />
          </AdminField>
        </div>
        {whyChooseCards.map((card, index) => (
          <div key={`why-card-${index}`} className="rounded-[18px] border border-white/10 bg-[#0f172a]/45 p-4 grid gap-5">
            <AdminField label={`Card ${index + 1} title`}>
              <AdminInput value={card.title} onChange={(event) => setWhyChooseCards((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, title: event.target.value } : item)))} />
            </AdminField>
            <AdminField label={`Card ${index + 1} description`}>
              <AdminTextarea value={card.description} onChange={(event) => setWhyChooseCards((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, description: event.target.value } : item)))} className="min-h-24" />
            </AdminField>
          </div>
        ))}
      </SectionBlock>

      <SectionBlock title="Bottom CTA">
        <AdminField label="CTA title">
          <AdminTextarea name="ctaTitle" defaultValue={values.ctaTitle} className="min-h-24" />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="CTA description">
            <AdminTextarea name="ctaDescription" defaultValue={values.ctaDescription} className="min-h-24" />
          </AdminField>
        </div>
        <AdminField label="Button text">
          <AdminInput name="ctaButtonText" defaultValue={values.ctaButtonText} />
        </AdminField>
        <AdminField label="Button href">
          <AdminInput name="ctaButtonHref" defaultValue={values.ctaButtonHref} />
        </AdminField>
      </SectionBlock>
    </div>
  );
}
