import React, { useEffect, useState } from 'react';
import './styles/ItemCard.css';
import { useTheme } from '../src/ThemeProvider';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useRef } from 'react';
import PopularityStars from './PopularityStars';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaMinus } from 'react-icons/fa';

const ItemCard = ({ id, imageSrc, name, popularity, description, price, place, cat_id, addToCart, removeFromCart, quantity }) => {
  const { darkMode } = useTheme();
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemCount, setItemCount] = useState(quantity);

  useEffect(() => {
    setItemCount(quantity);
  }, [quantity]);

  const handleItemClick = () => {
    if (place === "category-shop-page") {
      navigate(`/home/catalog/${category.name}/${encodeURIComponent(name)}?id=${id}`);
    } else {
      console.log("Navigating to:", `/shop/${encodeURIComponent(name)}?id=${id}`);
      navigate(`/home/shop/${encodeURIComponent(name)}?id=${id}`);
    }
  };

  const handleImageClick = () => {
    if (carouselRef.current) {
      const nextSlide = (carouselRef.current.state.currentSlide + 1) % imageSrc.length;
      carouselRef.current.goToSlide(nextSlide);
    }
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    setItemCount(prevCount => {
      const newCount = Math.min(prevCount + 1, 5);
      addToCart({ _id: id, name, price, images: imageSrc }); // Add to cart
      return newCount;
    });
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    setItemCount(prevCount => {
      const newCount = Math.max(prevCount - 1, 0);
      if (newCount < prevCount) {
        removeFromCart(id); // Remove from cart
      }
      return newCount;
    });
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`http://localhost:3000/catalog/category/${cat_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch category');
        }
        const data = await response.json();
        console.log('Fetched Category Data:', data);
        return data;
      } catch (err) {
        throw new Error(err.message);
      }
    };

    const fetchData = async () => {
      try {
        setLoading(true);
        if (place === "category-shop-page") {
          const [categoryData] = await Promise.all([fetchCategory()]);
          setCategory(categoryData);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();

  }, [id, place, cat_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className={`item-card ${darkMode ? 'dark' : 'light'}`}>
      <div className="image-section">
        <Carousel
          ref={carouselRef}
          responsive={responsive}
          infinite={true}
          showDots={true}
          autoPlay={false}
          arrows={false}
        >
          {imageSrc.map((image, index) => (
            <div key={index} className="image-container" onClick={handleImageClick}>
              <img src={image} alt={`${name} image ${index + 1}`} className="item-image" />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="details-section" onClick={handleItemClick}>
        <h3 className="item-name">{name}</h3>
        <p className="item-popularity"><PopularityStars popularity={popularity} /></p>
        <p className="item-description">{description}</p>
        <p className="item-price">{price} CAD</p>
        <div className="item-counter">
          <button onClick={handleDecrement} disabled={itemCount === 0}>
            <FaMinus />
          </button>
          <span>{itemCount}</span>
          <button onClick={handleIncrement} disabled={itemCount === 5}>
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;