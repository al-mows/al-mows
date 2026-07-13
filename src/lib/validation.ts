/**
 * ===========================================================================
 * QUOTE FORM VALIDATION
 * ===========================================================================
 * Shared constants + Zod schema for the Request a Quote form. Used by both
 * the client (QuoteForm.tsx) and the server route (api/quote/route.ts) so the
 * rules stay in one place.
 * ===========================================================================
 */

import { z } from "zod";

// --- Upload constraints ----------------------------------------------------
export const MAX_FILES = 5;
export const MAX_FILE_BYTES = 8 * 1024 * 1024; // 8 MB per file
export const MAX_FILE_MB = 8;
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
] as const;
export const ACCEPTED_IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp"] as const;
export const ACCEPT_ATTRIBUTE = ".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp";

// --- Field-length limits (server-enforced, also used for UX) --------------
export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 3000;
const NAME_MAX = 120;
const GENERIC_MAX = 200;
const NOTES_MAX = 2000;

/**
 * Zod schema for the text fields of the quote form.
 * The six core fields (name, address, email, phone, jobAddress, message) are
 * required. Everything else is optional.
 *
 * `honeypot` must stay empty — a filled honeypot indicates a bot.
 */
export const quoteSchema = z.object({
  // --- Core required fields ---
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(NAME_MAX, "Name is too long."),
  address: z
    .string()
    .trim()
    .min(3, "Please enter your residential or postal address.")
    .max(GENERIC_MAX, "Address is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .email("Please enter a valid email address.")
    .max(GENERIC_MAX, "Email is too long."),
  phone: z
    .string()
    .trim()
    .min(8, "Please enter a valid phone number.")
    .max(20, "Please enter a valid phone number.")
    .regex(/^[0-9+()\s-]+$/, "Please enter a valid phone number."),
  jobAddress: z
    .string()
    .trim()
    .min(3, "Please enter the address of the job site.")
    .max(GENERIC_MAX, "Job-site address is too long."),
  message: z
    .string()
    .trim()
    .min(MESSAGE_MIN, "Please tell us a little more about the job.")
    .max(MESSAGE_MAX, "Message is too long."),

  // --- Optional fields ---
  propertySize: z.string().trim().max(GENERIC_MAX).optional().or(z.literal("")),
  timeframe: z.string().trim().max(GENERIC_MAX).optional().or(z.literal("")),
  notes: z.string().trim().max(NOTES_MAX).optional().or(z.literal("")),

  // --- Honeypot (must be empty) ---
  company: z.string().max(0).optional().or(z.literal("")),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

/**
 * Validate a single uploaded file. Returns an error string, or null if valid.
 */
export function validateFile(file: {
  name: string;
  type: string;
  size: number;
}): string | null {
  const typeOk = (ACCEPTED_IMAGE_TYPES as readonly string[]).includes(file.type);
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const extOk = (ACCEPTED_IMAGE_EXTENSIONS as readonly string[]).includes(ext);
  if (!typeOk && !extOk) {
    return `"${file.name}" is not an accepted image type. Use JPG, PNG or WEBP.`;
  }
  if (file.size > MAX_FILE_BYTES) {
    return `"${file.name}" is larger than ${MAX_FILE_MB} MB.`;
  }
  return null;
}
