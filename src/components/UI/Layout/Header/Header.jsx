import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { MdOutlineAdminPanelSettings, MdOutlineExitToApp } from 'react-icons/md';
import { Breadcrumb } from 'antd';

import { routesNames } from 'src/utils/routesNames';
import { useMeContext } from 'src/context/meContext';
import styles from './Header.module.css';

export const Header = () => {
  const { me, isAdmin, logout } = useMeContext();
  const navigate = useNavigate();
  const location = useLocation();

  const getBreadcrumbItem = useMemo(() => {
    const routeObj = routesNames.find(route => route.route === location.pathname);
    return routeObj ? routeObj.name : 'Unknown';
  }, [location.pathname]);

  const breadcrumbItems = useMemo(() => {
    const result = [
      {
        title: `${getBreadcrumbItem}`,
      },
    ];
    return result;
  }, [getBreadcrumbItem]);

  console.log(breadcrumbItems);

  const handleProfileClick = () => {
    return me ? navigate('/profile') : navigate('/auth');
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/auth');
  };

  return (
    <header className={styles.header}>
      <div className={styles.header_inner}>
        <div className={styles.header_breadcrumbs}>
          <Breadcrumb items={breadcrumbItems} className={styles.breadcrumb} />
        </div>
        <div className={styles.header_items}>
          {isAdmin && <MdOutlineAdminPanelSettings size={32} color={'#2c2c2c'} />}
          <AiOutlineUser size={32} color={'#2c2c2c'} onClick={handleProfileClick} />
          {me && <MdOutlineExitToApp size={32} color={'#2c2c2c'} onClick={handleLogoutClick} />}
        </div>
      </div>
    </header>
  );
};
