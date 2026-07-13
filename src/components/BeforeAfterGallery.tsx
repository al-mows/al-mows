import { MapPin, Ruler } from "lucide-react";
import SectionHeading from "./SectionHeading";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { galleryHeading, galleryIntro, galleryProjects } from "@/data/gallery";

export default function BeforeAfterGallery() {
  return (
    <section id="photos" className="scroll-mt-20 bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <SectionHeading
          eyebrow="Photos"
          title={galleryHeading}
          intro={galleryIntro}
        />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {galleryProjects.map((project) => (
            <article
              key={project.id}
              className="flex flex-col overflow-hidden rounded-xl border border-brand-sand/60 bg-brand-cream shadow-card"
            >
              <BeforeAfterSlider
                beforeImage={project.beforeImage}
                afterImage={project.afterImage}
                title={project.title}
              />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-brand-black">
                  {project.title}
                </h3>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-brand-brown">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-brand-orange" aria-hidden />
                    {project.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Ruler className="h-4 w-4 text-brand-orange" aria-hidden />
                    {project.size}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-brand-brown">
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-sm italic text-brand-brown">
          Drag the slider on any project to compare the before and after. New
          project photos are added as jobs are completed.
        </p>
      </div>
    </section>
  );
}
