'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Error from './Error';
import { deleteResource } from '../utils/api';
import router from 'next/router';
import { Carousel } from '@material-tailwind/react';
import { timeAgo } from '../utils/timeAgo';
const Post = ({ post }) => {
  console.log(post);
  const [error, setError] = useState('');
  // const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // State for toggling text display
  const [likes, setLikes] = useState(post?.likes || 0);
  const [showDeleteMenu, setShowDeleteMenu] = useState(false); // For dropdown menu toggle

  const handleLike = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId: post.id }),
      });
      const { likes } = await response.json();
      console.log(likes);
      setLikes((prevLikes) => prevLikes + 1);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deletePost = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }
    try {
      await deleteResource(id);
      router.refresh();
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleDeleteMenu = () => {
    setShowDeleteMenu(!showDeleteMenu);
  };

  if (error) {
    return <Error error={error} />;
  }
  return (
    <div className=" ">
      <div class=" bg-white flex flex-col rounded-xl  border border-slate-200 shadow-xl ">
        <div class="relative h-auto overflow-hidden text-black rounded-md">
          <Carousel
            className="rounded-xl h-fit bg-gray-800"
            navigation={({ setActiveIndex, activeIndex, length }) => (
              <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                {new Array(length).fill('').map((_, i) => (
                  <span
                    key={i}
                    className={`block h-1 cursor-pointer rounded-xl transition-all content-[''] ${
                      activeIndex === i ? 'w-8 bg-black' : 'w-4 bg-black/50'
                    }`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
            )}
          >
            {post?.images.length > 0 &&
              post?.images.map((src, index) => (
                <div key={index} className="flex justify-center">
                  <Image
                    width={500}
                    height={500}
                    src={src}
                    className="object-cover lg:w-1/2 "
                    alt="Image preview"
                  />
                </div>
              ))}
          </Carousel>
        </div>
        <div className="p-4">
          <div className="mb-4 rounded-full bg-cyan-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">
            {post?.categories?.map((category, index) => (
              <span
                key={index}
                classNameName="inline-flex font-sans text-sm items-center justify-center font-semibold duration-200  focus:outline-none focus-visible:outline-gray-600"
              >
                {category.name}
              </span>
            ))}
          </div>
          <h6 className="mb-2 text-slate-800 text-xl font-semibold">
            {post?.title}
          </h6>
          <p className="text-slate-600 leading-normal font-light">
            {' '}
            {isExpanded ? post.content : post.content.substring(0, 200)}
            <span>
              {post?.links.length > 0 &&
                post?.links?.map((link, index) => (
                  <Link
                    className=" flex flex-col text-blue-500 "
                    href={link}
                    target="_blank"
                    key={index}
                  >
                    {link}
                  </Link>
                ))}
            </span>
          </p>
          <p className="text-slate-600 leading-normal font-light">
            {' '}
            {post.content?.length >= 250 && (
              <span
                onClick={toggleText}
                className="text-orange-500 cursor-pointer"
              >
                ...
                <span className="inline-flex font-sans text-sm items-center justify-center font-semibold duration-200  focus:outline-none focus-visible:outline-gray-600">
                  {isExpanded ? 'Read Less' : 'Read More'} &nbsp; →{' '}
                </span>
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Image
              src={
                post?.author?.image ||
                'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80'
              }
              className="relative inline-block h-8 w-8 rounded-full"
              alt="Post Author"
              width={35}
              height={35}
            />
            <div className="flex flex-col ml-3 text-sm">
              <span className="text-slate-800 font-semibold">
                {' '}
                {post?.author?.name}
              </span>
              <span className="text-slate-600"> {timeAgo(post?.createdAt)}</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={handleLike}
              className="flex items-center border-2  gap-2 px-2 hover:bg-gray-50 rounded-full p-1"
            >
              <svg
                className="w-5 h-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>{likes}</span>
            </button>
            <Link
              href={`/blogs/${post?.id}`}
              className="flex items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1"
              // onClick={() => setShowComment(!showComment)}
            >
              {/* comment icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902 1.168.188 2.352.327 3.55.414.28.02.521.18.642.413l1.713 3.293a.75.75 0 0 0 1.33 0l1.713-3.293a.783.783 0 0 1 .642-.413 41.102 41.102 0 0 0 3.55-.414c1.437-.231 2.43-1.49 2.43-2.902V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0 0 10 2ZM6.75 6a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Zm0 2.5a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Z"
                  clipRule="evenodd"
                />
              </svg>

              <span>{post?.comments?.length || 0} </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
