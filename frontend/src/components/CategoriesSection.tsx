import { Link } from '@tanstack/react-router';

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

export default function CategoriesSection() {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            to="/shop/$category"
            params={{ category: category.slug }}
            className="flex flex-col items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group"
          >
            <div className="w-16 h-16 flex items-center justify-center bg-blue-50 rounded-full group-hover:bg-orange-50 transition-colors">
              <img src={category.icon} alt={category.name} className="w-10 h-10" />
            </div>
            <span className="text-sm font-medium text-center group-hover:text-blue-600">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
