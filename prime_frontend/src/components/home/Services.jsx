import React from "react";

const Services = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }

  // Define color palette for different service cards
  const colorThemes = [
    {
      primary: "#1E88C8", // Your primary blue
      accent: "#E91E78",  // Magenta accent
      gradient: "from-[#1E88C8] to-[#0D47A1]",
      iconBg: "bg-[#1E88C8]/10",
      iconColor: "text-[#1E88C8]"
    },
    {
      primary: "#2E7D32", // Professional green
      accent: "#FF9800",  // Orange accent
      gradient: "from-[#2E7D32] to-[#1B5E20]",
      iconBg: "bg-[#2E7D32]/10",
      iconColor: "text-[#2E7D32]"
    },
    {
      primary: "#6A1B9A", // Professional purple
      accent: "#00ACC1",  // Teal accent
      gradient: "from-[#6A1B9A] to-[#4A148C]",
      iconBg: "bg-[#6A1B9A]/10",
      iconColor: "text-[#6A1B9A]"
    },
    {
      primary: "#C2185B", // Deep pink
      accent: "#F4C430",  // Your yellow
      gradient: "from-[#C2185B] to-[#AD1457]",
      iconBg: "bg-[#C2185B]/10",
      iconColor: "text-[#C2185B]"
    },
    {
      primary: "#00796B", // Teal
      accent: "#FFB300",  // Amber
      gradient: "from-[#00796B] to-[#004D40]",
      iconBg: "bg-[#00796B]/10",
      iconColor: "text-[#00796B]"
    },
    {
      primary: "#5D4037", // Brown
      accent: "#8D6E63",  // Light brown
      gradient: "from-[#5D4037] to-[#3E2723]",
      iconBg: "bg-[#5D4037]/10",
      iconColor: "text-[#5D4037]"
    }
  ];

  const getColorTheme = (index) => {
    return colorThemes[index % colorThemes.length];
  };

  // Default icons for printing services (FontAwesome classes)


  return (
    <section className="bg-[#F6F4EE] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#111111] mb-4">
          Our Services
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Comprehensive printing solutions tailored to your business needs
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((service, index) => {
            const theme = getColorTheme(index);
            
            return (
              <div
                key={index}
                className="relative bg-white rounded-xl overflow-hidden group transition-all duration-500 hover:-translate-y-2"
              >
                {/* Water fill animation background with theme color */}
                <div 
                  className="absolute inset-0 transition-all duration-500 ease-out translate-y-full group-hover:translate-y-0"
                  style={{
                    background: `linear-gradient(to top, ${theme.primary}05, ${theme.primary}10, ${theme.primary}15)`
                  }}
                />
                
                {/* Corner accent */}
                <div 
                  className="absolute top-0 right-0 w-12 h-12 overflow-hidden"
                  style={{ color: theme.accent }}
                >
                  <div className="absolute top-0 right-0 w-8 h-8 transform translate-x-4 -translate-y-4 rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                       style={{ backgroundColor: theme.accent }}
                  />
                </div>
                
                {/* Main content */}
                <div className="relative z-10 p-8">
                  {/* Icon with theme */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      {/* Animated icon background */}
                      <div className={`absolute -ins-2 rounded-full ${theme.iconBg} opacity-0 group-hover:opacity-100 blur transition-opacity duration-500`} />
                      
                      {/* Icon container with SVG icon */}
                      <div 
                        className={`relative w-16 h-16 rounded-full flex items-center justify-center ${theme.iconColor} transition-all duration-300 group-hover:text-white group-hover:bg-[${theme.primary}]`}
                        style={{ 
                          backgroundColor: theme.primary + '10',
                          border: `2px solid ${theme.primary}30`
                        }}
                      >
                        {/* Computer SVG Icon */}
                        <svg 
                          className="w-8 h-8"
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/>
                        </svg>
                      </div>
                      
                      {/* Pulse animation on hover */}
                      <div 
                        className="absolute -inset-4 rounded-full opacity-0 group-hover:opacity-40 group-hover:animate-ping transition-opacity duration-700"
                        style={{ backgroundColor: theme.primary }}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 
                    className="font-bold text-xl mb-4 text-center transition-colors duration-300 group-hover:scale-105"
                    style={{ color: theme.primary }}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed text-center group-hover:text-gray-800 transition-colors duration-300">
                    {service.description}
                  </p>

                  {/* Service features (static, not blocking button) */}
                  <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Premium Quality</span>
                      <span className="mx-2">•</span>
                      <span className="font-medium">Fast Turnaround</span>
                    </div>
                  </div>

                  {/* Learn More Button */}
                  <div className="flex justify-center mt-8">
                    <a
                      href="/services"
                      className="flex items-center space-x-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-300 group-hover:scale-105"
                      style={{
                        backgroundColor: theme.primary + '10',
                        color: theme.primary,
                        border: `1px solid ${theme.primary}30`
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = theme.primary;
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = theme.primary + '10';
                        e.currentTarget.style.color = theme.primary;
                      }}
                    >
                      <span>Learn More</span>
                      <svg 
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>

                  {/* Bottom accent line */}
                  <div 
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 transition-all duration-500 group-hover:w-3/4"
                    style={{
                      background: `linear-gradient(to right, transparent, ${theme.primary}, transparent)`
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <a
            href="/services"
            className="inline-block px-8 py-3.5 bg-[#1E88C8] text-white font-semibold rounded-lg hover:bg-[#E91E78] transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            View All Services
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;