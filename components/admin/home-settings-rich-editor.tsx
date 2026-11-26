"use client";

import { useId, useState, type ChangeEvent } from "react";

import { prepareAdminImageUpload } from "@/components/admin/client-image-utils";
import { AdminField, AdminInput, AdminTextarea } from "@/components/admin/admin-ui";
import type {
  HomeActionRecord,
  HomeCaseStudyRecord,
  HomeInsightCardRecord,
  HomeIndustryTabRecord,
  HomeInsightRecord,
  HomeOfferingRecord,
  HomeSettingsRecord,
  HomeSolutionCardRecord,
  HomeTechStackTabRecord,
} from "@/lib/content-types";

function toJson(value: unknown) {
  return JSON.stringify(value);
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

function ActionFields({ label, value, onChange }: { label: string; value: HomeActionRecord; onChange: (value: HomeActionRecord) => void }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2 lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
      <AdminField label={`${label} label`}>
        <AdminInput value={value.label} onChange={(event) => onChange({ ...value, label: event.target.value })} />
      </AdminField>
      <AdminField label={`${label} link`}>
        <AdminInput value={value.href} onChange={(event) => onChange({ ...value, href: event.target.value })} />
      </AdminField>
    </div>
  );
}

function ImageSourceField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
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
        <p className="text-xs leading-6 text-slate-400">Upload an image or paste a public image/logo URL.</p>
      </div>

      <label htmlFor={inputId} className="flex min-h-32 cursor-pointer items-center justify-center rounded-[18px] border border-dashed border-white/12 bg-white/[0.03] px-4 py-4 text-center">
        {value ? <img src={value} alt={label} className="max-h-36 w-full rounded-[14px] object-contain" /> : <span className="text-sm text-slate-300">Choose image</span>}
      </label>

      <input id={inputId} type="file" accept="image/*" className="hidden" onChange={handleChange} />

      <AdminField label="Image URL or stored path">
        <AdminInput value={value} onChange={(event) => onChange(event.target.value)} placeholder="https://example.com/logo.png or /images/logo.png" />
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

type IndustryItem = { title: string; iconUrl?: string };

function IndustryItemEditor({
  item,
  index,
  onUpdate,
  onRemove,
}: {
  item: IndustryItem;
  index: number;
  onUpdate: (item: IndustryItem) => void;
  onRemove: () => void;
}) {
  const inputId = useId();

  async function handleIconUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    try {
      const processed = await prepareAdminImageUpload(file);
      onUpdate({ ...item, iconUrl: processed.dataUrl });
    } catch (error) {
      console.error("Image preparation failed:", error);
    }
  }

  return (
    <div className="rounded-[18px] border border-white/8 bg-[#0f172a]/60 p-3">
      <div className="flex items-start gap-3">
        {/* Icon preview/upload */}
        <label htmlFor={inputId} className="flex-shrink-0 cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-white/10 border border-white/12 flex items-center justify-center overflow-hidden hover:border-sky-300/30 transition">
            {item.iconUrl ? (
              <img src={item.iconUrl} alt={item.title} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs text-slate-400">Icon</span>
            )}
          </div>
          <input id={inputId} type="file" accept="image/*" className="hidden" onChange={handleIconUpload} />
        </label>

        {/* Title input */}
        <div className="flex-1 min-w-0">
          <input
            type="text"
            value={item.title}
            onChange={(e) => onUpdate({ ...item, title: e.target.value })}
            placeholder={`Item ${index + 1} title`}
            className="w-full h-10 rounded-[12px] border border-white/10 bg-white/6 px-3 text-sm text-white outline-none transition focus:border-sky-300/40 placeholder:text-slate-500"
          />
          {item.iconUrl && (
            <button
              type="button"
              onClick={() => onUpdate({ ...item, iconUrl: "" })}
              className="mt-1 text-xs text-slate-400 hover:text-red-300 transition"
            >
              Remove icon
            </button>
          )}
        </div>

        {/* Remove button */}
        <button
          type="button"
          onClick={onRemove}
          className="flex-shrink-0 w-8 h-8 rounded-full border border-red-400/20 bg-red-500/10 flex items-center justify-center text-red-300 hover:bg-red-500/20 transition"
        >
          ×
        </button>
      </div>
    </div>
  );
}

const defaultSolutionCard: HomeSolutionCardRecord = {
  title: "",
  description: "",
  imageData: "",
  alt: "",
};

const defaultOffering: HomeOfferingRecord = {
  title: "",
  description: "",
  imageData: "",
  alt: "",
  width: 100,
  height: 100,
};

