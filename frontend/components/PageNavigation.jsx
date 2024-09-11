import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/PageNavigation.css';
import { useTheme } from '../src/ThemeProvider';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const PageNavigation = () => {
  const { darkMode } = useTheme();
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    const breadcrumbLinks = pathnames.map((name, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
      return { name: decodeURIComponent(name), routeTo }; // Decode URL-encoded parts
    });

    setBreadcrumbs(breadcrumbLinks);
  }, [location]);

  return (
    <div className={`navigation-dash ${darkMode ? 'dark' : 'light'}`}>
      <div className="breadcrumb">
        {breadcrumbs.length > 0 ? (
          breadcrumbs.map((breadcrumb, index) => (
            <span key={index}>
              {index < breadcrumbs.length - 1 ? (
                <Link to={breadcrumb.routeTo}>
                  {breadcrumb.name.replace(/-/g, ' ').toUpperCase()}
                </Link>
              ) : (
                <span>{breadcrumb.name.replace(/-/g, ' ').toUpperCase()}</span>
              )}
              {index < breadcrumbs.length - 1 && ' / '}
            </span>
          ))
        ) : (
          <span>HOME</span>
        )}
      </div>
    </div>
  );
};

export default PageNavigation;
