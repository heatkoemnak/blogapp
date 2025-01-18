'use client';

import { Stars } from '@react-three/drei';
import Categories from '../components/Categories';
import JobList from '../components/JobList';
import PostList from '../components/PostList';
import JobFilters from '../components/ui/jobs/JobFilters';
import { Canvas } from '@react-three/fiber';
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from 'framer-motion';
import { useEffect } from 'react';
const COLORS_TOP = ['#13FFAA', '#1E67C6', '#CE84CF', '#DD335C'];

const Blog = () => {
  const color = useMotionValue(COLORS_TOP[0]);
  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: 'easeInOut',
      duration: 10,
      repeat: Infinity,
      repeatType: 'mirror',
    });
  }, []);
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;

  return (
    <>
      {/* <Categories /> */}
      <section className=" mt-12 lg:mt-24">
        <div className="flex items-center -skew-y-1 py-3 animate-fadeIn">
          <div className="announcement p-1 border cursor-pointer rounded-tl-full text-md font-medium bg-gradient-to-r from-teal-500 to-teal-900 hover:scale-105 hover:bg-gradient-to-l transition-transform duration-300 ease-in-out">
            <span className="text-gray-100 px-5">Experience jobs - 15</span>
          </div>
          <div className="announcement p-1 border cursor-pointer text-md font-medium bg-gradient-to-r from-teal-500 to-teal-900 hover:scale-105 hover:bg-gradient-to-l transition-transform duration-300 ease-in-out">
            <span className="text-gray-100 px-5">Internships - 5</span>
          </div>
          <div className="announcement p-1 border cursor-pointer text-md font-medium bg-gradient-to-r from-teal-500 to-teal-900 hover:scale-105 hover:bg-gradient-to-l transition-transform duration-300 ease-in-out">
            <span className="text-gray-100 px-5">Volunteer - 1</span>
          </div>
        </div>

        <motion.section
          style={{
            backgroundImage,
          }}
          className="relative bg-gradient-to-r from-teal-500 to-teal-900 border-y-2 border-green-500 shadow-xl text-white -skew-y-1"
        >
          <div className="absolute inset-0 z-0 ">
            <Canvas>
              <Stars radius={50} count={2500} factor={4} fade speed={2} />
            </Canvas>
          </div>
          <div className="container mx-auto skew-y-1">
            <div className="flex flex-col items-center py-10 text-center lg:py-20">
              <div className="w-full px-4 lg:w-1/2 lg:px-0">
                <div className="mb-8">
                  <h2 className="text-3xl lg:text-4xl font-bold mb-3">
                    Looking for a job?
                  </h2>
                  <p className="text-lg lg:text-xl opacity-80">
                    Search the forum for the answer to your question
                  </p>
                </div>

                <div className="mb-10">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-900"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        ></path>
                      </svg>
                    </div>

                    <form action="#" method="GET">
                      <input
                        type="search"
                        name="search"
                        placeholder="job title, keywords..."
                        className="p-4 pl-10 text-gray-600 rounded w-full border-gray-100"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
        <JobFilters />
      </section>
      {/* <div className="col-span-full rounded-2xl ">
        <div className="container   mx-auto rounded-lg p-4">
          <div className="relative isolate overflow-hidden bg-white px-6 py-20 text-center sm:px-16 sm:shadow-sm">
            <p className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {`Didn't`} find job you were looking for?
            </p>

            <form>
              <label
                className="mx-auto mt-8 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
                for="search-bar"
              >
                <input
                  id="search-bar"
                  placeholder="your keyword here"
                  name="q"
                  className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
                  required=""
                />
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all"
                >
                  <div className="flex items-center transition-all opacity-1">
                    <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                      Search
                    </span>
                  </div>
                </button>
              </label>
            </form>

            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              aria-hidden="true"
            >
              <circle
                cx="512"
                cy="512"
                r="512"
                fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
                fill-opacity="0.7"
              ></circle>
              <defs>
                <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                  <stop stop-color="#3b82f6"></stop>
                  <stop offset="1" stop-color="#1d4ed8"></stop>
                </radialGradient>
              </defs>
            </svg>
          </div>
          <JobFilters />
          </div>
          </div> */}

      <JobList />
      <PostList />
    </>
  );
};

export default Blog;
