import { Star, Quote } from 'lucide-react';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Student',
    rating: 5,
    text: 'StudyNeeds has everything I need for my studies. Great quality products at affordable prices!',
  },
  {
    name: 'Rajesh Kumar',
    role: 'Parent',
    rating: 5,
    text: 'Found an excellent tutor for my daughter through this platform. Very satisfied with the service.',
  },
  {
    name: 'Anita Desai',
    role: 'Student',
    rating: 5,
    text: 'The documentation service saved me so much time. Highly recommend StudyNeeds!',
  },
  {
    name: 'Vikram Singh',
    role: 'Parent',
    rating: 5,
    text: 'One-stop solution for all student needs. Fast delivery and excellent customer support.',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl text-white">
      <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
      <div className="relative max-w-3xl mx-auto px-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
          <Quote className="w-12 h-12 text-orange-400 mb-4" />
          <p className="text-lg mb-6">{testimonials[current].text}</p>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="font-bold text-lg">{testimonials[current].name}</p>
              <p className="text-blue-200">{testimonials[current].role}</p>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={prev}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
