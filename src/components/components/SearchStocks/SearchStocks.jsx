import React, { useEffect, useState } from 'react';
import { AutoComplete, Empty, Input } from 'antd';
import { useQuery } from 'react-query';
import { FiSearch } from 'react-icons/fi';
import { toast } from 'react-toastify';

import { stocksApi } from 'src/API/stocksAPI';
import styles from './SearchStocks.module.css';

export const SearchStocks = ({ addSymbolToFavourites, openSidebar }) => {
  const { data } = useQuery('getStocks', () => stocksApi.getStocks());
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    if (!data) return;
    const filteredOptions = data
      .filter(stock => stock.description.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 5)
      .map(stock => ({ label: stock.description, value: stock.description }));
    setOptions(filteredOptions);
  }, [data, value]);

  const onSelect = value => {
    setValue('');
    const selectedStock = data.find(stock => stock.description === value);
    if (selectedStock) {
      if (addSymbolToFavourites) {
        addSymbolToFavourites(selectedStock);
        toast.success('Успешно!', {
          position: 'bottom-right',
          autoClose: 4000,
        });
      } else {
        openSidebar(selectedStock.symbol);
      }
    }
  };

  return (
    <div className={styles.container}>
      <AutoComplete
        options={options}
        value={value}
        onChange={setValue}
        onSelect={onSelect}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        notFoundContent={<Empty />}
        allowClear
        size='large'
      >
        <Input size={'large'} prefix={<FiSearch size={16} />} />
      </AutoComplete>
    </div>
  );
};
