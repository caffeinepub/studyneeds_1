import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  { image: '/assets/generated/banner-back-to-school.dim_1200x400.png', alt: 'Back to School Sale' },
  { image: '/assets/generated/banner-exam-books.dim_1200x400.png', alt: 'Competitive Exam Books' },
  { image: '/assets/generated/banner-furniture.dim_1200x400.png', alt: 'Study Furniture Deals' },
  { image: '/assets/generated/banner-tuition.dim_1200x400.png', alt: 'Tuition Services' },
  { image: '/assets/generated/banner-documentation.dim_1200x400.png', alt: 'Documentation Services' },
];

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % banners.length);
  const prev = () => setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <div className="relative w-full aspect-[3/1] md:aspect-[3/1] bg-gray-100 rounded-lg overflow-hidden group">
      {banners.map((banner, index) => (
        <img
          key={index}
          src={banner.image}
          alt={banner.alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === current ? 'bg-white w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
