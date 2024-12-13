// components/PostList.js
'use client';
import React, { useEffect, useState } from 'react';
import Post from './Post';
import LoadingSpinner from './LoadingSpinner';
import { fetchPosts } from '../utils/api';
import Error from './Error';
import { useSession } from 'next-auth/react';

const PostList = () => {
  const { data: session, status } = useSession();
  const [cookiesVisible, setCookiesVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (status === 'authenticated') {
      const timer = setTimeout(() => setCookiesVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [status]);
  if (error) {
    return <Error error={error} />;
  }

  return (
    <div>
      {!loading ? (
        <>
          <h1 className="font-bold text-3xl py-6">All posts</h1>
          {posts.map((post, index) => (
            <div className="flex flex-col border my-1 mb-10" key={index}>
              <Post post={post} />
            </div>
          ))}
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default PostList;
