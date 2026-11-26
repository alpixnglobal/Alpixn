import sharp from "sharp";

import { MAX_IMAGE_BYTES, MAX_IMAGE_HEIGHT, MAX_IMAGE_WIDTH } from "@/lib/shared-image-constants";

const DATA_URL_PATTERN = /^data:image\/[a-zA-Z0-9.+-]+;base64,/;
const REMOTE_URL_PATTERN = /^https?:\/\//i;

export async function normalizeBase64Image(rawValue: string) {
  const value = rawValue.trim();

  if (!value) {
    return "";
  }

  // Pass through remote URLs and local paths
  if (value.startsWith("/") || REMOTE_URL_PATTERN.test(value)) {
    return value;
  }

  // Process base64 data URLs
  if (DATA_URL_PATTERN.test(value)) {
    return compressBase64Image(value);
  }

  return "";
}

async function compressBase64Image(dataUrl: string): Promise<string> {
  try {
    // Extract the base64 data and mime type
    const matches = dataUrl.match(/^data:image\/([a-zA-Z0-9.+-]+);base64,(.+)$/);
    if (!matches) {
      return dataUrl;
    }

    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, "base64");

    // Check if compression is needed (only if > MAX_FILE_SIZE)
    if (buffer.length <= MAX_IMAGE_BYTES) {
      return dataUrl;
    }

    // Get image metadata
    const metadata = await sharp(buffer).metadata();
    const width = metadata.width || MAX_IMAGE_WIDTH;
    const height = metadata.height || MAX_IMAGE_HEIGHT;

    // Calculate resize dimensions while maintaining aspect ratio
    let targetWidth = width;
    let targetHeight = height;

    if (width > MAX_IMAGE_WIDTH || height > MAX_IMAGE_HEIGHT) {
      const ratio = Math.min(MAX_IMAGE_WIDTH / width, MAX_IMAGE_HEIGHT / height);
      targetWidth = Math.round(width * ratio);
      targetHeight = Math.round(height * ratio);
    }

    // Start with high quality and reduce until under MAX_FILE_SIZE
    let quality = 85;
    let compressedBuffer: Buffer;
    let format: "jpeg" | "webp" | "png" = "jpeg";

    // Try WebP first for best compression
    compressedBuffer = await sharp(buffer)
      .resize(targetWidth, targetHeight, { fit: "inside", withoutEnlargement: true })
      .webp({ quality })
      .toBuffer();
    format = "webp";

    // Reduce quality iteratively if still too large
    while (compressedBuffer.length > MAX_IMAGE_BYTES && quality > 20) {
      quality -= 10;
      compressedBuffer = await sharp(buffer)
        .resize(targetWidth, targetHeight, { fit: "inside", withoutEnlargement: true })
        .webp({ quality })
        .toBuffer();
    }

    // If still too large, reduce dimensions
    if (compressedBuffer.length > MAX_IMAGE_BYTES) {
      targetWidth = Math.round(targetWidth * 0.7);
      targetHeight = Math.round(targetHeight * 0.7);
      quality = 70;

      compressedBuffer = await sharp(buffer)
        .resize(targetWidth, targetHeight, { fit: "inside", withoutEnlargement: true })
        .webp({ quality })
        .toBuffer();
    }

    const compressedBase64 = compressedBuffer.toString("base64");
    return `data:image/${format};base64,${compressedBase64}`;
  } catch (error) {
    console.error("Image compression failed:", error);
    // Return original if compression fails
    return dataUrl;
  }
}
