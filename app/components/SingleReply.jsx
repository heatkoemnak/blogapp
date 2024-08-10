import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import ThreeDotsDropdown from './ThreeDotsDropdown';
import { useSession } from 'next-auth/react';

const SingleReply = ({ reply, index, showReply, setShowReply }) => {
  const { data: session } = useSession();

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
      <div className="flex flex-row pt-1 md-10 md:ml-16" key={index}>
        <div class="flex-shrink-0 mr-3">
          <Image
            width={24}
            height={24}
            className="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8"
            src={reply?.author?.image}
            alt={reply?.author?.name}
          />
        </div>
        <div className="flex-col mt-1">
          {/* <div className="flex items-center flex-1 px-4 font-bold leading-tight">
            {reply?.author?.name === session?.user?.name
              ? 'Author'
              : reply?.author?.name}
            <span className="ml-2 text-xs font-normal text-gray-500">
              5 days ago
            </span>
          </div> */}
          <div className="bg-gray-100 w-auto rounded-xl px-2 pb-2">
            <div className="font-medium">
              <span className="hover:underline text-sm text-primary">
                {' '}
                {reply?.author?.name === session?.user?.name
                  ? 'Author'
                  : reply?.author?.name}
              </span>
            </div>
            <div className="md:text-sm">{reply?.text}</div>
          </div>
          <div className='flex items-center'>
            <button className="inline-flex items-center px-1 pt-2 ml-1 flex-column">
              <svg
                className="w-5 h-5 ml-2 text-gray-600 cursor-pointer fill-current hover:text-gray-900"
                viewBox="0 0 95 78"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M29.58 0c1.53.064 2.88 1.47 2.879 3v11.31c19.841.769 34.384 8.902 41.247 20.464 7.212 12.15 5.505 27.83-6.384 40.273-.987 1.088-2.82 1.274-4.005.405-1.186-.868-1.559-2.67-.814-3.936 4.986-9.075 2.985-18.092-3.13-24.214-5.775-5.78-15.377-8.782-26.914-5.53V53.99c-.01 1.167-.769 2.294-1.848 2.744-1.08.45-2.416.195-3.253-.62L.85 30.119c-1.146-1.124-1.131-3.205.032-4.312L27.389.812c.703-.579 1.49-.703 2.19-.812zm-3.13 9.935L7.297 27.994l19.153 18.84v-7.342c-.002-1.244.856-2.442 2.034-2.844 14.307-4.882 27.323-1.394 35.145 6.437 3.985 3.989 6.581 9.143 7.355 14.715 2.14-6.959 1.157-13.902-2.441-19.964-5.89-9.92-19.251-17.684-39.089-17.684-1.573 0-3.004-1.429-3.004-3V9.936z"
                  fill-rule="nonzero"
                />
              </svg>
            </button>
            <button className="inline-flex items-center px-1 -ml-1 flex-column">
              <svg
                className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
            </button>
            <span className="ml-2 text-xs font-normal text-gray-500">
              5 days ago
            </span>
          </div>
        </div>
      </div>
     
      {/* <article
        key={index}
        classNameName="p-4 mb-3 ml-3 mt-2 lg:ml-8 text-sm lg:text-base bg-white rounded-lg border border-gray-200 shadow-sm"
      >
        <footer classNameName="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
          <div classNameName="flex sm:flex-col items-center mb-2 md:mb-0">
            <div classNameName="flex items-center mr-3 text-sm text-gray-900 font-semibold">
              <Image
                width={30}
                height={30}
                classNameName="mr-2 w-8 h-8 rounded-full"
                src={reply?.author?.image}
                alt={reply?.author?.name}
              />
              <span classNameName="flex items-center mr-3 text-sm text-gray-900 font-semibold">
                {reply?.author?.name}
              </span>
            </div>
            <p classNameName="text-xs text-gray-600 dark:text-gray-400">
              <time dateTime={reply?.publishedAt} title={reply?.publishedAt}>
                {new Date(reply?.publishedAt).toLocaleDateString()}
              </time>
            </p>
          </div>
          <div ref={dropdownRef} classNameName="relative inline-block text-left">
            <button
              id="dropdownComment2Button"
              data-dropdown-toggle="dropdownComment2"
              classNameName="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none"
              type="button"
              onClick={() => setDropdownVisible(!dropdownVisible)}
            >
              <svg
                classNameName="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 3"
              >
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
              </svg>
              <span classNameName="sr-only">Comment settings</span>
            </button>
            {dropdownVisible && <ThreeDotsDropdown />}
          </div>
        </footer>
        <p classNameName="text-gray-600 text-sm mb-4">{reply?.text}</p>
        {showReply && (
          <div classNameName="mt-4">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              classNameName="w-full p-2 border rounded-lg text-sm"
              placeholder="Write a reply..."
            />
            <button
              // onClick={handleReplySubmit}
              classNameName="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Reply
            </button>
          </div>
        )}
        <div classNameName="flex items-center mt-4 space-x-4">
          <button
            type="button"
            onClick={() => setShowReply(!showReply)}
            classNameName="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
          >
            <svg
              classNameName="mr-1.5 w-3.5 h-3.5"
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
      </article> */}
    </div>
  );
};

export default SingleReply;
