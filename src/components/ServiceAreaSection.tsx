import { MapPin } from "lucide-react";
import SectionHeading from "./SectionHeading";
import SectionBackground from "./SectionBackground";
import { serviceAreas } from "@/data/business";

export default function ServiceAreaSection() {
  return (
    <section
      id="service-areas"
      className="relative isolate flex min-h-svh scroll-mt-20 flex-col justify-center bg-brand-charcoal py-16 sm:py-20 lg:py-24"
    >
      <SectionBackground src="/images/ocean.png" objectPosition="center" />
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <SectionHeading
          eyebrow="Where we work"
          title="Service Areas"
          intro={serviceAreas.intro}
          tone="light"
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          {/* Location chips */}
          <ul className="flex flex-wrap gap-3">
            {serviceAreas.locations.map((loc) => (
              <li key={loc}>
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-orange/40 bg-brand-black px-4 py-2.5 text-sm font-semibold text-brand-cream transition-colors hover:border-brand-orange hover:text-white">
                  <MapPin className="h-4 w-4 text-brand-bright" aria-hidden />
                  {loc}
                </span>
              </li>
            ))}
          </ul>

          {/* Lightweight stylised region graphic (no external map service). */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-brand-black p-6">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-orange/10 blur-2xl"
            />
            <svg
              viewBox="0 0 200 200"
              role="img"
              aria-label="Stylised outline of the Yorke Peninsula and Copper Coast region"
              className="mx-auto h-auto w-full max-w-[240px]"
            >
              {/* Simplified, non-literal peninsula silhouette. */}
              <path
                d="M96 14 C70 20 60 44 62 66 C64 92 48 104 46 128 C44 150 58 172 78 184 C86 189 92 176 90 162 C88 142 104 132 108 112 C112 92 128 84 130 62 C132 40 120 20 96 14 Z"
                fill="#171717"
                stroke="#E85A00"
                strokeWidth="3"
              />
              {/* Location dots */}
              {[
                [92, 52],
                [78, 84],
                [70, 120],
                [82, 156],
                [112, 74],
              ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="4.5" fill="#FF7200" />
              ))}
            </svg>
            <p className="mt-4 text-center text-xs uppercase tracking-[0.2em] text-brand-sand">
              Copper Coast • Yorke Peninsula
            </p>
          </div>
        </div>

        <p className="mt-10 max-w-3xl rounded-xl border-l-4 border-brand-orange bg-brand-black/75 p-5 text-base leading-relaxed text-brand-cream backdrop-blur-sm">
          {serviceAreas.note}
        </p>
      </div>
    </section>
  );
}
