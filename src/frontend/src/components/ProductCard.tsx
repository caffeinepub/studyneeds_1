import { Link } from '@tanstack/react-router';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import type { Product } from '../backend';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../hooks/useWishlist';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const discountedPrice = product.price * (1 - Number(product.discount) / 100);
  const imageUrl = product.images[0]?.getDirectURL() || '/assets/placeholder.png';
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success('Added to cart!');
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    window.location.href = '/checkout';
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product.id);
      toast.success('Added to wishlist');
    }
  };

  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all overflow-hidden group"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {Number(product.discount) > 0 && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-md text-sm font-bold z-10">
            {product.discount}% OFF
          </div>
        )}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:scale-110 transition-transform z-10"
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-5 h-5 ${
              inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-800 line-clamp-2 mb-2 group-hover:text-blue-600">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded text-xs font-medium">
            <span>{product.rating.toFixed(1)}</span>
            <Star className="w-3 h-3 fill-current" />
          </div>
        </div>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-xl font-bold text-gray-900">₹{discountedPrice.toFixed(0)}</span>
          {Number(product.discount) > 0 && (
            <span className="text-sm text-gray-500 line-through">₹{product.price.toFixed(0)}</span>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleAddToCart}
            variant="outline"
            size="sm"
            className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add
          </Button>
          <Button
            onClick={handleBuyNow}
            size="sm"
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </Link>
  );
}
