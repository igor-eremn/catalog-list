import { useParams, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useTheme } from '../src/ThemeProvider';
import React, { useEffect, useState } from 'react';
import './styles/CategoryShop.css';
import ItemCard from '../components/ItemCard';
import SortingDash from '../components/SortingDash';

const CategoryShop = () => {
  const { categoryName } = useParams();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const id = queryParams.id;

  const [selectedSort, setSelectedSort] = useState(0);

  const { darkMode } = useTheme();

  console.log(`Category Name: ${categoryName}`);
  console.log(`Category ID: ${id}`);

  const [category, setCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`http://localhost:3000/catalog/category/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch category');
        }
        const data = await response.json();
        console.log('Fetched Category Data:', data);
        return data;
      } catch (err) {
        throw new Error(err.message);
      }
    };
  
    const fetchItems = async () => {
      try {
        let response;
        switch(selectedSort) {
          case 0: 
            response = await fetch(`http://localhost:3000/catalog/items/${id}`);
            break;
          case 1:
            response = await fetch(`http://localhost:3000/catalog/items/${id}/high-to-low-price`);
            break;
          case 2: 
            response = await fetch(`http://localhost:3000/catalog/items/${id}/low-to-high-price`);
            break;
          case 3: 
            response = await fetch(`http://localhost:3000/catalog/items/${id}/high-to-low-popularity`);
            break;
          case 4:
            response = await fetch(`http://localhost:3000/catalog/items/${id}/low-to-high-popularity`);
            break;
          default:
            response = await fetch(`http://localhost:3000/catalog/items/${id}`);
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
        const [categoryData, itemsData] = await Promise.all([fetchCategory(), fetchItems()]);
        setCategory(categoryData);
        setItems(itemsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
  
    fetchData();
  
  }, [id, selectedSort]);
  
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
            imageSrc={item.images} 
            name={item.name} 
            popularity={item.popularity}
            description={item.description} 
            price={item.price} 
            />
        ))}
      </div>
    </div>
  );
};

export default CategoryShop;
