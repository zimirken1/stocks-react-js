import React, { createContext, useState, useContext } from 'react';

const MeContext = createContext();

export const MeProvider = ({ children }) => {
  const [me, setMe] = useState(null);

  const login = userData => {
    setMe(null);
    setMe(userData);
  };

  const logout = () => {
    setMe(null);
  };

  return <MeContext.Provider value={{ me, login, logout }}>{children}</MeContext.Provider>;
};

export const useMeContext = () => useContext(MeContext);
