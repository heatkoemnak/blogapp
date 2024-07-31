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
    <div className="max-w-5xl mx-auto flex justify-end flex-col px-4 border rounded-md">
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
    </div>
  );
};

export default Comment;
