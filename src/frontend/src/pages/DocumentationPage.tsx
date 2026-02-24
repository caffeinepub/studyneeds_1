import { useState } from 'react';
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
  const whatsappNumber = '+919876543210'; // Placeholder - to be configured
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
              
              <div className="flex flex-wrap justify-center gap-4 mb-12">
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
                  className="bg-white text-[oklch(0.22_0.10_260)] hover:bg-gray-100"
                  onClick={scrollToForm}
                >
                  <Building2 className="w-5 h-5 mr-2" />
                  Visit Our Centre
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
                <ul className="space-y-3">
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
              <div className="bg-white rounded-xl p-6 shadow-md text-center">
                <IndianRupee className="w-10 h-10 mx-auto mb-3 text-[oklch(0.22_0.10_260)]" />
                <h3 className="text-lg font-bold mb-2">Form Filling</h3>
                <p className="text-3xl font-bold text-orange-600">₹50</p>
                <p className="text-gray-600 text-sm mt-1">onwards</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md text-center">
                <FileText className="w-10 h-10 mx-auto mb-3 text-[oklch(0.22_0.10_260)]" />
                <h3 className="text-lg font-bold mb-2">Certificates</h3>
                <p className="text-3xl font-bold text-orange-600">₹100</p>
                <p className="text-gray-600 text-sm mt-1">onwards</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md text-center">
                <CreditCard className="w-10 h-10 mx-auto mb-3 text-[oklch(0.22_0.10_260)]" />
                <h3 className="text-lg font-bold mb-2">PAN Apply</h3>
                <p className="text-3xl font-bold text-orange-600">₹150</p>
                <p className="text-gray-600 text-sm mt-1">onwards</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md text-center">
                <GraduationCap className="w-10 h-10 mx-auto mb-3 text-[oklch(0.22_0.10_260)]" />
                <h3 className="text-lg font-bold mb-2">Scholarship Forms</h3>
                <p className="text-3xl font-bold text-orange-600">₹100</p>
                <p className="text-gray-600 text-sm mt-1">onwards</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md text-center">
                <FileText className="w-10 h-10 mx-auto mb-3 text-[oklch(0.22_0.10_260)]" />
                <h3 className="text-lg font-bold mb-2">Resume</h3>
                <p className="text-3xl font-bold text-orange-600">₹99</p>
                <p className="text-gray-600 text-sm mt-1">onwards</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md text-center">
                <Printer className="w-10 h-10 mx-auto mb-3 text-[oklch(0.22_0.10_260)]" />
                <h3 className="text-lg font-bold mb-2">Printing</h3>
                <p className="text-3xl font-bold text-orange-600">₹5</p>
                <p className="text-gray-600 text-sm mt-1">per page</p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto bg-orange-50 border-2 border-orange-200 rounded-xl p-6 text-center">
              <p className="text-orange-800 font-semibold text-lg">
                <Shield className="w-5 h-5 inline mr-2" />
                Government fees are separate and payable as per official rules
              </p>
            </div>
          </div>
        </section>

        {/* Service Request Form */}
        <section id="service-request-form" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[oklch(0.22_0.10_260)]">Request a Service</h2>
                <p className="text-gray-600 text-lg">Fill the form and we'll contact you shortly</p>
              </div>

              <DocumentationServiceForm />
            </div>
          </div>
        </section>

        {/* Privacy Note */}
        <section className="py-8 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-xl p-6 shadow-md flex items-center">
              <Lock className="w-8 h-8 text-[oklch(0.22_0.10_260)] mr-4 shrink-0" />
              <p className="text-gray-700 font-medium">
                User documents are kept confidential and used only for service processing
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[oklch(0.22_0.10_260)]">How It Works</h2>
              <p className="text-gray-600 text-lg">Simple 3-step process</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-xl p-8 shadow-md text-center">
                <div className="w-16 h-16 bg-[oklch(0.22_0.10_260)] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3 text-[oklch(0.22_0.10_260)]">Submit your request online</h3>
                <p className="text-gray-600">Fill the form with your details and upload required documents</p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-md text-center">
                <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3 text-[oklch(0.22_0.10_260)]">Our team verifies documents</h3>
                <p className="text-gray-600">We review your submission and confirm requirements</p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-md text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3 text-[oklch(0.22_0.10_260)]">Service completed or visit scheduled</h3>
                <p className="text-gray-600">Get your service done online or schedule a centre visit</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose The Cyber Point */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[oklch(0.22_0.10_260)]">Why Choose The Cyber Point</h2>
              <p className="text-gray-600 text-lg">Your trusted documentation partner</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 shadow-md">
                <Shield className="w-12 h-12 text-[oklch(0.22_0.10_260)] mb-4" />
                <h3 className="text-xl font-bold mb-2 text-[oklch(0.22_0.10_260)]">Trusted Local Service</h3>
                <p className="text-gray-600">Serving the community with reliable documentation services</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 shadow-md">
                <IndianRupee className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-[oklch(0.22_0.10_260)]">Affordable Charges</h3>
                <p className="text-gray-600">Transparent pricing with no hidden costs</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 shadow-md">
                <Clock className="w-12 h-12 text-[oklch(0.22_0.10_260)] mb-4" />
                <h3 className="text-xl font-bold mb-2 text-[oklch(0.22_0.10_260)]">Fast Processing</h3>
                <p className="text-gray-600">Quick turnaround time for all services</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 shadow-md">
                <Users className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-[oklch(0.22_0.10_260)]">Experienced Operators</h3>
                <p className="text-gray-600">Skilled team with years of experience</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 shadow-md">
                <Lock className="w-12 h-12 text-[oklch(0.22_0.10_260)] mb-4" />
                <h3 className="text-xl font-bold mb-2 text-[oklch(0.22_0.10_260)]">Secure Document Handling</h3>
                <p className="text-gray-600">Your documents are safe and confidential with us</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 shadow-md">
                <Award className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-[oklch(0.22_0.10_260)]">Quality Assurance</h3>
                <p className="text-gray-600">Verified and accurate documentation every time</p>
              </div>
            </div>
          </div>
        </section>

        {/* Terms & Conditions */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[oklch(0.22_0.10_260)]">Terms & Conditions</h2>
              
              <div className="bg-white rounded-xl p-8 shadow-md">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="w-8 h-8 bg-[oklch(0.22_0.10_260)] text-white rounded-full flex items-center justify-center mr-4 shrink-0 font-bold">1</span>
                    <p className="text-gray-700 pt-1">Service charges are non-refundable after submission to government portals</p>
                  </li>
                  <li className="flex items-start">
                    <span className="w-8 h-8 bg-[oklch(0.22_0.10_260)] text-white rounded-full flex items-center justify-center mr-4 shrink-0 font-bold">2</span>
                    <p className="text-gray-700 pt-1">Government fees are separate and payable as per official rules</p>
                  </li>
                  <li className="flex items-start">
                    <span className="w-8 h-8 bg-[oklch(0.22_0.10_260)] text-white rounded-full flex items-center justify-center mr-4 shrink-0 font-bold">3</span>
                    <p className="text-gray-700 pt-1">Approval of applications depends on government authority decision</p>
                  </li>
                  <li className="flex items-start">
                    <span className="w-8 h-8 bg-[oklch(0.22_0.10_260)] text-white rounded-full flex items-center justify-center mr-4 shrink-0 font-bold">4</span>
                    <p className="text-gray-700 pt-1">User is responsible for providing correct information and documents</p>
                  </li>
                  <li className="flex items-start">
                    <span className="w-8 h-8 bg-[oklch(0.22_0.10_260)] text-white rounded-full flex items-center justify-center mr-4 shrink-0 font-bold">5</span>
                    <p className="text-gray-700 pt-1">Processing time may vary based on government portal and authority</p>
                  </li>
                  <li className="flex items-start">
                    <span className="w-8 h-8 bg-[oklch(0.22_0.10_260)] text-white rounded-full flex items-center justify-center mr-4 shrink-0 font-bold">6</span>
                    <p className="text-gray-700 pt-1">Aadhaar biometric services require physical presence at our centre</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-br from-[oklch(0.22_0.10_260)] to-[oklch(0.18_0.08_260)] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help?</h2>
            <p className="text-xl mb-8 text-blue-100">Get in touch with us for any assistance</p>
            
            <div className="flex flex-wrap justify-center gap-4">
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
                className="bg-orange-500 hover:bg-orange-600 text-white"
                asChild
              >
                <a href={`tel:${whatsappNumber}`}>
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </a>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white text-[oklch(0.22_0.10_260)] hover:bg-gray-100"
                onClick={scrollToForm}
              >
                <Building2 className="w-5 h-5 mr-2" />
                Visit Centre
              </Button>
            </div>
          </div>
        </section>

        {/* Floating WhatsApp Button (Page-specific, positioned left) */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 left-6 z-40 w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hidden md:flex items-center justify-center transition-all hover:scale-110"
          aria-label="Chat on WhatsApp about Documentation Services"
        >
          <SiWhatsapp className="w-7 h-7" />
        </a>
      </main>

      <Footer />
    </div>
  );
}
