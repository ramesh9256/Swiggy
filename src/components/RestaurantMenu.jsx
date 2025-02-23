import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CDN_Link, restaurantMenuLink } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cartSlice";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [restaurantData, setRestaurantData] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [expandedSections, setExpandedSections] = useState({});

  const dispatch = useDispatch();
  const HandleAddButton = (item) => dispatch(addItem(item));

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch(restaurantMenuLink + resId);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setRestaurantData(data);
      
      const cards = data?.data?.cards || [];
      const allMenuItems = [];
      cards.forEach((card) => {
        card?.groupedCard?.cardGroupMap &&
          Object.values(card.groupedCard.cardGroupMap).forEach((group) => {
            group?.cards?.forEach((itemCard) => {
              if (itemCard?.card?.card?.itemCards) {
                allMenuItems.push({
                  ...itemCard.card.card.info,
                  section: group.title,
                });
              } else if (itemCard?.card?.card?.categories) {
                itemCard.card.card.categories.forEach((category) => {
                  category?.itemCards?.forEach((item) => {
                    allMenuItems.push({
                      ...item.card.info,
                      section: category.title,
                    });
                  });
                });
              }
            });
          });
      });
      setMenuItems(allMenuItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections({ ...expandedSections, [section]: !expandedSections[section] });
  };

  if (!restaurantData)
    return <h1 className="text-3xl text-center mt-10">Loading...</h1>;

  const restaurantInfo = restaurantData?.data?.cards?.[2]?.card?.card?.info;
  if (!restaurantInfo) {
    return <h1 className="text-3xl text-center mt-10">Restaurant data not available</h1>;
  }

  const { name, costForTwoMessage, cuisines, sla } = restaurantInfo;
  const sections = {};
  menuItems.forEach((item) => {
    if (!sections[item.section]) sections[item.section] = [];
    sections[item.section].push(item);
  });

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-8 bg-white rounded-2xl shadow-lg mt-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">{name}</h1>
          <p className="text-lg text-gray-700">{costForTwoMessage}</p>
        </div>
        <div className="text-right md:text-left mt-4 md:mt-0">
          <p className="text-base text-gray-600">Delivery Time: {sla?.slaString}</p>
          <p className="text-base text-gray-600">Cuisines: {cuisines?.join(", ")}</p>
        </div>
      </div>
      {Object.keys(sections).map((section) => (
        <div key={section} className="mb-6">
          <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md cursor-pointer hover:bg-gray-200" onClick={() => toggleSection(section)}>
            <h2 className="text-xl font-semibold text-gray-900">{section}</h2>
            <span className={`transform transition-transform ${expandedSections[section] ? 'rotate-180' : ''}`}>▼</span>
          </div>
          {expandedSections[section] && (
            <div className="space-y-4 mt-3">
              {sections[section].map((item) => (
                <div key={item.id} className="flex flex-row-reverse items-center border p-4 rounded-xl shadow-md bg-white hover:shadow-lg transition-all">
                  <div className="flex flex-col items-center">
                    <img src={CDN_Link + item.imageId} alt={item.name} className="w-32 h-32 rounded-lg object-cover" />
                    <button className="mt-2 text-green-500 bg-white px-5 py-2 rounded-md shadow-md hover:bg-gray-300 transition-all relative bottom-8" onClick={() => HandleAddButton(item)}>ADD</button>
                  </div>
                  <div className="flex flex-col flex-1 mr-6">
                    <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    <p className="text-gray-700 font-bold mt-2">
                      <span className="line-through text-red-500">₹{((item.defaultPrice || item.price || 0) / 100 + 40).toFixed(2)}</span> 
                      <span className="text-green-700 ml-2">₹{((item.price || item.defaultPrice || 0) / 100).toFixed(2)}</span>
                    </p>
                    <p className="text-yellow-600 font-semibold text-sm mt-1">
                      ⭐ {item.ratings?.aggregatedRating?.rating || "3.5"} ({item.ratings?.aggregatedRating?.ratingCountV2 || "50+"})
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RestaurantMenu;