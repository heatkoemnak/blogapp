'use client';

import { useSession, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { fetchPosts } from '../utils/api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Link from 'next/link';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [cookiesVisible, setCookiesVisible] = useState(false);
  const [posts, setPosts] = useState([]);

  // Fetch posts on component mount
  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };
    getPosts();
  }, []);

  // Show cookie consent for authenticated users
  useEffect(() => {
    if (!session) {
      signIn();
    }
  }, [session]);

  return (
    <div class="">
      <div class="header bg-white h-16 px-10 py-8 border-b-2 border-gray-200 flex items-center justify-between">
        <div class="flex items-center space-x-2 text-gray-400">
          <Link
            href="/dashboard/blogs"
            class="text-green-700 tracking-wider font-thin text-md"
          >
            My Blogs
          </Link>
          <span>/</span>
          <Link href="/dashboard/portfolio">
            <span class="text-base">My porfolio</span>
          </Link>
          <span>/</span>
          <Link href="/dashboard/events">
            <span class="text-base">My Events</span>
          </Link>
        </div>
      </div>
      <div class="header my-3 h-12 px-10 flex items-center justify-between">
        <h1 class="font-medium text-2xl">My dashboard</h1>
      </div>
      <div class="flex flex-col mx-3 mt-6 lg:flex-row">
        <div class="w-full lg:w-1/3 m-1">
          <form class="w-full bg-white shadow-md p-6">
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-full px-3 mb-6">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                  htmlFor="category_name"
                >
                  Category Name
                </label>
                <input
                  class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                  type="text"
                  name="name"
                  placeholder="Category Name"
                  required
                />
              </div>
              <div class="w-full px-3 mb-6">
                <textarea
                  textarea
                  rows="4"
                  class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                  type="text"
                  name="description"
                  required
                >
                  {' '}
                </textarea>
              </div>

              <div class="w-full md:w-full px-3 mb-6">
                <button class="appearance-none block w-full bg-green-700 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-green-600 focus:outline-none focus:bg-white focus:border-gray-500">
                  Add Category
                </button>
              </div>

              <div class="w-full px-3 mb-8">
                <label
                  class="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-400 bg-white p-6 text-center"
                  htmlFor="dropzone-file"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-10 w-10 text-green-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>

                  <h2 class="mt-4 text-xl font-medium text-gray-700 tracking-wide">
                    Category image
                  </h2>

                  <p class="mt-2 text-gray-500 tracking-wide">
                    Upload or drag & drop your file SVG, PNG, JPG or GIF.{' '}
                  </p>

                  <input
                    id="dropzone-file"
                    type="file"
                    class="hidden"
                    name="category_image"
                    accept="image/png, image/jpeg, image/webp"
                  />
                </label>
              </div>
            </div>
          </form>
        </div>
        <div class="w-full lg:w-2/3 m-1 bg-white shadow-lg text-lg rounded-sm border border-gray-200">
          <div class="overflow-x-auto rounded-lg p-3">
            <table class="table-auto w-full">
              <thead class="text-sm font-semibold uppercase text-gray-800 bg-gray-50 mx-auto">
                <tr>
                  <th></th>
                  <th>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="fill-current w-5 h-5 mx-auto"
                    >
                      <path d="M6 22h12a2 2 0 0 0 2-2V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zm7-18 5 5h-5V4zm-4.5 7a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 8.5 11zm.5 5 1.597 1.363L13 13l4 6H7l2-3z"></path>
                    </svg>
                  </th>
                  <th class="p-2">
                    <div class="font-semibold">Category</div>
                  </th>
                  <th class="p-2">
                    <div class="font-semibold text-left">Description</div>
                  </th>
                  <th class="p-2">
                    <div class="font-semibold text-center">Action</div>
                  </th>
                </tr>
                <tr>
                  <td>1</td>
                  <td>
                    <img
                      src="https://images.pexels.com/photos/25652584/pexels-photo-25652584/free-photo-of-elegant-man-wearing-navy-suit.jpeg?auto=compress&cs=tinysrgb&w=400"
                      class="h-8 w-8 mx-auto"
                    />
                  </td>
                  <td>Sample Name</td>
                  <td>Sample Description</td>
                  <td class="p-2">
                    <div class="flex justify-center">
                      <a
                        href="#"
                        class="rounded-md hover:bg-green-100 text-green-600 p-2 flex justify-between items-center"
                      >
                        <span>
                          <FaEdit class="w-4 h-4 mr-1" />
                        </span>{' '}
                        Edit
                      </a>
                      <button class="rounded-md hover:bg-red-100 text-red-600 p-2 flex justify-between items-center">
                        <span>
                          <FaTrash class="w-4 h-4 mr-1" />
                        </span>{' '}
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
    // <div className="mb-10">
    //   {/* Buttons for filtering posts */}
    //   <div className="flex gap-2 mb-4">
    //     <button
    //       className="uppercase text-sm px-3 py-2 bg-gray-900 text-white rounded-full"
    //       onClick={() => setCookiesVisible((prev) => !prev)}
    //     >
    //       All
    //     </button>
    //     <button className="uppercase text-sm px-3 py-2 bg-gray-900 text-white rounded-full">
    //       Draft
    //     </button>
    //     <button className="uppercase flex items-center gap-1 text-sm px-3 py-2 bg-gray-900 text-white rounded-full">
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         fill="none"
    //         viewBox="0 0 24 24"
    //         strokeWidth={1.5}
    //         stroke="currentColor"
    //         className="h-4 w-4"
    //       >
    //         <path
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //           d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
    //         />
    //       </svg>
    //       Published
    //     </button>
    //     <button className="uppercase flex items-center gap-1 text-sm px-3 py-2 bg-gray-900 text-white rounded-full">
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         fill="none"
    //         viewBox="0 0 24 24"
    //         strokeWidth={1.5}
    //         stroke="currentColor"
    //         className="h-4 w-4"
    //       >
    //         <path
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //           d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
    //         />
    //       </svg>
    //       Saved
    //     </button>
    //   </div>

    //   {/* Render posts */}
    //   {/* {cookiesVisible ? (
    //     posts.length > 0 ? (
    //       posts
    //         .filter((post) => post?.authorEmail === session?.user?.email)
    //         .map((post) => <Post key={post?.id} post={post} />)
    //     ) : (
    //       <div>No posts found.</div>
    //     )
    //   ) : (
    //     <p>Cookies are hidden.</p>
    //   )} */}
    // </div>
  );
}
