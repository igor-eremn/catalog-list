import { useTheme } from '../src/ThemeProvider';
import React, { useEffect, useState } from 'react';
import './styles/Search.css';
import ItemCard from '../components/ItemCard';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import LoadingSpinner from '../components/LoadingSpinner';

{/* TODO: Remove query after going to another page */}
{/* TODO: Add searching for categories */}

const Search = ({ addToCart }) => {
  const { darkMode } = useTheme();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const location = useLocation();

  useEffect(() => {
    const queryParams = queryString.parse(location.search);
    setSearchQuery(queryParams.query || '');

    const fetchItems = async () => {
      const startTime = Date.now();
      setLoading(true);
      setError(null);
      try {
        let response = await fetch(`http://localhost:3000/catalog/items/search/all?query=${searchQuery}`);
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        console.log('Fetched Items Data:', data);
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        const endTime = Date.now();
        const elapsedTime = endTime - startTime;
        const minimumLoadingTime = 1000; // 1 seconds
  
        if (elapsedTime < minimumLoadingTime) {
          const remainingTime = minimumLoadingTime - elapsedTime;
          setTimeout(() => {
            setLoading(false);
          }, remainingTime);
        } else {
          setLoading(false);
        }
      }
    };

    if (searchQuery) {
      fetchItems();
    } else {
      setItems([]);
      setLoading(false);
    }
  }, [location.search, searchQuery]);

  if (loading) {
    return <div><LoadingSpinner /></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={`shop-page ${darkMode ? 'dark' : 'light'}`}>
      <h1>Search</h1>
      <p>Here is what we found for your search: '{searchQuery}'</p>
      <div className="shop-items">
        {items.length === 0 ? (
          <p>No items found... Search again...</p>
        ) : (
          items.map(item => (
            <ItemCard
              key={item._id}
              id={item._id}
              imageSrc={item.images}
              name={item.name}
              popularity={item.popularity}
              description={item.description}
              price={item.price}
              place="shop-page"
              cartFunc={addToCart}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Search;
