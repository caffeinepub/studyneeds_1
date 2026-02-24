import { Link } from '@tanstack/react-router';
import { X, Home, ShoppingBag, LogOut, Shield } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from './ui/button';

interface MobileMenuProps {
  onClose: () => void;
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();

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
      <div className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-50 shadow-xl md:hidden animate-in slide-in-from-left duration-300">
        <div className="flex flex-col h-full">
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
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              <Link
                to="/"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-[oklch(0.22_0.10_260)]/10 hover:text-[oklch(0.22_0.10_260)] rounded-lg transition-colors"
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Home</span>
              </Link>

              <Link
                to="/shop"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-[oklch(0.22_0.10_260)]/10 hover:text-[oklch(0.22_0.10_260)] rounded-lg transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="font-medium">Shop</span>
              </Link>

              {/* Admin Panel Link - Always visible */}
              <Link
                to="/admin"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 bg-[oklch(0.22_0.10_260)] text-white hover:bg-[oklch(0.18_0.08_260)] rounded-lg transition-colors"
              >
                <Shield className="w-5 h-5" />
                <span className="font-medium">Admin Panel</span>
              </Link>

              <div className="border-t border-gray-200 my-4"></div>

              {/* Auth Button */}
              <Button
                onClick={handleAuth}
                disabled={isLoggingIn}
                variant={isAuthenticated ? 'outline' : 'default'}
                className="w-full flex items-center justify-center gap-2"
              >
                {isLoggingIn ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                    <span>Logging in...</span>
                  </>
                ) : isAuthenticated ? (
                  <>
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </>
                ) : (
                  <span>Login</span>
                )}
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
