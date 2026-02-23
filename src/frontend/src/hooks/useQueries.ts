import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Principal } from '@dfinity/principal';
import type { Product, UserProfile } from '../backend';

export function useGetAllProducts() {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        console.log('Fetching all products...');
        const products = await actor.getAllProducts();
        console.log('Products fetched successfully:', products.length);
        return products;
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
    refetchOnMount: true,
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
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: Product) => {
      if (!actor) throw new Error('Actor not available');
      
      console.group('🔵 Creating Product');
      console.log('Product data:', {
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        discount: product.discount,
        stockQuantity: product.stockQuantity,
        rating: product.rating,
        description: product.description,
        imagesCount: product.images.length,
      });
      
      try {
        const result = await actor.createProduct(product);
        console.log('✅ Product created successfully:', result);
        console.groupEnd();
        return result;
      } catch (error: any) {
        console.error('❌ Product creation failed:', error);
        console.error('Error message:', error.message || 'Unknown error');
        console.error('Error details:', error);
        console.groupEnd();
        throw new Error(error.message || 'Failed to create product. Please check all fields and try again.');
      }
    },
    onSuccess: () => {
      console.log('🔄 Invalidating product queries...');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error: any) => {
      console.error('🔴 Mutation error handler:', error);
    },
  });
}
