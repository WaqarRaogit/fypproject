import { useState, useEffect } from 'react';
import useUrlStore from '../../store/urlStore';
import Input from '../common/Input';
import Button from '../common/Button';
import Card from '../common/Card';
import { TIMEZONES } from '../../utils/constants';
import { API_URL } from '../../services/api';

const LinkIcon = () => {
  return (
    <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
      <path d="M11 3a1 1 0 10-2 0v6a1 1 0 001 1h6a1 1 0 100-2h-4.586l4.293-4.293a1 1 0 00-1.414-1.414L9 8.414V3zm-7 7a1 1 0 011-1h6a1 1 0 110 2H5.414l4.293 4.293a1 1 0 01-1.414 1.414L3 11.414V17a1 1 0 102 0v-6z" />
    </svg>
  );
};

const HashtagIcon = () => {
  return (
    <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
      <path d="M7.293 3.293a1 1 0 011.414 0L10 4.586l1.293-1.293a1 1 0 111.414 1.414L11.414 6H14a1 1 0 110 2h-2.586l1.293 1.293a1 1 0 01-1.414 1.414L10 9.414l-1.293 1.293a1 1 0 01-1.414-1.414L8.586 8H6a1 1 0 110-2h2.586L7.293 4.707a1 1 0 010-1.414z" />
    </svg>
  );
};

