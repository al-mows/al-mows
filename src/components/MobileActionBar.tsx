import { Phone, FileText } from "lucide-react";
import { business } from "@/data/business";

/**
 * Sticky bottom action bar for mobile. Always offers "Call Al" and "Request a
 * Quote". Hidden on md+ where the header actions are visible. A spacer in the
 * page prevents it from covering the footer.
 */
export default function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-brand-black/95 backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-2 p-2">
        <a
          href={business.phoneLink}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border-2 border-brand-bright px-3 py-2.5 text-sm font-bold uppercase text-brand-bright"
        >
          <Phone className="h-4 w-4" aria-hidden />
          Call Al
        </a>
        <a
          href="#quote"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-brand-orange px-3 py-2.5 text-sm font-bold uppercase text-white"
        >
          <FileText className="h-4 w-4" aria-hidden />
          Request a Quote
        </a>
      </div>
    </div>
  );
}
