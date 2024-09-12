import React, { useEffect, useState } from 'react';
import { useTheme } from '../src/ThemeProvider';
import './styles/Cart.css';
import ItemCard from '../components/ItemCard';

const Cart = ({ cart, removeFromCart }) => {
  const { darkMode } = useTheme();
  const [itemsGrouped, setItemsGrouped] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Group items by id and calculate total price
    const groupedItems = cart.reduce((acc, item) => {
      if (!acc[item._id]) {
        acc[item._id] = { ...item, quantity: 0 };
      }
      acc[item._id].quantity += 1;
      return acc;
    }, {});

    setItemsGrouped(groupedItems);

    const totalPrice = Object.values(groupedItems).reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(totalPrice);
  }, [cart]);

  return (
    <div className={`cart-page ${darkMode ? 'dark' : 'light'}`}>
      <h2>Your Cart</h2>
      <div className={`cart-items`}>
        {Object.keys(itemsGrouped).length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          Object.values(itemsGrouped).map(item => (
            <ItemCard 
              key={item._id}  // Use item ID as the key
              id={item._id}
              imageSrc={item.images} 
              name={item.name} 
              popularity={item.popularity}
              description={item.description} 
              price={item.price}
              quantity={item.quantity} // Add quantity prop
              place={"cart-page"} 
              cartFunc={() => removeFromCart(item._id)}
            />
          ))
        )}
      </div>
      <div className="results-cart">
        <h2>Total: ${total.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default Cart;
