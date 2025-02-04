// src/context/UserContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import AuthService from '../api/authService';  // Assuming AuthService has login/logout functionality

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if a token exists and validate it
    const fetchUser = async () => {
      const userData = await AuthService.getProfile(); // Fetch user profile using the token (if available)
      setUser(userData);  // Set user data if available
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
