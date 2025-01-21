'use client';

import { Stars } from '@react-three/drei';
import PostList from '../components/PostList';
import { Canvas } from '@react-three/fiber';
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from 'framer-motion';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
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
  }, [color]);
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;

  return (
    <>
      {/* <Categories /> */}
      <section className="bg-gray-100">
        <motion.section
          style={{
            backgroundImage,
          }}
          className="relative bg-opacity-5 backdrop-filter backdrop-blur-lg bg-gradient-to-r from-teal-500 to-teal-900 border-y-2 shadow-xl text-white"
        >
          <div
            class="absolute  inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
              zIndex: '-1',
              opacity: '0.3',
            }}
          >
            <Canvas>
              <Stars radius={50} count={2500} factor={4} fade speed={2} />
            </Canvas>
          </div>
          <div className="container mx-auto">
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

                    <form>
                      <input
                        type="search"
                        name="search"
                        placeholder="job title, keywords..."
                        className="p-4 pl-10 text-gray-600 rounded w-full border-gray-100"
                      />
                    </form>
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-center py-3 animate-fadeIn">
                  <div className="flex flex-col p-2 border cursor-pointer text-md font-medium bg-gradient-to-r from-teal-500 to-teal-900 hover:scale-105 hover:bg-gradient-to-l transition-transform duration-300 ease-in-out">
                    <span className="text-gray-100 px-5 text">Jobs</span>
                    <span className="text-gray-100 px-5 text-xl">2304</span>
                  </div>
                  <div className="flex flex-col p-2 border cursor-pointer  text-md font-medium bg-gradient-to-r from-teal-500 to-teal-900 hover:scale-105 hover:bg-gradient-to-l transition-transform duration-300 ease-in-out">
                    <span className="text-gray-100 px-5">Companies</span>
                    <span className="text-gray-100 px-5 text-xl">15</span>
                  </div>
                  <div className="flex flex-col p-2 border cursor-pointer  text-md font-medium bg-gradient-to-r from-teal-500 to-teal-900 hover:scale-105 hover:bg-gradient-to-l transition-transform duration-300 ease-in-out">
                    <span className="text-gray-100 px-5">Users</span>
                    <span className="text-gray-100 px-5 text-xl">15k</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* <JobFilters /> */}
      </section>
      {/* <JobList /> */}
      <PostList />
    </>
  );
};

export default Blog;
