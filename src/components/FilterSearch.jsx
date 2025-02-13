import React from 'react';

const FilterSearch = ({ clicked, selectBox, change }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 p-4 bg-white rounded-lg shadow-md"> {/* Container styling */}
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300" // Button styling
        onClick={clicked}
      >
        Top Rated
      </button>
      <div className="relative"> {/* Input wrapper for icon positioning */}
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-10 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-red-200 transition duration-300" // Input styling
          placeholder="Search for restaurants or dishes"
          onInput={change}
        />
        <svg  // Search icon
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <select
        id="selectBox"
        className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-48 focus:outline-none focus:ring-2 focus:ring-red-200 transition duration-300" // Select styling
        onClick={selectBox}
      >
        <option disabled={true} defaultValue="">Sort By</option>
        <option value="AverageRating">Rating</option>
        <option value="time">Delivery Time</option>
        <option value="ByName">Alphabetical</option>
      </select>
    </div>
  );
};

export default FilterSearch;