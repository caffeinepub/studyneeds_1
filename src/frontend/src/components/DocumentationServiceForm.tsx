import { useState } from 'react';
import { Upload, Loader2, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useCreateDocumentationRequest } from '../hooks/useQueries';
import { ExternalBlob } from '../backend';
import { toast } from 'sonner';

export default function DocumentationServiceForm() {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [serviceNeeded, setServiceNeeded] = useState('');
  const [mode, setMode] = useState('');
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const createRequest = useCreateDocumentationRequest();

  const serviceOptions = [
    'Caste Certificate',
    'Income Certificate',
    'Residence Certificate',
    'Birth Certificate',
    'E-Shram Card',
    'Labour Card',
    'Ayushman Card',
    'Ration Card Assistance',
    'PAN Card Apply / Correction',
    'Aadhaar Update Guidance',
    'Voter ID Apply',
    'Passport Assistance',
    'PVC Card Printing',
    'Government Job Forms',
    'Admit Card Download',
    'Result Download',
    'Scholarship Forms',
    'College Admission Forms',
    'Online Counselling Registration',
    'Train / Bus / Flight Ticket Booking',
    'Electricity Bill Payment',
    'Mobile Recharge',
    'Resume / CV Making',
    'Online Applications',
    'Print / Scan / Lamination',
    'Passport Photo',
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!fullName.trim()) {
      toast.error('Please enter your full name');
      return;
    }
    if (!mobileNumber.trim() || !/^\d{10}$/.test(mobileNumber)) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!serviceNeeded) {
      toast.error('Please select a service');
      return;
    }
    if (!mode) {
      toast.error('Please select a service mode');
      return;
    }

    try {
      // Convert files to ExternalBlob array
      const uploadedDocuments: ExternalBlob[] = [];
      
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const blob = ExternalBlob.fromBytes(uint8Array);
        uploadedDocuments.push(blob);
      }

      // Submit the request
      await createRequest.mutateAsync({
        fullName,
        mobileNumber,
        serviceNeeded,
        mode,
        uploadedDocuments,
        message: message || '',
      });

      // Show success message
      setShowSuccess(true);

      // Reset form
      setFullName('');
      setMobileNumber('');
      setServiceNeeded('');
      setMode('');
      setMessage('');
      setFiles([]);
      
      // Reset file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);

    } catch (error: any) {
      console.error('Form submission error:', error);
      toast.error(error.message || 'Failed to submit request');
    }
  };

  if (showSuccess) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-[oklch(0.22_0.10_260)] mb-4">Request Submitted Successfully!</h3>
        <p className="text-lg text-gray-600 mb-6">Our team will contact you shortly.</p>
        <Button 
          onClick={() => setShowSuccess(false)}
          className="bg-[oklch(0.22_0.10_260)] hover:bg-[oklch(0.18_0.08_260)]"
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name *</Label>
        <Input
          id="fullName"
          type="text"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="mobileNumber">Mobile Number *</Label>
        <Input
          id="mobileNumber"
          type="tel"
          placeholder="Enter 10-digit mobile number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          maxLength={10}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="serviceNeeded">Service Needed *</Label>
        <Select value={serviceNeeded} onValueChange={setServiceNeeded} required>
          <SelectTrigger>
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {serviceOptions.map((service) => (
              <SelectItem key={service} value={service}>
                {service}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Mode *</Label>
        <div className="flex gap-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="mode"
              value="Online Service"
              checked={mode === 'Online Service'}
              onChange={(e) => setMode(e.target.value)}
              className="w-4 h-4 text-[oklch(0.22_0.10_260)]"
              required
            />
            <span>Online Service</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="mode"
              value="Visit Centre"
              checked={mode === 'Visit Centre'}
              onChange={(e) => setMode(e.target.value)}
              className="w-4 h-4 text-[oklch(0.22_0.10_260)]"
              required
            />
            <span>Visit Centre</span>
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="file-upload">Upload Documents (Optional)</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[oklch(0.22_0.10_260)] transition-colors">
          <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <Input
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <span className="text-[oklch(0.22_0.10_260)] font-medium hover:underline">
              Click to upload
            </span>
            <span className="text-gray-600"> or drag and drop</span>
          </label>
          <p className="text-sm text-gray-500 mt-1">PDF, JPG, PNG, DOC (max 10MB each)</p>
          {files.length > 0 && (
            <div className="mt-3 text-left">
              <p className="text-sm font-medium text-gray-700 mb-1">Selected files:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                {files.map((file, index) => (
                  <li key={index} className="truncate">• {file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message (Optional)</Label>
        <Textarea
          id="message"
          placeholder="Any additional information or requirements..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-6"
        disabled={createRequest.isPending}
      >
        {createRequest.isPending ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Request'
        )}
      </Button>
    </form>
  );
}
