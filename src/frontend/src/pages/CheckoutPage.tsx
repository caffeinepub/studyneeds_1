import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { usePlaceOrder } from '../hooks/useQueries';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { toast } from 'sonner';
import { PaymentMethod } from '../backend';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const { identity } = useInternetIdentity();
  const { mutate: placeOrder, isPending } = usePlaceOrder();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod'>('cod');

  const deliveryCharge = 50;
  const total = getTotalPrice() + deliveryCharge;

  if (!identity) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-gray-50">
          <div className="container mx-auto px-4 py-12">
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Please Login to Continue</h2>
              <p className="text-gray-600">You need to be logged in to place an order.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    navigate({ to: '/cart' });
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const orderId = `ORD-${Date.now()}`;
    const deliveryAddress = `${address}, ${city}, ${state} - ${pincode}. Contact: ${name}, ${phone}`;
    const paymentMethodEnum: PaymentMethod = paymentMethod === 'online' 
      ? PaymentMethod.onlinePayment
      : PaymentMethod.cashOnDelivery;

    const orderItems = items.map((item) => ({
      product: item.product,
      quantity: BigInt(item.quantity),
    }));

    placeOrder(
      {
        id: orderId,
        userId: identity.getPrincipal(),
        items: orderItems,
        deliveryAddress,
        paymentMethod: paymentMethodEnum,
      },
      {
        onSuccess: () => {
          clearCart();
          navigate({ to: '/order-confirmation', search: { orderId } });
        },
        onError: (error) => {
          toast.error('Failed to place order. Please try again.');
          console.error(error);
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-6">Checkout</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Delivery Details */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Address *</Label>
                      <Input
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode *</Label>
                      <Input
                        id="pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                  <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as 'online' | 'cod')}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex-1 cursor-pointer">
                        <div className="font-medium">Cash on Delivery</div>
                        <div className="text-sm text-gray-600">Pay when you receive the order</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="online" id="online" />
                      <Label htmlFor="online" className="flex-1 cursor-pointer">
                        <div className="font-medium">Online Payment</div>
                        <div className="text-sm text-gray-600">Pay now using UPI, Card, or Net Banking</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                    {items.map((item) => {
                      const discountedPrice = item.product.price * (1 - Number(item.product.discount) / 100);
                      return (
                        <div key={item.product.id} className="flex gap-3 text-sm">
                          <img
                            src={item.product.images[0]?.getDirectURL() || '/assets/placeholder.png'}
                            alt={item.product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="line-clamp-1">{item.product.name}</p>
                            <p className="text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-medium">₹{(discountedPrice * item.quantity).toFixed(0)}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-2 border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">₹{getTotalPrice().toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery</span>
                      <span className="font-medium">₹{deliveryCharge}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>₹{total.toFixed(0)}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-lg py-6 mt-6"
                  >
                    {isPending ? 'Placing Order...' : 'Place Order'}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
