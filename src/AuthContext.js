// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);


  const login = (token, userId, role) => {
    // Your login logic
    setIsLoggedIn(true);
    setToken(token);
    setUserId(userId);
    setUserRole(role);
  };

  const logout = () => {
    // Your logout logic
    setIsLoggedIn(false);
    setToken(null);
    setUserId(null);
    setUserRole(null);
  };

  const signup = (role) => {
    // Your signup logic
    setIsLoggedIn(true);
    setUserRole(role);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, userId, userRole, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
