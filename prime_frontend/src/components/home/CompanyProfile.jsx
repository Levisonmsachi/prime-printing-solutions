import React from "react";

const CompanyProfile = ({ data }) => {
  if (!data) return null;

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Similar to SPARC's "About Us" section */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mb-4 leading-tight">
                Corporate Profile
              </h2>
              <div className="w-16 h-1 bg-[#1E88C8] mb-6"></div>
              <p className="text-gray-700 leading-relaxed">
                Access our complete company profile with detailed information about our 
                capabilities, certifications, and portfolio of successful projects.
              </p>
            </div>

            {/* Key features - Similar to SPARC's service listing */}
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-[#1E88C8]/10 rounded-full flex items-center justify-center mr-3 mt-1">
                  <div className="w-2 h-2 bg-[#1E88C8] rounded-full"></div>
                </div>
                <span className="text-gray-700">Complete company overview</span>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-[#1E88C8]/10 rounded-full flex items-center justify-center mr-3 mt-1">
                  <div className="w-2 h-2 bg-[#1E88C8] rounded-full"></div>
                </div>
                <span className="text-gray-700">Certifications & accreditations</span>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-[#1E88C8]/10 rounded-full flex items-center justify-center mr-3 mt-1">
                  <div className="w-2 h-2 bg-[#1E88C8] rounded-full"></div>
                </div>
                <span className="text-gray-700">Project portfolio & case studies</span>
              </div>
            </div>
          </div>

          {/* Right column - Download section */}
          <div className="bg-[#F6F4EE] rounded-lg p-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-[#111111]">
                  {data.title || "Company Profile"}
                </h3>
                <span className="text-sm bg-[#1E88C8] text-white px-3 py-1 rounded-full">
                  PDF
                </span>
              </div>
              
              <div className="text-sm text-gray-600 mb-6">
                <p className="mb-2">Updated: {new Date(data.updated_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
                <p>Secure document • Contains detailed company information</p>
              </div>
            </div>

            <a
              href={data.file_url}
              download
              className="w-full bg-[#1E88C8] hover:bg-[#1976B2] text-white font-semibold py-3 px-6 rounded flex items-center justify-center transition-colors duration-300"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Company Profile
            </a>
            
            <p className="text-xs text-gray-500 text-center mt-4">
              Free download • No registration required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyProfile;