import { X } from 'lucide-react';
import { Link } from '@tanstack/react-router';

interface CategoriesMenuProps {
  onClose: () => void;
}

const CATEGORIES = [
  { name: 'Stationery', icon: '/assets/generated/icon-stationery.dim_64x64.png' },
  { name: 'Books', icon: '/assets/generated/icon-books.dim_64x64.png' },
  { name: 'School Bags', icon: '/assets/generated/icon-bags.dim_64x64.png' },
  { name: 'Pens & Geometry', icon: '/assets/generated/icon-geometry.dim_64x64.png' },
  { name: 'Notes & Guides', icon: '/assets/generated/icon-notes.dim_64x64.png' },
  { name: 'Courses', icon: '/assets/generated/icon-courses.dim_64x64.png' },
  { name: 'Dress & Uniform', icon: '/assets/generated/icon-dress.dim_64x64.png' },
  { name: 'Furniture', icon: '/assets/generated/icon-furniture.dim_64x64.png' },
];

export default function CategoriesMenu({ onClose }: CategoriesMenuProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl z-50 w-full max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">All Categories</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.name}
              to="/shop/$category"
              params={{ category: category.name }}
              onClick={onClose}
              className="flex flex-col items-center gap-3 p-4 rounded-lg border-2 border-gray-200 hover:border-[oklch(0.22_0.10_260)] hover:bg-[oklch(0.22_0.10_260)]/5 transition-all group"
            >
              <img
                src={category.icon}
                alt={category.name}
                className="w-16 h-16 object-contain"
              />
              <span className="text-sm font-medium text-gray-700 group-hover:text-[oklch(0.22_0.10_260)] text-center">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