const ShortenForm = () => {
  const { createShortUrl, isLoading, error } = useUrlStore();
  const [formData, setFormData] = useState({
    originalUrl: '',
    customCode: '',
    expiresAt: '',
    activeTimeZone: '',
    activeStartHour: '',
    activeEndHour: ''
  });
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formError, setFormError] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormError(null);

    if (name === 'originalUrl') {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      if (value) {
        const timeout = setTimeout(() => {
          validateUrl(value);
        }, 500); // Wait 500ms after the user stops typing
        setDebounceTimeout(timeout);
      } else {
        setFormError(null);
        setIsValidating(false);
      }
    }
  };

  const validateUrl = async (url) => {
    setIsValidating(true);
    setFormError(null);

    try {
      const response = await fetch(`${API_URL}/Validation/validate-url`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to validate URL.');
      }

      const data = await response.json();
      if (!data.isValid) {
        throw new Error(data.message);
      }
    } catch (error) {
      setFormError(error.message || 'Error validating URL.');
      setIsValidating(false);
      return;
    }

    setIsValidating(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValidating || formError) return;
    setFormError(null);
    try {
      const response = await createShortUrl(formData);
      setFormData({ 
        originalUrl: '', 
        customCode: '', 
        expiresAt: '', 
        activeTimeZone: '', 
        activeStartHour: '', 
        activeEndHour: '' 
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      setFormError(error.message || 'Sorry, we couldn’t shorten your URL right now. Please try again later.');
    }
  };

  return (
    <div className="bg-[#1E2A45] p-6 rounded-2xl border border-blue-800/30 shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-100 mb-6 flex items-center">
        <svg className="w-6 h-6 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"/>
        </svg>
        Shorten a URL
      </h2>

      {formError && (
        <div className="bg-red-900/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl mb-4">
          {formError}
        </div>
      )}

      {showSuccess && (
        <div className="bg-green-900/20 border border-green-500/50 text-green-400 px-4 py-3 rounded-xl mb-4">
          URL shortened successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="originalUrl" className="block text-gray-200 font-medium mb-2">
            URL to Shorten
          </label>
          <Input
            type="url"
            id="originalUrl"
            name="originalUrl"
            value={formData.originalUrl}
            onChange={handleChange}
            placeholder="https://example.com"
            required
            icon={<LinkIcon />}
            className="bg-[#2A3959] border-blue-700/30 text-gray-100 placeholder-gray-500"
          />
          {isValidating && (
            <div className="flex items-center mt-2">
              <svg className="animate-spin h-5 w-5 mr-2 text-blue-400" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-gray-400 text-sm">Validating URL...</span>
            </div>
          )}
        </div>
        
        <div>
          <label htmlFor="customCode" className="block text-gray-200 font-medium mb-2">
            Custom Short Code (Optional)
          </label>
          <Input
            type="text"
            id="customCode"
            name="customCode"
            value={formData.customCode}
            onChange={handleChange}
            placeholder="e.g., mylink"
            icon={<HashtagIcon />}
            className="bg-[#2A3959] border-blue-700/30 text-gray-100 placeholder-gray-500"
            disabled={isValidating || !formData.originalUrl || !!formError}
          />
          <p className="text-sm text-gray-400 mt-1">
            Leave blank to generate a random code
          </p>
        </div>
        
        <div>
          <button
            type="button"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="text-blue-400 hover:text-blue-300 font-medium flex items-center transition-colors"
            disabled={isValidating || !formData.originalUrl || !!formError}
          >
            {isAdvancedOpen ? 'Hide' : 'Show'} Advanced Options
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 ml-1 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`} 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {isAdvancedOpen && (
          <div className="bg-[#2A3959] p-6 rounded-xl border border-blue-700/30 space-y-6">
            <div>
              <label htmlFor="expiresAt" className="block text-gray-200 font-medium mb-2">
                Expiration Date (Optional)
              </label>
              <Input
                type="datetime-local"
                id="expiresAt"
                name="expiresAt"
                value={formData.expiresAt}
                onChange={handleChange}
                className="bg-[#1a3054] border-blue-600/30 text-gray-100 
                  placeholder-gray-400 hover:bg-[#1e365e] cursor-pointer
                  [&::-webkit-calendar-picker-indicator]:filter-[#3B82F6]"
                disabled={isValidating || !formData.originalUrl || !!formError}
              />
              <p className="text-sm text-gray-400 mt-1">
                Default is 30 days from creation
              </p>
            </div>
            
            <div>
              <label htmlFor="activeTimeZone" className="block text-gray-200 font-medium mb-2">
                Active Time Zone (Optional)
              </label>
              <div className="relative">
                <select
                  id="activeTimeZone"
                  name="activeTimeZone"
                  value={formData.activeTimeZone}
                  onChange={handleChange}
                  className="w-full bg-[#1a3054] border border-blue-600/30 text-gray-100 
                    rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 
                    hover:bg-[#1e365e] placeholder-gray-400 transition-colors duration-200"
                  disabled={isValidating || !formData.originalUrl || !!formError}
                >
                  <option value="">Select a time zone</option>
                  {TIMEZONES.map((timezone) => (
                    <option key={timezone.value} value={timezone.value}>
                      {timezone.label}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                Default is UTC
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="activeStartHour" className="block text-gray-200 font-medium mb-2">
                  Active Start Hour (Optional)
                </label>
                <Input
                  type="time"
                  id="activeStartHour"
                  name="activeStartHour"
                  value={formData.activeStartHour}
                  onChange={handleChange}
                  className="bg-[#1a3054] border-blue-600/30 text-gray-100 
                    placeholder-gray-400 hover:bg-[#1e365e] cursor-pointer
                    [&::-webkit-calendar-picker-indicator]:filter-[#3B82F6]"
                  disabled={isValidating || !formData.originalUrl || !!formError}
                />
                <p className="text-sm text-gray-400 mt-1">
                  Default is 00:00
                </p>
              </div>
              
              <div>
                <label htmlFor="activeEndHour" className="block text-gray-200 font-medium mb-2">
                  Active End Hour (Optional)
                </label>
                <Input
                  type="time"
                  id="activeEndHour"
                  name="activeEndHour"
                  value={formData.activeEndHour}
                  onChange={handleChange}
                  className="bg-[#1a3054] border-blue-600/30 text-gray-100 
                    placeholder-gray-400 hover:bg-[#1e365e] cursor-pointer
                    [&::-webkit-calendar-picker-indicator]:filter-[#3B82F6]"
                  disabled={isValidating || !formData.originalUrl || !!formError}
                />
                <p className="text-sm text-gray-400 mt-1">
                  Default is 23:59
                </p>
              </div>
            </div>
          </div>
        )}
        
        <Button
          type="submit"
          disabled={isLoading || isValidating || !formData.originalUrl || !!formError}
          className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Shortening...
            </div>
          ) : (
            'Shorten URL'
          )}
        </Button>
      </form>

      <style>{`
        input[type="datetime-local"]::-webkit-calendar-picker-indicator,
        input[type="time"]::-webkit-calendar-picker-indicator {
          filter: invert(60%) sepia(95%) saturate(1000%) hue-rotate(185deg) brightness(100%);
          opacity: 0.7;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        input[type="datetime-local"]::-webkit-calendar-picker-indicator:hover,
        input[type="time"]::-webkit-calendar-picker-indicator:hover {
          opacity: 1;
          background-color: rgba(59, 130, 246, 0.1);
        }

        select {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%233B82F6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 1em;
          padding-right: 2.5rem;
        }
      `}</style>
    </div>
  );
};

export default ShortenForm;