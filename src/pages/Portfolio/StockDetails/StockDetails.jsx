import React, { useState, useMemo } from 'react';
import { Card, Spin, Typography, Image, InputNumber, Button } from 'antd';
import { useQuery } from 'react-query';
import { stocksApi } from '../../../API/stocksAPI.js';
import styles from './StockDetails.module.css';

const { Text } = Typography;

export const StockDetails = ({ symbol, addSymbolToPortfolio, closeSidebar }) => {
  const [inputValue, setInputValue] = useState();
  const {
    data: stockDetails,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
  } = useQuery(['stockDetails', symbol], () => stocksApi.getProfile(symbol));
  const {
    data: stockPrice,
    isLoading: isPriceLoading,
    isError: isPriceError,
  } = useQuery(['stockPrice', symbol], () => stocksApi.getPrice(symbol));

  const data = stockDetails?.data;
  const isLoading = isDetailsLoading || isPriceLoading;
  const isError = isDetailsError || isPriceError;

  const price = useMemo(() => {
    return stockPrice?.data.c * inputValue || 0;
  }, [stockPrice?.data.c, inputValue]);

  const handleClick = () => {
    addSymbolToPortfolio({ symbol: symbol, purchasePrice: stockPrice?.data.c, amount: inputValue, totalPrice: price });
    closeSidebar();
  };

  if (isLoading) {
    return <Spin />;
  }

  if (isError || !data) {
    return <div>Error fetching stock details</div>;
  }

  return (
    <Card title='Stock Details'>
      <div className={styles.logo}>
        <Text>{data.name && <strong>{data.name}</strong>}</Text>
        <Image src={data.logo && data.logo} width={64} height={64} alt='logo' />
      </div>
      <div className={styles.inner}>
        {data.country && <Text>Country: {data.country}</Text>}
        {data.currency && <Text>Currency: {data.currency}</Text>}
        {data.exchange && (
          <Text>
            Exchange: <>{data.exchange}</>
          </Text>
        )}
        {data.finnhubIndustry && <Text>Finnhub industry: {data.finnhubIndustry}</Text>}
        {data.ipo && <Text>Ipo: {data.ipo}</Text>}
        {data.ticker && <Text>Ticker: {data.ticker}</Text>}
        {data.weburl && (
          <Text>
            Website: <a href={data.weburl}>{data.weburl}</a>
          </Text>
        )}
        {stockPrice?.data.c && (
          <>
            {stockPrice?.data.c && <Text>Current price: {stockPrice.data.c} USD</Text>}
            {stockPrice?.data.d && <Text>Change: {stockPrice.data.d} USD</Text>}
            {stockPrice?.data.dp && <Text>Percent change: {stockPrice.data.dp} USD</Text>}
            {stockPrice?.data.h && <Text>High price of the day: {stockPrice.data.h} USD</Text>}
            {stockPrice?.data.l && <Text>Low price of the day: {stockPrice.data.l} USD</Text>}
            {stockPrice?.data.o && <Text>Open price of the day: {stockPrice.data.o} USD</Text>}
            {stockPrice?.data.pc && <Text>Previous close price: {stockPrice.data.pc} USD</Text>}
          </>
        )}
      </div>
      {stockPrice.data.c && (
        <div className={styles.form}>
          <InputNumber
            value={inputValue}
            onChange={value => setInputValue(value)}
            addonBefore={<Text>Введите кол-во акций: </Text>}
            min={1}
            max={1000}
            addonAfter={<Text>Итого: {price.toFixed(2)} USD</Text>}
          />
          <Button type={'primary'} size={'middle'} onClick={() => handleClick()}>
            <Text className={styles.button_text}>Добавить</Text>
          </Button>
        </div>
      )}
    </Card>
  );
};
