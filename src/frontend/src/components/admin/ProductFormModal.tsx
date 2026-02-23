import { useState, useEffect } from 'react';
import { X, Upload, Star } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useCreateProduct } from '../../hooks/useQueries';
import type { Product } from '../../backend';
import { ExternalBlob } from '../../backend';
import { toast } from 'sonner';

const CATEGORIES = [
  'Stationery',
  'Books',
  'School Bags',
  'Pens & Geometry',
  'Notes & Guides',
  'Courses',
  'Dress & Uniform',
  'Furniture',
];

interface ProductFormModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductFormModal({ product, onClose }: ProductFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Stationery',
    description: '',
    price: '',
    discount: '',
    rating: '4',
    stockQuantity: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [existingImages, setExistingImages] = useState<ExternalBlob[]>([]);

  const createProductMutation = useCreateProduct();

  const isEditing = !!product;

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        description: product.description,
        price: product.price.toString(),
        discount: Number(product.discount).toString(),
        rating: product.rating.toString(),
        stockQuantity: Number(product.stockQuantity).toString(),
      });
      if (product.images && product.images.length > 0 && product.images[0]) {
        setImagePreview(product.images[0].getDirectURL());
        setExistingImages(product.images);
      }
    }
  }, [product]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (isEditing) {
      toast.info('Edit functionality is not yet available');
      return;
    }

    console.group('📝 Form Submission Started');
    console.log('Form data:', formData);
    console.log('Image file:', imageFile?.name);

    // Validation
    if (!formData.name || !formData.category || !formData.price || !formData.stockQuantity || !formData.description) {
      const error = 'Please fill in all required fields';
      setErrorMessage(error);
      toast.error(error);
      console.error('❌ Validation failed:', error);
      console.groupEnd();
      return;
    }

    if (!imageFile && !imagePreview) {
      const error = 'Please upload a product image';
      setErrorMessage(error);
      toast.error(error);
      console.error('❌ Validation failed:', error);
      console.groupEnd();
      return;
    }

    try {
      console.log('🔄 Processing image...');
      let images: ExternalBlob[] = [];
      
      if (imageFile) {
        const arrayBuffer = await imageFile.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
          setUploadProgress(percentage);
          console.log(`Upload progress: ${percentage}%`);
        });
        images = [blob];
      } else if (existingImages.length > 0) {
        images = existingImages;
      }

      console.log('✅ Image processed, images count:', images.length);

      const productData: Product = {
        id: `prod_${Date.now()}`,
        name: formData.name.trim(),
        category: formData.category,
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        discount: BigInt(parseInt(formData.discount) || 0),
        rating: parseFloat(formData.rating),
        stockQuantity: BigInt(parseInt(formData.stockQuantity)),
        images,
      };

      console.log('📦 Product object constructed:', {
        id: productData.id,
        name: productData.name,
        category: productData.category,
        price: productData.price,
        discount: productData.discount.toString(),
        stockQuantity: productData.stockQuantity.toString(),
        rating: productData.rating,
        imagesCount: productData.images.length,
      });

      console.log('🚀 Calling mutation...');
      await createProductMutation.mutateAsync(productData);
      
      console.log('✅ Mutation successful!');
      toast.success('Product added successfully');
      console.groupEnd();
      
      onClose();
    } catch (error: any) {
      console.error('❌ Submission error:', error);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      const errorMsg = error.message || 'Failed to save product. Please try again.';
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
      console.groupEnd();
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Product (Not Available)' : 'Add New Product'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {errorMessage}
            </div>
          )}

          {isEditing && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
              Edit functionality is not yet available. Please create a new product instead.
            </div>
          )}

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Product Image *</Label>
            <div className="flex items-center gap-4">
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded border" />
              )}
              <div className="flex-1">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="cursor-pointer"
                  disabled={isEditing}
                />
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{uploadProgress}% uploaded</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter product name"
              required
              disabled={isEditing}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData({ ...formData, category: value })}
              disabled={isEditing}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price and Discount */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
                required
                disabled={isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="discount">Discount (%)</Label>
              <Input
                id="discount"
                type="number"
                min="0"
                max="100"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                placeholder="0"
                disabled={isEditing}
              />
            </div>
          </div>

          {/* Stock Quantity */}
          <div className="space-y-2">
            <Label htmlFor="stock">Stock Quantity *</Label>
            <Input
              id="stock"
              type="number"
              min="0"
              value={formData.stockQuantity}
              onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
              placeholder="0"
              required
              disabled={isEditing}
            />
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <Label htmlFor="rating">Rating (0-5)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                className="w-24"
                disabled={isEditing}
              />
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= parseFloat(formData.rating || '0')
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter product description"
              rows={4}
              required
              disabled={isEditing}
            />
          </div>

          {/* Form Actions */}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={createProductMutation.isPending}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={createProductMutation.isPending || isEditing} 
              className="bg-blue-600 hover:bg-blue-700"
            >
              {createProductMutation.isPending ? 'Saving...' : isEditing ? 'Edit Not Available' : 'Add Product'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
