import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const useAuth = () => {
  const { isAuthenticated, user, login, register, logout, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    await login(credentials);
    navigate('/dashboard');
  };

  const handleRegister = async (userData) => {
    await register(userData);
    navigate('/dashboard');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return {
    isAuthenticated,
    user,
    isLoading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
};

export default useAuth;