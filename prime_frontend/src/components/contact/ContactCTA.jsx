import { ArrowRight, Phone, Mail, MessageCircle } from "lucide-react";

const ContactCTA = () => {
  return (
    <section className="relative py-24 bg-white overflow-hidden">

      {/* Background glow - matching ContactIntro */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#1E88C8]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#1976B2]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header matching ContactIntro style */}
        <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 bg-[#1E88C8]/10 backdrop-blur-sm rounded-full border border-[#1E88C8]/20">
          <MessageCircle className="w-5 h-5 text-[#1E88C8]" />
          <span className="text-sm font-semibold text-[#1E88C8] tracking-wide">
            Ready to Start?
          </span>
        </div>

        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-[#111111] leading-tight mb-6">
          Ready to Start Your Project?
        </h2>

        {/* Divider */}
        <div className="w-20 h-1 bg-[#1E88C8] mx-auto mb-8 rounded-full"></div>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-[#111111]/70 max-w-3xl mx-auto mb-12 leading-relaxed">
          Let's discuss how we can help bring your vision to life with our expert printing solutions and industry-leading service.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a
            href="tel:+265996678548"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#1E88C8] text-white font-bold rounded-xl hover:bg-[#1976B2] hover:shadow-xl transition-all duration-300"
          >
            <Phone className="w-5 h-5" />
            Call Now
            <ArrowRight className="w-5 h-5" />
          </a>
          
          <a
            href="mailto:primeprintsolutions25@outlook.com"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#111111] font-semibold rounded-xl border border-gray-200 hover:border-[#1E88C8] hover:text-[#1E88C8] transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
            Email Us
          </a>
        </div>

        {/* Divider */}
        <div className="flex justify-center">
          <div className="w-32 h-1 bg-linear-to-r from-transparent via-[#1E88C8] to-transparent rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;