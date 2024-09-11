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
import Layout from './Layout';


const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path=""                                element={<Home />} />
            <Route path="home"                            element={<Home />} />
            <Route path="home/catalog"                    element={<Catalog />} />
            <Route path="home/shop"                       element={<Shop />} />
            <Route path="home/catalog/:categoryName"      element={<CategoryShop />} />
            <Route path="home/catalog/:categoryName/:id"  element={<Product />} />
            <Route path="home/shop/:id"                   element={<Product />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;