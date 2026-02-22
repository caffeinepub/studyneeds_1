import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../hooks/useQueries';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { AlertCircle, Shield } from 'lucide-react';

interface AdminRouteProps {
  children: React.ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading, isFetched } = useIsCallerAdmin();
  const navigate = useNavigate();
  const [showUnauthorized, setShowUnauthorized] = useState(false);

  const isAuthenticated = !!identity;
  const isLoading = isInitializing || adminLoading || !isFetched;

  useEffect(() => {
    // Only check authorization after all data is loaded
    if (!isLoading) {
      if (!isAuthenticated) {
        // Not logged in - redirect immediately
        console.log('AdminRoute: Not authenticated, redirecting to home');
        navigate({ to: '/' });
      } else if (isAuthenticated && isFetched && isAdmin === false) {
        // Logged in but not admin - show message then redirect
        console.log('AdminRoute: Authenticated but not admin, showing unauthorized message');
        setShowUnauthorized(true);
        const timer = setTimeout(() => {
          navigate({ to: '/' });
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [isAuthenticated, isAdmin, isLoading, isFetched, navigate]);

  // Show loading state while checking authentication and admin status
  if (isLoading) {
    console.log('AdminRoute: Loading...', { isInitializing, adminLoading, isFetched, isAdmin });
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Verifying admin access...</p>
          <p className="text-gray-500 text-sm mt-2">Please wait</p>
        </div>
      </div>
    );
  }

  // Show unauthorized message
  if (showUnauthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">
            You don't have permission to access the admin dashboard.
          </p>
          <p className="text-sm text-gray-500">Redirecting to homepage...</p>
        </div>
      </div>
    );
  }

  // Only render children if authenticated and admin
  if (!isAuthenticated || isAdmin !== true) {
    console.log('AdminRoute: Not rendering children', { isAuthenticated, isAdmin });
    return null;
  }

  console.log('AdminRoute: Rendering admin dashboard');
  return <>{children}</>;
}
