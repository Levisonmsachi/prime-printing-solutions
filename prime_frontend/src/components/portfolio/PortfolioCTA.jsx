import { ArrowRight } from "lucide-react";

const PortfolioCTA = ({ data }) => {
  return (
    <section className="py-24 bg-linear-to-r from-[#1E88C8] to-[#1976B2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header */}
        <div className="mb-10">
          <div className="w-16 h-1 bg-white/40 mx-auto mb-6 rounded-full"></div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight tracking-tight">
            {data.message}
          </h2>

          <p className="text-lg text-white/90 max-w-xl mx-auto leading-relaxed">
            From concept to print, we deliver results you can trust.
          </p>
        </div>

        {/* CTA Button */}
        <a
          href={data.button_link}
          className="
            inline-flex items-center gap-3 
            px-9 py-4 
            bg-white text-[#111111] 
            font-semibold rounded-lg 
            shadow-lg
            transition-all duration-300
            hover:bg-gray-50
            hover:shadow-2xl
            hover:-translate-y-0.5
            group
          "
        >
          <span>{data.button_text}</span>
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </a>

        {/* Trust line */}
        <p className="mt-12 text-sm text-white/80">
          Fast turnaround • Premium quality • Reliable support
        </p>
      </div>
    </section>
  );
};

export default PortfolioCTA;
