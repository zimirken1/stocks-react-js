import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spin } from 'antd';

import { Auth } from 'src/pages/Auth/Auth';
import { About } from 'src/pages/About/About';

export const PublicRoutes = ({ location }) => {
  return (
    <Routes location={location}>
      <Route path={'/'} element={<About />} />
      <Route
        path={'/auth'}
        element={
          <Suspense fallback={<Spin />}>
            <Auth />
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
