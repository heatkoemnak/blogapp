import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';

const Search = ({ placeholder, background }) => {
  return (
    <div className="hidden lg:flex items-center space-x-2 bg-white py-1 px-2 rounded-full">
      <IoSearchOutline />
      <input
        className={`outline-none w-full p-2 rounded-full ${background}`}
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Search;
