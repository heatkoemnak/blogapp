'use client';
import React, { useState } from 'react';
import styles from '@/app/globals.css';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Comments from './Comments';
import { useRouter } from 'next/navigation';
import Error from './Error';
import LoadingSpinner from './LoadingSpinner';
import { deleteResource } from '../utils/api';

const Post = ({ post }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // State for toggling text display

  const deletePost = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }
    console.log(id);
    try {
      await deleteResource(id);
      window.location.reload();
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };
  if (error) {
    return <Error error={error} />;
  }
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="bg-white overflow-hidden shadow-none border px-5 py-5">
        <div className="flex flex-col min-w-full">
          <div className="relative col-span-2 w-full">
            <div className="mb-2">
              Posted by: <span className="font-bold">{post?.author?.name}</span>{' '}
              {post?.publishedAt}
            </div>
            <div className="relative">
              <div className="max-w-full mx-auto">
              <Link href={`/blogs/${post.id}`}>
                <Image
                  src={post.image || '/youtube-thumbnail.png'}
                  className="w-full max-h-[550px] object-cover" // Ensures the image covers the container
                  alt="Post Image"
                  width={1200}
                  height={550}
                  quality={100}
                  placeholder="blur"
                  layout="responsive"
                  loading="lazy"
                  blurDataURL={post?.image}
                />
              </Link>
              </div>
              <Link
                href={`/blogs/category/${post.category.id}`}
                className="absolute top-4 left-4 text-white bg-slate-800 rounded-full py-1 px-2 text-xs"
              >
                {post.category.name}
              </Link>
              {session?.user?.email === post.author.email && (
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => deletePost(post.id)}
                    className="cursor-pointer text-white bg-red-500 p-1 rounded-full hover:bg-red-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <Link
                    href={`/blogs/update/${post.id}`}
                    className="cursor-pointer text-white bg-blue-500 p-1 rounded-full hover:bg-blue-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                      <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
            <h1 className="font-bold py-2">{post.title}</h1>
            <p>
              {isExpanded ? post.body : post.body.substring(0, 250) + '...'}{' '}
              <span
                onClick={toggleText}
                className="text-blue-500 cursor-pointer"
              >
                {isExpanded ? 'Show Less' : 'Show More'}
              </span>
            </p>
          </div>
          {showComment && <Comments post={post} />}
          <div className="flex items-center justify-between mt-5">
            <span
              className="flex justify-end text-gray-600 text-sm font-bold cursor-pointer "
              onClick={() => setShowComment(!showComment)}
            >
              {post?.comments?.length}
              <span className="ml-2">
                {post?.comments?.length <= 1 ? 'Comment' : 'Comments'}
              </span>
            </span>
            <span className="flex justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
