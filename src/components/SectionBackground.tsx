import Image from "next/image";

/**
 * Decorative full-bleed background photo for a section, with a dark overlay so
 * foreground text and cards stay readable. Purely decorative (empty alt).
 *
 * If the image file is missing, the section's own dark background colour shows
 * through — no broken image, no layout shift. Drop the real photo at `src`
 * (under /public) and it appears automatically.
 */
export default function SectionBackground({
  src,
  objectPosition = "center",
  overlay = "linear-gradient(rgba(9,9,9,0.82), rgba(9,9,9,0.86))",
}: {
  src: string;
  objectPosition?: string;
  overlay?: string;
}) {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition }}
      />
      <div className="absolute inset-0" style={{ background: overlay }} />
    </div>
  );
}
