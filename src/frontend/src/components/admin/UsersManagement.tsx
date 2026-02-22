import { useState, useMemo } from 'react';
import { Eye, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import UserDetailModal from './UserDetailModal';
import { useGetAllUsers } from '../../hooks/useQueries';
import type { UserAdminQueries } from '../../backend';

export default function UsersManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserAdminQueries | null>(null);

  const { data: users = [], isLoading } = useGetAllUsers();

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const searchLower = searchQuery.toLowerCase();
      return (
        user.profile.name.toLowerCase().includes(searchLower) ||
        user.profile.email.toLowerCase().includes(searchLower)
      );
    });
  }, [users, searchQuery]);

  const sortedUsers = [...filteredUsers].sort((a, b) => 
    Number(b.registrationDate) - Number(a.registrationDate)
  );

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  if (isLoading) {
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
          <h2 className="text-2xl font-bold text-gray-900">Users Management</h2>
          <p className="text-sm text-gray-600 mt-1">
            Total Registered Users: <span className="font-semibold">{users.length}</span>
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Users Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                sortedUsers.map(user => (
                  <TableRow key={user.principal.toString()}>
                    <TableCell className="font-medium">{user.profile.name}</TableCell>
                    <TableCell>{user.profile.email}</TableCell>
                    <TableCell>{user.profile.phone}</TableCell>
                    <TableCell>{formatDate(user.registrationDate)}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-semibold text-sm">
                        {Number(user.orderCount)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedUser(user)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}
