import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from 'react-multi-carousel'; // for the image carousel
import 'react-multi-carousel/lib/styles.css';
import { useTheme } from '../src/ThemeProvider';
import './styles/Product.css';

const Product = () => {
  const { id } = useParams();

  const { darkMode } = useTheme();

  const [itemInfo, setItemInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchItemInfo = async () => {
      try {
        const response = await fetch(`http://localhost:3000/catalog/items/info/${id}`);
        if (!response.ok) {
          const errorDetails = await response.text();  // Get response body
          throw new Error(`Failed to fetch item: ${errorDetails}`);
        }
        const data = await response.json();
        setItemInfo(data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);  // Log the error for debugging
        setError(err.message);
        setLoading(false);
      }
    };
  
    fetchItemInfo();
  }, [id]);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  

  return (
    <div className={`product-page ${darkMode ? 'dark' : 'light'}`}>
      
      <div>
        <h3>Item Specifications</h3>
        <ul>
          {Object.entries(itemInfo.specs).map(([key, value], index) => (
            <li key={index}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
        <button>Buy Now</button>
      </div>
    </div>
  );
};

export default Product;

