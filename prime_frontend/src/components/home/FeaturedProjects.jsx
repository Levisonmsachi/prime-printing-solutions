import React, { useState, useEffect } from "react";

const FeaturedProjects = ({ data }) => {
  const [selectedProject, setSelectedProject] = useState(null);
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

  if (!data || data.length === 0) return null;

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <section className="bg-[#F6F4EE] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#111111] mb-4">
            Featured Projects
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Explore our portfolio of successful printing projects
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((project, index) => (
              <div
                key={index}
                className="relative bg-white rounded-xl overflow-hidden group transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                onClick={() => openModal(project)}
              >
                {/* Water fill animation background */}
                <div className="absolute inset-0 bg-linear-to-t from-[#1E88C8]/0 via-[#1E88C8]/0 to-[#1E88C8]/0 group-hover:from-[#1E88C8]/5 group-hover:via-[#1E88C8]/10 group-hover:to-[#1E88C8]/15 transition-all duration-500 ease-out translate-y-full group-hover:translate-y-0"></div>
                
                <div className="relative z-10">
                  {/* Project Image */}
                  {project.image_url && (
                    <div className="relative overflow-hidden h-56">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = `
                            <div class="w-full h-full bg-linear-to-br from-[#1E88C8] to-[#E91E78] flex items-center justify-center">
                              <span class="text-white text-xl font-bold">${project.title}</span>
                            </div>
                          `;
                        }}
                      />
                      {/* Image overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
                      
                      {/* View button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <button className="bg-white/90 text-[#111111] px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-white transition-colors duration-300">
                          <span>View Details</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Project Details */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#111111] mb-3 group-hover:text-[#1E88C8] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                    
                    {/* View Project Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(project);
                      }}
                      className="inline-flex items-center px-4 py-2 bg-[#1E88C8] text-white rounded-lg hover:bg-[#1976B2] font-medium transition-colors duration-300 group-hover:bg-[#E91E78] group-hover:text-white"
                    >
                      View Project Details
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-linear-to-r from-[#1E88C8] to-[#E91E78] group-hover:w-3/4 transition-all duration-500 rounded-t-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Popup */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-linear-to-r from-[#1E88C8] to-[#1E88C8]/90 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                  {selectedProject.category && (
                    <span className="inline-block mt-2 px-3 py-1 bg-white/20 text-white text-sm rounded-full">
                      {selectedProject.category}
                    </span>
                  )}
                </div>
                <button
                  onClick={closeModal}
                  className="text-white hover:text-[#F4C430] transition-colors duration-300 p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto max-h-[60vh]">
              {/* Project Image */}
              {selectedProject.image_url && (
                <div className="relative h-64 md:h-80">
                  <img
                    src={selectedProject.image_url}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-full bg-linear-to-br from-[#1E88C8] to-[#E91E78] flex items-center justify-center">
                          <span class="text-white text-2xl font-bold">${selectedProject.title}</span>
                        </div>
                      `;
                    }}
                  />
                </div>
              )}

              {/* Project Details */}
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {/* Project Description */}
                  <div className="md:col-span-2">
                    <h4 className="text-lg font-semibold text-[#111111] mb-3">Project Overview</h4>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedProject.description}
                    </p>
                    
                    {/* Additional details if available */}
                    {selectedProject.details && (
                      <div className="mt-6">
                        <h4 className="text-lg font-semibold text-[#111111] mb-3">Key Features</h4>
                        <ul className="space-y-2">
                          {selectedProject.details.split('\n').map((detail, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-[#1E88C8] mr-2">✓</span>
                              <span className="text-gray-700">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Project Info Sidebar */}
                  <div className="bg-[#F6F4EE] rounded-xl p-5">
                    <h4 className="font-semibold text-[#111111] mb-4">Project Details</h4>
                    
                    {selectedProject.client && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600">Client</p>
                        <p className="font-medium text-[#111111]">{selectedProject.client}</p>
                      </div>
                    )}
                    
                    {selectedProject.date && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600">Completed</p>
                        <p className="font-medium text-[#111111]">
                          {new Date(selectedProject.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    )}
                    
                    {selectedProject.technologies && (
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Technologies Used</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.split(',').map((tech, idx) => (
                            <span key={idx} className="px-3 py-1 bg-white text-[#1E88C8] text-xs rounded-full border border-[#1E88C8]/30">
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 p-6 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Interested in a similar project?
              </div>
              <div className="flex space-x-4">
                {selectedProject.project_link && (
                  <a
                    href={selectedProject.project_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-[#1E88C8] text-white rounded-lg hover:bg-[#1976B2] font-medium transition-colors duration-300 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Project
                  </a>
                )}
                <button
                  onClick={closeModal}
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px); 
          }
          to { 
            opacity: 1;
            transform: translateY(0); 
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default FeaturedProjects;