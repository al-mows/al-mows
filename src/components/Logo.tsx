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
  const nameSize =
    size === "lg"
      ? "text-sm sm:text-xl xl:text-2xl 2xl:text-3xl"
      : "text-lg sm:text-xl";
  const subSize =
    size === "lg"
      ? "text-[10px] tracking-[0.1em] sm:text-sm sm:tracking-[0.2em]"
      : "text-[11px] tracking-[0.2em]";

  return (
    <span className={`flex items-center gap-2 sm:gap-4 ${className}`}>
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
        <span className="leading-none">
          <span
            className={`block font-heading font-bold uppercase tracking-wide ${textColor} ${nameSize}`}
            style={{ fontWeight: 700 }}
          >
            {business.name}
          </span>
          <span
            className={`mt-1 block font-medium uppercase ${subColor} ${subSize}`}
          >
            {business.serviceDescription}
          </span>
        </span>
      )}
    </span>
  );
}
