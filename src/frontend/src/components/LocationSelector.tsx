import { MapPin, X } from 'lucide-react';
import { useState } from 'react';

interface LocationSelectorProps {
  onClose: () => void;
}

const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata',
  'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur'
];

export default function LocationSelector({ onClose }: LocationSelectorProps) {
  const [selectedCity, setSelectedCity] = useState('Mumbai');

  const handleSelect = (city: string) => {
    setSelectedCity(city);
    setTimeout(onClose, 200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            Select Your Location
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => handleSelect(city)}
              className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                selectedCity === city
                  ? 'border-blue-600 bg-blue-50 text-blue-600 font-medium'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
