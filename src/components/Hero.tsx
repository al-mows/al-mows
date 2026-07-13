import {
  Phone,
  ArrowRight,
  MapPin,
  UserRound,
  Ruler,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";
import BrandImage from "./BrandImage";
import { hero, business } from "@/data/business";

// Icons align to the order of hero.trustSignals in src/data/business.ts.
const trustIcons = [MapPin, ShieldCheck, BadgeCheck, UserRound, Ruler, MapPin];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex flex-1 flex-col justify-center overflow-hidden border-b-[6px] border-brand-orange bg-brand-black"
    >
      {/* Background artwork (Facebook banner). Decorative — the heading text
          below carries the information, so alt is empty. */}
      <div className="absolute inset-0 -z-10">
        <BrandImage
          src="/images/al-mows-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          placeholderLabel="Banner image to be added"
          className="object-cover object-[82%_center]"
        />
        {/* Directional dark gradient: nearly opaque on the left for text
            legibility, clearing on the right so the artwork shows through. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(12,12,12,0.94) 0%, rgba(12,12,12,0.82) 38%, rgba(12,12,12,0.34) 72%, rgba(12,12,12,0.08) 100%)",
          }}
          aria-hidden
        />
        {/* Extra darkening on small screens where text spans full width. */}
        <div className="absolute inset-0 bg-brand-black/45 md:hidden" aria-hidden />
        {/* Bottom vignette for depth. */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-black/70 to-transparent"
          aria-hidden
        />
      </div>

      {/* Left padding steps up on wide screens so the text lines up under the
          "M" in MOWS in the header wordmark. */}
      <div className="w-full px-6 pb-16 pt-28 sm:pt-32 lg:py-24 lg:pl-32 lg:pr-10 xl:pl-[8.5rem] 2xl:pl-40">
        <div className="max-w-3xl lg:max-w-4xl 2xl:max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-bright sm:text-base lg:text-lg">
            {hero.eyebrow}
          </p>

          <h1 className="mt-5 font-heading text-5xl font-bold uppercase leading-[0.9] text-white sm:text-7xl lg:text-8xl 2xl:text-9xl">
            <span className="block">{hero.headingLine1}</span>
            <span className="block text-brand-bright">{hero.headingLine2}</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-brand-cream/90 sm:text-xl lg:text-2xl">
            {hero.supporting}
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#quote"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-md bg-brand-orange px-8 py-4 text-lg font-bold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-brand-bright"
            >
              {hero.primaryCta}
              <ArrowRight className="h-6 w-6" aria-hidden />
            </a>
            <a
              href={business.phoneLink}
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-md border-2 border-white/80 px-8 py-4 text-lg font-bold uppercase tracking-wide text-white transition-colors hover:border-brand-bright hover:text-brand-bright"
            >
              <Phone className="h-6 w-6" aria-hidden />
              {hero.secondaryCta}
            </a>
          </div>

          {/* Trust signals */}
          <ul className="mt-11 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            {hero.trustSignals.map((signal, i) => {
              const Icon = trustIcons[i % trustIcons.length];
              return (
                <li
                  key={signal}
                  className="flex items-center gap-3 text-base font-medium text-brand-cream lg:text-lg"
                >
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-orange/20 text-brand-bright">
                    <Icon className="h-5 w-5" aria-hidden />
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
