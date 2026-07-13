"use client";

import { useEffect, useState } from "react";
import { Menu, Phone } from "lucide-react";
import Logo from "./Logo";
import MobileNavigation from "./MobileNavigation";
import { navigation, business } from "@/data/business";

/**
 * Sticky site header. Becomes more opaque / compact after scrolling.
 * Desktop shows full nav + phone + quote CTA; mobile shows a phone shortcut
 * and a hamburger that opens MobileNavigation.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-200 ${
        scrolled
          ? "bg-brand-black/95 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-brand-black/90"
          : "bg-brand-black"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-content items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px]">
        <a href="#home" className="shrink-0" aria-label={`${business.name} — home`}>
          <Logo variant="dark" />
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1 lg:gap-2">
            {navigation
              .filter((n) => !n.emphasised)
              .map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-wide text-brand-cream transition-colors hover:text-brand-bright"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
          </ul>
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={business.phoneLink}
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-bold text-white transition-colors hover:text-brand-bright"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {business.phoneDisplay}
          </a>
          <a
            href="#quote"
            className="inline-flex items-center rounded-md bg-brand-orange px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-brand-bright"
          >
            Request a Quote
          </a>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-1 md:hidden">
          <a
            href={business.phoneLink}
            aria-label={`Call AL on ${business.phoneDisplay}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-white hover:bg-white/10"
          >
            <Phone className="h-5 w-5" aria-hidden />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-white hover:bg-white/10"
          >
            <Menu className="h-6 w-6" aria-hidden />
          </button>
        </div>
      </div>

      <MobileNavigation open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
