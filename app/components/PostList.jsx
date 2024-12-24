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
import { fetchMostLike } from '../utils/api/mostlike';
import { useSearchParams } from 'next/navigation';
import MostLikePost from './Post/MostLikePost';

const PostList = () => {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const categoryQuery = searchParams.get('search') || '';
  console.log(searchQuery);
  const [posts, setPosts] = useState([]);

  console.log(posts);

  // const [mostliked, setMostliked] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/blog?q=${searchQuery}`);
      const data = await response.json();
      if (response.ok) {
        setPosts(data);
      } else {
        setPosts([]);
        console.error(data.message);
      }
    };

    fetchPosts();
    // Fetch most liked posts when searchQuery changes
  }, [searchQuery]);

  // useEffect(() => {
  //   const getPosts = async () => {
  //     try {
  //       setLoading(true);
  //       const [data, mostliked] = await Promise.all([
  //         fetchPosts(),
  //         fetchMostLike(),
  //       ]);
  //       setPosts(data);
  //       setMostliked(mostliked);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   getPosts();
  // }, []);

  return (
    <div className="mb-10">
      {!loading ? (
        <div className="flex gap-10">
          <div className="w-full">
            {posts?.map((post, index) => (
              <div className="flex flex-col  " key={index}>
                <Post post={post} />
              </div>
            ))}
          </div>
          <div className="lg:block hidden lg:w-8/12">
            <h1 className="font-bold text-2xl py-6">Popular posts</h1>
            <MostLikePost />
          </div>
        </div>
      ) : (
        <PostSkeleton postLength={6} latestPost={3} />
      )}
    </div>
  );
};

export default PostList;
