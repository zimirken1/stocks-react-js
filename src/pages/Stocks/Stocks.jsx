import SearchStocks from '../../components/components/SearchStocks/SearchStocks.jsx';
import styles from './Stocks.module.css';
import StocksList from '../../components/components/StocksList/StocksList.jsx';
import useLocalStorage from '../../hooks/useLocalStorage.js';

const Stocks = () => {
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
    <div className={styles.tablePage}>
      <SearchStocks addSymbolToFavourites={addSymbolToFavourites} />
      <StocksList stocks={favourites} deleteSymbolFromFavourites={deleteSymbolFromFavourites} />
    </div>
  );
};

export default Stocks;
