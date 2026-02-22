import { useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { useGetAllOrdersAdmin } from '../../hooks/useQueries';
import type { UserAdminQueries } from '../../backend';

interface UserDetailModalProps {
  user: UserAdminQueries;
  onClose: () => void;
}

export default function UserDetailModal({ user, onClose }: UserDetailModalProps) {
  const { data: allOrders = [] } = useGetAllOrdersAdmin();

  const userOrders = useMemo(() => {
    return allOrders
      .filter(order => order.userId.toString() === user.principal.toString())
      .sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
  }, [allOrders, user.principal]);

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

  const calculateOrderTotal = (order: typeof userOrders[0]) => {
    return order.items.reduce((sum, item) => {
      const price = item.product.price * (1 - Number(item.product.discount) / 100);
      return sum + price * Number(item.quantity);
    }, 0);
  };

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

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Profile */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Profile Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{user.profile.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{user.profile.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{user.profile.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Registration Date</p>
                <p className="font-medium">{formatDate(user.registrationDate)}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-medium">{user.profile.address}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Order Statistics */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">Total Orders:</span>
              <span className="text-2xl font-bold text-blue-600">{Number(user.orderCount)}</span>
            </div>
          </div>

          <Separator />

          {/* Order History */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Order History</h3>
            {userOrders.length === 0 ? (
              <p className="text-center py-8 text-gray-500">No orders yet</p>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userOrders.map(order => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono text-sm">{order.id.slice(0, 12)}...</TableCell>
                        <TableCell className="text-sm">{formatDate(order.timestamp)}</TableCell>
                        <TableCell>{order.items.length}</TableCell>
                        <TableCell className="font-semibold">₹{calculateOrderTotal(order).toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
