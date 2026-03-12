import { useState, useEffect } from "react";
import { ExternalLink, Calendar, Tag, X, Award, Users } from "lucide-react";

const PortfolioProjects = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get unique categories from projects
  const categories = ["all", ...new Set(data.map(project => project.category_name).filter(Boolean))];

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

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === "all"
    ? data
    : data.filter(project => project.category_name === selectedCategory);

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  // Base backend URL (works in dev & production)
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  // Function to get full image URL
  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return null;

    // Already a full URL (Cloudinary, S3, etc.)
    if (imagePath.startsWith("http")) return imagePath;

    // Prevent double slashes
    const cleanPath = imagePath.startsWith("/")
      ? imagePath.slice(1)
      : imagePath;

    return `${API_BASE_URL}/${cleanPath}`;
  };


  return (
    <>
      <section id="portfolio-projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Showcasing our best work and successful collaborations.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-[#1E88C8] text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                }`}
              >
                {category === "all" ? "All Projects" : category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
                onClick={() => openProjectModal(project)}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  {project.cover_image_url ? (
                    <img
                      src={getFullImageUrl(project.cover_image_url)}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-[#1E88C8]/10 to-[#1976B2]/10 flex items-center justify-center">
                      <span className="text-4xl font-bold text-[#1E88C8]">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#1E88C8] text-white text-xs px-3 py-1 rounded-full font-semibold">
                      {project.category_name}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-[#1E88C8] transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-gray-700 text-sm mb-4 leading-relaxed line-clamp-2">
                    {project.short_description}
                  </p>

                  {/* Client Info */}
                  {project.client_name && (
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <Users className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{project.client_name}</span>
                    </div>
                  )}

                  {/* Project highlights */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.highlights.slice(0, 2).map((highlight) => (
                          <span
                            key={highlight.id}
                            className="inline-flex items-center px-2 py-1 bg-[#1E88C8]/10 text-[#1E88C8] text-xs font-medium rounded-full"
                          >
                            <Award className="w-3 h-3 mr-1" />
                            {highlight.label}: {highlight.value}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{project.created_at ? new Date(project.created_at).getFullYear() : "Recent"}</span>
                    </div>
                    <div className="flex items-center text-[#1E88C8] font-semibold hover:text-[#1976B2] transition-colors duration-300">
                      <span className="mr-1">View Details</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal - Fixed for visibility */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
            onClick={closeProjectModal}
          />
          
          {/* Modal Container */}
          <div className="relative z-10000 bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeProjectModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>

            <div className="overflow-y-auto max-h-[90vh]">
              {/* Modal Content */}
              <div className="p-8">
                {/* Modal Header */}
                <div className="mb-8">
                  <div className="inline-flex items-center px-3 py-1 bg-[#1E88C8]/10 text-[#1E88C8] font-semibold rounded-full text-sm mb-3">
                    {selectedProject.category_name}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedProject.title}
                  </h2>
                </div>

                {/* Cover Image */}
                {selectedProject.cover_image_url && (
                  <div className="mb-8">
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      <img
                        src={getFullImageUrl(selectedProject.cover_image_url)}
                        alt={selectedProject.title}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Project Details */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Project Overview</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {selectedProject.full_description || selectedProject.short_description}
                    </p>

                    {selectedProject.client_name && (
                      <div className="mt-6">
                        <div className="flex items-center text-gray-700 mb-1">
                          <Users className="w-5 h-5 text-[#1E88C8] mr-2" />
                          <span className="font-semibold">Client:</span>
                        </div>
                        <p className="text-gray-600 ml-7">{selectedProject.client_name}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Project Highlights</h3>
                    {selectedProject.highlights && selectedProject.highlights.length > 0 ? (
                      <div className="space-y-4">
                        {selectedProject.highlights.map((highlight) => (
                          <div key={highlight.id} className="bg-gray-50 rounded-lg p-4">
                            <div className="font-semibold text-gray-900 mb-1">{highlight.label}</div>
                            <div className="text-[#1E88C8] font-medium">{highlight.value}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-700">No highlights available</p>
                    )}
                  </div>
                </div>

                {/* Project Images */}
                {selectedProject.images && selectedProject.images.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Project Images</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedProject.images.map((image) => (
                        <div key={image.id} className="bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={getFullImageUrl(image.image_url)}
                            alt={image.caption || selectedProject.title}
                            className="w-full h-48 object-cover"
                          />
                          {image.caption && (
                            <div className="p-3 text-sm text-gray-600">
                              {image.caption}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="border-t border-gray-200 pt-8">
                  <a
                    href="/contact"
                    className="inline-flex items-center px-8 py-3 bg-[#1E88C8] text-white font-semibold rounded-lg hover:bg-[#1976B2] transition-colors duration-300 shadow-lg"
                  >
                    Start Similar Project
                    <ExternalLink className="w-5 h-5 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioProjects;