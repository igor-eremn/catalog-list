import React, { useState } from 'react';
import './styles/SortingDash.css';
import { IoStar } from "react-icons/io5";
import { FaSortAmountDown, FaSortAmountDownAlt } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { useTheme } from '../src/ThemeProvider';

const SortingDash = ({ selected, setSelected }) => {
  const { darkMode } = useTheme();

  const handleButtonClick = (index) => {
    if (selected === index) {
      setSelected(0);
    } else {
      setSelected(index);
    }
  };

  return (
    <div className={`sorting-dash ${darkMode ? 'dark' : 'light'}`}>
      <h2>All Available Products</h2>
      <div className="sorting-buttons">
        <button
          className={`sort-btn ${selected === 1 ? 'selected' : ''}`}
          onClick={() => handleButtonClick(1)}
        >
          <MdOutlineAttachMoney /><FaSortAmountDown />
        </button>
        <button
          className={`sort-btn ${selected === 2 ? 'selected' : ''}`}
          onClick={() => handleButtonClick(2)}
        >
          <MdOutlineAttachMoney /><FaSortAmountDownAlt />
        </button>
        <button
          className={`sort-btn ${selected === 3 ? 'selected' : ''}`}
          onClick={() => handleButtonClick(3)}
        >
          <IoStar /><FaSortAmountDown />
        </button>
        <button
          className={`sort-btn ${selected === 4 ? 'selected' : ''}`}
          onClick={() => handleButtonClick(4)}
        >
          <IoStar /><FaSortAmountDownAlt />
        </button>
      </div>
    </div>
  );
};

export default SortingDash;
