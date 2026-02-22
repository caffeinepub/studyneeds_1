import type { Product } from '../backend';
import ProductCard from './ProductCard';

interface ProductSectionProps {
  title: string;
  products: Product[];
}

export default function ProductSection({ title, products }: ProductSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
