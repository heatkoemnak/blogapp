'use client';

import { useSession, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import PostList from '../components/PostList';
import { fetchPosts } from '../utils/api';
import Post from '../components/Post';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [cookiesVisible, setCookiesVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      const timer = setTimeout(() => setCookiesVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [status]);
 

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex gap-2">
        <button
          className="uppercase text-sm px-3 py-2 bg-gray-900 text-white rounded-full"
          onClick={() => setCookiesVisible((prev) => !prev)}
        >
          All
        </button>
        <button
          className="uppercase text-sm px-3 py-2 bg-gray-900 text-white rounded-full"
          onClick={() => setCookiesVisible((prev) => !prev)}
        >
          Draft
        </button>

        <button className="uppercase flex items-center gap-1 text-sm px-3 py-2 bg-gray-900 text-white rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
            />
          </svg>
          Published
        </button>
        <button className="uppercase flex items-center gap-1 text-sm px-3 py-2 bg-gray-900 text-white rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
            />
          </svg>
          Saved
        </button>
        <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
          <div>
            <a
              title="Favorite"
              href="https://www.buymeacoffee.com/tonyricher"
              target="_blank"
              className="block w-full h-12 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12"
            >
              <img
                className="object-cover object-center w-full h-full rounded-full"
                src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=tonyricher&button_colour=FF5F5F&font_colour=ffffff&font_family=Cookie&outline_colour=000000&coffee_colour=FFDD00"
                alt="Buy me a coffee"
              />
            </a>
          </div>
        </div>
      </div>
      {cookiesVisible ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post, index) =>
            post?.authorEmail === session?.user.email ? (
              <Post key={index} post={post} />
            ) : (
              'No post created yet.'
            )
          )}
        </div>
      ) : (
        <div>Redirecting to sign in...</div>
      )}
    </div>
  );
}
