import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Package, ShoppingBag, Users, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import ProductsManagement from '../components/admin/ProductsManagement';
import OrdersManagement from '../components/admin/OrdersManagement';
import UsersManagement from '../components/admin/UsersManagement';
import { useGetAllProductsAdmin, useGetAllOrdersAdmin, useGetAllUsers } from '../hooks/useQueries';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('products');
  const { data: products = [], isLoading: productsLoading } = useGetAllProductsAdmin();
  const { data: orders = [], isLoading: ordersLoading } = useGetAllOrdersAdmin();
  const { data: users = [], isLoading: usersLoading } = useGetAllUsers();

  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const totalRevenue = orders.reduce((sum, order) => {
    const orderTotal = order.items.reduce((itemSum, item) => {
      const price = item.product.price * (1 - Number(item.product.discount) / 100);
      return itemSum + price * Number(item.quantity);
    }, 0);
    return sum + orderTotal;
  }, 0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your StudyNeeds store</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <img src="/assets/generated/admin-products-icon.dim_128x128.png" alt="Products" className="w-8 h-8" />
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Total Products</h3>
            <p className="text-3xl font-bold text-gray-900">
              {productsLoading ? '...' : products.length}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <img src="/assets/generated/admin-orders-icon.dim_128x128.png" alt="Orders" className="w-8 h-8" />
              </div>
              <ShoppingBag className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Total Orders</h3>
            <p className="text-3xl font-bold text-gray-900">
              {ordersLoading ? '...' : orders.length}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <ShoppingBag className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Pending Orders</h3>
            <p className="text-3xl font-bold text-gray-900">
              {ordersLoading ? '...' : pendingOrders}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <img src="/assets/generated/admin-users-icon.dim_128x128.png" alt="Users" className="w-8 h-8" />
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Registered Users</h3>
            <p className="text-3xl font-bold text-gray-900">
              {usersLoading ? '...' : users.length}
            </p>
          </div>
        </div>

        {/* Management Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger 
                value="products" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-4"
              >
                <Package className="w-4 h-4 mr-2" />
                Products
              </TabsTrigger>
              <TabsTrigger 
                value="orders"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-4"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Orders
              </TabsTrigger>
              <TabsTrigger 
                value="users"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-4"
              >
                <Users className="w-4 h-4 mr-2" />
                Users
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="p-6">
              <ProductsManagement />
            </TabsContent>

            <TabsContent value="orders" className="p-6">
              <OrdersManagement />
            </TabsContent>

            <TabsContent value="users" className="p-6">
              <UsersManagement />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
