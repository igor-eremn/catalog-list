import React, { useEffect, useState } from 'react';
import { IoCart, IoSunny, IoMoon } from "react-icons/io5";
import { useTheme } from '../src/ThemeProvider';
import { Link } from 'react-router-dom';
import './styles/Header.css';
import { IoSearch } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

{/* TODO: Add support for clicking enter instead of search icon */}

const Header = ({ cart }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [inputError, setInputError] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    let search = searchQuery.trim();
    setSearchQuery('');
    if (!search) {
      setInputError(true);
    } else {
      setInputError(false);
      navigate(`/home/search?query=${searchQuery}`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className='header'>
      <Link to="/home" className='logo'>Techno Goods</Link>
      <div className='search-bar'>
        <input 
          type='text' 
          placeholder='Search' 
          className={`search-input ${inputError ? 'error' : ''}`}
          value={searchQuery}
          onKeyPress={handleKeyPress}
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        <IoSearch className='search-icon' onClick={handleSearch} />
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
