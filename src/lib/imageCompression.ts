/**
 * ===========================================================================
 * CLIENT-SIDE PHOTO COMPRESSION
 * ===========================================================================
 * Phone camera photos routinely run 3-8 MB each. Vercel Serverless Functions
 * enforce a hard request-body size limit that this app's own upload limits
 * did not respect, so real multi-photo submissions were silently rejected by
 * the platform before our code ever ran (the user just saw "could not be
 * sent"). Resizing and re-compressing photos in the browser before upload
 * keeps the whole request comfortably under that ceiling without forcing
 * people to hunt for smaller photos themselves.
 * ===========================================================================
 */

const MAX_DIMENSION = 1600; // long-edge px — plenty for a quote-assessment photo
const JPEG_QUALITY = 0.8;

/**
 * Resize + re-encode an image file as JPEG. Falls back to the original file
 * untouched if compression fails or would not help (e.g. the browser can't
 * decode it, or it's already small).
 */
export async function compressImageFile(file: File): Promise<File> {
  // Skip tiny files — not worth the round-trip, and avoids upscaling.
  if (file.size <= 400 * 1024) return file;

  try {
    const bitmap = await loadBitmap(file);
    const { width, height } = scaledSize(bitmap.width, bitmap.height);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, width, height);
    if ("close" in bitmap) bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY),
    );
    if (!blob || blob.size >= file.size) return file;

    const newName = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], newName, { type: "image/jpeg" });
  } catch {
    // Any decode/draw failure — ship the original rather than block the user.
    return file;
  }
}

function scaledSize(width: number, height: number) {
  const longEdge = Math.max(width, height);
  if (longEdge <= MAX_DIMENSION) return { width, height };
  const scale = MAX_DIMENSION / longEdge;
  return { width: Math.round(width * scale), height: Math.round(height * scale) };
}

async function loadBitmap(file: File): Promise<ImageBitmap | HTMLImageElement> {
  if (typeof createImageBitmap === "function") {
    return createImageBitmap(file);
  }
  // Older Safari fallback.
  const url = URL.createObjectURL(file);
  try {
    return await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}
