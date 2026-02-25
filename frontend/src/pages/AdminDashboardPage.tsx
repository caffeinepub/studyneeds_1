import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Package, ShoppingBag, Users, ArrowLeft, GraduationCap, UserCheck, FileText } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import ProductsManagement from '../components/admin/ProductsManagement';
import OrdersManagement from '../components/admin/OrdersManagement';
import UsersManagement from '../components/admin/UsersManagement';
import TuitionLeadsManagement from '../components/admin/TuitionLeadsManagement';
import TeacherRegistrationsManagement from '../components/admin/TeacherRegistrationsManagement';
import DocumentationRequestsManagement from '../components/admin/DocumentationRequestsManagement';
import { useGetAllProducts, useGetAllStudentLeads, useGetAllTeacherRegistrations, useGetDocumentationRequests } from '../hooks/useQueries';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('products');
  const { data: products = [], isLoading: productsLoading } = useGetAllProducts();
  const { data: studentLeads = [], isLoading: leadsLoading } = useGetAllStudentLeads();
  const { data: teacherRegistrations = [], isLoading: registrationsLoading } = useGetAllTeacherRegistrations();
  const { data: documentationRequests = [], isLoading: documentationLoading } = useGetDocumentationRequests();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-[oklch(0.22_0.10_260)] hover:text-[oklch(0.18_0.08_260)] mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your StudyNeeds store</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-[oklch(0.22_0.10_260)]" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {productsLoading ? '...' : products.length}
            </p>
            <p className="text-sm text-gray-600">Total Products</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">0</p>
            <p className="text-sm text-gray-600">Total Orders</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">0</p>
            <p className="text-sm text-gray-600">Total Users</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {leadsLoading ? '...' : studentLeads.length}
            </p>
            <p className="text-sm text-gray-600">Student Leads</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {registrationsLoading ? '...' : teacherRegistrations.length}
            </p>
            <p className="text-sm text-gray-600">Teacher Registrations</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-cyan-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {documentationLoading ? '...' : documentationRequests.length}
            </p>
            <p className="text-sm text-gray-600">Documentation Requests</p>
          </div>
        </div>

        {/* Management Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger 
                value="products" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[oklch(0.22_0.10_260)] data-[state=active]:bg-transparent px-6 py-4"
              >
                Products
              </TabsTrigger>
              <TabsTrigger 
                value="orders" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[oklch(0.22_0.10_260)] data-[state=active]:bg-transparent px-6 py-4"
              >
                Orders
              </TabsTrigger>
              <TabsTrigger 
                value="users" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[oklch(0.22_0.10_260)] data-[state=active]:bg-transparent px-6 py-4"
              >
                Users
              </TabsTrigger>
              <TabsTrigger 
                value="tuition-leads" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[oklch(0.22_0.10_260)] data-[state=active]:bg-transparent px-6 py-4"
              >
                Tuition Leads
              </TabsTrigger>
              <TabsTrigger 
                value="teacher-registrations" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[oklch(0.22_0.10_260)] data-[state=active]:bg-transparent px-6 py-4"
              >
                Teacher Registrations
              </TabsTrigger>
              <TabsTrigger 
                value="documentation-requests" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[oklch(0.22_0.10_260)] data-[state=active]:bg-transparent px-6 py-4"
              >
                Documentation Requests
              </TabsTrigger>
            </TabsList>

            <div className="p-6">
              <TabsContent value="products" className="mt-0">
                <ProductsManagement />
              </TabsContent>

              <TabsContent value="orders" className="mt-0">
                <OrdersManagement />
              </TabsContent>

              <TabsContent value="users" className="mt-0">
                <UsersManagement />
              </TabsContent>

              <TabsContent value="tuition-leads" className="mt-0">
                <TuitionLeadsManagement />
              </TabsContent>

              <TabsContent value="teacher-registrations" className="mt-0">
                <TeacherRegistrationsManagement />
              </TabsContent>

              <TabsContent value="documentation-requests" className="mt-0">
                <DocumentationRequestsManagement />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
