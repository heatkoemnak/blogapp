// components/PostList.js
'use client';
import React, { useEffect, useState } from 'react';
import Post from './Post';
import LoadingSpinner from './LoadingSpinner';
import { fetchPosts } from '../utils/api';
import Error from './Error';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  console.log(posts);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  if (error) {
    return <Error error={error} />;
  }
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {posts && <h1 className="font-bold py-6">Posts</h1>}

      {posts.map((post, index) => (
        <div className="flex flex-col" key={index}>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
};

export default PostList;
