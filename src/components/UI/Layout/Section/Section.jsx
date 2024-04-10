import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useLocation } from 'react-router-dom';

import styles from './Section.module.css';
import { PrivateRoutes } from './Routes/PrivateRoutes';
import { PublicRoutes } from './Routes/PublicRoutes';
import { useMeContext } from 'src/context/meContext';

export const Section = () => {
  const location = useLocation();
  const { me } = useMeContext();

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
          <>{me ? <PrivateRoutes /> : <PublicRoutes />}</>
        </CSSTransition>
      </TransitionGroup>
    </section>
  );
};
