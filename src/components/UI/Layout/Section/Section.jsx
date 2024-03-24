import React from 'react';
import styles from './Section.module.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Route, Routes, useLocation } from 'react-router-dom';
import About from '../../../../pages/About/About.jsx';
import Stocks from '../../../../pages/Stocks/Stocks.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Portfolio from '../../../../pages/Portfolio/Portfolio.jsx';

const Section = () => {
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
            <Route path={'/favourite'} element={<Stocks />} />
            <Route path={'/portfolio'} element={<Portfolio />} >
              <Route path=':symbol' />
            </Route>
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </section>
  );
};

export default Section;
