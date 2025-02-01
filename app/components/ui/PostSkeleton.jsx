import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const PostSkeleton = ({ postLength, latestPost }) => {
  return (
    <>
      <div className="flex gap-10">
        <div className="flex flex-col w-full">
          {Array.from({ length: postLength }).map((_, index) => (
            <div className="w-full my-1 border-2" key={index}>
              <div className="mr-auto p-3 place-self-center lg:col-span-5">
                {/* <div className='w-full h-64 bg-gray-200 animate-pulse'></div> */}
                
                <div className="flex my-2 items-center gap-2">
                  <Skeleton circle width={50} height={50} baseColor='#202020' />
                  <Skeleton borderRadius={18} width={200} height={12} />
                  <Skeleton borderRadius={18} width={100} height={12} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:block hidden lg:w-8/12">
          <h1 className="font-bold text-2xl py-6">Latest posts</h1>
          {Array.from({ length: latestPost }).map((_, index) => (
            <div key={index}>
              <Skeleton className="w-full" height={150} />
              <Skeleton />
              <div className="flex items-center gap-2">
                <Skeleton circle width={30} height={30} />
                <Skeleton width={100} height={12} />
                <Skeleton width={50} height={12} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostSkeleton;
