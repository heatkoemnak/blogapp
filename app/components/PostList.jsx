// components/PostList.js
'use client';
import React, { useEffect, useState } from 'react';
import Post from './Post';
import LoadingSpinner from './LoadingSpinner';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  console.log(posts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/blog');
        if (!response.ok) {
          throw new Error('No posts created');
        }
        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1 className="font-bold py-6">Posts</h1>
          {posts.map((post, index) => (
            <div className="flex flex-col" key={index}>
              <Post post={post} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PostList;
