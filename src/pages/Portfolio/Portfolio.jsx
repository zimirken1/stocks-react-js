import SearchStocks from '../../components/components/SearchStocks/SearchStocks.jsx';
import StocksTable from '../../components/components/StocksList/StocksTable.jsx';
import useLocalStorage from '../../hooks/useLocalStorage.js';
import styles from './Portfolio.module.css';
import { Drawer } from 'antd';
import { useSidebar } from '../../hooks/useSidebar.jsx';
import { useQuery } from 'react-query';
import { stocksApi } from '../../API/stocksAPI.js';
import { StockDetails } from './StockDetails/StockDetails.jsx'

const fetchStock = async symbol => {
  const price = await stocksApi.getPrice(symbol);
  const profile = await stocksApi.getProfile(symbol);

  return { ...profile.data, symbol: symbol, price: price.data.c, priceChange: price.data.dp };
};

const Portfolio = () => {
  const { symbol, isOpen, openSidebar, closeSidebar } = useSidebar();
  const { value: portfolioStocks, updateValue: setPortfolioStocks } = useLocalStorage('portfolio', []);

  const { data } = useQuery(['getStock'], () => fetchStock(symbol));
  console.log(data, '11111');

  const addSymbolToPortfolio = stock => {
    if (!portfolioStocks.some(portfolioStock => portfolioStock.symbol === stock.symbol)) {
      const updatedPortfolioStocks = [stock, ...portfolioStocks];
      setPortfolioStocks(updatedPortfolioStocks);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <SearchStocks addSymbolToPortfolio={addSymbolToPortfolio} openSidebar={openSidebar} />
        <StocksTable stocks={portfolioStocks} />
      </div>
      <div className={styles.stats}>
        <h1>Статистика</h1>
        <div>Потрачено:</div>
        <div>Прибыль:</div>
      </div>
      <Drawer open={isOpen} width={600} onClose={() => closeSidebar()} title={symbol}>
        <StockDetails symbol={symbol} />
      </Drawer>
    </div>
  );
};

export default Portfolio;
