// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
const {checkStatus} = require('../functions/checkStatus');

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] =  useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {

        const res = await checkStatus();
        console.log("helloooo", res);

        if (res.isAuthorized) {
          setIsAuthenticated(true);
          setUsername(res.username);
          setEmail(res.email);
          setId(res.id);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
  <AuthContext.Provider
    value={{
      isAuthenticated,
      setIsAuthenticated, // Expose these setters
      username,
      setUsername,
      email,
      setEmail,
      id,
      setId,
      loading,
    }}
  >
    {children}
  </AuthContext.Provider>
);

};

export const useAuth = () => useContext(AuthContext);
