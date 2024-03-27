import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';

import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header_inner}>
        <AiOutlineUser size={24} color={'#2c2c2c'} />
      </div>
    </header>
  );
};
