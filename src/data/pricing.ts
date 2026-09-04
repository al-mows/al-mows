/**
 * ===========================================================================
 * AL MOWS BLOCKS — BLOCK SLASHING PRICING GUIDE
 * ===========================================================================
 * To update: change the `price` string on each tier. Use "Can be negotiated"
 * (or similar) for tiers without a fixed figure.
 * ===========================================================================
 */

export type PricingTier = {
  id: string;
  label: string;
  /** Displayed price string, e.g. "From $240*". */
  price: string;
  /** Optional smaller note under the price. */
  note?: string;
  /** Marks a tier that is negotiated rather than a fixed guide figure. */
  negotiated?: boolean;
};

export const pricingHeading = "BLOCK SLASHING PRICING GUIDE";

export const pricingTiers: PricingTier[] = [
  {
    id: "acre-1",
    label: "1 Acre",
    price: "From $260*",
    note: "Minimum charge",
  },
  {
    id: "acre-2",
    label: "2 Acres",
    price: "From $330*",
  },
  {
    id: "acre-3",
    label: "3 Acres",
    price: "From $400*",
  },
  {
    id: "acre-4",
    label: "4 Acres",
    price: "From $480*",
  },
  {
    id: "acre-4-plus",
    label: "More than 4 acres",
    price: "Price can be negotiated",
    negotiated: true,
  },
  {
    id: "daily-rate",
    label: "Daily rate",
    price: "Can be negotiated for larger rural acreage",
    negotiated: true,
  },
];

/**
 * Pricing disclaimer — shown beneath the pricing grid.
 * (Supplied text, with minor grammatical correction only.)
 */
export const pricingDisclaimer =
  "All pricing is a guide only. Final pricing may vary depending on the condition of the land, vegetation growth, terrain, access, obstacles, travel requirements and other site-specific factors. Additional travel expenses may apply in some circumstances.";
