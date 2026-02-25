import { Link, useNavigate } from '@tanstack/react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const deliveryCharge = items.length > 0 ? 50 : 0;
  const total = getTotalPrice() + deliveryCharge;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-gray-50">
          <div className="container mx-auto px-4 py-12">
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
              <p className="text-gray-600 mb-6">Add some products to get started!</p>
              <Button onClick={() => navigate({ to: '/shop' })} className="bg-blue-600 hover:bg-blue-700">
                Continue Shopping
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const discountedPrice = item.product.price * (1 - Number(item.product.discount) / 100);
                const imageUrl = item.product.images[0]?.getDirectURL() || '/assets/placeholder.png';
                
                return (
                  <div key={item.product.id} className="bg-white rounded-lg shadow-sm p-4">
                    <div className="flex gap-4">
                      <Link
                        to="/product/$id"
                        params={{ id: item.product.id }}
                        className="shrink-0"
                      >
                        <img
                          src={imageUrl}
                          alt={item.product.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      </Link>
                      
                      <div className="flex-1">
                        <Link
                          to="/product/$id"
                          params={{ id: item.product.id }}
                          className="font-medium hover:text-blue-600 line-clamp-2"
                        >
                          {item.product.name}
                        </Link>
                        
                        <div className="flex items-baseline gap-2 mt-2">
                          <span className="text-xl font-bold">₹{discountedPrice.toFixed(0)}</span>
                          {Number(item.product.discount) > 0 && (
                            <span className="text-sm text-gray-500 line-through">
                              ₹{item.product.price.toFixed(0)}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-4 mt-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="font-medium w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.product.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xl font-bold">
                          ₹{(discountedPrice * item.quantity).toFixed(0)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{getTotalPrice().toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Charges</span>
                    <span className="font-medium">₹{deliveryCharge}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{total.toFixed(0)}</span>
                  </div>
                </div>

                <Button
                  onClick={() => navigate({ to: '/checkout' })}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-lg py-6"
                >
                  Proceed to Checkout
                </Button>

                <Link to="/shop">
                  <Button variant="outline" className="w-full mt-3">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
