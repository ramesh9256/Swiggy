import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CDN_Link, restaurantMenuLink } from "../utils/constant";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [restaurantData, setRestaurantData] = useState(null);
  const [itemCard, setItemCard] = useState(null);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch(restaurantMenuLink + resId);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("API Response:", JSON.stringify(data, null, 2));

      setRestaurantData(data);

      const cards = data?.data?.cards || [];
      console.log("Cards Array:", cards);

      if (cards.length > 4 && cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards) {
        setItemCard(cards[4].groupedCard.cardGroupMap.REGULAR.cards[1].card.card.itemCards);
      } else {
        console.warn("Menu items not found in API response.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (!restaurantData) return <h1 className="text-3xl text-center mt-10">Loading...</h1>;

  const cards = restaurantData?.data?.cards || [];
  const restaurantInfo = cards.length > 2 ? cards[2]?.card?.card?.info : null;

  if (!restaurantInfo) {
    return <h1 className="text-3xl text-center mt-10">Restaurant data not available</h1>;
  }

  const { name, costForTwoMessage, cuisines, sla, cloudinaryImageId } = restaurantInfo;

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-100 rounded-lg shadow-lg mt-10">
      <div className="text-center mb-6">
        <h1 className="text-5xl font-bold text-gray-900">{name}</h1>
        <p className="text-lg text-gray-700">{costForTwoMessage}</p>
        <p className="text-gray-600">Delivery Time: {sla?.slaString}</p>
        <p className="text-gray-600">Cuisines: {cuisines?.join(", ")}</p>
      </div>
      
      <h1 className="text-3xl font-semibold text-gray-800">Recommended</h1>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {itemCard?.map((item) => (
          <div key={item.card.info.id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-all">
            <img src={CDN_Link + item.card.info.imageId} alt="" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-900">{item.card.info.name}</h2>
              <p className="text-gray-600 mt-2">{item.card.info.description}</p>
              <p className="text-green-700 font-bold mt-2">Rs - {item.card.info.price / 100}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
