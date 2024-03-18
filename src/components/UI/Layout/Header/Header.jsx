import React from 'react';
import styles from './Header.module.css';
import { AiOutlineUser } from 'react-icons/ai';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header_inner}>
        <AiOutlineUser size={24} color={'#2c2c2c'} />
      </div>
    </header>
  );
};

export default Header;
