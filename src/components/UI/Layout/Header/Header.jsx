import React, { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { Breadcrumb } from 'antd';

import styles from './Header.module.css';
import { routesNames } from 'src/utils/routesNames';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getBreadcrumbItem = useCallback(() => {
    const routeObj = routesNames.find(route => route.route === location.pathname);
    return routeObj ? routeObj.name : 'Unknown';
  }, [location.pathname]);

  const breadcrumbItems = useMemo(() => {
    [
      {
        title: getBreadcrumbItem(),
      },
    ];
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.header_inner}>
        <div className={styles.header_breadcrumbs}>
          <Breadcrumb items={breadcrumbItems} className={styles.breadcrumb} />
        </div>
        <div className={styles.header_items}>
          <MdOutlineAdminPanelSettings size={32} color={'#2c2c2c'} />
          <AiOutlineUser size={32} color={'#2c2c2c'} onClick={() => navigate('/auth')} />
        </div>
      </div>
    </header>
  );
};
