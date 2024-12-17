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
                <Skeleton className="w-full" height={250} />
                <Skeleton borderRadius={18} width={350} height={20} />
                <Skeleton
                  borderRadius={18}
                  className="my-2"
                  width={50}
                  height={12}
                />
                <Skeleton borderRadius={18} count={4} height={15} />
                <Skeleton
                  borderRadius={18}
                  className="my-5"
                  width={50}
                  height={12}
                />
                <div className="flex my-2 items-center gap-2">
                  <Skeleton circle width={50} height={50} />
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

      {/* <div
        role="status"
        class="space-y-8 mt-5 gap-5 animate-pulse md:space-y-0 rtl:space-x-reverse lg:flex "
      >
        <Skeleton count={5} />
        <div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded dark:bg-neutral-800">
          <svg
            class="w-10 h-10 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
        <div class="w-full">
          <div class="lg:hidden items-center m-4">
            <svg
              class="w-10 h-10 me-3 text-gray-200 dark:bg-neutral-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            <div>
              <div class="h-2.5 bg-gray-200 rounded-full dark:bg-neutral-800 w-32 mb-2"></div>
              <div class="w-48 h-2 bg-gray-200 rounded-full dark:bg-neutral-800"></div>
            </div>
          </div>
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-neutral-800 w-48 mb-4"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-neutral-800 max-w-[480px] mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-neutral-800 mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-neutral-800 max-w-[440px] mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-neutral-800 max-w-[460px] mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-neutral-800 max-w-[360px]"></div>
          <div class="hidden lg:flex items-center mt-4">
            <svg
              class="w-10 h-10 me-3 text-gray-200 dark:bg-neutral-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            <div className="flex gap-2 items-center">
              <div class="w-32 h-2.5  bg-gray-200 rounded-full dark:bg-neutral-800 "></div>
              <div class="w-28 h-1.5  bg-gray-200 rounded-full dark:bg-neutral-800"></div>
            </div>
          </div>
        </div>
        <span class="sr-only">Loading...</span>
      </div> */}
    </>
  );
};

export default PostSkeleton;
