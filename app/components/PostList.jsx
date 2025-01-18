// components/PostList.js
'use client';
import React, { useState } from 'react';
import Post from './Post';
import PostSkeleton from './ui/PostSkeleton';
import MostLikePost from './Post/MostLikePost';
import { CountByCategories } from './ui/CountByCategories';
import { BiGridHorizontal } from 'react-icons/bi';
import { JobLevelList } from './ui/JobLevelList';
import { useBlogContext } from '../context/BlogProvider';

const PostList = () => {
  const { announcement } = useBlogContext();
  const [loading, setLoading] = useState(false);

  return (
    <div className=" ">
      {!loading ? (
        <div className="flex gap-2">
          <div className="lg:w-7/12 ">
            <div className="flex items-center justify-between px-5  text-white">
              <h1 className="font-bold text-xl">Job Announcements</h1>
              <BiGridHorizontal size={30} className="cursor-pointer" />
            </div>
            {announcement?.length > 0 ? (
              announcement?.map((announcement, index) => (
                <div key={index} className="flex flex-col p-2 ">
                  <Post post={announcement} />
                </div>
              ))
            ) : (
              <div className="flex flex-col p-2">No Announcements</div>
            )}
          </div>
          <div className="lg:w-4/12">
            <div className="hidden lg:block text-white">
              <h1 className="font-bold text-lg px-2 mb-4">Job types</h1>
              <CountByCategories />
            </div>
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
