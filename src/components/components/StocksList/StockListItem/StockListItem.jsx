import {Button, List, Spin, Image, Typography} from 'antd';
import {stocksApi} from '../../../../API/stocksAPI.js';
import {useQuery} from 'react-query';

const fetchStock = async symbol => {
    const price = await stocksApi['getPrice'](symbol);
    const profile = await stocksApi['getProfile'](symbol);

    const stock = {...profile.data, price: price.data.c};
    return stock;
};

const StockListItem = ({item, deleteSymbolFromFavourites}) => {
    const {data, isLoading} = useQuery(`getStock/${item.symbol}`, () => fetchStock(item.symbol));
    if (isLoading) {
        return <Spin/>
    }
    return (
        <List.Item>
            {data.logo ? <Image src={data.logo} alt={data.name}/> : (<div></div>)}
            <Typography.Paragraph>{data.name}</Typography.Paragraph>
            <Typography.Paragraph>{data.ticker}</Typography.Paragraph>
            <Typography.Paragraph>{data.price}USD</Typography.Paragraph>
            <Button danger={true} onClick={() => deleteSymbolFromFavourites(item.symbol)}>
                Remove
            </Button>
        </List.Item>
    );
};

export default StockListItem;
