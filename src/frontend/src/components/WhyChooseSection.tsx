import { Shield, DollarSign, MapPin, CheckCircle, Truck } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Trusted Platform',
    description: 'Verified products and services',
  },
  {
    icon: DollarSign,
    title: 'Affordable Pricing',
    description: 'Best deals and discounts',
  },
  {
    icon: MapPin,
    title: 'Local Support',
    description: 'Available in your city',
  },
  {
    icon: CheckCircle,
    title: 'Verified Teachers',
    description: 'Background checked tutors',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick and reliable shipping',
  },
];

export default function WhyChooseSection() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Why Choose StudyNeeds?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {features.map((feature) => (
          <div key={feature.title} className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <feature.icon className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
