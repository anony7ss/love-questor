
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if the user is authenticated
    if (localStorage.getItem('isAuthenticated') !== 'true') {
      navigate('/');
    }
  }, [navigate]);
  
  return <>{children}</>;
};

export default ProtectedRoute;
