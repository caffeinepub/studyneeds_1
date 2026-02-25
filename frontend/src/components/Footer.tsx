import { SiFacebook, SiX, SiInstagram, SiLinkedin, SiYoutube } from 'react-icons/si';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(window.location.hostname || 'studyneeds');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">About StudyNeeds</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-orange-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Seller Registration</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Press</a></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-lg font-bold mb-4">Policies</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Return Policy</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Shipping Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-orange-400" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Visit Us</p>
                  <span>Kajichak Dhelbagosain Road,<br />Barh, Patna, Bihar - 803213</span>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 shrink-0 text-orange-400" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Call Now</p>
                  <a href="tel:9102171138" className="hover:text-orange-400 transition-colors font-medium">
                    +91 91021 71138
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 shrink-0 text-orange-400" />
                <span>support@studyneeds.com</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                <SiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                <SiX className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                <SiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                <SiLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                <SiYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4 text-sm">
              Subscribe to get updates on new products and exclusive offers!
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-gray-400 text-sm">
          <p className="mb-2">
            © {currentYear} StudyNeeds. All rights reserved.
          </p>
          <p className="flex items-center justify-center gap-1">
            Built with <Heart className="w-4 h-4 text-red-500 fill-current" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
