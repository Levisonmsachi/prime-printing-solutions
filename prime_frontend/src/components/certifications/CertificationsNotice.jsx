import { ShieldCheck, AlertCircle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const CertificationsNotice = ({ data }) => {
  return (
    <section className="py-20 bg-linear-to-br from-[#1E88C8]/5 via-white to-[#1976B2]/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-[#1E88C8] to-[#1976B2] px-8 py-6">
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-4">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Important Certification Notice
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-12">
            <div className="text-center max-w-4xl mx-auto">
              {/* Icon */}
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 bg-linear-to-br from-[#1E88C8]/10 to-[#1976B2]/10 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-10 h-10 text-[#1E88C8]" />
                </div>
              </div>

              {/* Message */}
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 font-medium">
                {data.message}
              </p>

              {/* Additional Info */}
              <div className="bg-linear-to-r from-[#1E88C8]/5 to-[#1976B2]/5 rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-center text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 shrink-0" />
                  <span className="text-sm font-medium">
                    All certifications are subject to regular audits and compliance checks
                  </span>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact"   className="inline-flex items-center px-8 py-4 bg-linear-to-r from-[#1E88C8] to-[#1976B2] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#1E88C8]/25 transition-all duration-300 transform hover:-translate-y-1">
                  <ShieldCheck className="w-5 h-5 mr-2" />
                  Verify Certifications
                </Link>
                <a href="mailto:primeprintsolutions25@outlook.com" className="inline-flex items-center px-8 py-4 bg-white border-2 border-[#1E88C8] text-[#1E88C8] font-semibold rounded-xl hover:bg-[#1E88C8]/5 transition-all duration-300">
                  Contact Us for More Information
                  <AlertCircle className="w-5 h-5 ml-2" />
                </a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
            <div className="text-center text-sm text-gray-500">
              <p>For detailed compliance information and certification verification, please contact our quality assurance department.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsNotice;