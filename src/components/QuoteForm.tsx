"use client";

import { useRef, useState } from "react";
import { Loader2, CheckCircle2, AlertTriangle, Phone, Upload, X } from "lucide-react";
import {
  quoteSchema,
  validateFile,
  MAX_FILES,
  MAX_FILE_MB,
  ACCEPT_ATTRIBUTE,
  MESSAGE_MIN,
} from "@/lib/validation";
import { business } from "@/data/business";

type Status = "idle" | "submitting" | "success" | "error";

const initialValues = {
  name: "",
  address: "",
  email: "",
  phone: "",
  jobAddress: "",
  message: "",
  propertySize: "",
  timeframe: "",
  notes: "",
  company: "", // honeypot
};

type FieldErrors = Partial<Record<keyof typeof initialValues, string>>;

export default function QuoteForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update =
    (field: keyof typeof initialValues) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setValues((v) => ({ ...v, [field]: e.target.value }));
      setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    };

  const handleFiles = (list: FileList | null) => {
    if (!list) return;
    setFileError(null);
    const incoming = Array.from(list);
    const combined = [...files, ...incoming];

    if (combined.length > MAX_FILES) {
      setFileError(`Please attach no more than ${MAX_FILES} photos.`);
      return;
    }
    for (const f of incoming) {
      const err = validateFile({ name: f.name, type: f.type, size: f.size });
      if (err) {
        setFileError(err);
        return;
      }
    }
    setFiles(combined);
  };

  const removeFile = (index: number) => {
    setFiles((f) => f.filter((_, i) => i !== index));
    setFileError(null);
  };

  const validateClient = (): boolean => {
    const result = quoteSchema.safeParse(values);
    if (result.success) {
      setErrors({});
      return true;
    }
    const next: FieldErrors = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof typeof initialValues;
      if (key && !next[key]) next[key] = issue.message;
    }
    setErrors(next);
    return false;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    setServerMessage("");
    if (!validateClient()) {
      setStatus("error");
      setServerMessage("Please check the highlighted fields and try again.");
      return;
    }

    setStatus("submitting");

    try {
      const fd = new FormData();
      Object.entries(values).forEach(([k, v]) => fd.append(k, v));
      files.forEach((f) => fd.append("photos", f));

      const res = await fetch("/api/quote", { method: "POST", body: fd });
      const data = (await res.json().catch(() => null)) as
        | { success: boolean; message?: string }
        | null;

      if (res.ok && data?.success) {
        setStatus("success");
        setServerMessage(data.message ?? "Your quote request has been sent.");
        // Reset only after confirmed success.
        setValues(initialValues);
        setFiles([]);
        setErrors({});
      } else {
        setStatus("error");
        setServerMessage(
          data?.message ??
            `Your request could not be sent. Please call Al on ${business.phoneDisplay}.`,
        );
      }
    } catch {
      setStatus("error");
      setServerMessage(
        `Your request could not be sent. Please call Al on ${business.phoneDisplay}.`,
      );
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border-2 border-brand-orange bg-white p-8 text-center shadow-card"
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-brand-orange" aria-hidden />
        <h3 className="mt-4 font-heading text-2xl font-bold uppercase text-brand-black">
          Request sent
        </h3>
        <p className="mt-2 text-brand-brown">{serverMessage}</p>
        <p className="mt-1 text-sm text-brand-brown">
          Al will be in touch. Need to speak now?
        </p>
        <a
          href={business.phoneLink}
          className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-brand-orange px-6 py-3 font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-bright"
        >
          <Phone className="h-5 w-5" aria-hidden />
          Call Al — {business.phoneDisplay}
        </a>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setServerMessage("");
          }}
          className="mt-4 block w-full text-sm font-semibold text-brand-orange underline underline-offset-2"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-brand-sand/60 bg-white p-6 shadow-card sm:p-8"
    >
      {/* Honeypot — visually hidden, off-screen, not a display:none which some
          bots skip. Real users never see or focus it. */}
      <div aria-hidden className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="company">Company (leave blank)</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={update("company")}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          required
          value={values.name}
          onChange={update("name")}
          error={errors.name}
          autoComplete="name"
        />
        <Field
          id="email"
          label="Email"
          type="email"
          required
          value={values.email}
          onChange={update("email")}
          error={errors.email}
          autoComplete="email"
        />
        <Field
          id="phone"
          label="Phone"
          type="tel"
          required
          value={values.phone}
          onChange={update("phone")}
          error={errors.phone}
          autoComplete="tel"
        />
        <Field
          id="address"
          label="Your residential or postal address"
          required
          value={values.address}
          onChange={update("address")}
          error={errors.address}
          autoComplete="street-address"
        />
        <Field
          id="jobAddress"
          label="Address of job site"
          required
          className="sm:col-span-2"
          value={values.jobAddress}
          onChange={update("jobAddress")}
          error={errors.jobAddress}
        />
        <Field
          id="propertySize"
          label="Approximate property size"
          optional
          placeholder="e.g. 2 acres (if known)"
          value={values.propertySize}
          onChange={update("propertySize")}
          error={errors.propertySize}
        />
        <Field
          id="timeframe"
          label="Preferred timeframe"
          optional
          placeholder="e.g. within a month"
          value={values.timeframe}
          onChange={update("timeframe")}
          error={errors.timeframe}
        />
      </div>

      {/* How can I assist? */}
      <div className="mt-5">
        <label htmlFor="message" className="block text-sm font-semibold text-brand-black">
          How can I assist? <span className="text-brand-orange">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={values.message}
          onChange={update("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : "message-hint"}
          placeholder="Tell Al about the property, the current land condition and what you need done."
          className={inputClass(!!errors.message)}
        />
        {errors.message ? (
          <FieldError id="message-error">{errors.message}</FieldError>
        ) : (
          <p id="message-hint" className="mt-1 text-xs text-brand-brown">
            At least {MESSAGE_MIN} characters.
          </p>
        )}
      </div>

      {/* Photo upload */}
      <div className="mt-5">
        <span className="block text-sm font-semibold text-brand-black">
          Photos <span className="font-normal text-brand-brown">(optional)</span>
        </span>
        <p className="mt-1 text-xs text-brand-brown">
          JPG, PNG or WEBP. Up to {MAX_FILES} files, max {MAX_FILE_MB} MB each.
        </p>
        <div className="mt-2">
          <label
            htmlFor="photos"
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md border-2 border-dashed border-brand-sand bg-brand-cream px-4 py-2.5 text-sm font-semibold text-brand-black transition-colors hover:border-brand-orange"
          >
            <Upload className="h-4 w-4" aria-hidden />
            Add photos
          </label>
          <input
            ref={fileInputRef}
            id="photos"
            name="photos"
            type="file"
            multiple
            accept={ACCEPT_ATTRIBUTE}
            onChange={(e) => {
              handleFiles(e.target.files);
              // Allow re-selecting the same file after removal.
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
            className="sr-only"
          />
        </div>
        {files.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {files.map((f, i) => (
              <li
                key={`${f.name}-${i}`}
                className="inline-flex items-center gap-2 rounded-md bg-brand-cream px-3 py-1.5 text-xs text-brand-black"
              >
                <span className="max-w-[160px] truncate">{f.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  aria-label={`Remove ${f.name}`}
                  className="inline-flex h-5 w-5 items-center justify-center rounded-full text-brand-brown hover:bg-brand-sand/60 hover:text-brand-black"
                >
                  <X className="h-3.5 w-3.5" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        )}
        {fileError && <FieldError id="file-error">{fileError}</FieldError>}
      </div>

      {/* Additional notes */}
      <div className="mt-5">
        <label htmlFor="notes" className="block text-sm font-semibold text-brand-black">
          Additional notes{" "}
          <span className="font-normal text-brand-brown">(optional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          value={values.notes}
          onChange={update("notes")}
          placeholder="Access details, gates, obstacles, anything else Al should know."
          className={inputClass(false)}
        />
      </div>

      {/* Server / submit feedback */}
      {status === "error" && serverMessage && (
        <div
          role="alert"
          className="mt-5 flex items-start gap-2 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>{serverMessage}</span>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md bg-brand-orange px-6 py-3 text-base font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-brand-bright disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            "Send Quote Request"
          )}
        </button>
        <a
          href={business.phoneLink}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border-2 border-brand-black px-6 py-3 text-base font-bold text-brand-black transition-colors hover:border-brand-orange hover:text-brand-orange"
        >
          <Phone className="h-5 w-5" aria-hidden />
          Or call {business.phoneDisplay}
        </a>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-brand-brown">
        Your details will only be used to assess and respond to your enquiry. Do
        not submit sensitive personal information through this form.
      </p>
    </form>
  );
}

/* ------------------------------- helpers -------------------------------- */

function inputClass(hasError: boolean) {
  return `mt-1.5 block w-full rounded-md border bg-white px-3.5 py-2.5 text-brand-black placeholder:text-brand-brown/60 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/40 ${
    hasError ? "border-red-400" : "border-brand-sand"
  }`;
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  required = false,
  optional = false,
  placeholder,
  autoComplete,
  className = "",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-semibold text-brand-black">
        {label}{" "}
        {required && <span className="text-brand-orange">*</span>}
        {optional && <span className="font-normal text-brand-brown">(optional)</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClass(!!error)}
      />
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1 text-xs font-medium text-red-600">
      {children}
    </p>
  );
}
