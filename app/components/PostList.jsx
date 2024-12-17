// components/PostList.js
'use client';
import React, { useEffect, useState } from 'react';
import Post from './Post';
import LoadingSpinner from './LoadingSpinner';
import { fetchPosts } from '../utils/api';
import Error from './Error';
import { useSession } from 'next-auth/react';
import LatestPost from './LatestPost';
import PostSkeleton from './ui/PostSkeleton';

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
    <div className="mb-10">
      {!loading ? (
        <div className="flex gap-10">
          <div className="w-full">
            {posts.map((post, index) => (
              <div className="flex flex-col border my-1  " key={index}>
                <Post post={post} />
              </div>
            ))}
          </div>
          <div className="lg:block hidden lg:w-8/12">
            <h1 className="font-bold text-2xl py-6">Latest posts</h1>
            {posts.map((post, index) => (
              <div className="flex border my-1  " key={index}>
                <LatestPost post={post} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <PostSkeleton postLength={6} latestPost={3} />
      )}
    </div>
  );
};

export default PostList;
