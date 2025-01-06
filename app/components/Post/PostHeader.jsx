'use client';
import React from 'react';
import { MoreCategories } from '../ui/Selection/MoreCategories';
import { BiGridHorizontal } from 'react-icons/bi';

const PostHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="font-bold text-2xl py-6 text-white">All posts</h1>
      <form className="w-1/2 ">
        <BiGridHorizontal />
      </form>
    </div>
  );
};

export default PostHeader;
