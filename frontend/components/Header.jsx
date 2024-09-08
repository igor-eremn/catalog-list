import React from 'react';
import { IoCart, IoSunny, IoMoon } from "react-icons/io5";
import { useTheme } from '../src/ThemeProvider';
import './styles/Header.css';

const Header = () => {
  const { darkMode, toggleDarkMode } = useTheme(); // Use theme context

  return (
    <div className='header'>
      <div className='logo'>Techno Goods</div>
      <div className='search-bar'>
        <input type='text' placeholder='Search' />
      </div>
      <div className='right-side'>
        <div className='option'>Catalog</div>
        <div className='option'>Shop</div>
        <button className='first-btn'>
            <IoCart />
            <span>1</span>
        </button>
        <button onClick={toggleDarkMode}>
          {darkMode ? <IoSunny /> : <IoMoon />}
        </button>
      </div>
    </div>
  );
};

export default Header;
