import { X, MapPin } from 'lucide-react';
import { useState } from 'react';

interface LocationSelectorProps {
  onClose: () => void;
}

const INDIAN_CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai',
  'Kolkata', 'Pune', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur',
  'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad',
  'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik'
];

export default function LocationSelector({ onClose }: LocationSelectorProps) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Select Delivery Location</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Cities Grid */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {INDIAN_CITIES.map((city) => (
              <button
                key={city}
                onClick={() => handleCitySelect(city)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                  selectedCity === city
                    ? 'border-[oklch(0.22_0.10_260)] bg-[oklch(0.22_0.10_260)]/10 text-[oklch(0.22_0.10_260)]'
                    : 'border-gray-200 hover:border-[oklch(0.22_0.10_260)] hover:bg-gray-50'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span className="font-medium text-sm">{city}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
