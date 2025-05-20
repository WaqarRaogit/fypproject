import { Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const Hero = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <section className="py-10 md:py-16">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Shorten, Share, and Track Your Links
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Create shorter links, QR codes, and track detailed analytics with our powerful URL shortening service.
        </p>
        
        {!isAuthenticated && (
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 transition"
            >
              Create Free Account
            </Link>
            <Link
              to="/login"
              className="bg-gray-100 text-gray-800 py-3 px-6 rounded-md font-medium hover:bg-gray-200 transition"
            >
              Log In
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;