import { Award, Target } from "lucide-react";

const CompanyImpact = ({ data }) => {
  // Handle both single object and array of impacts
  const impacts = Array.isArray(data) ? data : (data ? [data] : []);

  // If no data, don't render anything
  if (!data || impacts.length === 0) {
    return null;
  }
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mb-6">
            Our Impact
          </h2>
          {/* Added line below header */}
          <div className="w-24 h-1 bg-[#1E88C8] mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Making a difference in our community and industry through commitment and innovation.
          </p>
        </div>

        {/* Impact Stories */}
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            {impacts.map((impact, index) => (
              <div key={impact.id || index} className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-[#1E88C8]/10 rounded-lg flex items-center justify-center mr-4">
                    <Award className="w-6 h-6 text-[#1E88C8]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#111111]">
                    {impact.title}
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {impact.description}
                </p>
              </div>
            ))}
          </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-linear-to-r from-[#1E88C8]/5 via-white to-[#1E88C8]/5 rounded-2xl p-8 md:p-12 shadow-inner border border-gray-100">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1E88C8]/10 mb-6">
                <Target className="w-8 h-8 text-[#1E88C8]" />
              </div>
              <h3 className="text-2xl font-bold text-[#111111] mb-4">
                Ready to Be Part of Our Success Story?
              </h3>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Join hundreds of satisfied clients who trust us with their printing needs. Let's create something amazing together.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center bg-[#1E88C8] hover:bg-[#1976B2] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-md"
              >
                <span>Start Your Project</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyImpact;