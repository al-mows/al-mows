/**
 * ===========================================================================
 * AL MOWS BLOCKS — CENTRAL BUSINESS CONTENT
 * ===========================================================================
 * This is the single source of truth for business details and editable copy.
 * Owner / maintainer: update the values below and the whole site follows.
 * Do NOT hard-code these details inside components.
 * ===========================================================================
 */

export const business = {
  name: "Al Mows Blocks",
  serviceDescription: "Mowing and Slashing",
  owner: "Allan",

  // --- Contact details --------------------------------------------------
  phoneDisplay: "0432 225 363",
  phoneLink: "tel:0432225363",
  email: "al.mows@outlook.com",
  emailLink: "mailto:al.mows@outlook.com",

  postalAddress: {
    line1: "PO Box 599",
    line2: "Kadina SA 5554",
    full: "PO Box 599, Kadina SA 5554",
    poBox: "PO Box 599",
    locality: "Kadina",
    region: "SA",
    postcode: "5554",
    country: "AU",
  },

  facebook: "https://www.facebook.com/AlMowsBlocks",

  website: "https://www.almowsblocks.com.au",
  websiteDisplay: "www.almowsblocks.com.au",

  abn: "91 670 594 606",

  // --- Brand values -----------------------------------------------------
  values: ["Reliable", "Professional", "Local"] as const,
  valuesLine: "Reliable • Professional • Local",

  // --- Primary service region ------------------------------------------
  serviceRegion: "Copper Coast, Yorke Peninsula and surrounds.",
} as const;

/**
 * ---------------------------------------------------------------------------
 * HERO COPY
 * ---------------------------------------------------------------------------
 * Owner: this is the first thing visitors read. Update as needed.
 */
export const hero = {
  eyebrow: "COPPER COAST • YORKE PENINSULA • SURROUNDS",
  headingLine1: "CLEAR THE BLOCK.",
  headingLine2: "TAKE BACK CONTROL.",
  supporting:
    "Local mowing and paddock slashing for residential blocks, rural properties and larger acreage across the Copper Coast and Yorke Peninsula.",
  primaryCta: "REQUEST A QUOTE",
  secondaryCta: "CALL 0432 225 363",
  trustSignals: [
    "Locally owned and operated",
    "Direct contact with the owner",
    "Residential blocks to rural acreage",
    "Servicing the Copper Coast and Yorke Peninsula",
  ],
} as const;

/**
 * ---------------------------------------------------------------------------
 * OWNER-EDITABLE BUSINESS DESCRIPTION ("HOW AL CAN HELP")
 * ---------------------------------------------------------------------------
 * Owner: edit the heading and the two paragraphs below to describe the
 * business in your own words. No component changes are required.
 */
export const businessDescription = {
  heading: "HOW AL CAN HELP",
  paragraphs: [
    "Al Mows Blocks provides practical mowing and slashing services for residential blocks, vacant land, lifestyle properties, paddocks and larger rural acreage. Every property is different, so the work is assessed according to block size, vegetation growth, terrain, access, travel and the equipment required.",
    "Contact Al directly to discuss the property, job location and current land condition. Photos can be supplied with the enquiry to assist with the initial assessment.",
  ],
} as const;

/**
 * ---------------------------------------------------------------------------
 * SERVICE AREAS
 * ---------------------------------------------------------------------------
 * Owner: keep this list accurate. Location claims on the site are limited to
 * exactly these entries. Use full names (e.g. "Port Hughes", "Port Broughton").
 */
export const serviceAreas = {
  intro: "Covering the Yorke Peninsula, Copper Coast and surrounding districts.",
  locations: [
    "Yorke Peninsula",
    "Copper Coast",
    "Kadina",
    "Moonta",
    "Port Hughes",
    "Wallaroo",
    "Kulpara",
    "Paskeville",
    "Bute",
    "Port Broughton",
    "Tickera",
    "Arthurton",
  ],
  note: "Not sure whether your property is within the service area? Send the job address through the quote form and Al can confirm availability and any applicable travel cost.",
} as const;

/**
 * ---------------------------------------------------------------------------
 * NAVIGATION LABELS
 * ---------------------------------------------------------------------------
 * `href` values are in-page anchors that scroll to each section.
 * `emphasised` marks the primary conversion action.
 */
export type NavItem = {
  label: string;
  href: string;
  emphasised?: boolean;
};

export const navigation: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Service Areas", href: "#service-areas" },
  { label: "Pricing", href: "#pricing" },
  { label: "Photos", href: "#photos" },
  { label: "Request a Quote", href: "#quote", emphasised: true },
];
