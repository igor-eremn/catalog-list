import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const PopularityStars = ({ popularity }) => {
  const maxStars = 5;
  const filledStars = Math.min(popularity, maxStars);
  const emptyStars = maxStars - filledStars;

  return (
    <>
      {[...Array(filledStars)].map((_, index) => (
        <FaStar key={index} />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={index + filledStars} />
      ))}
    </>
  );
};

export default PopularityStars;
