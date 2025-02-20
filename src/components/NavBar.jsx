import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cartData = useSelector((store) => store.cart.items)
  console.log(cartData);
  

  const toggleLogin = () => setIsLoggedIn(!isLoggedIn);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center relative">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-orange-500">
        Swiggy
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6 items-center">
        <Link to="/" className="text-gray-700 hover:text-orange-500 transition">Home</Link>
        <Link to="/about" className="text-gray-700 hover:text-orange-500 transition">About</Link>
        <Link to="/cart" className="text-gray-700 hover:text-orange-500 transition flex items-center">
          <FaShoppingCart className="mr-1" /> Cart({cartData.length})
        </Link>
        <Link to="/contact" className="text-gray-700 hover:text-orange-500 transition">Contact</Link>
      </ul>

      {/* Login / User Profile */}
      <button
        className="hidden md:flex ml-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300 flex items-center"
        onClick={toggleLogin}
      >
        <FaUser className="mr-2" />
        {isLoggedIn ? "Log Out" : "Log In"}
      </button>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-orange-500 text-2xl focus:outline-none" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-3/4 h-full bg-white shadow-md p-6 flex flex-col space-y-4 z-20 transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:hidden`}
      >
        <Link to="/" className="text-gray-700 hover:text-orange-500 transition" onClick={toggleMenu}>Home</Link>
        <Link to="/offers" className="text-gray-700 hover:text-orange-500 transition" onClick={toggleMenu}>Offers</Link>
        <Link to="/cart" className="text-gray-700 hover:text-orange-500 transition flex items-center" onClick={toggleMenu}>
          <FaShoppingCart className="mr-1" /> Cart({cartData.length})
        </Link>
        <Link to="/contact" className="text-gray-700 hover:text-orange-500 transition" onClick={toggleMenu}>Contact</Link>
        <button
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300 flex items-center justify-center"
          onClick={() => {
            toggleLogin();
            toggleMenu();
          }}
        >
          <FaUser className="mr-2" />
          {isLoggedIn ? "Log Out" : "Log In"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
