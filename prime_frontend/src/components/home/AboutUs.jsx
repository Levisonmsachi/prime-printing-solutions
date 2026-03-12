import React from "react";

const AboutUs = ({ data }) => {
  if (!data) return null;

  return (
    <section className="max-w-6xl mx-auto py-20 px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold text-white mb-6">
            {data.title || "About Prime Printing Solutions"}
          </h2>
          <div className="space-y-4 text-gray-300">
            {data.content && Array.isArray(data.content) ? (
              data.content.map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="leading-relaxed">
                {data.content || "Prime Printing Solutions is a professional printing company delivering high-quality branding, packaging, and commercial print solutions. We combine creativity, precision, and modern technology to help businesses stand out."}
              </p>
            )}
          </div>
          
          {data.stats && data.stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
              {data.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-red-500 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="relative">
          {data.image && (
            <img 
              src={data.image.url} 
              alt={data.image.alt || "About Us"} 
              className="rounded-xl shadow-2xl"
            />
          )}
          {data.overlay_text && (
            <div className="absolute -bottom-6 -right-6 bg-red-600 text-white p-6 rounded-xl max-w-xs">
              <p className="font-bold">{data.overlay_text}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;