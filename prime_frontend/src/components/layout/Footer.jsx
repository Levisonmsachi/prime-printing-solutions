import React from "react";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Shield,
  Truck,
  Headphones,
  Award,
  Heart,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: "Commercial Printing", path: "/services" },
    { name: "Periodical Publications", path: "/services" },
    { name: "Stationery & Supplies", path: "/services" },
    { name: "Binding & Finishing", path: "/services" },
    { name: "Supply of general office stationery", path: "/services" },
    { name: "Print Books", path: "/services"}
    
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Contact", path: "/contact" },
  ];

  const support = [
    { name: "Contact Us", path: "/contact" },
    { name: "Get Quote", path: "/request-quote" },
    { name: "FAQ", path: "/faq" },
    { name: "Privacy Policy", path: "/privacy-policy" },
  ];

  const contactInfo = [
    { icon: MapPin, text: "Area 51/B, Lilongwe, Malawi" },
    { icon: Phone, text: "+265 996 678 548" },
    { icon: Mail, text: "primeprintsolutions25@outlook.com" },
    { icon: Clock, text: "Always Open: 6AM - 9PM" },
  ];

  const features = [
    { icon: Shield, title: "Quality Guaranteed", desc: "100% satisfaction" },
    { icon: Truck, title: "Delivery", desc: "Fast Delivery" },
    { icon: Headphones, title: "24/7 Support", desc: "Dedicated team" },
    { icon: Award, title: "Certified", desc: "Fully Certified & Compliant" },
  ];

  const socialLinks = [
    { icon: Facebook, name: "Facebook"},
    { icon: Instagram, name: "Instagram"},
    { icon: Mail, name: "Email", url: "mailto:primeprintsolutions25@outlook.com" },
    { icon: Phone, name: "Phone", url: "tel:+265996678548" },

    //{ icon: Twitter, name: "Twitter", url: "https://twitter.com/primeprint" },
    //{ icon: Linkedin, name: "LinkedIn", url: "https://linkedin.com/company/primeprinting" },
    
  ];

  return (
    <>
      {/* Features Banner */}
      <div className="bg-[#111111] text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="bg-[#1E88C8] p-3 rounded-lg">
                  <feature.icon size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{feature.title}</h4>
                  <p className="text-gray-300 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <footer className="bg-[#F6F4EE] text-[#111111] pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-gray-300">
            
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#1E88C8] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">PP</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Prime Print</h2>
                  <p className="text-sm text-gray-600">Solutions</p>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                Professional printing solutions for businesses across Malawi. 
                Delivering quality, precision, and innovation since 2025.
              </p>
              
              <div className="space-y-3">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <info.icon size={18} className="text-[#1E88C8] mt-1 shrink-0" />
                    <span className="text-gray-700">{info.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 pb-2 border-b-2 border-[#1E88C8] inline-block">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.path}
                      className="text-gray-700 hover:text-[#1E88C8] hover:pl-2 transition-all duration-200 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-[#1E88C8] rounded-full opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xl font-bold mb-6 pb-2 border-b-2 border-[#1E88C8] inline-block">
                Our Services
              </h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <a 
                      href={service.path}
                      className="text-gray-700 hover:text-[#1E88C8] hover:pl-2 transition-all duration-200 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-[#1E88C8] rounded-full opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></span>
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Social */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-6 pb-2 border-b-2 border-[#1E88C8] inline-block">
                  Support
                </h3>
                <ul className="space-y-3">
                  {support.map((item) => (
                    <li key={item.name}>
                      <a 
                        href={item.path}
                        className="text-gray-700 hover:text-[#1E88C8] hover:pl-2 transition-all duration-200 flex items-center group"
                      >
                        <span className="w-2 h-2 bg-[#1E88C8] rounded-full opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></span>
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="font-semibold mb-4">Connect With Us</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white p-3 rounded-lg text-gray-700 hover:bg-[#1E88C8] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                      aria-label={social.name}
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              {/* Copyright */}
              <div className="text-gray-600 text-sm">
                <p>
                  © {currentYear} Prime Print Solutions. All rights reserved.
                </p>
                <p className="mt-1">
                  Made with <Heart size={12} className="inline text-[#E91E78]" /> in Malawi
                </p>
              </div>

              {/* Payment Methods */}
              <div className="flex items-center space-x-6">
                <span className="text-gray-600 text-sm font-medium">Our Values:</span>
                <div className="flex space-x-4">
                  <div className="bg-white px-4 py-2 rounded-md shadow-sm border">
                    <span className="font-bold text-gray-700">Reliability</span>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-md shadow-sm border">
                    <span className="font-bold text-gray-700">Customer Focus</span>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-md shadow-sm border">
                    <span className="font-bold text-gray-700">Integrity</span>
                  </div>
                </div>
              </div>

              {/* Back to Top */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-[#1E88C8] text-white px-4 py-2 rounded-lg hover:bg-[#1976B2] transition-colors flex items-center space-x-2"
              >
                <span>Back to Top</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>

            {/* Certifications */}
            <div className="mt-8 pt-6 border-t border-gray-300">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-center md:text-left">
                  <p className="text-sm text-gray-600 mb-2">Certified & Trusted</p>
                  <div className="flex items-center justify-center md:justify-start space-x-4">
                    <div className="bg-white px-3 py-1 rounded border text-xs font-medium text-gray-700">
                      PPDA Certified
                    </div>
                    <div className="bg-white px-3 py-1 rounded border text-xs font-medium text-gray-700">
                      MRA Tax Compliant
                    </div>
                    <div className="bg-white px-3 py-1 rounded border text-xs font-medium text-gray-700">
                      Business Registered
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-xs text-gray-500 max-w-md">
                    Prime Printing Solutions is registered with the Malawi Bureau of Standards and complies with all local printing regulations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </>
  );
};

export default Footer;