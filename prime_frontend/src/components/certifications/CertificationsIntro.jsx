import { Award } from "lucide-react";

const CertificationsIntro = ({ data }) => {
  return (
    <section className="relative py-20 bg-linear-to-br from-slate-50 via-white to-blue-50 overflow-hidden">

      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%231E88C8%22%20fill-opacity%3D%220.035%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221.5%22/%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Compact Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-xl bg-linear-to-br from-[#1E88C8] to-[#1976B2] flex items-center justify-center shadow-md shadow-[#1E88C8]/20">
            <Award className="w-7 h-7 text-white" />
          </div>
        </div>

        {/* Label */}
        <span className="inline-block px-4 py-1.5 mb-5 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#1E88C8]/10 text-[#1E88C8]">
          Certifications & Compliance
        </span>

        {/* One-line Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#111111] mb-6">
          {data.title}
        </h1>

        {/* Primary Intro Text */}
        <p className="text-lg text-[#111111]/70 leading-relaxed max-w-3xl mx-auto mb-6">
          {data.subtitle}
        </p>

        {/* Added Contextual Intro (Very Important) */}
        <p className="text-base text-[#111111]/60 leading-relaxed max-w-3xl mx-auto">
          These certifications validate our operational standards, environmental responsibility,
          and regulatory compliance. They reflect ongoing audits, verified processes, and our
          commitment to delivering reliable, industry-approved printing solutions you can trust.
        </p>

        {/* Optional CMS-driven description */}
        {data.description && (
          <p className="mt-4 text-base text-[#111111]/55 leading-relaxed max-w-3xl mx-auto">
            {data.description}
          </p>
        )}

        {/* Divider */}
        <div className="mt-12 flex justify-center">
          <div className="w-24 h-0.5 bg-linear-to-r from-transparent via-[#1E88C8] to-transparent"></div>
        </div>

      </div>
    </section>
  );
};

export default CertificationsIntro;
