import { Phone, Mail, MapPin, Facebook, Globe } from "lucide-react";
import Logo from "./Logo";
import { business, navigation } from "@/data/business";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-charcoal text-brand-cream">
      <div className="h-2 brand-stripes" aria-hidden />
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Logo variant="dark" />
            <p className="mt-4 text-sm text-brand-sand">{business.valuesLine}</p>
            <a
              href={business.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-sm font-semibold text-brand-cream transition-colors hover:border-brand-orange hover:text-brand-bright"
            >
              <Facebook className="h-4 w-4" aria-hidden />
              Follow on Facebook
            </a>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={business.phoneLink}
                  className="inline-flex items-center gap-2 text-brand-cream hover:text-brand-bright"
                >
                  <Phone className="h-4 w-4 text-brand-orange" aria-hidden />
                  {business.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={business.emailLink}
                  className="inline-flex items-center gap-2 break-all text-brand-cream hover:text-brand-bright"
                >
                  <Mail className="h-4 w-4 text-brand-orange" aria-hidden />
                  {business.email}
                </a>
              </li>
              <li className="inline-flex items-start gap-2 text-brand-cream">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" aria-hidden />
                {business.postalAddress.full}
              </li>
              <li>
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-cream hover:text-brand-bright"
                >
                  <Globe className="h-4 w-4 text-brand-orange" aria-hidden />
                  {business.websiteDisplay}
                </a>
              </li>
              <li className="text-brand-sand">ABN {business.abn}</li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-white">
              Explore
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-brand-cream transition-colors hover:text-brand-bright"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-brand-sand">
          <p>
            © {year} {business.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
