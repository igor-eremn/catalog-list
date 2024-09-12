import React, { useEffect, useState } from 'react';
import { useTheme } from '../src/ThemeProvider';
import './styles/Cart.css';
import ItemCard from '../components/ItemCard';

const Cart = ({ cart, removeFromCart }) => {
  const { darkMode } = useTheme();
  const [length, setLength] = useState(cart.length);

  useEffect(() => {
    setLength(cart.length);
  }, [cart.length]);

  return (
    <div className={`cart-page ${darkMode ? 'dark' : 'light'}`}>
      <h2>Your Cart</h2>
      <div className={`cart-items`}>
        {length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map(item => (
            <ItemCard 
              key={item._id}
              id={item._id}
              imageSrc={item.images} 
              name={item.name} 
              popularity={item.popularity}
              description={item.description} 
              price={item.price}
              place={"cart-page"} 
              cartFunc={() => removeFromCart(item._id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;
