import React, { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spin } from 'antd';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Route, Routes, useLocation } from 'react-router-dom';

import { About } from 'src/pages/About/About.jsx';
import { Favourites } from 'src/pages/Stocks/Favourites.jsx';
import { Portfolio } from '../../../../pages/Portfolio/Portfolio.jsx';
import styles from './Section.module.css';

export const Section = () => {
  const location = useLocation();

  return (
    <section className={styles.section}>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          classNames={{
            enter: styles.fadeEnter,
            enterActive: styles.fadeEnterActive,
            enterDone: styles.fadeEnterDone,
            exit: styles.fadeExit,
          }}
          timeout={100}
          unmountOnExit
        >
          <Routes location={location}>
            <Route path={'/'} element={<About />} />
            <Route
              path={'/favourite'}
              element={
                <Suspense fallback={<Spin />}>
                  <Favourites />
                </Suspense>
              }
            />
            <Route
              path={'/portfolio'}
              element={
                <Suspense fallback={<Spin />}>
                  <Portfolio />
                </Suspense>
              }
            />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </section>
  );
};
