import React from 'react';
import './styles/ItemCard.css';

const ItemCard = ({ imageSrc, name, description, price }) => {
  return (
    <div className="item-card">
      <div className="image-section">
        <img src={imageSrc} alt={name} className="item-image" />
      </div>
      <div className="details-section">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      <div className="price-section">
        <p className="price">Price: {price} CAD</p>
        <button className="quick-add-btn">Quick Add</button>
        <button className="view-btn">View</button>
      </div>
    </div>
  );
};

export default ItemCard;
