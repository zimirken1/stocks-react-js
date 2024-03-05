import React from 'react';
import styles from './Header.module.css';
import { HiMiniIdentification } from 'react-icons/hi2';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header_inner}>
        <HiMiniIdentification size={36} color={'#2c2c2c'} />
      </div>
    </header>
  );
};

export default Header;
