import { useState, useEffect } from "react";
import { Calendar, Building2, Award, CheckCircle, AlertTriangle, ExternalLink, X, FileText, Download, Globe, ChevronRight } from "lucide-react";

const CertificationsGrid = ({ data }) => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return null;

    // Already a full URL (Cloudinary, etc.)
    if (imagePath.startsWith("http")) return imagePath;

    const backendUrl =
      import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

    const cleanPath = imagePath.startsWith("/")
      ? imagePath.slice(1)
      : imagePath;

    return `${backendUrl}/${cleanPath}`;
  };


  const getExpiryStatus = (expiryDate) => {
    if (!expiryDate) return { status: 'lifetime', color: 'green' };

    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry < 0) return { status: 'expired', color: 'red' };
    if (daysUntilExpiry <= 90) return { status: 'expiring', color: 'yellow' };
    return { status: 'active', color: 'green' };
  };

  const getStatusBadge = (certification) => {
    const expiryInfo = getExpiryStatus(certification.expiry_date);

    if (expiryInfo.status === 'expired') {
      return (
        <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Expired
        </span>
      );
    }

    if (expiryInfo.status === 'expiring') {
      return (
        <span className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Expires Soon
        </span>
      );
    }

    return (
      <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
        <CheckCircle className="w-3 h-3 mr-1" />
        Active & Verified
      </span>
    );
  };

  // Format date for better display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Open modal
  const openModal = (certification) => {
    setSelectedCert(certification);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedCert(null);
  };

  // Handle body scroll locking
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  return (
    <>
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-5 py-2.5 bg-linear-to-r from-[#1E88C8]/10 to-[#E91E78]/10 rounded-full mb-6 border border-[#1E88C8]/20">
              <Award className="w-5 h-5 text-[#1E88C8] mr-2" />
              <span className="text-[#1E88C8] text-sm font-semibold tracking-wider uppercase">
                CERTIFICATIONS & ACCREDITATIONS
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-6">
              Industry <span className="text-[#1E88C8]">Recognition</span> & Compliance
            </h2>
            <div className="w-24 h-1 bg-[#1E88C8] mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-[#111111]/70 max-w-3xl mx-auto leading-relaxed">
              Our certifications demonstrate our unwavering commitment to quality, safety, and industry standards across all our operations.
            </p>
          </div>

          {/* Certifications Grid - Your original code with enhanced styling */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((certification) => (
              <div
                key={certification.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-[#1E88C8]/10 transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#1E88C8]/30 transform hover:-translate-y-2"
              >
                {/* Certification Header */}
                <div className="p-8 pb-0">
                  <div className="flex items-center justify-between mb-6">
                    {/* Certification Image/Icon */}
                    <div className="w-16 h-16 bg-linear-to-br from-[#1E88C8]/10 to-[#1976B2]/10 rounded-xl flex items-center justify-center shrink-0">
                      {certification.image ? (
                        <img
                          src={certification.image_url || getFullImageUrl(certification.image)}
                          alt={certification.name}
                          className="w-12 h-12 object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                          }}
                        />
                      ) : null}
                      <Award className="w-8 h-8 text-[#1E88C8]" style={{ display: certification.image ? 'none' : 'block' }} />
                    </div>

                    {/* Status Badge */}
                    <div className="shrink-0">
                      {getStatusBadge(certification)}
                    </div>
                  </div>

                  {/* Certification Details */}
                  <div>
                    <h3 className="text-2xl font-bold text-[#111111] mb-3 group-hover:text-[#1E88C8] transition-colors duration-300">
                      {certification.name}
                    </h3>

                    <div className="flex items-center text-gray-600 mb-4">
                      <Building2 className="w-4 h-4 mr-2 text-[#1E88C8]" />
                      <span className="text-sm font-medium truncate">{certification.issuing_authority}</span>
                    </div>

                    {/* Dates */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 text-green-500" />
                        <span>Issued: {formatDate(certification.issue_date)}</span>
                      </div>
                      {certification.expiry_date && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                          <span>Expires: {formatDate(certification.expiry_date)}</span>
                        </div>
                      )}
                      {!certification.expiry_date && (
                        <div className="flex items-center text-sm text-green-600">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          <span>Lifetime Certification</span>
                        </div>
                      )}
                    </div>

                    {/* CTA Button with modal trigger */}
                    <button 
                      onClick={() => openModal(certification)}
                      className="w-full mb-8 inline-flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-[#1E88C8] to-[#1976B2] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#1E88C8]/25 transition-all duration-300 transform hover:-translate-y-1 text-sm group/btn"
                    >
                      View Certificate
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Notice */}
          <div className="text-center mt-16">
            <div className="bg-linear-to-r from-[#1E88C8]/5 to-[#1976B2]/5 rounded-2xl p-8 border border-[#1E88C8]/20">
              <h3 className="text-2xl font-bold text-[#111111] mb-4">
                Certification Verification
              </h3>
              <p className="text-[#111111]/70 mb-6 max-w-2xl mx-auto text-lg">
                All our certifications are regularly audited and verified by independent third-party organizations.
                Contact us for detailed verification reports and compliance documentation.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#111111] font-semibold rounded-lg border border-gray-200 hover:border-[#1E88C8] hover:text-[#1E88C8] transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Request Verification
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Modal - Only shows when a certificate is clicked */}
      {showModal && selectedCert && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
            onClick={closeModal}
          />
          
          {/* Modal Container */}
          <div className="relative z-10000 bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <X className="w-6 h-6 text-[#111111]" />
            </button>

            <div className="overflow-y-auto max-h-[90vh]">
              {/* Modal Header */}
              <div className="bg-linear-to-r from-[#1E88C8] to-[#1976B2] text-white p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white/90 mb-1">CERTIFICATE DETAILS</div>
                    <h2 className="text-2xl md:text-3xl font-bold">{selectedCert.name}</h2>
                  </div>
                </div>
                <div className="flex items-center text-white/90">
                  <Building2 className="w-5 h-5 mr-2" />
                  <span className="text-lg">{selectedCert.issuing_authority}</span>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Left Column - Details */}
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-lg font-bold text-[#111111] mb-4 flex items-center">
                        <FileText className="w-5 h-5 text-[#1E88C8] mr-2" />
                        Certificate Information
                      </h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-[#111111]/70">Status</span>
                          {getStatusBadge(selectedCert)}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[#111111]/70">Certificate ID</span>
                          <span className="font-mono text-[#111111] font-medium">#{selectedCert.id}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[#111111]/70">Active</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedCert.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {selectedCert.is_active ? 'Yes' : 'No'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-[#111111] flex items-center">
                        <Calendar className="w-5 h-5 text-[#1E88C8] mr-2" />
                        Dates
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-[#111111]/70 mb-1">Issue Date</div>
                          <div className="text-lg font-bold text-[#111111]">
                            {formatDate(selectedCert.issue_date)}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-[#111111]/70 mb-1">Expiry Date</div>
                          <div className={`text-lg font-bold ${selectedCert.expiry_date ? 'text-[#111111]' : 'text-green-600'}`}>
                            {selectedCert.expiry_date ? formatDate(selectedCert.expiry_date) : 'Lifetime'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Image */}
                  <div>
                    <h3 className="text-lg font-bold text-[#111111] mb-4 flex items-center">
                      <Globe className="w-5 h-5 text-[#1E88C8] mr-2" />
                      Certificate Image
                    </h3>
                    <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200 mb-6">
                      {selectedCert.image_url ? (
                        <img
                          src={selectedCert.image_url}
                          alt={selectedCert.name}
                          className="w-full h-64 object-cover"
                        />
                      ) : (
                        <div className="w-full h-64 bg-linear-to-br from-[#1E88C8]/10 to-transparent flex items-center justify-center">
                          <Award className="w-16 h-16 text-[#1E88C8]/30" />
                        </div>
                      )}
                    </div>
                    
                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-4">
                      <a
                        href={selectedCert.image_url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap px-4 py-3 bg-[#1E88C8] text-white font-semibold rounded-lg hover:bg-[#1976B2] transition-all duration-300 text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Full
                      </a>
                      <a
                        href={selectedCert.image_url || '#'}
                        download
                        className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white text-[#111111] font-semibold rounded-lg border border-gray-200 hover:border-[#1E88C8] hover:text-[#1E88C8] transition-all duration-300 text-sm"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </a>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 pt-8">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="/contact"
                      className="flex-1 inline-flex items-center justify-center gap-2px-6 py-3 bg-[#1E88C8] text-white font-semibold rounded-lg hover:bg-[#1976B2] transition-all duration-300 "
                    >
                      <span>Contact Us For Verification</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={closeModal}
                      className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-white text-[#111111] font-semibold rounded-lg border border-gray-200 hover:border-[#1E88C8] hover:text-[#1E88C8] transition-all duration-300 "
                    >
                      Close
                    </button>
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

export default CertificationsGrid;