import { useParams, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useTheme } from '../src/ThemeProvider';
import React, { useEffect, useState } from 'react';
import './styles/CategoryShop.css';
import ItemCard from '../components/ItemCard';
import SortingDash from '../components/SortingDash';

const CategoryShop = ({ cart, addToCart, removeFromCart }) => {
  const [idState, setIdState] = useState(null);
  const { categoryName } = useParams();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  let id = queryParams.id;

  const [selectedSort, setSelectedSort] = useState(0);
  const { darkMode } = useTheme();

  const [category, setCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // New state to hold grouped cart items
  const [cartItemsGrouped, setCartItemsGrouped] = useState({});

  useEffect(() => {
    if (id) {
      setIdState(true);
    } else {
      setIdState(false);
    }
  }, [id]);

  useEffect(() => {
    // Group cart items by id
    const groupedItems = cart.reduce((acc, item) => {
      if (!acc[item._id]) {
        acc[item._id] = { ...item, quantity: 0 };
      }
      acc[item._id].quantity += 1;
      return acc;
    }, {});
    setCartItemsGrouped(groupedItems);
  }, [cart]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        let response;
        if (idState) {
          response = await fetch(`http://localhost:3000/catalog/category/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch category by ID');
          }
        } else {
          response = await fetch(`http://localhost:3000/catalog/category/name/${categoryName}`);
          if (!response.ok) {
            throw new Error('Failed to fetch category by name');
          }
        }
        const data = await response.json();
        console.log('Fetched Category Data:', data);
        return data;
      } catch (err) {
        throw new Error(err.message);
      }
    };
  
    const fetchItems = async (categoryId) => {
      try {
        let response;
        switch (selectedSort) {
          case 0:
            response = await fetch(`http://localhost:3000/catalog/items/${categoryId}`);
            break;
          case 1:
            response = await fetch(`http://localhost:3000/catalog/items/${categoryId}/high-to-low-price`);
            break;
          case 2:
            response = await fetch(`http://localhost:3000/catalog/items/${categoryId}/low-to-high-price`);
            break;
          case 3:
            response = await fetch(`http://localhost:3000/catalog/items/${categoryId}/high-to-low-popularity`);
            break;
          case 4:
            response = await fetch(`http://localhost:3000/catalog/items/${categoryId}/low-to-high-popularity`);
            break;
          default:
            response = await fetch(`http://localhost:3000/catalog/items/${categoryId}`);
            break;
        }
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        console.log('Fetched Items Data:', data);
        return data;
      } catch (err) {
        throw new Error(err.message);
      }
    };
  
    const fetchData = async () => {
      try {
        setLoading(true);
        const categoryData = await fetchCategory();
        setCategory(categoryData);
        const categoryId = categoryData._id;
        const itemsData = await fetchItems(categoryId);
        setItems(itemsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
  
    fetchData();
  
  }, [id, selectedSort, idState, categoryName]);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={`category-shop-page ${darkMode ? 'dark' : 'light'}`}>
      <h1>{categoryName}</h1>
      <p>Category Description: {category.description || 'No description available'}</p>
      <SortingDash selected={selectedSort} setSelected={setSelectedSort} />
      <div className={`category-shop-items`}>
        {items.map(item => (
          <ItemCard 
            key={item._id} 
            id={item._id}
            imageSrc={item.images} 
            name={item.name} 
            popularity={item.popularity}
            description={item.description} 
            price={item.price} 
            place={"category-shop-page"}
            cat_id={item.category_id}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            quantity={cartItemsGrouped[item._id]?.quantity || 0}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryShop;