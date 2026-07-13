/**
 * ===========================================================================
 * AL MOWS BLOCKS — SERVICES
 * ===========================================================================
 * Owner: add, remove or edit service cards here. The Services section maps
 * over this array, so no component changes are required.
 *
 * `icon` refers to a Lucide React icon name (see ServicesSection.tsx for the
 * supported set). Keep it to one of the mapped names.
 * ===========================================================================
 */

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: "scissors" | "tractor" | "sprout" | "land" | "home" | "repeat";
};

export const servicesHeading = "MOWING AND SLASHING THAT GETS THE JOB DONE.";

export const services: Service[] = [
  {
    id: "block-slashing",
    title: "Block Slashing",
    description:
      "Clearing overgrown residential, commercial and vacant blocks to improve access, presentation and general property management.",
    icon: "scissors",
  },
  {
    id: "paddock-slashing",
    title: "Paddock Slashing",
    description:
      "Slashing for rural blocks, lifestyle properties, paddocks and larger acreage, subject to terrain, access and site conditions.",
    icon: "tractor",
  },
  {
    id: "property-clean-ups",
    title: "Property Clean-Ups",
    description:
      "Seasonal mowing and vegetation reduction before sale, inspection, property use or higher-risk fire weather periods.",
    icon: "sprout",
  },
  {
    id: "rural-acreage",
    title: "Rural Acreage Work",
    description:
      "Larger rural jobs can be assessed and quoted individually, including negotiated daily rates where appropriate.",
    icon: "land",
  },
  {
    id: "pre-sale-presentation",
    title: "Pre-Sale Property Presentation",
    description:
      "Improve the appearance and accessibility of overgrown properties before listing, inspection or handover.",
    icon: "home",
  },
  {
    id: "recurring-maintenance",
    title: "Recurring Property Maintenance",
    description:
      "Scheduled mowing or slashing can be discussed for properties requiring ongoing vegetation management.",
    icon: "repeat",
  },
];

/**
 * A short qualifying note shown beneath the services grid.
 * Keeps claims accurate: vegetation reduction assists with maintenance and
 * preparation, but does not make a property fire-safe or compliant.
 */
export const servicesQualifier =
  "Reducing vegetation can assist with general property maintenance and preparation. It does not make a property fire-safe or guarantee compliance with any regulation — landowners remain responsible for meeting their own obligations.";
