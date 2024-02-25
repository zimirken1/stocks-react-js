import { List } from 'antd';
import StockListItem from "./StockListItem/StockListItem.jsx";

const StocksList = ({ stocks, deleteSymbolFromFavourites }) => {
  return (
    <List>
      {stocks && stocks.map(stock => {
        return <StockListItem deleteSymbolFromFavourites={deleteSymbolFromFavourites} item={stock} key={stock.figi} />;
      })}
    </List>
  );
};

export default StocksList;
