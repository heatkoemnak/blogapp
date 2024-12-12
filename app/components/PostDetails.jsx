'use client';
import React, { useState } from 'react';
import styles from '@/app/globals.css';
import Image from 'next/image';
import Link from 'next/link';
import { BsThreeDots } from 'react-icons/bs';
import Error from './Error';
import LoadingSpinner from './LoadingSpinner';
import { deleteResource } from '../utils/api';
import { useSession } from 'next-auth/react';

const PostDetails = ({ post }) => {
  console.log(post);
  const { data: session } = useSession();
  const [showComment, setShowComment] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // State for toggling text display
  const [toggleThreeDot, setToggleThreeDot] = useState(false);
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
  const toggleThreeDots = () => {
    setToggleThreeDot(!toggleThreeDot);
  };

  return (
    <section className="max-w-2xl mx-auto mt-10 px-8 relative">
      <div className="lg:max-w-3xl">
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
        <div className="mr-auto place-self-center  mt-2 lg:col-span-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Link className="lg:flex" href={`/blogs/${post.id}`}>
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
              <div className="flex flex-col lg:flex-row">
                <span className="font-semibold text-gray-600">
                  {post?.author?.name}
                </span>
                <span className="font-sans text-sm mx-2 text-gray-500">
                  {post?.publishedAt}
                </span>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={toggleThreeDots}
                className="flex items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1"
              >
                <BsThreeDots />
              </button>
              {toggleThreeDot && (
                <div className="absolute right-0 z-10 w-36 bg-white rounded-xl border">
                  <ul className="py-1 text-xs text-gray-700">
                    {post?.author?.authorEmail !== session?.user?.email && (
                      <>
                        <li>
                          <a
                            href="#"
                            className="block py-2 px-4 hover:text-orange-700"
                          >
                            Edit
                          </a>
                        </li>
                        <li>
                          <button
                            type="submit"
                            onClick={() => deletePost(post.id)}
                            className="block py-2 px-4 hover:text-orange-700"
                          >
                            Delete
                          </button>
                        </li>
                      </>
                    )}

                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:text-orange-600"
                      >
                        Hide
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:text-orange-700"
                      >
                        Report
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <h1 className="max-w-90 mb-4 text-2xl lg:font-extrabold tracking-tight text-[#201515] md:text-2xl xl:text-4xl">
            {post.title}
          </h1>
          <p className="font-light text-gray-700 lg:mb-8 md:text-lg lg:text-xl">
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
                  {isExpanded ? 'Read Less' : 'Read More'} &nbsp; →
                </span>
              </span>
            )}
          </p>
        </div>
      </div>
      <div className="flex mt-5 mb-5 items-center justify-between text-gray-500">
        <button className="flex items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
          <svg
            className="w-5 h-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span>42 Likes</span>
        </button>
        <button
          className="flex items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1"
          onClick={() => setShowComment(!showComment)}
        >
          {/* comment icon */}
          <svg
            className="w-5 h-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z"
            />
          </svg>
          <span>
            {post?.comments?.length || 0}{' '}
            {post?.comments?.length <= 1 ? 'Comment' : 'Comments'}
          </span>
        </button>
      </div>
    </section>
  );
};

export default PostDetails;
