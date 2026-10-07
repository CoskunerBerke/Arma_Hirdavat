import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import ReviewsRiver from "@/components/ReviewsRiver";
import AboutSection from "@/components/AboutSection";
import BrandsSection from "@/components/BrandsSection";
import ContactAndQuote from "@/components/ContactAndQuote";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />
      <Hero />
      <ProductSection />
      <ReviewsRiver />
      <AboutSection />
      <BrandsSection />
      <ContactAndQuote />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
