import React from 'react';
import styles from './Sider.module.css';
import { Button } from 'antd';
import { PiSuitcaseSimpleLight } from 'react-icons/pi';
import { MdFavoriteBorder } from 'react-icons/md';
import {useNavigate} from "react-router-dom";

const Sider = () => {
  const navigate = useNavigate();
  return (
    <aside className={styles.sider}>
      <div className={styles.sider_buttons}>
        <Button onClick={() => navigate('/')} className={styles.button} icon={<PiSuitcaseSimpleLight size={20} />}>
          Портфель
        </Button>
        <div className={styles.menu}>
          <Button onClick={() => navigate('/favourite')} className={styles.menu_item} icon={<MdFavoriteBorder size={20} />}>
            Избранное
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sider;
