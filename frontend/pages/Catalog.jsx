import React, { useEffect, useState } from 'react';
import CategoryCard from '../components/CategoryCard';
import { useTheme } from '../src/ThemeProvider';
import './styles/Catalog.css';

const Catalog = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://localhost:3000/catalog/category`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCategories();  // Fetch categories on component mount
  }, []);

  const logCategoryIds = (categories) => {
    categories.forEach(category => {
      console.log('Category ID:', category._id.toString());
    });
  };

  // Log category IDs when categories change
  useEffect(() => {
    if (categories.length > 0) {
      logCategoryIds(categories);
    }
  }, [categories]);

  if (loading) {
    return <div>Loading...</div>;  // Show loading state
  }

  if (error) {
    return <div>Error: {error}</div>;  // Show error message
  }

  return (
    <div className={`catalog-page ${darkMode ? 'dark' : 'light'}`}>
      <h1>Catalog</h1>
      <p>Here is the catalog of categories that we have for easier navigation in our shop</p>
      <div className="category-grid">
        {categories.map((category) => (
          <CategoryCard 
            key={category._id.toString()} 
            _id={category._id} 
            name={category.name} 
            description={category.description}
            images={category.images} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
