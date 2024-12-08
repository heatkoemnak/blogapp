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

      <div class="antialiased mx-auto max-w-screen-sm">
        <div class="space-y-4">
          <div class="flex ">
            <div class="flex-shrink-0 mr-3">
              <Image
                width={32}
                height={32}
                className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                src={comment?.author?.image}
                alt={comment?.author?.name}
              />
            </div>
            <div className="flex flex-col">
              <div class="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                <strong>{comment?.author?.name}</strong>{' '}
                <span class="text-xs text-gray-400">3:34 PM</span>
                <p class="text-sm">{comment?.text}</p>
                <h4 class="my-5 uppercase tracking-wide text-gray-400 font-bold text-xs">
                  Replies
                </h4>
                <div class="space-y-4">
                  <CommentReplies
                    comment={comment}
                    showFieldReply={showFieldReply}
                  />
                </div>
              </div>

              <div className="flex items-center">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
