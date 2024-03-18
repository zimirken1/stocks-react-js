import { Input, List } from 'antd';
import { useEffect, useRef, useState } from 'react';
import styles from './SearchStocks.module.css';
import { useQuery } from 'react-query';
import { stocksApi } from '../../../API/stocksAPI.js';
import { AiOutlineClose } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { toast } from 'react-toastify';

const SearchStocks = ({ addSymbolToFavourites }) => {
  const { data } = useQuery('getStocks', () => stocksApi['getStocks']());
  const [value, setValue] = useState('');
  const [stocks, setStocks] = useState([]);
  const [focus, setFocus] = useState(false);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (!data) return;
    const filteredStocks = data
      .filter(stock => {
        return stock.description.toLowerCase().includes(value.toLocaleLowerCase());
      })
      .slice(0, 5);
    setStocks(filteredStocks);
  }, [data, value]);

  const onBlurHandler = e => {
    setTimeout(() => {
      if (autocompleteRef.current && autocompleteRef.current.contains(e.target)) {
        setFocus(false);
      }
      setFocus(false);
    }, 100);
  };

  const selectStock = stock => {
    setValue('');
    addSymbolToFavourites(stock);
    toast.success('Успешно!', {
      position: 'bottom-right',
      autoClose: 4000,
    });
  };

  return (
    <div className={styles.container}>
      <Input
        addonBefore={<FiSearch size={16} />}
        allowClear={<AiOutlineClose />}
        value={value}
        onFocus={() => setFocus(true)}
        onBlur={onBlurHandler}
        onChange={e => setValue(e.target.value)}
      />
      {value && focus && stocks.length && (
        <List className={styles.autocomplete_container} ref={autocompleteRef}>
          {stocks.map(stock => {
            return (
              <List.Item key={stock.figi} onClick={() => selectStock(stock)}>
                {stock.description}
              </List.Item>
            );
          })}
        </List>
      )}
    </div>
  );
};

export default SearchStocks;
