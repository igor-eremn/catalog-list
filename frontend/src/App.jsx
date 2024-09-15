import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeProvider';
import Header from '../components/Header';
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import CategoryShop from '../pages/CategoryShop';
import Shop from '../pages/Shop';
import Product from '../pages/Product';
import './App.css';
import Layout from './Layout';
import Cart from '../pages/Cart';
import Search from '../pages/Search';

{/* TODO: Add Order Page */}

const App = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (id) => {
    const updatedCart = [...cart];
    const index = updatedCart.findIndex(item => item._id === id);
    if (index !== -1) {
      updatedCart.splice(index, 1);
    }
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };
  

  return (
    <ThemeProvider>
      <Router>
        <Header cart={cart}/>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path=""                                element={<Home />} />
            <Route path="home"                            element={<Home />} />
            <Route path="home/catalog"                    element={<Catalog />} />
            <Route path="home/shop"                       element={<Shop cart={cart} addToCart={addToCart} removeFromCart={removeFromCart}/>} />
            <Route path="home/catalog/:categoryName"      element={<CategoryShop  cart={cart} addToCart={addToCart} removeFromCart={removeFromCart}/>} />
            <Route path="home/catalog/:categoryName/:id"  element={<Product       addToCart={clearCart} />} />
            <Route path="home/shop/:id"                   element={<Product       addToCart={addToCart} />} />
            <Route path="home/cart"                       element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
            <Route path="home/search"                     element={<Search        addToCart={addToCart}/>} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;