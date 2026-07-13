import Image from "next/image";
import { Phone, Mail, MapPin, Facebook, Globe, Hash, Check } from "lucide-react";
import SectionHeading from "./SectionHeading";
import QuoteForm from "./QuoteForm";
import { business, credentials } from "@/data/business";

const contactItems = [
  {
    icon: Phone,
    label: "Phone",
    value: business.phoneDisplay,
    href: business.phoneLink,
  },
  {
    icon: Mail,
    label: "Email",
    value: business.email,
    href: business.emailLink,
  },
  {
    icon: MapPin,
    label: "Postal",
    value: business.postalAddress.full,
  },
  {
    icon: Facebook,
    label: "Facebook",
    value: "facebook.com/AlMowsBlocks",
    href: business.facebook,
    external: true,
  },
  {
    icon: Globe,
    label: "Website",
    value: business.websiteDisplay,
    href: business.website,
    external: true,
  },
  {
    icon: Hash,
    label: "ABN",
    value: business.abn,
  },
];

export default function ContactSection() {
  return (
    <section
      id="quote"
      className="scroll-mt-20 border-t-[6px] border-brand-orange bg-brand-black py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <SectionHeading
          eyebrow="Get in touch"
          title="Request a Quote"
          intro="Send the details below and AL will get back to you. Prefer to talk? Call any time during working hours."
          tone="light"
        />

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          {/* Contact details */}
          <div>
            <div className="flex items-center gap-4">
              <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-brand-charcoal">
                <Image
                  src="/images/al-mows-logo.png"
                  alt={`${business.name} logo`}
                  fill
                  sizes="64px"
                  className="object-contain p-1.5"
                />
              </span>
              <div>
                <p className="font-heading text-2xl font-bold uppercase text-white">
                  {business.name}
                </p>
                <p className="text-sm uppercase tracking-[0.2em] text-brand-sand">
                  {business.serviceDescription}
                </p>
              </div>
            </div>

            <ul className="mt-8 space-y-4">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <span className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-orange/15 text-brand-bright">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-widest text-brand-sand">
                        {item.label}
                      </span>
                      <span className="block text-base font-medium text-brand-cream">
                        {item.value}
                      </span>
                    </span>
                  </span>
                );
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        {...(item.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="group block rounded-lg transition-colors hover:bg-white/5"
                      >
                        {content}
                      </a>
                    ) : (
                      <div>{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <a
              href={business.phoneLink}
              className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-brand-orange px-6 py-3 text-base font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-bright sm:w-auto"
            >
              <Phone className="h-5 w-5" aria-hidden />
              Call AL — {business.phoneDisplay}
            </a>

            {/* Why property owners choose AL — credentials (data-driven) */}
            <div className="mt-8 rounded-xl border border-white/15 bg-white/5 p-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
                Why property owners choose AL
              </h3>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {credentials.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2.5 text-sm font-semibold text-brand-cream"
                  >
                    <Check className="h-4 w-4 shrink-0 text-brand-bright" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quote form */}
          <div>
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}
