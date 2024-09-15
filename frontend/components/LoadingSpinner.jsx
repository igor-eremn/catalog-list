import React, { useState, useEffect } from 'react';
import './styles/LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;