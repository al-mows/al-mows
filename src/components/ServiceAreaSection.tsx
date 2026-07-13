import Image from "next/image";
import { MapPin } from "lucide-react";
import SectionHeading from "./SectionHeading";
import SectionBackground from "./SectionBackground";
import { serviceAreas } from "@/data/business";

/** Simplified Australia outline (with Tasmania) for the tagline card. */
function AustraliaMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 56"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinejoin="round"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <path d="M8 27 L10 18 L16 15 L21 17 L24 11 L28 17 L33 15 L36 18 L41 9 L45 18 L53 18 L59 25 L56 32 L49 36 L44 33 L40 38 L34 35 L27 38 L19 34 L12 31 Z" />
      <path d="M40 43 a2.6 2.6 0 1 0 0.1 0 Z" />
    </svg>
  );
}

export default function ServiceAreaSection() {
  return (
    <section
      id="service-areas"
      className="relative isolate flex min-h-svh scroll-mt-24 flex-col justify-center bg-brand-charcoal py-16 sm:py-20 lg:py-24"
    >
      <SectionBackground src="/images/ocean.png" objectPosition="center" />
      <div className="mx-auto w-full max-w-content px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left: heading, location chips, tagline card */}
          <div>
            <SectionHeading
              eyebrow="Where we work"
              title="Service Areas"
              intro={serviceAreas.intro}
              tone="light"
            />

            <ul className="mt-8 flex flex-wrap gap-3">
              {serviceAreas.locations.map((loc) => (
                <li key={loc}>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-brand-black/80 px-4 py-2.5 text-sm font-semibold text-brand-cream shadow-sm backdrop-blur-sm transition-colors hover:border-brand-orange hover:text-white">
                    <MapPin className="h-4 w-4 text-brand-bright" aria-hidden />
                    {loc}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 inline-flex items-center gap-5 rounded-2xl border border-brand-orange/40 bg-brand-black/80 p-6 backdrop-blur-sm">
              <AustraliaMark className="h-14 w-14 shrink-0 text-brand-orange" />
              <p className="font-heading text-lg font-bold uppercase leading-tight tracking-wide sm:text-xl">
                <span className="block text-brand-orange">Local knowledge.</span>
                <span className="block text-brand-orange">Regional focus.</span>
                <span className="block text-white">Reliable service.</span>
              </p>
            </div>
          </div>

          {/* Right: illustrated service-area map */}
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <Image
              src="/images/map-cutout.png"
              alt="Map of the Yorke Peninsula and Copper Coast service area with towns marked"
              width={1024}
              height={1536}
              sizes="(max-width: 1024px) 80vw, 45vw"
              className="h-auto w-full drop-shadow-[0_16px_40px_rgba(0,0,0,0.55)]"
            />
          </div>
        </div>

        {/* Availability note */}
        <p className="mt-10 max-w-3xl rounded-xl border-l-4 border-brand-orange bg-brand-black/75 p-5 text-base leading-relaxed text-brand-cream backdrop-blur-sm">
          {serviceAreas.note}
        </p>
      </div>
    </section>
  );
}
