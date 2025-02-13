import React, { useState } from 'react';
import { LOGO } from '../utils/constant';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <nav className='bg-white shadow-md py-4 px-6 flex justify-between items-center'>
      <img src={LOGO} alt="Logo" className='h-10' />
      <ul className='flex space-x-6 items-center'>
        <Link to={"/"}  className='text-gray-700 hover:text-green-600 transition'>Home</Link>
        <Link to={"/about"}  className='text-gray-700 hover:text-green-600 transition'>About</Link>
        <Link to={"/contact"}  className='text-gray-700 hover:text-green-600 transition'>Contact</Link>
        <button 
          className='ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300' 
          onClick={toggleLogin}
        >
          {isLoggedIn ? 'Log Out' : 'Log In'}
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
