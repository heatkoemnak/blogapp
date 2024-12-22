import React from 'react';

const CategorySkeleton = () => {
  return (
    <div role="status" className="animate-pulse rtl:space-x-reverse lg:flex ">
      <div className="flex gap-4 items-center w-full rounded ">
        <div className="h-10 px-3 py-2  bg-gray-200 rounded-full dark:bg-[#202020] w-36 "></div>
        <div className="h-10 px-3 py-2 bg-gray-200 rounded-full dark:bg-[#202020] w-36 "></div>
        <div className="h-10 px-3 py-2 bg-gray-200 rounded-full dark:bg-[#202020] w-36"></div>
        <div className="h-10 px-3 py-2 bg-gray-200 rounded-full dark:bg-[#202020] w-36 "></div>
        <div className="h-10 px-3 py-2 bg-gray-200 rounded-full dark:bg-[#202020] w-36 "></div>
        <div className="h-10 px-3 py-2 bg-gray-200 rounded-full dark:bg-[#202020] w-36"></div>
      </div>
    </div>
  );
};

export default CategorySkeleton;
