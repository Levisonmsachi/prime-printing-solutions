import { useState, useEffect } from "react";
import { 
  ExternalLink, 
  Building2, 
  Globe, 
  Calendar, 
  Link as LinkIcon, 
  Star, 
  ChevronRight, 
  X,
  MapPin,
  Phone,
  Mail,
  Info,
  ArrowUpRight
} from "lucide-react";

const Partners = ({ data }) => {
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Function to get the full image URL
  const getFullImageUrl = (relativePath) => {
    if (!relativePath) return null;
    
    // If it's already a full URL, return as is
    if (relativePath.startsWith('http')) return relativePath;
    
    const backendUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
    
    // Remove leading slash if present to avoid double slash
    const cleanPath = relativePath.startsWith('/') ? relativePath.substring(1) : relativePath;
    
    return `${backendUrl}/${cleanPath}`;
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => {
        document.body.style.overflow = 'auto';
      }, 300);
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  const openPartnerDetails = (partner) => {
    setSelectedPartner(partner);
    setShowModal(true);
  };

  const closePartnerDetails = () => {
    setShowModal(false);
    setSelectedPartner(null);
  };

  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 bg-[#1E88C8]/10 backdrop-blur-sm rounded-full border border-[#1E88C8]/20">
              <Star className="w-5 h-5 text-[#1E88C8]" />
              <span className="text-sm font-semibold text-[#1E88C8] tracking-wide">
                Strategic Partnerships
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-6">
              Our Trusted <span className="text-transparent bg-clip-text bg-linear-to-r from-[#1E88C8] to-[#1976B2]">Partners</span>
            </h2>
            <p className="text-xl text-[#111111]/70 max-w-3xl mx-auto leading-relaxed">
              Collaborating with industry leaders to deliver exceptional printing solutions and innovative results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((partner) => (
              <div 
                key={partner.id} 
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-200 hover:border-[#1E88C8]/30"
                onClick={() => openPartnerDetails(partner)}
              >
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-[#1E88C8]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Logo/Image Section - Full Width */}
                <div className="relative overflow-hidden bg-linear-to-br from-[#F9F9F9] to-white">
                  <div className="relative h-48 flex items-center justify-center p-8">
                    {/* Gradient Background */}
                    <div className="absolute inset-0 bg-linear-to-br from-[#1E88C8]/5 via-transparent to-[#1976B2]/5 opacity-50" />
                    
                    {/* Logo Container with floating effect */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
                      {partner.logo_url || partner.logo ? (
                        <div className="relative w-full h-full">
                          {/* Glow behind logo */}
                          <div className="absolute inset-0 bg-[#1E88C8]/10 blur-xl rounded-full scale-110 group-hover:scale-125 transition-transform duration-500" />
                          
                          {/* Logo Image */}
                          <img
                            src={getFullImageUrl(partner.logo_url || partner.logo)}
                            alt={`${partner.name} logo`}
                            className="relative w-full h-full object-contain scale-100 group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div className="w-24 h-24 bg-linear-to-br from-[#1E88C8]/10 to-[#1976B2]/10 rounded-2xl flex items-center justify-center shadow-inner group-hover:shadow-lg transition-all duration-500">
                          <Building2 className="w-12 h-12 text-[#1E88C8]" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div className="absolute -top-8 -right-8 w-16 h-16 bg-[#1E88C8]/10 transform rotate-45 group-hover:bg-[#1E88C8]/20 transition-colors duration-300" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="relative p-6 bg-white">
                  {/* Partner Name and Website */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#111111] group-hover:text-[#1E88C8] transition-colors duration-300 mb-2">
                        {partner.name}
                      </h3>
                      {partner.website && (
                        <div className="flex items-center gap-2 text-sm text-[#111111]/60">
                          <Globe className="w-4 h-4" />
                          <span className="truncate">
                            {new URL(partner.website).hostname.replace('www.', '')}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 ml-4 p-2 bg-[#1E88C8]/5 rounded-lg text-[#1E88C8] hover:bg-[#1E88C8]/10 hover:text-[#1976B2] transition-all duration-300 group/icon"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-5 h-5 group-hover/icon:rotate-12 transition-transform" />
                      </a>
                    )}
                  </div>

                  {/* Description */}
                  {partner.description && (
                    <div className="mb-6">
                      <p className="text-[#111111]/70 text-sm leading-relaxed line-clamp-3">
                        {partner.description}
                      </p>
                    </div>
                  )}

                  {/* Partnership Details */}
                  <div className="pt-5 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      {partner.partnership_type && (
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-[#1E88C8]/10 rounded-md">
                            <LinkIcon className="w-3 h-3 text-[#1E88C8]" />
                          </div>
                          <span className="text-sm font-medium text-[#1E88C8]">
                            {partner.partnership_type}
                          </span>
                        </div>
                      )}
                      
                      {partner.created_at && (
                        <div className="flex items-center gap-2 text-sm text-[#111111]/50">
                          <Calendar className="w-3 h-3" />
                          <span>Since {new Date(partner.created_at).getFullYear()}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* View Details Button - Now Clickable */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-center gap-2 text-[#1E88C8] text-sm font-medium cursor-pointer group/details">
                      <Info className="w-4 h-4" />
                      <span className="group-hover/details:underline">View Partner Details</span>
                      <ChevronRight className="w-4 h-4 group-hover/details:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#1E88C8]/20 rounded-2xl pointer-events-none transition-all duration-500" />
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-20 pt-16">
            <div className="relative bg-linear-to-br from-white via-[#F9F9F9] to-white rounded-3xl p-8 md:p-12 border border-gray-200 overflow-hidden">
              {/* Background Elements */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-32 h-32 bg-[#1E88C8]/5 rounded-full blur-2xl" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#1976B2]/5 rounded-full blur-2xl" />
              </div>

              <div className="relative">
                <h3 className="text-3xl font-bold text-[#111111] mb-4">
                  Become Our <span className="text-[#1E88C8]">Partner</span>
                </h3>
                <p className="text-lg text-[#111111]/70 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Join our network of trusted partners and explore collaboration opportunities that drive mutual growth and success.
                </p>
                <a
                  href="/contact"
                  className="group inline-flex items-center gap-3 px-10 py-4 bg-[#1E88C8] text-white font-bold rounded-xl hover:bg-[#1976B2] hover:shadow-xl transition-all duration-300"
                >
                  <span>Explore Partnership</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Details Modal */}
      {showModal && selectedPartner && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
              showModal ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={closePartnerDetails}
          />

          {/* Modal Content */}
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 sm:p-0">
            <div 
              className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto transform transition-all duration-300 ${
                showModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-white rounded-t-2xl p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {selectedPartner.logo_url || selectedPartner.logo ? (
                      <div className="w-12 h-12 rounded-lg bg-linear-to-br from-[#1E88C8]/10 to-[#1976B2]/10 flex items-center justify-center">
                        <img
                          src={getFullImageUrl(selectedPartner.logo_url || selectedPartner.logo)}
                          alt={`${selectedPartner.name} logo`}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-[#1E88C8]/10 rounded-lg flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-[#1E88C8]" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-2xl font-bold text-[#111111]">
                        {selectedPartner.name}
                      </h3>
                      {selectedPartner.website && (
                        <div className="flex items-center gap-2 text-sm text-[#111111]/60">
                          <Globe className="w-4 h-4" />
                          <a
                            href={selectedPartner.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#1E88C8] transition-colors"
                          >
                            {selectedPartner.website.replace(/(^\w+:|^)\/\//, '')}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={closePartnerDetails}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                {/* Logo Display */}
                <div className="mb-8">
                  <div className="bg-linear-to-br from-[#F9F9F9] to-white rounded-xl p-8 border border-gray-200">
                    <div className="flex items-center justify-center h-40">
                      {selectedPartner.logo_url || selectedPartner.logo ? (
                        <img
                          src={getFullImageUrl(selectedPartner.logo_url || selectedPartner.logo)}
                          alt={`${selectedPartner.name} logo`}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <div className="w-32 h-32 bg-linear-to-br from-[#1E88C8]/10 to-[#1976B2]/10 rounded-2xl flex items-center justify-center">
                          <Building2 className="w-16 h-16 text-[#1E88C8]" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Partner Details */}
                <div className="space-y-6">
                  {selectedPartner.description && (
                    <div>
                      <h4 className="text-lg font-semibold text-[#111111] mb-3 flex items-center gap-2">
                        <Info className="w-5 h-5 text-[#1E88C8]" />
                        About {selectedPartner.name}
                      </h4>
                      <p className="text-[#111111]/70 leading-relaxed">
                        {selectedPartner.description}
                      </p>
                    </div>
                  )}

                  {/* Partner Information Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedPartner.partnership_type && (
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-[#1E88C8]/10 rounded-lg">
                            <LinkIcon className="w-4 h-4 text-[#1E88C8]" />
                          </div>
                          <div>
                            <p className="text-sm text-[#111111]/60">Partnership Type</p>
                            <p className="font-semibold text-[#1E88C8]">{selectedPartner.partnership_type}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedPartner.created_at && (
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-[#1E88C8]/10 rounded-lg">
                            <Calendar className="w-4 h-4 text-[#1E88C8]" />
                          </div>
                          <div>
                            <p className="text-sm text-[#111111]/60">Partnership Since</p>
                            <p className="font-semibold text-[#111111]">
                              {new Date(selectedPartner.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedPartner.phone && (
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-[#1E88C8]/10 rounded-lg">
                            <Phone className="w-4 h-4 text-[#1E88C8]" />
                          </div>
                          <div>
                            <p className="text-sm text-[#111111]/60">Contact Phone</p>
                            <a 
                              href={`tel:${selectedPartner.phone}`}
                              className="font-semibold text-[#111111] hover:text-[#1E88C8] transition-colors"
                            >
                              {selectedPartner.phone}
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedPartner.email && (
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-[#1E88C8]/10 rounded-lg">
                            <Mail className="w-4 h-4 text-[#1E88C8]" />
                          </div>
                          <div>
                            <p className="text-sm text-[#111111]/60">Contact Email</p>
                            <a 
                              href={`mailto:${selectedPartner.email}`}
                              className="font-semibold text-[#111111] hover:text-[#1E88C8] transition-colors"
                            >
                              {selectedPartner.email}
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                      
                    {selectedPartner.address && (
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-[#1E88C8]/10 rounded-lg">
                            <MapPin className="w-4 h-4 text-[#1E88C8]" />
                          </div>
                          <div>
                            <p className="text-sm text-[#111111]/60">Address</p>
                            <p className="font-semibold text-[#111111]">{selectedPartner.address}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>


                  {/* Additional partner-specific fields would go here */}
                  {!selectedPartner.description && !selectedPartner.phone && !selectedPartner.email && (
                    <div className="text-center py-8">
                      <Info className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">
                        More details about this partnership will be added soon.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-white rounded-b-2xl p-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-3">
                  {selectedPartner.website && (
                    <a
                      href={selectedPartner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#1E88C8] text-white font-semibold rounded-xl hover:bg-[#1976B2] transition-colors group/website"
                    >
                      <Globe className="w-5 h-5" />
                      Visit Website
                      <ArrowUpRight className="w-4 h-4 group-hover/website:translate-x-0.5 group-hover/website:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                  <button
                    onClick={closePartnerDetails}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Partners;