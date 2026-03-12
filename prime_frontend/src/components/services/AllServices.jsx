import { useState } from "react";
import { ChevronDown, ChevronUp, Clock, CheckCircle, ArrowRight, Wrench, DollarSign, Calendar, Package, Users } from "lucide-react";
import { Link } from "react-router-dom";

const AllServices = ({ data }) => {
  const [expandedService, setExpandedService] = useState(null);

  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return null;

    // Already a full URL (Cloudinary, S3, etc.)
    if (imagePath.startsWith("http")) return imagePath;

    const backendUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

    const cleanPath = imagePath.startsWith("/")
      ? imagePath.slice(1)
      : imagePath;

    return `${backendUrl}/${cleanPath}`;
  };


  const toggleService = (serviceId) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Professional Header */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <div className="w-20 h-1 bg-[#1E88C8] mx-auto mb-4 rounded-full"></div>
            <span className="text-[#1E88C8] text-sm font-semibold tracking-wider uppercase">Complete Catalog</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
            All Our Services
            <div className="w-24 h-0.5 bg-gray-300 mx-auto mt-4"></div>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our complete range of printing services with detailed information, processes, and specifications.
          </p>
        </div>

        {/* Services List - Modern Accordion Design */}
        <div className="space-y-6">
          {data.map((service) => (
            <div
              key={service.id}
              className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 ${
                expandedService === service.id ? 'ring-2 ring-[#1E88C8]/20' : 'hover:shadow-xl'
              }`}
            >
              {/* Service Header - Clickable Area */}
              <div
                className="p-8 cursor-pointer hover:bg-gray-50 transition-colors duration-300"
                onClick={() => toggleService(service.id)}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left: Service Info with Icon */}
                  <div className="flex items-start space-x-6 flex-1">
                    {/* Service Icon/Image */}
                    <div className="relative">
                      <div className="w-20 h-20 bg-linear-to-br from-[#1E88C8]/10 to-[#1976B2]/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:from-[#1E88C8]/20 group-hover:to-[#1976B2]/20 transition-all duration-300">
                        {service.image ? (
                          <img
                            src={getFullImageUrl(service.image)}
                            alt={service.name}
                            className="w-14 h-14 object-cover rounded-xl"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'block';
                            }}
                          />
                        ) : null}
                        <Wrench className="w-10 h-10 text-[#1E88C8]" style={{ display: service.image ? 'none' : 'block' }} />
                      </div>
                      
                      {/* Category Badge */}
                      <div className="absolute -top-2 -right-2 bg-[#1E88C8] text-white px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                        {service.category_name}
                      </div>
                    </div>

                    {/* Service Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-2xl font-bold text-gray-900">
                          {service.name}
                        </h3>
                        
                        {/* Quick Stats */}
                        <div className="hidden lg:flex items-center space-x-4">
                          {service.pricing_info && (
                            <div className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-lg">
                              <DollarSign className="w-4 h-4 mr-1" />
                              <span className="text-sm font-semibold">{service.pricing_info.split(' ')[0]}</span>
                            </div>
                          )}
                          
                          {service.turnaround_time && (
                            <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-lg">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span className="text-sm font-semibold">{service.turnaround_time}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">
                        {service.short_description || service.description}
                      </p>

                      {/* Service Tags */}
                      <div className="flex flex-wrap gap-2">
                        {service.features?.slice(0, 2).map((feature, idx) => (
                          <span 
                            key={idx} 
                            className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                          >
                            <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                            {feature}
                          </span>
                        ))}
                        
                        <span className="inline-flex items-center px-3 py-1 bg-[#1E88C8]/10 text-[#1E88C8] rounded-full text-xs font-semibold">
                          <Package className="w-3 h-3 mr-1" />
                          {service.features?.length || 0} Features
                        </span>
                        
                        {service.process_steps && service.process_steps.length > 0 && (
                          <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                            <Users className="w-3 h-3 mr-1" />
                            {service.process_steps.length} Step Process
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expand Icon */}
                  <div className="flex items-center justify-between lg:justify-end space-x-4 lg:space-x-0 lg:ml-4">
                    {/* Mobile Quick Stats */}
                    <div className="flex lg:hidden items-center space-x-3">
                      {service.pricing_info && (
                        <div className="flex items-center bg-green-50 text-green-700 px-2 py-1 rounded-lg">
                          <DollarSign className="w-3 h-3 mr-1" />
                          <span className="text-xs font-semibold">{service.pricing_info.split(' ')[0]}</span>
                        </div>
                      )}
                      
                      {service.turnaround_time && (
                        <div className="flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded-lg">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span className="text-xs font-semibold">{service.turnaround_time}</span>
                        </div>
                      )}
                    </div>

                    <div className="shrink-0">
                      <div className="w-12 h-12 bg-gray-100 hover:bg-[#1E88C8]/10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                        {expandedService === service.id ? (
                          <ChevronUp className="w-6 h-6 text-[#1E88C8]" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-[#1E88C8]" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Content - Professional Details Panel */}
              {expandedService === service.id && (
                <div className="border-t border-gray-200 bg-gray-50/50">
                  <div className="p-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Left Column - Full Details */}
                      <div className="space-y-8">
                        {/* Full Description */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                          <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            <Package className="w-5 h-5 text-[#1E88C8] mr-2" />
                            Service Overview
                          </h4>
                          <p className="text-gray-700 leading-relaxed">
                            {service.full_description || service.description}
                          </p>
                        </div>

                        {/* All Features */}
                        {service.features && service.features.length > 0 && (
                          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                              Key Features & Benefits
                            </h4>
                            <div className="grid sm:grid-cols-2 gap-4">
                              {service.features.map((feature, index) => (
                                <div key={index} className="flex items-start p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                                  <div className="w-6 h-6 bg-[#1E88C8]/10 rounded-full flex items-center justify-center mr-3 shrink-0">
                                    <CheckCircle className="w-3 h-3 text-[#1E88C8]" />
                                  </div>
                                  <span className="text-gray-700 text-sm">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right Column - Process & Pricing */}
                      <div className="space-y-8">
                        {/* Process Timeline */}
                        {service.process_steps && service.process_steps.length > 0 && (
                          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                              <Clock className="w-5 h-5 text-blue-500 mr-2" />
                              Our Process
                            </h4>
                            <div className="relative">
                              {/* Timeline Line */}
                              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-linear-to-b from-[#1E88C8]/30 via-[#1E88C8]/20 to-transparent"></div>
                              
                              <div className="space-y-6">
                                {service.process_steps.map((step, index) => (
                                  <div key={step.id || index} className="relative flex items-start">
                                    {/* Step Number */}
                                    <div className="relative z-10 shrink-0 w-10 h-10 bg-linear-to-br from-[#1E88C8] to-[#1976B2] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                                      {step.step_number || (index + 1)}
                                    </div>
                                    
                                    {/* Step Content */}
                                    <div className="ml-6 flex-1">
                                      <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
                                        <div className="flex items-center justify-between mb-2">
                                          <h5 className="font-semibold text-gray-900 text-lg">
                                            {step.title}
                                          </h5>
                                          {step.estimated_time && (
                                            <div className="flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                                              <Clock className="w-3 h-3 mr-1" />
                                              {step.estimated_time}
                                            </div>
                                          )}
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                          {step.description}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Pricing & Details Card */}
                        <div className="bg-linear-to-br from-[#1E88C8] to-[#1976B2] rounded-xl p-6 text-white shadow-lg">
                          <h4 className="text-xl font-bold mb-6">Ready to Get Started?</h4>
                          
                          <div className="space-y-4 mb-6">
                            {service.pricing_info && (
                              <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                                <div className="flex items-center">
                                  <DollarSign className="w-5 h-5 mr-3" />
                                  <span className="font-medium">Pricing</span>
                                </div>
                                <span className="font-semibold">{service.pricing_info}</span>
                              </div>
                            )}
                            
                            {service.turnaround_time && (
                              <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                                <div className="flex items-center">
                                  <Calendar className="w-5 h-5 mr-3" />
                                  <span className="font-medium">Turnaround</span>
                                </div>
                                <span className="font-semibold">{service.turnaround_time}</span>
                              </div>
                            )}
                            
                            <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                              <div className="flex items-center">
                                <Package className="w-5 h-5 mr-3" />
                                <span className="font-medium">Category</span>
                              </div>
                              <span className="font-semibold">{service.category_name}</span>
                            </div>
                          </div>
                          
                          <Link 
                            to="/request-quote"
                            className="w-full bg-white text-[#1E88C8] hover:bg-gray-50 font-semibold py-3 rounded-lg transition-colors duration-300 flex items-center justify-center"
                          >
                            <span>Request Quote for {service.name}</span>
                            <ArrowRight className="ml-2 w-5 h-5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Professional CTA */}
        <div className="mt-20 text-center">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="max-w-3xl mx-auto">
              <div className="w-16 h-16 bg-[#1E88C8]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-[#1E88C8]" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Need Help Choosing the Right Service?
              </h3>
              
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
                Our printing experts are here to help you select the perfect solution for your specific needs and requirements.
              </p>
              
              <Link 
                to="/contact"
                className="inline-flex items-center px-8 py-3 bg-[#1E88C8] text-white font-semibold rounded-lg hover:bg-[#1976B2] transition-colors duration-300 hover:shadow-lg"
              >
                <span>Contact Our Experts</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllServices;