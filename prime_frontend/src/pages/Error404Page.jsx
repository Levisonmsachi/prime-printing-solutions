import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Search, AlertCircle, Compass, Printer } from 'lucide-react';

const Error404Page = () => {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#1E88C8]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#1976B2]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#1E88C8]/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Logo/Header */}
          <div className="mb-12">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <div className="p-3 bg-[#1E88C8]/10 rounded-xl group-hover:bg-[#1E88C8]/20 transition-all duration-300">
                <Printer className="w-8 h-8 text-[#1E88C8]" />
              </div>
              <span className="text-2xl font-bold text-[#111111]">Prime Printing Solutions</span>
            </Link>
          </div>

          {/* Main Content */}
          <div className="max-w-3xl mx-auto">
            {/* Error Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 bg-red-50 rounded-full border border-red-200">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-sm font-semibold text-red-600 tracking-wide">
                Error 404 - Page Not Found
              </span>
            </div>

            {/* Error Number with Animation */}
            <div className="relative mb-8">
              <h1 className="text-[12rem] md:text-[16rem] font-black leading-none">
                <span className="text-transparent bg-clip-text bg-linear-to-b from-red-500/20 via-red-600/40 to-red-700/60">4</span>
                <span className="text-transparent bg-clip-text bg-linear-to-b from-gray-500/20 via-gray-600/40 to-gray-700/60">0</span>
                <span className="text-transparent bg-clip-text bg-linear-to-b from-blue-500/20 via-blue-600/40 to-blue-700/60">4</span>
              </h1>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-48 h-48 bg-red-500/10 rounded-full blur-xl animate-pulse" />
              </div>
            </div>

            {/* Error Message */}
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-6">
                Lost in the <span className="text-[#1E88C8]">Digital</span> Print
              </h2>
              <p className="text-xl text-[#111111]/70 leading-relaxed mb-8">
                The page you're looking for seems to have been misplaced, removed, or never existed. 
                Don't worry—we're experts at finding and creating beautiful things.
              </p>
              
              {/* Quick Actions */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                  <Search className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Double-check the URL</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                  <Compass className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Use the navigation menu</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                to="/"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1E88C8] text-white font-bold rounded-xl hover:bg-[#1976B2] hover:shadow-xl transition-all duration-300"
              >
                <Home className="w-5 h-5" />
                Go to Homepage
                <ArrowLeft className="w-5 h-5 transform rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#1E88C8] font-bold rounded-xl border-2 border-[#1E88C8] hover:bg-[#1E88C8]/5 transition-all duration-300"
              >
                <Printer className="w-5 h-5" />
                View Our Services
              </Link>
            </div>

            {/* Suggested Pages */}
            <div className="bg-gray-50/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-[#111111] mb-6 text-center">
                Popular Pages You Might Like
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  to="/about"
                  className="p-4 bg-white rounded-xl border border-gray-200 hover:border-[#1E88C8] hover:shadow-md transition-all duration-300 group"
                >
                  <h4 className="font-semibold text-[#111111] mb-2 group-hover:text-[#1E88C8]">
                    About Us
                  </h4>
                  <p className="text-sm text-[#111111]/60">
                    Learn about our printing expertise
                  </p>
                </Link>
                
                <Link
                  to="/contact"
                  className="p-4 bg-white rounded-xl border border-gray-200 hover:border-[#1E88C8] hover:shadow-md transition-all duration-300 group"
                >
                  <h4 className="font-semibold text-[#111111] mb-2 group-hover:text-[#1E88C8]">
                    Contact Us
                  </h4>
                  <p className="text-sm text-[#111111]/60">
                    Get in touch with our team
                  </p>
                </Link>
                
                <Link
                  to="/portfolio"
                  className="p-4 bg-white rounded-xl border border-gray-200 hover:border-[#1E88C8] hover:shadow-md transition-all duration-300 group"
                >
                  <h4 className="font-semibold text-[#111111] mb-2 group-hover:text-[#1E88C8]">
                    Portfolio
                  </h4>
                  <p className="text-sm text-[#111111]/60">
                    See our recent printing projects
                  </p>
                </Link>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm text-[#111111]/60">
                  Need immediate assistance?{' '}
                  <a href="tel:+265996678548" className="text-[#1E88C8] font-medium hover:text-[#1976B2]">
                    Call us at +265 996 678 548
                  </a>
                </div>
                <div className="text-sm text-[#111111]/60">
                  PrimePrint Solutions &copy; {new Date().getFullYear()} •{' '}
                  <Link to="/privacy-policy" className="text-[#1E88C8] hover:text-[#1976B2]">
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error404Page;