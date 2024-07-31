import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import ThreeDotsDropdown from './ThreeDotsDropdown';

const SingleReply = ({ reply, index, showReply, setShowReply }) => {
  const [replyText, setReplyText] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <article
        key={index}
        className="p-4 mb-3 ml-3 mt-2 lg:ml-8 text-sm lg:text-base bg-white rounded-lg border border-gray-200 shadow-sm"
      >
        <footer className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
          <div className="flex sm:flex-col items-center mb-2 md:mb-0">
            <div className="flex items-center mr-3 text-sm text-gray-900 font-semibold">
              <Image
                width={30}
                height={30}
                className="mr-2 w-8 h-8 rounded-full"
                src={reply?.author?.image}
                alt={reply?.author?.name}
              />
              <span className="flex items-center mr-3 text-sm text-gray-900 font-semibold">
                {reply?.author?.name}
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              <time dateTime={reply?.publishedAt} title={reply?.publishedAt}>
                {new Date(reply?.publishedAt).toLocaleDateString()}
              </time>
            </p>
          </div>
          <div ref={dropdownRef} className="relative inline-block text-left">
            <button
              id="dropdownComment2Button"
              data-dropdown-toggle="dropdownComment2"
              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none"
              type="button"
              onClick={() => setDropdownVisible(!dropdownVisible)}
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
            {dropdownVisible && <ThreeDotsDropdown />}
          </div>
        </footer>
        <p className="text-gray-600 text-sm mb-4">{reply?.text}</p>
        {showReply && (
          <div className="mt-4">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full p-2 border rounded-lg text-sm"
              placeholder="Write a reply..."
            />
            <button
              // onClick={handleReplySubmit}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Reply
            </button>
          </div>
        )}
        <div className="flex items-center mt-4 space-x-4">
          <button
            type="button"
            onClick={() => setShowReply(!showReply)}
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

export default SingleReply;
