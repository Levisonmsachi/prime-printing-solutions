import React from "react";
import { Link } from "react-router-dom";
import { Shield, Lock, Eye, Users, FileText, Mail, CheckCircle, ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  const sections = [
    {
      id: 1,
      icon: <FileText className="w-6 h-6" />,
      title: "Information We Collect",
      content: "We collect personal information such as your name, email address, phone number, company details, and project specifications when you request quotes or contact us. We may also collect browsing data through cookies to improve your experience.",
      points: [
        "Contact information provided through forms",
        "Project details for quote requests",
        "Browsing behavior for analytics",
        "Communication history with our team"
      ]
    },
    {
      id: 2,
      icon: <Eye className="w-6 h-6" />,
      title: "How We Use Your Information",
      content: "Your information helps us provide tailored printing solutions, respond to inquiries, process orders, and improve our services. We use data to communicate project updates, send quotes, and enhance your overall experience with PrimePrint Solutions.",
      points: [
        "Providing quotes and project estimates",
        "Processing and fulfilling orders",
        "Customer support and communication",
        "Service improvement and analytics"
      ]
    },
    {
      id: 3,
      icon: <Users className="w-6 h-6" />,
      title: "Data Sharing & Third Parties",
      content: "We do not sell or rent your personal information. We may share data with trusted partners only when necessary for service delivery (e.g., shipping providers). All partners are bound by strict confidentiality agreements.",
      points: [
        "Shipping and logistics partners",
        "Payment processing services",
        "Legal requirements when necessary",
        "Never for marketing without consent"
      ]
    },
    {
      id: 4,
      icon: <Lock className="w-6 h-6" />,
      title: "Data Security",
      content: "We implement industry-standard security measures including encryption, secure servers, and access controls to protect your information. Regular security audits ensure compliance with data protection standards.",
      points: [
        "256-bit SSL encryption",
        "Secure server infrastructure",
        "Regular security audits",
        "Employee privacy training"
      ]
    },
    {
      id: 5,
      icon: <Shield className="w-6 h-6" />,
      title: "Your Rights & Choices",
      content: "You have control over your personal data. You can request access, corrections, or deletion of your information at any time. You may also opt out of marketing communications.",
      points: [
        "Right to access your data",
        "Right to correct information",
        "Right to request deletion",
        "Right to opt out of marketing"
      ]
    },
    {
      id: 6,
      icon: <Mail className="w-6 h-6" />,
      title: "Contact & Questions",
      content: "For privacy-related inquiries or to exercise your rights, contact our Data Protection Officer. We respond to all requests within 30 days.",
      points: [
        "Email: privacy@primeprint.com",
        "Phone: +265 996 678 548",
        "Postal: Area 51/B, Lilongwe, Malawi",
        "Response time: 30 days"
      ]
    }
  ];

  const lastUpdated = "December 15, 2023";

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="relative py-20 bg-linear-to-br from-white via-[#F9F9F9] to-[#F0F7FF] overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#1E88C8]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#1976B2]/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Navigation */}
            <div className="mb-12 flex justify-between items-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-[#1E88C8] hover:text-[#1976B2] font-medium transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
              <div className="text-sm text-[#111111]/60">
                Last Updated: {lastUpdated}
              </div>
            </div>

            {/* Header Content */}
            <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 bg-[#1E88C8]/10 backdrop-blur-sm rounded-full border border-[#1E88C8]/20">
              <Shield className="w-5 h-5 text-[#1E88C8]" />
              <span className="text-sm font-semibold text-[#1E88C8] tracking-wide uppercase">
                Privacy Policy
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#111111] leading-tight mb-6">
              Protecting Your Privacy
              <span className="block mt-4 text-transparent bg-clip-text bg-linear-to-r from-[#1E88C8] to-[#1976B2]">
                Our Commitment to Data Security
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[#111111]/70 max-w-3xl mx-auto mb-10 leading-relaxed">
              At PrimePrint Solutions, we take your privacy seriously. This policy outlines how we collect, 
              use, and protect your personal information while delivering exceptional printing services.
            </p>

            {/* Quick Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-[#1E88C8]/10">
                <div className="w-12 h-12 bg-[#1E88C8]/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Lock className="w-6 h-6 text-[#1E88C8]" />
                </div>
                <h3 className="font-bold text-[#111111] mb-2 text-center">Secure Data</h3>
                <p className="text-sm text-[#111111]/60 text-center">
                  Industry-standard encryption and security protocols
                </p>
              </div>

              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-[#1E88C8]/10">
                <div className="w-12 h-12 bg-[#1E88C8]/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Users className="w-6 h-6 text-[#1E88C8]" />
                </div>
                <h3 className="font-bold text-[#111111] mb-2 text-center">Your Control</h3>
                <p className="text-sm text-[#111111]/60 text-center">
                  Full control over your data and communication preferences
                </p>
              </div>

              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-[#1E88C8]/10">
                <div className="w-12 h-12 bg-[#1E88C8]/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Eye className="w-6 h-6 text-[#1E88C8]" />
                </div>
                <h3 className="font-bold text-[#111111] mb-2 text-center">Transparency</h3>
                <p className="text-sm text-[#111111]/60 text-center">
                  Clear explanations of how we handle your information
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Policy Sections */}
          <div className="space-y-8">
            {sections.map((section) => (
              <div
                key={section.id}
                className="group bg-white rounded-2xl border border-gray-200 hover:border-[#1E88C8]/30 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#1E88C8]/10 rounded-xl text-[#1E88C8] group-hover:bg-[#1E88C8]/20 transition-colors">
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-[#111111] mb-4">
                        {section.title}
                      </h2>
                      <p className="text-[#111111]/70 leading-relaxed mb-6">
                        {section.content}
                      </p>
                      
                      {section.points && (
                        <ul className="space-y-3">
                          {section.points.map((point, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                              <span className="text-[#111111]/80">{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cookies Section */}
          <div className="mt-16 bg-gray-50/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-[#111111] mb-6">
              Cookie Policy
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-[#111111] mb-3">Essential Cookies</h3>
                <p className="text-[#111111]/70">
                  Necessary for website functionality. These cannot be disabled.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#111111] mb-3">Analytical Cookies</h3>
                <p className="text-[#111111]/70">
                  Help us understand how visitors interact with our site. You can opt out.
                </p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white rounded-xl">
              <p className="text-sm text-[#111111]/70">
                <strong>Browser Settings:</strong> You can manage cookie preferences through your browser settings.
                Most browsers allow you to block or delete cookies.
              </p>
            </div>
          </div>

          {/* Update Notification */}
          <div className="mt-12 p-6 bg-[#1E88C8]/5 rounded-2xl border border-[#1E88C8]/20">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-[#1E88C8]/10 rounded-lg">
                <FileText className="w-6 h-6 text-[#1E88C8]" />
              </div>
              <div>
                <h3 className="font-bold text-[#111111] mb-1">
                  Policy Updates
                </h3>
                <p className="text-[#111111]/70">
                  We may update this policy periodically. The latest version will always be available here with the most recent update date.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-[#111111] mb-6">
              Questions About Privacy?
            </h2>
            <p className="text-lg text-[#111111]/70 max-w-2xl mx-auto mb-8 leading-relaxed">
              Contact our Data Protection Officer for any privacy-related inquiries or to exercise your data rights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:primeprintsolutions25@outlook.com"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#1E88C8] text-white font-bold rounded-xl hover:bg-[#1976B2] hover:shadow-lg transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                Email Privacy Team
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#1E88C8] font-bold rounded-xl border-2 border-[#1E88C8] hover:bg-[#1E88C8]/5 transition-all duration-300"
              >
                Contact Form
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-[#111111]/60">
              Prime Printing Solutions &copy; {new Date().getFullYear()} • All Rights Reserved
            </div>
            <div className="flex items-center gap-6">
              <Link to="/terms" className="text-sm text-[#111111]/60 hover:text-[#1E88C8]">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-sm text-[#111111]/60 hover:text-[#1E88C8]">
                Contact Us
              </Link>
              <a 
                href={`tel:+265996678548`}
                className="text-sm text-[#111111]/60 hover:text-[#1E88C8]"
              >
                +265 996 678 548
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;