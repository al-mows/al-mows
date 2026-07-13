import { Check, Handshake } from "lucide-react";
import SectionHeading from "./SectionHeading";
import SectionBackground from "./SectionBackground";
import { pricingHeading, pricingTiers, pricingDisclaimer } from "@/data/pricing";

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative isolate scroll-mt-20 bg-brand-black py-16 sm:py-20 lg:py-24"
    >
      <SectionBackground src="/images/horses.png" objectPosition="center" />
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <SectionHeading
          eyebrow="Pricing guide"
          title={pricingHeading}
          intro="A starting guide for block slashing. Every job is confirmed with a proper quote — see the note below."
          tone="light"
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={`flex flex-col rounded-xl border-2 p-6 shadow-card transition-colors ${
                tier.negotiated
                  ? "border-brand-orange-deep bg-gradient-to-br from-brand-orange to-brand-orange-deep text-white"
                  : "border-brand-sand/70 bg-white"
              }`}
            >
              <div className="flex items-center gap-2">
                {tier.negotiated ? (
                  <Handshake className="h-5 w-5 text-white" aria-hidden />
                ) : (
                  <Check className="h-5 w-5 text-brand-orange" aria-hidden />
                )}
                <h3
                  className={`font-heading text-xl font-bold uppercase tracking-wide ${
                    tier.negotiated ? "text-white" : "text-brand-black"
                  }`}
                >
                  {tier.label}
                </h3>
              </div>
              <p
                className={`mt-4 font-heading text-2xl font-bold ${
                  tier.negotiated ? "text-white" : "text-brand-orange"
                }`}
              >
                {tier.price}
              </p>
              {tier.note && (
                <p
                  className={`mt-1 text-sm ${
                    tier.negotiated ? "text-brand-cream/80" : "text-brand-brown"
                  }`}
                >
                  {tier.note}
                </p>
              )}
            </div>
          ))}
        </div>

        <p className="text-shadow-photo mt-8 max-w-4xl text-sm leading-relaxed text-brand-cream">
          <span className="font-semibold text-brand-bright">*</span> {pricingDisclaimer}
        </p>

        <div className="mt-8">
          <a
            href="#quote"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-brand-orange px-6 py-3 text-base font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-brand-bright"
          >
            Get a Firm Quote
          </a>
        </div>
      </div>
    </section>
  );
}
