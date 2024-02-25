import { useState } from 'react';

function useLocalStorage(key, initialValue) {
  const storedValue = localStorage.getItem(key);

  const [value, setValue] = useState(() => {
    const parsedValue = storedValue ? JSON.parse(storedValue) : initialValue;
    return { data: parsedValue };
  });

  const updateValue = newValue => {
    setValue({ ...value, data: newValue });
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  const removeValue = () => {
    localStorage.removeItem(key);
    setValue({ ...value, data: null });
  };

  return { value: value.data, updateValue, removeValue };
}

export default useLocalStorage;
