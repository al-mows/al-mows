import Image from "next/image";
import { business } from "@/data/business";

/**
 * Full-width brand band that showcases the trailer signage artwork in full
 * (object-contain, never cropped). Sits as a visual break before the contact
 * section. The business name/tagline remain available as real text elsewhere,
 * so this image is decorative here (empty alt would drop the branding entirely,
 * so a concise descriptive alt is used instead).
 */
export default function BrandBanner() {
  return (
    <section
      aria-label="Al Mows Blocks signage"
      className="border-t-[6px] border-brand-orange bg-brand-black py-10 sm:py-12"
    >
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <div className="relative mx-auto aspect-[2/1] w-full max-w-4xl overflow-hidden rounded-xl">
          <Image
            src="/images/al-mows-trailer-sides.png"
            alt={`${business.name} — ${business.serviceDescription}. Phone ${business.phoneDisplay}. Reliable, Professional, Local.`}
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
