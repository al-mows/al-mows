"use client";

import { useEffect, useRef } from "react";
import { X, Phone } from "lucide-react";
import { navigation, business } from "@/data/business";

/**
 * Accessible slide-in mobile menu. Closes on: link click, Escape, or clicking
 * the backdrop. Focus is trapped-lite by moving focus to the close button on
 * open. Does not cover content when closed (it is unmounted from flow).
 */
export default function MobileNavigation({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 md:hidden ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-brand-black/70 transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      {/* Panel */}
      <nav
        aria-label="Mobile"
        className={`absolute right-0 top-0 flex h-full w-[82%] max-w-xs flex-col bg-brand-charcoal shadow-2xl transition-transform duration-200 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <span className="font-heading text-lg font-bold uppercase tracking-wide text-brand-bright">
            Menu
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-white hover:bg-white/10"
          >
            <X className="h-6 w-6" aria-hidden />
          </button>
        </div>

        <ul className="flex flex-col gap-1 px-3 py-4">
          {navigation.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={onClose}
                className={`flex min-h-11 items-center rounded-md px-4 py-3 text-lg font-semibold uppercase tracking-wide transition-colors ${
                  item.emphasised
                    ? "bg-brand-orange text-white hover:bg-brand-bright"
                    : "text-brand-cream hover:bg-white/10"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-auto border-t border-white/10 p-5">
          <a
            href={business.phoneLink}
            className="flex min-h-11 items-center justify-center gap-2 rounded-md border-2 border-brand-bright px-4 py-3 text-lg font-bold text-brand-bright hover:bg-brand-bright hover:text-brand-black"
          >
            <Phone className="h-5 w-5" aria-hidden />
            Call Al — {business.phoneDisplay}
          </a>
        </div>
      </nav>
    </div>
  );
}
