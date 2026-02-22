import Header from '../components/Header';
import Footer from '../components/Footer';
import BannerSlider from '../components/BannerSlider';
import CategoriesSection from '../components/CategoriesSection';
import ProductSection from '../components/ProductSection';
import ServicesSection from '../components/ServicesSection';
import WhyChooseSection from '../components/WhyChooseSection';
import TestimonialsSection from '../components/TestimonialsSection';
import { useGetAllProducts } from '../hooks/useQueries';
import { Skeleton } from '../components/ui/skeleton';

export default function HomePage() {
  const { data: products = [], isLoading } = useGetAllProducts();

  const trendingProducts = products.filter((p) => Number(p.rating) >= 4.0).slice(0, 8);
  const schoolEssentials = products.filter((p) => ['Stationery', 'School Bags'].includes(p.category)).slice(0, 8);
  const budgetDeals = products.filter((p) => p.price * (1 - Number(p.discount) / 100) < 199).slice(0, 8);
  const furniture = products.filter((p) => p.category === 'Study Furniture').slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <BannerSlider />
          <CategoriesSection />
          
          {isLoading ? (
            <div className="space-y-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <Skeleton className="h-8 w-48 mb-6" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((j) => (
                      <Skeleton key={j} className="h-80" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <ProductSection title="Trending Products" products={trendingProducts} />
              <ProductSection title="School Essentials" products={schoolEssentials} />
              <ProductSection title="Budget Deals Under ₹199" products={budgetDeals} />
              <ProductSection title="Study Furniture" products={furniture} />
            </>
          )}

          <ServicesSection />
          <WhyChooseSection />
          <TestimonialsSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
