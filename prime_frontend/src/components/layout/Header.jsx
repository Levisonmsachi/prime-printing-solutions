import React, { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { useLocation } from "react-router-dom"; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation(); // Get current path

  // Handle scroll for responsive header effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Certifications", path: "/certifications" },
    { name: "Contact", path: "/contact" },
  ];

  // Check if a nav item is active
  const isActive = (path) => {
    // For exact match on homepage
    if (path === "/" && location.pathname === "/") return true;
    // For other pages - check if current path starts with nav path
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const contactInfo = [
    { icon: Phone, text: "+265 996 678 548", link: "tel:+265996678548" },
    { icon: Mail, text: "primeprintsolutions25@outlook.com", link: "mailto:primeprintsolutions25@outlook.com" },
    { icon: MapPin, text: "Area 51/B, Lilongwe, Malawi", link: "https://www.google.com/maps/place/Area+51,+Lilongwe/@-13.8999718,33.7693332,15z/data=!4m6!3m5!1s0x1921d5271eae1841:0x14210a86c04c3d07!8m2!3d-13.8984739!4d33.7824983!16s%2Fg%2F11b6y91j_m?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D" },
  ];

  return (
    <>
      {/* Top Contact Bar - Responsive */}
      <div className="hidden md:flex bg-[#111111] text-white py-2 px-4">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center space-x-4 lg:space-x-6">
            {contactInfo.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="flex items-center space-x-2 text-xs lg:text-sm hover:text-[#1E88C8] transition-colors whitespace-nowrap"
              >
                <item.icon size={12} className="lg:size-3.5" />
                <span className="hidden lg:inline">{item.text}</span>
                <span className="lg:hidden">
                  {index === 0 && "Call"}
                  {index === 1 && "Email"}
                  {index === 2 && "Location"}
                </span>
              </a>
            ))}
          </div>
          
          <div className="flex items-center space-x-3">
            <a href="/contact" className="text-xs lg:text-sm font-medium bg-[#1E88C8] hover:bg-[#1976B2] text-white px-3 lg:px-4 py-1 rounded transition-colors">
              Need Help?
            </a>
            <a href="/about" className="text-xs lg:text-sm font-medium border border-white hover:border-[#1E88C8] hover:text-[#1E88C8] px-3 lg:px-4 py-1 rounded transition-colors">
              About Us
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Top Contact - Compact */}
      <div className="md:hidden bg-[#111111] text-white py-2 px-4">
        <div className="flex justify-between items-center">
          <a href="tel:+265996678548" className="flex items-center space-x-2 text-sm hover:text-[#1E88C8] transition-colors">
            <Phone size={14} />
            <span>Call Now</span>
          </a>
          <div className="flex space-x-2">
            <a href="/request-quote" className="text-xs font-medium bg-[#1E88C8] hover:bg-[#1976B2] text-white px-3 py-1 rounded">
              Quote
            </a>
            <a href="/contact" className="text-xs font-medium border border-white hover:border-[#1E88C8] hover:text-[#1E88C8] px-3 py-1 rounded">
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className={`sticky top-0 z-50 bg-white shadow-md transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo - Responsive sizing */}
            <div className="flex items-center">
              <a href="/" className="flex items-center space-x-2 lg:space-x-3">
                <img
                  src="/prime-logo.jpg"
                  alt="Prime Print Solutions Logo"
                  className="h-10 lg:h-12 w-auto"
                />
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-[#111111] tracking-tight leading-tight">
                    Prime Print
                  </h1>
                  <p className="text-sm text-gray-600 font-bold">Solutions</p>
                </div>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2 xl:space-x-4">
              {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <div
                    key={item.name}
                    className="relative group"
                    onMouseEnter={() => setIsDropdownOpen(item.name)}
                    onMouseLeave={() => setIsDropdownOpen(null)}
                  >
                    <a
                      href={item.path}
                      className={`px-3 xl:px-4 py-2 font-medium transition-colors relative text-sm xl:text-base ${
                        active 
                          ? 'text-[#1E88C8] font-semibold' 
                          : 'text-[#111111] hover:text-[#1E88C8]'
                      }`}
                    >
                      {item.name}
                      {/* Active indicator line - always visible for active page */}
                      <span 
                        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 transition-all duration-300 ${
                          active 
                            ? 'w-3/4 bg-[#1E88C8]' 
                            : 'w-0 bg-[#1E88C8] group-hover:w-3/4'
                        }`}
                      ></span>
                    </a>
                    
                    {item.submenu && isDropdownOpen === item.name && (
                      <div className="absolute top-full left-0 mt-1 w-56 bg-white shadow-xl rounded-lg border border-gray-100 py-3 z-50">
                        {item.submenu.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.path}
                            className="block px-5 py-2.5 text-sm text-[#111111] hover:bg-[#F6F4EE] hover:text-[#1E88C8] hover:pl-6 transition-all"
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              
              <a
                href="/request-quote"
                className="ml-2 xl:ml-4 px-5 xl:px-6 py-2.5 bg-[#1E88C8] text-white font-semibold rounded-lg hover:bg-[#1976B2] transition-colors text-sm xl:text-base whitespace-nowrap"
              >
                Request a Quote
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md text-[#111111] hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden bg-white border-t border-gray-200 animate-slideDown">
              <div className="py-4">
                {navItems.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <div key={item.name} className="border-b border-gray-100 last:border-b-0">
                      <a
                        href={item.path}
                        className={`block px-4 py-3.5 font-medium transition-colors ${
                          active 
                            ? 'text-[#1E88C8] font-semibold bg-[#F6F4EE]' 
                            : 'text-[#111111] hover:bg-[#F6F4EE] hover:text-[#1E88C8]'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="flex items-center justify-between">
                          <span>{item.name}</span>
                          {active && (
                            <div className="w-2 h-2 bg-[#1E88C8] rounded-full"></div>
                          )}
                        </div>
                      </a>
                      {item.submenu && (
                        <div className="ml-4 pl-4 border-l border-gray-100">
                          {item.submenu.map((subItem) => (
                            <a
                              key={subItem.name}
                              href={subItem.path}
                              className="block py-2.5 text-sm text-gray-600 hover:text-[#1E88C8] transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
                <div className="px-4 pt-4 mt-2 border-t border-gray-200">
                  <a
                    href="/request-quote"
                    className="block w-full text-center px-6 py-3.5 bg-[#1E88C8] text-white font-semibold rounded-lg hover:bg-[#1976B2] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Request a Quote
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideDown {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 1000px; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Header;