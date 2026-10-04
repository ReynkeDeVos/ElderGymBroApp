import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// For public pages: send an already logged-in user to /home.
export const useRedirectIfLoggedIn = () => {
  const { isLoggedIn, checkUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    checkUser();
  }, [checkUser]);
  useEffect(() => {
    if (isLoggedIn) navigate('/home');
  }, [isLoggedIn, navigate]);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  // Fetches the current user (the auth cookie is httpOnly, so the API is the only way to know).
  const checkUser = useCallback(async () => {
    try {
      const { data } = await axios.get('/profile/me');
      setIsLoggedIn(true);
      setUserData(data);
      return data;
    } catch {
      setIsLoggedIn(false);
      setUserData({});
      return {};
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, setIsLoggedIn, setUserData, checkUser }}>
      {children}
    </AuthContext.Provider>
  );
};
