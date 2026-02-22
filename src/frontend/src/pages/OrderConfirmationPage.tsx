import { Link } from '@tanstack/react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-sm p-12 text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for your order. We'll send you a confirmation email shortly.
            </p>

            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <p className="text-sm text-gray-600 mb-2">Your order will be delivered within</p>
              <p className="text-2xl font-bold text-blue-600">3-5 Business Days</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
