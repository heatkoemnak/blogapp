'use client';

import Link from 'next/link';
import Error from './Error';
import { useBlogContext } from '../context/BlogProvider';

const Categories = () => {
  const { error, categories } = useBlogContext();

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="flex gap-2 text-sm flex-wrap">
      {categories &&
        categories.map((category) => (
          <Link
            className="px-4 py-1 rounded-md bg-slate-800 text-white"
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
