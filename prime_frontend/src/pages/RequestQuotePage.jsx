import SubmitQuoteForm from "../components/quote/SubmitQuoteForm";
import { Briefcase, Package, MessageCircle, Target } from "lucide-react";

const RequestQuotePage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section with whitish background */}
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
              Get Your Custom Printing Quote
            </span>
          </div>

          {/* Heading in blue */}
          <h1 className="text-4xl md:text-5xl font-bold text-[#111111] leading-tight mb-6">
            Precision Printing Solutions
            <span className="block mt-4 text-transparent bg-clip-text bg-linear-to-r from-[#1E88C8] to-[#1976B2]">
              Tailored to Your Vision
            </span>
          </h1>

          {/* Subheading in dark gray */}
          <p className="text-lg md:text-xl text-[#111111]/70 max-w-3xl mx-auto mb-12 leading-relaxed">
            Share your project details and receive a comprehensive, no-obligation quote within 24 hours. 
            Our experts will help you find the perfect printing solution for your business.
          </p>

          {/* Additional Info with blue icons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-4">
            <div className="flex items-center gap-3 text-[#1E88C8]">
              <div className="p-2 bg-[#1E88C8]/10 rounded-lg">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-[#111111]">All Project Types</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-[#1E88C8]/30 rounded-full" />
            <div className="flex items-center gap-3 text-[#1E88C8]">
              <div className="p-2 bg-[#1E88C8]/10 rounded-lg">
                <Package className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-[#111111]">Custom Materials & Finishes</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-[#1E88C8]/30 rounded-full" />
            <div className="flex items-center gap-3 text-[#1E88C8]">
              <div className="p-2 bg-[#1E88C8]/10 rounded-lg">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-[#111111]">Expert Consultation</span>
            </div>
          </div>

          {/* Decorative element */}
          <div className="mt-10 mb-6">
            <div className="inline-flex items-center justify-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#1E88C8]/20 animate-pulse" />
              <div className="w-8 h-1 rounded-full bg-[#1E88C8]/40" />
              <div className="w-3 h-3 rounded-full bg-[#1E88C8]/30 animate-pulse" />
              <div className="w-8 h-1 rounded-full bg-[#1E88C8]/40" />
              <div className="w-3 h-3 rounded-full bg-[#1E88C8]/20 animate-pulse" />
            </div>
          </div>

          {/* Required fields note in blue */}
          <div className="mt-8">
            <p className="text-sm text-[#111111]/70">
              All fields marked with <span className="font-bold text-[#1E88C8]">*</span> are required
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <SubmitQuoteForm />
        </div>
      </section>
    </div>
  );
};

export default RequestQuotePage;