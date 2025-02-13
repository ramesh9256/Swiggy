import React from 'react';
import { CDN_Link } from '../utils/constant';

const Banner = (props) => {
  return (
    <div className=" overflow-hidden rounded-lg shadow-md">
      <img
        src={CDN_Link + props.resData.imageId}
        alt="Banner Image"
        className="object-cover w-30 h-30 transition duration-500 ease-in-out transform hover:scale-105" // Slightly reduced scale
      />
    </div>  
  );
};

export default Banner;