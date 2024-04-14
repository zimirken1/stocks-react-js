import React, { useState, useMemo } from 'react';
import { Card, Spin, Typography, Image, InputNumber, Button } from 'antd';
import { DollarOutlined, GlobalOutlined, TagOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';

import { stocksApi } from '../../../API/stocksAPI.js';
import styles from './StockDetails.module.css';
import './Drawer.override.css';

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
    <Card title='Stock Details' className={styles.stockDetailsCard}>
      <div className={styles.header}>
        <Image src={data.logo} width={64} height={64} alt={`${data.name} logo`} />
        <div>
          <h2>{data.name}</h2>
          <Text type='secondary'>{data.ticker}</Text>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Text>
            <GlobalOutlined /> {data.country}
          </Text>
          <Text>
            <DollarOutlined /> {data.currency}
          </Text>
          <Text>
            <TagOutlined /> {data.exchange}
          </Text>
          <Text>
            <InfoCircleOutlined /> {data.finnhubIndustry}
          </Text>
        </div>
        <div className={styles.section}>
          <Text>
            Current price: <strong>{stockPrice.data.c} USD</strong>
          </Text>
          <Text>
            Change: <strong>{stockPrice.data.d} USD</strong>
          </Text>
          <Text>
            Percent change: <strong>{stockPrice.data.dp}%</strong>
          </Text>
          <Text>
            High today: <strong>{stockPrice.data.h} USD</strong>
          </Text>
          <Text>
            Low today: <strong>{stockPrice.data.l} USD</strong>
          </Text>
          <Text>
            Open today: <strong>{stockPrice.data.o} USD</strong>
          </Text>
          <Text>
            Previous close: <strong>{stockPrice.data.pc} USD</strong>
          </Text>
        </div>
        <div className={styles.buySection}>
          <InputNumber value={inputValue} onChange={setInputValue} min={1} max={1000} />
          <Text>Total: {price.toFixed(2)} USD</Text>
          <Button type={'primary'} onClick={handleClick}>
            Add to Portfolio
          </Button>
        </div>
      </div>
    </Card>
  );
};
