const Hero = ({ data }) => {
  if (!data) {
    return (
      <section className="relative min-h-[85vh] flex items-center justify-center bg-[#F6F4EE]">
        <div className="text-[#111111] text-lg">Content Loading</div>
      </section>
    );
  }

  const heroData = data;
  
  const backgroundStyle = heroData.background_image_url
    ? {
        backgroundImage: `url(${heroData.background_image_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#F6F4EE'
      }
    : { backgroundColor: '#F6F4EE' };

  return (
    <section className="relative min-h-[85vh] flex items-center" style={backgroundStyle}>
      
      {/* Stronger overlay for better text contrast with any background */}
      {heroData.background_image_url && (
        <div className="absolute inset-0 bg-linear-to-r from-black/50 to-black/30"></div>
      )}
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 lg:py-20">
        
        {/* Main Title & Subtitle - Enhanced contrast */}
        <div className="mb-12 md:mb-16">
          {/* Section indicator with stronger contrast */}
          <div className="inline-block mb-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
            <span className="text-sm font-bold text-[#1E88C8] uppercase tracking-wider">
              WELCOME TO PRIME PRINT SOLUTIONS
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg mb-4 leading-tight">
            {heroData.title || "Prime Printing Solutions"}
          </h1>
          
          <div className="h-1.5 w-32 bg-white my-6 drop-shadow"></div>
          
          <p className="text-xl md:text-2xl text-white drop-shadow max-w-3xl font-medium leading-relaxed">
            {heroData.subtitle || "High-quality commercial and branding print solutions"}
          </p>
        </div>

        {/* Feature Cards - White cards that stand out on any background */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {[heroData.message_1, heroData.message_2, heroData.message_3]
            .filter(Boolean)
            .map((message, index) => {
              const colorConfigs = [
                { accent: '#1E88C8', label: 'Excellence' },
                { accent: '#E91E78', label: 'Reliability' },
                { accent: '#111111', label: 'Innovation' }
              ];
              const config = colorConfigs[index] || colorConfigs[0];
              
              return (
                <div 
                  key={index}
                  className="group bg-white/95 backdrop-blur-sm rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 border border-white/20"
                >
                  {/* Top colored accent bar */}
                  <div 
                    className="h-2 w-full"
                    style={{ backgroundColor: config.accent }}
                  ></div>
                  
                  <div className="p-8 text-center">
                    {/* Label with accent color */}
                    <div className="mb-4">
                      <span 
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: config.accent }}
                      >
                        {config.label}
                      </span>
                    </div>
                    
                    {/* Main message */}
                    <h3 className="text-2xl font-bold text-[#111111] leading-tight mb-6">
                      {message}
                    </h3>
                    
                    {/* Optional description */}
                    <div>
                      <p className="text-sm text-gray-700 font-light">
                        {index === 0 && "Premium materials and finishes for impactful branding"}
                        {index === 1 && "Efficient processes ensuring timely project delivery"}
                        {index === 2 && "Sustainable practices and modern printing technology"}
                      </p>
                    </div>
                  </div>
                  
                  {/* Bottom accent */}
                  <div 
                    className="h-1 w-full opacity-80"
                    style={{ backgroundColor: config.accent }}
                  ></div>
                </div>
              );
            })}
        </div>

        {/* Call to Action - High contrast button */}
        <div className="text-center mt-12 pt-8">
          <a
            href="/request-quote"
            className="inline-flex items-center bg-[#1E88C8] hover:bg-[#1976B2] text-white font-bold py-4 px-10 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white/20"
          >
            <span>REQUEST A QUOTE</span>
            <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <p className="text-white drop-shadow text-sm mt-4 font-medium">
            Get started with your custom printing project today
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;