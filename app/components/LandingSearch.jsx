'use client';
import {
  useMotionValue,
  motion,
  animate,
} from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { RiScrollToBottomLine } from 'react-icons/ri';
const COLORS_TOP = ['#13FFAA', '#1E67C6', '#CE84CF', '#DD335C'];

function LandingSearch() {
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  const color = useMotionValue(COLORS_TOP[0]);
  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: 'easeInOut',
      duration: 10,
      repeat: Infinity,
      repeatType: 'mirror',
    });
  }, [color]);
  return (
    <section className="bg-white">
      <motion.section className="relative bg-opacity-5  bg-gradient-to-r from-teal-500 to-teal-900 text-white">
        <div className="container mx-auto">
          <div className="flex flex-col items-center py-10 text-center lg:py-20">
            <div className="w-full px-4 ">
              <div className="mt-32">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight text-nowrap">
                  Discover your next opportunity
                </h1>
              </div>

              <section className=" text-white overflow-hidden">
                <div className="container mx-auto px-4 z-10">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="w-full mb-8 mt-8 ">
                      <h2 className="text-xl font-bold mb-8 text-white">
                        Find a job that makes you happy!
                      </h2>
                      <div className="flex flex-col justify-center sm:flex-row space-y-4 mt-12 sm:space-y-0 sm:space-x-4">
                        <Link
                          href="/jobs"
                          className="bg-tranparent border-2 text-white font-semibold px-8 py-3 rounded-full hover:bg-teal-500 transition duration-300 text-center"
                        >
                          Explore Careers
                        </Link>
                        <a
                          href="#"
                          className="border border-white text-white font-semibold px-8 py-3 rounded-full bg-teal-800 hover:text-white transition duration-300 text-center"
                        >
                          Learn More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0">
                  <svg
                    viewBox="0 0 1440 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </section>
            </div>
          </div>
        </div>
        <button
          className="absolute bottom-0 flex items-center gap-1 text-gray-600 right-0 transform -translate-x-1/2 mb-4"
          onClick={handleScroll}
        >
          Scroll down
          <RiScrollToBottomLine />
        </button>
      </motion.section>
    </section>
  );
}

export default LandingSearch;
