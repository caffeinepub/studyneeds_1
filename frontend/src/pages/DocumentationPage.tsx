import { Link } from '@tanstack/react-router';
import { 
  FileText, 
  CheckCircle, 
  Shield, 
  Clock, 
  Home, 
  Building2, 
  Phone, 
  MessageCircle,
  CreditCard,
  IdCard,
  GraduationCap,
  Printer,
  MapPin,
  Lock,
  Users,
  Zap,
  Award,
  IndianRupee
} from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import DocumentationServiceForm from '../components/DocumentationServiceForm';

export default function DocumentationPage() {
  const whatsappNumber = '919102171138';
  const phoneNumber = '9102171138';
  const businessAddress = 'Kajichak Dhelbagosain Road, Barh, Patna, Bihar - 803213';
  const whatsappMessage = encodeURIComponent('Hello, I want documentation service from StudyNeeds');

  const scrollToForm = () => {
    const formElement = document.getElementById('service-request-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[oklch(0.22_0.10_260)] to-[oklch(0.18_0.08_260)] text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Online Documentation & Cyber Services
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Apply for government documents, exam forms, and digital services from home or visit our center for assistance.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Button 
                  size="lg" 
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={scrollToForm}
                >
                  Apply Online
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white text-[oklch(0.22_0.10_260)] hover:bg-gray-100 border-white"
                  asChild
                >
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(businessAddress)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    Visit Our Centre
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  asChild
                >
                  <a href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
                    <SiWhatsapp className="w-5 h-5 mr-2" />
                    Chat on WhatsApp
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/40"
                  asChild
                >
                  <a href={`tel:${phoneNumber}`}>
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now: {phoneNumber}
                  </a>
                </Button>
              </div>

              {/* Address Banner */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5 mb-10 text-sm">
                <MapPin className="w-4 h-4 text-orange-300 shrink-0" />
                <span className="text-blue-100">{businessAddress}</span>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Zap className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                  <h3 className="font-semibold">Fast Service</h3>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                  <h3 className="font-semibold">Secure Documents</h3>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                  <h3 className="font-semibold">Trusted Support</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[oklch(0.22_0.10_260)]">Our Services</h2>
              <p className="text-gray-600 text-lg">Complete documentation and cyber solutions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {/* Government Certificate Services */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <FileText className="w-7 h-7 text-[oklch(0.22_0.10_260)]" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-[oklch(0.22_0.10_260)]">Government Certificates</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600 shrink-0" />
                    <span>Caste Certificate</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600 shrink-0" />
                    <span>Income Certificate</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600 shrink-0" />
                    <span>Residence Certificate</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600 shrink-0" />
                    <span>Birth Certificate</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600 shrink-0" />
                    <span>E-Shram Card</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600 shrink-0" />
                    <span>Labour Card</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600 shrink-0" />
                    <span>Ayushman Card</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600 shrink-0" />
                    <span>Ration Card Assistance</span>
                  </li>
                </ul>
              </div>

              {/* ID & Personal Documents */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <IdCard className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-[oklch(0.22_0.10_260)]">ID & Personal Documents</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600 shrink-0" />
                    <span>PAN Card Apply / Correction</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600 shrink-0" />
                    <span>Aadhaar Update Guidance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600 shrink-0" />
                    <span>Voter ID Apply</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600 shrink-0" />
                    <span>Passport Assistance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600 shrink-0" />
                    <span>PVC Card Printing</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm text-orange-800 font-medium">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Aadhaar Biometric Service requires centre visit
                  </p>
                </div>
              </div>

              {/* Job, Exam & Education */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <GraduationCap className="w-7 h-7 text-[oklch(0.22_0.10_260)]" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-[oklch(0.22_0.10_260)]">Job, Exam & Education</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600 shrink-0" />
                    <span>Government Job Forms</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600 shrink-0" />
                    <span>Admit Card Download</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600 shrink-0" />
                    <span>Result Download</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600 shrink-0" />
                    <span>Scholarship Forms</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600 shrink-0" />
                    <span>College Admission Forms</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600 shrink-0" />
                    <span>Online Counselling Registration</span>
                  </li>
                </ul>
              </div>

              {/* Cyber Cafe & Utility */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Printer className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-[oklch(0.22_0.10_260)]">Cyber Cafe & Utility</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600 shrink-0" />
                    <span>Train / Bus / Flight Tickets</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600 shrink-0" />
                    <span>Electricity Bill Payment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600 shrink-0" />
                    <span>Mobile Recharge</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600 shrink-0" />
                    <span>Resume / CV Making</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600 shrink-0" />
                    <span>Online Applications</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600 shrink-0" />
                    <span>Print / Scan / Lamination</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600 shrink-0" />
                    <span>Passport Photo</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Online vs Centre Visit Comparison */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[oklch(0.22_0.10_260)]">Service Availability</h2>
              <p className="text-gray-600 text-lg">Choose what works best for you</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Online Services */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 shadow-md">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[oklch(0.22_0.10_260)]">Services From Home</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-green-600 shrink-0" />
                    <span className="text-gray-700">PAN Card Apply</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-green-600 shrink-0" />
                    <span className="text-gray-700">Certificate Applications</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-green-600 shrink-0" />
                    <span className="text-gray-700">Government Job Forms</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-green-600 shrink-0" />
                    <span className="text-gray-700">Scholarship Forms</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-green-600 shrink-0" />
                    <span className="text-gray-700">Admit Card Download</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-green-600 shrink-0" />
                    <span className="text-gray-700">Result Check</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-green-600 shrink-0" />
                    <span className="text-gray-700">Bill Payment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-green-600 shrink-0" />
                    <span className="text-gray-700">Resume Making</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-green-600 shrink-0" />
                    <span className="text-gray-700">Ticket Booking</span>
                  </li>
                </ul>
              </div>

              {/* Centre Visit Required */}
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-8 shadow-md">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[oklch(0.22_0.10_260)]">Centre Visit Required</h3>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 mt-0.5 text-orange-600 shrink-0" />
                    <span className="text-gray-700">Aadhaar Biometric Update</span>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 mt-0.5 text-orange-600 shrink-0" />
                    <span className="text-gray-700">Passport Size Photo</span>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 mt-0.5 text-orange-600 shrink-0" />
                    <span className="text-gray-700">Document Scanning</span>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 mt-0.5 text-orange-600 shrink-0" />
                    <span className="text-gray-700">PVC Card Printing</span>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 mt-0.5 text-orange-600 shrink-0" />
                    <span className="text-gray-700">Lamination Services</span>
                  </li>
                </ul>
                {/* Address Card */}
                <div className="bg-white rounded-lg p-4 border border-orange-200 shadow-sm">
                  <p className="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-2">Our Centre Address</p>
                  <p className="text-gray-800 font-medium text-sm leading-relaxed">{businessAddress}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(businessAddress)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm text-orange-600 hover:text-orange-700 font-medium"
                  >
                    <MapPin className="w-4 h-4" />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[oklch(0.22_0.10_260)]">Service Charges</h2>
              <p className="text-gray-600 text-lg">Transparent and affordable pricing</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <FileText className="w-5 h-5 text-[oklch(0.22_0.10_260)]" />
                  </div>
                  <h3 className="font-bold text-[oklch(0.22_0.10_260)]">Government Certificates</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Caste / Income / Residence</span>
                    <span className="font-semibold text-green-700">₹50 - ₹100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Birth Certificate</span>
                    <span className="font-semibold text-green-700">₹50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>E-Shram / Labour Card</span>
                    <span className="font-semibold text-green-700">₹50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ayushman Card</span>
                    <span className="font-semibold text-green-700">₹50</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                    <IdCard className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="font-bold text-[oklch(0.22_0.10_260)]">ID Documents</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>PAN Card Apply</span>
                    <span className="font-semibold text-green-700">₹100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Voter ID Apply</span>
                    <span className="font-semibold text-green-700">₹50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Passport Assistance</span>
                    <span className="font-semibold text-green-700">₹200</span>
                  </div>
                  <div className="flex justify-between">
                    <span>PVC Card Printing</span>
                    <span className="font-semibold text-green-700">₹100</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <Printer className="w-5 h-5 text-[oklch(0.22_0.10_260)]" />
                  </div>
                  <h3 className="font-bold text-[oklch(0.22_0.10_260)]">Cyber Cafe Services</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Print (per page)</span>
                    <span className="font-semibold text-green-700">₹5 - ₹10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Scan (per page)</span>
                    <span className="font-semibold text-green-700">₹10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Passport Photo</span>
                    <span className="font-semibold text-green-700">₹50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Resume Making</span>
                    <span className="font-semibold text-green-700">₹100 - ₹200</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-gray-500 text-sm">
              * Prices may vary based on complexity. Contact us for exact pricing.
            </p>
          </div>
        </section>

        {/* Service Request Form */}
        <section id="service-request-form" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[oklch(0.22_0.10_260)]">Request a Service</h2>
              <p className="text-gray-600 text-lg">Fill in the form below and we'll get back to you shortly</p>
            </div>
            <DocumentationServiceForm />
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[oklch(0.22_0.10_260)]">How It Works</h2>
              <p className="text-gray-600 text-lg">Simple 3-step process</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-[oklch(0.22_0.10_260)] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2 text-[oklch(0.22_0.10_260)]">Submit Request</h3>
                <p className="text-gray-600">Fill the online form or call us / WhatsApp us with your requirement</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2 text-[oklch(0.22_0.10_260)]">We Process</h3>
                <p className="text-gray-600">Our team processes your request and keeps you updated</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2 text-[oklch(0.22_0.10_260)]">Get Your Document</h3>
                <p className="text-gray-600">Receive your completed document online or collect from our centre</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[oklch(0.22_0.10_260)]">Why Choose Us?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-[oklch(0.22_0.10_260)]" />
                </div>
                <div>
                  <h3 className="font-bold text-[oklch(0.22_0.10_260)] mb-1">Experienced Team</h3>
                  <p className="text-gray-600 text-sm">Years of experience in documentation services</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-[oklch(0.22_0.10_260)] mb-1">Quick Turnaround</h3>
                  <p className="text-gray-600 text-sm">Fast processing with regular status updates</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                  <Lock className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-[oklch(0.22_0.10_260)] mb-1">100% Secure</h3>
                  <p className="text-gray-600 text-sm">Your documents and data are completely safe</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                  <IndianRupee className="w-6 h-6 text-[oklch(0.22_0.10_260)]" />
                </div>
                <div>
                  <h3 className="font-bold text-[oklch(0.22_0.10_260)] mb-1">Affordable Pricing</h3>
                  <p className="text-gray-600 text-sm">Transparent and competitive service charges</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-[oklch(0.22_0.10_260)] mb-1">Trusted Service</h3>
                  <p className="text-gray-600 text-sm">Hundreds of satisfied customers in Barh area</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-[oklch(0.22_0.10_260)] mb-1">24/7 Support</h3>
                  <p className="text-gray-600 text-sm">WhatsApp support available anytime</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Note */}
        <section className="py-8 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-blue-100">
              <Lock className="w-8 h-8 text-[oklch(0.22_0.10_260)] shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[oklch(0.22_0.10_260)] mb-2">Your Privacy is Our Priority</h3>
                <p className="text-gray-600 text-sm">
                  All documents and personal information shared with us are kept strictly confidential. 
                  We do not share your data with any third parties. Your documents are used solely for 
                  processing your service request and are deleted after completion.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[oklch(0.22_0.10_260)]">Frequently Asked Questions</h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-[oklch(0.22_0.10_260)]">
                    How long does it take to process a document?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Processing time varies by document type. Most certificates take 3-7 working days. 
                    PAN card applications typically take 15-20 days. We'll keep you updated throughout the process.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-[oklch(0.22_0.10_260)]">
                    What documents do I need to submit?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Required documents vary by service. Generally you'll need Aadhaar card, passport photo, 
                    and relevant supporting documents. We'll guide you on exactly what's needed after you submit your request.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-[oklch(0.22_0.10_260)]">
                    Can I track my application status?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Yes! We provide regular WhatsApp updates on your application status. You can also 
                    call us anytime at {phoneNumber} to check your application status.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-[oklch(0.22_0.10_260)]">
                    Is it safe to share documents online?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Absolutely. We use secure encrypted storage for all uploaded documents. Your data 
                    is never shared with third parties and is deleted after your service is completed.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-[oklch(0.22_0.10_260)]">
                    Do you offer home delivery of documents?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    For digital documents, we send them directly to your WhatsApp or email. 
                    For physical documents, you can collect them from our centre at {businessAddress}.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Terms & Conditions */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h3 className="font-bold text-[oklch(0.22_0.10_260)] mb-3">Terms & Conditions</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>Service charges are non-refundable once processing has begun.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>We are not responsible for delays caused by government portals or authorities.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>Customers must provide accurate information and valid documents.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>We reserve the right to refuse service for incomplete or fraudulent applications.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-[oklch(0.22_0.10_260)] to-[oklch(0.18_0.08_260)] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-4">
              Apply online or visit our centre today
            </p>
            <p className="flex items-center justify-center gap-2 text-blue-200 mb-8 text-sm">
              <MapPin className="w-4 h-4 text-orange-300" />
              {businessAddress}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={scrollToForm}
              >
                Apply Online Now
              </Button>
              <Button
                size="lg"
                className="bg-white/20 hover:bg-white/30 text-white border border-white/40"
                asChild
              >
                <a href={`tel:${phoneNumber}`}>
                  <Phone className="w-5 h-5 mr-2" />
                  Call: {phoneNumber}
                </a>
              </Button>
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white"
                asChild
              >
                <a href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
                  <SiWhatsapp className="w-5 h-5 mr-2" />
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
