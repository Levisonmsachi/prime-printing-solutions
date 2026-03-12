const Intro = ({ data }) => {
  return (
    <section className="bg-white py-20">
      {/* Main content - full width with small padding on sides */}
      <div className="px-4 md:px-8 lg:px-12 mx-auto">
        <div className="relative bg-linear-to-br from-white to-[#F6F4EE] rounded-2xl p-12 shadow-sm border border-gray-100">
          {/* Heading with accent - now on one line */}
          <div className="mb-10">
            <div className="inline-flex items-center mb-6">
              <div className="w-16 h-1 bg-linear-to-r from-[#1E88C8] to-[#E91E78] rounded-full"></div>
              <div className="mx-4 text-[#1E88C8] font-semibold text-sm tracking-wider">
                WELCOME
              </div>
              <div className="w-16 h-1 bg-linear-to-r from-[#E91E78] to-[#1E88C8] rounded-full"></div>
            </div>
            
            {/* Header on one line with original colors */}
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="text-[#111111]">Prints That Speak </span>
              <span className="text-[#1E88C8]">Loud And Clear</span>
            </h2>
          </div>
          
          {/* Content with elegant typography */}
          <div className="relative">
            {/* Quotation marks */}
            <div className="absolute -top-8 -left-4 text-6xl text-[#1E88C8]/10 font-serif">"</div>
            
            <p className="text-xl text-gray-700 leading-relaxed tracking-wide font-light">
              {data.content}
            </p>
            
            <div className="absolute -bottom-8 -right-4 text-6xl text-[#1E88C8]/10 font-serif">"</div>
          </div>
          
          {/* Stats or highlights (optional) */}
          <div className="mt-12 pt-8 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1E88C8] mb-2">{data.delivered_projects}</div>
              <div className="text-sm text-gray-600 font-medium">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#E91E78] mb-2">{data.clients_satisfied}%</div>
              <div className="text-sm text-gray-600 font-medium">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#111111] mb-2">{data.years_experience}</div>
              <div className="text-sm text-gray-600 font-medium">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;