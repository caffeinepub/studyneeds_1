import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import type { TeacherRegistration } from '../../backend';

interface TeacherRegistrationDetailModalProps {
  registration: TeacherRegistration;
  onClose: () => void;
}

export default function TeacherRegistrationDetailModal({ registration, onClose }: TeacherRegistrationDetailModalProps) {
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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[oklch(0.22_0.10_260)]">
            Teacher Registration Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Registration ID</p>
              <p className="font-mono text-sm">{registration.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Status</p>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                registration.status.toLowerCase() === 'pending' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : registration.status.toLowerCase() === 'approved'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {registration.status}
              </span>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold text-lg mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Full Name</p>
                <p className="font-medium">{registration.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Mobile Number</p>
                <p className="font-medium">{registration.mobileNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="font-medium">{registration.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Location</p>
                <p className="font-medium">{registration.location}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold text-lg mb-4">Professional Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Qualification</p>
                <p className="font-medium">{registration.qualification}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Experience</p>
                <p className="font-medium">{Number(registration.experienceYears)} years</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Subjects Teach</p>
                <p className="font-medium">{registration.subjectsTeach}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Classes Teach</p>
                <p className="font-medium">{registration.classesTeach}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Mode</p>
                <p className="font-medium">{registration.mode}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Expected Fees</p>
                <p className="font-medium text-orange-600">₹{Number(registration.expectedFees)}/month</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold text-lg mb-4">Documents</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Photo</p>
                <img 
                  src={registration.photoUrl} 
                  alt="Teacher Photo" 
                  className="w-32 h-32 object-cover rounded-lg border"
                />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">ID Proof</p>
                {registration.idProofUrl.endsWith('.pdf') ? (
                  <a 
                    href={registration.idProofUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-[oklch(0.22_0.10_260)] text-white rounded hover:bg-[oklch(0.18_0.08_260)]"
                  >
                    View PDF
                  </a>
                ) : (
                  <img 
                    src={registration.idProofUrl} 
                    alt="ID Proof" 
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm text-gray-600">
              Submitted on: <span className="font-medium">{formatDate(registration.submittedAt)}</span>
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
