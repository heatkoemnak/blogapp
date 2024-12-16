'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { LuReply } from 'react-icons/lu';

const Comments = ({ comments }) => {
  console.log(comments);
  const [activeSettings, setActiveSettings] = useState({});
  const [activeReplySettings, setReplySettings] = useState({});

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
    <>
      {comments?.length > 0 ? (
        comments.map((comment, index) => (
          <div key={index}>
            <article className="max-w-xl mx-auto px-4 my-2 text-base">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Image
                    className="mr-2 rounded-full"
                    width={35}
                    height={35}
                    src={
                      comment?.author?.image ||
                      'https://flowbite.com/docs/images/people/profile-picture-2.jpg'
                    }
                    alt={'User'}
                  />
                  <div className="text ">
                    <p className="inline-flex items-center mr-3 text-base font-semibold text-gray-900 dark:text-gray-600">
                      {comment?.author?.name || 'Anonymous'}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      <time
                        dateTime={comment?.publishedAt || '2022-02-08'}
                        title={comment?.publishedAt || 'February 8th, 2022'}
                      >
                        {comment?.publishedAt || 'Feb. 8, 2022'}
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
                <p className="text-gray-500 bg-slate-50 rounded-xl p-4 font-semibold dark:text-gray-700">
                  {comment.text || 'No comment content available.'}
                </p>
                <div class="flex items-center mt-1 mb-2 space-x-4">
                  <button
                    type="button"
                    className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                  >
                    <svg
                      className="mr-1.5 w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                      />
                    </svg>
                    Reply
                  </button>
                </div>
              </div>
              {comment?.replies?.length > 0 &&
                comment?.replies.map((reply, index) => (
                  <div key={index} className="flex ml-10 relative">
                    <article className="p-4 my-2 text-base bg-slate-50 rounded-xl">
                      <footer className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <Image
                            className="mr-4 rounded-full"
                            width={25}
                            height={25}
                            src={reply.author.image}
                            alt={reply.author.name || 'Anonymous'}
                          />
                          <div className="text">
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
                          onClick={() =>
                            toggleReplySettingsVisibility(reply.id)
                          }
                          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40"
                          type="button"
                        >
                          <svg
                            className="w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 3"
                          >
                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                          </svg>
                          <span className="sr-only">Reply settings</span>
                        </button>
                        {activeReplySettings[reply.id] && (
                          <div className="absolute top-14 right-0 z-10 w-36 bg-white rounded-xl border">
                            <ul className="py-1 text-xs text-gray-700">
                              {reply.authorEmail === session?.user?.email && (
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
                                    <a
                                      href="#"
                                      className="block py-2 px-4 hover:text-orange-700"
                                    >
                                      Delete
                                    </a>
                                  </li>
                                </>
                              )}
                              <li>
                                <a
                                  href="#"
                                  className="block py-2 px-4 hover:text-orange-700"
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
                      </footer>
                      <p className="text-gray-500 dark:text-gray-400">
                        {reply.text}
                      </p>
                      <div className="flex items-center mt-4 space-x-4">
                        <button
                          type="button"
                          className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                        >
                          <svg
                            className="mr-1.5 w-3.5 h-3.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
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
          </div>
        ))
      ) : (
        <div className="flex justify-center m-5">
          <span>No comments yet.</span>
        </div>
      )}
    </>
  );
};

export default Comments;
