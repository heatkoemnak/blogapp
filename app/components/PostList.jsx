// components/PostList.js
'use client';
import React, { useState } from 'react';
import styles from '@/app/globals.css';
import Image from 'next/image';
import Link from 'next/link';

const PostList = ({ posts }) => {
  const [userId, setUserId] = useState(91);
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="flex flex-col">
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="border px-5 py-5">
            <div>
              Posted by:
              <span className="font-bold">{post.userId}</span> on Sat June 2024
            </div>
            <div>
              {post.img ? (
                <Image
                  src={post.img}
                  alt="Post Di"
                  className={styles.postImage}
                  width={500}
                  height={200}
                />
              ) : (
                <Image
                  src={`/youtube-thumbnail.png`}
                  alt="Post Di"
                  className={styles.postImage}
                  width={500}
                  height={200}
                />
              )}
              <span className="text-white bg-slate-800 rounded-full py-1 px-2 text-xs ">
                {post.categories}
              </span>
              {userId === post.userId && (
                <div className="flex items-center gap-2 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-red-800"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                  </svg>
                </div>
              )}
            </div>
            <h1 className="font-bold py-2">{post.title}</h1>
            <p>
              {showMore ? post.content : `${post.content.substring(0, 250)}`}
              <button
                className="btn bg-purple-300 text-slate-800 rounded-full mx-3 text-sm px-2"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? 'Show less' : 'Show more'}
              </button>
            </p>
            <div>
              {post.links.map((link) => (
                <div className="flex items-center gap-1" key={link}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                    />
                  </svg>
                  <Link
                    href={link}
                    className="px-2 py-1 rounded text-purple-700
              "
                  >
                    {link}
                  </Link>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-3 ">
              <span className="border px-2 py-1 rounded-full bg-blue-300 text-white cursor-pointer">
                Likes {post.reactions.likes}
              </span>
              <span className="border px-2 py-1 rounded-full bg-lime-400 text-white cursor-pointer">
                Views {post.views}
              </span>
              <span className="border px-2 py-1 flex items-center rounded-full bg-amber-300 text-white cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z"
                    clipRule="evenodd"
                  />
                </svg>
                Share
              </span>
            </div>
          </div>
        ))
      ) : (
        <div>No post Created</div>
      )}
    </div>
  );
};

export default PostList;
