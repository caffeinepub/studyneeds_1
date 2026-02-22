import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import WhatsAppButton from './components/WhatsAppButton';
import ProfileSetupModal from './components/ProfileSetupModal';
import AdminRoute from './components/AdminRoute';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useGetCallerUserProfile';
import { useEffect } from 'react';
import { getUrlParameter } from './utils/urlParams';

function RootComponent() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const navigate = useNavigate();
  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  // Handle special URL format: #caffeineAdminToken=TOKEN/admin
  useEffect(() => {
    const hash = window.location.hash;
    
    // Check if we have the special format with admin token before the route
    if (hash && hash.includes('caffeineAdminToken=') && hash.includes('/')) {
      const hashContent = hash.substring(1); // Remove #
      const slashIndex = hashContent.indexOf('/');
      
      if (slashIndex > 0) {
        const routePath = hashContent.substring(slashIndex); // Get /admin or other route
        
        // Navigate to the proper route, the token will be extracted by useActor
        if (routePath && routePath !== window.location.hash.substring(1)) {
          // Use setTimeout to avoid navigation during render
          setTimeout(() => {
            navigate({ to: routePath as any });
          }, 0);
        }
      }
    }
  }, [navigate]);

  return (
    <>
      <Outlet />
      <WhatsAppButton />
      {showProfileSetup && <ProfileSetupModal />}
    </>
  );
}

const rootRoute = createRootRoute({
  component: RootComponent,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const shopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/shop',
  component: ShopPage,
});

const shopCategoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/shop/$category',
  component: ShopPage,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/product/$id',
  component: ProductDetailsPage,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: CartPage,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/checkout',
  component: CheckoutPage,
});

const orderConfirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/order-confirmation',
  component: OrderConfirmationPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  validateSearch: (search: Record<string, unknown>) => search,
  component: () => (
    <AdminRoute>
      <AdminDashboardPage />
    </AdminRoute>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  shopRoute,
  shopCategoryRoute,
  productRoute,
  cartRoute,
  checkoutRoute,
  orderConfirmationRoute,
  adminRoute,
]);

const router = createRouter({ 
  routeTree,
  defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </WishlistProvider>
  );
}
