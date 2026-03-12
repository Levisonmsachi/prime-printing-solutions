import {
  ArrowRight,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Award
} from "lucide-react";

const CertificationsCTA = ({ data }) => {
  return (
    <section className="relative py-24 bg-linear-to-br from-white via-[#F9F9F9] to-[#F0F7FF] overflow-hidden">
      
      {/* Top section divider - subtle blue line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#1E88C8]/20 to-transparent"></div>

      {/* Soft background glow */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#1E88C8]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#1976B2]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Trust pill */}
        <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 bg-[#1E88C8]/10 backdrop-blur-sm rounded-full border border-[#1E88C8]/20">
          <ShieldCheck className="w-5 h-5 text-[#1E88C8]" />
          <span className="text-sm font-semibold text-[#1E88C8] tracking-wide">
            Certified · Audited · Fully Compliant
          </span>
        </div>

        {/* Main heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-[#111111] leading-tight mb-6">
          {data.message}
        </h2>

        {/* Supporting copy */}
        <p className="text-lg md:text-xl text-[#111111]/70 max-w-3xl mx-auto mb-12 leading-relaxed">
          We operate under strict industry standards, verified processes, and
          continuous compliance checks — giving you confidence, consistency,
          and peace of mind on every project.
        </p>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-14">
          <a
            href={data.button_link}
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#1E88C8] text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:bg-[#1976B2] transition-all duration-300 text-lg"
          >
            {data.button_text}
            <ArrowRight className="w-6 h-6" />
          </a>

          {/* Secondary actions */}
          <div className="flex gap-4">
            <a
              href="tel:+265996678548"
              className="inline-flex items-center gap-2 px-6 py-4 bg-[#1E88C8]/10 backdrop-blur-sm text-[#1E88C8] font-semibold rounded-xl border border-[#1E88C8]/20 hover:bg-[#1E88C8]/20 hover:text-[#1976B2] transition-all"
            >
              <Phone className="w-5 h-5" />
              Call
            </a>

            <a
              href="mailto:primeprintsolutions25@outlook.com"
              className="inline-flex items-center gap-2 px-6 py-4 bg-[#1E88C8]/10 backdrop-blur-sm text-[#1E88C8] font-semibold rounded-xl border border-[#1E88C8]/20 hover:bg-[#1E88C8]/20 hover:text-[#1976B2] transition-all"
            >
              <Mail className="w-5 h-5" />
              Email
            </a>
          </div>
        </div>

        {/* Trust pillars (generic & safe) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">

          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <Award className="w-7 h-7 text-[#1E88C8] mx-auto mb-3" />
            <p className="text-sm font-semibold text-[#111111]">
              Industry-Recognized Standards
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <ShieldCheck className="w-7 h-7 text-[#1E88C8] mx-auto mb-3" />
            <p className="text-sm font-semibold text-[#111111]">
              Independently Verified Processes
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <CheckCircle2 className="w-7 h-7 text-[#1E88C8] mx-auto mb-3" />
            <p className="text-sm font-semibold text-[#111111]">
              Continuous Compliance Monitoring
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CertificationsCTA;