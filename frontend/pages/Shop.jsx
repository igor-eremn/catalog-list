import { useTheme } from '../src/ThemeProvider';
import React, { useEffect, useState } from 'react';
import './styles/Shop.css';
import ItemCard from '../components/ItemCard';
import SortingDash from '../components/SortingDash';

const Shop = ({ cart, addToCart, removeFromCart }) => {
  const [selectedSort, setSelectedSort] = useState(0);
  const { darkMode } = useTheme();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // New state to hold grouped cart items
  const [cartItemsGrouped, setCartItemsGrouped] = useState({});

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
    const fetchItems = async () => {
      try {
        let response;
        switch(selectedSort) {
          case 0:
            response = await fetch(`http://localhost:3000/catalog/items`);
            break;
          case 1:
            response = await fetch(`http://localhost:3000/catalog/items/high-to-low-price`);
            break;
          case 2:
            response = await fetch(`http://localhost:3000/catalog/items/low-to-high-price`);
            break;
          case 3:
            response = await fetch(`http://localhost:3000/catalog/items/high-to-low-popularity`);
            break;
          case 4:
            response = await fetch(`http://localhost:3000/catalog/items/low-to-high-popularity`);
            break;
          default:
            response = await fetch(`http://localhost:3000/catalog/items`);
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
        const [itemsData] = await Promise.all([fetchItems()]);
        setItems(itemsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedSort]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={`shop-page ${darkMode ? 'dark' : 'light'}`}>
      <h1>All Products</h1>
      <p>All products that we have on this website</p>
      <SortingDash selected={selectedSort} setSelected={setSelectedSort} />
      <div className={`shop-items`}>
        {items.map(item => (
          <ItemCard
            key={item._id}
            id={item._id}
            imageSrc={item.images}
            name={item.name}
            popularity={item.popularity}
            description={item.description}
            price={item.price}
            place={"shop-page"}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            quantity={cartItemsGrouped[item._id]?.quantity || 0}
          />
        ))}
      </div>
    </div>
  );
};

export default Shop;