import React from 'react';
import styles from './Sider.module.css';
import { Button } from 'antd';

const Sider = () => {
  return (
    <aside className={styles.sider}>
      <div className={styles.sider_buttons}>
          <Button className={styles.button}>Portfolio</Button>
      </div>
    </aside>
  );
};

export default Sider;
