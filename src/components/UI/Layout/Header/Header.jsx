import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';

import styles from './Header.module.css';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.header_inner}>
        <div className={styles.header_items}>
          <MdOutlineAdminPanelSettings size={32} color={'#2c2c2c'} />
          <AiOutlineUser size={32} color={'#2c2c2c'} onClick={() => navigate('/auth')} />
        </div>
      </div>
    </header>
  );
};
