import SearchStocks from '../../components/components/SearchStocks/SearchStocks.jsx';
import styles from './Stocks.module.css';
import useLocalStorage from '../../hooks/useLocalStorage.js';
import StocksTable from '../../components/components/StocksList/StocksTable.jsx';

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
    <div className={styles.stocks}>
      <SearchStocks addSymbolToFavourites={addSymbolToFavourites} />
      <StocksTable stocks={favourites} deleteSymbolFromFavourites={deleteSymbolFromFavourites} />
    </div>
  );
};

export default Stocks;
