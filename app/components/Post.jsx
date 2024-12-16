'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Error from './Error';
import LoadingSpinner from './LoadingSpinner';
import { deleteResource } from '../utils/api';
import { useSocket } from '../context/SocketProvider';
import { useSession } from 'next-auth/react';
import { BsThreeDotsVertical } from 'react-icons/bs';

const Post = ({ post }) => {
  const { data: session } = useSession();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // State for toggling text display
  const [likes, setLikes] = useState(post?.likes || 0);
  const [showDeleteMenu, setShowDeleteMenu] = useState(false); // For dropdown menu toggle
  const { socket } = useSocket();

  console.log(likes);

  useEffect(() => {
    // Listen for "postLiked" events
    socket.on('postLiked', (likes) => {
      console.log(likes);
    });
  }, [socket]);

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
      socket.emit('likes', likes);
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
      window.location.reload();
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

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="bg-white ">
      <div className="grid max-w-screen-xl p-3 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-5">
          {/* Author Info */}
          <div className="lg:hidden flex gap-2 items-center mb-2 ml-2">
            <Link className="lg:flex" href={`/blogs/${post?.id}`}>
              <Image
                src={
                  post?.author?.image ||
                  'https://getillustrations.b-cdn.net//photos/pack/3d-avatar-male_lg.png'
                }
                className="rounded-full border-1"
                alt="Post Author"
                width={35}
                height={35}
              />
            </Link>
            <span className="font-semibold text-gray-600">
              {post?.author?.name}
            </span>
            <span className="font-sans text-sm mx-2 text-gray-500">
              {post?.publishedAt}
            </span>
          </div>
          {/* Post Title and Body */}
          <h1 className="text-3xl font-bold leading-tight text-gray-900 ">
            {post.title}
          </h1>
          <p className="max-w-96 font-light text-gray-700 lg:mb-8 md:text-lg lg:text-xl ">
            {isExpanded ? post.body : post.body.substring(0, 300)}
            <br />
            <Link className="text-blue-500 " href={post.links[0]}>
              {post.links[0]}
            </Link>
            <br />
            {post.body?.length >= 250 && (
              <span
                onClick={toggleText}
                className="text-blue-500 cursor-pointer"
              >
                ...
                <span className="inline-flex font-sans text-sm items-center justify-center font-semibold text-blue-500 duration-200 hover:text-blue-500 focus:outline-none focus-visible:outline-gray-600">
                  {isExpanded ? 'Read Less' : 'Read More'} &nbsp; →{' '}
                </span>
              </span>
            )}
          </p>

          <div className="hidden lg:flex gap-2 items-center mb-2 ml-2">
            <Link className=" " href={`/blogs/${post.id}`}>
              <Image
                src={
                  post?.author?.image ||
                  'https://getillustrations.b-cdn.net//photos/pack/3d-avatar-male_lg.png'
                }
                className="rounded-full border-1"
                alt="Post Author"
                width={35}
                height={35}
              />
            </Link>
            <span className="font-semibold text-gray-600">
              {post?.author?.name}
            </span>
            <span className="font-sans text-sm mx-2 text-gray-500">
              {post?.publishedAt}
            </span>
          </div>
        </div>
        {/* Post Image */}
        <div className="lg:col-span-7 lg:flex rounded-lg">
          <Link href={`/blogs/${post.id}`}>
            <Image
              src={post?.image || '/youtube-thumbnail.png'}
              className="rounded-lg"
              alt="Post Image"
              width={1200}
              height={550}
              quality={100}
              loading="lazy"
            />
          </Link>
        </div>
      </div>

      {/* Likes & Comments */}
      <div className="flex pb-5 px-5 items-center justify-between text-gray-500">
        <button
          onClick={handleLike}
          className="flex items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1"
        >
          <svg
            className="w-5 h-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span>{likes} Likes</span>
        </button>
        <div className="flex items-center gap-2">
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

            <span>
              {post?.comments?.length || 0}{' '}
              {post?.comments?.length <= 1 ? 'Comment' : 'Comments'}
            </span>
          </Link>
          <div className="relative">
            <button
              className="flex items-center"
              onClick={() => toggleDeleteMenu(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-6"
              >
                <path d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
              </svg>
            </button>

            {showDeleteMenu && (
              <div className="absolute top-8 right-0 z-10 w-36 bg-white rounded-xl border">
                <ul className="py-1 text-xs text-gray-700 ">
                  {post?.author?.email !== session?.user?.email && (
                    <>
                      <li className="flex items-center px-4 gap-2 cursor-pointer ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="size-5"
                        >
                          <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                          <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                        </svg>

                        <div className="block py-2 px-2  hover:text-orange-700">
                          Edit
                        </div>
                      </li>
                      <li className="flex items-center  px-4 gap-2 cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="size-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div
                          onClick={() => deletePost(post?.id)}
                          className="block py-2 px-2  hover:text-orange-700"
                        >
                          Delete
                        </div>
                      </li>
                    </>
                  )}

                  <li className="flex items-center  px-4 gap-2 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z"
                        clipRule="evenodd"
                      />
                      <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
                    </svg>

                    <span className="block py-2 px-2  hover:text-orange-600">
                      Hide
                    </span>
                  </li>
                  <li className="flex items-center  px-4 gap-2 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-5"
                    >
                      <path d="M3.5 2.75a.75.75 0 0 0-1.5 0v14.5a.75.75 0 0 0 1.5 0v-4.392l1.657-.348a6.449 6.449 0 0 1 4.271.572 7.948 7.948 0 0 0 5.965.524l2.078-.64A.75.75 0 0 0 18 12.25v-8.5a.75.75 0 0 0-.904-.734l-2.38.501a7.25 7.25 0 0 1-4.186-.363l-.502-.2a8.75 8.75 0 0 0-5.053-.439l-1.475.31V2.75Z" />
                    </svg>

                    <span className="block py-2 px-2  hover:text-orange-600">
                      Report
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Delete Dropdown Menu */}
        </div>
      </div>
    </section>
  );
};

export default Post;
