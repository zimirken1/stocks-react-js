import { List } from 'antd';
import StockListItem from './StockListItem/StockListItem.jsx';
import styles from './StocksList.module.css';

const StocksList = ({ stocks, deleteSymbolFromFavourites }) => {
  return (
    <div className={styles.container}>
      <List>
        {stocks &&
          stocks.map(stock => {
            return (
              <StockListItem deleteSymbolFromFavourites={deleteSymbolFromFavourites} item={stock} key={stock.figi} />
            );
          })}
      </List>
    </div>
  );
};

export default StocksList;
