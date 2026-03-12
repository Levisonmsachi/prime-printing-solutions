import { Briefcase, ArrowRight } from "lucide-react";

const PortfolioIntro = ({ data }) => {
  return (
    <section className="relative py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Icon */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="w-20 h-20 bg-[#1E88C8]/10 rounded-2xl flex items-center justify-center border border-[#1E88C8]/20 shadow-sm">
              <Briefcase className="w-10 h-10 text-[#1E88C8]" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] mb-6 tracking-tight leading-tight">
            {data.title}
          </h1>

          {/* Accent */}
          <div className="w-20 h-1 bg-[#1E88C8] mx-auto rounded-full mb-8"></div>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-[#111111]/70 leading-relaxed mb-12">
            {data.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-up">
            <a
              href="#portfolio-projects"
              className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#1E88C8] text-white font-semibold rounded-lg hover:bg-[#1976B2] transition-all duration-300 shadow-md hover:shadow-lg min-w-45"
            >
              View Our Work
              <ArrowRight className="w-5 h-5" />
            </a>

            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#111111] font-semibold rounded-lg border border-gray-200 hover:border-[#1E88C8] hover:text-[#1E88C8] transition-all duration-300 shadow-sm hover:shadow-md min-w-45"
            >
              Start a Project
            </a>
          </div>

          {/* Trust Line */}
          <p className="mt-16 text-sm text-gray-500">
            Trusted by brands across multiple industries
          </p>
        </div>
      </div>
    </section>
  );
};

export default PortfolioIntro;
