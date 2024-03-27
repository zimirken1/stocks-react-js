import React, { useState } from 'react';
import { Table, Button, Spin, Image } from 'antd';
import { useQuery } from 'react-query';

import { useFetchStock } from 'src/hooks/useFetchStock';
import styles from './StocksTable.module.css';

export const StocksTable = ({ stocks, deleteSymbolFromFavourites }) => {
  const { fetchStock } = useFetchStock();
  const { data, isLoading } = useQuery(['getStocks', stocks.map(stock => stock.symbol)], () =>
    Promise.all(stocks.map(stock => fetchStock(stock.symbol)))
  );

  const [sortedInfo, setSortedInfo] = useState({ columnKey: null, order: null });

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
            Удалить
          </Button>
        );
      },
    },
  ];

  if (isLoading) {
    return <Spin />;
  }

  const sortedData = data.slice().sort((a, b) => {
    const columnValueA = a[sortedInfo.columnKey];
    const columnValueB = b[sortedInfo.columnKey];

    if (typeof columnValueA === 'string' && typeof columnValueB === 'string') {
      return columnValueA.localeCompare(columnValueB);
    } else if (typeof columnValueA === 'number' && typeof columnValueB === 'number') {
      return columnValueA - columnValueB;
    } else {
      return 0;
    }
  });

  const dataSource = sortedData.map(item => ({
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
