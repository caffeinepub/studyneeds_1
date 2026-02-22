import { Link } from '@tanstack/react-router';
import { X, User, LogOut, MapPin, Home, ShoppingBag } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

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
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 space-y-2">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
          >
            <Home className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Home</span>
          </Link>
          <Link
            to="/shop"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
          >
            <ShoppingBag className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Shop</span>
          </Link>
          <button
            onClick={handleAuth}
            disabled={isLoggingIn}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
          >
            {isAuthenticated ? (
              <>
                <LogOut className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Logout</span>
              </>
            ) : (
              <>
                <User className="w-5 h-5 text-blue-600" />
                <span className="font-medium">{isLoggingIn ? 'Logging in...' : 'Login'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
