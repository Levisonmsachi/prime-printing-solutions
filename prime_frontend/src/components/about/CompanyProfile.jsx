import { Building2, Users, Award, Target } from "lucide-react";

const CompanyProfile = ({ data }) => {
  // Check if data exists
  if (!data) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600">Loading company profile...</p>
        </div>
      </section>
    );
  }

  // Using data from the API response
  const profileData = data || {};


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
  
  // Get the image URL (check both possible fields)
  const imageUrl = profileData.profile?.image_url || profileData.profile?.image;
  const fullImageUrl = imageUrl ? getFullImageUrl(imageUrl) : null;
  
  // Default stats if not provided in API
  const defaultStats = {
    teamMembers: "10+",
    yearsExperience: "5+", 
    projectsCompleted: "100+",
    clientsServed: "50+"
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Image Banner - Cool Header */}
        <div className="mb-12">
          {fullImageUrl ? (
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img
                src={fullImageUrl}
                alt={profileData.profile?.company_name || "Prime Print Solutions"}
                className="w-full h-64 md:h-80 object-cover"
              />
              {/* Image overlay for better text readability */}
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
              
              {/* company name overlay */}
              <div className="absolute bottom-8 left-8">
                <div className="mb-3">
                  <div className="w-16 h-1 bg-white mb-2"></div>
                  <span className="text-white/80 text-sm font-semibold tracking-wider uppercase">COMPANY OVERVIEW</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {profileData.profile?.company_name || "Prime Print Solutions"}
                </h1>
                <p className="text-white/90 text-lg font-light">
                  {profileData.profile?.tagline || "Prints that speak loud and clear!"}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-linear-to-r from-[#1E88C8] to-[#1976B2] rounded-xl h-64 md:h-80 flex items-center justify-center shadow-lg">
              <div className="text-center text-white">
                <div className="mb-6">
                  <div className="w-16 h-1 bg-white mx-auto mb-2"></div>
                  <span className="text-white/80 text-sm font-semibold tracking-wider uppercase">COMPANY OVERVIEW</span>
                </div>
                <Building2 className="w-16 h-16 mx-auto mb-4" />
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {profileData.profile?.company_name || "Prime Print Solutions"}
                </h1>
                <p className="text-white/90 text-lg font-light">
                  {profileData.profile?.tagline || "Prints that speak loud and clear!"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
          
          {/* Left Column - Company Description (2/3 width) */}
          <div className="lg:col-span-2">
            <div className="space-y-12">
              {/* About Our Company - Nice Header */}
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-[#111111] mb-3 relative">
                    About Our Company
                    <div className="w-20 h-1 bg-[#1E88C8] mt-4 rounded-full"></div>
                  </h2>
                  <p className="text-gray-600 text-sm font-medium uppercase tracking-wider">
                    Your Trusted Printing Partner
                  </p>
                </div>
                
                <div className="prose prose-lg max-w-none">
                  {/* What We Do */}
                  <div className="mb-10">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {profileData.profile?.what_we_do || "Leading the printing industry with innovation, quality, and customer satisfaction."}
                    </p>
                  </div>
                  
                  {/* Mission Header */}
                  {profileData.profile?.mission && (
                    <div className="mb-10 border-l-4 border-[#1E88C8] pl-6 py-2 bg-[#F6F4EE]/30 rounded-r-lg">
                      <h3 className="text-2xl font-bold text-[#111111] mb-4">
                        Our Mission
                        <div className="w-16 h-0.5 bg-[#1E88C8]/30 mt-2"></div>
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-lg font-light">
                        {profileData.profile.mission}
                      </p>
                    </div>
                  )}
                  
                  {/* Vision Header */}
                  {profileData.profile?.vision && (
                    <div className="mb-10 border-l-4 border-[#1E88C8] pl-6 py-2 bg-[#F6F4EE]/30 rounded-r-lg">
                      <h3 className="text-2xl font-bold text-[#111111] mb-4">
                        Our Vision
                        <div className="w-16 h-0.5 bg-[#1E88C8]/30 mt-2"></div>
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-lg font-light">
                        {profileData.profile.vision}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {/* Stats header */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#111111] mb-2">Our Impact</h3>
                <div className="w-16 h-1 bg-[#1E88C8] rounded-full"></div>
                <p className="text-gray-600 text-sm mt-3 font-medium">The printing company you can trust</p>
              </div>

              {/* Stats cards */}
              <div className="space-y-6">
                {/* Team Members */}
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#1E88C8]/10 rounded-full flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-[#1E88C8]" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-[#111111]">
                        {profileData.profile?.team_Members_count || defaultStats.teamMembers}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">Team Members</div>
                    </div>
                  </div>
                </div>

                {/* Years Experience */}
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#1E88C8]/10 rounded-full flex items-center justify-center mr-4">
                      <Award className="w-6 h-6 text-[#1E88C8]" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-[#111111]">
                        {profileData.profile?.years_experience || defaultStats.yearsExperience}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">Years Experience</div>
                    </div>
                  </div>
                </div>

                {/* Projects Completed */}
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#1E88C8]/10 rounded-full flex items-center justify-center mr-4">
                      <Target className="w-6 h-6 text-[#1E88C8]" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-[#111111]">
                        {profileData.profile?.projects_completed || defaultStats.projectsCompleted}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">Projects Completed</div>
                    </div>
                  </div>
                </div>

                {/* CTA Card  */}
                <div className="bg-linear-to-br from-[#1E88C8] to-[#1976B2] rounded-xl p-6 text-white shadow-lg mt-6">
                  <div className="mb-1">
                    <span className="text-white/80 text-xs font-semibold tracking-wider uppercase">Get Started</span>
                  </div>
                  <h4 className="font-bold text-xl mb-3">How can we help you?</h4>
                  <p className="text-white/90 text-sm mb-6 leading-relaxed">
                    We have a team of qualified professionals ready to bring your printing projects to life.
                  </p>
                  <a
                    href="/contact"
                    className="inline-block bg-white text-[#1E88C8] hover:bg-gray-50 font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-md text-sm"
                  >
                    Contact Us Today
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values Section */}
        {profileData.values && profileData.values.length > 0 && (
          <div className="mt-4 pt-16 border-t border-gray-200 w-full">
            <div className="text-center mb-12">
              <div className="mb-3">
                <span className="text-[#1E88C8] text-sm font-semibold tracking-wider uppercase">Our Foundation</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mb-4 relative inline-block">
                Our Core Values
                <div className="w-24 h-1.5 bg-[#1E88C8] mx-auto mt-4 rounded-full"></div>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                The principles that guide everything we do at {profileData.profile?.company_name || "Prime Print Solutions"}
              </p>
            </div>

            {/* Values Cards Grid - Full Width Layout */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {profileData.values
                .filter(value => value.is_active)
                .sort((a, b) => a.display_order - b.display_order)
                .map((value, index) => (
                  <div 
                    key={value.id || index} 
                    className="group bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full"
                  >
                    {/* Card Header */}
                    <div className="mb-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-[#1E88C8]/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-[#1E88C8]/20 transition-colors duration-300">
                          <span className="text-2xl font-bold text-[#1E88C8]">{index + 1}</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#111111] group-hover:text-[#1E88C8] transition-colors duration-300">
                          {value.title}
                        </h3>
                      </div>
                      <div className="w-full h-0.5 bg-linear-to-r from-[#1E88C8]/20 to-transparent"></div>
                    </div>

                    {/* Card Body */}
                    <div className="mb-6 grow">
                      <p className="text-gray-700 leading-relaxed">
                        {value.description}
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="pt-6 border-t border-gray-100">
                      <div className="flex items-center text-[#1E88C8] text-sm font-semibold">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span>Guiding Principle</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Values Summary - Full Width */}
        {profileData.values && profileData.values.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-200">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1E88C8]/10 mb-6">
                <span className="text-2xl font-bold text-[#1E88C8]">✓</span>
              </div>
              <h3 className="text-2xl font-bold text-[#111111] mb-4">
                More Than Just Printing
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our values are the foundation of every project we undertake. They ensure that we not only deliver exceptional 
                printing solutions but also build lasting relationships based on trust, quality, and mutual success.
              </p>
            </div>
          </div>
        )}

        {/* Who We Serve - Full width section at bottom */}
        {profileData.profile?.target_market && (
          <div className="mt-16 pt-12 border-t border-gray-200">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#111111] mb-3 relative inline-block">
                Who We Serve
                <div className="w-24 h-1 bg-[#1E88C8] mx-auto mt-4 rounded-full"></div>
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                Our diverse client base across multiple industries
              </p>
            </div>
            
            <div className="bg-linear-to-r from-[#1E88C8]/5 via-white to-[#1E88C8]/5 rounded-2xl p-8 md:p-12 shadow-inner border border-gray-100">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <div className="w-12 h-12 bg-[#1E88C8]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-[#1E88C8]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#111111] mb-4">Our Target Market</h3>
                </div>
                
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                  <p className="text-gray-700 text-lg leading-relaxed text-center">
                    {profileData.profile.target_market}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 pt-8 border-t border-gray-100">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#1E88C8] mb-1">SMBs</div>
                      <div className="text-sm text-gray-600">Small Businesses</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#1E88C8] mb-1">Corporations</div>
                      <div className="text-sm text-gray-600">Large Enterprises</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#1E88C8] mb-1">Organizations</div>
                      <div className="text-sm text-gray-600">Non-Profits & NGOs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#1E88C8] mb-1">Agencies</div>
                      <div className="text-sm text-gray-600">Marketing & Design</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-10 pt-8 border-t border-gray-200">
                  <a
                    href="/services"
                    className="inline-flex items-center text-[#1E88C8] hover:text-[#1976B2] font-semibold text-lg"
                  >
                    <span>Explore Our Services</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CompanyProfile;