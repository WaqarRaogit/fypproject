import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import Input from '../common/Input';
import Button from '../common/Button';

const RegisterForm = () => {
  const { register, googleLogin, isLoading, error } = useAuthStore();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    if (userData.password !== userData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    if (userData.password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }
    try {
      const { confirmPassword, ...registrationData } = userData;
      await register(registrationData);
      navigate('/dashboard');
    } catch (error) {
      // Error is handled by authStore
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      await googleLogin(response.credential);
      navigate('/dashboard');
    } catch (error) {
      console.error('Google Login Error:', error);
    }
  };

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: '755353532231-2t6equekj0auhmaoq507ip1m9matd5b4.apps.googleusercontent.com',
        callback: handleGoogleSuccess,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('googleSignInButton'),
        {
          theme: 'outline',
          size: 'large',
          width: '100%',
          text: 'signup_with',
        }
      );
    }
  }, []);

  const getErrorMessage = () => {
    if (passwordError) return passwordError; // Prioritize local password error
    if (!error) return null;
    // Handle error as a string (current behavior from LoginForm)
    if (typeof error === 'string') {
      if (error.toLowerCase().includes('email exists')) return 'An account with this email already exists. Try logging in.';
      if (error.toLowerCase().includes('invalid email')) return 'Please enter a valid email address.';
      if (error.toLowerCase().includes('password')) return 'Password must be at least 8 characters long.';
      return error;
    }
    // Fallback for structured error object
    switch (error.code) {
      case 'EmailExists':
        return 'An account with this email already exists. Try logging in.';
      case 'InvalidEmail':
        return 'Please enter a valid email address.';
      case 'PasswordTooShort':
        return 'Password must be at least 8 characters long.';
      case 'UsernameTaken':
        return 'This username is already taken. Choose another.';
      default:
        return error.message || 'An unexpected error occurred.';
    }
  };

  const EmailIcon = () => (
    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
  );

  const PasswordIcon = () => (
    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-[#1A1F2C] rounded-2xl shadow-xl p-8 border border-blue-900/30">
        <div>
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-full p-3">
              <svg className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">Join our global community</p>
        </div>

        {(error || passwordError) && (
          <div className="bg-red-900/30 border-l-4 border-red-500 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-400">{getErrorMessage()}</p>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  icon={<EmailIcon />}
                  className="bg-[#111827] border-blue-900/30 text-gray-200 placeholder-gray-500 focus:bg-[#1E2330] transition-all duration-300"
                  error={!!(error && error.toLowerCase().includes('email'))}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-1">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={userData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  icon={<PasswordIcon />}
                  className="bg-[#111827] border-blue-900/30 text-gray-200 placeholder-gray-500 focus:bg-[#1E2330] transition-all duration-300"
                  error={!!(error && error.toLowerCase().includes('password')) || !!passwordError}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Must be at least 8 characters long
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                Confirm password
              </label>
              <div className="mt-1">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={userData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  error={!!passwordError}
                  icon={<PasswordIcon />}
                  className="bg-[#111827] border-blue-900/30 text-gray-200 placeholder-gray-500 focus:bg-[#1E2330] transition-all duration-300"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 text-base font-medium rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-150 hover:scale-[1.02]"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </div>
            ) : (
              'Create Account'
            )}
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-blue-900/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#1A1F2C] text-gray-400">Or continue with</span>
            </div>
          </div>

          <div id="googleSignInButton" className="w-full"></div>

          <div className="text-center">
            <Link
              to="/login"
              className="w-full inline-flex justify-center py-3 px-4 rounded-xl text-gray-300 bg-[#111827] hover:bg-[#1E2330] font-medium transition duration-150 border border-blue-900/30"
            >
              Sign in to your account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;