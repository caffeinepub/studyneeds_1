import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../hooks/useQueries';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface AdminRouteProps {
  children: React.ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const navigate = useNavigate();
  const [showUnauthorized, setShowUnauthorized] = useState(false);

  const isAuthenticated = !!identity;
  const isLoading = isInitializing || adminLoading;

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate({ to: '/' });
      } else if (isAuthenticated && isAdmin === false) {
        setShowUnauthorized(true);
        const timer = setTimeout(() => {
          navigate({ to: '/' });
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [isAuthenticated, isAdmin, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

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

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return <>{children}</>;
}
