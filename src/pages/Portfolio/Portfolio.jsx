import React, { useMemo, useState } from 'react';
import { Drawer, Statistic, Card } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

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

  const profit = useMemo(() => (totalCurrentPrice - totalSpend).toFixed(2), [totalCurrentPrice, totalSpend]);
  const profitColor = profit >= 0 ? '#3f8600' : '#cf1322';

  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <div className={styles.details_search}>
          <SearchStocks openSidebar={openSidebar} />
        </div>
        <PortfolioStocksTable
          stocks={portfolioStocks}
          setTotalCurrentPrice={setTotalCurrentPrice}
          deleteSymbolFromPortfolio={deleteSymbolFromPortfolio}
        />
      </div>
      <div className={styles.stats}>
        <Card bordered={false}>
          <Statistic title='Потрачено' value={totalSpend} suffix='USD' precision={2} />
          <Statistic
            title='Текущая стоимость портфеля'
            value={totalCurrentPrice}
            suffix='USD'
            precision={2}
            style={{ margin: '20px 0' }}
          />
          <Statistic
            title='Прибыль'
            value={profit}
            suffix='USD'
            precision={2}
            valueStyle={{ color: profitColor }}
            prefix={profit >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          />
        </Card>
      </div>
      <Drawer className={styles.customDrawer} open={isOpen} width={600} onClose={() => closeSidebar()} title={symbol}>
        <StockDetails closeSidebar={closeSidebar} addSymbolToPortfolio={addSymbolToPortfolio} symbol={symbol} />
      </Drawer>
    </div>
  );
};
