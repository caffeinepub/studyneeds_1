import { X, Home, ShoppingBag, User, LogOut, Shield } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from './ui/button';
import { useIsCallerAdmin } from '../hooks/useQueries';

interface MobileMenuProps {
  onClose: () => void;
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';
  const showAdminLink = isAuthenticated && isAdmin === true && !adminLoading;

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
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
        onClick={onClose}
      />

      {/* Slide-in Menu */}
      <div className="fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-xl md:hidden animate-in slide-in-from-left">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Home className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-900">Home</span>
          </Link>

          <Link
            to="/shop"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ShoppingBag className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-900">Shop</span>
          </Link>

          {showAdminLink && (
            <Link
              to="/admin"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
            >
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-600">Admin Panel</span>
            </Link>
          )}

          <div className="pt-4 border-t border-gray-200">
            <Button
              onClick={handleAuth}
              disabled={isLoggingIn}
              variant="ghost"
              className="w-full justify-start gap-3 px-4 py-3 h-auto"
            >
              {isAuthenticated ? (
                <>
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </>
              ) : (
                <>
                  <User className="w-5 h-5" />
                  <span className="font-medium">
                    {isLoggingIn ? 'Logging in...' : 'Login'}
                  </span>
                </>
              )}
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}
