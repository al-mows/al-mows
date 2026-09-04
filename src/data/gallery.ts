/**
 * ===========================================================================
 * AL MOWS BLOCKS — BEFORE & AFTER GALLERY
 * ===========================================================================
 * Owner: add real project entries here as jobs are completed.
 *
 * HOW TO ADD A PROJECT
 * 1. Drop the photos into `public/images/gallery/`, e.g.
 *      public/images/gallery/project-1-before.png
 *      public/images/gallery/project-1-after.png
 * 2. Add or edit an entry below with the matching paths.
 * 3. If an image path is missing on disk, the gallery shows a labelled
 *    placeholder panel instead of a broken image — so it is safe to add
 *    entries before the photos exist.
 *
 * ADDING MORE THAN ONE BEFORE/AFTER PHOTO TO A PROJECT
 * `beforeImages` and `afterImages` are lists — add as many photos as you
 * like for the same job (e.g. different angles of the same block), as long
 * as each new "before" has a matching "after" in the same position. Visitors
 * get arrows to flip through each pair, and can still drag the slider to
 * compare within the pair that's showing. Example with two pairs:
 *
 *   beforeImages: [
 *     "/images/gallery/project-1-before.png",
 *     "/images/gallery/project-1-before-2.png",
 *   ],
 *   afterImages: [
 *     "/images/gallery/project-1-after.png",
 *     "/images/gallery/project-1-after-2.png",
 *   ],
 *
 * Only edit the text *between the quote marks* — don't touch the commas,
 * square brackets `[ ]`, or the quote marks themselves, or the site will
 * fail to build.
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
  /** Paths under /public, in the same order as afterImages. Leave as the
   *  placeholder path until a real photo exists. */
  beforeImages: string[];
  afterImages: string[];
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
    beforeImages: [
      "/images/gallery/project-1-before.png",
      "/images/gallery/project-1-before-2.jpg",
    ],
    afterImages: [
      "/images/gallery/project-1-after.png",
      "/images/gallery/project-1-after-2.jpg",
    ],
  },
  {
    id: "project-2",
    title: "Paddock Slashing",
    location: "Yorke Peninsula",
    size: "Approximate area to be confirmed",
    description:
      "Slashing overgrown paddock ready for the season, subject to terrain and access.",
    beforeImages: [
      "/images/gallery/project-2-before.jpg",
      "/images/gallery/project-2-before-2.jpg",
      "/images/gallery/project-2-before-3.jpg",
    ],
    afterImages: [
      "/images/gallery/project-2-after.jpg",
      "/images/gallery/project-2-after-2.jpg",
      "/images/gallery/project-2-after-3.jpg",
    ],
  },
  {
    id: "project-3",
    title: "Residential Lawn Mowing",
    location: "Copper Coast",
    size: "Approximate area to be confirmed",
    description:
      "A regular house-yard mow, keeping the lawn and verge tidy and presentable.",
    beforeImages: ["/images/gallery/project-3-before.jpeg"],
    afterImages: ["/images/gallery/project-3-after.jpeg"],
  },
];
