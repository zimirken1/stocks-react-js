import React, { useMemo, useState } from 'react';
import { Drawer } from 'antd';

import { SearchStocks } from 'src/components/components/SearchStocks/SearchStocks.jsx';
import { PortfolioStocksTable } from './PortfolioStocksTable/PortfolioStocksTable.jsx';
import { useSidebar } from 'src/hooks/useSidebar.jsx';
import { StockDetails } from './StockDetails/StockDetails.jsx';
import { useLocalStorage } from 'src/hooks/useLocalStorage.js';
import styles from './Portfolio.module.css';

export const Portfolio = () => {
  const { symbol, isOpen, openSidebar, closeSidebar } = useSidebar();
  const [totalCurrentPrice, setTotalCurrentPrice] = useState();
  const { value: portfolioStocks, updateValue: setPortfolioStocks } = useLocalStorage('portfolio', []);

  const addSymbolToPortfolio = stock => {
    if (!portfolioStocks.some(portfolioStock => portfolioStock.symbol === stock.symbol)) {
      const updatedPortfolioStocks = [stock, ...portfolioStocks];
      setPortfolioStocks(updatedPortfolioStocks);
    }
  };

  const deleteSymbolFromPortfolio = symbol => {
    const filteredStocks = portfolioStocks.filter(stock => stock.symbol !== symbol);
    setPortfolioStocks(filteredStocks);
  };

  const totalSpend = useMemo(() => {
    return Number(portfolioStocks.reduce((total, stock) => total + stock.totalPrice, 0)).toFixed(2);
  }, [portfolioStocks]);

  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <SearchStocks openSidebar={openSidebar} />
        <PortfolioStocksTable
          stocks={portfolioStocks}
          setTotalCurrentPrice={setTotalCurrentPrice}
          deleteSymbolFromPortfolio={deleteSymbolFromPortfolio}
        />
      </div>
      <div className={styles.stats}>
        <div className={styles.statsInner}>
          <h1>Статистика</h1>
          <div>Потрачено: {totalSpend} USD</div>
          <div>Текущая стоимость портфеля: {totalCurrentPrice} USD</div>
          <div>Прибыль: {(totalCurrentPrice - totalSpend).toFixed(2)} USD</div>
        </div>
      </div>
      <Drawer open={isOpen} width={600} onClose={() => closeSidebar()} title={symbol}>
        <StockDetails closeSidebar={closeSidebar} addSymbolToPortfolio={addSymbolToPortfolio} symbol={symbol} />
      </Drawer>
    </div>
  );
};
