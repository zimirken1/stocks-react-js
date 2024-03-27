import { stocksApi } from 'src/API/stocksAPI';

export const useFetchStock = () => {
  const fetchStock = async symbol => {
    const price = await stocksApi.getPrice(symbol);
    const profile = await stocksApi.getProfile(symbol);

    return { ...profile.data, symbol: symbol, price: price.data.c, priceChange: price.data.dp };
  };

  return {
    fetchStock,
  };
};
