import React, { useEffect, useState } from 'react';
import { useTheme } from '../src/ThemeProvider';
import './styles/Cart.css';
import ItemCard from '../components/ItemCard';

const Cart = ({ cart, removeFromCart }) => {
  const { darkMode } = useTheme();

  if (cart.length === 0) {
    return <div>Your cart is empty</div>;
  }

  return (
    <div className={`cart-page ${darkMode ? 'dark' : 'light'}`}>
      <h2>Your Cart</h2>
      <div className={`cart-items`}>
        {cart.map(item => (
            <ItemCard 
            key={item._id} 
            id={item._id}
            imageSrc={item.images} 
            name={item.name} 
            popularity={item.popularity}
            description={item.description} 
            price={item.price}
            place={"cart-page"} 
            />
        ))}
      </div>
      <ul>
        {cart.map(item => (
          <li key={item._id}>
            <p>{item.name}</p>
            <p>${item.price}</p>
            <button onClick={() => removeFromCart(item._id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
