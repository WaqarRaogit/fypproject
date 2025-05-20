import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import ShortenForm from '../components/url/ShortenForm';

const HomePage = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10"></div>
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/5 to-transparent blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-purple-500/5 to-transparent blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Modern URL Shortener
              </span>
              <br />
              <span className="text-gray-200 mt-2 block text-3xl md:text-4xl">
                Built with Advanced Tech Stack
              </span>
            </h1>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 my-12 max-w-3xl mx-auto">
              {/* Tech Stack Cards */}
              <div className="col-span-2 md:col-span-1 bg-[#1A1F2C] p-4 rounded-xl border border-blue-900/30 hover:border-blue-500/50 transition-all duration-300">
                <div className="text-blue-500 text-4xl mb-2">⚛️</div>
                <div className="text-sm font-medium text-gray-300">React.js</div>
                <div className="text-xs text-blue-400/80">UI Framework</div>
              </div>
              
              <div className="bg-[#1A1F2C] p-4 rounded-xl border border-blue-900/30 hover:border-blue-500/50 transition-all duration-300">
                <div className="text-blue-500 text-4xl mb-2">🔄</div>
                <div className="text-sm font-medium text-gray-300">Axios</div>
                <div className="text-xs text-blue-400/80">HTTP Client</div>
              </div>
              
              <div className="bg-[#1A1F2C] p-4 rounded-xl border border-blue-900/30 hover:border-blue-500/50 transition-all duration-300">
                <div className="text-blue-500 text-4xl mb-2">🎨</div>
                <div className="text-sm font-medium text-gray-300">Tailwind</div>
                <div className="text-xs text-blue-400/80">Styling</div>
              </div>
              
              <div className="bg-[#1A1F2C] p-4 rounded-xl border border-blue-900/30 hover:border-blue-500/50 transition-all duration-300">
                <div className="text-blue-500 text-4xl mb-2">📊</div>
                <div className="text-sm font-medium text-gray-300">D3.js</div>
                <div className="text-xs text-blue-400/80">Analytics</div>
              </div>

              <div className="col-span-2 md:col-span-1 bg-[#1A1F2C] p-4 rounded-xl border border-blue-900/30 hover:border-blue-500/50 transition-all duration-300">
                <div className="text-blue-500 text-4xl mb-2">🔐</div>
                <div className="text-sm font-medium text-gray-300">JWT</div>
                <div className="text-xs text-blue-400/80">Auth</div>
              </div>
            </div>

            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-8 rounded-lg font-medium 
                    hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/25"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="bg-[#1A1F2C] text-gray-300 py-3 px-8 rounded-lg font-medium border border-blue-900/50
                    hover:bg-[#1E2330] hover:border-blue-500/50 transition-all duration-300"
                >
                  View Demo
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#0D1219]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
              Advanced Features
            </h2>
            <p className="text-gray-400 mt-4">Modern tools for modern developers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Feature Cards */}
            <div className="bg-[#1A1F2C] p-6 rounded-xl border border-blue-900/30 hover:border-blue-500/50 transition-all duration-300">
              <div className="text-blue-500 text-xl mb-4">🔗</div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">Smart Routing</h3>
              <p className="text-gray-400 text-sm">Intelligent URL routing with custom aliases and path management</p>
            </div>

            <div className="bg-[#1A1F2C] p-6 rounded-xl border border-blue-900/30 hover:border-blue-500/50 transition-all duration-300">
              <div className="text-blue-500 text-xl mb-4">📊</div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">Real-time Analytics</h3>
              <p className="text-gray-400 text-sm">Comprehensive click tracking and visitor insights</p>
            </div>

            <div className="bg-[#1A1F2C] p-6 rounded-xl border border-blue-900/30 hover:border-blue-500/50 transition-all duration-300">
              <div className="text-blue-500 text-xl mb-4">🔒</div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">Secure Access</h3>
              <p className="text-gray-400 text-sm">JWT-based authentication and role-based access control</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#0A0F1C]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div className="bg-[#1A1F2C] p-6 rounded-xl border border-blue-900/30">
              <div className="text-3xl font-bold text-blue-500 mb-2">99.9%</div>
              <div className="text-gray-400 text-sm">Uptime</div>
            </div>
            <div className="bg-[#1A1F2C] p-6 rounded-xl border border-blue-900/30">
              <div className="text-3xl font-bold text-blue-500 mb-2">50ms</div>
              <div className="text-gray-400 text-sm">Response Time</div>
            </div>
            <div className="bg-[#1A1F2C] p-6 rounded-xl border border-blue-900/30">
              <div className="text-3xl font-bold text-blue-500 mb-2">2M+</div>
              <div className="text-gray-400 text-sm">API Requests</div>
            </div>
            <div className="bg-[#1A1F2C] p-6 rounded-xl border border-blue-900/30">
              <div className="text-3xl font-bold text-blue-500 mb-2">500K+</div>
              <div className="text-gray-400 text-sm">Active Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/20 to-blue-900/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-200 mb-8">
            Ready to Get Started?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg font-medium transition-all duration-300"
            >
              Create Account
            </Link>
            <Link
              to="/docs"
              className="bg-[#1A1F2C] text-gray-300 py-3 px-8 rounded-lg font-medium border border-blue-900/50
                hover:bg-[#1E2330] hover:border-blue-500/50 transition-all duration-300"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;