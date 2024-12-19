import { timeAgo } from '@/app/utils/timeAgo';
import Image from 'next/image';
import React from 'react';

const BubbleComment = ({
  comment,
  toggleCommentSettings,
  activeSettings,
  session,
}) => {
  return (
    <div className="flex gap-2.5 mb-4 mx-auto">
      <img
        className="w-10 h-10"
        src={
          comment?.author?.image ||
          'https://www.creativefabrica.com/wp-content/uploads/2022/11/21/Beautiful-African-American-Brown-Skin-Woman-Avatar-47788434-1.png'
        }
        alt={comment?.author?.name || 'Anonymous'}
      />
      <div className="grid">
        <h5 className="text-gray-900 text-sm font-semibold leading-snug pb-1">
          {comment?.author?.name}
        </h5>
        <div className="w-full max-w-xs grid">
          <div className="px-3.5 py-2 bg-gray-100 rounded-3xl rounded-tl-none flex flex-col gap-2">
            <h5 className="text-sm font-normal text-gray-900 ">
              {comment.text || 'No comment content available.'}
            </h5>
            <a
              href="#"
              className="text-sm font-normal text-indigo-600 underline"
            >
              {comment?.link && '      https://pagedone.io/blocks'}
            </a>
            {comment?.image && (
              <img
                src="https://pagedone.io/asset/uploads/1715316833.png"
                alt="image"
                className="rounded-xl"
              />
            )}
            {comment?.pdf && (
              <div class="flex items-start bg-gray-50 dark:bg-gray-600 rounded-xl p-2">
                <div class="me-2">
                  <span class="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white pb-2">
                    <svg
                      fill="none"
                      aria-hidden="true"
                      class="w-5 h-5 flex-shrink-0"
                      viewBox="0 0 20 21"
                    >
                      <g clip-path="url(#clip0_3173_1381)">
                        <path
                          fill="#E2E5E7"
                          d="M5.024.5c-.688 0-1.25.563-1.25 1.25v17.5c0 .688.562 1.25 1.25 1.25h12.5c.687 0 1.25-.563 1.25-1.25V5.5l-5-5h-8.75z"
                        />
                        <path
                          fill="#B0B7BD"
                          d="M15.024 5.5h3.75l-5-5v3.75c0 .688.562 1.25 1.25 1.25z"
                        />
                        <path
                          fill="#CAD1D8"
                          d="M18.774 9.25l-3.75-3.75h3.75v3.75z"
                        />
                        <path
                          fill="#F15642"
                          d="M16.274 16.75a.627.627 0 01-.625.625H1.899a.627.627 0 01-.625-.625V10.5c0-.344.281-.625.625-.625h13.75c.344 0 .625.281.625.625v6.25z"
                        />
                        <path
                          fill="#fff"
                          d="M3.998 12.342c0-.165.13-.345.34-.345h1.154c.65 0 1.235.435 1.235 1.269 0 .79-.585 1.23-1.235 1.23h-.834v.66c0 .22-.14.344-.32.344a.337.337 0 01-.34-.344v-2.814zm.66.284v1.245h.834c.335 0 .6-.295.6-.605 0-.35-.265-.64-.6-.64h-.834zM7.706 15.5c-.165 0-.345-.09-.345-.31v-2.838c0-.18.18-.31.345-.31H8.85c2.284 0 2.234 3.458.045 3.458h-1.19zm.315-2.848v2.239h.83c1.349 0 1.409-2.24 0-2.24h-.83zM11.894 13.486h1.274c.18 0 .36.18.36.355 0 .165-.18.3-.36.3h-1.274v1.049c0 .175-.124.31-.3.31-.22 0-.354-.135-.354-.31v-2.839c0-.18.135-.31.355-.31h1.754c.22 0 .35.13.35.31 0 .16-.13.34-.35.34h-1.455v.795z"
                        />
                        <path
                          fill="#CAD1D8"
                          d="M15.649 17.375H3.774V18h11.875a.627.627 0 00.625-.625v-.625a.627.627 0 01-.625.625z"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3173_1381">
                          <path
                            fill="#fff"
                            d="M0 0h20v20H0z"
                            transform="translate(0 .5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    Flowbite Terms & Conditions
                  </span>
                  <span class="flex text-xs font-normal text-gray-500 dark:text-gray-400 gap-2">
                    12 Pages
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      class="self-center"
                      width="3"
                      height="4"
                      viewBox="0 0 3 4"
                      fill="none"
                    >
                      <circle cx="1.5" cy="2" r="1.5" fill="#6B7280" />
                    </svg>
                    18 MB
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      class="self-center"
                      width="3"
                      height="4"
                      viewBox="0 0 3 4"
                      fill="none"
                    >
                      <circle cx="1.5" cy="2" r="1.5" fill="#6B7280" />
                    </svg>
                    PDF
                  </span>
                </div>
                <div class="inline-flex self-center items-center">
                  <button
                    class="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-600"
                    type="button"
                  >
                    <svg
                      class="w-4 h-4 text-gray-900 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                      <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="justify-end items-center inline-flex mb-2.5">
            <h6 className="flex items-center gap-2 text-gray-500 text-xs font-normal leading-4 py-1">
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
