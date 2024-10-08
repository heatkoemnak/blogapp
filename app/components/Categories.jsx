'use client';

import Link from 'next/link';
import Error from './Error';
import { useBlogContext } from '../context/BlogProvider';

const Categories = () => {
  const {categories } = useBlogContext();

  return (
    <div className="flex gap-2 text-sm flex-wrap">
      {categories &&
        categories.map((category) => (
          <Link
             className="uppercase text-sm px-3 py-2 bg-gray-900 text-white rounded-full"
            href={`/blogs/category/${category.id}`}
            key={category.id}
          >
            {category.name}
          </Link>
        ))}
    </div>
  );
};

export default Categories;
