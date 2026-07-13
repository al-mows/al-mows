import { ShieldCheck, MapPin, PhoneCall } from "lucide-react";
import { business } from "@/data/business";

const items = [
  { icon: ShieldCheck, label: business.values[0] },
  { icon: PhoneCall, label: business.values[1] },
  { icon: MapPin, label: business.values[2] },
];

/**
 * A thin brand strip reinforcing the three core values directly beneath the
 * hero. Uses the orange/black identity.
 */
export default function TrustStrip() {
  return (
    <section aria-label="Our values" className="bg-brand-orange">
      <div className="mx-auto flex max-w-content flex-col items-stretch divide-y divide-white/20 sm:flex-row sm:divide-x sm:divide-y-0">
        {items.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-1 items-center justify-center gap-3 px-4 py-4 text-white"
          >
            <Icon className="h-5 w-5 shrink-0" aria-hidden />
            <span className="font-heading text-lg font-bold uppercase tracking-wide">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
