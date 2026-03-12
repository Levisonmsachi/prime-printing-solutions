import { Mail, Phone, Linkedin } from "lucide-react";

const TeamMembers = ({ data }) => {
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
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Meet Our Team
          </h2>
          {/* Added line below header */}
          <div className="w-24 h-1 bg-[#1E88C8] mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our dedicated professionals bring years of experience and passion to every project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((member) => (
            <div key={member.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              {/* Image */}
              <div className="relative h-64 bg-linear-to-br from-blue-100 to-blue-200">
                {member.avatar_url || member.avatar ? (
                  <img
                    src={getFullImageUrl(member.avatar_url || member.avatar)}
                    alt={member.full_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-4xl font-bold text-blue-600">
                      {member.full_name.charAt(0)}
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {member.full_name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  {member.bio}
                </p>

                {/* Contact info */}
                <div className="space-y-2">
                  {member.email && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      <a href={`mailto:${member.email}`} className="hover:text-blue-600">
                        {member.email}
                      </a>
                    </div>
                  )}
                  {member.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      <a href={`tel:${member.phone}`} className="hover:text-blue-600">
                        {member.phone}
                      </a>
                    </div>
                  )}
                  {member.linkedin && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Linkedin className="w-4 h-4 mr-2" />
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                        LinkedIn Profile
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;