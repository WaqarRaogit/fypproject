import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useUrlStore from '../../store/urlStore';
import AnalyticsChart from './AnalyticsChart';

const AnalyticsCard = () => {
  const { shortCode } = useParams();
  const { getAnalytics, analytics, isLoading, error } = useUrlStore();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (shortCode) {
      getAnalytics(shortCode);
    }
  }, [shortCode, getAnalytics]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        Error loading analytics: {error}
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Analytics</h2>
        <p className="text-gray-600 mb-4">No analytics data available for this link.</p>
        <Link 
          to="/dashboard" 
          className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  // Function to convert CSV data to a downloadable file
  const downloadCSV = () => {
    if (!analytics.csvReport) return;
    
    const blob = new Blob([analytics.csvReport], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${shortCode}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-[#0A1628] py-8 px-4">
      <div className="max-w-7xl mx-auto bg-[#1A1F2C]/50 p-6 rounded-2xl border border-blue-900/30 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
            Analytics for: {shortCode}
          </h2>
          <Link 
            to="/dashboard" 
            className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors duration-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Analytics Tabs */}
        <div className="border-b border-blue-900/30 mb-6">
          <nav className="flex -mb-px space-x-8">
            {['Overview', 'Locations', 'Time Analysis'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase().replace(' ', ''))}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                  activeTab === tab.toLowerCase().replace(' ', '')
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-blue-300 hover:border-blue-300/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Analytics Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-[#111827] p-6 rounded-xl border border-blue-900/30">
              <div className="text-center">
                <h3 className="text-4xl font-bold text-blue-400 mb-2">{analytics.totalClicks}</h3>
                <p className="text-gray-400 font-medium">Total Clicks</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-200">Click Heatmap</h3>
                <button
                  onClick={downloadCSV}
                  className="flex items-center px-4 py-2 bg-[#111827] text-blue-400 rounded-lg hover:bg-[#1E2330] transition-all duration-200 border border-blue-900/30"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Download CSV
                </button>
              </div>
              {analytics.heatmapBase64 && (
                <div className="bg-[#111827] p-4 rounded-xl border border-blue-900/30">
                  <img 
                    src={`data:image/png;base64,${analytics.heatmapBase64}`} 
                    alt="Click Heatmap" 
                    className="max-w-full h-auto rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'locations' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-4">Clicks by Location</h3>
            <AnalyticsChart 
              data={analytics.clicksByCityAndHour}
              chartType="location"
            />
          </div>
        )}

        {activeTab === 'timeanalysis' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-4">Clicks by Hour</h3>
            {analytics.clicksByCityAndHour ? (
              <AnalyticsChart 
                data={analytics.clicksByCityAndHour}
                chartType="time"
              />
            ) : (
              <p className="text-gray-400">No time analysis data available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsCard;