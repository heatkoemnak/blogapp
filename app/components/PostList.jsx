// components/PostList.js
'use client';
import React, { useEffect, useState } from 'react';
import Post from './Post';
import { useSession } from 'next-auth/react';
import PostSkeleton from './ui/PostSkeleton';
import { useSearchParams } from 'next/navigation';
import MostLikePost from './Post/MostLikePost';
import { CountByCategories } from './ui/CountByCategories';
import { BiGridHorizontal } from 'react-icons/bi';
import { JobLevelList } from './ui/JobLevelList';

const PostList = () => {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [posts, setPosts] = useState([]);

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
  }, [searchQuery]);

  return (
    <div className=" ">
      {!loading ? (
        <div className="flex gap-2">
          <div className="hidden lg:block text-white">
            <h1 className="font-bold text-lg px-2 mb-4">Job types</h1>
            <CountByCategories />
          </div>

          <div className="lg:w-7/12 ">
            <div className="flex items-center justify-between px-5  text-white">
              <h1 className="font-bold text-xl">Job Announcements</h1>
              <BiGridHorizontal size={30} className="cursor-pointer" />
            </div>
            {posts?.map((post, index) => (
              // <div key={index}>HHH</div>
              <div key={index} className="flex flex-col p-2 ">
                <Post post={post} />
              </div>
            ))}
          </div>
          <div className="lg:w-4/12">
            <h1 className="font-bold text-lg px-5 mb-4 text-white">
              Job Level
            </h1>
            <JobLevelList />
            <h1 className="font-bold text-lg m-4 text-white">Advertising</h1>
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
