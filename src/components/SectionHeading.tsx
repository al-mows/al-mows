import type { ReactNode } from "react";

/**
 * Shared section heading with the brand orange accent bar. Keeps heading
 * styling consistent across sections and preserves a logical h2 hierarchy.
 */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
}) {
  const titleColor = tone === "dark" ? "text-brand-black" : "text-white";
  const introColor = tone === "dark" ? "text-brand-brown" : "text-brand-cream";
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";
  // Light headings can sit over a photo background — protect legibility.
  const shadow = tone === "light" ? "text-shadow-photo" : "";

  return (
    <div className={`flex flex-col ${alignment}`}>
      <span
        className={`h-1.5 w-14 rounded-full bg-brand-orange ${
          align === "center" ? "mx-auto" : ""
        }`}
        aria-hidden
      />
      {eyebrow && (
        <p
          className={`mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange ${shadow}`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-2 max-w-3xl font-heading text-3xl font-bold uppercase leading-tight sm:text-4xl lg:text-5xl ${titleColor} ${shadow}`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-4 max-w-2xl text-base leading-relaxed sm:text-lg ${introColor} ${shadow}`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
