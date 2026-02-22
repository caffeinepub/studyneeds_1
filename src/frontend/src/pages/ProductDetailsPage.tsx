import { useState } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductSection from '../components/ProductSection';
import { useGetProduct, useGetProductsByCategory } from '../hooks/useQueries';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import { Star, ShoppingCart, Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function ProductDetailsPage() {
  const params = useParams({ from: '/product/$id' });
  const navigate = useNavigate();
  const { data: product, isLoading } = useGetProduct(params.id);
  const { data: relatedProducts = [] } = useGetProductsByCategory(product?.category || '');
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="h-96" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-6">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Button onClick={() => navigate({ to: '/shop' })}>Back to Shop</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const discountedPrice = product.price * (1 - Number(product.discount) / 100);
  const images = product.images.length > 0 ? product.images : [];

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    navigate({ to: '/checkout' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Images */}
              <div>
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <img
                    src={images[selectedImage]?.getDirectURL() || '/assets/placeholder.png'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImage === index ? 'border-blue-600' : 'border-transparent'
                        }`}
                      >
                        <img
                          src={image.getDirectURL()}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Details */}
              <div>
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded font-medium">
                    <span>{product.rating.toFixed(1)}</span>
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>

                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-4xl font-bold text-gray-900">₹{discountedPrice.toFixed(0)}</span>
                  {Number(product.discount) > 0 && (
                    <>
                      <span className="text-xl text-gray-500 line-through">₹{product.price.toFixed(0)}</span>
                      <span className="text-xl text-orange-600 font-bold">{product.discount}% OFF</span>
                    </>
                  )}
                </div>

                <div className="mb-6">
                  <h3 className="font-bold mb-2">Description</h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">
                    Stock: <span className="font-medium text-green-600">{Number(product.stockQuantity)} available</span>
                  </p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Quantity</label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-xl font-bold w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.min(Number(product.stockQuantity), quantity + 1))}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={handleAddToCart}
                    variant="outline"
                    size="lg"
                    className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    onClick={handleBuyNow}
                    size="lg"
                    className="flex-1 bg-orange-500 hover:bg-orange-600"
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <ProductSection
              title="Related Products"
              products={relatedProducts.filter((p) => p.id !== product.id)}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
