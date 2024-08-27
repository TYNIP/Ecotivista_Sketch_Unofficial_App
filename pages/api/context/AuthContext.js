// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {NextRequest} from 'next/server';
import { NextResponse } from 'next/server';
const {PATHURL} = require('../config');
const {checkStatus} = require('../functions/checkStatus');

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {

        const res = await checkStatus();
        console.log(res)

        if (res.isAuthorized) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log('User not authenticated')
        setIsAuthenticated(false);
      } finally {
        console.log('loading over')
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
