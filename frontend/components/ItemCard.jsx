import React from 'react';
import './styles/ItemCard.css';
import { useTheme } from '../src/ThemeProvider';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useRef } from 'react';
import PopularityStars from './PopularityStars';


const ItemCard = ({ imageSrc, name, popularity, description, price }) => {
  const { darkMode } = useTheme();

  const carouselRef = useRef(null); // Create a reference to access the carousel

  const handleImageClick = () => {
    if (carouselRef.current) {
      const nextSlide = (carouselRef.current.state.currentSlide + 1) % imageSrc.length;
      carouselRef.current.goToSlide(nextSlide); // Move to the next slide on image click
    }
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
    <div className={`item-card ${darkMode ? 'dark' : 'light'}`}>
      <div className="image-section">
        <Carousel
          ref={carouselRef} // Attach the carousel reference
          responsive={responsive}
          infinite={true}
          showDots={true}
          autoPlay={false}
          arrows={false} // Disable the arrows
        >
          {imageSrc.map((image, index) => (
            <div key={index} className="image-container" onClick={handleImageClick}>
              <img src={image} alt={`${name} image ${index + 1}`} className="item-image" />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="details-section">
        <h3 className="item-name">{name}</h3>
        <p className="item-popularity"><PopularityStars popularity={popularity} /></p>
        <p className="item-description">{description}</p>
        <p className="item-price">{price} CAD</p>
        <button className="quick-add-btn">Quick Add</button>
        <button className="view-btn">View</button>
      </div>
    </div>
  );
};

export default ItemCard;

