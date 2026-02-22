import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Principal } from '@dfinity/principal';
import type { Product, Order, OrderItem, PaymentMethod, UserProfile, ProductAdminQueries, OrderAdminQueries, UserAdminQueries, OrderStatus, ExternalBlob } from '../backend';

export function useGetAllProducts() {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProduct(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Product | null>({
    queryKey: ['product', id],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getProduct(id);
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useGetProductsByCategory(category: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products', 'category', category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProductsByCategory(category);
    },
    enabled: !!actor && !isFetching && !!category,
  });
}

export function usePlaceOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      userId,
      items,
      deliveryAddress,
      paymentMethod,
    }: {
      id: string;
      userId: Principal;
      items: OrderItem[];
      deliveryAddress: string;
      paymentMethod: PaymentMethod;
    }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.placeOrder(id, userId, items, deliveryAddress, paymentMethod);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export function useGetUserOrders() {
  const { actor, isFetching } = useActor();

  return useQuery<Order[]>({
    queryKey: ['orders', 'user'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUserOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      await actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Admin Queries
export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isCallerAdmin();
      } catch (error) {
        console.error('Admin check error:', error);
        return false;
      }
    },
    enabled: !!actor && !isFetching,
    retry: 1,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
}

export function useGetAllProductsAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<ProductAdminQueries[]>({
    queryKey: ['admin', 'products'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllProductsAdminProductQueries();
      } catch (error) {
        console.error('Get products error:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllOrdersAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<OrderAdminQueries[]>({
    queryKey: ['admin', 'orders'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllOrdersAdminProductQueries();
      } catch (error) {
        console.error('Get orders error:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllUsers() {
  const { actor, isFetching } = useActor();

  return useQuery<UserAdminQueries[]>({
    queryKey: ['admin', 'users'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllUsers();
      } catch (error) {
        console.error('Get users error:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: {
      id: string;
      name: string;
      category: string;
      price: number;
      discount: bigint;
      rating: number;
      images: ExternalBlob[];
      stockQuantity: bigint;
      description: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.addProduct(
        product.id,
        product.name,
        product.category,
        product.price,
        product.discount,
        product.rating,
        product.images,
        product.stockQuantity,
        product.description
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useUpdateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: {
      id: string;
      name: string;
      category: string;
      price: number;
      discount: bigint;
      rating: number;
      images: ExternalBlob[];
      stockQuantity: bigint;
      description: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateProduct(
        product.id,
        product.name,
        product.category,
        product.price,
        product.discount,
        product.rating,
        product.images,
        product.stockQuantity,
        product.description
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useDeleteProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      if (!actor) throw new Error('Actor not available');
      await actor.deleteProduct(productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: OrderStatus }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateOrderStatus(orderId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}
