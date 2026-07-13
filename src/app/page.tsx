import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import ServicesSection from "@/components/ServicesSection";
import ServiceAreaSection from "@/components/ServiceAreaSection";
import PricingSection from "@/components/PricingSection";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/MobileActionBar";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <ServicesSection />
        <ServiceAreaSection />
        <PricingSection />
        <BeforeAfterGallery />
        <ContactSection />
      </main>
      <Footer />
      {/* Spacer so the sticky mobile action bar never covers the footer. */}
      <div className="h-[72px] md:hidden" aria-hidden />
      <MobileActionBar />
    </>
  );
}
