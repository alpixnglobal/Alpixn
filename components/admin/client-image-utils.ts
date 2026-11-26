"use client";

import { MAX_IMAGE_BYTES, MAX_IMAGE_HEIGHT, MAX_IMAGE_WIDTH } from "@/lib/shared-image-constants";

const QUALITY_STEPS = [0.86, 0.78, 0.7, 0.62, 0.54, 0.46];
const SCALE_STEPS = [1, 0.92, 0.84, 0.76, 0.68, 0.6, 0.52];
const EXEMPT_IMAGE_TYPES = new Set(["image/svg+xml", "image/gif"]);

export type PreparedAdminImage = {
  dataUrl: string;
  originalBytes: number;
  finalBytes: number;
  didCompress: boolean;
  originalWidth: number;
  originalHeight: number;
  width: number;
  height: number;
  mimeType: string;
};

export async function prepareAdminImageUpload(file: File): Promise<PreparedAdminImage> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are supported.");
  }

  const originalDataUrl = await readFileAsDataUrl(file);
  const image = await loadImage(originalDataUrl);
  const originalWidth = image.naturalWidth || image.width || MAX_IMAGE_WIDTH;
  const originalHeight = image.naturalHeight || image.height || MAX_IMAGE_HEIGHT;

  if (EXEMPT_IMAGE_TYPES.has(file.type)) {
    return {
      dataUrl: originalDataUrl,
      originalBytes: file.size,
      finalBytes: file.size,
      didCompress: false,
      originalWidth,
      originalHeight,
      width: originalWidth,
      height: originalHeight,
      mimeType: file.type || "image/*",
    };
  }

  const boundedDimensions = getBoundedDimensions(originalWidth, originalHeight);

  if (
    file.size <= MAX_IMAGE_BYTES &&
    boundedDimensions.width === originalWidth &&
    boundedDimensions.height === originalHeight
  ) {
    return {
      dataUrl: originalDataUrl,
      originalBytes: file.size,
      finalBytes: file.size,
      didCompress: false,
      originalWidth,
      originalHeight,
      width: originalWidth,
      height: originalHeight,
      mimeType: file.type || "image/*",
    };
  }

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    return {
      dataUrl: originalDataUrl,
      originalBytes: file.size,
      finalBytes: file.size,
      didCompress: false,
      originalWidth,
      originalHeight,
      width: originalWidth,
      height: originalHeight,
      mimeType: file.type || "image/*",
    };
  }

  let bestBlob: Blob | null = null;
  let bestWidth = boundedDimensions.width;
  let bestHeight = boundedDimensions.height;
  let bestMimeType = file.type || "image/*";

  for (const scale of SCALE_STEPS) {
    const targetWidth = Math.max(1, Math.round(boundedDimensions.width * scale));
    const targetHeight = Math.max(1, Math.round(boundedDimensions.height * scale));

    canvas.width = targetWidth;
    canvas.height = targetHeight;
    context.clearRect(0, 0, targetWidth, targetHeight);
    context.drawImage(image, 0, 0, targetWidth, targetHeight);

    for (const quality of QUALITY_STEPS) {
      const blob =
        (await canvasToBlob(canvas, "image/webp", quality)) ??
        (await canvasToBlob(canvas, "image/jpeg", quality));

      if (!blob) {
        continue;
      }

      if (!bestBlob || blob.size < bestBlob.size) {
        bestBlob = blob;
        bestWidth = targetWidth;
        bestHeight = targetHeight;
        bestMimeType = blob.type || "image/webp";
      }

      if (blob.size <= MAX_IMAGE_BYTES) {
        return finalizePreparedImage({
          blob,
          originalBytes: file.size,
          originalWidth,
          originalHeight,
          width: targetWidth,
          height: targetHeight,
        });
      }
    }
  }

  if (!bestBlob) {
    return {
      dataUrl: originalDataUrl,
      originalBytes: file.size,
      finalBytes: file.size,
      didCompress: false,
      originalWidth,
      originalHeight,
      width: originalWidth,
      height: originalHeight,
      mimeType: file.type || "image/*",
    };
  }

  return finalizePreparedImage({
    blob: bestBlob,
    originalBytes: file.size,
    originalWidth,
    originalHeight,
    width: bestWidth,
    height: bestHeight,
    mimeType: bestMimeType,
  });
}

export function formatBytes(bytes: number) {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "0 B";
  }

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const kilobytes = bytes / 1024;
  if (kilobytes < 1024) {
    return `${kilobytes.toFixed(kilobytes >= 100 ? 0 : 1)} KB`;
  }

  const megabytes = kilobytes / 1024;
  return `${megabytes.toFixed(megabytes >= 100 ? 0 : 1)} MB`;
}

async function finalizePreparedImage({
  blob,
  originalBytes,
  originalWidth,
  originalHeight,
  width,
  height,
  mimeType,
}: {
  blob: Blob;
  originalBytes: number;
  originalWidth: number;
  originalHeight: number;
  width: number;
  height: number;
  mimeType?: string;
}): Promise<PreparedAdminImage> {
  const dataUrl = await blobToDataUrl(blob);
  return {
    dataUrl,
    originalBytes,
    finalBytes: blob.size,
    didCompress: blob.size < originalBytes || width !== originalWidth || height !== originalHeight,
    originalWidth,
    originalHeight,
    width,
    height,
    mimeType: mimeType || blob.type || "image/webp",
  };
}

function getBoundedDimensions(width: number, height: number) {
  if (width <= MAX_IMAGE_WIDTH && height <= MAX_IMAGE_HEIGHT) {
    return { width, height };
  }

  const ratio = Math.min(MAX_IMAGE_WIDTH / width, MAX_IMAGE_HEIGHT / height);

  return {
    width: Math.max(1, Math.round(width * ratio)),
    height: Math.max(1, Math.round(height * ratio)),
  };
}

function readFileAsDataUrl(file: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(reader.error ?? new Error("Could not read image file."));
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.readAsDataURL(file);
  });
}

function blobToDataUrl(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(reader.error ?? new Error("Could not read compressed image."));
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.readAsDataURL(blob);
  });
}

function loadImage(dataUrl: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();

    image.onerror = () => reject(new Error("Could not decode image."));
    image.onload = () => resolve(image);
    image.src = dataUrl;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, mimeType: string, quality: number) {
  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob((blob) => resolve(blob), mimeType, quality);
  });
}
