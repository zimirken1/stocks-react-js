import React from 'react';

import { Sider } from './components/UI/Layout/Sider/Sider.jsx';
import { Header } from './components/UI/Layout/Header/Header.jsx';
import { Section } from './components/UI/Layout/Section/Section.jsx';
import styles from './App.module.css';

export const App = () => {
  return (
    <div className={styles.container}>
      <Sider />
      <div className={styles.content}>
        <Header />
        <Section />
      </div>
    </div>
  );
};
