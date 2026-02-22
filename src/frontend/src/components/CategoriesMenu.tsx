import { Link } from '@tanstack/react-router';
import { X } from 'lucide-react';

interface CategoriesMenuProps {
  onClose: () => void;
}

const categories = [
  { name: 'Books', icon: '/assets/generated/icon-books.dim_64x64.png', slug: 'books' },
  { name: 'Stationery', icon: '/assets/generated/icon-stationery.dim_64x64.png', slug: 'stationery' },
  { name: 'School Bags', icon: '/assets/generated/icon-bags.dim_64x64.png', slug: 'school-bags' },
  { name: 'School Dress', icon: '/assets/generated/icon-dress.dim_64x64.png', slug: 'school-dress' },
  { name: 'Geometry Items', icon: '/assets/generated/icon-geometry.dim_64x64.png', slug: 'geometry' },
  { name: 'Study Furniture', icon: '/assets/generated/icon-furniture.dim_64x64.png', slug: 'furniture' },
  { name: 'Notes & PDFs', icon: '/assets/generated/icon-notes.dim_64x64.png', slug: 'notes' },
  { name: 'Digital Courses', icon: '/assets/generated/icon-courses.dim_64x64.png', slug: 'courses' },
];

export default function CategoriesMenu({ onClose }: CategoriesMenuProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div
        className="absolute top-32 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-xl w-full max-w-3xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Shop by Category</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to="/shop/$category"
              params={{ category: category.slug }}
              onClick={onClose}
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-blue-50 transition-colors group"
            >
              <img src={category.icon} alt={category.name} className="w-12 h-12" />
              <span className="text-sm font-medium text-center group-hover:text-blue-600">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
