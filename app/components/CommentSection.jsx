'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { LuReply } from 'react-icons/lu';
import { CiMinimize1 } from 'react-icons/ci';
import PostDetails from './PostDetails';
import { useSocket } from '../context/SocketProvider';
import { useRouter } from 'next/navigation';
import { timeAgo } from '../utils/timeAgo';

const CommentSection = ({ post }) => {
  console.log(post);
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const [newCommentText, setCommentText] = useState('');
  const [comments, setComments] = useState(post?.comments || []);
  const { socket } = useSocket();
  const router = useRouter();
  console.log(comments);
  const [activeSettings, setActiveSettings] = useState({});
  const [activeReplySettings, setReplySettings] = useState({});
  useEffect(() => {
    socket.on('newComment', (message) => {
      console.log(message);
    });
  }, [socket]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (newCommentText.trim() === '') return;
    const data = {
      text: newCommentText,
      postId: post.id,
      authorEmail: session?.user.email,
      publishedAt: new Date().toISOString(),
    };
    console.log(timeAgo(new Date().toISOString()));
    // socket.emit('newComment', data);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const newComment = await response.json();
        socket.emit('newComment', newComment);
        console.log(newComment);
        setComments((prevComments) => [
          ...prevComments,
          {
            ...newComment,
            author: {
              name: session?.user.name,
              image: session?.user.image,
            },
          },
        ]);
        setCommentText('');
      } else {
        console.error('Failed to post comment:', await response.json());
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleCommentSubmit(e); // Call handleCommentSubmit when Enter is pressed
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
    <div className="lg:flex h-screen overflow-y-scroll w-full fixed top-0 right-0 z-50 shadow-inner bg-white  antialiased ">
      <div className=" w-full ">
        <PostDetails post={post} comments={comments} />
      </div>
      <div className="lg:w-2/3 shadow-inner ">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
            Discussion ({comments?.length})
          </h2>
          <div className="flex items-center">
            <span className="lg:hidden">Most Relevant</span>
            <CiMinimize1
              size={25}
              onClick={() => router.back()}
              className="absolute bg-slate-800 text-white top-5 right-5 cursor-pointer hover:text-orange-500"
            />
          </div>
        </div>
        <hr />

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
                        {comment?.author?.name}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {timeAgo(comment?.publishedAt)}
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

        <div className="flex mb-7 mx-2 mx-auto items-center justify-between w-80 p-1 border border-gray-200 rounded-3xl gap-2">
          <div className="flex items-center gap-2">
            {session?.user?.image && (
              <Image
                src={session?.user?.image}
                alt="user image"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
            )}
            <input
              onChange={(e) => setCommentText(e.target.value)}
              value={newCommentText}
              className="flex-grow text-xs font-medium text-black leading-4 focus:outline-none"
              placeholder="Type here..."
            />
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                d="M14.9332 7.79175L8.77551 14.323C8.23854 14.8925 7.36794 14.8926 6.83097 14.323C6.294 13.7535 6.294 12.83 6.83097 12.2605L12.9887 5.72925M12.3423 6.41676L13.6387 5.04176C14.7126 3.90267 16.4538 3.90267 17.5277 5.04176C18.6017 6.18085 18.6017 8.02767 17.5277 9.16676L16.2314 10.5418M16.8778 9.85425L10.72 16.3855C9.10912 18.0941 6.49732 18.0941 4.88641 16.3855C3.27549 14.6769 3.27549 11.9066 4.88641 10.198L11.0441 3.66675"
                stroke="#9CA3AF"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.9332 7.79175L8.77551 14.323C8.23854 14.8925 7.36794 14.8926 6.83097 14.323C6.294 13.7535 6.294 12.83 6.83097 12.2605L12.9887 5.72925M12.3423 6.41676L13.6387 5.04176C14.7126 3.90267 16.4538 3.90267 17.5277 5.04176C18.6017 6.18085 18.6017 8.02767 17.5277 9.16676L16.2314 10.5418M16.8778 9.85425L10.72 16.3855C9.10912 18.0941 6.49732 18.0941 4.88641 16.3855C3.27549 14.6769 3.27549 11.9066 4.88641 10.198L11.0441 3.66675"
                stroke="black"
                strokeOpacity="0.2"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <button
              type="submit"
              onKeyDown={handleKeyDown}
              onClick={handleCommentSubmit}
              className="flex items-center px-3 py-2 bg-indigo-600 rounded-full shadow"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M9.04071 6.959L6.54227 9.45744M6.89902 10.0724L7.03391 10.3054C8.31034 12.5102 8.94855 13.6125 9.80584 13.5252C10.6631 13.4379 11.0659 12.2295 11.8715 9.81261L13.0272 6.34566C13.7631 4.13794 14.1311 3.03408 13.5484 2.45139C12.9657 1.8687 11.8618 2.23666 9.65409 2.97257L6.18714 4.12822C3.77029 4.93383 2.56187 5.33664 2.47454 6.19392C2.38721 7.0512 3.48957 7.68941 5.69431 8.96584L5.92731 9.10074C6.23326 9.27786 6.38623 9.36643 6.50978 9.48998C6.63333 9.61352 6.72189 9.7665 6.89902 10.0724Z"
                  stroke="white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              <h3 className="px-2 text-xs font-semibold text-white leading-4">
                Send
              </h3>
            </button>
          </div>
        </div>

        {/* <div className="m-5">
          <label
            htmlFor="message"
            className="block mx-5 text-sm font-medium text-gray-900"
          >
            Leave your comment
          </label>
          <div className="py-2 px-2 mb-4">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>

            <textarea
              id="comment"
              rows="4"
              onChange={(e) => setCommentText(e.target.value)}
              value={newCommentText}
              className="block p-2.5 w-full text-sm placeholder-gray-800 bg-slate-50 text-gray-900 rounded-lg"
              placeholder="Write your thoughts here..."
            ></textarea>
          </div>

          <div className="flex flex-wrap items-center justify-between px-3">
            <button
              type="submit"
              onKeyDown={handleKeyDown}
              onClick={handleCommentSubmit}
              className="inline-flex items-center py-2 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg bg-gradient-to-r from-orange-500 to-purple-500 focus:ring-1 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 mb-2 sm:mb-0"
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
                className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-orange-700 mb-2 sm:mb-0"
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
                className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-orange-700 mb-2 sm:mb-0"
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
                className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-orange-700 mb-2 sm:mb-0"
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
        </div> */}
      </div>
    </div>
  );
};

export default CommentSection;
