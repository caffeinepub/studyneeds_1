import { useState, useMemo } from 'react';
import { useParams } from '@tanstack/react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useGetAllProducts, useGetProductsByCategory } from '../hooks/useQueries';
import { Skeleton } from '../components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const categories = [
  { name: 'All Products', slug: 'all' },
  { name: 'Books', slug: 'books' },
  { name: 'Stationery', slug: 'stationery' },
  { name: 'School Bags', slug: 'school-bags' },
  { name: 'School Dress', slug: 'school-dress' },
  { name: 'Geometry Items', slug: 'geometry' },
  { name: 'Study Furniture', slug: 'furniture' },
  { name: 'Notes & PDFs', slug: 'notes' },
  { name: 'Digital Courses', slug: 'courses' },
];

export default function ShopPage() {
  const params = useParams({ from: '/shop/$category' });
  const categorySlug = params?.category || 'all';
  const [sortBy, setSortBy] = useState('popularity');

  const { data: allProducts = [], isLoading: loadingAll } = useGetAllProducts();
  const { data: categoryProducts = [], isLoading: loadingCategory } = useGetProductsByCategory(categorySlug);

  const products = categorySlug === 'all' ? allProducts : categoryProducts;
  const isLoading = categorySlug === 'all' ? loadingAll : loadingCategory;

  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => {
          const priceA = a.price * (1 - Number(a.discount) / 100);
          const priceB = b.price * (1 - Number(b.discount) / 100);
          return priceA - priceB;
        });
      case 'price-high':
        return sorted.sort((a, b) => {
          const priceA = a.price * (1 - Number(a.discount) / 100);
          const priceB = b.price * (1 - Number(b.discount) / 100);
          return priceB - priceA;
        });
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      default:
        return sorted;
    }
  }, [products, sortBy]);

  const currentCategory = categories.find((c) => c.slug === categorySlug);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <aside className="w-full md:w-64 shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
                <h3 className="font-bold mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.slug}>
                      <a
                        href={category.slug === 'all' ? '/shop' : `/shop/${category.slug}`}
                        className={`block px-3 py-2 rounded-lg transition-colors ${
                          categorySlug === category.slug
                            ? 'bg-blue-600 text-white font-medium'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Products */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h1 className="text-2xl font-bold">{currentCategory?.name || 'All Products'}</h1>
                    <p className="text-gray-600 text-sm mt-1">
                      {sortedProducts.length} products found
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="popularity">Popularity</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Rating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <Skeleton key={i} className="h-96" />
                  ))}
                </div>
              ) : sortedProducts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <p className="text-gray-600">No products found in this category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
