import React from 'react';
import { Outlet } from 'react-router-dom';
import PageNavigation from '../components/PageNavigation';

const Layout = () => {
  return (
    <div>
      <PageNavigation />
      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
