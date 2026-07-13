import {
  Scissors,
  Tractor,
  Sprout,
  LandPlot,
  Home,
  Repeat,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import SectionBackground from "./SectionBackground";
import {
  services,
  servicesHeading,
  servicesQualifier,
  type Service,
} from "@/data/services";
import { businessDescription } from "@/data/business";

const iconMap: Record<Service["icon"], LucideIcon> = {
  scissors: Scissors,
  tractor: Tractor,
  sprout: Sprout,
  land: LandPlot,
  home: Home,
  repeat: Repeat,
};

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative isolate scroll-mt-20 bg-brand-black py-16 sm:py-20 lg:py-24"
    >
      <SectionBackground src="/images/mowing.png" objectPosition="center" />
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <SectionHeading eyebrow="Services" title={servicesHeading} tone="light" />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <article
                key={service.id}
                className="group flex flex-col rounded-xl border border-brand-sand/60 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-brand-orange hover:shadow-card-hover"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-black text-brand-bright transition-colors group-hover:bg-brand-orange group-hover:text-white">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-4 font-heading text-xl font-bold uppercase tracking-wide text-brand-black">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-brown">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>

        <p className="text-shadow-photo mt-8 max-w-3xl text-sm italic leading-relaxed text-brand-cream">
          {servicesQualifier}
        </p>

        {/* HOW AL CAN HELP — owner-editable description (src/data/business.ts) */}
        <div className="mt-14 rounded-2xl bg-brand-black/80 p-8 text-brand-cream ring-1 ring-white/10 backdrop-blur-sm sm:p-10">
          <span className="h-1.5 w-14 rounded-full bg-brand-orange" aria-hidden />
          <h3 className="mt-4 font-heading text-2xl font-bold uppercase tracking-wide text-white sm:text-3xl">
            {businessDescription.heading}
          </h3>
          <div className="mt-4 space-y-4">
            {businessDescription.paragraphs.map((para, i) => (
              <p key={i} className="max-w-3xl text-base leading-relaxed text-brand-cream/90">
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
