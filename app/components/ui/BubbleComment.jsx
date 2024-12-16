import { timeAgo } from '@/app/utils/timeAgo';
import React from 'react';

const BubbleComment = ({
  comment,
  toggleCommentSettings,
  activeSettings,
  session,
}) => {
  return (
    <div class="flex gap-2.5 mb-4 mx-auto">
      <img
        src={
          comment?.author?.image ||
          'https://pagedone.io/asset/uploads/1710412177.png'
        }
        alt="Shanay image"
        class="w-10 h-11"
      />
      <div class="grid">
        <h5 class="text-gray-900 text-sm font-semibold leading-snug pb-1">
          {comment?.author?.name}
        </h5>
        <div class="w-full max-w-xs grid">
          <div class="px-3.5 py-2 bg-gray-100 rounded-3xl rounded-tl-none flex flex-col gap-2">
            <h5 class="text-sm font-normal text-gray-900 ">
              {comment.text || 'No comment content available.'}
            </h5>
            <a href="#" class="text-sm font-normal text-indigo-600 underline">
              {comment?.link && '      https://pagedone.io/blocks'}
            </a>
            {comment?.image && (
              <img
                src="https://pagedone.io/asset/uploads/1715316833.png"
                alt="image"
                class="rounded-xl"
              />
            )}
          </div>
          <div class="justify-end items-center inline-flex mb-2.5">
            <h6 class="flex items-center gap-2 text-gray-500 text-xs font-normal leading-4 py-1">
              <div className="flex">
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
                reply
              </div>

              {timeAgo(comment?.publishedAt)}
            </h6>
          </div>
        </div>
      </div>
      <div>
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
            <div
              // ref={popupRef}
              className="absolute top-8 right-0 z-10 w-36 bg-white rounded-xl border"
            >
              <ul className="py-1 text-xs text-gray-700 ">
                {comment?.authorEmail === session?.user?.email && (
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
      </div>
      
    </div>
  );
};

export default BubbleComment;
