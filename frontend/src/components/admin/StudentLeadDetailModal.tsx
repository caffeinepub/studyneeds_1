import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import type { StudentLead } from '../../backend';

interface StudentLeadDetailModalProps {
  lead: StudentLead;
  onClose: () => void;
}

export default function StudentLeadDetailModal({ lead, onClose }: StudentLeadDetailModalProps) {
  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[oklch(0.22_0.10_260)]">
            Student Lead Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Lead ID</p>
              <p className="font-mono text-sm">{lead.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Status</p>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                lead.status.toLowerCase() === 'pending' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {lead.status}
              </span>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold text-lg mb-4">Student Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Student Name</p>
                <p className="font-medium">{lead.studentName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Class / Course</p>
                <p className="font-medium">{lead.classOrCourse}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Subjects Required</p>
                <p className="font-medium">{lead.subjectsRequired}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Mode</p>
                <p className="font-medium">{lead.mode}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold text-lg mb-4">Contact & Location</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Contact Number</p>
                <p className="font-medium">{lead.contactNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Location / Area</p>
                <p className="font-medium">{lead.location}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold text-lg mb-4">Requirements</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Budget per Month</p>
                <p className="font-medium text-orange-600">₹{Number(lead.budget)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Preferred Time</p>
                <p className="font-medium">{lead.preferredTime || 'Not specified'}</p>
              </div>
            </div>
          </div>

          {lead.additionalNotes && (
            <div className="border-t pt-4">
              <h3 className="font-semibold text-lg mb-2">Additional Notes</h3>
              <p className="text-gray-700 bg-gray-50 p-3 rounded">{lead.additionalNotes}</p>
            </div>
          )}

          <div className="border-t pt-4">
            <p className="text-sm text-gray-600">
              Submitted on: <span className="font-medium">{formatDate(lead.submittedAt)}</span>
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
