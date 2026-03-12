import { ArrowRight, Phone, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ServicesCTA = ({ data }) => {
  return (
    <section className="relative py-20 bg-white">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-linear-to-br from-gray-50 to-blue-50"></div>
      
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent"></div>
      
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-[#1E88C8]/3 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#1976B2]/3 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Professional Header with Line */}
          <div className="mb-12">
            <div className="mb-6">
              <div className="w-20 h-1 bg-[#1E88C8] mx-auto mb-4 rounded-full"></div>
              <span className="text-[#1E88C8] text-sm font-semibold tracking-wider uppercase">Get Started</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
              {data.title || "Ready to Start Your Project?"}
              <div className="w-24 h-0.5 bg-gray-300 mx-auto mt-4"></div>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              {data.subtitle || "Contact us today to discuss your printing needs and get a customized solution."}
            </p>
            
            <Link
              to={data.button_url || "/request-quote"}
              className="inline-flex items-center px-8 py-3.5 bg-[#1E88C8] text-white font-semibold rounded-lg hover:bg-[#1976B2] transition-all duration-300 hover:shadow-lg hover:shadow-[#1E88C8]/20"
            >
              {data.button_text || "Get Free Quote"}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Contact Options - Professional Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            {/* Phone Card */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-[#1E88C8]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7 text-[#1E88C8]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 text-sm mb-3">Speak directly with our experts</p>
              <a 
                href="+265 996 678 548" 
                className="text-[#1E88C8] font-semibold hover:text-[#1976B2] transition-colors inline-flex items-center"
              >
                +265 996 678 548
              </a>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-[#1E88C8]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-[#1E88C8]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm mb-3">Get detailed proposals</p>
              <a 
                href="primeprintsolutions25@outlook.com" 
                className="text-[#1E88C8] font-semibold hover:text-[#1976B2] transition-colors inline-flex items-center"
              >
                primeprintsolutions25@outlook.com
              </a>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-[#1E88C8]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-7 h-7 text-[#1E88C8]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">WhatsApp</h3>
              <p className="text-gray-600 text-sm mb-3">Instant messaging support</p>
              <a 
                href="https://wa.me/+265996678548" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#1E88C8] font-semibold hover:text-[#1976B2] transition-colors inline-flex items-center"
              >
                Message Now
              </a>
            </div>
          </div>

          {/* Trust Indicators - Professional */}
          <div className="mt-12 pt-10 border-t border-gray-200">
            <p className="text-gray-600 text-sm mb-6 font-medium">Trusted by industry leaders</p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#1E88C8] mb-1">100+</div>
                <div className="text-sm text-gray-600">Clients Served</div>
              </div>
              
              <div className="hidden md:block w-px h-8 bg-gray-300"></div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-[#1E88C8] mb-1">98%</div>
                <div className="text-sm text-gray-600">Satisfaction Rate</div>
              </div>
              
              <div className="hidden md:block w-px h-8 bg-gray-300"></div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-[#1E88C8] mb-1">24/7</div>
                <div className="text-sm text-gray-600">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesCTA;