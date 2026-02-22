import { ShoppingBag, GraduationCap, FileText, Briefcase } from 'lucide-react';
import { Button } from './ui/button';

const services = [
  {
    title: 'E-Commerce Store',
    description: 'Shop for books, stationery, bags, and study materials at best prices',
    icon: '/assets/generated/icon-ecommerce.dim_80x80.png',
    action: 'Shop Now',
    available: true,
  },
  {
    title: 'Home Tuition Consultancy',
    description: 'Find verified teachers or register as a tutor for home and online classes',
    icon: ShoppingBag,
    action: 'Coming in Phase 2',
    available: false,
  },
  {
    title: 'Documentation Services',
    description: 'Get help with certificates, forms, applications, and cyber services',
    icon: FileText,
    action: 'Coming in Phase 2',
    available: false,
  },
  {
    title: 'Career Counselling',
    description: 'Expert guidance for course selection, admissions, and career planning',
    icon: Briefcase,
    action: 'Coming Soon',
    available: false,
    badge: 'Coming Soon',
  },
];

export default function ServicesSection() {
  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Our Services</h2>
        <p className="text-gray-600">Complete student solutions under one platform</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <div
            key={service.title}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all relative"
          >
            {service.badge && (
              <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                {service.badge}
              </div>
            )}
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-orange-100 rounded-full flex items-center justify-center mb-4">
              {typeof service.icon === 'string' ? (
                <img src={service.icon} alt={service.title} className="w-10 h-10" />
              ) : (
                <service.icon className="w-8 h-8 text-orange-600" />
              )}
            </div>
            <h3 className="text-lg font-bold mb-2">{service.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{service.description}</p>
            <Button
              disabled={!service.available}
              className={service.available ? 'bg-orange-500 hover:bg-orange-600 w-full' : 'w-full'}
              variant={service.available ? 'default' : 'outline'}
            >
              {service.action}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
