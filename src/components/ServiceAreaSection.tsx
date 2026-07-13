import Image from "next/image";
import { MapPin } from "lucide-react";
import SectionHeading from "./SectionHeading";
import SectionBackground from "./SectionBackground";
import { serviceAreas } from "@/data/business";

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

            <Image
              src="/images/local-knowledge.png"
              alt="Local knowledge. Regional focus. Reliable service."
              width={1774}
              height={887}
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="mt-8 h-auto w-full max-w-md rounded-2xl"
            />
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
