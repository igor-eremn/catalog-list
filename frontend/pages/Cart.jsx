import React, { useEffect, useState } from 'react';
import { useTheme } from '../src/ThemeProvider';
import './styles/Cart.css';
import ItemCard from '../components/ItemCard';

const Cart = ({ cart, removeFromCart }) => {
  const { darkMode } = useTheme();
  const [length, setLength] = useState(cart.length);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setLength(cart.length);
  }, [cart.length]);

  useEffect(() => {
    // Calculate the total price of items in the cart
    const totalPrice = cart.reduce((accumulator, item) => accumulator + item.price, 0);
    setTotal(totalPrice);
  }, [cart]);

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
      <div className="total-price">
        <h2>Total: ${total.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default Cart;
