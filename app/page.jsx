'use client';

import Image from 'next/image';
import Categories from './components/Categories';
import RecentPost from './components/RecentPost';
import PopularCategories from './components/PopularCategories';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="flex bg-white" style={{ height: '600px' }}>
        <div className="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
          <div>
            <h1 class="text-5xl sm:text-6xl lg:text-5xl xl:text-6xl text-yellow-500  my-8 bg-gradient-to-r from-yellow-400 font-black via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Bring Your Ideas to <span class="text-blue-400">Life</span>
            </h1>
            <p class="text-xl text-red font-semibold ">
              Become the best in your industry! Start today our universal quik
              start program
            </p>
            <p className="mt-2 text-sm text-gray-500 md:text-base">
              Discover cutting-edge solutions tailored to your needs. Our team
              leverages the latest technologies to bring your innovative ideas
              to life, ensuring efficiency and quality in every step. Join us in
              shaping the future of technology and business.
            </p>
            <div className="flex justify-center lg:justify-start mt-6">
              <Link
              href={'/blogs'} 
                className="px-4 py-3 bg-gray-900 text-gray-200 text-xs font-semibold rounded hover:bg-gray-800"
                             >
                Get Started
              </Link>
              <a
                className="mx-4 px-4 py-3 bg-gray-300 text-gray-900 text-xs font-semibold rounded hover:bg-gray-400"
                href="#"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
        <div
          className="  lg:w-1/2"
          style={{ clipPath: 'polygon(10% 0, 100% 0%, 100% 100%, 0 100%)' }}
        >
          <div
            className="h-full object-cover"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80)',
            }}
          >
            <div className="h-full bg-black "></div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="md:text-4xl font-bold">Popular categories</h1>
        <div className="mt-5">
          <PopularCategories />
        </div>
      </div>
      <RecentPost />
    </>
  );
}
