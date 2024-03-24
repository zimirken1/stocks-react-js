import React from 'react';
import { Card, Spin, Typography, Image } from 'antd';
import { useQuery } from 'react-query';
import { stocksApi } from '../../../API/stocksAPI.js';
import styles from './StockDetails.module.css';

const { Text } = Typography;

export const StockDetails = ({ symbol }) => {
  const { data: stockDetails, isLoading, isError } = useQuery(['stockDetails', symbol], () => stocksApi.getProfile(symbol));
  const { data: stockPrice } = useQuery(['stockPrice', symbol], () => stocksApi.getPrice(symbol));

  if (isLoading) {
    return <Spin />;
  }

  const data = stockDetails?.data;

  if (isError || !data) {
    return <div>Error fetching stock details</div>;
  }

  console.log(data);

  return (
    <Card title="Stock Details">
      <div className={styles.logo}>
        <Text>{data.name && <strong>{data.name}</strong>}</Text>
        <Image src={data.logo && data.logo} width={48} height={48} alt="logo" />
      </div>
      <div className={styles.inner}>
        <Text>Country: {data.country && <>{data.country}</>}</Text>
        <Text>Currency: {data.currency && <>{data.currency}</>}</Text>
        <Text>Exchange: {data.exchange && <>{data.exchange}</>}</Text>
        <Text>Finnhub industry: {data.finnhubIndustry && <>{data.finnhubIndustry}</>}</Text>
        <Text>Ipo: {data.ipo && <>{data.ipo}</>}</Text>
        <Text>Ticker: {data.ticker && <>{data.ticker}</>}</Text>
        <Text>Website: {data.weburl && <a href={data.weburl}>{data.weburl}</a>}</Text>
        <Text>Current price: {stockPrice?.data.c && <>{stockPrice.data.c} USD</>}</Text>
        <Text>Change: {stockPrice?.data.d && <>{stockPrice.data.d} USD</>}</Text>
        <Text>Percent change: {stockPrice?.data.dp && <>{stockPrice.data.dp} USD</>}</Text>
        <Text>High price of the day: {stockPrice?.data.h && <>{stockPrice.data.h} USD</>}</Text>
        <Text>Low price of the day: {stockPrice?.data.l && <>{stockPrice.data.l} USD</>}</Text>
        <Text>Open price of the day: {stockPrice?.data.o && <>{stockPrice.data.o} USD</>}</Text>
        <Text>Previous close price: {stockPrice?.data.pc && <>{stockPrice.data.pc} USD</>}</Text>
      </div>
    </Card>
  );
};
