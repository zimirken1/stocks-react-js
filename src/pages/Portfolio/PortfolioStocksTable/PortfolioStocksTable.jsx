import React, { useState, useMemo, useEffect } from 'react';
import { Table, Button, Spin, Image } from 'antd';
import { useQuery } from 'react-query';

import { stocksApi } from 'src/API/stocksAPI';
import styles from './PortfolioStocksTable.module.css';

const fetchStock = async stock => {
  const price = await stocksApi.getPrice(stock.symbol);
  const profile = await stocksApi.getProfile(stock.symbol);

  return {
    ...profile.data,
    symbol: stock.symbol,
    purchasePrice: stock.purchasePrice,
    amount: stock.amount,
    totalPrice: stock.totalPrice,
    price: price.data.c,
    priceChange: price.data.dp,
  };
};

export const PortfolioStocksTable = ({ stocks, deleteSymbolFromPortfolio, setTotalCurrentPrice }) => {
  const { data, isLoading } = useQuery(['getStocks', stocks.map(stock => stock.symbol)], () =>
    Promise.all(stocks.map(stock => fetchStock(stock)))
  );

  const totalCurrentPrice = useMemo(() => {
    return data ? data.reduce((total, item) => total + item.price * item.amount, 0).toFixed(2) : 0;
  }, [data]);

  useEffect(() => {
    setTotalCurrentPrice(totalCurrentPrice);
  }, [totalCurrentPrice]);

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
      title: <strong>Символ</strong>,
      dataIndex: 'symbol',
      key: 'symbol',
      sorter: (a, b) => a.symbol.localeCompare(b.symbol),
      sortOrder: sortedInfo.columnKey === 'symbol' && sortedInfo.order,
    },
    {
      title: <strong>Текущая цена</strong>,
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
      title: <strong>Цена покупки</strong>,
      dataIndex: 'purchasePrice',
      key: 'purchasePrice',
      sorter: (a, b) => a.purchasePrice - b.purchasePrice,
      sortOrder: sortedInfo.columnKey === 'purchasePrice' && sortedInfo.order,
      render: (text, record) => {
        const profitPercent = (((record.price - text) / text) * 100).toFixed(2);
        const profitColor = profitPercent >= 0 ? 'green' : 'red';
        return (
          <div>
            <span>{`${text} USD`}</span>
            <span style={{ marginLeft: '0.5rem', color: profitColor }}>({profitPercent}%)</span>
          </div>
        );
      },
    },
    {
      title: <strong>Количество</strong>,
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => a.amount - b.amount,
      sortOrder: sortedInfo.columnKey === 'amount' && sortedInfo.order,
    },
    {
      title: <strong>Общая стоимость</strong>,
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      sortOrder: sortedInfo.columnKey === 'totalPrice' && sortedInfo.order,
      render: text => <span>{`${text.toFixed(2)} USD`}</span>,
    },
    {
      title: <strong>Действие</strong>,
      key: 'action',
      render: (_, record) => {
        return (
          <Button
            danger
            onClick={() => {
              deleteSymbolFromPortfolio(record.symbol);
            }}
          >
            Удалить
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
