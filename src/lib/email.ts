/**
 * ===========================================================================
 * ENQUIRY EMAIL BUILDING + DELIVERY
 * ===========================================================================
 * Formats the quote enquiry into a safe HTML + plain-text email and sends it
 * via Resend. All customer-supplied values are HTML-escaped before being
 * placed into the HTML body — no raw HTML injection.
 * ===========================================================================
 */

import { Resend } from "resend";
import type { QuoteInput } from "./validation";
import { business } from "@/data/business";

export type QuoteAttachment = {
  filename: string;
  content: Buffer;
};

export type SendQuoteResult =
  | { ok: true }
  | { ok: false; reason: "config" | "delivery" };

/** Escape a string for safe insertion into HTML. */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Convert newlines to <br> after escaping (for the free-text fields). */
function escMultiline(value: string): string {
  return esc(value).replace(/\r?\n/g, "<br>");
}

function fieldOrDash(value?: string): string {
  const v = (value ?? "").trim();
  return v.length ? v : "—";
}

export function buildSubject(data: QuoteInput): string {
  return `New ${business.name} quote request — ${data.name} — ${data.jobAddress}`;
}

export function buildEmailBodies(
  data: QuoteInput,
  submittedAt: string,
  attachmentCount: number,
) {
  const rows: Array<[string, string]> = [
    ["Name", data.name],
    ["Address", data.address],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Job-site address", data.jobAddress],
    ["Approximate property size", fieldOrDash(data.propertySize)],
    ["Preferred timeframe", fieldOrDash(data.timeframe)],
    ["Additional notes", fieldOrDash(data.notes)],
  ];

  const html = `
  <div style="font-family: Arial, Helvetica, sans-serif; color: #171717; max-width: 640px;">
    <h2 style="background:#090909;color:#FF7200;margin:0;padding:16px 20px;font-size:18px;">
      New quote request — ${business.name}
    </h2>
    <table style="width:100%;border-collapse:collapse;margin-top:12px;">
      ${rows
        .map(
          ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;background:#FFF7E8;font-weight:bold;width:200px;vertical-align:top;border-bottom:1px solid #E8C78F;">
            ${esc(label)}
          </td>
          <td style="padding:8px 12px;vertical-align:top;border-bottom:1px solid #E8C78F;">
            ${escMultiline(value)}
          </td>
        </tr>`,
        )
        .join("")}
      <tr>
        <td style="padding:8px 12px;background:#FFF7E8;font-weight:bold;vertical-align:top;border-bottom:1px solid #E8C78F;">
          How can I assist?
        </td>
        <td style="padding:8px 12px;vertical-align:top;border-bottom:1px solid #E8C78F;">
          ${escMultiline(data.message)}
        </td>
      </tr>
      <tr>
        <td style="padding:8px 12px;background:#FFF7E8;font-weight:bold;vertical-align:top;">Photos attached</td>
        <td style="padding:8px 12px;vertical-align:top;">${attachmentCount}</td>
      </tr>
      <tr>
        <td style="padding:8px 12px;background:#FFF7E8;font-weight:bold;vertical-align:top;">Submitted</td>
        <td style="padding:8px 12px;vertical-align:top;">${esc(submittedAt)}</td>
      </tr>
    </table>
    <p style="font-size:12px;color:#6F6456;margin-top:16px;">
      Reply directly to this email to respond to ${esc(data.name)}.
    </p>
  </div>`;

  const text = [
    `New quote request — ${business.name}`,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    `How can I assist?: ${data.message}`,
    `Photos attached: ${attachmentCount}`,
    `Submitted: ${submittedAt}`,
  ].join("\n");

  return { html, text };
}

/**
 * Send the enquiry email. Returns a structured result so the route can decide
 * how to respond. If the Resend configuration is missing, returns
 * `{ ok: false, reason: "config" }` rather than throwing — the site keeps
 * working and the caller returns a controlled error.
 */
export async function sendQuoteEmail(
  data: QuoteInput,
  attachments: QuoteAttachment[],
): Promise<SendQuoteResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.QUOTE_FROM_EMAIL;
  const to = process.env.QUOTE_RECIPIENT_EMAIL || business.email;

  if (!apiKey || !from) {
    return { ok: false, reason: "config" };
  }

  const submittedAt = new Date().toLocaleString("en-AU", {
    timeZone: "Australia/Adelaide",
    dateStyle: "full",
    timeStyle: "short",
  });

  const { html, text } = buildEmailBodies(data, submittedAt, attachments.length);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: buildSubject(data),
      html,
      text,
      attachments: attachments.map((a) => ({
        filename: a.filename,
        content: a.content,
      })),
    });

    if (error) {
      return { ok: false, reason: "delivery" };
    }
    return { ok: true };
  } catch {
    return { ok: false, reason: "delivery" };
  }
}
