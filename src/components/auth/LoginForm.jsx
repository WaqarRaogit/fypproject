import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import Input from '../common/Input';
import Button from '../common/Button';

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

const LoginForm = () => {
  const { login, googleLogin, isLoading, error } = useAuthStore();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      navigate('/dashboard');
    } catch (error) {
      // Error is handled by authStore, displayed below
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
          text: 'signin_with',
        }
      );
    }
  }, []);

  const getErrorMessage = () => {
    if (!error) return null;
    // Handle error as a string (current behavior from console log)
    if (typeof error === 'string') {
      if (error.toLowerCase().includes('invalid email')) return 'No account exists with this email. Please register.';
      if (error.toLowerCase().includes('invalid password')) return 'Incorrect password. Please try again.';
      return error;
    }
    // Fallback for structured error object (if implemented later)
    switch (error.code) {
      case 'EmailNotFound':
        return 'Incorrect email or password.';
      case 'InvalidPassword':
        return 'Incorrect password. Please try again.';
      default:
        return error.message || 'An unexpected error occurred.';
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-[#1A1F2C] rounded-2xl shadow-xl p-8 border border-blue-900/30">
        <div>
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-full p-3">
              <svg className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Sign in to your account to continue
          </p>
        </div>

        {error && (
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
                  value={credentials.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  icon={<EmailIcon />}
                  className="bg-[#111827] border-blue-900/30 text-gray-200 placeholder-gray-500"
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
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  icon={<PasswordIcon />}
                  className="bg-[#111827] border-blue-900/30 text-gray-200 placeholder-gray-500"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-blue-900/30 rounded bg-[#111827]"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
                Forgot password?
              </a>
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
                Signing in...
              </div>
            ) : (
              'Sign in'
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
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                Create one now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;