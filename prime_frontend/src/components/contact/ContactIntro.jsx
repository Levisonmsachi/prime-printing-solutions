import { ArrowRight, Phone, Mail, MessageCircle } from "lucide-react";

const ContactIntro = ({ data }) => {
  return (
    <section className="relative py-24 bg-linear-to-br from-white via-[#F9F9F9] to-[#F0F7FF] overflow-hidden">

      {/* Soft background glow in blue tones */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#1E88C8]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#1976B2]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Trust pill in blue */}
        <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 bg-[#1E88C8]/10 backdrop-blur-sm rounded-full border border-[#1E88C8]/20">
          <MessageCircle className="w-5 h-5 text-[#1E88C8]" />
          <span className="text-sm font-semibold text-[#1E88C8] tracking-wide">
            Let's Talk About Your Next Project
          </span>
        </div>

        {/* Heading with gradient blue */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#111111] leading-tight mb-6">
          {data.title || "Get in Touch With Our Team"}
          <span className="block mt-4 text-transparent bg-clip-text bg-linear-to-r from-[#1E88C8] to-[#1976B2]">
            We're Here to Help
          </span>
        </h1>

        {/* Subheading in dark gray */}
        <p className="text-lg md:text-xl text-[#111111]/70 max-w-3xl mx-auto mb-12 leading-relaxed">
          {data.subtitle || "Have questions about our printing services? Reach out to our expert team for personalized guidance and support."}
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-14">
          <a
            href="#contact-form"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#1E88C8] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-[#1976B2] transition-all duration-300 text-lg"
          >
            {data.button_text || "Send a Message"}
            <ArrowRight className="w-6 h-6" />
          </a>

          {/* Secondary contact actions */}
          <div className="flex gap-4">
            <a
              href="tel:+265996678548"
              className="inline-flex items-center gap-2 px-6 py-4 bg-[#1E88C8]/10 backdrop-blur-sm text-[#1E88C8] font-semibold rounded-xl border border-[#1E88C8]/20 hover:bg-[#1E88C8]/20 transition-all"
            >
              <Phone className="w-5 h-5" />
              Call
            </a>

            <a
              href="mailto:primeprintsolutions25@outlook.com"
              className="inline-flex items-center gap-2 px-6 py-4 bg-[#1E88C8]/10 backdrop-blur-sm text-[#1E88C8] font-semibold rounded-xl border border-[#1E88C8]/20 hover:bg-[#1E88C8]/20 transition-all"
            >
              <Mail className="w-5 h-5" />
              Email
            </a>
          </div>
        </div>

        {/* Decorative element */}
        <div className="mt-4">
          <div className="inline-flex items-center justify-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#1E88C8]/20 animate-pulse" />
            <div className="w-8 h-1 rounded-full bg-[#1E88C8]/40" />
            <div className="w-3 h-3 rounded-full bg-[#1E88C8]/30 animate-pulse" />
            <div className="w-8 h-1 rounded-full bg-[#1E88C8]/40" />
            <div className="w-3 h-3 rounded-full bg-[#1E88C8]/20 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactIntro;