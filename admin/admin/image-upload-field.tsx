"use client";

/* eslint-disable @next/next/no-img-element */

import type { ChangeEvent } from "react";
import { useId, useState } from "react";

import { formatBytes, prepareAdminImageUpload } from "@/components/admin/client-image-utils";

type ImageUploadFieldProps = {
  name: string;
  label: string;
  description: string;
  defaultValue?: string;
};

export function ImageUploadField({
  name,
  label,
  description,
  defaultValue = "",
}: ImageUploadFieldProps) {
  const inputId = useId();
  const [preview, setPreview] = useState(defaultValue);
  const [value, setValue] = useState(defaultValue);
  const [statusText, setStatusText] = useState(
    defaultValue
      ? "Current image loaded. Selecting a new file will replace it."
      : "Upload an image and it will be prepared for save before submit."
  );

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setStatusText("Only image files are supported.");
      return;
    }

    setStatusText("Compressing image for upload...");

    try {
      const processed = await prepareAdminImageUpload(file);

      setValue(processed.dataUrl);
      setPreview(processed.dataUrl);
      setStatusText(
        processed.didCompress
          ? `${file.name} compressed from ${formatBytes(processed.originalBytes)} to ${formatBytes(processed.finalBytes)} before save.`
          : `${file.name} is ready to save at ${formatBytes(processed.finalBytes)}.`
      );
    } catch (error) {
      console.error("Image preparation failed:", error);
      setStatusText("Could not process that image. Try PNG, JPG, or WebP.");
    }
  }

  return (
    <div className="grid gap-4 rounded-[28px] border border-white/10 bg-[#0f172a]/75 p-4">
      <input type="hidden" name={name} value={value} />

      <div className="space-y-1">
        <label htmlFor={inputId} className="text-sm font-semibold text-white">
          {label}
        </label>
        <p className="text-xs leading-6 text-slate-400">{description}</p>
      </div>

      <label
        htmlFor={inputId}
        className="flex min-h-44 cursor-pointer flex-col items-center justify-center gap-3 rounded-[24px] border border-dashed border-white/12 bg-white/[0.03] px-4 py-6 text-center transition hover:border-cyan-300/30 hover:bg-white/[0.05]"
      >
        {preview ? (
          <img src={preview} alt={label} className="max-h-48 w-full rounded-[18px] object-cover" />
        ) : (
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-200">Choose an image</p>
            <p className="text-xs leading-6 text-slate-400">
              Images are compressed before save so larger uploads fit the admin form and database.
            </p>
          </div>
        )}
      </label>

      <input id={inputId} type="file" accept="image/*" className="hidden" onChange={handleChange} />

      <div className="grid gap-2">
        <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Image URL or stored path</label>
        <input
          type="text"
          value={value}
          onChange={(event) => {
            const nextValue = event.target.value;
            setValue(nextValue);
            setPreview(nextValue);
            setStatusText(
              nextValue
                ? "Image source updated. Saving will use this value directly."
                : "Image removed. Saving will clear the stored image."
            );
          }}
          placeholder="https://example.com/image.png or /images/file.png"
          className="h-11 w-full rounded-[16px] border border-white/10 bg-white/6 px-4 text-sm text-slate-100 outline-none transition focus:border-cyan-300/40"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => {
            setValue("");
            setPreview("");
            setStatusText("Image removed. Saving will clear the stored image.");
          }}
          className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10"
        >
          Remove Image
        </button>
        <p className="text-xs leading-6 text-slate-400">{statusText}</p>
      </div>
    </div>
  );
}
