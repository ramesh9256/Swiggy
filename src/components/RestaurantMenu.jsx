import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CDN_Link, restaurantMenuLink } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cartSlice";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [restaurantData, setRestaurantData] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});


  const dispatch = useDispatch();
  const HandleAddButton = (item) => {
    dispatch(addItem(item));
  }

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
      setRestaurantData(data);

      const cards = data?.data?.cards || [];
      const allMenuItems = [];

      cards.forEach(card => {
        card?.groupedCard?.cardGroupMap && Object.values(card.groupedCard.cardGroupMap).forEach(group => {
          group?.cards?.forEach(itemCard => {
            if (itemCard?.card?.card?.itemCards) {
              allMenuItems.push({
                ...itemCard.card.card.info,  // Access info directly
                section: group.title
              });
            } else if (itemCard?.card?.card?.categories) {
              itemCard.card.card.categories.forEach(category => {
                category?.itemCards && category.itemCards.forEach(item => {
                  allMenuItems.push({
                    ...item.card.info,
                    section: category.title
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
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  if (!restaurantData) return <h1 className="text-3xl text-center mt-10">Loading...</h1>;

  const cards = restaurantData?.data?.cards || [];
  const restaurantInfo = cards.length > 2 ? cards[2]?.card?.card?.info : null;

  if (!restaurantInfo) {
    return <h1 className="text-3xl text-center mt-10">Restaurant data not available</h1>;
  }

  const { name, costForTwoMessage, cuisines, sla } = restaurantInfo;

  const sections = {};
  menuItems.forEach(item => {
    if (!sections[item.section]) {
      sections[item.section] = [];
    }
    sections[item.section].push(item);
  });

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 bg-white rounded-lg shadow-lg mt-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">{name}</h1>
          <p className="text-base md:text-lg text-gray-700">{costForTwoMessage}</p>
        </div>
        <div className="text-right md:text-left mt-4 md:mt-0">
          <p className="text-sm md:text-base text-gray-600">Delivery Time: {sla?.slaString}</p>
          <p className="text-sm md:text-base text-gray-600">Cuisines: {cuisines?.join(", ")}</p>
        </div>
      </div>


      {Object.keys(sections).map(section => (
        <div key={section} className="mb-6">
          <div
            className="flex items-center justify-between bg-gray-100 p-3 rounded-t-lg cursor-pointer"
            onClick={() => toggleSection(section)}
          >
            <h2 className="text-xl font-semibold text-gray-900">{section}</h2>
            <svg
              className={`w-6 h-6 text-gray-600 transition-transform ${expandedSections[section] ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
          {expandedSections[section] && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-b-lg">
              {sections[section].map(item => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all cursor-pointer transform hover:scale-101"
                  
                >
                  <img
                    src={CDN_Link + item.imageId}
                    alt={item.name}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-5">
                    <h2 className="text-xl font-semibold text-gray-900 truncate">{item.name}</h2>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">{item.description}</p>
                    <p className="text-green-700 font-bold mt-2">
                      Rs {((item.price || item.defaultPrice || 0) / 100).toFixed(2)}
                    </p>

                    <button className="mt-4 w-full px-5 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-400 transition-all shadow-md"  onClick={() => {HandleAddButton(item)}}>
                      Add to Cart
                    </button>
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