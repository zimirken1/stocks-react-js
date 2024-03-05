import React from 'react';
import { Table, Button, Spin, Image } from 'antd';
import { useQuery } from 'react-query';
import { stocksApi } from '../../../API/stocksAPI.js';
import styles from './StocksTable.module.css';

const fetchStock = async symbol => {
  const price = await stocksApi['getPrice'](symbol);
  const profile = await stocksApi['getProfile'](symbol);

  return { ...profile.data, price: price.data.c };
};

const StocksTable = ({ stocks, deleteSymbolFromFavourites }) => {
  const { data, isLoading } = useQuery(['getStocks', stocks.map(stock => stock.symbol)], () =>
    Promise.all(stocks.map(stock => fetchStock(stock.symbol)))
  );

  const columns = [
    {
      title: 'Logo',
      dataIndex: 'logo',
      key: 'logo',
      render: text => (text ? <Image width={50} src={text} alt='logo' /> : null),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ticker',
      dataIndex: 'ticker',
      key: 'ticker',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: text => `${text} USD`,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button danger onClick={() => deleteSymbolFromFavourites(record.symbol)}>
          Remove
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return <Spin />;
  }

  const dataSource = data.map(item => ({
    key: item.symbol,
    ...item,
  }));

  return (
    <div className={styles.container}>
      <Table
        rowClassName={styles.table_row}
        bordered={true}
        pagination={false}
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  );
};

export default StocksTable;
