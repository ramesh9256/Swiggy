import React from 'react'
import { useState, useEffect } from 'react';
import FilterSearch from './components/FilterSearch';
import Navbar from './components/NavBar';
import Body from './components/Body';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './components/About';
import Contact from './components/Contact';
import RestaurantMenu from './components/RestaurantMenu';


const App = () => {
  const [bannerTitle, setBannerTitle] = useState([]);
  const [bannerData, setBanner] = useState([]);
  const [NewResList, setResList] = useState([]);
  const [NewResListTitle, setResListTitle] = useState([]);
  const [NewRestaurant, setRestaurant] = useState([]);
  const [NewRestaurantTitle, setRestaurantTitle] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);

  let fetchData = async () => {
    let Data = await fetch("https://proxy.cors.sh/https://www.swiggy.com/dapi/restaurants/list/v5?lat=27.6093912&lng=75.1397935&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
    let json = await Data.json();
    console.log(json);
    setResList(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
    setResListTitle(json.data.cards[1].card.card.header.title);
    setRestaurant(json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants);
    console.log(json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants);
    setRestaurantTitle(json.data.cards[2].card.card.title);
    setBanner(json.data.cards[0].card.card.gridElements.infoWithStyle.info);
    setBannerTitle(json.data.cards[0].card.card.header.title);
  }
  const clicked = () => {
    const topRatedRes = NewResList.filter((res) => res.info.avgRating >= 4.5).sort((a, b) => b.info.avgRating - a.info.avgRating);
    setResList(topRatedRes);
  }

  const change = (e) => {

    if (e.target.value == "") {
      setResList(NewResList);
      return;
    }
    const search = e.target.value;
    const searchRes = NewResList.filter((res) => res.info.name.toLowerCase().includes(search.toLowerCase()));
    setResList(searchRes);
  }
  const selectBox = (e) => {
    let valueSelect = e.target.value;
    console.log(valueSelect);
    const sortedData = [...NewResList];
    if (valueSelect === "ByName") {
      sortedData.sort((a, b) => a.info.name.localeCompare(b.info.name));
    } else if (valueSelect === "AverageRating") {
      sortedData.sort((a, b) => b.info.avgRating - a.info.avgRating);
    } else if (valueSelect === "time") {
      sortedData.sort((a, b) => {
        let A = a.info.sla.slaString.slice(0, 2);
        let B = b.info.sla.slaString.slice(0, 2);
        return A - B;

      });
    }
    setResList(sortedData);
  }

  return (
    <div className='box'>
      <BrowserRouter>
        <Navbar />
        <FilterSearch clicked={clicked} selectBox={selectBox} change={change} />
        <Routes>
          <Route path="/" element={<Body bannerTitle={bannerTitle} NewResListTitle={NewResListTitle} NewResList={NewResList} NewRestaurant={NewRestaurant} NewRestaurantTitle={NewRestaurantTitle} bannerData={bannerData} />}></Route>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/restaurant/:resId" element={<RestaurantMenu />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>


  )
}

export default App
