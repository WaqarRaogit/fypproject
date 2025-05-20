import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0A1628] text-white">
      {/* Background gradient effect */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 to-transparent"></div>
        
        <div className="container mx-auto px-4 py-12 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                  <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none">
                    <path d="M13.5 12H21M21 12L18.5 9.5M21 12L18.5 14.5" 
                          stroke="currentColor" strokeWidth="2" 
                          strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 5V3C21 2.44772 20.5523 2 20 2H4C3.44772 2 3 2.44772 3 3V21C3 21.5523 3.44772 22 4 22H20C20.5523 22 21 21.5523 21 21V19" 
                          stroke="currentColor" strokeWidth="2" 
                          strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                    URLShortener
                  </h2>
                  <p className="text-sm text-blue-400">
                    Simplify your links
                  </p>
                </div>
              </Link>
              <p className="mt-4 text-gray-400 max-w-md">
                Modern URL shortening platform built with advanced technology stack. 
                Create, manage, and track your shortened links with powerful analytics.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {['Home', 'Features', 'Pricing', 'Dashboard'].map((item) => (
                  <li key={item}>
                    <Link
                      to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center"
                    >
                      <svg className="w-3 h-3 mr-2" viewBox="0 0 12 12" fill="none">
                        <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
                Contact Us
              </h3>
              <div className="space-y-3">
                <a 
                  href="mailto:support@urlshortener.com" 
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  support@urlshortener.com
                </a>
                <a 
                  href="tel:+1234567890" 
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  +1 (234) 567-890
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 mt-8 border-t border-blue-900/50">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} URLShortener. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;