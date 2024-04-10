import React, { createContext, useState, useContext } from 'react';

const MeContext = createContext();

export const MeProvider = ({ children }) => {
  const [me, setMe] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = userData => {
    setMe(userData);
    if (userData.roles.includes('admin')) setIsAdmin(true);
  };

  const logout = () => {
    setMe(null);
    setIsAdmin(false);
  };

  return <MeContext.Provider value={{ isAdmin, me, login, logout }}>{children}</MeContext.Provider>;
};

export const useMeContext = () => useContext(MeContext);
