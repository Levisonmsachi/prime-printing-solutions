import { Calendar, Milestone } from "lucide-react";

const CompanyHistory = ({ data }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header with subtle lines */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-6">
            <div className="w-20 h-1 bg-[#1E88C8] mx-auto mb-4 rounded-full"></div>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <Calendar className="w-5 h-5 text-[#1E88C8]" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative">
            {data.title || "Our Journey"}
            <div className="w-24 h-0.5 bg-gray-300 mx-auto mt-4"></div>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From humble beginnings to industry leadership - our story of growth and innovation.
          </p>
        </div>

        {/* Enhanced Content Card - Slightly wider and more refined */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-10 md:p-12 border border-gray-100">
            {/* Subtle timeline indicator */}
            <div className="flex items-center mb-8 pb-8 border-b border-gray-200">
              <div className="w-12 h-12 bg-linear-to-br from-[#1E88C8]/10 to-[#1E88C8]/5 rounded-lg flex items-center justify-center mr-4">
                <Milestone className="w-6 h-6 text-[#1E88C8]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#1E88C8] uppercase tracking-wider mb-1">Our History</div>
                <h3 className="text-2xl font-bold text-gray-900">A Legacy of Excellence</h3>
              </div>
            </div>
            
            {/* Content with subtle left border */}
            <div className="relative pl-6 md:pl-8">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-[#1E88C8] to-[#1E88C8]/30 rounded-full"></div>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                  {data.content}
                </p>
              </div>
            </div>
            
            {/* Subtle footer */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#1E88C8] mr-2"></div>
                  <span>Continuing to write our story</span>
                </div>
                <div className="font-medium text-gray-700">
                  Est. {data.year || "2025"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyHistory;