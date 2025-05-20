import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { formatDate, getTimeRemaining } from '../../utils/helpers';

const LinkItem = ({ link }) => {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(link.displayShortUrl); // Use displayShortUrl
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className="bg-[#1A1F2C]/50 p-6 rounded-xl border border-blue-900/30 backdrop-blur-sm hover:border-blue-700/30 transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h3 className="font-medium text-lg text-gray-200 truncate">
            {link.originalUrl}
          </h3>
          <div className="flex items-center mt-2">
            <span 
              className="text-blue-400 hover:text-blue-300 cursor-pointer truncate transition-colors duration-200"
              onClick={handleCopy}
            >
              {link.displayShortUrl}
            </span>
            <button 
              onClick={handleCopy}
              className="ml-2 p-1.5 rounded-lg hover:bg-blue-500/10 transition-colors duration-200"
            >
              {copied ? (
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => setShowQR(!showQR)}
            className="px-4 py-2 bg-[#111827] text-gray-300 hover:text-blue-400 rounded-lg transition-all duration-200 border border-blue-900/30 hover:border-blue-500/50"
          >
            {showQR ? 'Hide QR' : 'Show QR'}
          </Button>
          
          <Link
            to={`/analytics/${link.shortCode}`}
            className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-all duration-200"
          >
            Analytics
          </Link>
        </div>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-400">
        <span className="flex items-center">
          <svg className="w-4 h-4 mr-1.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          Created: {formatDate(link.createdAt)}
        </span>
        <span className="flex items-center">
          <svg className="w-4 h-4 mr-1.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          Expires: {formatDate(link.expiresAt) || 'Never'}
        </span>
        <span className={`flex items-center ${
          link.expiresAt && new Date(link.expiresAt) < new Date() 
            ? 'text-red-400' 
            : 'text-green-400'
        }`}>
          <svg className="w-4 h-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          {getTimeRemaining(link.expiresAt)}
        </span>
      </div>
      
      {showQR && (
        <div className="mt-6 flex justify-center md:justify-start animate-fade-in">
          <div className="p-4 bg-white rounded-xl shadow-lg">
            <img 
              src={`data:image/png;base64,${link.qrCodeBase64}`} 
              alt="QR Code" 
              className="w-32 h-32"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkItem;