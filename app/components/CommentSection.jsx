'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Error from './Error';
import LoadingSpinner from './LoadingSpinner';
const CommentSection = ({ post }) => {
  console.log(post);
  const [loading, setLoading] = useState(false);
  const [activeSettings, setActiveSettings] = useState({});
  const { data: session } = useSession();
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(post?.comments || []);

  useEffect(() => {
    setComments(post.comments || []);
  }, [post]);

  //   const formattedDate = date.toLocaleDateString('en-US', options);
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (commentText.trim() === '') return;
    setLoading(true);
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: commentText,
          postId: post.id,
          authorEmail: session?.user?.email,
          publishedAt: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
        }),
      });
      if (response.ok) {
        const newComment = await response.json();
        setComments([...comments, newComment]);
        window.location.reload();
        setLoading(false);
      } else {
        throw new Error('Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };

  const toggleCommentSetting = (commentId) => {
    setActiveSettings((prev) => ({
      ...prev,
      [commentId]: !prev[commentId], // Toggle the specific comment's settings visibility
    }));
  };

  return (
    <section className="bg-white dark:bg-gray-100 py-8 lg:py-16 antialiased">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-black">
            Discussion ({post.comments.length})
          </h2>
        </div>
        <form className="mb-6" onSubmit={handleCommentSubmit}>
          <div className="py-2 px-4 mb-4 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              onChange={(e) => setCommentText(e.target.value)}
              rows="6"
              value={commentText}
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg bg-gradient-to-r from-orange-500 to-purple-500 focus:ring-1 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-amber-500"></div>
            ) : (
              'Post comment'
            )}
          </button>
        </form>
        {post?.comments?.length > 0 ? (
          post.comments.map((comment, index) => (
            <article
              key={index}
              className="p-6 my-3 text-base bg-white rounded-lg shadow border border-gray-200 dark:bg-white0 dark:border-gray-100"
            >
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm font-semibold text-gray-900 dark:text-gray-600">
                    <Image
                      className="mr-2 rounded-full"
                      width={30}
                      height={30}
                      src={
                        comment.author.image ||
                        'https://flowbite.com/docs/images/people/profile-picture-2.jpg'
                      }
                      alt={comment.author.name || 'User'}
                    />
                    {comment.author.name || 'Anonymous'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <time
                      dateTime={comment.publishedAt || '2022-02-08'}
                      title={comment.publishedAt || 'February 8th, 2022'}
                    >
                      {comment.publishedAt || 'Feb. 8, 2022'}
                    </time>
                  </p>
                </div>
                <button
                  className="relative items-center p-2 text-sm font-medium text-gray-500 bg-white rounded-lg"
                  type="button"
                  onClick={() => toggleCommentSetting(comment.id)}
                >
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                  <span className="sr-only">Comment settings</span>
                  {activeSettings[comment.id] && (
                    <div className="absolute top-8 right-0 z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                      <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                        <li>
                          <a
                            href="#"
                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600"
                          >
                            Edit
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600"
                          >
                            Delete
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600"
                          >
                            Report
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                </button>
              </footer>
              <p className="text-gray-500 dark:text-gray-800">
                {comment.text || 'No comment content available.'}
              </p>
            </article>
          ))
        ) : (
          <div className="flex justify-center mt-5">
            <span>No comments yet.</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default CommentSection;
