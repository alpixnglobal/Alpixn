"use client";

import { useId, useState, type ChangeEvent } from "react";

import { prepareAdminImageUpload } from "@/components/admin/client-image-utils";
import { AdminField, AdminInput, AdminTextarea } from "@/components/admin/admin-ui";
import type { FooterColumn, OfficeLocation, SharedStatRecord, SiteSettings, SocialMedia } from "@/lib/content-types";

function ImageSourceField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const [preview, setPreview] = useState(value);
  const inputId = useId();

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file || !file.type.startsWith("image/")) {
      return;
    }

    try {
      const processed = await prepareAdminImageUpload(file);
      const nextValue = processed.dataUrl;
      onChange(nextValue);
      setPreview(nextValue);
    } catch (error) {
      console.error("Image preparation failed:", error);
    }
  }

  return (
    <div className="grid gap-3 rounded-[18px] border border-white/10 bg-black/10 p-4 lg:col-span-2">
      <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</label>
      <label htmlFor={inputId} className="flex min-h-24 cursor-pointer items-center justify-center rounded-[10px] border border-dashed border-white/12 bg-white/[0.03] px-4 py-4 text-center">
        {preview ? <img src={preview} alt={label} className="max-h-24 w-full rounded-[10px] object-contain" /> : <span className="text-sm text-slate-300">Choose image</span>}
      </label>
      <input id={inputId} type="file" accept="image/*" className="hidden" onChange={handleChange} />
      <input
        type="text"
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
          setPreview(event.target.value);
        }}
        placeholder="https://example.com/flag.png or /images/india.svg"
        className="h-11 w-full rounded-[16px] border border-white/10 bg-white/6 px-4 text-sm text-slate-100 outline-none"
      />
      <button
        type="button"
        onClick={() => {
          onChange("");
          setPreview("");
        }}
        className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10"
      >
        Clear image
      </button>
    </div>
  );
}

function toJson(value: unknown) {
  return JSON.stringify(value);
}

function HiddenJsonField({ name, value }: { name: string; value: unknown }) {
  return <textarea readOnly hidden name={name} value={toJson(value)} />;
}

const defaultFooterLink = { label: "", href: "", order: 1 };
const defaultFooterColumn: FooterColumn = { title: "", order: 1, links: [{ ...defaultFooterLink }] };
const defaultOffice: OfficeLocation = { name: "", address: "", email: "", flagImage: "", order: 1, isPublished: true };
const defaultSharedStat: SharedStatRecord = { value: "", label: "" };

