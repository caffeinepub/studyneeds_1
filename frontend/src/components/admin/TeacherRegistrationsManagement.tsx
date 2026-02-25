import { useState } from 'react';
import { Search, Eye } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Skeleton } from '../ui/skeleton';
import { useGetAllTeacherRegistrations } from '../../hooks/useQueries';
import TeacherRegistrationDetailModal from './TeacherRegistrationDetailModal';
import type { TeacherRegistration } from '../../backend';

export default function TeacherRegistrationsManagement() {
  const { data: registrations = [], isLoading } = useGetAllTeacherRegistrations();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegistration, setSelectedRegistration] = useState<TeacherRegistration | null>(null);

  const filteredRegistrations = registrations.filter((reg) =>
    reg.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.subjectsTeach.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Teacher Registrations</h2>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search registrations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {filteredRegistrations.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No teacher registrations found</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Registration ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Qualification</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Fees</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRegistrations.map((reg) => (
                <TableRow key={reg.id}>
                  <TableCell className="font-mono text-xs">{reg.id.slice(-8)}</TableCell>
                  <TableCell className="font-medium">{reg.fullName}</TableCell>
                  <TableCell className="max-w-[120px] truncate">{reg.qualification}</TableCell>
                  <TableCell className="max-w-[150px] truncate">{reg.subjectsTeach}</TableCell>
                  <TableCell>{Number(reg.experienceYears)} years</TableCell>
                  <TableCell>{reg.mode}</TableCell>
                  <TableCell>{reg.location}</TableCell>
                  <TableCell className="font-semibold">₹{Number(reg.expectedFees)}</TableCell>
                  <TableCell>{reg.mobileNumber}</TableCell>
                  <TableCell>{formatDate(reg.submittedAt)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reg.status)}`}>
                      {reg.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedRegistration(reg)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {selectedRegistration && (
        <TeacherRegistrationDetailModal
          registration={selectedRegistration}
          onClose={() => setSelectedRegistration(null)}
        />
      )}
    </div>
  );
}
