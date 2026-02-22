import { useState, useMemo } from 'react';
import { Eye, Filter } from 'lucide-react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import OrderDetailModal from './OrderDetailModal';
import { useGetAllOrdersAdmin, useGetAllUsers } from '../../hooks/useQueries';
import type { OrderAdminQueries } from '../../backend';

const ORDER_STATUS_OPTIONS = ['All Status', 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

export default function OrdersManagement() {
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedOrder, setSelectedOrder] = useState<OrderAdminQueries | null>(null);

  const { data: orders = [], isLoading: ordersLoading } = useGetAllOrdersAdmin();
  const { data: users = [], isLoading: usersLoading } = useGetAllUsers();

  const userMap = useMemo(() => {
    const map = new Map();
    users.forEach(user => {
      map.set(user.principal.toString(), user.profile);
    });
    return map;
  }, [users]);

  const filteredOrders = orders.filter(order => {
    if (selectedStatus === 'All Status') return true;
    return order.status === selectedStatus;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => 
    Number(b.timestamp) - Number(a.timestamp)
  );

  const totalRevenue = orders.reduce((sum, order) => {
    const orderTotal = order.items.reduce((itemSum, item) => {
      const price = item.product.price * (1 - Number(item.product.discount) / 100);
      return itemSum + price * Number(item.quantity);
    }, 0);
    return sum + orderTotal;
  }, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateOrderTotal = (order: OrderAdminQueries) => {
    return order.items.reduce((sum, item) => {
      const price = item.product.price * (1 - Number(item.product.discount) / 100);
      return sum + price * Number(item.quantity);
    }, 0);
  };

  if (ordersLoading || usersLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Orders Management</h2>
          <p className="text-sm text-gray-600 mt-1">
            Total Revenue: <span className="font-semibold text-green-600">₹{totalRevenue.toFixed(2)}</span>
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <Filter className="w-4 h-4 text-gray-500" />
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            {ORDER_STATUS_OPTIONS.map(status => (
              <SelectItem key={status} value={status}>
                {status === 'All Status' ? status : status.charAt(0).toUpperCase() + status.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                sortedOrders.map(order => {
                  const userProfile = userMap.get(order.userId.toString());
                  return (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono text-sm">{order.id.slice(0, 12)}...</TableCell>
                      <TableCell>{userProfile?.name || 'Unknown'}</TableCell>
                      <TableCell className="text-sm">{formatDate(order.timestamp)}</TableCell>
                      <TableCell>{order.items.length}</TableCell>
                      <TableCell className="font-semibold">₹{calculateOrderTotal(order).toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {order.paymentMethod === 'cashOnDelivery' ? 'COD' : 'Online'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          userProfile={userMap.get(selectedOrder.userId.toString())}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
