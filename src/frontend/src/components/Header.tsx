import { Link, useNavigate } from '@tanstack/react-router';
import { Search, MapPin, ShoppingCart, Menu, User, LogOut, Shield } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import LocationSelector from './LocationSelector';
import CategoriesMenu from './CategoriesMenu';
import MobileMenu from './MobileMenu';
import { Button } from './ui/button';
import { useIsCallerAdmin } from '../hooks/useQueries';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showLocationSelector, setShowLocationSelector] = useState(false);
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { getTotalItems } = useCart();
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const { data: isAdmin } = useIsCallerAdmin();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ to: '/shop', search: { q: searchQuery } });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4">
          <div className="container mx-auto flex justify-between items-center text-sm">
            <p className="hidden md:block">Welcome to StudyNeeds - Your One-Stop Student Solution</p>
            <div className="flex items-center gap-4">
              <button className="hover:underline text-xs md:text-sm">Seller Registration</button>
              <button className="hover:underline text-xs md:text-sm">Help</button>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4 md:gap-6">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(true)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>

            {/* Logo */}
            <Link to="/" className="shrink-0">
              <img src="/assets/logo_908978-removebg-preview.png" alt="StudyNeeds" className="h-10 md:h-12" />
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:flex">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products, books, stationery..."
                  className="w-full px-4 py-2.5 pr-12 border-2 border-blue-600 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-r-lg transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Location Selector - Desktop */}
              <button
                onClick={() => setShowLocationSelector(!showLocationSelector)}
                className="hidden lg:flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">Location</span>
              </button>

              {/* Admin Dashboard Link */}
              {isAuthenticated && isAdmin && (
                <Link
                  to="/admin"
                  className="hidden md:flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors text-blue-600"
                >
                  <Shield className="w-5 h-5" />
                  <span className="text-sm font-medium">Admin</span>
                </Link>
              )}

              {/* Login/Logout */}
              <Button
                onClick={handleAuth}
                disabled={isLoggingIn}
                variant="ghost"
                className="hidden md:flex items-center gap-2"
              >
                {isAuthenticated ? (
                  <>
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Logout</span>
                  </>
                ) : (
                  <>
                    <User className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      {isLoggingIn ? 'Logging in...' : 'Login'}
                    </span>
                  </>
                )}
              </Button>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-6 h-6 text-blue-600" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mt-3 md:hidden">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2 pr-12 border-2 border-blue-600 rounded-lg focus:outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-4 bg-orange-500 text-white rounded-r-lg"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Categories Bar */}
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="container mx-auto px-4 py-2">
            <button
              onClick={() => setShowCategoriesMenu(!showCategoriesMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Menu className="w-5 h-5" />
              <span>All Categories</span>
            </button>
          </div>
        </div>
      </header>

      {/* Dropdowns */}
      {showLocationSelector && (
        <LocationSelector onClose={() => setShowLocationSelector(false)} />
      )}
      {showCategoriesMenu && (
        <CategoriesMenu onClose={() => setShowCategoriesMenu(false)} />
      )}
      {showMobileMenu && (
        <MobileMenu onClose={() => setShowMobileMenu(false)} />
      )}
    </>
  );
}
