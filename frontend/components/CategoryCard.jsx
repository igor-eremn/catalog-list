import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './styles/CategoryCard.css';

const CategoryCard = ({ id, name, images }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1, // Show 1 image at a time
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
    <div className="category-card">
      <Carousel
        responsive={responsive}
        infinite={true}
        showDots={true}
        autoPlay={false}
        arrows={true}
      >
        {images.map((image, index) => (
          <div key={index} className="image-container">
            <img src={image} alt={`${name} preview ${index + 1}`} />
          </div>
        ))}
      </Carousel>
      <div className="category-name">
        <h3>{name}</h3>
      </div>
    </div>
  );
};

export default CategoryCard;
