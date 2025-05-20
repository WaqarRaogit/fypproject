import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useUrlStore from '../store/urlStore';
import ShortenForm from "../components/url/ShortenForm";
import LinksList from '../components/url/LinksList';
import Card from '../components/common/Card';

const DashboardPage = () => {
  const { isAuthenticated, user } = useAuthStore();
  const { currentLink, clearCurrentLink } = useUrlStore();
  
  useEffect(() => {
    return () => {
      // Clear the current link when leaving dashboard
      clearCurrentLink();
    };
  }, [clearCurrentLink]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] to-[#0D1219] text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 bg-[#1A1F2C]/50 p-6 rounded-2xl border border-blue-900/30 backdrop-blur-sm">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
            Dashboard
          </h1>
          {user && (
            <p className="text-gray-400 mt-2">
              Welcome back, <span className="text-blue-400">{user.username || user.email}</span>
            </p>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Shorten URL Section */}
            <section className="bg-[#1A1F2C]/50 p-6 rounded-2xl border border-blue-900/30 backdrop-blur-sm">
              <ShortenForm />
            </section>

            {/* Display Newly Created Link */}
            {currentLink && (
              <section className="bg-[#1A1F2C]/50 p-6 rounded-2xl border border-blue-900/30 backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-gray-200 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Your New Short URL
                </h2>
                <div className="flex items-center justify-between p-4 bg-blue-900/20 rounded-xl border border-blue-500/20">
                  <div>
                    <p className="text-blue-400 font-medium">{currentLink.shortUrl}</p>
                    <p className="text-sm text-gray-400 mt-1">Original: {currentLink.originalUrl}</p>
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(currentLink.shortUrl)}
                    className="p-2 hover:bg-blue-500/10 rounded-lg transition-colors duration-200"
                  >
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                  </button>
                </div>
              </section>
            )}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4">
            {/* Quick Stats */}
            <div className="bg-[#1A1F2C]/50 p-6 rounded-2xl border border-blue-900/30 backdrop-blur-sm mb-8">
              <h3 className="text-lg font-semibold text-gray-200 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-blue-900/20 rounded-xl">
                  <span className="text-gray-400">Total Links</span>
                  <span className="text-blue-400 font-semibold">24</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-900/20 rounded-xl">
                  <span className="text-gray-400">Total Clicks</span>
                  <span className="text-blue-400 font-semibold">1,234</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Links List Section */}
        <section className="mt-8">
          <LinksList />
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;