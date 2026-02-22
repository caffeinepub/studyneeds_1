import { useState, useEffect } from 'react';
import { X, Upload, Star } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useAddProduct, useUpdateProduct } from '../../hooks/useQueries';
import type { ProductAdminQueries } from '../../backend';
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
  product: ProductAdminQueries | null;
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

  const addProductMutation = useAddProduct();
  const updateProductMutation = useUpdateProduct();

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
      if (product.images[0]) {
        setImagePreview(product.images[0].getDirectURL());
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

    // Validation
    if (!formData.name || !formData.category || !formData.price || !formData.stockQuantity) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!product && !imageFile) {
      toast.error('Please upload a product image');
      return;
    }

    try {
      let imageBlob: ExternalBlob;

      if (imageFile) {
        const arrayBuffer = await imageFile.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        imageBlob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
          setUploadProgress(percentage);
        });
      } else if (product?.images[0]) {
        imageBlob = product.images[0];
      } else {
        toast.error('No image available');
        return;
      }

      const productData = {
        id: product?.id || `product-${Date.now()}`,
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        discount: BigInt(parseInt(formData.discount) || 0),
        rating: parseFloat(formData.rating),
        images: [imageBlob],
        stockQuantity: BigInt(parseInt(formData.stockQuantity)),
        description: formData.description,
      };

      if (product) {
        await updateProductMutation.mutateAsync(productData);
        toast.success('Product updated successfully');
      } else {
        await addProductMutation.mutateAsync(productData);
        toast.success('Product added successfully');
      }

      onClose();
    } catch (error) {
      toast.error(product ? 'Failed to update product' : 'Failed to add product');
      console.error('Submit error:', error);
    }
  };

  const isSubmitting = addProductMutation.isPending || updateProductMutation.isPending;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload */}
          <div>
            <Label>Product Image *</Label>
            <div className="mt-2">
              {imagePreview ? (
                <div className="relative w-full h-48 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview('');
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Click to upload image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Uploading: {uploadProgress}%</p>
                </div>
              )}
            </div>
          </div>

          {/* Name */}
          <div>
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter product description"
              rows={3}
            />
          </div>

          {/* Price and Discount */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price (₹) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <Label htmlFor="discount">Discount (%)</Label>
              <Input
                id="discount"
                type="number"
                min="0"
                max="100"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                placeholder="0"
              />
            </div>
          </div>

          {/* Rating and Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="rating">Rating (1-5)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="rating"
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              </div>
            </div>
            <div>
              <Label htmlFor="stock">Stock Quantity *</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={formData.stockQuantity}
                onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                placeholder="0"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
              {isSubmitting ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
