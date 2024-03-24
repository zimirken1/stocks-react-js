import { useState } from 'react';

export const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [symbol, setSymbol] = useState();

  const openSidebar = symbol => {
    setIsOpen(true);
    setSymbol(symbol);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return { symbol, isOpen, openSidebar, closeSidebar };
};
