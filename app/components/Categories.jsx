'use client'

import Link from 'next/link';
// import { categoriesData } from '../data';
import { useEffect, useState } from 'react';

const Categories = () => {

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCategories();
  }, []); // Empty dep

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='flex gap-2 text-sm flex-wrap'>
      {categories &&
        categories.map((category) => (
          <Link className='px-4 py-1 rounded-md bg-slate-800 text-white' href={`/blogs/category/${category.id}`} key={category.id}>{category.name}</Link>
        ))}
    </div>
  );
};

export default Categories;
