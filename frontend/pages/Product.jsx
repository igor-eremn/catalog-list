import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useTheme } from '../src/ThemeProvider';
import './styles/Product.css';
import { useLocation } from 'react-router-dom';

const Product = ({ addToCart }) => {
  const { darkMode } = useTheme();
  const [itemInfo, setItemInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id: routeId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryId = searchParams.get('id');

  const id = queryId || routeId; 
  console.log("Route ID:", routeId);
  console.log("Query ID:", queryId);
  console.log("Final ID:", id);

  useEffect(() => {
    if (!id) {
      setError('Product ID not provided');
      setLoading(false);
      return;
    }
    const fetchItemInfo = async () => {
      try {
        const response = await fetch(`http://localhost:3000/catalog/items/info/${id}`);
        if (!response.ok) {
          const errorDetails = await response.text();
          throw new Error(`Failed to fetch item: ${errorDetails}`);
        }
        const data = await response.json();
        setItemInfo(data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
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

  const handleAddToCart = () => {
    addToCart(itemInfo);
  };


  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div className={`product-page ${darkMode ? 'dark' : 'light'}`}>
      <div className='product-left-side'>
        <div className="product-images">
          <Carousel responsive={responsive} showDots={false} infinite={true}>
            {itemInfo.images.map((image, index) => (
              <div className="image-container" key={index}>
                <img src={image} alt={`${itemInfo.name} image ${index + 1}`} />
              </div>
            ))}
          </Carousel>
        </div>
        <div className='description'>
          <h3>Overview</h3>
          <p>{itemInfo.description}</p>
        </div>
      </div>
      <div className="product-right-side">
        <h1>{itemInfo.name}</h1>
        <p>ID: {itemInfo._id}</p>
        <div className='price_btn'>
          <p>${itemInfo.price}</p>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
        <div className='specs'>
          <h3>Item Specifications</h3>
          <ul>
            {Object.entries(itemInfo.specs).map(([key, value], index) => (
              <li key={index}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Product;
