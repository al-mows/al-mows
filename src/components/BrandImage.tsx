"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/**
 * A wrapper around next/image that degrades gracefully when the underlying
 * file is missing (e.g. a brand asset or gallery photo has not been copied in
 * yet). Instead of a broken image, it shows a labelled placeholder panel.
 */
type BrandImageProps = Omit<ImageProps, "onError"> & {
  placeholderLabel?: string;
};

export default function BrandImage({
  placeholderLabel = "Image to be added",
  alt,
  className,
  fill,
  ...props
}: BrandImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={typeof alt === "string" && alt ? alt : placeholderLabel}
        className={`flex items-center justify-center bg-brand-charcoal/90 ${
          fill ? "absolute inset-0 h-full w-full" : "h-full w-full"
        } ${className ?? ""}`}
      >
        <div className="px-4 text-center">
          <span className="block text-xs font-semibold uppercase tracking-widest text-brand-bright">
            Al Mows Blocks
          </span>
          <span className="mt-1 block text-sm text-brand-sand">
            {placeholderLabel}
          </span>
        </div>
      </div>
    );
  }

  return (
    <Image
      alt={alt}
      fill={fill}
      className={className}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
