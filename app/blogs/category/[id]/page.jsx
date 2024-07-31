'use client';

import { useEffect, useState } from 'react';
import Post from '@/app/components/Post'; // Adjust the import path as needed
// import { useSearchParams } from 'next/navigation';

const CategoryPage = ({ params }) => {
  const { id } = params;
  // const searchParams = useSearchParams();
  // const name = searchParams.get('name'); // Extract the 'name' parameter
  console.log(id);

  const [category, setCategory] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/categories/${id}`);
        if (!response.ok) {
          throw new Error('Category not found');
        }
        const data = await response.json();
        console.log(data)
        setCategory(data);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {category ? (
        <div>
          <h1 className="text-2xl font-bold">{category.name}</h1>
          <div className="mt-4">
            {category.posts && category.posts.length > 0 ? (
              category.posts.map((post) => <Post key={post.id} post={post} />)
            ) : (
              <p>No posts available in this category.</p>
            )}
          </div>
        </div>
      ) : (
        !loading && <p>Category not found.</p>
      )}
    </div>
  );
};

export default CategoryPage;
