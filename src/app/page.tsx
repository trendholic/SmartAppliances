import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturesSection from "@/components/FeaturesSection";
import ProductShowcase from "@/components/ProductShowcase";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { getCategories, getProducts } from "@/lib/store";

export const dynamic = "force-dynamic";

export default function Home() {
  const categories = getCategories();
  const products = getProducts();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CategoryGrid categories={categories} />
        <FeaturesSection />
        <ProductShowcase categories={categories} products={products} />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
