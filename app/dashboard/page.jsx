'use client';

import { useSession, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { fetchPosts } from '../utils/api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Link from 'next/link';

export default function Dashboard() {
  const { data: session, status } = useSession();

  const [cookiesVisible, setCookiesVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  console.log(posts);

  // Fetch posts on component mount
  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };
    getPosts();
  }, []);

  useEffect(() => {
    if (!session) {
      signIn();
    }
  }, [session]);

  return (
    <>
      <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
        <button
          type="button"
          className="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
        >
          All
        </button>
        <button
          type="button"
          className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800"
        >
          Published
        </button>
        <button
          type="button"
          className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800"
        >
          Draft
        </button>
        <button
          type="button"
          className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800"
        >
          Saved
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {posts?.length > 0 ? (
          posts.map(
            (post, index) =>
              post.authorEmail === session?.user?.email && (
                <Link href={''} key={index}>
                  <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
                    <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                      <img src={post?.image} alt="card-image" />
                    </div>
                    <div className="p-4">
                      <div className="mb-4 rounded-full bg-cyan-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">
                        {post?.category.name}
                      </div>
                      <h6 className="mb-2 text-slate-800 text-xl font-semibold">
                        {post?.title}
                      </h6>
                      <p className="text-slate-600 leading-normal font-light">
                        {post?.body}
                      </p>
                    </div>

                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center">
                        <img
                          alt="Tania Andrew"
                          src={post?.author?.image}
                          className="relative inline-block h-8 w-8 rounded-full"
                        />
                        <div className="flex flex-col ml-3 text-sm">
                          <span className="text-slate-800 font-semibold">
                            {post?.author?.name}
                          </span>
                          <span className="text-slate-600">
                            {post?.publishedAt}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
          )
        ) : (
          <div className="relative min-h-60 w-full flex flex-col justify-center items-center my-6 bg-white shadow-sm border border-slate-200 rounded-lg p-2">
            <div className="p-3 text-center">
              <div className="flex justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="text-slate-400 w-10 h-10"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                  />
                </svg>
              </div>
              <div className="flex justify-center mb-2">
                <h5 className="text-slate-800 text-2xl font-semibold">
                  No data created yet with this user.
                </h5>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
