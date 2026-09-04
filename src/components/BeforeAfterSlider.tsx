"use client";

import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MoveHorizontal } from "lucide-react";
import BrandImage from "./BrandImage";

/**
 * Before/After comparison slider. Supports one or more before/after photo
 * pairs for the same project (e.g. different angles of the same block) —
 * arrows step through pairs together, keeping "before" and "after" matched
 * by position in each list.
 * - Mouse + touch: drag the handle (pointer events).
 * - Keyboard: the handle is a slider role with a range input; Left/Right/Home/
 *   End move it. Focus is visible. Pair arrows are plain buttons.
 * - No layout shift: the container holds a fixed aspect ratio; images fill it.
 * - Missing images degrade to labelled placeholder panels (BrandImage).
 */
export default function BeforeAfterSlider({
  beforeImages,
  afterImages,
  title,
}: {
  beforeImages: string[];
  afterImages: string[];
  title: string;
}) {
  const [position, setPosition] = useState(50);
  const [pairIndex, setPairIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const pairCount = Math.max(beforeImages.length, afterImages.length, 1);
  const beforeImage =
    beforeImages[Math.min(pairIndex, beforeImages.length - 1)] ?? "";
  const afterImage =
    afterImages[Math.min(pairIndex, afterImages.length - 1)] ?? "";

  const goToPair = (next: number) => {
    setPairIndex(((next % pairCount) + pairCount) % pairCount);
    setPosition(50);
  };

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] w-full touch-none select-none overflow-hidden rounded-lg bg-brand-charcoal"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {/* After image (base layer) */}
        <div className="absolute inset-0">
          <BrandImage
            src={afterImage}
            alt={`${title} — after slashing`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            placeholderLabel="After photo to be added"
            className="object-cover"
          />
        </div>

        {/* Before image (clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <BrandImage
            src={beforeImage}
            alt={`${title} — before slashing`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            placeholderLabel="Before photo to be added"
            className="object-cover"
          />
        </div>

        {/* Labels */}
        <span className="pointer-events-none absolute left-3 top-3 rounded bg-brand-black/80 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-brand-bright">
          Before
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded bg-brand-orange px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
          After
        </span>

        {/* Divider + handle */}
        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white"
          style={{ left: `${position}%` }}
        >
          <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-brand-orange shadow-lg">
            <MoveHorizontal className="h-5 w-5 text-white" aria-hidden />
          </span>
        </div>

        {/* Accessible range input overlay for keyboard control */}
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(position)}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label={`${title}: reveal before or after image`}
          className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>

      {/* Pair navigation — only shown when a project has more than one
          before/after photo pair. */}
      {pairCount > 1 && (
        <div className="mt-2 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => goToPair(pairIndex - 1)}
            aria-label={`${title}: show previous photo pair`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-sand/60 text-brand-brown transition-colors hover:border-brand-orange hover:text-brand-orange"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
          </button>
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-brown">
            Photo {pairIndex + 1} of {pairCount}
          </span>
          <button
            type="button"
            onClick={() => goToPair(pairIndex + 1)}
            aria-label={`${title}: show next photo pair`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-sand/60 text-brand-brown transition-colors hover:border-brand-orange hover:text-brand-orange"
          >
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}
