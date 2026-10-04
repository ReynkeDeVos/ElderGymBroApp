import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthProvider';

const PrivateRoute = () => {
  const { isLoggedIn, checkUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser().then(() => setLoading(false));
  }, [checkUser]);

  if (loading) return <div>Loading...</div>;
  return isLoggedIn ? <Outlet /> : <Navigate to="/accessdenied" />;
};

export default PrivateRoute;
