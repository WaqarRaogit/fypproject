// src/components/url/LinksList.jsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useUrlStore from '../../store/urlStore';
import LinkItem from './LinkItem';

const LinksList = () => {
  const { userLinks, getUserLinks, isLoading, error } = useUrlStore();

  useEffect(() => {
    getUserLinks();
  }, [getUserLinks]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl mb-4">
        Error loading links: {error}
      </div>
    );
  }

  if (userLinks.length === 0) {
    return (
      <div className="bg-[#1A1F2C]/50 p-8 rounded-2xl border border-blue-900/30 backdrop-blur-sm text-center">
        <h2 className="text-2xl font-semibold text-gray-200 mb-4">Your Links</h2>
        <p className="text-gray-400 mb-6">You don't have any shortened URLs yet.</p>
        <Link 
          to="/dashboard" 
          className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg shadow-blue-500/25"
        >
          Create Your First Link
          <svg className="ml-2 w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#1A1F2C]/50 p-6 rounded-2xl border border-blue-900/30 backdrop-blur-sm">
      <h2 className="text-2xl font-semibold text-gray-200 mb-6 flex items-center">
        <svg className="w-6 h-6 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
        </svg>
        Your Links
      </h2>
      <div className="space-y-4">
        {userLinks.map((link) => (
          <LinkItem key={link.shortCode} link={link} />
        ))}
      </div>
    </div>
  );
};

export default LinksList;