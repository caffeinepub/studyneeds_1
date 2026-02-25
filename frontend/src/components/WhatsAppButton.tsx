import { SiWhatsapp } from 'react-icons/si';

export default function WhatsAppButton() {
  const phoneNumber = '919102171138';
  const message = encodeURIComponent('Hi! I need help with StudyNeeds Documentation & Cyber Services.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
      aria-label="Chat on WhatsApp"
    >
      <SiWhatsapp className="w-6 h-6" />
      <span className="text-sm font-semibold hidden sm:inline">WhatsApp Us</span>
    </a>
  );
}
