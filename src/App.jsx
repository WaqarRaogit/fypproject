import { Routes, Route, useLocation, Navigate, useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthStore from './store/authStore';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import DashboardPage from './pages/DashboardPage';
import LinksList from './components/url/LinksList';
import AnalyticsCard from './components/url/AnalyticsCard';
import AppLayout from './components/layout/AppLayout';
import HomePage from './pages/HomePage';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import Loading from './components/common/Loading';
import { scheduleTokenRefresh } from './services/api';
import NotFoundPage from './pages/NotFoundPage';

const ShortUrlRedirect = () => {
  const { shortCode } = useParams();
  const { getOriginalUrl, isLoading, error } = useUrlStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndRedirect = async () => {
      if (isLoading) return;
      try {
        const originalUrl = await getOriginalUrl(shortCode);
        if (originalUrl) {
          window.location.href = originalUrl;
        } else {
          navigate('/not-found');
        }
      } catch (err) {
        console.error('Redirect error:', err);
        navigate('/not-found');
      }
    };
    fetchAndRedirect();
  }, [shortCode, getOriginalUrl, isLoading, navigate]);

  if (isLoading) return <Loading />;
  if (error) return <Navigate to="/not-found" />;
  return null;
};

const App = () => {
  const { checkAuth, isAuthenticated, isLoading } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
    scheduleTokenRefresh();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="relative">
      <ToastContainer /> {/* Keep in case other components use toast */}
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginForm />} />
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterForm />} />
          <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" replace />} />
          <Route path="/links" element={isAuthenticated ? <LinksList /> : <Navigate to="/login" replace />} />
          <Route path="/analytics/:shortCode" element={isAuthenticated ? <AnalyticsCard /> : <Navigate to="/login" replace />} />
          <Route path="/:shortCode" element={<ShortUrlRedirect />} />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;