import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';

const Search = () => {
  return (
    <div className="hidden lg:flex items-center space-x-2 bg-white py-1 px-2 rounded-full">
      <IoSearchOutline />
      <input
        className="outline-none bg-transparent"
        type="text"
        placeholder="Search"
      />
    </div>
  );
};

export default Search;
