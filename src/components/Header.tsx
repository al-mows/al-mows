"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
      <div className="flex h-20 w-full items-center justify-between gap-4 px-4 sm:px-6 lg:h-24 lg:px-8 2xl:px-10">
        {/* Logo — far left */}
        <a href="#home" className="shrink-0" aria-label={`${business.name} — home`}>
          <Logo variant="dark" size="lg" />
        </a>

        {/* Right cluster: nav, phone, Request a Quote, then the TAJJPI credit.
            justify-between pushes this to the right, leaving a wide gap after
            the logo. */}
        <div className="hidden items-center xl:flex">
          {/* Desktop navigation */}
          <nav aria-label="Primary">
            <ul className="flex items-center gap-5 2xl:gap-8">
              {navigation
                .filter((n) => !n.emphasised)
                .map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="whitespace-nowrap rounded-md py-2 text-sm font-semibold uppercase tracking-wide text-brand-cream transition-colors hover:text-brand-bright 2xl:text-base"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
            </ul>
          </nav>

          {/* Phone + Request a Quote — extra space before them */}
          <div className="ml-7 flex items-center gap-4 2xl:ml-12">
            <a
              href={business.phoneLink}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-md py-2 text-base font-bold text-white transition-colors hover:text-brand-bright 2xl:text-lg"
            >
              <Phone className="h-5 w-5" aria-hidden />
              {business.phoneDisplay}
            </a>
            <a
              href="#quote"
              className="inline-flex items-center whitespace-nowrap rounded-md bg-brand-orange px-5 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-brand-bright"
            >
              Request a Quote
            </a>
          </div>

          {/* TAJJPI credit — only a small gap after the quote button */}
          <a
            href="https://www.tajjpi.com.au"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Website by TAJJPI — visit tajjpi.com.au"
            className="ml-3 flex shrink-0 flex-col items-center gap-1 2xl:ml-4"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-sand">
              Website by
            </span>
            <span className="relative block h-14 w-14 overflow-hidden rounded-md ring-1 ring-white/15 transition-transform hover:scale-105">
              <Image
                src="/images/TAJJPI.png"
                alt="TAJJPI"
                fill
                sizes="56px"
                className="object-contain"
              />
            </span>
          </a>
        </div>

        {/* Compact actions (below xl) */}
        <div className="flex items-center gap-1 xl:hidden">
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
