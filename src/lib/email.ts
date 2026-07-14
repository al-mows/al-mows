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

/**
 * Automated acknowledgement sent back to the person who submitted the form,
 * confirming their enquiry was received.
 */
export function buildAcknowledgementBodies(data: QuoteInput) {
  const firstName = data.name.trim().split(/\s+/)[0] || data.name;

  const html = `
  <div style="font-family: Arial, Helvetica, sans-serif; color:#171717; max-width:600px; margin:0 auto;">
    <div style="background:#0c0c0c; padding:20px 24px; border-bottom:4px solid #E85A00;">
      <span style="color:#ffffff; font-weight:bold; font-size:20px; letter-spacing:1px;">AL MOWS BLOCKS</span><br>
      <span style="color:#E8C78F; font-size:11px; letter-spacing:2px; text-transform:uppercase;">Mowing and Slashing</span>
    </div>
    <div style="padding:24px;">
      <p style="font-size:16px; margin:0 0 14px;">Hi ${esc(firstName)},</p>
      <p style="line-height:1.6; margin:0 0 14px;">
        Thanks for your enquiry — we've received your request and AL will get back to you as soon as possible.
      </p>
      <p style="line-height:1.6; margin:0 0 14px;">
        If it's urgent, you're welcome to call AL directly on
        <a href="tel:0432225363" style="color:#E85A00; font-weight:bold; text-decoration:none;">${esc(business.phoneDisplay)}</a>.
      </p>
      <div style="background:#FFF7E8; border-left:4px solid #E85A00; padding:12px 16px; margin:18px 0;">
        <p style="margin:0; font-size:13px; color:#6F6456;">A copy of your enquiry:</p>
        <p style="margin:8px 0 0; line-height:1.6;">
          <strong>Job site:</strong> ${esc(data.jobAddress)}<br>
          <strong>Details:</strong> ${escMultiline(data.message)}
        </p>
      </div>
      <p style="line-height:1.6; margin:0 0 6px;">Talk soon,<br><strong>AL Mows Blocks</strong></p>
      <p style="font-size:12px; color:#6F6456; margin:16px 0 0;">
        ${esc(business.valuesLine)}<br>
        ${esc(business.phoneDisplay)} &nbsp;•&nbsp; ${esc(business.email)}
      </p>
    </div>
    <div style="background:#0c0c0c; padding:12px 24px;">
      <span style="color:#6F6456; font-size:11px;">This is an automated acknowledgement of your enquiry.</span>
    </div>
  </div>`;

  const text = [
    `Hi ${firstName},`,
    "",
    "Thanks for your enquiry — we've received your request and AL will get back to you as soon as possible.",
    "",
    `If it's urgent, call AL directly on ${business.phoneDisplay}.`,
    "",
    `Job site: ${data.jobAddress}`,
    `Details: ${data.message}`,
    "",
    "Talk soon,",
    "AL Mows Blocks",
    business.valuesLine,
    `${business.phoneDisplay} • ${business.email}`,
    "",
    "This is an automated acknowledgement of your enquiry.",
  ].join("\n");

  return { html, text };
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
    console.error(
      "[quote] Resend not configured — missing:",
      [!apiKey && "RESEND_API_KEY", !from && "QUOTE_FROM_EMAIL"]
        .filter(Boolean)
        .join(", "),
    );
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
      // Resend error metadata only (e.g. "domain not verified") — no PII.
      console.error("[quote] enquiry email rejected by Resend:", error);
      return { ok: false, reason: "delivery" };
    }

    // Best-effort acknowledgement to the enquirer. A failure here (e.g. the
    // sending domain cannot yet mail external addresses) must not fail the
    // enquiry, which has already been delivered to the business.
    try {
      const ack = buildAcknowledgementBodies(data);
      const { error: ackError } = await resend.emails.send({
        from,
        to: data.email,
        replyTo: to,
        subject: `Thanks for your enquiry — ${business.name}`,
        html: ack.html,
        text: ack.text,
      });
      if (ackError) {
        console.error("[quote] acknowledgement email rejected by Resend:", ackError);
      }
    } catch (ackErr) {
      console.error("[quote] acknowledgement email threw:", ackErr);
    }

    return { ok: true };
  } catch (err) {
    console.error("[quote] Resend threw while sending enquiry:", err);
    return { ok: false, reason: "delivery" };
  }
}
