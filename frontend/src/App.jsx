import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeProvider';
import Header from '../components/Header';
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import CategoryShop from '../pages/CategoryShop';
import Shop from '../pages/Shop';
import Product from '../pages/Product';
import './App.css';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/"                   element={<Home />} />
          <Route path="/catalog"            element={<Catalog />} />
          <Route path="/shop"               element={<Shop />} />
          <Route path="/shop/:categoryName" element={<CategoryShop />} />
          <Route path="/product/:id"        element={<Product />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;