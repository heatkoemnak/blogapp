import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import CommentReplies from './CommentReplies';
import ThreeDotsDropdown from './ThreeDotsDropdown';

const Comment = ({ comment }) => {
  const [dropdownThreeDot, setDropDownThreeDot] = useState(false);
  const [showFieldReply, setShowFieldReply] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDownThreeDot(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div class="container px-0 mx-auto sm:px-5 ">
        <div class="flex-col w-full py-4 mx-auto shadow-md bg-white sm:px-4 sm:py-4 md:px-4 sm:rounded-lg sm:shadow-sm md:w-2/3">
          <div class="flex flex-row">
            <Image
              width={30}
              height={30}
              class="object-cover w-12 h-12 border-2 border-gray-300 rounded-full"
              src={comment?.author?.image}
              alt={comment?.author?.name}
            />
            <div class="flex-col mt-1">
              <div class="flex items-center flex-1 px-4 font-bold leading-tight">
                {comment?.author?.name}
                <span class="ml-2 text-xs font-normal text-gray-500">
                  2 weeks ago
                </span>
              </div>
              <div class="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600">
                {comment?.text}
              </div>
              <button class="inline-flex items-center px-1 pt-2 ml-1 flex-column">
                <svg
                  class="w-5 h-5 ml-2 text-gray-600 cursor-pointer fill-current hover:text-gray-900"
                  viewBox="0 0 95 78"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M29.58 0c1.53.064 2.88 1.47 2.879 3v11.31c19.841.769 34.384 8.902 41.247 20.464 7.212 12.15 5.505 27.83-6.384 40.273-.987 1.088-2.82 1.274-4.005.405-1.186-.868-1.559-2.67-.814-3.936 4.986-9.075 2.985-18.092-3.13-24.214-5.775-5.78-15.377-8.782-26.914-5.53V53.99c-.01 1.167-.769 2.294-1.848 2.744-1.08.45-2.416.195-3.253-.62L.85 30.119c-1.146-1.124-1.131-3.205.032-4.312L27.389.812c.703-.579 1.49-.703 2.19-.812zm-3.13 9.935L7.297 27.994l19.153 18.84v-7.342c-.002-1.244.856-2.442 2.034-2.844 14.307-4.882 27.323-1.394 35.145 6.437 3.985 3.989 6.581 9.143 7.355 14.715 2.14-6.959 1.157-13.902-2.441-19.964-5.89-9.92-19.251-17.684-39.089-17.684-1.573 0-3.004-1.429-3.004-3V9.936z"
                    fill-rule="nonzero"
                  />
                </svg>
              </button>
              <button class="inline-flex items-center px-1 -ml-1 flex-column">
                <svg
                  class="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <hr class="my-2 ml-16 border-gray-200" />
          <CommentReplies comment={comment} showFieldReply={showFieldReply} />
        </div>
        
      </div>
      {/* <div className="max-w-5xl mx-auto flex justify-end flex-col px-4 border rounded-md">
        <article className="p-6 text-base mb-5 bg-white rounded-lg">
          <footer className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <p className="inline-flex items-center mr-3 text-md text-gray-900 font-semibold">
                <Image
                  width={30}
                  height={30}
                  className="mr-2 w-6 h-6 rounded-full"
                  src={comment?.author?.image}
                  alt={comment?.author?.name}
                />
                {comment?.author?.name}
              </p>
              <p className="text-sm text-gray-600">
                <time dateTime="2022-02-08" title="February 8th, 2022">
                  {comment?.publishedAt}
                </time>
              </p>
            </div>
            <div className="relative inline-block text-left" ref={dropdownRef}>
              <button
                id="dropdownThreeDot1Button"
                data-dropdown-toggle="dropdownThreeDot1"
                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none"
                type="button"
                onClick={() => setDropDownThreeDot(!dropdownThreeDot)}
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
                <span className="sr-only">Comment settings</span>
              </button>
              {dropdownThreeDot && <ThreeDotsDropdown />}
            </div>
          </footer>
          <p className="text-gray-800 text-sm">{comment?.text}</p>

          <CommentReplies comment={comment} showFieldReply={showFieldReply} />

          <div className="flex items-center mt-4 space-x-4">
            <button
              type="button"
              onClick={() => setShowFieldReply(!showFieldReply)}
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
        </article>
      </div> */}
    </>
  );
};

export default Comment;