const defaultCaseStudy: HomeCaseStudyRecord = {
  title: "",
  description: "",
  imageData: "",
  featuresLeft: [],
  featuresRight: [],
};

const defaultIndustryTab: HomeIndustryTabRecord = {
  id: "",
  label: "",
  items: [],
};

const defaultTechStackTab: HomeTechStackTabRecord = {
  name: "",
  value: "",
  items: [],
};

const defaultInsightCard: HomeInsightCardRecord = {
  title: "",
  author: "",
  imageData: "",
  href: "#",
};

export function HomeSettingsRichEditor({ values }: { values: HomeSettingsRecord }) {
  const [heroImageData, setHeroImageData] = useState(values.heroImageData);
  const [managerImageData, setManagerImageData] = useState(values.whyChooseManagerImage);
  const [heroPrimaryAction, setHeroPrimaryAction] = useState(values.heroPrimaryAction);
  const [heroSecondaryAction, setHeroSecondaryAction] = useState(values.heroSecondaryAction);
  const [customSolutionCards, setCustomSolutionCards] = useState(values.customSolutionCards);
  const [offerings, setOfferings] = useState(values.offerings);
  const [caseStudies, setCaseStudies] = useState(values.caseStudies);
  const [industriesTabs, setIndustriesTabs] = useState(values.industriesTabs);
  const [techStackTabs, setTechStackTabs] = useState(values.techStackTabs);
  const [insightSection, setInsightSection] = useState<HomeInsightRecord>(values.insightSection);
  const [insightCards, setInsightCards] = useState(values.insightCards ?? []);

  return (
    <div className="grid gap-5">
      <input type="hidden" name="heroImageData" value={heroImageData} readOnly />
      <input type="hidden" name="whyChooseManagerImage" value={managerImageData} readOnly />
      <HiddenJsonField name="heroPrimaryAction" value={heroPrimaryAction} />
      <HiddenJsonField name="heroSecondaryAction" value={heroSecondaryAction} />
      <HiddenJsonField name="customSolutionCards" value={customSolutionCards} />
      <HiddenJsonField name="offerings" value={offerings} />
      <HiddenJsonField name="caseStudies" value={caseStudies} />
      <HiddenJsonField name="industriesTabs" value={industriesTabs} />
      <HiddenJsonField name="techStackTabs" value={techStackTabs} />
      <HiddenJsonField name="insightSection" value={insightSection} />
      <HiddenJsonField name="insightCards" value={insightCards} />

      <SectionBlock title="Hero" defaultOpen>
        <AdminField label="Hero title">
          <AdminTextarea name="heroTitle" defaultValue={values.heroTitle} className="min-h-24" />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Hero description">
            <AdminTextarea name="heroDescription" defaultValue={values.heroDescription} className="min-h-24" />
          </AdminField>
        </div>
        <div className="lg:col-span-2">
          <ImageSourceField label="Hero image" value={heroImageData} onChange={setHeroImageData} />
        </div>
        <ActionFields label="Primary action" value={heroPrimaryAction} onChange={setHeroPrimaryAction} />
        <ActionFields label="Secondary action" value={heroSecondaryAction} onChange={setHeroSecondaryAction} />
      </SectionBlock>

      <SectionBlock title="Custom Solutions">
        <AdminField label="Section title">
          <AdminTextarea name="customSolutionsTitle" defaultValue={values.customSolutionsTitle} className="min-h-24" />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Section subtitle">
            <AdminTextarea name="customSolutionsSubtitle" defaultValue={values.customSolutionsSubtitle} className="min-h-24" />
          </AdminField>
        </div>
        {customSolutionCards.map((card, index) => (
          <div key={`solution-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label={`Card ${index + 1} title`}>
                <AdminInput value={card.title} onChange={(event) => setCustomSolutionCards((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, title: event.target.value } : item)))} />
              </AdminField>
              <AdminField label={`Card ${index + 1} alt text`}>
                <AdminInput value={card.alt} onChange={(event) => setCustomSolutionCards((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, alt: event.target.value } : item)))} />
              </AdminField>
              <div className="lg:col-span-2">
                <AdminField label={`Card ${index + 1} description`}>
                  <AdminTextarea value={card.description} onChange={(event) => setCustomSolutionCards((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, description: event.target.value } : item)))} className="min-h-24" />
                </AdminField>
              </div>
              <div className="lg:col-span-2">
                <ImageSourceField label={`Card ${index + 1} image`} value={card.imageData} onChange={(value) => setCustomSolutionCards((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, imageData: value } : item)))} />
              </div>
              <button type="button" onClick={() => setCustomSolutionCards((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">
                Remove card
              </button>
            </div>
          </div>
        ))}
      </SectionBlock>

      <SectionBlock title="Offerings">
        <AdminField label="Section title">
          <AdminTextarea name="offeringsTitle" defaultValue={values.offeringsTitle} className="min-h-24" />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Section subtitle">
            <AdminTextarea name="offeringsSubtitle" defaultValue={values.offeringsSubtitle} className="min-h-24" />
          </AdminField>
        </div>
        {offerings.map((offering, index) => (
          <div key={`offering-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label={`Offering ${index + 1} title`}>
                <AdminInput value={offering.title} onChange={(event) => setOfferings((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, title: event.target.value } : item)))} />
              </AdminField>
              <AdminField label={`Offering ${index + 1} alt text`}>
                <AdminInput value={offering.alt} onChange={(event) => setOfferings((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, alt: event.target.value } : item)))} />
              </AdminField>
              <AdminField label="Width">
                <AdminInput type="number" value={String(offering.width)} onChange={(event) => setOfferings((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, width: Number(event.target.value) || 0 } : item)))} />
              </AdminField>
              <AdminField label="Height">
                <AdminInput type="number" value={String(offering.height)} onChange={(event) => setOfferings((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, height: Number(event.target.value) || 0 } : item)))} />
              </AdminField>
              <div className="lg:col-span-2">
                <AdminField label={`Offering ${index + 1} description`}>
                  <AdminTextarea value={offering.description} onChange={(event) => setOfferings((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, description: event.target.value } : item)))} className="min-h-24" />
                </AdminField>
              </div>
              <div className="lg:col-span-2">
                <ImageSourceField label={`Offering ${index + 1} image/logo`} value={offering.imageData} onChange={(value) => setOfferings((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, imageData: value } : item)))} />
              </div>
              <button type="button" onClick={() => setOfferings((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">
                Remove offering
              </button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setOfferings((current) => [...current, { ...defaultOffering }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">
          Add offering
        </button>
      </SectionBlock>

      <SectionBlock title="Case Studies">
        <AdminField label="Section title">
          <AdminTextarea name="caseStudyTitle" defaultValue={values.caseStudyTitle} className="min-h-24" />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Section subtitle">
            <AdminTextarea name="caseStudySubtitle" defaultValue={values.caseStudySubtitle} className="min-h-24" />
          </AdminField>
        </div>
        {caseStudies.map((caseStudy, index) => (
          <div key={`case-study-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label={`Case study ${index + 1} title`}>
                <AdminInput value={caseStudy.title} onChange={(event) => setCaseStudies((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, title: event.target.value } : item)))} />
              </AdminField>
              <div className="lg:col-span-2">
                <AdminField label={`Case study ${index + 1} description`}>
                  <AdminTextarea value={caseStudy.description} onChange={(event) => setCaseStudies((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, description: event.target.value } : item)))} className="min-h-24" />
                </AdminField>
              </div>
              <AdminField label="Left features" hint="One per line">
                <AdminTextarea value={listToMultiline(caseStudy.featuresLeft)} onChange={(event) => setCaseStudies((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, featuresLeft: multilineToList(event.target.value) } : item)))} className="min-h-24" />
              </AdminField>
              <AdminField label="Right features" hint="One per line">
                <AdminTextarea value={listToMultiline(caseStudy.featuresRight)} onChange={(event) => setCaseStudies((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, featuresRight: multilineToList(event.target.value) } : item)))} className="min-h-24" />
              </AdminField>
              <div className="lg:col-span-2">
                <ImageSourceField label={`Case study ${index + 1} image`} value={caseStudy.imageData} onChange={(value) => setCaseStudies((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, imageData: value } : item)))} />
              </div>
              <button type="button" onClick={() => setCaseStudies((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">
                Remove case study
              </button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setCaseStudies((current) => [...current, { ...defaultCaseStudy }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">
          Add case study
        </button>
      </SectionBlock>

      <SectionBlock title="Industries">
        <AdminField label="Section title">
          <AdminTextarea name="industriesTitle" defaultValue={values.industriesTitle} className="min-h-24" />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Section subtitle">
            <AdminTextarea name="industriesSubtitle" defaultValue={values.industriesSubtitle} className="min-h-24" />
          </AdminField>
        </div>
        {industriesTabs.map((tab, tabIndex) => (
          <div key={`industry-tab-${tabIndex}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
            <div className="grid gap-4">
              <div className="grid gap-4 lg:grid-cols-3">
                <AdminField label={`Tab ${tabIndex + 1} id`}>
                  <AdminInput value={tab.id} onChange={(event) => setIndustriesTabs((current) => current.map((item, itemIndex) => (itemIndex === tabIndex ? { ...item, id: event.target.value } : item)))} />
                </AdminField>
                <AdminField label={`Tab ${tabIndex + 1} label`}>
                  <AdminInput value={tab.label} onChange={(event) => setIndustriesTabs((current) => current.map((item, itemIndex) => (itemIndex === tabIndex ? { ...item, label: event.target.value } : item)))} />
                </AdminField>
                <AdminField label="Tab icon (right side)">
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#389eff]/20 to-[#389eff]/5 border border-[#389eff]/30 flex items-center justify-center overflow-hidden hover:border-[#389eff]/60 transition">
                        {tab.tabIconUrl ? (
                          <img src={tab.tabIconUrl} alt={tab.label} className="w-10 h-10 object-contain" />
                        ) : (
                          <span className="text-xs text-slate-400 text-center px-1">Click to upload</span>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (!file || !file.type.startsWith("image/")) return;

                          void prepareAdminImageUpload(file)
                            .then((processed) =>
                              setIndustriesTabs((current) =>
                                current.map((item, itemIndex) =>
                                  itemIndex === tabIndex ? { ...item, tabIconUrl: processed.dataUrl } : item
                                )
                              )
                            )
                            .catch((error) => {
                              console.error("Image preparation failed:", error);
                            });
                        }}
                      />
                    </label>
                    {tab.tabIconUrl && (
                      <button
                        type="button"
                        onClick={() => setIndustriesTabs((current) => current.map((item, itemIndex) => (itemIndex === tabIndex ? { ...item, tabIconUrl: "" } : item)))}
                        className="text-xs text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </AdminField>
              </div>

              {/* Industry Items with Icon Upload */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-white">Items (click icon circle to upload custom icon)</p>
                <div className="grid gap-2">
                  {tab.items.map((item, itemIndex) => (
                    <IndustryItemEditor
                      key={`${tabIndex}-${itemIndex}`}
                      item={item}
                      index={itemIndex}
                      onUpdate={(updatedItem) =>
                        setIndustriesTabs((current) =>
                          current.map((t, ti) =>
                            ti === tabIndex
                              ? { ...t, items: t.items.map((i, ii) => (ii === itemIndex ? updatedItem : i)) }
                              : t
                          )
                        )
                      }
                      onRemove={() =>
                        setIndustriesTabs((current) =>
                          current.map((t, ti) =>
                            ti === tabIndex ? { ...t, items: t.items.filter((_, ii) => ii !== itemIndex) } : t
                          )
                        )
                      }
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setIndustriesTabs((current) =>
                      current.map((t, ti) =>
                        ti === tabIndex ? { ...t, items: [...t.items, { title: "", iconUrl: "" }] } : t
                      )
                    )
                  }
                  className="w-fit rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-200 transition hover:bg-sky-400/20"
                >
                  Add item
                </button>
              </div>

              <button type="button" onClick={() => setIndustriesTabs((current) => current.filter((_, itemIndex) => itemIndex !== tabIndex))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">
                Remove tab
              </button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setIndustriesTabs((current) => [...current, { ...defaultIndustryTab }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">
          Add industry tab
        </button>
      </SectionBlock>

      <SectionBlock title="Tech Stack">
        <AdminField label="Section title">
          <AdminTextarea name="techStackTitle" defaultValue={values.techStackTitle} className="min-h-24" />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Section description">
            <AdminTextarea name="techStackDescription" defaultValue={values.techStackDescription} className="min-h-24" />
          </AdminField>
        </div>
        {techStackTabs.map((tab, tabIndex) => (
          <div key={`tech-tab-${tabIndex}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label={`Tab ${tabIndex + 1} name`}>
                <AdminInput value={tab.name} onChange={(event) => setTechStackTabs((current) => current.map((item, itemIndex) => (itemIndex === tabIndex ? { ...item, name: event.target.value } : item)))} />
              </AdminField>
              <AdminField label={`Tab ${tabIndex + 1} value`}>
                <AdminInput value={tab.value} onChange={(event) => setTechStackTabs((current) => current.map((item, itemIndex) => (itemIndex === tabIndex ? { ...item, value: event.target.value } : item)))} />
              </AdminField>

              {tab.items.map((stackItem, itemIndex) => (
                <div key={`stack-item-${tabIndex}-${itemIndex}`} className="lg:col-span-2 rounded-[18px] border border-white/10 bg-black/10 p-4">
                  <div className="grid gap-5 lg:grid-cols-2">
                    <AdminField label={`Item ${itemIndex + 1} label`}>
                      <AdminInput value={stackItem.label} onChange={(event) => setTechStackTabs((current) => current.map((item, parentIndex) => parentIndex === tabIndex ? { ...item, items: item.items.map((child, childIndex) => (childIndex === itemIndex ? { ...child, label: event.target.value } : child)) } : item))} />
                    </AdminField>
                    <div className="lg:col-span-2">
                      <ImageSourceField label={`Item ${itemIndex + 1} image/logo`} value={stackItem.imageData} onChange={(value) => setTechStackTabs((current) => current.map((item, parentIndex) => parentIndex === tabIndex ? { ...item, items: item.items.map((child, childIndex) => (childIndex === itemIndex ? { ...child, imageData: value } : child)) } : item))} />
                    </div>
                    <button
                      type="button"
                      onClick={() => setTechStackTabs((current) => current.map((item, parentIndex) => parentIndex === tabIndex ? { ...item, items: item.items.filter((_, childIndex) => childIndex !== itemIndex) } : item))}
                      className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20"
                    >
                      Remove item
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => setTechStackTabs((current) => current.map((item, itemIndex) => (itemIndex === tabIndex ? { ...item, items: [...item.items, { label: "", imageData: "" }] } : item)))}
                className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10"
              >
                Add stack item
              </button>
              <button type="button" onClick={() => setTechStackTabs((current) => current.filter((_, itemIndex) => itemIndex !== tabIndex))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">
                Remove tab
              </button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setTechStackTabs((current) => [...current, { ...defaultTechStackTab }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">
          Add tech stack tab
        </button>
      </SectionBlock>

      <SectionBlock title="Why Choose Us">
        <AdminField label="Quote">
          <AdminTextarea name="whyChooseQuote" defaultValue={values.whyChooseQuote} className="min-h-24" />
        </AdminField>
        <AdminField label="Author">
          <AdminInput name="whyChooseAuthor" defaultValue={values.whyChooseAuthor} />
        </AdminField>
        <AdminField label="Role">
          <AdminInput name="whyChooseRole" defaultValue={values.whyChooseRole} />
        </AdminField>
        <div className="lg:col-span-2">
          <ImageSourceField label="Manager image" value={managerImageData} onChange={setManagerImageData} />
        </div>
      </SectionBlock>

      <SectionBlock title="Latest Insights">
        <AdminField label="Section title">
          <AdminInput value={insightSection.title} onChange={(event) => setInsightSection((current) => ({ ...current, title: event.target.value }))} />
        </AdminField>
        <AdminField label="Button text">
          <AdminInput value={insightSection.buttonText} onChange={(event) => setInsightSection((current) => ({ ...current, buttonText: event.target.value }))} />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Section subtitle">
            <AdminTextarea value={insightSection.subtitle} onChange={(event) => setInsightSection((current) => ({ ...current, subtitle: event.target.value }))} className="min-h-24" />
          </AdminField>
        </div>
        <AdminField label="Button href">
          <AdminInput value={insightSection.buttonHref} onChange={(event) => setInsightSection((current) => ({ ...current, buttonHref: event.target.value }))} />
        </AdminField>
        {insightCards.map((card, index) => (
          <div key={`insight-card-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label={`Card ${index + 1} title`}>
                <AdminInput value={card.title} onChange={(event) => setInsightCards((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, title: event.target.value } : item)))} />
              </AdminField>
              <AdminField label="Author">
                <AdminInput value={card.author} onChange={(event) => setInsightCards((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, author: event.target.value } : item)))} />
              </AdminField>
              <AdminField label="Card link">
                <AdminInput value={card.href} onChange={(event) => setInsightCards((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, href: event.target.value } : item)))} />
              </AdminField>
              <div className="lg:col-span-2">
                <ImageSourceField label={`Card ${index + 1} image`} value={card.imageData} onChange={(value) => setInsightCards((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, imageData: value } : item)))} />
              </div>
              <button type="button" onClick={() => setInsightCards((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">
                Remove card
              </button>
            </div>
          </div>
        ))}
      </SectionBlock>
    </div>
  );
}
