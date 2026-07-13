import { Phone, ArrowRight, MapPin, UserRound, Ruler } from "lucide-react";
import BrandImage from "./BrandImage";
import { hero, business } from "@/data/business";

const trustIcons = [MapPin, UserRound, Ruler, MapPin];

export default function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-brand-black">
      {/* Background artwork (Facebook banner / trailer). Decorative — the
          heading text below carries the information, so alt is empty. */}
      <div className="absolute inset-0 -z-10">
        <BrandImage
          src="/images/al-mows-facebook-banner.png"
          alt=""
          fill
          priority
          sizes="100vw"
          placeholderLabel="Banner image to be added"
          className="object-cover object-center opacity-40"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/90 to-brand-black/40"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 h-3 brand-stripes"
          aria-hidden
        />
      </div>

      <div className="mx-auto max-w-content px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:pb-28 lg:pt-40">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-bright sm:text-sm">
            {hero.eyebrow}
          </p>

          <h1 className="mt-4 font-heading text-4xl font-bold uppercase leading-[0.95] text-white sm:text-6xl lg:text-7xl">
            <span className="block">{hero.headingLine1}</span>
            <span className="block text-brand-bright">{hero.headingLine2}</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-cream/90 sm:text-lg">
            {hero.supporting}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#quote"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-brand-orange px-6 py-3 text-base font-bold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-brand-bright"
            >
              {hero.primaryCta}
              <ArrowRight className="h-5 w-5" aria-hidden />
            </a>
            <a
              href={business.phoneLink}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border-2 border-white/80 px-6 py-3 text-base font-bold uppercase tracking-wide text-white transition-colors hover:border-brand-bright hover:text-brand-bright"
            >
              <Phone className="h-5 w-5" aria-hidden />
              {hero.secondaryCta}
            </a>
          </div>

          {/* Trust signals */}
          <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {hero.trustSignals.map((signal, i) => {
              const Icon = trustIcons[i % trustIcons.length];
              return (
                <li
                  key={signal}
                  className="flex items-center gap-2.5 text-sm font-medium text-brand-cream"
                >
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-orange/20 text-brand-bright">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  {signal}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
