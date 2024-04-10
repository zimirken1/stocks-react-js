import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spin } from 'antd';

import { Favourites } from 'src/pages/Stocks/Favourites';
import { Portfolio } from 'src/pages/Portfolio/Portfolio';
import { Auth } from 'src/pages/Auth/Auth';
import { Profile } from 'src/pages/Profile/Profile';
import { About } from 'src/pages/About/About';

export const PrivateRoutes = ({ location }) => {
  return (
    <Routes location={location}>
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
      <Route
        path={'/auth'}
        element={
          <Suspense fallback={<Spin />}>
            <Auth />
          </Suspense>
        }
      />
      <Route
        path={'/profile'}
        element={
          <Suspense fallback={<Spin />}>
            <Profile />
          </Suspense>
        }
      />
      <Route
        path={'/'}
        element={
          <Suspense fallback={<Spin />}>
            <About />
          </Suspense>
        }
      />
    </Routes>
  );
};