export function FooterSettingsRichEditor({ settings }: { settings: SiteSettings }) {
  const [footerColumns, setFooterColumns] = useState(settings.footerColumns ?? []);
  const [offices, setOffices] = useState(settings.offices ?? []);
  const [socialMedia, setSocialMedia] = useState<SocialMedia>(settings.socialMedia);
  const [sharedStats, setSharedStats] = useState(settings.sharedStats ?? []);

  return (
    <div className="grid gap-5">
      <HiddenJsonField name="footerColumns" value={footerColumns} />
      <HiddenJsonField name="offices" value={offices} />
      <HiddenJsonField name="socialMedia" value={socialMedia} />
      <HiddenJsonField name="sharedStats" value={sharedStats} />
      <input type="hidden" name="sharedStatsCount" value={String(sharedStats.length)} readOnly />

      <AdminField label="Footer description">
        <AdminTextarea name="footerDescription" defaultValue={settings.footerDescription} />
      </AdminField>
      <AdminField label="Newsletter title">
        <AdminInput name="newsletterTitle" defaultValue={settings.newsletterTitle} />
      </AdminField>
      <div className="lg:col-span-2">
        <AdminField label="Newsletter description">
          <AdminTextarea name="newsletterDescription" defaultValue={settings.newsletterDescription} />
        </AdminField>
      </div>
      <AdminField label="Copyright text">
        <AdminInput name="copyrightText" defaultValue={settings.copyrightText} />
      </AdminField>

      <div className="lg:col-span-2 rounded-[28px] border border-white/10 bg-white/[0.03] p-5 grid gap-5">
        <h3 className="text-lg font-semibold text-white">Social Media</h3>
        <div className="grid gap-5 lg:grid-cols-2">
          <AdminField label="Instagram"><AdminInput value={socialMedia.instagram} onChange={(event) => setSocialMedia((current) => ({ ...current, instagram: event.target.value }))} /></AdminField>
          <AdminField label="LinkedIn"><AdminInput value={socialMedia.linkedin} onChange={(event) => setSocialMedia((current) => ({ ...current, linkedin: event.target.value }))} /></AdminField>
          <AdminField label="Facebook"><AdminInput value={socialMedia.facebook} onChange={(event) => setSocialMedia((current) => ({ ...current, facebook: event.target.value }))} /></AdminField>
          <AdminField label="Twitter / X"><AdminInput value={socialMedia.twitter} onChange={(event) => setSocialMedia((current) => ({ ...current, twitter: event.target.value }))} /></AdminField>
          <AdminField label="YouTube"><AdminInput value={socialMedia.youtube} onChange={(event) => setSocialMedia((current) => ({ ...current, youtube: event.target.value }))} /></AdminField>
        </div>
      </div>

      <div className="lg:col-span-2 rounded-[28px] border border-white/10 bg-white/[0.03] p-5 grid gap-5">
        <h3 className="text-lg font-semibold text-white">Shared Stats</h3>
        <p className="text-sm leading-7 text-slate-400">
          These number cards are used globally on the About page and all Our Expertise pages.
        </p>
        {sharedStats.map((stat, statIndex) => (
          <div key={`shared-stat-${statIndex}`} className="rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4 grid gap-5 lg:grid-cols-2">
            <AdminField label={`Stat ${statIndex + 1} value`}>
              <AdminInput
                name={`sharedStatValue${statIndex}`}
                value={stat.value}
                onChange={(event) =>
                  setSharedStats((current) =>
                    current.map((item, itemIndex) =>
                      itemIndex === statIndex ? { ...item, value: event.target.value } : item
                    )
                  )
                }
              />
            </AdminField>
            <AdminField label={`Stat ${statIndex + 1} label`}>
              <AdminInput
                name={`sharedStatLabel${statIndex}`}
                value={stat.label}
                onChange={(event) =>
                  setSharedStats((current) =>
                    current.map((item, itemIndex) =>
                      itemIndex === statIndex ? { ...item, label: event.target.value } : item
                    )
                  )
                }
              />
            </AdminField>
            <button
              type="button"
              onClick={() => setSharedStats((current) => current.filter((_, itemIndex) => itemIndex !== statIndex))}
              className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20"
            >
              Remove stat
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setSharedStats((current) => [...current, { ...defaultSharedStat }])}
          className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10"
        >
          Add shared stat
        </button>
      </div>

      <div className="lg:col-span-2 rounded-[28px] border border-white/10 bg-white/[0.03] p-5 grid gap-5">
        <h3 className="text-lg font-semibold text-white">Footer Columns</h3>
        {footerColumns.map((column, columnIndex) => (
          <div key={`footer-column-${columnIndex}`} className="rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4 grid gap-5">
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label={`Column ${columnIndex + 1} title`}><AdminInput value={column.title} onChange={(event) => setFooterColumns((current) => current.map((item, itemIndex) => itemIndex === columnIndex ? { ...item, title: event.target.value } : item))} /></AdminField>
              <AdminField label="Order"><AdminInput type="number" value={String(column.order)} onChange={(event) => setFooterColumns((current) => current.map((item, itemIndex) => itemIndex === columnIndex ? { ...item, order: Number(event.target.value) || 0 } : item))} /></AdminField>
            </div>

            {column.links.map((link, linkIndex) => (
              <div key={`footer-link-${columnIndex}-${linkIndex}`} className="rounded-[18px] border border-white/10 bg-black/10 p-4 grid gap-5 lg:grid-cols-3">
                <AdminField label={`Link ${linkIndex + 1} label`}><AdminInput value={link.label} onChange={(event) => setFooterColumns((current) => current.map((columnItem, currentColumnIndex) => currentColumnIndex === columnIndex ? { ...columnItem, links: columnItem.links.map((columnLink, currentLinkIndex) => currentLinkIndex === linkIndex ? { ...columnLink, label: event.target.value } : columnLink) } : columnItem))} /></AdminField>
                <AdminField label="Href"><AdminInput value={link.href} onChange={(event) => setFooterColumns((current) => current.map((columnItem, currentColumnIndex) => currentColumnIndex === columnIndex ? { ...columnItem, links: columnItem.links.map((columnLink, currentLinkIndex) => currentLinkIndex === linkIndex ? { ...columnLink, href: event.target.value } : columnLink) } : columnItem))} /></AdminField>
                <AdminField label="Order"><AdminInput type="number" value={String(link.order)} onChange={(event) => setFooterColumns((current) => current.map((columnItem, currentColumnIndex) => currentColumnIndex === columnIndex ? { ...columnItem, links: columnItem.links.map((columnLink, currentLinkIndex) => currentLinkIndex === linkIndex ? { ...columnLink, order: Number(event.target.value) || 0 } : columnLink) } : columnItem))} /></AdminField>
                <button type="button" onClick={() => setFooterColumns((current) => current.map((columnItem, currentColumnIndex) => currentColumnIndex === columnIndex ? { ...columnItem, links: columnItem.links.filter((_, currentLinkIndex) => currentLinkIndex !== linkIndex) } : columnItem))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove link</button>
              </div>
            ))}

            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => setFooterColumns((current) => current.map((item, itemIndex) => itemIndex === columnIndex ? { ...item, links: [...item.links, { ...defaultFooterLink, order: item.links.length + 1 }] } : item))} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add link</button>
              <button type="button" onClick={() => setFooterColumns((current) => current.filter((_, itemIndex) => itemIndex !== columnIndex))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove column</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setFooterColumns((current) => [...current, { ...defaultFooterColumn, order: current.length + 1 }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add footer column</button>
      </div>

      <div className="lg:col-span-2 rounded-[28px] border border-white/10 bg-white/[0.03] p-5 grid gap-5">
        <h3 className="text-lg font-semibold text-white">Office Locations</h3>
        {offices.map((office, officeIndex) => (
          <div key={`office-${officeIndex}`} className="rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4 grid gap-5 lg:grid-cols-2">
            <AdminField label={`Office ${officeIndex + 1} name`}><AdminInput value={office.name} onChange={(event) => setOffices((current) => current.map((item, itemIndex) => itemIndex === officeIndex ? { ...item, name: event.target.value } : item))} /></AdminField>
            <AdminField label="Order"><AdminInput type="number" value={String(office.order)} onChange={(event) => setOffices((current) => current.map((item, itemIndex) => itemIndex === officeIndex ? { ...item, order: Number(event.target.value) || 0 } : item))} /></AdminField>
            <div className="lg:col-span-2"><AdminField label="Address"><AdminTextarea value={office.address} onChange={(event) => setOffices((current) => current.map((item, itemIndex) => itemIndex === officeIndex ? { ...item, address: event.target.value } : item))} className="min-h-24" /></AdminField></div>
            <AdminField label="Email"><AdminInput value={office.email} onChange={(event) => setOffices((current) => current.map((item, itemIndex) => itemIndex === officeIndex ? { ...item, email: event.target.value } : item))} /></AdminField>
            <ImageSourceField label={`Office ${officeIndex + 1} flag`} value={office.flagImage} onChange={(value) => setOffices((current) => current.map((item, itemIndex) => itemIndex === officeIndex ? { ...item, flagImage: value } : item))} />
            <div className="lg:col-span-2 flex flex-wrap gap-3">
              <button type="button" onClick={() => setOffices((current) => current.map((item, itemIndex) => itemIndex === officeIndex ? { ...item, isPublished: !item.isPublished } : item))} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">{office.isPublished ? "Hide office" : "Publish office"}</button>
              <button type="button" onClick={() => setOffices((current) => current.filter((_, itemIndex) => itemIndex !== officeIndex))} className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20">Remove office</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setOffices((current) => [...current, { ...defaultOffice, order: current.length + 1 }])} className="w-fit rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10">Add office</button>
      </div>
    </div>
  );
}
