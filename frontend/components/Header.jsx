import React from 'react';
import { IoCart, IoSunny, IoMoon } from "react-icons/io5";
import { useTheme } from '../src/ThemeProvider';
import { Link } from 'react-router-dom';
import './styles/Header.css';

const Header = () => {
  const { darkMode, toggleDarkMode } = useTheme(); // Use theme context

  return (
    <div className='header'>
      <Link to="/" className='logo'>Techno Goods</Link>
      <div className='search-bar'>
        <input type='text' placeholder='Search' />
      </div>
      <div className='right-side'>
        <Link to="/catalog" className='option'>Catalog</Link>
        <Link to="/shop" className='option'>Shop</Link>
        <button className='first-btn'>
            <IoCart />
            <span>0</span>
        </button>
        <button onClick={toggleDarkMode}>
          {darkMode ? <IoSunny /> : <IoMoon />}
        </button>
      </div>
    </div>
  );
};

export default Header;
