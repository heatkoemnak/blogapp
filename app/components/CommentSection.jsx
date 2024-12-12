'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Error from './Error';
import { LuReply } from 'react-icons/lu';
import { CiMinimize1 } from 'react-icons/ci';
import PostDetails from './PostDetails';
const CommentSection = ({ post,  setShowComment }) => {
  const [loading, setLoading] = useState(false);
  const [activeSettings, setActiveSettings] = useState({});
  const [activeReplySettings, setReplySettings] = useState({});
  const { data: session } = useSession();
  const [newCommentText, setCommentText] = useState('');
  const [comments, setComments] = useState(post?.comments || []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (newCommentText.trim() === '') return;
    setLoading(true);
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: newCommentText,
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
        setLoading(false);
      } else {
        throw new Error('Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };

  const toggleCommentSettings = (commentId) => {
    setActiveSettings((prevSettings) => ({
      ...prevSettings,
      [commentId]: !prevSettings[commentId],
    }));
  };

  const toggleReplySettingsVisibility = (replyId) => {
    setReplySettings((previousReplySettings) => ({
      ...previousReplySettings,
      [replyId]: !previousReplySettings[replyId],
    }));
  };

  return (
    <div
      className="lg:flex h-screen overflow-y-scroll w-full fixed top-0 right-0 z-50 shadow-inner bg-white dark:bg-gray-100 antialiased "
   
    >
      <div className=" w-full ">
        <PostDetails post={post}  />
      </div>
      <div className="lg:w-6/12 shadow-inner ">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
            Discussion ({post.comments.length})
          </h2>
          <div className="flex items-center">
            <span className="lg:hidden">Most Relevant</span>
            <CiMinimize1
              size={25}
              onClick={() => setShowComment(prevState => !prevState)}
              className="absolute top-6 right-5 cursor-pointer hover:text-orange-500"
            />
          </div>
        </div>
        <hr />

        {post?.comments?.length > 0 ? (
          post.comments.map((comment, index) => (
            <>
              <article
                key={index}
                className="max-w-2xl mx-auto px-4 my-2 text-base"
              >
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <Image
                      className="mr-2 rounded-full"
                      width={35}
                      height={35}
                      src={
                        comment.author.image ||
                        'https://flowbite.com/docs/images/people/profile-picture-2.jpg'
                      }
                      alt={comment.author.name || 'User'}
                    />
                    <div className="text ">
                      <p className="inline-flex items-center mr-3 text-base font-semibold text-gray-900 dark:text-gray-600">
                        {comment.author.name || 'Anonymous'}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        <time
                          dateTime={comment.publishedAt || '2022-02-08'}
                          title={comment.publishedAt || 'February 8th, 2022'}
                        >
                          {comment.publishedAt || 'Feb. 8, 2022'}
                        </time>
                      </p>
                    </div>
                  </div>
                  <button
                    className="relative items-center p-2 text-sm font-medium text-gray-500 "
                    type="button"
                    onClick={() => toggleCommentSettings(comment.id)}
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
                      <div className="absolute top-8 right-0 z-10 w-36 bg-white rounded-xl border">
                        <ul className="py-1 text-xs text-gray-700 ">
                          {comment.authorEmail === session?.user?.email && (
                            <>
                              <li>
                                <a
                                  href="#"
                                  className="block py-2 px-4  hover:text-orange-700"
                                >
                                  Edit
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block py-2 px-4  hover:text-orange-700"
                                >
                                  Delete
                                </a>
                              </li>
                            </>
                          )}

                          <li>
                            <a
                              href="#"
                              className="block py-2 px-4  hover:text-orange-600"
                            >
                              Hide
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block py-2 px-4  hover:text-orange-700"
                            >
                              Report
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </button>
                </footer>
                <div className="ml-10">
                  <p className="text-gray-500 bg-white rounded-xl p-4 font-semibold dark:text-gray-700">
                    {comment.text || 'No comment content available.'}
                  </p>
                  <div class="flex items-center mt-1 mb-2 space-x-4">
                    <button
                      type="button"
                      class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                    >
                      <svg
                        class="mr-1.5 w-3.5 h-3.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 18"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                        />
                      </svg>
                      Reply
                    </button>
                  </div>
                </div>
                {comment.replies.length > 0 &&
                  comment.replies.map((reply, index) => (
                    <div key={index} className="flex ml-10 relative">
                      <article class="p-4 my-2 text-base bg-slate-50 rounded-xl">
                        <footer class="flex justify-between items-center mb-2">
                          <div className="flex items-center ">
                            <Image
                              className="mr-4 rounded-full"
                              width={25}
                              height={25}
                              src={reply.author.image}
                              alt={reply.author.name || 'Anonymous'}
                            />
                            <div className="text ">
                              <p className="inline-flex items-center mr-3 text-base font-semibold text-gray-900 dark:text-gray-600">
                                {reply.author.name || 'Anonymous'}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                <time
                                  dateTime={reply.publishedAt}
                                  title={reply.publishedAt}
                                >
                                  {reply.publishedAt}
                                </time>
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleReplySettingsVisibility(reply.id)}
                            class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40"
                            type="button"
                          >
                            <svg
                              class="w-4 h-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 16 3"
                            >
                              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                            </svg>
                            <span class="sr-only">Reply settings</span>
                          </button>
                          {activeReplySettings[reply.id] && (
                            <div className="absolute top-14 right-0 z-10 w-36 bg-white rounded-xl border">
                              <ul className="py-1 text-xs text-gray-700 ">
                                {reply.authorEmail === session?.user?.email && (
                                  <>
                                    <li>
                                      <a
                                        href="#"
                                        className="block py-2 px-4  hover:text-orange-700"
                                      >
                                        Edit
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        href="#"
                                        className="block py-2 px-4  hover:text-orange-700"
                                      >
                                        Delete
                                      </a>
                                    </li>
                                  </>
                                )}
                                <li>
                                  <a
                                    href="#"
                                    className="block py-2 px-4  hover:text-orange-700"
                                  >
                                    Hide
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    className="block py-2 px-4  hover:text-orange-700"
                                  >
                                    Report
                                  </a>
                                </li>
                              </ul>
                            </div>
                          )}
                        </footer>
                        <p class="text-gray-500 dark:text-gray-400 ">
                          {reply.text}
                        </p>
                        <div class="flex items-center mt-4 space-x-4">
                          <button
                            type="button"
                            class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                          >
                            <svg
                              class="mr-1.5 w-3.5 h-3.5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 18"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                              />
                            </svg>
                            Reply
                          </button>
                        </div>
                        <LuReply className="absolute -top-5 right-0" />
                      </article>
                    </div>
                  ))}
              </article>
            </>
          ))
        ) : (
          <div className="flex justify-center m-5">
            <span>No comments yet.</span>
          </div>
        )}
        <form className="m-5 pb-10" onSubmit={handleCommentSubmit}>
          <label
            for="message"
            class="block mb-2 text-sm font-medium text-gray-900 "
          >
            Leave your comment
          </label>
          <div className="py-2 px-2 mb-4 ">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>

            <textarea
              id="comment"
              rows="4"
              onChange={(e) => setCommentText(e.target.value)}
              value={newCommentText}
              class="block p-2.5 w-full text-sm placeholder-gray-800  text-gray-900 rounded-lg "
              placeholder="Write your thoughts here..."
            ></textarea>
          </div>

          <div class="flex items-center justify-between px-3 ">
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg bg-gradient-to-r from-orange-500 to-purple-500 focus:ring-1 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-amber-500"></div>
              ) : (
                'Leave comment'
              )}
            </button>
            <div className="flex space-x-1 rtl:space-x-reverse sm:space-x-2">
              <button
                type="button"
                className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-orange-700"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 12 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                  />
                </svg>
                <span className="sr-only">Attach file</span>
              </button>
              <button
                type="button"
                className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-orange-700"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                </svg>
                <span className="sr-only">Set location</span>
              </button>
              <button
                type="button"
                className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-orange-700"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
                <span className="sr-only">Upload image</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentSection;
