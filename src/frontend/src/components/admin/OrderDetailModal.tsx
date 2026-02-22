import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { useUpdateOrderStatus } from '../../hooks/useQueries';
import { OrderStatus } from '../../backend';
import type { OrderAdminQueries, UserProfile } from '../../backend';
import { toast } from 'sonner';

interface OrderDetailModalProps {
  order: OrderAdminQueries;
  userProfile?: UserProfile;
  onClose: () => void;
}

const STATUS_OPTIONS: OrderStatus[] = [
  OrderStatus.pending,
  OrderStatus.confirmed,
  OrderStatus.shipped,
  OrderStatus.delivered,
  OrderStatus.cancelled
];

export default function OrderDetailModal({ order, userProfile, onClose }: OrderDetailModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(order.status as OrderStatus);
  const updateStatusMutation = useUpdateOrderStatus();

  const handleUpdateStatus = async () => {
    if (selectedStatus === order.status) {
      toast.info('Status is already set to this value');
      return;
    }

    try {
      await updateStatusMutation.mutateAsync({ orderId: order.id, status: selectedStatus });
      toast.success('Order status updated successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to update order status');
      console.error('Update status error:', error);
    }
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateItemTotal = (price: number, discount: bigint, quantity: bigint) => {
    const discountedPrice = price * (1 - Number(discount) / 100);
    return discountedPrice * Number(quantity);
  };

  const orderTotal = order.items.reduce((sum, item) => {
    return sum + calculateItemTotal(item.product.price, item.product.discount, item.quantity);
  }, 0);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Order ID</p>
              <p className="font-mono text-sm font-medium">{order.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Order Date</p>
              <p className="font-medium">{formatDate(order.timestamp)}</p>
            </div>
          </div>

          <Separator />

          {/* Customer Info */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Customer Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{userProfile?.name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{userProfile?.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{userProfile?.phone || 'N/A'}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Delivery Address */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Delivery Address</h3>
            <p className="text-gray-700">{order.deliveryAddress}</p>
          </div>

          <Separator />

          {/* Order Items */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={item.product.images[0]?.getDirectURL() || '/placeholder.png'}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-600">
                      ₹{item.product.price.toFixed(2)} × {Number(item.quantity)}
                      {Number(item.product.discount) > 0 && (
                        <span className="ml-2 text-green-600">
                          ({Number(item.product.discount)}% off)
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ₹{calculateItemTotal(item.product.price, item.product.discount, item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Order Summary */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Payment Method:</span>
              <Badge variant="outline">
                {order.paymentMethod === 'cashOnDelivery' ? 'Cash on Delivery' : 'Online Payment'}
              </Badge>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Payment Status:</span>
              <Badge variant={order.isPaid ? 'default' : 'secondary'}>
                {order.isPaid ? 'Paid' : 'Unpaid'}
              </Badge>
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total Amount:</span>
              <span className="text-2xl font-bold text-blue-600">₹{orderTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Status Update */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Update Order Status</h3>
            <div className="flex items-center gap-4">
              <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as OrderStatus)}>
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map(status => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={handleUpdateStatus}
                disabled={updateStatusMutation.isPending || selectedStatus === order.status}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {updateStatusMutation.isPending ? 'Updating...' : 'Update Status'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
