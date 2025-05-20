// src/components/layout/Header.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const Header = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#0A1628]/95 backdrop-blur-lg border-b border-blue-900/50'
        : 'bg-[#0A1628]'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className={`p-2 rounded-xl transition-all duration-300 
              ${isScrolled 
                ? 'bg-gradient-to-r from-blue-600 to-blue-500' 
                : 'bg-gradient-to-r from-blue-500 to-blue-400'
              } hover:shadow-lg hover:shadow-blue-500/25`}>
              <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none">
                <path d="M13.5 12H21M21 12L18.5 9.5M21 12L18.5 14.5" 
                      stroke="currentColor" strokeWidth="2" 
                      strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 5V3C21 2.44772 20.5523 2 20 2H4C3.44772 2 3 2.44772 3 3V21C3 21.5523 3.44772 22 4 22H20C20.5523 22 21 21.5523 21 21V19" 
                      stroke="currentColor" strokeWidth="2" 
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                URLShortener
              </h1>
              <p className="text-xs text-blue-400">
                Simplify your links
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {['Home', 'Features', 'Pricing'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className={`text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors ${
                  isActiveLink(`/${item.toLowerCase()}`) && 'text-blue-400'
                }`}
              >
                {item}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-6">
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-white 
                    bg-gradient-to-r from-blue-600 to-blue-500 
                    rounded-lg hover:shadow-lg hover:shadow-blue-500/25 
                    transition-all duration-300"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white 
                    bg-gradient-to-r from-blue-600 to-blue-500 
                    rounded-lg hover:shadow-lg hover:shadow-blue-500/25 
                    transition-all duration-300"
                >
                  Get Started
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-blue-400 transition-colors"
          >
            <svg
              className={`w-6 h-6 transition-transform ${isMobileMenuOpen ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? 'max-h-screen opacity-100 pt-4'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="rounded-xl p-4 bg-[#111827] border border-blue-900/50">
            <nav className="flex flex-col space-y-4">
              {['Home', 'Features', 'Pricing'].map((item) => (
                <Link
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors"
                >
                  {item}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-red-400 hover:text-red-500 transition-colors text-left"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm font-medium text-blue-400 hover:text-blue-500 transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;