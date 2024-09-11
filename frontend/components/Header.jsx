import React from 'react';
import { IoCart, IoSunny, IoMoon } from "react-icons/io5";
import { useTheme } from '../src/ThemeProvider';
import { Link } from 'react-router-dom';
import './styles/Header.css';

const Header = ({ cart }) => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className='header'>
      <Link to="/home" className='logo'>Techno Goods</Link>
      <div className='search-bar'>
        <input type='text' placeholder='Search' />
      </div>
      <div className='right-side'>
        <Link to="home/catalog" className='option'>Catalog</Link>
        <Link to="home/shop" className='option'>Shop</Link>
        <Link to="home/cart" className='option'>
          <button className='first-btn'>
            <IoCart />
            <span>{cart.length}</span>
          </button>
        </Link>
        <button onClick={toggleDarkMode}>
          {darkMode ? <IoSunny /> : <IoMoon />}
        </button>
      </div>
    </div>
  );
};

export default Header;
