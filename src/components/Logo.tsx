import Image from "next/image";
import { business } from "@/data/business";

/**
 * The AL Mows Blocks logo lockup. Uses the supplied logo artwork
 * (public/images/al-mows-logo.png). The business name is always present as
 * real HTML text alongside the mark, so the information is never image-only.
 */
export default function Logo({
  className = "",
  variant = "dark",
  showText = true,
  size = "md",
}: {
  className?: string;
  variant?: "dark" | "light";
  showText?: boolean;
  size?: "md" | "lg";
}) {
  const textColor = variant === "dark" ? "text-white" : "text-brand-black";
  const subColor = variant === "dark" ? "text-brand-sand" : "text-brand-brown";

  const markSize =
    size === "lg"
      ? "h-10 w-10 sm:h-14 sm:w-14"
      : "h-11 w-11 sm:h-12 sm:w-12";
  // "lg" (header) wordmark scales up aggressively — it is the dominant visual
  // in the header, anchored to the top of the header's height (see the
  // h-full + justify-between column below), with the subtitle pinned to the
  // bottom edge.
  const nameSize =
    size === "lg"
      ? "text-base sm:text-2xl lg:text-4xl 2xl:text-5xl"
      : "text-lg sm:text-xl";
  const subSize =
    size === "lg"
      ? "text-[9px] tracking-[0.1em] sm:text-xs sm:tracking-[0.2em] lg:text-sm"
      : "text-[11px] tracking-[0.2em]";

  // Only the header's "lg" wordmark stretches to fill a fixed-height parent
  // (name pinned top, subtitle pinned bottom). The default "md" lockup (used
  // in the footer and contact section) keeps its original compact stack.
  const outerHeight = size === "lg" ? "h-full" : "";
  const textStack =
    size === "lg" ? "flex h-full flex-col justify-between py-1" : "leading-none";
  const subMargin = size === "lg" ? "" : "mt-1";

  return (
    <span className={`flex items-center gap-2 sm:gap-4 ${outerHeight} ${className}`}>
      <span
        className={`relative block shrink-0 overflow-hidden rounded-md bg-brand-black ${markSize}`}
      >
        <Image
          src="/images/al-mows-logo.png"
          alt={`${business.name} logo`}
          fill
          sizes="56px"
          className="object-contain p-1"
          priority
        />
      </span>
      {showText && (
        <span className={textStack}>
          <span
            className={`block font-heading font-bold uppercase leading-none tracking-wide ${textColor} ${nameSize}`}
            style={{ fontWeight: 700 }}
          >
            {business.name}
          </span>
          <span
            className={`block font-medium uppercase leading-none ${subColor} ${subSize} ${subMargin}`}
          >
            {business.serviceDescription}
          </span>
        </span>
      )}
    </span>
  );
}
