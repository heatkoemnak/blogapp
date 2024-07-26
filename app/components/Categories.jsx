import Link from 'next/link';
import React from 'react';
import { categoriesData } from '../data';

const Categories = () => {
  return (
    <div className='flex gap-2 text-sm flex-wrap'>
      {categoriesData &&
        categoriesData.map((category) => (
          <Link className='px-4 py-1 rounded-md bg-slate-800 text-white' href={`/categories/${category.id}`} key={category.id}>{category.name}</Link>
        ))}
    </div>
  );
};

export default Categories;
