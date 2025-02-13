import React from 'react';
import Banner from './Banner';
import Card from './Card';
import { Link } from 'react-router-dom';



const Body = ({ bannerTitle, NewResListTitle, NewRestaurantTitle, bannerData, NewResList, NewRestaurant }) => {
  return (
    <div className="main-container bg-gray-100 py-8 px-4 md:px-6 lg:px-8"> {/* Main container with padding and background */}
      <h1 className="text-3xl font-bold text-center mb-6 text-teal-600">{bannerTitle}</h1> {/* Banner title */}
      <div className="banner-container flex flex-wrap justify-center gap-4 mb-8"> {/* Banner container */}
        {bannerData.map((res) => (
          <Banner resData={res} key={res.id} /> // Added key prop
        ))}
      </div>

      <h1 className="text-2xl font-semibold text-left mb-4 text-gray-800">{NewResListTitle}</h1> {/* Restaurant list title */}
      <div className="card-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8"> {/* Card container with grid layout */}
        {NewResList.map((res) => (
          <Link key={res.info.id} to={"/restaurant/" + res.info.id}><Card resData={res} /></Link> // Added key prop
        ))}
      </div>

      <h1 className="text-2xl font-semibold text-left mb-4 text-gray-800">{NewRestaurantTitle}</h1> {/* New restaurant title */}
      <div className="card-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> {/* Card container with grid layout */}
        {NewRestaurant.map((res) => (
          <Link key={res.info.id} to={"/restaurant/" + res.info.id}><Card resData={res} /></Link>
        ))}
      </div>
    </div>
  );
};

export default Body;