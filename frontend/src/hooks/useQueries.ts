import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Principal } from '@dfinity/principal';
import type { Product, UserProfile, UpdateProductRequest, StudentLead, TeacherRegistration, DocumentationRequest, DocumentationRequestStatus } from '../backend';
import { ExternalBlob } from '../backend';
import { toast } from 'sonner';

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
      toast.success('Product added successfully');
    },
    onError: (error: any) => {
      console.error('🔴 Mutation error handler:', error);
      toast.error(error.message || 'Failed to create product');
    },
  });
}

export function useUpdateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: UpdateProductRequest) => {
      if (!actor) throw new Error('Actor not available');
      
      console.group('🔵 Updating Product');
      console.log('Update request:', {
        id: request.id,
        name: request.name,
        category: request.category,
        price: request.price,
        discount: request.discount,
        stockQuantity: request.stockQuantity,
        rating: request.rating,
        description: request.description,
      });
      
      try {
        const result = await actor.updateProduct(request);
        console.log('✅ Product updated successfully:', result);
        console.groupEnd();
        return result;
      } catch (error: any) {
        console.error('❌ Product update failed:', error);
        console.error('Error message:', error.message || 'Unknown error');
        console.error('Error details:', error);
        console.groupEnd();
        throw new Error(error.message || 'Failed to update product. Please check all fields and try again.');
      }
    },
    onSuccess: () => {
      console.log('🔄 Invalidating product queries...');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product updated successfully');
    },
    onError: (error: any) => {
      console.error('🔴 Mutation error handler:', error);
      toast.error(error.message || 'Failed to update product');
    },
  });
}

export function useDeleteProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      
      console.group('🔵 Deleting Product');
      console.log('Product ID:', id);
      
      try {
        const result = await actor.deleteProduct(id);
        console.log('✅ Product deleted successfully:', result);
        console.groupEnd();
        return result;
      } catch (error: any) {
        console.error('❌ Product deletion failed:', error);
        console.error('Error message:', error.message || 'Unknown error');
        console.error('Error details:', error);
        console.groupEnd();
        throw new Error(error.message || 'Failed to delete product. Please try again.');
      }
    },
    onSuccess: () => {
      console.log('🔄 Invalidating product queries...');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted successfully');
    },
    onError: (error: any) => {
      console.error('🔴 Mutation error handler:', error);
      toast.error(error.message || 'Failed to delete product');
    },
  });
}

// Tuition Consultancy Queries
export function useSubmitStudentLead() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (lead: StudentLead) => {
      if (!actor) throw new Error('Actor not available');
      
      try {
        const result = await actor.submitStudentLead(lead);
        return result;
      } catch (error: any) {
        throw new Error(error.message || 'Failed to submit student lead. Please try again.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studentLeads'] });
      toast.success('Form submitted successfully! We will contact you soon.');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to submit form');
    },
  });
}

export function useSubmitTeacherRegistration() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (registration: TeacherRegistration) => {
      if (!actor) throw new Error('Actor not available');
      
      try {
        const result = await actor.submitTeacherRegistration(registration);
        return result;
      } catch (error: any) {
        throw new Error(error.message || 'Failed to submit teacher registration. Please try again.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacherRegistrations'] });
      toast.success('Registration submitted successfully! We will review and contact you soon.');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to submit registration');
    },
  });
}

export function useGetAllStudentLeads() {
  const { actor, isFetching } = useActor();

  return useQuery<StudentLead[]>({
    queryKey: ['studentLeads'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllStudentLeads();
      } catch (error) {
        console.error('Error fetching student leads:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllTeacherRegistrations() {
  const { actor, isFetching } = useActor();

  return useQuery<TeacherRegistration[]>({
    queryKey: ['teacherRegistrations'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllTeacherRegistrations();
      } catch (error) {
        console.error('Error fetching teacher registrations:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

// Documentation Request Queries
export function useCreateDocumentationRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      fullName: string;
      mobileNumber: string;
      serviceNeeded: string;
      mode: string;
      uploadedDocuments: ExternalBlob[];
      message: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      
      try {
        await actor.createDocumentationRequest(
          data.fullName,
          data.mobileNumber,
          data.serviceNeeded,
          data.mode,
          data.uploadedDocuments,
          data.message
        );
      } catch (error: any) {
        throw new Error(error.message || 'Failed to submit documentation request. Please try again.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documentationRequests'] });
      toast.success('Request submitted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to submit request');
    },
  });
}

export function useGetDocumentationRequests() {
  const { actor, isFetching } = useActor();

  return useQuery<DocumentationRequest[]>({
    queryKey: ['documentationRequests'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getDocumentationRequests();
      } catch (error) {
        console.error('Error fetching documentation requests:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateDocumentationRequestStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { requestId: string; newStatus: DocumentationRequestStatus }) => {
      if (!actor) throw new Error('Actor not available');
      
      try {
        await actor.updateDocumentationRequestStatus(data.requestId, data.newStatus);
      } catch (error: any) {
        throw new Error(error.message || 'Failed to update status. Please try again.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documentationRequests'] });
      toast.success('Status updated');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update status');
    },
  });
}

export function useGetDocumentationRequestDocuments(requestId: string | null) {
  const { actor, isFetching } = useActor();

  return useQuery<ExternalBlob[]>({
    queryKey: ['documentationRequestDocuments', requestId],
    queryFn: async () => {
      if (!actor || !requestId) return [];
      try {
        return await actor.getDocumentationRequestDocuments(requestId);
      } catch (error) {
        console.error('Error fetching documentation request documents:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!requestId,
  });
}
