/* eslint-disable no-unused-vars */
import { Star, Clock, CheckCircle, ArrowRight, Wrench, X, ChevronRight, Users, Target, Award } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FeaturedServices = ({ data }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const getFullImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith("http")) return imagePath;

  const cleanPath = imagePath.startsWith("/")
    ? imagePath.slice(1)
    : imagePath;

  return `${API_BASE_URL}/${cleanPath}`;
};


  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedService(null);
    setIsModalOpen(false);
  };

  // Function to chunk array into groups of 3
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  // Split services into rows of 3
  const serviceRows = chunkArray(data, 3);

  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header - Professional */}
          <div className="text-center mb-16">
            <div className="mb-6">
              <div className="w-20 h-1 bg-[#1E88C8] mx-auto mb-4 rounded-full"></div>
              <span className="text-[#1E88C8] text-sm font-semibold tracking-wider uppercase">Our Expertise</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
              Featured Services
              <div className="w-24 h-0.5 bg-gray-300 mx-auto mt-4"></div>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our most sought-after printing services, trusted by businesses worldwide for exceptional quality and reliability.
            </p>
          </div>

          {/* Service Cards - Show in rows of 3 */}
          {serviceRows.map((row, rowIndex) => (
            <div 
              key={rowIndex} 
              className={`grid md:grid-cols-3 gap-8 ${rowIndex < serviceRows.length - 1 ? 'mb-12' : 'mb-20'}`}
            >
              {row.map((service) => (
                <div 
                  key={service.id}
                  className="group cursor-pointer"
                  onClick={() => openModal(service)}
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-2 h-full">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      {service.image ? (
                        <img
                          src={getFullImageUrl(service.image)}
                          alt={service.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/600x400/1E88C8/FFFFFF?text=Service';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-linear-to-br from-[#1E88C8]/10 to-[#1976B2]/10 flex items-center justify-center">
                          <Wrench className="w-12 h-12 text-[#1E88C8]" />
                        </div>
                      )}
                      
                      {/* Featured Badge */}
                      <div className="absolute top-4 left-4">
                        <div className="bg-[#1E88C8] text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </div>
                      </div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                          {service.category_name}
                        </div>
                      </div>
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1E88C8] transition-colors duration-300">
                        {service.name}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {service.short_description || service.description}
                      </p>
                      
                      {/* Quick Stats */}
                      <div className="flex items-center justify-between mb-4">
                        {service.turnaround_time && (
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="w-3 h-3 mr-1" />
                            {service.turnaround_time}
                          </div>
                        )}
                        {service.pricing_info && (
                          <div className="text-sm font-semibold text-[#1E88C8]">
                            {service.pricing_info}
                          </div>
                        )}
                      </div>
                      
                      {/* View Details Button */}
                      <div className="flex items-center text-[#1E88C8] text-sm font-semibold">
                        <span>View Details</span>
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Bottom CTA */}
          <div className="bg-linear-to-r from-[#1E88C8] to-[#1976B2] rounded-2xl p-8 md:p-12 text-white text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Need a Custom Printing Solution?
              </h3>
              <p className="text-white/90 mb-8 text-lg">
                Our expert team can create tailored printing solutions to meet your specific business requirements.
              </p>
              <Link 
                to="/request-quote"
                className="inline-flex items-center px-8 py-3 bg-white text-[#1E88C8] font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-300"
              >
                Get Custom Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modal/Popup */}
      {isModalOpen && selectedService && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={closeModal}
          ></div>
          
          {/* Modal */}
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-300"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
              
              {/* Modal Content */}
              <div className="overflow-y-auto max-h-[90vh]">
                {/* Image Header */}
                <div className="relative h-64 md:h-80">
                  {selectedService.image ? (
                    <img
                      src={getFullImageUrl(selectedService.image)}
                      alt={selectedService.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-[#1E88C8] to-[#1976B2] flex items-center justify-center">
                      <Wrench className="w-20 h-20 text-white" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent"></div>
                  
                  {/* Header Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center mb-2">
                      <div className="bg-[#1E88C8] px-3 py-1 rounded-full text-sm font-semibold mr-3">
                        {selectedService.category_name}
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                        Featured Service
                      </div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">{selectedService.name}</h2>
                    <p className="text-white/90 text-lg">{selectedService.short_description}</p>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 md:p-8">
                  {/* Full Description */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <Target className="w-5 h-5 text-[#1E88C8] mr-2" />
                      Service Overview
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedService.full_description}
                    </p>
                  </div>
                  
                  {/* Two Column Layout */}
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* Features */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        Key Features
                      </h3>
                      <div className="space-y-3">
                        {selectedService.features?.map((feature, idx) => (
                          <div key={idx} className="flex items-start">
                            <div className="w-5 h-5 bg-[#1E88C8]/10 rounded-full flex items-center justify-center mr-3 mt-0.5 shrink-0">
                              <CheckCircle className="w-3 h-3 text-[#1E88C8]" />
                            </div>
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Pricing & Timeline */}
                    <div className="space-y-6">
                      {selectedService.pricing_info && (
                        <div className="bg-gray-50 rounded-xl p-6">
                          <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                            <Award className="w-4 h-4 text-[#1E88C8] mr-2" />
                            Pricing
                          </h4>
                          <p className="text-gray-700">{selectedService.pricing_info}</p>
                        </div>
                      )}
                      
                      {selectedService.turnaround_time && (
                        <div className="bg-gray-50 rounded-xl p-6">
                          <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                            <Clock className="w-4 h-4 text-[#1E88C8] mr-2" />
                            Turnaround Time
                          </h4>
                          <p className="text-gray-700">{selectedService.turnaround_time}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Process Steps */}
                  {selectedService.process_steps && selectedService.process_steps.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <Users className="w-5 h-5 text-[#1E88C8] mr-2" />
                        Our Process
                      </h3>
                      <div className="grid md:grid-cols-4 gap-4">
                        {selectedService.process_steps.map((step, idx) => (
                          <div key={step.id} className="text-center">
                            <div className="w-12 h-12 bg-[#1E88C8]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                              <span className="text-[#1E88C8] font-bold">{step.step_number}</span>
                            </div>
                            <h4 className="font-semibold text-gray-900 text-sm mb-2">{step.title}</h4>
                            <p className="text-gray-600 text-xs">{step.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-8">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link 
                        to="/request-quote"
                        className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-[#1E88C8] text-white font-semibold rounded-lg hover:bg-[#1976B2] transition-colors duration-300"
                        onClick={closeModal}
                      >
                        <span>Request Quote</span>
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
                      <button 
                        onClick={closeModal}
                        className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-[#1E88C8] hover:text-[#1E88C8] transition-colors duration-300"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedServices;