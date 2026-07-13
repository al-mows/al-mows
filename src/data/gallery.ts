/**
 * ===========================================================================
 * AL MOWS BLOCKS — BEFORE & AFTER GALLERY
 * ===========================================================================
 * Owner: add real project entries here as jobs are completed.
 *
 * HOW TO ADD A PROJECT
 * 1. Drop the two photos into `public/images/gallery/`, e.g.
 *      public/images/gallery/project-1-before.jpg
 *      public/images/gallery/project-1-after.jpg
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
    title: "Vacant block slashing",
    location: "Kadina",
    size: "Approximate area to be confirmed",
    description:
      "Before-and-after images will be added following completion of the project.",
    beforeImage: "/images/gallery/project-1-before.jpg",
    afterImage: "/images/gallery/project-1-after.jpg",
  },
  {
    id: "project-2",
    title: "Paddock slashing",
    location: "Yorke Peninsula",
    size: "Approximate area to be confirmed",
    description:
      "Before-and-after images will be added following completion of the project.",
    beforeImage: "/images/gallery/project-2-before.jpg",
    afterImage: "/images/gallery/project-2-after.jpg",
  },
  {
    id: "project-3",
    title: "Pre-sale property clean-up",
    location: "Moonta",
    size: "Approximate area to be confirmed",
    description:
      "Before-and-after images will be added following completion of the project.",
    beforeImage: "/images/gallery/project-3-before.jpg",
    afterImage: "/images/gallery/project-3-after.jpg",
  },
];
