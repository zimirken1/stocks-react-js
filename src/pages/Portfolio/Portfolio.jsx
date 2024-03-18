import React from 'react';
import SearchStocks from '../../components/components/SearchStocks/SearchStocks.jsx';
import useLocalStorage from '../../hooks/useLocalStorage.js';

const Portfolio = () => {
  const { value: portfolioStocks, updateValue: setPortfolioStocks } = useLocalStorage('portfolio', []);

  const addSymbolToPortfolio = stock => {
    if (!portfolioStocks.some(portfolioStock => portfolioStock.symbol === stock.symbol)) {
      const updatedPortfolioStocks = [stock, ...portfolioStocks];
      setPortfolioStocks(updatedPortfolioStocks);
    }
  };

  return (
    <div>
      <SearchStocks addSymbolToPortfolio={addSymbolToPortfolio} />
      <div>Таблица</div>
    </div>
  );
};

export default Portfolio;
