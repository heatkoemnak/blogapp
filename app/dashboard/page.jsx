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

  // Show cookie consent for authenticated users
  useEffect(() => {
    if (status === 'authenticated') {
      const timer = setTimeout(() => setCookiesVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status !== 'authenticated') {
    return (
      <div>
        <p>You need to sign in to access this dashboard.</p>
        <button className="text-blue-500 underline" onClick={() => signIn()}>
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className='mb-10'>
      {/* Buttons for filtering posts */}
      <div className="flex gap-2 mb-4">
        <button
          className="uppercase text-sm px-3 py-2 bg-gray-900 text-white rounded-full"
          onClick={() => setCookiesVisible((prev) => !prev)}
        >
          All
        </button>
        <button className="uppercase text-sm px-3 py-2 bg-gray-900 text-white rounded-full">
          Draft
        </button>
        <button className="uppercase flex items-center gap-1 text-sm px-3 py-2 bg-gray-900 text-white rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4"
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
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
            />
          </svg>
          Saved
        </button>
      </div>

      {/* Render posts */}
      {cookiesVisible ? (
        posts.length > 0 ? (
          posts
            .filter((post) => post.authorEmail === session?.user?.email)
            .map((post) => <Post key={post.id} post={post} />)
        ) : (
          <div>No posts found.</div>
        )
      ) : (
        <p>Cookies are hidden.</p>
      )}
    </div>
  );
}
