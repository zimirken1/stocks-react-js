import React from 'react';

import { SearchStocks } from 'src/components/components/SearchStocks/SearchStocks.jsx';
import { useLocalStorage } from 'src/hooks/useLocalStorage.js';
import { StocksTable } from 'src/components/components/StocksTable/StocksTable';
import styles from './Favourites.module.css';

export const Favourites = () => {
  const { value: favourites, updateValue: setFavourites } = useLocalStorage('favouriteStocks', []);

  const addSymbolToFavourites = stock => {
    if (!favourites.some(favourite => favourite.symbol === stock.symbol)) {
      const updatedFavourites = [stock, ...favourites];
      setFavourites(updatedFavourites);
    }
  };

  const deleteSymbolFromFavourites = symbol => {
    const filteredStocks = favourites.filter(favourite => favourite.symbol !== symbol);
    setFavourites(filteredStocks);
  };

  return (
    <div className={styles.stocks}>
      <SearchStocks addSymbolToFavourites={addSymbolToFavourites} />
      <StocksTable stocks={favourites} deleteSymbolFromFavourites={deleteSymbolFromFavourites} />
    </div>
  );
};
