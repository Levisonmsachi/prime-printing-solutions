const Certifications = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#F6F4EE] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#111111] mb-4">
          Our Certifications & Accreditations
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Recognized for quality and excellence in the printing industry
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map((certification, index) => (
            <div 
              key={index} 
              className="relative bg-white p-8 rounded-xl shadow-sm group overflow-hidden transition-all duration-500 hover:-translate-y-2"
            >
              {/* Water fill animation background */}
              <div className="absolute inset-0 bg-linear-to-t from-[#1E88C8]/0 via-[#1E88C8]/0 to-[#1E88C8]/0 group-hover:from-[#1E88C8]/5 group-hover:via-[#1E88C8]/10 group-hover:to-[#1E88C8]/15 transition-all duration-500 ease-out translate-y-full group-hover:translate-y-0"></div>
              
              {/* Main content container */}
              <div className="relative z-10">
                {/* Logo on top - centered */}
                <div className="flex justify-center mb-6">
                  <div className="relative group">
                    {/* Logo border animation */}
                    <div className="absolute -inset-4 rounded-2xl bg-linear-to-r from-[#1E88C8] to-[#1E88C8]/30 opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-500"></div>
                    
                    {/* Logo container with gradient border on hover */}
                    <div className="relative w-24 h-24 rounded-full bg-white border-4 border-white shadow-lg group-hover:border-[#1E88C8] transition-colors duration-300 flex items-center justify-center p-4">
                      <img
                        src={certification.logo_url || '/default-logo.png'}
                        alt={certification.title}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.src = '/default-logo.png';
                        }}
                      />
                    </div>
                    
                    {/* Certification badge */}
                    <div className="absolute -bottom-2 -right-2 bg-[#F4C430] text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-md">
                      ✓
                    </div>
                  </div>
                </div>

                {/* Title - centered below logo */}
                <div className="text-center mb-3">
                  <h4 className="font-bold text-lg text-[#111111] mb-1 group-hover:text-[#1E88C8] transition-colors duration-300">
                    {certification.title}
                  </h4>
                  <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                    {certification.issuer}
                  </p>
                </div>

                {/* Certification details */}
                <div className="text-center mb-6">
                  {certification.issue_date && (
                    <div className="inline-flex items-center px-4 py-2 bg-[#F6F4EE] rounded-full group-hover:bg-[#1E88C8]/10 transition-colors duration-300">
                      <span className="text-sm text-gray-700 group-hover:text-[#1E88C8] transition-colors duration-300">
                        Valid since {new Date(certification.issue_date).getFullYear()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Description or ID with animated line */}
                <div className="relative">
                  <div className="text-center">
                    <p className="text-gray-700 leading-relaxed relative z-10 group-hover:text-[#111111] transition-colors duration-300 min-h-15 flex items-center justify-center">
                      {certification.description || `ISO ${certification.title} Certified`}
                    </p>
                    
                    {/* Bottom accent line that grows on hover */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-transparent via-[#1E88C8] to-transparent group-hover:w-3/4 transition-all duration-500"></div>
                  </div>
                </div>

                {/* Bottom accent with magenta on hover */}
                <div className="mt-8 pt-6 border-t border-gray-100 group-hover:border-[#E91E78]/30 transition-colors duration-300">
                  <div className="text-xs text-gray-400 group-hover:text-[#1E88C8] transition-colors duration-300 text-center font-medium">
                    Officially Certified • Industry Standard
                  </div>
                </div>
              </div>
              
              {/* Corner accent on hover */}
              <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                <div className="absolute top-0 right-0 w-8 h-8 bg-[#E91E78] transform translate-x-4 -translate-y-4 rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;