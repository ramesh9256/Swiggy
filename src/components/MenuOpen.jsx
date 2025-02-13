import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { MenuOpenLink } from "../utils/constant";

const MenuOpen = () => {
  const { resId } = useParams();
  const [restaurantData, setRestaurantData] = useState(null);
  const [itemCard, setItemCard] = useState(null);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch(
        MenuOpenLink + resId
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setRestaurantData(data);
      if (
        data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]
          ?.card?.card?.itemCards
      ) {
        setItemCard(
          data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]
            ?.card?.card?.itemCards
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (!restaurantData) return <h1>Loading...</h1>;

  const { name, costForTwoMessage, cuisines, sla } =
    restaurantData?.data?.cards[2]?.card?.card?.info;

  return (
    <div>
      <h1>{name}</h1>
      <p>{costForTwoMessage}</p>
      <p>{sla?.slaString}</p>
      <p>{cuisines?.join(", ")}</p>

      <h1>Recommended</h1>
      {itemCard?.map((item) => (
        <div key={item.card.info.id}>
          <h2>{item.card.info.name}</h2>
          <p>{item.card.info.description}</p>
          <p>Rs - {item.card.info.price / 100}</p>
        </div>
      ))}
    </div>
  );
};

export default MenuOpen;