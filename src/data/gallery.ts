/**
 * ===========================================================================
 * AL MOWS BLOCKS — BEFORE & AFTER GALLERY
 * ===========================================================================
 * Owner: add real project entries here as jobs are completed.
 *
 * HOW TO ADD A PROJECT
 * 1. Drop the two photos into `public/images/gallery/`, e.g.
 *      public/images/gallery/project-1-before.png
 *      public/images/gallery/project-1-after.png
 * 2. Add or edit an entry below with the matching paths.
 * 3. If an image path is missing on disk, the gallery shows a labelled
 *    placeholder panel instead of a broken image — so it is safe to add
 *    entries before the photos exist.
 *
 * DO NOT use the brand banner, trailer or logo artwork as fake job evidence.
 * ===========================================================================
 */

export type GalleryProject = {
  id: string;
  title: string;
  location: string;
  size: string;
  description: string;
  /** Path under /public. Leave as the placeholder path until a real photo exists. */
  beforeImage: string;
  afterImage: string;
};

export const galleryHeading = "BEFORE & AFTER";

export const galleryIntro =
  "Real jobs across the Copper Coast and Yorke Peninsula. Drag the slider to see the difference a slashing makes. New before-and-after photos are added as projects are completed.";

export const galleryProjects: GalleryProject[] = [
  {
    id: "project-1",
    title: "Block Slashing",
    location: "Residential block",
    size: "Approximate area to be confirmed",
    description:
      "Clearing an overgrown residential block back to a tidy, accessible lawn.",
    beforeImage: "/images/gallery/project-1-before.png",
    afterImage: "/images/gallery/project-1-after.png",
  },
  {
    id: "project-2",
    title: "Paddock Slashing",
    location: "Yorke Peninsula",
    size: "Approximate area to be confirmed",
    description:
      "Slashing overgrown paddock ready for the season, subject to terrain and access.",
    beforeImage: "/images/gallery/project-2-before.jpg",
    afterImage: "/images/gallery/project-2-after.jpg",
  },
  {
    id: "project-3",
    title: "Residential Lawn Mowing",
    location: "Copper Coast",
    size: "Approximate area to be confirmed",
    description:
      "A regular house-yard mow, keeping the lawn and verge tidy and presentable.",
    beforeImage: "/images/gallery/project-3-before.jpeg",
    afterImage: "/images/gallery/project-3-after.jpeg",
  },
];
