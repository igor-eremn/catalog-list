import React, { useEffect, useState } from 'react';
import { useTheme } from '../src/ThemeProvider';
import './styles/Cart.css';
import ItemCardCart from '../components/ItemCardCart';

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
            <ItemCardCart 
              key={item._id}
              item={item}
              quantity={item.quantity}
              cartFunc={() => removeFromCart(item._id)}
            />
          ))
        )}
      </div>
      <div className="results-cart">
        <h2>Total Items: {Object.keys(itemsGrouped).length}</h2>
        <h2>Total: ${total.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default Cart;
