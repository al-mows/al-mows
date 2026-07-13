/**
 * ===========================================================================
 * POST /api/quote — Request a Quote submission handler
 * ===========================================================================
 * - Parses multipart form data (text fields + optional photo uploads).
 * - Validates with the shared Zod schema.
 * - Rejects bot submissions via the honeypot field.
 * - Applies a lightweight per-IP rate limit.
 * - Sends the enquiry email via Resend (see lib/email.ts).
 * - Returns structured JSON. Never crashes when Resend is unconfigured — it
 *   returns a controlled error instead.
 * ===========================================================================
 */

import { NextResponse } from "next/server";
import { quoteSchema, validateFile, MAX_FILES, MAX_FILE_BYTES } from "@/lib/validation";
import { sendQuoteEmail, type QuoteAttachment } from "@/lib/email";
import { rateLimit } from "@/lib/rateLimit";
import { business } from "@/data/business";

// Node runtime is required for Buffer + Resend.
export const runtime = "nodejs";

const FAILURE_MESSAGE = `Your request could not be sent. Please call Al on ${business.phoneDisplay}.`;

// Cap the total request body to guard against oversized uploads.
const MAX_TOTAL_BYTES = MAX_FILES * MAX_FILE_BYTES + 512 * 1024;

function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: Request) {
  // --- Rate limit -----------------------------------------------------
  const ip = getClientIp(req);
  const limit = rateLimit(ip);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        success: false,
        message: `Too many requests. Please wait a moment and try again, or call Al on ${business.phoneDisplay}.`,
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  // --- Content-length guard ------------------------------------------
  const contentLength = Number(req.headers.get("content-length") ?? "0");
  if (contentLength && contentLength > MAX_TOTAL_BYTES) {
    return NextResponse.json(
      { success: false, message: "Your request is too large. Please reduce the number or size of photos." },
      { status: 413 },
    );
  }

  // --- Parse form -----------------------------------------------------
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ success: false, message: FAILURE_MESSAGE }, { status: 400 });
  }

  const raw = {
    name: String(form.get("name") ?? ""),
    address: String(form.get("address") ?? ""),
    email: String(form.get("email") ?? ""),
    phone: String(form.get("phone") ?? ""),
    jobAddress: String(form.get("jobAddress") ?? ""),
    message: String(form.get("message") ?? ""),
    propertySize: String(form.get("propertySize") ?? ""),
    timeframe: String(form.get("timeframe") ?? ""),
    notes: String(form.get("notes") ?? ""),
    company: String(form.get("company") ?? ""), // honeypot
  };

  // --- Honeypot: pretend success so bots do not learn the trap --------
  if (raw.company.trim() !== "") {
    return NextResponse.json({ success: true, message: "Your quote request has been sent." });
  }

  // --- Validate text fields ------------------------------------------
  const parsed = quoteSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Please check the form and try again.";
    return NextResponse.json({ success: false, message: first }, { status: 400 });
  }

  // --- Validate + collect file uploads --------------------------------
  const files = form.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > MAX_FILES) {
    return NextResponse.json(
      { success: false, message: `Please attach no more than ${MAX_FILES} photos.` },
      { status: 400 },
    );
  }

  const attachments: QuoteAttachment[] = [];
  for (const file of files) {
    const err = validateFile({ name: file.name, type: file.type, size: file.size });
    if (err) {
      return NextResponse.json({ success: false, message: err }, { status: 400 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    attachments.push({ filename: file.name, content: buffer });
  }

  // --- Send email -----------------------------------------------------
  const result = await sendQuoteEmail(parsed.data, attachments);

  if (!result.ok) {
    // Controlled failure — includes the case where Resend is not configured.
    return NextResponse.json({ success: false, message: FAILURE_MESSAGE }, { status: 502 });
  }

  return NextResponse.json({ success: true, message: "Your quote request has been sent." });
}
