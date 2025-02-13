import React from 'react';
import { CDN_Link } from '../utils/constant';

const Card = (props) => {
  const { info } = props.resData; // Destructuring for cleaner code

  return (
    <div className="bg-white rounded-lg shadow-md p-4 transition duration-300 hover:scale-105"> {/* Card container */}
      <img
        src={CDN_Link + info.cloudinaryImageId}
        alt={info.name} // Added alt text for accessibility
        className="w-full h-48 object-cover rounded-t-lg mb-2" // Responsive image
      />
      <h2 className="text-xl font-semibold text-gray-800 mb-1">{info.name}</h2>
      <div className="flex items-center mb-1"> {/* Flexbox for rating and time */}
        <span className="text-yellow-500 mr-1">
          <i className="fa-solid fa-star"></i> {/* Star icon */}
        </span>
        <p className="font-medium text-gray-700">{info.avgRating}. {info.sla.slaString}</p>
      </div>
      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{info.cuisines.join(", ")}</p> {/* Display cuisines */}
      <span className="text-gray-500 text-xs">{info.areaName}</span>
    </div>
  );
};

export default Card;