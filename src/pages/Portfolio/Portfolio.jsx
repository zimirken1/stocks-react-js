import React, { useMemo, useState } from 'react';
import { Drawer } from 'antd';

import SearchStocks from '../../components/components/SearchStocks/SearchStocks.jsx';
import { PortfolioStocksTable } from './PortfolioStocksTable/PortfolioStocksTable.jsx';
import { useSidebar } from '../../hooks/useSidebar.jsx';
import { StockDetails } from './StockDetails/StockDetails.jsx';
import useLocalStorage from '../../hooks/useLocalStorage.js';
import styles from './Portfolio.module.css';

const Portfolio = () => {
  const { symbol, isOpen, openSidebar, closeSidebar } = useSidebar();
  const [totalCurrentPrice, setTotalCurrentPrice] = useState();
  const { value: portfolioStocks, updateValue: setPortfolioStocks } = useLocalStorage('portfolio', []);

  const addSymbolToPortfolio = stock => {
    if (!portfolioStocks.some(portfolioStock => portfolioStock.symbol === stock.symbol)) {
      const updatedPortfolioStocks = [stock, ...portfolioStocks];
      setPortfolioStocks(updatedPortfolioStocks);
    }
  };

  const totalSpend = useMemo(() => {
    return Number(portfolioStocks.reduce((total, stock) => total + stock.totalPrice, 0)).toFixed(2);
  }, [portfolioStocks]);

  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <SearchStocks openSidebar={openSidebar} />
        <PortfolioStocksTable stocks={portfolioStocks} setTotalCurrentPrice={setTotalCurrentPrice} />
      </div>
      <div className={styles.stats}>
        <div className={styles.statsInner}>
          <h1>Статистика</h1>
          <div>Потрачено: {totalSpend} USD</div>
          <div>Текущая стоимость портфеля: {totalCurrentPrice} USD</div>
          <div>Прибыль: {totalCurrentPrice - totalSpend} USD</div>
        </div>
      </div>
      <Drawer open={isOpen} width={600} onClose={() => closeSidebar()} title={symbol}>
        <StockDetails closeSidebar={closeSidebar} addSymbolToPortfolio={addSymbolToPortfolio} symbol={symbol} />
      </Drawer>
    </div>
  );
};

export default Portfolio;
