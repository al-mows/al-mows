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
}: {
  className?: string;
  variant?: "dark" | "light";
  showText?: boolean;
}) {
  const textColor = variant === "dark" ? "text-white" : "text-brand-black";
  const subColor = variant === "dark" ? "text-brand-sand" : "text-brand-brown";

  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <span className="relative block h-11 w-11 shrink-0 overflow-hidden rounded-md bg-brand-black sm:h-12 sm:w-12">
        <Image
          src="/images/al-mows-logo.png"
          alt={`${business.name} logo`}
          fill
          sizes="48px"
          className="object-contain p-1"
          priority
        />
      </span>
      {showText && (
        <span className="leading-none">
          <span
            className={`block font-heading text-lg font-700 uppercase tracking-wide ${textColor} sm:text-xl`}
            style={{ fontWeight: 700 }}
          >
            {business.name}
          </span>
          <span
            className={`block text-[11px] font-medium uppercase tracking-[0.2em] ${subColor}`}
          >
            {business.serviceDescription}
          </span>
        </span>
      )}
    </span>
  );
}
