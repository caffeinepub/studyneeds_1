import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useUpdateDocumentationRequestStatus, useGetDocumentationRequestDocuments } from '../../hooks/useQueries';
import { DocumentationRequestStatus } from '../../backend';
import type { DocumentationRequest } from '../../backend';

interface DocumentationRequestDetailModalProps {
  request: DocumentationRequest;
  onClose: () => void;
}

export default function DocumentationRequestDetailModal({ request, onClose }: DocumentationRequestDetailModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>(request.status);
  const updateStatus = useUpdateDocumentationRequestStatus();
  const { data: documents = [], isLoading: documentsLoading } = useGetDocumentationRequestDocuments(request.id);

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

  const handleStatusUpdate = async () => {
    if (selectedStatus === request.status) return;
    
    await updateStatus.mutateAsync({
      requestId: request.id,
      newStatus: selectedStatus as DocumentationRequestStatus,
    });
  };

  const handleDownloadDocument = (index: number) => {
    const doc = documents[index];
    if (doc) {
      const url = doc.getDirectURL();
      window.open(url, '_blank');
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[oklch(0.22_0.10_260)]">
            Documentation Request Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Request ID</p>
              <p className="font-mono text-sm">{request.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Status</p>
              <div className="flex items-center gap-2">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                {selectedStatus !== request.status && (
                  <Button
                    size="sm"
                    onClick={handleStatusUpdate}
                    disabled={updateStatus.isPending}
                    className="bg-[oklch(0.22_0.10_260)] hover:bg-[oklch(0.18_0.08_260)]"
                  >
                    {updateStatus.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Update'
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold text-lg mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Full Name</p>
                <p className="font-medium">{request.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Mobile Number</p>
                <p className="font-medium">{request.mobileNumber}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold text-lg mb-4">Service Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Service Needed</p>
                <p className="font-medium">{request.serviceNeeded}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Service Mode</p>
                <p className="font-medium">{request.mode}</p>
              </div>
            </div>
          </div>

          {request.message && (
            <div className="border-t pt-4">
              <h3 className="font-semibold text-lg mb-2">Message</h3>
              <p className="text-gray-700 bg-gray-50 p-3 rounded">{request.message}</p>
            </div>
          )}

          <div className="border-t pt-4">
            <h3 className="font-semibold text-lg mb-4">Uploaded Documents</h3>
            {documentsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-[oklch(0.22_0.10_260)]" />
              </div>
            ) : documents.length === 0 ? (
              <p className="text-gray-500 text-sm">No documents uploaded</p>
            ) : (
              <div className="space-y-2">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                    <span className="text-sm font-medium">Document {index + 1}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownloadDocument(index)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t pt-4">
            <p className="text-sm text-gray-600">
              Submitted on: <span className="font-medium">{formatDate(request.timestamp)}</span>
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
