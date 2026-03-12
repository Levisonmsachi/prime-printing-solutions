import { Wrench } from "lucide-react";

const ServicesIntro = ({ data }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Compact Icon Section */}
          <div className="mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-[#1E88C8] to-[#1976B2] rounded-2xl shadow-lg mb-6">
              <Wrench className="w-10 h-10 text-white" />
            </div>
            
            {/* Subtle line under icon */}
            <div className="w-16 h-1 bg-[#1E88C8] mx-auto rounded-full mb-6"></div>
          </div>

          {/* Title with Compact Line */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {data.title}
            </h1>
            
            {/* Main accent line */}
            <div className="w-24 h-1.5 bg-[#1E88C8] mx-auto rounded-full"></div>
            
            {/* Subtle secondary line */}
            <div className="w-32 h-0.5 bg-[#1E88C8]/30 mx-auto mt-2 rounded-full"></div>
          </div>

          {/* Subtitle - Compact and Clean */}
          <div className="max-w-2xl mx-auto">
            <p className="text-xl text-gray-600 leading-relaxed">
              {data.subtitle}
            </p>
          </div>

          {/* Optional Description - More Compact */}
          {data.description && (
            <div className="max-w-2xl mx-auto mt-8">
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-linear-to-b from-[#1E88C8] to-[#1976B2] rounded-full hidden md:block"></div>
                <p className="text-lg text-gray-500 leading-relaxed md:pl-6">
                  {data.description}
                </p>
              </div>
            </div>
          )}

          {/* Minimal Bottom Decoration */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <span>Premium Printing Solutions</span>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <span>Expert Craftsmanship</span>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <span>Quality Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesIntro;