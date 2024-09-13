import React, { useEffect, useState } from 'react';
import './styles/ItemCardCart.css';
import { useTheme } from '../src/ThemeProvider';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useRef } from 'react';
import PopularityStars from './PopularityStars';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBack2Fill } from "react-icons/ri";

const ItemCardCart = ({ item, quantity, cartFunc }) => {
  const { darkMode } = useTheme();
  const carouselRef = useRef(null); 
  const navigate = useNavigate();

  const [id, setId] = useState(null);
  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [popularity, setPopularity] = useState(null);
  const [price, setPrice] = useState(null);
  
  useEffect(() => {
    if (item) {
      setId(item._id);
      setImages(item.images || []); // Ensure images is an array
      setName(item.name);
      setPopularity(item.popularity);
      setPrice(item.price);
    }
  }, [item]);

  const handleItemClick = () => {
    navigate(`/home/shop/${encodeURIComponent(name)}?id=${id}`);
  };

  const handleImageClick = () => {
    if (carouselRef.current && images.length) {
      const nextSlide = (carouselRef.current.state.currentSlide + 1) % images.length;
      carouselRef.current.goToSlide(nextSlide);
    }
  };

  const handleRemoveFromCart = async (e) => {
    e.stopPropagation();
    console.log('Removing item:', id);
    cartFunc(id);
  };

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
    <div className={`item-card-cart ${darkMode ? 'dark' : 'light'}`}>
      <div className="image-section-cart">
        <Carousel
          ref={carouselRef}
          responsive={responsive}
          infinite={true}
          showDots={false}
          autoPlay={false}
          arrows={false}
        >
          {images.length > 0 ? (
            images.map((image, index) => (
              <div key={index} className="image-container-cart" onClick={handleImageClick}>
                <img src={image} alt={`${name} image ${index + 1}`} className="item-image" />
              </div>
            ))
          ) : (
            <div className="image-placeholder-cart">No images available</div>
          )}
        </Carousel>
      </div>
      <div className="details-section-cart" onClick={handleItemClick}>
        <h3 className="item-name">{name}</h3>
        <p className="item-price">{price} CAD</p>
        <p className="item-quantity">QT: {quantity}</p>
        <button onClick={handleRemoveFromCart} className="delete-btn">
            <RiDeleteBack2Fill />
        </button>
      </div>
    </div>
  );
};

export default ItemCardCart;
