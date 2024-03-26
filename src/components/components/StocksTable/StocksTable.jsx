import React, { useState } from 'react';
import { Table, Button, Spin, Image } from 'antd';
import { useQuery } from 'react-query';
import { stocksApi } from '../../../API/stocksAPI.js';
import styles from './StocksTable.module.css';

const fetchStock = async symbol => {
  const price = await stocksApi.getPrice(symbol);
  const profile = await stocksApi.getProfile(symbol);

  return { ...profile.data, symbol: symbol, price: price.data.c, priceChange: price.data.dp };
};

const StocksTable = ({ stocks, deleteSymbolFromFavourites }) => {
  const { data, isLoading } = useQuery(['getStocks', stocks.map(stock => stock.symbol)], () =>
    Promise.all(stocks.map(stock => fetchStock(stock.symbol)))
  );

  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: <strong>Логотип</strong>,
      dataIndex: 'logo',
      key: 'logo',
      render: text => (text ? <Image width={50} height={50} src={text} alt='logo' /> : null),
    },
    {
      title: <strong>Название</strong>,
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
    },
    {
      title: <strong>Тикер</strong>,
      dataIndex: 'ticker',
      key: 'ticker',
      sorter: (a, b) => a.ticker.localeCompare(b.ticker),
      sortOrder: sortedInfo.columnKey === 'ticker' && sortedInfo.order,
    },
    {
      title: <strong>Символ</strong>,
      dataIndex: 'symbol',
      key: 'symbol',
      sorter: (a, b) => a.symbol.localeCompare(b.symbol),
      sortOrder: sortedInfo.columnKey === 'symbol' && sortedInfo.order,
    },
    {
      title: <strong>Цена</strong>,
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      sortOrder: sortedInfo.columnKey === 'price' && sortedInfo.order,
      render: (text, record) => (
        <div>
          <span>{`${text} USD`}</span>
          <span style={{ marginLeft: '0.5rem', color: record.priceChange >= 0 ? 'green' : 'red' }}>
            ({record.priceChange && record.priceChange.toFixed(2)}%)
          </span>
        </div>
      ),
    },
    {
      title: <strong>Действие</strong>,
      key: 'action',
      render: (_, record) => {
        return (
          <Button
            danger
            onClick={() => {
              deleteSymbolFromFavourites(record.symbol);
            }}
          >
            Remove
          </Button>
        );
      },
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
        onChange={handleChange}
      />
    </div>
  );
};

export default StocksTable;
