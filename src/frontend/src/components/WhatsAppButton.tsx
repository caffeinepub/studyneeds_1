import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = '919876543210';
  const message = encodeURIComponent('Hi! I need help with StudyNeeds.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
