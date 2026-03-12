/* eslint-disable no-unused-vars */
import { ArrowRight, Wrench, Printer, Palette, FileText, Package, Zap, X, CheckCircle, Clock, DollarSign, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ServiceCategories = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  useEffect(() => {
    if (isCategoryModalOpen || isServiceModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCategoryModalOpen, isServiceModalOpen]);

  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return null;

    if (imagePath.startsWith("http")) return imagePath;

    const backendUrl =
      import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

    const cleanPath = imagePath.startsWith("/")
      ? imagePath.slice(1)
      : imagePath;

    return `${backendUrl}/${cleanPath}`;
  };


  const getCategoryIcon = (categoryName) => {
    const icons = {
      'Digital Printing': <Printer className="w-6 h-6" />,
      'Offset Printing': <Palette className="w-6 h-6" />,
      'Packaging': <Package className="w-6 h-6" />,
      'Large Format': <Zap className="w-6 h-6" />,
      'Graphic Design': <Palette className="w-6 h-6" />,
      'Specialty Printing': <Wrench className="w-6 h-6" />,
    };
    return icons[categoryName] || <Wrench className="w-6 h-6" />;
  };

  const openCategoryModal = (category) => {
    setSelectedCategory(category);
    setIsCategoryModalOpen(true);
  };

  const openServiceModal = (service) => {
    setSelectedService(service);
    setIsServiceModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setSelectedService(null);
    setIsCategoryModalOpen(false);
    setIsServiceModalOpen(false);
  };

  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Professional Header */}
          <div className="text-center mb-16">
            <div className="mb-6">
              <div className="w-20 h-1 bg-[#1E88C8] mx-auto mb-4 rounded-full"></div>
              <span className="text-[#1E88C8] text-sm font-semibold tracking-wider uppercase">Our Solutions</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
              Service Categories
              <div className="w-24 h-0.5 bg-gray-300 mx-auto mt-4"></div>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive range of printing services organized by category, each designed to meet specific industry needs.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {data.map((category) => (
              <div
                key={category.id}
                onClick={() => openCategoryModal(category)}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-linear-to-br from-[#1E88C8]/5 via-transparent to-[#1976B2]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-linear-to-bl from-[#1E88C8]/10 to-transparent rounded-bl-2xl"></div>

                {/* Content */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 bg-linear-to-br from-[#1E88C8] to-[#1976B2] rounded-xl flex items-center justify-center shadow-lg">
                      <div className="text-white">
                        {getCategoryIcon(category.name)}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold text-gray-500">View</span>
                      <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-[#1E88C8]/10 transition-colors duration-300">
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#1E88C8] transition-colors duration-300" />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#1E88C8] transition-colors duration-300">
                    {category.name}
                  </h3>

                  <p className="text-gray-600 mb-6 text-sm leading-relaxed line-clamp-3">
                    {category.description}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div className="inline-flex items-center px-3 py-1 bg-[#1E88C8]/10 text-[#1E88C8] font-semibold rounded-full text-xs">
                      <span className="flex items-center">
                        <FileText className="w-3 h-3 mr-1" />
                        {category.services_count || category.services?.length || 0} Services
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 font-medium group-hover:text-[#1E88C8] transition-colors duration-300">
                      Explore →
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <div className="bg-linear-to-r from-[#1E88C8]/5 to-[#1976B2]/5 rounded-2xl p-8 md:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Need a Custom Solution?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our expert team can create tailored printing solutions to meet your specific business requirements.
              </p>
              <Link 
                to="/contact"
                className="inline-flex items-center px-6 py-3 bg-[#1E88C8] text-white font-semibold rounded-lg hover:bg-[#1976B2] transition-colors duration-300"
              >
                Contact Our Experts
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Modal */}
      {isCategoryModalOpen && selectedCategory && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal}></div>
          
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-300"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
              
              <div className="overflow-y-auto max-h-[90vh]">
                {/* Header */}
                <div className="bg-linear-to-r from-[#1E88C8] to-[#1976B2] p-8 text-white">
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                      {getCategoryIcon(selectedCategory.name)}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">{selectedCategory.name}</h2>
                      <p className="text-white/90 mt-1">{selectedCategory.description}</p>
                    </div>
                  </div>
                </div>
                
                {/* Services List */}
                <div className="p-8">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <Package className="w-6 h-6 text-[#1E88C8] mr-2" />
                      Services in this Category
                    </h3>
                    
                    {selectedCategory.services && selectedCategory.services.length > 0 ? (
                      <div className="space-y-4">
                        {selectedCategory.services.map((service) => (
                          <div 
                            key={service.id}
                            onClick={() => {
                              setSelectedService(service);
                              setIsServiceModalOpen(true);
                            }}
                            className="group flex items-center justify-between p-6 bg-gray-50 rounded-xl hover:bg-[#1E88C8]/5 cursor-pointer transition-all duration-300 hover:shadow-md"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-[#1E88C8]/10 rounded-lg flex items-center justify-center">
                                <Printer className="w-5 h-5 text-[#1E88C8]" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 group-hover:text-[#1E88C8] transition-colors duration-300">
                                  {service.name}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                                  {service.short_description}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              {service.pricing_info && (
                                <span className="text-sm font-semibold text-green-600">
                                  {service.pricing_info}
                                </span>
                              )}
                              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#1E88C8] transition-colors duration-300" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Wrench className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500">No services available in this category yet.</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-8">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link 
                        to="/request-quote"
                        className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-[#1E88C8] text-white font-semibold rounded-lg hover:bg-[#1976B2] transition-colors duration-300"
                        onClick={closeModal}
                      >
                        <span>Request Category Quote</span>
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

      {/* Service Modal (Reuse from FeaturedServices with updates) */}
      {isServiceModalOpen && selectedService && (
        <div className="fixed inset-0 z-60 overflow-y-auto">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal}></div>
          
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-300"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
              
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
                      <Printer className="w-20 h-20 text-white" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center mb-2">
                      <div className="bg-[#1E88C8] px-3 py-1 rounded-full text-sm font-semibold mr-3">
                        {selectedService.category_name}
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                        Service
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
                      <Package className="w-5 h-5 text-[#1E88C8] mr-2" />
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
                            <DollarSign className="w-4 h-4 text-[#1E88C8] mr-2" />
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
                          <div key={step.id || idx} className="text-center">
                            <div className="w-12 h-12 bg-[#1E88C8]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                              <span className="text-[#1E88C8] font-bold">{step.step_number || idx + 1}</span>
                            </div>
                            <h4 className="font-semibold text-gray-900 text-sm mb-2">{step.title}</h4>
                            <p className="text-gray-600 text-xs">{step.description}</p>
                            {step.estimated_time && (
                              <div className="text-xs text-gray-500 mt-1">
                                <Clock className="w-3 h-3 inline mr-1" />
                                {step.estimated_time}
                              </div>
                            )}
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

export default ServiceCategories;